// OpenAI API 服务（简化版）

import type { AIMessage } from '../../types/chat'

export interface OpenAIStreamResponse {
  id: string
  object: string
  created: number
  model: string
  choices: Array<{
    index: number
    delta: {
      content?: string
      role?: string
    }
    finish_reason?: string
  }>
}

export interface OpenAIConfig {
  apiKey: string
  model: string
  baseUrl?: string
}

export class OpenAIClient {
  private config: OpenAIConfig

  constructor(config: OpenAIConfig) {
    const baseUrl = config.baseUrl || 'https://api.openai.com/v1'
    this.config = {
      ...config,
      baseUrl
    }
  }

  /**
   * 创建流式聊天完成
   */
  async createChatCompletionStream(
    messages: AIMessage[],
    onChunk: (content: string) => void,
    onError: (error: string) => void,
    signal?: AbortSignal
  ): Promise<void> {
    try {
      const requestBody = {
        model: this.config.model,
        messages,
        stream: true,
        temperature: 0.7,
        max_tokens: 4096
      }

      const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
        signal
      })

      if (!response.ok) {
        const errorText = await response.text()
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`

        try {
          const errorData = JSON.parse(errorText)
          if (errorData.error?.message) {
            errorMessage = errorData.error.message
          }
        } catch {
          // 忽略解析错误
        }

        throw new Error(errorMessage)
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('Response body is not readable')
      }

      const decoder = new TextDecoder()
      let buffer = ''

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          buffer += chunk

          // 处理缓冲区中的完整行
          while (true) {
            const lineEnd = buffer.indexOf('\n')
            if (lineEnd === -1) break

            const line = buffer.slice(0, lineEnd).trim()
            buffer = buffer.slice(lineEnd + 1)

            // 跳过空行和注释行
            if (!line || line.startsWith(':')) continue

            // 处理 SSE 数据行
            if (line.startsWith('data: ')) {
              const data = line.slice(6)

              // 流结束标记
              if (data === '[DONE]') {
                return
              }

              try {
                const parsed: OpenAIStreamResponse = JSON.parse(data)
                const content = parsed.choices[0]?.delta?.content
                const finishReason = parsed.choices[0]?.finish_reason

                if (content) {
                  onChunk(content)
                }

                // 检查是否收到结束信号
                if (finishReason === 'stop') {
                  return
                }
              } catch (parseError) {
                // 忽略无效的 JSON，继续处理
                console.warn('[OpenAI] Failed to parse SSE data:', parseError)
              }
            }
          }
        }
      } finally {
        reader.cancel()
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          // 用户取消，不显示错误
          return
        } else {
          onError(error.message)
        }
      } else {
        onError('Unknown error occurred')
      }
    }
  }
}

// 创建客户端实例的工厂函数
export function createOpenAIClient(apiKey: string, model?: string, baseUrl?: string): OpenAIClient {
  return new OpenAIClient({
    apiKey,
    model: model || 'gpt-4o',
    baseUrl: baseUrl || 'https://api.openai.com/v1'
  })
}


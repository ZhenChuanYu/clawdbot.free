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
    console.log('[OpenAI] Client initialized:', {
      model: this.config.model,
      baseUrl: this.config.baseUrl,
      apiKeyLength: this.config.apiKey.length
    })
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
    console.log('[OpenAI] Starting stream chat completion:', {
      messagesCount: messages.length,
      model: this.config.model,
      baseUrl: this.config.baseUrl
    })
    
    try {
      const requestBody = {
        model: this.config.model,
        messages,
        stream: true,
        temperature: 0.7,
        max_tokens: 4096
      }

      const requestUrl = `${this.config.baseUrl}/chat/completions`
      console.log('[OpenAI] Sending request:', {
        url: requestUrl,
        method: 'POST',
        model: this.config.model
      })

      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
        signal
      })

      console.log('[OpenAI] Received response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('[OpenAI] Request failed:', {
          status: response.status,
          statusText: response.statusText,
          errorText
        })
        
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`

        try {
          const errorData = JSON.parse(errorText)
          if (errorData.error?.message) {
            errorMessage = errorData.error.message
          }
          console.error('[OpenAI] Parsed error info:', errorData)
        } catch {
          console.warn('[OpenAI] Unable to parse error response as JSON')
        }

        throw new Error(errorMessage)
      }

      const reader = response.body?.getReader()
      if (!reader) {
        console.error('[OpenAI] Response body is not readable')
        throw new Error('Response body is not readable')
      }

      console.log('[OpenAI] Starting to read stream data')
      const decoder = new TextDecoder()
      let buffer = ''
      let chunkCount = 0

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) {
            console.log('[OpenAI] Stream reading completed, processed', chunkCount, 'chunks')
            break
          }

          chunkCount++
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
                console.log('[OpenAI] Received stream end marker')
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
                  console.log('[OpenAI] Received finish_reason: stop, ending stream')
                  return
                }
              } catch (parseError) {
                // 忽略无效的 JSON，继续处理
                console.warn('[OpenAI] Failed to parse SSE data:', parseError, 'data:', data.substring(0, 100))
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


import React, { useState, useRef, useEffect, useMemo } from 'react'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import type { ChatMessage as ChatMessageType, AIMessage, StreamingState } from '../../types/chat'
import { createOpenAIClient } from '../../services/ai/openai'
import { getApiKey, getBaseUrl, getDefaultModel } from '../../services/ai/api'

interface ChatContainerProps {
  initialMessage?: string
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  initialMessage
}) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const [displayList, setDisplayList] = useState<ChatMessageType[]>([])
  const [loading, setLoading] = useState(false)
  const [streamingState, setStreamingState] = useState<StreamingState>({
    isStreaming: false,
    currentMessageId: null,
    streamBuffer: '',
    error: null
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  // 创建 AI 客户端
  const aiClient = useMemo(() => {
    try {
      const apiKey = getApiKey()
      const baseUrl = getBaseUrl()
      const model = getDefaultModel()
      return createOpenAIClient(apiKey, model, baseUrl)
    } catch (error) {
      console.error('Failed to create AI client:', error)
      return null
    }
  }, [])

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [displayList, streamingState.streamBuffer])

  // 处理初始消息
  useEffect(() => {
    if (initialMessage && messages.length === 0 && aiClient) {
      const userMessage: ChatMessageType = {
        id: `user_${Date.now()}`,
        type: 'user',
        content: initialMessage,
        timestamp: new Date()
      }

      setMessages([userMessage])
      setDisplayList([userMessage])

      // 自动开始 AI 响应
      startAIStream(initialMessage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMessage, aiClient])

  // 清理流式请求
  const cleanupStream = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
    setStreamingState({
      isStreaming: false,
      currentMessageId: null,
      streamBuffer: '',
      error: null
    })
  }

  // 停止生成
  const handleStopGeneration = () => {
    cleanupStream()
    setLoading(false)
  }

  // 开始 AI 流式响应
  const startAIStream = async (userMessage: string) => {
    if (!aiClient) {
      console.error('AI client not initialized')
      return
    }

    setLoading(true)

    // 创建 AI 消息
    const aiMessageId = `ai_${Date.now()}`
    const aiMessage: ChatMessageType = {
      id: aiMessageId,
      type: 'ai',
      content: '',
      timestamp: new Date(),
      loading: true,
      streaming: true,
      modelName: getDefaultModel()
    }

    // 更新消息列表
    setMessages(prev => [...prev, aiMessage])
    setDisplayList(prev => [...prev, aiMessage])

    // 重置流式状态
    setStreamingState({
      isStreaming: true,
      currentMessageId: aiMessageId,
      streamBuffer: '',
      error: null
    })

    // 创建 AbortController
    const controller = new AbortController()
    abortControllerRef.current = controller

    // 构建对话历史
    const aiMessages: AIMessage[] = [
      ...messages.map(msg => ({
        role: msg.type === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.content
      })),
      {
        role: 'user',
        content: userMessage
      }
    ]

    let accumulatedBuffer = ''

    try {
      await aiClient.createChatCompletionStream(
        aiMessages,
        // onChunk 回调
        (content: string) => {
          accumulatedBuffer += content

          // 更新流式状态
          setStreamingState(prev => ({
            ...prev,
            streamBuffer: accumulatedBuffer
          }))

          // 更新显示列表中的 AI 消息
          setDisplayList(prev => prev.map(msg => {
            if (msg.id === aiMessageId) {
              return {
                ...msg,
                content: accumulatedBuffer,
                loading: false,
                streaming: true
              }
            }
            return msg
          }))
        },
        // onError 回调
        (error: string) => {
          console.error('Stream error:', error)
          setStreamingState(prev => ({
            ...prev,
            error,
            isStreaming: false
          }))

          // 更新消息显示错误
          setDisplayList(prev => prev.map(msg => {
            if (msg.id === aiMessageId) {
              return {
                ...msg,
                content: accumulatedBuffer || `Error: ${error}`,
                loading: false,
                streaming: false
              }
            }
            return msg
          }))

          setLoading(false)
        },
        controller.signal
      )

      // 流式完成
      setStreamingState(prev => ({
        ...prev,
        isStreaming: false,
        currentMessageId: null
      }))

      // 更新最终消息
      setMessages(prev => prev.map(msg => {
        if (msg.id === aiMessageId) {
          return {
            ...msg,
            content: accumulatedBuffer,
            loading: false,
            streaming: false
          }
        }
        return msg
      }))

      setDisplayList(prev => prev.map(msg => {
        if (msg.id === aiMessageId) {
          return {
            ...msg,
            content: accumulatedBuffer,
            loading: false,
            streaming: false
          }
        }
        return msg
      }))

      setLoading(false)
    } catch (error) {
      console.error('Stream processing error:', error)
      setLoading(false)
      cleanupStream()
    }
  }

  // 处理发送消息
  const handleSendMessage = (message: string) => {
    if (!message.trim() || loading) return

    // 添加用户消息
    const userMessage: ChatMessageType = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setDisplayList(prev => [...prev, userMessage])

    // 开始 AI 响应
    startAIStream(message)
  }

  // 处理复制
  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  // 处理重新生成
  const handleRegenerate = (messageId: string) => {
    // 找到要重新生成的消息之前的用户消息
    const messageIndex = messages.findIndex(msg => msg.id === messageId)
    if (messageIndex > 0) {
      const userMessage = messages[messageIndex - 1]
      if (userMessage.type === 'user') {
        // 移除当前 AI 消息和之后的所有消息
        const newMessages = messages.slice(0, messageIndex)
        setMessages(newMessages)
        setDisplayList(newMessages)

        // 重新发送用户消息
        startAIStream(userMessage.content)
      }
    }
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {displayList.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            Start a conversation with Gemini 3
          </div>
        ) : (
          displayList.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onCopy={handleCopy}
              onRegenerate={handleRegenerate}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 输入框 */}
      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={loading}
        loading={streamingState.isStreaming}
        onStopGeneration={handleStopGeneration}
        placeholder="Type your message..."
      />
    </div>
  )
}

export default ChatContainer


import { useState, useRef, useEffect, useMemo, useImperativeHandle, forwardRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import type { ChatMessage as ChatMessageType, AIMessage, StreamingState } from '../../types/chat'
import { createOpenAIClient } from '../../services/ai/openai'
import { getApiKey, getBaseUrl, getDefaultModel, getDefaultProvider } from '../../services/ai/api'

interface ChatContainerProps {
  initialMessage?: string
  showInput?: boolean // 是否显示输入框，默认 true
}

// 暴露给父组件的方法
export interface ChatContainerRef {
  sendMessage: (message: string) => void
}

export const ChatContainer = forwardRef<ChatContainerRef, ChatContainerProps>(({
  initialMessage,
  showInput = true
}, ref) => {
  const { t } = useTranslation()
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const [displayList, setDisplayList] = useState<ChatMessageType[]>([])
  const [loading, setLoading] = useState(false)
  const [streamingState, setStreamingState] = useState<StreamingState>({
    isStreaming: false,
    currentMessageId: null,
    streamBuffer: '',
    error: null
  })
  const abortControllerRef = useRef<AbortController | null>(null)
  const messagesRef = useRef<ChatMessageType[]>([]) // 用于在异步操作中获取最新的消息列表
  const streamingUpdateTimer = useRef<number | null>(null) // 节流流式更新，减少频繁渲染抖动

  // 创建 AI 客户端
  const aiClient = useMemo(() => {
    try {
      // 使用 WorldBase（与 OpenAI 兼容）
      const provider = getDefaultProvider()
      const apiKey = getApiKey(provider)
      const baseUrl = getBaseUrl(provider)
      const model = getDefaultModel()
      console.log('[ChatContainer] Creating AI client:', { provider, model, baseUrl })
      return createOpenAIClient(apiKey, model, baseUrl)
    } catch (error) {
      console.error('Failed to create AI client:', error)
      return null
    }
  }, [])

  // 同步 messagesRef 和 messages 状态
  useEffect(() => {
    messagesRef.current = messages
  }, [messages])

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

      // 自动开始 AI 响应（显式传入最新的对话，避免首条消息时 history 为空）
      startAIStream(initialMessage, [userMessage])
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
  // overrideMessages: 在首条消息或重新生成时传入准确的对话历史，避免依赖异步的 messagesRef 更新导致空历史
  const startAIStream = async (userMessage: string, overrideMessages?: ChatMessageType[]) => {
    if (!aiClient) {
      console.error('[ChatContainer] AI client not initialized')
      return
    }

    console.log('[ChatContainer] Starting AI stream for message:', userMessage)

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

    // 更新消息列表（添加 AI 消息占位符）
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

    // 使用 ref 获取最新的消息列表来构建对话历史
    // 等待状态更新完成
    setTimeout(() => {
      // 使用 ref 获取最新的消息列表（已经通过 useEffect 同步更新）
      const currentMessages = overrideMessages ?? messagesRef.current
      
      // 构建对话历史（过滤掉空的 AI 消息占位符）
      const aiMessages: AIMessage[] = currentMessages
        .filter(msg => {
          // 如果是 AI 消息且内容为空，说明是占位符，跳过（除了当前正在创建的）
          if (msg.type === 'ai' && !msg.content && msg.id !== aiMessageId) {
            return false
          }
          return true
        })
        .map(msg => ({
          role: msg.type === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.content
        }))
      
      console.log('[ChatContainer] Built AI messages:', aiMessages.length, 'messages')
      console.log('[ChatContainer] AI messages:', aiMessages)
      
      let accumulatedBuffer = ''
      const flushStreamingUpdate = () => {
        // 仅在存在新内容时更新 UI，减少 re-render 频率
        setDisplayList(prevList => prevList.map(msg => {
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
      }
      
      if (!aiClient) {
        console.error('[ChatContainer] AI client is null in setTimeout')
        setLoading(false)
        return
      }
      
      aiClient.createChatCompletionStream(
        aiMessages,
        // onChunk 回调
        (content: string) => {
          accumulatedBuffer += content

          // 节流渲染，降低抖动
          if (streamingUpdateTimer.current === null) {
            streamingUpdateTimer.current = window.setTimeout(() => {
              flushStreamingUpdate()
              streamingUpdateTimer.current = null
            }, 50) // 每 50ms 刷新一次
          }
        },
        // onError 回调
        (error: string) => {
          console.error('[ChatContainer] Stream error:', error)
          setStreamingState(prevState => ({
            ...prevState,
            error,
            isStreaming: false
          }))

          // 更新消息显示错误
          setDisplayList(prevList => prevList.map(msg => {
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
      ).then(() => {
        // 补一次最终刷新，确保尾段显示
        if (streamingUpdateTimer.current !== null) {
          clearTimeout(streamingUpdateTimer.current)
          streamingUpdateTimer.current = null
        }
        flushStreamingUpdate()
        // 流式完成 - React 18 会自动批处理这些更新
        const finalMessage = {
          content: accumulatedBuffer,
          loading: false,
          streaming: false
        }

        setDisplayList(prevList => prevList.map(msg => {
          if (msg.id === aiMessageId) {
            return {
              ...msg,
              ...finalMessage
            }
          }
          return msg
        }))

        setMessages(prevMsgs => prevMsgs.map(msg => {
          if (msg.id === aiMessageId) {
            return {
              ...msg,
              ...finalMessage
            }
          }
          return msg
        }))

        setStreamingState(prevState => ({
          ...prevState,
          isStreaming: false,
          currentMessageId: null,
          streamBuffer: accumulatedBuffer
        }))

        setLoading(false)
      }).catch((error) => {
        console.error('[ChatContainer] Stream promise error:', error)
        setLoading(false)
        cleanupStream()
      })
    }, 0)
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

    const conversationForAI = [...messagesRef.current, userMessage]

    setMessages(prev => [...prev, userMessage])
    setDisplayList(prev => [...prev, userMessage])

    // 开始 AI 响应（传入最新对话，避免首条消息时 history 为空）
    startAIStream(message, conversationForAI)
  }

  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    sendMessage: handleSendMessage
  }))

  // 处理复制 - 使用 useCallback 优化
  const handleCopy = useCallback((content: string) => {
    navigator.clipboard.writeText(content)
  }, [])

  // 处理重新生成 - 使用 useCallback 优化
  const handleRegenerate = useCallback((messageId: string) => {
    // 使用 ref 获取最新的消息列表，避免闭包问题
    const currentMessages = messagesRef.current
    const messageIndex = currentMessages.findIndex(msg => msg.id === messageId)
    if (messageIndex > 0) {
      const userMessage = currentMessages[messageIndex - 1]
      if (userMessage.type === 'user') {
        // 移除当前 AI 消息和之后的所有消息
        const newMessages = currentMessages.slice(0, messageIndex)
        setMessages(newMessages)
        setDisplayList(newMessages)

        // 重新发送用户消息（使用最新对话）
        startAIStream(userMessage.content, newMessages)
      }
    }
  }, [])

  return (
    <div className="flex flex-col h-full bg-white">
      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {displayList.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            {t('chat.startConversation')}
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
      </div>

      {/* 输入框 - 可选 */}
      {showInput && (
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={loading}
          loading={streamingState.isStreaming}
          onStopGeneration={handleStopGeneration}
          placeholder={t('chat.typeMessage')}
        />
      )}
    </div>
  )
})

ChatContainer.displayName = 'ChatContainer'

export default ChatContainer


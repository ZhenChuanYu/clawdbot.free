// 聊天相关类型定义

export interface ChatMessage {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  loading?: boolean
  streaming?: boolean
  modelName?: string
  attachedFiles?: Array<{
    id: string
    url: string
    type: 'image' | 'file'
    name?: string
    size?: number
  }>
}

export interface AIMessage {
  role: 'user' | 'assistant' | 'system'
  content: string | Array<{
    type: 'text' | 'image_url'
    text?: string
    image_url?: {
      url: string
      detail?: 'low' | 'high' | 'auto'
    }
  }>
}

export interface StreamingState {
  isStreaming: boolean
  currentMessageId: string | null
  streamBuffer: string
  error: string | null
}

export interface AttachedFile {
  id: string
  url: string
  type: 'image' | 'file'
  name?: string
  size?: number
}


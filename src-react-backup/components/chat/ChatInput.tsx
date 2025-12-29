import React, { useState, useRef, useEffect } from 'react'
import { Send, Square } from 'lucide-react'
import type { AttachedFile } from '../../types/chat'

interface ChatInputProps {
  onSendMessage: (message: string, attachedFiles?: AttachedFile[]) => void
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  onStopGeneration?: () => void
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  placeholder = 'Type your message...',
  disabled = false,
  loading = false,
  onStopGeneration
}) => {
  const [inputValue, setInputValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // 自动调整 textarea 高度
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [inputValue])

  const handleSend = () => {
    const trimmedValue = inputValue.trim()
    if (trimmedValue && !disabled && !loading) {
      onSendMessage(trimmedValue)
      setInputValue('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <div className="flex items-end gap-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || loading}
            rows={1}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            style={{ minHeight: '48px', maxHeight: '200px' }}
          />
        </div>
        {/* 发送按钮 - 圆形设计，与参考项目一致 */}
        <button
          onClick={loading && onStopGeneration ? onStopGeneration : handleSend}
          disabled={!loading && (!inputValue.trim() || disabled)}
          className={`
            relative flex-shrink-0 w-8 h-8 rounded-full transition-all duration-300 ease-in-out
            flex items-center justify-center group overflow-hidden
            ${loading
              ? 'shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer'
              : !inputValue.trim() || disabled
                ? 'cursor-not-allowed'
                : 'shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer'
            }
          `}
        >
          {/* 外围圆线 */}
          <div className={`
            absolute inset-0 rounded-full transition-all duration-300 ease-in-out
            border-[2px]
            ${loading
              ? 'border-red-400/60'
              : !inputValue.trim() || disabled
                ? 'border-gray-400/30'
                : 'border-gray-700/60'
            }
          `}></div>

          {/* 内层圆形按钮 */}
          <div className={`
            rounded-full flex items-center justify-center transition-all duration-300 ease-in-out relative
            w-[26px] h-[26px]
            ${loading
              ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
              : !inputValue.trim() || disabled
                ? 'bg-gray-300'
                : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900'
            }
          `}>
            {/* 背景光效 */}
            {(loading || (!loading && inputValue.trim() && !disabled)) && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/30 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            )}

            {/* 图标容器 */}
            <div className="relative z-10 flex items-center justify-center">
              {loading ? (
                <Square className="w-3 h-3 text-white" fill="currentColor" />
              ) : (
                <Send className={`w-4 h-4 transition-colors duration-200 ${
                  !loading && inputValue.trim() && !disabled
                    ? 'text-white'
                    : 'text-gray-500'
                }`} />
              )}
            </div>

            {/* 悬停时的光晕效果 */}
            {loading && (
              <div className="absolute inset-0 bg-red-400/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            )}
            {(!loading && inputValue.trim() && !disabled) && (
              <div className="absolute inset-0 bg-gray-700/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            )}
          </div>
        </button>
      </div>
    </div>
  )
}


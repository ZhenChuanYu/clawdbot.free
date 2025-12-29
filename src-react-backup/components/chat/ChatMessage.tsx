import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '../ui/Card'
import { Toast, useToast } from '../ui/Toast'
import { Copy, RotateCcw } from 'lucide-react'
import type { ChatMessage as ChatMessageType } from '../../types/chat'

interface ChatMessageProps {
  message: ChatMessageType
  onCopy?: (content: string) => void
  onRegenerate?: (messageId: string) => void
  onOpenImageViewer?: (imageUrl: string, imageName?: string) => void
}

// 简单的Markdown解析函数
const parseMarkdown = (text: string, onOpenImageViewer?: (imageUrl: string, imageName?: string) => void): React.ReactNode => {
  // 处理行内格式的通用函数
  const processInlineFormats = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // 粗体
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // 斜体
      .replace(/~~(.*?)~~/g, '<del class="line-through">$1</del>') // 删除线
      .replace(/`([^`]+)`/g, (_match, code) => {
        // 对行内代码中的HTML标签进行转义，确保显示为文本
        const escapedCode = code
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;')
        return `<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">${escapedCode}</code>`
      }) // 行内代码
      // 行内图片 - 在链接之前处理
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_match, altText, imageUrl) => {
        // 使用 data 属性存储图片信息，稍后通过 React 处理点击事件
        return `<img src="${imageUrl}" alt="${altText}" class="inline-block max-w-full h-auto rounded-lg shadow-md cursor-pointer hover:opacity-80 transition-opacity my-2" data-img-url="${imageUrl}" data-img-alt="${altText}" />`
      })
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">$1</a>') // 链接
      // 将emoji字符包装在特殊的span中
      .replace(/([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F000}-\u{1F02F}]|[\u{1F0A0}-\u{1F0FF}]|[\u{1F100}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}])/gu, '<span class="emoji">$1</span>')
  }

  // 分割文本为行
  const lines = text.split('\n')
  const elements: React.ReactNode[] = []

  let i = 0
  while (i < lines.length) {
    const line = lines[i]

    // 代码块
    if (line.startsWith('```')) {
      const codeLines: string[] = []
      i++ // 跳过开始标记
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      i++ // 跳过结束标记

      elements.push(
        <pre key={`code-${i}`} className="bg-gray-100 rounded-lg p-4 overflow-x-auto my-2 text-sm emoji-support">
          <code className="emoji-support">{codeLines.join('\n')}</code>
        </pre>
      )
      continue
    }

    // 分隔线
    if (line.trim() === '---' || line.trim() === '***' || line.trim() === '___') {
      elements.push(
        <hr key={`hr-${i}`} className="my-4 border-t border-gray-300" />
      )
    }
    // 图片
    else if (line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/)) {
      const match = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
      if (match) {
        const altText = match[1]
        const imageUrl = match[2]
        elements.push(
          <div key={`img-${i}`} className="my-4 text-center">
            <img
              src={imageUrl}
              alt={altText}
              className="max-w-full h-auto rounded-lg shadow-md mx-auto cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => onOpenImageViewer?.(imageUrl, altText || 'Image')}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                const errorDiv = document.createElement('div')
                errorDiv.className = 'text-gray-500 text-sm p-4 border border-gray-300 rounded-lg bg-gray-50'
                errorDiv.textContent = `Image loading failed: ${altText || imageUrl}`
                target.parentNode?.appendChild(errorDiv)
              }}
            />
            {altText && (
              <p className="text-sm text-gray-600 mt-2 italic">{altText}</p>
            )}
          </div>
        )
      }
    }
    // 标题
    else if (line.startsWith('###### ')) {
      const titleText = line.substring(7)
      elements.push(
        <h6 key={`h6-${i}`} className="text-xs font-bold my-1 emoji-support" dangerouslySetInnerHTML={{ __html: processInlineFormats(titleText) }} />
      )
    } else if (line.startsWith('##### ')) {
      const titleText = line.substring(6)
      elements.push(
        <h5 key={`h5-${i}`} className="text-sm font-bold my-1 emoji-support" dangerouslySetInnerHTML={{ __html: processInlineFormats(titleText) }} />
      )
    } else if (line.startsWith('#### ')) {
      const titleText = line.substring(5)
      elements.push(
        <h4 key={`h4-${i}`} className="text-sm font-bold my-2 emoji-support" dangerouslySetInnerHTML={{ __html: processInlineFormats(titleText) }} />
      )
    } else if (line.startsWith('### ')) {
      const titleText = line.substring(4)
      elements.push(
        <h3 key={`h3-${i}`} className="text-base font-bold my-2 emoji-support" dangerouslySetInnerHTML={{ __html: processInlineFormats(titleText) }} />
      )
    } else if (line.startsWith('## ')) {
      const titleText = line.substring(3)
      elements.push(
        <h2 key={`h2-${i}`} className="text-lg font-bold my-2 emoji-support" dangerouslySetInnerHTML={{ __html: processInlineFormats(titleText) }} />
      )
    } else if (line.startsWith('# ')) {
      const titleText = line.substring(2)
      elements.push(
        <h1 key={`h1-${i}`} className="text-xl font-bold my-3 emoji-support" dangerouslySetInnerHTML={{ __html: processInlineFormats(titleText) }} />
      )
    }
    // 表格
    else if (line.includes('|') && line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const tableRows: string[] = [line]
      i++

      // 检查下一行是否是表头分隔符
      if (i < lines.length && lines[i].includes('|') && lines[i].includes('-')) {
        i++ // 跳过分隔符行

        // 收集表格的其余行
        while (i < lines.length && lines[i].includes('|') && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
          tableRows.push(lines[i])
          i++
        }
        i-- // 回退一行，因为外层循环会递增

        // 解析表格
        const headerCells = tableRows[0].split('|').slice(1, -1).map(cell => cell.trim())
        const bodyRows = tableRows.slice(1).map(row =>
          row.split('|').slice(1, -1).map(cell => cell.trim())
        )

        elements.push(
          <div key={`table-${i}`} className="my-4 overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 emoji-support">
              <thead>
                <tr className="bg-gray-50">
                  {headerCells.map((cell, idx) => (
                    <th key={idx} className="border border-gray-300 px-4 py-2 text-left font-semibold emoji-support" dangerouslySetInnerHTML={{ __html: processInlineFormats(cell) }} />
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, rowIdx) => (
                  <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="border border-gray-300 px-4 py-2 emoji-support" dangerouslySetInnerHTML={{ __html: processInlineFormats(cell) }} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      } else {
        // 如果不是标准表格格式，当作普通文本处理
        i--
        const processedLine = processInlineFormats(line)
        elements.push(
          <p key={`p-${i}`} className="mb-2 emoji-support" dangerouslySetInnerHTML={{ __html: processedLine }} />
        )
      }
    }
    // 引用
    else if (line.startsWith('> ')) {
      const quoteText = line.substring(2)
      elements.push(
        <blockquote key={`quote-${i}`} className="border-l-4 border-gray-300 pl-4 my-2 italic text-gray-600 emoji-support" dangerouslySetInnerHTML={{ __html: processInlineFormats(quoteText) }} />
      )
    }
    // 列表项
    else if (line.match(/^[-*]\s/)) {
      const listItems: string[] = [line.substring(2)]
      i++
      while (i < lines.length && lines[i].match(/^[-*]\s/)) {
        listItems.push(lines[i].substring(2))
        i++
      }
      i--

      elements.push(
        <ul key={`ul-${i}`} className="list-disc list-inside my-2 space-y-1 emoji-support">
          {listItems.map((item, idx) => (
            <li key={idx} className="emoji-support" dangerouslySetInnerHTML={{ __html: processInlineFormats(item) }} />
          ))}
        </ul>
      )
    }
    // 有序列表
    else if (line.match(/^\d+\.\s/)) {
      const listItems: Array<{ number: number, content: string }> = []
      const firstMatch = line.match(/^(\d+)\.\s(.+)$/)
      if (firstMatch) {
        listItems.push({ number: parseInt(firstMatch[1]), content: firstMatch[2] })
      }
      i++
      while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
        const match = lines[i].match(/^(\d+)\.\s(.+)$/)
        if (match) {
          listItems.push({ number: parseInt(match[1]), content: match[2] })
        }
        i++
      }
      i--

      elements.push(
        <ol key={`ol-${i}`} className="list-decimal list-inside my-2 space-y-1 emoji-support" start={listItems[0]?.number || 1}>
          {listItems.map((item, idx) => (
            <li key={idx} className="emoji-support" dangerouslySetInnerHTML={{ __html: processInlineFormats(item.content) }} />
          ))}
        </ol>
      )
    }
    // 空行
    else if (line.trim() === '') {
      elements.push(<br key={`br-${i}`} />)
    }
    // 普通文本
    else {
      // 处理行内格式
      const processedLine = processInlineFormats(line)

      elements.push(
        <p
          key={`p-${i}`}
          className="mb-2 emoji-support"
          dangerouslySetInnerHTML={{ __html: processedLine }}
          onClick={(e) => {
            // 处理行内图片的点击事件
            const target = e.target as HTMLElement
            if (target.tagName === 'IMG' && target.hasAttribute('data-img-url')) {
              const imgUrl = target.getAttribute('data-img-url')
              const imgAlt = target.getAttribute('data-img-alt')
              if (imgUrl && onOpenImageViewer) {
                onOpenImageViewer(imgUrl, imgAlt || 'Image')
              }
            }
          }}
        />
      )
    }

    i++
  }

  return elements.length > 0 ? elements : text
}

export const ChatMessage: React.FC<ChatMessageProps> = memo(({
  message,
  onCopy,
  onRegenerate,
  onOpenImageViewer
}) => {
  const { t } = useTranslation()
  const { toast, showToast, hideToast } = useToast()
  const isUser = message.type === 'user'
  const isAI = message.type === 'ai'
  // 流式阶段仅做纯文本渲染，避免 Markdown 结构逐步成形导致布局抖动
  const shouldRenderPlainStreaming =
    isAI &&
    message.streaming &&
    !message.thinkingContent &&
    !message.answerContent

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      showToast(t('chat.copied'))

      if (onCopy) {
        onCopy(message.content)
      }
    } catch (error) {
      console.error('Copy failed:', error)
      showToast(t('chat.copyFailed'))
    }
  }

  const handleRegenerate = () => {
    if (onRegenerate) {
      onRegenerate(message.id)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (message.loading) {
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`flex items-start space-x-3 max-w-[80%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <Card variant="default" className={`p-4 ${isUser ? '!bg-gray-100 !text-gray-900 !backdrop-blur-none !shadow-none !border-none' : 'bg-gray-50 !shadow-sm !border !border-gray-100 hover:!shadow-sm hover:!border-gray-100'}`}>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <span className="text-sm text-gray-500">Thinking...</span>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`flex items-start space-x-3 max-w-[80%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <div className="flex flex-col">
            <Card
              variant="default"
              className={`p-4 ${isUser ? '!bg-gray-100 !text-gray-900 !backdrop-blur-none !shadow-none !border-none' : '!shadow-sm !border !border-gray-100 hover:!shadow-sm hover:!border-gray-100'}`}
            >

              {/* 显示附件图片 */}
              {message.attachedFiles && message.attachedFiles.length > 0 && (
                <div className="mb-3">
                  <div className="flex flex-wrap gap-2">
                    {message.attachedFiles.map((file) => (
                      file.type === 'image' && (
                        <div key={file.id} className="relative">
                          <img
                            src={file.httpsUrl || file.url}
                            alt={file.name || 'Attached Image'}
                            className="max-w-full h-auto rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:opacity-80 transition-opacity"
                            style={{ maxHeight: '200px', maxWidth: '200px' }}
                            onClick={() => onOpenImageViewer?.(file.url || file.httpsUrl || '', file.name || 'Attached Image')}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                            }}
                          />
                          {file.uploadStatus === 'failed' && (
                            <div className="absolute inset-0 bg-red-500/80 flex items-center justify-center rounded-lg">
                              <div className="text-white text-xs text-center">
                                <div>Failed</div>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              <div className={`text-sm leading-relaxed emoji-support ${isUser ? 'text-gray-900' : ''}`}>
                {isAI ? (
                  <>
                    {/* 思考过程 - 灰色背景 */}
                    {message.thinkingContent && (
                      <div className="thinking-section">
                        <div className="thinking-content">
                          {parseMarkdown(message.thinkingContent, onOpenImageViewer)}
                        </div>
                      </div>
                    )}

                    {/* 视觉分隔线 */}
                    {message.thinkingContent && message.answerContent && (
                      <hr className="my-4 border-t border-gray-300" />
                    )}

                    {/* 最终答案 - 正常样式 */}
                    {message.answerContent ? (
                      <div className="answer-section">
                        {parseMarkdown(message.answerContent, onOpenImageViewer)}
                        {message.streaming && <span className="streaming-cursor"></span>}
                      </div>
                    ) : shouldRenderPlainStreaming ? (
                      <div className="whitespace-pre-wrap break-words leading-relaxed font-[system-ui]">
                        {message.displayContent || message.content}
                        <span className="streaming-cursor"></span>
                      </div>
                    ) : !message.thinkingContent ? (
                      <>
                        {parseMarkdown(message.displayContent || message.content, onOpenImageViewer)}
                        {message.streaming && <span className="streaming-cursor"></span>}
                      </>
                    ) : message.streaming ? (
                      <span className="streaming-cursor"></span>
                    ) : null}
                  </>
                ) : (
                  <div className="whitespace-normal emoji-support">{message.displayContent || message.content}</div>
                )}
              </div>
            </Card>

            <div className={`flex items-center space-x-2 mt-2 text-xs text-gray-500 ${isUser ? 'justify-end' : 'justify-start'}`}>
              <span>{formatTime(message.timestamp)}</span>

              {/* 显示模型信息 - 简洁展示设计 - 暂时隐藏 */}
              {/* {isAI && message.modelName && (
                <span className="px-1.5 py-0.5 rounded-full text-[10.5px] font-medium flex-shrink-0
                  bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border border-blue-300/50 shadow-sm">
                  {message.modelName}
                </span>
              )} */}

              {isAI && !message.loading && (message.content.trim() || message.displayContent?.trim()) && (
                <>
                  <button
                    onClick={handleRegenerate}
                    className="p-1 h-6 w-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors [&_svg]:text-gray-600"
                    title="Regenerate"
                  >
                    <RotateCcw className="w-[17px] h-[17px] !text-gray-600" />
                  </button>
                  <button
                    onClick={handleCopy}
                    className="p-1 h-6 w-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors [&_svg]:text-gray-600"
                    title="Copy"
                  >
                    <Copy className="w-[17px] h-[17px] !text-gray-600" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toast 提示 */}
      <Toast
        message={toast.message}
        show={toast.show}
        onClose={hideToast}
      />
    </>
  )
})

ChatMessage.displayName = 'ChatMessage'

export default ChatMessage

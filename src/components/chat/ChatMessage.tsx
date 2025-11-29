import React from 'react'
import { Copy, RotateCcw } from 'lucide-react'
import type { ChatMessage as ChatMessageType } from '../../types/chat'

interface ChatMessageProps {
  message: ChatMessageType
  onCopy?: (content: string) => void
  onRegenerate?: (messageId: string) => void
}

// 简单的 Markdown 解析函数
const parseMarkdown = (text: string): React.ReactNode => {
  // 处理行内格式
  const processInlineFormats = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // 粗体
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // 斜体
      .replace(/~~(.*?)~~/g, '<del class="line-through">$1</del>') // 删除线
      .replace(/`([^`]+)`/g, (match, code) => {
        const escapedCode = code
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;')
        return `<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">${escapedCode}</code>`
      }) // 行内代码
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">$1</a>') // 链接
  }

  const lines = text.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // 代码块
    if (line.startsWith('```')) {
      const codeLines: string[] = []
      i++
      const language = lines[i - 1].substring(3).trim() || ''
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      i++

      elements.push(
        <pre key={`code-${i}`} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto my-2 text-sm">
          {language && <div className="text-xs text-gray-500 mb-2">{language}</div>}
          <code>{codeLines.join('\n')}</code>
        </pre>
      )
      continue
    }

    // 分隔线
    if (line.trim() === '---' || line.trim() === '***' || line.trim() === '___') {
      elements.push(<hr key={`hr-${i}`} className="my-4 border-t border-gray-300" />)
      i++
      continue
    }

    // 标题
    if (line.startsWith('###### ')) {
      const titleText = line.substring(7)
      elements.push(
        <h6 key={`h6-${i}`} className="text-xs font-bold my-1" dangerouslySetInnerHTML={{ __html: processInlineFormats(titleText) }} />
      )
    } else if (line.startsWith('##### ')) {
      const titleText = line.substring(6)
      elements.push(
        <h5 key={`h5-${i}`} className="text-sm font-bold my-1" dangerouslySetInnerHTML={{ __html: processInlineFormats(titleText) }} />
      )
    } else if (line.startsWith('#### ')) {
      const titleText = line.substring(5)
      elements.push(
        <h4 key={`h4-${i}`} className="text-sm font-bold my-2" dangerouslySetInnerHTML={{ __html: processInlineFormats(titleText) }} />
      )
    } else if (line.startsWith('### ')) {
      const titleText = line.substring(4)
      elements.push(
        <h3 key={`h3-${i}`} className="text-base font-bold my-2" dangerouslySetInnerHTML={{ __html: processInlineFormats(titleText) }} />
      )
    } else if (line.startsWith('## ')) {
      const titleText = line.substring(3)
      elements.push(
        <h2 key={`h2-${i}`} className="text-lg font-bold my-2" dangerouslySetInnerHTML={{ __html: processInlineFormats(titleText) }} />
      )
    } else if (line.startsWith('# ')) {
      const titleText = line.substring(2)
      elements.push(
        <h1 key={`h1-${i}`} className="text-xl font-bold my-3" dangerouslySetInnerHTML={{ __html: processInlineFormats(titleText) }} />
      )
    }
    // 引用
    else if (line.startsWith('> ')) {
      const quoteText = line.substring(2)
      elements.push(
        <blockquote key={`quote-${i}`} className="border-l-4 border-gray-300 pl-4 my-2 italic text-gray-600" dangerouslySetInnerHTML={{ __html: processInlineFormats(quoteText) }} />
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
        <ul key={`ul-${i}`} className="list-disc list-inside my-2 space-y-1">
          {listItems.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: processInlineFormats(item) }} />
          ))}
        </ul>
      )
    }
    // 有序列表
    else if (line.match(/^\d+\.\s/)) {
      const listItems: string[] = [line.replace(/^\d+\.\s/, '')]
      i++
      while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
        listItems.push(lines[i].replace(/^\d+\.\s/, ''))
        i++
      }
      i--

      elements.push(
        <ol key={`ol-${i}`} className="list-decimal list-inside my-2 space-y-1">
          {listItems.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: processInlineFormats(item) }} />
          ))}
        </ol>
      )
    }
    // 普通文本
    else if (line.trim()) {
      const processedLine = processInlineFormats(line)
      elements.push(
        <p key={`p-${i}`} className="mb-2" dangerouslySetInnerHTML={{ __html: processedLine }} />
      )
    } else {
      // 空行
      elements.push(<br key={`br-${i}`} />)
    }

    i++
  }

  return <div>{elements}</div>
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onCopy,
  onRegenerate
}) => {
  const handleCopy = () => {
    if (onCopy) {
      onCopy(message.content)
    } else {
      navigator.clipboard.writeText(message.content)
    }
  }

  const isUser = message.type === 'user'

  return (
    <div className={`flex gap-4 mb-6 ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* 头像 */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-gray-900 text-white' : 'bg-blue-500 text-white'
      }`}>
        {isUser ? 'U' : 'AI'}
      </div>

      {/* 消息内容 */}
      <div className={`flex-1 ${isUser ? 'text-right' : ''}`}>
        <div className={`inline-block max-w-[80%] rounded-lg p-4 ${
          isUser
            ? 'bg-gray-900 text-white'
            : 'bg-gray-100 text-gray-900'
        }`}>
          {/* 附件图片 */}
          {message.attachedFiles && message.attachedFiles.length > 0 && (
            <div className="mb-2 space-y-2">
              {message.attachedFiles.map((file) => (
                file.type === 'image' && (
                  <img
                    key={file.id}
                    src={file.url}
                    alt={file.name || 'Image'}
                    className="max-w-full h-auto rounded-lg"
                  />
                )
              ))}
            </div>
          )}

          {/* 消息内容 */}
          {message.loading ? (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          ) : message.streaming ? (
            <div>
              {parseMarkdown(message.content)}
              <span className="inline-block w-2 h-4 bg-gray-400 ml-1 animate-pulse"></span>
            </div>
          ) : (
            parseMarkdown(message.content)
          )}

          {/* 模型名称 */}
          {!isUser && message.modelName && (
            <div className="text-xs text-gray-500 mt-2">
              {message.modelName}
            </div>
          )}
        </div>

        {/* 操作按钮 */}
        {!isUser && !message.loading && (
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={handleCopy}
              className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
              title="Copy"
            >
              <Copy className="w-3 h-3" />
              Copy
            </button>
            {onRegenerate && (
              <button
                onClick={() => onRegenerate(message.id)}
                className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                title="Regenerate"
              >
                <RotateCcw className="w-3 h-3" />
                Regenerate
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}


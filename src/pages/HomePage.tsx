import { useState, lazy, Suspense, useRef, useEffect, forwardRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Brain, Code, Zap, Shield, Globe, MessageSquare, Target, Laptop, Palette, Send, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { ChatContainerRef } from '../components/chat/ChatContainer'

// 延迟加载 ChatContainer
const ChatContainer = lazy(() => import('../components/chat/ChatContainer'))

// ChatContainer 包装组件，用于传递 ref
const ChatContainerWrapper = forwardRef<ChatContainerRef, { initialMessage?: string }>(({ initialMessage }, ref) => {
  return <ChatContainer ref={ref} initialMessage={initialMessage} showInput={false} />
})

ChatContainerWrapper.displayName = 'ChatContainerWrapper'

export default function HomePage() {
  const { t } = useTranslation()
  const [hasStartedChat, setHasStartedChat] = useState(false)
  const [initialMessage, setInitialMessage] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [pendingMessage, setPendingMessage] = useState<string | null>(null)
  const chatContainerRef = useRef<ChatContainerRef>(null)

  // 监听全局事件，打开聊天窗口
  useEffect(() => {
    const handleOpenChat = () => {
      if (!hasStartedChat) {
        setHasStartedChat(true)
        setInitialMessage('')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    window.addEventListener('openChat', handleOpenChat)
    return () => {
      window.removeEventListener('openChat', handleOpenChat)
    }
  }, [hasStartedChat])

  const handleSendFirstMessage = () => {
    const trimmedValue = inputValue.trim()
    if (trimmedValue && !hasStartedChat) {
      // 第一次发送：初始化聊天
      setInitialMessage(trimmedValue)
      setHasStartedChat(true)
      setInputValue('') // 清空输入框
    } else if (trimmedValue && hasStartedChat) {
      // 后续发送：通过状态触发
      setPendingMessage(trimmedValue)
      setInputValue('') // 清空输入框
    }
  }

  // 处理待发送的消息
  useEffect(() => {
    if (pendingMessage && chatContainerRef.current) {
      chatContainerRef.current.sendMessage(pendingMessage)
      setPendingMessage(null)
    }
  }, [pendingMessage])

  // 处理返回首页
  const handleBackToHome = () => {
    setHasStartedChat(false)
    setInitialMessage('')
    setInputValue('')
    setPendingMessage(null)
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // 注意：这里不重置 Context 的 isChatOpen，因为 Context 主要用于触发打开
  }

  // 处理打开 AI 对话窗口
  const handleOpenChat = () => {
    if (!hasStartedChat) {
      setHasStartedChat(true)
      setInitialMessage('')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendFirstMessage()
    }
  }
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-16">
        {/* Hero Section - Ultra Minimal */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-white to-white"></div>
          
          {/* Floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

          <div className="relative w-full max-w-5xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-full mb-8">
                <Sparkles className="w-3 h-3" />
                <span>{t('home.badge')}</span>
              </div>

              {/* Main Headline - H1 (Only One) */}
              <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-6 tracking-tight leading-none">
                {t('home.title')}
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-4 font-light max-w-3xl mx-auto">
                {t('home.subtitle')}
              </p>

              <p className="text-base md:text-lg text-gray-500 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
                {t('home.description')}
              </p>
            </motion.div>
          </div>

          {/* 输入框区域 - 初始状态在 Hero 区域 */}
          {!hasStartedChat && (
            <div className="relative w-full max-w-3xl mx-auto px-6 lg:px-8 mb-8">
              <div className="flex gap-4 items-center bg-white rounded-2xl shadow-lg border border-gray-200 p-6 focus-within:border-gray-400 focus-within:shadow-xl transition-all">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t('home.placeholder')}
                  className="flex-1 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-lg py-2"
                />
                {/* 发送按钮 - 圆形设计 */}
                <button
                  onClick={handleSendFirstMessage}
                  disabled={!inputValue.trim()}
                  className={`
                    relative flex-shrink-0 w-10 h-10 rounded-full transition-all duration-300 ease-in-out
                    flex items-center justify-center group overflow-hidden
                    ${!inputValue.trim()
                      ? 'cursor-not-allowed'
                      : 'shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer'
                    }
                  `}
                >
                  {/* 外围圆线 */}
                  <div className={`
                    absolute inset-0 rounded-full transition-all duration-300 ease-in-out
                    border-[2px]
                    ${!inputValue.trim()
                      ? 'border-gray-400/30'
                      : 'border-gray-700/60'
                    }
                  `}></div>

                  {/* 内层圆形按钮 */}
                  <div className={`
                    rounded-full flex items-center justify-center transition-all duration-300 ease-in-out relative
                    w-[32px] h-[32px]
                    ${!inputValue.trim()
                      ? 'bg-gray-300'
                      : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900'
                    }
                  `}>
                    {/* 背景光效 */}
                    {inputValue.trim() && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/30 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                    )}

                    {/* 图标容器 */}
                    <div className="relative z-10 flex items-center justify-center">
                      <Send className={`w-5 h-5 transition-colors duration-200 ${
                        inputValue.trim()
                          ? 'text-white'
                          : 'text-gray-500'
                      }`} />
                    </div>

                    {/* 悬停时的光晕效果 */}
                    {inputValue.trim() && (
                      <div className="absolute inset-0 bg-gray-700/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* CTA 和 Stats */}
          <div className="relative w-full max-w-5xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* CTA */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handleOpenChat}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all"
                >
                  {t('common.getStarted')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#capabilities"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 text-sm font-medium rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
                >
                  {t('home.viewCapabilities')}
                </a>
              </div>

              {/* Stats */}
              <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                {[
                  { value: '1501', label: t('home.stats.lmArenaElo') },
                  { value: '1M', label: t('home.stats.tokenContext') },
                  { value: '76.2%', label: t('home.stats.sweBench') },
                  { value: '91.9%', label: t('home.stats.gpqaDiamond') },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid - Minimal Cards */}
        <section id="features" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {t('home.featuresTitle')}
              </h2>
              <p className="text-lg text-gray-600 font-light">
                {t('home.featuresSubtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Brain,
                  title: t('home.features.reasoning.title'),
                  description: t('home.features.reasoning.description'),
                  gradient: 'from-blue-500 to-cyan-500',
                },
                {
                  icon: MessageSquare,
                  title: t('home.features.context.title'),
                  description: t('home.features.context.description'),
                  gradient: 'from-cyan-500 to-blue-500',
                },
                {
                  icon: Code,
                  title: t('home.features.coding.title'),
                  description: t('home.features.coding.description'),
                  gradient: 'from-purple-500 to-pink-500',
                },
                {
                  icon: Globe,
                  title: t('home.features.multimodal.title'),
                  description: t('home.features.multimodal.description'),
                  gradient: 'from-pink-500 to-rose-500',
                },
                {
                  icon: Zap,
                  title: t('home.features.leader.title'),
                  description: t('home.features.leader.description'),
                  gradient: 'from-orange-500 to-yellow-500',
                },
                {
                  icon: Shield,
                  title: t('home.features.safety.title'),
                  description: t('home.features.safety.description'),
                  gradient: 'from-green-500 to-emerald-500',
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative p-8 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`inline-flex p-3 bg-gradient-to-br ${feature.gradient} rounded-xl mb-6`}>
                    <feature.icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Breakthrough Capabilities - Clean Layout */}
        <section id="capabilities" className="py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {t('home.capabilitiesTitle')}
              </h2>
              <p className="text-lg text-gray-600 font-light">
                {t('home.capabilitiesSubtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: t('home.capabilities.reasoning.title'),
                  icon: Target,
                  metrics: [
                    { label: t('home.capabilities.reasoning.metrics.humanityExam.label'), value: '37.5%', desc: t('home.capabilities.reasoning.metrics.humanityExam.desc') },
                    { label: t('home.capabilities.reasoning.metrics.gpqaDiamond.label'), value: '91.9%', desc: t('home.capabilities.reasoning.metrics.gpqaDiamond.desc') },
                    { label: t('home.capabilities.reasoning.metrics.mathArena.label'), value: '23.4%', desc: t('home.capabilities.reasoning.metrics.mathArena.desc') },
                    { label: t('home.capabilities.reasoning.metrics.arcAgi.label'), value: '45.1%', desc: t('home.capabilities.reasoning.metrics.arcAgi.desc') },
                  ],
                },
                {
                  title: t('home.capabilities.coding.title'),
                  icon: Laptop,
                  metrics: [
                    { label: t('home.capabilities.coding.metrics.sweBench.label'), value: '76.2%', desc: t('home.capabilities.coding.metrics.sweBench.desc') },
                    { label: t('home.capabilities.coding.metrics.webDev.label'), value: '1487', desc: t('home.capabilities.coding.metrics.webDev.desc') },
                    { label: t('home.capabilities.coding.metrics.terminal.label'), value: '54.2%', desc: t('home.capabilities.coding.metrics.terminal.desc') },
                    { label: t('home.capabilities.coding.metrics.accuracy.label'), value: '+35%', desc: t('home.capabilities.coding.metrics.accuracy.desc') },
                  ],
                },
                {
                  title: t('home.capabilities.multimodal.title'),
                  icon: Palette,
                  metrics: [
                    { label: t('home.capabilities.multimodal.metrics.mmmuPro.label'), value: '81%', desc: t('home.capabilities.multimodal.metrics.mmmuPro.desc') },
                    { label: t('home.capabilities.multimodal.metrics.videoMmmu.label'), value: '87.6%', desc: t('home.capabilities.multimodal.metrics.videoMmmu.desc') },
                    { label: t('home.capabilities.multimodal.metrics.contextWindow.label'), value: '1M', desc: t('home.capabilities.multimodal.metrics.contextWindow.desc') },
                    { label: t('home.capabilities.multimodal.metrics.documentProcessing.label'), value: '+50%', desc: t('home.capabilities.multimodal.metrics.documentProcessing.desc') },
                  ],
                },
                {
                  title: t('home.capabilities.safety.title'),
                  icon: Shield,
                  metrics: [
                    { label: t('home.capabilities.safety.metrics.simpleQA.label'), value: '72.1%', desc: t('home.capabilities.safety.metrics.simpleQA.desc') },
                    { label: t('home.capabilities.safety.metrics.safetyFramework.label'), value: '✓', desc: t('home.capabilities.safety.metrics.safetyFramework.desc') },
                    { label: t('home.capabilities.safety.metrics.errorReduction.label'), value: '-30%', desc: t('home.capabilities.safety.metrics.errorReduction.desc') },
                    { label: t('home.capabilities.safety.metrics.promptInjection.label'), value: 'Low', desc: t('home.capabilities.safety.metrics.promptInjection.desc') },
                  ],
                },
              ].map((category, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-8 bg-white border border-gray-200 rounded-2xl"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="inline-flex p-2 bg-gray-100 rounded-lg">
                      <category.icon className="w-6 h-6 text-gray-900" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                  </div>
                  <div className="space-y-4">
                    {category.metrics.map((metric, j) => (
                      <div key={j} className="flex items-start justify-between gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{metric.label}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{metric.desc}</div>
                        </div>
                        <div className="text-lg font-bold text-gray-900">{metric.value}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section - Minimal */}
        <section id="about" className="py-32 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t('home.aboutTitle')}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {t('home.aboutDescription')}
              </p>
              <div className="inline-flex items-start gap-3 p-6 bg-gray-50 rounded-xl text-left max-w-2xl">
                <div className="flex-shrink-0 w-1 h-full bg-gray-300 rounded-full"></div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t('home.aboutNotice')}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Chat Section - 显示聊天界面（全屏模式） */}
        {hasStartedChat && (
          <section id="chat-area" className="fixed inset-0 top-16 bottom-20 bg-gray-50 z-40 overflow-hidden">
            <div className="h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="h-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden relative"
              >
                {/* 返回按钮 */}
                <button
                  onClick={handleBackToHome}
                  className="absolute top-4 left-4 z-50 p-2 rounded-lg bg-white hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900 shadow-md border border-gray-200 hover:border-gray-300"
                  title={t('common.backToHome')}
                  aria-label={t('common.backToHome')}
                >
                  <X className="w-5 h-5" />
                </button>
                <Suspense 
                  fallback={
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-500 text-sm">{t('home.loadingChatInterface')}</p>
                      </div>
                    </div>
                  }
                >
                  <ChatContainerWrapper ref={chatContainerRef} initialMessage={initialMessage} />
                </Suspense>
              </motion.div>
            </div>
          </section>
        )}

        {/* 悬浮输入框 - 固定在底部 */}
        {hasStartedChat && (
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex gap-3 items-center bg-white rounded-xl border border-gray-200 p-3 focus-within:border-gray-400 focus-within:bg-white transition-all">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t('home.continuePlaceholder')}
                  className="flex-1 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-base py-2"
                />
                {/* 发送按钮 - 圆形设计 */}
                <button
                  onClick={handleSendFirstMessage}
                  disabled={!inputValue.trim()}
                  className={`
                    relative flex-shrink-0 w-10 h-10 rounded-full transition-all duration-300 ease-in-out
                    flex items-center justify-center group overflow-hidden
                    ${!inputValue.trim()
                      ? 'cursor-not-allowed'
                      : 'shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer'
                    }
                  `}
                >
                  {/* 外围圆线 */}
                  <div className={`
                    absolute inset-0 rounded-full transition-all duration-300 ease-in-out
                    border-[2px]
                    ${!inputValue.trim()
                      ? 'border-gray-400/30'
                      : 'border-gray-700/60'
                    }
                  `}></div>

                  {/* 内层圆形按钮 */}
                  <div className={`
                    rounded-full flex items-center justify-center transition-all duration-300 ease-in-out relative
                    w-[32px] h-[32px]
                    ${!inputValue.trim()
                      ? 'bg-gray-300'
                      : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900'
                    }
                  `}>
                    {/* 背景光效 */}
                    {inputValue.trim() && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/30 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                    )}

                    {/* 图标容器 */}
                    <div className="relative z-10 flex items-center justify-center">
                      <Send className={`w-5 h-5 transition-colors duration-200 ${
                        inputValue.trim()
                          ? 'text-white'
                          : 'text-gray-500'
                      }`} />
                    </div>

                    {/* 悬停时的光晕效果 */}
                    {inputValue.trim() && (
                      <div className="absolute inset-0 bg-gray-700/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section - Bold & Simple */}
        <section id="get-started" className="py-32 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t('home.ctaTitle')}
              </h2>
              <p className="text-lg text-gray-400 mb-10 font-light">
                {t('home.ctaDescription')}
              </p>
              <button 
                onClick={handleOpenChat}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 text-base font-medium rounded-lg hover:bg-gray-100 transition-all"
              >
                {t('common.getStarted')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

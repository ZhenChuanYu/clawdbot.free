import { useState, lazy, Suspense, useRef, useEffect, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, Brain, Code, Zap, Shield, Globe, MessageSquare, Target, Laptop, Palette, Send, Square, X } from 'lucide-react'
import type { ChatContainerRef } from '../components/chat/ChatContainer'

// 延迟加载 ChatContainer
const ChatContainer = lazy(() => import('../components/chat/ChatContainer'))

// ChatContainer 包装组件，用于传递 ref
const ChatContainerWrapper = forwardRef<ChatContainerRef, { initialMessage?: string }>(({ initialMessage }, ref) => {
  return <ChatContainer ref={ref} initialMessage={initialMessage} showInput={false} />
})

ChatContainerWrapper.displayName = 'ChatContainerWrapper'

export default function HomePage() {
  const [hasStartedChat, setHasStartedChat] = useState(false)
  const [initialMessage, setInitialMessage] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [pendingMessage, setPendingMessage] = useState<string | null>(null)
  const chatContainerRef = useRef<ChatContainerRef>(null)

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
                <span>Released November 18, 2025</span>
              </div>

              {/* Main Headline - H1 (Only One) */}
              <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-6 tracking-tight leading-none">
                Gemini 3
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-4 font-light max-w-3xl mx-auto">
                Community platform for Gemini AI information
              </p>

              <p className="text-base md:text-lg text-gray-500 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
                Educational resources • Developer tutorials • Community support
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
                  placeholder="Ask Gemini 3 anything..."
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
                <a
                  href="#get-started"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#capabilities"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 text-sm font-medium rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
                >
                  View Capabilities
                </a>
              </div>

              {/* Stats */}
              <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                {[
                  { value: '1501', label: 'LMArena Elo' },
                  { value: '1M', label: 'Token Context' },
                  { value: '76.2%', label: 'SWE-bench' },
                  { value: '91.9%', label: 'GPQA Diamond' },
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
                Gemini 3 Information and Resources
              </h2>
              <p className="text-lg text-gray-600 font-light">
                Learn about Google's Gemini AI model capabilities
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Brain,
                  title: 'Gemini 3 PhD-Level Reasoning',
                  description: 'Gemini 3.0 achieves 91.9% GPQA Diamond • 37.5% Humanity\'s Last Exam • Deep Think mode',
                  gradient: 'from-blue-500 to-cyan-500',
                },
                {
                  icon: MessageSquare,
                  title: 'Gemini 3.0 Context Window',
                  description: 'Gemini 3 offers 1M token context to process entire codebases and massive documents',
                  gradient: 'from-cyan-500 to-blue-500',
                },
                {
                  icon: Code,
                  title: 'Gemini 3 Agentic Coding',
                  description: 'Gemini 3.0 scores 76.2% SWE-bench • 1487 Elo WebDev • 35% accuracy improvement',
                  gradient: 'from-purple-500 to-pink-500',
                },
                {
                  icon: Globe,
                  title: 'Gemini 3.0 Multimodal',
                  description: 'Gemini 3 achieves 81% MMMU-Pro • 87.6% Video-MMMU • Seamless multimodal fusion',
                  gradient: 'from-pink-500 to-rose-500',
                },
                {
                  icon: Zap,
                  title: 'Gemini 3 LMArena Leader',
                  description: 'Gemini 3.0 leads with 1501 Elo score • 23.4% MathArena Apex • State-of-the-art',
                  gradient: 'from-orange-500 to-yellow-500',
                },
                {
                  icon: Shield,
                  title: 'Gemini 3.0 Safety',
                  description: 'Gemini 3 provides 72.1% SimpleQA • Frontier Safety Framework • Industry-leading',
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
                Gemini 3 and Gemini 3.0 Performance
              </h2>
              <p className="text-lg text-gray-600 font-light">
                Gemini 3 sets new standards across all AI benchmarks
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Gemini 3 Reasoning',
                  icon: Target,
                  metrics: [
                    { label: 'Humanity\'s Last Exam', value: '37.5%', desc: 'Gemini 3 PhD-level' },
                    { label: 'GPQA Diamond', value: '91.9%', desc: 'Gemini 3.0 science' },
                    { label: 'MathArena Apex', value: '23.4%', desc: 'Gemini 3 math SOTA' },
                    { label: 'ARC-AGI-2', value: '45.1%', desc: 'Gemini 3.0 Deep Think' },
                  ],
                },
                {
                  title: 'Gemini 3.0 Coding',
                  icon: Laptop,
                  metrics: [
                    { label: 'SWE-bench Verified', value: '76.2%', desc: 'Gemini 3 engineering' },
                    { label: 'WebDev Arena', value: '1487', desc: 'Gemini 3.0 Elo' },
                    { label: 'Terminal-Bench 2.0', value: '54.2%', desc: 'Gemini 3 CLI' },
                    { label: 'Accuracy Improvement', value: '+35%', desc: 'Gemini 3.0 boost' },
                  ],
                },
                {
                  title: 'Gemini 3 Multimodal',
                  icon: Palette,
                  metrics: [
                    { label: 'MMMU-Pro', value: '81%', desc: 'Gemini 3.0 understanding' },
                    { label: 'Video-MMMU', value: '87.6%', desc: 'Gemini 3 video' },
                    { label: 'Context Window', value: '1M', desc: 'Gemini 3.0 tokens' },
                    { label: 'Document Processing', value: '+50%', desc: 'Gemini 3 docs' },
                  ],
                },
                {
                  title: 'Gemini 3.0 Safety',
                  icon: Shield,
                  metrics: [
                    { label: 'SimpleQA Verified', value: '72.1%', desc: 'Gemini 3 accuracy' },
                    { label: 'Safety Framework', value: '✓', desc: 'Gemini 3.0 certified' },
                    { label: 'Error Reduction', value: '-30%', desc: 'Gemini 3 tools' },
                    { label: 'Prompt Injection', value: 'Low', desc: 'Gemini 3.0 risk' },
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
                About Gemini 3 Platform
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Community-driven platform providing access to Google's most advanced AI model. 
                Built on Gemini 2.5 Pro with revolutionary upgrades in reasoning, multimodal understanding, 
                and agentic workflows.
              </p>
              <div className="inline-flex items-start gap-3 p-6 bg-gray-50 rounded-xl text-left max-w-2xl">
                <div className="flex-shrink-0 w-1 h-full bg-gray-300 rounded-full"></div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-gray-900">Important Notice:</strong> Gemini3.us is an independent 
                  enthusiast community and developer platform. We are not affiliated with, endorsed by, 
                  or officially connected to Google LLC. We provide paid access to Google's official 
                  Gemini API services to support our infrastructure and operations.
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
                  title="返回首页"
                  aria-label="返回首页"
                >
                  <X className="w-5 h-5" />
                </button>
                <Suspense 
                  fallback={
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-500 text-sm">Loading chat interface...</p>
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
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex gap-3 items-center bg-gray-50 rounded-xl border border-gray-200 p-3 focus-within:border-gray-400 focus-within:bg-white transition-all">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Continue the conversation..."
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
                Get Started with Gemini 3
              </h2>
              <p className="text-lg text-gray-400 mb-10 font-light">
                Access official Gemini 3.0 resources and community support
              </p>
              <button className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 text-base font-medium rounded-lg hover:bg-gray-100 transition-all">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

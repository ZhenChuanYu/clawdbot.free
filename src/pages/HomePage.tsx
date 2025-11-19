import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Brain, Code, Zap, Shield, Globe, MessageSquare } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-16">
        {/* Hero Section - Ultra Minimal */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-white to-white"></div>
          
          {/* Floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

          <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
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

              {/* Main Headline */}
              <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-6 tracking-tight leading-none">
                Gemini 3
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-4 font-light max-w-3xl mx-auto">
                Google's most advanced AI model
              </p>

              <p className="text-base md:text-lg text-gray-500 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
                PhD-level reasoning • 1M token context • Industry-leading multimodal capabilities
              </p>

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
                Core Capabilities
              </h2>
              <p className="text-lg text-gray-600 font-light">
                Built on Gemini 2.5 Pro with revolutionary upgrades
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Brain,
                  title: 'PhD-Level Reasoning',
                  description: '91.9% GPQA Diamond • 37.5% Humanity\'s Last Exam • Deep Think mode',
                  gradient: 'from-blue-500 to-cyan-500',
                },
                {
                  icon: MessageSquare,
                  title: '1M Token Context',
                  description: 'Process entire codebases, massive documents, or hours of video',
                  gradient: 'from-cyan-500 to-blue-500',
                },
                {
                  icon: Code,
                  title: 'Agentic Coding',
                  description: '76.2% SWE-bench • 1487 Elo WebDev • 35% accuracy improvement',
                  gradient: 'from-purple-500 to-pink-500',
                },
                {
                  icon: Globe,
                  title: 'Multimodal Mastery',
                  description: '81% MMMU-Pro • 87.6% Video-MMMU • Seamless fusion',
                  gradient: 'from-pink-500 to-rose-500',
                },
                {
                  icon: Zap,
                  title: 'LMArena Leader',
                  description: '1501 Elo score • 23.4% MathArena Apex • State-of-the-art',
                  gradient: 'from-orange-500 to-yellow-500',
                },
                {
                  icon: Shield,
                  title: 'Maximum Safety',
                  description: '72.1% SimpleQA • Frontier Safety Framework • Industry-leading',
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
                Breakthrough Performance
              </h2>
              <p className="text-lg text-gray-600 font-light">
                Setting new standards across all AI benchmarks
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Reasoning Excellence',
                  emoji: '🎯',
                  metrics: [
                    { label: 'Humanity\'s Last Exam', value: '37.5%', desc: 'PhD-level reasoning' },
                    { label: 'GPQA Diamond', value: '91.9%', desc: 'Graduate science' },
                    { label: 'MathArena Apex', value: '23.4%', desc: 'Mathematics SOTA' },
                    { label: 'ARC-AGI-2', value: '45.1%', desc: 'Deep Think mode' },
                  ],
                },
                {
                  title: 'Coding Mastery',
                  emoji: '💻',
                  metrics: [
                    { label: 'SWE-bench Verified', value: '76.2%', desc: 'Software engineering' },
                    { label: 'WebDev Arena', value: '1487', desc: 'Elo score' },
                    { label: 'Terminal-Bench 2.0', value: '54.2%', desc: 'Command-line' },
                    { label: 'Accuracy Improvement', value: '+35%', desc: 'vs Gemini 2.5 Pro' },
                  ],
                },
                {
                  title: 'Multimodal Power',
                  emoji: '🎨',
                  metrics: [
                    { label: 'MMMU-Pro', value: '81%', desc: 'Multimodal understanding' },
                    { label: 'Video-MMMU', value: '87.6%', desc: 'Video comprehension' },
                    { label: 'Context Window', value: '1M', desc: 'Tokens' },
                    { label: 'Document Processing', value: '+50%', desc: 'Low-quality docs' },
                  ],
                },
                {
                  title: 'Safety & Reliability',
                  emoji: '🛡️',
                  metrics: [
                    { label: 'SimpleQA Verified', value: '72.1%', desc: 'Factual accuracy' },
                    { label: 'Safety Framework', value: '✓', desc: 'Frontier certified' },
                    { label: 'Error Reduction', value: '-30%', desc: 'Tool calling' },
                    { label: 'Prompt Injection', value: 'Low', desc: 'Risk level' },
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
                    <span className="text-3xl">{category.emoji}</span>
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
                About Gemini3.us
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
                Ready to get started?
              </h2>
              <p className="text-lg text-gray-400 mb-10 font-light">
                Join our community and start building with Gemini 3 AI today
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

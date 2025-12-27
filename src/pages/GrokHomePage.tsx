import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Brain, Code, Zap, Shield, Heart, MessageSquare, Target, TrendingUp, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'

function GrokHomePage() {
  const { t } = useTranslation()

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-full mb-8">
              <Sparkles className="w-3 h-3" />
              <span>{t('grok_badge')}</span>
            </div>

            {/* Main Headline - H1 (Only One) */}
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-6 tracking-tight leading-none">
              {t('grok_title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-4 font-light max-w-3xl mx-auto">
              {t('grok_subtitle')}
            </p>

            <p className="text-base md:text-lg text-gray-500 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
              {t('grok_description')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://aiberm.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-200 font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                aria-label="Get Started with Grok API"
                title="Get Started with Grok API"
              >
                {t('common_getStarted')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#pricing" 
                className="px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-200 font-medium"
                aria-label="View Grok API Pricing"
                title="View Grok API Pricing"
              >
                {t('grok_viewPricing')}
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {[
                { value: '1483', label: t('grok_stats_lmArenaElo') },
                { value: '1722', label: t('grok_stats_creativeWriting') },
                { value: '4.22%', label: t('grok_stats_hallucinationRate') },
                { value: 'Top 1', label: t('grok_stats_reasoning') },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-light">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {/* Small title */}
            <div className="text-sm font-semibold text-blue-600 mb-3 uppercase tracking-wide">
              {t('grok_whyChoose_smallTitle')}
            </div>
            {/* Main H2 title */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('grok_whyChoose_mainTitle')}
            </h2>
            <p className="text-lg text-gray-600 font-light">
              {t('grok_whyChoose_subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: t('grok_features_emotionalIntelligence_title'),
                description: t('grok_features_emotionalIntelligence_description'),
                gradient: 'from-pink-500 to-rose-500',
              },
              {
                icon: Brain,
                title: t('grok_features_reasoning_title'),
                description: t('grok_features_reasoning_description'),
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: MessageSquare,
                title: t('grok_features_creativeWriting_title'),
                description: t('grok_features_creativeWriting_description'),
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                icon: Shield,
                title: t('grok_features_factualAccuracy_title'),
                description: t('grok_features_factualAccuracy_description'),
                gradient: 'from-green-500 to-emerald-500',
              },
              {
                icon: Zap,
                title: t('grok_features_realTimeData_title'),
                description: t('grok_features_realTimeData_description'),
                gradient: 'from-orange-500 to-yellow-500',
              },
              {
                icon: Code,
                title: t('grok_features_developerFriendly_title'),
                description: t('grok_features_developerFriendly_description'),
                gradient: 'from-cyan-500 to-blue-500',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group p-8 bg-gray-50 rounded-2xl hover:shadow-xl transition-all duration-300"
              >
                <div className={`inline-flex p-3 bg-gradient-to-br ${feature.gradient} rounded-xl mb-4 text-white`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {/* Small title */}
            <div className="text-sm font-semibold text-blue-600 mb-3 uppercase tracking-wide">
              {t('grok_pricing_smallTitle')}
            </div>
            {/* Main H2 title */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('grok_pricing_mainTitle')}
            </h2>
            <p className="text-lg text-gray-600 font-light">
              {t('grok_pricing_subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Monthly Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all"
            >
              <div className="text-sm font-semibold text-gray-500 mb-2">{t('grok_pricing_monthly_label')}</div>
              <div className="text-4xl font-bold text-gray-900 mb-4">
                {t('grok_pricing_monthly_price')}
                <span className="text-lg font-normal text-gray-500">/mo</span>
              </div>
              <p className="text-sm text-gray-600 mb-6">{t('grok_pricing_monthly_description')}</p>
              <ul className="space-y-3 mb-8">
                {[
                  t('grok_pricing_monthly_features_requests'),
                  t('grok_pricing_monthly_features_models'),
                  t('grok_pricing_monthly_features_support'),
                  t('grok_pricing_monthly_features_updates'),
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a 
                href="https://aiberm.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all font-medium text-center"
                aria-label="Get Started with Monthly Plan"
                title="Get Started with Monthly Plan"
              >
                {t('grok_pricing_getStarted')}
              </a>
            </motion.div>

            {/* Yearly Plan (Popular) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl hover:shadow-2xl transition-all transform scale-105"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                {t('grok_pricing_popular')}
              </div>
              <div className="text-sm font-semibold text-gray-300 mb-2">{t('grok_pricing_yearly_label')}</div>
              <div className="text-4xl font-bold mb-4">
                {t('grok_pricing_yearly_price')}
                <span className="text-lg font-normal text-gray-300">/yr</span>
              </div>
              <p className="text-sm text-gray-300 mb-6">{t('grok_pricing_yearly_description')}</p>
              <ul className="space-y-3 mb-8">
                {[
                  t('grok_pricing_yearly_features_requests'),
                  t('grok_pricing_yearly_features_models'),
                  t('grok_pricing_yearly_features_priority'),
                  t('grok_pricing_yearly_features_updates'),
                  t('grok_pricing_yearly_features_discount'),
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-200">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a 
                href="https://aiberm.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-6 py-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-all font-medium text-center"
                aria-label="Get Started with Yearly Plan"
                title="Get Started with Yearly Plan"
              >
                {t('grok_pricing_getStarted')}
              </a>
            </motion.div>

            {/* One-time Payment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all"
            >
              <div className="text-sm font-semibold text-gray-500 mb-2">{t('grok_pricing_oneTime_label')}</div>
              <div className="text-4xl font-bold text-gray-900 mb-4">
                {t('grok_pricing_oneTime_price')}
              </div>
              <p className="text-sm text-gray-600 mb-6">{t('grok_pricing_oneTime_description')}</p>
              <ul className="space-y-3 mb-8">
                {[
                  t('grok_pricing_oneTime_features_credits'),
                  t('grok_pricing_oneTime_features_validity'),
                  t('grok_pricing_oneTime_features_models'),
                  t('grok_pricing_oneTime_features_rollover'),
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a 
                href="https://aiberm.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all font-medium text-center"
                aria-label="Get Started with One-time Payment"
                title="Get Started with One-time Payment"
              >
                {t('grok_pricing_getStarted')}
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section id="how-to-use" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {/* Small title */}
            <div className="text-sm font-semibold text-blue-600 mb-3 uppercase tracking-wide">
              {t('grok_howToUse_smallTitle')}
            </div>
            {/* Main H2 title */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('grok_howToUse_mainTitle')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: t('grok_howToUse_steps_signup_title'),
                description: t('grok_howToUse_steps_signup_description'),
                icon: Target,
              },
              {
                step: '02',
                title: t('grok_howToUse_steps_integrate_title'),
                description: t('grok_howToUse_steps_integrate_description'),
                icon: Code,
              },
              {
                step: '03',
                title: t('grok_howToUse_steps_deploy_title'),
                description: t('grok_howToUse_steps_deploy_description'),
                icon: TrendingUp,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative p-8 bg-gray-50 rounded-2xl"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {item.step}
                </div>
                <div className="flex items-start gap-4 mt-4">
                  <div className="flex-shrink-0 p-3 bg-white rounded-xl">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {/* Small title */}
            <div className="text-sm font-semibold text-blue-600 mb-3 uppercase tracking-wide">
              {t('grok_faq_smallTitle')}
            </div>
            {/* Main H2 title */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('grok_faq_mainTitle')}
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: t('grok_faq_questions_what_question'),
                answer: t('grok_faq_questions_what_answer'),
              },
              {
                question: t('grok_faq_questions_difference_question'),
                answer: t('grok_faq_questions_difference_answer'),
              },
              {
                question: t('grok_faq_questions_useCases_question'),
                answer: t('grok_faq_questions_useCases_answer'),
              },
              {
                question: t('grok_faq_questions_apiKey_question'),
                answer: t('grok_faq_questions_apiKey_answer'),
              },
              {
                question: t('grok_faq_questions_support_question'),
                answer: t('grok_faq_questions_support_answer'),
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {item.question}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  {item.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('grok_cta_title')}
            </h2>
            <p className="text-xl text-gray-300 mb-8 font-light">
              {t('grok_cta_description')}
            </p>
            <a 
              href="https://aiberm.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-block"
              aria-label="Start Using Grok API"
              title="Start Using Grok API"
            >
              {t('common_getStarted')}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default GrokHomePage

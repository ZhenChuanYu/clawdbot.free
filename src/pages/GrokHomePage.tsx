import { motion } from 'framer-motion'
import { Sparkles, Brain, Code, Zap, Shield, Heart, MessageSquare, Target, TrendingUp, Info, Table, Layers, Cloud, CheckCircle2, AlertCircle } from 'lucide-react'
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

            <p className="text-base md:text-lg text-gray-500 mb-8 font-light max-w-2xl mx-auto leading-relaxed">
              {t('grok_description')}
            </p>

            {/* Disclaimer */}
            <p className="text-sm text-gray-600 mb-12 font-normal max-w-2xl mx-auto leading-relaxed">
              {t('grok_disclaimer')}
            </p>

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

      {/* What is Grok API Section */}
      <section id="what-is" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="text-sm font-semibold text-blue-600 mb-3 uppercase tracking-wide">
              {t('grok_whatIs_smallTitle')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('grok_whatIs_mainTitle')}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {t('grok_whatIs_description')}
            </p>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Info className="w-6 h-6 text-blue-600" />
                {t('grok_whatIs_keyPoints')}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{t('grok_whatIs_keyPoint1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{t('grok_whatIs_keyPoint2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{t('grok_whatIs_keyPoint3')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{t('grok_whatIs_keyPoint4')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{t('grok_whatIs_keyPoint5')}</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white">
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

      {/* Comparison Section */}
      <section id="comparison" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="text-sm font-semibold text-blue-600 mb-3 uppercase tracking-wide">
              {t('grok_comparison_smallTitle')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('grok_comparison_mainTitle')}
            </h2>
            <p className="text-lg text-gray-600 font-light">
              {t('grok_comparison_subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="overflow-x-auto"
          >
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200 bg-white rounded-2xl shadow-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{t('grok_comparison_table_product')}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{t('grok_comparison_table_xaiApi')}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{t('grok_comparison_table_grokCom')}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{t('grok_comparison_table_mobile')}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{t('grok_comparison_table_grokX')}</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{t('grok_comparison_table_accessible')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_comparison_table_accessible_xai')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_comparison_table_accessible_grokCom')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_comparison_table_accessible_mobile')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_comparison_table_accessible_grokX')}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{t('grok_comparison_table_billing')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_comparison_table_billing_xai')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_comparison_table_billing_grokCom')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_comparison_table_billing_mobile')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_comparison_table_billing_grokX')}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{t('grok_comparison_table_programming')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_comparison_table_programming_xai')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_comparison_table_programming_grokCom')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_comparison_table_programming_mobile')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_comparison_table_programming_grokX')}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{t('grok_comparison_table_description')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_comparison_table_description_xai')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_comparison_table_description_grokCom')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_comparison_table_description_mobile')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_comparison_table_description_grokX')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Models Section */}
      <section id="models" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="text-sm font-semibold text-blue-600 mb-3 uppercase tracking-wide">
              {t('grok_models_smallTitle')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('grok_models_mainTitle')}
            </h2>
            <p className="text-lg text-gray-600 font-light">
              {t('grok_models_subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="overflow-x-auto mb-12"
          >
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200 bg-white rounded-2xl shadow-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{t('grok_models_table_model')}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{t('grok_models_table_bestFor')}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{t('grok_models_table_speed')}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{t('grok_models_table_cost')}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{t('grok_models_table_context')}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{t('grok_models_table_knowledge')}</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{t('grok_models_grok41')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_models_grok41_bestFor')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_models_grok41_speed')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_models_grok41_cost')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_models_grok41_context')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_models_grok41_knowledge')}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{t('grok_models_grok41fast')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_models_grok41fast_bestFor')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_models_grok41fast_speed')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_models_grok41fast_cost')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_models_grok41fast_context')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_models_grok41fast_knowledge')}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{t('grok_models_grok41thinking')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_models_grok41thinking_bestFor')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_models_grok41thinking_speed')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_models_grok41thinking_cost')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_models_grok41thinking_context')}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{t('grok_models_grok41thinking_knowledge')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-blue-50 rounded-2xl p-8 max-w-4xl mx-auto"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-600" />
              {t('grok_models_selection_title')}
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-semibold">•</span>
                <span>{t('grok_models_selection_mvp')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-semibold">•</span>
                <span>{t('grok_models_selection_chat')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-semibold">•</span>
                <span>{t('grok_models_selection_coding')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-semibold">•</span>
                <span>{t('grok_models_selection_latency')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-semibold">•</span>
                <span>{t('grok_models_selection_vision')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-semibold">•</span>
                <span>{t('grok_models_selection_creative')}</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Platforms Section */}
      <section id="platforms" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="text-sm font-semibold text-blue-600 mb-3 uppercase tracking-wide">
              {t('grok_platforms_smallTitle')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('grok_platforms_mainTitle')}
            </h2>
            <p className="text-lg text-gray-600 font-light">
              {t('grok_platforms_subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: t('grok_platforms_xai_title'),
                description: t('grok_platforms_xai_description'),
                link: 'https://console.x.ai',
                linkText: t('grok_platforms_xai_link'),
                gradient: 'from-gray-900 to-gray-800',
              },
              {
                title: t('grok_platforms_azure_title'),
                description: t('grok_platforms_azure_description'),
                link: 'https://azure.microsoft.com/',
                linkText: t('grok_platforms_azure_link'),
                gradient: 'from-blue-600 to-blue-700',
              },
              {
                title: t('grok_platforms_github_title'),
                description: t('grok_platforms_github_description'),
                link: 'https://github.com/models',
                linkText: t('grok_platforms_github_link'),
                gradient: 'from-gray-800 to-gray-900',
              },
              {
                title: t('grok_platforms_oracle_title'),
                description: t('grok_platforms_oracle_description'),
                link: 'https://www.oracle.com/cloud/',
                linkText: t('grok_platforms_oracle_link'),
                gradient: 'from-red-600 to-red-700',
              },
              {
                title: t('grok_platforms_aws_title'),
                description: t('grok_platforms_aws_description'),
                link: 'https://aws.amazon.com/bedrock/',
                linkText: t('grok_platforms_aws_link'),
                gradient: 'from-orange-500 to-orange-600',
              },
            ].map((platform, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {platform.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {platform.description}
                </p>
                <a
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${platform.gradient} text-white rounded-lg hover:opacity-90 transition-all text-sm font-medium`}
                >
                  {platform.linkText}
                  <span>→</span>
                </a>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 max-w-4xl mx-auto"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-900 font-medium leading-relaxed">
                  {t('grok_platforms_pricing_note')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-20 bg-gradient-to-b from-gray-50 to-white">
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
              {t('grok_resources_smallTitle')}
            </div>
            {/* Main H2 title */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('grok_resources_mainTitle')}
            </h2>
            <p className="text-lg text-gray-600 font-light">
              {t('grok_resources_subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Official Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t('grok_resources_official_title')}
              </h3>
              <p className="text-sm text-gray-600 mb-6">{t('grok_resources_official_description')}</p>
              <a 
                href="https://x.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all font-medium text-center inline-block"
                aria-label="Visit xAI Official Site"
                title="Visit xAI Official Site"
              >
                {t('grok_resources_official_link')}
              </a>
            </motion.div>

            {/* Documentation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t('grok_resources_docs_title')}
              </h3>
              <p className="text-sm text-gray-600 mb-6">{t('grok_resources_docs_description')}</p>
              <a 
                href="https://x.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all font-medium text-center inline-block"
                aria-label="View Documentation"
                title="View Documentation"
              >
                {t('grok_resources_docs_link')}
              </a>
            </motion.div>

            {/* Community Tutorials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t('grok_resources_tutorials_title')}
              </h3>
              <p className="text-sm text-gray-600 mb-6">{t('grok_resources_tutorials_description')}</p>
              <a 
                href="https://x.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all font-medium text-center inline-block"
                aria-label="Browse Tutorials"
                title="Browse Tutorials"
              >
                {t('grok_resources_tutorials_link')}
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
              href="https://x.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-block"
              aria-label="Visit xAI Official Website"
              title="Visit xAI Official Website"
            >
              Visit xAI Official Site
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default GrokHomePage

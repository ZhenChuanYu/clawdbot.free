import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLocalizedPath } from '../utils/routes'

export default function Footer() {
  const { t } = useTranslation()
  const { getLocalizedPath } = useLocalizedPath()

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-12 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-base font-semibold text-gray-900">Grok API</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              {t('grok_subtitle')}
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">{t('common_product')}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors" title="View Grok API Features">
                  {t('common_features')}
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors" title="Grok API Pricing">
                  {t('common_pricing')}
                </a>
              </li>
              <li>
                <a href="#how-to-use" className="text-gray-600 hover:text-gray-900 transition-colors" title="How to Use Grok API">
                  {t('common_howToUse')}
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-600 hover:text-gray-900 transition-colors" title="Grok API FAQ">
                  {t('common_faq')}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">{t('common_legal')}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to={getLocalizedPath('/privacy-policy')} className="text-gray-600 hover:text-gray-900 transition-colors" title="Privacy Policy">
                  {t('common_privacy')}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/terms-of-service')} className="text-gray-600 hover:text-gray-900 transition-colors" title="Terms of Service">
                  {t('common_terms')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">{t('common_about')}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              {t('common_aboutDesc')}
            </p>
          </div>

          {/* Partner Links */}
          <div className="md:col-span-12">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Partner Sites</h3>
            <div className="flex flex-wrap gap-6 text-sm">
              <a 
                href="https://gemini3.us" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                title="Gemini 3 Pro"
              >
                gemini3.us
              </a>
              <a 
                href="https://nanobanana4k.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                title="Nano Banana Pro"
              >
                nanobanana4k.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              {t('common_copyright')}
            </p>
            <p className="text-xs text-gray-400">
              {t('common_poweredBy')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

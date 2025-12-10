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
              <img
                src="/128.webp"
                alt="Gemini 3 Logo"
                width="28"
                height="28"
                className="w-7 h-7 rounded-xl object-cover"
              />
              <span className="text-base font-semibold text-gray-900">Gemini3</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              {t('footer.brandDescription')}
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">{t('footer.officialGoogle')}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors" title="View Gemini 3 Features">
                  {t('common.features')}
                </a>
              </li>
              <li>
                <a href="#capabilities" className="text-gray-600 hover:text-gray-900 transition-colors" title="Gemini 3.0 Capabilities">
                  {t('common.capabilities')}
                </a>
              </li>
              <li>
                <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors" title="Get Started with Gemini">
                  {t('common.getStarted')}
                </a>
              </li>
              <li>
                <a href="https://nanobanana4k.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors" title="NanoBanana4K.com">
                  NanoBanana4K.com
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to={getLocalizedPath('/privacy-policy')} className="text-gray-600 hover:text-gray-900 transition-colors" title="Privacy Policy">
                  {t('common.privacy')}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/terms-of-service')} className="text-gray-600 hover:text-gray-900 transition-colors" title="Terms of Service">
                  {t('common.terms')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">{t('footer.community')}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              {t('footer.communityDescription')}
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              {t('footer.copyright')}
            </p>
            <p className="text-xs text-gray-400">
              {t('footer.poweredBy')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'
import { useLocalizedPath } from '../utils/routes'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  const { getLocalizedPath } = useLocalizedPath()

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const homePath = getLocalizedPath('/')
    const currentPath = location.pathname.replace(/^\/[a-z]{2}(\/|$)/, '/')
    
    if (currentPath !== '/') {
      navigate(homePath)
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={getLocalizedPath('/')} className="flex items-center gap-2 group" title="Grok API Home">
            <span className="text-base font-semibold text-gray-900 tracking-tight">Grok API</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <a
              href={getLocalizedPath('/')}
              onClick={(e) => {
                e.preventDefault()
                const currentPath = location.pathname.replace(/^\/[a-z]{2}(\/|$)/, '/')
                if (currentPath === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                } else {
                  navigate(getLocalizedPath('/'))
                }
              }}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
              title="Grok API Home"
            >
              {t('common_home')}
            </a>
            <a
              href="#features"
              onClick={(e) => handleSectionClick(e, 'features')}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
              title="Grok API Features"
            >
              {t('common_features')}
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleSectionClick(e, 'pricing')}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
              title="Grok API Pricing"
            >
              {t('common_pricing')}
            </a>
            <a
              href="#faq"
              onClick={(e) => handleSectionClick(e, 'faq')}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
              title="Grok API FAQ"
            >
              {t('common_faq')}
            </a>
          </nav>

          {/* CTA and Language Switcher */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href="https://aiberm.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all duration-200"
              title="Get Started with Grok API"
            >
              {t('common_getStarted')}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

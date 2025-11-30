import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import { Globe } from 'lucide-react'
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '../i18n/config'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentLang = SUPPORTED_LANGUAGES.find(lang => lang.code === i18n.language) || SUPPORTED_LANGUAGES[0]

  const handleLanguageChange = (langCode: SupportedLanguage) => {
    i18n.changeLanguage(langCode)
    setIsOpen(false)

    // Update URL with language prefix
    const pathWithoutLang = location.pathname.replace(/^\/[a-z]{2}(\/|$)/, '/')
    const newPath = langCode === 'en' 
      ? pathWithoutLang 
      : `/${langCode}${pathWithoutLang === '/' ? '' : pathWithoutLang}`
    
    navigate(newPath, { replace: true })
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLang.nativeName}</span>
        <span className="sm:hidden">{currentLang.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                i18n.language === lang.code
                  ? 'bg-gray-50 text-gray-900 font-medium'
                  : 'text-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{lang.nativeName}</span>
                {i18n.language === lang.code && (
                  <span className="text-blue-600">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}


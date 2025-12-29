import { useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '../i18n/config'
import SEOHead from './SEOHead'

interface LanguageRouteProps {
  children: React.ReactNode
}

export default function LanguageRoute({ children }: LanguageRouteProps) {
  const { lang } = useParams<{ lang: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const { i18n } = useTranslation()

  useEffect(() => {
    // Validate language code
    const validLang = SUPPORTED_LANGUAGES.find(l => l.code === lang)?.code as SupportedLanguage | undefined
    
    if (lang && validLang) {
      // Set language if valid
      if (i18n.language !== validLang) {
        i18n.changeLanguage(validLang)
      }
    } else if (lang && !validLang) {
      // Redirect to English if invalid language code
      const pathWithoutLang = location.pathname.replace(/^\/[a-z]{2}(\/|$)/, '/')
      navigate(pathWithoutLang, { replace: true })
    } else {
      // No language in URL, detect from browser or use default
      const detectedLang = i18n.language || 'en'
      const pathWithoutLang = location.pathname
      
      // Only redirect if detected language is not English
      if (detectedLang !== 'en') {
        const newPath = `/${detectedLang}${pathWithoutLang === '/' ? '' : pathWithoutLang}`
        navigate(newPath, { replace: true })
      } else {
        // Ensure language is set
        i18n.changeLanguage('en')
      }
    }
  }, [lang, location.pathname, navigate, i18n])

  return (
    <>
      <SEOHead />
      {children}
    </>
  )
}


import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

/**
 * Get the current path with language prefix
 */
export function useLocalizedPath() {
  const { i18n } = useTranslation()
  const location = useLocation()

  const getLocalizedPath = (path: string): string => {
    // Remove existing language prefix if any
    const cleanPath = path.replace(/^\/[a-z]{2}(\/|$)/, '/')
    
    // If English, return path without prefix
    if (i18n.language === 'en') {
      return cleanPath === '/' ? '/' : cleanPath
    }
    
    // For other languages, add language prefix
    return `/${i18n.language}${cleanPath === '/' ? '' : cleanPath}`
  }

  const getCurrentPath = (): string => {
    return location.pathname
  }

  return { getLocalizedPath, getCurrentPath }
}


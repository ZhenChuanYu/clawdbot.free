import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Header from './components/Header'
import Footer from './components/Footer'
import SEOHead from './components/SEOHead'
import HomePage from './pages/HomePage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'

function App() {
  const location = useLocation()
  const { i18n } = useTranslation()

  // 根据路径判断语言并切换
  useEffect(() => {
    const pathLang = location.pathname.split('/')[1]
    const supportedLangs = ['zh', 'es', 'ja', 'ko', 'fr', 'de']
    
    if (supportedLangs.includes(pathLang)) {
      if (i18n.language !== pathLang) {
        i18n.changeLanguage(pathLang)
      }
    } else {
      // 默认英文
      if (i18n.language !== 'en') {
        i18n.changeLanguage('en')
      }
    }
  }, [location.pathname, i18n])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-white">
      <SEOHead />
      <Header />
      <main>
        <Routes>
          {/* Default English routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          
          {/* Language-prefixed routes */}
          <Route path="/:lang" element={<HomePage />} />
          <Route path="/:lang/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/:lang/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App

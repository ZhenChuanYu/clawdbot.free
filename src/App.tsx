import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import LanguageRoute from './components/LanguageRoute'
import HomePage from './pages/HomePage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'

function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Routes>
          {/* Routes with language prefix */}
          <Route path="/:lang" element={<LanguageRoute><HomePage /></LanguageRoute>} />
          <Route path="/:lang/privacy-policy" element={<LanguageRoute><PrivacyPolicy /></LanguageRoute>} />
          <Route path="/:lang/terms-of-service" element={<LanguageRoute><TermsOfService /></LanguageRoute>} />
          
          {/* Default routes (will redirect to language-prefixed routes) */}
          <Route path="/" element={<LanguageRoute><HomePage /></LanguageRoute>} />
          <Route path="/privacy-policy" element={<LanguageRoute><PrivacyPolicy /></LanguageRoute>} />
          <Route path="/terms-of-service" element={<LanguageRoute><TermsOfService /></LanguageRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App

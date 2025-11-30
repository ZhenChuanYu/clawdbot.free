import { Link, useNavigate, useLocation } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate('/')
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

  const handleGetStarted = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // 如果在首页，触发打开聊天窗口事件
    if (location.pathname === '/') {
      window.dispatchEvent(new CustomEvent('openChat'))
    } else {
      // 如果不在首页，先导航到首页，然后触发事件
      navigate('/')
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('openChat'))
      }, 100)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" title="Gemini 3 Home">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-40 group-hover:opacity-60 transition-opacity" aria-hidden="true"></div>
              <img 
                src="/128.webp" 
                alt="Gemini 3 Logo" 
                width="32"
                height="32"
                className="relative w-8 h-8 rounded-xl object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <span className="text-base font-semibold text-gray-900 tracking-tight">Gemini3</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault()
                if (location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                } else {
                  navigate('/')
                }
              }}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
              title="Gemini 3 Home"
            >
              Home
            </a>
            <a
              href="#features"
              onClick={(e) => handleSectionClick(e, 'features')}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
              title="Gemini 3 Features"
            >
              Features
            </a>
            <a
              href="#capabilities"
              onClick={(e) => handleSectionClick(e, 'capabilities')}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
              title="Gemini 3.0 Capabilities"
            >
              Capabilities
            </a>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleGetStarted}
              className="px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all duration-200"
              title="Get Started with Gemini 3"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

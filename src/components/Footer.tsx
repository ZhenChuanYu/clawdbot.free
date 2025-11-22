import { Link } from 'react-router-dom'

export default function Footer() {
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
              Access Google's most advanced AI model through our community platform.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Official Google</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors" title="View Gemini 3 Features">
                  Features
                </a>
              </li>
              <li>
                <a href="#capabilities" className="text-gray-600 hover:text-gray-900 transition-colors" title="Gemini 3.0 Capabilities">
                  Capabilities
                </a>
              </li>
              <li>
                <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors" title="Get Started with Gemini">
                  Get Started
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/privacy-policy" className="text-gray-600 hover:text-gray-900 transition-colors" title="Privacy Policy">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-600 hover:text-gray-900 transition-colors" title="Terms of Service">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Gemini 3 Community</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Independent community platform. Not affiliated with Google LLC.
              Provides paid access to official Gemini API services.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              © 2025 Gemini3.us. All rights reserved.
            </p>
            <p className="text-xs text-gray-400">
              Powered by Google Gemini API
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

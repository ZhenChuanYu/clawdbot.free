import React, { useState, useEffect } from 'react'

interface ToastProps {
  message: string
  show: boolean
  onClose: () => void
  duration?: number
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  show, 
  onClose, 
  duration = 2000 
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [show, duration, onClose])

  return (
    <div
      className={`fixed top-1/2 left-1/2 z-50 px-6 py-3 rounded-lg bg-black bg-opacity-90 text-white text-base font-medium select-none pointer-events-none transition-all duration-300
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
      style={{
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.3s, transform 0.3s'
      }}
    >
      {message}
    </div>
  )
}

// Toast Hook for easier usage
export const useToast = () => {
  const [toast, setToast] = useState<{
    show: boolean
    message: string
  }>({
    show: false,
    message: ''
  })

  const showToast = (message: string) => {
    setToast({ show: true, message })
  }

  const hideToast = () => {
    setToast(prev => ({ ...prev, show: false }))
  }

  return {
    toast,
    showToast,
    hideToast
  }
}

export default Toast


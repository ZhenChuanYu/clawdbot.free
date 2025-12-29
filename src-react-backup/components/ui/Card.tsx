import React from 'react'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  variant?: 'default' | 'glass' | 'gradient' | 'elevated'
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
  interactive?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  style = {},
  onClick,
  interactive = false
}) => {
  const baseClasses = 'rounded-xl transition-all duration-300'
  
  const variantClasses = {
    default: 'bg-white/95 backdrop-blur-sm shadow-soft border border-gray-200/50 hover:shadow-medium hover:border-gray-300/50',
    glass: 'glass border border-white/20 shadow-soft',
    gradient: 'gradient-primary text-white shadow-medium',
    elevated: 'bg-white shadow-large border border-gray-100 hover:shadow-glow'
  }
  
  const interactiveClasses = interactive ? 'cursor-pointer hover:transform hover:-translate-y-1' : ''
  
  const classes = [
    baseClasses,
    variantClasses[variant],
    interactiveClasses,
    className
  ].filter(Boolean).join(' ')
  
  return (
    <div className={classes} style={style} onClick={onClick}>
      {children}
    </div>
  )
}

// 卡片头部组件
export const CardHeader: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <div className={`px-6 py-4 border-b border-gray-100 ${className}`}>
    {children}
  </div>
)

// 卡片内容组件
export const CardContent: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
)

// 卡片底部组件
export const CardFooter: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <div className={`px-6 py-4 border-t border-gray-100 ${className}`}>
    {children}
  </div>
)

export default Card


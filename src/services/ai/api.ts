// API 配置（支持 OpenAI 和 WorldBase）
export const API_CONFIG = {
  // OpenAI API 配置
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY || '',
  OPENAI_BASE_URL: import.meta.env.VITE_OPENAI_BASE_URL || 'https://api.openai.com/v1',
  
  // WorldBase API 配置（与 OpenAI 兼容）
  WORLDBASE_API_KEY: import.meta.env.VITE_WORLDBASE_API_KEY || 'sk-1AHfiSpLfaa1h99OwwzD4fA8cTA3ARYOp0LSvWvNE0NGw9yF',
  WORLDBASE_BASE_URL: import.meta.env.VITE_WORLDBASE_BASE_URL || 'https://api.worldbase.ai/v1',
  
  // 请求超时时间（毫秒）
  REQUEST_TIMEOUT: 30000,
  
  // 默认使用 WorldBase（与 OpenAI 兼容）
  DEFAULT_PROVIDER: 'worldbase' as const,
  
  // 默认模型（WorldBase 支持的模型）
  DEFAULT_MODEL: 'gemini-2.5-flash-lite'
}

// 获取 API 密钥
export const getApiKey = (provider: string = API_CONFIG.DEFAULT_PROVIDER): string => {
  if (provider === 'worldbase') {
    const apiKey = API_CONFIG.WORLDBASE_API_KEY
    if (!apiKey) {
      throw new Error('WorldBase API key is not configured. Please set VITE_WORLDBASE_API_KEY in environment variables')
    }
    return apiKey
  } else if (provider === 'openai') {
    const apiKey = API_CONFIG.OPENAI_API_KEY
    if (!apiKey) {
      throw new Error('OpenAI API key is not configured. Please set VITE_OPENAI_API_KEY in environment variables')
    }
    return apiKey
  }
  throw new Error(`Unsupported API provider: ${provider}`)
}

// 获取 API 基础 URL
export const getBaseUrl = (provider: string = API_CONFIG.DEFAULT_PROVIDER): string => {
  if (provider === 'worldbase') {
    return API_CONFIG.WORLDBASE_BASE_URL
  } else if (provider === 'openai') {
    return API_CONFIG.OPENAI_BASE_URL
  }
  return API_CONFIG.WORLDBASE_BASE_URL // 默认返回 WorldBase
}

// 获取默认模型
export const getDefaultModel = (): string => {
  return API_CONFIG.DEFAULT_MODEL
}

// 获取默认供应商
export const getDefaultProvider = (): string => {
  return API_CONFIG.DEFAULT_PROVIDER
}


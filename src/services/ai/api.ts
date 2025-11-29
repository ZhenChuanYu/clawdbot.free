// API 配置（简化版，只支持 OpenAI）
export const API_CONFIG = {
  // OpenAI API 配置
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY || '',
  OPENAI_BASE_URL: import.meta.env.VITE_OPENAI_BASE_URL || 'https://api.openai.com/v1',
  
  // 请求超时时间（毫秒）
  REQUEST_TIMEOUT: 30000,
  
  // 默认模型
  DEFAULT_MODEL: 'gpt-4o'
}

// 获取 API 密钥
export const getApiKey = (): string => {
  const apiKey = API_CONFIG.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OpenAI API 密钥未配置，请在环境变量中设置 VITE_OPENAI_API_KEY')
  }
  return apiKey
}

// 获取 API 基础 URL
export const getBaseUrl = (): string => {
  return API_CONFIG.OPENAI_BASE_URL
}

// 获取默认模型
export const getDefaultModel = (): string => {
  return API_CONFIG.DEFAULT_MODEL
}


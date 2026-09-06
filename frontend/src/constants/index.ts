import { configureJarvisHttp } from '@jarvis/core'

/** Shared API base — same-origin `/api/` → Vite proxy → BE */
export const BASE_URL = import.meta.env.VITE_API_URL

export const API_KEY = import.meta.env.VITE_API_KEY

export const API_KEY_HEADER = import.meta.env.VITE_API_KEY_NAME

/**
 * Tài khoản demo — login không cần BE.
 * Email: admin@gmail.com / Password: Admin@123
 */
export const MOCK_ACCOUNT = {
  email: 'admin@gmail.com',
  password: 'Admin@123',
  fullName: 'Admin',
  user: {
    id: 'user-001',
    email: 'admin@gmail.com',
    fullName: 'Admin',
    roles: ['admin'],
  },
} as const

export type MockLoginResult = {
  user: typeof MOCK_ACCOUNT.user
  token: string
}

export function isMockAccountCredentials(payload: {
  email: string
  password: string
}) {
  return (
    payload.email.trim().toLowerCase() === MOCK_ACCOUNT.email.toLowerCase() &&
    payload.password === MOCK_ACCOUNT.password
  )
}

export async function mockLogin(payload: {
  email: string
  password: string
}): Promise<MockLoginResult> {
  await new Promise((resolve) => setTimeout(resolve, 250))

  if (!isMockAccountCredentials(payload)) {
    throw new Error('Email hoặc mật khẩu không đúng')
  }

  return {
    user: { ...MOCK_ACCOUNT.user },
    token: 'mock-hrm-token',
  }
}

export function configureHrmHttp() {
  configureJarvisHttp({
    baseURL: BASE_URL,
    apiKey: API_KEY,
    apiKeyHeader: API_KEY_HEADER,
  })
}

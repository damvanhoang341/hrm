/**
 * Host SPA — AdminLayout + modules từ @jarvis/core.
 * Setting UI từ @jarvis/setting.
 */

import { useEffect } from 'react'
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom'
import {
  ACCOUNT_ROUTES,
  AdminLayout,
  AccountProfilePage,
  ChangePasswordPage,
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
  TenantConnectionsPage,
  TenantDetailPage,
  TenantDomainsPage,
  TenantFormPage,
  TenantListPage,
  configureTenantNavigate,
  DASHBOARD_ROUTES,
  RoleListPage,
  ROLE_ROUTES,
  configureRoleNavigate,
  FileManagerPage,
  FILE_MANAGER_ROUTES,
  configureFileManagerNavigate,
  ImportPage,
  IMPORT_ROUTES,
  configureImportNavigate,
  callLogin,
} from '@jarvis/core'
import { SettingPage } from '@jarvis/setting'
import {
  clearAccessToken,
  extractLoginResult,
  isAuthenticated,
  RequireAuth,
  setAccessToken,
} from './auth'
import {
  isMockAccountCredentials,
  mockLogin,
} from './constants'
import { HRM_MAIN_NAV, HRM_SECONDARY_NAV } from './nav/items'
import { HomePage } from './pages/HomePage'
import { PlaceholderPage } from './pages/PlaceholderPage'

function HrmAdminLayout() {
  const navigate = useNavigate()

  return (
    <AdminLayout
      mainNav={HRM_MAIN_NAV}
      secondaryNav={HRM_SECONDARY_NAV}
      logoTitle="HRM"
      logoSubtitle="Nhân sự"
      defaultTitle="Quản lý nhân sự"
      onLogout={async () => {
        clearAccessToken()
        navigate(ACCOUNT_ROUTES.login, { replace: true })
        return false
      }}
    />
  )
}

function GuestLoginPage() {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />
  }

  return (
    <div data-testid="hrm-login">
      <LoginPage
        title="Đăng nhập HRM"
        description="Nhập email và mật khẩu để vào hệ thống nhân sự."
        callback={{
          onSubmit: async (payload) => {
            if (isMockAccountCredentials(payload)) {
              const result = await mockLogin(payload)
              setAccessToken(result.token)
              return result
            }

            const response = await callLogin(payload)
            const result = extractLoginResult(response)
            const token = result.tokens?.accessToken
            if (!token) {
              throw new Error('Server không trả access token.')
            }
            setAccessToken(token)
            return result
          },
        }}
      />
    </div>
  )
}

function TenantNavigateBridge() {
  const navigate = useNavigate()
  useEffect(() => {
    configureTenantNavigate((to) => navigate(to))
  }, [navigate])
  return null
}

function RoleNavigateBridge() {
  const navigate = useNavigate()
  useEffect(() => {
    configureRoleNavigate((to) => navigate(to))
  }, [navigate])
  return null
}

function FileManagerNavigateBridge() {
  const navigate = useNavigate()
  useEffect(() => {
    configureFileManagerNavigate((to) => navigate(to))
  }, [navigate])
  return null
}

function ImportNavigateBridge() {
  const navigate = useNavigate()
  useEffect(() => {
    configureImportNavigate((to) => navigate(to))
  }, [navigate])
  return null
}

function TenantDetailRoute() {
  const { id = '' } = useParams()
  return <TenantDetailPage tenantId={id} />
}

function TenantEditRoute() {
  const { id = '' } = useParams()
  return <TenantFormPage mode="edit" tenantId={id} />
}

function TenantConnectionsRoute() {
  const { id = '' } = useParams()
  return <TenantConnectionsPage tenantId={id} />
}

function TenantDomainsRoute() {
  const { id = '' } = useParams()
  return <TenantDomainsPage tenantId={id} />
}

export default function App() {
  return (
    <>
      <TenantNavigateBridge />
      <RoleNavigateBridge />
      <FileManagerNavigateBridge />
      <ImportNavigateBridge />

      <Routes>
        <Route path={ACCOUNT_ROUTES.login} element={<GuestLoginPage />} />
        <Route path={ACCOUNT_ROUTES.register} element={<RegisterPage />} />
        <Route
          path={ACCOUNT_ROUTES.forgotPassword}
          element={<ForgotPasswordPage />}
        />

        <Route
          element={
            <RequireAuth>
              <HrmAdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<HomePage />} />
          <Route
            path={DASHBOARD_ROUTES.home}
            element={<Navigate to="/" replace />}
          />

          <Route
            path="employees"
            element={
              <PlaceholderPage
                title="Nhân viên"
                description="Danh sách nhân sự, hồ sơ và trạng thái làm việc."
              />
            }
          />
          <Route
            path="departments"
            element={
              <PlaceholderPage
                title="Phòng ban"
                description="Cơ cấu tổ chức và phòng ban."
              />
            }
          />
          <Route
            path="attendance"
            element={
              <PlaceholderPage
                title="Chấm công"
                description="Bảng công theo ngày / kỳ."
              />
            }
          />
          <Route
            path="leave"
            element={
              <PlaceholderPage
                title="Nghỉ phép"
                description="Đơn nghỉ phép và số ngày còn lại."
              />
            }
          />
          <Route
            path="payroll"
            element={
              <PlaceholderPage
                title="Lương"
                description="Bảng lương và phiếu lương."
              />
            }
          />

          <Route path="settings" element={<SettingPage />} />
          <Route
            path="help"
            element={
              <PlaceholderPage
                title="Trợ giúp"
                description="Hướng dẫn sử dụng hệ thống HRM."
              />
            }
          />

          <Route path="profile" element={<AccountProfilePage />} />
          <Route path="change-password" element={<ChangePasswordPage />} />

          <Route path="tenants" element={<TenantListPage />} />
          <Route
            path="tenants/create"
            element={<TenantFormPage mode="create" />}
          />
          <Route path="tenants/:id" element={<TenantDetailRoute />} />
          <Route path="tenants/:id/edit" element={<TenantEditRoute />} />
          <Route
            path="tenants/:id/connections"
            element={<TenantConnectionsRoute />}
          />
          <Route
            path="tenants/:id/domains"
            element={<TenantDomainsRoute />}
          />

          <Route path={ROLE_ROUTES.list} element={<RoleListPage locale="vi" />} />
          <Route
            path={FILE_MANAGER_ROUTES.list}
            element={<FileManagerPage locale="vi" />}
          />
          <Route path={IMPORT_ROUTES.page} element={<ImportPage locale="vi" />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  )
}

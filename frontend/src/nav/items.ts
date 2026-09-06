import {
  Building2,
  CalendarClock,
  CalendarOff,
  FolderOpen,
  HelpCircle,
  LayoutDashboard,
  Settings,
  Shield,
  Upload,
  Users,
  Wallet,
} from 'lucide-react'
import type { AdminNavItem } from '@jarvis/core'
import { FILE_MANAGER_ROUTES, IMPORT_ROUTES, ROLE_ROUTES } from '@jarvis/core'

export const HRM_MAIN_NAV = [
  { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard, path: '/' },
  {
    id: 'employees',
    label: 'Nhân viên',
    icon: Users,
    path: '/employees',
  },
  {
    id: 'departments',
    label: 'Phòng ban',
    icon: Building2,
    path: '/departments',
  },
  {
    id: 'attendance',
    label: 'Chấm công',
    icon: CalendarClock,
    path: '/attendance',
  },
  {
    id: 'leave',
    label: 'Nghỉ phép',
    icon: CalendarOff,
    path: '/leave',
  },
  {
    id: 'payroll',
    label: 'Lương',
    icon: Wallet,
    path: '/payroll',
  },
  { id: 'roles', label: 'Vai trò', icon: Shield, path: ROLE_ROUTES.list },
  {
    id: 'files',
    label: 'Hồ sơ',
    icon: FolderOpen,
    path: FILE_MANAGER_ROUTES.list,
  },
  { id: 'import', label: 'Import', icon: Upload, path: IMPORT_ROUTES.page },
] as AdminNavItem[]

export const HRM_SECONDARY_NAV = [
  { id: 'settings', label: 'Cài đặt', icon: Settings, path: '/settings' },
  { id: 'help', label: 'Trợ giúp', icon: HelpCircle, path: '/help' },
] as AdminNavItem[]

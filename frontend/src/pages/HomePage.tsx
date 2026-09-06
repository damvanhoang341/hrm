import { useEffect, useState } from 'react'
import { DashboardPage } from '@jarvis/core'

type PingResponse = {
  status?: string
  product?: string
  data?: { status?: string; product?: string }
}

export function HomePage() {
  const [ping, setPing] = useState('loading…')
  const [ok, setOk] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/ping')
        const json = (await res.json()) as PingResponse
        const status = json.data?.status ?? json.status ?? 'unknown'
        const product = json.data?.product ?? json.product ?? 'Hrm'
        if (!cancelled) {
          setPing(`${status} · ${product}`)
          setOk(res.ok)
        }
      } catch (err) {
        if (!cancelled) {
          setPing(String(err))
          setOk(false)
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="flex flex-col gap-4" data-testid="hrm-home">
      <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <h1
          className="m-0 text-xl font-semibold text-slate-900"
          data-testid="hrm-title"
        >
          HRM
        </h1>
        <p className="mt-1 mb-0 text-sm text-slate-500">
          Hệ thống nhân sự — Jarvis AdminLayout + @jarvis/core.
        </p>
        <p
          className="mt-3 mb-0 rounded-lg bg-slate-50 px-3 py-2 font-mono text-sm text-slate-700"
          data-testid="hrm-ping"
          data-ok={ok ? 'true' : 'false'}
        >
          /api/ping → {ping}
        </p>
      </div>
      <DashboardPage title="Tổng quan nhân sự" />
    </div>
  )
}

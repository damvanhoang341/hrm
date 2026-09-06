import { PageHeader } from '@jarvis/core'

export function PlaceholderPage({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <PageHeader
        title={title}
        description={
          description ??
          'Trang module HRM — sẽ nối API backend khi sẵn sàng.'
        }
      />
    </div>
  )
}

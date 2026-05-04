import * as React from 'react'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CompareRow {
  criterion: string
  edpilot: string
  other: string
}

export interface CompareTableProps {
  otherLabel: string
  rows: CompareRow[]
}

export function CompareTable({ otherLabel, rows }: CompareTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border-gray">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border-gray bg-bg-surface">
            <th className="text-left py-4 px-5 font-semibold text-text-primary text-[13px] uppercase tracking-wider w-1/4">
              Criterion
            </th>
            <th className="text-left py-4 px-5 font-semibold text-accent text-[13px] uppercase tracking-wider">
              EdPilot
            </th>
            <th className="text-left py-4 px-5 font-semibold text-text-secondary text-[13px] uppercase tracking-wider">
              {otherLabel}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.criterion}
              className={cn(
                'border-b border-border-gray last:border-b-0',
                i % 2 === 0 ? 'bg-transparent' : 'bg-bg-surface/40'
              )}
            >
              <td className="py-4 px-5 align-top font-medium text-text-primary text-[13px]">
                {row.criterion}
              </td>
              <td className="py-4 px-5 align-top text-text-secondary leading-relaxed text-[13px]">
                {row.edpilot}
              </td>
              <td className="py-4 px-5 align-top text-text-secondary leading-relaxed text-[13px]">
                {row.other}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export interface ChecklistItem {
  text: string
  positive: boolean
}

export function CompareChecklist({
  title,
  items,
  variant,
}: {
  title: string
  items: ChecklistItem[]
  variant: 'edpilot' | 'other'
}) {
  const isEdpilot = variant === 'edpilot'
  return (
    <div
      className={cn(
        'rounded-2xl border p-6',
        isEdpilot
          ? 'border-accent/30 bg-accent/[0.06]'
          : 'border-border-gray bg-bg-surface'
      )}
    >
      <h3
        className={cn(
          'mb-5 text-[15px] font-semibold tracking-[-0.005em]',
          isEdpilot ? 'text-accent' : 'text-text-primary'
        )}
      >
        {title}
      </h3>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.text} className="flex items-start gap-2.5 text-[13px]">
            {item.positive ? (
              <Check
                className={cn(
                  'w-4 h-4 mt-0.5 flex-shrink-0',
                  isEdpilot ? 'text-accent' : 'text-emerald-400'
                )}
                aria-hidden="true"
              />
            ) : (
              <X className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" aria-hidden="true" />
            )}
            <span className="text-text-secondary leading-relaxed">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

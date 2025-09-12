import React, { useState } from 'react'
import { PrimaryButton, OutlineButton } from '../../../../shared/components/Button.jsx'
import { COLORS, TAILWIND_COLORS } from '../../../../shared/WebConstant'

const Toggle = ({ checked, onChange, label }) => (
  <label className="flex items-center gap-3 cursor-pointer select-none">
    <span
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200`}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{ backgroundColor: checked ? COLORS.GREEN_PRIMARY : COLORS.GRAY_300 }}
    >
      <span
        className={`h-5 w-5 bg-white rounded-full shadow transform transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-1'}`}
      />
    </span>
    <span className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>{label}</span>
  </label>
)

const SpamRulesForm = ({ value, onChange, onSubmit }) => {
  const { keywords, minLength, autoFlag, flagInactive } = value
  return (
    <div className={`${TAILWIND_COLORS.CARD} p-6`}>
      <div className="flex items-center gap-2 mb-1">
        <span style={{ color: COLORS.GREEN_PRIMARY }}>🔔</span>
        <h2 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Spam Detection Rules</h2>
      </div>
      <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mb-6`}>Configure automatic job spam detection</p>

      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>Keywords Filters</label>
          <input
            type="text"
            placeholder="Enter spam keywords (comma separated)"
            value={keywords}
            onChange={(e) => onChange({ ...value, keywords: e.target.value })}
            className={`w-full px-3 py-2 border ${TAILWIND_COLORS.BORDER} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>Minimum job description length</label>
          <input
            type="number"
            min={0}
            value={minLength}
            onChange={(e) => onChange({ ...value, minLength: Number(e.target.value) || 0 })}
            className={`w-full px-3 py-2 border ${TAILWIND_COLORS.BORDER} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm`}
          />
        </div>

        <div className="space-y-3 pt-1">
          <Toggle checked={autoFlag} onChange={(v) => onChange({ ...value, autoFlag: v })} label="Auto-flag suspicious jobs" />
          <Toggle checked={flagInactive} onChange={(v) => onChange({ ...value, flagInactive: v })} label="Flag inactive users (90+ days)" />
        </div>

        <div className="pt-2">
          <PrimaryButton 
            onClick={onSubmit} 
            disabled={!keywords.trim() && minLength === 0}
          >
            Update Rules
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}

const FlaggedList = ({ items, onReview }) => (
  <div className={`${TAILWIND_COLORS.CARD} p-6`}>
    <div className="flex items-center gap-2 mb-1">
      <span style={{ color: COLORS.GREEN_PRIMARY }}>🔔</span>
      <h2 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Flagged Items</h2>
    </div>
    <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mb-4`}>Review automatically flagged content</p>

    <div className="space-y-3">
      {items.map((it) => (
        <div key={it.id} className={`flex items-center gap-3 p-4 bg-white rounded-lg border ${TAILWIND_COLORS.BORDER}`}>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900 truncate">{it.title}</p>
            <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} truncate`}>{it.subtitle}</p>
          </div>
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full ${it.status === 'Reviewed' ? 'bg-white border' : 'text-white'}`}
            style={it.status === 'Reviewed' ? { borderColor: COLORS.GREEN_PRIMARY, color: COLORS.GREEN_PRIMARY } : { backgroundColor: COLORS.GREEN_PRIMARY }}
          >
            {it.status}
          </span>
          <OutlineButton onClick={() => onReview(it.id)}>
            Review
          </OutlineButton>
        </div>
      ))}
    </div>
  </div>
)

const ExpiryReminder = () => {
  const [rules, setRules] = useState({ keywords: '', minLength: 50, autoFlag: true, flagInactive: true })
  const [flagged, setFlagged] = useState([
    { id: 1, title: 'Work from home opportunity', subtitle: 'Job post - spam keywords', status: 'Pending' },
    { id: 2, title: 'inactive_user@gmail.com', subtitle: 'User - 90+ days inactive', status: 'Reviewed' },
    { id: 3, title: 'Easy money fast', subtitle: 'Job post - suspicious content', status: 'Pending' },
  ])

  const submitRules = () => {
    // In real app, call API
    // eslint-disable-next-line no-console
    console.log('Updated rules:', rules)
    alert('Rules updated successfully!')
  }

  const handleReview = (id) => {
    setFlagged(prev => prev.map(item => 
      item.id === id 
        ? { ...item, status: item.status === 'Pending' ? 'Reviewed' : 'Pending' }
        : item
    ))
    console.log('Reviewing item:', id)
  }

  return (
    <div className="space-y-6">
      <SpamRulesForm 
        value={rules} 
        onChange={setRules} 
        onSubmit={submitRules} 
      />
      
      <FlaggedList 
        items={flagged} 
        onReview={handleReview} 
      />
    </div>
  )
}

export default ExpiryReminder

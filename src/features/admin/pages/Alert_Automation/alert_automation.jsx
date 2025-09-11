import React, { useMemo, useState } from 'react'
import MetricCard from '../../components/metricCard.jsx'
import { PrimaryButton, OutlineButton } from '../../../../shared/components/Button.jsx'
import NavigationTabs from '../../../../shared/components/navigation.jsx'
import { COLORS, TAILWIND_COLORS } from '../../../../shared/WebConstant'
import ExpiryReminder from './expiry_reminder.jsx'

// Local, lightweight presentational atoms
const StatCards = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <MetricCard title="Active Alerts" count="15" icon="⚠️" iconBgColor="bg-blue-100" iconColor="text-blue-600" />
    <MetricCard title="Automation Rules" count="15" icon="⚙️" iconBgColor="bg-green-100" iconColor="text-green-600" />
    <MetricCard title="Flagged Items" count="15" icon="🚩" iconBgColor="bg-purple-100" iconColor="text-purple-600" />
    <MetricCard title="Success Rate" count="15%" icon="✅" iconBgColor="bg-orange-100" iconColor="text-orange-600" />
  </div>
)

const Toolbar = ({ active, setActive }) => {
  const tabs = useMemo(() => [
    { id: 'expiry', label: 'Expiry Reminders', icon: () => <span className="text-white">⏰</span> },
    { id: 'auto-flag', label: 'Auto Flagging', icon: () => <span className="text-white">➕</span> },
    { id: 'resume', label: 'Resume Feedback', icon: () => <span className="text-white">💬</span> },
    { id: 'course', label: 'Course Alerts', icon: () => <span className="text-white">📊</span> },
  ], [])

  return (
    <div className="w-full max-w-3xl mx-auto">
      <NavigationTabs navigationTabs={tabs} activeNavTab={active} setActiveNavTab={setActive} />
    </div>
  )
}

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

const AlertsAutomation = () => {
  const [activeToolbarTab, setActiveToolbarTab] = useState('expiry')

  const renderActiveTab = () => {
    switch (activeToolbarTab) {
      case 'expiry':
        return <ExpiryReminder />
      case 'auto-flag':
        return (
          <div className={`${TAILWIND_COLORS.CARD} p-6`}>
          </div>
        )
      case 'resume':
        return (
          <div className={`${TAILWIND_COLORS.CARD} p-6`}>
            
          </div>
        )
      case 'course':
        return (
          <div className={`${TAILWIND_COLORS.CARD} p-6`}>
          </div>
        )
      default:
        return <ExpiryReminder />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center items-center">
        <div className="text-center">
          <h1 className={`text-3xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Alerts & Automation</h1>
          <p className={`${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>Manage automated alerts, flagging system, and notification workflows</p>
        </div>
      </div>

      <StatCards />

      <Toolbar active={activeToolbarTab} setActive={setActiveToolbarTab} />

      {renderActiveTab()}
    </div>
  )
}

export default AlertsAutomation



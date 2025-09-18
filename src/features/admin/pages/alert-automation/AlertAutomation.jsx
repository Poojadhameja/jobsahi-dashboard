import React, { useMemo, useState } from 'react'
import MetricCard, { MatrixCard, Horizontal4Cards } from '../../../../shared/components/metricCard.jsx'
import { PrimaryButton, OutlineButton } from '../../../../shared/components/Button.jsx'
import { PillNavigation } from '../../../../shared/components/navigation.jsx'
import { COLORS, TAILWIND_COLORS } from '../../../../shared/WebConstant'
import ExpiryReminder from './ExpiryReminder.jsx'
import AutoFlagging from './AutoFlagging.jsx'
import ResumeFeedback from './ResumeFeedback.jsx'
import CourseAlerts from './CourseAlerts.jsx'

// Alert automation metrics data
const alertMetrics = [
  { title: "Active Alerts", value: "15", icon: "⚠️" },
  { title: "Automation Rules", value: "15", icon: "⚙️" },
  { title: "Flagged Items", value: "15", icon: "🚩" },
  { title: "Success Rate", value: "15%", icon: "✅" }
]

// Navigation tabs configuration
const navigationTabs = [
  { id: 'expiry', label: 'Expiry Reminders', icon: () => <span className="text-lg">⏰</span> },
  { id: 'auto-flag', label: 'Auto Flagging', icon: () => <span className="text-lg">➕</span> },
  { id: 'resume', label: 'Resume Feedback', icon: () => <span className="text-lg">💬</span> },
  { id: 'course', label: 'Course Alerts', icon: () => <span className="text-lg">📊</span> },
]

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
  const [activeTab, setActiveTab] = useState(0)

  const renderActiveTab = () => {
    switch (activeTab) {
      case 0:
        return <ExpiryReminder />
      case 1:
        return <AutoFlagging />
      case 2:
        return <ResumeFeedback />
      case 3:
        return <CourseAlerts />
      default:
        return <ExpiryReminder />
    }
  }

  return (
    <div className="space-y-6">
      <MatrixCard 
        title="Alerts & Automation"
        subtitle="Manage automated alerts, flagging system, and notification workflows"
      />

      <Horizontal4Cards data={alertMetrics} />

      <PillNavigation 
        tabs={navigationTabs} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      {renderActiveTab()}
    </div>
  )
}

export default AlertsAutomation



import React, { useState } from 'react'
import { LuBell, LuSend, LuFileText, LuLightbulb } from 'react-icons/lu'
import { MatrixCard } from '../../../../shared/components/metricCard'
import { PillNavigation } from '../../../../shared/components/navigation'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'
import SendNotice from './SendNotice'
import Templates from './Templates'
import AutoAlerts from './AutoAlerts'

export default function MessagingAlerts() {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    {
      id: 'send-notice',
      label: 'Send Notice',
      icon: LuSend,
      component: <SendNotice />
    },
    {
      id: 'templates',
      label: 'Templates',
      icon: LuBell,
      component: <Templates />
    },
    {
      id: 'auto-alerts',
      label: 'Auto Alerts',
      icon: LuLightbulb,
      component: <AutoAlerts />
    }
  ]

  return (
    <div className="space-y-5">
      {/* Header Section using MatrixCard */}
      <MatrixCard
        title="Messaging & Alerts"
        subtitle="Send notifications and manage automated alerts for students"
        titleColor={TAILWIND_COLORS.TEXT_PRIMARY}
        subtitleColor={TAILWIND_COLORS.TEXT_MUTED}
        className=""
      />

      {/* Navigation Pills using PillNavigation */}
      <div className="flex justify-center">
        <PillNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className=""
        />
      </div>

      {/* Tab Content */}
      <div className="mt-5">
        {tabs[activeTab]?.component}
      </div>
    </div>
  )
}

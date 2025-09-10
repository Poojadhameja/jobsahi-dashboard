import React from 'react'
import { TAILWIND_COLORS } from '../../../shared/WebConstant'
import { MatrixCard } from '../components/metricCard.jsx'

export default function ToolsLogs() {
  return (
    <div className="space-y-6">
      <MatrixCard 
        title="Admin Tools & Logs"
        subtitle="System administration tools and activity logs"
      />

      <div className={`${TAILWIND_COLORS.CARD} p-6`}>
        <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Coming Soon</h3>
        <p className="text-gray-600">
          This section will contain admin tools and system logs for monitoring and debugging.
        </p>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { MatrixCard } from '../../components/metricCard'
import { PillNavigation } from '../../../../shared/components/navigation.jsx'
import ActivityLogs from './ActivityLogs.jsx'
import ErrorLogs from './ErrorLogs.jsx'
import MessageLogs from './MessageLogs.jsx'
import RoleManagement from './RoleManagement.jsx'

export default function AdminTools() {
  const [activeTab, setActiveTab] = useState(0)

  // Navigation tabs for different admin tools (without icons)
  const adminToolsTabs = [
    {
      id: 'activity',
      label: 'Activity Logs'
    },
    {
      id: 'error',
      label: 'Error Logs'
    },
    {
      id: 'message',
      label: 'Message Logs'
    },
    {
      id: 'role',
      label: 'Role Management'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Title Card */}
      <MatrixCard 
        title="Admin Tools & Logs"
        subtitle="Comprehensive logging system and administrative tools for monitoring, debugging, managing your job portal platform"
        className=""
      />

      {/* Navigation Buttons */}
      {/* <div className=" "> */}
        <PillNavigation 
          tabs={adminToolsTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className=""
        />
      {/* </div> */}

      {/* Conditional Content Based on Active Tab */}
      {activeTab === 0 && <ActivityLogs />}
      {activeTab === 1 && <ErrorLogs />}
      {activeTab === 2 && <MessageLogs />}
      {activeTab === 3 && <RoleManagement />}
    </div>
  )
}

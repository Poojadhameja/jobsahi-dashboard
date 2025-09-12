import React, { useState } from 'react'
import { PillNavigation, MANAGEMENT_TABS } from '../../../../shared/components/navigation'
import StudentManagement from './StudentManagement'
import EmployerManagement from './employer_management/employer_management'
import InstituteManagement from './institute_management/institute_management'

// Active Tab Content Component
function ActiveTabContent({ activeTab }) {
  switch (activeTab) {
    case 0:
      return <StudentManagement />
    case 1:
      return <EmployerManagement />
    case 2:
      return <InstituteManagement />
    default:
      return <StudentManagement />
  }
}

export default function Management() {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      {/* <div className="mb-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Management Dashboard</h1>
        <p className="text-gray-600">Manage students, employers, and institutes from one place.</p>
      </div> */}

      {/* Navigation using shared component */}
      <PillNavigation 
        tabs={MANAGEMENT_TABS}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Active Component */}
      <ActiveTabContent activeTab={activeTab} />
    </div>
  )
}



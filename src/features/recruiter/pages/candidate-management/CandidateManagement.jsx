import React, { useState } from 'react'
import { LuZap, LuUsers } from 'react-icons/lu'
import { PillNavigation } from '../../../../shared/components/navigation'
import InstaMatch from './InstaMatch'
import ViewApplicants from './ViewApplicants'


const CandidateManagement = () => {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    {
      id: 'instamatch',
      label: 'InstaMatch',
      icon: LuZap
    },
    {
      id: 'view-applicants',
      label: 'View Applicants',
      icon: LuUsers
    }
  ]

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex)
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Green Navigation Pills */}
      <div className="mb-4">
        <PillNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          className="justify-start"
        />
      </div>

      {/* Conditional Rendering based on active tab */}
      {activeTab === 0 && <InstaMatch />}
      {activeTab === 1 && <ViewApplicants />}
    </div>
  )
}

export default CandidateManagement

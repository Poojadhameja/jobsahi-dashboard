import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LuPlus, LuSettings } from 'react-icons/lu'
import { MatrixCard } from '../../../../shared/components/metricCard'
import { PillNavigation } from '../../../../shared/components/navigation'
import CreateSkillPage from './CreateSkillPage'
import ManageSkillPage from './ManageSkillPage'

const SkillTest = () => {
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState(0)

  // Read tab from URL query params
  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam === 'manage') {
      setActiveTab(1)
    } else {
      setActiveTab(0)
    }
  }, [searchParams])

  const tabs = [
    {
      id: 'create',
      label: 'Create Test',
      icon: LuPlus
    },
    {
      id: 'manage',
      label: 'Manage Tests',
      icon: LuSettings
    }
  ]

  return (
    <div className="p-2">
      {/* Header */}
      <div className="mb-5">
        <MatrixCard 
          title="Skill Test"
          subtitle="Create and manage skill assessments for candidates"
        />
      </div>

      {/* Navigation Pills */}
      {/* <div className="mb-5">
        <PillNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          storageKey="recruiter_skill_test_tab"
        />
      </div> */}

      {/* Tab Content */}
      {activeTab === 0 && <CreateSkillPage />}
      {activeTab === 1 && <ManageSkillPage />}
    </div>
  )
}

export default SkillTest


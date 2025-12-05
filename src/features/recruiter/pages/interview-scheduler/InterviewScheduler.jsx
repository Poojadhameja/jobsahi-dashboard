import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LuCalendar, LuUsers } from 'react-icons/lu'
import { MatrixCard } from '../../../../shared/components/metricCard'
import { PillNavigation } from '../../../../shared/components/navigation'
import ScheduleInterviews from './ScheduleInterviews'
import PanelManagement from './PanelManagement'

const InterviewScheduler = () => {
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState(0)

  // Read tab from URL query params
  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam === 'panel') {
      setActiveTab(1)
    } else {
      setActiveTab(0)
    }
  }, [searchParams])

  const tabs = [
    {
      id: 'schedule',
      label: 'Schedule interviews',
      icon: LuCalendar
    },
    {
      id: 'panel',
      label: 'Panel Management',
      icon: LuUsers
    }
  ]

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex)
    if (tabIndex === 0) {
      console.log('Schedule interviews clicked')
      // TODO: Navigate to schedule interviews page
    } else if (tabIndex === 1) {
      console.log('Panel Management clicked')
      // TODO: Navigate to panel management page
    }
  }

  return (
    <div className="p-2">
      {/* Header */}
      <div className="mb-5">
        <MatrixCard 
          title="Interview Scheduler"
          subtitle="Manage interview and panel feedback efficiently"
        />
      </div>

      {/* Navigation Pills */}
      {/* <div className="">
        <PillNavigation
          tabs={tabs}
          activeTab={activeTab}
        onTabChange={handleTabChange}
        storageKey="recruiter_interview_scheduler_tab"
        />
      </div> */}

      {/* Tab Content */}
      {activeTab === 0 && <ScheduleInterviews />}
      {activeTab === 1 && <PanelManagement />}
    </div>
  )
}

export default InterviewScheduler

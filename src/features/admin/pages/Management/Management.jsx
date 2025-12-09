import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'
import StudentManagement from './StudentManagement'
import EmployerManagement from './employer-management/EmployerManagement'
import InstituteManagement from './institute-management/InstituteManagement'

export default function Management() {
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState(0)

  // Read tab from URL query params
  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam === 'employer') {
      setActiveTab(1)
    } else if (tabParam === 'institute') {
      setActiveTab(2)
    } else {
      setActiveTab(0)
    }
  }, [searchParams])

  // Debug: Check authentication status
  useEffect(() => {
    const token = localStorage.getItem("authToken")
    console.log('🔐 Auth Token Status:', token ? 'Present' : 'Missing')
    console.log('🔐 Token Value:', token ? `${token.substring(0, 20)}...` : 'No token')
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      {/* <div className="mb-6">
        <h1 className={`text-3xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>Management Dashboard</h1>
        <p className={TAILWIND_COLORS.TEXT_MUTED}>Manage candidates, recruiters, and skill partners from one place.</p>
      </div> */}

      {/* Navigation using shared component */}
      {/* <PillNavigation 
        tabs={MANAGEMENT_TABS}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        storageKey="admin_management_tab"
      /> */}

      {/* Active Component */}
      {activeTab === 0 && <StudentManagement />}
      {activeTab === 1 && <EmployerManagement />}
      {activeTab === 2 && <InstituteManagement />}
    </div>
  )
}

import React, { useState } from 'react'
import { MatrixCard } from '../../../../../shared/components/metricCard'
import { PillNavigation } from '../../../../../shared/components/navigation'
import { 
  LuCheck, 
  LuBookOpen, 
  LuUsers, 
  LuAward, 
  LuMessageSquare 
} from 'react-icons/lu'
import PendingInstituteApprovals from './PendingInstitute'
import CourseMonitoring from './CourseMonitoring'
import PlacementStudent from './PlacementStudent'
import CertificateIssuance from './CertificateIssuance'
import MessageInstitute from './MessageInstitute'


export default function InstituteManagement() {
  const [activeTab, setActiveTab] = useState(0)

  // Navigation tabs configuration
  const navigationTabs = [
    { id: 'verify-approve', label: 'Verify / Approve Institute', icon: LuCheck },
    { id: 'course-monitoring', label: 'Course & Enrollment Monitoring', icon: LuBookOpen },
    { id: 'placement-students', label: 'Placement-Ready Students', icon: LuUsers },
    { id: 'certificate-issuance', label: 'Certificate Issuance', icon: LuAward },
    { id: 'message-institute', label: 'Message Specific Institute', icon: LuMessageSquare }
  ]

  return (
    <div className="space-y-6">
      {/* Title Section with MatrixCard */}
      <MatrixCard 
        title="Institute Management"
        subtitle="Manage institute onboarding, course monitoring, payments, and communications."
        className="mb-6"  
      />

      {/* Navigation Tabs */}
      <PillNavigation 
        tabs={navigationTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Conditional Content */}
      {activeTab === 0 && (
        <PendingInstituteApprovals />
      )}

      {activeTab === 1 && (
        <CourseMonitoring />
      )}

      {activeTab === 2 && (
        <PlacementStudent />
      )}

      {activeTab === 3 && (
        <CertificateIssuance />
      )}

      {activeTab === 4 && (
        <MessageInstitute />
      )}
     </div>
  )
}
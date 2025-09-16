import React, { useState } from 'react'
import { MatrixCard } from '../../../components/metricCard'
import { PillNavigation } from '../../../../../shared/components/navigation'
import PendingInstituteApprovals from './pending_institute'
import CourseMonitoring from './course_monitoring'
import PlacementStudent from './placement_student'
import CertificateInsurance from './certificate_insurance'
import MessageInstitute from './message_institute'


export default function InstituteManagement() {
  const [activeTab, setActiveTab] = useState(0)

  // Navigation tabs configuration
  const navigationTabs = [
    { id: 'verify-approve', label: 'Verify / Approve Institute' },
    { id: 'course-monitoring', label: 'Course & Enrollment Monitoring' },
    { id: 'placement-students', label: 'Placement-Ready Students' },
    { id: 'certificate-issuance', label: 'Certificate Issuance' },
    { id: 'message-institute', label: 'Message Specific Institute' }
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
        <CertificateInsurance />
      )}

      {activeTab === 4 && (
        <MessageInstitute />
      )}
     </div>
  )
}
import React, { useState } from 'react'
import { MatrixCard } from '../../../../../shared/components/metricCard'
import PendingInstituteApprovals from './PendingInstitute'
import CourseMonitoring from './CourseMonitoring'
import PlacementStudent from './PlacementStudent'
import CertificateInsurance from './CertificateInsurance'
import MessageInstitute from './MessageInstitute'


export default function InstituteManagement() {
  const [activeButton, setActiveButton] = useState('verify-approve')

  return (
    <div className="space-y-6">
      {/* Title Section with MatrixCard */}
      <MatrixCard 
        title="Institute Management"
        subtitle="Manage institute onboarding, course monitoring, payments, and communications."
        className="mb-6"  
      />

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => setActiveButton('verify-approve')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
            activeButton === 'verify-approve' 
              ? 'bg-[#0B537D] text-white' 
              : 'bg-white text-black border border-blue-200'
          }`}
        >
          Verify / Approve Institute
        </button>
        <button 
          onClick={() => setActiveButton('course-monitoring')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
            activeButton === 'course-monitoring' 
              ? 'bg-[#0B537D] text-white' 
              : 'bg-white text-black border border-blue-200'
          }`}
        >
          Course & Enrollment Monitoring
        </button>
        <button 
          onClick={() => setActiveButton('placement-students')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
            activeButton === 'placement-students' 
              ? 'bg-[#0B537D] text-white' 
              : 'bg-white text-black border border-blue-200'
          }`}
        >
          Placement-Ready Students
        </button>
        <button 
          onClick={() => setActiveButton('certificate-issuance')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
            activeButton === 'certificate-issuance' 
              ? 'bg-[#0B537D] text-white' 
              : 'bg-white text-black border border-blue-200'
          }`}
        >
          Certificate Issuance
        </button>
        <button 
          onClick={() => setActiveButton('message-institute')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
            activeButton === 'message-institute' 
              ? 'bg-[#0B537D] text-white' 
              : 'bg-white text-black border border-blue-200'
          }`}
        >
          Message Specific Institute
        </button>
      </div>

      {/* Conditional Content */}
      {activeButton === 'verify-approve' && (
        <PendingInstituteApprovals />
      )}

      {activeButton === 'course-monitoring' && (
        <CourseMonitoring />
      )}

      {activeButton === 'placement-students' && (
        <PlacementStudent />
      )}

       {activeButton === 'certificate-issuance' && (
         <CertificateInsurance />
       )}

       {activeButton === 'message-institute' && (
         <MessageInstitute />
       )}
     </div>
  )
}
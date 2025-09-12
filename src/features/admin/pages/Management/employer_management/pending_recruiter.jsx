import React from 'react'
import { TAILWIND_COLORS } from '../../../../../shared/WebConstant'
import { 
  LuPaperclip, 
  LuEye, 
  LuCheck, 
  LuX,
  LuFileText,
  LuBuilding,
  LuCalendar
} from 'react-icons/lu'

// Approval Card Component
function ApprovalCard({ company, recruiter, email, phone, website, industry, employees, appliedDate, documents }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-start justify-between">
        {/* Left Side - Company Info */}
        <div className="flex items-start space-x-4 flex-1">
          {/* Avatar */}
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <LuBuilding className="text-gray-500" size={24} />
          </div>
          
          {/* Company Details */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">{company}</h3>
            <p className="text-sm text-gray-600 mb-2">{recruiter}</p>
            
            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
              <span>{email}</span>
              <span>{phone}</span>
              <div className="flex items-center gap-2">
                <span>{website}</span>
                <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">P A</span>
              </div>
            </div>
            
            {/* Company Attributes */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">{industry}</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">{employees}</span>
            </div>
            
            {/* Applied Date */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <LuCalendar size={16} />
              <span>Applied: {appliedDate}</span>
            </div>
            
            {/* Documents */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Documents submitted:</p>
              <div className="flex flex-wrap gap-2">
                {documents.map((doc, index) => (
                  <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full flex items-center gap-1">
                    <LuFileText size={14} />
                    {doc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Action Buttons */}
        <div className="flex flex-col space-y-2 ml-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200">
            <LuEye size={16} />
            <span className="text-sm font-medium">Review</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
            <LuCheck size={16} />
            <span className="text-sm font-medium">Approve</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200">
            <LuX size={16} />
            <span className="text-sm font-medium">Reject</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function PendingRecruiterApprovals() {
  // Sample data
  const pendingApprovals = [
    {
      company: "TechCorp Solutions",
      recruiter: "Rahul Kumar",
      email: "rahul@techcorp.com",
      phone: "+91 9874563210",
      website: "techcorp.com",
      industry: "Technology",
      employees: "100-500 employees",
      appliedDate: "01-01-2025",
      documents: ["Business License", "Tax Certificate", "Company Profile"]
    },
    {
      company: "TechCorp Solutions",
      recruiter: "Rahul Kumar",
      email: "rahul@techcorp.com",
      phone: "+91 9874563210",
      website: "techcorp.com",
      industry: "Technology",
      employees: "100-500 employees",
      appliedDate: "01-01-2025",
      documents: ["Business License", "Tax Certificate", "Company Profile"]
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LuPaperclip className="text-gray-600" size={24} />
          <div>
            <h1 className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
              Pending Recruiter Approvals
            </h1>
            <p className="text-gray-600 mt-1">
              Review and approve new employer registrations.
            </p>
          </div>
        </div>
        
        {/* Status Badge */}
        <span className="px-4 py-2 border border-red-500 text-red-500 rounded-full text-sm font-medium">
          Pending
        </span>
      </div>

      {/* Approval Cards */}
      <div className="space-y-4">
        {pendingApprovals.map((approval, index) => (
          <ApprovalCard
            key={index}
            company={approval.company}
            recruiter={approval.recruiter}
            email={approval.email}
            phone={approval.phone}
            website={approval.website}
            industry={approval.industry}
            employees={approval.employees}
            appliedDate={approval.appliedDate}
            documents={approval.documents}
          />
        ))}
      </div>
    </div>
  )
}

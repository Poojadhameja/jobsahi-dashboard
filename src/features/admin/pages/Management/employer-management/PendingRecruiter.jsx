import React, { useState } from 'react'
import { TAILWIND_COLORS } from '../../../../../shared/WebConstant'
import { 
  LuPaperclip, 
  LuEye, 
  LuCheck, 
  LuX,
  LuFileText,
  LuBuilding,
  LuCalendar,
  LuMail,
  LuPhone,
  LuGlobe,
  LuMapPin,
  LuUsers,
  LuBriefcase
} from 'react-icons/lu'

// Approval Card Component
function ApprovalCard({ company, recruiter, email, phone, website, industry, employees, appliedDate, documents, onReview }) {
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
          <button 
            onClick={onReview}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
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

// Review Modal Component
function ReviewModal({ recruiter, isOpen, onClose }) {
  if (!isOpen || !recruiter) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Recruiter Details Review</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Company Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
              <LuBuilding className="text-blue-600" size={20} />
              Company Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Company Name</label>
                <p className="text-gray-800 font-medium">{recruiter.company}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Industry</label>
                <p className="text-gray-800">{recruiter.industry}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Company Size</label>
                <p className="text-gray-800">{recruiter.employees}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Website</label>
                <p className="text-gray-800">
                  <a href={`https://${recruiter.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {recruiter.website}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Person Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
              <LuUsers className="text-green-600" size={20} />
              Contact Person Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Contact Person</label>
                <p className="text-gray-800 font-medium">{recruiter.recruiter}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Email Address</label>
                <p className="text-gray-800 flex items-center gap-2">
                  <LuMail size={16} className="text-gray-400" />
                  <a href={`mailto:${recruiter.email}`} className="text-blue-600 hover:underline">
                    {recruiter.email}
                  </a>
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Phone Number</label>
                <p className="text-gray-800 flex items-center gap-2">
                  <LuPhone size={16} className="text-gray-400" />
                  <a href={`tel:${recruiter.phone}`} className="text-blue-600 hover:underline">
                    {recruiter.phone}
                  </a>
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Application Date</label>
                <p className="text-gray-800 flex items-center gap-2">
                  <LuCalendar size={16} className="text-gray-400" />
                  {recruiter.appliedDate}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
              <LuBriefcase className="text-purple-600" size={20} />
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Company Address</label>
                <p className="text-gray-800">123 Business Street, Tech City, TC 12345</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Registration Number</label>
                <p className="text-gray-800">REG-2024-TC-001</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">GST Number</label>
                <p className="text-gray-800">GST-2024-TC-001</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">PAN Number</label>
                <p className="text-gray-800">PAN-2024-TC-001</p>
              </div>
            </div>
          </div>

          {/* Documents Submitted */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
              <LuFileText className="text-orange-600" size={20} />
              Documents Submitted
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {recruiter.documents.map((doc, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <LuFileText size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{doc}</p>
                    <p className="text-xs text-gray-500">Verified</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Company Description */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Company Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {recruiter.company} is a leading technology company specializing in innovative solutions for modern businesses. 
              We are committed to providing exceptional services and building long-term partnerships with our clients. 
              Our team consists of experienced professionals dedicated to delivering high-quality results and maintaining 
              the highest standards of excellence in everything we do.
            </p>
          </div>
        </div>
        
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Close
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Proceed to Approval
          </button>
        </div>
      </div>
    </div>
  )
}

export default function PendingRecruiterApprovals() {
  // Modal state
  const [reviewModal, setReviewModal] = useState({ isOpen: false, recruiter: null })

  // Handle Review button click
  const handleReview = (recruiter) => {
    setReviewModal({ isOpen: true, recruiter })
  }

  const handleCloseReview = () => {
    setReviewModal({ isOpen: false, recruiter: null })
  }

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
            onReview={() => handleReview(approval)}
          />
        ))}
      </div>

      {/* Review Modal */}
      <ReviewModal 
        recruiter={reviewModal.recruiter}
        isOpen={reviewModal.isOpen}
        onClose={handleCloseReview}
      />
    </div>
  )
}

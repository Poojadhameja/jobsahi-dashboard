import React, { useState } from 'react'
import { TAILWIND_COLORS } from '../../../../../shared/WebConstant.js'
import Swal from 'sweetalert2'
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
import { postMethod, putMethod } from '../../../../../service/api'
import apiService from '../../../../admin/services/serviceUrl'
import { Button } from '../../../../../shared/components/Button'

// Approval Card Component
function ApprovalCard({ company, recruiter, email, phone, website, industry, employees, appliedDate, documents, onReview, onApprove, onReject }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-start justify-between">
        {/* Left Side - Company Info */}
        <div className="flex items-start space-x-4 flex-1">
          {/* Avatar */}
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <LuBuilding className={TAILWIND_COLORS.TEXT_MUTED} size={24} />
          </div>

          {/* Company Details */}
          <div className="flex-1">
            <h3 className={`text-lg font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{company}</h3>
            <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>{recruiter}</p>

            {/* Contact Info */}
            <div className={`flex flex-wrap gap-4 text-sm ${TAILWIND_COLORS.TEXT_MUTED} mb-3`}>
              <span className={TAILWIND_COLORS.TEXT_MUTED}>{email}</span>
              <span className={TAILWIND_COLORS.TEXT_MUTED}>{phone}</span>
              <div className="flex items-center gap-2">
                <span className={TAILWIND_COLORS.TEXT_MUTED}>{website}</span>
                <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">P A</span>
              </div>
            </div>

            {/* Company Attributes */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">{industry}</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">{employees}</span>
            </div>

            {/* Applied Date */}
            <div className={`flex items-center gap-2 text-sm ${TAILWIND_COLORS.TEXT_MUTED} mb-3`}>
              <LuCalendar size={16} />
              <span className={TAILWIND_COLORS.TEXT_MUTED}>Applied: {appliedDate}</span>
            </div>

            {/* Documents */}
            <div>
              <p className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>Documents submitted:</p>
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
          <Button
            onClick={onReview}
            variant="light"
            size="sm"
            icon={<LuEye size={16} />}
          >
            Review
          </Button>
          <Button
            onClick={onApprove}
            variant="success"
            size="sm"
            icon={<LuCheck size={16} />}
          >
            Approve
          </Button>
          <Button
            onClick={onReject}
            variant="danger"
            size="sm"
            icon={<LuX size={16} />}
          >
            Reject
          </Button>
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
          <h2 className={`text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Recruiter Review</h2>
          <Button
            onClick={onClose}
            variant="unstyled"
            className={`${TAILWIND_COLORS.TEXT_MUTED} hover:${TAILWIND_COLORS.TEXT_PRIMARY} transition-colors duration-200 p-2`}
          >
            <span className="text-2xl">&times;</span>
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Company Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className={`text-lg font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4 flex items-center gap-2`}>
              <LuBuilding className="text-blue-600" size={20} />
              Company Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>Company Name</label>
                <p className={`${TAILWIND_COLORS.TEXT_PRIMARY} font-medium`}>{recruiter.company}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>Recruiter Name</label>
                <p className={TAILWIND_COLORS.TEXT_PRIMARY}>{recruiter.recruiter}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>Email</label>
                <p className={TAILWIND_COLORS.TEXT_PRIMARY}>{recruiter.email}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>Phone</label>
                <p className={TAILWIND_COLORS.TEXT_PRIMARY}>{recruiter.phone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end">
          <Button
            onClick={onClose}
            variant="neutral"
            size="md"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function PendingRecruiterApprovals({ employers }) {
  const [reviewModal, setReviewModal] = useState({ isOpen: false, recruiter: null })

  const handleReview = (recruiter) => {
    setReviewModal({ isOpen: true, recruiter })
  }

  const handleCloseReview = () => {
    setReviewModal({ isOpen: false, recruiter: null })
  }

  const handleApprove = (recruiterId) => {
    Swal.fire({
      title: 'Approve Recruiter',
      text: 'Are you sure you want to approve this recruiter?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10B981',
      cancelButtonColor: '#EF4444',
      confirmButtonText: 'Yes, Approve!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: Add API call to approve recruiter
        try {
          var data = {
            apiUrl: apiService.updateEmployer,
            payload: {
              id: recruiterId,
              admin_action: "approved"
            },
          };

          var response = postMethod(data);
          // console.log(response)
          if (response.status === true) {
            Swal.fire({
              title: 'Approved!',
              text: 'Recruiter has been approved successfully.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            })
          } else {
            Swal.fire({
              title: "Failed",
              text: response.message || "Profile updated but you are not authorized to view it",
              icon: "error"
            });
          }
        } catch (error) {
          // console.error("API Error:", error)
          // alert("Something went wrong. Please try again.")
          Swal.fire({
            title: "API Error",
            text: "Something went wrong. Please try again.",
            icon: "error"
          });
        }
      }
    })
  }

  const handleReject = (recruiterId) => {
    Swal.fire({
      title: 'Reject Recruiter',
      text: 'Are you sure you want to reject this recruiter?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, Reject!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: Add API call to reject recruiter
        try {
          var data = {
            apiUrl: apiService.updateEmployer,
            payload: {
              id: recruiterId,
              admin_action: 'rejected'
            },
          };

          var response = postMethod(data);
          // console.log(response)
          if (response.status === true) {
            Swal.fire({
              title: 'Rejected!',
              text: 'Recruiter has been rejected.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            })
          } else {
            Swal.fire({
              title: "Failed",
              text: response.message || "Profile updated but you are not authorized to view it",
              icon: "error"
            });
          }
        } catch (error) {
          // console.error("API Error:", error)
          // alert("Something went wrong. Please try again.")
          Swal.fire({
            title: "API Error",
            text: "Something went wrong. Please try again.",
            icon: "error"
          });
        }
      }
    })
  }

  const pendingApprovals = employers.map((item, index) => ({
    id: item.id,
    company: item.company_name,
    recruiter: item.user_name || "Recruiter Name",
    email: item.email,
    role: item.role,
    profile_id: item.profile_id,
    phone: item.phone_number || "+91 9874563210",
    website: item.website || "company.com",
    industry: item.industry || "Technology",
    employees: item.employees || "100-500 employees",
    appliedDate: item.created_at ? new Date(item.created_at).toLocaleDateString() : "01-01-2025",
    documents: ["Business License", "Tax Certificate", "Company Profile"]
  }));

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LuPaperclip className={TAILWIND_COLORS.TEXT_MUTED} size={24} />
          <div>
            <h1 className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
              Pending Recruiter Approvals
            </h1>
            <p className={`${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>
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
            onApprove={() => handleApprove(approval.profile_id)}
            onReject={() => handleReject(approval.profile_id)}
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

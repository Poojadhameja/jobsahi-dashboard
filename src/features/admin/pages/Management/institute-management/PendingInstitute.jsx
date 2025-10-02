import React, { useState } from 'react'
import { 
  LuBuilding,
  LuMail,
  LuPhone,
  LuGlobe,
  LuMapPin,
  LuUsers,
  LuCalendar,
  LuFileText,
  LuCheck,
  LuX,
  LuEye
} from 'react-icons/lu'
import Swal from 'sweetalert2'

// Institute Approval Card Component
function InstituteApprovalCard({ institute, onViewDetails, onApprove, onReject }) {
  const getStatusBadge = (status) => {
    const statusStyles = {
      'PENDING REVIEW': 'bg-orange-100 text-orange-800',
      'APPROVED': 'bg-green-100 text-green-800',
      'REJECTED': 'bg-red-100 text-red-800'
    }
    
    return (
      <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}>
        {status}
      </span>
    )
  }
  return (
    <div className="bg-white rounded-lg border border-blue-200 p-6 shadow-sm">
      {/* Institute Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">{institute.initials}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg">{institute.name}</h3>
          <p className="text-gray-600 text-sm">{institute.email}</p>
        </div>
      </div>

      {/* Institute Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <span className="text-sm text-gray-600">Location:</span>
          <p className="font-medium text-gray-900">{institute.location}</p>
        </div>
        <div>
          <span className="text-sm text-gray-600">Established:</span>
          <p className="font-medium text-gray-900">{institute.established}</p>
        </div>
        <div>
          <span className="text-sm text-gray-600">Students:</span>
          <p className="font-medium text-gray-900">{institute.students}</p>
        </div>
        <div>
          <span className="text-sm text-gray-600">Courses:</span>
          <p className="font-medium text-gray-900">{institute.courses}</p>
        </div>
      </div>

      {/* Status and Actions */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          {getStatusBadge(institute.status)}
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => onViewDetails(institute)}
            className="text-sm px-2 py-2 border-2 border-blue-600 text-blue-600 hover:text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
          >
            <LuEye size={16} />
            View Details
          </button>
          {institute.status === 'PENDING REVIEW' && (
            <>
              <button 
                onClick={() => onApprove(institute.id)}
                className="text-sm px-2 py-2 border-2 border-green-600 text-green-600 hover:text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
              >
                <LuCheck size={16} />
                Approve
              </button>
              <button 
                onClick={() => onReject(institute.id)}
                className="text-sm px-2 py-2 border-2 border-red-600 text-red-600 hover:text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center gap-2"
              >
                <LuX size={16} />
                Reject
              </button>
            </>
          )}
          {institute.status === 'APPROVED' && (
            <button 
              onClick={() => onReject(institute.id)}
              className="text-sm px-2 py-2 border-2 border-red-600 text-red-600 hover:text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center gap-2"
            >
              <LuX size={16} />
              Change to Reject
            </button>
          )}
          {institute.status === 'REJECTED' && (
            <button 
              onClick={() => onApprove(institute.id)}
              className="text-sm px-2 py-2 border-2 border-green-600 text-green-600 hover:text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
            >
              <LuCheck size={16} />
              Change to Approve
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// View Details Modal Component
function ViewDetailsModal({ institute, isOpen, onClose }) {
  if (!isOpen || !institute) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Institute Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Institute Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
              <LuBuilding className="text-blue-600" size={20} />
              Institute Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Institute Name</label>
                <p className="text-gray-800 font-medium">{institute.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Email Address</label>
                <p className="text-gray-800 flex items-center gap-2">
                  <LuMail size={16} className="text-gray-400" />
                  <a href={`mailto:${institute.email}`} className="text-blue-600 hover:underline">
                    {institute.email}
                  </a>
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Location</label>
                <p className="text-gray-800 flex items-center gap-2">
                  <LuMapPin size={16} className="text-gray-400" />
                  {institute.location}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Established Year</label>
                <p className="text-gray-800 flex items-center gap-2">
                  <LuCalendar size={16} className="text-gray-400" />
                  {institute.established}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Student Count</label>
                <p className="text-gray-800 flex items-center gap-2">
                  <LuUsers size={16} className="text-gray-400" />
                  {institute.students}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Courses Offered</label>
                <p className="text-gray-800">{institute.courses}</p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
              <LuFileText className="text-green-600" size={20} />
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Phone Number</label>
                <p className="text-gray-800 flex items-center gap-2">
                  <LuPhone size={16} className="text-gray-400" />
                  <a href="tel:+919876543210" className="text-blue-600 hover:underline">
                    +91 9876543210
                  </a>
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Website</label>
                <p className="text-gray-800 flex items-center gap-2">
                  <LuGlobe size={16} className="text-gray-400" />
                  <a href="https://institute.example.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    institute.example.com
                  </a>
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Registration Number</label>
                <p className="text-gray-800">REG-2024-IT-001</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Affiliation</label>
                <p className="text-gray-800">AICTE Approved</p>
              </div>
            </div>
          </div>

          {/* Institute Description */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Institute Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {institute.name} is a leading technical institute specializing in vocational training and skill development. 
              We are committed to providing quality education and practical training to students, preparing them for 
              successful careers in their chosen fields. Our institute has been serving the community since {institute.established} 
              and has successfully trained over {institute.students} students.
            </p>
          </div>

          {/* Documents Submitted */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Documents Submitted</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {['Registration Certificate', 'AICTE Approval', 'GST Certificate', 'PAN Card', 'Bank Details', 'Infrastructure Photos'].map((doc, index) => (
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
        </div>
        
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default function PendingInstituteApprovals() {
  const [institutes, setInstitutes] = useState([
    {
      id: 1,
      initials: "ST",
      name: "Shri Technology Institute",
      email: "technical.institute@email.com",
      location: "Mumbai, Maharashtra",
      established: "2015",
      students: "2,500+",
      courses: "Electrician",
      status: "PENDING REVIEW"
    },
    {
      id: 2,
      initials: "IT",
      name: "Innovation Tech Institute",
      email: "innovation.tech@email.com",
      location: "Delhi, India",
      established: "2018",
      students: "1,800+",
      courses: "Plumber",
      status: "PENDING REVIEW"
    },
    {
      id: 3,
      initials: "CT",
      name: "Creative Technology Center",
      email: "creative.tech@email.com",
      location: "Bangalore, Karnataka",
      established: "2020",
      students: "3,200+",
      courses: "Carpenter",
      status: "PENDING REVIEW"
    }
  ])

  const [viewDetailsModal, setViewDetailsModal] = useState({ isOpen: false, institute: null })

  // Handle View Details
  const handleViewDetails = (institute) => {
    setViewDetailsModal({ isOpen: true, institute })
  }

  const handleCloseViewDetails = () => {
    setViewDetailsModal({ isOpen: false, institute: null })
  }

  // Handle Approve
  const handleApprove = (instituteId) => {
    setInstitutes(prevInstitutes => 
      prevInstitutes.map(institute => 
        institute.id === instituteId 
          ? { ...institute, status: 'APPROVED' }
          : institute
      )
    )
    
    Swal.fire({
      title: "Approved!",
      text: "Institute has been successfully approved.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false
    })
  }

  // Handle Reject
  const handleReject = (instituteId) => {
    setInstitutes(prevInstitutes => 
      prevInstitutes.map(institute => 
        institute.id === instituteId 
          ? { ...institute, status: 'REJECTED' }
          : institute
      )
    )
    
    Swal.fire({
      title: "Rejected!",
      text: "Institute has been rejected.",
      icon: "error",
      timer: 2000,
      showConfirmButton: false
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">✓</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Pending Institute Approvals</h2>
      </div>
      
      {/* Institute Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {institutes.map((institute) => (
          <InstituteApprovalCard 
            key={institute.id} 
            institute={institute}
            onViewDetails={handleViewDetails}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ))}
      </div>

      {/* View Details Modal */}
      <ViewDetailsModal 
        institute={viewDetailsModal.institute}
        isOpen={viewDetailsModal.isOpen}
        onClose={handleCloseViewDetails}
      />
    </div>
  )
}

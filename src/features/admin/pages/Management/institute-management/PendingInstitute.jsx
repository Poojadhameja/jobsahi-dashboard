import React from 'react'

// Institute Approval Card Component
function InstituteApprovalCard({ institute }) {
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
          <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
            PENDING REVIEW
          </span>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 border-2 border-blue-600 text-blue-600 hover:text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200">
            View Details
          </button>
          <button className="px-4 py-2 border-2 border-green-600 text-green-600 hover:text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200">
            Approve
          </button>
          <button className="px-4 py-2 border-2 border-red-600 text-red-600 hover:text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200">
            Reject
          </button>
        </div>
      </div>
    </div>
  )
}

export default function PendingInstituteApprovals() {
  const pendingInstitutes = [
    {
      id: 1,
      initials: "ST",
      name: "Shri Technology Institute",
      email: "technical.institute@email.com",
      location: "Mumbai, Maharashtra",
      established: "2015",
      students: "2,500+",
      courses: "Electrician"
    },
    {
      id: 2,
      initials: "ST",
      name: "Shri Technology Institute",
      email: "technical.institute@email.com",
      location: "Mumbai, Maharashtra",
      established: "2015",
      students: "2,500+",
      courses: "Electrician"
    },
    {
      id: 3,
      initials: "ST",
      name: "Shri Technology Institute",
      email: "technical.institute@email.com",
      location: "Mumbai, Maharashtra",
      established: "2015",
      students: "2,500+",
      courses: "Electrician"
    }
  ]

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
        {pendingInstitutes.map((institute) => (
          <InstituteApprovalCard key={institute.id} institute={institute} />
        ))}
      </div>
    </div>
  )
}

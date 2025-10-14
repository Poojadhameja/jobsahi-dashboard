import React, { useState } from 'react'
import { TAILWIND_COLORS } from '../../../../../shared/WebConstant.js'

// Job Flag/Review System (Fraud/spam control) Component
function FraudControlSystem() {
  const [timeFilter, setTimeFilter] = useState('All Time')

  const timeFilterOptions = [
    'All Time',
    'Last 7 Days',
    'Last 30 Days',
    'Last 3 Months',
    'Last 6 Months',
    'Last Year'
  ]

  const flaggedJobsData = [
    {
      id: 1,
      jobTitle: 'Electrician',
      company: 'Techcorp',
      flagReason: 'Duplicate posting detected',
      severity: 'High',
      status: 'Blocked'
    },
    {
      id: 2,
      jobTitle: 'Software Engineer',
      company: 'DataSoft Solutions',
      flagReason: 'Suspicious salary range',
      severity: 'Medium',
      status: 'Under Review'
    },
    {
      id: 3,
      jobTitle: 'Marketing Manager',
      company: 'CloudTech Inc',
      flagReason: 'Fake company profile',
      severity: 'High',
      status: 'Blocked'
    },
    {
      id: 4,
      jobTitle: 'Sales Representative',
      company: 'StartupHub',
      flagReason: 'Spam content detected',
      severity: 'Low',
      status: 'Resolved'
    },
    {
      id: 5,
      jobTitle: 'Graphic Designer',
      company: 'WebCraft Studio',
      flagReason: 'Duplicate posting detected',
      severity: 'High',
      status: 'Under Review'
    },
    {
      id: 6,
      jobTitle: 'Account Manager',
      company: 'InnovateTech',
      flagReason: 'Suspicious contact information',
      severity: 'Medium',
      status: 'Blocked'
    }
  ]

  const getSeverityBadge = (severity) => {
    const severityStyles = {
      'High': 'bg-red-100 text-red-800',
      'Medium': 'bg-orange-100 text-orange-800',
      'Low': 'bg-yellow-100 text-yellow-800'
    }
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${severityStyles[severity]}`}>
        {severity}
      </span>
    )
  }

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Blocked': 'bg-red-100 text-red-800',
      'Under Review': 'bg-orange-100 text-orange-800',
      'Resolved': 'bg-green-100 text-green-800'
    }
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {status}
      </span>
    )
  }

  const handleReview = (jobId) => {
    alert(`Reviewing job ID: ${jobId}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className={`${TAILWIND_COLORS.TEXT_MUTED} text-lg font-bold`}>📋</span>
            </div>
            <h2 className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Job Flag/Review System (Fraud/spam control)</h2>
          </div>
          <p className={`${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>Monitor & moderate flagged job postings and suspicious activities</p>
        </div>
        
        {/* Time Filter */}
        <div className="relative">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className={`appearance-none bg-gray-50 ${TAILWIND_COLORS.TEXT_PRIMARY} px-4 py-2 pr-8 rounded-lg text-sm font-medium border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {timeFilterOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className={TAILWIND_COLORS.TEXT_MUTED}>▼</span>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Flags */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}>Total Flags</p>
              <p className="text-2xl font-bold text-red-600">23</p>
              <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>This month</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-red-600 text-xl">🚩</span>
            </div>
          </div>
        </div>

        {/* Under Review */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}>Under Review</p>
              <p className="text-2xl font-bold text-orange-600">8</p>
              <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>Pending action</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 text-xl">⏳</span>
            </div>
          </div>
        </div>

        {/* Resolved */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}>Resolved</p>
              <p className="text-2xl font-bold text-green-600">12</p>
              <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>This month</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-xl">✅</span>
            </div>
          </div>
        </div>

        {/* Blocked Jobs */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}>Blocked Jobs</p>
              <p className="text-2xl font-bold text-red-600">3</p>
              <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>Spam/Fraud</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-red-600 text-xl">🚫</span>
            </div>
          </div>
        </div>
      </div>

      {/* Job Flagging Details Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Job Flagging Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className={`px-6 py-4 text-left text-xs font-medium ${TAILWIND_COLORS.TEXT_MUTED} uppercase tracking-wider`}>
                  Job Title
                </th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${TAILWIND_COLORS.TEXT_MUTED} uppercase tracking-wider`}>
                  Company
                </th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${TAILWIND_COLORS.TEXT_MUTED} uppercase tracking-wider`}>
                  Flag Reason
                </th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${TAILWIND_COLORS.TEXT_MUTED} uppercase tracking-wider`}>
                  Severity
                </th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${TAILWIND_COLORS.TEXT_MUTED} uppercase tracking-wider`}>
                  Status
                </th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${TAILWIND_COLORS.TEXT_MUTED} uppercase tracking-wider`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {flaggedJobsData.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{job.jobTitle}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{job.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{job.flagReason}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getSeverityBadge(job.severity)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(job.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleReview(job.id)}
                      className={`inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <span className="mr-1">👁️</span>
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default FraudControlSystem
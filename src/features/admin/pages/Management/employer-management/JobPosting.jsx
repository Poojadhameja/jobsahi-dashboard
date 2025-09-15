import React, { useState } from 'react'

// Job Posting Analytics Component
function JobPostingAnalytics() {
  const [timeFilter, setTimeFilter] = useState('All Time')

  const timeFilterOptions = [
    'All Time',
    'Last 7 Days',
    'Last 30 Days',
    'Last 3 Months',
    'Last 6 Months',
    'Last Year'
  ]

  const analyticsData = [
    {
      id: 1,
      company: 'TechCorp',
      contactPerson: 'Rahul Kumar',
      status: 'Active',
      jobsPosted: 45,
      totalApplicants: 1250,
      shortlisted: 85,
      successRate: 5,
      lastActivity: '01-01-2025'
    },
    {
      id: 2,
      company: 'InnovateTech',
      contactPerson: 'Priya Sharma',
      status: 'Active',
      jobsPosted: 32,
      totalApplicants: 890,
      shortlisted: 67,
      successRate: 8,
      lastActivity: '02-01-2025'
    },
    {
      id: 3,
      company: 'DataSoft Solutions',
      contactPerson: 'Amit Patel',
      status: 'Inactive',
      jobsPosted: 28,
      totalApplicants: 650,
      shortlisted: 45,
      successRate: 7,
      lastActivity: '28-12-2024'
    },
    {
      id: 4,
      company: 'CloudTech Inc',
      contactPerson: 'Sneha Gupta',
      status: 'Active',
      jobsPosted: 51,
      totalApplicants: 1450,
      shortlisted: 92,
      successRate: 6,
      lastActivity: '03-01-2025'
    },
    {
      id: 5,
      company: 'StartupHub',
      contactPerson: 'Vikram Singh',
      status: 'Pending',
      jobsPosted: 18,
      totalApplicants: 420,
      shortlisted: 28,
      successRate: 7,
      lastActivity: '30-12-2024'
    }
  ]

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800',
      'Pending': 'bg-yellow-100 text-yellow-800'
    }
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {status}
      </span>
    )
  }

  const getSuccessRateBar = (rate) => {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-900">{rate}%</span>
        <div className="w-16 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gray-600 h-2 rounded-full" 
            style={{ width: `${rate}%` }}
          ></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-lg font-bold">📊</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Job Posting Analytics</h2>
          </div>
          <p className="text-gray-600 mt-1">Track jobs posted, applications received, and shortlisting activity</p>
        </div>
        
        {/* Time Filter */}
        <div className="relative">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="appearance-none bg-green-50 text-green-800 px-4 py-2 pr-8 rounded-full text-sm font-medium border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {timeFilterOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-green-600">▼</span>
          </div>
        </div>
      </div>

      {/* Analytics Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jobs Posted
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Applicants
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shortlisted
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Success Rate
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Activity
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analyticsData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                        <span className="text-gray-500 text-sm font-medium">
                          {item.company.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">{item.company}</div>
                        <div className="text-sm text-gray-500">{item.contactPerson}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-blue-600 mr-2">💼</span>
                      <span className="text-sm font-medium text-gray-900">{item.jobsPosted}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-blue-600 mr-2">👥</span>
                      <span className="text-sm font-medium text-gray-900">{item.totalApplicants.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-yellow-600 mr-2">⭐</span>
                      <span className="text-sm font-medium text-gray-900">{item.shortlisted}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getSuccessRateBar(item.successRate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.lastActivity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-gray-400 hover:text-gray-600">
                      <span className="text-lg">⋯</span>
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

export default JobPostingAnalytics

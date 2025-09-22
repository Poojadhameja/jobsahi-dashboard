import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LuTrendingUp, LuUsers, LuActivity } from 'react-icons/lu'

export default function ReportsAnalytics() {
  const navigate = useNavigate()

  const handleCoursePopularity = () => {
    navigate('/institute/reports-analytics/course-popularity')
  }

  const handleStudentCompletion = () => {
    navigate('/institute/reports-analytics/student-completion')
  }

  return (
    <div className="p-2">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600 mt-2">View detailed reports and analytics for your institute.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Course Popularity</h3>
            <LuTrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-gray-600 mb-4">Analyze which courses are most popular among students.</p>
          <button onClick={handleCoursePopularity} className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            View Course Analytics
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Student Completion</h3>
            <LuUsers className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-gray-600 mb-4">Track student completion rates and progress.</p>
          <button onClick={handleStudentCompletion} className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
            View Completion Reports
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Overall Analytics</h3>
            <LuActivity className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-gray-600 mb-4">Comprehensive analytics dashboard for your institute.</p>
          <button className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
            View Analytics
          </button>
        </div>
      </div>
    </div>
  )
}

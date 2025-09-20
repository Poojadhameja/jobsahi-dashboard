import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LuBookOpen, LuUsers, LuMessageSquare, LuFileText, LuActivity, LuSettings } from 'react-icons/lu'

export default function Dashboard() {
  const navigate = useNavigate()

  const handleCourseManagement = () => {
    navigate('/institute/course-management')
  }

  const handleStudentManagement = () => {
    navigate('/institute/student-management')
  }

  const handleMessagingAlerts = () => {
    navigate('/institute/messaging-alerts')
  }

  const handleCertificatesCompletion = () => {
    navigate('/institute/certificates-completion')
  }

  const handleReportsAnalytics = () => {
    navigate('/institute/reports-analytics')
  }

  const handleProfileSetting = () => {
    navigate('/institute/profile-setting')
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Institute Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your institute management dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Course Management</h3>
            <LuBookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-gray-600 mb-4">Manage your courses, create new ones, and track course performance.</p>
          <button onClick={handleCourseManagement} className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Manage Courses
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Student Management</h3>
            <LuUsers className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-gray-600 mb-4">Manage students, track progress, and assign courses.</p>
          <button onClick={handleStudentManagement} className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
            Manage Students
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Messaging & Alerts</h3>
            <LuMessageSquare className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-gray-600 mb-4">Send messages and manage automated alerts for students.</p>
          <button onClick={handleMessagingAlerts} className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
            Messaging Center
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Certificates & Completion</h3>
            <LuFileText className="w-6 h-6 text-orange-600" />
          </div>
          <p className="text-gray-600 mb-4">Manage certificates, templates, and track completion status.</p>
          <button onClick={handleCertificatesCompletion} className="w-full bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors">
            Certificates
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Reports & Analytics</h3>
            <LuActivity className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-gray-600 mb-4">View detailed reports and analytics for your institute.</p>
          <button onClick={handleReportsAnalytics} className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
            View Reports
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Profile & Settings</h3>
            <LuSettings className="w-6 h-6 text-gray-600" />
          </div>
          <p className="text-gray-600 mb-4">Manage your institute profile and system settings.</p>
          <button onClick={handleProfileSetting} className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">
            Settings
          </button>
        </div>
      </div>
    </div>
  )
}

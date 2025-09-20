import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LuPlus, LuUsers, LuBookOpen, LuTrendingUp, LuMessageSquare, LuEye } from 'react-icons/lu'

export default function StudentManagementSystem() {
  const navigate = useNavigate()

  const handleAddStudents = () => {
    navigate('/institute/student-management/add')
  }

  const handleViewStudents = () => {
    navigate('/institute/student-management/view')
  }

  const handleAssignCourse = () => {
    navigate('/institute/student-management/assign-course')
  }

  const handleTrackProgress = () => {
    navigate('/institute/student-management/track-progress')
  }

  const handleSendMessages = () => {
    navigate('/institute/student-management/send-messages')
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Student Management System</h1>
        <p className="text-gray-600 mt-2">Manage students, track progress, and assign courses.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Add Students</h3>
            <LuPlus className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-gray-600 mb-4">Add new students to the system.</p>
          <button onClick={handleAddStudents} className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Add Students
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">View Students</h3>
            <LuEye className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-gray-600 mb-4">View and manage all students.</p>
          <button onClick={handleViewStudents} className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
            View Students
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Assign Course</h3>
            <LuBookOpen className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-gray-600 mb-4">Assign courses to students.</p>
          <button onClick={handleAssignCourse} className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
            Assign Course
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Track Progress</h3>
            <LuTrendingUp className="w-6 h-6 text-orange-600" />
          </div>
          <p className="text-gray-600 mb-4">Track student progress and performance.</p>
          <button onClick={handleTrackProgress} className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
            Track Progress
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Send Messages</h3>
            <LuMessageSquare className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-gray-600 mb-4">Send messages and notifications to students.</p>
          <button onClick={handleSendMessages} className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
            Send Messages
          </button>
        </div>
      </div>
    </div>
  )
}

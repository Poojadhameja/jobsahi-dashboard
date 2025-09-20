import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LuPlus, LuSettings, LuEye } from 'react-icons/lu'

export default function CourseManagement() {
  const navigate = useNavigate()

  const handleCreateCourse = () => {
    navigate('/institute/course-management/create')
  }

  const handleManageCourse = () => {
    navigate('/institute/course-management/manage')
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Course Management</h1>
        <p className="text-gray-600 mt-2">Manage your courses, create new ones, and track course performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Create New Course</h3>
            <LuPlus className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-gray-600 mb-4">Create a new course with modules, assignments, and assessments.</p>
          <button onClick={handleCreateCourse} className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Create Course
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Manage Courses</h3>
            <LuSettings className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-gray-600 mb-4">Edit, update, and manage existing courses.</p>
          <button onClick={handleManageCourse} className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
            Manage Courses
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">View All Courses</h3>
            <LuEye className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-gray-600 mb-4">View and monitor all your courses and their status.</p>
          <button className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
            View Courses
          </button>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LuArrowLeft } from 'react-icons/lu'
import Button from '../../../shared/components/Button.jsx'

export default function CreateCourse() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/institute/course-management')
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <Button 
          onClick={handleBack} 
          variant="outline" 
          className="mb-4 flex items-center gap-2"
        >
          <LuArrowLeft className="w-4 h-4" />
          Back to Course Management
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Create New Course</h1>
        <p className="text-gray-600 mt-2">Fill in the details to create a new course.</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter course title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Enter course description"
            />
          </div>
          <div className="flex gap-4">
            <Button className="px-6">Create Course</Button>
            <Button variant="outline" onClick={handleBack}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

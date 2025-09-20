import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LuPlus, LuUsers, LuCalendar, LuSettings, LuEye } from 'react-icons/lu'

export default function BatchManagement() {
  const navigate = useNavigate()

  const handleCreateBatch = () => {
    // Navigate to create batch page
    console.log('Create Batch clicked')
  }

  const handleViewBatches = () => {
    // Navigate to view batches page
    console.log('View Batches clicked')
  }

  const handleManageBatches = () => {
    // Navigate to manage batches page
    console.log('Manage Batches clicked')
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Batch Management</h1>
        <p className="text-gray-600 mt-2">Manage student batches, create new batches, and track batch performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Create New Batch</h3>
            <LuPlus className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-gray-600 mb-4">Create a new batch with students and course assignments.</p>
          <button onClick={handleCreateBatch} className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Create Batch
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">View All Batches</h3>
            <LuEye className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-gray-600 mb-4">View and monitor all batches and their status.</p>
          <button onClick={handleViewBatches} className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
            View Batches
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Manage Batches</h3>
            <LuSettings className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-gray-600 mb-4">Edit, update, and manage existing batches.</p>
          <button onClick={handleManageBatches} className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
            Manage Batches
          </button>
        </div>
      </div>
    </div>
  )
}

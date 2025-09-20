import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LuBuilding, LuUsers, LuHandshake, LuTrendingUp, LuCalendar } from 'react-icons/lu'

export default function PlacementCompletion() {
  const navigate = useNavigate()

  const handleAddPartner = () => {
    // Navigate to add partner page
    console.log('Add Partner clicked')
  }

  const handleViewPartners = () => {
    // Navigate to view partners page
    console.log('View Partners clicked')
  }

  const handlePlacementStats = () => {
    // Navigate to placement statistics page
    console.log('Placement Stats clicked')
  }

  const handleScheduleInterview = () => {
    // Navigate to schedule interview page
    console.log('Schedule Interview clicked')
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Placement Collaboration</h1>
        <p className="text-gray-600 mt-2">Manage placement partnerships, track placements, and collaborate with companies.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Add Partner</h3>
            <LuBuilding className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-gray-600 mb-4">Add new placement partners and companies.</p>
          <button onClick={handleAddPartner} className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Add Partner
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">View Partners</h3>
            <LuUsers className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-gray-600 mb-4">View and manage all placement partners.</p>
          <button onClick={handleViewPartners} className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
            View Partners
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Placement Stats</h3>
            <LuTrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-gray-600 mb-4">View placement statistics and success rates.</p>
          <button onClick={handlePlacementStats} className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
            View Stats
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Schedule Interview</h3>
            <LuCalendar className="w-6 h-6 text-orange-600" />
          </div>
          <p className="text-gray-600 mb-4">Schedule interviews with placement partners.</p>
          <button onClick={handleScheduleInterview} className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
            Schedule Interview
          </button>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LuBuilding, LuUsers, LuBell, LuSettings } from 'react-icons/lu'

export default function ProfileSetting() {
  const navigate = useNavigate()

  const handleInstituteProfile = () => {
    navigate('/institute/profile-setting/institute-profile')
  }

  const handleStaffManagement = () => {
    navigate('/institute/profile-setting/staff-management')
  }

  const handleNotificationPreferences = () => {
    navigate('/institute/profile-setting/notification-preferences')
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Profile & Settings</h1>
        <p className="text-gray-600 mt-2">Manage your institute profile and system settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Institute Profile</h3>
            <LuBuilding className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-gray-600 mb-4">Update your institute information and details.</p>
          <button onClick={handleInstituteProfile} className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Manage Profile
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Staff Management</h3>
            <LuUsers className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-gray-600 mb-4">Manage staff members and their permissions.</p>
          <button onClick={handleStaffManagement} className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
            Manage Staff
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            <LuBell className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-gray-600 mb-4">Configure notification preferences and settings.</p>
          <button onClick={handleNotificationPreferences} className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
            Notification Settings
          </button>
        </div>
      </div>
    </div>
  )
}

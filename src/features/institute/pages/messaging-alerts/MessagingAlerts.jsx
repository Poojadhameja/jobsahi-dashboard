import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LuBell, LuSend, LuFileText, LuSettings } from 'react-icons/lu'

export default function MessagingAlerts() {
  const navigate = useNavigate()

  const handleAutoAlerts = () => {
    navigate('/institute/messaging-alerts/auto-alerts')
  }

  const handleSendNotice = () => {
    navigate('/institute/messaging-alerts/send-notice')
  }

  const handleTemplates = () => {
    navigate('/institute/messaging-alerts/templates')
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Messaging & Alerts</h1>
        <p className="text-gray-600 mt-2">Manage messaging campaigns and automated alerts for students.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Auto Alerts</h3>
            <LuBell className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-gray-600 mb-4">Set up automated alerts and notifications.</p>
          <button onClick={handleAutoAlerts} className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Manage Auto Alerts
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Send Notice</h3>
            <LuSend className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-gray-600 mb-4">Send immediate notices and announcements.</p>
          <button onClick={handleSendNotice} className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
            Send Notice
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Templates</h3>
            <LuFileText className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-gray-600 mb-4">Manage message templates and formats.</p>
          <button onClick={handleTemplates} className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
            Manage Templates
          </button>
        </div>
      </div>
    </div>
  )
}

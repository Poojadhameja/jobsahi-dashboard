import React, { useState } from 'react'
import { PrimaryButton, OutlineButton } from '../../../../shared/components/Button.jsx'
import { COLORS, TAILWIND_COLORS } from '../../../../shared/WebConstant'

// Toggle Switch Component
const Toggle = ({ checked, onChange, label }) => (
  <label className="flex items-center gap-3 cursor-pointer select-none">
    <span
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
        checked ? 'bg-[#5C9A24]' : 'bg-gray-300'
      }`}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
    >
      <span
        className={`h-5 w-5 bg-white rounded-full shadow transform transition-transform duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-1'
        }`}
      />
    </span>
    <span className="text-sm text-gray-600">{label}</span>
  </label>
)

// Plan Expiry Settings Card
const PlanExpirySettings = ({ settings, onSettingsChange, onUpdateSettings }) => {
  const reminderDaysOptions = [
    { value: '1', label: '1 day' },
    { value: '3', label: '3 days' },
    { value: '7', label: '7 days' },
    { value: '14', label: '14 days' },
    { value: '30', label: '30 days' }
  ]

  const handleSubmit = () => {
    onUpdateSettings(settings)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full h-96 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[#5C9A24] text-lg">🔔</span>
        <h2 className="text-lg font-semibold text-[#0B537D]">Plan Expiry Settings</h2>
      </div>
      <p className="text-sm text-gray-600 mb-6">Configure automatic reminders for plan expiration</p>
      
      {/* Form Content */}
      <div className="space-y-1 flex-1">
        {/* Reminder Days Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reminder Days Before Expiry
          </label>
          <div className="relative">
            <select
              value={settings.reminderDays}
              onChange={(e) => onSettingsChange({ ...settings, reminderDays: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C9A24] focus:border-transparent appearance-none bg-white pr-8 text-sm"
            >
              <option value="">select days</option>
              {reminderDaysOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Email Template */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Template
          </label>
          <textarea
            value={settings.emailTemplate}
            onChange={(e) => onSettingsChange({ ...settings, emailTemplate: e.target.value })}
            placeholder="your plan expired in days. Renew now to continue..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C9A24] focus:border-transparent resize-none h-20 text-sm"
          />
        </div>

        {/* Toggle Switches */}
        <div className="space-y-2 pt-2">
          <Toggle 
            checked={settings.enableReminders} 
            onChange={(checked) => onSettingsChange({ ...settings, enableReminders: checked })} 
            label="Enable automatic reminders" 
          />
        </div>

        {/* Update Button */}
        <div className="pt-2">
          <PrimaryButton 
            onClick={handleSubmit}
            className="bg-[#5C9A24] hover:bg-[#4A7D1A] text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Save Settings
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}

// Recent Expiry Alerts Card
const RecentExpiryAlerts = ({ alerts, onReviewAlert }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full h-96 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[#5C9A24] text-lg">🔔</span>
        <h2 className="text-lg font-semibold text-[#0B537D]">Recent Expiry Alerts</h2>
      </div>
      <p className="text-sm text-gray-600 mb-6">Latest plan expiration notifications</p>

      {/* Alerts List */}
      <div className="space-y-4 flex-1 overflow-y-auto">
        {alerts.map((alert, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {alert.name}
              </p>
              <p className="text-xs text-gray-600 truncate">
                {alert.details}
              </p>
            </div>

            {/* Status and Actions */}
            <div className="flex items-center gap-2 ml-4">
              {/* Status Badge */}
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  alert.status === 'Reviewed' 
                    ? 'bg-white border border-[#5C9A24] text-[#5C9A24]' 
                    : 'bg-[#5C9A24] text-white'
                }`}
              >
                {alert.status}
              </span>
              
              {/* Review Button */}
              {alert.status === 'Sent' && (
                <OutlineButton 
                  onClick={() => onReviewAlert(index)}
                  className="border-[#5C9A24] text-[#5C9A24] hover:bg-[rgba(92,154,36,0.1)] px-3 py-1 text-xs font-medium rounded-lg"
                >
                  Review
                </OutlineButton>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Main Component
const ExpiryReminder = () => {
  // State management for plan expiry settings
  const [settings, setSettings] = useState({
    reminderDays: '7',
    emailTemplate: 'your plan expired in days. Renew now to continue...',
    enableReminders: true
  })

  // Sample alerts data
  const [alerts, setAlerts] = useState([
    {
      name: "Rahul Singh",
      details: "Premium plan expires in 7 days",
      status: "Sent"
    },
    {
      name: "Rahul Singh", 
      details: "Basic plan expires in 7 days",
      status: "Reviewed"
    },
    {
      name: "Rahul Singh",
      details: "Pro plan expires in 7 days", 
      status: "Sent"
    }
  ])

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings)
  }

  const handleUpdateSettings = (updatedSettings) => {
    // In a real app, this would call an API
    console.log('Updated settings:', updatedSettings)
    alert('Settings updated successfully!')
  }

  const handleReviewAlert = (alertIndex) => {
    setAlerts(prev => 
      prev.map((alert, index) => 
        index === alertIndex 
          ? { ...alert, status: alert.status === 'Sent' ? 'Reviewed' : 'Sent' }
          : alert
      )
    )
    console.log('Reviewing alert:', alertIndex)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Plan Expiry Settings */}
          <div>
            <PlanExpirySettings 
              settings={settings} 
              onSettingsChange={handleSettingsChange}
              onUpdateSettings={handleUpdateSettings}
            />
          </div>

          {/* Right Column - Recent Expiry Alerts */}
          <div>
            <RecentExpiryAlerts 
              alerts={alerts}
              onReviewAlert={handleReviewAlert}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExpiryReminder
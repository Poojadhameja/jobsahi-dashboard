import React, { useState } from 'react'
import { PrimaryButton, OutlineButton } from '../../../../shared/components/Button.jsx'
import { COLORS, TAILWIND_COLORS } from '../../../../shared/WebConstant'

// Toggle Switch Component
const Toggle = ({ checked, onChange, label }) => (
  <label className="flex items-center gap-3 cursor-pointer select-none">
    <span
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
        checked ? 'bg-[var(--color-secondary)]' : 'bg-gray-300'
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
          </svg>
        </div>
        <h2 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Plan Expiry Settings</h2>
      </div>
      <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mb-6`}>Configure automatic reminders for plan expiration</p>
      
      {/* Form Content */}
      <div className="space-y-6 flex-1">
        {/* Reminder Days Dropdown */}
        <div className="space-y-2">
          <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
            Reminder Days Before Expiry
          </label>
          <div className="relative">
            <select
              value={settings.reminderDays}
              onChange={(e) => onSettingsChange({ ...settings, reminderDays: e.target.value })}
              className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white pr-9 text-sm"
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
        <div className="space-y-2">
          <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
            Email Template
          </label>
          <textarea
            value={settings.emailTemplate}
            onChange={(e) => onSettingsChange({ ...settings, emailTemplate: e.target.value })}
            placeholder="Your plan expires in X days. Renew now to continue..."
            className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-sm"
          />
        </div>

        {/* Toggle Switches */}
        <div className="space-y-4">
          <Toggle 
            checked={settings.enableReminders} 
            onChange={(checked) => onSettingsChange({ ...settings, enableReminders: checked })} 
            label="Enable automatic reminders" 
          />
        </div>

        {/* Update Button */}
        <div className="pt-4">
          <PrimaryButton 
            onClick={handleSubmit}
            className="w-full h-12 bg-[var(--color-secondary)] hover:bg-secondary-dark text-white rounded-lg text-sm font-medium"
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
          </svg>
        </div>
        <h2 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Recent Expiry Alerts</h2>
      </div>
      <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mb-6`}>Latest plan expiration notifications</p>

      {/* Alerts List */}
      <div className="space-y-3 flex-1">
        {alerts.map((alert, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors duration-200"
          >
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>
                {alert.name}
              </h3>
              <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED}`}>
                {alert.details}
              </p>
            </div>

            {/* Status and Actions */}
            <div className="flex items-center gap-2 ml-4">
              {/* Status Badge */}
              <span
                className={`px-3 py-1 text-sm font-medium rounded-md whitespace-nowrap ${
                  alert.status === 'Reviewed' 
                    ? 'bg-[var(--color-secondary)] text-white' 
                    : 'bg-[var(--color-secondary)] text-white'
                }`}
              >
                {alert.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Main AutoFlagging Component
const AutoFlagging = () => {
  // State management for plan expiry settings
  const [settings, setSettings] = useState({
    reminderDays: '',
    emailTemplate: 'Your plan expires in X days. Renew now to continue...',
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
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
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
  )
}

export default AutoFlagging
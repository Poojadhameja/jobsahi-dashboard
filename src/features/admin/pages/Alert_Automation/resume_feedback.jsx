import React, { useState } from 'react'
import { PrimaryButton, OutlineButton } from '../../../../shared/components/Button.jsx'
import { COLORS, TAILWIND_COLORS } from '../../../../shared/WebConstant'

// ===== COMPONENT STRUCTURE =====

// Toggle Switch Component
const Toggle = ({ checked, onChange }) => (
  <label className="flex items-center cursor-pointer select-none">
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
  </label>
)

// AI Resume Feedback Card
const AIResumeFeedbackCard = ({ settings, onSettingsChange, onUpdateSettings }) => {
  const handleSubmit = () => {
    onUpdateSettings(settings)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-full">
      {/* Card Header with Bell Icon */}
      <div className="flex items-start mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg mr-4 flex-shrink-0">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 1 0-15 0v5h5l-5 5-5-5h5v-5a7.5 7.5 0 1 1 15 0v5z" />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Resume Feedback (Future Integration)</h2>
          <p className="text-gray-600 text-sm">Configure LLM-powered resume analysis and feedback system</p>
        </div>
      </div>

      {/* Coming Soon Banner */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Coming soon</h3>
          <p className="text-green-700 text-sm">
            this feature will integrate with large language models to provide automated resume feedback and suggestions to job seekers.
          </p>
        </div>
      </div>

      {/* Feedback Categories Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Feedback Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email Notifications */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-700 font-medium">Email Notifications</span>
            <Toggle
              checked={settings.emailNotifications}
              onChange={(checked) => onSettingsChange({ ...settings, emailNotifications: checked })}
            />
          </div>

          {/* Push Notifications */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-700 font-medium">Push Notifications</span>
            <Toggle
              checked={settings.pushNotifications}
              onChange={(checked) => onSettingsChange({ ...settings, pushNotifications: checked })}
            />
          </div>

          {/* Content Quality */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-700 font-medium">Content Quality</span>
            <Toggle
              checked={settings.contentQuality}
              onChange={(checked) => onSettingsChange({ ...settings, contentQuality: checked })}
            />
          </div>

          {/* Grammar & Language */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-700 font-medium">Grammar & Language</span>
            <Toggle
              checked={settings.grammarLanguage}
              onChange={(checked) => onSettingsChange({ ...settings, grammarLanguage: checked })}
            />
          </div>
        </div>
      </div>

      {/* Response Time Target Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Responsive time target</h3>
        <div className="relative">
          <select
            value={settings.responseTime}
            onChange={(e) => onSettingsChange({ ...settings, responseTime: e.target.value })}
            className="w-full md:w-64 px-4 py-3 border border-green-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none cursor-pointer"
            style={{ borderColor: COLORS.GREEN_PRIMARY }}
          >
            <option value="">select response time</option>
            <option value="instant">Instant (0-5 seconds)</option>
            <option value="fast">Fast (5-30 seconds)</option>
            <option value="normal">Normal (30 seconds - 2 minutes)</option>
            <option value="thorough">Thorough (2-5 minutes)</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Configure LLM Integration Button */}
      <div className="flex justify-center">
        <PrimaryButton
          onClick={handleSubmit}
          className="px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 hover:shadow-lg"
          style={{
            backgroundColor: COLORS.GREEN_PRIMARY,
            color: 'white',
            minWidth: '280px'
          }}
        >
          Configure LLM Integration
        </PrimaryButton>
      </div>
    </div>
  )
}

// ===== MAIN COMPONENT =====
const ResumeFeedback = () => {
  // State management for feedback settings
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    contentQuality: true,
    grammarLanguage: true,
    responseTime: ''
  })

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings)
  }

  const handleUpdateSettings = (updatedSettings) => {
    // In a real app, this would call an API
    console.log('Updated settings:', updatedSettings)
    alert('Settings updated successfully!')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Single Card Layout */}
        <AIResumeFeedbackCard 
          settings={settings} 
          onSettingsChange={handleSettingsChange}
          onUpdateSettings={handleUpdateSettings}
        />
      </div>
    </div>
  )
}

export default ResumeFeedback

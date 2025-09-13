import React, { useState } from 'react';
import { PrimaryButton, OutlineButton } from '../../../../shared/components/Button.jsx';
import { COLORS, TAILWIND_COLORS } from '../../../../shared/WebConstant';

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

// Course Deadline Settings Card
const CourseDeadlineSettings = ({ settings, onSettingsChange, onUpdateSettings }) => {
  const alertScheduleOptions = [
    '1 day before',
    '2 days before', 
    '1 week before',
    '2 weeks before',
    '1 month before'
  ]

  const handleSubmit = () => {
    onUpdateSettings(settings)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full h-96 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[#5C9A24] text-lg">🔔</span>
        <h2 className="text-lg font-semibold text-[#0B537D]">Course Deadline Settings</h2>
      </div>
      <p className="text-sm text-gray-600 mb-6">Automatic alerts for course deadlines</p>
      
      {/* Form Content */}
      <div className="space-y-1 flex-1">
        {/* Alert Schedule Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alert Schedule
          </label>
          <div className="relative">
            <select
              value={settings.alertSchedule}
              onChange={(e) => onSettingsChange({ ...settings, alertSchedule: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C9A24] focus:border-transparent appearance-none bg-white pr-8 text-sm"
            >
              <option value="">select alert timing</option>
              {alertScheduleOptions.map(option => (
                <option key={option} value={option}>
                  {option}
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

        {/* Notifications */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notifications
          </label>
          <div className="space-y-2">
            <Toggle 
              checked={settings.emailNotifications} 
              onChange={(checked) => onSettingsChange({ ...settings, emailNotifications: checked })} 
              label="Email Notifications" 
            />
            <Toggle 
              checked={settings.pushNotifications} 
              onChange={(checked) => onSettingsChange({ ...settings, pushNotifications: checked })} 
              label="Push Notifications" 
            />
          </div>
        </div>

        {/* Message Template */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message Template
          </label>
          <textarea
            value={settings.messageTemplate}
            onChange={(e) => onSettingsChange({ ...settings, messageTemplate: e.target.value })}
            placeholder="Reminder: your course (course_name) deadline is approaching"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C9A24] focus:border-transparent resize-none h-20 text-sm"
          />
        </div>

        {/* Save Button */}
        <div className="pt-2">
          <PrimaryButton 
            onClick={handleSubmit}
            className="bg-[#5C9A24] hover:bg-[#4A7D1A] text-white px-4 py-2 rounded-lg text-sm font-medium w-full"
          >
            Save Alert Settings
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}

// Upcoming Deadlines Card
const UpcomingDeadlines = ({ deadlines }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full h-96 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[#5C9A24] text-lg">📅</span>
        <h2 className="text-lg font-semibold text-[#0B537D]">Upcoming Deadlines</h2>
      </div>
      <p className="text-sm text-gray-600 mb-6">Courses with approaching deadlines</p>

      {/* Deadlines List */}
      <div className="space-y-4 flex-1 overflow-y-auto">
        {deadlines.map((deadline, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {deadline.courseName}
              </p>
              <p className="text-xs text-gray-600 truncate">
                {deadline.studentCount} students - Deadlines in {deadline.deadline}
              </p>
            </div>

            {/* Status Badge */}
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                deadline.status === 'alert sent' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}
            >
              {deadline.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Main CourseAlerts Component
const CourseAlerts = () => {
  // State management for course deadline settings
  const [settings, setSettings] = useState({
    alertSchedule: '',
    emailNotifications: true,
    pushNotifications: true,
    messageTemplate: 'Reminder: your course (course_name) deadline is approaching'
  })

  // Sample deadlines data
  const [deadlines, setDeadlines] = useState([
    {
      courseName: 'Digital Marketing Course',
      studentCount: 25,
      deadline: '1 week',
      status: 'alert sent'
    },
    {
      courseName: 'Digital Marketing Course', 
      studentCount: 25,
      deadline: '1 week',
      status: 'scheduled'
    },
    {
      courseName: 'Digital Marketing Course',
      studentCount: 25,
      deadline: '1 week', 
      status: 'scheduled'
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

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {/* Left Column - Course Deadline Settings */}
        <div>
          <CourseDeadlineSettings 
            settings={settings} 
            onSettingsChange={handleSettingsChange}
            onUpdateSettings={handleUpdateSettings}
          />
        </div>

        {/* Right Column - Upcoming Deadlines */}
        <div>
          <UpcomingDeadlines 
            deadlines={deadlines}
          />
        </div>
      </div>
    </div>
  )
};

export default CourseAlerts;

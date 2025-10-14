import React, { useState } from 'react';
import Button from '../../../../shared/components/Button.jsx';
import { COLORS, TAILWIND_COLORS } from '../../../../shared/WebConstant.js';

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
    <span className="text-sm text-text-muted">{label}</span>
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-secondary-10">
          <svg className="w-3 h-3 text-[var(--color-secondary)]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-text-primary">Course Deadline Settings</h2>
      </div>
      <p className="text-sm text-text-muted mb-6">Automatic alerts for course deadlines</p>
      
      {/* Form Content */}
      <div className="space-y-6 flex-1">
        {/* Alert Schedule Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            Alert Schedule
          </label>
          <div className="relative">
            <select
              value={settings.alertSchedule}
              onChange={(e) => onSettingsChange({ ...settings, alertSchedule: e.target.value })}
              className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none appearance-none bg-white pr-9 text-sm"
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

        {/* Notification Toggles */}
        <div className="space-y-4">
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

        {/* Message Template */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            Message Template
          </label>
          <input
            type="text"
            value={settings.messageTemplate}
            onChange={(e) => onSettingsChange({ ...settings, messageTemplate: e.target.value })}
            placeholder="Reminder: your course (course_name) deadline is approaching"
            className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none text-sm"
          />
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <Button 
            onClick={handleSubmit}
            variant="primary"
            size="md"
            fullWidth
            className="font-medium"
          >
            Save Alert Settings
          </Button>
        </div>
      </div>
    </div>
  )
}

// Upcoming Deadlines Card
const UpcomingDeadlines = ({ deadlines }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-secondary-10">
          <svg className="w-3 h-3 text-[var(--color-secondary)]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-text-primary">Upcoming Deadlines</h2>
      </div>
      <p className="text-sm text-text-muted mb-6">Courses with approaching deadlines</p>

      {/* Deadlines List */}
      <div className="space-y-3 flex-1">
        {deadlines.map((deadline, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors duration-200"
          >
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-text-primary mb-1">
                {deadline.courseName}
              </h3>
              <p className="text-xs text-text-muted">
                {deadline.studentCount} students - Deadline in {deadline.deadline}
              </p>
            </div>

            {/* Status Badge */}
            <span
              className={`px-3 py-1 text-sm font-medium rounded-md whitespace-nowrap ${
                deadline.status === 'alert sent' 
                  ? 'bg-[var(--color-secondary)] text-white' 
                  : 'bg-secondary-10 text-[var(--color-secondary)] border border-green-200'
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
      courseName: 'Digital marketing Course',
      studentCount: 25,
      deadline: '1 week',
      status: 'alert sent'
    },
    {
      courseName: 'Digital marketing Course', 
      studentCount: 25,
      deadline: '1 week',
      status: 'scheduled'
    },
    {
      courseName: 'Digital marketing Course',
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
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

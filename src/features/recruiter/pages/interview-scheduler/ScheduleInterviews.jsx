import React, { useState, useEffect, useRef } from 'react'
import { LuCalendar, LuClock, LuVideo, LuUsers, LuLink, LuPlus } from 'react-icons/lu'
import Calendar from '../../../../shared/components/Calendar'

const ScheduleInterviews = () => {
  const [selectedDate, setSelectedDate] = useState(new Date()) // Current date
  const [showDatePicker, setShowDatePicker] = useState(false)
  const datePickerRef = useRef(null)
  const [formData, setFormData] = useState({
    candidates: '',
    date: new Date().toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: '2-digit' 
    }),
    timeSlot: '',
    interviewMode: '',
    panelMembers: []
  })

  // Close date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Sample panel members
  const panelMembers = [
    { id: 1, name: 'Name of employee', role: 'Senior Developer', selected: false },
    { id: 2, name: 'Name of employee', role: 'Hr Manager', selected: false },
    { id: 3, name: 'Name of employee', role: 'Senior Developer', selected: false },
    { id: 4, name: 'Name of employee', role: 'Junior Developer', selected: false }
  ]

  // Sample scheduled interviews
  const scheduledInterviews = [
    {
      id: 1,
      candidate: {
        name: 'Rohit Singh',
        initials: 'RS',
        jobRole: 'Electrician',
        date: '25-03-25'
      },
      time: '10.00 AM',
      type: 'Virtual Call',
      round: 'Round 1',
      status: 'Scheduled',
      panelMembers: ['Hr manager', 'Senior Developer']
    },
    {
      id: 2,
      candidate: {
        name: 'Rohit Singh',
        initials: 'RS',
        jobRole: 'Electrician',
        date: '25-03-25'
      },
      time: '12.00 PM',
      type: 'Virtual Call',
      round: 'Round 1',
      status: 'Scheduled',
      panelMembers: ['Hr manager', 'Senior Developer']
    }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setFormData(prev => ({
      ...prev,
      date: date.toLocaleDateString('en-US', { 
        month: '2-digit', 
        day: '2-digit', 
        year: '2-digit' 
      })
    }))
    setShowDatePicker(false)
  }

  const handleDateFieldClick = () => {
    setShowDatePicker(!showDatePicker)
  }

  const handlePanelMemberToggle = (memberId) => {
    setFormData(prev => ({
      ...prev,
      panelMembers: prev.panelMembers.includes(memberId)
        ? prev.panelMembers.filter(id => id !== memberId)
        : [...prev.panelMembers, memberId]
    }))
  }

  const handleScheduleInterview = () => {
    console.log('Scheduling interview with data:', formData)
    // TODO: Implement interview scheduling logic
  }

  return (
    <div className="mt-5">
      {/* Top Section - Calendar and Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-5">
        {/* Calendar Panel */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 ">Calendar</h3>
            <p className="text-sm ">Select interview date</p>
          </div>
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
        </div>

        {/* Schedule New Interview Panel */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Schedule New Interview</h3>
            <p className="text-sm text-gray-600">Configure interview details and assign panel</p>
          </div>

          <div className="space-y-4">
            {/* Select Candidate(s) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Candidate(s)
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Choose candidates"
                  value={formData.candidates}
                  onChange={(e) => handleInputChange('candidates', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                />
                <div className="absolute right-3 top-2.5">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

          <div className="flex flex-col md:flex-row md:justify-between">
              {/* Date */}
              <div className="relative" ref={datePickerRef}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.date}
                  readOnly
                  onClick={handleDateFieldClick}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8 cursor-pointer"
                />
                <div className="absolute right-3 top-2.5">
                  <LuCalendar className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              
              {/* Date Picker Popup */}
              {showDatePicker && (
                <div className="absolute top-full left-0 mt-2 z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                  <Calendar
                    selectedDate={selectedDate}
                    onDateSelect={handleDateSelect}
                  />
                </div>
              )}
            </div>

            {/* Time slot */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time slot
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Select time"
                  value={formData.timeSlot}
                  onChange={(e) => handleInputChange('timeSlot', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                />
                <div className="absolute right-3 top-2.5">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

            {/* Interview Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interview Mode
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Select Mode"
                  value={formData.interviewMode}
                  onChange={(e) => handleInputChange('interviewMode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                />
                <div className="absolute right-3 top-2.5">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Assign Internal Panel */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Assign Internal Panel
              </label>
              <div className="grid grid-cols-2 gap-3">
                {panelMembers.map((member) => (
                  <div key={member.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      id={`panel-${member.id}`}
                      checked={formData.panelMembers.includes(member.id)}
                      onChange={() => handlePanelMemberToggle(member.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-gray-600">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <label htmlFor={`panel-${member.id}`} className="flex-1 cursor-pointer">
                      <div className="text-sm font-medium text-gray-900">{member.name}</div>
                      <div className="text-xs text-gray-500">{member.role}</div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule Interview Button */}
            <button
              onClick={handleScheduleInterview}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#5C9A24] text-white rounded-lg hover:bg-[#43711b] transition-colors font-medium"
            >
              <LuPlus className="w-4 h-4" />
              Schedule interview
            </button>
          </div>
        </div>
      </div>

      {/* Scheduled Interviews Panel */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Scheduled Interviews</h3>
          <p className="text-sm text-gray-600">Upcoming and completed interviews</p>
        </div>

        <div className="space-y-4">
          {scheduledInterviews.map((interview) => (
            <div key={interview.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              {/* Mobile Layout */}
              <div className="block md:hidden">
                {/* Candidate Info */}
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-gray-600">
                      {interview.candidate.initials}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{interview.candidate.name}</h4>
                    <p className="text-sm text-gray-600">{interview.candidate.jobRole}</p>
                  </div>
                  <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {interview.status}
                  </div>
                </div>

                {/* Interview Details - Mobile */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <LuCalendar className="w-4 h-4" />
                      <span>{interview.candidate.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <LuClock className="w-4 h-4" />
                      <span>{interview.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <a href="#" className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800">
                      <LuLink className="w-4 h-4" />
                      <span>Join Meeting</span>
                    </a>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <LuVideo className="w-4 h-4" />
                      <span>{interview.type}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <LuUsers className="w-4 h-4" />
                    <span>{interview.round}</span>
                  </div>
                </div>

                {/* Panel Members - Mobile */}
                <div>
                  <span className="text-sm text-gray-600">Panel:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {interview.panelMembers.map((member, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded"
                      >
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:flex items-center justify-between">
                {/* Candidate Information */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-600">
                      {interview.candidate.initials}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{interview.candidate.name}</h4>
                    <p className="text-sm text-gray-600">{interview.candidate.jobRole}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <LuCalendar className="w-3 h-3" />
                        <span>{interview.candidate.date}</span>
                      </div>
                      <a href="#" className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800">
                        <LuLink className="w-3 h-3" />
                        <span>Join Meeting</span>
                      </a>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {interview.panelMembers.map((member, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded"
                        >
                          {member}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Interview Details - Desktop */}
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                      <LuClock className="w-4 h-4" />
                      <span>{interview.time}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <LuVideo className="w-4 h-4" />
                      <span>{interview.type}</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                      <LuUsers className="w-4 h-4" />
                      <span>{interview.round}</span>
                    </div>
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {interview.status}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ScheduleInterviews


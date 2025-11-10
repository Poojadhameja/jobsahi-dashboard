import React, { useState, useEffect, useRef } from 'react'
import {
  LuCalendar,
  LuClock,
  LuVideo,
  LuUsers,
  LuLink,
  LuPlus,
  LuX,
  LuMapPin,
  LuChevronDown,
  LuCheck,
  LuSearch
} from 'react-icons/lu'
import Calendar from '../../../../shared/components/Calendar'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'
import { Button } from '../../../../shared/components/Button'
import { getMethod, postMethod } from '../../../../service/api'
import apiService from '../../services/serviceUrl'

const ScheduleInterviews = () => {
  const [selectedDate, setSelectedDate] = useState(new Date()) // Current date
  const [showCandidateDropdown, setShowCandidateDropdown] = useState(false)
  const candidateDropdownRef = useRef(null)
// 🔹 Application dropdown states
const [applications, setApplications] = useState([])
const [loadingApps, setLoadingApps] = useState(false)
const [showApplicationDropdown, setShowApplicationDropdown] = useState(false)
const applicationDropdownRef = useRef(null)


  // 🔹 Form State
  const [formData, setFormData] = useState({
   candidate_id: '', // ✅ will store student_id
  application_id: '',       // label: selected candidate name
    application_id: '',      // for API
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    timeSlot: '',
    interviewMode: '',
    location: ''
  })

  // 🔹 Candidates from API
  const [candidates, setCandidates] = useState([])
  const [loadingCandidates, setLoadingCandidates] = useState(false)

  // 🔹 Panel Members (static for UI)
  const panelMembers = [
    { id: 1, name: 'Anjali Roy', role: 'Senior Developer', selected: false },
    { id: 2, name: 'Shakti Singh', role: 'Hr Manager', selected: false },
    { id: 3, name: 'Dr. Rajesh Yadav', role: 'Senior Developer', selected: false },
    { id: 4, name: 'Suresh Kumar', role: 'Junior Developer', selected: false }
  ]

  // 🔹 Scheduled Interviews (starts with sample UI data)
  const [scheduledInterviews, setScheduledInterviews] = useState([
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
  ])

  // 🔹 Search + Edit State
  const [searchQuery, setSearchQuery] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedInterview, setSelectedInterview] = useState(null)
  const [editFormData, setEditFormData] = useState({
    candidate: '',
    date: '',
    timeSlot: '',
    interviewMode: '',
    location: '',
    round: '',
    status: ''
  })

  // =========================================================
  // 1) FETCH CANDIDATES FROM get_recent_applicants.php
  // =========================================================
  useEffect(() => {
    const fetchCandidates = async () => {
      setLoadingCandidates(true)
      try {
        const res = await getMethod({ apiUrl: apiService.getRecentApplicants })

        if (res?.status && Array.isArray(res?.all_applicants?.data)) {
          const formatted = res.all_applicants.data.map((item) => ({
            id: item.application_id,              // for React key / UI
            application_id: item.application_id,  // for schedule_interview API
            name: item.name,
            jobRole: item.applied_for || '—'
          }))
          setCandidates(formatted)
        } else {
          setCandidates([])
        }
      } catch (error) {
        console.error('❌ Error fetching candidates:', error)
        setCandidates([])
      } finally {
        setLoadingCandidates(false)
      }
    }

    fetchCandidates()
  }, [])

  // =========================================================
  // 2) DROPDOWN OUTSIDE CLICK
  // =========================================================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (candidateDropdownRef.current && !candidateDropdownRef.current.contains(event.target)) {
        setShowCandidateDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // =========================================================
  // 3) HELPERS
  // =========================================================
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const formatTimeTo12Hour = (time24) => {
    if (!time24) return ''
    const [h, m] = time24.split(':')
    const hours = parseInt(h, 10)
    const hour12 = hours % 12 || 12
    const ampm = hours >= 12 ? 'PM' : 'AM'
    return `${hour12}:${m} ${ampm}`
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setFormData(prev => ({
      ...prev,
      date: date.toISOString().split('T')[0]
    }))
  }

  const handleCandidateFieldClick = () => {
    setShowCandidateDropdown(!showCandidateDropdown)
  }

  // const handleCandidateSelect = (candidate) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     candidates: candidate.name,
  //     application_id: candidate.application_id
  //   }))
  //   setShowCandidateDropdown(false)
  // }
  const handleCandidateSelect = (candidate) => {
  setFormData((prev) => ({
    ...prev,
    candidates: candidate.name,
    candidate_id: candidate.student_id,
    application_id: candidate.application_id
  }));
  setShowCandidateDropdown(false);
};


  const buildScheduledAt = () =>
    `${formData.date} ${formData.timeSlot || '00:00'}:00`

  // =========================================================
  // 4) SCHEDULE INTERVIEW (calls schedule_interview.php)
  // =========================================================
  const handleScheduleInterview = async () => {
    // Frontend validations
    if (!formData.application_id) {
      alert('Please select a candidate.')
      return
    }
    if (!formData.date || !formData.timeSlot) {
      alert('Please select date and time.')
      return
    }
    if (!formData.interviewMode) {
      alert('Please select interview mode.')
      return
    }
    if (formData.interviewMode === 'offline' && !formData.location.trim()) {
      alert('Please enter interview location for offline mode.')
      return
    }

    const selectedCandidate = candidates.find(
      c => c.application_id === formData.application_id
    )

    if (!selectedCandidate) {
      alert('Selected candidate not found. Please choose again.')
      return
    }

    const payload = {
      application_id: Number(formData.application_id),
      scheduled_at: buildScheduledAt(), // "YYYY-MM-DD HH:MM:00"
      mode: formData.interviewMode,     // "online" / "offline"
      location:
        formData.interviewMode === 'offline'
          ? formData.location
          : 'Online Meeting Link',
      status: 'scheduled',
      feedback: 'Initial technical round'
    }

    try {
      const response = await postMethod({
        apiUrl: apiService.scheduleInterview,
        data: payload
      })

      if (response?.status) {
        alert('✅ Interview scheduled successfully!')

        // Push into local scheduledInterviews list for UI
        const dateObj = new Date(formData.date)
        const formattedDate = `${String(dateObj.getDate()).padStart(2, '0')}-${String(
          dateObj.getMonth() + 1
        ).padStart(2, '0')}-${String(dateObj.getFullYear()).slice(-2)}`
        const formattedTime = formatTimeTo12Hour(formData.timeSlot)
        const interviewType =
          formData.interviewMode === 'online' ? 'Virtual Call' : 'In-Person'

        const newInterview = {
          id: response.interview_id || scheduledInterviews.length + 1,
          candidate: {
            name: selectedCandidate.name,
            initials: selectedCandidate.name
              .split(' ')
              .map(n => n[0])
              .join(''),
            jobRole: selectedCandidate.jobRole,
            date: formattedDate
          },
          time: formattedTime,
          type: interviewType,
          round: 'Round 1',
          status: 'Scheduled',
          panelMembers: ['Hr manager', 'Senior Developer']
        }

        setScheduledInterviews(prev => [newInterview, ...prev])

        // Reset form
        setFormData({
          candidates: '',
          application_id: '',
          date: new Date().toISOString().split('T')[0],
          timeSlot: '',
          interviewMode: '',
          location: ''
        })
        setSelectedDate(new Date())
      } else {
        alert(`❌ ${response?.message || 'Failed to schedule interview.'}`)
      }
    } catch (error) {
      console.error('❌ Error scheduling interview:', error)
      alert('Server error while scheduling interview.')
    }
  }

  // =========================================================
  // 5) FILTER SCHEDULED INTERVIEWS (search box)
  // =========================================================
  const filteredInterviews = scheduledInterviews.filter((interview) => {
    const q = searchQuery.toLowerCase()
    return (
      interview.candidate.name.toLowerCase().includes(q) ||
      interview.candidate.jobRole.toLowerCase().includes(q) ||
      interview.time.toLowerCase().includes(q) ||
      interview.type.toLowerCase().includes(q) ||
      interview.round.toLowerCase().includes(q) ||
      interview.status.toLowerCase().includes(q) ||
      interview.panelMembers.some(m => m.toLowerCase().includes(q))
    )
  })

  // =========================================================
  // 6) EDIT INTERVIEW (purely frontend, as in your UI)
  // =========================================================
  const handleEditClick = (interview) => {
    setSelectedInterview(interview)

    const [day, month, year] = interview.candidate.date.split('-')
    const fullYear = '20' + year
    const formattedDate = `${fullYear}-${month}-${day}`

    const parseTimeTo24Hour = (time12) => {
      if (!time12) return ''
      const [time, period] = time12.split(' ')
      const [hh, mm] = time.split(':')
      let h = parseInt(hh, 10)
      if (period === 'PM' && h !== 12) h += 12
      if (period === 'AM' && h === 12) h = 0
      return `${String(h).padStart(2, '0')}:${mm}`
    }

    setEditFormData({
      candidate: interview.candidate.name,
      date: formattedDate,
      timeSlot: parseTimeTo24Hour(interview.time),
      interviewMode: interview.type === 'Virtual Call' ? 'online' : 'offline',
      location: '',
      round: interview.round,
      status: interview.status
    })

    setShowEditModal(true)
  }

  const handleEditInputChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleUpdateInterview = () => {
    if (!selectedInterview) return

    if (!editFormData.candidate || !editFormData.date || !editFormData.timeSlot) {
      alert('Please fill all required fields')
      return
    }

    const dateObj = new Date(editFormData.date)
    const formattedDate = `${String(dateObj.getDate()).padStart(2, '0')}-${String(
      dateObj.getMonth() + 1
    ).padStart(2, '0')}-${String(dateObj.getFullYear()).slice(-2)}`
    const formattedTime = formatTimeTo12Hour(editFormData.timeSlot)
    const interviewType =
      editFormData.interviewMode === 'online' ? 'Virtual Call' : 'In-Person'

    const selectedCandidate = candidates.find(
      c => c.name === editFormData.candidate
    )

    const updated = scheduledInterviews.map((interview) => {
      if (interview.id === selectedInterview.id) {
        return {
          ...interview,
          candidate: {
            name: editFormData.candidate,
            initials: selectedCandidate
              ? selectedCandidate.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')
              : interview.candidate.initials,
            jobRole: selectedCandidate
              ? selectedCandidate.jobRole
              : interview.candidate.jobRole,
            date: formattedDate
          },
          time: formattedTime,
          type: interviewType,
          round: editFormData.round,
          status: editFormData.status
        }
      }
      return interview
    })

    setScheduledInterviews(updated)
    setShowEditModal(false)
    setSelectedInterview(null)
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false)
    setSelectedInterview(null)
  }

  // =========================================================
  // 7) RENDER (UI unchanged)
  // =========================================================
  return (
    <div className="mt-5">
      {/* Top Section - Calendar and Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-5">
        {/* Calendar Panel */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="mb-4">
            <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Calendar</h3>
            <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Select interview date</p>
          </div>
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
        </div>

        {/* Schedule New Interview Panel */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>Schedule New Interview</h3>
            <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Configure interview details and assign panel</p>
          </div>

          <div className="space-y-4">
            {/* Select Candidate(s) */}
            <div className="relative" ref={candidateDropdownRef}>
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                Select Candidate(s)
              </label>
              <button
                type="button"
                onClick={handleCandidateFieldClick}
                className="w-full px-3 py-2 text-left flex items-center justify-between border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <span className={formData.candidates ? `${TAILWIND_COLORS.TEXT_PRIMARY}` : 'text-gray-400'}>
                  {formData.candidates ||
                    (loadingCandidates ? 'Loading candidates...' : 'Choose candidates')}
                </span>
                <LuChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    showCandidateDropdown ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Candidate Dropdown */}
              {showCandidateDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {candidates.length > 0 ? (
                    candidates.map((candidate) => (
                      <button
                        key={candidate.id}
                        type="button"
                        onClick={() => handleCandidateSelect(candidate)}
                        className={`w-full px-4 py-3 text-left hover:bg-primary-10 transition-colors ${
                          formData.candidates === candidate.name
                            ? 'bg-primary-10 text-primary'
                            : `${TAILWIND_COLORS.TEXT_PRIMARY}`
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-medium text-gray-600">
                              {candidate.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{candidate.name}</div>
                            <div className="text-sm text-gray-500">
                              {candidate.jobRole}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500">
                      No applicants found
                    </div>
                  )}
                </div>
              )}
              {/* 🔽 Select Application Dropdown (visible after student selection) */}
{formData.candidate_id && (
  <div className="relative mt-4" ref={applicationDropdownRef}>
    <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
      Select Application
    </label>
    <button
      type="button"
      onClick={handleApplicationFieldClick}
      className="w-full px-3 py-2 text-left flex items-center justify-between border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      <span className={formData.application_id ? `${TAILWIND_COLORS.TEXT_PRIMARY}` : 'text-gray-400'}>
        {formData.applicationTitle || 'Choose application'}
      </span>
      <LuChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showApplicationDropdown ? 'rotate-180' : ''}`} />
    </button>

    {/* Application Dropdown */}
    {showApplicationDropdown && (
      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
        {loadingApps ? (
          <div className="p-3 text-sm text-gray-500 text-center">Loading...</div>
        ) : applications.length > 0 ? (
          applications.map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={() => handleApplicationSelect(app)}
              className={`w-full px-4 py-3 text-left hover:bg-primary-10 transition-colors ${
                formData.application_id === app.id ? 'bg-primary-10 text-primary' : `${TAILWIND_COLORS.TEXT_PRIMARY}`
              }`}
            >
              <div className="flex flex-col">
                <span className="font-medium">{app.job_title}</span>
                <span className="text-xs text-gray-500">Status: {app.status}</span>
              </div>
            </button>
          ))
        ) : (
          <div className="p-3 text-sm text-gray-500 text-center">No applications found</div>
        )}
      </div>
    )}
  </div>
)}

            </div>

            {/* Date & Time */}
            <div className="flex flex-col md:flex-row md:justify-between">
              {/* Date */}
              <div className="relative w-full md:mr-2">
                <label
                  className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}
                >
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8 cursor-pointer"
                />
              </div>

              {/* Time slot */}
              <div className="relative w-full md:ml-2 mt-4 md:mt-0">
                <label
                  className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}
                >
                  Time slot
                </label>
                <input
                  type="time"
                  value={formData.timeSlot}
                  onChange={(e) =>
                    handleInputChange('timeSlot', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                />
              </div>
            </div>

            {/* Interview Mode */}
            <div>
              <label
                className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-3`}
              >
                Interview Mode
              </label>
              <div className="space-y-3">
                {/* Online Mode */}
                <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    id="online-mode"
                    name="interviewMode"
                    value="online"
                    checked={formData.interviewMode === 'online'}
                    onChange={(e) =>
                      handleInputChange('interviewMode', e.target.value)
                    }
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-blue-500"
                  />
                  <div className="flex items-center space-x-2">
                    <LuVideo className="w-5 h-5 text-primary" />
                    <label
                      htmlFor="online-mode"
                      className="cursor-pointer flex-1"
                    >
                      <div
                        className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}
                      >
                        Online
                      </div>
                      <div
                        className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED}`}
                      >
                        Virtual call or video conference
                      </div>
                    </label>
                  </div>
                </div>

                {/* Offline Mode */}
                <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    id="offline-mode"
                    name="interviewMode"
                    value="offline"
                    checked={formData.interviewMode === 'offline'}
                    onChange={(e) =>
                      handleInputChange('interviewMode', e.target.value)
                    }
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-blue-500"
                  />
                  <div className="flex items-center space-x-2">
                    <LuUsers className="w-5 h-5 text-green-600" />
                    <label
                      htmlFor="offline-mode"
                      className="cursor-pointer flex-1"
                    >
                      <div
                        className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}
                      >
                        Offline
                      </div>
                      <div
                        className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED}`}
                      >
                        In-person meeting at office
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Location (show only for offline mode) */}
            {formData.interviewMode === 'offline' && (
              <div>
                <label
                  className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}
                >
                  Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter interview location"
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange('location', e.target.value)
                    }
                    className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <LuMapPin className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
              </div>
            )}

            {/* Schedule Interview Button */}
            <Button
              onClick={handleScheduleInterview}
              variant="primary"
              size="lg"
              fullWidth
              icon={<LuCheck className="w-4 h-4" />}
            >
              Confirm Schedule
            </Button>
          </div>
        </div>
      </div>

      {/* Scheduled Interviews Panel */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h3
            className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}
          >
            Scheduled Interviews
          </h3>
          <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
            Upcoming and completed interviews
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by candidate name, job role, time, status, round..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredInterviews.map((interview) => (
            <div
              key={interview.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
            >
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
                    <h4
                      className={`font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} cursor-pointer hover:text-primary transition-colors`}
                      onClick={() => handleEditClick(interview)}
                    >
                      {interview.candidate.name}
                    </h4>
                    <p
                      className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}
                    >
                      {interview.candidate.jobRole}
                    </p>
                  </div>
                  <div
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${TAILWIND_COLORS.BADGE_SUCCESS}`}
                  >
                    {interview.status}
                  </div>
                </div>

                {/* Interview Details - Mobile */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex items-center space-x-2 text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}
                    >
                      <LuCalendar className="w-4 h-4" />
                      <span>{interview.candidate.date}</span>
                    </div>
                    <div
                      className={`flex items-center space-x-2 text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}
                    >
                      <LuClock className="w-4 h-4" />
                      <span>{interview.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <a
                      href="#"
                      className={`flex items-center space-x-2 text-sm text-primary hover:text-primary-dark transition-colors`}
                    >
                      <LuLink className="w-4 h-4" />
                      <span>Join Meeting</span>
                    </a>
                    <div
                      className={`flex items-center space-x-2 text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}
                    >
                      <LuVideo className="w-4 h-4" />
                      <span>{interview.type}</span>
                    </div>
                  </div>

                  <div
                    className={`flex items-center space-x-2 text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}
                  >
                    <LuUsers className="w-4 h-4" />
                    <span>{interview.round}</span>
                  </div>
                </div>

                {/* Panel Members - Mobile */}
                <div>
                  <span
                    className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}
                  >
                    Panel:
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {interview.panelMembers.map((member, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 bg-gray-100 text-xs ${TAILWIND_COLORS.TEXT_MUTED} rounded`}
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
                    <h4
                      className={`font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} cursor-pointer hover:text-primary transition-colors inline-block`}
                      onClick={() => handleEditClick(interview)}
                    >
                      {interview.candidate.name}
                    </h4>
                    <p
                      className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}
                    >
                      {interview.candidate.jobRole}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div
                        className={`flex items-center space-x-1 text-xs ${TAILWIND_COLORS.TEXT_MUTED}`}
                      >
                        <LuCalendar className="w-3 h-3" />
                        <span>{interview.candidate.date}</span>
                      </div>
                      <a
                        href="#"
                        className={`flex items-center space-x-1 text-xs text-primary hover:text-primary-dark transition-colors`}
                      >
                        <LuLink className="w-3 h-3" />
                        <span>Join Meeting</span>
                      </a>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {interview.panelMembers.map((member, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 bg-gray-100 text-xs ${TAILWIND_COLORS.TEXT_MUTED} rounded`}
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
                    <div
                      className={`flex items-center space-x-1 text-sm ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}
                    >
                      <LuClock className="w-4 h-4" />
                      <span>{interview.time}</span>
                    </div>
                    <div
                      className={`flex items-center space-x-1 text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}
                    >
                      <LuVideo className="w-4 h-4" />
                      <span>{interview.type}</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <div
                      className={`flex items-center space-x-1 text-sm ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}
                    >
                      <LuUsers className="w-4 h-4" />
                      <span>{interview.round}</span>
                    </div>
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${TAILWIND_COLORS.BADGE_SUCCESS}`}
                    >
                      {interview.status}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Interview Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
              <h2
                className={`text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}
              >
                Edit Interview
              </h2>
              <button
                onClick={handleCloseEditModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LuX size={24} className={TAILWIND_COLORS.TEXT_MUTED} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Candidate Selection */}
              <div>
                <label
                  className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}
                >
                  Candidate
                </label>
                <input
                  type="text"
                  value={editFormData.candidate}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                />
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    value={editFormData.date}
                    onChange={(e) =>
                      handleEditInputChange('date', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}
                  >
                    Time
                  </label>
                  <input
                    type="time"
                    value={editFormData.timeSlot}
                    onChange={(e) =>
                      handleEditInputChange('timeSlot', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Interview Mode */}
              <div>
                <label
                  className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-3`}
                >
                  Interview Mode
                </label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      id="edit-online-mode"
                      name="editInterviewMode"
                      value="online"
                      checked={editFormData.interviewMode === 'online'}
                      onChange={(e) =>
                        handleEditInputChange('interviewMode', e.target.value)
                      }
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-blue-500"
                    />
                    <div className="flex items-center space-x-2">
                      <LuVideo className="w-5 h-5 text-primary" />
                      <label
                        htmlFor="edit-online-mode"
                        className="cursor-pointer flex-1"
                      >
                        <div
                          className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}
                        >
                          Online
                        </div>
                        <div
                          className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED}`}
                        >
                          Virtual call or video conference
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      id="edit-offline-mode"
                      name="editInterviewMode"
                      value="offline"
                      checked={editFormData.interviewMode === 'offline'}
                      onChange={(e) =>
                        handleEditInputChange('interviewMode', e.target.value)
                      }
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-blue-500"
                    />
                    <div className="flex items-center space-x-2">
                      <LuUsers className="w-5 h-5 text-green-600" />
                      <label
                        htmlFor="edit-offline-mode"
                        className="cursor-pointer flex-1"
                      >
                        <div
                          className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}
                        >
                          Offline
                        </div>
                        <div
                          className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED}`}
                        >
                          In-person meeting at office
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location (if offline) */}
              {editFormData.interviewMode === 'offline' && (
                <div>
                  <label
                    className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}
                  >
                    Location
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter interview location"
                      value={editFormData.location}
                      onChange={(e) =>
                        handleEditInputChange('location', e.target.value)
                      }
                      className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <LuMapPin className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              )}

              {/* Round */}
              <div>
                <label
                  className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}
                >
                  Round
                </label>
                <input
                  type="text"
                  value={editFormData.round}
                  onChange={(e) =>
                    handleEditInputChange('round', e.target.value)
                  }
                  placeholder="Round 1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Status */}
              <div>
                <label
                  className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}
                >
                  Status
                </label>
                <select
                  value={editFormData.status}
                  onChange={(e) =>
                    handleEditInputChange('status', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Rescheduled">Rescheduled</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 sticky bottom-0 bg-white">
              <Button
                onClick={handleCloseEditModal}
                variant="secondary"
                size="md"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateInterview}
                variant="primary"
                size="md"
                icon={<LuCheck className="w-4 h-4" />}
              >
                Update Interview
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ScheduleInterviews

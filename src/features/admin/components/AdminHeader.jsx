import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { TAILWIND_COLORS, COLORS } from '../../../shared/WebConstant.js'
import Button from '../../../shared/components/Button.jsx'
import UserDropdown from '../../../shared/components/UserDropdown.jsx'
import DarkModeToggle from '../../../shared/components/DarkModeToggle.jsx'
import { getMethod } from '../../../service/api'
import apiService from '../services/serviceUrl'
import service from '../../../service/serviceUrl'

export default function Header({ toggleSidebar }) {
  const navigate = useNavigate()
  const [user, setUser] = useState(() => {
    try {
      const authUser = localStorage.getItem("authUser")
      return authUser ? JSON.parse(authUser) : { user_name: 'Admin User', role: 'Administrator' }
    } catch {
      return { user_name: 'Admin User', role: 'Administrator' }
    }
  })

  // Notification state
  const [notifications, setNotifications] = useState([])
  const [notificationCount, setNotificationCount] = useState(0)
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationRef = useRef(null)

  // Check if date is within last 5 days (or all dates for testing - set to false to enable 5-day filter)
  const TEST_MODE = false // Set to true to show all notifications (for testing)
  
  const isWithinLast5Days = (dateString) => {
    if (TEST_MODE) return true // Show all for testing
    if (!dateString) return false
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffTime = Math.abs(now - date)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays <= 5
    } catch (error) {
      console.error('Error parsing date:', dateString, error)
      return false
    }
  }

  // Format date for display
  const formatNotificationDate = (dateString) => {
    if (!dateString) return 'Recently'
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    return `${diffDays} days ago`
  }

  // Fetch recent notifications
  const fetchNotifications = useCallback(async () => {
    try {
      console.log('🔔 Fetching notifications...')
      const allNotifications = []

      // Fetch recent recruiters (last 5 days)
      try {
        console.log('📤 Fetching recruiters from:', service.employersList)
        const recruitersResponse = await getMethod({
          apiUrl: service.employersList
        })
        console.log('📥 Recruiters Response:', recruitersResponse)
        
        if (recruitersResponse?.status === true && recruitersResponse?.data) {
          const allRecruiters = Array.isArray(recruitersResponse.data) ? recruitersResponse.data : []
          console.log(`📊 Total recruiters: ${allRecruiters.length}`)
          
          const recentRecruiters = allRecruiters.filter(recruiter => {
            const date = recruiter.created_at || recruiter.registration_date
            const isRecent = isWithinLast5Days(date)
            if (isRecent) {
              console.log('✅ Recent recruiter found:', recruiter.company_name || recruiter.name, date)
            }
            return isRecent
          })
          
          console.log(`📊 Recent recruiters (last 5 days): ${recentRecruiters.length}`)
          
          recentRecruiters.forEach(recruiter => {
            allNotifications.push({
              id: `recruiter-${recruiter.id}`,
              type: 'recruiter',
              title: 'New Recruiter Joined',
              message: `${recruiter.company_name || recruiter.name || 'A recruiter'} has joined the platform`,
              date: recruiter.created_at || recruiter.registration_date,
              icon: '👤',
              color: 'bg-blue-100 text-blue-800'
            })
          })
        } else {
          console.log('⚠️ Recruiters response not successful or no data')
        }
      } catch (error) {
        console.error('❌ Error fetching recruiters:', error)
      }

      // Fetch recent institutes (last 5 days)
      try {
        console.log('📤 Fetching institutes from:', service.institutesList)
        const institutesResponse = await getMethod({
          apiUrl: service.institutesList
        })
        console.log('📥 Institutes Response:', institutesResponse)
        
        if (institutesResponse?.status === true && institutesResponse?.data) {
          const allInstitutes = Array.isArray(institutesResponse.data) ? institutesResponse.data : []
          console.log(`📊 Total institutes: ${allInstitutes.length}`)
          
          const recentInstitutes = allInstitutes.filter(institute => {
            const date = institute.created_at || institute.registration_date
            const isRecent = isWithinLast5Days(date)
            if (isRecent) {
              console.log('✅ Recent institute found:', institute.institute_name || institute.name, date)
            }
            return isRecent
          })
          
          console.log(`📊 Recent institutes (last 5 days): ${recentInstitutes.length}`)
          
          recentInstitutes.forEach(institute => {
            allNotifications.push({
              id: `institute-${institute.id}`,
              type: 'institute',
              title: 'New Institute Joined',
              message: `${institute.institute_name || institute.name || 'An institute'} has joined the platform`,
              date: institute.created_at || institute.registration_date,
              icon: '🏫',
              color: 'bg-green-100 text-green-800'
            })
          })
        } else {
          console.log('⚠️ Institutes response not successful or no data')
        }
      } catch (error) {
        console.error('❌ Error fetching institutes:', error)
      }

      // Fetch recent course completions (last 5 days)
      try {
        console.log('📤 Fetching certificates from:', apiService.getCertificateIssuance)
        const certificatesResponse = await getMethod({
          apiUrl: apiService.getCertificateIssuance
        })
        console.log('📥 Certificates Response:', certificatesResponse)
        
        if (certificatesResponse?.status === true && certificatesResponse?.data) {
          const allCertificates = Array.isArray(certificatesResponse.data) ? certificatesResponse.data : []
          console.log(`📊 Total certificates: ${allCertificates.length}`)
          
          const recentCertificates = allCertificates.filter(cert => {
            const date = cert.issue_date
            const isRecent = isWithinLast5Days(date)
            if (isRecent) {
              console.log('✅ Recent certificate found:', cert.student_name, cert.course_title, date)
            }
            return isRecent
          })
          
          console.log(`📊 Recent certificates (last 5 days): ${recentCertificates.length}`)
          
          recentCertificates.forEach(cert => {
            allNotifications.push({
              id: `certificate-${cert.certificate_id}`,
              type: 'certificate',
              title: 'Course Completed',
              message: `${cert.student_name || 'A student'} completed "${cert.course_title || 'a course'}"`,
              date: cert.issue_date,
              icon: '🎓',
              color: 'bg-purple-100 text-purple-800',
              institute: cert.institute_name,
              course: cert.course_title
            })
          })
        } else {
          console.log('⚠️ Certificates response not successful or no data')
        }
      } catch (error) {
        console.error('❌ Error fetching certificates:', error)
      }

      // Sort by date (newest first)
      allNotifications.sort((a, b) => {
        const dateA = new Date(a.date || 0)
        const dateB = new Date(b.date || 0)
        return dateB - dateA
      })

      // Limit to 20 most recent
      const limitedNotifications = allNotifications.slice(0, 20)
      
      console.log(`✅ Total notifications found: ${allNotifications.length}`)
      console.log(`✅ Limited to: ${limitedNotifications.length}`)
      console.log('📋 Notifications:', limitedNotifications)
      
      setNotifications(limitedNotifications)
      setNotificationCount(limitedNotifications.length)
    } catch (error) {
      console.error('❌ Error fetching notifications:', error)
    }
  }, [])

  // Fetch notifications on mount and every 5 minutes
  useEffect(() => {
    fetchNotifications()
    const interval = setInterval(fetchNotifications, 5 * 60 * 1000) // Refresh every 5 minutes
    return () => clearInterval(interval)
  }, [fetchNotifications])

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showNotifications])

  // Listen for profile updates
  useEffect(() => {
    const handleProfileUpdate = (event) => {
      try {
        const authUser = localStorage.getItem("authUser")
        if (authUser) {
          setUser(JSON.parse(authUser))
        }
      } catch (error) {
        console.error('Error updating user in header:', error)
      }
    }

    // Listen to custom event
    window.addEventListener('profileUpdated', handleProfileUpdate)
    
    // Also listen to storage events (for cross-tab updates)
    window.addEventListener('storage', () => {
      try {
        const authUser = localStorage.getItem("authUser")
        if (authUser) {
          setUser(JSON.parse(authUser))
        }
      } catch (error) {
        console.error('Error updating user from storage:', error)
      }
    })

    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate)
    }
  }, [])

  return (
    <header className={`sticky top-0 z-30 flex items-center justify-between ${TAILWIND_COLORS.HEADER_BG} px-2 sm:px-4 md:px-6 py-2 sm:py-3 border-b ${TAILWIND_COLORS.BORDER}`}>
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        <Button className="p-1.5 sm:p-2 rounded bg-white " onClick={toggleSidebar} aria-label="Toggle Sidebar" variant="unstyled">
          <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" className="w-5 h-5 sm:w-6 sm:h-6">
            <path d="M3 6h18M3 12h18M3 18h18"/>
          </svg>
        </Button>
      </div>

      <div className="flex-1 max-w-xs sm:max-w-md md:max-w-3xl mx-2 sm:mx-3 md:mx-6">
        <div className={`flex items-center bg-white border ${TAILWIND_COLORS.BORDER} rounded-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 shadow-sm`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.3-4.3"/>
          </svg>
          <input
            type="text"
            placeholder="Search..."
            className="ml-1 sm:ml-2 w-full outline-none text-xs sm:text-sm placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4">
        {/* Notifications Dropdown */}
        <div className="relative" ref={notificationRef}>
          <button 
            className="relative p-1.5 sm:p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors" 
            title="Notifications"
            onClick={() => setShowNotifications(!showNotifications)}
          >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 sm:w-5 sm:h-5">
            <path d="M18 16V11a6 6 0 10-12 0v5l-2 2h16l-2-2z"/>
          </svg>
            {notificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-red-500 text-white text-[10px] sm:text-xs font-bold flex items-center justify-center">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden flex flex-col">
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                <h3 className={`text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                  Recent Activities ({notificationCount})
                </h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Notifications List */}
              <div className="overflow-y-auto max-h-80">
                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <div className="text-gray-400 mb-2">
                      <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </div>
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>No recent activities</p>
                    <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>Activities from last 5 days will appear here</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => {
                          setShowNotifications(false)
                          // Navigate based on type
                          if (notification.type === 'recruiter') {
                            navigate('/admin/management?tab=employer-management')
                          } else if (notification.type === 'institute') {
                            navigate('/admin/management?tab=institute-management')
                          } else if (notification.type === 'certificate') {
                            navigate('/admin/management?tab=institute-management')
                          }
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${notification.color}`}>
                            {notification.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} truncate`}>
                              {notification.title}
                            </p>
                            <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mt-0.5 line-clamp-2`}>
                              {notification.message}
                            </p>
                            {notification.institute && (
                              <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>
                                Institute: {notification.institute}
                              </p>
                            )}
                            <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>
                              {formatNotificationDate(notification.date)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
                  <button
                    onClick={() => {
                      setShowNotifications(false)
                      navigate('/admin/tools-logs?tab=activity-logs')
                    }}
                    className={`text-xs font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} hover:underline w-full text-center`}
                  >
                    View All Activities
        </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Dark Mode Toggle */}
        <DarkModeToggle />

        {/* User Dropdown - Always visible but responsive */}
        <div className="block">
          <UserDropdown user={user} />
        </div>
      </div>
    </header>
  )
}

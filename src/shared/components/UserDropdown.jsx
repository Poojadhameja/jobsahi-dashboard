import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TAILWIND_COLORS, COLORS } from '../WebConstant'
import LogoutConfirmationModal from './LogoutConfirmationModal'

import { postMethod } from '../../service/api'
import { getMethod } from '../../service/api'
import apiService from '../../service/serviceUrl'

const UserDropdown = ({ user = { name: 'Admin', role: 'Administrator' } }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()
  var authUser = localStorage.getItem("authUser")
  var user = JSON.parse(authUser)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleProfileClick = () => {
    navigate(`/${user.role}/profile`)
    setIsOpen(false)
  }

  const handleLogout = () => {
    setShowLogoutModal(true)
    setIsOpen(false)
  }

  const confirmLogout = async () => {
    setIsLoggingOut(true)
    try {
      // Add logout logic here (clear tokens, call logout API, etc.)
      console.log('Logging out...')

      var data = {
        apiUrl: apiService.logout,
        payload: {
          uid: user.id
        },

      };

      var response = await postMethod(data);

      // Simulate logout process
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (response.status === true) {
        setShowLogoutModal(true)
        setIsOpen(false)
        navigate('/login')
        localStorage.clear();

      } else {
        console.error("Logout Failed:", response)
        alert(response.message || "Logout Failed")
      }
    } catch (error) {
      console.error('Logout error:', error)
      // Handle logout error if needed
    } finally {
      setIsLoggingOut(false)
    }
  }

  const closeLogoutModal = () => {
    setShowLogoutModal(false)
  }

  const handleLogin = () => {
    localStorage.clear();
    navigate('/login')
    setIsOpen(false)
  }

  const menuItems = [
    {
      id: 'profile',
      label: 'Profile',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <path d="M12 12a5 5 0 100-10 5 5 0 000 10zM4 22a8 8 0 1116 0" />
        </svg>
      ),
      onClick: handleProfileClick
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
      ),
      onClick: () => {
        navigate(`/${user.role}/settings`)
        setIsOpen(false)
      }
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
          <polyline points="16,17 21,12 16,7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      ),
      onClick: handleLogout,
      isDestructive: true
    }
  ]

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Mobile: Only show avatar, Desktop: Show name + avatar */}
        <div className="hidden sm:block text-right">
          <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">{user.name}</div>
          <div className="text-[10px] sm:text-xs text-gray-500 truncate">{user.role}</div>
        </div>
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 grid place-items-center flex-shrink-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 sm:w-4 sm:h-4 sm:w-5 sm:h-5 text-white">
            <path d="M12 12a5 5 0 100-10 5 5 0 000 10zM4 22a8 8 0 1116 0" />
          </svg>
        </div>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <polyline points="6,9 12,15 18,9" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
          {/* User Info Header */}
          <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-100">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 grid place-items-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 sm:w-5 sm:h-5 text-white">
                  <path d="M12 12a5 5 0 100-10 5 5 0 000 10zM4 22a8 8 0 1116 0" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">{user.name}</div>
                <div className="text-[10px] sm:text-xs text-gray-500 truncate">{user.role}</div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 text-xs sm:text-sm text-left hover:bg-gray-50 transition-colors duration-150 ${item.isDestructive ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'
                  }`}
              >
                <span className={`${item.isDestructive ? 'text-red-500' : 'text-gray-400'} flex-shrink-0`}>
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Login Option (if needed) */}
          <div className="border-t border-gray-100 py-1">
            <button
              onClick={handleLogin}
              className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 text-xs sm:text-sm text-left text-blue-600 hover:bg-blue-50 transition-colors duration-150"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0">
                <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
                <polyline points="10,17 15,12 10,7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              <span className="truncate">Switch Account</span>
            </button>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal
        isOpen={showLogoutModal}
        onClose={closeLogoutModal}
        onConfirm={confirmLogout}
        userName={user.name}
        isLoading={isLoggingOut}
      />
    </div>
  )
}

export default UserDropdown

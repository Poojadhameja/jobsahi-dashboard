import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TAILWIND_COLORS, COLORS } from '../../../shared/WebConstant'
import Button from '../../../shared/components/Button.jsx'
import UserDropdown from '../../../shared/components/UserDropdown.jsx'

export default function InstituteHeader({ toggleSidebar }) {
  const navigate = useNavigate()
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
        <button className="relative p-1.5 sm:p-2 bg-gray-100 rounded-full hover:bg-gray-200" title="Notifications">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 sm:w-5 sm:h-5">
            <path d="M18 16V11a6 6 0 10-12 0v5l-2 2h16l-2-2z"/>
          </svg>
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full" style={{ backgroundColor: '#F59E0B' }} />
        </button>
        
        {/* User Dropdown - Always visible but responsive */}
        <div className="block">
          <UserDropdown user={{ name: 'Institute User', role: 'Institute' }} />
        </div>
      </div>
    </header>
  )
}

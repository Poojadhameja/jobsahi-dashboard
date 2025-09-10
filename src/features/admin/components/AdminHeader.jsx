 import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TAILWIND_COLORS, COLORS } from '../../../shared/WebConstant'
import Button from '../../../shared/components/Button.jsx'
import UserDropdown from '../../../shared/components/UserDropdown.jsx'

export default function Header({ toggleSidebar }) {
  const navigate = useNavigate()
  return (
    <header className={`sticky top-0 z-30 flex items-center justify-between ${TAILWIND_COLORS.HEADER_BG} px-4 md:px-6 py-3 border-b ${TAILWIND_COLORS.BORDER}`}>
      <div className="flex items-center gap-3 md:gap-4">
        <Button className="p-2 rounded" onClick={toggleSidebar} aria-label="Toggle Sidebar" variant="unstyled">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
            <path d="M3 6h18M3 12h18M3 18h18"/>
          </svg>
        </Button>
      </div>

      <div className="flex-1 max-w-3xl mx-3 md:mx-6">
        <div className={`flex items-center bg-white border ${TAILWIND_COLORS.BORDER} rounded-full px-3 md:px-4 py-2 shadow-sm`}> 
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gray-400">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.3-4.3"/>
          </svg>
          <input
            type="text"
            placeholder="Search by name, position"
            className="ml-2 w-full outline-none text-sm placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <button className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200" title="Notifications">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M18 16V11a6 6 0 10-12 0v5l-2 2h16l-2-2z"/>
          </svg>
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#F59E0B' }} />
        </button>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/admin/profile')}>
          <span className="text-sm font-medium">Admin</span>
          <div className="w-8 h-8 rounded-full bg-gray-200 grid place-items-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-gray-600">
              <path d="M12 12a5 5 0 100-10 5 5 0 000 10zM4 22a8 8 0 1116 0"/>
            </svg>
          </div>
        </div>
      </div>
    </header>
  )
}

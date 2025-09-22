import React, { useState, useEffect, useRef } from 'react'
import { TAILWIND_COLORS, COLORS } from '../../../../../shared/WebConstant'
import { MatrixCard, MetricPillRow } from '../../../../../shared/components/metricCard'
import PendingRecruiterApprovals from './PendingRecruiter'
import JobPostingAnalytics from './JobPosting'
import PaymentHistory from './Payment'
import EmployerRatings from './EmployerRating'
import ResumeUsageTracker from './ResumeUsage'
import FraudControlSystem from './FraudControl'
import { 
  LuBriefcase, 
  LuBuilding, 
  LuUsers, 
  LuTrendingUp,
  LuSearch,
  LuFilter,
  LuPlus,
  LuDownload,
  LuMessageSquare
} from 'react-icons/lu'

// KPI Card Component
function KPICard({ title, value, icon, color = COLORS.PRIMARY }) {
  return (
    <div className={`${TAILWIND_COLORS.CARD} p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold" style={{ color }}>{value}</p>
        </div>
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}

// Employer Table Component
function EmployerTable({ employers }) {
  return (
    <div className={`${TAILWIND_COLORS.CARD} p-6`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <LuBuilding className="text-gray-600" size={20} />
          <h3 className="font-medium text-gray-800">All Employer Profiles</h3>
        </div>
        <div className="relative">
          <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text"
            placeholder="Search by company name or email..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-80"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-3 px-4 font-medium">Company</th>
              <th className="py-3 px-4 font-medium">Industry</th>
              <th className="py-3 px-4 font-medium">Location</th>
              <th className="py-3 px-4 font-medium">Active Jobs</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employers.map((employer) => (
              <tr key={employer.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div>
                    <div className="font-medium text-gray-900">{employer.company}</div>
                    <div className="text-gray-500 text-xs">{employer.email}</div>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700">{employer.industry}</td>
                <td className="py-4 px-4 text-gray-700">{employer.location}</td>
                <td className="py-4 px-4 text-gray-700">{employer.activeJobs}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    employer.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {employer.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <span className="text-gray-400 text-sm">⋯</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


export default function EmployerManagement() {
  const [employers, setEmployers] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activeView, setActiveView] = useState('approve-reject') // 'overview', 'approve-reject', etc.
  const dropdownRef = useRef(null)

  useEffect(() => {
    setEmployers([
      { 
        id: 1, 
        company: 'TechCorp Solutions', 
        email: 'hr@techcorp.com', 
        industry: 'Technology',
        location: 'Mumbai',
        activeJobs: 15,
        status: 'Active'
      },
      { 
        id: 2, 
        company: 'Global Industries', 
        email: 'careers@global.com', 
        industry: 'Manufacturing',
        location: 'Delhi',
        activeJobs: 8,
        status: 'Active'
      },
      { 
        id: 3, 
        company: 'StartupXYZ', 
        email: 'jobs@startupxyz.com', 
        industry: 'Fintech',
        location: 'Bangalore',
        activeJobs: 3,
        status: 'Pending'
      }
    ])
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <MatrixCard 
          title="Employer Management"
          subtitle="Comprehensive employer management system with approval work flows and analytics"
          className=""
        />
        
        <div className="flex items-center justify-end gap-3">
          <MetricPillRow items={[
            { key: 'export', label: 'Export Data', icon: <LuDownload size={16} />, onClick: () => console.log('Export Data') },
            // { key: 'notification', label: 'Send Bulk Notification', icon: <LuMessageSquare size={16} />, onClick: () => console.log('Send Notification') },
            // { key: 'add', label: 'Add Employer', icon: <LuPlus size={16} />, onClick: () => console.log('Add Employer') }
          ]} />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Total Employerss" 
          value="1234" 
          icon={<LuUsers size={24} color={COLORS.PRIMARY} />}
          color={COLORS.PRIMARY}
        />
        <KPICard 
          title="Pending Approvals" 
          value="56" 
          icon={<span className="text-2xl">✅</span>}
          color={COLORS.PRIMARY}
        />
        <KPICard 
          title="Active Jobs" 
          value="1,234" 
          icon={<span className="text-2xl">📁</span>}
          color={COLORS.PRIMARY}
        />
        <KPICard 
          title="Monthly Revenue" 
          value="₹4,50,000" 
          icon={<span className="text-2xl">🎯</span>}
          color={COLORS.PRIMARY}
        />
      </div>

      {/* Toggle Button with Dropdown */}
      <div className="flex justify-end relative" ref={dropdownRef}>
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="bg-primary text-white p-3 rounded-lg shadow-lg transition-colors duration-200 hover:bg-primary-dark"
        >
          <div className="flex flex-col space-y-1">
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </div>
        </button>
        
        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
            {/* Menu Items */}
            <div className="py-2">
              <button 
                onClick={() => { setActiveView('approve-reject'); setIsDropdownOpen(false); }}
                className={`w-full text-left px-4 py-3 font-bold transition-colors duration-200 ${
                  activeView === 'approve-reject' 
                    ? 'bg-primary text-white' 
                    : 'text-primary hover:bg-gray-50'
                }`}
              >
                Approve/Reject
              </button>
              <button 
                onClick={() => { setActiveView('job-tracking'); setIsDropdownOpen(false); }}
                className={`w-full text-left px-4 py-3 font-bold transition-colors duration-200 ${
                  activeView === 'job-tracking' 
                    ? 'bg-primary text-white' 
                    : 'text-primary hover:bg-gray-50'
                }`}
              >
                Job Tracking
              </button>
              <button 
                onClick={() => { setActiveView('payments'); setIsDropdownOpen(false); }}
                className={`w-full text-left px-4 py-3 font-bold transition-colors duration-200 ${
                  activeView === 'payments' 
                    ? 'bg-primary text-white' 
                    : 'text-primary hover:bg-gray-50'
                }`}
              >
                Payments
              </button>
              <button 
                onClick={() => { setActiveView('ratings'); setIsDropdownOpen(false); }}
                className={`w-full text-left px-4 py-3 font-bold transition-colors duration-200 ${
                  activeView === 'ratings' 
                    ? 'bg-primary text-white' 
                    : 'text-primary hover:bg-gray-50'
                }`}
              >
                Ratings
              </button>
              <button 
                onClick={() => { setActiveView('resume-usage'); setIsDropdownOpen(false); }}
                className={`w-full text-left px-4 py-3 font-bold transition-colors duration-200 ${
                  activeView === 'resume-usage' 
                    ? 'bg-primary text-white' 
                    : 'text-primary hover:bg-gray-50'
                }`}
              >
                Resume Usage
              </button>
              <button 
                onClick={() => { setActiveView('fraud-control'); setIsDropdownOpen(false); }}
                className={`w-full text-left px-4 py-3 font-bold transition-colors duration-200 ${
                  activeView === 'fraud-control' 
                    ? 'bg-primary text-white' 
                    : 'text-primary hover:bg-gray-50'
                }`}
              >
                Fraud Control
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Conditional Content Rendering */}
      {activeView === 'approve-reject' && (
        <PendingRecruiterApprovals />
      )}

      {activeView === 'job-tracking' && (
        <JobPostingAnalytics />
      )}

      {activeView === 'payments' && (
        <PaymentHistory />
      )}

      {activeView === 'ratings' && (
        <EmployerRatings />
      )}

      {activeView === 'resume-usage' && (
        <ResumeUsageTracker />
      )}

      {activeView === 'fraud-control' && (
        <FraudControlSystem />
      )}

      {activeView === 'overview' && (
        <EmployerTable employers={employers} />
      )}

    </div>
  )
}
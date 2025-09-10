import React, { useState, useEffect } from 'react'
import { TAILWIND_COLORS, COLORS } from '../../../../../shared/WebConstant'
import { MatrixCard, MetricPillRow } from '../../../../components/metricCard'
import { 
  LuBriefcase, 
  LuBuilding2, 
  LuUsers, 
  LuTrendingUp,
  LuSearch,
  LuMoreVertical,
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
          <LuBuilding2 className="text-gray-600" size={20} />
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
                    <LuMoreVertical className="text-gray-400" size={16} />
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

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div>
          <h1 className={`text-3xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Employer Management</h1>
          <p className="text-gray-600 mt-1">Manage employer profiles, job postings, and recruitment processes.</p>
        </div>
        
        <div className="flex items-center justify-end gap-3">
          <MetricPillRow items={[
            { key: 'export', label: 'Export Data', icon: <LuDownload size={16} />, onClick: () => console.log('Export Data') },
            { key: 'notification', label: 'Send Bulk Notification', icon: <LuMessageSquare size={16} />, onClick: () => console.log('Send Notification') },
            { key: 'add', label: 'Add Employer', icon: <LuPlus size={16} />, onClick: () => console.log('Add Employer') }
          ]} />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Total Employers" 
          value="1,247" 
          icon={<LuBuilding2 size={24} color={COLORS.PRIMARY} />}
          color={COLORS.PRIMARY}
        />
        <KPICard 
          title="Active Jobs" 
          value="432" 
          icon={<LuBriefcase size={24} color={COLORS.GREEN_PRIMARY} />}
          color={COLORS.GREEN_PRIMARY}
        />
        <KPICard 
          title="Applications" 
          value="3,200" 
          icon={<LuUsers size={24} color={COLORS.PRIMARY} />}
          color={COLORS.PRIMARY}
        />
        <KPICard 
          title="Success Rate" 
          value="87%" 
          icon={<LuTrendingUp size={24} color="#8B5CF6" />}
          color="#8B5CF6"
        />
      </div>

      {/* Employer Table */}
      <EmployerTable employers={employers} />
    </div>
  )
}
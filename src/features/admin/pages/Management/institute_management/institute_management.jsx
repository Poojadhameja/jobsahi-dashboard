import React, { useState, useEffect } from 'react'
import { TAILWIND_COLORS, COLORS } from '../../../../../shared/WebConstant'
import { MatrixCard, MetricPillRow } from '../../../../components/metricCard'
import { 
  LuGraduationCap, 
  LuBuilding2, 
  LuUsers, 
  LuCheckCircle,
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

// Institute Table Component
function InstituteTable({ institutes }) {
  return (
    <div className={`${TAILWIND_COLORS.CARD} p-6`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <LuGraduationCap className="text-gray-600" size={20} />
          <h3 className="font-medium text-gray-800">All Institute Profiles</h3>
        </div>
        <div className="relative">
          <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text"
            placeholder="Search by institute name or location..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-80"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-3 px-4 font-medium">Institute</th>
              <th className="py-3 px-4 font-medium">Type</th>
              <th className="py-3 px-4 font-medium">Location</th>
              <th className="py-3 px-4 font-medium">Students</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {institutes.map((institute) => (
              <tr key={institute.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div>
                    <div className="font-medium text-gray-900">{institute.name}</div>
                    <div className="text-gray-500 text-xs">{institute.email}</div>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700">{institute.type}</td>
                <td className="py-4 px-4 text-gray-700">{institute.location}</td>
                <td className="py-4 px-4 text-gray-700">{institute.students}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    institute.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : institute.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {institute.status}
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


export default function InstituteManagement() {
  const [institutes, setInstitutes] = useState([])

  useEffect(() => {
    setInstitutes([
      { 
        id: 1, 
        name: 'Delhi Technical Institute', 
        email: 'admin@dti.edu', 
        type: 'Government',
        location: 'Delhi',
        students: 2500,
        status: 'Active'
      },
      { 
        id: 2, 
        name: 'Mumbai Skill Center', 
        email: 'info@msc.edu', 
        type: 'Private',
        location: 'Mumbai',
        students: 1800,
        status: 'Active'
      },
      { 
        id: 3, 
        name: 'Bangalore IT Academy', 
        email: 'contact@bita.edu', 
        type: 'Private',
        location: 'Bangalore',
        students: 1200,
        status: 'Pending'
      },
      { 
        id: 4, 
        name: 'Chennai Polytechnic', 
        email: 'admin@cpoly.edu', 
        type: 'Government',
        location: 'Chennai',
        students: 3200,
        status: 'Active'
      }
    ])
  }, [])

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div>
          <h1 className={`text-3xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Institute Management</h1>
          <p className="text-gray-600 mt-1">Manage educational institutes, courses, and academic partnerships.</p>
        </div>
        
        <div className="flex items-center justify-end gap-3">
          <MetricPillRow items={[
            { key: 'export', label: 'Export Data', icon: <LuDownload size={16} />, onClick: () => console.log('Export Data') },
            { key: 'notification', label: 'Send Bulk Notification', icon: <LuMessageSquare size={16} />, onClick: () => console.log('Send Notification') },
            { key: 'add', label: 'Add Institute', icon: <LuPlus size={16} />, onClick: () => console.log('Add Institute') }
          ]} />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Total Institutes" 
          value="126" 
          icon={<LuGraduationCap size={24} color={COLORS.PRIMARY} />}
          color={COLORS.PRIMARY}
        />
        <KPICard 
          title="Active Institutes" 
          value="98" 
          icon={<LuCheckCircle size={24} color={COLORS.GREEN_PRIMARY} />}
          color={COLORS.GREEN_PRIMARY}
        />
        <KPICard 
          title="Total Students" 
          value="45,200" 
          icon={<LuUsers size={24} color={COLORS.PRIMARY} />}
          color={COLORS.PRIMARY}
        />
        <KPICard 
          title="Pending Approvals" 
          value="12" 
          icon={<LuBuilding2 size={24} color="#8B5CF6" />}
          color="#8B5CF6"
        />
      </div>

      {/* Institute Table */}
      <InstituteTable institutes={institutes} />
    </div>
  )
}
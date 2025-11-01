import React, { useState } from 'react'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant.js'
import  Button  from '../../../../shared/components/Button.jsx'

export default function ActivityLogs() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('All Types')

  // Sample activity log data
  const activityLogs = [
    {
      id: 1,
      userName: 'John Admin',
      action: 'Created new job posting',
      type: 'Create',
      timestamp: '2025-05-15 8:00:00'
    },
    {
      id: 2,
      userName: 'Sarah Manager',
      action: 'Updated user permission',
      type: 'Update',
      timestamp: '2025-05-15 7:45:00'
    },
    {
      id: 3,
      userName: 'Mike HR',
      action: 'Deleted expired job listing',
      type: 'Delete',
      timestamp: '2025-05-15 7:30:00'
    },
    {
      id: 4,
      userName: 'Lisa Admin',
      action: 'Exported user data',
      type: 'Export',
      timestamp: '2025-05-15 7:15:00'
    }
  ]

  const getTypeColor = (type) => {
    switch (type) {
      case 'Create':
        return 'bg-green-500 text-white'
      case 'Update':
        return 'bg-green-400 text-white'
      case 'Delete':
        return 'bg-red-500 text-white'
      case 'Export':
        return 'bg-green-400 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  return (
    <div className="space-y-6 bg-white rounded-lg border border-[var(--color-primary)28] shadow-sm p-6">
      {/* Header Section */}
      <div className="">
        <div className="flex justify-between items-start">
          <div>
            <h2 className={`text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
              Full activity log (who did what)
            </h2>
            <p className={TAILWIND_COLORS.TEXT_MUTED}>
              Track all user actions and system activities across the platform
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="md"
              onClick={() => console.log('Export clicked')}
            >
              Export
            </Button>
            <Button 
              variant="outline" 
              size="md"
              onClick={() => console.log('Refresh clicked')}
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-[var(--color-bg-primary)] rounded-lg border border-[var(--color-primary)28] shadow-sm p-6">
        <h3 className={`text-lg font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Search Activities</h3>
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by user, action, or timestamp.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-[var(--color-primary)28] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent"
            />
          </div>
          <div className="w-48">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-3 border border-[var(--color-primary)28] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent"
            >
              <option value="All Types">All Types</option>
              <option value="Create">Create</option>
              <option value="Update">Update</option>
              <option value="Delete">Delete</option>
              <option value="Export">Export</option>
            </select>
          </div>
        </div>
      </div>

      {/* Activity Log Entries */}
      <div className="bg-[var(--color-bg-primary)] rounded-lg border border-[var(--color-primary)28] shadow-sm p-6">
        <div className="space-y-4">
          {activityLogs.map((log) => (
            <div key={log.id} className="flex items-center bg-white justify-between p-4 border border-[var(--color-primary)28] rounded-lg transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                  <span className={`${TAILWIND_COLORS.TEXT_MUTED} text-sm font-medium`}>
                    {log.userName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className={`font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{log.userName}</p>
                  <p className={TAILWIND_COLORS.TEXT_MUTED}>{log.action}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(log.type)}`}>
                  {log.type}
                </span>
                <span className={`${TAILWIND_COLORS.TEXT_MUTED} text-sm`}>{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

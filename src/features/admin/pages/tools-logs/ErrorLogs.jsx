import React, { useState } from 'react'

export default function ErrorLogs() {
  const [logs, setLogs] = useState([
    {
      id: 1,
      title: 'Database connection timeout',
      timestamp: '2025-05-15 11:00:00',
      status: 'Critical',
      isOpen: true
    },
    {
      id: 2,
      title: 'Email service unavailable',
      timestamp: '2025-05-15 11:00:00',
      status: 'Warning',
      isOpen: false
    },
    {
      id: 3,
      title: 'File upload failed',
      timestamp: '2025-05-15 11:00:00',
      status: 'Error',
      isOpen: true
    }
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Critical':
        return 'bg-green-100 text-green-800'
      case 'Warning':
        return 'bg-orange-100 text-orange-800'
      case 'Error':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const toggleStatus = (id) => {
    setLogs(logs.map(log => 
      log.id === id ? { ...log, isOpen: !log.isOpen } : log
    ))
  }

  return (
    <div className="space-y-6 bg-white rounded-lg border border-[var(--color-primary)28] shadow-sm p-6">
      {/* Header Section */}
      <div className="">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-primary mb-2">
              Crash/Error Logs
            </h2>
            <p className="text-gray-600">
              Monitor system errors, crashes, and technical issues
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[var(--color-secondary)] text-[var(--color-secondary)] rounded-lg hover:bg-[var(--color-secondary)] hover:text-white transition-colors duration-200 font-medium">
              <span className="text-sm">Filter</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[var(--color-secondary)] text-[var(--color-secondary)] rounded-lg hover:bg-[var(--color-secondary)] hover:text-white transition-colors duration-200 font-medium">
              <span className="text-sm">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Log Entries Section */}
      <div className="bg-[var(--color-bg-primary)] rounded-lg border border-[var(--color-primary)28] shadow-sm p-6">
        <div className="space-y-4">
          {logs.map((log) => (
            <div key={log.id} className="flex items-center bg-white justify-between p-4 border border-[var(--color-primary)28] rounded-lg transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 text-sm font-medium">
                    {log.title.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{log.title}</p>
                  <p className="text-gray-500 text-sm">{log.timestamp}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(log.status)}`}>
                  {log.status}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleStatus(log.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:ring-offset-2 ${
                      log.isOpen ? 'bg-[var(--color-secondary)]' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        log.isOpen ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="text-gray-700 text-sm">
                    {log.isOpen ? 'Open' : 'Resolved'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

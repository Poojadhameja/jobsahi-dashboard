import React from 'react'

export default function MessageLogs() {
  // Sample message log data
  const messageLogs = [
    {
      id: 1,
      title: 'Job application received',
      recipient: 'Email to user@example.com',
      timestamp: '2025-05-15 11:00:00',
      status: 'Sent'
    },
    {
      id: 2,
      title: 'Interview reminder',
      recipient: 'SMS to +91 00000 00000',
      timestamp: '2025-05-15 11:00:00',
      status: 'Delivered'
    },
    {
      id: 3,
      title: 'New job match',
      recipient: 'Push to mobile app user',
      timestamp: '2025-05-15 11:00:00',
      status: 'Failed'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Sent':
        return 'bg-green-100 text-green-800'
      case 'Delivered':
        return 'bg-green-100 text-green-800'
      case 'Failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6 bg-white rounded-lg border border-[var(--color-primary)28] shadow-sm p-6">
      {/* Header Section */}
      <div className="">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-primary mb-2">
              Notification/Message Logs
            </h2>
            <p className="text-gray-600">
              Track all out bound communications and delivery status
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[var(--color-secondary)] text-[var(--color-secondary)] rounded-lg hover:bg-[var(--color-secondary)] hover:text-white transition-colors duration-200 font-medium">
              <span className="text-sm">Refresh</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[var(--color-secondary)] text-[var(--color-secondary)] rounded-lg hover:bg-[var(--color-secondary)] hover:text-white transition-colors duration-200 font-medium">
              <span className="text-sm">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Message Log Entries */}
      <div className="bg-[var(--color-bg-primary)] rounded-lg border border-[var(--color-primary)28] shadow-sm p-6">
        <div className="space-y-4">
          {messageLogs.map((log) => (
            <div key={log.id} className="flex items-center bg-white justify-between p-4 border border-[var(--color-primary)28] rounded-lg transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 text-sm font-medium">
                    {log.title.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{log.title}</p>
                  <p className="text-gray-600 text-sm">{log.recipient}</p>
                  <p className="text-gray-500 text-sm">{log.timestamp}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(log.status)}`}>
                  {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

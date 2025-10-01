import React, { useState } from 'react'

export default function OrderHistory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(false)

  // Demo data - replace with API data later
  const paymentLogs = [
    {   
      id: 'ORD-001',
      user: 'Rahul Sharma (Student)',
      amount: '₹2,999',
      paymentMethod: 'Razorpay',
      status: 'Completed',
      date: '01-01-2025'
    },
    {
      id: 'ORD-001',
      user: 'Rahul Sharma (Institute)',
      amount: '₹2,999',
      paymentMethod: 'Razorpay',
      status: 'Completed',
      date: '01-01-2025'
    },
    {
      id: 'ORD-001',
      user: 'Rahul Sharma (Institute)',
      amount: '₹2,999',
      paymentMethod: 'Razorpay',
      status: 'Completed',
      date: '01-01-2025'
    }
  ]

  const filteredLogs = paymentLogs.filter(log =>
    log.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.amount.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Auto scroll effect
  React.useEffect(() => {
    if (autoScrollEnabled && filteredLogs.length > 0) {
      const interval = setInterval(() => {
        const tableContainer = document.querySelector('.order-history-table-container');
        if (tableContainer) {
          tableContainer.scrollTop += 1;
          if (tableContainer.scrollTop >= tableContainer.scrollHeight - tableContainer.clientHeight) {
            tableContainer.scrollTop = 0;
          }
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [autoScrollEnabled, filteredLogs.length]);

  return (
    <div className="max-w-7xl mx-auto  space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-[var(--color-primary)3c] shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Order History & Payment Logs</h1>
            <p className="text-gray-600 mt-1">Track Payment, invoices, and refunds</p>
          </div>
          
          {/* Auto Scroll Toggle */}
          <div className="flex items-center gap-2 mr-4">
            <span className="text-sm text-gray-700">Auto Scroll</span>
            <button
              type="button"
              onClick={() => setAutoScrollEnabled(!autoScrollEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                autoScrollEnabled ? '' : 'bg-gray-200 focus:ring-gray-400'
              }`}
              style={{
                backgroundColor: autoScrollEnabled ? '#5C9A24' : undefined,
                focusRingColor: autoScrollEnabled ? '#5C9A24' : undefined
              }}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${
                  autoScrollEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <button className="bg-white hover:bg-[var(--color-secondary)] hover:text-white border-2 border-[var(--color-secondary)] text-[var(--color-secondary)] px-4 py-2 rounded-lg font-medium transition-colors">
            Export Data
          </button>
        </div>

        {/* Payment Logs Section */}
        <div className="  rounded-lg border border-[var(--color-primary)3c] shadow-sm">
          <div className="p-3 border-b border-[var(--color-primary)3c]">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Payment Logs</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 px-4 py-2 border border-[var(--color-primary)3c] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="order-history-table-container overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full">
              <thead className=" ">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.map((log, index) => (
                  <tr key={index} className="hover: ">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{log.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {log.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.paymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-gray-400 hover:text-gray-600">
                        <span className="sr-only">Actions</span>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">
                <p className="text-lg font-medium">No payment logs found</p>
                <p className="text-sm">Try adjusting your search criteria</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

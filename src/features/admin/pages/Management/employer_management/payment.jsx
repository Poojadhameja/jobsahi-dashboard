import React, { useState } from 'react'

// Payment History & Subscription Status Component
function PaymentHistory() {
  const [timeFilter, setTimeFilter] = useState('All Time')

  const timeFilterOptions = [
    'All Time',
    'Last 7 Days',
    'Last 30 Days',
    'Last 3 Months',
    'Last 6 Months',
    'Last Year'
  ]

  const paymentData = [
    {
      id: 1,
      company: 'TechCorp',
      subscriptionPlan: 'Premium',
      amount: 25000,
      paymentDate: '01-01-2025',
      status: 'Paid',
      invoice: 'INV-2025-001'
    },
    {
      id: 2,
      company: 'InnovateTech',
      subscriptionPlan: 'Basic',
      amount: 15000,
      paymentDate: '02-01-2025',
      status: 'Paid',
      invoice: 'INV-2025-002'
    },
    {
      id: 3,
      company: 'DataSoft Solutions',
      subscriptionPlan: 'Premium',
      amount: 25000,
      paymentDate: '28-12-2024',
      status: 'Pending',
      invoice: 'INV-2024-125'
    },
    {
      id: 4,
      company: 'CloudTech Inc',
      subscriptionPlan: 'Enterprise',
      amount: 50000,
      paymentDate: '03-01-2025',
      status: 'Paid',
      invoice: 'INV-2025-003'
    },
    {
      id: 5,
      company: 'StartupHub',
      subscriptionPlan: 'Basic',
      amount: 15000,
      paymentDate: '30-12-2024',
      status: 'Overdue',
      invoice: 'INV-2024-124'
    },
    {
      id: 6,
      company: 'WebCraft Studio',
      subscriptionPlan: 'Premium',
      amount: 25000,
      paymentDate: '29-12-2024',
      status: 'Paid',
      invoice: 'INV-2024-123'
    }
  ]

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Paid': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Overdue': 'bg-red-100 text-red-800'
    }
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {status}
      </span>
    )
  }

  const getPlanBadge = (plan) => {
    const planStyles = {
      'Basic': 'bg-blue-100 text-blue-800',
      'Premium': 'bg-purple-100 text-purple-800',
      'Enterprise': 'bg-indigo-100 text-indigo-800'
    }
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${planStyles[plan]}`}>
        {plan}
      </span>
    )
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-lg font-bold">💰</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Payment History & Subscription Status</h2>
          </div>
          <p className="text-gray-600 mt-1">Monitor payment transactions and subscription management</p>
        </div>
        
        {/* Time Filter */}
        <div className="relative">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="appearance-none bg-gray-50 text-gray-700 px-4 py-2 pr-8 rounded-lg text-sm font-medium border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {timeFilterOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500">▼</span>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Revenue */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹4,50,000</p>
              <p className="text-sm text-green-600 mt-1">+15% from last month</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-xl">💰</span>
            </div>
          </div>
        </div>

        {/* Pending Payments */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending Payments</p>
              <p className="text-2xl font-bold text-red-600">₹45,000</p>
              <p className="text-sm text-red-600 mt-1">3 overdue invoices</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-red-600 text-xl">⏰</span>
            </div>
          </div>
        </div>

        {/* Active Subscriptions */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Subscriptions</p>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
              <p className="text-sm text-green-600 mt-1">98% retention rate</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-xl">📊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscription Plan
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paymentData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPlanBadge(item.subscriptionPlan)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">{formatCurrency(item.amount)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.paymentDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-blue-600 font-medium">{item.invoice}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-gray-400 hover:text-gray-600">
                      <span className="text-lg">⋯</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PaymentHistory

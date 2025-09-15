import React, { useMemo, useState } from 'react'
import { LuChevronDown, LuCreditCard, LuWallet, LuUsers } from 'react-icons/lu'
import { Horizontal4Cards } from '../../components/metricCard'

const INR = (n) => `₹${Number(n).toLocaleString('en-IN')}`

export default function RevenueDashboard() {
  // ---- Filters (demo state) ----
  const [range, setRange] = useState('7d')
  const [method, setMethod] = useState('all')
  const [userType, setUserType] = useState('')

  // ---- Demo data (replace with API later) ----
  const metrics = useMemo(() => ({
    total:        { value: 250000, delta: '+12%' },
    employer:     { value: 150000, delta: '+5.5%' },
    institute:    { value: 50000,  delta: '+55.7%' },
    student:      { value: 20000,  delta: '+2.2%' },
  }), [range, method, userType])

  // Prepare data for Horizontal4Cards
  const revenueCardsData = useMemo(() => [
    {
      title: 'Total Revenue',
      value: INR(metrics.total.value),
      delta: metrics.total.delta,
      icon: <LuUsers />
    },
    {
      title: 'Employer Revenue',
      value: INR(metrics.employer.value),
      delta: metrics.employer.delta,
      icon: <LuUsers />
    },
    {
      title: 'Institute Revenue',
      value: INR(metrics.institute.value),
      delta: metrics.institute.delta,
      icon: <LuUsers />
    },
    {
      title: 'Student Revenue',
      value: INR(metrics.student.value),
      delta: metrics.student.delta,
      icon: <LuUsers />
    }
  ], [metrics])

  const paymentBreakup = useMemo(() => ([
    { key: 'razorpay', label: 'Razorpay', amount: 150000, percent: '5.5', dot: 'bg-blue-500' },
    { key: 'stripe',   label: 'Stripe',   amount: 50000,  percent: '5.8', dot: 'bg-purple-500' },
    { key: 'wallet',   label: 'Wallet',   amount: 10000,  percent: '5.6', dot: 'bg-green-500' },
  ]), [range, method])
  
  return (
    <div className="max-w-7xl mx-auto space-y-5 min-h-screen">
      {/* Filters & Analytics */}
      <section className="bg-white rounded-xl border border-[#0b537d3c] p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Filters & Analytics</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Date range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <div className="relative w-1/2">
              <select
                value={range}
                onChange={(e) => setRange(e.target.value)}
                className="w-full px-4 py-3  border border-[#0b537d3c] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 cursor-pointer"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="qtr">This Quarter</option>
                <option value="yr">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
              <LuChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <div className="relative w-1/2">
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full px-4 py-3  border border-[#0b537d3c] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 cursor-pointer"
              >
                <option value="all">All Methods</option>
                <option value="razorpay">Razorpay</option>
                <option value="stripe">Stripe</option>
                <option value="wallet">Wallet</option>
                <option value="bank">Bank Transfer</option>
              </select>
              <LuChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
            </div>
          </div>

          {/* User Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">User Type</label>
            <div className="relative w-1/2">
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full px-4 py-3  border border-[#0b537d3c] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              >
                <option value="" className="text-gray-400">Select user type</option>
                <option value="employer">Employer</option>
                <option value="institute">Institute</option>
                <option value="student">Student</option>
              </select>
              <LuChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Summary Cards */}
      <Horizontal4Cards data={revenueCardsData} />

      {/* Payment Method Analytics */}
      <section className="bg-white rounded-lg border border-[#0b537d3c] p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Payment Method Analytics</h2>
          <p className="text-gray-600">Revenue breakdown by payment methods</p>
        </div>

        <div className="space-y-2">
          {paymentBreakup.map((p) => (
            <div key={p.key} className="flex items-center justify-between py-2 border-b border-[#0b537d3c] last:border-b-0">
              <div className="flex items-center space-x-4">
                <div className={`w-4 h-4 ${p.dot} rounded-full`}></div>
                <div className="flex items-center space-x-2">
                  {p.key === 'wallet' ? (
                    <LuWallet className="w-5 h-5 text-gray-600" />
                  ) : (
                    <LuCreditCard className="w-5 h-5 text-gray-600" />
                  )}
                  <span className="font-medium text-gray-800">{p.label}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">{INR(p.amount)}</p>
                <p className="text-sm text-gray-600">{p.percent}%</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

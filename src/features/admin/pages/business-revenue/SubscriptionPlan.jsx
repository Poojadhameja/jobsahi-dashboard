import React, { useState } from 'react'

export default function SubscriptionPlan() {
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: 'Basic Plan',
      targetAudience: 'For individual job seekers',
      status: 'Active',
      price: '₹999',
      period: '/month',
      features: [
        '10 job applications',
        'Basic profile visibility',
        'Email support'
      ],
      freeCredits: 5,
      isActive: true
    },
    {
      id: 2,
      name: 'Premium Plan',
      targetAudience: 'For professionals',
      status: 'Active',
      price: '₹1999',
      period: '/month',
      features: [
        'Unlimited job applications',
        'Premium profile visibility',
        'Priority support',
        'Advanced search filters'
      ],
      freeCredits: 10,
      isActive: true
    },
    {
      id: 3,
      name: 'Enterprise Plan',
      targetAudience: 'For companies',
      status: 'Inactive',
      price: '₹4999',
      period: '/month',
      features: [
        'Unlimited everything',
        'Custom branding',
        'Dedicated account manager',
        'API access'
      ],
      freeCredits: 50,
      isActive: false
    }
  ])

  const togglePlanStatus = (planId) => {
    setPlans(plans.map(plan => 
      plan.id === planId 
        ? { ...plan, isActive: !plan.isActive, status: !plan.isActive ? 'Active' : 'Inactive' }
        : plan
    ))
  }

  const handleEdit = (planId) => {
    console.log('Edit plan:', planId)
    // Add edit functionality here
  }

  const handleDelete = (planId) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      setPlans(plans.filter(plan => plan.id !== planId))
    }
  }

  const handleCreateNew = () => {
    console.log('Create new plan')
    // Add create new plan functionality here
  }

  return (
    <div className="max-w-7xl mx-auto  space-y-4 bg-white border border-[#0b537d3c] rounded-lg p-2 md:p-4">
      {/* Header */}
      <div className=" rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Subscription Plan Manager</h1>
            <p className="text-gray-600 mt-1">Create, edit, and manage subscription plans</p>
          </div>
          <button 
            onClick={handleCreateNew}
            className="bg-white hover:bg-[#5B9821] hover:text-white border-2 border-[#5B9821] text-[#5B9821] px-4 py-2 rounded-lg font-medium transition-colors"
          >
            + Create New Plan
          </button>
        </div>
      </div>

      {/* Subscription Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="hover:shadow-md rounded-lg border border-[#0b537d3c] p-4">
            {/* Plan Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{plan.targetAudience}</p>
              </div>
              <span className={`inline-flex items-center px-3 border-[#5B9821] border py-1 rounded-full text-xs font-medium ${
                plan.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {plan.status}
              </span>
            </div>

            {/* Pricing */}
            <div className="mb-2">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600 ml-1">{plan.period}</span>
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Features:</h4>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Free Credits */}
            <div className="mb-6">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Free Credits:</span> {plan.freeCredits}
              </p>
            </div>

            {/* Toggle Switch */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Plan Status</span>
                <button
                  onClick={() => togglePlanStatus(plan.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                    plan.isActive ? 'bg-gray-900' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      plan.isActive ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => handleEdit(plan.id)}
                className="flex-1 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(plan.id)}
                className="flex-1 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {plans.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">
            <p className="text-lg font-medium">No subscription plans found</p>
            <p className="text-sm">Create your first subscription plan to get started</p>
            <button 
              onClick={handleCreateNew}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              + Create New Plan
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

import React, { useState } from 'react'
import { PrimaryButton, OutlineButton } from '../../../../shared/components/Button.jsx'
import { COLORS, TAILWIND_COLORS } from '../../../../shared/WebConstant.js'

// Toggle Switch Component
const Toggle = ({ checked, onChange, label }) => (
  <label className="flex items-center gap-3 cursor-pointer select-none">
    <span
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
        checked ? 'bg-[var(--color-secondary)]' : 'bg-gray-300'
      }`}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
    >
      <span
        className={`h-5 w-5 bg-white rounded-full shadow transform transition-transform duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-1'
        }`}
      />
    </span>
    <span className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>{label}</span>
  </label>
)

// Spam Detection Rules Card Component
const SpamDetectionRules = ({ rules, onRulesChange, onUpdateRules }) => {
  const { keywords, minLength, autoFlag, flagInactive } = rules

  const handleSubmit = () => {
    onUpdateRules(rules)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Spam Detection Rules</h2>
      </div>
      <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mb-6`}>Configure automatic job spam detection</p>

      {/* Form Content */}
      <div className="space-y-6 flex-1">
        {/* Keywords Filter */}
        <div className="space-y-2">
          <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
            Keywords Filters
          </label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => onRulesChange({ ...rules, keywords: e.target.value })}
            placeholder="Enter spam keywords (comma separated)"
            className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Minimum Length */}
        <div className="space-y-2">
          <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
            Minimum job description length
          </label>
          <input
            type="number"
            value={minLength}
            onChange={(e) => onRulesChange({ ...rules, minLength: e.target.value })}
            placeholder="50"
            className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Toggle Switches */}
        <div className="space-y-4">
          <Toggle 
            checked={autoFlag} 
            onChange={(checked) => onRulesChange({ ...rules, autoFlag: checked })} 
            label="Auto-flag suspicious jobs" 
          />
          <Toggle 
            checked={flagInactive} 
            onChange={(checked) => onRulesChange({ ...rules, flagInactive: checked })} 
            label="Flag inactive users (90+ days)" 
          />
        </div>

        {/* Update Button */}
        <div className="pt-4">
          <PrimaryButton 
            onClick={handleSubmit}
            fullWidth={true}
            size="lg"
          >
            Update Rules
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}

// Flagged Items Review Card
const FlaggedItemsReview = ({ flaggedItems, onReviewItem }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Flagged Items</h2>
      </div>
      <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mb-6`}>Review automatically flagged content</p>

      {/* Flagged Items List */}
      <div className="space-y-3 flex-1">
        {flaggedItems.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors duration-200"
          >
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>
                {item.title}
              </h3>
              <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED}`}>
                {item.reason}
              </p>
            </div>

            {/* Status and Actions */}
            <div className="flex items-center gap-2 ml-4">
              {/* Status Badge */}
              <span
                className={`px-3 py-1 text-sm font-medium rounded-md whitespace-nowrap ${
                  item.status === 'Reviewed' 
                    ? 'bg-[var(--color-secondary)] text-white' 
                    : 'text-[var(--color-secondary)] border-2 border-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-white'
                }`}
              >
                {item.status}
              </span>
              
              {/* Review Button */}
              {item.status === 'Pending' && (
                <OutlineButton 
                  onClick={() => onReviewItem(index)}
                  size="sm"
                >
                  Review
                </OutlineButton>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Main ExpiryReminder Component
const ExpiryReminder = () => {
  // State management for spam detection rules
  const [rules, setRules] = useState({
    keywords: '',
    minLength: '50',
    autoFlag: false,
    flagInactive: true
  })

  // Sample flagged items data
  const [flaggedItems, setFlaggedItems] = useState([
    {
      title: "Work from home opportunity",
      reason: "Job post - spam keywords",
      status: "Pending"
    },
    {
      title: "inactive_user@gmail.com", 
      reason: "User - 90+ days inactive",
      status: "Reviewed"
    },
    {
      title: "Easy money fast",
      reason: "Job post - suspicious content",
      status: "Pending"
    }
  ])

  const handleRulesChange = (newRules) => {
    setRules(newRules)
  }

  const handleUpdateRules = (updatedRules) => {
    // In a real app, this would call an API
    console.log('Updated rules:', updatedRules)
    alert('Rules updated successfully!')
  }

  const handleReviewItem = (itemIndex) => {
    setFlaggedItems(prev => 
      prev.map((item, index) => 
        index === itemIndex 
          ? { ...item, status: item.status === 'Pending' ? 'Reviewed' : 'Pending' }
          : item
      )
    )
    console.log('Reviewing item:', itemIndex)
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Spam Detection Rules */}
        <div>
          <SpamDetectionRules 
            rules={rules} 
            onRulesChange={handleRulesChange}
            onUpdateRules={handleUpdateRules}
          />
        </div>

        {/* Right Column - Flagged Items Review */}
        <div>
          <FlaggedItemsReview 
            flaggedItems={flaggedItems}
            onReviewItem={handleReviewItem}
          />
        </div>
      </div>
    </div>
  )
}

export default ExpiryReminder
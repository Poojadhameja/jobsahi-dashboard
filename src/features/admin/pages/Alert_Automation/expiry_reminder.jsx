import React, { useState } from 'react'
import { PrimaryButton, OutlineButton } from '../../../../shared/components/Button.jsx'
import { COLORS, TAILWIND_COLORS } from '../../../../shared/WebConstant'

// Toggle Switch Component
const Toggle = ({ checked, onChange, label }) => (
  <label className="flex items-center gap-3 cursor-pointer select-none">
    <span
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
        checked ? 'bg-[#5C9A24]' : 'bg-gray-300'
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
    <span className="text-sm text-gray-600">{label}</span>
  </label>
)

// Spam Detection Rules Card Component
const SpamDetectionRules = ({ rules, onRulesChange, onUpdateRules }) => {
  const { keywords, minLength, autoFlag, flagInactive } = rules

  const handleSubmit = () => {
    onUpdateRules(rules)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full h-96 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[#5C9A24] text-lg">🚩</span>
        <h2 className="text-lg font-semibold text-[#0B537D]">Spam Detection Rules</h2>
      </div>
      <p className="text-sm text-gray-600 mb-6">Configure automatic job spam detection</p>

      {/* Form Content */}
      <div className="space-y-2 flex-1">
        {/* Keywords Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Keywords Filters
          </label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => onRulesChange({ ...rules, keywords: e.target.value })}
            placeholder="Enter spam keywords (comma separated)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C9A24] focus:border-transparent text-sm"
          />
        </div>

        {/* Minimum Length */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Description Length
          </label>
          <input
            type="number"
            value={minLength}
            onChange={(e) => onRulesChange({ ...rules, minLength: e.target.value })}
            placeholder="50"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C9A24] focus:border-transparent text-sm"
          />
        </div>

        {/* Toggle Switches */}
        <div className="space-y-2 pt-2">
          <Toggle 
            checked={autoFlag} 
            onChange={(checked) => onRulesChange({ ...rules, autoFlag: checked })} 
            label="Auto-flag suspicious posts" 
          />
          <Toggle 
            checked={flagInactive} 
            onChange={(checked) => onRulesChange({ ...rules, flagInactive: checked })} 
            label="Flag inactive user posts" 
          />
        </div>

        {/* Update Button */}
        <div className="pt-2">
          <PrimaryButton 
            onClick={handleSubmit}
            className="bg-[#5C9A24] hover:bg-[#4A7D1A] text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Save Rules
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}

// Flagged Items Review Card
const FlaggedItemsReview = ({ flaggedItems, onReviewItem }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full h-96 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[#5C9A24] text-lg">🚩</span>
        <h2 className="text-lg font-semibold text-[#0B537D]">Flagged Items Review</h2>
      </div>
      <p className="text-sm text-gray-600 mb-6">Review and manage flagged content</p>

      {/* Flagged Items List */}
      <div className="space-y-4 flex-1 overflow-y-auto">
        {flaggedItems.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {item.title}
              </p>
              <p className="text-xs text-gray-600 truncate">
                {item.reason}
              </p>
            </div>

            {/* Status and Actions */}
            <div className="flex items-center gap-2 ml-4">
              {/* Status Badge */}
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  item.status === 'Approved' 
                    ? 'bg-white border border-[#5C9A24] text-[#5C9A24]' 
                    : 'bg-[#5C9A24] text-white'
                }`}
              >
                {item.status}
              </span>
              
              {/* Review Button */}
              {item.status === 'Flagged' && (
                <OutlineButton 
                  onClick={() => onReviewItem(index)}
                  className="border-[#5C9A24] text-[#5C9A24] hover:bg-[rgba(92,154,36,0.1)] px-3 py-1 text-xs font-medium rounded-lg"
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
    keywords: 'spam, fake, scam, urgent',
    minLength: '50',
    autoFlag: true,
    flagInactive: false
  })

  // Sample flagged items data
  const [flaggedItems, setFlaggedItems] = useState([
    {
      title: "URGENT: High Paying Job - No Experience Required",
      reason: "Contains spam keywords",
      status: "Flagged"
    },
    {
      title: "Software Engineer Position", 
      reason: "Approved by admin",
      status: "Approved"
    },
    {
      title: "Work from home - Earn $5000 daily",
      reason: "Suspicious content",
      status: "Flagged"
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
          ? { ...item, status: item.status === 'Flagged' ? 'Approved' : 'Flagged' }
          : item
      )
    )
    console.log('Reviewing item:', itemIndex)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
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
    </div>
  )
}

export default ExpiryReminder
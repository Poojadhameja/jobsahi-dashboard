import React, { useState } from 'react'
import { TAILWIND_COLORS } from '../../../../../shared/WebConstant'

// Employer Ratings (Student Feedback) Component
function EmployerRatings() {
  const [timeFilter, setTimeFilter] = useState('All Time')

  const timeFilterOptions = [
    'All Time',
    'Last 7 Days',
    'Last 30 Days',
    'Last 3 Months',
    'Last 6 Months',
    'Last Year'
  ]

  const ratingsData = [
    {
      id: 1,
      company: 'Microsoft',
      rating: 5,
      totalReviews: 150,
      responseRate: 7
    },
    {
      id: 2,
      company: 'Google',
      rating: 4.8,
      totalReviews: 234,
      responseRate: 12
    },
    {
      id: 3,
      company: 'Amazon',
      rating: 4.5,
      totalReviews: 189,
      responseRate: 9
    },
    {
      id: 4,
      company: 'Apple',
      rating: 4.9,
      totalReviews: 167,
      responseRate: 15
    },
    {
      id: 5,
      company: 'Meta',
      rating: 4.3,
      totalReviews: 98,
      responseRate: 6
    },
    {
      id: 6,
      company: 'Netflix',
      rating: 4.7,
      totalReviews: 145,
      responseRate: 11
    }
  ]

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400 text-lg">★</span>
      )
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400 text-lg">☆</span>
      )
    }

    const remainingStars = 5 - Math.ceil(rating)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300 text-lg">★</span>
      )
    }

    return stars
  }

  const handleViewReviews = (companyId) => {
    alert(`Viewing reviews for company ID: ${companyId}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-lg font-bold">📝</span>
            </div>
            <h2 className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Employer Ratings (Student Feedback)</h2>
          </div>
          <p className={`${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>Monitor employer ratings and feedback from job seekers</p>
        </div>
        
        {/* Time Filter */}
        <div className="relative">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className={`appearance-none bg-gray-50 ${TAILWIND_COLORS.TEXT_PRIMARY} px-4 py-2 pr-8 rounded-lg text-sm font-medium border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {timeFilterOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className={TAILWIND_COLORS.TEXT_MUTED}>▼</span>
          </div>
        </div>
      </div>

      {/* Ratings Cards */}
      <div className="bg-white rounded-lg border border-blue-200 shadow-sm p-6">
        <div className="space-y-4">
          {ratingsData.map((company) => (
            <div key={company.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
              <div className="flex items-center justify-between">
                {/* Left Side - Company Info */}
                <div className="flex items-center space-x-4">
                  {/* Company Logo Placeholder */}
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className={`${TAILWIND_COLORS.TEXT_MUTED} text-sm font-bold`}>
                      {company.company.charAt(0)}
                    </span>
                  </div>
                  
                  {/* Company Info */}
                  <div>
                    <h3 className={`text-lg font-bold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>{company.company}</h3>
                    
                    {/* Rating Stars */}
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {renderStars(company.rating)}
                      </div>
                      <span className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
                        ({company.totalReviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Right Side - Response Rate and Button */}
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Response rate</p>
                    <p className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{company.responseRate}%</p>
                  </div>
                  
                  <button
                    onClick={() => handleViewReviews(company.id)}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-200 text-sm font-medium"
                  >
                    View Reviews
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Overall Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
              {ratingsData.reduce((sum, company) => sum + company.rating, 0) / ratingsData.length}
            </div>
            <div className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Average Rating</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
              {ratingsData.reduce((sum, company) => sum + company.totalReviews, 0)}
            </div>
            <div className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Total Reviews</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
              {ratingsData.length}
            </div>
            <div className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Companies</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
              {Math.round(ratingsData.reduce((sum, company) => sum + company.responseRate, 0) / ratingsData.length)}%
            </div>
            <div className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Avg Response Rate</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployerRatings

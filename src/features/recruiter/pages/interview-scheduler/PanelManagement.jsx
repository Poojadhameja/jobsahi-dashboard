import React, { useState } from 'react'
import { LuStar, LuUser, LuMessageSquare, LuCheck } from 'react-icons/lu'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'
import { Button } from '../../../../shared/components/Button'

const PanelManagement = () => {
  const [formData, setFormData] = useState({
    candidate: '',
    rating: 0,
    remarks: '',
    decision: ''
  })

  const [feedbackList, setFeedbackList] = useState([
    {
      id: 1,
      candidate: 'Rahul Singh - Electrician',
      interviewDetails: 'Round 2 - Jan 16, 2024',
      rating: 4,
      panelist: 'Shakti Singh',
      role: 'Hr Manager',
      remarks: 'Strong skills, good communication, etc.',
      decision: 'Proceed to next round'
    },
    {
      id: 2,
      candidate: 'Rahul Singh - Civil',
      interviewDetails: 'Round 2 - Jan 15, 2024',
      rating: 5,
      panelist: 'Shakti Singh',
      role: 'Hr Manager',
      remarks: 'Strong skills, good communication, etc.',
      decision: 'Recommend for hire'
    }
  ])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating: rating
    }))
  }

  const handleSubmitFeedback = () => {
    // Validate form data
    if (!formData.candidate || !formData.remarks || !formData.decision || formData.rating === 0) {
      alert('Please fill in all required fields and provide a rating.')
      return
    }

    // Create new feedback object
    const newFeedback = {
      id: Date.now(), // Simple ID generation
      candidate: formData.candidate,
      interviewDetails: `Round 1 - ${new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: '2-digit', 
        year: 'numeric' 
      })}`,
      rating: formData.rating,
      panelist: 'Current User', // You can replace this with actual user data
      role: 'Panel Member',
      remarks: formData.remarks,
      decision: formData.decision
    }

    // Add new feedback to the list
    setFeedbackList(prev => [newFeedback, ...prev])

    // Reset form
    setFormData({
      candidate: '',
      rating: 0,
      remarks: '',
      decision: ''
    })

    console.log('Feedback submitted successfully:', newFeedback)
  }

  const renderStars = (rating, interactive = false) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && handleRatingChange(star)}
            className={`w-5 h-5 ${
              star <= rating
                ? 'text-yellow-400'
                : 'text-gray-300'
            } ${interactive ? 'hover:text-yellow-300 cursor-pointer' : 'cursor-default'}`}
          >
            <LuStar className="w-full h-full fill-current" />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="p-2 mt-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left Section - Add Feedback Form */}
        <div className={`${TAILWIND_COLORS.CARD} p-5`}>
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <LuMessageSquare className={`w-4 h-4 ${TAILWIND_COLORS.TEXT_MUTED}`} />
              </div>
              <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Add Feedback</h3>
            </div>
            <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Provide feedback for completed interviews</p>
          </div>

          <div className="space-y-4">
            {/* Select Candidate */}
            <div>
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                Select Candidate
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Choose Candidate"
                  value={formData.candidate}
                  onChange={(e) => handleInputChange('candidate', e.target.value)}
                  className={`w-full px-3 py-2 border ${TAILWIND_COLORS.BORDER} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8`}
                />
                <div className="absolute right-3 top-2.5">
                  <svg className={`w-4 h-4 ${TAILWIND_COLORS.TEXT_MUTED}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Rate Candidate */}
            <div>
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                Rate Candidate (1-5 stars)
              </label>
              {renderStars(formData.rating, true)}
            </div>

            {/* Panelist Remarks */}
            <div>
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                Panelist Remarks
              </label>
              <textarea
                placeholder="Enter detailed feedback about the candidate's performance..."
                value={formData.remarks}
                onChange={(e) => handleInputChange('remarks', e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 border ${TAILWIND_COLORS.BORDER} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none`}
              />
            </div>

            {/* Decision */}
            <div>
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                Decision
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Select decision"
                  value={formData.decision}
                  onChange={(e) => handleInputChange('decision', e.target.value)}
                  className={`w-full px-3 py-2 border ${TAILWIND_COLORS.BORDER} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8`}
                />
                <div className="absolute right-3 top-2.5">
                  <svg className={`w-4 h-4 ${TAILWIND_COLORS.TEXT_MUTED}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmitFeedback}
              variant="primary"
              size="md"
              fullWidth
              icon={<LuCheck className="w-4 h-4" />}
            >
              Submit Feedback
            </Button>
          </div>
        </div>

        {/* Right Section - Feedback List */}
        <div className={`${TAILWIND_COLORS.CARD} p-5 flex flex-col`}>
          <div className="mb-6 flex-shrink-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <LuMessageSquare className={`w-4 h-4 ${TAILWIND_COLORS.TEXT_MUTED}`} />
              </div>
              <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Add Feedback</h3>
            </div>
            <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Provide feedback for completed interviews</p>
          </div>

          <div className="flex-1 overflow-y-auto max-h-96 pr-2">
            <div className="space-y-4">
              {feedbackList.map((feedback) => (
                <div key={feedback.id} className={`border ${TAILWIND_COLORS.BORDER} rounded-lg p-4`}>
                  <div className="mb-3">
                    <h4 className={`font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>{feedback.candidate}</h4>
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>{feedback.interviewDetails}</p>
                  </div>

                  <div className="mb-3">
                    {renderStars(feedback.rating)}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`px-2 py-1 bg-gray-100 text-xs ${TAILWIND_COLORS.TEXT_MUTED} rounded-full`}>
                      {feedback.panelist}
                    </span>
                    <span className={`px-2 py-1 bg-gray-100 text-xs ${TAILWIND_COLORS.TEXT_MUTED} rounded-full`}>
                      {feedback.role}
                    </span>
                  </div>

                  <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mb-3`}>{feedback.remarks}</p>

                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    className="text-sm"
                  >
                    {feedback.decision}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      {/* <div className="text-center mt-8">
        <p className="text-lg font-bold text-gray-900">Courses section will be add here</p>
      </div> */}
    </div>
  )
}

export default PanelManagement

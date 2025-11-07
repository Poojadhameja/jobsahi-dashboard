import React, { useState } from 'react'
import { LuStar, LuUser, LuMessageSquare, LuCheck, LuRefreshCw, LuX } from 'react-icons/lu'
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
      role: 'HR Manager',
      remarks: 'Strong skills, good communication, etc.',
      decision: 'Proceed to next round'
    },
    {
      id: 2,
      candidate: 'Rahul Singh - Civil',
      interviewDetails: 'Round 2 - Jan 15, 2024',
      rating: 5,
      panelist: 'Shakti Singh',
      role: 'HR Manager',
      remarks: 'Strong skills, good communication, etc.',
      decision: 'Recommend for hire'
    }
  ])

  // ✅ Update modal states
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [selectedFeedback, setSelectedFeedback] = useState(null)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleRatingChange = (rating) => {
    setFormData(prev => ({ ...prev, rating }))
  }

  const handleSubmitFeedback = () => {
    if (!formData.candidate || !formData.remarks || !formData.decision || formData.rating === 0) {
      alert('Please fill in all required fields and provide a rating.')
      return
    }

    const newFeedback = {
      id: Date.now(),
      candidate: formData.candidate,
      interviewDetails: `Round 1 - ${new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}`,
      rating: formData.rating,
      panelist: 'Current User',
      role: 'Panel Member',
      remarks: formData.remarks,
      decision: formData.decision
    }

    setFeedbackList(prev => [newFeedback, ...prev])
    setFormData({ candidate: '', rating: 0, remarks: '', decision: '' })

    console.log('✅ Feedback submitted successfully:', newFeedback)
  }

  const handleUpdateFeedback = (id) => {
    const feedback = feedbackList.find(f => f.id === id)
    setSelectedFeedback({ ...feedback })
    setShowUpdateModal(true)
  }

  const handleProceedNextRound = (id) => {
    alert(`Candidate ID ${id} moved to next round`)
  }

  const handleSaveUpdate = () => {
    setFeedbackList(prev =>
      prev.map(f =>
        f.id === selectedFeedback.id ? selectedFeedback : f
      )
    )
    setShowUpdateModal(false)
  }

  const renderStars = (rating, interactive = false, onChange = null) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => interactive && onChange && onChange(star)}
          className={`w-5 h-5 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          } ${interactive ? 'hover:text-yellow-300 cursor-pointer' : 'cursor-default'}`}
        >
          <LuStar className="w-full h-full fill-current" />
        </button>
      ))}
    </div>
  )

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
              <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                Add Feedback
              </h3>
            </div>
            <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
              Provide feedback for completed interviews
            </p>
          </div>

          <div className="space-y-4">
            {/* Select Candidate */}
            <div>
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                Select Candidate
              </label>
              <input
                type="text"
                placeholder="Choose Candidate"
                value={formData.candidate}
                onChange={(e) => handleInputChange('candidate', e.target.value)}
                className={`w-full px-3 py-2 border ${TAILWIND_COLORS.BORDER} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>

            {/* Rating */}
            <div>
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                Rate Candidate (1-5 stars)
              </label>
              {renderStars(formData.rating, true, handleRatingChange)}
            </div>

            {/* Remarks */}
            <div>
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                Panelist Remarks
              </label>
              <textarea
                placeholder="Enter detailed feedback..."
                value={formData.remarks}
                onChange={(e) => handleInputChange('remarks', e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 border ${TAILWIND_COLORS.BORDER} rounded-lg focus:ring-2 focus:ring-blue-500 resize-none`}
              />
            </div>

            {/* Decision */}
            <div>
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                Decision
              </label>
              <input
                type="text"
                placeholder="Enter decision (e.g., Proceed / Reject)"
                value={formData.decision}
                onChange={(e) => handleInputChange('decision', e.target.value)}
                className={`w-full px-3 py-2 border ${TAILWIND_COLORS.BORDER} rounded-lg focus:ring-2 focus:ring-blue-500`}
              />
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
                <LuUser className={`w-4 h-4 ${TAILWIND_COLORS.TEXT_MUTED}`} />
              </div>
              <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                Panel Feedback Summary
              </h3>
            </div>
            <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
              Overview of submitted interview feedback
            </p>
          </div>

          <div className="flex-1 overflow-y-auto max-h-96 pr-2">
            <div className="space-y-4">
              {feedbackList.map((feedback) => (
                <div key={feedback.id} className={`border ${TAILWIND_COLORS.BORDER} rounded-lg p-4 shadow-sm`}>
                  <div className="mb-3">
                    <h4 className={`font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>
                      {feedback.candidate}
                    </h4>
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
                      {feedback.interviewDetails}
                    </p>
                  </div>

                  <div className="mb-3">{renderStars(feedback.rating)}</div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full">
                      {feedback.panelist}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full">
                      {feedback.role}
                    </span>
                  </div>

                  <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mb-3`}>
                    {feedback.remarks}
                  </p>

                  {/* ✅ Buttons */}
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleProceedNextRound(feedback.id)}
                      icon={<LuCheck className="w-4 h-4" />}
                    >
                      Proceed to Next Round
                    </Button>

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleUpdateFeedback(feedback.id)}
                      icon={<LuRefreshCw className="w-4 h-4" />}
                    >
                      Update Feedback
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Update Feedback Modal */}
      {showUpdateModal && selectedFeedback && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-2">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 border-b pb-2">
              <h3 className="text-lg font-semibold text-gray-900">Update Feedback</h3>
              <button
                onClick={() => setShowUpdateModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <LuX className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="space-y-4">
              {/* Candidate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Candidate
                </label>
                <input
                  type="text"
                  value={selectedFeedback.candidate}
                  onChange={(e) =>
                    setSelectedFeedback({ ...selectedFeedback, candidate: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                {renderStars(selectedFeedback.rating, true, (r) =>
                  setSelectedFeedback({ ...selectedFeedback, rating: r })
                )}
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Remarks
                </label>
                <textarea
                  rows={3}
                  value={selectedFeedback.remarks}
                  onChange={(e) =>
                    setSelectedFeedback({ ...selectedFeedback, remarks: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Decision */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Decision
                </label>
                <input
                  type="text"
                  value={selectedFeedback.decision}
                  onChange={(e) =>
                    setSelectedFeedback({ ...selectedFeedback, decision: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 mt-6 border-t pt-4">
              <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveUpdate}>
                Update Feedback
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PanelManagement

import React, { useState, useEffect, useCallback } from 'react'
import { LuStar, LuUser, LuMessageSquare, LuCheck, LuRefreshCw, LuX } from 'react-icons/lu'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'
import { Button } from '../../../../shared/components/Button'
import { getMethod, postMethod, putMethod } from '../../../../service/api'
import apiService from '../../services/serviceUrl'
import Swal from 'sweetalert2'

const PanelManagement = () => {
  const [formData, setFormData] = useState({
    interview_id: '',
    candidate_name: '', // Store candidateName for panelist_name
    rating: 0,
    feedback: ''
  })

  const [feedbackList, setFeedbackList] = useState([])
  const [loading, setLoading] = useState(true)
  const [studentsList, setStudentsList] = useState([])

  // ✅ Update modal states
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [selectedFeedback, setSelectedFeedback] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch scheduled interviews to get student list - THIS IS CALLED FIRST
  const fetchScheduledInterviews = useCallback(async () => {
    try {
      console.log('🔄 Step 1: Fetching scheduled interviews...')
      const response = await getMethod({
        apiUrl: apiService.getScheduledInterviews
      })

      console.log('📅 Scheduled Interviews Response:', response)

      const isSuccess = response?.status === true || response?.status === 'success' || response?.success === true

      if (isSuccess) {
        let interviews = []
        
        if (Array.isArray(response.data)) {
          interviews = response.data
        } else if (response.data && Array.isArray(response.data.data)) {
          interviews = response.data.data
        } else if (response.interviews && Array.isArray(response.interviews)) {
          interviews = response.interviews
        }

        // Map to get student list - only essential fields needed
        // Log first item to see available fields
        if (interviews.length > 0) {
          console.log('📋 First interview item structure:', interviews[0])
          console.log('📋 Available fields in first item:', Object.keys(interviews[0]))
          console.log('📋 Checking for job title fields:', {
            jobTitle: interviews[0].jobTitle,
            job_title: interviews[0].job_title,
            jobName: interviews[0].jobName,
            job_name: interviews[0].job_name,
            title: interviews[0].title,
            job: interviews[0].job
          })
        }
        
        // Extract only the 4 important fields: interviewId, candidateName, candidateId, jobTitle
        const students = interviews.map((item) => {
          // Extract the 4 important fields from API response
          const interviewId = item.interviewId || item.id || item.interview_id
          const candidateName = item.candidateName || item.candidate_name || item.name || 'N/A'
          const candidateId = item.candidateId || item.student_id || item.studentId || item.user_id
          const jobTitle = item.jobTitle || item.job_title || ''
          
          // Log for debugging if required fields are missing
          if (!interviewId || !candidateName || !candidateId) {
            console.warn('⚠️ Missing required fields in item:', {
              interviewId,
              candidateName,
              candidateId,
              jobTitle,
              fullItem: item
            })
          }
          
          return {
            interview_id: interviewId ? parseInt(interviewId) : null,
            candidate_name: candidateName,
            candidate_id: candidateId ? parseInt(candidateId) : null,
            job_title: jobTitle
          }
        })
        
        console.log('📋 Mapped students with job titles:', students.map(s => ({ 
          interview_id: s.interview_id,
          candidate_name: s.candidate_name, 
          job_title: s.job_title 
        })))

        console.log('✅ Step 1 Complete: Mapped Students List with interview_id and candidate_name:', students)
        console.log('📋 Total students found:', students.length)
        setStudentsList(students)
        return true // Return success
      } else {
        console.warn('⚠️ No scheduled interviews found')
        setStudentsList([])
        return false
      }
    } catch (error) {
      console.error('❌ Error fetching scheduled interviews:', error)
      setStudentsList([])
      return false
    }
  }, [])

  // Fetch panel feedbacks - THIS IS CALLED AFTER getScheduledInterviews
  const fetchPanelFeedbacks = useCallback(async () => {
    try {
      console.log('🔄 Step 2: Fetching panel feedbacks...')
      console.log('📤 API URL:', apiService.getInterviewPanel)
      console.log('📤 Auth Token:', localStorage.getItem('authToken') ? 'Present' : 'Missing')
      
      setLoading(true)
      const response = await getMethod({
        apiUrl: apiService.getInterviewPanel
      })

      console.log('📊 Panel Feedbacks Raw Response:', response)
      console.log('📊 Response Type:', typeof response)
      console.log('📊 Response Keys:', Object.keys(response || {}))
      console.log('📊 Response Status:', response?.status)
      console.log('📊 Response Message:', response?.message)
      console.log('📊 Response Data:', response?.data)
      console.log('📊 Response Data Type:', typeof response?.data)
      console.log('📊 Is Data Array?', Array.isArray(response?.data))

      const isSuccess = response?.status === true || response?.status === 'success' || response?.success === true

      console.log('📊 Is Success?', isSuccess)

      if (isSuccess) {
        let feedbacks = []
        
        // Try multiple possible response structures
        if (Array.isArray(response.data)) {
          feedbacks = response.data
          console.log('✅ Found feedbacks in response.data (array)')
        } else if (response.data && Array.isArray(response.data.data)) {
          feedbacks = response.data.data
          console.log('✅ Found feedbacks in response.data.data')
        } else if (response.feedbacks && Array.isArray(response.feedbacks)) {
          feedbacks = response.feedbacks
          console.log('✅ Found feedbacks in response.feedbacks')
        } else if (response.panelists && Array.isArray(response.panelists)) {
          feedbacks = response.panelists
          console.log('✅ Found feedbacks in response.panelists')
        } else {
          console.warn('⚠️ No feedbacks array found in response. Response structure:', response)
        }

        console.log('📊 Extracted Feedbacks Count:', feedbacks.length)
        console.log('📊 First Feedback Item:', feedbacks[0])

        // Map API response to UI format
        const mappedFeedbacks = feedbacks.map((item) => {
          // Convert string numbers to integers if needed
          const rating = typeof item.rating === 'string' ? parseInt(item.rating) : (item.rating || 0)
          
          return {
            id: item.id || item.panel_id || item.interview_panel_id,
            interview_id: item.interview_id,
            candidate: item.panelist_name || item.candidate_name || item.candidate || item.student_name || `Interview #${item.interview_id}`,
            interviewDetails: item.created_at 
              ? `Interview #${item.interview_id} - ${new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}`
              : `Interview #${item.interview_id}`,
            rating: rating,
            panelist: item.panelist_name || item.panelist || 'N/A',
            role: item.panelist_role || item.role || 'Panel Member',
            remarks: item.feedback || item.remarks || '',
            decision: item.notes || item.decision || '',
            // Keep original data for update
            originalData: item
          }
        })

        console.log('✅ Mapped Feedbacks:', mappedFeedbacks)
        setFeedbackList(mappedFeedbacks)
      } else {
        console.warn('⚠️ API returned unsuccessful status. Response:', response)
        setFeedbackList([])
      }
    } catch (error) {
      console.error('❌ Error fetching panel feedbacks:', error)
      console.error('❌ Error details:', {
        message: error?.message,
        response: error?.response,
        responseData: error?.response?.data,
        fullError: error
      })
      setFeedbackList([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // First call getScheduledInterviews, then getInterviewPanel
    const loadData = async () => {
      console.log('🚀 Loading scheduled interviews...')
      await fetchScheduledInterviews()
      console.log('🚀 Loading panel feedbacks...')
      await fetchPanelFeedbacks()
    }
    
    loadData()
  }, [fetchScheduledInterviews, fetchPanelFeedbacks])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleRatingChange = (rating) => {
    setFormData(prev => ({ ...prev, rating }))
  }

  const handleSubmitFeedback = async () => {
    // Debug logging
    console.log('🔍 Form submission - Current formData:', formData)
    console.log('🔍 Validation check:', {
      hasInterviewId: !!formData.interview_id,
      hasCandidateName: !!formData.candidate_name,
      hasFeedback: !!formData.feedback && formData.feedback.trim().length > 0,
      hasRating: formData.rating > 0,
      interview_id: formData.interview_id,
      candidate_name: formData.candidate_name,
      feedback: formData.feedback,
      rating: formData.rating
    })
    
    // Check if all required fields are filled
    const hasInterviewId = formData.interview_id && String(formData.interview_id).trim() !== ''
    const hasCandidateName = formData.candidate_name && formData.candidate_name.trim() !== ''
    const hasFeedback = formData.feedback && formData.feedback.trim().length > 0
    const hasRating = formData.rating > 0
    
    if (!hasInterviewId || !hasCandidateName || !hasFeedback || !hasRating) {
      const missingFields = []
      if (!hasInterviewId) missingFields.push('candidate selection')
      if (!hasCandidateName) missingFields.push('candidate name')
      if (!hasFeedback) missingFields.push('feedback')
      if (!hasRating) missingFields.push('rating')
      
      console.warn('⚠️ Validation failed. Missing fields:', missingFields)
      
      Swal.fire({
        title: "Validation Error",
        text: "Please select a candidate, provide feedback, and give a rating.",
        icon: "error",
      })
      return
    }

    try {
      setIsSubmitting(true)

      // Payload: interview_id, panelist_name (candidateName), feedback, rating
      const interviewId = parseInt(formData.interview_id)
      
      if (isNaN(interviewId) || interviewId <= 0) {
        console.error('❌ Invalid interview_id:', formData.interview_id)
        Swal.fire({
          title: "Error",
          text: "Invalid interview ID. Please select a candidate again.",
          icon: "error",
        })
        setIsSubmitting(false)
        return
      }
      
      const payload = {
        interview_id: interviewId,
        panelist_name: formData.candidate_name.trim(), // candidateName goes as panelist_name
        feedback: formData.feedback.trim(),
        rating: parseInt(formData.rating)
      }

      console.log('📤 Add Panel Feedback Payload:', payload)
      console.log('📤 Full payload details:', {
        interview_id: payload.interview_id,
        interview_id_type: typeof payload.interview_id,
        panelist_name: payload.panelist_name,
        panelist_name_type: typeof payload.panelist_name,
        feedback: payload.feedback,
        rating: payload.rating,
        rating_type: typeof payload.rating
      })
      console.log('📤 API URL:', apiService.addInterviewPanel)
      console.log('📤 Auth Token:', localStorage.getItem('authToken') ? 'Present' : 'Missing')

      const response = await postMethod({
        apiUrl: apiService.addInterviewPanel,
        payload: payload
      })

      console.log('📥 Add Panel Feedback Response:', response)
      console.log('📥 Response status:', response?.status)
      console.log('📥 Response message:', response?.message)
      console.log('📥 Full response:', JSON.stringify(response, null, 2))

      const isSuccess = response?.status === true || response?.status === 'success' || response?.success === true

      if (isSuccess) {
        Swal.fire({
          title: "Success!",
          text: "Feedback submitted successfully",
          icon: "success",
        }).then(() => {
          setFormData({ interview_id: '', candidate_name: '', rating: 0, feedback: '' })
          fetchPanelFeedbacks() // Refresh feedback list after successful submission
        })
      } else {
        // Show detailed error message
        const errorMessage = response?.message || response?.error || "Failed to submit feedback. Please try again."
        console.error('❌ API Error Response:', {
          status: response?.status,
          message: errorMessage,
          fullResponse: response
        })
        
        Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
        })
      }
    } catch (error) {
      console.error('❌ Error submitting feedback:', error)
      console.error('❌ Error details:', {
        message: error?.message,
        response: error?.response,
        responseData: error?.response?.data,
        fullError: error
      })
      
      const errorMessage = error?.response?.data?.message || 
                          error?.response?.data?.error || 
                          error?.message || 
                          "Something went wrong. Please try again."
      
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateFeedback = (id) => {
    const feedback = feedbackList.find(f => f.id === id)
    setSelectedFeedback({ ...feedback })
    setShowUpdateModal(true)
  }

  const handleProceedNextRound = (id) => {
    alert(`Candidate ID ${id} moved to next round`)
  }

  const handleSaveUpdate = async () => {
    if (!selectedFeedback) return

    try {
      setIsSubmitting(true)

      const payload = {
        id: selectedFeedback.id || selectedFeedback.originalData?.id,
        interview_id: selectedFeedback.interview_id || selectedFeedback.originalData?.interview_id,
        panelist_name: selectedFeedback.panelist || selectedFeedback.originalData?.panelist_name,
        feedback: selectedFeedback.remarks || selectedFeedback.originalData?.feedback,
        rating: selectedFeedback.rating || selectedFeedback.originalData?.rating,
        notes: selectedFeedback.decision || selectedFeedback.originalData?.notes || ''
      }

      console.log('📤 Update Panel Feedback Payload:', payload)

      const response = await putMethod({
        apiUrl: apiService.updateInterviewPanel,
        payload: payload
      })

      console.log('📥 Update Panel Feedback Response:', response)

      const isSuccess = response?.status === true || response?.status === 'success' || response?.success === true

      if (isSuccess) {
        Swal.fire({
          title: "Success!",
          text: "Feedback updated successfully",
          icon: "success",
        }).then(() => {
          setShowUpdateModal(false)
          setSelectedFeedback(null)
          fetchPanelFeedbacks() // Refresh list
        })
      } else {
        Swal.fire({
          title: "Error",
          text: response?.message || "Failed to update feedback. Please try again.",
          icon: "error",
        })
      }
    } catch (error) {
      console.error('❌ Error updating feedback:', error)
      Swal.fire({
        title: "Error",
        text: error?.message || "Something went wrong. Please try again.",
        icon: "error",
      })
    } finally {
      setIsSubmitting(false)
    }
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
              <select
                value={formData.interview_id || ''}
                onChange={(e) => {
                  const selectedInterviewId = e.target.value
                  console.log('🔍 Selected interview_id from dropdown:', selectedInterviewId)
                  console.log('🔍 Available students:', studentsList)
                  
                  // Find student by interview_id
                  const selectedStudent = studentsList.find(s => 
                    String(s.interview_id) === String(selectedInterviewId)
                  )
                  
                  if (selectedStudent) {
                    console.log('✅ Selected student found:', selectedStudent)
                    setFormData({
                      ...formData,
                      interview_id: selectedStudent.interview_id,
                      candidate_name: selectedStudent.candidate_name
                    })
                    console.log('✅ Updated formData:', {
                      interview_id: selectedStudent.interview_id,
                      candidate_name: selectedStudent.candidate_name
                    })
                  } else {
                    console.warn('⚠️ No student found for interview_id:', selectedInterviewId)
                    setFormData({
                      ...formData,
                      interview_id: '',
                      candidate_name: ''
                    })
                  }
                }}
                className={`w-full px-3 py-2 border ${TAILWIND_COLORS.BORDER} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              >
                <option value="">Choose Candidate</option>
                {studentsList
                  .filter(student => student.interview_id && student.candidate_name) // Filter out invalid entries
                  .map((student) => (
                    <option key={student.interview_id} value={String(student.interview_id)}>
                      {student.candidate_name}{student.job_title ? ` (${student.job_title})` : ''}
                    </option>
                  ))}
              </select>
            </div>

            {/* Rating */}
            <div>
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                Rate Candidate (1-5 stars)
              </label>
              {renderStars(formData.rating, true, handleRatingChange)}
            </div>

            {/* Feedback */}
            <div>
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                Feedback
              </label>
              <textarea
                placeholder="Enter detailed feedback..."
                value={formData.feedback}
                onChange={(e) => handleInputChange('feedback', e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 border ${TAILWIND_COLORS.BORDER} rounded-lg focus:ring-2 focus:ring-blue-500 resize-none`}
              />
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmitFeedback}
              variant="primary"
              size="md"
              fullWidth
              icon={<LuCheck className="w-4 h-4" />}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
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
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <p className={TAILWIND_COLORS.TEXT_MUTED}>Loading feedbacks...</p>
              </div>
            ) : feedbackList.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <p className={TAILWIND_COLORS.TEXT_MUTED}>No feedback available</p>
              </div>
            ) : (
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
                    <span className={`px-2 py-1 bg-gray-100 text-xs ${TAILWIND_COLORS.TEXT_MUTED} rounded-full`}>
                      {feedback.panelist}
                    </span>
                    <span className={`px-2 py-1 bg-gray-100 text-xs ${TAILWIND_COLORS.TEXT_MUTED} rounded-full`}>
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
            )}
          </div>
        </div>
      </div>

      {/* ✅ Update Feedback Modal */}
      {showUpdateModal && selectedFeedback && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-2">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 border-b pb-2">
              <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Update Feedback</h3>
              <button
                onClick={() => setShowUpdateModal(false)}
                className={`${TAILWIND_COLORS.TEXT_MUTED} hover:text-text-primary`}
              >
                <LuX className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="space-y-4">
              {/* Candidate */}
              <div>
                <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>
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
                <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>
                  Rating
                </label>
                {renderStars(selectedFeedback.rating, true, (r) =>
                  setSelectedFeedback({ ...selectedFeedback, rating: r })
                )}
              </div>

              {/* Remarks */}
              <div>
                <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>
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
                <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>
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
              <Button variant="secondary" onClick={() => setShowUpdateModal(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveUpdate} disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Feedback"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PanelManagement

import React, { useState, useEffect } from 'react'
import { LuX, LuPlus, LuFileText, LuUpload } from 'react-icons/lu'
import Button from '../../../../shared/components/Button'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'
import { putMethod, getMethod } from '../../../../service/api'
import apiService from '../../services/serviceUrl.js'

const EditBatchModal = ({ isOpen, onClose, batchData, onUpdate }) => {
  const [formData, setFormData] = useState({
    batchName: batchData?.name || '',
    course: batchData?.course_id || '',
    startDate: batchData?.start_date || '',
    endDate: batchData?.end_date || '',
    timeSlot: batchData?.batch_time_slot || '10:00 AM - 12:00 PM',
    instructor: batchData?.instructor_id || '',
    students: batchData?.students || [],
    newStudentEmail: '',
    uploadedFile: ''
  })

  const [courses, setCourses] = useState([])
  const [instructors, setInstructors] = useState([])
  const [loading, setLoading] = useState(false)

  // ✅ Fetch courses and instructors when modal opens
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        batchName: '',
        course: '',
        startDate: '',
        endDate: '',
        timeSlot: '10:00 AM - 12:00 PM',
        instructor: '',
        students: [],
        newStudentEmail: '',
        uploadedFile: ''
      })
    }
  }, [isOpen])
  

  const fetchCourses = async () => {
    try {
      const res = await getMethod({ apiUrl: apiService.getCourses })
      if (res.status && res.courses) {
        setCourses(res.courses)
      }
    } catch (err) {
      console.error('Error fetching courses:', err)
    }
  }

  const fetchInstructors = async () => {
    try {
      const res = await getMethod({ apiUrl: apiService.getFaculty })
      if (res.status && res.data) {
        setInstructors(res.data)
      }
    } catch (err) {
      console.error('Error fetching instructors:', err)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddStudent = () => {
    if (formData.newStudentEmail && !formData.students.includes(formData.newStudentEmail)) {
      setFormData(prev => ({
        ...prev,
        students: [...prev.students, prev.newStudentEmail],
        newStudentEmail: ''
      }))
    }
  }

  const handleRemoveStudent = (email) => {
    setFormData(prev => ({
      ...prev,
      students: prev.students.filter(student => student !== email)
    }))
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        uploadedFile: file.name
      }))
    }
  }

 // ✅ Handle Update Batch API Integration
const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)

  try {
    const payload = {
      course_id: Number(formData.course),
      name: formData.batchName.trim(),
      batch_time_slot: formData.timeSlot,
      start_date: formData.startDate,
      end_date: formData.endDate,
      instructor_id: Number(formData.instructor)
    }

    const res = await putMethod({
      apiUrl: `${apiService.updateBatch}?batch_id=${batchData?.id || batchData?.batch_id}`,
      payload
    })

    if (res.status) {
      alert('✅ Batch updated successfully!')
      
      // 🔄 Auto-refresh parent view
      onUpdate && onUpdate({
        ...batchData,
        ...payload
      })

      onClose()
    } else {
      alert(`❌ ${res.message || 'Failed to update batch.'}`)
    }
  } catch (err) {
    console.error('Update Batch Error:', err)
    alert('⚠️ Something went wrong while updating the batch.')
  } finally {
    setLoading(false)
  }
}


  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-auto my-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-gray-300 bg-gradient-to-r from-gray-50 to-white sticky top-0 z-10">
          <h2 className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Edit Batch</h2>
          <button
            onClick={onClose}
            className={`${TAILWIND_COLORS.TEXT_MUTED} hover:text-red-600 transition-all duration-200 hover:scale-110 p-1 rounded-full hover:bg-red-50`}
          >
            <LuX className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Basic Information Section */}
          <div>
            <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Basic Information</h3>
            <div className="space-y-6">
              {/* Batch Name */}
              <div>
                <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>
                  BATCH NAME
                </label>
                <input
                  type="text"
                  value={formData.batchName}
                  onChange={(e) => handleInputChange('batchName', e.target.value)}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent ${TAILWIND_COLORS.TEXT_PRIMARY}`}
                />
              </div>

              {/* Select Course */}
              <div>
                <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>
                  SELECT COURSE
                </label>
                <div className="relative">
                  <select
                    value={formData.course}
                    onChange={(e) => handleInputChange('course', e.target.value)}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none pr-8 ${TAILWIND_COLORS.TEXT_PRIMARY}`}
                  >
                    <option value="">Select course</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time Slot */}
              <div>
                <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>
                  BATCH TIME SLOT
                </label>
                <select
                  value={formData.timeSlot}
                  onChange={(e) => handleInputChange('timeSlot', e.target.value)}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent ${TAILWIND_COLORS.TEXT_PRIMARY}`}
                >
                  <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                  <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                  <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                  <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                  <option value="03:00 PM - 05:00 PM">03:00 PM - 05:00 PM</option>
                  <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                  <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM</option>
                  <option value="07:00 PM - 09:00 PM">07:00 PM - 09:00 PM</option>
                </select>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                    START DATE
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                    END DATE
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Instructor Assignment Section */}
          <div>
            <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Instructor Assignment</h3>
            <div className="relative">
              <select
                value={formData.instructor}
                onChange={(e) => handleInputChange('instructor', e.target.value)}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none pr-8 ${TAILWIND_COLORS.TEXT_PRIMARY}`}
              >
                <option value="">Select Instructor</option>
                {instructors.map((inst) => (
                  <option key={inst.id} value={inst.id}>{inst.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <Button
              type="button"
              onClick={onClose}
              variant="light"
              size="md"
              className={TAILWIND_COLORS.BTN_LIGHT}
            >
              Cancel
            </Button>
            <Button type="submit" variant="secondary" size="md" disabled={loading}>
              {loading ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditBatchModal

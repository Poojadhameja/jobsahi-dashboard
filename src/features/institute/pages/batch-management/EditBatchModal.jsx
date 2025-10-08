import React, { useState } from 'react'
import { LuX, LuPlus, LuCalendar, LuFileText, LuUpload } from 'react-icons/lu'
import Button from '../../../../shared/components/Button'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'

const EditBatchModal = ({ isOpen, onClose, batchData, onUpdate }) => {
  const [formData, setFormData] = useState({
    batchName: batchData?.name || 'Full Stack Web Development A',
    course: batchData?.course || 'Full Stack Web Development',
    startDate: batchData?.startDate || '25/12/2024',
    endDate: batchData?.endDate || '1/10/2025',
    timeSlot: batchData?.timeSlot || '10:00 AM - 12:00 PM',
    instructor: batchData?.instructor || 'Mr. Rajeev Kumar - Web developer',
    students: batchData?.students || ['himanshushrirang@gmail.com'],
    newStudentEmail: 'himanshushrirang4@gmail.com',
    uploadedFile: 'himanshushrirang_cv.csv'
  })


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

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdate(formData)
    onClose()
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
                <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>Edit the name of the batch (course or job role).</p>
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
                <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>Edit or select the associated course for this batch.</p>
                <div className="relative">
                  <select
                    value={formData.course}
                    onChange={(e) => handleInputChange('course', e.target.value)}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none pr-8 ${TAILWIND_COLORS.TEXT_PRIMARY}`}
                  >
                    <option value="Full Stack Web Development">Full Stack Web Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Mobile Development">Mobile Development</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className={`w-4 h-4 ${TAILWIND_COLORS.TEXT_MUTED}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Time Slot */}
              <div>
                <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>
                  BATCH TIME SLOT
                </label>
                <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>Set the daily time slot for this batch.</p>
                <div className="relative">
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => handleInputChange('timeSlot', e.target.value)}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none pr-8 ${TAILWIND_COLORS.TEXT_PRIMARY}`}
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
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className={`w-4 h-4 ${TAILWIND_COLORS.TEXT_MUTED}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Date Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Starting Date */}
                <div>
                  <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                    STARTING DATE
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* End Date */}
                <div>
                  <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                    END DATE
                  </label>
                  <div className="relative">
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
          </div>

          {/* Instructor Assignment Section */}
          <div>
            <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Instructor Assignment</h3>
            <div>
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>
                ASSIGN INSTRUCTOR
              </label>
              <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>Change or update the assigned instructor.</p>
              <div className="relative">
                <select
                  value={formData.instructor}
                  onChange={(e) => handleInputChange('instructor', e.target.value)}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none pr-8 ${TAILWIND_COLORS.TEXT_PRIMARY}`}
                >
                  <option value="Mr. Rajeev Kumar - Web developer">Mr. Rajeev Kumar - Web developer</option>
                  <option value="Ms. Priya Sharma - Full Stack Developer">Ms. Priya Sharma - Full Stack Developer</option>
                  <option value="Dr. Amit Singh - Data Scientist">Dr. Amit Singh - Data Scientist</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className={`w-4 h-4 ${TAILWIND_COLORS.TEXT_MUTED}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Manage Students Section */}
          <div>
            <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Manage Students</h3>
            <div className="space-y-4">
              {/* Add Student Input */}
              <div className="flex gap-2">
                <input
                  type="email"
                  value={formData.newStudentEmail}
                  onChange={(e) => handleInputChange('newStudentEmail', e.target.value)}
                  placeholder="Enter student email"
                  className={`flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent ${TAILWIND_COLORS.TEXT_PRIMARY}`}
                />
                <Button
                  type="button"
                  onClick={handleAddStudent}
                  variant="secondary"
                  size="sm"
                  icon={<LuPlus className="w-4 h-4" />}
                  className="w-10 h-10 p-0 rounded-full"
                />
              </div>

              {/* Enrolled Students */}
              <div>
                <p className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                  ENROLLED STUDENTS ({formData.students.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {formData.students.map((email, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 bg-gray-100 ${TAILWIND_COLORS.TEXT_PRIMARY} px-3 py-1 rounded-full text-sm`}
                    >
                      <span>{email}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveStudent(email)}
                        className={`${TAILWIND_COLORS.TEXT_MUTED} hover:text-gray-700`}
                      >
                        <LuX className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* File Upload */}
              <div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <LuFileText className={`w-8 h-8 ${TAILWIND_COLORS.TEXT_MUTED} mx-auto mb-2`} />
                  <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>{formData.uploadedFile}</p>
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleFileUpload}
                    accept=".csv"
                    className="hidden"
                  />
                  <Button
                    as="label"
                    htmlFor="file-upload"
                    variant="secondary"
                    size="sm"
                    icon={<LuUpload className="w-4 h-4" />}
                    className="cursor-pointer"
                  >
                    Update File
                  </Button>
                </div>
              </div>
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
            <Button
              type="submit"
              variant="secondary"
              size="md"
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditBatchModal

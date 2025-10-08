import React, { useState } from 'react'
import { LuX, LuPlus, LuUpload, LuCalendar, LuUser, LuSearch, LuFileImage } from 'react-icons/lu'
import Button from '../../../../shared/components/Button'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'

const CreateBatchModal = ({ isOpen, onClose, courseId, courseTitle }) => {
  const [formData, setFormData] = useState({
    batchName: '',
    course: courseTitle || 'Full Stack Web Development (6 months)',
    startDate: '',
    endDate: '',
    timeSlot: '10:00 AM - 12:00 PM',
    instructor: '',
    students: []
  })

  const [searchStudent, setSearchStudent] = useState('')
  const [csvFile, setCsvFile] = useState(null)
  const [dragActiveCsv, setDragActiveCsv] = useState(false)

  // Sample instructors data
  const instructors = [
    'Rajendra Prashad', 
    'Priya Sharma',
    'Nitin Soni',
    'Neha Rajput',
    'Amit Kumar',
    'Sneha Gupta'
  ]

  // Sample students data
  const availableStudents = [
    'himanshushrirang@gmail.com',
    'student1@example.com',
    'student2@example.com',
    'student3@example.com',
    'student4@example.com',
    'student5@example.com'
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddStudent = () => {
    if (searchStudent && !formData.students.includes(searchStudent)) {
      setFormData(prev => ({
        ...prev,
        students: [...prev.students, searchStudent]
      }))
      setSearchStudent('')
    }
  }

  const handleRemoveStudent = (studentToRemove) => {
    setFormData(prev => ({
      ...prev,
      students: prev.students.filter(student => student !== studentToRemove)
    }))
  }

  const handleCsvUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setCsvFile(file)
      // In a real app, you would parse the CSV and add students
      console.log('CSV file uploaded:', file.name)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActiveCsv(true)
    } else if (e.type === 'dragleave') {
      setDragActiveCsv(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActiveCsv(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setCsvFile(e.dataTransfer.files[0])
    }
  }

  const removeCsvFile = () => {
    setCsvFile(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Creating batch with data:', formData)
    // Handle form submission here
    onClose()
  }

  const handleCancel = () => {
    setFormData({
      batchName: '',
      course: courseTitle || 'Full Stack Web Development (6 months)',
      startDate: '',
      endDate: '',
      timeSlot: '10:00 AM - 12:00 PM',
      instructor: '',
      students: []
    })
    setSearchStudent('')
    setCsvFile(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Create New Batch</h2>
          <button
            onClick={handleCancel}
            className={`${TAILWIND_COLORS.TEXT_MUTED} hover:text-text-primary transition-colors`}
          >
            <LuX className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          {/* Scrollable Content */}
          <div className="p-6 space-y-8 overflow-y-auto flex-1">
          {/* Basic Information Section */}
          <div>
            <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Batch Name */}
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                  BATCH NAME
                </label>
                <input
                  type="text"
                  value={formData.batchName}
                  onChange={(e) => handleInputChange('batchName', e.target.value)}
                  placeholder="e.g., Assistant Electrician, Web Developer"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Select Course */}
              <div>
                <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                  SELECT COURSE
                </label>
                <select
                  value={formData.course}
                  onChange={(e) => handleInputChange('course', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="Full Stack Web Development (6 months)">Full Stack Web Development (6 months)</option>
                  <option value="Fundamentals of Electricity">Fundamentals of Electricity</option>
                  <option value="Wiring & Circuit Installation">Wiring & Circuit Installation</option>
                  <option value="Transformer Installation">Transformer Installation</option>
                  <option value="Power Distribution Systems">Power Distribution Systems</option>
                  <option value="Motor Winding Techniques">Motor Winding Techniques</option>
                  <option value="House & Industrial Wiring">House & Industrial Wiring</option>
                </select>
              </div>

              {/* Time Slot */}
              <div>
                <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                  BATCH TIME SLOT
                </label>
                <select
                  value={formData.timeSlot}
                  onChange={(e) => handleInputChange('timeSlot', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
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

          {/* Instructor Assignment Section */}
          <div>
            <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Instructor Assignment</h3>
            <div>
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                ASSIGN INSTRUCTOR
              </label>
              <div className="relative">
                <select
                  value={formData.instructor}
                  onChange={(e) => handleInputChange('instructor', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select instructor name</option>
                  {instructors.map((instructor, index) => (
                    <option key={index} value={instructor}>{instructor}</option>
                  ))}
                </select>
                <LuUser className={`absolute right-3 top-2.5 w-5 h-5 ${TAILWIND_COLORS.TEXT_MUTED} pointer-events-none`} />
              </div>
            </div>
          </div>

          {/* Manage Students Section */}
          <div>
            <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Manage Students</h3>
            
            {/* Search/Add Student */}
            <div className="flex gap-2 mb-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchStudent}
                  onChange={(e) => setSearchStudent(e.target.value)}
                  placeholder="Search or select student name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <LuSearch className={`absolute right-3 top-2.5 w-5 h-5 ${TAILWIND_COLORS.TEXT_MUTED} pointer-events-none`} />
              </div>
              <Button
                type="button"
                onClick={handleAddStudent}
                variant="primary"
                size="sm"
                icon={<LuPlus className="w-4 h-4" />}
              >
                Add
              </Button>
            </div>

            {/* Enrolled Students */}
            {formData.students.length > 0 && (
              <div className="mb-4">
                <h4 className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                  ENROLLED STUDENTS ({formData.students.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {formData.students.map((student, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 ${TAILWIND_COLORS.BADGE_SUCCESS} px-3 py-1 rounded-full text-sm`}
                    >
                      <span className={TAILWIND_COLORS.TEXT_PRIMARY}>{student}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveStudent(student)}
                        className="text-success hover:text-success transition-opacity hover:opacity-80"
                      >
                        <LuX className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CSV Upload */}
            <div 
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
                dragActiveCsv ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {csvFile ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-center">
                    <LuFileImage className="w-10 h-10 text-green-600" />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                      {csvFile.name}
                    </p>
                    <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED}`}>
                      {(csvFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={removeCsvFile}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <LuX className="w-5 h-5 mx-auto" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <LuUpload className={`w-8 h-8 ${TAILWIND_COLORS.TEXT_MUTED} mx-auto`} />
                  <p className={`${TAILWIND_COLORS.TEXT_MUTED}`}>
                    Drag and drop or click to upload CSV file with student details
                  </p>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleCsvUpload}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label
                    htmlFor="csv-upload"
                    className={`inline-block bg-gray-100 hover:bg-gray-200 ${TAILWIND_COLORS.TEXT_MUTED} px-4 py-2 rounded text-sm transition-colors duration-200 cursor-pointer`}
                  >
                    Choose File
                  </label>
                </div>
              )}
            </div>
          </div>
          </div>

          {/* Action Buttons - Fixed */}
          <div className="flex justify-end gap-3 p-6 border-t border-gray-200 flex-shrink-0">
            <Button
              type="button"
              onClick={handleCancel}
              variant="outline"
              size="md"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateBatchModal

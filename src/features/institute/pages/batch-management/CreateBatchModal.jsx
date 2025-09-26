import React, { useState } from 'react'
import { LuX, LuPlus, LuUpload, LuCalendar, LuUser, LuSearch } from 'react-icons/lu'
import Button from '../../../../shared/components/Button'
import RichTextEditor from '../../../../shared/components/RichTextEditor'

const CreateBatchModal = ({ isOpen, onClose, courseId, courseTitle }) => {
  const [formData, setFormData] = useState({
    batchName: '',
    course: courseTitle || 'Full Stack Web Development (6 months)',
    startDate: '',
    endDate: '',
    description: '',
    instructor: '',
    students: []
  })

  const [searchStudent, setSearchStudent] = useState('')
  const [csvFile, setCsvFile] = useState(null)

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
      description: '',
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
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Create New Batch</h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <LuX className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Basic Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Batch Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
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

              {/* Starting Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  <LuCalendar className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  <LuCalendar className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  DESCRIPTION
                </label>
                <RichTextEditor
                  value={formData.description}
                  onChange={(value) => handleInputChange('description', value)}
                  placeholder="e.g., This course covers essential topics in frontend and backend development using modern tools and frameworks."
                  height="120px"
                />
              </div>
            </div>
          </div>

          {/* Instructor Assignment Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Instructor Assignment</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                <LuUser className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Manage Students Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Manage Students</h3>
            
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
                <LuSearch className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              <Button
                type="button"
                onClick={handleAddStudent}
                variant="primary"
                size="sm"
                icon={<LuPlus className="w-4 h-4" />}
                className="bg-green-600 hover:bg-green-700 px-4"
              >
                Add
              </Button>
            </div>

            {/* Enrolled Students */}
            {formData.students.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  ENROLLED STUDENTS ({formData.students.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {formData.students.map((student, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm"
                    >
                      <span>{student}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveStudent(student)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <LuX className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CSV Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <LuUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 mb-2">Or upload a CSV file with student details</p>
              <input
                type="file"
                accept=".csv"
                onChange={handleCsvUpload}
                className="hidden"
                id="csv-upload"
              />
              <label
                htmlFor="csv-upload"
                className="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 cursor-pointer transition-colors"
              >
                Choose File
              </label>
              {csvFile && (
                <p className="text-sm text-green-600 mt-2">Selected: {csvFile.name}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <Button
              type="button"
              onClick={handleCancel}
              variant="outline"
              size="md"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="bg-green-600 hover:bg-green-700"
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

import React, { useState } from 'react'
import { 
  LuFileText, 
  LuCalendar, 
  LuUser, 
  LuPhone, 
  LuMail, 
  LuDownload,
  LuGraduationCap,
  LuAward,
  LuSettings
} from 'react-icons/lu'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'

function CertificateGeneration() {
  const [selectedCourse, setSelectedCourse] = useState('')
  const [selectedBatch, setSelectedBatch] = useState('')
  const [completionDate, setCompletionDate] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCertificates, setGeneratedCertificates] = useState([])

  const courses = [
    { id: '1', name: 'Power Technician' },
    { id: '2', name: 'Electrical Engineering' },
    { id: '3', name: 'Mechanical Engineering' }
  ]

  const batches = [
    { id: '1', name: 'Batch A - 2024' },
    { id: '2', name: 'Batch B - 2024' },
    { id: '3', name: 'Batch C - 2024' }
  ]

  const students = [
    {
      id: 1,
      name: 'Himanshu Shrirang',
      enrollmentId: 'ENR001734863',
      phone: '+91234567823',
      email: 'himanshushrirang4@gmail.com'
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      enrollmentId: 'ENR001734864',
      phone: '+91234567824',
      email: 'rajeshkumar@gmail.com'
    },
    {
      id: 3,
      name: 'Priya Sharma',
      enrollmentId: 'ENR001734865',
      phone: '+91234567825',
      email: 'priyasharma@gmail.com'
    },
    {
      id: 4,
      name: 'Amit Singh',
      enrollmentId: 'ENR001734866',
      phone: '+91234567826',
      email: 'amitsingh@gmail.com'
    }
  ]

  const handleGenerateCertificate = async () => {
    // Validate required fields
    if (!selectedCourse || !selectedBatch || !completionDate) {
      alert('Please fill in all required fields (Course, Batch, and Completion Date)')
      return
    }

    setIsGenerating(true)
    
    try {
      // Simulate API call for certificate generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate certificates for all students in the batch
      const newCertificates = students.map(student => ({
        id: Date.now() + Math.random(),
        studentId: student.id,
        studentName: student.name,
        enrollmentId: student.enrollmentId,
        course: courses.find(c => c.id === selectedCourse)?.name || '',
        batch: batches.find(b => b.id === selectedBatch)?.name || '',
        completionDate: completionDate,
        generatedAt: new Date().toISOString(),
        status: 'generated'
      }))
      
      setGeneratedCertificates(prev => [...prev, ...newCertificates])
      
      // Show success message
      alert(`Successfully generated ${newCertificates.length} certificates!`)
      
      // Reset form
      setSelectedCourse('')
      setSelectedBatch('')
      setCompletionDate('')
      
    } catch (error) {
      console.error('Error generating certificates:', error)
      alert('Failed to generate certificates. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownloadCertificate = (certificateId) => {
    // Simulate certificate download
    alert(`Downloading certificate ${certificateId}...`)
    // In a real application, this would trigger a PDF download
  }

  return (
    <div className="space-y-6">
      {/* Certificate Generation Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>Certificate Generation</h3>
          <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Preview of the generated certificate</p>
        </div>

        {/* Basic Information */}
        <div className="mb-8">
          <h4 className={`text-md font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Basic Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Course Selection */}
            <div>
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                SELECT COURSE
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Choose a course</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Batch Selection */}
            <div>
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                SELECT BATCH
              </label>
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Choose a batch</option>
                {batches.map(batch => (
                  <option key={batch.id} value={batch.id}>
                    {batch.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Completion Date */}
            <div>
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                COMPLETION DATE
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={completionDate}
                  onChange={(e) => setCompletionDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Students in Batch */}
        <div className="mb-6">
          <h4 className={`text-md font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Student in Batch</h4>
          <div className="space-y-3">
            {students.map(student => (
              <div key={student.id} className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                  <LuUser className={`h-6 w-6 ${TAILWIND_COLORS.TEXT_MUTED}`} />
                </div>
                <div className="flex-1">
                  <h5 className={`font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{student.name}</h5>
                  <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Enrollment ID: {student.enrollmentId}</p>
                </div>
                <div className={`flex items-center space-x-4 text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
                  <div className="flex items-center">
                    <LuPhone className="h-4 w-4 mr-1" />
                    {student.phone}
                  </div>
                  <div className="flex items-center">
                    <LuMail className="h-4 w-4 mr-1" />
                    {student.email}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Certificate Button */}
        <div className="flex justify-center">
          <button 
            onClick={handleGenerateCertificate}
            disabled={isGenerating}
            className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors duration-200 ${
              isGenerating 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700'
            } text-white`}
          >
            <LuFileText className="h-5 w-5" />
            <span>{isGenerating ? 'Generating...' : 'Generate Certificate'}</span>
          </button>
        </div>
      </div>

      {/* Certificate Preview Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>Certificate Preview</h3>
          <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Preview of the generated certificate</p>
        </div>

        {/* Certificate Design */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <LuAward className="h-6 w-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-gray-400 rounded-lg flex items-center justify-center">
              <LuGraduationCap className="h-6 w-6 text-white" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className={`text-3xl font-bold italic ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>
              Certificate of Completion
            </h1>
            <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} max-w-2xl mx-auto leading-relaxed`}>
              Upon successful completion of the course, participants will receive a Certificate of Completion, 
              recognizing their achievement and confirming that they have acquired the essential skills and 
              knowledge outlined in the curriculum.
            </p>
          </div>

          <div className="text-center mb-8">
            <h2 className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
              Himanshu Shrirang
            </h2>
            <p className={`text-lg ${TAILWIND_COLORS.TEXT_PRIMARY} uppercase tracking-wide`}>
              POWER TECHNICIAN
            </p>
          </div>

          <div className="flex justify-between items-end">
            <div className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
              Date: 8/3/2025
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="flex justify-center mt-6">
          <button 
            onClick={() => handleDownloadCertificate('preview-certificate')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors duration-200"
          >
            <LuDownload className="h-5 w-5" />
            <span>Direct Download</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CertificateGeneration

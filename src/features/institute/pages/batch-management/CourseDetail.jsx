import React, { useState, useEffect } from 'react'
import { LuArrowLeft, LuEye, LuPencil } from 'react-icons/lu'
import Button from '../../../../shared/components/Button'
import { MatrixCard } from '../../../../shared/components/metricCard'
import CentralizedDataTable from '../../../../shared/components/CentralizedDataTable'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'
import BatchDetail from './BatchDetail'
import EditBatchModal from './EditBatchModal'
import { getMethod } from '../../../../service/api'
import apiService from '../../services/serviceUrl.js'

export default function CourseDetail({ courseData, onBack, onViewBatch }) {
  const [currentView, setCurrentView] = useState('course')
  const [selectedBatch, setSelectedBatch] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedBatchForEdit, setSelectedBatchForEdit] = useState(null)
  const [liveCourse, setLiveCourse] = useState(courseData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // ✅ Fetch course details dynamically (with batches via get_batch API)
const fetchCourseDetail = async () => {
  try {
    setLoading(true)
    setError(null)

    // 1️⃣ Fetch course + faculty + batch data from unified API
    const response = await getMethod({
      apiUrl: apiService.courseByBatch,
      params: { course_id: courseData?.id },
    })

    if (response.status && response.course) {
      const updatedCourse = {
        ...courseData,
        id: response.course.course_id,
        title: response.course.course_title,
        description: response.course.description,
        duration: response.course.duration,
        instructor: response.course.instructor_name,
        fee: response.course.fee || '15000',
        admin_action: response.course.admin_action,
        batches: response.batches || [],
      }

      setLiveCourse(updatedCourse)
    } else {
      setError('Course not found')
    }
  } catch (err) {
    console.error('Error fetching course details:', err)
    setError('Failed to load course details')
  } finally {
    setLoading(false)
  }
}


  useEffect(() => {
    fetchCourseDetail()
  }, [courseData?.id])

  if (loading) {
    return <div className="p-4 text-center text-gray-500">Loading course details...</div>
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>
  }

  if (!liveCourse) {
    return (
      <div className={`p-2 ${TAILWIND_COLORS.BG_PRIMARY} min-h-screen`}>
        <div className={`text-center ${TAILWIND_COLORS.TEXT_MUTED}`}>No course data available</div>
      </div>
    )
  }

  const handleViewBatch = (courseId, batch) => {
    setSelectedBatch({
      batch,
      courseTitle: liveCourse.title,
      courseId,
      batchId: batch.batch_id,
    })
    setCurrentView('batch')
  }
  

  const handleBackFromBatch = () => {
    setCurrentView('course')
    setSelectedBatch(null)
  }

  const handleOpenEditModal = (batch) => {
    setSelectedBatchForEdit(batch)
    setIsEditModalOpen(true)
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setSelectedBatchForEdit(null)
  }

  const handleUpdateBatch = (updatedData) => {
    console.log('Updated batch data:', updatedData)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return `${TAILWIND_COLORS.BADGE_SUCCESS}`
      case 'Upcoming':
        return `${TAILWIND_COLORS.BADGE_INFO}`
      default:
        return `${TAILWIND_COLORS.BADGE_WARN}`
    }
  }

  const batchColumns = [
    { key: 'batchName', header: 'Batch Name' },
    { key: 'schedule', header: 'Time Schedule' },
    { key: 'totalStudents', header: 'Total Students' },
    { key: 'enrolledStudents', header: 'Enrolled Students' },
    {
      key: 'status',
      header: 'Status',
      render: (status) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
          {status}
        </span>
      ),
    },
  ]

  const batchActions = [
    {
  label: 'View',
  icon: <LuEye className="w-4 h-4" />,
  onClick: (batch) => handleViewBatch(liveCourse.id, batch),
  variant: 'outline',
  size: 'sm',
},

    {
      label: 'Edit',
      icon: <LuPencil className="w-4 h-4" />,
      onClick: (batch) => handleOpenEditModal(batch),
      variant: 'outline',
      size: 'sm',
    },
  ]

  // ✅ Build batch table rows from live API
const batchData =
liveCourse.batches?.map((batch, index) => ({
  id: batch.batch_id || index,
  batchName: batch.batch_name || `Batch ${String.fromCharCode(65 + index)}`,
  schedule: batch.batch_time_slot || '9:00 AM - 12:00 PM',
  totalStudents: 30, // static or from backend in future
  enrolledStudents: batch.enrolled_students || (batch.students?.length ?? 0),
  status: batch.status || batch.admin_action || 'Active',
  ...batch,
})) || []


  if (currentView === 'batch' && selectedBatch) {
    return <BatchDetail batchData={selectedBatch} onBack={handleBackFromBatch} />
  }

  return (
    <div className={`p-2 ${TAILWIND_COLORS.BG_PRIMARY} min-h-screen`}>
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
            onClick={onBack}
            variant="outline"
            size="sm"
            icon={<LuArrowLeft className="w-4 h-4" />}
            className={`border-gray-300 ${TAILWIND_COLORS.TEXT_MUTED} hover:bg-gray-50`}
          >
            Back
          </Button>
        </div>
        <MatrixCard title={liveCourse.title} subtitle={liveCourse.description} className="mb-4" />
      </div>

      {/* Course Information & Details */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Course Information & Details</h2>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
              liveCourse.admin_action === 'approved'
                ? TAILWIND_COLORS.BADGE_SUCCESS
                : TAILWIND_COLORS.BADGE_WARN
            }`}
          >
            {liveCourse.admin_action === 'approved' ? 'Active' : 'Pending'}
          </span>
        </div>

        {/* Course Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h4 className={`text-sm font-semibold ${TAILWIND_COLORS.TEXT_MUTED}`}>Course Title</h4>
            <p className={`text-lg font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{liveCourse.title}</p>
          </div>
          <div>
            <h4 className={`text-sm font-semibold ${TAILWIND_COLORS.TEXT_MUTED}`}>Instructor</h4>
            <p className={TAILWIND_COLORS.TEXT_PRIMARY}>{liveCourse.instructor || 'Rajeev Kumar'}</p>
          </div>
          <div>
            <h4 className={`text-sm font-semibold ${TAILWIND_COLORS.TEXT_MUTED}`}>Total Batches</h4>
            <p className={TAILWIND_COLORS.TEXT_PRIMARY}>{liveCourse.totalBatches || batchData.length}</p>
          </div>
          <div>
            <h4 className={`text-sm font-semibold ${TAILWIND_COLORS.TEXT_MUTED}`}>Active Batches</h4>
            <p className={TAILWIND_COLORS.TEXT_PRIMARY}>
              {batchData.filter((b) => b.status === 'Active').length}
            </p>
          </div>
          <div>
            <h4 className={`text-sm font-semibold ${TAILWIND_COLORS.TEXT_MUTED}`}>Course Fee</h4>
            <p className="text-1xl font-medium text-success">₹{liveCourse.fee}</p>
          </div>
        </div>

        {/* Course Duration + Other Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
          <div>
            <h4 className={`text-sm font-semibold ${TAILWIND_COLORS.TEXT_MUTED}`}>Course Duration</h4>
            <p className={TAILWIND_COLORS.TEXT_PRIMARY}>{liveCourse.duration}</p>
          </div>
          <div>
            <h4 className={`text-sm font-semibold ${TAILWIND_COLORS.TEXT_MUTED}`}>Certification</h4>
            <p className={TAILWIND_COLORS.TEXT_PRIMARY}>Industry recognized certificate</p>
          </div>
          <div>
            <h4 className={`text-sm font-semibold ${TAILWIND_COLORS.TEXT_MUTED}`}>Language</h4>
            <p className={TAILWIND_COLORS.TEXT_PRIMARY}>English</p>
          </div>
        </div>

        {/* Description */}
        <div className="pt-6">
          <h3 className={`text-lg font-semibold mb-4 ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Course Description</h3>
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className={`text-md font-semibold mb-3 ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Overview</h4>
            <p className={`${TAILWIND_COLORS.TEXT_PRIMARY} leading-relaxed`}>
              {liveCourse.description ||
                'Comprehensive electrical wiring training covering all aspects of electrical systems, safety protocols, and practical applications in residential and commercial settings.'}
            </p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-700">{liveCourse.totalBatches || 5}</div>
            <div className="text-sm text-gray-500">Total Batches</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-700">
              {batchData.filter((b) => b.status === 'Active').length}
            </div>
            <div className="text-sm text-gray-500">Active Batches</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {batchData.reduce((t, b) => t + b.enrolledStudents, 0)}
            </div>
            <div className="text-sm text-gray-500">Enrolled Students</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">
              {batchData.reduce((t, b) => t + b.totalStudents, 0)}
            </div>
            <div className="text-sm text-gray-500">Max Capacity</div>
          </div>
        </div>
      </div>

      {/* Batches Table */}
      <div className="mb-6">
        <CentralizedDataTable
          title="Course Batches"
          subtitle={`Manage and view all batches for ${liveCourse.title}`}
          data={batchData}
          columns={batchColumns}
          actions={batchActions}
          searchable
          selectable={false}
          showAutoScrollToggle={false}
          searchPlaceholder="Search batches..."
          emptyStateMessage="No batches found for this course"
        />
      </div>

      {/* Available Courses (Preserved Section) */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className={`text-xl font-bold mb-4 ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Available Courses</h2>
        <p className={`text-sm mb-6 ${TAILWIND_COLORS.TEXT_MUTED}`}>
          Other courses available in our institute
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Advanced Electrical Systems */}
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                Available
              </span>
            </div>
            <h3 className={`font-semibold mb-2 ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
              Advanced Electrical Systems
            </h3>
            <p className={`text-sm mb-4 ${TAILWIND_COLORS.TEXT_MUTED} leading-relaxed`}>
              Advanced course covering complex electrical systems and industrial applications
            </p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-blue-600">₹25,000</span>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Details →
              </button>
            </div>
          </div>

          {/* Solar Panel Installation */}
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-green-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                Available
              </span>
            </div>
            <h3 className={`font-semibold mb-2 ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
              Solar Panel Installation
            </h3>
            <p className={`text-sm mb-4 ${TAILWIND_COLORS.TEXT_MUTED} leading-relaxed`}>
              Complete solar panel installation, maintenance, and troubleshooting
            </p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-green-600">₹20,000</span>
              <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                View Details →
              </button>
            </div>
          </div>

          {/* Industrial Automation */}
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-orange-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full">
                Coming Soon
              </span>
            </div>
            <h3 className={`font-semibold mb-2 ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
              Industrial Automation
            </h3>
            <p className={`text-sm mb-4 ${TAILWIND_COLORS.TEXT_MUTED} leading-relaxed`}>
              PLC programming, HMI design, and industrial automation systems
            </p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-orange-600">₹30,000</span>
              <button className="text-orange-600 hover:text-orange-800 text-sm font-medium">
                Notify Me →
              </button>
            </div>
          </div>
        </div>
      </div>

      <EditBatchModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        batchData={selectedBatchForEdit}
        onUpdate={handleUpdateBatch}
      />
    </div>
  )
}

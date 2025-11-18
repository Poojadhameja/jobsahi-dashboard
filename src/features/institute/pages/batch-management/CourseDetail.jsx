import React, { useState, useEffect } from 'react'
import { LuArrowLeft, LuEye, LuPencil, LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import Button from '../../../../shared/components/Button'
import { MatrixCard } from '../../../../shared/components/metricCard'
import CentralizedDataTable from '../../../../shared/components/CentralizedDataTable'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'
import BatchDetail from './BatchDetail'
import EditBatchModal from './EditBatchModal'
import ViewCoursePopup from '../course-management/ViewCoursePopup'
import { getMethod } from '../../../../service/api'
import apiService from '../../services/serviceUrl.js'

export default function CourseDetail({ courseData, onBack }) {
  const [currentView, setCurrentView] = useState('course')
  const [selectedBatch, setSelectedBatch] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedBatchForEdit, setSelectedBatchForEdit] = useState(null)
  const [liveCourse, setLiveCourse] = useState(courseData || null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isCoursePopupOpen, setIsCoursePopupOpen] = useState(false)
  const [selectedCourseForView, setSelectedCourseForView] = useState(null)
  const [availableCourses, setAvailableCourses] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3

  // ✅ Fetch course details from /institute/course_by_batch.php?id={courseId}
  const fetchCourseDetail = async () => {
    try {
      setLoading(true)
      setError(null)

      const courseId = courseData?.id || courseData?.course_id
      if (!courseId) {
        setError('Invalid course')
        setLoading(false)
        return
      }

      const response = await getMethod({
        apiUrl: `${apiService.courseByBatch}?id=${courseId}`,
      })

      if (response?.status && response?.course) {
        const apiCourse = response.course
        const batches = Array.isArray(response.batches) ? response.batches : []

        const activeBatches =
          typeof response.active_batches === 'number'
            ? response.active_batches
            : batches.filter((b) => {
                const s = (b.status || b.admin_action || '').toLowerCase()
                return s === 'approved' || s === 'active'
              }).length

        const feeFromApi =
          apiCourse.fee !== null && apiCourse.fee !== undefined
            ? parseFloat(apiCourse.fee)
            : undefined

        const updatedCourse = {
          ...courseData,
          id: apiCourse.course_id || courseId,
          title: apiCourse.course_title || courseData?.title || '',
          description: apiCourse.description || courseData?.description || '',
          duration: apiCourse.duration || courseData?.duration || '',
          instructor: apiCourse.instructor_name || courseData?.instructor || '',
          fee: feeFromApi ?? courseData?.fee ?? 0,
          // admin_action is enforced in SQL (approved), so default if not present
          admin_action: apiCourse.admin_action || courseData?.admin_action || 'approved',
          batches,
          totalBatches: batches.length,
          activeBatches,
        }

        setLiveCourse(updatedCourse)
      } else {
        setError(response?.message || 'Course not found')
      }
    } catch (err) {
      console.error('Error fetching course details:', err)
      setError('Failed to load course details')
    } finally {
      setLoading(false)
    }
  }

  // ✅ Fetch other available courses (for "Available Courses" section)
  const fetchAvailableCourses = async () => {
    try {
      const res = await getMethod({ apiUrl: apiService.getCourses })
      if (res?.status && Array.isArray(res.courses)) {
        setAvailableCourses(res.courses)
      }
    } catch (err) {
      console.error('Error fetching available courses:', err)
    }
  }

  useEffect(() => {
    fetchCourseDetail()
    fetchAvailableCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseData?.id, courseData?.course_id])

  // Reset to page 1 when available courses change
  useEffect(() => {
    setCurrentPage(1)
  }, [availableCourses.length])

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
    // Optionally refetch here
  }

  const handleOpenCoursePopup = (course) => {
    setSelectedCourseForView(course)
    setIsCoursePopupOpen(true)
  }

  const handleCloseCoursePopup = () => {
    setIsCoursePopupOpen(false)
    setSelectedCourseForView(null)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
      case 'Approved':
        return `${TAILWIND_COLORS.BADGE_SUCCESS}`
      case 'Upcoming':
        return `${TAILWIND_COLORS.BADGE_INFO}`
      default:
        return `${TAILWIND_COLORS.BADGE_WARN}`
    }
  }

  // ✅ Map batches as per API structure (no UI change)
  const batchData =
    liveCourse.batches?.map((batch, index) => ({
      id: batch.batch_id || index,
      batchName: batch.batch_name || `Batch ${String.fromCharCode(65 + index)}`,
      schedule: batch.batch_time_slot || '9:00 AM - 12:00 PM',
      totalStudents: 30, // static / placeholder
      enrolledStudents:
        typeof batch.enrolled_students === 'number'
          ? batch.enrolled_students
          : batch.students?.length || 0,
      status: batch.status || batch.admin_action || 'Active',
      ...batch,
    })) || []

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

  if (currentView === 'batch' && selectedBatch) {
    return <BatchDetail batchData={selectedBatch} onBack={handleBackFromBatch} />
  }

  // 🔻 UI BELOW IS UNCHANGED 🔻
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
        <MatrixCard
          title={liveCourse.title}
          subtitle={liveCourse.description}
          className="mb-4"
        />
      </div>

      {/* Course Information & Details */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
            Course Information & Details
          </h2>
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
            <h4 className={`text-sm font-semibold ${TAILWIND_COLORS.TEXT_MUTED}`}>
              Course Title
            </h4>
            <p className={`text-lg font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
              {liveCourse.title}
            </p>
          </div>
          <div>
            <h4 className={`text-sm font-semibold ${TAILWIND_COLORS.TEXT_MUTED}`}>
              Instructor
            </h4>
            <p className={TAILWIND_COLORS.TEXT_PRIMARY}>
              {liveCourse.instructor || 'Rajeev Kumar'}
            </p>
          </div>
          <div>
            <h4 className={`text-sm font-semibold ${TAILWIND_COLORS.TEXT_MUTED}`}>
              Total Batches
            </h4>
            <p className={TAILWIND_COLORS.TEXT_PRIMARY}>
              {liveCourse.totalBatches || batchData.length}
            </p>
          </div>
          <div>
            <h4 className={`text-sm font-semibold ${TAILWIND_COLORS.TEXT_MUTED}`}>
              Active Batches
            </h4>
            <p className={TAILWIND_COLORS.TEXT_PRIMARY}>
              {liveCourse.activeBatches ??
                batchData.filter(
                  (b) => b.status === 'Active' || b.status === 'Approved'
                ).length}
            </p>
          </div>
          <div>
            <h4 className={`text-sm font-semibold ${TAILWIND_COLORS.TEXT_MUTED}`}>
              Course Fee
            </h4>
            <p className="text-1xl font-medium text-success">
              ₹{liveCourse.fee}
            </p>
          </div>
        </div>

        {/* Course Duration + Other Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
          <div>
            <h4 className={`text-sm font-semibold ${TAILWIND_COLORS.TEXT_MUTED}`}>
              Course Duration
            </h4>
            <p className={TAILWIND_COLORS.TEXT_PRIMARY}>{liveCourse.duration}</p>
          </div>
          <div>
            <h4 className={`text-sm font-semibold ${TAILWIND_COLORS.TEXT_MUTED}`}>
              Certification
            </h4>
            <p className={TAILWIND_COLORS.TEXT_PRIMARY}>
              Industry recognized certificate
            </p>
          </div>
          <div>
            <h4 className={`text-sm font-semibold ${TAILWIND_COLORS.TEXT_MUTED}`}>
              Language
            </h4>
            <p className={TAILWIND_COLORS.TEXT_PRIMARY}>English</p>
          </div>
        </div>

        {/* Description */}
        <div className="pt-6">
          <h3
            className={`text-lg font-semibold mb-4 ${TAILWIND_COLORS.TEXT_PRIMARY}`}
          >
            Course Description
          </h3>
          <div className="bg-blue-50 rounded-lg p-6">
            <h4
              className={`text-md font-semibold mb-3 ${TAILWIND_COLORS.TEXT_PRIMARY}`}
            >
              Overview
            </h4>
            <p
              className={`${TAILWIND_COLORS.TEXT_PRIMARY} leading-relaxed`}
            >
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
            <div className="text-2xl font-bold text-blue-700">
              {liveCourse.totalBatches || batchData.length || 0}
            </div>
            <div className="text-sm text-gray-500">Total Batches</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-700">
              {liveCourse.activeBatches ??
                batchData.filter(
                  (b) => b.status === 'Active' || b.status === 'Approved'
                ).length}
            </div>
            <div className="text-sm text-gray-500">Active Batches</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {batchData.reduce(
                (t, b) => t + (b.enrolledStudents || 0),
                0
              )}
            </div>
            <div className="text-sm text-gray-500">Enrolled Students</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">
              {batchData.reduce((t, b) => t + (b.totalStudents || 0), 0)}
            </div>
            <div className="text-sm text-gray-500">Batch completed</div>
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

      {/* Available Courses */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2
          className={`text-xl font-bold mb-4 ${TAILWIND_COLORS.TEXT_PRIMARY}`}
        >
          Available Courses
        </h2>
        <p
          className={`text-sm mb-6 ${TAILWIND_COLORS.TEXT_MUTED}`}
        >
          Other courses available in our institute
        </p>

        {/* Calculate pagination */}
        {(() => {
          const totalPages = Math.ceil(availableCourses.length / itemsPerPage)
          const startIndex = (currentPage - 1) * itemsPerPage
          const endIndex = startIndex + itemsPerPage
          const paginatedCourses = availableCourses.slice(startIndex, endIndex)

          return (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <LuEye className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                        {course.admin_action === 'approved' ? 'Available' : 'Pending'}
                      </span>
                    </div>
                    <h3
                      className={`font-semibold mb-2 ${TAILWIND_COLORS.TEXT_PRIMARY}`}
                    >
                      {course.title}
                    </h3>
                    <p
                      className={`text-sm mb-4 ${TAILWIND_COLORS.TEXT_MUTED} leading-relaxed`}
                    >
                      {course.description?.slice(0, 100) || 'No description available'}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">
                        ₹{course.fee || 0}
                      </span>
                      <button
                        className={`${TAILWIND_COLORS.BADGE_SUCCESS} hover:text-blue-800 text-sm font-medium`}
                        onClick={() => handleOpenCoursePopup(course)}
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
                  <div className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                    Showing {startIndex + 1}–{Math.min(endIndex, availableCourses.length)} of {availableCourses.length} courses
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      variant="outline"
                      size="sm"
                      icon={<LuChevronLeft className="w-4 h-4" />}
                      className={`border-gray-300 ${TAILWIND_COLORS.TEXT_MUTED} hover:bg-gray-50 disabled:opacity-50`}
                    >
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        variant={page === currentPage ? "primary" : "outline"}
                        size="sm"
                        className={
                          page === currentPage
                            ? ""
                            : `border-gray-300 ${TAILWIND_COLORS.TEXT_MUTED} hover:bg-gray-50`
                        }
                      >
                        {page}
                      </Button>
                    ))}
                    <Button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      variant="outline"
                      size="sm"
                      iconRight={<LuChevronRight className="w-4 h-4" />}
                      className={`border-gray-300 ${TAILWIND_COLORS.TEXT_MUTED} hover:bg-gray-50 disabled:opacity-50`}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )
        })()}
      </div>

      <EditBatchModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        batchData={selectedBatchForEdit}
        onUpdate={handleUpdateBatch}
      />

      {isCoursePopupOpen && (
        <ViewCoursePopup
          course={selectedCourseForView}
          onClose={handleCloseCoursePopup}
        />
      )}
    </div>
  )
}

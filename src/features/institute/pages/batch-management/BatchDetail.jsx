import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LuUsers, LuCalendar, LuClock, LuDownload, LuPencil, LuTrash2, LuMail } from 'react-icons/lu'
import Button from '../../../../shared/components/Button'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'
import EditBatchModal from './EditBatchModal'
import { getMethod } from '../../../../service/api'
import apiService from '../../services/serviceUrl.js'

export default function BatchDetail({ batchData, onBack, onBatchUpdate }) {
  const navigate = useNavigate()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const dropdownRef = useRef(null)

  const [batchInfo, setBatchInfo] = useState(null)
  const [students, setStudents] = useState([])
  const [instructors, setInstructors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedBatchForEdit, setSelectedBatchForEdit] = useState(batchData?.batch ?? null)
  useEffect(() => {
    setSelectedBatchForEdit(batchData?.batch ?? null)
  }, [batchData])

  // ✅ Update local state when batchData prop changes (for real-time updates)
  // This ensures prop updates are reflected immediately, even if fetchBatchDetail runs
  useEffect(() => {
    if (batchData?.batch) {
      const batch = batchData.batch
      
      // Update batchInfo immediately when prop changes
      setBatchInfo((prev) => {
        const newName = batch.batch_name
        const newTimeSlot = batch.batch_time_slot
        const newStartDate = batch.start_date
        const newEndDate = batch.end_date
        const newDuration = newStartDate && newEndDate 
          ? `${newStartDate} - ${newEndDate}`
          : prev?.duration
        
        // Update if we have new data in the prop
        if (newName || newTimeSlot !== undefined || newStartDate || newEndDate) {
          return {
            ...prev,
            name: newName || prev?.name,
            timeSlot: newTimeSlot !== undefined ? newTimeSlot : prev?.timeSlot,
            duration: newDuration || prev?.duration,
          }
        }
        return prev
      })
      
      // Update instructor immediately when prop changes
      if (batch.assigned_instructor) {
        const instructorData = {
          id: batch.assigned_instructor.faculty_id || batch.assigned_instructor.id,
          name: batch.assigned_instructor.name || '',
          email: batch.assigned_instructor.email || '',
          phone: batch.assigned_instructor.phone || '',
        }
        
        // Only update if we have valid instructor data
        if (instructorData.id && instructorData.name) {
          setInstructors([instructorData])
        }
      } else if (batch.instructor_id === null || batch.instructor_id === 0 || batch.instructor_id === undefined) {
        // Clear instructor if explicitly removed
        setInstructors([])
      }
    }
  }, [batchData?.batch?.batch_id, batchData?.batch?.batch_name, batchData?.batch?.batch_time_slot, batchData?.batch?.start_date, batchData?.batch?.end_date, batchData?.batch?.assigned_instructor, batchData?.batch?.instructor_id])


  // ✅ Fetch Batch Details using course_id
  useEffect(() => {
    const fetchBatchDetail = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch batch details
        const response = await getMethod({
          apiUrl: apiService.courseByBatch,
          params: { course_id: batchData.courseId },
        })

        // Fetch course details to get instructor
        const courseResponse = await getMethod({
          apiUrl: `${apiService.getSingleCourse}?id=${batchData.courseId}`,
        })

        if (response.status && response.batches?.length > 0) {
          const currentBatch = response.batches.find(
            (b) => Number(b.batch_id) === Number(batchData.batch.batch_id)
          )
        
          if (currentBatch) {
            // ✅ Merge API data with prop data, giving priority to prop data for updated fields
            const propBatch = batchData.batch
            setBatchInfo({
              // Use prop data if available (from real-time updates), otherwise use API data
              name: propBatch.batch_name || currentBatch.batch_name,
              status: currentBatch.status || 'Active',
              duration: propBatch.start_date && propBatch.end_date
                ? `${propBatch.start_date} - ${propBatch.end_date}`
                : `${currentBatch.start_date || 'N/A'} - ${currentBatch.end_date || 'N/A'}`,
              timeSlot: propBatch.batch_time_slot !== undefined 
                ? propBatch.batch_time_slot 
                : (currentBatch.batch_time_slot || 'N/A'),
              description: `${batchData.courseTitle} - Practical oriented training batch`,
              totalStudents: currentBatch.enrolled_students || 0,
              maxStudents: 30,
              activeStudents: currentBatch.students?.filter((s) => s.status === 'Active').length || 0,
              completionPercentage: currentBatch.completion_percent || 0,
            })
        
            setStudents(
              (currentBatch.students || []).map((s) => ({
                id: s.student_id,
                name: s.name,
                email: s.email,
                joinDate: s.join_date,
                status: s.status,
              }))
            )
            
            // ✅ Get instructor - prioritize prop data (from real-time updates), then API data
            if (propBatch.assigned_instructor) {
              // Use instructor from prop (real-time update)
              setInstructors([{
                id: propBatch.assigned_instructor.faculty_id || propBatch.assigned_instructor.id,
                name: propBatch.assigned_instructor.name || '',
                email: propBatch.assigned_instructor.email || '',
                phone: propBatch.assigned_instructor.phone || '',
              }])
            } else if (propBatch.instructor_id === null || propBatch.instructor_id === 0) {
              // Instructor was removed in prop
              setInstructors([])
            } else if (courseResponse?.status && courseResponse?.course) {
              // Fallback to course API data
              const course = courseResponse.course
              
              // ✅ Handle both nested instructor object and flat instructor fields
              let instructorName = null
              let instructorId = null
              let instructorEmail = ''
              let instructorPhone = ''
              
              // Check if instructor is nested object
              if (course.instructor && typeof course.instructor === 'object') {
                instructorName = course.instructor.instructor_name || course.instructor.name
                instructorId = course.instructor.instructor_id || course.instructor.id
                instructorEmail = course.instructor.instructor_email || course.instructor.email || ''
                instructorPhone = course.instructor.instructor_phone || course.instructor.phone || ''
              } else {
                // Check flat structure
                instructorName = course.instructor_name || course.instructor
                instructorId = course.instructor_id || null
                instructorEmail = course.instructor_email || ''
                instructorPhone = course.instructor_phone || ''
              }
              
              if (instructorName) {
                setInstructors([
                  {
                    id: instructorId,
                    name: instructorName,
                    email: instructorEmail,
                    phone: instructorPhone,
                  }
                ])
              } else {
                // Fallback to batch faculty if course instructor not available
                if (Array.isArray(currentBatch.faculty) && currentBatch.faculty.length > 0) {
                  setInstructors(
                    currentBatch.faculty.map((f) => ({
                      id: f.faculty_id,
                      name: f.name,
                      email: f.email,
                      phone: f.phone,
                    }))
                  )
                } else if (currentBatch.assigned_instructor) {
                  setInstructors([
                    {
                      id: currentBatch.assigned_instructor.faculty_id,
                      name: currentBatch.assigned_instructor.name,
                      email: currentBatch.assigned_instructor.email,
                      phone: currentBatch.assigned_instructor.phone,
                    }
                  ])
                } else {
                  setInstructors([])
                }
              }
            } else {
              // Fallback to batch faculty if course API fails
              if (Array.isArray(currentBatch.faculty) && currentBatch.faculty.length > 0) {
                setInstructors(
                  currentBatch.faculty.map((f) => ({
                    id: f.faculty_id,
                    name: f.name,
                    email: f.email,
                    phone: f.phone,
                  }))
                )
              } else if (currentBatch.assigned_instructor) {
                setInstructors([
                  {
                    id: currentBatch.assigned_instructor.faculty_id,
                    name: currentBatch.assigned_instructor.name,
                    email: currentBatch.assigned_instructor.email,
                    phone: currentBatch.assigned_instructor.phone,
                  }
                ])
              } else {
                setInstructors([])
              }
            }
          }
        } else {
          setError('Batch details not found')
        }
      } catch (err) {
        setError('Failed to load batch details')
      } finally {
        setLoading(false)
      }
    }

    fetchBatchDetail()
  }, [batchData?.batch?.batch_id, batchData?.courseId])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return `${TAILWIND_COLORS.BADGE_SUCCESS}`
      case 'Inactive':
        return `${TAILWIND_COLORS.BADGE_ERROR}`
      default:
        return `${TAILWIND_COLORS.BADGE_WARN}`
    }
  }

  const handleExportReport = () => {
  }

  const handleEditBatch = () => {
    setSelectedBatchForEdit(batchData?.batch ?? null)
    setIsEditModalOpen(true)
  }

  const handleUpdateBatch = (updatedData) => {
    setBatchInfo((prev) => {
      if (!prev) return prev

      const updatedDuration =
        updatedData?.start_date && updatedData?.end_date
          ? `${updatedData.start_date} - ${updatedData.end_date}`
          : prev.duration

      // ✅ Explicitly update timeSlot if batch_time_slot is provided in updatedData
      const updatedTimeSlot = updatedData?.batch_time_slot !== undefined 
        ? updatedData.batch_time_slot 
        : prev.timeSlot

      return {
        ...prev,
        name: updatedData?.batch_name || updatedData?.name || prev.name,
        timeSlot: updatedTimeSlot,
        duration: updatedDuration,
      }
    })

    setSelectedBatchForEdit((prev) =>
      prev
        ? {
            ...prev,
            ...updatedData,
            batch_name: updatedData?.batch_name || updatedData?.name || prev.batch_name,
            batch_time_slot: updatedData?.batch_time_slot !== undefined 
              ? updatedData.batch_time_slot 
              : prev.batch_time_slot,
          }
        : prev
    )

    // ✅ Update instructor state in real-time if instructor was updated
    if (updatedData?.instructor) {
      setInstructors([updatedData.instructor])
    } else if (updatedData?.instructor_id === null || updatedData?.instructor_id === 0) {
      // If instructor was removed (set to null or 0), clear the instructors list
      setInstructors([])
    }

    // ✅ Notify parent component (CourseDetail) about the batch update for real-time list update
    if (onBatchUpdate) {
      onBatchUpdate(updatedData)
    }

    setIsEditModalOpen(false)
  }

  const handleDeleteStudent = (studentId) => {
    setOpenDropdown(null)
  }

  const handleSendMessageToAll = () => {
    navigate('/institute/messaging-alerts', {
      state: {
        initialTabId: 'send-notice',
        batchContext: {
          batchId: batchData?.batch?.batch_id,
          batchName: batchInfo?.name,
          courseId: batchData?.courseId,
          courseTitle: batchData?.courseTitle,
          studentCount: students.length,
        },
      },
    })
  }

  const handleSendMessageToStudent = (studentId) => {
    const student = students.find((s) => s.id === studentId)
    if (student) {
      navigate('/institute/message', {
        state: {
          selectedStudent: student,
          batchInfo: batchInfo,
          isBatchMessage: false,
        },
      })
    }
    setOpenDropdown(null)
  }

  // ✅ Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (loading) {
    return <div className="p-4 text-center text-gray-500">Loading batch details...</div>
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>
  }

  if (!batchInfo) {
    return <div className="p-4 text-center text-gray-500">No batch data available.</div>
  }

  return (
    <div className={`p-2 ${TAILWIND_COLORS.BG_PRIMARY} min-h-screen`}>
      {/* Header with Back Button */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={onBack}
              variant="outline"
              size="sm"
              className={`${TAILWIND_COLORS.BTN_LIGHT}`}
            >
              ← Back
            </Button>
            <div>
              <h1 className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                {batchInfo.name}
              </h1>
              {batchData?.courseTitle && (
                <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>
                  Course: {batchData.courseTitle}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleExportReport}
              variant="outline"
              size="sm"
              icon={<LuDownload className="w-4 h-4" />}
              className={`${TAILWIND_COLORS.BTN_LIGHT}`}
            >
              Export Report
            </Button>
            <Button
              onClick={handleEditBatch}
              variant="primary"
              size="sm"
              icon={<LuPencil className="w-4 h-4" />}
              className={`${TAILWIND_COLORS.BTN_SECONDARY}`}
            >
              Edit Batch
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Students */}
        <div className={`${TAILWIND_COLORS.CARD} p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}>
                Total Students
              </h3>
              <p className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                {batchInfo.totalStudents}/{batchInfo.maxStudents}
              </p>
            </div>
            <div
              className={`w-12 h-12 ${TAILWIND_COLORS.BADGE_INFO} rounded-lg flex items-center justify-center`}
            >
              <LuUsers className={`w-6 h-6 ${TAILWIND_COLORS.TEXT_PRIMARY}`} />
            </div>
          </div>
        </div>

        {/* Completion Percentage */}
        <div className={`${TAILWIND_COLORS.CARD} p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}>
                Completion %
              </h3>
              <p className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                {batchInfo.completionPercentage}%
              </p>
            </div>
            <div
              className={`w-12 h-12 ${TAILWIND_COLORS.BADGE_SUCCESS} rounded-lg flex items-center justify-center`}
            >
              <svg
                className={`w-6 h-6 ${TAILWIND_COLORS.TEXT_PRIMARY}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Active Students */}
        <div className={`${TAILWIND_COLORS.CARD} p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}>
                Active Students
              </h3>
              <p className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                {batchInfo.activeStudents}
              </p>
            </div>
            <div
              className={`w-12 h-12 ${TAILWIND_COLORS.BADGE_WARN} rounded-lg flex items-center justify-center`}
            >
              <LuUsers className={`w-6 h-6 ${TAILWIND_COLORS.TEXT_PRIMARY}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Batch Info */}
        <div className={`${TAILWIND_COLORS.CARD} p-6`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
              Batch Information
            </h2>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                batchInfo.status
              )}`}
            >
              {batchInfo.status}
            </span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <LuCalendar className={`w-5 h-5 ${TAILWIND_COLORS.TEXT_MUTED}`} />
              <div>
                <p className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Duration</p>
                <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>{batchInfo.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LuClock className={`w-5 h-5 ${TAILWIND_COLORS.TEXT_MUTED}`} />
              <div>
                <p className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Time Slot</p>
                <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>{batchInfo.timeSlot}</p>
              </div>
            </div>
            <div>
              <p
                className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}
              >
                Description
              </p>
              <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} leading-relaxed`}>
                {batchInfo.description}
              </p>
            </div>
          </div>
        </div>

        {/* Instructors */}
        <div className={`${TAILWIND_COLORS.CARD} p-6`}>
          <h2 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>
            Instructor
          </h2>
          <div className="space-y-4">
            {instructors.length > 0 ? (
              instructors.map((instructor, index) => (
                <div
                  key={instructor.id || (instructor.name && typeof instructor.name === 'string' ? instructor.name : `instructor-${index}`)}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>
                      {instructor.name && typeof instructor.name === 'string'
                        ? instructor.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                        : 'N/A'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                      {instructor.name && typeof instructor.name === 'string' ? instructor.name : 'No instructor assigned'}
                    </h3>
                    {instructor.email && (
                      <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED}`}>{instructor.email}</p>
                    )}
                    {instructor.phone && (
                      <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED}`}>{instructor.phone}</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4">
                <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>No instructor assigned</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enrolled Students */}
      <div className={`mt-6 ${TAILWIND_COLORS.CARD}`}>
        <div className={`p-6 ${TAILWIND_COLORS.BORDER}`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
              Enrolled Students ({batchInfo.totalStudents})
            </h2>
            <Button
              onClick={handleSendMessageToAll}
              variant="primary"
              size="sm"
              icon={<LuMail className="w-4 h-4" />}
              className={`${TAILWIND_COLORS.BTN_SECONDARY}`}
            >
              Send Message
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}
                >
                  Student
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}
                >
                  Join Date
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}
                >
                  Status
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              className={`${TAILWIND_COLORS.BG_PRIMARY} divide-y ${TAILWIND_COLORS.BORDER}`}
            >
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div
                        className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}
                      >
                        {student.name}
                      </div>
                      <div className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
                        {student.email}
                      </div>
                    </div>
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}
                  >
                    {student.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        student.status
                      )}`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDeleteStudent(student.id)}
                      className={`${TAILWIND_COLORS.TEXT_MUTED} hover:text-red-600 p-1 rounded-md hover:bg-red-50`}
                      title="Delete Student"
                    >
                      <LuTrash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Batch Modal */}
      <EditBatchModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        batchData={selectedBatchForEdit}
        onUpdate={handleUpdateBatch}
      />
    </div>
  )
}

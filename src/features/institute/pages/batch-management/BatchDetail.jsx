import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LuUsers, LuCalendar, LuClock, LuDownload, LuPencil, LuTrash2, LuMail } from 'react-icons/lu'
import Button from '../../../../shared/components/Button'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'
import EditBatchModal from './EditBatchModal'
import { getMethod } from '../../../../service/api'
import apiService from '../../services/serviceUrl.js'

export default function BatchDetail({ batchData, onBack }) {
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


  // ✅ Fetch Batch Details using course_id
  useEffect(() => {
    const fetchBatchDetail = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getMethod({
          apiUrl: apiService.courseByBatch,
          params: { course_id: batchData.courseId },
        })

        if (response.status && response.batches?.length > 0) {
          const currentBatch = response.batches.find(
            (b) => parseInt(b.batch_id) === parseInt(batchData.batch.batch_id)
          )

          if (currentBatch) {
            setBatchInfo({
              name: currentBatch.batch_name,
              status: currentBatch.status || 'Active',
              duration: `${currentBatch.start_date || 'N/A'} - ${currentBatch.end_date || 'N/A'}`,
              timeSlot: currentBatch.batch_time_slot || 'N/A',
              description: `${batchData.courseTitle} - Practical oriented training batch`,
              totalStudents: currentBatch.enrolled_students || 0,
              maxStudents: 30,
              activeStudents:
                currentBatch.students?.filter((s) => s.status === 'Active').length || 0,
              completionPercentage: currentBatch.completion_percent || 0,
            })

            setStudents(
              currentBatch.students?.map((s) => ({
                id: s.student_id,
                name: s.name,
                email: s.email,
                joinDate: s.join_date,
                status: s.status,
              })) || []
            )
          }

          setInstructors(
            response.faculty?.map((f) => ({
              id: f.faculty_id,
              name: f.name,
              email: f.email,
              phone: f.phone,
            })) || []
          )
        } else {
          setError('Batch details not found')
        }
      } catch (err) {
        console.error('Error loading batch detail:', err)
        setError('Failed to load batch details')
      } finally {
        setLoading(false)
      }
    }

    fetchBatchDetail()
  }, [batchData?.batch?.batch_id])

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
    console.log('Export Report clicked')
  }

  const handleEditBatch = () => {
    setSelectedBatchForEdit(batchData?.batch ?? null)
    setIsEditModalOpen(true)
  }

  const handleUpdateBatch = (updatedData) => {
    console.log('Batch updated:', updatedData)
    setBatchInfo((prev) => {
      if (!prev) return prev

      const updatedDuration =
        updatedData?.start_date && updatedData?.end_date
          ? `${updatedData.start_date} - ${updatedData.end_date}`
          : prev.duration

      return {
        ...prev,
        name: updatedData?.batch_name || updatedData?.name || prev.name,
        timeSlot: updatedData?.batch_time_slot || prev.timeSlot,
        duration: updatedDuration,
      }
    })

    setSelectedBatchForEdit((prev) =>
      prev
        ? {
            ...prev,
            ...updatedData,
            batch_name: updatedData?.batch_name || updatedData?.name || prev.batch_name,
            batch_time_slot: updatedData?.batch_time_slot || prev.batch_time_slot,
          }
        : prev
    )

    setIsEditModalOpen(false)
  }

  const handleDeleteStudent = (studentId) => {
    console.log('Delete student:', studentId)
    setOpenDropdown(null)
  }

  const handleSendMessageToAll = () => {
    console.log('Send message to all students in batch:', batchInfo?.name)
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
            {instructors.map((instructor) => (
              <div
                key={instructor.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>
                    {instructor.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                    {instructor.name}
                  </h3>
                  <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED}`}>{instructor.email}</p>
                  <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED}`}>{instructor.phone}</p>
                </div>
              </div>
            ))}
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

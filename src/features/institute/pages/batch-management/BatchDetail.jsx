import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LuUsers, LuCalendar, LuClock, LuDownload, LuPencil, LuEllipsisVertical, LuMail, LuTrash2 } from 'react-icons/lu'
import Button from '../../../../shared/components/Button'
import { MatrixCard } from '../../../../shared/components/metricCard'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'
import EditBatchModal from './EditBatchModal'

export default function BatchDetail({ batchData, onBack }) {
  const navigate = useNavigate()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const dropdownRef = useRef(null)

  // Use actual batch data if available, otherwise fallback to sample data
  const batchInfo = batchData?.batch ? {
    name: batchData.batch.name || "Batch Name",
    status: batchData.batch.status || "Active",
    duration: "2/7/2025 - 8/10/2025", // This would come from actual batch data
    timeSlot: batchData.batch.time || "9:00 PM - 12:00 PM",
    description: `Batch for ${batchData.courseTitle || 'Course'} - Comprehensive training program.`,
    totalStudents: batchData.batch.students ? parseInt(batchData.batch.students.split('/')[0]) : 5,
    maxStudents: batchData.batch.students ? parseInt(batchData.batch.students.split('/')[1]) : 30,
    activeStudents: batchData.batch.students ? parseInt(batchData.batch.students.split('/')[0]) : 4,
    completionPercentage: 60
  } : {
    name: "Web Dev Batch A",
    status: "Active",
    duration: "2/7/2025 - 8/10/2025",
    timeSlot: "9:00 PM - 12:00 PM",
    description: "Comprehensive web development course covering frontend and backend technologies including React, Node.js, and databases.",
    totalStudents: 5,
    maxStudents: 30,
    activeStudents: 4,
    completionPercentage: 60
  }

  const instructors = [
    {
      id: 1,
      name: "Aryan Verma",
      email: "aryanverma@gmail.com",
      phone: "+918833938882",
      avatar: null
    },
    {
      id: 2,
      name: "Riya Shah",
      email: "riyashah@gmail.com",
      phone: "+918833938882",
      avatar: null
    },
    {
      id: 3,
      name: "Kunal Mehta",
      email: "kunalmehta@gmail.com",
      phone: "+918833938882",
      avatar: null
    }
  ]

  const students = [
    {
      id: 1,
      name: "Aisha Khan",
      email: "aishakhan4@email.com",
      joinDate: "2/15/2024",
      status: "Active"
    },
    {
      id: 2,
      name: "Rajesh Patle",
      email: "rajeshpatle34@email.com",
      joinDate: "2/15/2024",
      status: "Active"
    },
    {
      id: 3,
      name: "Maniya Soni",
      email: "maniyasoni3@email.com",
      joinDate: "2/15/2024",
      status: "Active"
    },
    {
      id: 4,
      name: "Priya Sharma",
      email: "priyasharma@email.com",
      joinDate: "2/16/2024",
      status: "Active"
    },
    {
      id: 5,
      name: "Amit Kumar",
      email: "amitkumar@email.com",
      joinDate: "2/17/2024",
      status: "Inactive"
    }
  ]

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
    setIsEditModalOpen(true)
  }

  const handleUpdateBatch = (updatedData) => {
    console.log('Batch updated:', updatedData)
    // Here you would typically update the batch data in your state management or API
    setIsEditModalOpen(false)
  }

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleStudentAction = (studentId, event) => {
    event.stopPropagation()
    setOpenDropdown(openDropdown === studentId ? null : studentId)
  }

  const handleSendMessage = (studentId) => {
    console.log('Send message to student:', studentId)
    setOpenDropdown(null)
  }

  const handleEditStudent = (studentId) => {
    console.log('Edit student:', studentId)
    setOpenDropdown(null)
  }

  const handleDeleteStudent = (studentId) => {
    console.log('Delete student:', studentId)
    setOpenDropdown(null)
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
              <h1 className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{batchInfo.name}</h1>
              {batchData?.courseTitle && (
                <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>Course: {batchData.courseTitle}</p>
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
              <h3 className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}>Total Students</h3>
              <p className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{batchInfo.totalStudents}/{batchInfo.maxStudents}</p>
            </div>
            <div className={`w-12 h-12 ${TAILWIND_COLORS.BADGE_INFO} rounded-lg flex items-center justify-center`}>
              <LuUsers className={`w-6 h-6 ${TAILWIND_COLORS.TEXT_PRIMARY}`} />
            </div>
          </div>
        </div>

        {/* Completion Percentage */}
        <div className={`${TAILWIND_COLORS.CARD} p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}>Completion %</h3>
              <p className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{batchInfo.completionPercentage}%</p>
            </div>
            <div className={`w-12 h-12 ${TAILWIND_COLORS.BADGE_SUCCESS} rounded-lg flex items-center justify-center`}>
              <svg className={`w-6 h-6 ${TAILWIND_COLORS.TEXT_PRIMARY}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Active Students */}
        <div className={`${TAILWIND_COLORS.CARD} p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}>Active Students</h3>
              <p className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{batchInfo.activeStudents}</p>
            </div>
            <div className={`w-12 h-12 ${TAILWIND_COLORS.BADGE_WARN} rounded-lg flex items-center justify-center`}>
              <LuUsers className={`w-6 h-6 ${TAILWIND_COLORS.TEXT_PRIMARY}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Batch Information */}
        <div className={`${TAILWIND_COLORS.CARD} p-6`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Batch Information</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(batchInfo.status)}`}>
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
              <p className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>Description</p>
              <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} leading-relaxed`}>{batchInfo.description}</p>
            </div>
          </div>
        </div>

        {/* Instructors */}
        <div className={`${TAILWIND_COLORS.CARD} p-6`}>
          <h2 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Instructor</h2>
          <div className="space-y-4">
            {instructors.map((instructor) => (
              <div key={instructor.id} className={`flex items-center gap-3 p-3 ${TAILWIND_COLORS.BG_MUTED} rounded-lg`}>
                <div className={`w-10 h-10 ${TAILWIND_COLORS.BG_MUTED} rounded-full flex items-center justify-center`}>
                  <span className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>
                    {instructor.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{instructor.name}</h3>
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
          <h2 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Enrolled Students ({batchInfo.totalStudents})</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={TAILWIND_COLORS.BG_MUTED}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium ${TAILWIND_COLORS.TEXT_MUTED} uppercase tracking-wider`}>Student</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${TAILWIND_COLORS.TEXT_MUTED} uppercase tracking-wider`}>Join Date</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${TAILWIND_COLORS.TEXT_MUTED} uppercase tracking-wider`}>Status</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${TAILWIND_COLORS.TEXT_MUTED} uppercase tracking-wider`}>Actions</th>
              </tr>
            </thead>
            <tbody className={`${TAILWIND_COLORS.BG_PRIMARY} divide-y ${TAILWIND_COLORS.BORDER}`}>
              {students.map((student) => (
                <tr key={student.id} className={`hover:${TAILWIND_COLORS.BG_MUTED}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{student.name}</div>
                      <div className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>{student.email}</div>
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                    {student.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(student.status)}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="relative" ref={dropdownRef}>
                      <button
                        onClick={(e) => handleStudentAction(student.id, e)}
                        className={`${TAILWIND_COLORS.TEXT_MUTED} hover:${TAILWIND_COLORS.TEXT_PRIMARY} p-1 rounded-md hover:bg-gray-100`}
                      >
                        <LuEllipsisVertical className="w-4 h-4" />
                      </button>
                      
                      {openDropdown === student.id && (
                        <div className={`absolute right-0 mt-2 w-48 ${TAILWIND_COLORS.CARD} shadow-lg z-50`}>
                          <div className="py-1">
                            <button
                              onClick={() => handleSendMessage(student.id)}
                              className={`flex items-center w-full px-4 py-2 text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} hover:${TAILWIND_COLORS.BG_MUTED}`}
                            >
                              <LuMail className="w-4 h-4 mr-3" />
                              Send Message
                            </button>
                            <button
                              onClick={() => handleEditStudent(student.id)}
                              className={`flex items-center w-full px-4 py-2 text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} hover:${TAILWIND_COLORS.BG_MUTED}`}
                            >
                              <LuPencil className="w-4 h-4 mr-3" />
                              Edit Student
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(student.id)}
                              className={`flex items-center w-full px-4 py-2 text-sm ${TAILWIND_COLORS.BADGE_ERROR} hover:${TAILWIND_COLORS.BG_MUTED}`}
                            >
                              <LuTrash2 className="w-4 h-4 mr-3" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
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
        batchData={batchInfo}
        onUpdate={handleUpdateBatch}
      />
    </div>
  )
}

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LuUsers, LuCalendar, LuClock, LuDownload, LuPencil, LuEllipsisVertical } from 'react-icons/lu'
import Button from '../../../../shared/components/Button'
import { MatrixCard } from '../../../../shared/components/metricCard'

export default function BatchDetail({ batchData, onBack }) {
  const navigate = useNavigate()

  // Sample data for the batch detail view
  const batchInfo = {
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
        return 'bg-green-100 text-green-800'
      case 'Inactive':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleExportReport = () => {
    console.log('Export Report clicked')
  }

  const handleEditBatch = () => {
    console.log('Edit Batch clicked')
  }

  const handleStudentAction = (studentId) => {
    console.log('Student action clicked for:', studentId)
  }

  return (
    <div className="p-2 bg-[#F6FAFF] min-h-screen">
      {/* Header with Back Button */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              onClick={onBack}
              variant="outline"
              size="sm"
              className="border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              ← Back
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">{batchInfo.name}</h1>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleExportReport}
              variant="outline"
              size="sm"
              icon={<LuDownload className="w-4 h-4" />}
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Export Report
            </Button>
            <Button 
              onClick={handleEditBatch}
              variant="primary"
              size="sm"
              icon={<LuPencil className="w-4 h-4" />}
              className="bg-green-600 hover:bg-green-700"
            >
              Edit Batch
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Students */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Total Students</h3>
              <p className="text-2xl font-bold text-gray-900">{batchInfo.totalStudents}/{batchInfo.maxStudents}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <LuUsers className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Completion Percentage */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Completion %</h3>
              <p className="text-2xl font-bold text-gray-900">{batchInfo.completionPercentage}%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Active Students */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Active Students</h3>
              <p className="text-2xl font-bold text-gray-900">{batchInfo.activeStudents}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <LuUsers className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Batch Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Batch Information</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(batchInfo.status)}`}>
              {batchInfo.status}
            </span>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <LuCalendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Duration</p>
                <p className="text-sm text-gray-600">{batchInfo.duration}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <LuClock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Time Slot</p>
                <p className="text-sm text-gray-600">{batchInfo.timeSlot}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-900 mb-2">Description</p>
              <p className="text-sm text-gray-600 leading-relaxed">{batchInfo.description}</p>
            </div>
          </div>
        </div>

        {/* Instructors */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Instructor</h2>
          <div className="space-y-4">
            {instructors.map((instructor) => (
              <div key={instructor.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {instructor.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{instructor.name}</h3>
                  <p className="text-xs text-gray-600">{instructor.email}</p>
                  <p className="text-xs text-gray-600">{instructor.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enrolled Students */}
      <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Enrolled Students ({batchInfo.totalStudents})</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(student.status)}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleStudentAction(student.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <LuEllipsisVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

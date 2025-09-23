import React, { useState } from 'react'
import { LuCheck, LuEye } from 'react-icons/lu'

const AssignCourse = () => {
  const [selectedStudents, setSelectedStudents] = useState([])
  const [assignmentData, setAssignmentData] = useState({
    newCourse: '',
    newBatch: '',
    reason: ''
  })

  // Mock student data
  const students = [
    {
      id: 1,
      name: 'Priya Sharma',
      currentCourse: 'Fitter',
      currentBatch: 'FIT-2025-E1',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Amit Singh',
      currentCourse: 'Welder',
      currentBatch: 'WEL-2025-M1',
      status: 'Completed'
    },
    {
      id: 3,
      name: 'Rishi Sharma',
      currentCourse: 'Electrician',
      currentBatch: 'ELE-2025-M1',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Pooja Gupta',
      currentCourse: 'Mechanic',
      currentBatch: 'MEC-2025-M1',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Rishi Sharma',
      currentCourse: 'Plumber',
      currentBatch: 'PLU-2025-M1',
      status: 'On Hold'
    },
    {
      id: 6,
      name: 'Sneha Patel',
      currentCourse: 'Electrician',
      currentBatch: 'ELE-2025-M2',
      status: 'Active'
    },
    {
      id: 7,
      name: 'Vikram Kumar',
      currentCourse: 'Fitter',
      currentBatch: 'FIT-2025-M2',
      status: 'On Hold'
    },
    {
      id: 8,
      name: 'Anita Singh',
      currentCourse: 'Welder',
      currentBatch: 'WEL-2025-M2',
      status: 'Completed'
    }
  ]

  const courses = [
    'Select Course',
    'Electrician',
    'Fitter',
    'Welder',
    'Mechanic',
    'Plumber',
    'Carpenter',
    'Painter'
  ]

  const batches = [
    'Select Batch',
    'ELE-2025-M1',
    'ELE-2025-M2',
    'FIT-2025-M1',
    'FIT-2025-M2',
    'WEL-2025-M1',
    'WEL-2025-M2',
    'MEC-2025-M1',
    'MEC-2025-M2',
    'PLU-2025-M1',
    'PLU-2025-M2'
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Completed':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'On Hold':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const handleStudentSelect = (studentId, checked) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, studentId])
    } else {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId))
    }
  }

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedStudents(students.map(s => s.id))
    } else {
      setSelectedStudents([])
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setAssignmentData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAssignSelected = () => {
    if (selectedStudents.length === 0) {
      alert('Please select at least one student')
      return
    }
    if (!assignmentData.newCourse || assignmentData.newCourse === 'Select Course') {
      alert('Please select a new course')
      return
    }
    if (!assignmentData.newBatch || assignmentData.newBatch === 'Select Batch') {
      alert('Please select a new batch')
      return
    }
    if (!assignmentData.reason.trim()) {
      alert('Please provide a reason for the assignment change')
      return
    }

    console.log('Assigning students:', {
      selectedStudents,
      newCourse: assignmentData.newCourse,
      newBatch: assignmentData.newBatch,
      reason: assignmentData.reason
    })

    alert(`Successfully assigned ${selectedStudents.length} student(s) to ${assignmentData.newCourse} - ${assignmentData.newBatch}`)
    
    // Reset form
    setSelectedStudents([])
    setAssignmentData({
      newCourse: '',
      newBatch: '',
      reason: ''
    })
  }

  const handlePreviewChanges = () => {
    if (selectedStudents.length === 0) {
      alert('Please select at least one student')
      return
    }
    if (!assignmentData.newCourse || assignmentData.newCourse === 'Select Course') {
      alert('Please select a new course')
      return
    }
    if (!assignmentData.newBatch || assignmentData.newBatch === 'Select Batch') {
      alert('Please select a new batch')
      return
    }

    const selectedStudentNames = students
      .filter(s => selectedStudents.includes(s.id))
      .map(s => s.name)
      .join(', ')

    alert(`Preview Changes:\n\nStudents: ${selectedStudentNames}\nNew Course: ${assignmentData.newCourse}\nNew Batch: ${assignmentData.newBatch}\nReason: ${assignmentData.reason || 'Not provided'}`)
  }

  return (
    <div className="p-2 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel: Assign Students to Course/Batch */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Assign Students to Course/Batch</h2>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedStudents.length === students.length && students.length > 0}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="rounded border-gray-300 text-[#5B9821] focus:ring-[#5B9821]"
              />
              <span className="text-sm text-gray-600">Select All</span>
            </div>
          </div>

          {/* Student List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {students.map((student) => (
              <div
                key={student.id}
                className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(student.id)}
                  onChange={(e) => handleStudentSelect(student.id, e.target.checked)}
                  className="rounded border-gray-300 text-[#5B9821] focus:ring-[#5B9821] mr-4"
                />
                
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900">{student.name}</h3>
                  <p className="text-xs text-gray-600">
                    Current: {student.currentCourse} - {student.currentBatch}
                  </p>
                </div>

                <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(student.status)}`}>
                  {student.status}
                </span>
              </div>
            ))}
          </div>

          {/* Selected Count */}
          {selectedStudents.length > 0 && (
            <div className="mt-4 p-3 bg-[#5B9821] bg-opacity-10 rounded-lg">
              <p className="text-sm text-[#5B9821] font-medium">
                {selectedStudents.length} student(s) selected
              </p>
            </div>
          )}
        </div>

        {/* Right Panel: Assignment Options */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Assignment Options</h2>
          
          <div className="space-y-6">
            {/* New Course */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Course
              </label>
              <select
                name="newCourse"
                value={assignmentData.newCourse}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5B9821] focus:border-transparent"
              >
                {courses.map((course, index) => (
                  <option key={index} value={course === 'Select Course' ? '' : course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            {/* New Batch */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Batch
              </label>
              <select
                name="newBatch"
                value={assignmentData.newBatch}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5B9821] focus:border-transparent"
              >
                {batches.map((batch, index) => (
                  <option key={index} value={batch === 'Select Batch' ? '' : batch}>
                    {batch}
                  </option>
                ))}
              </select>
            </div>

            {/* Assignment Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assignment Reason
              </label>
              <textarea
                name="reason"
                value={assignmentData.reason}
                onChange={handleInputChange}
                placeholder="Enter reason for assignment change..."
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5B9821] focus:border-transparent resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                onClick={handleAssignSelected}
                className="flex-1 px-6 py-2 bg-[#5B9821] text-white rounded-lg hover:bg-[#3f6917] transition-colors font-medium flex items-center justify-center gap-2"
              >
                <LuCheck className="w-4 h-4" />
                Assign Selected
              </button>
              <button
                onClick={handlePreviewChanges}
                className="flex-1 px-6 py-2 bg-white text-[#5B9821] border border-[#5B9821] rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <LuEye className="w-4 h-4" />
                Preview Changes
              </button>
            </div>
          </div>

          {/* Assignment Summary */}
          {selectedStudents.length > 0 && (assignmentData.newCourse || assignmentData.newBatch) && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Assignment Summary</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-medium">Selected Students:</span> {selectedStudents.length}</p>
                {assignmentData.newCourse && (
                  <p><span className="font-medium">New Course:</span> {assignmentData.newCourse}</p>
                )}
                {assignmentData.newBatch && (
                  <p><span className="font-medium">New Batch:</span> {assignmentData.newBatch}</p>
                )}
                {assignmentData.reason && (
                  <p><span className="font-medium">Reason:</span> {assignmentData.reason}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AssignCourse
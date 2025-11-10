import React, { useState, useEffect } from 'react'
import { LuCheck, LuEye } from 'react-icons/lu'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'
<<<<<<< HEAD
import Button from '../../../../shared/components/Button'
=======
import { Button, PrimaryButton, OutlineButton } from '../../../../shared/components/Button'
>>>>>>> b6309bd861d20703fe85cd10ccd9983b33d08d97
import { getMethod, postMethod } from '../../../../service/api'
import apiService from '../../services/serviceUrl'

const AssignCourse = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedStudents, setSelectedStudents] = useState([])
  const [assignmentData, setAssignmentData] = useState({
    newCourse: '',
    newBatch: '',
    reason: ''
  })

  // Dummy dropdowns (you can later fetch from API if available)
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

  // 🟢 Fetch students on load
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true)
      try {
        const resp = await getMethod({ apiUrl: apiService.list_students })
        if (resp.status && Array.isArray(resp.data)) {
          const formatted = resp.data.map((s, index) => ({
            id: s.user_info?.user_id,
            name: s.user_info?.user_name,
            currentCourse: s.profile_info?.trade || 'N/A',
            currentBatch: s.profile_info?.batch || 'N/A',
            status: s.profile_info?.admin_action || 'Active'
          }))
          setStudents(formatted)
        } else {
          console.error('Failed to load students:', resp)
        }
      } catch (err) {
        console.error('Error fetching students:', err)
      }
      setLoading(false)
    }

    fetchStudents()
  }, [])

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
    if (checked) setSelectedStudents([...selectedStudents, studentId])
    else setSelectedStudents(selectedStudents.filter(id => id !== studentId))
  }

  const handleSelectAll = (checked) => {
    if (checked) setSelectedStudents(students.map(s => s.id))
    else setSelectedStudents([])
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setAssignmentData(prev => ({ ...prev, [name]: value }))
  }

  // 🟢 Assign selected students via API
  const handleAssignSelected = async () => {
    if (selectedStudents.length === 0)
      return alert('Please select at least one student')
    if (!assignmentData.newCourse || assignmentData.newCourse === 'Select Course')
      return alert('Please select a new course')
    if (!assignmentData.newBatch || assignmentData.newBatch === 'Select Batch')
      return alert('Please select a new batch')
    if (!assignmentData.reason.trim())
      return alert('Please provide a reason for the assignment change')

    const course_id = courses.indexOf(assignmentData.newCourse)
    const batch_id = batches.indexOf(assignmentData.newBatch)

    try {
      const payload = {
        student_id: selectedStudents,
        course_id,
        batch_id,
        assignment_reason: assignmentData.reason
      }

      const resp = await postMethod({
        apiUrl: apiService.assign_course_batch,
        payload
      })

      if (resp.status) {
        alert(resp.message || 'Students assigned successfully')
      } else {
        alert('Failed: ' + (resp.message || 'Unknown error'))
      }

      setSelectedStudents([])
      setAssignmentData({ newCourse: '', newBatch: '', reason: '' })
    } catch (err) {
      console.error('Error assigning:', err)
      alert('Error assigning students. Check console for details.')
    }
  }

  const handlePreviewChanges = () => {
    if (selectedStudents.length === 0)
      return alert('Please select at least one student')
    if (!assignmentData.newCourse || assignmentData.newCourse === 'Select Course')
      return alert('Please select a new course')
    if (!assignmentData.newBatch || assignmentData.newBatch === 'Select Batch')
      return alert('Please select a new batch')

    const selectedNames = students
      .filter(s => selectedStudents.includes(s.id))
      .map(s => s.name)
      .join(', ')

    alert(`Preview Changes:\n\nStudents: ${selectedNames}\nNew Course: ${assignmentData.newCourse}\nNew Batch: ${assignmentData.newBatch}\nReason: ${assignmentData.reason || 'Not provided'}`)
  }

  return (
    <div className="p-2 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Assign Students to Course/Batch</h2>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedStudents.length === students.length && students.length > 0}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="rounded border-gray-300 text-[#5B9821] focus:ring-[#5B9821]"
              />
              <span className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Select All</span>
            </div>
          </div>

          {/* Student List */}
          {loading ? (
            <p className={`text-center ${TAILWIND_COLORS.TEXT_MUTED}`}>Loading students...</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {students.map(student => (
                <div key={student.id} className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={(e) => handleStudentSelect(student.id, e.target.checked)}
                    className={`rounded border-gray-300 ${TAILWIND_COLORS.TEXT_PRIMARY} focus:ring-[#5B9821] mr-4`}
                  />
                  <div className="flex-1">
                    <h3 className={`text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{student.name}</h3>
                    <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED}`}>
                      Current: {student.currentCourse} - {student.currentBatch}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(student.status)}`}>
                    {student.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {selectedStudents.length > 0 && (
            <div className="mt-4 p-3 bg-[#5B9821] bg-opacity-10 rounded-lg">
              <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} font-medium`}>
                {selectedStudents.length} student(s) selected
              </p>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className={`text-xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-6`}>Assignment Options</h2>

          <div className="space-y-6">
            {/* Course */}
            <div>
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>New Course</label>
              <select
                name="newCourse"
                value={assignmentData.newCourse}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5B9821]"
              >
                {courses.map((c, i) => (
                  <option key={i} value={c === 'Select Course' ? '' : c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Batch */}
            <div>
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>New Batch</label>
              <select
                name="newBatch"
                value={assignmentData.newBatch}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5B9821]"
              >
                {batches.map((b, i) => (
                  <option key={i} value={b === 'Select Batch' ? '' : b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Reason */}
            <div>
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>Assignment Reason</label>
              <textarea
                name="reason"
                value={assignmentData.reason}
                onChange={handleInputChange}
                placeholder="Enter reason for assignment change..."
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5B9821] resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
<<<<<<< HEAD
              <Button onClick={handleAssignSelected} variant="primary" icon={<LuCheck className="w-4 h-4" />} fullWidth>
                Assign Selected
              </Button>
              <Button onClick={handlePreviewChanges} variant="outline" icon={<LuEye className="w-4 h-4" />} fullWidth>
=======
              <PrimaryButton
                onClick={handleAssignSelected}
                icon={<LuCheck className="w-4 h-4" />}
                fullWidth
              >
                Assign Selected
              </PrimaryButton>
              <OutlineButton
                onClick={handlePreviewChanges}
                icon={<LuEye className="w-4 h-4" />}
                fullWidth
              >
>>>>>>> b6309bd861d20703fe85cd10ccd9983b33d08d97
                Preview Changes
              </Button>
            </div>
          </div>

          {selectedStudents.length > 0 && (assignmentData.newCourse || assignmentData.newBatch) && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>Assignment Summary</h3>
              <div className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} space-y-1`}>
                <p><span className="font-medium">Selected Students:</span> {selectedStudents.length}</p>
                {assignmentData.newCourse && <p><span className="font-medium">New Course:</span> {assignmentData.newCourse}</p>}
                {assignmentData.newBatch && <p><span className="font-medium">New Batch:</span> {assignmentData.newBatch}</p>}
                {assignmentData.reason && <p><span className="font-medium">Reason:</span> {assignmentData.reason}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AssignCourse

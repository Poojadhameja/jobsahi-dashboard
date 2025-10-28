import React, { useState } from 'react'
import { LuUsers, LuCheck, LuClock, LuDownload, LuSearch, LuEye, LuPencil, LuMessageSquare, LuTrash2, LuX } from 'react-icons/lu'
import { Horizontal4Cards } from '../../../../shared/components/metricCard'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'
import Button from '../../../../shared/components/Button'

const ViewStudents = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [courseFilter, setCourseFilter] = useState('all')
  const [selectedStudents, setSelectedStudents] = useState([])
  const [showViewPopup, setShowViewPopup] = useState(false)
  const [showEditPopup, setShowEditPopup] = useState(false)
  const [showDeletePopup, setShowDeletePopup] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Rahul Kumar',
      email: 'rahul@gmail.com',
      phone: '+91 8123456789',
      course: 'Electrician',
      batch: 'ELE-2025-M1',
      progress: 75,
      status: 'Active',
      // Additional details for resume
      address: '123 Main Street, Mumbai, Maharashtra 400001',
      dateOfBirth: '1995-06-15',
      gender: 'Male',
      qualification: 'Diploma in Electrical Engineering',
      experience: '2 years',
      skills: ['Electrical Wiring', 'Circuit Design', 'Safety Protocols', 'Team Management'],
      achievements: ['Best Student Award 2023', 'Safety Excellence Certificate'],
      projects: ['Smart Home Automation System', 'Industrial Electrical Panel Design'],
      languages: ['Hindi', 'English', 'Marathi'],
      joiningDate: '2024-01-15',
      lastActive: '2024-12-15'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya@gmail.com',
      phone: '+91 9876543210',
      course: 'Fitter',
      batch: 'FIT-2025-M1',
      progress: 45,
      status: 'Active',
      address: '456 Park Avenue, Delhi, Delhi 110001',
      dateOfBirth: '1998-03-22',
      gender: 'Female',
      qualification: 'ITI in Fitter Trade',
      experience: '1 year',
      skills: ['Metal Fabrication', 'Welding', 'Machine Operation', 'Quality Control'],
      achievements: ['Excellence in Practical Work', 'Innovation Award'],
      projects: ['Precision Component Manufacturing', 'Assembly Line Optimization'],
      languages: ['Hindi', 'English', 'Punjabi'],
      joiningDate: '2024-02-01',
      lastActive: '2024-12-14'
    },
    {
      id: 3,
      name: 'Amit Singh',
      email: 'amit@gmail.com',
      phone: '+91 8765432109',
      course: 'Welder',
      batch: 'WEL-2025-M1',
      progress: 100,
      status: 'Completed',
      address: '789 Industrial Area, Bangalore, Karnataka 560001',
      dateOfBirth: '1993-11-08',
      gender: 'Male',
      qualification: 'Diploma in Mechanical Engineering',
      experience: '4 years',
      skills: ['Arc Welding', 'TIG Welding', 'MIG Welding', 'Quality Inspection'],
      achievements: ['Master Welder Certification', 'Zero Defect Award'],
      projects: ['Pipeline Welding Project', 'Structural Steel Fabrication'],
      languages: ['Hindi', 'English', 'Kannada'],
      joiningDate: '2023-08-15',
      lastActive: '2024-12-10'
    },
    {
      id: 4,
      name: 'Sneha Patel',
      email: 'sneha@gmail.com',
      phone: '+91 7654321098',
      course: 'Electrician',
      batch: 'ELE-2025-M1',
      progress: 75,
      status: 'Active',
      address: '321 Tech Park, Pune, Maharashtra 411001',
      dateOfBirth: '1996-09-12',
      gender: 'Female',
      qualification: 'B.Tech in Electrical Engineering',
      experience: '3 years',
      skills: ['Power Systems', 'Control Systems', 'PLC Programming', 'Project Management'],
      achievements: ['Outstanding Performance Award', 'Leadership Excellence'],
      projects: ['Smart Grid Implementation', 'Renewable Energy Integration'],
      languages: ['Hindi', 'English', 'Gujarati'],
      joiningDate: '2024-01-20',
      lastActive: '2024-12-13'
    },
    {
      id: 5,
      name: 'Vikram Kumar',
      email: 'vikram@gmail.com',
      phone: '+91 6543210987',
      course: 'Electrician',
      batch: 'ELE-2025-M1',
      progress: 45,
      status: 'On Hold',
      address: '654 Residential Complex, Chennai, Tamil Nadu 600001',
      dateOfBirth: '1997-04-18',
      gender: 'Male',
      qualification: 'ITI in Electrical',
      experience: '1.5 years',
      skills: ['Basic Electrical Work', 'Troubleshooting', 'Maintenance'],
      projects: ['Residential Electrical Installation'],
      languages: ['Hindi', 'English', 'Tamil'],
      joiningDate: '2024-03-01',
      lastActive: '2024-11-28'
    }
  ])

  // Styling functions
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

  const getStatusDotColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500'
      case 'Completed':
        return 'bg-blue-500'
      case 'On Hold':
        return 'bg-yellow-500'
      default:
        return 'bg-white'
    }
  }

  // Calculate summary statistics
  const totalStudents = students.length
  const activeStudents = students.filter(s => s.status === 'Active').length
  const completedStudents = students.filter(s => s.status === 'Completed').length
  const avgProgress = Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length)

  // Data for Horizontal4Cards
  const summaryCardsData = [
    {
      title: 'Total Students',
      value: totalStudents.toString(),
      icon: <LuUsers className="w-5 h-5" />
    },
    {
      title: 'Active Students',
      value: activeStudents.toString(),
      icon: <div className="w-3 h-3 bg-green-500 rounded-full"></div>
    },
    {
      title: 'Completed',
      value: completedStudents.toString(),
      icon: <LuCheck className="w-5 h-5" />
    },
    {
      title: 'Avg. Progress',
      value: `${avgProgress}%`,
      icon: <LuClock className="w-5 h-5" />
    }
  ]

  // Filter students based on search and filters
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.phone.includes(searchTerm)
    const matchesStatus = statusFilter === 'all' || student.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesCourse = courseFilter === 'all' || student.course.toLowerCase().includes(courseFilter.toLowerCase())
    
    return matchesSearch && matchesStatus && matchesCourse
  })

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedStudents(filteredStudents.map(s => s.id))
    } else {
      setSelectedStudents([])
    }
  }

  const handleSelectStudent = (studentId, checked) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, studentId])
    } else {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId))
    }
  }

  // Popup handlers
  const handleViewStudent = (student) => {
    setSelectedStudent(student)
    setShowViewPopup(true)
  }

  const handleEditStudent = (student) => {
    setSelectedStudent(student)
    setShowEditPopup(true)
  }

  const handleDeleteStudent = (student) => {
    setSelectedStudent(student)
    setShowDeletePopup(true)
  }

  const handleClosePopups = () => {
    setShowViewPopup(false)
    setShowEditPopup(false)
    setShowDeletePopup(false)
    setSelectedStudent(null)
  }

  const handleConfirmDelete = () => {
    if (selectedStudent) {
      setStudents(students.filter(s => s.id !== selectedStudent.id))
      setShowDeletePopup(false)
      setSelectedStudent(null)
    }
  }

  const handleUpdateStudent = (updatedStudent) => {
    setStudents(students.map(s => s.id === updatedStudent.id ? updatedStudent : s))
    setShowEditPopup(false)
    setSelectedStudent(null)
  }

  return (
    <div className="p-2   min-h-screen">
      {/* Summary Cards */}
      <Horizontal4Cards 
        data={summaryCardsData}
        className="mb-5"
      />

      {/* Filters and Export */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col lg:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="on hold">On Hold</option>
            </select>

            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Courses</option>
              <option value="electrician">Electrician</option>
              <option value="fitter">Fitter</option>
              <option value="welder">Welder</option>
            </select>
          </div>

          <Button 
            variant="primary" 
            icon={<LuDownload className="w-4 h-4" />}
          >
            Export Data
          </Button>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className={`px-6 py-4 text-left text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Student</th>
                <th className={`px-6 py-4 text-left text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Course & Batch</th>
                <th className={`px-6 py-4 text-left text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Status</th>
                <th className={`px-6 py-4 text-left text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-white">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={(e) => handleSelectStudent(student.id, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-gray-300 rounded-full mr-3 flex-shrink-0"></div>
                      <div>
                        <div className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{student.name}</div>
                        <div className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>{student.email}</div>
                        <div className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>{student.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{student.course}</div>
                      <div className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>{student.batch}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(student.status)}`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${getStatusDotColor(student.status)}`}></div>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleViewStudent(student)}
                        className="text-gray-400 hover:text-blue-600 transition-colors p-2 border border-gray-300 rounded-md"
                      >
                        <LuEye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditStudent(student)}
                        className="text-gray-400 hover:text-green-600 transition-colors p-2 border border-gray-300 rounded-md"
                      >
                        <LuPencil className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteStudent(student)}
                        className="text-gray-400 hover:text-red-600 transition-colors p-2 border border-gray-300 rounded-md"
                      >
                        <LuTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <p className={TAILWIND_COLORS.TEXT_MUTED}>No students found matching your criteria.</p>
        </div>
      )}

      {/* View Student Popup */}
      {showViewPopup && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Student Resume - {selectedStudent.name}</h2>
              <button
                onClick={handleClosePopups}
                className="text-gray-400 hover:text-gray-600"
              >
                <LuX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} border-b pb-2`}>Personal Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {selectedStudent.name}</p>
                  <p><span className="font-medium">Email:</span> {selectedStudent.email}</p>
                  <p><span className="font-medium">Phone:</span> {selectedStudent.phone}</p>
                  <p><span className="font-medium">Date of Birth:</span> {selectedStudent.dateOfBirth}</p>
                  <p><span className="font-medium">Gender:</span> {selectedStudent.gender}</p>
                  <p><span className="font-medium">Address:</span> {selectedStudent.address}</p>
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-4">
                <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} border-b pb-2`}>Academic Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Course:</span> {selectedStudent.course}</p>
                  <p><span className="font-medium">Batch:</span> {selectedStudent.batch}</p>
                  <p><span className="font-medium">Qualification:</span> {selectedStudent.qualification}</p>
                  <p><span className="font-medium">Experience:</span> {selectedStudent.experience}</p>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} border-b pb-2`}>Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedStudent.skills.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="space-y-4">
                <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} border-b pb-2`}>Achievements</h3>
                <ul className="space-y-1">
                  {selectedStudent.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Projects */}
              <div className="space-y-4">
                <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} border-b pb-2`}>Projects</h3>
                <ul className="space-y-1">
                  {selectedStudent.projects.map((project, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      {project}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Languages */}
              <div className="space-y-4">
                <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} border-b pb-2`}>Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedStudent.languages.map((language, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                onClick={handleClosePopups}
                variant="neutral"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Popup */}
      {showEditPopup && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Edit Student - {selectedStudent.name}</h2>
              <button
                onClick={handleClosePopups}
                className="text-gray-400 hover:text-gray-600"
              >
                <LuX className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              const updatedStudent = {
                ...selectedStudent,
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                course: formData.get('course'),
                batch: formData.get('batch'),
                status: formData.get('status'),
                address: formData.get('address'),
                qualification: formData.get('qualification'),
                experience: formData.get('experience')
              }
              handleUpdateStudent(updatedStudent)
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedStudent.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>Email</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={selectedStudent.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    defaultValue={selectedStudent.phone}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>Course</label>
                  <input
                    type="text"
                    name="course"
                    defaultValue={selectedStudent.course}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>Batch</label>
                  <input
                    type="text"
                    name="batch"
                    defaultValue={selectedStudent.batch}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>Status</label>
                  <select
                    name="status"
                    defaultValue={selectedStudent.status}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>Address</label>
                  <textarea
                    name="address"
                    defaultValue={selectedStudent.address}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>Qualification</label>
                  <input
                    type="text"
                    name="qualification"
                    defaultValue={selectedStudent.qualification}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>Experience</label>
                  <input
                    type="text"
                    name="experience"
                    defaultValue={selectedStudent.experience}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  type="button"
                  onClick={handleClosePopups}
                  variant="neutral"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                >
                  Update Student
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {showDeletePopup && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <LuTrash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Delete Student</h2>
                <p className={TAILWIND_COLORS.TEXT_MUTED}>This action cannot be undone.</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className={TAILWIND_COLORS.TEXT_PRIMARY}>
                Are you sure you want to delete <span className="font-semibold">{selectedStudent.name}</span>? 
                This will permanently remove all their data from the system.
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                onClick={handleClosePopups}
                variant="neutral"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmDelete}
                variant="danger"
              >
                Delete Student
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewStudents

import React, { useMemo, useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { TAILWIND_COLORS, COLORS } from '../../../../shared/WebConstant'
import { MatrixCard, MetricPillRow } from '../../../../shared/components/metricCard'
import {
  LuUsers,
  LuSearch,
  LuFilter,
  LuMessageSquare,
  LuPlus,
  LuEye,
  LuTrash2
} from 'react-icons/lu'
// KPI Card Component
function KPICard({ title, value, icon, color = COLORS.PRIMARY }) {
  return (
    <div className={`${TAILWIND_COLORS.CARD} p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold" style={{ color }}>{value}</p>
        </div>
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}

// Advanced Filters Component
function AdvancedFilters({ filters, onFilterChange, onClearAll, onApplyFilter }) {
  return (
    <div className="bg-white border border-[var(--color-primary)28] rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <LuFilter className="text-gray-600" size={20} />
        <h3 className="font-medium text-[var(--color-primary)]">Advanced Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--color-primary)]">Courses</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.course || 'all'}
            onChange={(e) => onFilterChange({ ...filters, course: e.target.value })}
          >
            <option value="all">All Courses</option>
            <option value="electrician">Electrician</option>
            <option value="plumber">Plumber</option>
            <option value="carpenter">Carpenter</option>
            <option value="welder">Welder</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--color-primary)]">Placement Status</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.placementStatus || 'all'}
            onChange={(e) => onFilterChange({ ...filters, placementStatus: e.target.value })}
          >
            <option value="all">All Status</option>
            <option value="placed">Placed</option>
            <option value="placement-ready">Placement Ready</option>
            <option value="in-progress">In Progress</option>
            <option value="not-ready">Not Ready</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--color-primary)]">Skills</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.skills || 'all'}
            onChange={(e) => onFilterChange({ ...filters, skills: e.target.value })}
          >
            <option value="all">All Skills</option>
            <option value="react">React</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--color-primary)]">Experience</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.experience || 'all'}
            onChange={(e) => onFilterChange({ ...filters, experience: e.target.value })}
          >
            <option value="all">All Experience</option>
            <option value="0-1">0-1 years</option>
            <option value="1-3">1-3 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5+">5+ years</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={onClearAll}
          className="px-4 py-2 text-sm text-[var(--color-secondary)] hover:underline font-medium"
        >
          Clear All
        </button>
        <button
          onClick={onApplyFilter}
          className="px-4 py-2 text-sm rounded-lg bg-[var(--color-secondary)] text-white hover:bg-secondary-dark transition-colors duration-200 font-medium"
        >
          Apply Filter
        </button>
      </div>
    </div>
  )
}

// Skills Tags Component
function SkillsTags({ skills }) {
  const displaySkills = skills.slice(0, 3)
  const remainingCount = skills.length - 3

  return (
    <div className="flex flex-wrap gap-1">
      {displaySkills.map((skill, index) => (
        <span
          key={index}
          className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
        >
          {skill}
        </span>
      ))}
      {remainingCount > 0 && (
        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
          +{remainingCount}
        </span>
      )}
    </div>
  )
}

// Progress Bar Component
function ProgressBar({ progress }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-green-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  )
}

// Action Dropdown Component
function ActionDropdown({ student, onViewCV, onDelete }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = React.useRef(null)

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleViewCV = () => {
    setIsOpen(false)
    onViewCV(student)
  }

  const handleDelete = () => {
    setIsOpen(false)
    onDelete(student)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
      >
        <HiDotsVertical className="text-gray-600" size={18} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[140px]">
          <button
            onClick={handleViewCV}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors duration-200"
          >
            <LuEye size={16} />
            View CV
          </button>
          <button
            onClick={handleDelete}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors duration-200"
          >
            <LuTrash2 size={16} />
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

// View CV Modal Component
function ViewCVModal({ student, isOpen, onClose }) {
  if (!isOpen || !student) return null

  const handleDownloadCV = () => {
    // Create a sample CV content (in real app, this would come from API)
    const cvContent = `
STUDENT CV

Personal Information:
Name: ${student.name}
Email: ${student.email}
Course: ${student.course}
CGPA: ${student.cgpa}
Region: ${student.region}
Progress: ${student.progress}%

Educational Details:
Highest Qualification: Graduation
College/Institute: ABC Technical Institute
Passing Year: 2023
Marks/CGPA: ${student.cgpa}

Skills:
${student.skills.map(skill => `- ${skill}`).join('\n')}

Address Information:
City: Mumbai
State: Maharashtra
Country: India
Pin Code: 400001

Additional Information:
Preferred Job Location: Mumbai, Pune
LinkedIn/Portfolio: linkedin.com/in/${student.name.toLowerCase().replace(' ', '')}

---
Generated on: ${new Date().toLocaleDateString()}
    `.trim()

    // Create and download the file
    const blob = new Blob([cvContent], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${student.name}_Resume.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    // Show success message
    Swal.fire({
      title: "Download Started!",
      text: `${student.name}'s CV has been downloaded successfully.`,
      icon: "success",
      timer: 2000,
      showConfirmButton: false
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Student CV Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Full Name</label>
                <p className="text-gray-800">{student.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <p className="text-gray-800">{student.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Course</label>
                <p className="text-gray-800">{student.course}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">CGPA</label>
                <p className="text-gray-800">{student.cgpa}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Region</label>
                <p className="text-gray-800">{student.region}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Progress</label>
                <p className="text-gray-800">{student.progress}%</p>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {student.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Educational Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Educational Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Highest Qualification</label>
                <p className="text-gray-800">Graduation</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">College/Institute</label>
                <p className="text-gray-800">ABC Technical Institute</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Passing Year</label>
                <p className="text-gray-800">2023</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Marks/CGPA</label>
                <p className="text-gray-800">{student.cgpa}</p>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">City</label>
                <p className="text-gray-800">Mumbai</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">State</label>
                <p className="text-gray-800">Maharashtra</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Country</label>
                <p className="text-gray-800">India</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Pin Code</label>
                <p className="text-gray-800">400001</p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Preferred Job Location</label>
                <p className="text-gray-800">Mumbai, Pune</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">LinkedIn/Portfolio</label>
                <p className="text-gray-800">
                  <a href="#" className="text-blue-600 hover:underline">linkedin.com/in/{student.name.toLowerCase().replace(' ', '')}</a>
                </p>
              </div>
            </div>
          </div>

          {/* Resume/CV Section */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Resume/CV</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📄</span>
                <span className="text-gray-800">{student.name}_Resume.pdf</span>
              </div>
              <button 
                onClick={handleDownloadCV}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Download CV
              </button>
            </div>
          </div>
        </div>
        
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// Delete Confirmation Modal Component
function DeleteConfirmationModal({ student, isOpen, onClose, onConfirm }) {
  if (!isOpen || !student) return null

  const handleConfirm = () => {
    onConfirm(student)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <LuTrash2 className="text-red-600" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Delete Student</h2>
              <p className="text-gray-600">This action cannot be undone</p>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-700">
              Are you sure you want to delete <span className="font-semibold">{student.name}</span> from the student list?
            </p>
            <p className="text-sm text-gray-500 mt-2">
              This will permanently remove all data associated with this student including their profile, progress, and records.
            </p>
          </div>
          
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              Delete Student
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Student Table Component
function StudentTable({ students, onSelectAll, selectedStudents, onSelectStudent, autoScrollEnabled, setAutoScrollEnabled, onViewCV, onDelete }) {
  const allSelected = selectedStudents.length === students.length && students.length > 0

  // Auto scroll effect
  React.useEffect(() => {
    if (autoScrollEnabled && students.length > 0) {
      const interval = setInterval(() => {
        const tableContainer = document.querySelector('.student-table-container');
        if (tableContainer) {
          tableContainer.scrollTop += 1;
          if (tableContainer.scrollTop >= tableContainer.scrollHeight - tableContainer.clientHeight) {
            tableContainer.scrollTop = 0;
          }
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [autoScrollEnabled, students.length]);

  return (
    <div className={`${TAILWIND_COLORS.CARD} p-6`}>
       <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
         <div className="flex items-center gap-2">
           <LuUsers className="text-gray-600" size={20} />
           <h3 className="font-medium text-gray-800">All Student Profiles</h3>
         </div>         
         <div className="relative w-full sm:w-auto">
           <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
           <input 
             type="text"
             placeholder="Search by name, email, or student ID..."
             className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-full sm:w-80"
           />
         </div>
       </div>
      
      <div className="student-table-container overflow-x-auto max-h-96 overflow-y-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-3 px-4">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onSelectAll}
                  className="rounded border-gray-300"
                />
              </th>
              <th className="py-3 px-4 font-medium">Name</th>
              <th className="py-3 px-4 font-medium">Course</th>
              <th className="py-3 px-4 font-medium">CGPA</th>
              <th className="py-3 px-4 font-medium">Region</th>
              <th className="py-3 px-4 font-medium">Skills</th>
              <th className="py-3 px-4 font-medium">Progress</th>
              <th className="py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-4">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => onSelectStudent(student.id)}
                    className="rounded border-gray-300"
                  />
                </td>
                <td className="py-4 px-4">
                  <div>
                    <div className="font-medium text-gray-900">{student.name}</div>
                    <div className="text-gray-500 text-xs">{student.email}</div>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700">{student.course}</td>
                <td className="py-4 px-4 text-gray-700">{student.cgpa}</td>
                <td className="py-4 px-4 text-gray-700">{student.region}</td>
                <td className="py-4 px-4">
                  <SkillsTags skills={student.skills} />
                </td>
                <td className="py-4 px-4">
                  <div className="w-20">
                    <ProgressBar progress={student.progress} />
                    <div className="text-xs text-gray-500 mt-1">{student.progress}%</div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <ActionDropdown 
                    student={student} 
                    onViewCV={onViewCV} 
                    onDelete={onDelete} 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function StudentManagement() {
  const [filters, setFilters] = useState({})
  const [students, setStudents] = useState([])
  const [selectedStudents, setSelectedStudents] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(false)

  useEffect(() => {
    // TODO: replace with ApiService
    async function fetchData() {
      try {
        var data = {
          apiUrl: apiService.studentsList,
          payload: {
          },
        };

        var response = await getMethod(data);
        console.log(response)
        if (response.status === true) {
          // Convert response before setting
          const formatted = response.data.map((item) => ({
            id: item.user_info.user_id,
            name: item.user_info.user_name,
            email: item.user_info.email,
            phone: item.user_info.phone_number,
            dob: item.user_info.dob,
            gender: item.user_info.gender,
            isActive: item.user_info.is_active,
            education: item.profile_info.education,
            resume: item.profile_info.resume,
            certificates: item.profile_info.certificates,
            portfolio: item.profile_info.portfolio_link,
            linkedin: item.profile_info.linkedin_url,
            skills: item.profile_info.skills.split(",").map((s) => s.trim()),
            course: item.profile_info.trade,
            region: item.profile_info.location,
            cgpa: '8.7/10',
            progress: 90

          }));

          const pendingFormatted = response.data
          .filter((item) => item.profile_info.status === "approved");
          
          setTotalStudentCount(response.count);
          setVerifiedProfileCount(pendingFormatted.length);
          setStudents(formatted);
        } else {
          Swal.fire({
            title: "Failed",
            text: response.message || "Failed to retrieve students",
            icon: "error"
          });
        }
      } catch (error) {
        // console.error("API Error:", error)
        // alert("Something went wrong. Please try again.")
        Swal.fire({
          title: "API Error",
          text: "Something went wrong. Please try again.",
          icon: "error"
        });
      }
    }
    fetchData();
  }, [])

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = !searchTerm ||
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toString().includes(searchTerm)

      const matchesCourse = !filters.course || filters.course === 'all' || student.course.toLowerCase() === filters.course
      const matchesSkills = !filters.skills || filters.skills === 'all' || student.skills.some(skill => skill.toLowerCase() === filters.skills)

      return matchesSearch && matchesCourse && matchesSkills
    })
  }, [students, filters, searchTerm])

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(filteredStudents.map(student => student.id))
    }
  }

  const handleSelectStudent = (studentId) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    )
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleClearAll = () => {
    setFilters({
      course: 'all',
      placementStatus: 'all',
      skills: 'all',
      experience: 'all'
    })
  }

  const handleApplyFilter = () => {
    // Filter logic is already handled in useMemo
    console.log('Applied filters:', filters)
  }

  // Handle View CV
  const handleViewCV = (student) => {
    setViewCVModal({ isOpen: true, student })
  }

  const handleCloseViewCV = () => {
    setViewCVModal({ isOpen: false, student: null })
  }

  // Handle Delete
  const handleDelete = (student) => {
    setDeleteModal({ isOpen: true, student })
  }

  const handleCloseDelete = () => {
    setDeleteModal({ isOpen: false, student: null })
  }

  const handleConfirmDelete = (student) => {
    // Remove student from the list
    setStudents(prevStudents => prevStudents.filter(s => s.id !== student.id))
    
    // Show success message
    Swal.fire({
      title: "Deleted!",
      text: `${student.name} has been successfully deleted.`,
      icon: "success",
      timer: 2000,
      showConfirmButton: false
    })
  }

  // Handle Export Data
  const handleExportData = () => {
    // Prepare data for export
    const exportData = filteredStudents.map(student => ({
      'Student ID': student.id,
      'Name': student.name,
      'Email': student.email,
      'Course': student.course,
      'CGPA': student.cgpa,
      'Region': student.region,
      'Skills': student.skills.join(', '),
      'Progress (%)': student.progress,
      'Status': student.progress >= 80 ? 'Placement Ready' : student.progress >= 60 ? 'In Progress' : 'Not Ready'
    }))

    // Convert to CSV format
    const headers = Object.keys(exportData[0])
    const csvContent = [
      headers.join(','),
      ...exportData.map(row => 
        headers.map(header => {
          const value = row[header]
          // Escape commas and quotes in CSV
          return typeof value === 'string' && (value.includes(',') || value.includes('"')) 
            ? `"${value.replace(/"/g, '""')}"` 
            : value
        }).join(',')
      )
    ].join('\n')

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `Student_Management_Export_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    // Show success message
    Swal.fire({
      title: "Export Successful!",
      text: `Student data has been exported successfully. ${exportData.length} records downloaded.`,
      icon: "success",
      timer: 3000,
      showConfirmButton: false
    })
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <MatrixCard
          title="Student Management"
          subtitle="Manage student profiles, track progress, and monitor placements."
          className=""
        />

        <div className="flex items-center justify-end gap-3">
          <MetricPillRow items={[
            { key: 'export', label: 'Export Data', icon: <span className="text-sm">📊</span>, onClick: handleExportData },
            { key: 'notification', label: 'Send Bulk Notification', icon: <LuMessageSquare size={16} />, onClick: () => console.log('Send Notification') },
            { key: 'add', label: 'Add Student', icon: <LuPlus size={16} />, onClick: () => console.log('Add Student') }
          ]} />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Students"
          value={totalStudentCount}
          icon={<LuUsers size={24} color={COLORS.PRIMARY} />}
          color={COLORS.PRIMARY}
        />
        <KPICard
          title="Verified Profiles"
          value={verifiedProfileCount}
          icon={<span className="text-2xl">✅</span>}
          color={COLORS.PRIMARY}
        />
        <KPICard
          title="Placement Ready"
          value={placementReadyCount}
          icon={<span className="text-2xl">📁</span>}
          color={COLORS.PRIMARY}
        />
        <KPICard
          title="Successfully Placed"
          value={placedSuccessCount}
          icon={<span className="text-2xl">🎯</span>}
          color={COLORS.PRIMARY}
        />
      </div>

      {/* Advanced Filters */}
      <AdvancedFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearAll}
        onApplyFilter={handleApplyFilter}
      />

      {/* Student Table */}
      <StudentTable
        students={filteredStudents}
        onSelectAll={handleSelectAll}
        selectedStudents={selectedStudents}
        onSelectStudent={handleSelectStudent}
        autoScrollEnabled={autoScrollEnabled}
        setAutoScrollEnabled={setAutoScrollEnabled}
        onViewCV={handleViewCV}
        onDelete={handleDelete}
      />

      {/* View CV Modal */}
      <ViewCVModal 
        student={viewCVModal.student}
        isOpen={viewCVModal.isOpen}
        onClose={handleCloseViewCV}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal 
        student={deleteModal.student}
        isOpen={deleteModal.isOpen}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}

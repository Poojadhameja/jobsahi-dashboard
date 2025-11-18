import React, { useState, useEffect, useMemo } from 'react'
import { LuUsers, LuCheck, LuClock, LuDownload, LuSearch, LuEye, LuPencil, LuMessageSquare, LuTrash2, LuX } from 'react-icons/lu'
import { Horizontal4Cards } from '../../../../shared/components/metricCard'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'
import Button, { IconButton } from '../../../../shared/components/Button'
import { getMethod, putMethod } from '../../../../service/api'
import apiService from '../../services/serviceUrl'

const ViewStudents = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [courseFilter, setCourseFilter] = useState('all')
  const [selectedStudents, setSelectedStudents] = useState([])
  const [showViewPopup, setShowViewPopup] = useState(false)
  const [showEditPopup, setShowEditPopup] = useState(false)
  const [showDeletePopup, setShowDeletePopup] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)


  const fetchBatchesByCourse = async (course_id) => {
    try {
      if (!course_id) return [];
  
      const resp = await getMethod({
        apiUrl: `${apiService.get_batches}?course_id=${course_id}`,
      });
  
      if (resp?.status && resp.batches) {
        return resp.batches;
      }
    } catch (e) {
      console.error("Batch fetch error:", e);
    }
  
    return [];
  };
  

  
  const [students, setStudents] = useState([])  // ✅ will come from API
  const [summary, setSummary] = useState({
    total_students: 0,
    active_students: 0,
    Inactive_students: 0,
    total_courses: 0,
  })
  const [loading, setLoading] = useState(false)

  const defaultCourseOptions = [
    'Electrician',
    'Fitter',
    'Welder',
    'Mechanic',
    'Plumber',
    'Carpenter',
    'Painter'
  ]

  const defaultBatchOptions = [
    'Batch A',
    'Batch B',
    'Batch C'
  ]

  const courseOptions = useMemo(() => {
    const uniqueCourses = Array.from(
      new Set(students.map((student) => student.course).filter(Boolean))
    )
    return uniqueCourses.length > 0 ? uniqueCourses : defaultCourseOptions
  }, [students])

  const batchOptions = useMemo(() => {
    const uniqueBatches = Array.from(
      new Set(students.map((student) => student.batch).filter(Boolean))
    )
    return uniqueBatches.length > 0 ? uniqueBatches : defaultBatchOptions
  }, [students])
  
  const fetchStudents = async () => {
    try {
      setLoading(true)
  
      const resp = await getMethod({
        apiUrl: apiService.institute_view_students,  // ✅ ab defined
      })
  
      console.log("ViewStudents API response:", resp)
  
      if (resp?.status) {
        setStudents(
          (resp.data || []).map((s) => ({
            ...s,
            student_id: s.student_id || s.id || s.user_id, // choose correct id from backend
          }))
        );
        
  
        if (resp.summary) {
          setSummary({
            total_students: resp.summary.total_students || 0,
            active_students: resp.summary.active_students || 0,
            Inactive_students: resp.summary.Inactive_students || 0,
            total_courses: resp.summary.total_courses || 0,
          })
        }
      } else {
        console.error("ViewStudents API error:", resp?.message)
      }
    } catch (error) {
      console.error("ViewStudents API exception:", error)
    } finally {
      setLoading(false)
    }
  }
  
  // ✅ Fetch single student details when "View" is clicked
const fetchStudentDetails = async (studentId) => {
  try {
    setLoading(true);
    const resp = await getMethod({
      apiUrl: `${apiService.get_student_profile}?id=${studentId}`
    });

    console.log("View student detail response:", resp);

    if (resp?.success && resp.data?.profiles?.length > 0) {
      const profile = resp.data.profiles[0];

      // Map backend fields to UI structure
      const mapped = {
        id: profile.profile_id,
        name: profile.personal_info.user_name,
        email: profile.personal_info.email,
        phone: profile.personal_info.phone_number,
        course: profile.professional_info.trade || "Not Assigned",
        batch: "-",
      };

      setSelectedStudent(mapped);
      setShowViewPopup(true);
    } else {
      console.warn("No profile found for this student");
      alert("No detailed profile found for this student.");
    }
  } catch (error) {
    console.error("Error fetching student details:", error);
  } finally {
    setLoading(false);
  }
};


  
  useEffect(() => {
    fetchStudents()
  }, [])
  

  // Styling functions
  const getStatusColor = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'enrolled':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'dropped':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return `bg-gray-100 ${TAILWIND_COLORS.TEXT_PRIMARY} border-gray-200`
    }
  }

  const getStatusDotColor = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'enrolled':
        return 'bg-green-500'
      case 'completed':
        return 'bg-blue-500'
      case 'dropped':
        return 'bg-red-500'
      default:
        return 'bg-white'
    }
  }

  // Calculate summary statistics
  const totalStudents = students.length
  const activeStudents = students.filter(s => s.status === 'Active').length
  const InactiveStudents = students.filter(s => s.status === 'Inactive').length
  const avgProgress = Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length)

  // Data for Horizontal4Cards
  const summaryCardsData = [
    {
      title: 'Total Students',
      value: summary.total_students.toString(),
      icon: <LuUsers className="w-5 h-5" />,
    },
    {
      title: 'Active Students',
      value: summary.active_students.toString(),
      icon: <div className="w-3 h-3 bg-green-500 rounded-full"></div>,
    },
    {
      title: 'Inactive',
      value: summary.Inactive_students.toString(),
      icon: <LuCheck className="w-5 h-5" />,
    },
    {
      title: 'Total Courses',
      value: summary.total_courses.toString(),
      icon: <LuClock className="w-5 h-5" />,
    },
  ]
  

  // Filter students based on search and filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      (student.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.phone || '').includes(searchTerm)
  
    const matchesStatus =
      statusFilter === 'all' ||
      (student.status || '').toLowerCase() === statusFilter.toLowerCase()
  
    const matchesCourse =
      courseFilter === 'all' ||
      (student.course || '').toLowerCase().includes(courseFilter.toLowerCase())
  
    return matchesSearch && matchesStatus && matchesCourse
  })
  

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedStudents(filteredStudents.map(s => s.id))
    } else {
      setSelectedStudents([])
    }
  }

  const handleSelectStudent = (studentId, checked) => {a
    if (checked) {
      setSelectedStudents([...selectedStudents, studentId])
    } else {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId))
    }
  }

  // Popup handlers
  const handleViewStudent = (student) => {
    fetchStudentDetails(student.user_id || student.id);
  };
  

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

  // ✅ Update student data to backend
  const updateStudentDetails = async (updatedStudent) => {
    try {
      // FIND STUDENT BY NAME
      const foundStudent = students.find(
        (s) =>
          s.name.trim().toLowerCase() ===
          updatedStudent.name.trim().toLowerCase()
      );
  
      if (!foundStudent) {
        alert("Student not found by name");
        return;
      }
      
      if (!foundStudent.student_id) {
        console.error("❌ Missing student_id:", foundStudent);
        alert("Invalid student record. student_id missing.");
        return;
      }
  
      // FINAL PAYLOAD
      const payload = {
        student_id: Number(foundStudent.student_id),
        batch_id: updatedStudent.batch,
        status: updatedStudent.status,
      };
  
      console.log("📤 Sending Payload:", payload);
  
      // CALL API
      const resp = await putMethod({
        apiUrl: apiService.update_student,
        payload: payload,
      });
  
      console.log("Update Response:", resp);
  
      if (resp?.status) {
        setStudents((prev) =>
          prev.map((s) =>
            s.student_id === foundStudent.student_id
              ? { ...s, batch: updatedStudent.batch, status: updatedStudent.status }
              : s
          )
        );
  
        setShowEditPopup(false);
        setSelectedStudent(null);
      } else {
        alert(resp?.message || "Failed to update student");
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };
  
  
  


  return (
    <div className="p-2   min-h-screen">
      {/* Summary Cards */}
      <Horizontal4Cards 
        data={summaryCardsData}
        className="mb-5"
      />

      {/* Filters and Export */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <LuSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${TAILWIND_COLORS.TEXT_MUTED} w-4 h-4`} />
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
              <option value="enrolled">Enrolled</option>
              <option value="completed">Completed</option>
              <option value="dropped">Dropped</option>
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
                        onClick={() => handleEditStudent(student)}
                        variant="light"
                        className={`${TAILWIND_COLORS.TEXT_MUTED} hover:text-green-600 border border-gray-300 rounded-md transition-colors`}
                      >
                        <LuPencil className="w-4 h-4" />
                      </button>
                      <IconButton
                        label="Delete student"
                        onClick={() => handleDeleteStudent(student)}
                        variant="light"
                        className={`${TAILWIND_COLORS.TEXT_MUTED} hover:text-red-600 border border-gray-300 rounded-md transition-colors`}
                      >
                        <LuTrash2 className="w-4 h-4" />
                      </IconButton>
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
              <IconButton
                label="Close view student"
                onClick={handleClosePopups}
                variant="unstyled"
                className={`${TAILWIND_COLORS.TEXT_MUTED} hover:text-text-primary`}
              >
                <LuX className="w-6 h-6" />
              </IconButton>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} border-b pb-2`}>Personal Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {selectedStudent.name}</p>
                  <p><span className="font-medium">Email:</span> {selectedStudent.email}</p>
                  <p><span className="font-medium">Phone:</span> {selectedStudent.phone}</p>
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-4">
                <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} border-b pb-2`}>Academic Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Course:</span> {selectedStudent.course}</p>
                  <p><span className="font-medium">Batch:</span> {selectedStudent.batch}</p>
                </div>
              </div>

          
              {/* Skills */}
<div className="space-y-4">
  <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} border-b pb-2`}>Skills</h3>
  <div className="flex flex-wrap gap-2">
    {(selectedStudent.skills || []).map((skill, index) => (
      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
        {skill}
      </span>
    ))}
  </div>
</div>

             {/* Projects */}
<div className="space-y-4">
  <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} border-b pb-2`}>Projects</h3>
  <ul className="space-y-1">
    {(selectedStudent.projects || []).map((project, index) => (
      <li key={index} className="flex items-center">
        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
        {project}
      </li>
    ))}
  </ul>
</div>

            </div>

            <div className="mt-6 flex justify-end">
              <Button
                onClick={handleClosePopups}
                variant="neutral"
                className={TAILWIND_COLORS.TEXT_PRIMARY}
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
        <IconButton
          label="Close edit student"
          onClick={handleClosePopups}
          variant="unstyled"
          className={`${TAILWIND_COLORS.TEXT_MUTED} hover:text-text-primary`}
        >
          <LuX className="w-6 h-6" />
        </IconButton>
      </div>

      {/* ✅ updated submit logic with API */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);

          const updatedStudent = {
            ...selectedStudent,
            batch: formData.get("batch"),
            status: formData.get("status"),
          };

          updateStudentDetails(updatedStudent);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Name */}
          <div>
            <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>
              Name
            </label>
            <input
              type="text"
              value={selectedStudent.name}
              disabled
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Email */}
          <div>
            <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>
              Email
            </label>
            <input
              type="email"
              value={selectedStudent.email}
              disabled
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Phone */}
          <div>
            <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>
              Phone
            </label>
            <input
              type="tel"
              value={selectedStudent.phone}
              disabled
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Course */}
          <div>
            <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>
              Course
            </label>
            <select
              value={selectedStudent.course}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
            >
              <option>{selectedStudent.course}</option>
            </select>
          </div>

          {/* Batch (editable) */}
          <div>
            <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>
              Batch
            </label>
            <select
              name="batch"
              defaultValue={selectedStudent.batch || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="" disabled>Select batch</option>
              {batchOptions.map((batch) => (
                <option key={batch} value={batch}>
                  {batch}
                </option>
              ))}
            </select>
          </div>

          {/* Status (editable) */}
          <div>
            <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>
              Status
            </label>
            <select
              name="status"
              defaultValue={selectedStudent.status}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="Enrolled">Enrolled</option>
              <option value="Completed">Completed</option>
              <option value="Dropped">Dropped</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          <Button
            type="button"
            onClick={handleClosePopups}
            variant="neutral"
            className={TAILWIND_COLORS.TEXT_PRIMARY}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary">
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
                className={TAILWIND_COLORS.TEXT_PRIMARY}
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
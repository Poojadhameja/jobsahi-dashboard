import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LuSearch, LuChevronDown, LuCalendar, LuEye, LuPencil, LuTrash2, LuBuilding, LuRefreshCw } from 'react-icons/lu'
import { useCourseContext } from '../../context/CourseContext'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'
import ViewCoursePopup from './ViewCoursePopup'
import EditCoursePopup from './EditCoursePopup'
import { getMethod } from '../../../../service/api'
import apiService from '../../services/serviceUrl'

export default function ManageCourse({ onNavigateToCreateCourse }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { deleteCourse, updateCourse } = useCourseContext()
  
  const [coursesData, setCoursesData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    status: '',
    fields: '',
    skills: '',
    launchingDate: ''
  })
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showViewPopup, setShowViewPopup] = useState(false)
  const [showEditPopup, setShowEditPopup] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [courseToDelete, setCourseToDelete] = useState(null)

  // ✅ Fetch courses on component mount
  useEffect(() => {
    fetchCourses()
    
    // Show success message if redirected from create course
    if (location.state?.message) {
      setTimeout(() => {
        alert(location.state.message)
        // Clear the state
        window.history.replaceState({}, document.title)
      }, 100)
    }
  }, [location])

  // ✅ Fetch courses from backend - UPDATED to match backend response
  const fetchCourses = async () => {
    try {
      setLoading(true)
      console.log('📡 Fetching courses...')
      
      // Build query params if needed
      const queryParams = searchTerm ? `?q=${encodeURIComponent(searchTerm)}` : ''
      const apiUrl = `${apiService.getCourses}${queryParams}`
      
      const res = await getMethod({ apiUrl })
      console.log('📥fetch data API Response:', res)

      if (res?.status && Array.isArray(res.courses)) {
        // Transform backend data to frontend format
        const transformedCourses = res.courses.map(course => ({
          id: course.id,
          instituteId: course.institute_id,
          title: course.title || '',
          description: course.description || '',
          duration: parseInt(course.duration) || 0,
          categoryId: course.category_id,
          category: getCategoryName(course.category_id),
          fee: parseFloat(course.fee) || 0,
          status: course.status || 'Active',
          instructorName: course.instructor_name || '',
          mode: course.mode || '',
          skills: course.tagged_skills
            ? course.tagged_skills.split(',').map(s => s.trim()).filter(Boolean)
            : [],
          batchLimit: course.batch_limit,
          certificationAllowed: !!course.certification_allowed,
          moduleTitle: course.module_title || '',
          moduleDescription: course.module_description || '',
          media: course.media || '',
          adminAction: course.admin_action, // Only for admin
          createdAt: course.created_at,
          updatedAt: course.updated_at,
          team: 'Institute Team'
        }))
        
        setCoursesData(transformedCourses)
        console.log('✅ Courses loaded:', transformedCourses.length)
      } else {
        console.warn('⚠️ No courses found or invalid response:', res)
        setCoursesData([])
      }
    } catch (err) {
      console.error('❌ Error fetching courses:', err)
      alert('Failed to fetch courses. Please try again.')
      setCoursesData([])
    } finally {
      setLoading(false)
    }
  }

  // Helper function to get category name from ID
  const getCategoryName = (categoryId) => {
    const categories = {
      1: 'Technical',
      2: 'Non-Technical',
      3: 'Vocational',
      4: 'Professional'
    }
    return categories[categoryId] || 'Uncategorized'
  }

  // Filter courses based on search and filters
  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !filters.status || course.status.toLowerCase() === filters.status.toLowerCase()
    const matchesFields = !filters.fields || course.category.toLowerCase().includes(filters.fields.toLowerCase())
    const matchesSkills = !filters.skills || course.skills.some(skill => 
      skill.toLowerCase().includes(filters.skills.toLowerCase())
    )
    
    return matchesSearch && matchesStatus && matchesFields && matchesSkills
  })

  const itemsPerPage = 4
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCourses = filteredCourses.slice(startIndex, endIndex)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  // ✅ Debounced search - fetch from backend
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        fetchCourses()
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [searchTerm])

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleBuyNow = (courseId) => {
    console.log('Buy now clicked for course:', courseId)
    // Implement buy now logic
  }

  const handleAction = (action, courseId) => {
    const course = coursesData.find(c => c.id === courseId)
    
    if (action === 'view') {
      setSelectedCourse(course)
      setShowViewPopup(true)
    } else if (action === 'edit') {
      setSelectedCourse(course)
      setShowEditPopup(true)
    } else if (action === 'delete') {
      setCourseToDelete(course)
      setShowDeleteConfirm(true)
    }
  }

  const handleViewClose = () => {
    setShowViewPopup(false)
    setSelectedCourse(null)
  }

  const handleEditClose = () => {
    setShowEditPopup(false)
    setSelectedCourse(null)
  }

  const handleEditSave = async (updatedCourse) => {
    try {
      // Prepare payload matching backend structure
      const payload = {
        title: updatedCourse.title,
        description: updatedCourse.description,
        duration: parseInt(updatedCourse.duration),
        fee: parseFloat(updatedCourse.fee),        
        category_id: updatedCourse.categoryId,
        tagged_skills: Array.isArray(updatedCourse.skills) 
        ? updatedCourse.skills.join(',') 
        : updatedCourse.skills,
        batch_limit: updatedCourse.batchLimit,
        status: updatedCourse.status,
        instructor_name: updatedCourse.instructorName,
        mode: updatedCourse.mode,
        certification_allowed: updatedCourse.certificationAllowed ? 1 : 0,
        module_title: updatedCourse.moduleTitle,
        module_description: updatedCourse.moduleDescription,
        media: updatedCourse.media
      }
      console.log(updatedCourse.fee );

      // Update in backend - uncomment when update API is ready
      // const res = await putMethod({ 
      //   apiUrl: `${apiService.updateCourse}/${selectedCourse.id}`, 
      //   payload 
      // })
      
      // Update local state
      setCoursesData(prev => prev.map(course => 
        course.id === selectedCourse.id ? { ...course, ...updatedCourse } : course
      ))
      
      if (updateCourse) {
        updateCourse(selectedCourse.id, updatedCourse)
      }
      
      alert('✅ Course updated successfully!')
      setShowEditPopup(false)
      setSelectedCourse(null)
      
      // Refresh from backend
      fetchCourses()
    } catch (err) {
      console.error('❌ Error updating course:', err)
      alert('Failed to update course. Please try again.')
    }
  }

  const handleDeleteConfirm = async () => {
    if (!courseToDelete) return

    try {
      console.log('🗑️ Deleting course:', courseToDelete.id)
      
      // Call backend delete API - uncomment when ready
      // const res = await deleteMethod({ 
      //   apiUrl: `${apiService.deleteCourse}/${courseToDelete.id}` 
      // })
      
      // Update local state
      setCoursesData(prev => prev.filter(course => course.id !== courseToDelete.id))
      
      if (deleteCourse) {
        deleteCourse(courseToDelete.id)
      }
      
      alert('✅ Course deleted successfully!')
      setShowDeleteConfirm(false)
      setCourseToDelete(null)
      
      // Refresh from backend
      fetchCourses()
    } catch (err) {
      console.error('❌ Error deleting course:', err)
      alert('Failed to delete course. Please try again.')
    }
  }

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false)
    setCourseToDelete(null)
  }

  const handleRefresh = () => {
    setSearchTerm('')
    setFilters({
      status: '',
      fields: '',
      skills: '',
      launchingDate: ''
    })
    fetchCourses()
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <LuRefreshCw className="w-8 h-8 animate-spin text-[#5C9A24] mx-auto mb-2" />
          <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Loading courses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="">
      {/* Header Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-[#1A569A]">All Course</h1>
          <button
            onClick={handleRefresh}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            title="Refresh courses"
          >
            <LuRefreshCw className={`w-5 h-5 ${TAILWIND_COLORS.TEXT_MUTED}`} />
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
          {/* Search Bar */}
          <div className="relative">
            <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by course name"
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C9A24] w-full lg:w-64 bg-white"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap gap-3">
            {/* Status Filter */}
            <div className="relative">
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#5C9A24] min-w-[120px]"
              >
                <option value="">Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
              <LuChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Fields Filter */}
            <div className="relative">
              <select
                value={filters.fields}
                onChange={(e) => handleFilterChange('fields', e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#5C9A24] min-w-[120px]"
              >
                <option value="">Fields</option>
                <option value="technical">Technical</option>
                <option value="non-technical">Non-Technical</option>
                <option value="vocational">Vocational</option>
                <option value="professional">Professional</option>
              </select>
              <LuChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Skills Filter */}
            <div className="relative">
              <select
                value={filters.skills}
                onChange={(e) => handleFilterChange('skills', e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#5C9A24] min-w-[120px]"
              >
                <option value="">Skills</option>
                <option value="javascript">JavaScript</option>
                <option value="react">React</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="sql">SQL</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
              </select>
              <LuChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Launching Date Filter */}
            <div className="relative">
              <input
                type="date"
                value={filters.launchingDate}
                onChange={(e) => handleFilterChange('launchingDate', e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#5C9A24] min-w-[140px]"
                placeholder="Launching Date"
              />
              <LuCalendar className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Course Count */}
      {coursesData.length > 0 && (
        <div className="mb-4">
          <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
            Showing {currentCourses.length} of {filteredCourses.length} courses
            {filteredCourses.length !== coursesData.length && ` (${coursesData.length} total)`}
          </p>
        </div>
      )}

      {/* Empty State */}
      {coursesData.length === 0 ? (
        <div className={`${TAILWIND_COLORS.CARD} p-12 text-center`}>
          <div className="max-w-md mx-auto">
            <LuBuilding className={`w-16 h-16 ${TAILWIND_COLORS.TEXT_MUTED} mx-auto mb-4`} />
            <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
              No Courses Yet
            </h3>
            <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mb-6`}>
              Start by creating your first course to get started.
            </p>
            <button
              onClick={onNavigateToCreateCourse}
              className={`${TAILWIND_COLORS.BTN_PRIMARY} px-6 py-2 rounded-lg text-sm font-medium`}
            >
              Create Course
            </button>
          </div>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className={`${TAILWIND_COLORS.CARD} p-12 text-center`}>
          <LuSearch className={`w-12 h-12 ${TAILWIND_COLORS.TEXT_MUTED} mx-auto mb-4`} />
          <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
            No Results Found
          </h3>
          <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <>
          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {currentCourses.map((course) => (
              <div key={course.id} className={`${TAILWIND_COLORS.CARD} p-6`}>
                {/* Team and Status */}
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>{course.team}</span>
                  <span className={`${
                    course.status.toLowerCase() === 'active' 
                      ? TAILWIND_COLORS.BADGE_SUCCESS 
                      : course.status.toLowerCase() === 'inactive'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  } text-xs font-medium px-2.5 py-0.5 rounded-full`}>
                    {course.status}
                  </span>
                </div>

                {/* Course Title */}
                <h3 className={`text-lg font-bold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                  {course.title}
                </h3>

                {/* Category and Mode */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <LuBuilding className={`w-4 h-4 ${TAILWIND_COLORS.TEXT_MUTED}`} />
                    <span className={`text-xs font-medium ${TAILWIND_COLORS.TEXT_MUTED} uppercase`}>
                      {course.category}
                    </span>
                  </div>
                  {course.mode && (
                    <span className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED}`}>
                      • {course.mode}
                    </span>
                  )}
                  {course.duration && (
                    <span className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED}`}>
                      • {course.duration} weeks
                    </span>
                  )}
                </div>

                {/* Skills Tags */}
                {course.skills && course.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {course.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className={`${TAILWIND_COLORS.BADGE_SUCCESS} text-xs font-medium px-2 py-1 rounded-full`}
                      >
                        {skill}
                      </span>
                    ))}
                    {course.skills.length > 3 && (
                      <span className={`${TAILWIND_COLORS.BADGE_SUCCESS} text-xs font-medium px-2 py-1 rounded-full`}>
                        +{course.skills.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Description */}
                <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mb-4 line-clamp-2`}>
                  {course.description || 'No description available'}
                </p>

                {/* Instructor */}
                {course.instructorName && (
                  <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mb-3`}>
                    Instructor: <span className="font-medium">{course.instructorName}</span>
                  </p>
                )}

                {/* fee and Actions */}
                <div className="flex items-center justify-between">
                  <div className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                    ₹{course.fee?.toLocaleString('en-IN') || '0'}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleBuyNow(course.id)}
                      className={`${TAILWIND_COLORS.BTN_PRIMARY} px-4 py-2 rounded-lg text-sm font-medium transition-colors`}
                    >
                      Buy Now
                    </button>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleAction('view', course.id)}
                        className={`p-2 ${TAILWIND_COLORS.TEXT_MUTED} hover:text-[#5C9A24] transition-colors`}
                        title="View"
                      >
                        <LuEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAction('edit', course.id)}
                        className={`p-2 ${TAILWIND_COLORS.TEXT_MUTED} hover:text-[#5C9A24] transition-colors`}
                        title="Edit"
                      >
                        <LuPencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAction('delete', course.id)}
                        className="p-2 text-error hover:text-red-700 transition-colors"
                        title="Delete"
                      >
                        <LuTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} bg-white ${TAILWIND_COLORS.BORDER} rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg ${
                    currentPage === page
                      ? 'bg-[#5C9A24] text-white'
                      : `${TAILWIND_COLORS.TEXT_MUTED} bg-white ${TAILWIND_COLORS.BORDER} hover:bg-gray-50`
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} bg-white ${TAILWIND_COLORS.BORDER} rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* View Course Popup */}
      {showViewPopup && selectedCourse && (
        <ViewCoursePopup
          course={selectedCourse}
          onClose={handleViewClose}
        />
      )}

      {/* Edit Course Popup */}
      {showEditPopup && selectedCourse && (
        <EditCoursePopup
          course={selectedCourse}
          onSave={handleEditSave}
          onClose={handleEditClose}
        />
      )}

      {/* Delete Confirmation Popup */}
      {showDeleteConfirm && courseToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${TAILWIND_COLORS.HEADER_BG} rounded-lg shadow-xl max-w-md w-full`}>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <LuTrash2 className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                    Delete Course
                  </h3>
                  <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
                    This action cannot be undone.
                  </p>
                </div>
              </div>
              <p className={`${TAILWIND_COLORS.TEXT_PRIMARY} mb-6`}>
                Are you sure you want to delete <strong>"{courseToDelete.title}"</strong>? 
                This will permanently remove the course and all its data.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleDeleteCancel}
                  className={`px-4 py-2 ${TAILWIND_COLORS.BTN_LIGHT} rounded-lg transition-colors`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

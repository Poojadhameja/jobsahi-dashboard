import React, { useState } from 'react'
import { LuSearch, LuChevronDown, LuCalendar, LuLink, LuFolder, LuPencil, LuTrash2, LuBuilding } from 'react-icons/lu'
import { MatrixCard } from '../../../../shared/components/metricCard'
import { useCourseContext } from '../../context/CourseContext'

export default function ManageCourse() {
  const { courses, deleteCourse } = useCourseContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    status: '',
    fields: '',
    skills: '',
    launchingDate: ''
  })

  // Filter courses based on search and filters
  const filteredCourses = courses.filter(course => {
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
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleBuyNow = (courseId) => {
    console.log('Buy now clicked for course:', courseId)
  }

  const handleAction = (action, courseId) => {
    if (action === 'delete') {
      if (window.confirm('Are you sure you want to delete this course?')) {
        deleteCourse(courseId)
      }
    } else {
      console.log(`${action} clicked for course:`, courseId)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-[#1A569A]">All Course</h1>
        
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
          {/* Search Bar */}
          <div className="relative">
            <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by course name"
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C9A24] w-full lg:w-64"
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
                <option value="engineering">Engineering</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="office">Office Admin</option>
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
                <option value="wiring">Wiring</option>
                <option value="safety">Safety Measures</option>
                <option value="typing">Typing Skills</option>
                <option value="office">MS Office</option>
              </select>
              <LuChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Launching Date Filter */}
            <div className="relative">
              <select
                value={filters.launchingDate}
                onChange={(e) => handleFilterChange('launchingDate', e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#5C9A24] min-w-[140px]"
              >
                <option value="">Launching Date</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
                <option value="next-month">Next Month</option>
              </select>
              <LuCalendar className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {currentCourses.map((course) => (
          <div key={course.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            {/* Team and Status */}
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-600">{course.team}</span>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {course.status}
              </span>
            </div>

            {/* Course Title */}
            <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>

            {/* Category */}
            <div className="flex items-center gap-2 mb-3">
              <LuBuilding className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-medium text-gray-600 uppercase">{course.category}</span>
            </div>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {course.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
              {course.additionalSkills > 0 && (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                  +{course.additionalSkills}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{course.description}</p>

            {/* Price and Actions */}
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-gray-900">₹{course.price}</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleBuyNow(course.id)}
                  className="bg-[#5C9A24] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#3f6c17] transition-colors"
                >
                  Buy Now
                </button>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleAction('link', course.id)}
                    className="p-2 text-gray-500 hover:text-[#5C9A24] transition-colors"
                    title="Link"
                  >
                    <LuLink className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleAction('folder', course.id)}
                    className="p-2 text-gray-500 hover:text-[#5C9A24] transition-colors"
                    title="Folder"
                  >
                    <LuFolder className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleAction('edit', course.id)}
                    className="p-2 text-gray-500 hover:text-[#5C9A24] transition-colors"
                    title="Edit"
                  >
                    <LuPencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleAction('delete', course.id)}
                    className="p-2 text-red-500 hover:text-red-700 transition-colors"
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
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

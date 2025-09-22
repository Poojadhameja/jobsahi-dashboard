import React, { useState, useEffect } from 'react'
import { 
  LuSearch, 
  LuCalendar, 
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuEye,
  LuStar,
  LuUsers,
  LuMapPin,
  LuFileText,
  LuPencil,
  LuTrash2
} from 'react-icons/lu'
import DeleteConfirmModal from './DeleteConfirmModal'
import EditCard from './EditCard'
import ViewJobModal from './ViewJobModal'

const ManageJob = ({ jobs = [], onEditJob, onDeleteJob }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6)
  const [totalItems, setTotalItems] = useState(jobs.length)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [jobToDelete, setJobToDelete] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [jobToEdit, setJobToEdit] = useState(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [jobToView, setJobToView] = useState(null)

  // Update totalItems when jobs change
  useEffect(() => {
    setTotalItems(jobs.length)
  }, [jobs])

  // Use props functions instead of local state management
  const handleDeleteClick = (job) => {
    setJobToDelete(job)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = () => {
    if (onDeleteJob && jobToDelete) {
      onDeleteJob(jobToDelete.id)
    }
    setShowDeleteModal(false)
    setJobToDelete(null)
  }

  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
    setJobToDelete(null)
  }

  const handleEditClick = (job) => {
    setJobToEdit(job)
    setShowEditModal(true)
  }

  const handleEditSave = (jobId, updatedJob) => {
    if (onEditJob) {
      onEditJob(jobId, updatedJob)
    }
    setShowEditModal(false)
    setJobToEdit(null)
  }

  const handleEditCancel = () => {
    setShowEditModal(false)
    setJobToEdit(null)
  }

  const handleViewClick = (job) => {
    setJobToView(job)
    setShowViewModal(true)
  }

  const handleViewClose = () => {
    setShowViewModal(false)
    setJobToView(null)
  }

  // Pagination logic
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 4
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= maxVisiblePages; i++) {
          pages.push(i)
        }
      } else if (currentPage >= totalPages - 1) {
        for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        for (let i = currentPage - 1; i <= currentPage + 2; i++) {
          pages.push(i)
        }
      }
    }
    
    return pages
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] p-2">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[var(--color-primary)] mb-2">All Jobs</h1>
        
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by job title, name, position"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none min-w-[120px]"
              >
                <option value="">Status</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="draft">Draft</option>
              </select>
              <LuChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>

            {/* Department Filter */}
            <div className="relative">
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none min-w-[120px]"
              >
                <option value="">Department</option>
                <option value="technical">Technical</option>
                <option value="mechanical">Mechanical</option>
                <option value="electrical">Electrical</option>
                <option value="civil">Civil</option>
              </select>
              <LuChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>

            {/* Location Filter */}
            <div className="relative">
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none min-w-[120px]"
              >
                <option value="">Location</option>
                <option value="madhya-pradesh">Madhya Pradesh</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="indore">Indore</option>
                <option value="nagpur">Nagpur</option>
              </select>
              <LuChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>

            {/* Posted Date Filter */}
            <div className="relative">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none min-w-[140px]"
              >
                <option value="">Posted Date</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              <LuCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-secondary)] text-white">
                    {job.status}
                  </span>
                  <span className="text-sm text-gray-500">{job.company}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <LuEye size={16} />
                    <span>{job.views}</span>
                  </div>
                  <div className="text-[var(--color-secondary)] font-medium">{job.salary}</div>
                </div>
              </div>
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-500">Logo</span>
              </div>
            </div>

            {/* Application Dates */}
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary-10 text-[var(--color-secondary)]">
                {job.openingDate}
              </span>
              <span className="text-gray-400">to</span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary-10 text-[var(--color-secondary)]">
                {job.closingDate}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {job.description}
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <LuMapPin size={16} className='text-error' />
              <span>{job.location}</span>
            </div>

            {/* Metrics and Actions */}
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <div className="flex items-center gap-1 bg-[var(--color-secondary)] text-white p-1 pe-2 rounded-full text-xs font-medium">
                  <div className="bg-white text-[var(--color-secondary)] w-6 h-6 rounded-full flex items-center justify-center">{job.instaMatch}</div>
                  <LuStar size={14} />
                  <span> InstaMatch</span>
                </div>
                <div className="flex items-center gap-1 bg-[var(--color-secondary)] text-white p-1 pe-2 rounded-full text-xs font-medium">
                  <div className="bg-white text-[var(--color-secondary)] w-6 h-6 rounded-full flex items-center justify-center">{job.applicants}</div>
                  <LuUsers size={14} />
                  <span> Applicants</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => handleViewClick(job)}
                  className="p-2 text-gray-400 hover:text-[var(--color-secondary)] hover:bg-secondary-10 rounded-lg transition-colors"
                >
                  <LuFileText size={18} />
                </button>
                <button 
                  onClick={() => handleEditClick(job)}
                  className="p-2 text-gray-400 hover:text-[var(--color-secondary)] hover:bg-secondary-10 rounded-lg transition-colors"
                >
                  <LuPencil size={18} />
                </button>
                <button 
                  onClick={() => handleDeleteClick(job)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LuTrash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
        {/* Showing data info */}
        <div className="text-sm text-gray-600">
          Showing {startItem} from {totalItems} data
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentPage === 1
                ? 'text-[var(--color-primary)] cursor-not-allowed'
                : 'text-[var(--color-primary)] hover:bg-[var(--color-primary)1A]'
            }`}
          >
            <LuChevronLeft size={16} />
            <span>Previous</span>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1 bg-[var(--color-primary)1A] rounded-full p-1 md:px-4">
            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  pageNum === currentPage
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'text-[var(--color-primary)] hover:bg-[var(--color-primary)1A]'
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentPage === totalPages
                ? 'text-[var(--color-primary)] cursor-not-allowed'
                : 'text-[var(--color-primary)] hover:bg-[var(--color-primary)1A]'
            }`}
          >
            <span>Next</span>
            <LuChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        jobTitle={jobToDelete?.title}
      />

      {/* Edit Card Modal */}
      <EditCard
        isOpen={showEditModal}
        onClose={handleEditCancel}
        job={jobToEdit}
        onSave={handleEditSave}
      />

      {/* View Job Modal */}
      <ViewJobModal
        isOpen={showViewModal}
        onClose={handleViewClose}
        job={jobToView}
      />
    </div>
  )
}

export default ManageJob

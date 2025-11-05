// import React, { useState, useEffect } from 'react'
// import { 
//   LuSearch, 
//   LuCalendar, 
//   LuChevronDown,
//   LuChevronLeft,
//   LuChevronRight,
//   LuEye,
//   LuStar,
//   LuUsers,
//   LuMapPin,
//   LuFileText,
//   LuPencil,
//   LuTrash2
// } from 'react-icons/lu'
// import DeleteConfirmModal from './DeleteConfirmModal'
// import EditCard from './EditCard'
// import ViewJobModal from './ViewJobModal'

// const ManageJob = ({ jobs = [], onEditJob, onDeleteJob }) => {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [statusFilter, setStatusFilter] = useState('')
//   const [departmentFilter, setDepartmentFilter] = useState('')
//   const [locationFilter, setLocationFilter] = useState('')
//   const [dateFilter, setDateFilter] = useState('')
//   const [currentPage, setCurrentPage] = useState(1)
//   const [itemsPerPage] = useState(6)
//   const [totalItems, setTotalItems] = useState(jobs.length)
//   const [showDeleteModal, setShowDeleteModal] = useState(false)
//   const [jobToDelete, setJobToDelete] = useState(null)
//   const [showEditModal, setShowEditModal] = useState(false)
//   const [jobToEdit, setJobToEdit] = useState(null)
//   const [showViewModal, setShowViewModal] = useState(false)
//   const [jobToView, setJobToView] = useState(null)

//   // Update totalItems when jobs change
//   useEffect(() => {
//     setTotalItems(jobs.length)
//   }, [jobs])

//   // Use props functions instead of local state management
//   const handleDeleteClick = (job) => {
//     setJobToDelete(job)
//     setShowDeleteModal(true)
//   }

//   const handleDeleteConfirm = () => {
//     if (onDeleteJob && jobToDelete) {
//       onDeleteJob(jobToDelete.id)
//     }
//     setShowDeleteModal(false)
//     setJobToDelete(null)
//   }

//   const handleDeleteCancel = () => {
//     setShowDeleteModal(false)
//     setJobToDelete(null)
//   }

//   const handleEditClick = (job) => {
//     setJobToEdit(job)
//     setShowEditModal(true)
//   }

//   const handleEditSave = (jobId, updatedJob) => {
//     if (onEditJob) {
//       onEditJob(jobId, updatedJob)
//     }
//     setShowEditModal(false)
//     setJobToEdit(null)
//   }

//   const handleEditCancel = () => {
//     setShowEditModal(false)
//     setJobToEdit(null)
//   }

//   const handleViewClick = (job) => {
//     setJobToView(job)
//     setShowViewModal(true)
//   }

//   const handleViewClose = () => {
//     setShowViewModal(false)
//     setJobToView(null)
//   }

//   // Pagination logic
//   const totalPages = Math.ceil(totalItems / itemsPerPage)
//   const startItem = (currentPage - 1) * itemsPerPage + 1
//   const endItem = Math.min(currentPage * itemsPerPage, totalItems)

//   const handlePageChange = (page) => {
//     setCurrentPage(page)
//   }

//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1)
//     }
//   }

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1)
//     }
//   }

//   // Generate page numbers to display
//   const getPageNumbers = () => {
//     const pages = []
//     const maxVisiblePages = 4
    
//     if (totalPages <= maxVisiblePages) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i)
//       }
//     } else {
//       if (currentPage <= 2) {
//         for (let i = 1; i <= maxVisiblePages; i++) {
//           pages.push(i)
//         }
//       } else if (currentPage >= totalPages - 1) {
//         for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
//           pages.push(i)
//         }
//       } else {
//         for (let i = currentPage - 1; i <= currentPage + 2; i++) {
//           pages.push(i)
//         }
//       }
//     }
    
//     return pages
//   }

//   return (
//     <div className="min-h-screen bg-[var(--color-bg-primary)] p-2">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-semibold text-[var(--color-primary)] mb-2">All Jobs</h1>
        
//         {/* Search and Filters */}
//         <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
//           {/* Search Bar */}
//           <div className="relative flex-1 max-w-md">
//             <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="text"
//               placeholder="Search by job title, name, position"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
//             />
//           </div>

//           {/* Filters */}
//           <div className="flex flex-wrap gap-3">
//             {/* Status Filter */}
//             <div className="relative">
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none min-w-[120px]"
//               >
//                 <option value="">Status</option>
//                 <option value="open">Open</option>
//                 <option value="closed">Closed</option>
//                 <option value="draft">Draft</option>
//               </select>
//               <LuChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
//             </div>

//             {/* Department Filter */}
//             <div className="relative">
//               <select
//                 value={departmentFilter}
//                 onChange={(e) => setDepartmentFilter(e.target.value)}
//                 className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none min-w-[120px]"
//               >
//                 <option value="">Department</option>
//                 <option value="technical">Technical</option>
//                 <option value="mechanical">Mechanical</option>
//                 <option value="electrical">Electrical</option>
//                 <option value="civil">Civil</option>
//               </select>
//               <LuChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
//             </div>

//             {/* Location Filter */}
//             <div className="relative">
//               <select
//                 value={locationFilter}
//                 onChange={(e) => setLocationFilter(e.target.value)}
//                 className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none min-w-[120px]"
//               >
//                 <option value="">Location</option>
//                 <option value="madhya-pradesh">Madhya Pradesh</option>
//                 <option value="maharashtra">Maharashtra</option>
//                 <option value="indore">Indore</option>
//                 <option value="nagpur">Nagpur</option>
//               </select>
//               <LuChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
//             </div>

//             {/* Posted Date Filter */}
//             <div className="relative">
//               <select
//                 value={dateFilter}
//                 onChange={(e) => setDateFilter(e.target.value)}
//                 className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none min-w-[140px]"
//               >
//                 <option value="">Posted Date</option>
//                 <option value="today">Today</option>
//                 <option value="week">This Week</option>
//                 <option value="month">This Month</option>
//                 <option value="year">This Year</option>
//               </select>
//               <LuCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Job Cards Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {jobs.map((job) => (
//           <div key={job.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
//             <div className="flex justify-between items-start mb-4">
//               <div className="flex-1">
//                 <div className="flex items-center gap-2 mb-2">
//                   <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-secondary)] text-white">
//                     {job.status}
//                   </span>
//                   <span className="text-sm text-gray-500">{job.company}</span>
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
//                 <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
//                   <div className="flex items-center gap-1">
//                     <LuEye size={16} />
//                     <span>{job.views}</span>
//                   </div>
//                   <div className="text-[var(--color-secondary)] font-medium">{job.salary}</div>
//                 </div>
//               </div>
//               <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
//                 <span className="text-xs text-gray-500">Logo</span>
//               </div>
//             </div>

//             {/* Application Dates */}
//             <div className="flex gap-2 mb-4">
//               <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary-10 text-[var(--color-secondary)]">
//                 {job.openingDate}
//               </span>
//               <span className="text-gray-400">to</span>
//               <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary-10 text-[var(--color-secondary)]">
//                 {job.closingDate}
//               </span>
//             </div>

//             {/* Description */}
//             <p className="text-gray-600 text-sm mb-4 line-clamp-3">
//               {job.description}
//             </p>

//             {/* Location */}
//             <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
//               <LuMapPin size={16} className='text-error' />
//               <span>{job.location}</span>
//             </div>

//             {/* Metrics and Actions */}
//             <div className="flex justify-between items-center">
//               <div className="flex gap-3">
//                 <div className="flex items-center gap-1 bg-[var(--color-secondary)] text-white p-1 pe-2 rounded-full text-xs font-medium">
//                   <div className="bg-white text-[var(--color-secondary)] w-6 h-6 rounded-full flex items-center justify-center">{job.instaMatch}</div>
//                   <LuStar size={14} />
//                   <span> InstaMatch</span>
//                 </div>
//                 <div className="flex items-center gap-1 bg-[var(--color-secondary)] text-white p-1 pe-2 rounded-full text-xs font-medium">
//                   <div className="bg-white text-[var(--color-secondary)] w-6 h-6 rounded-full flex items-center justify-center">{job.applicants}</div>
//                   <LuUsers size={14} />
//                   <span> Applicants</span>
//                 </div>
//               </div>

//               <div className="flex gap-2">
//                 <button 
//                   onClick={() => handleViewClick(job)}
//                   className="p-2 text-gray-400 hover:text-[var(--color-secondary)] hover:bg-secondary-10 rounded-lg transition-colors"
//                 >
//                   <LuFileText size={18} />
//                 </button>
//                 <button 
//                   onClick={() => handleEditClick(job)}
//                   className="p-2 text-gray-400 hover:text-[var(--color-secondary)] hover:bg-secondary-10 rounded-lg transition-colors"
//                 >
//                   <LuPencil size={18} />
//                 </button>
//                 <button 
//                   onClick={() => handleDeleteClick(job)}
//                   className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                 >
//                   <LuTrash2 size={18} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
//         {/* Showing data info */}
//         <div className="text-sm text-gray-600">
//           Showing {startItem} from {totalItems} data
//         </div>

//         {/* Pagination Controls */}
//         <div className="flex items-center gap-2">
//           {/* Previous Button */}
//           <button
//             onClick={handlePrevious}
//             disabled={currentPage === 1}
//             className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//               currentPage === 1
//                 ? 'text-[var(--color-primary)] cursor-not-allowed'
//                 : 'text-[var(--color-primary)] hover:bg-[var(--color-primary)1A]'
//             }`}
//           >
//             <LuChevronLeft size={16} />
//             <span>Previous</span>
//           </button>

//           {/* Page Numbers */}
//           <div className="flex items-center gap-1 bg-[var(--color-primary)1A] rounded-full p-1 md:px-4">
//             {getPageNumbers().map((pageNum) => (
//               <button
//                 key={pageNum}
//                 onClick={() => handlePageChange(pageNum)}
//                 className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
//                   pageNum === currentPage
//                     ? 'bg-[var(--color-primary)] text-white'
//                     : 'text-[var(--color-primary)] hover:bg-[var(--color-primary)1A]'
//                 }`}
//               >
//                 {pageNum}
//               </button>
//             ))}
//           </div>

//           {/* Next Button */}
//           <button
//             onClick={handleNext}
//             disabled={currentPage === totalPages}
//             className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//               currentPage === totalPages
//                 ? 'text-[var(--color-primary)] cursor-not-allowed'
//                 : 'text-[var(--color-primary)] hover:bg-[var(--color-primary)1A]'
//             }`}
//           >
//             <span>Next</span>
//             <LuChevronRight size={16} />
//           </button>
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       <DeleteConfirmModal
//         isOpen={showDeleteModal}
//         onClose={handleDeleteCancel}
//         onConfirm={handleDeleteConfirm}
//         jobTitle={jobToDelete?.title}
//       />

//       {/* Edit Card Modal */}
//       <EditCard
//         isOpen={showEditModal}
//         onClose={handleEditCancel}
//         job={jobToEdit}
//         onSave={handleEditSave}
//       />

//       {/* View Job Modal */}
//       <ViewJobModal
//         isOpen={showViewModal}
//         onClose={handleViewClose}
//         job={jobToView}
//       />
//     </div>
//   )
// }

// export default ManageJob

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
import { getMethod, deleteMethod } from "../../../../service/api"
import service from "../../services/serviceUrl"

function stripHtml(html = '') {
  return html.replace(/<[^>]+>/g, '').trim()
}

function money(x) {
  if (x == null || x === '') return '—'
  const n = Number(x)
  return isNaN(n) ? x : `₹${n.toLocaleString('en-IN')}`
}

const ManageJob = () => {
  // ✅ UI States
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [jobToDelete, setJobToDelete] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [jobToEdit, setJobToEdit] = useState(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [jobToView, setJobToView] = useState(null)

  // ✅ Fetch jobs from API
  const fetchJobs = async () => {
    try {
      const res = await getMethod({ apiUrl: service.getJobs })
      const rows = res?.data ?? res?.rows ?? []
      setJobs(Array.isArray(rows) ? rows : [])
    } catch (err) {
      console.error("Jobs load error:", err)
      setError("Failed to load jobs")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  // ✅ Delete job
  // const handleDeleteClick = (job) => {
  //   setJobToDelete(job)
  //   setShowDeleteModal(true)
  // }

  const handleDeleteConfirm = async () => {
    try {
      if (jobToDelete?.id) {
        await deleteMethod({ apiUrl: `${service.deleteJob}?job_id=${jobToDelete.id}` })
        await fetchJobs()
      }
    } catch (err) {
      console.error("Delete error:", err)
    } finally {
      setShowDeleteModal(false)
      setJobToDelete(null)
    }
  }

  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
    setJobToDelete(null)
  }

  // ✅ Edit & View handlers
  const handleEditClick = (job) => {
    setJobToEdit(job)
    setShowEditModal(true)
  }

  const handleEditSave = async () => {
    await fetchJobs()
    setShowEditModal(false)
  }

  const handleEditCancel = () => setShowEditModal(false)

  const handleViewClick = (job) => {
    setJobToView(job)
    setShowViewModal(true)
  }

  const handleViewClose = () => setShowViewModal(false)

  // ✅ Pagination logic
  const totalItems = jobs.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startItem = (currentPage - 1) * itemsPerPage
  const endItem = startItem + itemsPerPage
  const currentJobs = jobs.slice(startItem, endItem)

  const handlePageChange = (page) => setCurrentPage(page)
  const handlePrevious = () => setCurrentPage(p => Math.max(p - 1, 1))
  const handleNext = () => setCurrentPage(p => Math.min(p + 1, totalPages))

  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 4
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else if (currentPage <= 2) {
      pages.push(1, 2, 3, 4)
    } else if (currentPage >= totalPages - 1) {
      for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
    } else {
      for (let i = currentPage - 1; i <= currentPage + 2; i++) pages.push(i)
    }
    return pages
  }

  // ✅ Loader and error states
  if (loading) return <div className="p-4 text-gray-600">Loading jobs…</div>
  if (error) return <div className="p-4 text-red-600">{error}</div>
  if (!jobs.length) return <div className="p-4 text-gray-600">No jobs found.</div>

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] p-2">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[var(--color-primary)] mb-2">All Jobs</h1>

        {/* Search & Filters (kept same) */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
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

            {/* Location Filter */}
            <div className="relative">
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none min-w-[120px]"
              >
                <option value="">Location</option>
                <option value="Indore">Indore</option>
                <option value="Bhopal">Bhopal</option>
                <option value="Pune">Pune</option>
              </select>
              <LuChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>

            {/* Date Filter */}
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
              </select>
              <LuCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {currentJobs.map((job) => {
          const salary = `${money(job.salary_min)} – ${money(job.salary_max)}`
          const desc = stripHtml(job.description || '').slice(0, 150)

          return (
            <div key={job.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-secondary)] text-white">
                      {job.status || 'Open'}
                    </span>
                    <span className="text-sm text-gray-500">{job.company_name}</span>
                     {job.admin_action && (
                      <span
                        className={`inline-block mt-1 px-2.5 py-1 text-xs font-medium rounded-full ${
                          job.admin_action === 'approved'
                            ? 'bg-green-100 text-green-700'
                            : job.admin_action === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {job.admin_action === 'approved'
                          ? '✅ Approved by Admin'
                          : job.admin_action === 'pending'
                          ? '⏳ Pending Approval'
                          : job.admin_action}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <LuEye size={16} />
                      <span>{job.views}</span>
                    </div>
                    <div className="text-[var(--color-secondary)] font-medium">{salary}</div>
                  </div>
                </div>

                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-gray-500">Logo</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{desc}</p>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <LuMapPin size={16} className='text-error' />
                <span>{job.location}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-3">
                  <div className="flex items-center gap-1 bg-[var(--color-secondary)] text-white p-1 pe-2 rounded-full text-xs font-medium">
                    <div className="bg-white text-[var(--color-secondary)] w-6 h-6 rounded-full flex items-center justify-center">
                      {job.no_of_vacancies ?? 0}
                    </div>
                    <LuUsers size={14} />
                    <span> Vacancies</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => handleViewClick(job)} className="p-2 text-gray-400 hover:text-[var(--color-secondary)] hover:bg-secondary-10 rounded-lg transition-colors">
                    <LuFileText size={18} />
                  </button>
                  <button onClick={() => handleEditClick(job)} className="p-2 text-gray-400 hover:text-[var(--color-secondary)] hover:bg-secondary-10 rounded-lg transition-colors">
                    <LuPencil size={18} />
                  </button>
                  {/* <button onClick={() => handleDeleteClick(job)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <LuTrash2 size={18} />
                  </button> */}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
        <div className="text-sm text-gray-600">Showing {currentPage} of {totalPages} pages</div>
        <div className="flex items-center gap-2">
          <button onClick={handlePrevious} disabled={currentPage === 1} className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50">
            <LuChevronLeft size={16} />
          </button>
          {getPageNumbers().map(num => (
            <button key={num} onClick={() => handlePageChange(num)} className={`px-3 py-2 rounded-lg text-sm font-medium ${num === currentPage ? 'bg-[var(--color-primary)] text-white' : 'border border-gray-300 text-gray-600 hover:bg-gray-100'}`}>
              {num}
            </button>
          ))}
          <button onClick={handleNext} disabled={currentPage === totalPages} className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50">
            <LuChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Modals */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        jobTitle={jobToDelete?.title}
      />

      <EditCard
        isOpen={showEditModal}
        onClose={handleEditCancel}
        job={jobToEdit}
        onSave={handleEditSave}
      />

      <ViewJobModal
        isOpen={showViewModal}
        onClose={handleViewClose}
        job={jobToView}
      />
    </div>
  )
}

export default ManageJob

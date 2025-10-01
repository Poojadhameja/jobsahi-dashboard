import React, { useState } from 'react'
import { LuSearch, LuFilter, LuChevronDown, LuDownload, LuArrowRight, LuMessageCircle, LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import CustomDataTable from './CustomDataTable'
import ViewDetailsModal from './ViewDetailsModal'
import EditCandidateModal from './EditCandidateModal'

const ViewApplicants = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCandidates, setSelectedCandidates] = useState([])
  const [currentPage, setCurrentPage] = useState(3)
  const [showFilters, setShowFilters] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingCandidate, setEditingCandidate] = useState(null)
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(false)
  const [applicants, setApplicants] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      qualification: 'MS Computer Science',
      university: 'Stanford University',
      graduationYear: '2022',
      currentPosition: 'Senior Software Engineer',
      company: 'Tech Corp',
      experience: '3 years',
      skills: 'React, Java, +2',
      appliedFor: 'Assistant Electrical',
      jobId: 'AE-2024-001',
      appliedDate: '2024-01-15',
      expectedSalary: '$80,000 - $90,000',
      noticePeriod: '2 weeks',
      availability: 'Immediate',
      source: 'LinkedIn',
      status: 'Shortlisted'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      qualification: 'BS Electrical Engineering',
      skills: 'Python, C++, +1',
      appliedFor: 'Assistant Electrical',
      status: 'Shortlisted'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      qualification: 'MS Computer Science',
      skills: 'React, Java, +2',
      appliedFor: 'Assistant Electrical',
      status: 'Shortlisted'
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david.kim@email.com',
      qualification: 'BS Electrical Engineering',
      skills: 'Python, C++, +1',
      appliedFor: 'Assistant Electrical',
      status: 'Shortlisted'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      email: 'lisa.wang@email.com',
      qualification: 'MS Computer Science',
      skills: 'React, Java, +2',
      appliedFor: 'Assistant Electrical',
      status: 'Shortlisted'
    },
    {
      id: 6,
      name: 'James Brown',
      email: 'james.brown@email.com',
      qualification: 'BS Electrical Engineering',
      skills: 'Python, C++, +1',
      appliedFor: 'Assistant Electrical',
      status: 'Shortlisted'
    },
    {
      id: 7,
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      qualification: 'MS Computer Science',
      skills: 'React, Java, +2',
      appliedFor: 'Assistant Electrical',
      status: 'Shortlisted'
    }
  ])

  // Define actions for DataTable (empty array to hide action buttons)
  const actions = []


  const handleMoveToStage = () => {
    console.log('Move to stage:', selectedCandidates)
  }

  const handleSendMessage = () => {
    console.log('Send message to:', selectedCandidates)
  }

  const handleExportSelected = () => {
    console.log('Export selected:', selectedCandidates)
  }

  const handleExportAll = () => {
    console.log('Export all applicants')
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleViewDetails = (row) => {
    console.log('View details for:', row.name)
    setSelectedCandidate(row)
    setIsViewModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsViewModalOpen(false)
    setSelectedCandidate(null)
  }

  const handleDownloadCV = (row) => {
    console.log('Download CV for:', row.name)
    
    // Create a simple text file with candidate details
    const candidateData = `
Candidate Information
====================
Name: ${row.name}
Email: ${row.email}
Phone: ${row.phone || 'Not provided'}
Location: ${row.location || 'Not provided'}
Qualification: ${row.qualification}
University: ${row.university || 'Not provided'}
Current Position: ${row.currentPosition || 'Not provided'}
Company: ${row.company || 'Not provided'}
Experience: ${row.experience || 'Not provided'}
Skills: ${row.skills}
Applied For: ${row.appliedFor}
Job ID: ${row.jobId || 'Not provided'}
Applied Date: ${row.appliedDate || 'Not provided'}
Expected Salary: ${row.expectedSalary || 'Not provided'}
Notice Period: ${row.noticePeriod || 'Not provided'}
Availability: ${row.availability || 'Not provided'}
Source: ${row.source || 'Not provided'}
Status: ${row.status}
    `.trim()

    // Create and download the file
    const blob = new Blob([candidateData], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${row.name.replace(/\s+/g, '_')}_CV.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  const handleEdit = (row) => {
    console.log('Edit candidate:', row.name)
    setEditingCandidate(row)
    setIsEditModalOpen(true)
  }

  const handleSaveEdit = (updatedData) => {
    console.log('Saving candidate:', updatedData.name)
    
    // Update the candidate in the applicants array
    setApplicants(prevApplicants => 
      prevApplicants.map(applicant => 
        applicant.id === editingCandidate.id 
          ? { ...applicant, ...updatedData }
          : applicant
      )
    )
    
    console.log(`${updatedData.name} has been updated successfully.`)
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setEditingCandidate(null)
  }

  const handleDelete = (row) => {
    console.log('Delete candidate:', row.name)
    
    // Show confirmation dialog
    const confirmed = window.confirm(`Are you sure you want to delete ${row.name}? This action cannot be undone.`)
    
    if (confirmed) {
      // Remove the candidate from the applicants array
      setApplicants(prevApplicants => 
        prevApplicants.filter(applicant => applicant.id !== row.id)
      )
      
      // Also remove from selected candidates if it was selected
      setSelectedCandidates(prevSelected => 
        prevSelected.filter(id => id !== row.id)
      )
      
      console.log(`${row.name} has been deleted successfully.`)
    }
  }

  const handleShortlist = (row) => {
    console.log('Shortlist candidate:', row.name)
    
    // Update the candidate's status to 'Shortlisted'
    setApplicants(prevApplicants => 
      prevApplicants.map(applicant => 
        applicant.id === row.id 
          ? { ...applicant, status: 'Shortlisted' }
          : applicant
      )
    )
    
    console.log(`${row.name} has been shortlisted.`)
  }

  const selectedCount = selectedCandidates.length

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-[var(--color-primary)]">View Applicants</h1>
        
        <div className="flex items-center gap-4">
          {/* Auto Scroll Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Auto Scroll</span>
            <button
              type="button"
              onClick={() => setAutoScrollEnabled(!autoScrollEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                autoScrollEnabled ? '' : 'bg-gray-200 focus:ring-gray-400'
              }`}
              style={{
                backgroundColor: autoScrollEnabled ? '#5C9A24' : undefined,
                focusRingColor: autoScrollEnabled ? '#5C9A24' : undefined
              }}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${
                  autoScrollEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <button
            onClick={handleExportAll}
            className="px-6 py-3 bg-[var(--color-secondary)] text-white rounded-lg hover:bg-secondary-dark transition-colors font-medium flex items-center gap-2"
          >
            <LuDownload size={20} />
            EXPORT ALL
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search candidates"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
          />
        </div>

        {/* Filters Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <LuFilter size={20} />
          <span>Filters</span>
          <LuChevronDown size={16} />
        </button>
      </div>

      {/* Selection Bar */}
      {selectedCount > 0 && (
        <div className="bg-gray-100 rounded-lg p-4 mb-6 flex items-center justify-between">
          <span className="text-gray-700 font-medium">
            {selectedCount} candidate{selectedCount > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={handleMoveToStage}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <LuArrowRight size={16} />
              Move to Stage
              <LuChevronDown size={16} />
            </button>
            <button
              onClick={handleSendMessage}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <LuMessageCircle size={16} />
              Send Message
            </button>
            <button
              onClick={handleExportSelected}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <LuDownload size={16} />
              Export Selected
            </button>
          </div>
        </div>
      )}

      {/* Custom DataTable */}
      <CustomDataTable
        title=""
        data={applicants}
        showHeader={false}
        onViewDetails={handleViewDetails}
        onDownloadCV={handleDownloadCV}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onShortlist={handleShortlist}
      />

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-700">
          Showing 10 from 160 data
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            <LuChevronLeft size={16} />
            Previous
          </button>
          
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === page
                  ? 'bg-[var(--color-secondary)] text-white'
                  : 'border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === 4}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            Next
            <LuChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* View Details Modal */}
      <ViewDetailsModal
        isOpen={isViewModalOpen}
        onClose={handleCloseModal}
        candidate={selectedCandidate}
      />

      {/* Edit Candidate Modal */}
      <EditCandidateModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        candidate={editingCandidate}
        onSave={handleSaveEdit}
      />
    </div>
  )
}

export default ViewApplicants
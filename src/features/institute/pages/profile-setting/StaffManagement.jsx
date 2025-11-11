import React, { useState } from 'react'
import { LuPlus, LuSearch, LuFilter, LuPencil, LuTrash2, LuUserPlus } from 'react-icons/lu'
import Button from '../../../../shared/components/Button'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'

export default function StaffManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editingInstructor, setEditingInstructor] = useState(null)
  const [deletingInstructor, setDeletingInstructor] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Instructor'                // TODO: Add role
  })

  // Mock data for instructors (matching the image)
  const [instructors, setInstructors] = useState([
    {
      id: 1,
      name: 'Prof. Rajesh',
      email: 'sarah.johnson@institute.edu',
      phone: '8833938882',
      role: 'Instructor',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      email: 'sarah.johnson@institute.edu',
      phone: '9876543210',
      role: 'Instructor',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Lisa Rodriguez',
      email: 'lisa.rodriguez@institute.edu',
      phone: '7654321098',
      role: 'Instructor',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Prof. Rajesh',
      email: 'sarah.johnson@institute.edu',
      phone: '8765432109',
      role: 'Instructor',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Prof. Michael Chen',
      email: 'sarah.johnson@institute.edu',
      phone: '9012345678',
      role: 'Instructor',
      status: 'Active'
    },
    {
      id: 6,
      name: 'Lisa Rodriguez',
      email: 'lisa.rodriguez@institute.edu',
      phone: '8901234567',
      role: 'Instructor',
      status: 'Active'
    },
    {
      id: 7,
      name: 'Prof. Rajesh',
      email: 'sarah.johnson@institute.edu',
      phone: '7890123456',
      role: 'Instructor',
      status: 'Active'
    },
    {
      id: 8,
      name: 'Prof. Michael Chen',
      email: 'sarah.johnson@institute.edu',
      phone: '9123456780',
      role: 'Instructor',
      status: 'Active'
    },
    {
      id: 9,
      name: 'Lisa Rodriguez',
      email: 'lisa.rodriguez@institute.edu',
      phone: '8234567890',
      role: 'Instructor',
      status: 'Active'
    }
  ])

  const filteredInstructors = instructors.filter(instructor =>
    instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    instructor.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Handler functions
  const handleAddInstructor = () => {
    setFormData({ name: '', email: '', phone: '', role: 'Instructor' })
    setShowAddModal(true)
  }

  const handleEditInstructor = (instructor) => {
    setEditingInstructor(instructor)
    setFormData({
      name: instructor.name,
      email: instructor.email,
      phone: instructor.phone,                // TODO: Add phone number
      role: instructor.role                // TODO: Add role
    })
    setShowEditModal(true)
  }

  const handleDeleteInstructor = (instructor) => {
    setDeletingInstructor(instructor)
    setShowDeleteModal(true)
  }

  const handleSaveInstructor = () => {
    if (editingInstructor) {
      // Update existing instructor
      setInstructors(prev => prev.map(inst => 
        inst.id === editingInstructor.id 
          ? { ...inst, ...formData }
          : inst
      ))
      setShowEditModal(false)
      setEditingInstructor(null)
    } else {
      // Add new instructor
      const newInstructor = {
        id: Math.max(...instructors.map(i => i.id)) + 1,
        ...formData,
        status: 'Active'
      }
      setInstructors(prev => [...prev, newInstructor])
      setShowAddModal(false)
    }
    setFormData({ name: '', email: '', phone: '',   role: 'Instructor' })
  }

  const handleConfirmDelete = () => {
    setInstructors(prev => prev.filter(inst => inst.id !== deletingInstructor.id))
    setShowDeleteModal(false)
    setDeletingInstructor(null)
  }

  const handleCancelModal = () => {
    setShowAddModal(false)
    setShowEditModal(false)
    setShowDeleteModal(false)
    setEditingInstructor(null)
    setDeletingInstructor(null)
    setFormData({ name: '', email: '', phone: '', role: 'Instructor' })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    // Validate phone number to only accept 10 digits
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '') // Remove non-numeric characters
      if (numericValue.length <= 10) {
        setFormData(prev => ({ ...prev, [name]: numericValue }))
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  return (
    <div className={`min-h-screen ${TAILWIND_COLORS.BG_PRIMARY}`}>
      {/* Header Section */}
      <div className={`${TAILWIND_COLORS.HEADER_BG} border-b ${TAILWIND_COLORS.BORDER} px-6 py-4`}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Institute Profile</h1>
            <p className={`${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>Institute Performance Dashboard</p>
          </div>
          <Button
            onClick={handleAddInstructor}
            variant="secondary"
            size="md"
            icon={<LuPlus className="w-4 h-4" />}
          >
            Add Instructor
          </Button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className={`${TAILWIND_COLORS.HEADER_BG} border-b ${TAILWIND_COLORS.BORDER} px-6 py-4`}>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <LuSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${TAILWIND_COLORS.TEXT_MUTED} w-4 h-4`} />
              <input
                type="text"
                placeholder="Search instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border ${TAILWIND_COLORS.BORDER} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent ${TAILWIND_COLORS.TEXT_PRIMARY}`}
              />
            </div>
            <Button
              variant="light"
              size="md"
              icon={<LuFilter className="w-4 h-4" />}
            >
              Filter
            </Button>
          </div>
        </div>
      </div>

      {/* Instructors List */}
      <div className="p-6">
        <div className="space-y-3">
          {filteredInstructors.map((instructor) => (
            <div
              key={instructor.id}
              className={`${TAILWIND_COLORS.CARD} p-4 hover:shadow-sm transition-shadow`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Avatar Placeholder */}
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className={`${TAILWIND_COLORS.TEXT_MUTED} text-sm font-medium`}>
                      {instructor.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  
                  {/* Instructor Info */}
                  <div>
                    <h3 className={`text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{instructor.name}</h3>
                    <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED}`}>{instructor.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {/* Role Badge */}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${TAILWIND_COLORS.BADGE_INFO}`}>
                    {instructor.role}
                  </span>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditInstructor(instructor)}
                      className="w-8 h-8 bg-green-100 hover:bg-green-200 rounded flex items-center justify-center transition-colors"
                      title="Edit"
                    >
                      <LuPencil className="w-4 h-4 text-secondary" />
                    </button>
                    <button
                      onClick={() => handleDeleteInstructor(instructor)}
                      className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded flex items-center justify-center transition-colors"
                      title="Delete"
                    >
                      <LuTrash2 className="w-4 h-4 text-error" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredInstructors.length === 0 && (
          <div className="text-center py-12">
            <LuUserPlus className={`mx-auto h-12 w-12 ${TAILWIND_COLORS.TEXT_MUTED}`} />
            <h3 className={`mt-2 text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>No instructors found</h3>
            <p className={`mt-1 text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
              {searchTerm ? 'Try adjusting your search criteria.' : 'Get started by adding a new instructor.'}
            </p>
            {!searchTerm && (
              <div className="mt-6">
                <Button
                  onClick={handleAddInstructor}
                  variant="secondary"
                  size="md"
                  icon={<LuPlus className="w-4 h-4" />}
                >
                  Add Instructor
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Instructor Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${TAILWIND_COLORS.HEADER_BG} rounded-lg p-6 w-full max-w-md mx-4`}>
            <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>
              {editingInstructor ? 'Edit Instructor' : 'Add New Instructor'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${TAILWIND_COLORS.BORDER} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary ${TAILWIND_COLORS.TEXT_PRIMARY}`}
                  placeholder="Enter instructor name"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${TAILWIND_COLORS.BORDER} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary ${TAILWIND_COLORS.TEXT_PRIMARY}`}
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  maxLength={10}
                  pattern="[0-9]{10}"
                  className={`w-full px-3 py-2 border ${TAILWIND_COLORS.BORDER} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary ${TAILWIND_COLORS.TEXT_PRIMARY}`}
                  placeholder="Enter 10-digit phone number"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}>
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${TAILWIND_COLORS.BORDER} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary ${TAILWIND_COLORS.TEXT_PRIMARY}`}
                >
                  <option value="Instructor">Instructor</option>
                  <option value="Professor">Professor</option>
                  <option value="Assistant Professor">Assistant Professor</option>
                  <option value="Lab Instructor">Lab Instructor</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                onClick={handleCancelModal}
                variant="light"
                size="md"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveInstructor}
                variant="primary"
                size="md"
              >
                {editingInstructor ? 'Update' : 'Add'} Instructor
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${TAILWIND_COLORS.HEADER_BG} rounded-lg p-6 w-full max-w-md mx-4`}>
            <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>
              Confirm Delete
            </h3>
            
            <p className={`${TAILWIND_COLORS.TEXT_MUTED} mb-6`}>
              Are you sure you want to delete <strong>{deletingInstructor?.name}</strong>? 
              This action cannot be undone.
            </p>
            
            <div className="flex justify-end space-x-3">
              <Button
                onClick={handleCancelModal}
                variant="light"
                size="md"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmDelete}
                variant="danger"
                size="md"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

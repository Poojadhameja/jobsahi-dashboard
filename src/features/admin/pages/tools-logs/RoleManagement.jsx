import React, { useState, useRef } from 'react'
import Swal from 'sweetalert2'

export default function RoleManagement() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingRole, setEditingRole] = useState(null)
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: []
  })
  const createFormRef = useRef(null)

  // Sample existing roles data
  const [existingRoles, setExistingRoles] = useState([
    {
      id: 1,
      name: 'Super Admin',
      userCount: 2,
      createdDate: '2025-01-01',
      permissions: ['All']
    },
    {
      id: 2,
      name: 'Recruiter',
      userCount: 15,
      createdDate: '2025-01-15',
      permissions: ['Jobs', 'Candidates', 'Reports']
    },
    {
      id: 3,
      name: 'Content Manager',
      userCount: 8,
      createdDate: '2025-02-01',
      permissions: ['Jobs', 'Candidates']
    },
    {
      id: 4,
      name: 'Content Manager',
      userCount: 5,
      createdDate: '2025-02-10',
      permissions: ['CMS', 'SEO']
    }
  ])

  const availablePermissions = [
    'Jobs Management',
    'Reports',
    'SEO',
    'Settings',
    'User Management',
    'CMS',
    'Analytics',
    'Logs'
  ]

  const handlePermissionToggle = (permission) => {
    setNewRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }))
  }

  const handleCreateRole = () => {
    if (editingRole) {
      // Update existing role
      setExistingRoles(prev => prev.map(role => 
        role.id === editingRole.id 
          ? { ...role, name: newRole.name, permissions: newRole.permissions }
          : role
      ))
      Swal.fire({
        title: "Updated!",
        text: `The "${newRole.name}" role has been updated successfully.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      })
    } else {
      // Create new role
      const newRoleData = {
        id: Date.now(), // Simple ID generation
        name: newRole.name,
        userCount: 0,
        createdDate: new Date().toISOString().split('T')[0],
        permissions: newRole.permissions
      }
      setExistingRoles(prev => [...prev, newRoleData])
      Swal.fire({
        title: "Created!",
        text: `The "${newRole.name}" role has been created successfully.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      })
    }
    
    // Reset form
    setNewRole({ name: '', description: '', permissions: [] })
    setEditingRole(null)
    setShowCreateForm(false)
  }

  const handleCreateNewRoleClick = () => {
    setShowCreateForm(true)
    // Scroll to the create form after a short delay to ensure it's rendered
    setTimeout(() => {
      if (createFormRef.current) {
        createFormRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        })
      }
    }, 100)
  }

  const handleEditRole = (role) => {
    setEditingRole(role)
    setNewRole({
      name: role.name,
      description: `Edit ${role.name} role`, // You can add description field to roles if needed
      permissions: [...role.permissions]
    })
    setShowCreateForm(true)
    // Scroll to the form
    setTimeout(() => {
      if (createFormRef.current) {
        createFormRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        })
      }
    }, 100)
  }

  const handleDeleteRole = (role) => {
    Swal.fire({
      title: "Delete Role",
      text: `Are you sure you want to delete the "${role.name}" role? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        setExistingRoles(prev => prev.filter(r => r.id !== role.id))
        Swal.fire({
          title: "Deleted!",
          text: `The "${role.name}" role has been deleted successfully.`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        })
      }
    })
  }

  return (
    <div className="space-y-6 bg-white rounded-lg border border-[var(--color-primary)28] shadow-sm p-6">
      {/* Header Section */}
      <div className="">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-primary mb-2">
              Manual Role Creation & Permission Control
            </h2>
            <p className="text-gray-600">
              Create and manage user roles with granular permission control
            </p>
          </div>
          <button 
            onClick={handleCreateNewRoleClick}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-secondary)] text-white rounded-lg hover:bg-[var(--color-secondary-dark)] transition-colors duration-200 font-medium"
          >
            <span className="text-sm">+ Create New Role</span>
          </button>
        </div>
      </div>

      {/* Existing Roles Section */}
      <div className="bg-[var(--color-bg-primary)] rounded-lg border border-[var(--color-primary)28] shadow-sm p-6">
        <h3 className="text-lg font-medium text-primary mb-4">Existing Roles</h3>
        <div className="space-y-4">
          {existingRoles.map((role) => (
            <div key={role.id} className="flex items-center bg-white justify-between p-4 border border-[var(--color-primary)28] rounded-lg transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 text-sm font-medium">
                    {role.name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{role.name}</p>
                  <p className="text-gray-600 text-sm">{role.userCount} users - created {role.createdDate}</p>
                  <div className="flex gap-2 mt-2">
                    {role.permissions.map((permission, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleEditRole(role)}
                  className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded hover:bg-green-200 transition-colors font-medium"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteRole(role)}
                  className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded hover:bg-red-200 transition-colors font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create New Role Form */}
      {showCreateForm && (
        <div ref={createFormRef} className="bg-[var(--color-bg-primary)] rounded-lg border border-[var(--color-primary)28] shadow-sm p-6">
          <h3 className="text-lg font-medium text-primary mb-4">
            {editingRole ? 'Edit Role' : 'Create New Role'}
          </h3>
          
          <div className="space-y-6">
            {/* Role Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role Name</label>
              <input
                type="text"
                placeholder="Enter role name.."
                value={newRole.name}
                onChange={(e) => setNewRole(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-[var(--color-primary)28] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                placeholder="Describe the role and its responsibilities.."
                value={newRole.description}
                onChange={(e) => setNewRole(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 border border-[var(--color-primary)28] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent"
              />
            </div>

            {/* Permissions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availablePermissions.map((permission) => (
                  <label key={permission} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newRole.permissions.includes(permission)}
                      onChange={() => handlePermissionToggle(permission)}
                      className="w-4 h-4 text-[var(--color-secondary)] border-gray-300 rounded focus:ring-[var(--color-secondary)]"
                    />
                    <span className="text-gray-700">{permission}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleCreateRole}
                className="px-6 py-2 bg-[var(--color-secondary)] text-white rounded-lg hover:bg-[var(--color-secondary-dark)] transition-colors duration-200 font-medium"
              >
                {editingRole ? 'Update Role' : 'Create Role'}
              </button>
              <button
                onClick={() => {
                  setShowCreateForm(false)
                  setEditingRole(null)
                  setNewRole({ name: '', description: '', permissions: [] })
                }}
                className="px-6 py-2 bg-white border-2 border-[var(--color-secondary)] text-[var(--color-secondary)] rounded-lg hover:bg-[var(--color-secondary)] hover:text-white transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

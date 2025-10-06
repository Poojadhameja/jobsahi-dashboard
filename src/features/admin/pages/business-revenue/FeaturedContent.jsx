import React, { useState } from 'react'
import { PillNavigation } from '../../../../shared/components/navigation'
import { 
  LuBriefcase,
  LuBookOpen,
  LuMegaphone,
  LuPencil,
  LuSquare,
  LuX,
  LuSave
} from 'react-icons/lu'
import Swal from 'sweetalert2'

export default function FeaturedContent() {
  const [activeTab, setActiveTab] = useState(0)
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(false)
  const [editModal, setEditModal] = useState({ isOpen: false, item: null })
  
  // Form state for Priority Banners
  const [bannerForm, setBannerForm] = useState({
    title: '',
    description: '',
    priority: '',
    isActive: true
  })

  // Demo data - replace with API data later
  const featuredJobs = [
    {
      id: 1,
      jobTitle: 'Developer',
      company: 'Brightorial',
      priority: 'High',
      status: 'Active',
      startDate: '01-01-2025',
      endDate: '01-01-2025'
    },
    {
      id: 2,
      jobTitle: 'Developer',
      company: 'Brightorial',
      priority: 'High',
      status: 'Active',
      startDate: '01-01-2025',
      endDate: '01-01-2025'
    }
  ]

  const featuredCourses = [
    {
      id: 1,
      courseTitle: 'Electrician',
      institute: 'Academy',
      priority: 'High',
      status: 'Active',
      duration: '6 months'
    },
    {
      id: 2,
      courseTitle: 'Electrician',
      institute: 'Academy',
      priority: 'High',
      status: 'Active',
      duration: '6 months'
    }
  ]

  const priorityBanners = [
    {
      id: 1,
      bannerTitle: 'New Year Sale',
      location: 'Homepage Top',
      priority: 'High',
      status: 'Active',
      startDate: '01-01-2025',
      endDate: '31-01-2025'
    }
  ]

  const tabs = [
    { id: 'featured-jobs', label: 'Featured Jobs', icon: LuBriefcase },
    { id: 'featured-courses', label: 'Featured Courses', icon: LuBookOpen },
    { id: 'priority-banners', label: 'Priority Banners', icon: LuMegaphone }
  ]

  const getCurrentData = () => {
    switch (activeTab) {
      case 0:
        return {
          title: 'Featured Jobs',
          subtitle: 'Manage featured job listings',
          data: featuredJobs,
          columns: ['Job title', 'Company', 'Priority', 'Status', 'Start date', 'End date', 'Actions']
        }
      case 1:
        return {
          title: 'Featured Courses',
          subtitle: 'Manage featured course listings',
          data: featuredCourses,
          columns: ['Course title', 'Institute', 'Priority', 'Status', 'Duration', 'Actions']
        }
       case 2:
         return {
           title: 'Priority Banners',
           subtitle: 'Manage promotional banners and their priority',
           data: priorityBanners,
           columns: ['Banner title', 'Location', 'Priority', 'Status', 'Start date', 'End date', 'Actions']
         }
      default:
        return { title: '', subtitle: '', data: [], columns: [] }
    }
  }

  const handleEdit = (item) => {
    setEditModal({ isOpen: true, item })
  }

  const handleCloseEdit = () => {
    setEditModal({ isOpen: false, item: null })
  }

  const handleSaveEdit = (itemId, updatedItem) => {
    // Update the appropriate data array based on active tab
    if (activeTab === 0) {
      // Update featured jobs
      const updatedJobs = featuredJobs.map(job => 
        job.id === itemId ? { ...job, ...updatedItem } : job
      )
      // In a real app, you would update the state here
      console.log('Updated featured jobs:', updatedJobs)
    } else if (activeTab === 1) {
      // Update featured courses
      const updatedCourses = featuredCourses.map(course => 
        course.id === itemId ? { ...course, ...updatedItem } : course
      )
      console.log('Updated featured courses:', updatedCourses)
    } else if (activeTab === 2) {
      // Update priority banners
      const updatedBanners = priorityBanners.map(banner => 
        banner.id === itemId ? { ...banner, ...updatedItem } : banner
      )
      console.log('Updated priority banners:', updatedBanners)
    }
    
    setEditModal({ isOpen: false, item: null })
  }

  const handleStop = (item) => {
    Swal.fire({
      title: "Stop Featured Content",
      text: `Are you sure you want to stop this featured content? This will change its status to inactive.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, stop it!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        // Update status to inactive
        console.log('Stopped item:', item)
        Swal.fire({
          title: "Stopped!",
          text: "Featured content has been stopped successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        })
      }
    })
  }

  const handleAddFeatured = () => {
    console.log('Add featured content')
    // Add create new featured content functionality here
  }

  const handleBannerFormChange = (field, value) => {
    setBannerForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSaveBanner = () => {
    console.log('Save banner:', bannerForm)
    // Add save banner functionality here
  }

  // Edit Modal Component
  const EditModal = ({ item, isOpen, onClose, onSave, activeTab }) => {
    const [editForm, setEditForm] = useState({
      jobTitle: '',
      company: '',
      priority: '',
      status: '',
      startDate: '',
      endDate: '',
      courseTitle: '',
      institute: '',
      duration: '',
      bannerTitle: '',
      location: ''
    })

    // Initialize form when item changes
    React.useEffect(() => {
      if (item) {
        setEditForm({
          jobTitle: item.jobTitle || '',
          company: item.company || '',
          priority: item.priority || '',
          status: item.status || '',
          startDate: item.startDate || '',
          endDate: item.endDate || '',
          courseTitle: item.courseTitle || '',
          institute: item.institute || '',
          duration: item.duration || '',
          bannerTitle: item.bannerTitle || '',
          location: item.location || ''
        })
      }
    }, [item])

    const handleInputChange = (field, value) => {
      setEditForm(prev => ({ ...prev, [field]: value }))
    }

    const handleSave = () => {
      // Validate form based on active tab
      if (activeTab === 0) { // Featured Jobs
        if (!editForm.jobTitle.trim() || !editForm.company.trim() || !editForm.priority.trim()) {
          Swal.fire({
            title: "Validation Error",
            text: "Please fill in all required fields!",
            icon: "error"
          })
          return
        }
      } else if (activeTab === 1) { // Featured Courses
        if (!editForm.courseTitle.trim() || !editForm.institute.trim() || !editForm.priority.trim()) {
          Swal.fire({
            title: "Validation Error",
            text: "Please fill in all required fields!",
            icon: "error"
          })
          return
        }
      } else if (activeTab === 2) { // Priority Banners
        if (!editForm.bannerTitle.trim() || !editForm.location.trim() || !editForm.priority.trim()) {
          Swal.fire({
            title: "Validation Error",
            text: "Please fill in all required fields!",
            icon: "error"
          })
          return
        }
      }

      // Save the item
      onSave(item.id, editForm)

      Swal.fire({
        title: "Updated!",
        text: "Featured content has been updated successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      })
    }

    if (!isOpen || !item) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Edit Featured Content</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <LuX size={24} />
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Featured Jobs Form */}
            {activeTab === 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Job Title*</label>
                    <input
                      type="text"
                      value={editForm.jobTitle}
                      onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter job title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Company*</label>
                    <input
                      type="text"
                      value={editForm.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter company name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Priority*</label>
                    <select
                      value={editForm.priority}
                      onChange={(e) => handleInputChange('priority', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select Priority</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
                    <select
                      value={editForm.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={editForm.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">End Date</label>
                    <input
                      type="date"
                      value={editForm.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Featured Courses Form */}
            {activeTab === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Course Title*</label>
                    <input
                      type="text"
                      value={editForm.courseTitle}
                      onChange={(e) => handleInputChange('courseTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter course title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Institute*</label>
                    <input
                      type="text"
                      value={editForm.institute}
                      onChange={(e) => handleInputChange('institute', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter institute name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Priority*</label>
                    <select
                      value={editForm.priority}
                      onChange={(e) => handleInputChange('priority', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select Priority</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Duration</label>
                    <input
                      type="text"
                      value={editForm.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., 6 months"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            )}

            {/* Priority Banners Form */}
            {activeTab === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Banner Title*</label>
                    <input
                      type="text"
                      value={editForm.bannerTitle}
                      onChange={(e) => handleInputChange('bannerTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter banner title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Location*</label>
                    <input
                      type="text"
                      value={editForm.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., Homepage Top"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Priority*</label>
                    <select
                      value={editForm.priority}
                      onChange={(e) => handleInputChange('priority', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select Priority</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
                    <select
                      value={editForm.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={editForm.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">End Date</label>
                    <input
                      type="date"
                      value={editForm.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
            >
              <LuSave size={16} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentData = getCurrentData()

  return (
    <div className="max-w-7xl mx-auto bg-white border border-primary-30 space-y-6 rounded-lg">
      {/* Header */}
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Featured Content Manager</h1>
            <p className="text-gray-600 mt-1">Manage featured jobs, courses, and priority banners</p>
          </div>
          
          
          
          <button 
            onClick={handleAddFeatured}
            className="bg-white hover:bg-secondary hover:text-white border-2 border-secondary text-secondary px-4 py-2 rounded-lg font-medium transition-colors">
            + Add Featured Content
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="w-1/2 px-2">
        <PillNavigation 
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

       {/* Content Area */}
       <div className=" ">
         <div className="px-6 ">
           <div>
             <h2 className="text-lg font-bold text-gray-900">{currentData.title}</h2>
             <p className="text-gray-600">{currentData.subtitle}</p>
           </div>
         </div>

         {/* Show form for Priority Banners, table for others */}
         {activeTab === 2 ? (
            /* Priority Banners Form */
            <div className="p-6 ">
              {/* <div className="   "> */}
                <div className="space-y-5">
                  <div className="flex flex-col md:flex-row gap-4 justify-start md:gap-10">
                    {/* Banner Title */}
                  <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Banner Title
                    </label>
                    <input
                      type="text"
                      value={bannerForm.title}
                      onChange={(e) => handleBannerFormChange('title', e.target.value)}
                      placeholder="New year special offer"
                      className="w-full p-2 bg-bg-primary border border-primary-30 rounded-lg focus:outline-none text-gray-700 placeholder-gray-500"
                    />
                  </div>

                  {/* Priority */}
                  <div className="w-full md:w-auto">
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Priority
                    </label>
                      <select
                        value={bannerForm.priority}
                        onChange={(e) => handleBannerFormChange('priority', e.target.value)}
                        className="w-full p-2 bg-bg-primary border border-primary-30 rounded-lg focus:outline-none text-gray-700">
                        <option value="" className="text-gray-500">Select priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                  </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Description
                    </label>
                    <textarea
                      value={bannerForm.description}
                      onChange={(e) => handleBannerFormChange('description', e.target.value)}
                      placeholder="Banner description..."
                      rows={4}
                      className="w-full p-2 bg-bg-primary border border-primary-30 rounded-lg focus:outline-none text-gray-700 placeholder-gray-500 resize-none"
                    />
                  </div>

                  {/* Toggle Switch */}
                  <div className="flex items-center justify-start">
                    <button
                      onClick={() => handleBannerFormChange('isActive', !bannerForm.isActive)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none  ${
                        bannerForm.isActive ? 'bg-secondary' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          bannerForm.isActive ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Save Button */}
                  <div className="pt-2">
                    <button
                      onClick={handleSaveBanner}
                      className="px-5 bg-secondary hover:bg-secondary-dark text-white font-bold py-3 rounded-lg transition-colors"
                    >
                      Save Banner
                    </button>
                  </div>
                </div>
              {/* </div> */}
            </div>
         ) : (
           /* Table for Featured Jobs and Featured Courses */
           <>
             <div className="featured-content-table-container overflow-x-auto max-h-96 overflow-y-auto">
               <table className="w-full">
                 <thead className="bg-gray-50">
                   <tr>
                     {currentData.columns.map((column, index) => (
                       <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                         {column}
                       </th>
                     ))}
                   </tr>
                 </thead>
                 <tbody className="bg-white divide-y divide-gray-200">
                   {currentData.data.map((item) => (
                     <tr key={item.id} className="hover:bg-gray-50">
                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                         {activeTab === 0 ? item.jobTitle : item.courseTitle}
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                         {activeTab === 0 ? item.company : item.institute}
                       </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex border items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.priority === 'High' 
                            ? 'bg-green-100 text-secondary' 
                            : item.priority === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.status === 'Active' 
                            ? 'bg-green-100 text-secondary' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                         {activeTab === 1 ? item.duration : item.startDate}
                       </td>
                       {activeTab !== 1 && (
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                           {item.endDate}
                         </td>
                       )}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="border-2 border-black text-black hover:bg-black hover:text-white px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1"
                          >
                            <LuPencil size={12} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleStop(item)}
                            className="border-2 border-black text-black hover:bg-black hover:text-white px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1"
                          >
                            <LuSquare size={12} />
                            Stop
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {currentData.data.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500">
                  <p className="text-lg font-medium">No {currentData.title.toLowerCase()} found</p>
                  <p className="text-sm">Add your first {currentData.title.toLowerCase().slice(0, -1)} to get started</p>
                  <button 
                    onClick={handleAddFeatured}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    + Add Featured Content
                  </button>
                </div>
              </div>
            )}
           </>
         )}
      </div>

      {/* Edit Modal */}
      <EditModal
        item={editModal.item}
        isOpen={editModal.isOpen}
        onClose={handleCloseEdit}
        onSave={handleSaveEdit}
        activeTab={activeTab}
      />
    </div>
  )
}

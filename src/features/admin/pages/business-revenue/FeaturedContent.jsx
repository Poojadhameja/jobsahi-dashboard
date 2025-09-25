import React, { useState } from 'react'
import { PillNavigation } from '../../../../shared/components/navigation'

export default function FeaturedContent() {
  const [activeTab, setActiveTab] = useState(0)
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(false)
  
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
    { id: 'featured-jobs', label: 'Featured Jobs' },
    { id: 'featured-courses', label: 'Featured Courses' },
    { id: 'priority-banners', label: 'Priority Banners' }
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
    console.log('Edit item:', item)
    // Add edit functionality here
  }

  const handleStop = (item) => {
    if (window.confirm('Are you sure you want to stop this featured content?')) {
      console.log('Stop item:', item)
      // Add stop functionality here
    }
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

  const currentData = getCurrentData()

  // Auto scroll effect
  React.useEffect(() => {
    if (autoScrollEnabled && currentData.data.length > 0) {
      const interval = setInterval(() => {
        const tableContainer = document.querySelector('.featured-content-table-container');
        if (tableContainer) {
          tableContainer.scrollTop += 1;
          if (tableContainer.scrollTop >= tableContainer.scrollHeight - tableContainer.clientHeight) {
            tableContainer.scrollTop = 0;
          }
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [autoScrollEnabled, currentData.data.length]);

  return (
    <div className="max-w-7xl mx-auto bg-white border border-primary-30 space-y-6 rounded-lg">
      {/* Header */}
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Featured Content Manager</h1>
            <p className="text-gray-600 mt-1">Manage featured jobs, courses, and priority banners</p>
          </div>
          
          {/* Auto Scroll Toggle */}
          <div className="flex items-center gap-2 mr-4">
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
                            className="border-2 border-black text-black hover:bg-black hover:text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleStop(item)}
                            className="border-2 border-black text-black hover:bg-black hover:text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                          >
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
    </div>
  )
}

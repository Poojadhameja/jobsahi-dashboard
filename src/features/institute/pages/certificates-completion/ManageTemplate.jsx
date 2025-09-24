import React, { useState } from 'react'
import { 
  LuUpload, 
  LuFileText, 
  LuPencil, 
  LuTrash2, 
  LuEye,
  LuPlus,
  LuDownload,
  LuImage
} from 'react-icons/lu'

function ManageTemplate() {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Standard Certificate Template',
      description: 'Default template for course completion certificates',
      createdAt: '2024-01-15',
      isDefault: true,
      preview: '/api/placeholder/300/200'
    },
    {
      id: 2,
      name: 'Professional Certificate Template',
      description: 'Professional template with enhanced design',
      createdAt: '2024-02-20',
      isDefault: false,
      preview: '/api/placeholder/300/200'
    },
    {
      id: 3,
      name: 'Custom Institute Template',
      description: 'Customized template with institute branding',
      createdAt: '2024-03-10',
      isDefault: false,
      preview: '/api/placeholder/300/200'
    }
  ])

  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  const handleDeleteTemplate = (id) => {
    setTemplates(templates.filter(template => template.id !== id))
  }

  const handleSetDefault = (id) => {
    setTemplates(templates.map(template => ({
      ...template,
      isDefault: template.id === id
    })))
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Manage Templates</h3>
            <p className="text-sm text-gray-600">Upload and manage certificate templates</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
          >
            <LuPlus className="h-4 w-4" />
            <span>Upload Template</span>
          </button>
        </div>

        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors duration-200">
          <LuUpload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">Upload New Template</h4>
          <p className="text-sm text-gray-600 mb-4">
            Drag and drop your template file here, or click to browse
          </p>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200">
            Choose File
          </button>
          <p className="text-xs text-gray-500 mt-2">
            Supported formats: PDF, PNG, JPG (Max size: 10MB)
          </p>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Existing Templates</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map(template => (
            <div key={template.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
              {/* Template Preview */}
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <LuImage className="h-12 w-12 text-gray-400" />
              </div>
              
              {/* Template Info */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-medium text-gray-900 text-sm">{template.name}</h5>
                  {template.isDefault && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 mb-3">{template.description}</p>
                <p className="text-xs text-gray-500 mb-4">Created: {template.createdAt}</p>
                
                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedTemplate(template)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      title="Preview"
                    >
                      <LuEye className="h-4 w-4" />
                    </button>
                    <button
                      className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                      title="Edit"
                    >
                      <LuPencil className="h-4 w-4" />
                    </button>
                    <button
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      title="Download"
                    >
                      <LuDownload className="h-4 w-4" />
                    </button>
                    {!template.isDefault && (
                      <button
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        title="Delete"
                      >
                        <LuTrash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  {!template.isDefault && (
                    <button
                      onClick={() => handleSetDefault(template.id)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors duration-200"
                    >
                      Set Default
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Template Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-md font-medium text-blue-900 mb-3">Template Guidelines</h4>
        <ul className="text-sm text-blue-800 space-y-2">
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Templates should be in high resolution (300 DPI minimum)
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Include placeholder fields for student name, course name, and completion date
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Recommended dimensions: 8.5" x 11" (Letter size) or A4
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Use placeholder text like "{{STUDENT_NAME}}", "{{COURSE_NAME}}", "{{DATE}}"
          </li>
        </ul>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload New Template</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter template name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows="3"
                  placeholder="Enter template description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <LuUpload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
              >
                Upload Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageTemplate

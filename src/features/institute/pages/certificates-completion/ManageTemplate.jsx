import React, { useState } from 'react'
import { 
  LuUpload, 
  LuFileText, 
  LuPencil, 
  LuTrash2, 
  LuEye,
  LuPlus,
  LuDownload,
  LuImage,
  LuCalendar,
  LuFileImage
} from 'react-icons/lu'
import RichTextEditor from '../../../../shared/components/RichTextEditor'

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
  
  // Form state for certificate information
  const [certificateInfo, setCertificateInfo] = useState({
    completionDate: '',
    description: '',
    instituteLogo: null,
    officialSeal: null
  })

  const handleDeleteTemplate = (id) => {
    setTemplates(templates.filter(template => template.id !== id))
  }

  const handleSetDefault = (id) => {
    setTemplates(templates.map(template => ({
      ...template,
      isDefault: template.id === id
    })))
  }

  const handleInputChange = (field, value) => {
    setCertificateInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileUpload = (field, file) => {
    setCertificateInfo(prev => ({
      ...prev,
      [field]: file
    }))
  }

  const handleUpdateTemplate = () => {
    // Handle template update logic here
    console.log('Updating template with:', certificateInfo)
  }

  return (
    <div className="space-y-6 p-6">
      {/* Certificate Information Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Certificate Information</h2>
          <p className="text-sm text-gray-600">Create new certificate templates with custom logos and seals.</p>
        </div>

        <div className="space-y-6">
          {/* Date of Completion */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-900 mb-1">
                DATE OF COMPLETION <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-3">Choose the course to enroll the student.</p>
            </div>
            <div className="lg:col-span-3">
              <div className="relative">
                <input
                  type="date"
                  value={certificateInfo.completionDate}
                  onChange={(e) => handleInputChange('completionDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pr-10"
                />
                <LuCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-900 mb-1">
                DESCRIPTION <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-3">Pick the batch for the selected course.</p>
            </div>
            <div className="lg:col-span-3">
              <RichTextEditor
                value={certificateInfo.description}
                onChange={(value) => handleInputChange('description', value)}
                placeholder="Enter course description"
                height="150px"
                className="border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Logo and Seal Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Logo and Seal</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Institute Logo */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  INSTITUTE LOGO <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-3">Choose the course to enroll the student.</p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors duration-200">
                  <LuUpload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-3">Upload logo image</p>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm transition-colors duration-200">
                    Choose file
                  </button>
                </div>
              </div>

              {/* Official Seal */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  OFFICIAL SEAL <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-3">Choose the course to enroll the student.</p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors duration-200">
                  <LuUpload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-3">Upload seal image</p>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm transition-colors duration-200">
                    Choose file
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Update Template Button */}
          <div className="flex justify-end">
            <button
              onClick={handleUpdateTemplate}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
            >
              <LuFileText className="h-4 w-4" />
              <span>Update Template</span>
            </button>
          </div>
        </div>
      </div>

      {/* Existing Template Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Existing Template</h2>
          <p className="text-sm text-gray-600">Manage your certificate template.</p>
        </div>

        {/* Certificate Preview */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            {/* Certificate Design */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              {/* Header with icons */}
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <LuFileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="w-16 h-12 bg-gray-200 rounded"></div>
              </div>

              {/* Main Title */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'serif' }}>
                  Certificate of Completion
                </h1>
              </div>

              {/* Description */}
              <div className="text-center mb-8">
                <p className="text-gray-700 leading-relaxed text-sm">
                  Upon successful completion of the course, participants will receive a Certificate of Completion, 
                  recognizing their achievement and confirming that they have acquired the essential skills and 
                  knowledge outlined in the curriculum.
                </p>
              </div>

              {/* Separator */}
              <div className="border-b-2 border-dotted border-gray-300 mb-6"></div>

              {/* Footer */}
              <div className="flex justify-between items-end">
                <div className="text-xs text-gray-600">
                  Date: 8/3/2025
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-gray-800 mb-2">POWER TECHNICIAN</div>
                </div>
                <div className="w-16 h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="flex justify-center mt-6">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
            <LuDownload className="h-4 w-4" />
            <span>Direct Download</span>
          </button>
        </div>
      </div>

    </div>
  )
}

export default ManageTemplate

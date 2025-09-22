import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LuArrowLeft, LuPlus, LuUpload, LuX } from 'react-icons/lu'
import Button from '../../../../shared/components/Button.jsx'
import RichTextEditor from '../../../../shared/components/RichTextEditor.jsx'
import { useCourseContext } from '../../context/CourseContext'

export default function CreateCourse() {
  const navigate = useNavigate()
  const { addCourse } = useCourseContext()
  const [formData, setFormData] = useState({
    courseTitle: '',
    duration: '',
    category: '',
    description: '',
    taggedSkills: '',
    batchLimits: '',
    courseStatus: 'Active',
    instructorName: '',
    mode: '',
    difficultyLevel: '',
    price: '',
    certificationAllowed: true
  })
  const [modules, setModules] = useState([])
  const [newModule, setNewModule] = useState({ title: '', description: '' })
  const [selectedMedia, setSelectedMedia] = useState([])
  const [validationErrors, setValidationErrors] = useState({})

  const handleBack = () => {
    navigate('/institute/course-management')
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddModule = () => {
    if (newModule.title && newModule.description) {
      setModules(prev => [...prev, { ...newModule, id: Date.now() }])
      setNewModule({ title: '', description: '' })
    }
  }

  const handleSave = () => {
    // Validate all required fields
    const requiredFields = [
      { field: 'courseTitle', label: 'Course Title' },
      { field: 'duration', label: 'Duration' },
      { field: 'category', label: 'Category' },
      { field: 'description', label: 'Course Description' },
      { field: 'batchLimits', label: 'Batch Limits' },
      { field: 'instructorName', label: 'Instructor Name' },
      { field: 'mode', label: 'Mode' },
      { field: 'difficultyLevel', label: 'Difficulty Level' },
      { field: 'price', label: 'Price' }
    ]

    const missingFields = requiredFields.filter(field => !formData[field.field])
    
    if (missingFields.length > 0) {
      const missingFieldNames = missingFields.map(field => field.label).join(', ')
      
      // Set validation errors for visual feedback
      const errors = {}
      missingFields.forEach(field => {
        errors[field.field] = `${field.label} is required`
      })
      setValidationErrors(errors)
      
      alert(`Please fill in all required fields: ${missingFieldNames}`)
      return
    }

    // Clear validation errors if all fields are filled
    setValidationErrors({})

    // Validate modules if any are added
    if (modules.length === 0) {
      const addModules = window.confirm('No modules added. Do you want to continue without modules?')
      if (!addModules) {
        return
      }
    }

    // Add course to context with media
    const courseDataWithMedia = {
      ...formData,
      media: selectedMedia.map(media => ({
        name: media.name,
        size: media.size,
        type: media.type,
        url: media.url
      }))
    }
    addCourse(courseDataWithMedia)
    
    // Show success message
    alert('Course created successfully!')
    
    // Reset form
    setFormData({
      courseTitle: '',
      duration: '',
      category: '',
      description: '',
      taggedSkills: '',
      batchLimits: '',
      courseStatus: 'Active',
      instructorName: '',
      mode: '',
      difficultyLevel: '',
      price: '',
      certificationAllowed: true
    })
    setModules([])
    setNewModule({ title: '', description: '' })
    setSelectedMedia([])
  }

  const handleCancel = () => {
    navigate('/institute/course-management')
  }

  const handleMediaSelect = (e) => {
    const files = Array.from(e.target.files)
    const newMedia = files.map(file => ({
      id: Date.now() + Math.random(),
      file: file,
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file)
    }))
    setSelectedMedia(prev => [...prev, ...newMedia])
  }

  const handleRemoveMedia = (mediaId) => {
    setSelectedMedia(prev => {
      const mediaToRemove = prev.find(media => media.id === mediaId)
      if (mediaToRemove) {
        URL.revokeObjectURL(mediaToRemove.url)
      }
      return prev.filter(media => media.id !== mediaId)
    })
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getInputClassName = (fieldName) => {
    const baseClass = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
    const errorClass = validationErrors[fieldName] 
      ? "border-red-500 focus:ring-red-500" 
      : "border-gray-300 focus:ring-[#5C9A24]"
    return `${baseClass} ${errorClass}`
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Header with Action Buttons */}
        <div className="flex justify-end gap-4 mb-8">
        <Button 
          variant="outline" 
            onClick={handleCancel}
            className="px-6 py-2"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="px-6 py-2 bg-[#5C9A24] hover:bg-[#3f6c17]"
          >
            Save
        </Button>
        </div>

        {/* Basic Information Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Course Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                COURSE TITLE <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mb-3">Enter the name of the course or job role.</p>
              <input 
                type="text" 
                value={formData.courseTitle}
                onChange={(e) => handleInputChange('courseTitle', e.target.value)}
                className={getInputClassName('courseTitle')}
                placeholder="e.g. Assistant Electrician"
              />
              {validationErrors.courseTitle && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.courseTitle}</p>
              )}
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                DURATION (WEEKS) <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mb-3">Specify the total duration of the course in weeks.</p>
              <input 
                type="number" 
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className={getInputClassName('duration')}
                placeholder="e.g. 12"
              />
              {validationErrors.duration && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.duration}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                CATEGORY <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mb-3">Choose a category like "Technical".</p>
              <select 
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className={getInputClassName('category')}
              >
                <option value="">Select category</option>
                <option value="Technical">Technical</option>
                <option value="Non-Technical">Non-Technical</option>
                <option value="Vocational">Vocational</option>
                <option value="Professional">Professional</option>
              </select>
              {validationErrors.category && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.category}</p>
              )}
            </div>

            {/* Course Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                COURSE DESCRIPTION <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mb-3">Select the domain or trade related to the course.</p>
              <RichTextEditor
                value={formData.description}
                onChange={(value) => handleInputChange('description', value)}
                placeholder="Enter course description"
                height="150px"
              />
            </div>

            {/* Tagged Skills */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                TAGGED SKILLS
              </label>
              <p className="text-sm text-gray-600 mb-3">Add relevant skills taught in the course.</p>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={formData.taggedSkills}
                  onChange={(e) => handleInputChange('taggedSkills', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5C9A24]"
                  placeholder="e.g. Wiring, Safety Measures"
                />
                <button className="px-3 py-2 bg-[#5C9A24] text-white rounded-md hover:bg-[#3f6c17]">
                  <LuPlus className="w-4 h-4" />
                </button>
              </div>
            </div> 

            {/* Batch Limits */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                BATCH LIMITS <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mb-3">Specify the maximum number of students.</p>
              <input 
                type="number" 
                value={formData.batchLimits}
                onChange={(e) => handleInputChange('batchLimits', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5C9A24]"
                placeholder="e.g. 30 students"
              />
            </div>

            {/* Course Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                COURSE STATUS
              </label>
              <p className="text-sm text-gray-600 mb-3">Set the current status of the course.</p>
              <select 
                value={formData.courseStatus}
                onChange={(e) => handleInputChange('courseStatus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5C9A24]"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Additional Settings Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Additional Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Instructor Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                INSTRUCTOR NAME <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mb-3">Enter the full name of the course instructor.</p>
              <input 
                type="text" 
                value={formData.instructorName}
                onChange={(e) => handleInputChange('instructorName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5C9A24]"
                placeholder="e.g. Rajeev Kumar"
              />
            </div>

            {/* Mode */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                MODE <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mb-3">Mode of the course</p>
              <select 
                value={formData.mode}
                onChange={(e) => handleInputChange('mode', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5C9A24]"
              >
                <option value="">Select course mode</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            {/* Difficulty Level */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                DIFFICULTY LEVEL <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mb-3">Select the difficulty level of the course.</p>
              <select 
                value={formData.difficultyLevel}
                onChange={(e) => handleInputChange('difficultyLevel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5C9A24]"
              >
                <option value="">Select difficulty level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
      </div>

            {/* Price */}
          <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                PRICE <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mb-3">Enter the course fee in Indian Rupees.</p>
            <input 
              type="text" 
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className={getInputClassName('price')}
                placeholder="ex. 15,000"
            />
            {validationErrors.price && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.price}</p>
            )}
          </div>

            {/* Certification Allowed */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={formData.certificationAllowed}
                  onChange={(e) => handleInputChange('certificationAllowed', e.target.checked)}
                  className="w-4 h-4 text-[#5C9A24] bg-gray-100 border-gray-300 rounded focus:ring-[#5C9A24]"
                />
                <label className="text-sm font-medium text-gray-900">
                  Is Certification Allowed for this Course?
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Course Modules Section */}
        <div className="mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Course Modules</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  MODULE 1 TITLE <span className="text-orange-500">*</span>
                </label>
                <p className="text-sm text-gray-600 mb-3">Enter the name of the module.</p>
                <input 
                  type="text" 
                  value={newModule.title}
                  onChange={(e) => setNewModule(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5C9A24]"
                  placeholder="eg. intro to HTML"
                />
              </div>
              
              <div className="flex items-end">
                <button 
                  onClick={handleAddModule}
                  className="w-10 h-10 bg-[#5C9A24] text-white rounded-md hover:bg-[#3f6c17] flex items-center justify-center"
                >
                  <LuPlus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                MODULE DESCRIPTION <span className="text-orange-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mb-3">Describe the content and objective of the module.</p>
            <textarea 
                value={newModule.description}
                onChange={(e) => setNewModule(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5C9A24]"
              rows="4"
                placeholder="Add module description"
            />
          </div>

            {/* Display added modules */}
            {modules.length > 0 && (
              <div className="mt-6">
                <h3 className="text-md font-semibold text-gray-900 mb-4">Added Modules</h3>
                {modules.map((module, index) => (
                  <div key={module.id} className="bg-gray-50 p-4 rounded-md mb-2">
                    <h4 className="font-medium text-gray-900">{module.title}</h4>
                    <p className="text-sm text-gray-600">{module.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Add Media Section */}
        <div className="mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Add Media</h2>
            
            {/* File Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-[#5C9A24] transition-colors cursor-pointer">
              <input
                type="file"
                multiple
                accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.ppt,.pptx"
                onChange={handleMediaSelect}
                className="hidden"
                id="media-upload"
              />
              <label htmlFor="media-upload" className="cursor-pointer">
                <div className="w-12 h-12 bg-gray-100 rounded-md mx-auto mb-4 flex items-center justify-center">
                  <LuUpload className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-2">Click to select files or drag and drop</p>
                <p className="text-sm text-gray-400">Images, Videos, Audio, PDF, Documents</p>
              </label>
            </div>

            {/* Selected Media Preview */}
            {selectedMedia.length > 0 && (
              <div className="mt-6">
                <h3 className="text-md font-semibold text-gray-900 mb-4">Selected Media ({selectedMedia.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedMedia.map((media) => (
                    <div key={media.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{media.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(media.size)}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveMedia(media.id)}
                          className="ml-2 text-red-500 hover:text-red-700"
                          title="Remove file"
                        >
                          <LuX className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* Media Preview */}
                      <div className="mt-2">
                        {media.type.startsWith('image/') ? (
                          <img
                            src={media.url}
                            alt={media.name}
                            className="w-full h-24 object-cover rounded border"
                          />
                        ) : media.type.startsWith('video/') ? (
                          <video
                            src={media.url}
                            className="w-full h-24 object-cover rounded border"
                            controls
                          />
                        ) : (
                          <div className="w-full h-24 bg-gray-100 rounded border flex items-center justify-center">
                            <div className="text-center">
                              <LuUpload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                              <p className="text-xs text-gray-500">{media.type.split('/')[1]?.toUpperCase()}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
    </div>
  )
}

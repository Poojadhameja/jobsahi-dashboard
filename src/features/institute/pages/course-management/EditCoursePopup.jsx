import React, { useState, useEffect } from 'react'
import { LuX, LuPlus, LuUpload } from 'react-icons/lu'
import RichTextEditor from '../../../../shared/components/RichTextEditor.jsx'

const EditCoursePopup = ({ course, onSave, onClose }) => {
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

  useEffect(() => {
    if (course) {
      setFormData({
        courseTitle: course.title || '',
        duration: course.duration || '',
        category: course.category || '',
        description: course.description || '',
        taggedSkills: course.skills ? course.skills.join(', ') : '',
        batchLimits: course.batchLimits || '',
        courseStatus: course.status || 'Active',
        instructorName: course.instructorName || '',
        mode: course.mode || '',
        difficultyLevel: course.difficultyLevel || '',
        price: course.price || '',
        certificationAllowed: course.certificationAllowed !== false
      })
      setModules(course.modules || [])
      setSelectedMedia(course.media || [])
    }
  }, [course])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleAddModule = () => {
    if (newModule.title && newModule.description) {
      setModules(prev => [...prev, { ...newModule, id: Date.now() }])
      setNewModule({ title: '', description: '' })
    }
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

  const getInputClassName = (fieldName) => {
    const baseClass = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
    const errorClass = validationErrors[fieldName] 
      ? "border-red-500 focus:ring-red-500" 
      : "border-gray-300 focus:ring-[#5C9A24]"
    return `${baseClass} ${errorClass}`
  }

  const handleSave = () => {
    // Clear previous validation errors
    setValidationErrors({})
    
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

    const missingFields = requiredFields.filter(field => !formData[field.field] || formData[field.field].toString().trim() === '')
    
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

    // Prepare updated course data with proper field mapping
    const updatedCourse = {
      title: formData.courseTitle,
      category: formData.category?.toUpperCase() || course.category,
      skills: formData.taggedSkills ? formData.taggedSkills.split(',').map(skill => skill.trim()) : course.skills || [],
      description: formData.description,
      price: formData.price,
      status: formData.courseStatus,
      duration: formData.duration,
      batchLimits: formData.batchLimits,
      instructorName: formData.instructorName,
      mode: formData.mode,
      difficultyLevel: formData.difficultyLevel,
      certificationAllowed: formData.certificationAllowed,
      modules: modules,
      media: selectedMedia.map(media => ({
        name: media.name,
        size: media.size,
        type: media.type,
        url: media.url
      }))
    }

    // Call the onSave function with updated course data
    onSave(updatedCourse)
    
    // Show success message
    alert('Course updated successfully!')
  }

  if (!course) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Edit Course</h2>
          <div className="flex gap-4">
          <button
            onClick={onClose}
              className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Discard
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-[#5C9A24] text-white rounded-lg hover:bg-[#3f6c17] transition-colors"
            >
              Update
          </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h3>
            
            <div className="space-y-6">
              {/* Course Title */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  COURSE TITLE <span className="text-red-500">*</span>
                </label>
                  <p className="text-sm text-gray-600">The name of the course or job role.</p>
                </div>
                <div className="flex-1">
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
              </div>

              {/* Duration */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  DURATION (WEEKS) <span className="text-red-500">*</span>
                </label>
                  <p className="text-sm text-gray-600">Duration of the course in weeks.</p>
                </div>
                <div className="flex-1">
                  <div className="relative">
                <input 
                  type="number" 
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className={getInputClassName('duration')}
                  placeholder="e.g. 12"
                />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                {validationErrors.duration && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.duration}</p>
                )}
              </div>
              </div>

              {/* Course Description */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    COURSE DESCRIPTION <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-gray-600">For effective candidate selection, enhance the job description.</p>
                </div>
                <div className="flex-1">
                  <RichTextEditor
                    value={formData.description}
                    onChange={(value) => handleInputChange('description', value)}
                    placeholder="Enter course description"
                    height="150px"
                  />
                  {validationErrors.description && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.description}</p>
                  )}
                </div>
              </div>

              {/* Tagged Skills */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    TAGGED SKILLS
                  </label>
                  <p className="text-sm text-gray-600">List needed skills.</p>
                </div>
                <div className="flex-1">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={formData.taggedSkills}
                      onChange={(e) => handleInputChange('taggedSkills', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5C9A24]"
                      placeholder="e.g. Wiring, Safety Measures"
                    />
                    <button 
                      type="button"
                      className="w-10 h-10 bg-[#5C9A24] text-white rounded-full hover:bg-[#3f6c17] flex items-center justify-center"
                    >
                      <LuPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Batch Limits */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    BATCH LIMITS <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-gray-600">Choose required experience.</p>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <input 
                      type="number" 
                      value={formData.batchLimits}
                      onChange={(e) => handleInputChange('batchLimits', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5C9A24]"
                      placeholder="e.g. 30 students"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex flex-col">
                      <button type="button" className="text-gray-400 hover:text-gray-600">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                      <button type="button" className="text-gray-400 hover:text-gray-600">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Status */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    COURSE STATUS
                  </label>
                  <p className="text-sm text-gray-600">Choose job type.</p>
                </div>
                <div className="flex-1">
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
          </div>

          {/* Additional Settings Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Additional Settings</h3>
            
            <div className="space-y-6">
              {/* Category */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  CATEGORY <span className="text-red-500">*</span>
                </label>
                  <p className="text-sm text-gray-600">Choose category of course.</p>
                </div>
                <div className="flex-1">
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
              </div>

              {/* Difficulty Level */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    DIFFICULTY LEVEL <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-gray-600">Choose difficulty level.</p>
                </div>
                <div className="flex-1">
                  <select 
                    value={formData.difficultyLevel}
                    onChange={(e) => handleInputChange('difficultyLevel', e.target.value)}
                    className={getInputClassName('difficultyLevel')}
                  >
                    <option value="">Select difficulty level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                  {validationErrors.difficultyLevel && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.difficultyLevel}</p>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  PRICE <span className="text-red-500">*</span>
                </label>
                  <p className="text-sm text-gray-600">Choose course price.</p>
                </div>
                <div className="flex-1">
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
              </div>

              {/* Instructor Name */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                    INSTRUCTOR NAME <span className="text-red-500">*</span>
                </label>
                  <p className="text-sm text-gray-600">Name of instructor.</p>
                </div>
                <div className="flex-1">
                  <input 
                    type="text" 
                    value={formData.instructorName}
                    onChange={(e) => handleInputChange('instructorName', e.target.value)}
                    className={getInputClassName('instructorName')}
                    placeholder="e.g. Rajeev Kumar"
                  />
                  {validationErrors.instructorName && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.instructorName}</p>
                )}
              </div>
            </div>
          </div>
        </div>

          {/* Course Modules Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Course Modules</h3>
            
            <div className="space-y-6">
              {/* Module Title */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    MODULE 1 TITLE <span className="text-orange-500">*</span>
                  </label>
                  <p className="text-sm text-gray-600">Name of instructor.</p>
                </div>
                <div className="flex-1">
                  <input 
                    type="text" 
                    value={newModule.title}
                    onChange={(e) => setNewModule(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5C9A24]"
                    placeholder="e.g. intro to HTML"
                  />
                </div>
              </div>

              {/* Module Description */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    MODULE DESCRIPTION <span className="text-orange-500">*</span>
                  </label>
                  <p className="text-sm text-gray-600">Add module description.</p>
                </div>
                <div className="flex-1">
                  <textarea 
                    value={newModule.description}
                    onChange={(e) => setNewModule(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5C9A24]"
                    rows="4"
                    placeholder="Add module description"
                  />
                </div>
              </div>

              
            </div>
          </div>

          {/* Drag and Drop Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
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
                  <LuPlus className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-2">Drag and Drop files here</p>
              </label>
              
              {/* Selected Files List */}
              {selectedMedia.length > 0 && (
                <div className="mt-6 text-left">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Selected Files:</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {selectedMedia.map((media, index) => (
                      <div key={media.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-[#5C9A24] rounded flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <span className="text-sm text-gray-900 truncate">{media.name}</span>
                        </div>
          <button
                          onClick={() => handleRemoveMedia(media.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Remove file"
                        >
                          <LuX className="w-3 h-3" />
          </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditCoursePopup

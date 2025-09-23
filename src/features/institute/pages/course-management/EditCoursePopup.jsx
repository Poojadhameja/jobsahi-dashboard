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

    // Prepare updated course data
    const updatedCourse = {
      ...formData,
      skills: formData.taggedSkills ? formData.taggedSkills.split(',').map(skill => skill.trim()) : [],
      modules: modules,
      media: selectedMedia.map(media => ({
        name: media.name,
        size: media.size,
        type: media.type,
        url: media.url
      }))
    }

    onSave(updatedCourse)
  }

  if (!course) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Edit Course</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <LuX className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Basic Information Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Course Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  COURSE TITLE <span className="text-red-500">*</span>
                </label>
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

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  PRICE <span className="text-red-500">*</span>
                </label>
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

              {/* Course Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  COURSE DESCRIPTION <span className="text-red-500">*</span>
                </label>
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
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#5C9A24] text-white rounded-lg hover:bg-[#3f6c17] transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditCoursePopup

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LuArrowLeft, LuPlus, LuUpload, LuX } from 'react-icons/lu'
import Button, { OutlineButton, IconButton, AddCategoryButton } from '../../../../shared/components/Button.jsx'
import DynamicButton from '../../../../shared/components/DynamicButton.jsx'
import RichTextEditor from '../../../../shared/components/RichTextEditor.jsx'
import { useCourseContext } from '../../context/CourseContext'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'
import { getMethod, postMethod, postMultipart } from '../../../../service/api'
import apiService from '../../services/serviceUrl.js'


export default function CreateCourse() {
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getMethod({ apiUrl: apiService.getCourseCategories })
        if (res?.status && Array.isArray(res.categories)) {
          setCategories(res.categories)
        } else {
        }
      } catch (error) {
      }
    }
    fetchCategories()
  }, [])

  // Fetch instructors/faculty list
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        setLoadingInstructors(true)
        const res = await getMethod({ apiUrl: apiService.getFaculty })
        if (res?.status && Array.isArray(res.data)) {
          setInstructors(res.data)
        } else {
          setInstructors([])
        }
      } catch (error) {
        setInstructors([])
      } finally {
        setLoadingInstructors(false)
      }
    }
    fetchInstructors()
  }, [])
  
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
    fee: '',
    certificationAllowed: true
  })
  const [modules, setModules] = useState([])
  const [newModule, setNewModule] = useState({ title: '', description: '' })
  const [selectedMedia, setSelectedMedia] = useState([])
  const [validationErrors, setValidationErrors] = useState({})
  const [categories, setCategories] = useState([])
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false)
  const [newCategory, setNewCategory] = useState('')
  const [instructors, setInstructors] = useState([])
  const [loadingInstructors, setLoadingInstructors] = useState(false)

  const handleBack = () => {
    navigate('/institute/course-management')
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddCategoryClick = () => {
    setShowAddCategoryModal(true)
    setNewCategory('')
  }

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      alert('Please enter a category name.')
      return
    }

    const categoryName = newCategory.trim()
    
    // Check if category already exists in the list
    const categoryExists = categories.some(cat => 
      (typeof cat === 'string' ? cat : cat.category_name) === categoryName
    )
    
    if (categoryExists) {
      alert('This category already exists!')
      return
    }

    try {
      // Call API to create category
      
      const res = await postMethod({
        apiUrl: apiService.createCourseCategory,
        payload: {
          category_name: categoryName
        }
      })


      // Check for success - API returns { success: true, message: "...", data: {...} }
      // After respChanges, it should have status: 'success' and success: true
      if (res?.success === true || res?.status === 'success' || res?.status === true) {
        // Add the new category to the list (use the response data if available)
        const newCategoryData = res?.data || { id: Date.now(), category_name: categoryName }
        setCategories(prev => [...prev, newCategoryData])
        handleInputChange('category', categoryName)
        setShowAddCategoryModal(false)
        setNewCategory('')
        alert(`✅ Category "${categoryName}" added successfully!`)
      } else {
        // Show the actual error message from API
        // postMethod returns { status: false, message: '...', data: [] } on error
        const errorMessage = res?.message || res?.error?.message || 'Failed to create category. Please try again.'
        alert(`❌ ${errorMessage}`)
      }
    } catch (err) {
      // This catch block should rarely execute since postMethod catches errors
      // But if it does, show the error
      const errorMessage = err?.response?.data?.message || err?.message || 'Something went wrong while creating the category.'
      alert(`❌ ${errorMessage}`)
    }
  }

  const handleCancelAddCategory = () => {
    setShowAddCategoryModal(false)
    setNewCategory('')
  }

  // ✅ Save handler (updated with postMultipart)
  const handleSave = async () => {
    setValidationErrors({})
    const requiredFields = [
      { field: 'courseTitle', label: 'Course Title' },
      { field: 'duration', label: 'Duration' },
      { field: 'category', label: 'Category' },
      { field: 'description', label: 'Course Description' },
      { field: 'batchLimits', label: 'Batch Limits' },
      { field: 'instructorName', label: 'Instructor Name' },
      { field: 'mode', label: 'Mode' },
      { field: 'fee', label: 'fee' }
    ]

    const missingFields = requiredFields.filter(field => !formData[field.field] || formData[field.field].toString().trim() === '')
    if (missingFields.length > 0) {
      const errors = {}
      missingFields.forEach(field => { errors[field.field] = `${field.label} is required` })
      setValidationErrors(errors)
      alert(`Please fill in all required fields`)
      return
    }

    let module_title = ''
    let module_description = ''
    if (modules.length > 0) {
      module_title = modules.map(m => m.title.trim()).join(' | ')
      module_description = modules.map(m => m.description.trim()).join(' || ')
    } else if (newModule.title.trim() && newModule.description.trim()) {
      module_title = newModule.title.trim()
      module_description = newModule.description.trim()
    }

    // Find category ID from categories array
    const selectedCategory = categories.find(cat => cat.category_name === formData.category)
    const categoryId = selectedCategory ? selectedCategory.id : null

    try {
      let res

      if (selectedMedia.length > 0) {
        const formDataToSend = new FormData()
        formDataToSend.append('title', formData.courseTitle.trim())
        formDataToSend.append('description', formData.description.trim())
        formDataToSend.append('duration', formData.duration.trim())
        formDataToSend.append('fee', parseFloat(formData.fee))
        formDataToSend.append('category_id', categoryId)
        formDataToSend.append('tagged_skills', formData.taggedSkills.trim())
        formDataToSend.append('batch_limit', parseInt(formData.batchLimits))
        formDataToSend.append('status', formData.courseStatus)
        formDataToSend.append('instructor_name', formData.instructorName.trim())
        formDataToSend.append('mode', formData.mode)
        formDataToSend.append('certification_allowed', formData.certificationAllowed ? 1 : 0)
        formDataToSend.append('module_title', module_title)
        formDataToSend.append('module_description', module_description)

        selectedMedia.forEach(file => {
          formDataToSend.append('media_files[]', file.file)
        })

        res = await postMultipart({
          apiUrl: apiService.createCourse,
          data: formDataToSend
        })
      } else {
        const payload = {
          title: formData.courseTitle.trim(),
          description: formData.description.trim(),
          duration: formData.duration.trim(),
          fee: parseFloat(formData.fee),
          category_id: categoryId,
          tagged_skills: formData.taggedSkills.trim(),
          batch_limit: parseInt(formData.batchLimits),
          status: formData.courseStatus,
          instructor_name: formData.instructorName.trim(),
          mode: formData.mode,
          certification_allowed: formData.certificationAllowed,
          module_title,
          module_description
        }
        res = await postMethod({ apiUrl: apiService.createCourse, payload })
      }

      if (res?.status || res?.success) {
        alert('✅ Course created successfully!')
        navigate('/institute/course-management')
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
          fee: '',
          certificationAllowed: true
        })
        setModules([])
        setNewModule({ title: '', description: '' })
        setSelectedMedia([])
      } else {
        alert(`❌ ${res?.message || 'Failed to create course'}`)
      }
    } catch (err) {
      alert('Something went wrong while creating the course.')
    }
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
      if (mediaToRemove) URL.revokeObjectURL(mediaToRemove.url)
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
      : `${TAILWIND_COLORS.BORDER} focus:ring-[#5C9A24]`
    return `${baseClass} ${errorClass}`
  }


  return (
    <div className="">
        {/* Header with Action Buttons */}
        <div className="flex items-center mb-6">
          <Button
            onClick={handleBack}
            variant="unstyled"
            size="sm"
            icon={<LuArrowLeft className="w-5 h-5" />}
            className={`gap-2 !px-0 !py-0 bg-transparent ${TAILWIND_COLORS.TEXT_MUTED} hover:text-text-primary transition-colors`}
          >
            <span className="text-sm font-medium">Back to Course Management</span>
          </Button>
        </div>
       
        {/* Basic Information Section */}
        <div className={`mb-8 ${TAILWIND_COLORS.CARD} p-6`}>
        <div className={`flex justify-between items-center mb-8 ${TAILWIND_COLORS.CARD} p-6`}>
          <h1 className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Add New Course</h1>
        </div>
          <h2 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-6`}>Basic Information</h2>
          
          <div className="space-y-6">
            {/* Course Title */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
              <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                  COURSE TITLE <span className="text-red-500">*</span>
                </label>
                <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Enter the name of the course or job role.</p>
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
                <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                  DURATION (WEEKS) <span className="text-red-500">*</span>
                </label>
                <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Specify the total duration of the course in weeks.</p>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <input 
                    type="text" 
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className={getInputClassName('duration')}
                    placeholder="e.g. 12"
                  />
                </div>
                {validationErrors.duration && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.duration}</p>
                )}
              </div>
            </div>

            {/* Category */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
              <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                  CATEGORY <span className="text-red-500">*</span>
                </label>
                <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Choose a category like "Technical".</p>
              </div>
              <div className="flex-1">
                <select 
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className={getInputClassName('category') }
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
  <option key={category.id} value={category.category_name}>
    {category.category_name}
  </option>
))}

                </select>
                {validationErrors.category && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.category}</p>
                )}
              </div>
              <AddCategoryButton
                type="button"
                onClick={handleAddCategoryClick}
                className="flex items-center gap-2 font-semibold"
              >
                <LuPlus className="w-4 h-4 text-white" />
                Add Category
              </AddCategoryButton>
            </div>

            {/* Course Description */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
              <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                  COURSE DESCRIPTION <span className="text-red-500">*</span>
                </label>
                <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Select the domain or trade related to the course.</p>
              </div>
              <div className="flex-1">
                <RichTextEditor
                  value={formData.description}
                  onChange={(value) => handleInputChange('description', value)}
                  placeholder="Enter course description"
                  height="150px"
                  returnPlainText={true}
                />
              </div>
            </div>

            {/* Tagged Skills */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
              <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                  TAGGED SKILLS
                </label>
                <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Add relevant skills taught in the course.</p>
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
                </div>
              </div>
            </div> 

            {/* Batch Limits */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
              <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                  BATCH LIMITS <span className="text-red-500">*</span>
                </label>
                <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Specify the maximum number of students.</p>
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
                <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                  COURSE STATUS
                </label>
                <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Set the current status of the course.</p>
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
        <div className={`mb-8 ${TAILWIND_COLORS.CARD} p-6`}>
          <h2 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-6`}>Additional Settings</h2>
          
          <div className="space-y-6">
            {/* Instructor Name */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
              <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                  INSTRUCTOR NAME <span className="text-red-500">*</span>
                </label>
                <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Select the instructor for this course.</p>
              </div>
              <div className="flex-1">
                <select 
                  value={formData.instructorName}
                  onChange={(e) => handleInputChange('instructorName', e.target.value)}
                  className={getInputClassName('instructorName')}
                  disabled={loadingInstructors}
                >
                  <option value="">{loadingInstructors ? 'Loading instructors...' : 'Select instructor'}</option>
                  {instructors.map((instructor, index) => (
                    <option key={instructor.id || index} value={instructor.name}>
                      {instructor.name}
                    </option>
                  ))}
                </select>
                {validationErrors.instructorName && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.instructorName}</p>
                )}
                {!loadingInstructors && instructors.length === 0 && (
                  <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>No instructors available. Please add instructors first.</p>
                )}
              </div>
            </div>

            {/* Mode */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
              <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                  MODE <span className="text-red-500">*</span>
                </label>
                <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Mode of the course</p>
              </div>
              <div className="flex-1">
                <select 
                  value={formData.mode}
                  onChange={(e) => handleInputChange('mode', e.target.value)}
                  className={getInputClassName('mode')}
                >
                  <option value="">Select course mode</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                {validationErrors.mode && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.mode}</p>
                )}
              </div>
            </div>


            {/* fee */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
              <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                  fee <span className="text-red-500">*</span>
                </label>
                <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Enter the course fee in Indian Rupees.</p>
              </div>
              <div className="flex-1">
                <input 
                  type="text" 
                  value={formData.fee}
                  onChange={(e) => handleInputChange('fee', e.target.value)}
                  className={getInputClassName('fee')}
                  placeholder="ex. 15,000"
                />
                {validationErrors.fee && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.fee}</p>
                )}
              </div>
            </div>

            {/* Certification Allowed */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
              <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                  CERTIFICATION
                </label>
                <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Allow certification for this course</p>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        checked={formData.certificationAllowed}
                        onChange={(e) => handleInputChange('certificationAllowed', e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                        formData.certificationAllowed 
                          ? 'bg-[#5C9A24] border-[#5C9A24]' 
                          : 'bg-white border-gray-300 hover:border-[#5C9A24]'
                      }`}>
                        {formData.certificationAllowed && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                      Is Certification Allowed for this Course?
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Modules Section */}
        <div className={`mb-8 ${TAILWIND_COLORS.CARD} p-6`}>
          <h2 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-6`}>Course Modules</h2>
          
          <div className="space-y-6">
            {/* Module Title */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
              <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                  MODULE TITLE <span className="text-orange-500">*</span>
                </label>
                <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Enter the name of the module.</p>
              </div>
              <div className="flex-1">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newModule.title}
                    onChange={(e) => {
                      setNewModule(prev => ({ ...prev, title: e.target.value }))
                      // Clear validation error when user starts typing
                      if (validationErrors.moduleTitle) {
                        setValidationErrors(prev => {
                          const newErrors = { ...prev }
                          delete newErrors.moduleTitle
                          return newErrors
                        })
                      }
                    }}
                    className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      validationErrors.moduleTitle 
                        ? "border-red-500 focus:ring-red-500" 
                        : "border-gray-300 focus:ring-[#5C9A24]"
                    }`}
                    placeholder="e.g. intro to HTML"
                  />
                </div>
                {validationErrors.moduleTitle && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.moduleTitle}</p>
                )}
              </div>
            </div>

            {/* Module Description */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
              <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                  MODULE DESCRIPTION <span className="text-orange-500">*</span>
                </label>
                <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Describe the content and objective of the module.</p>
              </div>
              <div className="flex-1">
                <textarea 
                  value={newModule.description}
                  onChange={(e) => {
                    setNewModule(prev => ({ ...prev, description: e.target.value }))
                    // Clear validation error when user starts typing
                    if (validationErrors.moduleDescription) {
                      setValidationErrors(prev => {
                        const newErrors = { ...prev }
                        delete newErrors.moduleDescription
                        return newErrors
                      })
                    }
                  }}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    validationErrors.moduleDescription 
                      ? "border-red-500 focus:ring-red-500" 
                      : "border-gray-300 focus:ring-[#5C9A24]"
                  }`}
                  rows="4"
                  placeholder="Add module description"
                />
                {validationErrors.moduleDescription && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.moduleDescription}</p>
                )}
              </div>
            </div>
          </div>

          {/* Display added modules */}
          {modules.length > 0 && (
            <div className="mt-6">
              <h3 className={`text-md font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Added Modules</h3>
              {modules.map((module, index) => (
                <div key={module.id} className="bg-gray-50 p-4 rounded-md mb-2">
                  <h4 className={`font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{module.title}</h4>
                  <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>{module.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Media Section */}
        <div className={`mb-8 ${TAILWIND_COLORS.CARD} p-6`}>
          <h2 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-6`}>Add Media</h2>
          
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
                <LuPlus className={`w-6 h-6 ${TAILWIND_COLORS.TEXT_MUTED}`} />
              </div>
              <p className={`${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>Drag and Drop files here</p>
            </label>
            
            {/* Selected Files List */}
            {selectedMedia.length > 0 && (
              <div className="mt-6 text-left">
                <h4 className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-3`}>Selected Files:</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {selectedMedia.map((media, index) => (
                    <div key={media.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-[#5C9A24] rounded flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <span className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} truncate`}>{media.name}</span>
                      </div>
                      <IconButton
                        label="Remove file"
                        variant="unstyled"
                        size="sm"
                        onClick={() => handleRemoveMedia(media.id)}
                        className="px-1 py-1 text-red-500 hover:text-red-700"
                        title="Remove file"
                      >
                        <LuX className="w-3 h-3" />
                      </IconButton>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

            {/* Selected Media Preview */}
            {selectedMedia.length > 0 && (
              <div className="mt-6">
                <h3 className={`text-md font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Selected Media ({selectedMedia.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedMedia.map((media) => (
                    <div key={media.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} truncate`}>{media.name}</p>
                          <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED}`}>{formatFileSize(media.size)}</p>
                        </div>
                        <IconButton
                          label="Remove file"
                          variant="unstyled"
                          size="sm"
                          onClick={() => handleRemoveMedia(media.id)}
                          className="ml-2 px-1 py-1 text-red-500 hover:text-red-700"
                          title="Remove file"
                        >
                          <LuX className="w-4 h-4" />
                        </IconButton>
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
                              <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED}`}>{media.type.split('/')[1]?.toUpperCase()}</p>
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
        
        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
            {/* Using OutlineButton from Button.jsx */}
            <OutlineButton 
              onClick={handleCancel}
              size="md"
            >
              Cancel
            </OutlineButton>
            
            {/* Using DynamicButton for Save */}
            <DynamicButton 
              onClick={handleSave}
              backgroundColor="var(--color-secondary)"
              textColor="white"
              padding="8px 24px"
              borderRadius="8px"
              hoverBackgroundColor="#059669"
            >
              Save
            </DynamicButton>
          </div>

        {/* ✅ Add Category Modal */}
        {showAddCategoryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                  Add New Category
                </h3>
                <IconButton
                  label="Close"
                  variant="unstyled"
                  size="sm"
                  onClick={handleCancelAddCategory}
                  className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} hover:text-text-primary`}
                >
                  <LuX className="w-5 h-5" />
                </IconButton>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="mb-4">
                  <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                    CATEGORY NAME <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5C9A24]"
                    placeholder="e.g. Healthcare, Finance, Marketing"
                    autoFocus
                  />
                  <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>
                    Enter a unique category name for your course.
                  </p>
                </div>

                {/* Modal Actions */}
                <div className="flex justify-end gap-3">
                  <OutlineButton
                    type="button"
                    onClick={handleCancelAddCategory}
                  >
                    Cancel
                  </OutlineButton>
                  <Button
                    type="button"
                    onClick={handleAddCategory}
                    variant="primary"
                    className="font-semibold"
                  >
                    Add Category
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

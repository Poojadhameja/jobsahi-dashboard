import React, { useState, useEffect } from 'react'
import { LuBuilding, LuUpload, LuSave, LuCheck, LuCircleAlert } from 'react-icons/lu'
import Button from '../../../../shared/components/Button'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'

export default function InstituteProfile() {
  const [formData, setFormData] = useState({
    // Institute Profile
    instituteName: 'Satpuda ITI College',
    tagline: 'Skill. Strength. Success - The Satpuda Way.',
    description: 'Satpuda College is a premier ITI institute dedicated to empowering students with hands-on technical skills and industry-relevant training. With a focus on practical learning, expert faculty, and state-of-the-art facilities, the institute prepares students for rewarding careers in fields like electrical, mechanical, and computer-based trades. Satpuda College fosters a future-ready mindset, ensuring every student is skilled, confident, and job-ready from day one.',
    logo: null,
    
    // Contact Information
    email: 'contact@satpudaengineeringcollege.com',
    phone: '+91 8818837632',
    website: 'https://satpudaengineeringcollege.com/',
    address: 'Lalbarra - Balaghat Road, Manjhapur, Madhya Pradesh 481001'
  })

  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(true)
  const [saveStatus, setSaveStatus] = useState(null) // 'success', 'error', null

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  }

  const validateWebsite = (website) => {
    try {
      new URL(website)
      return true
    } catch {
      return false
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Institute Profile validation
    if (!formData.instituteName.trim()) {
      newErrors.instituteName = 'Institute name is required'
    }

    if (!formData.tagline.trim()) {
      newErrors.tagline = 'Tagline is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters long'
    }

    // Contact Information validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.website.trim()) {
      newErrors.website = 'Website URL is required'
    } else if (!validateWebsite(formData.website)) {
      newErrors.website = 'Please enter a valid website URL'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const handleLogoUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          logo: 'Please select a valid image file'
        }))
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          logo: 'File size must be less than 5MB'
        }))
        return
      }

      setFormData(prev => ({
        ...prev,
        logo: file
      }))

      // Clear logo error
      if (errors.logo) {
        setErrors(prev => ({
          ...prev,
          logo: ''
        }))
      }
    }
  }

  const handleSave = async () => {
    if (!validateForm()) {
      setIsFormValid(false)
      return
    }

    setIsSaving(true)
    setSaveStatus(null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate success
      setSaveStatus('success')
      setIsFormValid(true)
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveStatus(null)
      }, 3000)
    } catch (error) {
      setSaveStatus('error')
    } finally {
      setIsSaving(false)
    }
  }

  // Validate form on mount and when form data changes
  useEffect(() => {
    const isValid = validateForm()
    setIsFormValid(isValid)
  }, [formData])

  return (
    <div className={`space-y-8 ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
      {/* Institute Profile Section */}
      <div className={`${TAILWIND_COLORS.CARD} p-6`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Institute Profile</h2>
            <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Institute Performance Dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            {saveStatus === 'success' && (
              <div className="flex items-center gap-2 text-success text-sm">
                <LuCheck className="w-4 h-4" />
                <span>Saved successfully!</span>
              </div>
            )}
            {saveStatus === 'error' && (
              <div className="flex items-center gap-2 text-error text-sm">
                <LuCircleAlert className="w-4 h-4" />
                <span>Failed to save. Please try again.</span>
              </div>
            )}
            <Button
              onClick={handleSave}
              loading={isSaving}
              disabled={!isFormValid}
              className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                isFormValid 
                  ? `${TAILWIND_COLORS.BTN_SECONDARY}` 
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              }`}
              icon={<LuSave className="w-4 h-4" />}
            >
              Save
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Logo Upload */}
          <div className="lg:col-span-1">
            <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>
              Institute Logo
            </label>
            <div className="space-y-4">
              <div className={`border-2 border-dashed ${TAILWIND_COLORS.BORDER} rounded-lg p-8 text-center`}>
                <div className={`mx-auto w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-4`}>
                  {formData.logo ? (
                    <img
                      src={URL.createObjectURL(formData.logo)}
                      alt="Institute Logo"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <LuBuilding className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <input
                  type="file"
                  id="logo-upload"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <label
                  htmlFor="logo-upload"
                  className={`inline-flex items-center gap-2 px-4 py-2 ${TAILWIND_COLORS.BTN_PRIMARY} rounded-md cursor-pointer transition-colors`}
                >
                  <LuUpload className="w-4 h-4" />
                  Upload Logo
                </label>
                <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mt-2`}>
                  Recommended: 200x200px, PNG or JPG format
                </p>
                {errors.logo && (
                  <p className="text-xs text-error mt-1">{errors.logo}</p>
                )}
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>
                Institute Name
              </label>
              <input
                type="text"
                value={formData.instituteName}
                onChange={(e) => handleInputChange('instituteName', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent ${TAILWIND_COLORS.TEXT_PRIMARY} ${
                  errors.instituteName ? 'border-error' : TAILWIND_COLORS.BORDER
                }`}
                placeholder="Enter institute name"
              />
              {errors.instituteName && (
                <p className="text-xs text-error mt-1">{errors.instituteName}</p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>
                Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => handleInputChange('tagline', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent ${TAILWIND_COLORS.TEXT_PRIMARY} ${
                  errors.tagline ? 'border-error' : TAILWIND_COLORS.BORDER
                }`}
                placeholder="Enter institute tagline"
              />
              {errors.tagline && (
                <p className="text-xs text-error mt-1">{errors.tagline}</p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={6}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent resize-none ${TAILWIND_COLORS.TEXT_PRIMARY} ${
                  errors.description ? 'border-error' : TAILWIND_COLORS.BORDER
                }`}
                placeholder="Enter institute description"
              />
              {errors.description && (
                <p className="text-xs text-error mt-1">{errors.description}</p>
              )}
              <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>
                {formData.description.length}/50 characters minimum
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className={`${TAILWIND_COLORS.CARD} p-6`}>
        <div className="mb-6">
          <h2 className={`text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Contact Information</h2>
          <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Institute Performance Dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent ${TAILWIND_COLORS.TEXT_PRIMARY} ${
                errors.email ? 'border-error' : TAILWIND_COLORS.BORDER
              }`}
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="text-xs text-error mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent ${TAILWIND_COLORS.TEXT_PRIMARY} ${
                errors.phone ? 'border-error' : TAILWIND_COLORS.BORDER
              }`}
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className="text-xs text-error mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>
              Website
            </label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent ${TAILWIND_COLORS.TEXT_PRIMARY} ${
                errors.website ? 'border-error' : TAILWIND_COLORS.BORDER
              }`}
              placeholder="Enter website URL"
            />
            {errors.website && (
              <p className="text-xs text-error mt-1">{errors.website}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>
              Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent ${TAILWIND_COLORS.TEXT_PRIMARY} ${
                errors.address ? 'border-error' : TAILWIND_COLORS.BORDER
              }`}
              placeholder="Enter full address"
            />
            {errors.address && (
              <p className="text-xs text-error mt-1">{errors.address}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
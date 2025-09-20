import React, { useState } from 'react'
import { LuUpload, LuCalendar } from 'react-icons/lu'
import RichTextEditor from '@shared/components/RichTextEditor'

const PostJob = ({ onJobSubmit }) => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobSector: '',
    jobDescription: '',
    salaryType: '',
    minSalary: '',
    maxSalary: '',
    jobType: '',
    requiredSkills: '',
    experience: '',
    uploadedFiles: [],
    country: '',
    city: '',
    state: '',
    fullAddress: '',
    contactPerson: '',
    phone: '',
    additionalContact: '',
    vacancyStatus: '',
    openingDate: '',
    closingDate: ''
  })

  const [errors, setErrors] = useState({})
  const [showWarning, setShowWarning] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    // Special handling for phone number - only allow numbers and limit to 10 digits
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '') // Remove all non-numeric characters
      if (numericValue.length <= 10) {
        setFormData(prev => ({
          ...prev,
          [name]: numericValue
        }))
      }
      return
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRichTextChange = (value) => {
    setFormData(prev => ({
      ...prev,
      jobDescription: value
    }))
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    setFormData(prev => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...files]
    }))
  }

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index)
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Required fields validation
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required'
    if (!formData.jobSector) newErrors.jobSector = 'Job sector is required'
    if (!formData.jobDescription.trim()) newErrors.jobDescription = 'Job description is required'
    if (!formData.salaryType) newErrors.salaryType = 'Salary type is required'
    if (!formData.minSalary.trim()) newErrors.minSalary = 'Minimum salary is required'
    if (!formData.maxSalary.trim()) newErrors.maxSalary = 'Maximum salary is required'
    if (!formData.jobType) newErrors.jobType = 'Job type is required'
    if (formData.uploadedFiles.length === 0) newErrors.uploadedFiles = 'At least one file is required'
    if (!formData.country) newErrors.country = 'Country is required'
    if (!formData.city) newErrors.city = 'City is required'
    if (!formData.state) newErrors.state = 'State is required'
    if (!formData.fullAddress.trim()) newErrors.fullAddress = 'Full address is required'
    if (!formData.vacancyStatus) newErrors.vacancyStatus = 'Vacancy status is required'
    if (!formData.openingDate) newErrors.openingDate = 'Opening date is required'
    if (!formData.closingDate) newErrors.closingDate = 'Closing date is required'
    
    // Phone number validation
    if (formData.phone && formData.phone.length !== 10) {
      newErrors.phone = 'Phone number must be exactly 10 digits'
    }
    
    // Date validation
    if (formData.openingDate && formData.closingDate) {
      const openingDate = new Date(formData.openingDate)
      const closingDate = new Date(formData.closingDate)
      if (openingDate >= closingDate) {
        newErrors.closingDate = 'Closing date must be after opening date'
      }
    }
    
    // Salary validation
    if (formData.minSalary && formData.maxSalary) {
      const minSalary = parseFloat(formData.minSalary)
      const maxSalary = parseFloat(formData.maxSalary)
      if (minSalary >= maxSalary) {
        newErrors.maxSalary = 'Maximum salary must be greater than minimum salary'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      setShowWarning(true)
      setTimeout(() => setShowWarning(false), 5000) // Hide warning after 5 seconds
      return
    }
    
    if (onJobSubmit) {
      onJobSubmit(formData)
    }
    console.log('Job created successfully:', formData)
    
    // Reset form after successful submission
    setFormData({
      jobTitle: '',
      jobSector: '',
      jobDescription: '',
      salaryType: '',
      minSalary: '',
      maxSalary: '',
      jobType: '',
      requiredSkills: '',
      experience: '',
      uploadedFiles: [],
      country: '',
      city: '',
      state: '',
      fullAddress: '',
      contactPerson: '',
      phone: '',
      additionalContact: '',
      vacancyStatus: '',
      openingDate: '',
      closingDate: ''
    })
    setErrors({})
  }

  const handleCancel = () => {
    console.log('Form cancelled')
  }

  const handleDraft = () => {
    console.log('Save as draft:', formData)
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] p-2">
      {/* Warning Message */}
      {showWarning && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">Please fill in all required fields before saving!</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-[var(--color-primary)]">
          Create Job Posts
        </h1>
        
        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={handleCancel}
            className="px-5 py-2 bg-secondary-10 text-[var(--color-secondary)] rounded-full font-bold hover:bg-[var(--color-secondary)] hover:text-white border-2 border-[var(--color-secondary)] transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <span>Cancel</span>
          </button>
          <button
            onClick={handleDraft}
            className="px-5 py-2 bg-secondary-10 text-[var(--color-secondary)] rounded-full font-bold hover:bg-[var(--color-secondary)] hover:text-white border-2 border-[var(--color-secondary)] transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <span>Draft</span>
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-[var(--color-secondary)] text-white rounded-full font-bold hover:bg-[var(--color-secondary)] hover:text-white border-2 border-[var(--color-secondary)] transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <span>Save</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information Form */}
        <div className="bg-white rounded-xl border border-[var(--color-primary)3C] p-5">
          <h2 className="text-xl font-bold text-gray-900 mb-8">Basic Information</h2>
          
          <div className="space-y-8">
            {/* Job Title */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  JOB TITLE<span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-500">Add position name</p>
              </div>
              <div className="lg:col-span-2">
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none ${
                    errors.jobTitle ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter job title"
                  required
                />
                {errors.jobTitle && (
                  <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>
                )}
              </div>
            </div>

            {/* Job Sector */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  JOB SECTOR<span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-500">Choose category</p>
              </div>
              <div className="lg:col-span-2">
                <select
                  name="jobSector"
                  value={formData.jobSector}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none ${
                    errors.jobSector ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">Choose Category</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="education">Education</option>
                </select>
                {errors.jobSector && (
                  <p className="text-red-500 text-sm mt-1">{errors.jobSector}</p>
                )}
              </div>
            </div>

            {/* Job Description */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  JOB DESCRIPTION<span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-500">For effective candidate selection, enhance the job description with</p>
              </div>
              <div className="lg:col-span-2">
                <RichTextEditor
                  value={formData.jobDescription}
                  onChange={handleRichTextChange}
                  placeholder="Describe the job responsibilities, requirements, and benefits..."
                  height="200px"
                />
              </div>
            </div>

            {/* Salary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  SALARY<span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-500">Choose category</p>
              </div>
              <div className="lg:col-span-2">
                <div className="flex gap-4">
                  <select
                    name="salaryType"
                    value={formData.salaryType}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
                    required
                  >
                    <option value="">Choose salary type</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                    <option value="Hourly">Hourly</option>
                  </select>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">₹</span>
                    <input
                      type="text"
                      name="minSalary"
                      value={formData.minSalary}
                      onChange={handleInputChange}
                      className="w-24 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
                      placeholder="Min"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">₹</span>
                    <input
                      type="text"
                      name="maxSalary"
                      value={formData.maxSalary}
                      onChange={handleInputChange}
                      className="w-24 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
                      placeholder="Max"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Job Type */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  JOB TYPE<span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-500">Choose job type</p>
              </div>
              <div className="lg:col-span-2">
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
                  required
                >
                  <option value="">Choose job type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
            </div>

            {/* Required Skills */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  REQUIRED SKILLS
                </label>
                <p className="text-sm text-gray-500">List needed skills</p>
              </div>
              <div className="lg:col-span-2">
                <input
                  type="text"
                  name="requiredSkills"
                  value={formData.requiredSkills}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
                  placeholder="e.g., JavaScript, React, Node.js, Python"
                />
              </div>
            </div>

            {/* Experience */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  EXPERIENCE
                </label>
                <p className="text-sm text-gray-500">Choose required experience</p>
              </div>
              <div className="lg:col-span-2">
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
                  placeholder="e.g., 2-5 years, 1-3 years, 5+ years"
                />
              </div>
            </div>

            {/* File Attachment */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  FILE ATTACHMENT<span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-500">Upload related documents.</p>
              </div>
              <div className="">
                <div className="space-y-4 ">
                  <label className="flex items-center justify-center border-2 border-dashed border-[var(--color-secondary)] rounded-lg cursor-pointer bg-secondary-10 hover:bg-secondary-10 transition-colors">
                    <div className="py-2 flex flex-col items-center">
                      <LuUpload className="text-[var(--color-secondary)] mb-2" size={24} />
                      <span className="text-[var(--color-secondary)] font-medium">↑ Upload Files</span>
                    </div>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  
                  {/* Display uploaded files */}
                  {formData.uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      {formData.uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-sm text-gray-700">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  {errors.uploadedFiles && (
                    <p className="text-red-500 text-sm mt-1">{errors.uploadedFiles}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Address / Location Form */}
        <div className="bg-white rounded-xl border border-[var(--color-primary)3C] p-5">
          <h2 className="text-xl font-bold text-gray-900 mb-8">Address / Location</h2>
          
          <div className="space-y-8">
            {/* Country */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  COUNTRY<span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-500">Select job location country</p>
              </div>
              <div className="lg:col-span-2">
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
                  required
                >
                  <option value="">Select country</option>
                  <option value="india">India</option>
                  <option value="usa">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="canada">Canada</option>
                </select>
              </div>
            </div>

            {/* City */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  CITY<span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-500">Choose job city</p>
              </div>
              <div className="lg:col-span-2">
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
                  required
                >
                  <option value="">Select city</option>
                  <option value="indore">Indore</option>
                  <option value="bhopal">Bhopal</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="delhi">Delhi</option>
                </select>
              </div>
            </div>

            {/* State */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  STATE<span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-500">Choose job state</p>
              </div>
              <div className="lg:col-span-2">
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
                  required
                >
                  <option value="">Select state</option>
                  <option value="madhya-pradesh">Madhya Pradesh</option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="delhi">Delhi</option>
                  <option value="karnataka">Karnataka</option>
                </select>
              </div>
            </div>

            {/* Full Address */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  FULL ADDRESS<span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-500">Enter complete location</p>
              </div>
              <div className="lg:col-span-2">
                <input
                  type="text"
                  name="fullAddress"
                  value={formData.fullAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
                  placeholder="Enter complete address with street, area, landmark"
                  required
                />
              </div>
            </div>
          </div>
        </div>

       <div className="flex flex-col lg:flex-row gap-4">
         {/* Contact Information Form */}
         <div className="bg-white rounded-xl border border-[var(--color-primary)3C] p-5 w-full lg:w-[50%]">
          <h2 className="text-xl font-bold text-gray-900 mb-8">Contact information</h2>
          
          <div className="space-y-8">
            {/* Person */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  PERSON
                </label>
                <p className="text-sm text-gray-500">Enter contact person's name</p>
              </div>
              <div className="lg:col-span-2">
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
                  placeholder="Enter contact person's full name"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  PHONE
                </label>
                <p className="text-sm text-gray-500">Add contact number</p>
              </div>
              <div className="lg:col-span-2">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Additional Contact */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  ADDITIONAL CONTACT
                </label>
                <p className="text-sm text-gray-500">Add alternate contact</p>
              </div>
              <div className="lg:col-span-2">
                <input
                  type="email"
                  name="additionalContact"
                  value={formData.additionalContact}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
                  placeholder="Enter email address"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dates and Status Form */}
        <div className="bg-white rounded-xl border border-[var(--color-primary)3C] p-5 w-full lg:w-[50%]">
          <h2 className="text-xl font-bold text-gray-900 mb-8">Dates and Status</h2>
          
          <div className="space-y-8">
            {/* Vacancy Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  VACANCY STATUS<span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-500">Select hiring status</p>
              </div>
              <div className="lg:col-span-2">
                <select
                  name="vacancyStatus"
                  value={formData.vacancyStatus}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
                  required
                >
                  <option value="">Select hiring status</option>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>

            {/* Opening Date */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  OPENING<span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-500">Choose job post start</p>
              </div>
              <div className="lg:col-span-2">
                <div className="relative">
                  <input
                    type="date"
                    name="openingDate"
                    value={formData.openingDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none pr-10"
                    required
                  />
                  <LuCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>
            </div>

            {/* Closing Date */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  CLOSING<span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-500">Choose job post end</p>
              </div>
              <div className="lg:col-span-2">
                <div className="relative">
                  <input
                    type="date"
                    name="closingDate"
                    value={formData.closingDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none pr-10"
                    required
                  />
                  <LuCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
       </div>
      </form>
    </div>
  )
}

export default PostJob

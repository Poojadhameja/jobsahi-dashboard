import React, { useState, useEffect } from 'react'
import { LuBuilding, LuUpload, LuSave, LuCheck, LuCircleAlert, LuX, LuLightbulb } from 'react-icons/lu'
import Button from '../../../../shared/components/Button'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'
import Swal from 'sweetalert2'

import { getMethod, putMethod, putMultipart } from '../../../../service/api'
import apiService from '../../services/serviceUrl'

export default function InstituteProfile() {

  const [formData, setFormData] = useState({
    instituteName: '',
    registrationNumber: '',
    instituteType: '',
    description: '',
    logo: null,
    accreditation: '',
    establishedYear: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    postalCode: '',
    contactPerson: '',
    contactDesignation: ''
  })

  const [logoPreview, setLogoPreview] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(true)
  const [saveStatus, setSaveStatus] = useState(null)
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)
  const [instituteTypes, setInstituteTypes] = useState([])
  const [loadingInstituteTypes, setLoadingInstituteTypes] = useState(false)

  /* ----------------------------------------
       VALIDATIONS (UNCHANGED)
  ---------------------------------------- */
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone.replace(/\s/g, ''))
  const validateWebsite = (url) => { try { new URL(url); return true } catch { return false } }

  const validateForm = () => {
    const e = {}

    if (!formData.instituteName.trim()) e.instituteName = 'Institute name is required'
    if (!formData.description.trim()) e.description = 'Description is required'
    else if (formData.description.length < 50) e.description = 'Minimum 50 characters required'

    if (formData.establishedYear &&
      (formData.establishedYear < 1800 || formData.establishedYear > new Date().getFullYear())
    ) e.establishedYear = 'Enter a valid year'

    if (!formData.email.trim()) e.email = 'Email required'
    else if (!validateEmail(formData.email)) e.email = 'Invalid email'

    if (!formData.phone.trim()) e.phone = 'Phone required'
    else if (!validatePhone(formData.phone)) e.phone = 'Phone number must be exactly 10 digits'

    if (!formData.website.trim()) e.website = 'Website required'
    else if (!validateWebsite(formData.website)) e.website = 'Invalid URL'

    if (!formData.address.trim()) e.address = 'Address required'

    setErrors(e)
    return Object.keys(e).length === 0
  }

  /* ----------------------------------------
        INPUT CHANGE HANDLER
  ---------------------------------------- */
  const handleInputChange = (field, value) => {
    // Special handling for phone field - only numbers and max 10 digits
    if (field === 'phone') {
      // Remove all non-numeric characters
      const numericValue = value.replace(/\D/g, '')
      // Limit to 10 digits
      const limitedValue = numericValue.slice(0, 10)
      
      setFormData((prev) => ({
        ...prev,
        [field]: limitedValue
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value
      }))
    }

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  /* ----------------------------------------
         LOGO UPLOAD HANDLER
  ---------------------------------------- */
  const handleLogoUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setErrors((p) => ({ ...p, logo: 'Please upload an image file' }))
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((p) => ({ ...p, logo: 'Max size 5MB' }))
      return
    }

    setFormData((p) => ({ ...p, logo: file }))
    setLogoPreview(null)
  }

  /* ----------------------------------------
          LOGO REMOVE HANDLER
  ---------------------------------------- */
  const handleLogoRemove = () => {
    setFormData((p) => ({ ...p, logo: null }))
    setLogoPreview(null)
  }

  /* ----------------------------------------
      FETCH INSTITUTE TYPES FROM BACKEND
  ---------------------------------------- */
  const fetchInstituteTypes = async () => {
    try {
      setLoadingInstituteTypes(true)
      const res = await getMethod({ apiUrl: apiService.getInstituteProfile })

      // Required types that must always be available for PUT API
      const requiredTypes = ['Public', 'Private', 'Government']
      let apiTypes = []

      if (res?.success) {
        // Check if API returns available institute types
        if (res?.data?.institute_types && Array.isArray(res.data.institute_types)) {
          apiTypes = res.data.institute_types
        } 
        // Or extract unique types from profiles if multiple profiles exist
        else if (res?.data?.profiles && Array.isArray(res.data.profiles)) {
          apiTypes = [...new Set(res.data.profiles.map(p => p.institute_info?.institute_type).filter(Boolean))]
        }
        // Or check if single profile response has types
        else if (res?.data?.institute_info?.available_types) {
          apiTypes = res.data.institute_info.available_types
        }
      }

      // Merge required types with API types, ensuring required types are always included and prioritized
      // Required types (Public, Private, Government) are placed first, then API types
      const allTypes = [...requiredTypes, ...apiTypes]
      const mergedTypes = [...new Set(allTypes)]
      setInstituteTypes(mergedTypes)
    } catch (err) {
      console.error('Error fetching institute types:', err)
      // Fallback: always include required types (Public, Private, Government) for PUT API
      setInstituteTypes(['Public', 'Private', 'Government'])
    } finally {
      setLoadingInstituteTypes(false)
    }
  }

  /* ----------------------------------------
      FETCH PROFILE (UPDATED MAPPING)
  ---------------------------------------- */
  const fetchInstituteProfile = async () => {
    try {
      setIsLoadingProfile(true)
      const res = await getMethod({ apiUrl: apiService.getInstituteProfile })

      if (res?.success) {
        let profile = null

        if (res?.data?.profiles?.length) profile = res.data.profiles[0]
        else if (res?.data) profile = res.data

        if (!profile) return

        setFormData({
          instituteName: profile.institute_info?.institute_name ?? '',
          registrationNumber: profile.institute_info?.registration_number ?? '',
          instituteType: profile.institute_info?.institute_type ?? '',
          description: profile.institute_info?.description ?? '',
          accreditation: profile.institute_info?.accreditation ?? '',
          establishedYear: profile.institute_info?.established_year ?? '',
          website: profile.institute_info?.website ?? '',

          address: profile.contact_info?.address ?? '',
          postalCode: profile.contact_info?.postal_code ?? '',
          contactPerson: profile.contact_info?.contact_person ?? '',
          contactDesignation: profile.contact_info?.contact_designation ?? '',

          email: profile.personal_info?.email ?? '',
          phone: profile.personal_info?.phone_number ?? '',
          logo: null
        })

        const logoURL = profile.institute_info?.institute_logo
        if (logoURL) setLogoPreview(logoURL)
      }

    } catch (err) {
      console.log('Error:', err)
    } finally {
      setIsLoadingProfile(false)
    }
  }

  /* ----------------------------------------
      SAVE PROFILE (PUT) UPDATED RESPONSE MAP
  ---------------------------------------- */
  const handleSave = async () => {
    if (!validateForm()) {
      setIsFormValid(false)
      return
    }

    setIsSaving(true)
    setSaveStatus(null)

    try {
      const fd = new FormData()

      // Only append fields that have non-empty values
      // Sync user_name and institute_name (API requirement: they must be the same)
      if (formData.instituteName?.trim()) {
        const instituteNameValue = formData.instituteName.trim()
        fd.append('institute_name', instituteNameValue)
        fd.append('user_name', instituteNameValue)  // Auto-sync with institute_name
      }
      
      // Personal info fields (updates users table)
      if (formData.email?.trim()) {
        fd.append('email', formData.email.trim())
      }
      if (formData.phone?.trim()) {
        fd.append('phone_number', formData.phone.trim())
      }
      
      if (formData.registrationNumber?.trim()) {
        fd.append('registration_number', formData.registrationNumber.trim())
      }
      if (formData.instituteType?.trim()) {
        fd.append('institute_type', formData.instituteType.trim())
      }
      if (formData.description?.trim()) {
        fd.append('description', formData.description.trim())
      }
      if (formData.website?.trim()) {
        fd.append('website', formData.website.trim())
      }
      if (formData.accreditation?.trim()) {
        fd.append('accreditation', formData.accreditation.trim())
      }
      if (formData.establishedYear && formData.establishedYear.toString().trim()) {
        fd.append('established_year', formData.establishedYear.toString().trim())
      }
      if (formData.address?.trim()) {
        fd.append('address', formData.address.trim())
      }
      if (formData.postalCode?.trim()) {
        fd.append('postal_code', formData.postalCode.trim())
      }
      if (formData.contactPerson?.trim()) {
        fd.append('contact_person', formData.contactPerson.trim())
      }
      if (formData.contactDesignation?.trim()) {
        fd.append('contact_designation', formData.contactDesignation.trim())
      }

      // Logo file if uploaded
      if (formData.logo instanceof File) {
        fd.append('institute_logo', formData.logo)
      }

      // Check if we have any fields to send
      const formDataEntries = Array.from(fd.entries())
      if (formDataEntries.length === 0) {
        console.error('No fields to update')
        setSaveStatus('error')
        setIsSaving(false)
        return
      }

      console.log('FormData entries:', formDataEntries.map(([key]) => key))

      // Use putMultipart if logo is being uploaded, otherwise use putMethod
      const res = formData.logo instanceof File
        ? await putMultipart({
            apiUrl: apiService.updateInstituteProfile,
            data: fd
          })
        : await putMethod({
            apiUrl: apiService.updateInstituteProfile,
            payload: Object.fromEntries(fd.entries())
          })

      if (res?.success || res?.status === 'success' || res?.status === true) {
        // Refresh profile data after successful update
        await fetchInstituteProfile()
        
        setSaveStatus('success')
        setIsFormValid(true)
        setTimeout(() => setSaveStatus(null), 3000)
        
        // Show success popup
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Institute profile updated successfully!',
          confirmButtonColor: '#3085d6',
          timer: 3000,
          timerProgressBar: true
        })
      } else {
        console.error('Update failed:', res?.message || 'Unknown error')
        setSaveStatus('error')
        
        // Show error popup
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: res?.message || 'Failed to update institute profile. Please try again.',
          confirmButtonColor: '#d33'
        })
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      setSaveStatus('error')
      
      // Show error popup for unexpected errors
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again.',
        confirmButtonColor: '#d33'
      })
    } finally {
      setIsSaving(false)
    }
  }

  useEffect(() => {
    const ok = validateForm()
    setIsFormValid(ok)
  }, [formData])

  useEffect(() => {
    fetchInstituteProfile()
    fetchInstituteTypes()
  }, [])

  return (
    <div className={`space-y-8 ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
      {/* Institute Profile Section */}
      <div className={`${TAILWIND_COLORS.CARD} p-6`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
              Institute Profile
            </h2>
            <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
              Institute Performance Dashboard
            </p>
            {isLoadingProfile && (
              <p className="text-xs text-gray-400 mt-1">Loading profile...</p>
            )}
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
              disabled={!isFormValid || isLoadingProfile}
              className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                isFormValid && !isLoadingProfile
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
              <div
                className={`border-2 border-dashed ${TAILWIND_COLORS.BORDER} rounded-lg p-8 text-center`}
              >
                {formData.logo || logoPreview ? (
                  // Logo display with close button
                  <div 
                    className="mx-auto w-48 h-48 bg-black rounded-xl flex items-center justify-center mb-4 relative overflow-hidden group"
                    style={{ 
                      border: '3px solid #FF8C00',
                      boxShadow: '0 0 0 2px rgba(255, 140, 0, 0.2)',
                      position: 'relative'
                    }}
                  >
                    {formData.logo ? (
                      // ✅ New file selected
                      <div className="w-full h-full flex items-center justify-center p-4">
                        <img
                          src={URL.createObjectURL(formData.logo)}
                          alt="Institute Logo"
                          className="max-w-full max-h-full object-contain rounded-lg"
                        />
                      </div>
                    ) : (
                      // ✅ Existing logo from API
                      <div className="w-full h-full flex items-center justify-center p-4">
                        <img
                          src={logoPreview}
                          alt="Institute Logo"
                          className="max-w-full max-h-full object-contain rounded-lg"
                        />
                      </div>
                    )}
                    {/* Close button overlay - White box visible, cross appears on hover with green background */}
                    <button
                      onClick={handleLogoRemove}
                      className="absolute top-2 right-2 w-8 h-8 bg-white hover:bg-green-600 rounded-md shadow-lg flex items-center justify-center transition-all duration-200 z-10 group"
                      type="button"
                      aria-label="Remove logo"
                    >
                      <LuX className="w-4 h-4 opacity-0 group-hover:opacity-100 text-white transition-all duration-200" />
                    </button>
                  </div>
                ) : (
                  // Upload placeholder - White background with dashed border (appears after removing logo)
                  <div 
                    className="mx-auto w-48 h-48 bg-white border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center mb-4 cursor-pointer hover:border-gray-400 transition-colors"
                    onClick={() => document.getElementById('logo-upload').click()}
                  >
                    <LuUpload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600 font-medium mb-1">Upload Company Logo</span>
                    <span className="text-xs text-gray-400">[Max 5MB]</span>
                  </div>
                )}
                <input
                  type="file"
                  id="logo-upload"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                {/* Upload button and recommended text - only show when no logo is present (after cross click or initially) */}
                {!formData.logo && !logoPreview && (
                  <>
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
                  </>
                )}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>
                  Registration Number
                </label>
                <input
                  type="text"
                  value={formData.registrationNumber}
                  onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent ${TAILWIND_COLORS.TEXT_PRIMARY} ${
                    errors.registrationNumber ? 'border-error' : TAILWIND_COLORS.BORDER
                  }`}
                  placeholder="Enter registration number"
                />
                {errors.registrationNumber && (
                  <p className="text-xs text-error mt-1">{errors.registrationNumber}</p>
                )}
              </div>
              <div>
                <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>
                  Institute Type
                </label>
                <select
                  value={formData.instituteType}
                  onChange={(e) => handleInputChange('instituteType', e.target.value)}
                  disabled={loadingInstituteTypes}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent ${TAILWIND_COLORS.TEXT_PRIMARY} ${
                    errors.instituteType ? 'border-error' : TAILWIND_COLORS.BORDER
                  } ${loadingInstituteTypes ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <option value="">{loadingInstituteTypes ? 'Loading institute types...' : 'Select Institute Type'}</option>
                  {instituteTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.instituteType && (
                  <p className="text-xs text-error mt-1">{errors.instituteType}</p>
                )}
                {!loadingInstituteTypes && instituteTypes.length === 0 && (
                  <p className="text-xs text-gray-500 mt-1">No institute types available</p>
                )}
              </div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>
                  Accreditation
                </label>
                <input
                  type="text"
                  value={formData.accreditation}
                  onChange={(e) => handleInputChange('accreditation', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent ${TAILWIND_COLORS.TEXT_PRIMARY} ${
                    errors.accreditation ? 'border-error' : TAILWIND_COLORS.BORDER
                  }`}
                  placeholder="Enter accreditation details"
                />
                {errors.accreditation && (
                  <p className="text-xs text-error mt-1">{errors.accreditation}</p>
                )}
              </div>
              <div>
                <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>
                  Established Year
                </label>
                <input
                  type="number"
                  value={formData.establishedYear}
                  onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                  min="1800"
                  max={new Date().getFullYear()}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent ${TAILWIND_COLORS.TEXT_PRIMARY} ${
                    errors.establishedYear ? 'border-error' : TAILWIND_COLORS.BORDER
                  }`}
                  placeholder="Enter established year"
                />
                {errors.establishedYear && (
                  <p className="text-xs text-error mt-1">{errors.establishedYear}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className={`${TAILWIND_COLORS.CARD} p-6`}>
        <div className="mb-6">
          <h2 className={`text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
            Contact Information
          </h2>
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
            {errors.email && <p className="text-xs text-error mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              maxLength={10}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent ${TAILWIND_COLORS.TEXT_PRIMARY} ${
                errors.phone ? 'border-error' : TAILWIND_COLORS.BORDER
              }`}
              placeholder="Enter 10 digit phone number"
            />
            {errors.phone && <p className="text-xs text-error mt-1">{errors.phone}</p>}
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
            {errors.website && <p className="text-xs text-error mt-1">{errors.website}</p>}
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
            {errors.address && <p className="text-xs text-error mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>
              Postal Code
            </label>
            <input
              type="text"
              value={formData.postalCode}
              onChange={(e) => handleInputChange('postalCode', e.target.value.replace(/\D/g, '').slice(0, 10))}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent ${TAILWIND_COLORS.TEXT_PRIMARY} ${
                errors.postalCode ? 'border-error' : TAILWIND_COLORS.BORDER
              }`}
              placeholder="Enter postal code"
            />
            {errors.postalCode && <p className="text-xs text-error mt-1">{errors.postalCode}</p>}
          </div>

          <div>
            <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>
              Contact Person
            </label>
            <input
              type="text"
              value={formData.contactPerson}
              onChange={(e) => handleInputChange('contactPerson', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent ${TAILWIND_COLORS.TEXT_PRIMARY} ${
                errors.contactPerson ? 'border-error' : TAILWIND_COLORS.BORDER
              }`}
              placeholder="Enter contact person name"
            />
            {errors.contactPerson && <p className="text-xs text-error mt-1">{errors.contactPerson}</p>}
          </div>

          <div>
            <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>
              Contact Designation
            </label>
            <input
              type="text"
              value={formData.contactDesignation}
              onChange={(e) => handleInputChange('contactDesignation', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent ${TAILWIND_COLORS.TEXT_PRIMARY} ${
                errors.contactDesignation ? 'border-error' : TAILWIND_COLORS.BORDER
              }`}
              placeholder="Enter contact designation"
            />
            {errors.contactDesignation && <p className="text-xs text-error mt-1">{errors.contactDesignation}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import Button from '../../../../shared/components/Button'
import { COLORS } from '../../../../shared/WebConstant.js'
import { 
  LuArrowLeft, 
  LuUpload, 
  LuImage, 
  LuX,
  LuCheck
} from 'react-icons/lu'

const BrandingConfig = () => {
  // Brand Identity State
  const [brandIdentity, setBrandIdentity] = useState({
    applicationName: 'Job Portal Pro',
    tagline: 'Your career starts here',
    companyName: 'Your Company LTD.',
    websiteUrl: 'https://jobsahi.com'
  })

  // Contact Info State
  const [contactInfo, setContactInfo] = useState({
    email: 'contact@jobsahi.com',
    phone: '+91 00000 00000',
    address: 'Address goes here..'
  })

  // Logo Assets State
  const [logoAssets, setLogoAssets] = useState({
    mainLogo: null,
    favicon: null,
    mobileLogo: null,
    emailLogo: null
  })

  // Loading states
  const [isSaving, setIsSaving] = useState(false)
  const [uploadingAssets, setUploadingAssets] = useState({})

  // Handle brand identity changes
  const handleBrandIdentityChange = (field, value) => {
    setBrandIdentity(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle contact info changes
  const handleContactInfoChange = (field, value) => {
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle file upload
  const handleFileUpload = (assetType, file) => {
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG, SVG, or GIF)')
      return
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      alert('File size must be less than 5MB')
      return
    }

    setUploadingAssets(prev => ({ ...prev, [assetType]: true }))

    // Simulate upload process
    setTimeout(() => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoAssets(prev => ({
          ...prev,
          [assetType]: {
            file,
            preview: e.target.result,
            name: file.name
          }
        }))
        setUploadingAssets(prev => ({ ...prev, [assetType]: false }))
      }
      reader.readAsDataURL(file)
    }, 1000)
  }

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, assetType) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(assetType, files[0])
    }
  }

  // Remove uploaded asset
  const removeAsset = (assetType) => {
    setLogoAssets(prev => ({
      ...prev,
      [assetType]: null
    }))
  }

  // Save configuration
  const handleSave = async () => {
    setIsSaving(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would typically send the data to your backend
      console.log('Saving branding config:', {
        brandIdentity,
        contactInfo,
        logoAssets
      })
      
      alert('Branding configuration saved successfully!')
    } catch (error) {
      console.error('Error saving branding config:', error)
      alert('Error saving configuration. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  // Logo upload card component
  const LogoUploadCard = ({ 
    title, 
    dimensions, 
    description, 
    assetType, 
    asset 
  }) => {
    const isUploading = uploadingAssets[assetType]
    
    return (
      <div className="flex flex-col">
        <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-sm transition">
          <div
            className="flex flex-col items-center justify-center min-h-[180px] cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, assetType)}
            onClick={() => document.getElementById(`${assetType}-upload`).click()}
          >
            {asset ? (
              <div className="relative w-full">
                <img
                  src={asset.preview}
                  alt={title}
                  className="w-full h-28 object-contain rounded-lg mb-4"
                />
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {asset.name}
                    </p>
                    <p className="text-xs text-gray-500">{dimensions}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeAsset(assetType)
                    }}
                    className="ml-2 p-1 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <LuX className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500 mb-3"></div>
                    <p className="text-sm text-gray-600">Uploading...</p>
                  </div>
                ) : (
                  <>
                    <div className="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <LuUpload className="h-7 w-7 text-slate-400" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">{dimensions}</p>
                  </>
                )}
              </div>
            )}
          </div>
          
          <input
            id={`${assetType}-upload`}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileUpload(assetType, e.target.files[0])}
          />
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">{description}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* TOP WRAPPER (blue-tinted like screenshot) */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: COLORS?.GREEN_PRIMARY || '#16a34a' }}
            >
              <LuImage className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Branding Config</h1>
              <p className="text-sm text-gray-600">App name, Logos, Contact info</p>
            </div>
          </div>

          <Button
            variant="light"
            icon={<LuArrowLeft className="h-4 w-4" />}
            onClick={() => window.history.back()}
            className="rounded-full bg-white text-emerald-700 border px-4 py-2 hover:bg-emerald-50"
            style={{ borderColor: COLORS?.GREEN_PRIMARY || '#16a34a' }}
          >
            Back to overview
          </Button>
        </div>

        {/* TWO INNER WHITE CARDS */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Brand Identity */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="mb-4">
              <h2 className="text-base font-semibold text-gray-900">Brand Identity</h2>
              <p className="text-sm text-gray-600">Configure your job portal's identity</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Application Name</label>
                <input
                  type="text"
                  value={brandIdentity.applicationName}
                  onChange={(e) => handleBrandIdentityChange('applicationName', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="Enter application name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                <input
                  type="text"
                  value={brandIdentity.tagline}
                  onChange={(e) => handleBrandIdentityChange('tagline', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="Enter tagline"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  value={brandIdentity.companyName}
                  onChange={(e) => handleBrandIdentityChange('companyName', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
                <input
                  type="url"
                  value={brandIdentity.websiteUrl}
                  onChange={(e) => handleBrandIdentityChange('websiteUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="mb-4">
              <h2 className="text-base font-semibold text-gray-900">Contact Info</h2>
              <p className="text-sm text-gray-600">Business contact details</p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => handleContactInfoChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="contact@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  value={contactInfo.address}
                  onChange={(e) => handleContactInfoChange('address', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200 resize-none"
                  placeholder="Enter your business address"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOGO & ASSETS (blue-tinted wrapper like screenshot) */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-gray-900">Logo & Assets</h2>
          <p className="text-sm text-gray-600">Upload and manage your brand assets</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <LogoUploadCard
            title="Main Logo"
            dimensions="200 x 60px"
            description="Primary brand logo"
            assetType="mainLogo"
            asset={logoAssets.mainLogo}
          />
          <LogoUploadCard
            title="Favicon"
            dimensions="32 x 32px"
            description="Browser icon"
            assetType="favicon"
            asset={logoAssets.favicon}
          />
          <LogoUploadCard
            title="Mobile Logo"
            dimensions="150 x 45px"
            description="Mobile optimized"
            assetType="mobileLogo"
            asset={logoAssets.mobileLogo}
          />
          <LogoUploadCard
            title="Email Logo"
            dimensions="180 x 55px"
            description="Email templates"
            assetType="emailLogo"
            asset={logoAssets.emailLogo}
          />
        </div>
      </div>

    </div>
  )
}

export default BrandingConfig

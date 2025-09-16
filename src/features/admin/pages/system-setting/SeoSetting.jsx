import React, { useState } from 'react'
import { COLORS, TAILWIND_COLORS } from '../../../../shared/WebConstant.js'
import { PrimaryButton } from '../../../../shared/components/Button'
import { LuPlus, LuUpload, LuArrowLeft } from 'react-icons/lu'

export default function SEOSetting() {
  const [seoData, setSeoData] = useState({
    siteTitle: 'Job Portal – Find your dream job',
    metaDescription: 'Discover thousands of job opportunities',
    keywords: 'jobs, careers, employment, hiring',
    ogTitle: 'Job Portal',
    ogDescription: 'Find your next career opportunity',
    ogImage: '',
    googleAnalyticsId: 'GA-XXXXXXXXX-X',
    googleTagManager: 'GTM-XXXXX',
    searchConsoleEnabled: false
  })

  const handleInputChange = (field, value) => {
    setSeoData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log('Saving SEO settings:', seoData)
    // TODO: integrate API call
  }

  const handleBack = () => {
    // TODO: navigate to overview
    console.log('Going back to overview')
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      {/* Header Section */}
      <div className="flex items-start bg-white p-4 border border-[#0b537d2c] rounded-lg justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
            <LuPlus className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <h2 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>SEO Settings</h2>
            <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Public pages optimization</p>
          </div>
        </div>

        {/* Back to overview button */}
        <PrimaryButton
          onClick={handleBack}
          className="h-10 px-4 border-2 border-[#5B9821] text-[#5B9821] hover:bg-[#5B9821] hover:text-white rounded-lg text-sm font-medium"
          icon={<LuArrowLeft className="w-4 h-4" />}
        >
          Back to overview
        </PrimaryButton>
      </div>

      {/* SEO Settings Card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
              <LuPlus className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>SEO Settings</h3>
              <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Public pages optimization</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Site title */}
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Site title</label>
            <input
              type="text"
              value={seoData.siteTitle}
              onChange={(e) => handleInputChange('siteTitle', e.target.value)}
              className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              placeholder="Job Portal – Find your dream job"
            />
          </div>

          {/* Keywords */}
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Keywords</label>
            <input
              type="text"
              value={seoData.keywords}
              onChange={(e) => handleInputChange('keywords', e.target.value)}
              className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              placeholder="jobs, careers, employment, hiring"
            />
          </div>

          {/* Meta Description */}
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Meta Description</label>
            <input
              type="text"
              value={seoData.metaDescription}
              onChange={(e) => handleInputChange('metaDescription', e.target.value)}
              className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              placeholder="Discover thousands of job opportunities"
            />
          </div>
        </div>
      </div>

      {/* Bottom: Social + Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Social Media */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Social Media</h3>
            <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Open graph & Twitter cards</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>OG Title</label>
              <input
                type="text"
                value={seoData.ogTitle}
                onChange={(e) => handleInputChange('ogTitle', e.target.value)}
                className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                placeholder="Job Portal"
              />
            </div>

            <div className="space-y-2">
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>OG Description</label>
              <input
                type="text"
                value={seoData.ogDescription}
                onChange={(e) => handleInputChange('ogDescription', e.target.value)}
                className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                placeholder="Find your next career opportunity"
              />
            </div>

            <div className="space-y-2">
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Image URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={seoData.ogImage}
                  onChange={(e) => handleInputChange('ogImage', e.target.value)}
                  className="flex-1 h-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="Image URL"
                />
                <button
                  type="button"
                  className="h-12 w-12 bg-[#5B9821] hover:bg-[#4B7F19] text-white rounded-lg flex items-center justify-center"
                  title="Upload"
                >
                  <LuUpload className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Analytics</h3>
            <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Tracking & Performance</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Google Analytics ID</label>
              <input
                type="text"
                value={seoData.googleAnalyticsId}
                onChange={(e) => handleInputChange('googleAnalyticsId', e.target.value)}
                className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                placeholder="GA-XXXXXXXX-X"
              />
            </div>

            <div className="space-y-2">
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Google Tag Manager</label>
              <input
                type="text"
                value={seoData.googleTagManager}
                onChange={(e) => handleInputChange('googleTagManager', e.target.value)}
                className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                placeholder="GTM-XXXXX"
              />
            </div>

            {/* Enable Search Console tile */}
            <button
              type="button"
              onClick={() => handleInputChange('searchConsoleEnabled', !seoData.searchConsoleEnabled)}
              className={`w-full text-left rounded-lg p-4 border-2 transition-colors duration-200 ${
                seoData.searchConsoleEnabled 
                  ? 'border-[#5B9821] bg-green-50' 
                  : 'border-gray-200 bg-white hover:border-green-300'
              }`}
            >
              <p className={`font-medium ${seoData.searchConsoleEnabled ? 'text-[#5B9821]' : 'text-gray-900'}`}>
                Enable Search Console
              </p>
              <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Submit sitemap automatically</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

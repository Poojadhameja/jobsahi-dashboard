import React, { useState } from 'react'
import { COLORS, TAILWIND_COLORS } from '../../../../shared/WebConstant.js'
import Button from '../../../../shared/components/Button'
import { LuArrowLeft, LuPlus, LuUpload, LuSearch } from 'react-icons/lu'

export default function SEOSetting() {
  const [seoData, setSeoData] = useState({
    siteTitle: 'Job Portal - Find your dream job',
    metaDescription: 'Discover thousands of job opportunities',
    keywords: 'jobs, careers, employment, hiring',
    ogTitle: 'Job Portal',
    ogDescription: 'Find your next career opportunity',
    ogImage: '',
    googleAnalyticsId: 'GA-XXXXXXXX-X',
    googleTagManager: 'GTM-XXXXX',
    searchConsoleEnabled: false
  })

  const handleInputChange = (field, value) => {
    setSeoData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    console.log('Saving SEO settings:', seoData)
    // Add save logic here
  }

  const handleBack = () => {
    // Add back navigation logic here
    console.log('Going back to overview')
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Button
            variant="light"
            size="sm"
            onClick={handleBack}
            icon={<LuArrowLeft className="h-4 w-4" />}
            className="text-gray-600 hover:text-gray-800"
          >
            Back to overview
          </Button>
        </div>
      </div>

      {/* SEO Settings Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <LuPlus className="h-5 w-5" style={{ color: COLORS.GREEN_PRIMARY }} />
          <h2 className="text-xl font-semibold text-gray-800">SEO Settings</h2>
        </div>
        <p className="text-sm text-gray-600 mb-6">Public pages optimization</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site title
            </label>
            <input
              type="text"
              value={seoData.siteTitle}
              onChange={(e) => handleInputChange('siteTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter site title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Description
            </label>
            <input
              type="text"
              value={seoData.metaDescription}
              onChange={(e) => handleInputChange('metaDescription', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter meta description"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Keywords
            </label>
            <input
              type="text"
              value={seoData.keywords}
              onChange={(e) => handleInputChange('keywords', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter keywords separated by commas"
            />
          </div>
        </div>
      </div>

      {/* Social Media and Analytics Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Social Media Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <LuSearch className="h-5 w-5" style={{ color: COLORS.GREEN_PRIMARY }} />
            <h2 className="text-xl font-semibold text-gray-800">Social Media</h2>
          </div>
          <p className="text-sm text-gray-600 mb-6">Open graph & Twitter cards</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OG Title
              </label>
              <input
                type="text"
                value={seoData.ogTitle}
                onChange={(e) => handleInputChange('ogTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Open Graph title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OG Description
              </label>
              <input
                type="text"
                value={seoData.ogDescription}
                onChange={(e) => handleInputChange('ogDescription', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Open Graph description"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OG Image
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={seoData.ogImage}
                  onChange={(e) => handleInputChange('ogImage', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Image URL"
                />
                <Button
                  variant="primary"
                  size="sm"
                  icon={<LuUpload className="h-4 w-4" />}
                  className="px-3"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <LuSearch className="h-5 w-5" style={{ color: COLORS.GREEN_PRIMARY }} />
            <h2 className="text-xl font-semibold text-gray-800">Analytics</h2>
          </div>
          <p className="text-sm text-gray-600 mb-6">Tracking & Performance</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Google Analytics ID
              </label>
              <input
                type="text"
                value={seoData.googleAnalyticsId}
                onChange={(e) => handleInputChange('googleAnalyticsId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Google Analytics ID"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Google Tag Manager
              </label>
              <input
                type="text"
                value={seoData.googleTagManager}
                onChange={(e) => handleInputChange('googleTagManager', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Google Tag Manager ID"
              />
            </div>
            
            <div>
              <Button
                variant="primary"
                size="md"
                onClick={() => handleInputChange('searchConsoleEnabled', !seoData.searchConsoleEnabled)}
                className={`w-full ${seoData.searchConsoleEnabled ? 'opacity-100' : 'opacity-90'}`}
              >
                Enable Search Console
              </Button>
              <p className="text-xs text-gray-500 mt-1 text-center">
                Submit sitemap automatically
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <Button
          variant="primary"
          size="md"
          onClick={handleSave}
          className="px-6"
        >
          Save Settings
        </Button>
      </div>
    </div>
  )
}

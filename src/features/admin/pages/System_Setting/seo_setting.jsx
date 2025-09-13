import React, { useState } from 'react'
import { COLORS, TAILWIND_COLORS } from '../../../../shared/WebConstant.js'
import Button, { BackToOverviewButton } from '../../../../shared/components/Button'
import { LuPlus, LuUpload, LuSearch, LuUsers, LuLayers, LuMonitor, LuKey } from 'react-icons/lu'

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
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Top: SEO Settings Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center mt-0.5"
              style={{ backgroundColor: COLORS?.GREEN_PRIMARY || '#059669' }}
            >
              <LuPlus className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">SEO Settings</h2>
              <p className="text-sm text-slate-600">Public pages optimization</p>
            </div>
          </div>

          {/* Back to overview (pill) */}
          <BackToOverviewButton
            onClick={handleBack}
          />
        </div>

        {/* Site title + Meta desc */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Site title</label>
            <input
              type="text"
              value={seoData.siteTitle}
              onChange={(e) => handleInputChange('siteTitle', e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder="Job Portal – Find your dream job"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Meta Description</label>
            <input
              type="text"
              value={seoData.metaDescription}
              onChange={(e) => handleInputChange('metaDescription', e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder="Discover thousands of job opportunities"
            />
          </div>
        </div>

        {/* Keywords */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">Keywords</label>
          <input
            type="text"
            value={seoData.keywords}
            onChange={(e) => handleInputChange('keywords', e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            placeholder="jobs, careers, employment, hiring"
          />
        </div>
      </div>

      {/* Bottom: Social + Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Social Media */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
          <div className="mb-4">
            <h3 className="text-slate-900 font-semibold">Social Media</h3>
            <p className="text-sm text-slate-600">Open graph & Twitter cards</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">OG Title</label>
              <input
                type="text"
                value={seoData.ogTitle}
                onChange={(e) => handleInputChange('ogTitle', e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="Job Portal"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">OG Description</label>
              <input
                type="text"
                value={seoData.ogDescription}
                onChange={(e) => handleInputChange('ogDescription', e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="Find your next career opportunity"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">OG Image</label>
              <div className="relative">
                <input
                  type="text"
                  value={seoData.ogImage}
                  onChange={(e) => handleInputChange('ogImage', e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 pr-12 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="Image URL"
                />
                {/* Trailing upload button inside input */}
                <button
                  type="button"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 rounded-lg grid place-items-center text-white hover:opacity-95"
                  style={{ backgroundColor: COLORS?.GREEN_PRIMARY || '#059669' }}
                  title="Upload"
                >
                  <LuUpload className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
          <div className="mb-4">
            <h3 className="text-slate-900 font-semibold">Analytics</h3>
            <p className="text-sm text-slate-600">Tracking & Performance</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Google Analytics ID</label>
              <input
                type="text"
                value={seoData.googleAnalyticsId}
                onChange={(e) => handleInputChange('googleAnalyticsId', e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="GA-XXXXXXXXX-X"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Google Tag Manager</label>
              <input
                type="text"
                value={seoData.googleTagManager}
                onChange={(e) => handleInputChange('googleTagManager', e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="GTM-XXXXX"
              />
            </div>

            {/* Enable Search Console tile */}
            <button
              type="button"
              onClick={() => handleInputChange('searchConsoleEnabled', !seoData.searchConsoleEnabled)}
              className="w-full text-left rounded-lg px-4 py-3 border bg-emerald-50"
              style={{ borderColor: '#A7F3D0' /* emerald-200 */ }}
            >
              <p className="font-medium" style={{ color: COLORS?.GREEN_PRIMARY || '#059669' }}>
                Enable Search Console
              </p>
              <p className="text-slate-500 text-sm">Submit sitemap automatically</p>
            </button>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="mt-8 flex justify-end">
        <Button
          variant="primary"
          size="md"
          onClick={handleSave}
          className="px-6"
          style={{
            backgroundColor: TAILWIND_COLORS?.SUCCESS || COLORS?.GREEN_PRIMARY,
            borderColor: TAILWIND_COLORS?.SUCCESS || COLORS?.GREEN_PRIMARY
          }}
        >
          Save Settings
        </Button>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { TAILWIND_COLORS, COLORS } from '../../../../shared/WebConstant.js'
import NavigationTabs from '../../../../shared/components/navigation'
import CMSEditor from './cms_editor'
import SEOSetting from './seo_setting'
import BrandingConfig from './branding_config'
import {
  LuUsers,
  LuPlus,
  LuLayers,
  LuMonitor,
  LuKey,
} from 'react-icons/lu'

export default function SystemSetting() {
  const [activeTab, setActiveTab] = useState('cms-editor')

  const navigationTabs = [
    {
      id: 'cms-editor',
      label: 'CMS Editor',
      icon: LuUsers,
    },
    {
      id: 'seo-settings',
      label: 'SEO Settings',
      icon: LuPlus,
    },
    {
      id: 'branding-config',
      label: 'Branding Config',
      icon: LuLayers,
    },
    {
      id: 'app-version',
      label: 'App Version Monitor',
      icon: LuMonitor,
    },
    {
      id: 'api-key',
      label: 'API Key & Webhook Control',
      icon: LuKey,
    },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'cms-editor':
        return <CMSEditor />
      case 'seo-settings':
        return <SEOSetting />
      case 'branding-config':
        return <BrandingConfig />
      case 'app-version':
        return (
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">App Version Monitor</h3>
            <p className="text-gray-600">Monitor and manage application versions and updates.</p>
          </div>
        )
      case 'api-key':
        return (
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">API Key & Webhook Control</h3>
            <p className="text-gray-600">Manage API keys, webhooks, and integration settings.</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="p-5 space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold" style={{ color: COLORS.PRIMARY }}>
          System Settings & Configuration
        </h1>
        <p className="text-lg" style={{ color: COLORS.PRIMARY_LIGHT }}>
          Manage your job portal system settings and integration
        </p>
      </div>

      {/* Navigation Tabs */}
      <NavigationTabs
        navigationTabs={navigationTabs}
        activeNavTab={activeTab}
        setActiveNavTab={setActiveTab}
      />

      {/* Tab Content */}
      <div className="mt-8">
        {renderTabContent()}
      </div>
    </div>
  )
}
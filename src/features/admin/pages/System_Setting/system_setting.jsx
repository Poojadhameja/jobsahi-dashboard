import React, { useState } from 'react'
import { TAILWIND_COLORS, COLORS } from '../../../../shared/WebConstant.js'
import { PillNavigation } from '../../../../shared/components/navigation'
import { MatrixCard } from '../../../../shared/components/metricCard.jsx'
import CMSEditor from './cms_editor'
import SEOSetting from './seo_setting'
import BrandingConfig from './branding_config'
import AppVersionMonitor from './app_version'
import ApiKeyWebhookControl from './api_key'
import {  
  LuUsers,
  LuPlus,
  LuLayers,
  LuMonitor,
  LuKey,
} from 'react-icons/lu'

export default function SystemSetting() {
  const [activeTab, setActiveTab] = useState(0)

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
      case 0:
        return <CMSEditor />
      case 1:
        return <SEOSetting />
      case 2:
        return <BrandingConfig />
      case 3:
        return <AppVersionMonitor />
      case 4:
        return <ApiKeyWebhookControl />
      default:
        return <CMSEditor />
    }
  }

  return (
    <div className=" space-y-6">
      <MatrixCard 
        title="System Settings & Configuration"
        subtitle="Manage your job portal system settings and integration"
      />

      {/* Navigation Tabs */}
      <PillNavigation
        tabs={navigationTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Tab Content */}
      <div className="mt-8">
        {renderTabContent()}
      </div>
    </div>
  )
}
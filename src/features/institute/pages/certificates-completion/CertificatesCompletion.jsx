import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LuFileText, LuSettings, LuHistory } from 'react-icons/lu'
import { MatrixCard } from '../../../../shared/components/metricCard'
import { PillNavigation } from '../../../../shared/components/navigation'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'
import CertificateGeneration from './CertificateGeneration'
import ManageTemplate from './ManageTemplate'
import IssuanceLogs from './IssuanceLogs'

export default function CertificatesCompletion() {
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState(0)

  // Read tab from URL query params
  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam === 'manage-template') {
      setActiveTab(1)
    } else if (tabParam === 'issuance-logs') {
      setActiveTab(2)
    } else {
      setActiveTab(0)
    }
  }, [searchParams])

  const tabs = [
    {
      id: 'generate',
      label: 'Certificate Generation',
      icon: LuFileText,
      component: <CertificateGeneration />
    },
    {
      id: 'manage-template',
      label: 'Manage Template',
      icon: LuSettings,
      component: <ManageTemplate />
    },
    {
      id: 'issuance-logs',
      label: 'Issuance Logs',
      icon: LuHistory,
      component: <IssuanceLogs />
    }
  ]

  return (
    <div className="space-y-5">
      {/* Header Section using MatrixCard */}
      <MatrixCard
        title="Certificates & Completion"
        subtitle="Manage certificates, templates, and track completion status"
        titleColor={TAILWIND_COLORS.TEXT_PRIMARY}
        subtitleColor={TAILWIND_COLORS.TEXT_MUTED}
        className=""
      />

      {/* Navigation Pills using PillNavigation */}
      {/* <div className="flex justify-center">
        <PillNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          storageKey="institute_certificates_tab"
          className=""
        />
      </div> */}

      {/* Tab Content */}
      <div className="mt-5">
        {tabs[activeTab]?.component}
      </div>
    </div>
  )
}

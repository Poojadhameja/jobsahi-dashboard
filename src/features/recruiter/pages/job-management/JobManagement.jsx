import React, { useState } from 'react'
import { LuPlus, LuSettings } from 'react-icons/lu'
import { PillNavigation } from '../../../../shared/components/navigation'
import PostJob from './PostJob'

const JobManagement = () => {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    {
      id: 'post',
      label: 'Post Job',
      icon: LuPlus
    },
    {
      id: 'manage',
      label: 'Manage Job',
      icon: LuSettings
    }
  ]

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex)
  }

  return (
    <div className="min-h-screen bg-[#F6FAFF]">
      

      {/* Green Navigation Pills */}
      <div className="mb-8">
        <PillNavigation 
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          className="justify-start"
        />
      </div>

      {/* Content Area */}
      {activeTab === 0 && <PostJob />}
      
      {activeTab === 1 && (
        <div className="p-6">
          <div className="bg-white rounded-xl border border-[#0B537D3C] p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Manage Jobs</h2>
            <p className="text-gray-600 mb-6">View, edit, and manage your existing job postings and applications.</p>
            
            {/* Placeholder for Manage Job content */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <LuSettings size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Job management table will be implemented here</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default JobManagement
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LuFileText, LuSettings, LuHistory, LuDownload } from 'react-icons/lu'

export default function CertificatesCompletion() {
  const navigate = useNavigate()

  const handleGenerate = () => {
    navigate('/institute/certificates-completion/generate')
  }

  const handleManageTemplate = () => {
    navigate('/institute/certificates-completion/manage-template')
  }

  const handleIssuanceLogs = () => {
    navigate('/institute/certificates-completion/issuance-logs')
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Certificates & Completion</h1>
        <p className="text-gray-600 mt-2">Manage certificates, templates, and track completion status.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Generate Certificates</h3>
            <LuFileText className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-gray-600 mb-4">Generate certificates for completed courses.</p>
          <button onClick={handleGenerate} className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Generate Certificates
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Manage Templates</h3>
            <LuSettings className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-gray-600 mb-4">Create and manage certificate templates.</p>
          <button onClick={handleManageTemplate} className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
            Manage Templates
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Issuance Logs</h3>
            <LuHistory className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-gray-600 mb-4">View certificate issuance history and logs.</p>
          <button onClick={handleIssuanceLogs} className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
            View Logs
          </button>
        </div>
      </div>
    </div>
  )
}

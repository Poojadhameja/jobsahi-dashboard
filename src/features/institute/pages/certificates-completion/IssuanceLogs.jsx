import React, { useState } from 'react'
import { 
  LuSearch, 
  LuFilter, 
  LuDownload, 
  LuEye,
  LuUser
} from 'react-icons/lu'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'
import CertificateDetailsModal from './CertificateDetailsModal'

function IssuanceLogs() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const logs = [
    {
      id: 1,
      studentName: 'Rahul Kumar',
      email: 'rahul@gmail.com',
      phone: '+91 8123456789',
      course: 'Electrician',
      batch: 'ELE-2025-M1',
      issuedDate: '2025-01-17',
      status: 'issued',
      certificateId: 'CERT-2025-001'
    },
    {
      id: 2,
      studentName: 'Arun Patle',
      email: 'arun@gmail.com',
      phone: '+91 8123456789',
      course: 'Fitter',
      batch: 'FIT-2025-M1',
      issuedDate: '2025-05-25',
      status: 'issued',
      certificateId: 'CERT-2025-002'
    },
    {
      id: 3,
      studentName: 'Vishal Soni',
      email: 'vishal@gmail.com',
      phone: '+91 8123456789',
      course: 'Welder',
      batch: 'WEL-2025-M1',
      issuedDate: '',
      status: 'pending',
      certificateId: 'CERT-2025-003'
    },
    {
      id: 4,
      studentName: 'Prashant Bisen',
      email: 'prashant@gmail.com',
      phone: '+91 8123456789',
      course: 'Electrician',
      batch: 'ELE-2025-M1',
      issuedDate: '2025-06-15',
      status: 'issued',
      certificateId: 'CERT-2025-004'
    },
    {
      id: 5,
      studentName: 'Aakash Soni',
      email: 'aakash@gmail.com',
      phone: '+91 8123456789',
      course: 'Electrician',
      batch: 'ELE-2025-M1',
      issuedDate: '2025-04-02',
      status: 'issued',
      certificateId: 'CERT-2025-005'
    }
  ]


  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.certificateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.course.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleViewCertificate = (certificate) => {
    setSelectedCertificate(certificate)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedCertificate(null)
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>Certificate Issuance Logs</h3>
            <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>View and track all certificate issuances</p>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
            <LuDownload className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <LuSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by recipient name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <LuFilter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">Filter by status</option>
              <option value="issued">Issued</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium ${TAILWIND_COLORS.TEXT_MUTED} uppercase tracking-wider`}>
                  Student
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${TAILWIND_COLORS.TEXT_MUTED} uppercase tracking-wider`}>
                  Course & Batch
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${TAILWIND_COLORS.TEXT_MUTED} uppercase tracking-wider`}>
                  Certificate ID
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${TAILWIND_COLORS.TEXT_MUTED} uppercase tracking-wider`}>
                  Issue Date
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${TAILWIND_COLORS.TEXT_MUTED} uppercase tracking-wider`}>
                  Status
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${TAILWIND_COLORS.TEXT_MUTED} uppercase tracking-wider`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                        <LuUser className={`h-5 w-5 ${TAILWIND_COLORS.TEXT_MUTED}`} />
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{log.studentName}</div>
                        <div className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>{log.email}</div>
                        <div className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>{log.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{log.course}</div>
                    <div className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>{log.batch}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{log.certificateId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                      {log.issuedDate || '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        log.status === 'issued' ? 'bg-green-500' : 
                        log.status === 'pending' ? 'bg-blue-500' : 'bg-gray-500'
                      }`}></div>
                      <span className={`text-sm font-medium ${
                        log.status === 'issued' ? 'text-green-600' : 
                        log.status === 'pending' ? 'text-blue-600' : TAILWIND_COLORS.TEXT_MUTED
                      }`}>
                        {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewCertificate(log)}
                        className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition-colors duration-200"
                        title="View Certificate"
                      >
                        <LuEye className="h-4 w-4" />
                      </button>
                     
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${TAILWIND_COLORS.TEXT_PRIMARY} bg-white hover:bg-gray-50`}>
              Previous
            </button>
            <button className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${TAILWIND_COLORS.TEXT_PRIMARY} bg-white hover:bg-gray-50`}>
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredLogs.length}</span> of{' '}
                <span className="font-medium">{logs.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} hover:bg-gray-50`}>
                  Previous
                </button>
                <button className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} hover:bg-gray-50`}>
                  1
                </button>
                <button className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} hover:bg-gray-50`}>
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Details Modal */}
      <CertificateDetailsModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        certificate={selectedCertificate}
      />

    </div>
  )
}

export default IssuanceLogs

import React from 'react'
import { 
  LuX,
  LuAward,
  LuMail,
  LuPhone,
  LuCalendar,
  LuDownload,
  LuUser,
  LuGraduationCap
} from 'react-icons/lu'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'

function CertificateDetailsModal({ isOpen, onClose, certificate }) {
  if (!isOpen || !certificate) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
         
          {/* Modal Body */}
          <div className="bg-bg-white px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column - Certificate Preview */}
              <div className="md:col-span-2">
                {/* Certificate Preview Card */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <LuAward className="h-6 w-6 text-white" />
                    </div>
                    <div className="w-12 h-12 bg-gray-400 rounded-lg flex items-center justify-center">
                      <LuGraduationCap className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <div className="text-center mb-8">
                    <h1 className={`text-3xl font-bold italic ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>
                      Certificate of Completion
                    </h1>
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} max-w-2xl mx-auto leading-relaxed`}>
                      Upon successful completion of the course, participants will receive a Certificate of Completion, 
                      recognizing their achievement and confirming that they have acquired the essential skills and 
                      knowledge outlined in the curriculum.
                    </p>
                  </div>

                  <div className="text-center mb-8">
                    <h2 className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                      {certificate.studentName}
                    </h2>
                    <p className={`text-lg ${TAILWIND_COLORS.TEXT_PRIMARY} uppercase tracking-wide`}>
                      {certificate.course}
                    </p>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
                      Date: {certificate.issuedDate || 'Not yet issued'}
                    </div>
                  </div>
                </div>
                <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mt-2 text-center italic`}>
                  * This is a preview. Actual certificate may vary based on template.
                </p>
              </div>

              {/* Right Column - Student & Certificate Info */}
              <div className="space-y-4">
                {/* Student Information Card */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h4 className={`text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-3 uppercase tracking-wide`}>
                    Student Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <LuUser className="h-8 w-8 text-secondary" />
                      </div>
                    </div>
                    <div className="text-center mb-3">
                      <h5 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                        {certificate.studentName}
                      </h5>
                    </div>
                    <div className="space-y-2 border-t border-gray-300 pt-3">
                      <div className="flex items-start">
                        <LuMail className={`h-4 w-4 ${TAILWIND_COLORS.TEXT_MUTED} mr-2 mt-0.5 flex-shrink-0`} />
                        <span className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} break-all`}>
                          {certificate.email}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <LuPhone className={`h-4 w-4 ${TAILWIND_COLORS.TEXT_MUTED} mr-2 flex-shrink-0`} />
                        <span className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                          {certificate.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certificate Information Card */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h4 className={`text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-3 uppercase tracking-wide`}>
                    Certificate Details
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className={`text-xs font-medium ${TAILWIND_COLORS.TEXT_MUTED} uppercase`}>
                        Course Name
                      </label>
                      <p className={`text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mt-1`}>
                        {certificate.course}
                      </p>
                    </div>
                    <div>
                      <label className={`text-xs font-medium ${TAILWIND_COLORS.TEXT_MUTED} uppercase`}>
                        Batch
                      </label>
                      <p className={`text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mt-1`}>
                        {certificate.batch}
                      </p>
                    </div>
                    <div>
                      <label className={`text-xs font-medium ${TAILWIND_COLORS.TEXT_MUTED} uppercase`}>
                        Issue Date
                      </label>
                      <div className="flex items-center mt-1">
                        <LuCalendar className={`h-4 w-4 ${TAILWIND_COLORS.TEXT_MUTED} mr-2`} />
                        <p className={`text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                          {certificate.issuedDate || 'Not yet issued'}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className={`text-xs font-medium ${TAILWIND_COLORS.TEXT_MUTED} uppercase`}>
                        Status
                      </label>
                      <div className="flex items-center mt-1">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          certificate.status === 'issued' ? 'bg-success' : 
                          certificate.status === 'pending' ? 'bg-primary' : 'bg-gray-500'
                        }`}></div>
                        <span className={`text-sm font-semibold ${
                          certificate.status === 'issued' ? 'text-success' : 
                          certificate.status === 'pending' ? 'text-primary' : TAILWIND_COLORS.TEXT_MUTED
                        }`}>
                          {certificate.status.charAt(0).toUpperCase() + certificate.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 border-t border-gray-200">
            <button
              onClick={onClose}
              className={`inline-flex justify-center items-center px-4 py-2 rounded-lg text-sm font-medium ${TAILWIND_COLORS.BTN_LIGHT} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-colors duration-200`}
            >
              Close
            </button>
            <button className={`inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium ${TAILWIND_COLORS.BTN_SECONDARY} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-colors duration-200`}>
              <LuDownload className="h-4 w-4 mr-2" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CertificateDetailsModal


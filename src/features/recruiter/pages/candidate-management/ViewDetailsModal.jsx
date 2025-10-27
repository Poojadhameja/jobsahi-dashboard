import React from 'react'
import { LuX, LuMail, LuPhone, LuMapPin, LuCalendar, LuFileText, LuDownload } from 'react-icons/lu'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'
import { Button, IconButton } from '../../../../shared/components/Button'

const ViewDetailsModal = ({ isOpen, onClose, candidate }) => {
  if (!isOpen || !candidate) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-200">
          <div className="flex items-start space-x-4">
            {/* Avatar */}
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-semibold text-gray-600">
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            
            {/* Name and Applied For */}
            <div>
              <h2 className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>{candidate.name}</h2>
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Applied for</span>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {candidate.appliedFor}
                </span>
              </div>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${TAILWIND_COLORS.TEXT_MUTED}`}>
              <LuFileText className="w-4 h-4" />
              <span className="text-sm">CV.pdf</span>
            </div>
            <div className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>STATUS</div>
            <Button 
              variant="primary" 
              size="sm"
              className="text-sm font-medium"
            >
              New Application
            </Button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <LuX size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Description */}
          <div className="mb-6">
            <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-3`}>Description</h3>
            <div className="bg-gray-100 rounded-lg p-4">
              <p className={`${TAILWIND_COLORS.TEXT_PRIMARY} leading-relaxed`}>
                A dedicated ITI student specialized in [Electrical / Fitter / Mechanical], with a strong foundation in workshop tools, machine operations, and maintenance techniques. Quick learner, team-oriented, and eager to apply technical knowledge in real-world job environments.
              </p>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
            {/* Personal Details */}
            <div>
              <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Personal Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>FULL NAME</span>
                  <span className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{candidate.name}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>EMAIL</span>
                  <div className="flex items-center space-x-2">
                    <LuMail className="w-4 h-4 text-gray-400" />
                    <span className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{candidate.email}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>PHONE</span>
                  <div className="flex items-center space-x-2">
                    <LuPhone className="w-4 h-4 text-gray-400" />
                    <span className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{candidate.phone || '(123) 456-7890'}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>LOCATION</span>
                  <span className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{candidate.location || 'Ward 07, Balaghat'}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>APPLIED</span>
                  <span className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{candidate.appliedDate || 'Aug, 22 2023'}</span>
                </div>
              </div>
            </div>

            {/* Education Information */}
            <div>
              <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Educations Information</h3>
              <div className="space-y-4">
                {/* Education Entry 1 */}
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-semibold text-gray-600">1</span>
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{candidate.qualification || 'Bachelor of Science in Computer Science'}</h4>
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>{candidate.university || 'UNIVERSITY OF TECHNOLOGY'}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <LuCalendar className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">Graduated May 2017</span>
                    </div>
                  </div>
                </div>

                {/* Education Entry 2 */}
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-semibold text-gray-600">2</span>
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Certification in Full Stack Web Development</h4>
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>CODING ACADEMY</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <LuCalendar className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">Completed 2023</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Skills</h3>
            <div className="flex flex-wrap gap-2">
              {candidate.skills ? candidate.skills.split(', ').map((skill, index) => (
                <span
                  key={index}
                  className={`bg-gray-200 ${TAILWIND_COLORS.TEXT_PRIMARY} px-3 py-1 rounded-full text-sm font-medium`}
                >
                  {skill}
                </span>
              )) : (
                <>
                  <span className={`bg-gray-200 ${TAILWIND_COLORS.TEXT_PRIMARY} px-3 py-1 rounded-full text-sm font-medium`}>JavaScript</span>
                  <span className={`bg-gray-200 ${TAILWIND_COLORS.TEXT_PRIMARY} px-3 py-1 rounded-full text-sm font-medium`}>Python</span>
                  <span className={`bg-gray-200 ${TAILWIND_COLORS.TEXT_PRIMARY} px-3 py-1 rounded-full text-sm font-medium`}>HTML5</span>
                  <span className={`bg-gray-200 ${TAILWIND_COLORS.TEXT_PRIMARY} px-3 py-1 rounded-full text-sm font-medium`}>CSS3</span>
                  <span className={`bg-gray-200 ${TAILWIND_COLORS.TEXT_PRIMARY} px-3 py-1 rounded-full text-sm font-medium`}>React.js</span>
                  <span className={`bg-gray-200 ${TAILWIND_COLORS.TEXT_PRIMARY} px-3 py-1 rounded-full text-sm font-medium`}>Node.js</span>
                  <span className={`bg-gray-200 ${TAILWIND_COLORS.TEXT_PRIMARY} px-3 py-1 rounded-full text-sm font-medium`}>Express.js</span>
                  <span className={`bg-gray-200 ${TAILWIND_COLORS.TEXT_PRIMARY} px-3 py-1 rounded-full text-sm font-medium`}>MongoDB</span>
                  <span className={`bg-gray-200 ${TAILWIND_COLORS.TEXT_PRIMARY} px-3 py-1 rounded-full text-sm font-medium`}>MySQL</span>
                  <span className={`bg-gray-200 ${TAILWIND_COLORS.TEXT_PRIMARY} px-3 py-1 rounded-full text-sm font-medium`}>Git</span>
                  <span className={`bg-gray-200 ${TAILWIND_COLORS.TEXT_PRIMARY} px-3 py-1 rounded-full text-sm font-medium`}>Scrum</span>
                  <span className={`bg-gray-200 ${TAILWIND_COLORS.TEXT_PRIMARY} px-3 py-1 rounded-full text-sm font-medium`}>VS Code</span>
                  <span className={`bg-gray-200 ${TAILWIND_COLORS.TEXT_PRIMARY} px-3 py-1 rounded-full text-sm font-medium`}>JIRA</span>
                  <span className={`bg-gray-200 ${TAILWIND_COLORS.TEXT_PRIMARY} px-3 py-1 rounded-full text-sm font-medium`}>Slack</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewDetailsModal

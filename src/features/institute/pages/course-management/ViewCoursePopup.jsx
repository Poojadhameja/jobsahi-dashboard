import React from 'react'
import { LuX, LuBuilding, LuCalendar, LuUser, LuClock, LuDollarSign } from 'react-icons/lu'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'

const ViewCoursePopup = ({ course, onClose }) => {
  if (!course) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`flex justify-between items-center p-6 border-b ${TAILWIND_COLORS.BORDER}`}>
          <h2 className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>View Course</h2>
          <button
            onClick={onClose}
            className={`${TAILWIND_COLORS.TEXT_MUTED} hover:${TAILWIND_COLORS.TEXT_PRIMARY} transition-colors`}
          >
            <LuX className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information Section */}
          <div className={`${TAILWIND_COLORS.CARD} p-6`}>
            <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-6`}>Basic Information</h3>
            
            <div className="space-y-6">
              {/* Course Title */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                  <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                    COURSE TITLE
                  </label>
                  <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>The name of the course or job role.</p>
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} font-medium`}>{course.title || 'Not specified'}</p>
                </div>
              </div>

              {/* Duration */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                  <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                    DURATION (WEEKS)
                  </label>
                  <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Duration of the course in weeks.</p>
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} font-medium`}>{course.duration || 'Not specified'} weeks</p>
                </div>
              </div>

              {/* Course Description */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                  <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                    COURSE DESCRIPTION
                  </label>
                  <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>For effective candidate selection, enhance the job description.</p>
                </div>
                <div className="flex-1">
                  <div className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} leading-relaxed`} dangerouslySetInnerHTML={{ __html: course.description || 'Not specified' }} />
                </div>
              </div>

              {/* Tagged Skills */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                  <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                    TAGGED SKILLS
                  </label>
                  <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>List needed skills.</p>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    {course.skills && course.skills.length > 0 ? (
                      course.skills.map((skill, index) => (
                        <span
                          key={index}
                          className={`${TAILWIND_COLORS.BADGE_SUCCESS} text-xs font-medium px-2 py-1 rounded-full`}
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>No skills specified</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Batch Limits */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                  <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                    BATCH LIMITS
                  </label>
                  <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Choose required experience.</p>
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} font-medium`}>{course.batchLimits || 'Not specified'} Students</p>
                </div>
              </div>

              {/* Course Status */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                  <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                    COURSE STATUS
                  </label>
                  <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Choose job type.</p>
                </div>
                <div className="flex-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${TAILWIND_COLORS.BADGE_SUCCESS}`}>
                    {course.status || 'Not specified'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Settings Section */}
          <div className={`${TAILWIND_COLORS.CARD} p-6`}>
            <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-6`}>Additional Settings</h3>
            
            <div className="space-y-6">
              {/* Category */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                  <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                    CATEGORY
                  </label>
                  <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Choose category of course.</p>
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} font-medium uppercase`}>{course.category || 'Not specified'}</p>
                </div>
              </div>

              {/* Difficulty Level */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                  <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                    DIFFICULTY LEVEL
                  </label>
                  <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Choose difficulty level.</p>
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} font-medium`}>{course.difficultyLevel || 'Not specified'}</p>
                </div>
              </div>

              {/* Price */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                  <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                    PRICE
                  </label>
                  <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Choose course price.</p>
                </div>
                <div className="flex-1">
                  <p className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>₹{course.price || 'Not specified'}</p>
                </div>
              </div>

              {/* Instructor Name */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                <div className="w-full lg:w-1/3 lg:min-w-[200px]">
                  <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                    INSTRUCTOR NAME
                  </label>
                  <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Name of instructor.</p>
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} font-medium`}>{course.instructorName || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Course Modules Section */}
          {course.modules && course.modules.length > 0 && (
            <div className={`${TAILWIND_COLORS.CARD} p-6`}>
              <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-6`}>Course Modules</h3>
              
              <div className="space-y-4">
                {course.modules.map((module, index) => (
                  <div key={module.id || index} className={`${TAILWIND_COLORS.BORDER} rounded-lg p-4`}>
                    <h4 className={`text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>Module {index + 1}: {module.title}</h4>
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>{module.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Media Files Section */}
          {course.media && course.media.length > 0 && (
            <div className={`${TAILWIND_COLORS.CARD} p-6`}>
              <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-6`}>Media Files</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {course.media.map((media, index) => (
                  <div key={index} className={`${TAILWIND_COLORS.BORDER} rounded-lg p-4`}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#5C9A24] rounded flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} truncate`}>{media.name}</p>
                        <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED}`}>{media.type}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`flex justify-end gap-3 p-6 border-t ${TAILWIND_COLORS.BORDER}`}>
          <button
            onClick={onClose}
            className={`px-6 py-2 ${TAILWIND_COLORS.BTN_LIGHT} rounded-lg transition-colors`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewCoursePopup

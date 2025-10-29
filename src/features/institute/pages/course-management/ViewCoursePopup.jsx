import React from 'react'
import { LuX, LuBuilding, LuCalendar, LuUser, LuClock, LuDollarSign, LuFileText } from 'react-icons/lu'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'

const ViewCoursePopup = ({ course, onClose }) => {
  if (!course) return null

  // 🔹 Parse media if stored as JSON string or comma-separated
  let mediaFiles = []
  try {
    if (typeof course.media === 'string' && course.media.trim() !== '') {
      mediaFiles = JSON.parse(course.media)
      if (!Array.isArray(mediaFiles)) mediaFiles = [course.media]
    } else if (Array.isArray(course.media)) {
      mediaFiles = course.media
    }
  } catch {
    mediaFiles = course.media?.split(',').map(m => m.trim()) || []
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
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
          {/* 🔹 Basic Information */}
          <div className={`${TAILWIND_COLORS.CARD} p-6`}>
            <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-6`}>
              Basic Information
            </h3>

            {/* Title */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6 mb-4">
              <div className="w-full lg:w-1/3">
                <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                  COURSE TITLE
                </label>
                <p className="text-sm text-gray-500">Name of the course.</p>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{course.title || 'Not specified'}</p>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6 mb-4">
              <div className="w-full lg:w-1/3">
                <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                  COURSE DESCRIPTION
                </label>
                <p className="text-sm text-gray-500">Overview and details about the course.</p>
              </div>
              <div className="flex-1">
                <div
                  className="text-sm text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: course.description || 'No description provided.',
                  }}
                />
              </div>
            </div>

            {/* Duration */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6 mb-4">
              <div className="w-full lg:w-1/3">
                <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                  DURATION
                </label>
                <p className="text-sm text-gray-500">Course length in weeks.</p>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">
                  {course.duration ? `${course.duration} weeks` : 'Not specified'}
                </p>
              </div>
            </div>

            {/* Tagged Skills */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6 mb-4">
              <div className="w-full lg:w-1/3">
                <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                  TAGGED SKILLS
                </label>
                <p className="text-sm text-gray-500">Relevant skills covered.</p>
              </div>
              <div className="flex-1 flex flex-wrap gap-2">
                {course.skills && course.skills.length > 0 ? (
                  course.skills.map((skill, i) => (
                    <span
                      key={i}
                      className={`${TAILWIND_COLORS.BADGE_SUCCESS} text-xs font-medium px-2 py-1 rounded-full`}
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No skills listed</p>
                )}
              </div>
            </div>

            {/* Batch Limit */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6 mb-4">
              <div className="w-full lg:w-1/3">
                <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                  BATCH LIMIT
                </label>
                <p className="text-sm text-gray-500">Maximum students per batch.</p>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">
                  {course.batchLimit || 'Not specified'} Students
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
              <div className="w-full lg:w-1/3">
                <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                  STATUS
                </label>
                <p className="text-sm text-gray-500">Current course status.</p>
              </div>
              <div className="flex-1">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    course.status?.toLowerCase() === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {course.status || 'Not specified'}
                </span>
              </div>
            </div>
          </div>

          {/* 🔹 Additional Info */}
          <div className={`${TAILWIND_COLORS.CARD} p-6`}>
            <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-6`}>
              Additional Information
            </h3>

            {/* Category */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6 mb-4">
              <div className="w-full lg:w-1/3">
                <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                  CATEGORY
                </label>
                <p className="text-sm text-gray-500">Type of course field.</p>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800 uppercase">
                  {course.category || 'Not specified'}
                </p>
              </div>
            </div>

            {/* Instructor */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6 mb-4">
              <div className="w-full lg:w-1/3">
                <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                  INSTRUCTOR NAME
                </label>
                <p className="text-sm text-gray-500">Trainer or faculty name.</p>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">
                  {course.instructorName || 'Not specified'}
                </p>
              </div>
            </div>

            {/* Fee */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
              <div className="w-full lg:w-1/3">
                <label className={`block text-sm font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                  COURSE FEE
                </label>
                <p className="text-sm text-gray-500">Total fee for the course.</p>
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold text-[#1A569A]">
                  ₹{course.price?.toLocaleString('en-IN') || 'Not specified'}
                </p>
              </div>
            </div>
          </div>

          {/* 🔹 Module Info */}
          {(course.moduleTitle || course.moduleDescription) && (
            <div className={`${TAILWIND_COLORS.CARD} p-6`}>
              <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-6`}>
                Course Module
              </h3>
              <div className="space-y-3">
                <h4 className="text-md font-semibold text-gray-800">
                  {course.moduleTitle || 'Untitled Module'}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {course.moduleDescription || 'No module description available.'}
                </p>
              </div>
            </div>
          )}

          {/* 🔹 Media Section */}
          {mediaFiles.length > 0 && (
            <div className={`${TAILWIND_COLORS.CARD} p-6`}>
              <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-6`}>
                Course Media
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mediaFiles.map((m, i) => (
                  <div
                    key={i}
                    className="border rounded-lg p-4 flex items-center gap-3 hover:bg-gray-50 transition"
                  >
                    <div className="w-10 h-10 bg-[#5C9A24] rounded flex items-center justify-center">
                      <LuFileText className="text-white w-5 h-5" />
                    </div>
                    <a
                      href={m}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-[#1A569A] truncate"
                    >
                      {m.split('/').pop()}
                    </a>
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

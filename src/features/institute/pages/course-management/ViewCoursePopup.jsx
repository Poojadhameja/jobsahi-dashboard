import React from 'react'
import { LuX, LuBuilding, LuCalendar, LuUser, LuClock, LuDollarSign } from 'react-icons/lu'

const ViewCoursePopup = ({ course, onClose }) => {
  if (!course) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Course Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <LuX className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Basic Info */}
            <div className="space-y-6">
              {/* Course Title & Status */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                    {course.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{course.team}</p>
              </div>

              {/* Category */}
              <div className="flex items-center gap-3">
                <LuBuilding className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Category</p>
                  <p className="text-sm text-gray-600 uppercase">{course.category}</p>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <LuDollarSign className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Price</p>
                  <p className="text-2xl font-bold text-gray-900">₹{course.price}</p>
                </div>
              </div>

              {/* Skills */}
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {course.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {course.additionalSkills > 0 && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                      +{course.additionalSkills}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Additional Details */}
            <div className="space-y-6">
              {/* Description */}
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Description</p>
                <p className="text-sm text-gray-600 leading-relaxed">{course.description}</p>
              </div>

              {/* Additional Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <LuUser className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Instructor</p>
                    <p className="text-sm text-gray-600">{course.instructorName || 'Not specified'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <LuClock className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Duration</p>
                    <p className="text-sm text-gray-600">{course.duration || 'Not specified'} weeks</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <LuCalendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Mode</p>
                    <p className="text-sm text-gray-600">{course.mode || 'Not specified'}</p>
                  </div>
                </div>
              </div>

              {/* Media Files */}
              {course.media && course.media.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Media Files</p>
                  <div className="grid grid-cols-2 gap-2">
                    {course.media.map((media, index) => (
                      <div key={index} className="bg-gray-50 p-2 rounded text-xs">
                        <p className="truncate">{media.name}</p>
                        <p className="text-gray-500">{media.type}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewCoursePopup

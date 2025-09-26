import React from 'react'
import { FaTimes, FaCheck, FaShieldAlt, FaRocket, FaUsers, FaBullhorn, FaBus } from 'react-icons/fa'

const JobDetails = ({ job, onClose }) => {
  if (!job) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4" 
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto relative no-scrollbar"
        onClick={(e) => e.stopPropagation()}
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitScrollbar: 'none'
        }}
      >
        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 p-8">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-1 right-1 text-gray-500 hover:text-gray-700 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="12" y1="4" x2="4" y2="12"></line>
                <line x1="4" y1="4" x2="12" y2="12"></line>
              </svg>
            </button>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Description</h2>
              <p className="text-gray-600 leading-relaxed">{job.description}</p>
            </div>

            {/* Responsibility */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Responsibility</h2>
              <ul className="space-y-3">
                {job.responsibilities?.map((responsibility, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <FaCheck className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: 'var(--color-secondary)' }} />
                    <span className="text-gray-600">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Who You Are */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Who You Are</h2>
              <ul className="space-y-3">
                {job.requirements?.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <FaCheck className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: 'var(--color-secondary)' }} />
                    <span className="text-gray-600">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Perks & Benefits */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Perks & Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {job.benefits?.map((benefit, index) => {
                  // Map icon names to components
                  const iconMap = {
                    'FaShieldAlt': FaShieldAlt,
                    'FaRocket': FaRocket,
                    'FaUsers': FaUsers,
                    'FaBullhorn': FaBullhorn,
                    'FaBus': FaBus
                  }
                  const IconComponent = iconMap[benefit.icon] || FaCheck
                  
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-secondary-10)' }}>
                        <IconComponent className="w-6 h-6" style={{ color: 'var(--color-secondary)' }} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--color-text-primary)' }}>{benefit.title}</h3>
                        <p className="text-gray-600 text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 p-6">
            {/* Light Blue Background Section */}
            <div className="p-6 rounded-lg mb-6" style={{ backgroundColor: 'var(--color-primary-10)' }}>
              {/* Company Info */}
              <div className="text-center mb-6">
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4"
                  style={{ backgroundColor: job.logoColor }}
                >
                  {job.logo}
                </div>
                <h3 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{job.company}</h3>
              </div>

              {/* Job Details */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Salary</span>
                    <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{job.salary}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Job Type</span>
                    <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{job.type}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Location</span>
                    <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{job.location}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Experience</span>
                    <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{job.experience}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Job Posted On</span>
                    <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{job.postedOn}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Apply Before</span>
                    <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{job.applyBefore}</p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 text-sm font-medium rounded-full bg-gray-200 text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Info Subsection */}
              <div className="p-4 rounded-lg mb-6">
                <h4 className="font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>Quick Info</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--color-text-muted)' }}>Posted:</span>
                    <span style={{ color: 'var(--color-text-primary)' }}>{job.postedOn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--color-text-muted)' }}>Deadline:</span>
                    <span style={{ color: 'var(--color-text-primary)' }}>{job.applyBefore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--color-text-muted)' }}>Applications:</span>
                    <span style={{ color: 'var(--color-text-primary)' }}>{job.applied} of {job.capacity}</span>
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <button
                className="w-full py-3 font-semibold rounded-lg transition-colors"
                style={{ 
                  color: 'var(--color-bg-white)',
                  backgroundColor: 'var(--color-secondary)'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-secondary-dark)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-secondary)'}
              >
                Apply Job
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetails

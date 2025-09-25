import React from 'react'
import { colors } from '../../../../shared/colors'
import { FaSearch, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa'

const BrowseJob = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span style={{ color: colors.primary.blue }}>Browse</span>{' '}
            <span style={{ color: colors.accent.green }}>Jobs</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover thousands of job opportunities from top companies across various industries.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <button 
                className="w-full py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.primary.blue }}
              >
                Search Jobs
              </button>
            </div>
          </div>
        </div>

        {/* Job Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Engineering', count: '1,200+ Jobs', icon: FaBriefcase },
            { title: 'Manufacturing', count: '800+ Jobs', icon: FaBriefcase },
            { title: 'Technology', count: '1,500+ Jobs', icon: FaBriefcase },
            { title: 'Healthcare', count: '600+ Jobs', icon: FaBriefcase },
            { title: 'Automotive', count: '900+ Jobs', icon: FaBriefcase },
            { title: 'Construction', count: '700+ Jobs', icon: FaBriefcase }
          ].map((category, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                  style={{ backgroundColor: colors.accent.green + '20' }}
                >
                  <category.icon style={{ color: colors.accent.green }} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{category.title}</h3>
                  <p className="text-gray-600">{category.count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrowseJob

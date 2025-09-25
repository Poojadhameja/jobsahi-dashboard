import React from 'react'
import { colors } from '../../../../shared/colors'
import { FaMapMarkerAlt, FaBriefcase, FaSearch, FaPlay, FaRobot, FaPlus } from 'react-icons/fa'

const Herosection = () => {
  return (
    <section className="min-h-screen bg-white rounded-3xl relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-green-200 rounded-full opacity-20"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-green-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 border-2 border-green-200 rounded-full opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Top Banner */}
        <div className="text-center mb-12">
          <div className="inline-block bg-green-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
            #1 PORTAL JOB PLATFORM
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-gray-800 leading-tight">
            The{' '}
            <span className="relative">
              Easiest Way
              <svg 
                className="absolute -bottom-3 left-0 w-full h-6" 
                viewBox="0 0 300 30" 
                fill="none"
              >
                <path 
                  d="M5 20C80 5, 150 15, 220 8, 295 18" 
                  stroke="#A1E366" 
                  strokeWidth="4" 
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            {' '}To Get Your{' '}
            <span className="relative">
              New Job
              <svg 
                className="absolute -bottom-3 left-0 w-full h-6" 
                viewBox="0 0 200 30" 
                fill="none"
              >
                <path 
                  d="M5 20C60 5, 120 15, 195 8" 
                  stroke="#A1E366" 
                  strokeWidth="4" 
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
        </div>

        {/* Description */}
        <div className="text-center mb-16 max-w-5xl mx-auto">
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            Every month, over 5 lakh ITI students use JobSahi to explore jobs, apprenticeships, and courses. 
            Start your career journey with just one click.
          </p>
          <p className="text-xl text-gray-700 font-medium">
            अपना शहर और ट्रेड चुनें और नई नौकरी की शुरुआत करें!
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Location Dropdown */}
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <select className="w-full pl-12 pr-4 py-5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700 text-lg font-medium bg-gray-50">
                  <option>Location</option>
                  <option>Delhi</option>
                  <option>Mumbai</option>
                  <option>Bangalore</option>
                  <option>Chennai</option>
                </select>
              </div>

              {/* Category Dropdown */}
              <div className="relative">
                <FaBriefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <select className="w-full pl-12 pr-4 py-5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700 text-lg font-medium bg-gray-50">
                  <option>Category</option>
                  <option>Engineering</option>
                  <option>Manufacturing</option>
                  <option>Technology</option>
                  <option>Healthcare</option>
                </select>
              </div>

              {/* Search Button */}
              <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-5 rounded-xl font-bold text-lg flex items-center justify-center space-x-3 transition-all duration-300 shadow-lg hover:shadow-xl">
                <FaSearch className="text-xl" />
                <span>नौकरी खोजें</span>
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-20">
          {/* Left Side - Cards */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-green-500 rounded-full"></div>
              <div className="w-5 h-5 bg-green-500 rounded-full"></div>
              <div className="w-5 h-5 bg-green-500 rounded-full"></div>
              <FaPlus className="text-green-500 text-2xl" />
            </div>
            
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 shadow-xl">
              <div className="border-2 border-green-500 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-gray-800 text-lg">Start Your Career With JobSahi</h3>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">JS</span>
              </div>
            </div>
          </div>

          {/* Center - Play Button */}
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl hover:bg-blue-600 transition-all duration-300 cursor-pointer hover:scale-110">
              <FaPlay className="text-white text-3xl ml-1" />
            </div>
            <p className="text-green-500 font-bold text-xl">
              Search Jobs, Give Skill Tests, Get Hired
            </p>
          </div>

          {/* Right Side - Cards */}
          <div className="space-y-8">
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 shadow-xl relative">
              <div className="absolute top-6 right-6 border-2 border-green-500 rounded-2xl p-4">
                <span className="text-sm font-bold text-gray-800">Let's Find Your Opportunity To Grow</span>
              </div>
              <div className="mt-20">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <FaRobot className="text-white text-2xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 shadow-xl ml-12">
              <div className="w-12 h-12 bg-gray-300 rounded-2xl"></div>
            </div>
          </div>
        </div>

        {/* Company Logos Section */}
        <div className="bg-gray-800 rounded-3xl p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { name: 'ASHOK LEYLAND', logo: 'AL' },
              { name: 'YAMAHA', logo: 'YH' },
              { name: 'HERO HONDA', logo: 'HH' },
              { name: 'MARUTI SUZUKI', logo: 'MS' }
            ].map((company, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">{company.logo}</span>
                </div>
                <h3 className="text-blue-400 font-bold text-base mb-2">{company.name}</h3>
                <p className="text-gray-400 text-sm">YOUR TAGLINE GOES HERE</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Herosection

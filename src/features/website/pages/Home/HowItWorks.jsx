import React from 'react'
import { colors } from '../../../../shared/colors'
import { FaUserPlus, FaSearch, FaFileAlt, FaHandshake } from 'react-icons/fa'

const HowItWorks = () => {
  const steps = [
    {
      icon: FaUserPlus,
      title: 'Create Profile',
      description: 'Sign up and create your professional profile with your skills and experience.'
    },
    {
      icon: FaFileAlt,
      title: 'Upload Resume',
      description: 'Upload your resume and let our AI match you with relevant job opportunities.'
    },
    {
      icon: FaSearch,
      title: 'Browse Jobs',
      description: 'Explore thousands of job opportunities from top companies in your field.'
    },
    {
      icon: FaHandshake,
      title: 'Get Hired',
      description: 'Connect with employers and land your dream job with our support.'
    }
  ]

  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span style={{ color: colors.primary.blue }}>How It</span>{' '}
            <span style={{ color: colors.accent.green }}>Works</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get started in just a few simple steps and begin your journey to career success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-300 transform translate-x-1/2 z-0"></div>
              )}
              
              <div className="relative z-10">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg"
                  style={{ backgroundColor: colors.primary.blue }}
                >
                  <step.icon className="text-2xl text-white" />
                </div>
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-sm"
                  style={{ backgroundColor: colors.accent.green }}
                >
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            className="px-8 py-3 rounded-full text-white font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: colors.primary.blue }}
          >
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

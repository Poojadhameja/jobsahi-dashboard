import React from 'react'
import { colors } from '../../../../shared/colors'

const TrustedStartups = () => {
  const companies = [
    { name: 'TechCorp', logo: 'TC' },
    { name: 'InnovateLab', logo: 'IL' },
    { name: 'FutureTech', logo: 'FT' },
    { name: 'StartupHub', logo: 'SH' },
    { name: 'NextGen', logo: 'NG' },
    { name: 'ProTech', logo: 'PT' },
    { name: 'SmartSol', logo: 'SS' },
    { name: 'DataFlow', logo: 'DF' }
  ]

  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span style={{ color: colors.primary.blue }}>Trusted by</span>{' '}
            <span style={{ color: colors.accent.green }}>Top Companies</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of students who have found their dream jobs with these leading companies.
          </p>
        </div>

        {/* Company Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {companies.map((company, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-3 text-white font-bold text-xl"
                style={{ backgroundColor: colors.primary.blue }}
              >
                {company.logo}
              </div>
              <h3 className="text-sm font-semibold text-gray-800">{company.name}</h3>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <div 
              className="text-4xl font-bold mb-2"
              style={{ color: colors.primary.blue }}
            >
              10,000+
            </div>
            <p className="text-gray-600">Active Job Listings</p>
          </div>
          <div className="text-center">
            <div 
              className="text-4xl font-bold mb-2"
              style={{ color: colors.accent.green }}
            >
              5,000+
            </div>
            <p className="text-gray-600">Successful Placements</p>
          </div>
          <div className="text-center">
            <div 
              className="text-4xl font-bold mb-2"
              style={{ color: colors.primary.blue }}
            >
              500+
            </div>
            <p className="text-gray-600">Partner Companies</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustedStartups

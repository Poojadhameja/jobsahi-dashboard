import React from 'react'
import { colors } from '../../../../shared/colors'
import { FaGraduationCap, FaUsers, FaChartLine, FaHandshake } from 'react-icons/fa'

const RightForYou = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span style={{ color: colors.primary.blue }}>Why JOBSAHI is</span>{' '}
            <span style={{ color: colors.accent.green }}>Right for You</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We understand the unique needs of ITI and Polytechnic students and provide 
            tailored solutions for your career growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: FaGraduationCap,
              title: 'Student-Focused',
              description: 'Designed specifically for ITI and Polytechnic students with relevant opportunities.'
            },
            {
              icon: FaUsers,
              title: 'Expert Community',
              description: 'Connect with industry experts and fellow students for guidance and support.'
            },
            {
              icon: FaChartLine,
              title: 'Career Growth',
              description: 'Access skill development programs and career advancement opportunities.'
            },
            {
              icon: FaHandshake,
              title: 'Industry Partnerships',
              description: 'Direct connections with top companies and industry leaders.'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: colors.accent.green + '20' }}
              >
                <feature.icon 
                  className="text-2xl" 
                  style={{ color: colors.accent.green }} 
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RightForYou

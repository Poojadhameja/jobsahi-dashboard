import React from 'react'
import { colors } from '../../../../shared/colors'
import { FaUpload, FaFileAlt, FaCheckCircle } from 'react-icons/fa'

const UploadResume = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span style={{ color: colors.primary.blue }}>Upload Your</span>{' '}
              <span style={{ color: colors.accent.green }}>Resume</span>
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Get discovered by top employers. Upload your resume and let companies find you 
              for the perfect job opportunities.
            </p>
            
            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {[
                'Get matched with relevant job opportunities',
                'Increase your visibility to recruiters',
                'Receive job alerts based on your profile',
                'Access exclusive job postings'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <button 
              className="px-8 py-3 rounded-full text-white font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: colors.accent.green }}
            >
              Upload Resume Now
            </button>
          </div>

          {/* Right Side - Upload Area */}
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
              <FaUpload className="mx-auto text-4xl text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Drop your resume here</h3>
              <p className="text-gray-600 mb-4">or click to browse files</p>
              <p className="text-sm text-gray-500">Supports PDF, DOC, DOCX (Max 5MB)</p>
              
              <div className="mt-6">
                <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                  Choose File
                </button>
              </div>
            </div>

            {/* File Info */}
            <div className="mt-6 flex items-center justify-center text-sm text-gray-600">
              <FaFileAlt className="mr-2" />
              <span>Your resume will be securely stored and encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UploadResume

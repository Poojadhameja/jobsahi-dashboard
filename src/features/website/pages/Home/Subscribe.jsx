import React, { useState } from 'react'
import { colors } from '../../../../shared/colors'
import { FaEnvelope, FaCheckCircle } from 'react-icons/fa'

const Subscribe = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      // Here you would typically send the email to your backend
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto w-full">
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with Latest Opportunities
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to our newsletter and never miss out on new job postings, 
            career tips, and industry insights.
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
            </form>
          ) : (
            <div className="flex items-center justify-center space-x-2 text-green-200">
              <FaCheckCircle className="text-2xl" />
              <span className="text-lg">Thank you for subscribing!</span>
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold mb-2">10,000+</div>
              <p className="opacity-90">Active Subscribers</p>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">Weekly</div>
              <p className="opacity-90">Job Alerts</p>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">100%</div>
              <p className="opacity-90">Free Service</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Subscribe

import React, { useState } from 'react'
import { FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import textunderline from '../../assets/website_text_underline.png'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [newsletterEmail, setNewsletterEmail] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  const handleNewsletterSubscribe = (e) => {
    e.preventDefault()
    console.log('Subscribed with:', newsletterEmail)
    setNewsletterEmail('')
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Header Section */}
      <section className="bg-[#00395B] py-16">
        <div className="bg-[#EAF5FB] max-w-5xl mx-auto rounded-3xl p-12 text-center">
          <div className="inline-block border-2 border-[#5C9A24] text-[#5C9A24] px-6 py-2 rounded-full text-sm font-semibold mb-6">
            #1 PORTAL JOB PLATFORM
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0B537D] mb-4">
            Feel Free To <span className="relative">Contact Us
              <img src={textunderline} alt="" className="absolute -bottom-2 left-0 w-full h-3" />
            </span>
          </h1>
          <p className="text-gray-600 text-lg">
            Get the latest news, updates and tips.
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left placeholders */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 rounded-xl h-40"></div>
            <div className="bg-gray-100 rounded-xl h-20"></div>
            <div className="bg-gray-100 rounded-xl h-20"></div>
            <div className="bg-gray-100 rounded-xl h-40"></div>
          </div>

          {/* Right content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Contact Us For Your Any Help & Needs.
            </h2>
            <p className="text-gray-600 mb-10 leading-relaxed">
              We highly value your feedback and inquiries at Jobsahi. Whether you have questions about our services, require assistance, or are interested in exploring potential collaborations.
            </p>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#5C9A24] rounded-full flex items-center justify-center text-white">
                  <FaEnvelope />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Email</h3>
                  <p className="text-gray-600">hello@jobsahi.com</p>
                </div>
              </div>

              {/* Call */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#5C9A24] rounded-full flex items-center justify-center text-white">
                  <FaPhone />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Call Support</h3>
                  <p className="text-gray-600">+91-98765-43210</p>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#5C9A24] rounded-full flex items-center justify-center text-white">
                  <FaGlobe />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Website Link</h3>
                  <p className="text-gray-600">www.jobsahi.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-[#EAF5FB]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#5C9A24] mb-10">
            Do You Have Any Questions? Let Us Know!
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" name="name" value={formData.name} onChange={handleInputChange}
              placeholder="Your name here" className="w-full px-6 py-4 border rounded-xl" required />
            <input type="email" name="email" value={formData.email} onChange={handleInputChange}
              placeholder="Your email here" className="w-full px-6 py-4 border rounded-xl" required />
            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
              placeholder="Your Number here" className="w-full px-6 py-4 border rounded-xl" required />
            <textarea name="message" value={formData.message} onChange={handleInputChange}
              placeholder="Tell us about your messages" rows={5} className="w-full px-6 py-4 border rounded-xl" required />
            <button type="submit" className="bg-[#5C9A24] text-white px-8 py-3 rounded-xl hover:bg-[#4a8220]">
              Submit Message
            </button>
          </form>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 bg-[#00395B] text-white">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 space-y-6 md:space-y-0">
          <h3 className="text-xl font-semibold">New Things Will Always Update Regularly</h3>
          <form onSubmit={handleNewsletterSubscribe} className="flex items-center bg-white rounded-full overflow-hidden w-full md:w-auto">
            <input type="email" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter Your Email Here..." className="px-4 py-3 flex-grow text-gray-700 outline-none" required />
            <button type="submit" className="bg-[#5C9A24] text-white px-6 py-3">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Contact

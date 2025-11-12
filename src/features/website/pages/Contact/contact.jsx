import React, { useState } from 'react'
import { FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa'
import Navbar from '../../components/Navbar'
import NewsletterSubscription from '../../components/NewsletterSubscription'
import Footer from '../../components/Footer'
import textunderline from '../../assets/website_text_underline.png'
import { COLOR_CLASSES } from '../../components/colorClasses'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

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

  const handleNewsletterSubscribe = (subscriberEmail) => {
    console.log('Subscribing email:', subscriberEmail)
    setIsSubscribed(true)
    setNewsletterEmail('')
    // You can add API call here to save the subscription
    setTimeout(() => {
      setIsSubscribed(false)
    }, 5000)
  }

  return (
    <div className={`${COLOR_CLASSES.bg.navy} min-h-screen`}>
      <Navbar />

      {/* Header Section */}
<<<<<<< HEAD
      <section className="py-10 bg-[#EAF5FB] mx-4 rounded-[50px] my-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            {/* Top Banner */}
            <div className="mb-5">
              <div className="inline-block border-2 border-[#5C9A24] text-[#5C9A24] px-6 py-2 rounded-full text-sm font-semibold">
=======
      <section className={`py-10 ${COLOR_CLASSES.bg.surfacePaleBlue} mx-4 rounded-[40px] sm:rounded-[50px] my-8 border-t-4 border-l-4 border-r-4 ${COLOR_CLASSES.border.deepBlue}`}>
        <div className="max-w-[90%] mx-auto px-6">
          <div className="text-center">
            {/* Top Banner */}
            <div className="mb-6">
              <div className={`inline-block border-2 ${COLOR_CLASSES.border.accentGreen} ${COLOR_CLASSES.text.accentGreen} px-6 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide`}>
>>>>>>> 96e921496a3e305fa2311400f7e5458b342ed079
                #1 PORTAL JOB PLATFORM
              </div>
            </div>

            {/* Main Heading */}
<<<<<<< HEAD
            <div className="flex flex-col items-center justify-center text-center mb-5 md:mb-12 ">
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:px-20 font-bold mb-8 text-[#0B537D] leading-tight">
              Feel Free To Contact Us
              </h1>
              <img src={textunderline} alt="" className="w-[30%] h-[15px] md:h-[25px] -mt-10" />
            </div>

            {/* Description */}
            <p className="text-gray-700 text-lg ">
            Get the latest news, updates and tips.
=======
            <div className="flex flex-col items-center justify-center text-center mb-5 md:mb-10">
              <h1 className={`text-3xl sm:text-5xl md:text-6xl lg:px-24 font-bold mb-6 ${COLOR_CLASSES.text.deepBlue} leading-tight`}>
                Feel Free To <span className="relative inline-block">
                  Contact Us
                  <img src={textunderline} alt="underline" className="absolute -bottom-2 left-0 w-full h-3 sm:h-4 object-contain" />
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-base sm:text-lg max-w-2xl mx-auto">
              We would love to hear from you! Share your questions, feedback, or collaboration ideas and our team will reach out shortly.
>>>>>>> 96e921496a3e305fa2311400f7e5458b342ed079
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left visuals */}
          <div className="relative">
            <div className="sm:w-96 sm:h-96 w-60 h-60 bg-blue-100 rounded-3xl relative">
              <div className="w-[80%]">
                <div className="flex gap-3">
                  <div className="flex-1 bg-white rounded-xl p-4 shadow-lg relative">
                    <input 
                      type="text" 
                      placeholder="Contact Us..." 
                      className="w-full text-gray-700 bg-transparent border-none outline-none text-lg"
                      readOnly
                    />
                  </div>
                  <button className={`w-16 h-16 ${COLOR_CLASSES.bg.accentLime} rounded-xl flex items-center justify-center shadow-lg relative`}>
                      <FaPhone className="text-white text-lg" />
                    <div className={`absolute inset-0 ${COLOR_CLASSES.bg.accentLime} rounded-xl opacity-30 blur-sm`}></div>
                  </button>
                </div>
                <div className="absolute border-4 border-white -bottom-10 left-40 sm:-bottom-10 sm:left-72 w-32 h-24 sm:w-48 sm:h-40 bg-blue-100 rounded-2xl"></div>
              </div>
            </div>
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
                <div className={`w-12 h-12 ${COLOR_CLASSES.bg.accentGreen} rounded-full flex items-center justify-center text-white`}>
                  <FaEnvelope />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Email</h3>
                  <p className="text-gray-600">hello@jobsahi.com</p>
                </div>
              </div>

              {/* Call */}
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${COLOR_CLASSES.bg.accentGreen} rounded-full flex items-center justify-center text-white`}>
                  <FaPhone />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Call Support</h3>
                  <p className="text-gray-600">+91-98765-43210</p>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${COLOR_CLASSES.bg.accentGreen} rounded-full flex items-center justify-center text-white`}>
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
      <section className={`py-20 ${COLOR_CLASSES.bg.surfacePaleBlue}`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold ${COLOR_CLASSES.text.accentGreen} mb-10`}>
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
            <button type="submit" className={`${COLOR_CLASSES.bg.accentGreen} text-white px-8 py-3 rounded-xl ${COLOR_CLASSES.hoverBg.accentGreenDeepest}`}>
              Submit Message
            </button>
          </form>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSubscription 
        headerContent={{
          title: "New Things Will Always Update Regularly"
        }}
        email={newsletterEmail}
        setEmail={setNewsletterEmail}
        onSubscribe={handleNewsletterSubscribe}
        isSubscribed={isSubscribed}
      />

      <Footer />
    </div>
  )
}

export default Contact

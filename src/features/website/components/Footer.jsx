import React from 'react'
import { colors } from '../../../shared/colors'
import { FaSearch, FaBriefcase, FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Information Column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center mb-4">
              <div className="flex items-center text-3xl font-bold">
                <span style={{ color: colors.primary.blue }}>JOB</span>
                <span className="relative mx-1">
                  <FaSearch className="text-lg" style={{ color: colors.primary.blue }} />
                </span>
                <span style={{ color: colors.accent.green }}>SAHI</span>
                <span className="relative ml-1">
                  <FaBriefcase className="text-sm" style={{ color: colors.accent.green }} />
                </span>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-md">
              JOBSAHI Is A Dedicated Platform Connecting ITI And Polytechnic Students With Job Opportunities, Apprenticeships, And Skill Enhancement Programs.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-3">
              {/* Facebook */}
              <div 
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center cursor-pointer hover:bg-[#5C9A24] border-[#5C9A24] text-[#5C9A24] hover:text-white "
                // style={{ borderColor: colors.accent.lightGreen }}
              >
                <FaFacebookF 
                  className="text-sm " 
                  // style={{ color: colors.accent.green }}
                />
              </div>
              
              {/* Twitter */}
              <div 
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center cursor-pointer hover:bg-[#5C9A24] border-[#5C9A24] text-[#5C9A24] hover:text-white"
                // style={{ backgroundColor: colors.accent.green }}
              >
                <FaTwitter className="text-sm" />
              </div>
              
              {/* LinkedIn */}
              <div 
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center cursor-pointer hover:bg-[#5C9A24] border-[#5C9A24] text-[#5C9A24] hover:text-white"
                // style={{ borderColor: colors.accent.lightGreen }}
              >
                <FaLinkedinIn 
                  className="text-sm" 
                  // style={{ color: colors.accent.green }}
                />
              </div>
            </div>
          </div>
          
          {/* About Column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">About</h3>
            <ul className="space-y-2">
              {['Home', 'About Us', 'Job', 'Media', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Dashboard Column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Dashboard</h3>
            <ul className="space-y-2">
              {['Student', 'Recruiter', 'Institutes', 'Super Admin'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources Column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Resources</h3>
            <ul className="space-y-2">
              {['Find Job', 'Recruiters', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Us Column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
                >
                  <FaWhatsapp className="text-green-500" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
                >
                  <FaEnvelope className="text-blue-500" />
                  <span>Email</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
                >
                  Social Media
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Separator Line */}
      <div 
        className="w-full h-px"
        style={{ backgroundColor: colors.accent.lightGreen }}
      ></div>
      
      {/* Bottom Section - Copyright and Legal Links */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          {/* Copyright */}
          <div className="text-gray-600 text-sm">
            © 2025 JOBSAHI All Right Reserved.
          </div>
          
          {/* Legal Links */}
          <div className="flex space-x-6">
            <a 
              href="#" 
              className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
            >
              Term & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

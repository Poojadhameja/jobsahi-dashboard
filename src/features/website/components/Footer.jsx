import React from 'react'
import { Link } from 'react-router-dom'
import { colors } from '../../../shared/colors'
import { FaSearch, FaBriefcase, FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp, FaEnvelope } from 'react-icons/fa'
import colorlogo from "../assets/coloredlogo.png"

const Footer = () => {
  return (
    <footer className="bg-white">
      {/* Main Footer Content */}
      <div className="max-w-[90%] mx-auto px-6 py-12">
        <div className="flex flex-col flex-wrap sm:flex-row gap-8 md:gap-16">
          
          {/* Brand Information Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Logo */}
            <img src={colorlogo} alt="" className="h-10" />
            
            {/* Description */}
            <p className="text-gray-700 text-sm leading-relaxed mb-6 md:max-w-md">
              JOBSAHI Is A Dedicated Platform Connecting ITI And Polytechnic Students With Job Opportunities, Apprenticeships, And Skill Enhancement Programs.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-3">
              {/* Facebook */}
              <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center cursor-pointer hover:bg-[#5C9A24] border-[#5C9A24] text-[#5C9A24] hover:text-white ">
                <FaFacebookF className="text-sm " />
              </div>

              {/* Twitter */}
              <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center cursor-pointer hover:bg-[#5C9A24] border-[#5C9A24] text-[#5C9A24] hover:text-white">
                <FaTwitter className="text-sm" />
              </div>

              {/* LinkedIn */}
              <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center cursor-pointer hover:bg-[#5C9A24] border-[#5C9A24] text-[#5C9A24] hover:text-white">
                <FaLinkedinIn className="text-sm"/>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-8 md:gap-16 sm:flex-row">
           
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
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors text-sm">
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors text-sm">
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
      </div>
      
      {/* Separator Line */}
      <div 
        className="w-full h-px bg-[#5C9A24]"
        // style={{ backgroundColor: colors.accent.lightGreen }}
      ></div>
      
      {/* Bottom Section - Copyright and Legal Links */}
      <div className=" max-w-[90%] mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          {/* Copyright */}
          <div className="text-gray-600 text-sm">
            © 2025 JOBSAHI All Right Reserved.
          </div>
          
          {/* Legal Links */}
          <div className="flex space-x-6">
            <Link 
              to="/privacy-policy" 
              className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms-conditions" 
              className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
            >
              Term & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

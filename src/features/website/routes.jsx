import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home-Pages/home.jsx'
import About from './pages/About-Pages/About.jsx'
import Courses from './pages/Courses/Courses.jsx'
import Contact from './pages/Contact/contact.jsx'
import PrivacyPolicy from './pages/Privacy-Policy/PrivacyPolicy.jsx'
import TermsConditions from './pages/Terms-Conditions/TermsConditions.jsx'

export default function WebsiteRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-conditions" element={<TermsConditions />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

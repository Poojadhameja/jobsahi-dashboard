import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home.jsx'

export default function WebsiteRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

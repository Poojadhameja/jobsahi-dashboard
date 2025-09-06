import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

const AdminRoutes = lazy(() => import('./features/admin/routes.jsx'))

export default function App() {
  return (
    <Router>
      <Suspense fallback={<div className="p-8">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="*" element={<div className="p-8">404 — Not Found</div>} />
        </Routes>
      </Suspense>
    </Router>
  )
}

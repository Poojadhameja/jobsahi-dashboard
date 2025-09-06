import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

const AdminLayout = lazy(() => import('./components/AdminLayout.jsx'))
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const Management = lazy(() => import('./pages/Management.jsx'))
const JobCourseControl = lazy(() => import('./pages/JobCourseControl.jsx'))

export default function AdminRoutes() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="management" element={<Management />} />
          <Route path="job-control" element={<JobCourseControl />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Route>
      </Routes>
    </Suspense>
  )
}



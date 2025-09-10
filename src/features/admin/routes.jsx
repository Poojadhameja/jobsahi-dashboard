import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

const AdminLayout = lazy(() => import('./components/AdminLayout.jsx'))
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const Management = lazy(() => import('./pages/Management.jsx'))
const JobCourseControl = lazy(() => import('./pages/JobCourseControl.jsx'))
const MessagingCampaigns = lazy(() => import('./pages/MessagingCampaigns.jsx'))
const Settings = lazy(() => import('./pages/Settings.jsx'))
const AlertsAutomation = lazy(() => import('./pages/AlertsAutomation.jsx'))

export default function AdminRoutes() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="management" element={<Management />} />
          <Route path="job-control" element={<JobCourseControl />} />
          <Route path="messaging-campaigns" element={<MessagingCampaigns />} />
          <Route path="alerts-automation" element={<AlertsAutomation />} />
          <Route path="alerts" element={<AlertsAutomation />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Route>
      </Routes>
    </Suspense>
  )
}



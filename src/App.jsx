import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Layout (new location)
import AdminLayout from './features/admin/components/AdminLayout.jsx'

// Pages (NEW PATHS — no more "views/")
import Dashboard from './features/admin/pages/Dashboard.jsx'
import Management from './features/admin/pages/Management.jsx'
// import StudentManagement from './features/admin/pages/StudentManagement.jsx'
// import EmployerManagement from './features/admin/pages/EmployerManagement.jsx'
// import InstituteManagement from './features/admin/pages/InstituteManagement.jsx'
// import AdminProfile from './features/admin/pages/AdminProfile.jsx'
// import Users from './features/admin/pages/Users.jsx'
// import MessagingCampaigns from './features/admin/pages/MessagingCampaigns.jsx'
// import Settings from './features/admin/pages/Settings.jsx'
// import JobCourseControl from './features/admin/pages/JobCourseControl.jsx'

export default function App() {
  return (
    <Router>
      <Routes>
        {/* redirect root to /admin */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

        {/* Admin area with layout + nested pages */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="management" element={<Management />} />
          {/* <Route path="managements" element={<StudentManagement />} />
          <Route path="managements/employer" element={<EmployerManagement />} />
          <Route path="managements/institute" element={<InstituteManagement />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="users" element={<Users />} />
          <Route path="messaging-campaigns" element={<MessagingCampaigns />} />
          <Route path="settings" element={<Settings />} />
          <Route path="job-control" element={<JobCourseControl />} /> */}
        </Route>

        {/* 404 */}
        <Route path="*" element={<div className="p-8">404 — Not Found</div>} />
      </Routes>
    </Router>
  )
}

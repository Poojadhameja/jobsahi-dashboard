import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import AdminLayout from './components/AdminLayout.jsx'
import Dashboard from './pages/Home.jsx'
import Management from './pages/Management/Management.jsx'
import JobCourseControl from './pages/Job_Course_Control/job_course_control.jsx'
import BusinessRevenue from './pages/Buiness_Revenue/business_revenue.jsx'
import ReportAnalytics from './pages/Reports_Analytics/report_analytics.jsx'
import MessagingCampaigns from './pages/MessagingCampaigns/MessagingCampaignscontrol.jsx'
import AlertsAutomation from './pages/Alert_Automation/alert_automation.jsx'
import SystemSetting from './pages/System_Setting/system_setting.jsx'
import AdminTools from './pages/Tools_&_Logs/Admin_Tools.jsx'
import AdminProfile from '../../shared/auth/AdminProfile.jsx'

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="management" element={<Management />} />
        <Route path="job-control" element={<JobCourseControl />} />
        <Route path="business-panel" element={<BusinessRevenue />} />
        <Route path="reports" element={<ReportAnalytics />} />
        <Route path="messaging-campaigns" element={<MessagingCampaigns />} />
        <Route path="alerts-automation" element={<AlertsAutomation />} />
        <Route path="settings" element={<SystemSetting />} />
        <Route path="tools-logs" element={<AdminTools />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  )
}

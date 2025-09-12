import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

const AdminLayout = lazy(() => import('./components/AdminLayout.jsx'))
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const Management = lazy(() => import('./pages/Management/Management.jsx'))
const JobCourseControl = lazy(() => import('./pages/Job_Course_Control/job_course_control.jsx'))
const BusinessRevenue = lazy(() => import('./pages/Buiness_Revenue/business_revenue.jsx'))
const ReportAnalytics = lazy(() => import('./pages/Reports_Analytics/report_analytics.jsx'))
const MessagingCampaigns = lazy(() => import('./pages/MessagingCampaigns/MessagingCampaignscontrol.jsx'))
const AlertsAutomation = lazy(() => import('./pages/Alert_Automation/alert_automation.jsx'))
const SystemSetting = lazy(() => import('./pages/System_Setting/system_setting.jsx'))
const ToolsLogs = lazy(() => import('./pages/ToolsLogs.jsx'))
const AdminProfile = lazy(() => import('../../shared/auth/AdminProfile.jsx'))

export default function AdminRoutes() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
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
          <Route path="tools-logs" element={<ToolsLogs />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

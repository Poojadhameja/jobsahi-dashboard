import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../../../app/routes/ProtectedRoute';

// Import all recruiter pages
import Dashboard from './pages/Dashboard';
import AnalyticsReports from './pages/AnalyticsReports';

// Company Profile Pages
import CompanyInfo from './pages/company-profile/Company-Info';
import CompanyProfile from './pages/company-profile/CompanyProfile';
import TeamManagement from './pages/company-profile/TeamManagement';
import Preferences from './pages/company-profile/Preferences';

// Candidate Management Pages
import CandidateManagement from './pages/candidate-management/CandidateManagement';
import InstaMatch from './pages/candidate-management/InstaMatch';
import ViewApplicants from './pages/candidate-management/ViewApplicants';

// Interview Scheduler Pages
import InterviewScheduler from './pages/interview-scheduler/InterviewScheduler';
import PanelManagement from './pages/interview-scheduler/PanelManagement';
import ScheduleInterviews from './pages/interview-scheduler/ScheduleInterviews';

// Job Management Pages
import JobManagement from './pages/job-management/JobManagement';
import ManageJob from './pages/job-management/ManageJob';
import PostJob from './pages/job-management/PostJob';

// Message & Notification Pages
import Message from './pages/message-notification/Message';
import MessageNotification from './pages/message-notification/MessageNotification';
import Notifications from './pages/message-notification/Notifications';

// Recruiter Layout Component
const RecruiterLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Recruiter Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, Recruiter</span>
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">R</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

// Recruiter Routes
const RecruiterRoutes = () => {
  return (
    <Routes>
      {/* Dashboard */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <RecruiterLayout>
              <Dashboard />
            </RecruiterLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Analytics & Reports */}
      <Route 
        path="/analytics" 
        element={
          <ProtectedRoute>
            <RecruiterLayout>
              <AnalyticsReports />
            </RecruiterLayout>
          </ProtectedRoute>
        } 
      />

      {/* Company Profile Routes */}
      <Route 
        path="/company-profile" 
        element={
          <ProtectedRoute>
            <RecruiterLayout>
              <CompanyProfile />
            </RecruiterLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/company-profile/info" 
        element={
          <ProtectedRoute>
            <RecruiterLayout>
              <CompanyInfo />
            </RecruiterLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/company-profile/team" 
        element={
          <ProtectedRoute>
            <RecruiterLayout>
              <TeamManagement />
            </RecruiterLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/company-profile/preferences" 
        element={
          <ProtectedRoute>
            <RecruiterLayout>
              <Preferences />
            </RecruiterLayout>
          </ProtectedRoute>
        } 
      />

      {/* Candidate Management Routes */}
      <Route 
        path="/candidates" 
        element={
          <ProtectedRoute>
            <RecruiterLayout>
              <CandidateManagement />
            </RecruiterLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/candidates/insta-match" 
        element={
          <ProtectedRoute>
            <RecruiterLayout>
              <InstaMatch />
            </RecruiterLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/candidates/applicants" 
        element={
          <ProtectedRoute>
            <RecruiterLayout>
              <ViewApplicants />
            </RecruiterLayout>
          </ProtectedRoute>
        } 
      />

      {/* Interview Scheduler Routes */}
      <Route 
        path="/interviews" 
        element={
          <ProtectedRoute>
            <RecruiterLayout>
              <InterviewScheduler />
            </RecruiterLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/interviews/panel" 
        element={
          <ProtectedRoute>
            <RecruiterLayout>
              <PanelManagement />
            </RecruiterLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/interviews/schedule" 
        element={
          <ProtectedRoute>
            <RecruiterLayout>
              <ScheduleInterviews />
            </RecruiterLayout>
          </ProtectedRoute>
        } 
      />

      {/* Job Management Routes */}
      <Route 
        path="/jobs" 
        element={
          <ProtectedRoute>
            <RecruiterLayout>
              <JobManagement />
            </RecruiterLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/jobs/manage" 
        element={
          <ProtectedRoute>
            <RecruiterLayout>
              <ManageJob />
            </RecruiterLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/jobs/post" 
        element={
          <ProtectedRoute>
            <RecruiterLayout>
              <PostJob />
            </RecruiterLayout>
          </ProtectedRoute>
        } 
      />

      {/* Message & Notification Routes */}
      <Route 
        path="/messages" 
        element={
          <ProtectedRoute>
            <RecruiterLayout>
              <Message />
            </RecruiterLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/notifications" 
        element={
          <ProtectedRoute>
            <RecruiterLayout>
              <MessageNotification />
            </RecruiterLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/notifications/settings" 
        element={
          <ProtectedRoute>
            <RecruiterLayout>
              <Notifications />
            </RecruiterLayout>
          </ProtectedRoute>
        } 
      />

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/recruiter" replace />} />
    </Routes>
  );
};

export default RecruiterRoutes;

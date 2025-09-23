import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './shared/auth/Login.jsx'
import CreateAccount from './shared/auth/CreateAccount.jsx'
import RoleRoute from "./RoleRoute.jsx";

const AdminRoutes = lazy(() => import('./features/admin/routes.jsx'))
const RecruiterRoutes = lazy(() => import('./features/recruiter/routes.jsx'))

export default function App() {

  return (
    <Router>
      <Suspense fallback={<div className="p-8">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/admin/*" element={ <RoleRoute allowedRoles={["admin"]}>
              <AdminRoutes />
            </RoleRoute> } />
          <Route path="/recruiter/*" element={<RoleRoute allowedRoles={["recruiter"]}>
              <RecruiterRoutes />
            </RoleRoute>} />
          <Route path="*" element={<div className="p-8">404 — Not Found</div>} />
        </Routes>
      </Suspense>
    </Router>
  )
}

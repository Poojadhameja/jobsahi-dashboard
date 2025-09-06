import React, { lazy, Suspense } from 'react'
import { useRoutes, Navigate } from 'react-router-dom'

const AdminLayout = lazy(() => import('./components/AdminLayout.jsx'))
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const Management = lazy(() => import('./pages/Management.jsx'))

export default function AdminRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {useRoutes([
        {
          path: '',
          element: <AdminLayout />,
          children: [
            { index: true, element: <Navigate to="dashboard" replace /> },
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'management', element: <Management /> },
          ]
        }
      ])}
    </Suspense>
  )
}

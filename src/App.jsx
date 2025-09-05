import { Suspense } from 'react'
import AppRoutes from './app/routes/AppRoutes.jsx'

export default function App() {
  return (
    <div className="min-h-screen text-gray-900">
      <Suspense fallback={<div className="p-6">Loading...</div>}>
        <AppRoutes />
      </Suspense>
    </div>
  )
}



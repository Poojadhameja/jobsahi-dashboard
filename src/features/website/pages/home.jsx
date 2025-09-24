import React from 'react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to JobSahi Dashboard
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your comprehensive platform for job management, course tracking, and recruitment
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">For Employers</h3>
              <p className="text-gray-600">
                Manage job postings, track candidates, and streamline your hiring process.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">For Institutes</h3>
              <p className="text-gray-600">
                Manage courses, track student progress, and issue certificates.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">For Recruiters</h3>
              <p className="text-gray-600">
                Find the best candidates and manage your recruitment pipeline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

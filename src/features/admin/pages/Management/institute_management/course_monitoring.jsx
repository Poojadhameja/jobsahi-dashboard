import React from 'react'

// Course List Table Component
function CourseListTable() {
  const courseData = [
    {
      courseName: "Electrician (Level 1)",
      category: "Vocational",
      enrolled: "152",
      certificate: "Active",
      status: "View"
    },
    {
      courseName: "Computer Basics",
      category: "Digital Skills",
      enrolled: "95",
      certificate: "Inactive",
      status: "View"
    }
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Course List</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Course Name</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Enrolled</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Certificate</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {courseData.map((course, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-900">{course.courseName}</td>
                <td className="py-3 px-4 text-gray-700">{course.category}</td>
                <td className="py-3 px-4 text-gray-700">{course.enrolled}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    course.certificate === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {course.certificate}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    {course.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Enrollment Trends Chart Component
function EnrollmentTrendsChart() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Enrollment Trends</h3>
        <select className="px-3 py-1 border border-gray-300 rounded text-sm">
          <option>By Date</option>
        </select>
      </div>
      
      {/* Simple Line Chart Representation */}
      <div className="h-64 flex items-end justify-between px-4">
        <div className="flex flex-col items-center">
          <div className="w-8 bg-blue-500 rounded-t" style={{ height: '60px' }}></div>
          <span className="text-xs text-gray-600 mt-2">Feb</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 bg-blue-500 rounded-t" style={{ height: '100px' }}></div>
          <span className="text-xs text-gray-600 mt-2">Feb</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 bg-blue-500 rounded-t" style={{ height: '105px' }}></div>
          <span className="text-xs text-gray-600 mt-2">Mar</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 bg-blue-500 rounded-t" style={{ height: '150px' }}></div>
          <span className="text-xs text-gray-600 mt-2">Apr</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 bg-blue-500 rounded-t" style={{ height: '220px' }}></div>
          <span className="text-xs text-gray-600 mt-2">May</span>
        </div>
      </div>
    </div>
  )
}

// Enrollment Issue Table Component
function EnrollmentIssueTable() {
  const issueData = [
    {
      course: "Computer Basics",
      certificate: "95",
      status: "Viewdetails"
    },
    {
      course: "Computer Basics",
      certificate: "87",
      status: "Inactive"
    }
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Enrollment Issue</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Course</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Certificate</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {issueData.map((issue, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-900">{issue.course}</td>
                <td className="py-3 px-4 text-gray-700">{issue.certificate}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    issue.status === 'Viewdetails' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {issue.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Certificate Issuance Status Chart Component
function CertificateIssuanceChart() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificate Issuance Status</h3>
      
      {/* Bar Chart Representation */}
      <div className="h-64 flex items-end justify-between px-4">
        <div className="flex flex-col items-center">
          <div className="w-8 bg-blue-500 rounded-t" style={{ height: '150px' }}></div>
          <span className="text-xs text-gray-600 mt-2">Q1</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 bg-blue-500 rounded-t" style={{ height: '190px' }}></div>
          <span className="text-xs text-gray-600 mt-2">Q2</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 bg-blue-500 rounded-t" style={{ height: '210px' }}></div>
          <span className="text-xs text-gray-600 mt-2">Q3</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 bg-blue-500 rounded-t" style={{ height: '250px' }}></div>
          <span className="text-xs text-gray-600 mt-2">Q4</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 bg-blue-500 rounded-t" style={{ height: '160px' }}></div>
          <span className="text-xs text-gray-600 mt-2">Q5</span>
        </div>
      </div>
    </div>
  )
}

export default function CourseMonitoring() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">✓</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Course & Enrollment</h2>
      </div>
      
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course List */}
        <CourseListTable />
        
        {/* Enrollment Trends */}
        <EnrollmentTrendsChart />
        
        {/* Enrollment Issue */}
        <EnrollmentIssueTable />
        
        {/* Certificate Issuance Status */}
        <CertificateIssuanceChart />
      </div>
    </div>
  )
}

import React from 'react'
import { TAILWIND_COLORS } from '../../../../../shared/WebConstant'
import Button from '../../../../../shared/components/Button'

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
      <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Course List</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className={`text-left py-3 px-4 font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>Course Name</th>
              <th className={`text-left py-3 px-4 font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>Category</th>
              <th className={`text-left py-3 px-4 font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>Enrolled</th>
              <th className={`text-left py-3 px-4 font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>Certificate</th>
              <th className={`text-left py-3 px-4 font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>Status</th>
            </tr>
          </thead>
          <tbody>
            {courseData.map((course, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className={`py-3 px-4 ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{course.courseName}</td>
                <td className={`py-3 px-4 ${TAILWIND_COLORS.TEXT_MUTED}`}>{course.category}</td>
                <td className={`py-3 px-4 ${TAILWIND_COLORS.TEXT_MUTED}`}>{course.enrolled}</td>
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
                  <Button 
                    variant="light" 
                    size="sm"
                    onClick={() => console.log('View course:', course.courseName)}
                  >
                    {course.status}
                  </Button>
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
        <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Enrollment Trends</h3>
        <select className="px-3 py-1 border border-gray-300 rounded text-sm">
          <option>By Date</option>
        </select>
      </div>
      
      {/* Simple Line Chart Representation */}
      <div className="h-64 flex items-end justify-between px-4">
        <div className="flex flex-col items-center">
          <div className="w-8 bg-blue-500 rounded-t" style={{ height: '60px' }}></div>
          <span className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mt-2`}>Feb</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 bg-blue-500 rounded-t" style={{ height: '100px' }}></div>
          <span className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mt-2`}>Feb</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 bg-blue-500 rounded-t" style={{ height: '105px' }}></div>
          <span className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mt-2`}>Mar</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 bg-blue-500 rounded-t" style={{ height: '150px' }}></div>
          <span className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mt-2`}>Apr</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 bg-blue-500 rounded-t" style={{ height: '220px' }}></div>
          <span className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mt-2`}>May</span>
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
      status: "View details"
    },
    {
      course: "Computer Basics",
      certificate: "87",
      status: "Inactive"
    }
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Enrollment Issue</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className={`text-left py-3 px-4 font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>Course</th>
              <th className={`text-left py-3 px-4 font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>Certificate</th>
              <th className={`text-left py-3 px-4 font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>Status</th>
            </tr>
          </thead>
          <tbody>
            {issueData.map((issue, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className={`py-3 px-4 ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{issue.course}</td>
                <td className={`py-3 px-4 ${TAILWIND_COLORS.TEXT_MUTED}`}>{issue.certificate}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    issue.status === 'View details' 
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
      <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Certificate Issuance Status</h3>
      
      {/* Bar Chart Representation */}
      <div className="h-64 flex items-end justify-between px-4">
        <div className="flex flex-col items-center">
          <div className="w-8 bg-blue-500 rounded-t" style={{ height: '150px' }}></div>
          <span className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mt-2`}>Q1</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 bg-blue-500 rounded-t" style={{ height: '190px' }}></div>
          <span className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mt-2`}>Q2</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 bg-blue-500 rounded-t" style={{ height: '210px' }}></div>
          <span className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mt-2`}>Q3</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 bg-blue-500 rounded-t" style={{ height: '250px' }}></div>
          <span className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mt-2`}>Q4</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 bg-blue-500 rounded-t" style={{ height: '160px' }}></div>
          <span className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mt-2`}>Q5</span>
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
        <h2 className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Course & Enrollment</h2>
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

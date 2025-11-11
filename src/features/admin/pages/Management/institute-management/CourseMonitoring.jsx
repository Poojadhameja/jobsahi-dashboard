import React, { useState } from 'react'
import { TAILWIND_COLORS } from '../../../../../shared/WebConstant.js'
import Button from '../../../../../shared/components/Button'

// Course List Table Component
function CourseListTable({ onViewCourse }) {
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
                    onClick={() => onViewCourse(course)}
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

// Course Details Modal Component
function CourseDetailsModal({ course, isOpen, onClose }) {
  if (!isOpen || !course) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className={`text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Course Details</h2>
          <button
            onClick={onClose}
            className={`${TAILWIND_COLORS.TEXT_MUTED} hover:text-gray-600 transition-colors duration-200`}
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Course Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
            <h3 className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
              {course.courseName}
            </h3>
            <div className="flex items-center gap-4 mt-3">
              <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                course.certificate === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {course.certificate}
              </span>
              <span className={`px-3 py-1 text-sm rounded-full font-medium bg-blue-100 text-blue-800`}>
                {course.category}
              </span>
            </div>
          </div>

          {/* Course Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>Category</h4>
              <p className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{course.category}</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>Total Enrolled</h4>
              <p className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{course.enrolled} Students</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>Certificate Status</h4>
              <p className={`text-lg font-semibold ${
                course.certificate === 'Active' ? 'text-green-600' : 'text-red-600'
              }`}>
                {course.certificate}
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>Course Status</h4>
              <p className="text-lg font-semibold text-green-600">Active</p>
            </div>
          </div>

          {/* Additional Information */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h4 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>
              Course Overview
            </h4>
            <p className={`${TAILWIND_COLORS.TEXT_MUTED} leading-relaxed`}>
              This course provides comprehensive training in {course.category.toLowerCase()}. 
              Students will gain practical skills and knowledge through hands-on learning experiences. 
              Upon successful completion, students will receive a certificate recognizing their achievement.
            </p>
          </div>

          {/* Enrollment Statistics */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>
              Enrollment Statistics
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{course.enrolled}</p>
                <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>Total Students</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">
                  {Math.floor(parseInt(course.enrolled) * 0.85)}
                </p>
                <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>Completed</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-600">
                  {Math.floor(parseInt(course.enrolled) * 0.15)}
                </p>
                <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>In Progress</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function CourseMonitoring() {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewCourse = (course) => {
    setSelectedCourse(course)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedCourse(null)
  }

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
        <CourseListTable onViewCourse={handleViewCourse} />
        
        {/* Enrollment Trends */}
        <EnrollmentTrendsChart />
        
        {/* Enrollment Issue */}
        <EnrollmentIssueTable />
        
        {/* Certificate Issuance Status */}
        <CertificateIssuanceChart />
      </div>

      {/* Course Details Modal */}
      <CourseDetailsModal 
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

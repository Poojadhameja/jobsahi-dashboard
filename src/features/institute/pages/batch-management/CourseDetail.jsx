import React from 'react'
import { LuArrowLeft } from 'react-icons/lu'
import Button from '../../../../shared/components/Button'
import { MatrixCard } from '../../../../shared/components/metricCard'

export default function CourseDetail({ courseData, onBack }) {
  if (!courseData) {
    return (
      <div className="p-2 bg-[#F6FAFF] min-h-screen">
        <div className="text-center text-gray-500">No course data available</div>
      </div>
    )
  }

  return (
    <div className="p-2 bg-[#F6FAFF] min-h-screen">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
            onClick={onBack}
            variant="outline"
            size="sm"
            icon={<LuArrowLeft className="w-4 h-4" />}
            className="border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            Back to Batches
          </Button>
        </div>
        <MatrixCard 
          title={courseData.title} 
          subtitle={courseData.description}
          className="mb-4"
        />
      </div>

      {/* Course Information Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Course Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Course Title */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>Course Title</h3>
            <p className="text-lg font-medium" style={{ color: 'var(--color-text-primary)' }}>{courseData.title}</p>
          </div>

          {/* Course ID */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>Course ID</h3>
            <p style={{ color: 'var(--color-text-primary)' }}>#{courseData.id}</p>
          </div>

          {/* Instructor */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>Instructor</h3>
            <p style={{ color: 'var(--color-text-primary)' }}>{courseData.instructor}</p>
          </div>

          {/* Total Batches */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>Total Batches</h3>
            <p style={{ color: 'var(--color-text-primary)' }}>{courseData.totalBatches}</p>
          </div>

          {/* Active Batches */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>Active Batches</h3>
            <p style={{ color: 'var(--color-text-primary)' }}>{courseData.activeBatches}</p>
          </div>

          {/* Course Status */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>Course Status</h3>
            <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: 'var(--color-success)', color: 'white' }}>
              Active
            </span>
          </div>
        </div>

        {/* Course Description */}
        <div className="mt-6 space-y-2">
          <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>Description</h3>
          <p className="leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>{courseData.description}</p>
        </div>
      </div>

      {/* Course Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>{courseData.totalBatches}</div>
            <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Total Batches</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: 'var(--color-secondary)' }}>{courseData.activeBatches}</div>
            <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Active Batches</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: 'var(--color-warning)' }}>
              {courseData.batches ? courseData.batches.reduce((total, batch) => {
                const [current, max] = batch.students.split('/').map(Number)
                return total + (current || 0)
              }, 0) : 0}
            </div>
            <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Enrolled Students</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: 'var(--color-info)' }}>
              {courseData.batches ? courseData.batches.reduce((total, batch) => {
                const [current, max] = batch.students.split('/').map(Number)
                return total + (max || 0)
              }, 0) : 0}
            </div>
            <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Max Capacity</div>
          </div>
        </div>
      </div>

      {/* Student Enrollment Details */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Student Enrollment Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Enrollment Status */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>Enrollment Status</h3>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-success)' }}></div>
              <span style={{ color: 'var(--color-text-primary)' }}>Open for Enrollment</span>
            </div>
          </div>

          {/* Enrollment Deadline */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>Enrollment Deadline</h3>
            <p style={{ color: 'var(--color-text-primary)' }}>December 31, 2024</p>
          </div>

          {/* Course Fee */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>Course Fee</h3>
            <p className="font-semibold text-lg" style={{ color: 'var(--color-secondary)' }}>₹15,000</p>
          </div>

          {/* Payment Options */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>Payment Options</h3>
            <p style={{ color: 'var(--color-text-primary)' }}>Full Payment / Installments</p>
          </div>
        </div>

        {/* Enrollment Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>Enrollment Progress</h3>
            <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              {courseData.batches ? courseData.batches.reduce((total, batch) => {
                const [current, max] = batch.students.split('/').map(Number)
                return total + (current || 0)
              }, 0) : 0} / {courseData.batches ? courseData.batches.reduce((total, batch) => {
                const [current, max] = batch.students.split('/').map(Number)
                return total + (max || 0)
              }, 0) : 0} students
            </span>
          </div>
          <div className="w-full rounded-full h-2" style={{ backgroundColor: 'var(--color-gray-200)' }}>
            <div 
              className="h-2 rounded-full" 
              style={{
                backgroundColor: 'var(--color-primary)',
                width: `${courseData.batches ? (courseData.batches.reduce((total, batch) => {
                  const [current, max] = batch.students.split('/').map(Number)
                  return total + (current || 0)
                }, 0) / courseData.batches.reduce((total, batch) => {
                  const [current, max] = batch.students.split('/').map(Number)
                  return total + (max || 0)
                }, 0)) * 100 : 0}%`
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Course Details */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Course Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Course Duration */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>Course Duration</h3>
            <p style={{ color: 'var(--color-text-primary)' }}>3 Months</p>
          </div>

          {/* Course Level */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>Course Level</h3>
            <p style={{ color: 'var(--color-text-primary)' }}>Intermediate</p>
          </div>

          {/* Prerequisites */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>Prerequisites</h3>
            <p style={{ color: 'var(--color-text-primary)' }}>Basic electrical knowledge</p>
          </div>

          {/* Certification */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>Certification</h3>
            <p style={{ color: 'var(--color-text-primary)' }}>Industry recognized certificate</p>
          </div>

          {/* Course Type */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>Course Type</h3>
            <p style={{ color: 'var(--color-text-primary)' }}>Practical Training</p>
          </div>

          {/* Language */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>Language</h3>
            <p style={{ color: 'var(--color-text-primary)' }}>English</p>
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>Start Date</h3>
            <p style={{ color: 'var(--color-text-primary)' }}>January 15, 2024</p>
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>End Date</h3>
            <p style={{ color: 'var(--color-text-primary)' }}>April 15, 2024</p>
          </div>
        </div>
      </div>

      {/* Available Courses Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Available Courses</h2>
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>Other courses available in our institute</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Sample available courses */}
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Advanced Electrical Systems</h3>
            <p className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>Advanced course covering complex electrical systems</p>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>₹25,000</span>
              <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--color-primary-10)', color: 'var(--color-primary)' }}>Available</span>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Solar Panel Installation</h3>
            <p className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>Complete solar panel installation and maintenance</p>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>₹20,000</span>
              <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--color-primary-10)', color: 'var(--color-primary)' }}>Available</span>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Industrial Automation</h3>
            <p className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>PLC programming and industrial automation</p>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>₹30,000</span>
              <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--color-warning)', color: 'white' }}>Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

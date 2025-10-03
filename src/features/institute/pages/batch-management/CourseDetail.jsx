import React, { useState } from 'react'
import { LuArrowLeft, LuEye } from 'react-icons/lu'
import Button from '../../../../shared/components/Button'
import { MatrixCard } from '../../../../shared/components/metricCard'
import CentralizedDataTable from '../../../../shared/components/CentralizedDataTable'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'
import BatchDetail from './BatchDetail'

export default function CourseDetail({ courseData, onBack, onViewBatch }) {
  const [currentView, setCurrentView] = useState('course') // 'course' or 'batch'
  const [selectedBatch, setSelectedBatch] = useState(null)

  if (!courseData) {
    return (
      <div className="p-2 bg-[#F6FAFF] min-h-screen">
        <div className="text-center text-gray-500">No course data available</div>
      </div>
    )
  }

  // Handle viewing a specific batch
  const handleViewBatch = (courseId, batchId) => {
    const batch = courseData.batches?.[batchId]
    if (batch) {
      setSelectedBatch({
        batch: batch,
        courseTitle: courseData.title,
        courseId: courseId,
        batchId: batchId
      })
      setCurrentView('batch')
    }
  }

  // Handle going back from batch detail to course detail
  const handleBackFromBatch = () => {
    setCurrentView('course')
    setSelectedBatch(null)
  }

  // Get status color for batch status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  // Configure table columns for batches
  const batchColumns = [
    {
      key: 'batchName',
      header: 'Batch Name'
    },
    {
      key: 'schedule',
      header: 'Time Schedule'
    },
    {
      key: 'totalStudents',
      header: 'Total Students'
    },
    {
      key: 'enrolledStudents',
      header: 'Enrolled Students'
    },
    {
      key: 'status',
      header: 'Status',
      render: (status) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
          {status}
        </span>
      )
    }
  ]

  // Configure table actions for batches
  const batchActions = [
    {
      label: 'View',
      icon: <LuEye className="w-4 h-4" />,
      onClick: (batch) => {
        console.log('View batch clicked:', batch)
        console.log('Course ID:', courseData.id)
        console.log('Batch ID:', batch.id)
        // Use the new handleViewBatch function
        handleViewBatch(courseData.id, batch.id)
      },
      variant: 'outline',
      size: 'sm'
    }
  ]

  // Transform batch data to include proper batch names and formatted data
  const batchData = courseData.batches?.map((batch, index) => {
    const batchName = `Batch ${String.fromCharCode(65 + index)}` // A, B, C, etc.
    const [enrolled, total] = batch.students ? batch.students.split('/').map(Number) : [0, 0]
    
    return {
      id: index,
      batchName: batchName,
      schedule: batch.time || '9:00 AM - 12:00 PM',
      totalStudents: total || 30,
      enrolledStudents: enrolled || 0,
      status: batch.status || 'Active',
      ...batch
    }
  }) || []

  // If viewing batch detail, render BatchDetail component
  if (currentView === 'batch' && selectedBatch) {
    return (
      <BatchDetail 
        batchData={selectedBatch} 
        onBack={handleBackFromBatch}
      />
    )
  }

  // Default course detail view
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
            Back
          </Button>
        </div>
        <MatrixCard 
          title={courseData.title} 
          subtitle={courseData.description}
          className="mb-4"
        />
      </div>

      {/* Course Information & Details Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Course Information & Details</h2>
          {/* Course Status - Right Corner */}
          <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
            Active
          </span>
        </div>
        
        {/* Basic Information Section */}
       
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Course Title */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-500">Course Title</h4>
              <p className="text-lg font-medium text-gray-900">{courseData.title}</p>
            </div>

            {/* Instructor */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-500">Instructor</h4>
              <p className="text-gray-900">{courseData.instructor}</p>
            </div>

            {/* Total Batches */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-500">Total Batches</h4>
              <p className="text-gray-900">{courseData.totalBatches}</p>
            </div>

            {/* Active Batches */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-500">Active Batches</h4>
              <p className="text-gray-900">{courseData.activeBatches}</p>
            </div>

            {/* Course Fee */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-500">Course Fee</h4>
              <p className="text-1xl font-medium text-green-600">₹15,000</p>
            </div>
          </div>

        {/* Course Details Section */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Course Duration */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-500">Course Duration</h4>
              <p className="text-gray-900">3 Months</p>
            </div>

            {/* Course Type */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-500">Course Type</h4>
              <p className="text-gray-900">Practical Training</p>
            </div>

            {/* Certification */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-500">Certification</h4>
              <p className="text-gray-900">Industry recognized certificate</p>
            </div>

            {/* Language */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-500">Language</h4>
              <p className="text-gray-900">English</p>
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-500">Start Date</h4>
              <p className="text-gray-900">January 15, 2024</p>
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-500">End Date</h4>
              <p className="text-gray-900">April 15, 2024</p>
            </div>
          </div>
        

        {/* Course Description Section */}
        <div className="pt-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Course Description</h3>
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="text-md font-semibold mb-3 text-gray-900">Overview</h4>
            <p className="text-gray-700 leading-relaxed">
              Comprehensive electrical wiring training covering all aspects of electrical systems, safety protocols, 
              and practical applications in residential and commercial settings. This course provides hands-on 
              experience with modern electrical tools and techniques, ensuring students gain real-world skills 
              that are immediately applicable in the field.
            </p>
          </div>
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
              {batchData.reduce((total, batch) => total + batch.enrolledStudents, 0)}
            </div>
            <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Enrolled Students</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: 'var(--color-info)' }}>
              {batchData.reduce((total, batch) => total + batch.totalStudents, 0)}
            </div>
            <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Max Capacity</div>
          </div>
        </div>
      </div>

    
      {/* Batches Table Section */}
      <div className="mb-6">
        <CentralizedDataTable
          title="Course Batches"
          subtitle={`Manage and view all batches for ${courseData.title}`}
          data={batchData}
          columns={batchColumns}
          actions={batchActions}
          searchable={true}
          selectable={false}
          showAutoScrollToggle={false}
          searchPlaceholder="Search batches..."
          emptyStateMessage="No batches found for this course"
        />
      </div>


      {/* Available Courses Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Available Courses</h2>
        <p className="text-sm mb-6 text-gray-600">Other courses available in our institute</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Advanced Electrical Systems */}
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">Available</span>
            </div>
            <h3 className="font-semibold mb-2 text-gray-900">Advanced Electrical Systems</h3>
            <p className="text-sm mb-4 text-gray-600 leading-relaxed">Advanced course covering complex electrical systems and industrial applications</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-blue-600">₹25,000</span>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View Details →</button>
            </div>
          </div>

          {/* Solar Panel Installation */}
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-green-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Available</span>
            </div>
            <h3 className="font-semibold mb-2 text-gray-900">Solar Panel Installation</h3>
            <p className="text-sm mb-4 text-gray-600 leading-relaxed">Complete solar panel installation, maintenance, and troubleshooting</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-green-600">₹20,000</span>
              <button className="text-green-600 hover:text-green-800 text-sm font-medium">View Details →</button>
            </div>
          </div>

          {/* Industrial Automation */}
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-orange-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full">Coming Soon</span>
            </div>
            <h3 className="font-semibold mb-2 text-gray-900">Industrial Automation</h3>
            <p className="text-sm mb-4 text-gray-600 leading-relaxed">PLC programming, HMI design, and industrial automation systems</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-orange-600">₹30,000</span>
              <button className="text-orange-600 hover:text-orange-800 text-sm font-medium">Notify Me →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LuPlus, LuEye } from 'react-icons/lu'
import Button from '../../../../shared/components/Button'
import DynamicButton from '../../../../shared/components/DynamicButton'
import { MatrixCard } from '../../../../shared/components/metricCard'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'
import BatchDetail from './BatchDetail'
import CourseDetail from './CourseDetail'
import CreateBatchModal from './CreateBatchModal'

export default function BatchManagement() {
  const navigate = useNavigate()
  const [selectedBatch, setSelectedBatch] = useState(null)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedCourseForBatch, setSelectedCourseForBatch] = useState(null)

  // Sample course data - in real app, this would come from API
  const courses = [
    {
      id: 1,
      title: "Fundamentals of Electricity",
      instructor: "Rajendra Prashad",
      totalBatches: 5,
      activeBatches: 3,
      batches: [
        {
          time: "9:00 AM - 12:00 PM",
          students: "25/30",
          status: "Active"
        },
        {
          time: "2:00 PM - 5:00 PM",
          students: "18/30",
          status: "Active"
        },
        {
          time: "6:00 PM - 9:00 PM",
          students: "22/30",
          status: "Active"
        }
      ]
    },
    {
      id: 2,
      title: "Wiring & Circuit Installation",
      instructor: "Priya Sharma",
      totalBatches: 4,
      activeBatches: 2,
      batches: [
        {
          time: "10:00 AM - 1:00 PM",
          students: "20/25",
          status: "Active"
        },
        {
          time: "3:00 PM - 6:00 PM",
          students: "15/25",
          status: "Upcoming"
        }
      ]
    },
    {
      id: 3,
      title: "Transformer Installation",
      instructor: "Rajendra Prashad",
      totalBatches: 4,
      activeBatches: 1,
      batches: []
    },
    {
      id: 4,
      title: "Power Distribution Systems",
      instructor: "Nitin Soni",
      totalBatches: 4,
      activeBatches: 3,
      batches: []
    },
    {
      id: 5,
      title: "Motor Winding Techniques",
      instructor: "Rajendra Prashad",
      totalBatches: 4,
      activeBatches: 1,
      batches: []
    },
    {
      id: 6,
      title: "House & Industrial Wiring",
      instructor: "Neha Rajput",
      totalBatches: 4,
      activeBatches: 2,
      batches: []
    }
  ]

  const handleViewCourse = (courseId) => {
    console.log('View Course clicked for course:', courseId)
    // Find the course and set it as selected
    const course = courses.find(c => c.id === courseId)
    if (course) {
      setSelectedCourse(course)
    }
  }

  const handleViewBatch = (courseId, batchId) => {
    console.log('View Batch clicked for course:', courseId, 'batch:', batchId)
    const course = courses.find(c => c.id === courseId)
    console.log('Found course:', course)
    if (course && course.batches[batchId]) {
      const batchData = {
        courseId: courseId,
        courseTitle: course.title,
        batch: course.batches[batchId]
      }
      console.log('Setting selected batch:', batchData)
      setSelectedBatch(batchData)
    } else {
      console.log('Course or batch not found')
    }
  }

  const handleAddBatch = (courseId) => {
    console.log('Add Batch clicked for course:', courseId)
    const course = courses.find(c => c.id === courseId)
    setSelectedCourseForBatch({
      id: courseId,
      title: course?.title || 'Unknown Course'
    })
    setIsCreateModalOpen(true)
  }

  const handleBackToBatches = () => {
    setSelectedBatch(null)
  }

  const handleBackToCourses = () => {
    setSelectedCourse(null)
  }

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false)
    setSelectedCourseForBatch(null)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return `${TAILWIND_COLORS.BADGE_SUCCESS}`
      case 'Upcoming':
        return `${TAILWIND_COLORS.BADGE_INFO}`
      default:
        return `${TAILWIND_COLORS.BADGE_WARN}`
    }
  }

  // If a course is selected, show the course detail view
  if (selectedCourse) {
    return <CourseDetail courseData={selectedCourse} onBack={handleBackToCourses} onViewBatch={handleViewBatch} />
  }

  // If a batch is selected, show the batch detail view
  if (selectedBatch) {
    return <BatchDetail batchData={selectedBatch} onBack={handleBackToBatches} />
  }

  return (
    <div className={`p-2 ${TAILWIND_COLORS.BG_PRIMARY} min-h-screen`}>
      {/* Header Section */}
      <div className="mb-6">
        <MatrixCard 
          title="Batch Management" 
          subtitle="Manage your course batches, view student enrollments, and track batch performance"
          className="mb-4"
        />
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {courses.map((course) => (
          <div key={course.id} className={`${TAILWIND_COLORS.CARD} p-5 hover:shadow-md transition-shadow`}>
            {/* Course Title */}
            <h3 className={`text-lg font-bold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-3 leading-tight`}>{course.title}</h3>
     
            {/* Instructor */}
            <p className={`${TAILWIND_COLORS.TEXT_PRIMARY} text-sm mb-4`}>
              <span className="font-semibold">Instructor:</span> {course.instructor}
            </p>
            
            {/* Batch Summary */}
            <div className="flex gap-3 mb-4">
              <div className={`${TAILWIND_COLORS.BADGE_INFO} px-3 py-2 rounded-md flex-1`}>
                <div className={`${TAILWIND_COLORS.TEXT_PRIMARY} font-bold text-xl`}>{course.totalBatches}</div>
                <div className={`${TAILWIND_COLORS.TEXT_PRIMARY} text-xs font-medium`}>Total Batches</div>
              </div>
              <div className={`${TAILWIND_COLORS.BADGE_SUCCESS} px-3 py-2 rounded-md flex-1`}>
                <div className={`${TAILWIND_COLORS.TEXT_PRIMARY} font-bold text-xl`}>{course.activeBatches}</div>
                <div className={`${TAILWIND_COLORS.TEXT_PRIMARY} text-xs font-medium`}>Active Batches</div>
              </div>
            </div>
           
            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button 
                onClick={() => handleViewCourse(course.id)}
                variant="outline"
                size="sm"
                fullWidth
                icon={<LuEye className="w-4 h-4" />}
                className={`${TAILWIND_COLORS.BTN_LIGHT}`}
              >
                View Course
              </Button>
              <Button 
                onClick={() => handleAddBatch(course.id)}
                variant="primary"
                size="sm"
                fullWidth
                icon={<LuPlus className="w-4 h-4" />}
                className={`${TAILWIND_COLORS.BTN_SECONDARY}`}
              >
                Add Batch
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className={`flex items-center justify-between ${TAILWIND_COLORS.CARD} p-4`}>
        <div className={`${TAILWIND_COLORS.TEXT_MUTED} text-sm font-medium`}>
          Showing 6 from 160 data
        </div>
        <div className="flex items-center space-x-1">
          <Button 
            variant="neutral"
            size="sm"
            className={`px-3 py-1 ${TAILWIND_COLORS.BTN_LIGHT}`}
          >
            &lt;&lt; Previous
          </Button>
          <Button 
            variant="primary"
            size="sm"
            className={`px-3 py-1 ${TAILWIND_COLORS.BTN_PRIMARY}`}
          >
            1
          </Button>
          <Button 
            variant="neutral"
            size="sm"
            className={`px-3 py-1 ${TAILWIND_COLORS.BTN_LIGHT}`}
          >
            2
          </Button>
          <Button 
            variant="neutral"
            size="sm"
            className={`px-3 py-1 ${TAILWIND_COLORS.BTN_LIGHT}`}
          >
            3
          </Button>
          <Button 
            variant="neutral"
            size="sm"
            className={`px-3 py-1 ${TAILWIND_COLORS.BTN_LIGHT}`}
          >
            4
          </Button>
          <Button 
            variant="neutral"
            size="sm"
            className={`px-3 py-1 ${TAILWIND_COLORS.BTN_LIGHT}`}
          >
            Next &gt;&gt;
          </Button>
        </div>
      </div>

      {/* Create Batch Modal */}
      <CreateBatchModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        courseId={selectedCourseForBatch?.id}
        courseTitle={selectedCourseForBatch?.title}
      />
    </div>
  )
}

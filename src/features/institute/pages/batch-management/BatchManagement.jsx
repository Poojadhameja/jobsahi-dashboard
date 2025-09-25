import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LuPlus, LuEye } from 'react-icons/lu'
import Button from '../../../../shared/components/Button'
import DynamicButton from '../../../../shared/components/DynamicButton'
import { MatrixCard } from '../../../../shared/components/metricCard'
import BatchDetail from './BatchDetail'
import CreateBatchModal from './CreateBatchModal'

export default function BatchManagement() {
  const navigate = useNavigate()
  const [selectedBatch, setSelectedBatch] = useState(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedCourseForBatch, setSelectedCourseForBatch] = useState(null)

  // Sample course data - in real app, this would come from API
  const courses = [
    {
      id: 1,
      title: "Fundamentals of Electricity",
      description: "Learn the basics of electric current, resistance, and power with real-world applications.",
      instructor: "Rajendra Prashad",
      totalBatches: 4,
      activeBatches: 1,
      batches: [
        { name: "Batch A", time: "9:00 AM - 12:00 PM", students: "25/30", status: "Active" },
        { name: "Batch B", time: "9:00 AM - 12:00 PM", students: "25/30", status: "Upcoming" },
        { name: "Batch C", time: "9:00 AM - 12:00 PM", students: "25/30", status: "Upcoming" }
      ]
    },
    {
      id: 2,
      title: "Wiring & Circuit Installation",
      description: "Hands-on training in residential and commercial wiring setups, switches, and load circuits.",
      instructor: "Priya Sharma",
      totalBatches: 3,
      activeBatches: 3,
      batches: [
        { name: "Batch A", time: "9:00 AM - 12:00 PM", students: "25/30", status: "Active" },
        { name: "Batch B", time: "9:00 AM - 12:00 PM", students: "25/30", status: "Active" },
        { name: "Batch C", time: "9:00 AM - 12:00 PM", students: "24/30", status: "Active" }
      ]
    },
    {
      id: 3,
      title: "Transformer Installation",
      description: "Installation, earthing, oil testing, and safety protocols for transformer setup.",
      instructor: "Rajendra Prashad",
      totalBatches: 5,
      activeBatches: 1,
      batches: [
        { name: "Batch A", time: "9:00 AM - 12:00 PM", students: "25/30", status: "Active" },
        { name: "Batch B", time: "9:00 AM - 12:00 PM", students: "25/30", status: "Upcoming" },
        { name: "Batch C", time: "9:00 AM - 12:00 PM", students: "25/30", status: "Upcoming" }
      ]
    },
    {
      id: 4,
      title: "Power Distribution Systems",
      description: "Grid-level energy distribution, substation concepts, and load management.",
      instructor: "Nitin Soni",
      totalBatches: 4,
      activeBatches: 1,
      batches: [
        { name: "Batch A", time: "9:00 AM - 12:00 PM", students: "25/30", status: "Active" },
        { name: "Batch B", time: "9:00 AM - 12:00 PM", students: "25/30", status: "Upcoming" },
        { name: "Batch C", time: "9:00 AM - 12:00 PM", students: "25/30", status: "Upcoming" }
      ]
    },
    {
      id: 5,
      title: "Motor Winding Techniques",
      description: "Complete web development course covering frontend and backend technologies",
      instructor: "Rajendra Prashad",
      totalBatches: 4,
      activeBatches: 2,
      batches: [
        { name: "Batch A", time: "9:00 AM - 12:00 PM", students: "25/30", status: "Active" },
        { name: "Batch B", time: "9:00 AM - 12:00 PM", students: "25/30", status: "Active" },
        { name: "Batch C", time: "9:00 AM - 12:00 PM", students: "25/30", status: "Upcoming" }
      ]
    },
    {
      id: 6,
      title: "House & Industrial Wiring",
      description: "Dual-focus course on domestic wiring layouts and large-scale industrial installations.",
      instructor: "Neha Rajput",
      totalBatches: 3,
      activeBatches: 1,
      batches: [
        { name: "Batch A", time: "9:00 AM - 12:00 PM", students: "25/30", status: "Active" },
        { name: "Batch B", time: "9:00 AM - 12:00 PM", students: "25/30", status: "Upcoming" },
        { name: "Batch C", time: "9:00 AM - 12:00 PM", students: "25/30", status: "Upcoming" }
      ]
    }
  ]

  const handleViewCourse = (courseId) => {
    console.log('View Course clicked for course:', courseId)
    // Find the course and set the first batch as selected
    const course = courses.find(c => c.id === courseId)
    if (course && course.batches.length > 0) {
      setSelectedBatch({
        courseId: courseId,
        courseTitle: course.title,
        batch: course.batches[0] // Show first batch by default
      })
    }
  }

  const handleViewBatch = (courseId, batchIndex) => {
    console.log('View Batch clicked for course:', courseId, 'batch:', batchIndex)
    const course = courses.find(c => c.id === courseId)
    if (course && course.batches[batchIndex]) {
      setSelectedBatch({
        courseId: courseId,
        courseTitle: course.title,
        batch: course.batches[batchIndex]
      })
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

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false)
    setSelectedCourseForBatch(null)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // If a batch is selected, show the batch detail view
  if (selectedBatch) {
    return <BatchDetail batchData={selectedBatch} onBack={handleBackToBatches} />
  }

  return (
    <div className="p-2 bg-[#F6FAFF] min-h-screen">
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
          <div key={course.id} className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
            {/* Course Title */}
            <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">{course.title}</h3>
            
            {/* Course Description */}
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">{course.description}</p>
            
            {/* Instructor */}
            <p className="text-gray-700 text-sm mb-4">
              <span className="font-semibold">Instructor:</span> {course.instructor}
            </p>
            
            {/* Batch Summary */}
            <div className="flex gap-3 mb-4">
              <div className="bg-blue-50 px-3 py-2 rounded-md flex-1">
                <div className="text-blue-600 font-bold text-xl">{course.totalBatches}</div>
                <div className="text-blue-600 text-xs font-medium">Total Batches</div>
              </div>
              <div className="bg-green-50 px-3 py-2 rounded-md flex-1">
                <div className="text-green-600 font-bold text-xl">{course.activeBatches}</div>
                <div className="text-green-600 text-xs font-medium">Active Batches</div>
              </div>
            </div>
            
            {/* Batches Section */}
            <div className="mb-5">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Batches ({course.batches.length})</h4>
              <div className="max-h-36 overflow-y-auto space-y-3 pr-2">
                {course.batches.map((batch, index) => (
                  <div key={index} className="flex items-start justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-sm mb-1">{batch.name}</div>
                      <div className="text-gray-600 text-xs mb-1">{batch.time}</div>
                      <div className="text-gray-600 text-xs">{batch.students} students</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(batch.status)}`}>
                        {batch.status}
                      </span>
                      <Button 
                        onClick={() => handleViewBatch(course.id, index)}
                        variant="outline"
                        size="sm"
                        icon={<LuEye className="w-3 h-3" />}
                        className="px-2 py-1 text-xs border-blue-600 text-blue-600 hover:bg-blue-50"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
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
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                View Course
              </Button>
              <Button 
                onClick={() => handleAddBatch(course.id)}
                variant="primary"
                size="sm"
                fullWidth
                icon={<LuPlus className="w-4 h-4" />}
                className="bg-green-600 hover:bg-green-700"
              >
                Add Batch
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="text-gray-600 text-sm font-medium">
          Showing 6 from 160 data
        </div>
        <div className="flex items-center space-x-1">
          <Button 
            variant="neutral"
            size="sm"
            className="px-3 py-1 text-gray-600 hover:text-gray-800"
          >
            &lt;&lt; Previous
          </Button>
          <Button 
            variant="primary"
            size="sm"
            className="px-3 py-1 bg-blue-600 text-white"
          >
            1
          </Button>
          <Button 
            variant="neutral"
            size="sm"
            className="px-3 py-1 text-gray-600 hover:text-gray-800"
          >
            2
          </Button>
          <Button 
            variant="neutral"
            size="sm"
            className="px-3 py-1 text-gray-600 hover:text-gray-800"
          >
            3
          </Button>
          <Button 
            variant="neutral"
            size="sm"
            className="px-3 py-1 text-gray-600 hover:text-gray-800"
          >
            4
          </Button>
          <Button 
            variant="neutral"
            size="sm"
            className="px-3 py-1 text-gray-600 hover:text-gray-800"
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

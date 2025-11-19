import React, { useState, useEffect, useCallback } from 'react'
import { TAILWIND_COLORS } from '../../../../../shared/WebConstant'
import Button from '../../../../../shared/components/Button'
import { getMethod } from '../../../../../service/api'
import apiService from '../../../../admin/services/serviceUrl'

// Course List Table Component
function CourseListTable({ courseData, onViewCourse, loading }) {

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Course List</h3>
        <div className="flex items-center justify-center py-8">
          <p className={`${TAILWIND_COLORS.TEXT_MUTED}`}>Loading courses...</p>
        </div>
      </div>
    )
  }

  if (!courseData || courseData.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Course List</h3>
        <div className="flex items-center justify-center py-8">
          <p className={`${TAILWIND_COLORS.TEXT_MUTED}`}>No courses available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm h-full flex flex-col">
      <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Course List</h3>
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto overflow-x-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-white z-10">
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
                  <td className={`py-3 px-4 ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{course.course_name || course.courseName || 'N/A'}</td>
                  <td className={`py-3 px-4 ${TAILWIND_COLORS.TEXT_MUTED}`}>{course.category || 'N/A'}</td>
                  <td className={`py-3 px-4 ${TAILWIND_COLORS.TEXT_MUTED}`}>{course.enrolled || '0'}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      (course.certificate === 'Active' || course.certificate === 'active') 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {course.certificate || 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Button 
                      variant="light" 
                      size="sm"
                      onClick={() => onViewCourse(course)}
                    >
                      {course.status || 'View'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Enrollment Trends Chart Component
function EnrollmentTrendsChart({ enrollmentTrends, loading }) {
  // All months array
  const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Create a map of month to value from API data
  const trendsMap = {};
  if (enrollmentTrends && Array.isArray(enrollmentTrends)) {
    enrollmentTrends.forEach(trend => {
      const month = (trend.month || trend.Month || '').trim();
      if (month) {
        // Match month name (case insensitive, partial match)
        const matchedMonth = allMonths.find(m => 
          m.toLowerCase() === month.toLowerCase() || 
          month.toLowerCase().startsWith(m.toLowerCase())
        );
        if (matchedMonth) {
          trendsMap[matchedMonth] = parseInt(trend.value) || 0;
        }
      }
    });
  }

  // Calculate max value for scaling (only from months with data)
  const valuesWithData = Object.values(trendsMap).filter(v => v > 0);
  const maxValue = valuesWithData.length > 0 
    ? Math.max(...valuesWithData)
    : 100;

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm h-full flex flex-col">
        <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Enrollment Trends</h3>
        <div className="flex items-center justify-center py-8 flex-1">
          <p className={`${TAILWIND_COLORS.TEXT_MUTED}`}>Loading trends...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Enrollment Trends</h3>
        <select className="px-3 py-1 border border-gray-300 rounded text-sm">
          <option>By Date</option>
        </select>
      </div>
      
      {/* Bar Chart with All Months */}
      <div className="flex-1 min-h-0">
        <div className="h-full flex items-end justify-between px-2 gap-1">
          {allMonths.map((month, index) => {
            const value = trendsMap[month] || 0;
            const hasData = value > 0;
            // Calculate height with minimum 4px for visibility
            const height = hasData && maxValue > 0 
              ? Math.max((value / maxValue) * 60, 4) 
              : 0;
            
            return (
              <div key={index} className="flex flex-col items-center flex-1 min-w-0">
                <div className="w-full flex flex-col items-center h-full justify-end">
                  {hasData ? (
                    <>
                      <div 
                        className="w-full bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600 cursor-pointer" 
                        style={{ 
                          height: `${height}px`, 
                          minHeight: '4px',
                          maxHeight: '60px'
                        }}
                        title={`${month}: ${value} enrollments`}
                      ></div>
                      <span className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mt-2 truncate w-full text-center`}>
                        {month}
                      </span>
                      <span className={`text-xs font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mt-1`}>
                        {value}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-full" style={{ height: '0px' }}></div>
                      <span className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mt-2 truncate w-full text-center opacity-50`}>
                        {month}
                      </span>
                      <span className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mt-1 opacity-50`}>
                        -
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
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

  const courseName = course.course_name || course.courseName || 'N/A'
  const category = course.category || 'N/A'
  const enrolled = course.enrolled || '0'
  const certificate = course.certificate || 'Inactive'
  const enrolledNum = parseInt(enrolled) || 0
  const description = course.description || course.course_description || ''

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
              {courseName}
            </h3>
            <div className="flex items-center gap-4 mt-3">
              <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                (certificate === 'Active' || certificate === 'active') 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {certificate}
              </span>
              <span className={`px-3 py-1 text-sm rounded-full font-medium bg-blue-100 text-blue-800`}>
                {category}
              </span>
            </div>
          </div>

          {/* Course Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>Category</h4>
              <p className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{category}</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>Total Enrolled</h4>
              <p className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{enrolled} Students</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>Certificate Status</h4>
              <p className={`text-lg font-semibold ${
                (certificate === 'Active' || certificate === 'active') ? 'text-green-600' : 'text-red-600'
              }`}>
                {certificate}
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
            {description ? (
              <p className={`${TAILWIND_COLORS.TEXT_MUTED} leading-relaxed whitespace-pre-wrap`}>
                {description}
              </p>
            ) : (
              <p className={`${TAILWIND_COLORS.TEXT_MUTED} leading-relaxed`}>
                This course provides comprehensive training in {category.toLowerCase()}. 
                Students will gain practical skills and knowledge through hands-on learning experiences. 
                Upon successful completion, students will receive a certificate recognizing their achievement.
              </p>
            )}
          </div>

          {/* Enrollment Statistics */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>
              Enrollment Statistics
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{enrolled}</p>
                <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>Total Students</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">
                  {Math.floor(enrolledNum * 0.85)}
                </p>
                <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>Completed</p>
              </div>
              {/* <div className="text-center">
                <p className="text-3xl font-bold text-orange-600">
                  {Math.floor(enrolledNum * 0.15)}
                </p>
                <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>In Progress</p>
              </div> */}
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
  const [courseData, setCourseData] = useState([])
  const [enrollmentTrends, setEnrollmentTrends] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch data from API
  const fetchCourseData = useCallback(async () => {
    try {
      setLoading(true)
      const response = await getMethod({ 
        apiUrl: apiService.adminInstituteManagement 
      })

      console.log('📊 Course Monitoring API Response:', response)

      // Check if response is successful (handle both boolean and string status)
      const isSuccess = response?.status === true || response?.status === 'success' || response?.success === true
      
      if (isSuccess && response) {
        // Extract course list from API response - check multiple possible paths
        const courseList = response.data?.course_enrollment?.course_list || 
                          response.course_enrollment?.course_list || 
                          response.data?.course_list ||
                          []
        console.log('📚 Course List:', courseList)
        setCourseData(courseList)

        // Extract enrollment trends from API response - check ALL possible paths
        let trends = null
        
        // Try different response structures
        if (response.data?.enrollment_trends) {
          trends = response.data.enrollment_trends
        } else if (response.enrollment_trends) {
          trends = response.enrollment_trends
        } else if (response.data?.data?.enrollment_trends) {
          trends = response.data.data.enrollment_trends
        } else if (Array.isArray(response.data) && response.data.length > 0 && response.data[0].enrollment_trends) {
          trends = response.data[0].enrollment_trends
        } else {
          // Last resort: search in the entire response object
          const searchForTrends = (obj) => {
            if (Array.isArray(obj)) {
              return obj.find(item => Array.isArray(item) && item.length > 0 && item[0]?.month) || null
            }
            if (obj && typeof obj === 'object') {
              if (obj.enrollment_trends && Array.isArray(obj.enrollment_trends)) {
                return obj.enrollment_trends
              }
              for (const key in obj) {
                const result = searchForTrends(obj[key])
                if (result) return result
              }
            }
            return null
          }
          trends = searchForTrends(response) || []
        }
        
        console.log('📈 Enrollment Trends Extracted:', trends)
        console.log('📈 Trends Length:', trends?.length)
        console.log('📈 Is Array:', Array.isArray(trends))
        
        // Ensure trends is an array and has data
        if (Array.isArray(trends) && trends.length > 0) {
          // Validate trend structure (should have month and value)
          const validTrends = trends.filter(t => t && (t.month || t.value))
          if (validTrends.length > 0) {
            console.log('✅ Setting enrollment trends:', validTrends)
            setEnrollmentTrends(validTrends)
          } else {
            console.warn('⚠️ Trends array is empty or invalid structure')
            setEnrollmentTrends([])
          }
        } else {
          console.warn('⚠️ No enrollment trends found in response')
          console.warn('⚠️ Response structure:', {
            hasData: !!response.data,
            dataKeys: response.data ? Object.keys(response.data) : [],
            responseKeys: Object.keys(response || {})
          })
          setEnrollmentTrends([])
        }
      } else {
        console.error('❌ Failed to fetch course data:', response?.message || 'Unknown error')
        setCourseData([])
        setEnrollmentTrends([])
      }
    } catch (error) {
      console.error('❌ Error fetching course data:', error)
      setCourseData([])
      setEnrollmentTrends([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCourseData()
  }, [fetchCourseData])

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ minHeight: '100px' }}>
        {/* Course List */}
        <div className="h-full">
          <CourseListTable 
            courseData={courseData} 
            onViewCourse={handleViewCourse}
            loading={loading}
          />
        </div>
        
        {/* Enrollment Trends */}
        <div className="h-full">
          <EnrollmentTrendsChart 
            enrollmentTrends={enrollmentTrends}
            loading={loading}
          />
        </div>
        
        {/* Enrollment Issue */}
        {/* <EnrollmentIssueTable /> */}
        
        {/* Certificate Issuance Status */}
        {/* <CertificateIssuanceChart /> */}
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

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  LuBookOpen, 
  LuUsers, 
  LuMessageSquare, 
  LuFileText, 
  LuActivity, 
  LuSettings,
  LuStar,
  LuClock,
  // LuBarChart,
  LuBell,
  LuPlus,
  LuTrophy,
  LuTrendingUp
} from 'react-icons/lu'
import { Horizontal4Cards } from '../../../shared/components/metricCard'
import ProgressChart from '../../../shared/components/charts/ProgressChart'
import { TAILWIND_COLORS } from '../../../shared/WebConstant'

export default function Dashboard() {
  const navigate = useNavigate()

  const handleCourseManagement = () => {
    navigate('/institute/course-management')
  }

  const handleStudentManagement = () => {
    navigate('/institute/student-management')
  }

  const handleMessagingAlerts = () => {
    navigate('/institute/messaging-alerts')
  }

  const handleCertificatesCompletion = () => {
    navigate('/institute/certificates-completion')
  }

  const handleReportsAnalytics = () => {
    navigate('/institute/reports-analytics')
  }

  const handleProfileSetting = () => {
    navigate('/institute/profile-setting')
  }

  const handleAddNewCourse = () => {
    navigate('/institute/course-management')
  }

  const handleGenerateReports = () => {
    navigate('/institute/reports-analytics')
  }

  const handleViewStudents = () => {
    navigate('/institute/student-management')
  }

  const handleSendNotification = () => {
    navigate('/institute/messaging-alerts')
  }

  // Key metrics data for Horizontal4Cards
  const keyMetrics = [
    {
      title: 'Total Courses',
      value: '24',
      delta: '+2 from last month',
      icon: <LuBookOpen className="w-5 h-5" />
    },
    {
      title: 'Enrolled Students',
      value: '1,234',
      delta: '+15% from last month',
      icon: <LuUsers className="w-5 h-5" />
    },
    {
      title: 'Certified Students',
      value: '850',
      delta: '+8% from last month',
      icon: <LuTrophy className="w-5 h-5" />
    },
    {
      title: 'Placement Rate',
      value: '78%',
      delta: '+5% from last month',
      icon: <LuTrendingUp className="w-5 h-5" />
    }
  ]

  // Recent activities data
  const recentActivities = [
    {
      id: 1,
      text: 'New student enrolled in Welder course',
      time: '2 minutes ago',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      text: 'Certificate generated for Priya Sharma',
      time: '1 hour ago',
      color: 'bg-green-500'
    },
    {
      id: 3,
      text: 'Welder course curriculum updated',
      time: '3 hours ago',
      color: 'bg-purple-500'
    },
    {
      id: 4,
      text: 'Monthly report generated successfully',
      time: '1 day ago',
      color: 'bg-orange-500'
    }
  ]

  return (
    <div className={`p-2 ${TAILWIND_COLORS.BG_PRIMARY} min-h-screen`}>
      {/* Key Metrics Section - Using Horizontal4Cards */}
      <div className="mb-5">
        <Horizontal4Cards data={keyMetrics} />
      </div>

      {/* Greeting Section */}
      <div className="mb-5">
        <h1 className={`text-2xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Hi! Brightorial</h1>
      </div>

      {/* Quick Actions and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {/* Quick Actions Card */}
        <div className={`${TAILWIND_COLORS.CARD} p-5`}>
          <div className="flex items-center mb-4">
            <LuStar className="w-6 h-6 text-yellow-500 mr-2" />
            <h2 className={`text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Quick Actions</h2>
          </div>
          <p className={`${TAILWIND_COLORS.TEXT_MUTED} mb-5`}>Frequently used actions for quick access.</p>
          
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={handleAddNewCourse}
              className={`${TAILWIND_COLORS.BTN_PRIMARY} p-4 rounded-lg transition-colors flex items-center justify-center`}
            >
              <LuPlus className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Add New Course</span>
            </button>
            
            <button 
              onClick={handleGenerateReports}
              className={`${TAILWIND_COLORS.BTN_SECONDARY} p-4 rounded-lg transition-colors flex items-center justify-center`}
            >
              {/* <LuBarChart className="w-5 h-5 mr-2" /> */}
              <span className="text-sm font-medium">Generate Reports</span>
            </button>
            
            <button 
              onClick={handleViewStudents}
              className={`${TAILWIND_COLORS.BTN_PRIMARY} p-4 rounded-lg transition-colors flex items-center justify-center`}
            >
              <LuUsers className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">View Students</span>
            </button>
            
            <button 
              onClick={handleSendNotification}
              className={`${TAILWIND_COLORS.BTN_SECONDARY} p-4 rounded-lg transition-colors flex items-center justify-center`}
            >
              <LuBell className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Send Notification</span>
            </button>
          </div>
        </div>

        {/* Recent Activities Card */}
        <div className={`${TAILWIND_COLORS.CARD} p-5`}>
          <div className="flex items-center mb-5">
            <LuClock className="w-6 h-6 text-blue-500 mr-2" />
            <h2 className={`text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Recent Activities</h2>
          </div>
          <p className={`${TAILWIND_COLORS.TEXT_MUTED} mb-5`}>Latest updates and activities in your institute.</p>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-3 h-3 rounded-full ${activity.color} mt-2 flex-shrink-0`}></div>
                <div className="flex-1">
                  <p className={`${TAILWIND_COLORS.TEXT_PRIMARY} text-sm`}>{activity.text}</p>
                  <p className={`${TAILWIND_COLORS.TEXT_MUTED} text-xs`}>{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className={`${TAILWIND_COLORS.CARD} p-6`}>
        <div className="flex items-center mb-5">
          <h2 className={`text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Performance Overview</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Course Completion Rate */}
          <ProgressChart 
            percentage={85}
            label="Course Completion Rate"
            color="#10B981"
            size={120}
          />

          {/* Student Satisfaction */}
          <ProgressChart 
            percentage={85}
            label="Student Satisfaction"
            color="#3B82F6"
            size={120}
          />

          {/* Placement Success */}
          <ProgressChart 
            percentage={85}
            label="Placement Success"
            color="#8B5CF6"
            size={120}
          />
        </div>
      </div>
    </div>
  )
}

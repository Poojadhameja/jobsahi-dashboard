// import React from 'react'
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
    navigate('/institute/course-management/create')
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

  const courseStatistics = [
    {
      id: 1,
      course: 'Electrician',
      value: 82
    },
    {
      id: 2,
      course: 'Fitter',
      value: 58
    },
    {
      id: 3,
      course: 'Welder',
      value: 44
    },
    {
      id: 4,
      course: 'Mechanic Diesel',
      value: 36
    },
    {
      id: 5,
      course: 'COPA',
      value: 18
    }
  ]

  const staffMembers = [
    {
      id: 1,
      name: 'Amit Verma',
      designation: 'Head Instructor',
      department: 'Welding',
      lastActive: '10 min ago'
    },
    {
      id: 2,
      name: 'Riya Singh',
      designation: 'Placement Officer',
      department: 'Career Services',
      lastActive: '25 min ago'
    },
    {
      id: 3,
      name: 'Manish Kumar',
      designation: 'Course Coordinator',
      department: 'Automobile',
      lastActive: 'Today, 9:15 AM'
    },
    {
      id: 4,
      name: 'Neha Patel',
      designation: 'Student Counselor',
      department: 'Student Support',
      lastActive: '5 min ago'
    }
  ]

  return (
    <div className={`p-2 bg-[#F6FAFF] min-h-screen ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <div className="flex items-center mb-4">
            <LuStar className="w-6 h-6 text-yellow-500 mr-2" />
            <h2 className={`text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Quick Actions</h2>
          </div>
          <p className={`${TAILWIND_COLORS.TEXT_MUTED} mb-5`}>Frequently used actions for quick access.</p>
          
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={handleAddNewCourse}
              className={`bg-[#3B82F6] ${TAILWIND_COLORS.TEXT_INVERSE} p-4 rounded-lg hover:bg-[#276edf] transition-colors flex items-center justify-center`}
            >
              <LuPlus className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Add New Course</span>
            </button>
            
            <button 
              onClick={handleGenerateReports}
              className={`bg-[#A855F7] ${TAILWIND_COLORS.TEXT_INVERSE} p-4 rounded-lg hover:bg-[#9421ff] transition-colors flex items-center justify-center`}
            >
              {/* <LuBarChart className="w-5 h-5 mr-2" /> */}
              <span className="text-sm font-medium">Generate Reports</span>
            </button>
            
            <button 
              onClick={handleViewStudents}
              className={`bg-[#22C55E] ${TAILWIND_COLORS.TEXT_INVERSE} p-4 rounded-lg hover:bg-[#2bae5b] transition-colors flex items-center justify-center`}
            >
              <LuUsers className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">View Students</span>
            </button>
            
            <button 
              onClick={handleSendNotification}
              className={`bg-[#F97316] ${TAILWIND_COLORS.TEXT_INVERSE} p-4 rounded-lg hover:bg-[#d56d23] transition-colors flex items-center justify-center`}
            >
              <LuBell className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Send Notification</span>
            </button>
          </div>
        </div>

        {/* Recent Activities Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
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

      {/* Course Statistics & Staff Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {/* Course Statistics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <h2 className={`text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-6`}>Course Statistics</h2>

          <div className="space-y-4">
            {courseStatistics.map((stat) => (
              <div
                key={stat.id}
                className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className={`${TAILWIND_COLORS.TEXT_PRIMARY} text-lg font-semibold`}>{stat.course}</p>
                  <span className={`${TAILWIND_COLORS.TEXT_MUTED} text-sm font-semibold`}>{stat.value}%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-[#E7F0FF]">
                  <div
                    className="h-3 rounded-full bg-[#2563EB]"
                    style={{ width: `${stat.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Staff Management */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Staff Management</h2>
            <button
              type="button"
              onClick={() => navigate('/institute/staff-management')}
              className="text-sm font-semibold text-[#2563EB] hover:text-[#1E4ECB]"
            >
              View All
            </button>
          </div>

          <div className="space-y-4">
            {staffMembers.map((staff) => (
              <div
                key={staff.id}
                className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-col gap-3">
                  <div>
                    <p className={`${TAILWIND_COLORS.TEXT_PRIMARY} text-lg font-semibold`}>{staff.name}</p>
                    <p className={`${TAILWIND_COLORS.TEXT_MUTED} text-sm`}>
                      {staff.designation} · {staff.department}
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-1">Last active: {staff.lastActive}</p>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
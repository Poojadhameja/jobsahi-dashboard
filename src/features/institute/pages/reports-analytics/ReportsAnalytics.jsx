import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  LuUsers, 
  LuGraduationCap,
  LuBookOpen,
  LuTrendingUp,
  // LuBarChart3
} from 'react-icons/lu'
import { Horizontal4Cards, MatrixCard } from '../../../../shared/components/metricCard'
import { PillNavigation } from '../../../../shared/components/navigation'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'
import StudentCompletion from './StudentCompletion'
import CoursePopularity from './CoursePopularity'

export default function ReportsAnalytics() {
  const navigate = useNavigate()
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const handleCoursePopularity = () => {
    navigate('/institute/reports-analytics/course-popularity')
  }

  const handleStudentCompletion = () => {
    navigate('/institute/reports-analytics/student-completion')
  }

  // Key metrics data for Horizontal4Cards
  const keyMetrics = [
    {
      title: 'Total Students',
      value: '4',
      delta: '+15% from last month',
      icon: <LuUsers className="w-5 h-5" />
    },
    {
      title: 'Completion Rate',
      value: '2',
      delta: '+8% from last month',
      icon: <LuGraduationCap className="w-5 h-5" />
    },
    {
      title: 'All Courses',
      value: '20',
      delta: '+2 from last month',
      icon: <LuBookOpen className="w-5 h-5" />
    },
    {
      title: 'Active Batches',
      value: '54',
      delta: '+5% from last month',
      icon: <LuTrendingUp className="w-5 h-5" />
    }
  ]

  // Navigation tabs for PillNavigation
  const navigationTabs = [
    {
      id: 'student-completion',
      label: 'Student Completion',
      icon: LuUsers
    },
    {
      id: 'course-popularity',
      label: 'Course Popularity',
      icon: LuUsers
    }
  ]

  return (
    <div className="p-2 bg-[#F6FAFF] min-h-screen">
      {/* Header Section */}
      <div className="mb-6">
        <MatrixCard 
          title="Reports & Analytics" 
          subtitle="Comprehensive insights and performance metrics for your institute"
          titleColor={TAILWIND_COLORS.TEXT_PRIMARY}
          subtitleColor={TAILWIND_COLORS.TEXT_MUTED}
          className="mb-4"
        />
      </div>

      {/* Key Metrics Section */}
      <div className="mb-6">
        <Horizontal4Cards data={keyMetrics} />
      </div>

      {/* Green Navigation Buttons using PillNavigation */}
      <div className="mb-8">
        <PillNavigation 
          tabs={navigationTabs}
          activeTab={activeTabIndex}
          onTabChange={setActiveTabIndex}
        />
      </div>

      {/* Content Area */}
      {activeTabIndex === 0 ? (
        <StudentCompletion />
      ) : (
        <CoursePopularity />
      )}
    </div>
  )
}

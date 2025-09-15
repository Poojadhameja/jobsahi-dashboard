import React, { useState } from 'react'
import { MatrixCard, Horizontal4Cards } from '../../components/metricCard'
import { PillNavigation } from '../../../../shared/components/navigation.jsx'
import ConversionReports from './ConversionReports.jsx'
import HiringFunnel from './HiringFunnel.jsx'
import CompletionRates from './CompletionRates.jsx'
import CoursePerformance from './CoursePerformance.jsx'

export default function ReportAnalytics() {
  const [activeTab, setActiveTab] = useState(0)

  // Metrics data for the 4 horizontal cards (without icons)
  const metricsData = [
    {
      title: 'Total Visits',
      value: '15,000'
    },
    {
      title: 'Applications',
      value: '3,250'
    },
    {
      title: 'Active Employers',
      value: '245'
    },
    {
      title: 'Successful Hires',
      value: '55'
    }
  ]

  // Navigation tabs for different report types (without icons)
  const navigationTabs = [
    {
      id: 'conversion',
      label: 'Conversion Reports'
    },
    {
      id: 'hiring',
      label: 'Hiring Funnel'
    },
    {
      id: 'completion',
      label: 'Completion Rates'
    },
    {
      id: 'performance',
      label: 'Course Performance'
    }
  ]

  return (
    <div className=" space-y-5">
      {/* Title Card */}
      <MatrixCard 
        title="Reports & Analytics Center"
        subtitle="Comprehensive insights and performance metrics for your job portal"
        className=""
      />

      {/* Horizontal 4 Cards */}
      <Horizontal4Cards 
        data={metricsData}
        className=""
      />

      {/* Navigation Buttons */}
      <div className="flex justify-center">
        <PillNavigation 
          tabs={navigationTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className=""
        />
      </div>

      {/* Conditional Content Based on Active Tab */}
      {activeTab === 0 && <ConversionReports />}
      {activeTab === 1 && <HiringFunnel />}
      {activeTab === 2 && <CompletionRates />}
      {activeTab === 3 && <CoursePerformance />}
    </div>
  )
}
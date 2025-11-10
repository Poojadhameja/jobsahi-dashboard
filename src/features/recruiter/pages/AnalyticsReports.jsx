import React, { useState } from 'react'
import { LuDownload, LuFileText, LuFileSpreadsheet, LuUsers, LuUserCheck, LuPercent, LuDollarSign } from 'react-icons/lu'
import BarChart from '../../../shared/components/charts/BarChart'
import TradePieChart from '../../../shared/components/charts/TradePieChart'
import { getChartColors } from '../../../shared/utils/chartColors'
import { Horizontal4Cards, MatrixCard } from '../../../shared/components/metricCard'
import DynamicButton from '../../../shared/components/DynamicButton'
import { TAILWIND_COLORS } from '../../../shared/WebConstant'

const AnalyticsReports = () => {
  const [timeFilter, setTimeFilter] = useState('Last 30 days')
  const [departmentFilter, setDepartmentFilter] = useState('All Department')

  // Resolve palette for charts (Chart.js needs concrete color strings)
  const chartColors = getChartColors()

  // Sample data for Applications by Department
  const applicationsData = {
    labels: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'],
    datasets: [
      {
        label: 'Total Applications',
        data: [250, 190, 140, 80, 120, 70],
        backgroundColor: chartColors.info,
        borderRadius: 4,
      },
      {
        label: 'Interviews',
        data: [70, 40, 35, 25, 30, 20],
        backgroundColor: chartColors.success,
        borderRadius: 4,
      },
      {
        label: 'Hires',
        data: [20, 15, 20, 10, 15, 10],
        backgroundColor: chartColors.warning,
        borderRadius: 4,
      },
    ],
  }

  // Sample data for Source of Hire
  const sourceOfHireData = {
    labels: ['Job Portal', 'LinkedIn', 'Referrals', 'Career Fair', 'Direct Apply'],
    datasets: [
      {
        data: [35, 28, 20, 12, 5],
        backgroundColor: [
          chartColors.info,
          chartColors.success,
          chartColors.warning,
          chartColors.error,
          chartColors.primary,
        ],
        borderWidth: 0,
      },
    ],
  }

  // Sample data for Key Metrics
  const keyMetricsData = [
    {
      title: 'Total Interviews',
      value: '264',
      icon: <LuUsers />
    },
    {
      title: 'Total Hires',
      value: '85',
      icon: <LuUserCheck />
    },
    {
      title: 'Interview-to-Hire',
      value: '32.1%',
      icon: <LuPercent />
    },
    {
      title: 'Avg Cost per Hire',
      value: '₹2.1L',
      icon: <LuDollarSign />
    }
  ]

  const handleCSVDownload = () => {
    // Create CSV data for applications by department
    const csvData = [
      ['Department', 'Total Applications', 'Interviews', 'Hires'],
      ...applicationsData.labels.map((label, index) => [
        label,
        applicationsData.datasets[0].data[index],
        applicationsData.datasets[1].data[index],
        applicationsData.datasets[2].data[index]
      ])
    ]
    
    const csvContent = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'analytics_data.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePDFDownload = () => {
    // Create a simple text report that can be printed as PDF
    const reportData = {
      title: 'Analytics & Reports',
      date: new Date().toLocaleDateString(),
      timeFilter,
      departmentFilter,
      applications: applicationsData.labels.map((label, index) => ({
        department: label,
        totalApplications: applicationsData.datasets[0].data[index],
        interviews: applicationsData.datasets[1].data[index],
        hires: applicationsData.datasets[2].data[index]
      })),
      sourceOfHire: sourceOfHireData.labels.map((label, index) => ({
        source: label,
        percentage: sourceOfHireData.datasets[0].data[index]
      })),
      keyMetrics: keyMetricsData
    }
    
    const reportContent = `
Analytics & Reports
Generated on: ${reportData.date}
Filters: ${reportData.timeFilter}, ${reportData.departmentFilter}

APPLICATIONS BY DEPARTMENT:
${reportData.applications.map(app => 
  `${app.department}: ${app.totalApplications} total, ${app.interviews} interviews, ${app.hires} hires`
).join('\n')}

SOURCE OF HIRE:
${reportData.sourceOfHire.map(source => 
  `${source.source}: ${source.percentage}%`
).join('\n')}

KEY METRICS:
${reportData.keyMetrics.map(metric => 
  `${metric.title}: ${metric.value}`
).join('\n')}
    `.trim()
    
    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'analytics_report.txt')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleChartDownload = () => {
    // This is now handled by individual chart components
    console.log('Chart Download handled by individual components')
  }

  return (
    <div className={`p-2 ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
      {/* Header */}
      <div className="mb-8">
        <MatrixCard 
          title="Analytics & Reports"
          subtitle="Track recruitment metrics, generate insights, and create custom reports."
        />
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <span className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Filters:</span>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className={`px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${TAILWIND_COLORS.TEXT_PRIMARY}`}
          >
            <option value="Last 7 days">Last 7 days</option>
            <option value="Last 30 days">Last 30 days</option>
            <option value="Last 90 days">Last 90 days</option>
            <option value="Last year">Last year</option>
          </select>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className={`px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${TAILWIND_COLORS.TEXT_PRIMARY}`}
          >
            <option value="All Department">All Department</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Operations">Operations</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <DynamicButton
            onClick={handleCSVDownload}
            backgroundColor="transparent"
            textColor="var(--color-text-primary)"
            border="2px solid var(--color-secondary)"
            hoverBackgroundColor="var(--color-secondary)"
            icon={<LuFileSpreadsheet className="w-4 h-4" />}
            className={`${TAILWIND_COLORS.TEXT_PRIMARY} font-medium`}
          >
            CSV
          </DynamicButton>
          <DynamicButton
            onClick={handlePDFDownload}
            backgroundColor="transparent"
            textColor="var(--color-text-primary)"
            border="2px solid var(--color-secondary)"
            hoverBackgroundColor="var(--color-secondary)"
            icon={<LuFileText className="w-4 h-4" />}
            className={`${TAILWIND_COLORS.TEXT_PRIMARY} font-medium`}
          >
            PDF
          </DynamicButton>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* Applications by Department - Takes 2 columns */}
        <div className="xl:col-span-2">
          <BarChart
            title="Applications by Department"
            data={applicationsData}
            onDownload={handleChartDownload}
          />
        </div>

        {/* Source of Hire - Takes 1 column */}
        <div className="xl:col-span-1">
          <TradePieChart
            title="Source of Hire"
            data={sourceOfHireData}
            onDownload={handleChartDownload}
          />
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-6`}>Key Metrics Summary</h3>
          <Horizontal4Cards data={keyMetricsData} />
        </div>
      </div>
    </div>
  )
}

export default AnalyticsReports

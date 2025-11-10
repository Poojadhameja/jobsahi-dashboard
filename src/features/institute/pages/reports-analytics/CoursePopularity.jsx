import React from 'react'
import { PieChart } from '../../../../shared/components/charts'

export default function CoursePopularity() {
  const handleExport = () => {
    // Handle export functionality
    console.log('Exporting course popularity data...')
  }

  // Get semantic colors from CSS variables
  const successColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-success').trim() || '#16A34A'
  const warningColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-warning').trim() || '#F59E0B'
  const errorColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-error').trim() || '#DC2626'

  // Chart data for course popularity
  const chartData = {
    labels: [
      'Completed 65%',
      'In Progress 25%', 
      'Not Started 10%'
    ],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: [
          successColor, // Green for Completed
          warningColor, // Orange for In Progress
          errorColor    // Red for Not Started
        ],
        borderColor: [
          successColor, // Green
          warningColor, // Orange
          errorColor    // Red
        ],
        borderWidth: 2,
      },
    ],
  }

  return (
    <PieChart
      data={chartData}
      title="Course Popularity"
      subtitle="Institute Performance Dashboard"
      showExport={true}
      onExport={handleExport}
    />
  )
}

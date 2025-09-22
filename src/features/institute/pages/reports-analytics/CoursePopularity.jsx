import React from 'react'
import { PieChart } from '../../../../shared/components/charts'

export default function CoursePopularity() {
  const handleExport = () => {
    // Handle export functionality
    console.log('Exporting course popularity data...')
  }

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
          '#22C55E', // Green
          '#F97316', // Orange
          '#EF4444'  // Red
        ],
        borderColor: [
          '#16A34A', // Darker Green
          '#EA580C', // Darker Orange
          '#DC2626'  // Darker Red
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

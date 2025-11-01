import React from 'react'
import { BarChart } from '../../../../shared/components/charts'
import { colors } from '../../../../shared/colors'

export default function StudentCompletion() {
  const handleExport = () => {
    // Handle export functionality
    console.log('Exporting student completion data...')
  }

  // Chart data for student completion
  const chartData = {
    labels: [
      'Assistant Electrician',
      'Data Entry Operator', 
      'Plumbing Assistant',
      'Solar Panel Installer'
    ],
    datasets: [
      {
        data: [195, 150, 100, 45],
        backgroundColor: [
          colors.primary.darkBlue,
          colors.primary.darkBlue,
          colors.primary.darkBlue,
          colors.primary.darkBlue
        ],
        borderColor: [
          colors.primary.darkBlue,
          colors.primary.darkBlue,
          colors.primary.darkBlue,
          colors.primary.darkBlue
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <BarChart
      data={chartData}
      title="Student Completion"
      subtitle="Institute Performance Dashboard"
      showExport={true}
      onExport={handleExport}
    />
  )
}

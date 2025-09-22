import React from 'react'
import { BarChart } from '../../../../shared/components/charts'

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
          '#0b537dc0',
          '#0b537dc0',
          '#0b537dc0',
          '#0b537dc0'
        ],
        borderColor: [
          '#0b537dc0',
          '#0b537dc0',
          '#0b537dc0',
          '#0b537dc0'
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

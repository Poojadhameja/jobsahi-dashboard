import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const DoubleCircleChart = ({ 
  height = "h-48 sm:h-56 md:h-64",
  className = ""
}) => {
  const doughnutData = {
    labels: ['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Others'],
    datasets: [
      {
        data: [32, 18, 12, 18, 8, 12],
        backgroundColor: [
          'var(--color-primary)', // Blue - JavaScript (largest segment)
          'var(--color-success)', // Green - Python
          'var(--color-warning)', // Orange - Java
          'var(--color-error)', // Red - React
          '#8B5CF6', // Purple - Node.js (keeping for contrast)
          'var(--color-gray-600)'  // Grey - Others
        ],
        borderWidth: 0,
      },
    ],
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { 
        position: 'bottom', 
        labels: { 
          usePointStyle: true, 
          boxWidth: 6,
          padding: 15,
          font: {
            size: 11,
            weight: '400'
          },
          color: 'var(--color-text-muted)'
        } 
      },
      tooltip: {
        backgroundColor: 'var(--color-gray-700)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'var(--color-gray-600)',
        borderWidth: 1,
        cornerRadius: 6,
        displayColors: true,
        callbacks: {
          label: function(context) {
            const label = context.label || ''
            const value = context.parsed
            return `${label}: ${value}%`
          }
        }
      }
    },
    cutout: '65%',
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  }

  return (
    <div className={`${height} ${className}`}>
      <Doughnut data={doughnutData} options={doughnutOptions} />
    </div>
  )
}

export default DoubleCircleChart
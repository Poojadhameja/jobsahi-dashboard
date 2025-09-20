import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const TradesPieChart = ({ 
  // height = "",
  className = ""
}) => {
  const pieData = {
    labels: ['Civil', 'Civil', 'Civil', 'Civil', 'Civil', 'Civil', 'Civil'],
    datasets: [
      {
        data: [20, 25, 15, 20, 20, 20, 20],
        backgroundColor: [
          'var(--color-secondary-light)', // Light green
          'var(--color-warning)', // Orange
          'var(--color-success)', // Green
          'var(--color-primary-light)', // Light blue
          'var(--color-error)', // Red/Coral
          '#FDE047', // Yellow (keeping as is for contrast)
          'var(--color-primary-30)'  // Light blue (slightly different shade)
        ],
        borderWidth: 0,
      },
    ],
  }

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'var(--color-gray-700)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'var(--color-gray-600)',
        borderWidth: 1,
        cornerRadius: 8,
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
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  }

  // Legend data matching the chart
  const legendItems = [
    { color: 'var(--color-secondary-light)', label: 'Civil' },
    { color: 'var(--color-warning)', label: 'Civil' },
    { color: 'var(--color-success)', label: 'Civil' },
    { color: 'var(--color-primary-light)', label: 'Civil' },
    { color: 'var(--color-error)', label: 'Civil' },
    { color: '#FDE047', label: 'Civil' },
    { color: 'var(--color-primary-30)', label: 'Civil' }
  ]

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between h-full">
        {/* Legend */}
        <div className="flex-1 pr-6">
          <div className="space-y-2">
            {legendItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-700 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Pie Chart */}
        <div className="w-48 h-48 md:h-72 md:w-72 flex-shrink-0">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  )
}

export default TradesPieChart

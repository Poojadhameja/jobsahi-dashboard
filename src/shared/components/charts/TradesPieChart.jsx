import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const TradesPieChart = ({ 
  height = "h-48 sm:h-56 md:h-64",
  className = ""
}) => {
  const pieData = {
    labels: ['Civil', 'Civil', 'Civil', 'Civil', 'Civil', 'Civil', 'Civil'],
    datasets: [
      {
        data: [20, 25, 15, 20, 20, 20, 20],
        backgroundColor: [
          '#34D399', // Light green
          '#FB923C', // Orange
          '#34D399', // Light green (slightly different shade)
          '#60A5FA', // Light blue
          '#F87171', // Red/Coral (60% segment)
          '#FDE047', // Yellow
          '#93C5FD'  // Light blue (slightly different shade)
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
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
    { color: '#34D399', label: 'Civil' },
    { color: '#FB923C', label: 'Civil' },
    { color: '#34D399', label: 'Civil' },
    { color: '#60A5FA', label: 'Civil' },
    { color: '#F87171', label: 'Civil' },
    { color: '#FDE047', label: 'Civil' },
    { color: '#93C5FD', label: 'Civil' }
  ]

  return (
    <div className={`${height} ${className}`}>
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
        <div className="w-48 h-48 flex-shrink-0">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  )
}

export default TradesPieChart

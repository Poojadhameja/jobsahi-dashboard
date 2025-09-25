import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import {
  LuDownload,
  LuMail,
  LuShare2
} from 'react-icons/lu'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
)

export default function ConversionReports() {
  // Chart data for Monthly Conversion Trends (empty chart as shown in image)
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: []
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 20000,
        ticks: {
          stepSize: 5000,
          callback: function(value) {
            return value.toLocaleString()
          }
        },
        grid: {
          borderDash: [5, 5],
        }
      },
      x: {
        grid: {
          borderDash: [5, 5],
        }
      }
    }
  }

  // Flow data for Visits → Resume → Application Flow (exact data from image)
  const flowData = [
    {
      title: 'Razorpay',
      value: '15,555',
      percentage: '100%'
    },
    {
      title: 'Resume Views',
      value: '1,234',
      percentage: '70%'
    },
    {
      title: 'Applications',
      value: '1,234',
      percentage: '50%'
    }
  ]

  // Export options data (with icons as shown in image)
  const exportOptions = [
    {
      label: 'Export as PDF',
      icon: <LuDownload />,
      onClick: () => console.log('Export as PDF')
    },
    {
      label: 'Export as Excel',
      icon: <LuDownload />,
      onClick: () => console.log('Export as Excel')
    },
    {
      label: 'Email Reports',
      icon: <LuMail />,
      onClick: () => console.log('Email Reports')
    },
    {
      label: 'Generate Shareable Link',
      icon: <LuShare2 />,
      onClick: () => console.log('Generate Shareable Link')
    }
  ]

  return (
    <div className=" space-y-8">
      {/* Visits → Resume → Application Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Flow Section */}
        <div className="bg-white rounded-lg border border-[var(--color-primary)28] shadow-sm p-6">
          <h3 className="text-xl font-semibold text-primary mb-2">
            Visits → Resume → Application Flow
          </h3>
          <p className="text-gray-600 mb-6">
            Track user journey from initial visit to job application
          </p>
          
          <div className="space-y-4">
            {flowData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{item.title}</span>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{item.value}</p>
                    <p className="text-sm text-gray-600">{item.percentage}</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: item.percentage }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Conversion Trends Chart */}
        <div className="bg-white rounded-lg border border-[var(--color-primary)28] shadow-sm p-6">
          <h3 className="text-xl font-semibold text-primary mb-2">
            Monthly Conversion Trends
          </h3>
          <p className="text-gray-600 mb-6">
            6 month performance overview
          </p>
          
          <div className="h-80">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-lg border border-[var(--color-primary)28] shadow-sm p-6">
        <h3 className="text-xl font-semibold text-primary mb-2">
          Export Options
        </h3>
        <p className="text-gray-600 mb-6">
          Download reports in various formats or share with stakeholders
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {exportOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.onClick}
              className="flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-[var(--color-secondary)] text-[var(--color-secondary)] rounded-lg hover:bg-[var(--color-secondary)] hover:text-white transition-colors duration-200 font-medium"
            >
              <span className="text-lg">{option.icon}</span>
              <span className="text-sm">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

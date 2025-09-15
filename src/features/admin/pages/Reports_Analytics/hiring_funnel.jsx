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

export default function HiringFunnel() {
  // Chart data for Monthly Conversion Trends (empty chart as shown in image)
  const chartData = {
    labels: ['Jan', '0.25', '0.5', '0.75'],
    datasets: []
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        type: 'linear',
        ticks: {
          callback: function(value, index) {
            const labels = ['0', 'job posted', 'Applications received', 'interviews scheduled', 'offers Made', 'Hires completed'];
            return labels[index] || '';
          },
          stepSize: 1
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

  // Export options data
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
    <div className="p-5 space-y-8">
      {/* Monthly Conversion Trends Chart */}
      <div className="bg-white rounded-lg border border-[#0b537d28] shadow-sm p-6">
        <h3 className="text-xl font-semibold text-[#1A569A] mb-2">
          Monthly Conversion Trends
        </h3>
        <p className="text-gray-600 mb-6">
          6 month performance overview
        </p>
        
        <div className="h-96">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-lg border border-[#0b537d28] shadow-sm p-6">
        <h3 className="text-xl font-semibold text-[#1A569A] mb-2">
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
              className="flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-[#5B9821] text-[#5B9821] rounded-lg hover:bg-[#5B9821] hover:text-white transition-colors duration-200 font-medium"
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

import React from 'react'
import { Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
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
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
)


export default function CoursePerformance() {
  // Bar chart data for Visits → Resume → Application Flow
  const barChartData = {
    labels: ['course1', 'course2', 'course3', 'course4', 'course5'],
    datasets: [
      {
        label: 'Completion Rate',
        data: [85, 65, 50, 70, 80],
        backgroundColor: 'var(--color-secondary-light)',
        borderColor: 'var(--color-secondary)',
        borderWidth: 1,
      }
    ]
  }

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 25,
          callback: function(value) {
            return value
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

  // Pie chart data for Course Completion Distribution
  const pieChartData = {
    labels: ['Electrician', 'COPA', 'Electrician', 'Fitter', 'Other'],
    datasets: [
      {
        data: [100, 100, 100, 100, 100],
        backgroundColor: [
          'var(--color-error)', // Red
          'var(--color-secondary)', // Green
          'var(--color-primary)', // Blue
          'var(--color-warning)', // Orange
          '#FDE047', // Yellow
        ],
        borderWidth: 0,
      }
    ]
  }

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          generateLabels: function(chart) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const dataset = data.datasets[0];
                const value = dataset.data[i];
                return {
                  text: `${label}: ${value}`,
                  fillStyle: dataset.backgroundColor[i],
                  strokeStyle: dataset.borderColor,
                  lineWidth: dataset.borderWidth,
                  hidden: false,
                  index: i
                };
              });
            }
            return [];
          }
        }
      },
    },
  }

  // Export options data (with icons)
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
      {/* Top Section with Two Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visits → Resume → Application Flow Bar Chart */}
        <div className="bg-white rounded-lg border border-[var(--color-primary)28] shadow-sm p-6">
          <h3 className="text-xl font-semibold text-primary mb-2">
            Visits → Resume → Application Flow
          </h3>
          <p className="text-gray-600 mb-6">
            Track user journey from initial visit to job application
          </p>
          
          <div className="h-80">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>

        {/* Course Completion Distribution Pie Chart */}
        <div className="bg-white rounded-lg border border-[var(--color-primary)28] shadow-sm p-6">
          <h3 className="text-xl font-semibold text-primary mb-2">
            Course Completion Distribution
          </h3>
          <p className="text-gray-600 mb-6">
            Total completion by course type
          </p>
          
          <div className="h-80">
            <Doughnut data={pieChartData} options={pieChartOptions} />
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

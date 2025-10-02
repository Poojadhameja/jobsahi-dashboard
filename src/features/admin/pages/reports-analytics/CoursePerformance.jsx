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
  LuShare2,
  LuFileSpreadsheet
} from 'react-icons/lu'
import Swal from 'sweetalert2'

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
        backgroundColor: '#A8D18D', // Light Green matching the pie chart
        borderColor: '#8BC34A',
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
          '#A8D18D', // Light Green (COPA)
          '#FFB3BA', // Light Red/Pink (Electrician)
          '#FFDFBA', // Light Yellow/Gold (Electrician)
          '#FFD1A3', // Light Orange (Fitter)
          '#B8B8B8', // Muted Blue-Grey (Other)
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

  // Export functions
  const handleExportPDF = () => {
    const pdfContent = `
      COURSE PERFORMANCE REPORTS
      Generated on: ${new Date().toLocaleDateString()}
      
      VISITS → RESUME → APPLICATION FLOW:
      - Course 1: 85% completion rate
      - Course 2: 65% completion rate
      - Course 3: 50% completion rate
      - Course 4: 70% completion rate
      - Course 5: 80% completion rate
      
      COURSE COMPLETION DISTRIBUTION:
      - Electrician: 100 completions
      - COPA: 100 completions
      - Electrician: 100 completions
      - Fitter: 100 completions
      - Other: 100 completions
      
      PERFORMANCE SUMMARY:
      - Average Completion Rate: 70%
      - Highest Performing Course: Course 1 (85%)
      - Lowest Performing Course: Course 3 (50%)
      - Total Course Completions: 500
      
      INSIGHTS:
      - 2 courses achieved 80%+ completion rate
      - 1 course needs immediate attention (50% completion)
      - Overall platform performance is above average
    `
    
    const blob = new Blob([pdfContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `course-performance-reports-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    Swal.fire({
      title: "PDF Export",
      text: "Course performance reports have been exported as PDF successfully!",
      icon: "success",
      timer: 2000,
      showConfirmButton: false
    })
  }

  const handleExportExcel = () => {
    const csvContent = `Course,Completion Rate,Completions
Course 1,85%,85
Course 2,65%,65
Course 3,50%,50
Course 4,70%,70
Course 5,80%,80
Electrician,100%,100
COPA,100%,100
Fitter,100%,100
Other,100%,100`
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `course-performance-reports-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    Swal.fire({
      title: "Excel Export",
      text: "Course performance reports have been exported as Excel successfully!",
      icon: "success",
      timer: 2000,
      showConfirmButton: false
    })
  }

  const handleEmailReport = () => {
    Swal.fire({
      title: "Email Report",
      html: `
        <div class="text-left">
          <p class="mb-4">Send course performance reports via email to:</p>
          <input type="email" id="emailInput" class="swal2-input" placeholder="Enter email address" required>
          <div class="mt-4">
            <label class="flex items-center">
              <input type="checkbox" id="includeCharts" class="mr-2" checked>
              Include charts and graphs
            </label>
          </div>
          <div class="mt-2">
            <label class="flex items-center">
              <input type="checkbox" id="weeklyReport" class="mr-2">
              Set up weekly automated reports
            </label>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Send Report",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const email = document.getElementById('emailInput').value
        const includeCharts = document.getElementById('includeCharts').checked
        const weeklyReport = document.getElementById('weeklyReport').checked
        
        if (!email) {
          Swal.showValidationMessage('Please enter an email address')
          return false
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          Swal.showValidationMessage('Please enter a valid email address')
          return false
        }
        
        return { email, includeCharts, weeklyReport }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Email report sent to:', result.value)
        Swal.fire({
          title: "Report Sent!",
          text: `Course performance reports have been sent to ${result.value.email}`,
          icon: "success",
          timer: 3000,
          showConfirmButton: false
        })
      }
    })
  }

  const handleGenerateShareableLink = () => {
    const shareableLink = `https://dashboard.jobsahi.com/reports/course-performance/${Date.now()}`
    
    Swal.fire({
      title: "Shareable Link Generated",
      html: `
        <div class="text-left">
          <p class="mb-4">Your course performance reports are now available at:</p>
          <div class="bg-gray-100 p-3 rounded border text-sm break-all">
            ${shareableLink}
          </div>
          <div class="mt-4">
            <label class="flex items-center">
              <input type="checkbox" id="passwordProtect" class="mr-2">
              Password protect this link
            </label>
          </div>
          <div class="mt-2">
            <label class="flex items-center">
              <input type="checkbox" id="expireLink" class="mr-2">
              Set expiration date (7 days)
            </label>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Copy Link",
      cancelButtonText: "Close",
      preConfirm: () => {
        const passwordProtect = document.getElementById('passwordProtect').checked
        const expireLink = document.getElementById('expireLink').checked
        
        navigator.clipboard.writeText(shareableLink).then(() => {
          return { passwordProtect, expireLink }
        }).catch(() => {
          Swal.showValidationMessage('Failed to copy link to clipboard')
          return false
        })
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Link Copied!",
          text: "Shareable link has been copied to your clipboard",
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        })
      }
    })
  }

  // Export options data (with functional handlers)
  const exportOptions = [
    {
      label: 'Export as PDF',
      icon: <LuDownload />,
      onClick: handleExportPDF
    },
    {
      label: 'Export as Excel',
      icon: <LuFileSpreadsheet />,
      onClick: handleExportExcel
    },
    {
      label: 'Email Reports',
      icon: <LuMail />,
      onClick: handleEmailReport
    },
    {
      label: 'Generate Shareable Link',
      icon: <LuShare2 />,
      onClick: handleGenerateShareableLink
    }
  ]

  return (
    <div className="space-y-8">
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

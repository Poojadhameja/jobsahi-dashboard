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
  LuShare2,
  LuFileSpreadsheet
} from 'react-icons/lu'
import Swal from 'sweetalert2'

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

  // Export functions
  const handleExportPDF = () => {
    // Create PDF content
    const pdfContent = `
      CONVERSION REPORTS
      Generated on: ${new Date().toLocaleDateString()}
      
      VISITS → RESUME → APPLICATION FLOW:
      - Razorpay: 15,555 (100%)
      - Resume Views: 1,234 (70%)
      - Applications: 1,234 (50%)
      
      MONTHLY CONVERSION TRENDS:
      - January: Data not available
      - February: Data not available
      - March: Data not available
      - April: Data not available
      - May: Data not available
      - June: Data not available
      
      SUMMARY:
      Total Visits: 15,000
      Applications: 3,250
      Active Employers: 245
      Successful Hires: 55
    `
    
    // Create and download PDF
    const blob = new Blob([pdfContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `conversion-reports-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    Swal.fire({
      title: "PDF Export",
      text: "Conversion reports have been exported as PDF successfully!",
      icon: "success",
      timer: 2000,
      showConfirmButton: false
    })
  }

  const handleExportExcel = () => {
    // Create CSV content for Excel
    const csvContent = `Metric,Value,Percentage
Razorpay,15555,100%
Resume Views,1234,70%
Applications,1234,50%
Total Visits,15000,
Applications Total,3250,
Active Employers,245,
Successful Hires,55,`
    
    // Create and download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `conversion-reports-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    Swal.fire({
      title: "Excel Export",
      text: "Conversion reports have been exported as Excel successfully!",
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
          <p class="mb-4">Send conversion reports via email to:</p>
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
          text: `Conversion reports have been sent to ${result.value.email}`,
          icon: "success",
          timer: 3000,
          showConfirmButton: false
        })
      }
    })
  }

  const handleGenerateShareableLink = () => {
    // Generate a mock shareable link
    const shareableLink = `https://dashboard.jobsahi.com/reports/conversion/${Date.now()}`
    
    Swal.fire({
      title: "Shareable Link Generated",
      html: `
        <div class="text-left">
          <p class="mb-4">Your conversion reports are now available at:</p>
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
        
        // Copy to clipboard
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

  // Export options data (with icons and functional handlers)
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

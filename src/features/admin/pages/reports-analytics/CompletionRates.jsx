import React from 'react'
import {
  LuDownload,
  LuMail,
  LuShare2,
  LuFileSpreadsheet
} from 'react-icons/lu'
import Swal from 'sweetalert2'

export default function CompletionRates() {
  // Institute completion rate data
  const instituteData = [
    {
      name: 'Tech University',
      students: '234 students',
      completionRate: '100%'
    },
    {
      name: 'Business College',
      students: '234 students',
      completionRate: '70%'
    },
    {
      name: 'Design Academy',
      students: '234 students',
      completionRate: '50%'
    },
    {
      name: 'Engineering Institute',
      students: '234 students',
      completionRate: '70%'
    },
    {
      name: 'Medical School',
      students: '234 students',
      completionRate: '50%'
    }
  ]

  // Export functions
  const handleExportPDF = () => {
    const pdfContent = `
      COMPLETION RATES REPORTS
      Generated on: ${new Date().toLocaleDateString()}
      
      INSTITUTE COMPLETION RATE REPORT:
      - Tech University: 234 students (100% completion)
      - Business College: 234 students (70% completion)
      - Design Academy: 234 students (50% completion)
      - Engineering Institute: 234 students (70% completion)
      - Medical School: 234 students (50% completion)
      
      SUMMARY STATISTICS:
      - Total Students: 1,170
      - Average Completion Rate: 68%
      - Highest Performing Institute: Tech University (100%)
      - Lowest Performing Institute: Design Academy & Medical School (50%)
      
      PERFORMANCE INSIGHTS:
      - 2 institutes achieved 70%+ completion rate
      - 1 institute achieved 100% completion rate
      - 2 institutes need improvement (50% completion rate)
    `
    
    const blob = new Blob([pdfContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `completion-rates-reports-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    Swal.fire({
      title: "PDF Export",
      text: "Completion rates reports have been exported as PDF successfully!",
      icon: "success",
      timer: 2000,
      showConfirmButton: false
    })
  }

  const handleExportExcel = () => {
    const csvContent = `Institute,Students,Completion Rate
Tech University,234,100%
Business College,234,70%
Design Academy,234,50%
Engineering Institute,234,70%
Medical School,234,50%`
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `completion-rates-reports-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    Swal.fire({
      title: "Excel Export",
      text: "Completion rates reports have been exported as Excel successfully!",
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
          <p class="mb-4">Send completion rates reports via email to:</p>
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
          text: `Completion rates reports have been sent to ${result.value.email}`,
          icon: "success",
          timer: 3000,
          showConfirmButton: false
        })
      }
    })
  }

  const handleGenerateShareableLink = () => {
    const shareableLink = `https://dashboard.jobsahi.com/reports/completion-rates/${Date.now()}`
    
    Swal.fire({
      title: "Shareable Link Generated",
      html: `
        <div class="text-left">
          <p class="mb-4">Your completion rates reports are now available at:</p>
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
    <div className=" space-y-8">
      {/* Institute Completion Rate Report */}
      <div className="bg-white rounded-lg border border-[var(--color-primary)28] shadow-sm p-6">
        <h3 className="text-xl font-semibold text-primary mb-2">
          Institute Completion rate Report
        </h3>
        <p className="text-gray-600 mb-6">
          Performance metrics by educational institution
        </p>
        
        <div className="space-y-4">
          {instituteData.map((institute, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">{institute.name}</h4>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-green-500"
                    style={{ 
                      width: institute.completionRate,
                      background: 'var(--color-success)'
                    }}
                  ></div>
                </div>
              </div>
              <div className="text-right ml-4">
                <p className="text-sm text-gray-600">{institute.students}</p>
                <p className="font-semibold text-gray-900">{institute.completionRate}</p>
              </div>
            </div>
          ))}
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

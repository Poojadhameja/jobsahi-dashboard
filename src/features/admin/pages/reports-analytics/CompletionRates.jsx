import React from 'react'
import {
  LuDownload,
  LuMail,
  LuShare2
} from 'react-icons/lu'

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
      {/* Institute Completion Rate Report */}
      <div className="bg-white rounded-lg border border-[#0b537d28] shadow-sm p-6">
        <h3 className="text-xl font-semibold text-[#1A569A] mb-2">
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
                      background: '#10B981'
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

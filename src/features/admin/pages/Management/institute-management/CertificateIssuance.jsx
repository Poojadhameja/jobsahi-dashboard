import React from 'react'
import { TAILWIND_COLORS } from '../../../../../shared/WebConstant'
import { Button } from '../../../../../shared/components/Button'

// Certificate Issuance Table Component
function CertificateIssuanceTable() {
  const certificateData = [
    {
      student: "Ravi Verma",
      institute: "SPI Tech Institute",
      course: "Data Science for Beginners",
      completionDate: "March 8, 2024",
      status: "Issued"
    },
    {
      student: "Priya Rao",
      institute: "Xaviers Institute",
      course: "Web Development Bootcamp",
      completionDate: "March 4, 2024",
      status: "Issued"
    },
    {
      student: "Ananya Das",
      institute: "National IT Academy",
      course: "Full-Stack Developer",
      completionDate: "February 26, 2024",
      status: "Issued"
    },
    {
      student: "Shrey Sen",
      institute: "Crescent Institute",
      course: "Data Science for Beginners",
      completionDate: "February 20, 2024",
      status: "Issued"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">✓</span>
        </div>
        <h2 className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Certificate Issuance</h2>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium ${TAILWIND_COLORS.TEXT_MUTED} uppercase tracking-wider`}>
                  Student
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${TAILWIND_COLORS.TEXT_MUTED} uppercase tracking-wider`}>
                  Course
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${TAILWIND_COLORS.TEXT_MUTED} uppercase tracking-wider`}>
                  Completion Date
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${TAILWIND_COLORS.TEXT_MUTED} uppercase tracking-wider`}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {certificateData.map((certificate, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{certificate.student}</div>
                      <div className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>{certificate.institute}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{certificate.course}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{certificate.completionDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                        {certificate.status}
                      </span>
                      <Button
                        variant="light"
                        size="sm"
                        className="px-3 py-1 text-xs bg-green-50 text-green-600 border border-green-200 hover:bg-green-100"
                      >
                        View
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default function CertificateIssuance() {
  return <CertificateIssuanceTable />
}



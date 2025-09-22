import React from 'react'

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
        <h2 className="text-2xl font-bold text-gray-900">Certificate Issuance</h2>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completion Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {certificateData.map((certificate, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{certificate.student}</div>
                      <div className="text-sm text-gray-500">{certificate.institute}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{certificate.course}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{certificate.completionDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                        {certificate.status}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded border border-green-200">
                        View
                      </span>
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



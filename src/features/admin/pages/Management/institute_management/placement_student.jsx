import React from 'react'

// Placement Ready Students Table Component
function PlacementReadyStudentsTable() {
  const studentData = [
    {
      name: "Emily Wilson",
      courseField: "Computer Science",
      courseDegree: "M.Sc.",
      placementDrive: "05 Mar, 2024",
      status: "Placed"
    },
    {
      name: "Daniel Brown",
      courseField: "Business Administration",
      courseDegree: "MBA",
      placementDrive: "12 Feb, 2024",
      status: "Eligible"
    },
    {
      name: "Jessica Taylor",
      courseField: "Business Administration",
      courseDegree: "MBA",
      placementDrive: "25 Jan, 2024",
      status: "Placed"
    },
    {
      name: "David Lee",
      courseField: "Data Science",
      courseDegree: "M.Sc.",
      placementDrive: "08 Dec, 2023",
      status: "Eligible"
    },
    {
      name: "Sophia Martinez",
      courseField: "Data Science",
      courseDegree: "M.Sc.",
      placementDrive: "15 Nov, 2023",
      status: "Placed"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">✓</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Placement Ready Student</h2>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Placement Drive
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {studentData.map((student, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.courseField}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.courseDegree}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.placementDrive}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      student.status === 'Placed' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                      <span className="text-lg">⋯</span>
                    </button>
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

export default function PlacementStudent() {
  return <PlacementReadyStudentsTable />
}

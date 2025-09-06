import React from 'react'
import { TAILWIND_COLORS } from '../../../shared/WebConstant'

export default function JobCourseControl() {
  const jobs = [
    { title:'Welder (Jindal)', openings:12, status:'Open' },
    { title:'Fitter (Tata)', openings:5, status:'Closed' },
  ]
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Job Course Control</h1>
      <div className="rounded-2xl border overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="py-2 px-3">Title</th>
              <th className="py-2 px-3">Openings</th>
              <th className="py-2 px-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((j,i)=>(
              <tr key={i} className="border-t">
                <td className="py-2 px-3">{j.title}</td>
                <td className="py-2 px-3">{j.openings}</td>
                <td className="py-2 px-3">
                  <span className={`px-2 py-1 text-xs rounded ${j.status==='Open'?TAILWIND_COLORS.BADGE_SUCCESS:TAILWIND_COLORS.BADGE_ERROR}`}>{j.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

import React from 'react'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'

export default function InstituteManagement() {
  const rows = [
    { name:'Prime ITI', city:'Jabalpur', intake:'700+', courses:['Fitter','Welder'] },
    { name:'Hi-Tech Institute', city:'Nagpur', intake:'500+', courses:['Electrician'] },
  ]
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Institute Management</h1>
      <div className={`${TAILWIND_COLORS.CARD} p-4`}>
        {rows.map((r,i)=>(
          <div key={i} className="py-2 border-t first:border-t-0">
            <div className="font-medium">{r.name}</div>
            <div className="text-gray-500">{r.city} • Intake {r.intake}</div>
            <div className="text-gray-600 text-sm">Courses: {r.courses.join(', ')}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

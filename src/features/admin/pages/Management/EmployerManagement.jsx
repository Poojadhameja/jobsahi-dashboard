import React from 'react'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'

export default function EmployerManagement() {
  const rows = [
    { name:'A-One Industries', city:'Pune', size:'100-500', status:'Pending' },
    { name:'MechWorks', city:'Indore', size:'50-100', status:'Approved' },
  ]
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Employer Management</h1>
      <div className={`${TAILWIND_COLORS.CARD} p-4`}>
        {rows.map((r,i)=>(
          <div key={i} className="flex justify-between py-2 border-t first:border-t-0">
            <div>
              <div className="font-medium">{r.name}</div>
              <div className="text-gray-500">{r.city} • {r.size}</div>
            </div>
            <span className={`px-2 py-1 text-xs rounded ${r.status==='Approved' ? TAILWIND_COLORS.BADGE_SUCCESS : TAILWIND_COLORS.BADGE_WARN}`}>
              {r.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

import React from 'react'
import { TAILWIND_COLORS } from '../../../shared/WebConstant'

export default function Users() {
  const rows = [
    { name:'Admin', role:'Super Admin', email:'admin@example.com' },
    { name:'Manager', role:'Moderator', email:'manager@example.com' },
  ]
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Users</h1>
      <div className="rounded-2xl border overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Role</th>
              <th className="py-2 px-3">Email</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={i} className="border-t">
                <td className="py-2 px-3">{r.name}</td>
                <td className="py-2 px-3">{r.role}</td>
                <td className="py-2 px-3">{r.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

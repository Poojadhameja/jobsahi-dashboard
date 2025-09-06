import React, { useMemo, useState, useEffect } from 'react'
import { TAILWIND_COLORS } from '../../../shared/WebConstant'

// inline filters
function AdvancedFilters({ value, onChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
      <input className="border rounded-lg px-3 py-2" placeholder="Name" value={value.name||''}
             onChange={e=>onChange({ ...value, name:e.target.value })}/>
      <input className="border rounded-lg px-3 py-2" placeholder="Email" value={value.email||''}
             onChange={e=>onChange({ ...value, email:e.target.value })}/>
      <input className="border rounded-lg px-3 py-2" placeholder="Phone" value={value.phone||''}
             onChange={e=>onChange({ ...value, phone:e.target.value })}/>
      <input className="border rounded-lg px-3 py-2" placeholder="City" value={value.city||''}
             onChange={e=>onChange({ ...value, city:e.target.value })}/>
    </div>
  )
}

// inline table
function StudentTable({ rows }) {
  return (
    <div className="rounded-2xl border overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="py-2 px-3">Name</th>
            <th className="py-2 px-3">Email</th>
            <th className="py-2 px-3">Phone</th>
            <th className="py-2 px-3">City</th>
            <th className="py-2 px-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r.id} className="border-t">
              <td className="py-2 px-3">{r.name}</td>
              <td className="py-2 px-3">{r.email}</td>
              <td className="py-2 px-3">{r.phone}</td>
              <td className="py-2 px-3">{r.city}</td>
              <td className="py-2 px-3">
                <a className="text-blue-600 mr-3" href={`/admin/students/${r.id}`}>View</a>
                <a className="text-green-600 mr-3" href={`/admin/students/${r.id}/edit`}>Edit</a>
                <button className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function StudentManagement() {
  const [filters, setFilters] = useState({})
  const [rows, setRows] = useState([])

  useEffect(()=>{
    // TODO: replace with ApiService
    setRows([
      { id:1, name:'Aman Verma', email:'aman@example.com', phone:'9999912345', city:'Bhopal' },
      { id:2, name:'Riya Singh', email:'riya@example.com', phone:'9999988888', city:'Indore' },
      { id:3, name:'Kunal Jain', email:'kunal@example.com', phone:'9999977777', city:'Jabalpur' },
    ])
  },[])

  const filtered = useMemo(()=>{
    return rows.filter(r=>{
      const by = (k)=> (filters[k] ? (String(r[k]||'').toLowerCase().includes(String(filters[k]).toLowerCase())) : true)
      return by('name') && by('email') && (filters.phone ? r.phone.includes(filters.phone) : true) && by('city')
    })
  },[rows, filters])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Student Management</h1>
        <a href="/admin/students/create" className={`px-3 py-2 rounded-lg text-sm ${TAILWIND_COLORS.BTN_PRIMARY}`}>Add Student</a>
      </div>

      <AdvancedFilters value={filters} onChange={setFilters} />
      <StudentTable rows={filtered} />
    </div>
  )
}

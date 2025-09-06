import React from 'react'
import { TAILWIND_COLORS } from '../../../shared/WebConstant'

// ---- inline widgets (same file) ----
function MetricCard({ title, value, hint }) {
  return (
    <div className={`${TAILWIND_COLORS.CARD} p-4`}>
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
      {hint && <div className="text-xs text-gray-400 mt-1">{hint}</div>}
    </div>
  )
}

function ApplicationsTrend() {
  const pts = [10,16,12,18,25,22,30,28,35,40,38,45]
  const max = Math.max(...pts)
  const path = pts.map((y,i)=>`${i===0?'M':'L'} ${i*30} ${100-(y/max)*100}`).join(' ')
  return (
    <svg width="330" height="120" viewBox="0 0 330 120" className="w-full h-36">
      <path d={path} fill="none" stroke="#0B537D" strokeWidth="2" />
      {pts.map((y,i)=>(<circle key={i} cx={i*30} cy={100-(y/max)*100} r="2.5" fill="#0B537D" />))}
    </svg>
  )
}

function SkillsChart() {
  const data = [
    { label:'Welding', value:25 },
    { label:'Fitter', value:20 },
    { label:'Electrician', value:18 },
    { label:'Plumber', value:15 },
    { label:'Automobile', value:12 },
    { label:'Fabrication', value:10 },
  ]
  const max = Math.max(...data.map(d=>d.value))
  return (
    <div className="space-y-2">
      {data.map(d=>(
        <div key={d.label}>
          <div className="text-sm text-gray-600 mb-1">{d.label}</div>
          <div className="h-2 bg-gray-100 rounded">
            <div className="h-2 rounded bg-[#0B537D]" style={{width:`${(d.value/max)*100}%`}} />
          </div>
        </div>
      ))}
    </div>
  )
}

function PlacementFunnel() {
  const steps = [
    { label:'Registered', value:12000, color:'bg-blue-500' },
    { label:'Profile Complete', value:9000, color:'bg-blue-400' },
    { label:'Applied', value:6000, color:'bg-blue-300' },
    { label:'Interviewed', value:3000, color:'bg-blue-200' },
    { label:'Placed', value:1500, color:'bg-blue-100' },
  ]
  const max = steps[0].value
  return (
    <div className="space-y-2">
      {steps.map(s=>(
        <div key={s.label} className="flex items-center gap-2">
          <div className={`h-6 ${s.color} rounded`} style={{width:`${(s.value/max)*100}%`}} />
          <span className="text-sm text-gray-600">{s.label} — {s.value}</span>
        </div>
      ))}
    </div>
  )
}

function PendingApprovals() {
  const rows = [
    { name:'A-One Industries', city:'Pune', size:'100-500 employees', applications:58 },
    { name:'MechWorks', city:'Indore', size:'50-100 employees', applications:22 },
    { name:'JS Auto', city:'Bhopal', size:'20-50 employees', applications:10 },
  ]
  return (
    <div className="text-sm">
      {rows.map((r,i)=>(
        <div key={i} className="border-t first:border-t-0 py-2">
          <div className="font-medium">{r.name}</div>
          <div className="text-gray-500">{r.city} • {r.size}</div>
          <div className="text-gray-600">Applications: {r.applications}</div>
        </div>
      ))}
    </div>
  )
}

function PendingInstitutes() {
  const rows = [
    { name:'Prime ITI', city:'Jabalpur', intake:'700+', courses:'Fitter' },
    { name:'Hi-Tech Institute', city:'Nagpur', intake:'500+', courses:'Electrician' },
    { name:'Skills Hub', city:'Bhopal', intake:'400+', courses:'Welder' },
  ]
  return (
    <div className="text-sm">
      {rows.map((r,i)=>(
        <div key={i} className="border-t first:border-t-0 py-2">
          <div className="font-medium">{r.name}</div>
          <div className="text-gray-500">{r.city} • Intake {r.intake}</div>
          <div className="text-gray-600">Courses: {r.courses}</div>
        </div>
      ))}
    </div>
  )
}
// ---- end inline widgets ----

export default function Dashboard() {
  const overview = [
    { title:'Total Students', value:'12,480', hint:'+182 this week' },
    { title:'Institutes', value:'126', hint:'+3 this week' },
    { title:'Active Jobs', value:'432', hint:'45 expiring soon' },
    { title:'New Applications', value:'1,204', hint:'Last 7 days' },
  ]

  return (
    <div className="space-y-6">
      <h1 className={`text-2xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Dashboard</h1>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {overview.map((o)=>(<MetricCard key={o.title} {...o} />))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className={`${TAILWIND_COLORS.CARD} p-4 lg:col-span-2`}>
          <div className="font-medium mb-2">Applications Trend</div>
          <ApplicationsTrend />
        </div>

        <div className={`${TAILWIND_COLORS.CARD} p-4`}>
          <div className="font-medium mb-2">Top Skills</div>
          <SkillsChart />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className={`${TAILWIND_COLORS.CARD} p-4`}>
          <div className="font-medium mb-2">Placement Funnel</div>
          <PlacementFunnel />
        </div>
        <div className={`${TAILWIND_COLORS.CARD} p-4`}>
          <div className="font-medium mb-2">Pending Approvals</div>
          <PendingApprovals />
        </div>
        <div className={`${TAILWIND_COLORS.CARD} p-4`}>
          <div className="font-medium mb-2">Pending Institutes</div>
          <PendingInstitutes />
        </div>
      </section>
    </div>
  )
}

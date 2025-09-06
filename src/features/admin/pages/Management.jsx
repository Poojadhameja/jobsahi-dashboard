import React, { useState, useEffect, useRef } from 'react'
import { TAILWIND_COLORS, COLORS } from '../../../shared/WebConstant'

function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm border ${active ? 'bg-white' : 'text-gray-700 border-gray-200 hover:bg-white'}`}
      style={active ? { color: COLORS.PRIMARY, borderColor: COLORS.PRIMARY } : { backgroundColor: COLORS.PRIMARY_30 }}
    >{label}</button>
  )
}

function SectionCard({ title, children, right }) {
  return (
    <div className={`${TAILWIND_COLORS.CARD} p-4`}>
      <div className="flex items-center justify-between mb-3">
        <div className="font-medium">{title}</div>
        {right}
      </div>
      {children}
    </div>
  )
}

function SwipeContainer({ index, setIndex, children }) {
  const containerRef = useRef(null)
  useEffect(() => { if (containerRef.current) containerRef.current.scrollTo({ left: index * containerRef.current.clientWidth, behavior: 'smooth' }) }, [index])
  return (
    <div
      ref={containerRef}
      className="w-full overflow-x-hidden"
      onWheel={(e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) return
        if (e.deltaY > 0 || e.deltaX > 0) setIndex((i) => Math.min(i + 1, React.Children.count(children) - 1))
        if (e.deltaY < 0 || e.deltaX < 0) setIndex((i) => Math.max(i - 1, 0))
      }}
    >
      <div className="flex transition-all duration-300" style={{ width: `${React.Children.count(children) * 100}%` }}>
        {React.Children.map(children, (child) => (
          <div className="w-full shrink-0 px-0 md:px-1">{child}</div>
        ))}
      </div>
    </div>
  )
}

function StudentManagement() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <SectionCard title="Students Overview">
        <div className="text-sm text-gray-600">Total Students: 15,847</div>
        <div className="text-sm text-gray-600">Active this week: 1,206</div>
      </SectionCard>
      <SectionCard title="Applications Trend">
        <div className="h-36 bg-gray-50 rounded" />
      </SectionCard>
      <SectionCard title="Top Skills">
        <div className="space-y-2">
          {["JavaScript","Python","Java","React","Node.js"].map((s, i) => (
            <div key={s} className="text-sm text-gray-600 flex items-center gap-3">
              <span className="w-24">{s}</span>
              <div className="h-2 bg-gray-100 rounded flex-1">
                <div className="h-2 rounded" style={{ width: `${(5 - i) * 18}%`, backgroundColor: COLORS.PRIMARY }} />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}

function EmployerManagement() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <SectionCard title="Active Jobs">
        <div className="text-sm text-gray-600">Open Jobs: 432</div>
      </SectionCard>
      <SectionCard title="Applications Pipeline">
        <div className="space-y-2">
          {[['Applied',3200],['Interview',760],['Offers',240],['Hired',120]].map(([label,val])=> (
            <div key={label} className="flex items-center gap-2">
              <div className="h-3 rounded" style={{ width: `${(val/3200)*100}%`, backgroundColor: COLORS.PRIMARY }} />
              <div className="text-xs text-gray-600">{label} — {val}</div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}

function InstituteManagement() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <SectionCard title="Institutes">
        <div className="text-sm text-gray-600">Total: 126 • +3 this week</div>
      </SectionCard>
      <SectionCard title="Pending Approvals">
        <div className="text-sm text-gray-600">3 pending institutes</div>
      </SectionCard>
    </div>
  )
}

export default function Management() {
  const [tab, setTab] = useState(0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Management</h1>
        <div className="flex gap-2">
          <TabButton label="Students" active={tab===0} onClick={()=>setTab(0)} />
          <TabButton label="Employers" active={tab===1} onClick={()=>setTab(1)} />
          <TabButton label="Institutes" active={tab===2} onClick={()=>setTab(2)} />
        </div>
      </div>

      <SwipeContainer index={tab} setIndex={setTab}>
        <StudentManagement />
        <EmployerManagement />
        <InstituteManagement />
      </SwipeContainer>
    </div>
  )
}



import React, { useState, useEffect, useRef } from 'react'
import { TAILWIND_COLORS, COLORS } from '../../../shared/WebConstant'
import { LuUsers, LuPlus } from 'react-icons/lu'
import { FiBarChart } from 'react-icons/fi'

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

function TabPills({ index, setIndex }) {
  const items = [
    { label: 'Student Management', icon: <LuUsers size={18} /> },
    { label: 'Employer Management', icon: <LuPlus size={18} /> },
    { label: 'Institute Management', icon: <FiBarChart size={18} /> },
  ]

  return (
    <div
      className="inline-flex rounded-full p-1 items-center gap-2 overflow-x-auto max-w-full"
      style={{ backgroundColor: '#ffffff', border: '1px solid rgba(11,83,125,0.15)' }}
    >
      {items.map((item, i) => {
        const isActive = i === index
        return (
          <button
            key={item.label}
            onClick={() => setIndex(i)}
            className="flex items-center justify-between gap-2 rounded-full px-2 py-2 whitespace-nowrap "
            style={
              isActive
                ? { backgroundColor: COLORS.GREEN_PRIMARY, color: 'white' }
                : { backgroundColor: 'white', color: COLORS.GREEN_PRIMARY, border: '1px solid rgba(11,83,125,0.15)' }
            }
          >
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={
                isActive
                  ? { backgroundColor: 'rgba(255,255,255,0.9)', color: COLORS.GREEN_PRIMARY }
                  : { backgroundColor: 'rgba(92,154,36,0.15)', color: COLORS.GREEN_PRIMARY }
              }
              aria-hidden
            >
              {item.icon}
            </span>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        )
      })}
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
      {/* <h1 className={`text-2xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Management</h1> */}

      <div className="flex justify-center">
        <TabPills index={tab} setIndex={setTab} />
      </div>

      <SwipeContainer index={tab} setIndex={setTab}>
        <StudentManagement />
        <EmployerManagement />
        <InstituteManagement />
      </SwipeContainer>
    </div>
  )
}



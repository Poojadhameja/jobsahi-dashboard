import React from 'react'
import { TAILWIND_COLORS } from '../../../shared/WebConstant'
import MetricCard from '../components/metricCard.jsx'
import { Line, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import {
  LuGraduationCap,
  LuBriefcase,
  LuUserCheck,
  LuTrendingUp,
} from 'react-icons/lu'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Filler)

function PlacementSuccess() {
  const items = [
    { value: '8.5K', label: 'Applications', sub: 'Ready for placement', color: 'bg-emerald-500' },
    { value: '3.2K', label: 'Interviews', sub: 'Shortlisted candidates', color: 'bg-blue-500' },
    { value: '1.8K', label: 'Offers', sub: 'Job offers extended', color: 'bg-amber-500' },
    { value: '1.2K', label: 'Hired', sub: 'Successfully placed', color: 'bg-rose-500' },
  ]
  return (
    <div className={`${TAILWIND_COLORS.CARD} p-5`}>
      <div className="font-medium my-4 md:mb-10 text-xl text-center md:text-left">Placement Success Funnel</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((it)=> (
          <div key={it.label} className="flex flex-col items-center text-center">
            <div className={`w-16 h-16 lg:w-24 lg:h-24   ${it.color} rounded-full flex items-center justify-center text-white text-lg lg:text-xl xl:text-2xl font-semibold shadow-sm`}>{it.value}</div>
            <div className="mt-2 text-sm md:text-xl font-semibold text-gray-800">{it.label}</div>
            <div className="text-xs md:text-lg text-gray-500">{it.sub}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const overview = [
    { title:'Total Students', count:'15,847', icon:<LuGraduationCap className="w-6 h-6" /> },
    { title:'Applied Job', count:'2,456', icon:<LuBriefcase className="w-6 h-6" /> },
    { title:'Interview Job', count:'342', icon:<LuUserCheck className="w-6 h-6" /> },
    { title:'Active Jobs', count:'23,891', icon:<LuTrendingUp className="w-6 h-6" /> },
  ]

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Applications',
        data: [1200, 1800, 1400, 2200, 2900, 3200],
        borderColor: '#0B537D',
        backgroundColor: 'rgba(11,83,125,0.12)',
        fill: true,
        tension: 0.35,
        pointRadius: 3,
      },
    ],
  }
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { stepSize: 500 } },
    },
  }

  const doughnutData = {
    labels: ['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Others'],
    datasets: [
      {
        data: [30, 18, 12, 15, 10, 15],
        backgroundColor: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#94A3B8'],
        borderWidth: 0,
      },
    ],
  }
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8 } } },
    cutout: '60%'
  }

  return (
    <div className="space-y-6 text-center">
      <div className={`${TAILWIND_COLORS.CARD} p-5`}>
        <div className="text-xl lg:text-3xl font-semibold text-[#0B537D]">Dashboard Overview</div>
        <div className="text-md mt-2 lg:text-lg text-[#0B537D]">Monitor your platform's key metrics and performance</div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {overview.map((o)=>(
          <MetricCard
            key={o.title}
            title={o.title}
            count={o.count}
            icon={o.icon}
            iconBgColor="bg-blue-50"
            iconColor="text-blue-600"
            className=""
          />
        ))}
      </section>

      <PlacementSuccess />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`${TAILWIND_COLORS.CARD} p-4  `}> 
          <div className="font-medium my-4 md:mb-10 text-xl text-center md:text-left">Applications Trend (Last 6 Months)</div>
          <div className="h-64">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        <div className={`${TAILWIND_COLORS.CARD} p-4`}>
          <div className="font-medium my-4 md:mb-10 text-xl text-center md:text-left">Top Skills in Demand</div>
          <div className="h-64">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
      </section>
    </div>
  )
}

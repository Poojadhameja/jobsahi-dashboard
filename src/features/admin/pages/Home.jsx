import React from 'react'
import { TAILWIND_COLORS } from '../../../shared/WebConstant.js'
import MetricCard, { MatrixCard, Horizontal4Cards } from '../../../shared/components/metricCard.jsx'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
import { DoubleCircleChart } from '../../../shared/components/charts'
import { getChartTooltipStyle, getChartTextColor, getChartGridColor } from '../../../shared/utils/chartColors'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler)

function PlacementSuccess() {
  const items = [
    { value: '5.5K', label: 'Applications', sub: 'Ready for placement', color: 'bg-emerald-500' },
    { value: '3.2K', label: 'Interviews', sub: 'Shortlisted candidates', color: 'bg-blue-500' },
    { value: '1.8K', label: 'Offers', sub: 'Job offers extended', color: 'bg-amber-500' },
    { value: '1.2K', label: 'Hired', sub: 'Successfully placed', color: 'bg-rose-500' },
  ]
  return (
    <div className={`${TAILWIND_COLORS.CARD} p-3 sm:p-4 md:p-5`}>
      <div className="font-medium my-3 sm:my-4 md:mb-6 lg:mb-10 text-lg sm:text-xl text-center md:text-left">Placement Success Funnel</div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {items.map((it)=> (
          <div key={it.label} className="flex flex-col items-center text-center">
            <div className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 ${it.color} rounded-full flex items-center justify-center text-white text-sm sm:text-base lg:text-lg xl:text-xl font-semibold shadow-sm`}>{it.value}</div>
            <div className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-gray-800">{it.label}</div>
            <div className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-500 text-center">{it.sub}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const overview = [
    { title:'Total Students', value:'15,847', icon:<LuGraduationCap className="w-5 h-5" /> },
    { title:'Applied Job', value:'2,456', icon:<LuBriefcase className="w-5 h-5" /> },
    { title:'Interview Job', value:'342', icon:<LuUserCheck className="w-5 h-5" /> },
    { title:'Active Jobs', value:'23,891', icon:<LuTrendingUp className="w-5 h-5" /> },
  ]

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Applications',
        data: [1200, 1800, 1400, 2200, 2900, 3200],
        borderColor: 'var(--color-primary)',
        backgroundColor: 'var(--color-primary-10)',
        fill: true,
        tension: 0.35,
        pointRadius: 3,
      },
    ],
  }
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { display: false }, 
      tooltip: { 
        mode: 'index', 
        intersect: false,
        ...getChartTooltipStyle()
      } 
    },
    scales: {
      x: { 
        grid: { display: false },
        ticks: {
          color: getChartTextColor(),
          font: {
            size: 12
          }
        }
      },
      y: { 
        grid: { color: getChartGridColor() }, 
        ticks: { 
          stepSize: 500,
          color: getChartTextColor(),
          font: {
            size: 12
          }
        } 
      },
    },
  }


  return (
    <div className="space-y-4 sm:space-y-6">
      <MatrixCard 
        title="Dashboard Overview"
        subtitle="Monitor your platform's key metrics and performance"
      />

      <Horizontal4Cards data={overview} />

      <PlacementSuccess />

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <div className={`${TAILWIND_COLORS.CARD} p-3 sm:p-4`}> 
          <div className="font-medium my-3 sm:my-4 md:mb-6 lg:mb-10 text-lg sm:text-xl text-center md:text-left">Applications Trend (Last 6 Months)</div>
          <div className="h-48 sm:h-56 md:h-64">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        <div className={`${TAILWIND_COLORS.CARD} p-3 sm:p-4`}>
          <div className="font-medium my-3 sm:my-4 md:mb-6 lg:mb-10 text-lg sm:text-xl text-center md:text-left">Top Skills in Demand</div>
          <DoubleCircleChart />
        </div>
      </section>
    </div>
  )
}

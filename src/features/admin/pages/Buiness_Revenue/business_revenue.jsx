import React from 'react'
// import { TAILWIND_COLORS } from '../../../shared/WebConstant'
// import MetricCard, { MatrixCard } from '../components/metricCard.jsx'
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


export default function BusinessRevenue() {
    return (
        <div className="p-5 space-y-5">
        Business Revenue 
        </div>
    )
}
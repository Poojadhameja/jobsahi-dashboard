import React, { useState, useEffect, useCallback } from 'react'
import { TAILWIND_COLORS } from '../../../shared/WebConstant.js'
import MetricCard, { MatrixCard, Horizontal4Cards } from '../../../shared/components/metricCard.jsx'
import { Line, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from 'chart.js'
import {
  LuGraduationCap,
  LuBriefcase,
  LuUserCheck,
  LuTrendingUp,
} from 'react-icons/lu'
import { getChartTooltipStyle, getChartTextColor, getChartGridColor, getChartColors } from '../../../shared/utils/chartColors'
import { getMethod } from '../../../service/api'
import apiService from '../services/serviceUrl'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler, ArcElement)

function PlacementSuccess({ funnelData }) {
  const items = [
    { value: funnelData?.applications || '0', label: 'Applications', sub: 'Ready for placement', color: 'bg-emerald-500' },
    { value: funnelData?.interviews || '0', label: 'Interviews', sub: 'Shortlisted candidates', color: 'bg-blue-500' },
    { 
      value: funnelData?.active_courses || funnelData?.offers || '0', 
      label: 'Courses', 
      sub: 'Courses currently active', 
      color: 'bg-amber-500' 
    },
    { value: funnelData?.hired || '0', label: 'Hired', sub: 'Successfully placed', color: 'bg-rose-500' },
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
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState({
    cards: {
      total_students: '0',
      applied_jobs: '0',
      interview_jobs: '0',
      active_jobs: '0',
      active_courses: '0'
    },
    placement_funnel: {
      applications: '0',
      interviews: '0',
      active_courses: '0',
      hired: '0'
    },
    applications_trend: [],
    top_jobs_in_demand: []
  })

  // Format number with commas
  const formatNumber = (num) => {
    if (!num) return '0'
    return Number(num).toLocaleString('en-IN')
  }

  // Fetch dashboard data
  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true)
      const response = await getMethod({
        apiUrl: apiService.adminDashboard
      })

      console.log('📊 Admin Dashboard API Response:', response)

      const isSuccess = response?.status === true || response?.status === 'success' || response?.success === true

      if (isSuccess && response?.data) {
        setDashboardData({
          cards: response.data.cards || {
            total_students: '0',
            applied_jobs: '0',
            interview_jobs: '0',
            active_jobs: '0',
            active_courses: '0'
          },
          placement_funnel: response.data.placement_funnel || {
            applications: '0',
            interviews: '0',
            active_courses: '0',
            hired: '0'
          },
          applications_trend: response.data.applications_trend || [],
          top_jobs_in_demand: response.data.top_jobs_in_demand || []
        })
      } else {
        console.error('❌ Failed to fetch dashboard data:', response?.message)
      }
    } catch (error) {
      console.error('❌ Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  const overview = [
    { title:'Total Students', value: formatNumber(dashboardData.cards.total_students), icon:<LuGraduationCap className="w-5 h-5" /> },
    { title:'Applied Job', value: formatNumber(dashboardData.cards.applied_jobs), icon:<LuBriefcase className="w-5 h-5" /> },
    { title:'Interview Job', value: formatNumber(dashboardData.cards.interview_jobs), icon:<LuUserCheck className="w-5 h-5" /> },
    { title:'Active Jobs', value: formatNumber(dashboardData.cards.active_jobs), icon:<LuTrendingUp className="w-5 h-5" /> },
  ]

  const palette = getChartColors()

  // Get last 6 months dynamically
  const getLast6Months = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const currentDate = new Date()
    const last6Months = []
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
      last6Months.push(months[date.getMonth()])
    }
    
    return last6Months
  }

  // Process applications trend data for chart - always show last 6 months
  const processTrendData = () => {
    const last6Months = getLast6Months()
    const dataMap = new Map()
    
    // Map API data by month name (handle different formats)
    if (dashboardData.applications_trend && dashboardData.applications_trend.length > 0) {
      dashboardData.applications_trend.forEach(item => {
        let monthName = item.month_name || item.month || item.label || ''
        // Normalize month name to match our format (first 3 letters)
        if (monthName.length > 3) {
          monthName = monthName.substring(0, 3)
        }
        monthName = monthName.charAt(0).toUpperCase() + monthName.slice(1).toLowerCase()
        const value = Number(item.total || item.value || item.count || 0)
        dataMap.set(monthName, value)
      })
    }
    
    // Create data array for last 6 months, using 0 if no data
    const data = last6Months.map(month => dataMap.get(month) || 0)
    
    return { labels: last6Months, data }
  }

  const trendData = processTrendData()

  const lineData = {
    labels: trendData.labels,
    datasets: [
      {
        label: 'Applications',
        data: trendData.data,
        borderColor: palette.info,
        backgroundColor: 'rgba(12, 90, 141, 0.15)',
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        pointBackgroundColor: palette.info,
        pointBorderColor: palette.info,
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
        beginAtZero: true,
        ticks: { 
          stepSize: trendData.data.length > 0 && Math.max(...trendData.data) > 0 
            ? Math.max(1, Math.ceil(Math.max(...trendData.data) / 5)) 
            : 1,
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

      <PlacementSuccess funnelData={dashboardData.placement_funnel} />

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <div className={`${TAILWIND_COLORS.CARD} p-3 sm:p-4`}> 
          <div className="font-medium my-3 sm:my-4 md:mb-6 lg:mb-10 text-lg sm:text-xl text-center md:text-left">Applications Trend (Last 6 Months)</div>
          <div className="h-48 sm:h-56 md:h-64">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        <div className={`${TAILWIND_COLORS.CARD} p-3 sm:p-4`}>
          <div className="font-medium my-3 sm:my-4 md:mb-6 lg:mb-10 text-lg sm:text-xl text-center md:text-left">Top Jobs in Demand</div>
          <div className="h-48 sm:h-56 md:h-64">
            {dashboardData.top_jobs_in_demand && dashboardData.top_jobs_in_demand.length > 0 ? (
              <Pie 
                data={{
                  labels: dashboardData.top_jobs_in_demand.map(job => job.title || 'N/A'),
                  datasets: [{
                    data: dashboardData.top_jobs_in_demand.map(job => Number(job.total_applications || 0)),
                    backgroundColor: [
                      palette.info,
                      palette.success,
                      palette.warning,
                      palette.error,
                      palette.secondary,
                      '#8B5CF6',
                      '#EC4899',
                      '#14B8A6',
                    ],
                    borderWidth: 0,
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                          size: 11,
                          weight: '400'
                        },
                        color: getChartTextColor(),
                        boxWidth: 6,
                      }
                    },
                    tooltip: {
                      ...getChartTooltipStyle(),
                      callbacks: {
                        label: function(context) {
                          const label = context.label || ''
                          const value = context.parsed
                          return `${label}: ${value} application${value !== 1 ? 's' : ''}`
                        }
                      }
                    }
                  }
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No jobs data available
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

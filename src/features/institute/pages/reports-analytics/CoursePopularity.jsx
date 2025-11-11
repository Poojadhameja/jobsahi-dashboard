import React, { useEffect, useState } from 'react'
import { PieChart } from '../../../../shared/components/charts'
import { getMethod } from '../../../../service/api'
import apiService from '../../services/serviceUrl'

export default function CoursePopularity() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 2,
      },
    ],
  })

  const handleExport = () => {
    console.log('Exporting course popularity data...')
  }

  const getColors = (count) => {
    const palette = ['#16A34A', '#F59E0B', '#3B82F6', '#EC4899', '#22C55E', '#8B5CF6', '#E11D48']
    return Array.from({ length: count }, (_, i) => palette[i % palette.length])
  }

  useEffect(() => {
    const fetchCoursePopularity = async () => {
      try {
        const res = await getMethod({ apiUrl: apiService.INSTITUTE_REPORT })

        if (res?.status && Array.isArray(res?.data?.course_popularity_chart)) {
          const rows = res.data.course_popularity_chart

          const labels = rows.map(item => {
            const name = item.course_name || 'N/A'
            const total = Number(item.total_enrolled || 0)
            return `${name} (${total})`
          })

          const data = rows.map(item => Number(item.total_enrolled || 0))
          const colors = getColors(rows.length)

          setChartData({
            labels,
            datasets: [
              {
                label: 'Total Enrolled Students',
                data,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 2,
              },
            ],
          })
        } else {
          console.error('No course_popularity_chart data found in API response')
        }
      } catch (err) {
        console.error('Error fetching course popularity chart:', err)
      }
    }

    fetchCoursePopularity()
  }, [])

  return (
    <PieChart
      data={chartData}
      title="Course Popularity"
      subtitle="Institute Performance Dashboard"
      showExport={true}
      onExport={handleExport}
    />
  )
}

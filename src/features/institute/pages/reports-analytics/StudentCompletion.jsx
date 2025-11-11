import React, { useEffect, useState } from 'react'
import { BarChart } from '../../../../shared/components/charts'
import { colors } from '../../../../shared/colors'
import { getMethod } from '../../../../service/api'
import apiService from '../../services/serviceUrl'

export default function StudentCompletion() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Completed Students',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  })

  const handleExport = () => {
    console.log('Exporting student completion data...')
  }

  useEffect(() => {
    const fetchStudentCompletion = async () => {
      try {
        // ✅ Fetch data from backend API
        const res = await getMethod({ apiUrl: apiService.INSTITUTE_REPORT })

        // ✅ Check if student completion chart data exists
        if (res?.status && Array.isArray(res?.data?.student_completion_chart)) {
          const chartRows = res.data.student_completion_chart

          // ✅ Extract labels & data dynamically
          const labels = chartRows.map(item => item.course_name || 'N/A')
          const data = chartRows.map(item => Number(item.completed_students || 0))
          const barColor = colors?.primary?.darkBlue || '#1D4ED8'

          // ✅ Prepare data for Bar Chart
          setChartData({
            labels,
            datasets: [
              {
                label: 'Completed Students',
                data,
                backgroundColor: labels.map(() => barColor),
                borderColor: labels.map(() => barColor),
                borderWidth: 1,
              },
            ],
          })
        } else {
          console.error('⚠️ No student_completion_chart data found in API response')
        }
      } catch (error) {
        console.error('❌ Error fetching student completion chart:', error)
      }
    }

    fetchStudentCompletion()
  }, [])

  return (
    <BarChart
      data={chartData}
      title="Student Completion"
      subtitle="Institute Performance Dashboard"
      showExport={true}
      onExport={handleExport}
    />
  )
}

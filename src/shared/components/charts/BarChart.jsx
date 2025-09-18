import React, { useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { LuDownload } from 'react-icons/lu'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const BarChart = ({ title, data, onDownload }) => {
  const chartRef = useRef(null)

  const handleDownload = () => {
    if (chartRef.current) {
      const chart = chartRef.current
      const imageURL = chart.toBase64Image()
      const link = document.createElement('a')
      link.download = `${title.replace(/\s+/g, '_')}_chart.png`
      link.href = imageURL
      link.click()
    }
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          font: {
            size: 12
          },
          stepSize: 65
        }
      },
    },
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button
          onClick={handleDownload}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LuDownload className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <div className="h-80">
        <Bar ref={chartRef} data={data} options={options} />
      </div>
    </div>
  )
}

export default BarChart

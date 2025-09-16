import React, { useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { FaBriefcase, FaUsers, FaCalendarAlt, FaEnvelope, FaCheck, FaTimes, FaEllipsisV } from 'react-icons/fa'
import TradesPieChart from '../../../shared/components/charts/TradesPieChart'

ChartJS.register(ArcElement, Tooltip, Legend)

const Dashboard = () => {
  // Metric cards data matching the image
  const metricCards = [
    {
      title: 'Jobs Posted',
      value: '79',
      color: 'bg-green-500',
      icon: FaBriefcase 
    },
    {
      title: 'Applied Job',
      value: '7',
      color: 'bg-green-400',
      icon: FaUsers
    },
    {
      title: 'Interview Job',
      value: '160',
      color: 'bg-orange-500',
      icon: FaCalendarAlt
    },
    {
      title: 'Interview Job',
      value: '18',
      color: 'bg-blue-400',
      icon: FaEnvelope
    }
  ]

  // Calendar data for August with interview information
  const calendarDays = [
    { day: 'MON', date: 1 }, { day: 'TUE', date: 2 }, { day: 'WED', date: 3 }, { day: 'THU', date: 4 }, { day: 'FRI', date: 5 }, { day: 'SAT', date: 6 }, { day: 'SUN', date: 7 },
    { day: 'MON', date: 8 }, { day: 'TUE', date: 9 }, { day: 'WED', date: 10, hasInterview: true }, { day: 'THU', date: 11 }, { day: 'FRI', date: 12 }, { day: 'SAT', date: 13 }, { day: 'SUN', date: 14 },
    { day: 'MON', date: 15 }, { day: 'TUE', date: 16 }, { day: 'WED', date: 17, hasInterview: true }, { day: 'THU', date: 18 }, { day: 'FRI', date: 19 }, { day: 'SAT', date: 20 }, { day: 'SUN', date: 21 },
    { day: 'MON', date: 22 }, { day: 'TUE', date: 23 }, { day: 'WED', date: 24 }, { day: 'THU', date: 25, hasInterview: true }, { day: 'FRI', date: 26 }, { day: 'SAT', date: 27 }, { day: 'SUN', date: 28 },
    { day: 'MON', date: 29 }, { day: 'TUE', date: 30 }, { day: 'WED', date: 31 }
  ]

  // Interview details for different dates
  const interviewDetailsData = {
    10: {
      name: 'Aarti Nathani',
      jobTitle: 'Electrician Apprentice',
      mode: 'Offline (Address...)',
      time: '2pm',
      status: 'Confirmed'
    },
    17: {
      name: 'Pooja Dhameja',
      jobTitle: 'Software Developer',
      mode: 'Online (Zoom)',
      time: '10am',
      status: 'Pending'
    },
    25: {
      name: 'Yuvraj Basine',
      jobTitle: 'Data Analyst',
      mode: 'Offline (Office)',
      time: '3pm',
      status: 'Confirmed'
    }
  }

  // State for selected date
  const [selectedDate, setSelectedDate] = useState(10)

  // Pie chart data for trades
  const tradesData = {
    labels: ['Civil', 'Civil', 'Civil', 'Civil', 'Civil', 'Civil', 'Civil', 'Civil'],
    datasets: [
      {
        data: [60, 10, 8, 7, 6, 4, 3, 2],
        backgroundColor: [
          '#10B981', // green
          '#34D399', // light green
          '#F59E0B', // orange
          '#FBBF24', // yellow
          '#60A5FA', // light blue
          '#3B82F6', // dark blue
          '#8B5CF6', // purple
          '#EC4899'  // pink
        ],
        borderWidth: 0
      }
    ]
  }

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true
      }
    }
  }

  // Total applicants cards
  const applicantCards = [
    {
      title: 'Electrician Apprentice',
      applications: '64 Applications',
      newCount: '06 new',
      icon: FaBriefcase
    },
    {
      title: 'Electrician Apprentice',
      applications: '64 Applications',
      newCount: '06 new',
      icon: FaBriefcase
    }
  ]

  // Recent applicants table data
  const recentApplicants = [
    {
      id: 1,
      name: 'Aarti Nathani',
      jobTitle: 'Electrician Apprentice',
      datePosted: '12-05-25',
      avatar: 'AN'
    },
    {
      id: 2,
      name: 'Pooja Dhameja',
      jobTitle: 'Electrician Apprentice',
      datePosted: '12-05-25',
      avatar: 'PD'
    },
    {
      id: 3,
      name: 'Yuvraj Basine',
      jobTitle: 'Electrician Apprentice',
      datePosted: '12-05-25',
      avatar: 'YB'
    },
    {
      id: 4,
      name: 'Himanshu Shrirang',
      jobTitle: 'Electrician Apprentice',
      datePosted: '12-05-25',
      avatar: 'HS'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Hi! Brightorial</h1>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metricCards.map((card, index) => {
          const IconComponent = card.icon
          return (
            <div key={index} className={`${card.color} rounded-lg p-6 text-white shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                  <p className="text-4xl font-bold mb-2">{card.value}</p>
                  <p className="text-white/90 text-sm">{card.title}</p>
              </div>
                <IconComponent className="text-3xl text-white/80" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Left Column - Calendar and Interview Details */}
        <div className="space-y-6">
          {/* August Calendar */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">August</h3>
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-gray-500 mb-1">{day.day}</div>
                  <button
                    onClick={() => setSelectedDate(day.date)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all duration-200 ${
                      selectedDate === day.date
                        ? 'bg-green-500 text-white shadow-lg' 
                        : day.hasInterview
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-2 border-blue-300'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {day.date}
                  </button>
                  {day.hasInterview && selectedDate !== day.date && (
                    <div className="w-1 h-1 bg-blue-500 rounded-full mx-auto mt-1"></div>
                  )}
                </div>
              ))}
          </div>
        </div>

          {/* Candidate Interview Details */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-blue-900">Candidate Interview Details</h3>
          </div>
            <div className="p-6 max-h-64 overflow-y-auto">
              {interviewDetailsData[selectedDate] ? (
            <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Name:</p>
                    <p className="text-base font-semibold text-gray-900">{interviewDetailsData[selectedDate].name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Job Title:</p>
                    <p className="text-base font-semibold text-gray-900">{interviewDetailsData[selectedDate].jobTitle}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Mode of Interview:</p>
                    <p className="text-base font-semibold text-gray-900">{interviewDetailsData[selectedDate].mode}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Time:</p>
                    <p className="text-base font-semibold text-gray-900">{interviewDetailsData[selectedDate].time}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Status:</p>
                    <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                      interviewDetailsData[selectedDate].status === 'Confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {interviewDetailsData[selectedDate].status}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-3">
                    <FaCalendarAlt className="text-4xl mx-auto" />
                  </div>
                  <p className="text-gray-500 text-sm font-medium">No interview scheduled for August {selectedDate}</p>
                  <p className="text-gray-400 text-xs mt-2">Click on a date with a blue indicator to view interview details</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Trades Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Total applicants this week by trades wise</h3>
              <span className="text-sm text-gray-500">Nov, 01-07</span>
            </div>
            
            <TradesPieChart />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="space-y-6">
        {/* Total Applicants Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {applicantCards.map((card, index) => {
            const IconComponent = card.icon
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <IconComponent className="text-gray-600 text-xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{card.title}</h4>
                    <p className="text-sm text-gray-600">{card.applications}</p>
                  </div>
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    {card.newCount}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Recent Applicants Table */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Recent Applicants</h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                All Applicants
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name of applicants
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date of posted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentApplicants.map((applicant) => (
                  <tr key={applicant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium text-gray-600 mr-3">
                          {applicant.avatar}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{applicant.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {applicant.jobTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {applicant.datePosted}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="bg-green-100 text-green-800 px-3 py-1 rounded text-xs hover:bg-green-200">
                          <FaCheck className="inline mr-1" />
                          Accept
          </button>
                        <button className="bg-red-100 text-red-800 px-3 py-1 rounded text-xs hover:bg-red-200">
                          <FaTimes className="inline mr-1" />
                          Decline
          </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <FaEllipsisV />
          </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

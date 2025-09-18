import React, { useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { FaBriefcase, FaUsers, FaCalendarAlt, FaEnvelope, FaCheck, FaTimes, FaEllipsisV, FaWrench } from 'react-icons/fa'
import { TradesPieChart } from '../../../shared/components/charts'
import { Horizontal4Cards } from '../../../shared/components/metricCard'
import Calendar from '../../../shared/components/Calendar'
import DataTable from '../../../shared/components/DataTable'

ChartJS.register(ArcElement, Tooltip, Legend)

const Dashboard = () => {
  // Metric cards data for Horizontal4Cards
  const metricCardsData = [
    {
      title: 'Jobs Posted',
      value: '79',
      icon: <FaBriefcase className="w-5 h-5" />
    },
    {
      title: 'Applied Job',
      value: '7',
      icon: <FaUsers className="w-5 h-5" />
    },
    {
      title: 'Interview Job',
      value: '160',
      icon: <FaCalendarAlt className="w-5 h-5" />
    },
    {
      title: 'Interview Job',
      value: '18',
      icon: <FaEnvelope className="w-5 h-5" />
    }
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
    },
    {
      title: 'Plumber Assistant',
      applications: '42 Applications',
      newCount: '03 new',
      icon: FaWrench
    },
    {
      title: 'Carpenter Helper',
      applications: '38 Applications',
      newCount: '02 new',
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

  // Table configuration
  const tableColumns = [
    { key: 'name', header: 'Name of applicants' },
    { key: 'jobTitle', header: 'Job Title' },
    { key: 'datePosted', header: 'Date of posted' }
  ]

  const tableActions = [
    {
      label: 'Accept',
      variant: 'success',
      onClick: (row) => console.log('Accept', row)
    },
    {
      label: 'Decline',
      variant: 'danger',
      onClick: (row) => console.log('Decline', row)
    }
  ]

  // Dropdown handlers
  const handleViewDetails = (row) => {
    console.log('View Details for:', row)
    // Add your view details logic here
  }

  const handleDownloadCV = (row) => {
    console.log('Download CV for:', row)
    // Add your download CV logic here
  }

  return (
    <div className="min-h-screen bg-[#F6FAFF]">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-3xl font-semibold text-[#0B537D]">Hi! Brightorial</h1>
      </div>

      {/* Metric Cards */}
      <Horizontal4Cards data={metricCardsData} className="mb-5" />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        {/* Left Column - Calendar and Interview Details */}
        <div className="space-y-4 bg-white rounded-lg border border-[#0B537D3C]">
            {/* Calendar */}
            <Calendar 
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              interviewDates={[10, 17, 25]}
            />

          {/* Candidate Interview Details */}
          <div className="">
            <div className="px-5 py-2 ">
              <h3 className="text-lg font-bold text-[#0B537D]">Candidate Interview Details</h3>
            </div>
            <div className="flex flex-col h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-white-300 scrollbar-track-white-100">
            <div className="p-2 md:p-4 border border-[#0B537D3C] m-4 rounded-lg ">
              {interviewDetailsData[selectedDate] ? (
                <div className="space-y-4 ">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Name:</span>
                    <span className="text-sm font-semibold text-gray-900">{interviewDetailsData[selectedDate].name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Job Title:</span>
                    <span className="text-sm font-semibold text-gray-900">{interviewDetailsData[selectedDate].jobTitle}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Mode of Interview:</span>
                    <span className="text-sm font-semibold text-gray-900">{interviewDetailsData[selectedDate].mode}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Time:</span>
                    <span className="text-sm font-semibold text-gray-900">{interviewDetailsData[selectedDate].time}</span>
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
            <div className="p-2 md:p-4 border border-[#0B537D3C] m-4 rounded-lg ">
              {interviewDetailsData[selectedDate] ? (
                <div className="space-y-4 ">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Name:</span>
                    <span className="text-sm font-semibold text-gray-900">{interviewDetailsData[selectedDate].name}</span>
          </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Job Title:</span>
                    <span className="text-sm font-semibold text-gray-900">{interviewDetailsData[selectedDate].jobTitle}</span>
      </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Mode of Interview:</span>
                    <span className="text-sm font-semibold text-gray-900">{interviewDetailsData[selectedDate].mode}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Time:</span>
                    <span className="text-sm font-semibold text-gray-900">{interviewDetailsData[selectedDate].time}</span>
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
        </div>

        {/* Right Column - Trades Chart */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-lg border border-[#0B537D3C] p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Total applicants this week by trades wise</h3>
              <span className="text-sm text-gray-500">Nov, 01-07</span>
            </div>
            
            <TradesPieChart />
          </div>
          
          {/* Total Applicants Section */}
          <div className="bg-white rounded-lg border border-[#0B537D3C] p-6">
            <h3 className="text-xl font-bold text-[#0B537D] mb-6">Total Applicants</h3>
            
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {applicantCards.map((card, index) => {
                const IconComponent = card.icon
                return (
                  <div key={index} className="bg-[#F6FAFF] border border-[#0B537D3C] rounded-lg p-4 min-w-[280px] flex-shrink-0">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="text-gray-600 text-sm" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-700 text-sm mb-1">{card.title}</h4>
                        <div className="flex items-baseline space-x-2">
                          <span className="text-2xl font-bold text-gray-700">{card.applications.split(' ')[0]}</span>
                          <span className="text-sm text-gray-500">Aplications</span>
                        </div>
                      </div>
                      <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {card.newCount}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
      </div>

        
      </div>

      {/* Bottom Section */}
      

        {/* Recent Applicants Table */}
        <DataTable
          title="Recent Applicants"
          columns={tableColumns}
          data={recentApplicants}
          actions={tableActions}
          onViewDetails={handleViewDetails}
          onDownloadCV={handleDownloadCV}
        />
      {/* </div> */}
    </div>
  )
}

export default Dashboard

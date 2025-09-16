import React from 'react'

const Dashboard = () => {
  // Sample data for the dashboard
  const stats = [
    {
      title: 'Total Jobs Posted',
      value: '79',
      change: '+12%',
      changeType: 'positive',
      icon: '📋',
      color: 'bg-blue-500'
    },
    {
      title: 'Applications Received',
      value: '1,247',
      change: '+8%',
      changeType: 'positive',
      icon: '👥',
      color: 'bg-green-500'
    },
    {
      title: 'Interviews Scheduled',
      value: '160',
      change: '+15%',
      changeType: 'positive',
      icon: '📅',
      color: 'bg-orange-500'
    },
    {
      title: 'Messages Sent',
      value: '324',
      change: '+5%',
      changeType: 'positive',
      icon: '💬',
      color: 'bg-purple-500'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'application',
      title: 'New Application Received',
      description: 'Aarti Nathani applied for Electrician Apprentice',
      time: '2 hours ago',
      icon: '👥'
    },
    {
      id: 2,
      type: 'interview',
      title: 'Interview Scheduled',
      description: 'Interview with Pooja Dhameja at 2:00 PM',
      time: '4 hours ago',
      icon: '📅'
    },
    {
      id: 3,
      type: 'job',
      title: 'Job Posted',
      description: 'Software Developer position published',
      time: '1 day ago',
      icon: '📋'
    },
    {
      id: 4,
      type: 'message',
      title: 'Message Sent',
      description: 'Follow-up message sent to candidates',
      time: '2 days ago',
      icon: '💬'
    }
  ]

  const upcomingInterviews = [
    {
      id: 1,
      candidate: 'Aarti Nathani',
      position: 'Electrician Apprentice',
      time: '2:00 PM',
      date: 'Today',
      status: 'confirmed',
      mode: 'Offline'
    },
    {
      id: 2,
      candidate: 'Pooja Dhameja',
      position: 'Software Developer',
      time: '3:30 PM',
      date: 'Today',
      status: 'pending',
      mode: 'Online'
    },
    {
      id: 3,
      candidate: 'Yuvraj Basine',
      position: 'Data Analyst',
      time: '10:00 AM',
      date: 'Tomorrow',
      status: 'confirmed',
      mode: 'Online'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Recruiter!</h1>
        <p className="text-blue-100">Here's what's happening with your recruitment activities today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`${stat.color} text-white p-3 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              📈 Recent Activities
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              ⏰ Upcoming Interviews
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <div key={interview.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{interview.candidate}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      interview.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {interview.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{interview.position}</p>
                  <p className="text-sm text-gray-500">{interview.date} at {interview.time}</p>
                  <p className="text-xs text-gray-400 mt-1">{interview.mode}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <span className="text-2xl mr-2">📋</span>
            <span className="text-gray-600 font-medium">Post New Job</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <span className="text-2xl mr-2">👥</span>
            <span className="text-gray-600 font-medium">View Candidates</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <span className="text-2xl mr-2">📅</span>
            <span className="text-gray-600 font-medium">Schedule Interview</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MetricCard from '../components/metricCard.jsx';
import NavigationTabs from '../../../shared/components/navigation';
import { TAILWIND_COLORS } from '../../../shared/WebConstant';

const MessagingCampaignsView = () => {
  // Tabs synced to URL (?tab=messaging|analytics)
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeNavTab, setActiveNavTab] = useState(() => searchParams.get('tab') || 'messaging');
  const [notificationForm, setNotificationForm] = useState({
    title: '',
    type: '',
    message: ''
  });

  useEffect(() => {
    const current = searchParams.get('tab');
    if (current !== activeNavTab) {
      const next = new URLSearchParams(searchParams);
      next.set('tab', activeNavTab);
      setSearchParams(next, { replace: true });
    }
  }, [activeNavTab, searchParams, setSearchParams]);

  // Navigation tabs data for messaging campaigns
  const navigationTabs = [
    {
      id: 'messaging',
      label: 'Messaging & Campaigns',
      icon: () => (
        <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      )
    },
    {
      id: 'analytics',
      label: 'Campaign Analytics',
      icon: () => (
        <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      )
    }
    
  ];

  // Sample data based on the image
  const recentNotifications = [
    {
      id: 1,
      title: 'New job opportunities available',
      recipients: '123 users',
      time: '2 hour ago',
      tags: ['job alert', 'Delivered']
    },
    {
      id: 2,
      title: 'System maintenance tonight',
      recipients: 'All users',
      time: '1 day ago',
      tags: ['system', 'Delivered']
    },
    {
      id: 3,
      title: 'Complete your profile',
      recipients: '55 users',
      time: '2 days ago',
      tags: ['reminder', 'Delivered']
    }
  ];

  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    // Handle notification submission
    console.log('Notification submitted:', notificationForm);
    setNotificationForm({ title: '', type: '', message: '' });
  };

  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Messaging & Campaigns</h1>
          <p className="text-gray-600 mt-1">Manage notifications, campaigns, and templates</p>
        </div>
        <button className={`${TAILWIND_COLORS.BTN_PRIMARY} px-4 py-2 rounded-lg transition-colors duration-200`}>
          New Campaign
        </button>
      </div>

      {/* Campaign Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Active Campaigns"
            count="15"
            icon="📊"
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            countColor="text-gray-900"
            titleColor="text-gray-600"
          />
          
          <MetricCard
            title="Total Notifications"
            count="1,250"
            icon="🔔"
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            countColor="text-gray-900"
            titleColor="text-gray-600"
          />
          
          <MetricCard
            title="User Segments"
            count="5"
            icon="👥"
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
            countColor="text-gray-900"
            titleColor="text-gray-600"
          />
          
          <MetricCard
            title="Templates"
            count="22"
            icon="📄"
            iconBgColor="bg-orange-100"
            iconColor="text-orange-600"
            countColor="text-gray-900"
            titleColor="text-gray-600"
          />
      </div>

      {/* Navigation Tabs */}
      <NavigationTabs 
        navigationTabs={navigationTabs}
        activeNavTab={activeNavTab}
        setActiveNavTab={setActiveNavTab}
      />

      {/* Content based on active navigation tab */}
      {activeNavTab === 'messaging' && (
        <div>
          {/* Campaign Type Tabs */}
     
      {/* System-wide Push Notifications Form */}
      <div className={`${TAILWIND_COLORS.CARD} p-6`}>
          <h2 className={`text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>System-wide Push Notifications</h2>
          <p className="text-sm text-gray-500 mt-1 mb-6">System-wide Push Notifications</p>

          <form onSubmit={handleNotificationSubmit} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notification Title</label>
                <input
                  type="text"
                  value={notificationForm.title}
                  onChange={(e) => setNotificationForm({...notificationForm, title: e.target.value})}
                  placeholder="Enter notification title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={notificationForm.type}
                  onChange={(e) => setNotificationForm({...notificationForm, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                >
                  <option value="">select notification type</option>
                  <option value="job-alert">Job Alert</option>
                  <option value="system">System</option>
                  <option value="reminder">Reminder</option>
                  <option value="promotion">Promotion</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                value={notificationForm.message}
                onChange={(e) => setNotificationForm({...notificationForm, message: e.target.value})}
                placeholder="Enter your notification message"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className={`flex items-center justify-center space-x-2 px-4 md:px-6 py-2 rounded-lg transition-colors duration-200 text-sm md:text-base ${TAILWIND_COLORS.BTN_PRIMARY}`}
              >
                <span>✔</span>
                <span>Send Now</span>
              </button>
              <button
                type="button"
                className={`flex items-center justify-center space-x-2 px-4 md:px-6 py-2 rounded-lg transition-colors duration-200 text-sm md:text-base bg-white border border-[#5B9821] text-[#5B9821] hover:bg-green-50`}
              >
                <span>📅</span>
                <span>Schedule</span>
              </button>
            </div>
          </form>
      </div>

      {/* Recent System-wide Push Notifications */}
      <div className={`${TAILWIND_COLORS.CARD} p-6`}>
          <h2 className={`text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-6`}>System-wide Push Notifications</h2>

          <div className="space-y-4">
            {recentNotifications.map((notification) => (
              <div key={notification.id} className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200">
                <span className="text-xl">🔔</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{notification.title}</p>
                  <p className="text-xs text-gray-500">{notification.recipients} - {notification.time}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {notification.tags.map((tag, index) => {
                    const isDelivered = tag.toLowerCase() === 'delivered';
                    const base = 'px-3 py-1 text-xs font-medium rounded-1/2';
                    const style = isDelivered
                      ? 'bg-white border border-[#5B9821] text-[#5B9821]'
                      : 'bg-[#5B9821] text-white';
                    return (
                      <span key={index} className={`${base} ${style}`}>
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      )}

      {/* Campaign Analytics Content */}
      {activeNavTab === 'analytics' && (
        <div className={`${TAILWIND_COLORS.CARD} p-6`}>
          <h2 className={`text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-6`}>Campaign Analytics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Open Rate</p>
                  <p className="text-2xl font-bold text-blue-900">24.5%</p>
                </div>
                <div className="text-2xl">📊</div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Click Rate</p>
                  <p className="text-2xl font-bold text-green-900">12.3%</p>
                </div>
                <div className="text-2xl">👆</div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Conversion</p>
                  <p className="text-2xl font-bold text-purple-900">8.7%</p>
                </div>
                <div className="text-2xl">🎯</div>
              </div>
            </div>
          </div>

          <div className="text-center py-8">
            <div className="text-6xl mb-4">📈</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Detailed Analytics</h3>
            <p className="text-gray-600 mb-6">View comprehensive campaign performance metrics and insights.</p>
            <button className="px-6 py-3 bg-[#5B9821] text-white rounded-lg hover:bg-[#4A7D1A] transition-colors duration-200">
              View Full Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagingCampaignsView;

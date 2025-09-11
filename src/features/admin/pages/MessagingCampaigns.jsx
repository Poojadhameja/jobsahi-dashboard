import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MetricCard from '../components/metricCard.jsx';
import NavigationTabs from '../../../shared/components/navigation';
import { TAILWIND_COLORS } from '../../../shared/WebConstant';
import Button from '../../../shared/components/Button.jsx';

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
      label: ' System-wide Push Notifications',
      icon: () => (
        <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      )
    },
    {
      id: 'segments',
      label: 'Segment-Based Messaging',
      icon: () => (
        <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      )
    },
    {
      id: 'analytics',
      label: ' Notification Templates Manager',
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
      <div className="text-center px-2 sm:px-0">
        <h1 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY} break-words`}>Messaging & Campaigns</h1>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 break-words">Manage notifications, campaigns, and templates</p>
      </div>

      {/* Campaign Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
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
        <div className="space-y-6">

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Button 
              variant="outline" 
              size="sm"
              className="w-full sm:w-auto text-xs sm:text-sm"
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="sm:w-4 sm:h-4">
                  <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
                </svg>
              }
            >
              Filter
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              className="w-full sm:w-auto text-xs sm:text-sm"
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="sm:w-4 sm:h-4">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
              }
            >
              New Campaign
            </Button>
          </div>

          {/* System-wide Push Notifications Form */}
          <div className={`${TAILWIND_COLORS.CARD} p-3 sm:p-4 md:p-6`}>
            <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
              <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#5B9821]/10 flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#5B9821" className="sm:w-4 sm:h-4">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className={`text-lg sm:text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} truncate`}>System-wide Push Notifications</h2>
                <p className="text-xs sm:text-sm text-gray-500 truncate">System-wide Push Notifications</p>
              </div>
            </div>

            <form onSubmit={handleNotificationSubmit} className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Notification Title</label>
                  <input
                    type="text"
                    value={notificationForm.title}
                    onChange={(e) => setNotificationForm({...notificationForm, title: e.target.value})}
                    placeholder="Enter notification title"
                    className="w-full min-h-[40px] sm:min-h-[44px] px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs sm:text-sm md:text-base transition-all duration-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Type</label>
                  <select
                    value={notificationForm.type}
                    onChange={(e) => setNotificationForm({...notificationForm, type: e.target.value})}
                    className="w-full min-h-[40px] sm:min-h-[44px] px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs sm:text-sm md:text-base transition-all duration-200"
                  >
                    <option value="">Select notification type</option>
                    <option value="job-alert">Job Alert</option>
                    <option value="system">System</option>
                    <option value="reminder">Reminder</option>
                    <option value="promotion">Promotion</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Message</label>
                <textarea
                  value={notificationForm.message}
                  onChange={(e) => setNotificationForm({...notificationForm, message: e.target.value})}
                  placeholder="Enter your notification message"
                  rows="3"
                  className="w-full min-h-[80px] sm:min-h-[100px] px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs sm:text-sm md:text-base resize-y transition-all duration-200"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="sm"
                  className="w-full sm:w-auto min-h-[40px] sm:min-h-[44px] text-xs sm:text-sm"
                  icon={
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="sm:w-4 sm:h-4">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                  }
                >
                  Send Now
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  className="w-full sm:w-auto min-h-[40px] sm:min-h-[44px] text-xs sm:text-sm"
                  icon={
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="sm:w-4 sm:h-4">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                  }
                >
                  Schedule
                </Button>
              </div>
            </form>
          </div>

          {/* Recent System-wide Push Notifications */}
          <div className={`${TAILWIND_COLORS.CARD} p-3 sm:p-4 md:p-6`}>
            <h2 className={`text-lg sm:text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4 sm:mb-6`}>System-wide Push Notifications</h2>

            <div className="space-y-3 sm:space-y-4">
              {recentNotifications.map((notification) => (
                <div key={notification.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-all duration-200 gap-2 sm:gap-3">
                  <div className="flex items-start sm:items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                    <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#5B9821]/10 flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#5B9821" className="sm:w-[18px] sm:h-[18px]">
                        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{notification.title}</p>
                      <p className="text-[10px] sm:text-xs text-gray-500 mt-1">{notification.recipients} - {notification.time}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-2 justify-start sm:justify-end">
                    {notification.tags.map((tag, index) => {
                      const isDelivered = tag.toLowerCase() === 'delivered';
                      const base = 'px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-medium rounded-full whitespace-nowrap';
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

      {/* Segment-Based Messaging Content */}
      {activeNavTab === 'segments' && (
        <div className="space-y-6">
          {/* Segment Management */}
          <div className={`${TAILWIND_COLORS.CARD} p-6`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className={`text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>User Segments</h2>
                <p className="text-sm text-gray-500 mt-1">Create and manage user segments for targeted messaging</p>
              </div>
              <Button 
                variant="primary" 
                size="md"
                className="w-full sm:w-auto"
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                }
              >
                Create Segment
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow duration-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">A</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">Active Job Seekers</h3>
                    <p className="text-xs text-gray-500">1,234 users</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Active</span>
                  <Button variant="outline" size="sm" className="text-xs">Manage</Button>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow duration-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-semibold">B</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">Recent Graduates</h3>
                    <p className="text-xs text-gray-500">567 users</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Active</span>
                  <Button variant="outline" size="sm" className="text-xs">Manage</Button>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow duration-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 font-semibold">C</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">Premium Users</h3>
                    <p className="text-xs text-gray-500">89 users</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Active</span>
                  <Button variant="outline" size="sm" className="text-xs">Manage</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Campaign Analytics Content */}
      {activeNavTab === 'analytics' && (
        <div className={`${TAILWIND_COLORS.CARD} p-6`}>
          <h2 className={`text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-6`}>Campaign Analytics</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            <div className="bg-blue-50 p-4 md:p-6 rounded-lg min-h-[120px] flex flex-col justify-center">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-blue-600 font-medium mb-1">Open Rate</p>
                  <p className="text-xl md:text-2xl font-bold text-blue-900">24.5%</p>
                </div>
                <div className="text-2xl md:text-3xl ml-3 flex-shrink-0">📊</div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 md:p-6 rounded-lg min-h-[120px] flex flex-col justify-center">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-green-600 font-medium mb-1">Click Rate</p>
                  <p className="text-xl md:text-2xl font-bold text-green-900">12.3%</p>
                </div>
                <div className="text-2xl md:text-3xl ml-3 flex-shrink-0">👆</div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 md:p-6 rounded-lg min-h-[120px] flex flex-col justify-center sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-purple-600 font-medium mb-1">Conversion</p>
                  <p className="text-xl md:text-2xl font-bold text-purple-900">8.7%</p>
                </div>
                <div className="text-2xl md:text-3xl ml-3 flex-shrink-0">🎯</div>
              </div>
            </div>
          </div>

          <div className="text-center py-8">
            <div className="text-6xl mb-4">📈</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Detailed Analytics</h3>
            <p className="text-gray-600 mb-6">View comprehensive campaign performance metrics and insights.</p>
            <Button 
              variant="primary" 
              size="lg"
            >
              View Full Report
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagingCampaignsView;

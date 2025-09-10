import React, { useState } from 'react';
import { TAILWIND_COLORS } from '../../../../shared/WebConstant.js';
import Button from '../../../../shared/components/Button.jsx';

const SystemwidePush = () => {
  const [notificationForm, setNotificationForm] = useState({
    title: '',
    type: '',
    priority: '',
    message: ''
  });

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
    setNotificationForm({ title: '', type: '', priority: '', message: '' });
  };


  return (
    <div className="space-y-6">
      {/* System-wide Push Notifications Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-green-500">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </div>
          <div>
            <h2 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>System-wide Push Notifications</h2>
            <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>System-wide Push Notifications</p>
          </div>
        </div>

        <form onSubmit={handleNotificationSubmit} className="space-y-6">
          {/* Three dropdown fields in a row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Target segment</label>
              <div className="relative">
                <select
                  value={notificationForm.title}
                  onChange={(e) => setNotificationForm({...notificationForm, title: e.target.value})}
                  className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm appearance-none bg-white"
                >
                  <option value="">Select user segment</option>
                  <option value="all-users">All Users</option>
                  <option value="job-seekers">Job Seekers</option>
                  <option value="employers">Employers</option>
                  <option value="premium-users">Premium Users</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Message Type</label>
              <div className="relative">
                <select
                  value={notificationForm.type}
                  onChange={(e) => setNotificationForm({...notificationForm, type: e.target.value})}
                  className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm appearance-none bg-white"
                >
                  <option value="">select message type</option>
                  <option value="job-alert">Job Alert</option>
                  <option value="system">System Notification</option>
                  <option value="reminder">Reminder</option>
                  <option value="promotion">Promotion</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Priority</label>
              <div className="relative">
                <select
                  value={notificationForm.priority || ''}
                  onChange={(e) => setNotificationForm({...notificationForm, priority: e.target.value})}
                  className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm appearance-none bg-white"
                >
                  <option value="">select priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Message content textarea */}
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Message content</label>
            <textarea
              value={notificationForm.message}
              onChange={(e) => setNotificationForm({...notificationForm, message: e.target.value})}
              placeholder="Enter your targeted message"
              rows="4"
              className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm resize-none"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button 
              type="submit" 
              variant="primary" 
              size="md"
              className="w-full sm:w-auto h-12"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              }
            >
              Send to segment
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="md"
              className="w-full sm:w-auto h-12 border-green-500 text-green-500 hover:bg-green-50"
            >
              Preview
            </Button>
          </div>
        </form>
      </div>

      {/* Recent System-wide Push Notifications */}
      <div className={`${TAILWIND_COLORS.CARD} p-6`}>
        <h2 className={`text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-6`}>System-wide Push Notifications</h2>

        <div className="space-y-4">
          {recentNotifications.map((notification) => (
            <div key={notification.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-all duration-200 gap-3">
              <div className="flex items-start sm:items-center space-x-3 flex-1 min-w-0">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#5B9821]/10 flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#5B9821">
                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} truncate`}>{notification.title}</p>
                  <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>{notification.recipients} - {notification.time}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 justify-end sm:justify-start">
                {notification.tags.map((tag, index) => {
                  const isDelivered = tag.toLowerCase() === 'delivered';
                  const base = 'px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap';
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
  );
};

export default SystemwidePush;

import React, { useState } from 'react';
import Button from '../../../../shared/components/Button';
import { TAILWIND_COLORS } from '../../../../shared/WebConstant';

const CourseAlerts = () => {
  const [alertSchedule, setAlertSchedule] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [messageTemplate, setMessageTemplate] = useState('Reminder: your course (course_name) deadline is approaching');

  // Sample data for upcoming deadlines
  const upcomingDeadlines = [
    {
      id: 1,
      courseName: 'Digital Marketing Course',
      studentCount: 25,
      deadline: '1 week',
      status: 'alert sent',
      statusType: 'sent'
    },
    {
      id: 2,
      courseName: 'Web Development Bootcamp',
      studentCount: 18,
      deadline: '3 days',
      status: 'scheduled',
      statusType: 'scheduled'
    },
    {
      id: 3,
      courseName: 'Data Science Fundamentals',
      studentCount: 32,
      deadline: '2 weeks',
      status: 'scheduled',
      statusType: 'scheduled'
    }
  ];

  const alertScheduleOptions = [
    '1 day before',
    '2 days before',
    '1 week before',
    '2 weeks before',
    '1 month before'
  ];

  const handleSaveSettings = () => {
    // Handle save logic here
    console.log('Saving alert settings:', {
      alertSchedule,
      emailNotifications,
      pushNotifications,
      messageTemplate
    });
  };

  const getStatusBadgeClass = (statusType) => {
    switch (statusType) {
      case 'sent':
        return 'bg-emerald-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm';
      case 'scheduled':
        return 'bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-semibold';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Alert Management</h1>
          <p className="text-gray-600">Configure and monitor course deadline alerts for students</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          
          {/* Course Deadline Settings Section */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM4.828 7l2.586-2.586a2 2 0 012.828 0L12 6.172a2 2 0 010 2.828L9.414 11.586a2 2 0 01-2.828 0L4.828 9z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Course Deadline Settings</h2>
                <p className="text-gray-600 text-sm">Automatic alerts for course deadlines</p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Alert Schedule */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Alert Schedule
                </label>
                <div className="relative">
                  <select
                    value={alertSchedule}
                    onChange={(e) => setAlertSchedule(e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none bg-white pr-12 text-gray-700 font-medium transition-all duration-200 hover:border-gray-300"
                  >
                    <option value="">Select alert timing</option>
                    {alertScheduleOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Notification Toggles */}
              <div className="space-y-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Notification Preferences</h3>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-700">Email Notifications</span>
                      <p className="text-xs text-gray-500">Send alerts via email</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                      emailNotifications ? 'bg-emerald-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                        emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM4.828 7l2.586-2.586a2 2 0 012.828 0L12 6.172a2 2 0 010 2.828L9.414 11.586a2 2 0 01-2.828 0L4.828 9z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-700">Push Notifications</span>
                      <p className="text-xs text-gray-500">Send push notifications</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setPushNotifications(!pushNotifications)}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                      pushNotifications ? 'bg-emerald-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                        pushNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Message Template */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Message Template
                </label>
                <div className="relative">
                  <textarea
                    value={messageTemplate}
                    onChange={(e) => setMessageTemplate(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none text-gray-700 font-medium transition-all duration-200 hover:border-gray-300"
                    placeholder="Enter your message template..."
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {messageTemplate.length}/200
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <Button
                onClick={handleSaveSettings}
                variant="primary"
                size="lg"
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Save Alert Settings
                </div>
              </Button>
            </div>
          </div>

          {/* Upcoming Deadlines Section */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Upcoming Deadlines</h2>
                <p className="text-gray-600 text-sm">Courses with approaching deadlines</p>
              </div>
            </div>

            <div className="space-y-4">
              {upcomingDeadlines.map((deadline) => (
                <div
                  key={deadline.id}
                  className="border-2 border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-emerald-200 transition-all duration-200 bg-gradient-to-r from-white to-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                        {deadline.courseName}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>{deadline.studentCount} students</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Deadlines in {deadline.deadline}</span>
                        </div>
                      </div>
                    </div>
                    <span className={getStatusBadgeClass(deadline.statusType)}>
                      {deadline.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {upcomingDeadlines.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-500 mb-2">No upcoming deadlines</h3>
                <p className="text-gray-400">All courses are up to date</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAlerts;

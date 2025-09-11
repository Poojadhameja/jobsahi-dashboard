import React, { useState } from 'react';
import { TAILWIND_COLORS, COLORS } from '../../../../shared/WebConstant.js';

const SegmentBasedMessaging = () => {
  const [formData, setFormData] = useState({
    targetSegment: '',
    messageType: '',
    priority: '',
    messageContent: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendToSegment = () => {
    console.log('Sending to segment:', formData);
    // Add your send logic here
  };

  const handlePreview = () => {
    console.log('Preview message:', formData);
    // Add your preview logic here
  };

  return (
    <div className="p-4 sm:p-0 space-y-6">
      {/* System-wide Push Notifications Section */}
      <div className={`${TAILWIND_COLORS.CARD} p-4 sm:p-6`}>
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center space-x-2 mb-1">
            <svg className="w-5 h-5" style={{ color: COLORS.PRIMARY }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.98L3 20l1.98-5.874A8.955 8.955 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
            </svg>
            <h2 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>System-wide Push Notifications</h2>
          </div>
          <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>System-wide Push Notifications</p>
        </div>

        <div className="space-y-4">
          {/* Target Segment */}
          <div>
            <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
              Target segment
            </label>
            <select
              name="targetSegment"
              value={formData.targetSegment}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select user segment</option>
              <option value="active-job-seekers">Active job seekers</option>
              <option value="employers">Employers</option>
              <option value="premium-users">Premium Users</option>
              <option value="inactive-users">Inactive users</option>
            </select>
          </div>

          {/* Message Type and Priority Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                Message Type
              </label>
              <select
                name="messageType"
                value={formData.messageType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">select message type</option>
                <option value="promotional">Promotional</option>
                <option value="informational">Informational</option>
                <option value="urgent">Urgent</option>
                <option value="reminder">Reminder</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">select priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* Message Content */}
          <div>
            <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
              Message content
            </label>
            <textarea
              name="messageContent"
              value={formData.messageContent}
              onChange={handleInputChange}
              rows={4}
              placeholder="Enter your targeted message"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleSendToSegment}
              className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>Send to segment</span>
            </button>
            <button
              onClick={handlePreview}
              className="flex items-center justify-center space-x-2 border border-green-600 text-green-600 hover:bg-green-50 px-4 py-2 rounded-md font-medium transition-colors duration-200"
            >
              <span>Preview</span>
            </button>
          </div>
        </div>
      </div>

      {/* User Segments Overview */}
      <div className={`${TAILWIND_COLORS.CARD} p-4 sm:p-6`}>
        <div className="mb-4 sm:mb-6">
          <h2 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>User Segments</h2>
          <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Manage and view your user segments</p>
        </div>

        {/* Segment Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Active Job Seekers */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-3 mb-3 sm:mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
              <h3 className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} truncate`}>Active job seekers</h3>
            </div>
            <div className="space-y-2">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">1,234</p>
              <p className="text-xs text-green-600 font-medium">+5% last month</p>
            </div>
          </div>

          {/* Employers */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-3 mb-3 sm:mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
              <h3 className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} truncate`}>Employers</h3>
            </div>
            <div className="space-y-2">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">852</p>
              <p className="text-xs text-green-600 font-medium">+5% last month</p>
            </div>
          </div>

          {/* Premium Users */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-3 mb-3 sm:mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
              <h3 className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} truncate`}>Premium Users</h3>
            </div>
            <div className="space-y-2">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">456</p>
              <p className="text-xs text-green-600 font-medium">+5% last month</p>
            </div>
          </div>

          {/* Inactive Users */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-3 mb-3 sm:mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
              <h3 className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} truncate`}>Inactive users</h3>
            </div>
            <div className="space-y-2">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">1,234</p>
              <p className="text-xs text-red-600 font-medium">-5% last month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SegmentBasedMessaging;

import React, { useState } from 'react';
import { TAILWIND_COLORS } from '../../../../shared/WebConstant.js';
import Button from '../../../../shared/components/Button.jsx';
import { Horizontal4Cards } from '../../../../shared/components/metricCard.jsx';

const SegmentBasedMessaging = () => {
  const [formData, setFormData] = useState({
    targetSegment: '',
    messageType: '',
    priority: '',
    messageContent: ''
  });

  // User segments data for Horizontal4Cards
  const userSegments = [
    { title: "Active job seekers", value: "1,234", icon: "👥" },
    { title: "Employers", value: "852", icon: "🏢" },
    { title: "Premium Users", value: "456", icon: "⭐" },
    { title: "Inactive users", value: "1,234", icon: "😴" }
  ];

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
      <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </div>
          <div>
            <h2 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>System-wide Push Notifications</h2>
            <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>System-wide Push Notifications</p>
          </div>
        </div>

        <div className="space-y-6">
         
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             {/* Target Segment */}
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
              Target segment
            </label>
            <div className="relative">
              <select
                name="targetSegment"
                value={formData.targetSegment}
                onChange={handleInputChange}
                className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm appearance-none bg-white"
              >
                <option value="">Select user segment</option>
                <option value="active-job-seekers">Active job seekers</option>
                <option value="employers">Employers</option>
                <option value="premium-users">Premium Users</option>
                <option value="inactive-users">Inactive users</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Message Type */}
         
            <div className="space-y-2">
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                Message Type
              </label>
              <div className="relative">
                <select
                  name="messageType"
                  value={formData.messageType}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm appearance-none bg-white"
                >
                  <option value="">select message type</option>
                  <option value="promotional">Promotional</option>
                  <option value="informational">Informational</option>
                  <option value="urgent">Urgent</option>
                  <option value="reminder">Reminder</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
            </div>

             {/* priority */}
            <div className="space-y-2">
              <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                Priority
              </label>
              <div className="relative">
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
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

          {/* Message Content */}
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
              Message content
            </label>
            <textarea
              name="messageContent"
              value={formData.messageContent}
              onChange={handleInputChange}
              rows={4}
              placeholder="Enter your targeted message"
              className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button 
              type="button" 
              variant="primary" 
              size="md"
              className="w-full sm:w-auto h-12"
              onClick={handleSendToSegment}
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
              className="w-full sm:w-auto h-12 border-2 border-[#5B9821] text-[#5B9821]"
              onClick={handlePreview}
            >
              Preview
            </Button>
          </div>
        </div>
      </div>

      {/* User Segments Overview */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm">
        <div className="mb-6">
          <h2 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>User Segments</h2>
          <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Manage and view your user segments</p>
        </div>

        <Horizontal4Cards data={userSegments} />
      </div>
    </div>
  );
};

export default SegmentBasedMessaging;

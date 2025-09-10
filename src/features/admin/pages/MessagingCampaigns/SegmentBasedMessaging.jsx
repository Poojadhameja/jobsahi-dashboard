import React from 'react';
import { TAILWIND_COLORS } from '../../../../shared/WebConstant.js';

const SegmentBasedMessaging = () => {
  return (
    <div>
      {/* User Segments Overview */}
      <div className={`${TAILWIND_COLORS.CARD} p-6`}>
        <div className="mb-6">
          <h2 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>User Segments</h2>
          <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Manage and view your user segments</p>
        </div>

        {/* Segment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Active Job Seekers */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h3 className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Active job seekers</h3>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900">1,234</p>
              <p className="text-xs text-green-600 font-medium">+5% last month</p>
            </div>
          </div>

          {/* Employers */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h3 className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Employers</h3>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900">852</p>
              <p className="text-xs text-green-600 font-medium">+5% last month</p>
            </div>
          </div>

          {/* Premium Users */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h3 className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Premium Users</h3>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900">456</p>
              <p className="text-xs text-green-600 font-medium">+5% last month</p>
            </div>
          </div>

          {/* Inactive Users */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <h3 className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Inactive users</h3>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900">1,234</p>
              <p className="text-xs text-red-600 font-medium">-5% last month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SegmentBasedMessaging;

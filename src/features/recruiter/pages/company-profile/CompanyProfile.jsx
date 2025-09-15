import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const CompanyProfile = () => {
  const location = useLocation();
  
  const tabs = [
    { id: 'info', label: 'Company Info', path: '/recruiter/company-profile/info' },
    { id: 'team', label: 'Team Management', path: '/recruiter/company-profile/team' },
    { id: 'preferences', label: 'Preferences', path: '/recruiter/company-profile/preferences' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Company Profile & Settings</h2>
        <p className="text-gray-600">Manage your company information and team settings.</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            to={tab.path}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              location.pathname === tab.path
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>{tab.label}</span>
          </Link>
        ))}
      </div>

      {/* Default content - redirect to info tab */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <p className="text-gray-600">Select a tab above to manage your company settings.</p>
      </div>
    </div>
  );
};

export default CompanyProfile;

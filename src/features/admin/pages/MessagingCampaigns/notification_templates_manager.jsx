import React, { useState } from 'react';
import { TAILWIND_COLORS } from '../../../../shared/WebConstant.js';
import Button from '../../../../shared/components/Button.jsx';

const NotificationTemplatesManager = () => {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Job Alert Email',
      category: 'Job Alerts',
      type: 'Email',
      status: 'Active',
      lastModified: '1 hour ago',
      usage: 2345
    },
    {
      id: 2,
      name: 'Interview reminder SMS',
      category: 'Reminders',
      type: 'SMS',
      status: 'Active',
      lastModified: '2 hours ago',
      usage: 1890
    },
    {
      id: 3,
      name: 'Welcome Push Notification',
      category: 'Onboarding',
      type: 'Push',
      status: 'Active',
      lastModified: '3 hours ago',
      usage: 3200
    },
    {
      id: 4,
      name: 'Profile Completion',
      category: 'Job Alerts',
      type: 'Email',
      status: 'Active',
      lastModified: '5 hours ago',
      usage: 1567
    },
    {
      id: 5,
      name: 'Job Match SMS',
      category: 'Job Alerts',
      type: 'SMS',
      status: 'Active',
      lastModified: '1 day ago',
      usage: 2890
    },
    {
      id: 6,
      name: 'System Maintenance Notice',
      category: 'System',
      type: 'Push',
      status: 'Active',
      lastModified: '2 days ago',
      usage: 450
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('all');

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedChannel === 'all') return matchesSearch;
    return matchesSearch && template.type.toLowerCase() === selectedChannel.toLowerCase();
  });

  const handleEditTemplate = (templateId) => {
    console.log('Edit template:', templateId);
    // Add edit functionality here
  };

  const handleDeleteTemplate = (templateId) => {
    console.log('Delete template:', templateId);
    // Add delete functionality here
  };

  const handleDuplicateTemplate = (templateId) => {
    console.log('Duplicate template:', templateId);
    // Add duplicate functionality here
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Container with Header and Search */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          {/* Header Section */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Notification Templates Manager</h1>
              <p className="text-gray-600 text-lg">create and manage reusable message templates</p>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search templates"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
                />
              </div>
            </div>
            
            {/* Channel Selector */}
            <div className="lg:w-64">
              <select
                value={selectedChannel}
                onChange={(e) => setSelectedChannel(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
              >
                <option value="all">Select Channel</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="push">Push</option>
              </select>
            </div>
          
        </div>

        {/* Template Cards Grid */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{template.name}</h3>
                    <p className="text-sm text-gray-600">{template.category}</p>
                  </div>
                  <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                    template.type === 'Email' ? 'bg-green-100 text-green-800' :
                    template.type === 'SMS' ? 'bg-green-100 text-green-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {template.type}
                  </span>
                </div>

                {/* Usage Statistics */}
                <div className="space-y-2 mb-6">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Used {template.usage.toLocaleString()} times</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Last used {template.lastModified}
                  </div>
                </div>

                {/* Action Icons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleEditTemplate(template.id)}
                    className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors duration-200"
                    title="View template"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteTemplate(template.id)}
                    className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors duration-200"
                    title="Delete template"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDuplicateTemplate(template.id)}
                    className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors duration-200"
                    title="Edit template"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'Try adjusting your search terms.' : 'Create your first notification template to get started.'}
            </p>
            <Button variant="primary" size="lg">
              + Create New Template
            </Button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default NotificationTemplatesManager;
 
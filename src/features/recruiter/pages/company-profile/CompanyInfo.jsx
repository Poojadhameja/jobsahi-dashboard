import React, { useState } from 'react';
import { Button } from '../../../../shared/components/Button';
import { PillNavigation } from '../../../../shared/components/navigation';
import { COLORS, TAILWIND_COLORS } from '../../../../shared/WebConstant';
import { LuBuilding, LuUsers, LuSettings } from 'react-icons/lu';

const CompanyInfo = () => {
  const [activeTab, setActiveTab] = useState('company-info');
  const [companyData, setCompanyData] = useState({
    companyName: 'Brightorial Tech pvt ltd.',
    website: 'pr.brightorial.com',
    trade: 'Civil',
    description: 'Company\'s description goes here...'
  });
  const [editorMode, setEditorMode] = useState('visual');

  const handleInputChange = (field, value) => {
    setCompanyData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle logo upload logic here
      console.log('Logo uploaded:', file);
    }
  };

  const tabs = [
    { id: 'company-info', label: 'Company Info', icon: LuBuilding },
    { id: 'team-management', label: 'Team Management', icon: LuUsers },
    { id: 'preferences', label: 'Preferences', icon: LuSettings }
  ];

  const handleTabChange = (index) => {
    setActiveTab(tabs[index].id);
  };

  const tradeOptions = [
    'Civil', 'IT', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 'Retail', 'Other'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="px-6 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Profile & Settings</h1>
          <p className="text-gray-600 text-lg">Manage your company information and team settings.</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <PillNavigation 
            tabs={tabs}
            activeTab={tabs.findIndex(tab => tab.id === activeTab)}
            onTabChange={handleTabChange}
            className="mb-6"
          />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Company Logo Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900">Company Logo</h3>
            </div>
            <p className="text-sm text-gray-600 mb-6">Upload your company logo (Max 5MB).</p>
            
            {/* Logo Display Area */}
            <div className="mb-6">
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    <div>JOB</div>
                    <div>SAHI</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upload Button */}
            <div>
              <input
                type="file"
                id="logo-upload"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <label htmlFor="logo-upload">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center space-x-2 bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                  icon={
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  }
                >
                  Upload Logo
                </Button>
              </label>
            </div>
          </div>

          {/* Company Information Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>
            </div>
            <p className="text-sm text-gray-600 mb-6">Basic information about your company.</p>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  value={companyData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <input
                  type="url"
                  value={companyData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Trade */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trade</label>
                <div className="relative">
                  <select
                    value={companyData.trade}
                    onChange={(e) => handleInputChange('trade', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                  >
                    {tradeOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Description Section */}
        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Description</h3>
          
          {/* Rich Text Editor Toolbar */}
          <div className="border border-gray-300 rounded-t-lg bg-gray-50 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                {/* Text Formatting */}
                <button className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-900" title="Bold">
                  <span className="font-bold text-sm">B</span>
                </button>
                <button className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-900" title="Italic">
                  <span className="italic text-sm">I</span>
                </button>
                <button className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-900" title="Underline">
                  <span className="underline text-sm">U</span>
                </button>
                
                <div className="w-px h-6 bg-gray-300 mx-2"></div>
                
                {/* Lists */}
                <button className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-900" title="Bullet List">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6h2v2H4zm0 5h2v2H4zm0 5h2v2H4zm16-8V6H8v2h12zm0 5V11H8v2h12zm0 5v-2H8v2h12z"/>
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-900" title="Numbered List">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.5L3 15l1.5 6H2v-1h1l-.5-2H2v-1h1l-.5-2H2v-1zm10.5 1.5L9 9l1.5-4.5L12 6l-1.5 4.5L9 6l-1.5 4.5L9 9l-1.5 4.5L9 12l1.5-4.5L12 12l-1.5 4.5L12 15l1.5-4.5L15 12l-1.5-4.5L12 9l1.5 4.5z"/>
                  </svg>
                </button>
                
                <div className="w-px h-6 bg-gray-300 mx-2"></div>
                
                {/* Alignment */}
                <button className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-900" title="Align Left">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"/>
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-900" title="Align Center">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"/>
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-900" title="Align Right">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"/>
                  </svg>
                </button>
                
                <div className="w-px h-6 bg-gray-300 mx-2"></div>
                
                {/* Links */}
                <button className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-900" title="Link">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-900" title="Unlink">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 7h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zM8 13h8v-2H8v2zm-5-6h4V5H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1S5.29 7.9 7 7.9z"/>
                  </svg>
                </button>
                
                <div className="w-px h-6 bg-gray-300 mx-2"></div>
                
                {/* Undo/Redo */}
                <button className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-900" title="Undo">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/>
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-900" title="Redo">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"/>
                  </svg>
                </button>
              </div>
              
              {/* Editor Mode Toggle */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setEditorMode('visual')}
                  className={`px-3 py-1 text-sm rounded ${
                    editorMode === 'visual'
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Visual
                </button>
                <button
                  onClick={() => setEditorMode('text')}
                  className={`px-3 py-1 text-sm rounded ${
                    editorMode === 'text'
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Text
                </button>
              </div>
            </div>
          </div>

          {/* Text Area */}
          <textarea
            value={companyData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Company's description goes here..."
            className="w-full h-32 px-3 py-3 border border-t-0 border-gray-300 rounded-b-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          <Button variant="outline" size="lg">
            Cancel
          </Button>
          <Button variant="primary" size="lg">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;

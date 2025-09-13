import React, { useState } from 'react';
import {
  LuCircleUser,
  LuArrowLeft,
  LuCheck,
  LuCircleDot,
} from 'react-icons/lu';
import { TAILWIND_COLORS, COLORS } from '../../../../shared/WebConstant';
import Button, { BackToOverviewButton } from '../../../../shared/components/Button';

const CMSEditor = () => {
  // State for each page
  const [aboutUs, setAboutUs] = useState({
    title: '',
    content: '',
    isSaving: false,
    savedTick: false
  });

  const [termsOfService, setTermsOfService] = useState({
    title: '',
    content: '',
    isSaving: false,
    savedTick: false
  });

  const [privacyPolicy, setPrivacyPolicy] = useState({
    title: '',
    content: '',
    isSaving: false,
    savedTick: false
  });

  const handleSave = async (pageType, data) => {
    const setter = pageType === 'about' ? setAboutUs : 
                   pageType === 'terms' ? setTermsOfService : setPrivacyPolicy;
    
    setter(prev => ({ ...prev, isSaving: true, savedTick: false }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setter(prev => ({ ...prev, savedTick: true }));
      setTimeout(() => {
        setter(prev => ({ ...prev, savedTick: false }));
      }, 1500);
    } finally {
      setter(prev => ({ ...prev, isSaving: false }));
    }
  };

  const StatusBadge = ({ status }) => {
    const isPublished = status === "Published";
    return (
      <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
        isPublished ? "bg-blue-100 text-blue-700" : "bg-blue-100 text-blue-700"
      }`}>
        {isPublished ? <LuCheck className="h-3 w-3" /> : <LuCircleDot className="h-3 w-3" />}
        {status}
      </span>
    );
  };

  const PageCard = ({ 
    title, 
    status, 
    lastUpdated, 
    titlePlaceholder, 
    contentPlaceholder, 
    pageData, 
    pageType 
  }) => (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 h-fit">
      {/* Card Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h3 className="text-slate-900 font-semibold mb-1">{title}</h3>
          <p className="text-sm text-slate-600">Last updated {lastUpdated}</p>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        {/* Page Title Field */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Page title</label>
          <input
            type="text"
            value={pageData.title}
            onChange={(e) => {
              const setter = pageType === 'about' ? setAboutUs : 
                           pageType === 'terms' ? setTermsOfService : setPrivacyPolicy;
              setter(prev => ({ ...prev, title: e.target.value }));
            }}
            placeholder={titlePlaceholder}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        {/* Content Field */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Content Preview</label>
          <textarea
            rows={6}
            value={pageData.content}
            onChange={(e) => {
              const setter = pageType === 'about' ? setAboutUs : 
                           pageType === 'terms' ? setTermsOfService : setPrivacyPolicy;
              setter(prev => ({ ...prev, content: e.target.value }));
            }}
            placeholder={contentPlaceholder}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 resize-none"
          />
        </div>

        {/* Save Button */}
        <div className="relative">
          <button
            onClick={() => handleSave(pageType, { title: pageData.title, content: pageData.content })}
            disabled={pageData.isSaving}
            className="w-full rounded-lg px-4 py-2 font-medium flex items-center justify-center text-white"
            style={{ 
              backgroundColor: COLORS?.GREEN_PRIMARY || '#059669',
              opacity: pageData.isSaving ? 0.7 : 1
            }}
          >
            {pageData.isSaving ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Save'
            )}
          </button>
          {pageData.savedTick && (
            <div className="absolute inset-y-0 right-3 flex items-center">
              <LuCheck className="h-5 w-5 text-green-700" />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center mt-0.5"
              style={{ backgroundColor: COLORS?.GREEN_PRIMARY || '#059669' }}
            >
              <LuCircleUser className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">CMS Editor</h2>
              <p className="text-sm text-slate-600">About, Terms, Policy</p>
            </div>
          </div>

          {/* Back to overview (pill) */}
          <BackToOverviewButton
            onClick={() => window.history.back()}
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PageCard
          title="About Us"
          status="Published"
          lastUpdated="2 days ago"
          titlePlaceholder="About Us title"
          contentPlaceholder="Write your about us content here.."
          pageData={aboutUs}
          pageType="about"
        />
        
        <PageCard
          title="Terms of Service"
          status="Draft"
          lastUpdated="2 days ago"
          titlePlaceholder="Terms of service title.."
          contentPlaceholder="Write your terms of service content here.."
          pageData={termsOfService}
          pageType="terms"
        />
        
        <PageCard
          title="Privacy Policy"
          status="Draft"
          lastUpdated="2 days ago"
          titlePlaceholder="privacy policy title"
          contentPlaceholder="Write your privacy policy content here.."
          pageData={privacyPolicy}
          pageType="privacy"
        />
      </div>
    </div>
  );
};

export default CMSEditor;

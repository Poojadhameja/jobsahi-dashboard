import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MetricCard, { MatrixCard, Horizontal4Cards } from '../../components/metricCard.jsx';
import { PillNavigation } from '../../../../shared/components/navigation.jsx';
import { TAILWIND_COLORS } from '../../../../shared/WebConstant.js';
import Button from '../../../../shared/components/Button.jsx';
import { FilterButton, NewCampaignButton } from '../../../../shared/components/Button.jsx';
import SystemwidePush from './SystemwidePush.jsx';
import SegmentBasedMessaging from './SegmentBasedMessaging.jsx';
import EmailSMSCampaignsManager from './email_sms_campaignsmanager.jsx'; 
import NotificationTemplatesManager from './notification_templates_manager.jsx';

const MessagingCampaignsView = () => {
  // Tabs synced to URL (?tab=messaging|segments|analytics|templates)
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => {
    const tab = searchParams.get('tab');
    switch(tab) {
      case 'segments': return 1;
      case 'analytics': return 2;
      case 'templates': return 3;
      default: return 0; // 'messaging'
    }
  });

  useEffect(() => {
    const current = searchParams.get('tab');
    const expectedTab = ['messaging', 'segments', 'analytics', 'templates'][activeTab];
    if (current !== expectedTab) {
      const next = new URLSearchParams(searchParams);
      next.set('tab', expectedTab);
      setSearchParams(next, { replace: true });
    }
  }, [activeTab, searchParams, setSearchParams]);

  // Click handlers for Filter and New Campaign buttons
  const handleFilterClick = () => {
    console.log('Filter button clicked');
    // Add filter functionality here
    // For example: show filter modal, toggle filter options, etc.
  };

  const handleNewCampaignClick = () => {
    console.log('New Campaign button clicked');
    // Add new campaign functionality here
    // For example: navigate to campaign creation, show modal, etc.
  };

  // Navigation tabs data for messaging campaigns
  const navigationTabs = [
    {
      id: 'messaging',
      label: 'System-wide Push Notifications',
      icon: () => (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      )
    },
    {
      id: 'segments',
      label: 'Segment-Based Messaging',
      icon: () => (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      )
    },
    {
      id: 'analytics',
      label: 'Email & SMS Campaigns Management',
      icon: () => (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      )
    },
    {
      id: 'templates',
      label: 'Notification Templates Manager',
      icon: () => (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      )
    }
  ];



  
  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      {/* Header */}
      <MatrixCard 
        title="Messaging & Campaigns"
        subtitle="Manage notifications, campaigns, and templates"
      />

      {/* Campaign Statistics Cards */}
      <Horizontal4Cards data={[
        { title: "Active Campaigns", value: "15", icon: "📊" },
        { title: "Total Notifications", value: "1,250", icon: "🔔" },
        { title: "User Segments", value: "5", icon: "👥" },
        { title: "Templates", value: "22", icon: "📄" }
      ]} />

      {/* Navigation Tabs */}
      <PillNavigation 
        tabs={navigationTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Filter and New Campaign Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 mb-4 sm:mb-6">
        <FilterButton onClick={handleFilterClick} />
        <NewCampaignButton onClick={handleNewCampaignClick} />
      </div>

      {/* Content based on active navigation tab */}
      {activeTab === 0 && <SystemwidePush />}

      {/* Segment-Based Messaging Content */}
      {activeTab === 1 && <SegmentBasedMessaging />}

      {/* Email & SMS Campaigns Management Content */}
      {activeTab === 2 && <EmailSMSCampaignsManager />}    

      {/* Notification Templates Manager Content */}
      {activeTab === 3 && <NotificationTemplatesManager />}

    </div>
  );
};

export default MessagingCampaignsView;

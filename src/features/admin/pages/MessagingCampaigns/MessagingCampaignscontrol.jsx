import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MetricCard from '../../components/metricCard.jsx';
import NavigationTabs from '../../../../shared/components/navigation.jsx';
import { TAILWIND_COLORS } from '../../../../shared/WebConstant.js';
import Button from '../../../../shared/components/Button.jsx';
import { FilterButton, NewCampaignButton } from '../../../../shared/components/Button.jsx';
import SystemwidePush from './SystemwidePush.jsx';
import SegmentBasedMessaging from './SegmentBasedMessaging.jsx';
import EmailSMSCampaignsManager from './email_sms_campaignsmanager.jsx'; 
import NotificationTemplatesManager from './notification_templates_manager.jsx';

const MessagingCampaignsView = () => {
  // Tabs synced to URL (?tab=messaging|analytics)
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeNavTab, setActiveNavTab] = useState(() => searchParams.get('tab') || 'messaging');

  useEffect(() => {
    const current = searchParams.get('tab');
    if (current !== activeNavTab) {
      const next = new URLSearchParams(searchParams);
      next.set('tab', activeNavTab);
      setSearchParams(next, { replace: true });
    }
  }, [activeNavTab, searchParams, setSearchParams]);

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
      label: ' System-wide Push Notifications',
      icon: () => (
        <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      )
    },
    {
      id: 'segments',
      label: 'Segment-Based Messaging',
      icon: () => (
        <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      )
    },
    {
      id: 'analytics',
      label: ' Email & SMS Campaigns Management',
      icon: () => (
        <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      )
    },
    {
      id: 'templates',
      label: ' Notification Templates Manager',
      icon: () => (
        <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      )
    }
  ];



  
  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      {/* Header */}
      <div className="text-center">
        <h1 className={`text-2xl sm:text-3xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Messaging & Campaigns</h1>
        <p className={`${TAILWIND_COLORS.TEXT_MUTED} mt-1 text-sm sm:text-base`}>Manage notifications, campaigns, and templates</p>
      </div>

      {/* Campaign Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <MetricCard
            title="Active Campaigns"
            count="15"
            icon="📊"
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            countColor={TAILWIND_COLORS.TEXT_PRIMARY}
            titleColor={TAILWIND_COLORS.TEXT_MUTED}
          />
          
          <MetricCard
            title="Total Notifications"
            count="1,250"
            icon="🔔"
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            countColor={TAILWIND_COLORS.TEXT_PRIMARY}
            titleColor={TAILWIND_COLORS.TEXT_MUTED}
          />
          
          <MetricCard
            title="User Segments"
            count="5"
            icon="👥"
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
            countColor={TAILWIND_COLORS.TEXT_PRIMARY}
            titleColor={TAILWIND_COLORS.TEXT_MUTED}
          />
          
          <MetricCard
            title="Templates"
            count="22"
            icon="📄"
            iconBgColor="bg-orange-100"
            iconColor="text-orange-600"
            countColor={TAILWIND_COLORS.TEXT_PRIMARY}
            titleColor={TAILWIND_COLORS.TEXT_MUTED}
          />
      </div>

      {/* Navigation Tabs */}
      <NavigationTabs 
        navigationTabs={navigationTabs}
        activeNavTab={activeNavTab}
        setActiveNavTab={setActiveNavTab}
      />

      {/* Filter and New Campaign Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 mb-4 sm:mb-6">
        <FilterButton onClick={handleFilterClick} />
        <NewCampaignButton onClick={handleNewCampaignClick} />
      </div>

      {/* Content based on active navigation tab */}
      {activeNavTab === 'messaging' && <SystemwidePush />}

      {/* Segment-Based Messaging Content */}
      {activeNavTab === 'segments' && <SegmentBasedMessaging />}

      {/* Email & SMS Campaigns Management Content */}
      {activeNavTab === 'analytics' && <EmailSMSCampaignsManager />}    

      {/* Notification Templates Manager Content */}
      {activeNavTab === 'templates' && <NotificationTemplatesManager />}

    </div>
  );
};

export default MessagingCampaignsView;

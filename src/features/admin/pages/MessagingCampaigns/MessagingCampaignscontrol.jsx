import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MetricCard from '../../components/metricCard.jsx';
import NavigationTabs from '../../../../shared/components/navigation.jsx';
import { TAILWIND_COLORS } from '../../../../shared/WebConstant.js';
import Button from '../../../../shared/components/Button.jsx';
import { FilterButton, NewCampaignButton } from '../../../../shared/components/Button.jsx';
import SystemwidePush from './SystemwidePush.jsx';
import SegmentBasedMessaging from './SegmentBasedMessaging.jsx';

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
      label: ' Notification Templates Manager',
      icon: () => (
        <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      )
    }
  ];



  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className={`text-3xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Messaging & Campaigns</h1>
        <p className={`${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>Manage notifications, campaigns, and templates</p>
      </div>

      {/* Campaign Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <div className="flex flex-col sm:flex-row justify-end gap-3 mb-6">
        <FilterButton onClick={handleFilterClick} />
        <NewCampaignButton onClick={handleNewCampaignClick} />
      </div>

      {/* Content based on active navigation tab */}
      {activeNavTab === 'messaging' && <SystemwidePush />}

      {/* Segment-Based Messaging Content */}
      {activeNavTab === 'segments' && <SegmentBasedMessaging />}

      {/* Campaign Analytics Content */}
      {activeNavTab === 'analytics' && (
        <div className={`${TAILWIND_COLORS.CARD} p-6`}>
          <h2 className={`text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-6`}>Campaign Analytics</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            <div className="bg-blue-50 p-4 md:p-6 rounded-lg min-h-[120px] flex flex-col justify-center">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-blue-600 font-medium mb-1">Open Rate</p>
                  <p className="text-xl md:text-2xl font-bold text-blue-900">24.5%</p>
                </div>
                <div className="text-2xl md:text-3xl ml-3 flex-shrink-0">📊</div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 md:p-6 rounded-lg min-h-[120px] flex flex-col justify-center">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-green-600 font-medium mb-1">Click Rate</p>
                  <p className="text-xl md:text-2xl font-bold text-green-900">12.3%</p>
                </div>
                <div className="text-2xl md:text-3xl ml-3 flex-shrink-0">👆</div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 md:p-6 rounded-lg min-h-[120px] flex flex-col justify-center sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-purple-600 font-medium mb-1">Conversion</p>
                  <p className="text-xl md:text-2xl font-bold text-purple-900">8.7%</p>
                </div>
                <div className="text-2xl md:text-3xl ml-3 flex-shrink-0">🎯</div>
              </div>
            </div>
          </div>

          <div className="text-center py-8">
            <div className="text-6xl mb-4">📈</div>
            <h3 className={`text-lg font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>Detailed Analytics</h3>
            <p className={`${TAILWIND_COLORS.TEXT_MUTED} mb-6`}>View comprehensive campaign performance metrics and insights.</p>
            <Button 
              variant="primary" 
              size="lg"
            >
              View Full Report
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagingCampaignsView;

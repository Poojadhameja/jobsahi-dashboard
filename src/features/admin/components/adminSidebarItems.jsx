import React from 'react'

const Icon = {
  Dashboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M3 13h8V3H3v10zm10 8h8V3h-8v18zM3 21h8v-6H3v6z"/>
    </svg>
  ),
  Manage: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M12 6a3 3 0 110-6 3 3 0 010 6zM3 22v-2a4 4 0 014-4h2m8-6a3 3 0 110-6 3 3 0 010 6zM21 22v-2a4 4 0 00-4-4h-2"/>
    </svg>
  ),
  Jobs: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <rect x="3" y="7" width="18" height="13" rx="2"/>
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/>
    </svg>
  ),
  Biz: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M3 21h18M4 21V8a2 2 0 012-2h12a2 2 0 012 2v13M8 10h8M8 14h8M8 18h5"/>
    </svg>
  ),
  Reports: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M3 3h18v18H3z"/>
      <path d="M7 17V9m5 8V7m5 10v-4"/>
    </svg>
  ),
  Msg: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M21 15a4 4 0 01-4 4H7l-4 4V5a4 4 0 014-4h10a4 4 0 014 4v10z"/>
    </svg>
  ),
  Alerts: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M12 22a2 2 0 002-2H10a2 2 0 002 2z"/>
      <path d="M18 16V11a6 6 0 10-12 0v5l-2 2h16l-2-2z"/>
    </svg>
  ),
  Settings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V22a2 2 0 11-4 0v-.17a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h-.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 008.6 4.6a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/>
    </svg>
  ),
  Tools: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M14.7 6.3l3 3L7 20H4v-3L14.7 6.3zM17 2l5 5"/>
    </svg>
  ),
}

export const adminSidebarItems = [
  { to: '/admin/dashboard', activePath: '/admin/dashboard', label: 'Dashboard', icon: Icon.Dashboard },
  { to: '/admin/management', activePath: '/admin/management', label: 'Managements', icon: Icon.Manage },
  { to: '/admin/job-control', activePath: '/admin/job-control', label: 'Job & Course Control', icon: Icon.Jobs },
  { to: '/admin/business-panel', activePath: '/admin/business-panel', label: 'Business & Revenue Panel', icon: Icon.Biz },
  { to: '/admin/reports', activePath: '/admin/reports', label: 'Reports & Analytics Center', icon: Icon.Reports },
  { to: '/admin/messaging-campaigns', activePath: '/admin/messaging-campaigns', label: 'Messaging & Campaigns', icon: Icon.Msg },
  { to: '/admin/alerts', activePath: '/admin/alerts', label: 'Alerts & Automation', icon: Icon.Alerts },
  { to: '/admin/settings', activePath: '/admin/settings', label: 'System Settings & Configuration', icon: Icon.Settings },
  { to: '/admin/tools-logs', activePath: '/admin/tools-logs', label: 'Admin Tools & Logs', icon: Icon.Tools },
]



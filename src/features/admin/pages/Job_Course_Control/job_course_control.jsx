import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MetricCard from '../../components/metricCard.jsx';
import NavigationTabs from '../../../../shared/components/navigation.jsx';
import { COLORS, TAILWIND_COLORS } from '../../../../shared/WebConstant';
import Button from '../../../../shared/components/Button.jsx';
import CourseOversight from './course_oversight.jsx';
import JobPosting from './job_posting.jsx';

const JobCourseControlView = () => {
  // ====== STATE MANAGEMENT ======
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeNavTab, setActiveNavTab] = useState(() => searchParams.get('tab') || 'job-posting');


  // ====== NAVIGATION CONFIGURATION ======
  const navigationTabs = [
    {
      id: 'job-posting',
      label: 'Job Posting Control',
      icon: () => (
        <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      )
    },
    {
      id: 'course-oversight',
      label: 'Course Oversight',
      icon: () => (
        <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      )
    }
  ];


  const jobMetrics = {
    totalJobPosts: {
      title: "Total Job Posts",
      count: "520",
      icon: "💼",
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      countColor: TAILWIND_COLORS.TEXT_PRIMARY,
      titleColor: TAILWIND_COLORS.TEXT_MUTED
    },
    activeCampaigns: {
      title: "Active Campaigns",
      count: "15",
      icon: "📊",
      iconBgColor: "bg-green-100", 
      iconColor: "text-green-600",
      countColor: TAILWIND_COLORS.TEXT_PRIMARY,
      titleColor: TAILWIND_COLORS.TEXT_MUTED
    },
    flaggedContent: {
      title: "Flagged Content",
      count: "520",
      icon: "⚠️",
      iconBgColor: "bg-red-100", 
      iconColor: "text-red-600",
      countColor: TAILWIND_COLORS.TEXT_PRIMARY,
      titleColor: TAILWIND_COLORS.TEXT_MUTED
    },
    promotedPosts: {
      title: "Promoted Posts",
      count: "520",
      icon: "🚀",
      iconBgColor: "bg-purple-100", 
      iconColor: "text-purple-600",
      countColor: TAILWIND_COLORS.TEXT_PRIMARY,
      titleColor: TAILWIND_COLORS.TEXT_MUTED
    }
  };





  // ====== EFFECTS ======
  useEffect(() => {
    const current = searchParams.get('tab');
    if (current !== activeNavTab) {
      const next = new URLSearchParams(searchParams);
      next.set('tab', activeNavTab);
      setSearchParams(next, { replace: true });
    }
  }, [activeNavTab, searchParams, setSearchParams]);

  return (
    <div className="admin-jobcourse-root space-y-6">
      {/* Header */}
        <div className="text-center">
          <h1 className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>Job & Course Control</h1>
          <p className={`${TAILWIND_COLORS.TEXT_PRIMARY} text-sm`}>Manage job postings, course approvals, and content quality control</p>
        </div>
      
      {/* Metrics */}
      <div className="metrics-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.values(jobMetrics).map((m, i) => (
          <MetricCard key={i} title={m.title} count={m.count} icon={m.icon} iconBgColor={m.iconBgColor} iconColor={m.iconColor} />
        ))}
      </div>

      {/* Tabs */}
      <NavigationTabs navigationTabs={navigationTabs} activeNavTab={activeNavTab} setActiveNavTab={setActiveNavTab} />

      {/* Job Posting */}
      {activeNavTab === 'job-posting' && <JobPosting />}

      {/* Course Oversight */}
      {activeNavTab === 'course-oversight' && <CourseOversight />}
    </div>
  );
};

export default JobCourseControlView;

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MetricCard, { MatrixCard, Horizontal4Cards } from '../../components/metricCard';
import { PillNavigation } from '../../../../shared/components/navigation.jsx';
import { COLORS, TAILWIND_COLORS } from '../../../../shared/WebConstant';
import Button from '../../../../shared/components/Button.jsx';
import CourseOversight from './CourseOversight.jsx';
import JobPosting from './JobPosting.jsx';

const JobCourseControlView = () => {
  // ====== STATE MANAGEMENT ======
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => {
    const tab = searchParams.get('tab');
    return tab === 'course-oversight' ? 1 : 0;
  });


  // ====== NAVIGATION CONFIGURATION ======
  const navigationTabs = [
    {
      id: 'job-posting',
      label: 'Job Posting Control',
      icon: () => (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      )
    },
    {
      id: 'course-oversight',
      label: 'Course Oversight',
      icon: () => (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      )
    }
  ];


  const jobMetrics = [
    { title: "Total Job Posts", value: "520", icon: "💼" },
    { title: "Active Campaigns", value: "15", icon: "📊" },
    { title: "Flagged Content", value: "520", icon: "⚠️" },
    { title: "Promoted Posts", value: "520", icon: "🚀" }
  ];





  // ====== EFFECTS ======
  useEffect(() => {
    const current = searchParams.get('tab');
    const expectedTab = activeTab === 0 ? 'job-posting' : 'course-oversight';
    if (current !== expectedTab) {
      const next = new URLSearchParams(searchParams);
      next.set('tab', expectedTab);
      setSearchParams(next, { replace: true });
    }
  }, [activeTab, searchParams, setSearchParams]);

  return (
    <div className="admin-jobcourse-root space-y-6">
      {/* Header */}
      <MatrixCard 
        title="Job & Course Control"
        subtitle="Manage job postings, course approvals, and content quality control"
      />
      
      {/* Metrics */}
      <Horizontal4Cards data={jobMetrics} />

      {/* Tabs */}
      <PillNavigation 
        tabs={navigationTabs} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      {/* Job Posting */}
      {activeTab === 0 && <JobPosting />}

      {/* Course Oversight */}
      {activeTab === 1 && <CourseOversight />}
    </div>
  );
};

export default JobCourseControlView;

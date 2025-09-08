import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MetricCard from '../components/metricCard.jsx';
import NavigationTabs from '../../../shared/components/navigation';
import { COLORS, TAILWIND_COLORS } from '../../../shared/WebConstant';


const JobCourseControlView = () => {
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [promotionJobId, setPromotionJobId] = useState('');
  const [highlightType, setHighlightType] = useState('top-ribbon');
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeNavTab, setActiveNavTab] = useState(() => searchParams.get('tab') || 'job-posting');

  // Courses moderation state (for Course Oversight tab)
  const [courses, setCourses] = useState([
    { id: 1, title: 'Electrician', category: 'ITI', instructor: 'M.Kapoor', rating: 4.5, status: 'Pending' },
    { id: 2, title: 'Fitter', category: 'ITI', instructor: 'M.Kapoor', rating: 4.5, status: 'Approved' },
    { id: 3, title: 'COPA', category: 'ITI', instructor: 'M.Kapoor', rating: 4.5, status: 'Featured' },
    { id: 4, title: 'Fitter', category: 'ITI', instructor: 'M.Kapoor', rating: 4.5, status: 'Pending' },
    { id: 5, title: 'Electrician', category: 'ITI', instructor: 'M.Kapoor', rating: 4.5, status: 'Featured' }
  ]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [courseSearchTerm, setCourseSearchTerm] = useState('');
  const [courseStatusFilter, setCourseStatusFilter] = useState('All Status');
  const [categories, setCategories] = useState(['Electrician', 'Fitter', 'COPA']);
  const [newCategory, setNewCategory] = useState('');
  const [minTopRated, setMinTopRated] = useState(4.5);

  // Navigation tabs data
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
  // Mock data for job postings
  const jobPostings = [
    {
      id: 1,
      title: 'Electrician',
      company: 'NovaTech',
      posted: '2025-08-08',
      status: 'Pending',
      statusColor: 'bg-gray-100 text-gray-600'
    },
    {
      id: 2,
      title: 'Fitter',
      company: 'NovaTech',
      posted: '2025-08-08',
      status: 'Approved',
      statusColor: 'bg-green-100 text-green-600'
    },
    {
      id: 3,
      title: 'COPA',
      company: 'NovaTech',
      posted: '2025-08-08',
      status: 'Flagged',
      statusColor: 'bg-orange-100 text-orange-600'
    },
    {
      id: 4,
      title: 'Fitter',
      company: 'NovaTech',
      posted: '2025-08-08',
      status: 'Promoted',
      statusColor: 'bg-purple-100 text-purple-600'
    },
    {
      id: 5,
      title: 'Electrician',
      company: 'NovaTech',
      posted: '2025-08-08',
      status: 'Flagged',
      statusColor: 'bg-orange-100 text-orange-600'
    }
  ];

  // Mock data for flagged posts
  const flaggedPosts = [
    {
      id: 1,
      title: 'Product Manager',
      company: 'Novatech',
      reports: 3
    }
  ];

  // Metrics data for job management - matching the image
  const jobMetrics = {
    totalJobPosts: {
      title: "Total Job Posts",
      count: "520",
      icon: "💼",
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    activeCampaigns: {
      title: "Active Campaigns",
      count: "15",
      icon: "📊",
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    flaggedContent: {
      title: "Flagged Content",
      count: "520",
      icon: "⚠️",
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    promotedPosts: {
      title: "Promoted Posts",
      count: "520",
      icon: "🚀",
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedJobs(jobPostings.map(job => job.id));
    } else {
      setSelectedJobs([]);
    }
  };

  const handleSelectJob = (jobId, checked) => {
    if (checked) {
      setSelectedJobs([...selectedJobs, jobId]);
    } else {
      setSelectedJobs(selectedJobs.filter(id => id !== jobId));
    }
  };

  const handleApproveJob = (jobId) => {
    console.log('Approving job:', jobId);
    // Add approval logic here
  };

  const handlePromoteJob = (jobId) => {
    console.log('Promoting job:', jobId);
    // Add promotion logic here
  };

  const handleBulkApprove = () => {
    console.log('Bulk approving jobs:', selectedJobs);
    // Add bulk approval logic here
  };

  const handleBulkPromote = () => {
    console.log('Bulk promoting jobs:', selectedJobs);
    // Add bulk promotion logic here
  };

  const handleManualPromotion = () => {
    console.log('Manual promotion:', { jobId: promotionJobId, highlightType });
    // Add manual promotion logic here
    setPromotionJobId('');
  };

  const filteredJobs = jobPostings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Derived courses list based on search and status
  const filteredCourses = courses.filter(course => {
    const search = courseSearchTerm.toLowerCase();
    const matchesSearch =
      course.title.toLowerCase().includes(search) ||
      course.category.toLowerCase().includes(search) ||
      course.instructor.toLowerCase().includes(search);
    const matchesStatus = courseStatusFilter === 'All Status' || course.status === courseStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Course table interactions
  const handleCourseSelectAll = (checked) => {
    if (checked) {
      setSelectedCourses(filteredCourses.map(c => c.id));
    } else {
      setSelectedCourses([]);
    }
  };

  const handleCourseSelect = (courseId, checked) => {
    if (checked) {
      setSelectedCourses(prev => Array.from(new Set([...prev, courseId])));
    } else {
      setSelectedCourses(prev => prev.filter(id => id !== courseId));
    }
  };

  const updateCourseStatus = (ids, nextStatus) => {
    setCourses(prev => prev.map(c => (ids.includes(c.id) ? { ...c, status: nextStatus } : c)));
  };

  const handleApproveCourse = (courseId) => {
    updateCourseStatus([courseId], 'Approved');
  };

  const handleFeatureCourse = (courseId) => {
    updateCourseStatus([courseId], 'Featured');
  };

  const handleBulkCourseApprove = () => {
    if (selectedCourses.length === 0) return;
    updateCourseStatus(selectedCourses, 'Approved');
  };

  const handleBulkCourseFeature = () => {
    if (selectedCourses.length === 0) return;
    updateCourseStatus(selectedCourses, 'Featured');
  };

  // Category management
  const handleAddCategory = () => {
    const name = newCategory.trim();
    if (!name) return;
    if (categories.includes(name)) return;
    setCategories(prev => [...prev, name]);
    setNewCategory('');
  };

  const handleDeleteCategory = (name) => {
    setCategories(prev => prev.filter(c => c !== name));
  };

  const handleRenameCategory = (oldName) => {
    const next = window.prompt('Rename category', oldName);
    const name = (next || '').trim();
    if (!name) return;
    setCategories(prev => prev.map(c => (c === oldName ? name : c)));
  };

  // Top-rated tagging
  const handleTagTopRated = () => {
    const ids = courses.filter(c => c.rating >= Number(minTopRated)).map(c => c.id);
    if (ids.length) updateCourseStatus(ids, 'Featured');
  };

  // keep URL in sync with selected tab
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
      {/* Main Header Section */}
     
        <div className="text-center">
          <h1 className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>Job & Course Control</h1>
          <p className={`${TAILWIND_COLORS.TEXT_PRIMARY} text-sm`}>Manage job postings, course approvals, and content quality control</p>
        </div>
      

      {/* Job Metrics Cards */}
      <div className="metrics-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.values(jobMetrics).map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            count={metric.count}
            icon={metric.icon}
            iconBgColor={metric.iconBgColor}
            iconColor={metric.iconColor}
          />
        ))}
      </div>

      {/* Navigation Tabs */}
      <NavigationTabs 
        navigationTabs={navigationTabs}
        activeNavTab={activeNavTab}
        setActiveNavTab={setActiveNavTab}
      />

      {activeNavTab === 'job-posting' && (
      <div className="job-posting-section space-y-6">
        <div
          className="job-posting-management-card bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          data-section="job-posting-management"
        >
        <div className="jp-header flex items-center space-x-3 mb-6">
          <div className="jp-header__icon h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: COLORS.GREEN_PRIMARY }}>
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
          </div>
          <div className="jp-header__text">
            <h2 className={`text-xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Job Posting Management</h2>
            <p className="text-gray-600 text-sm">View / Manage all jobs, approve flagged posts, and promote jobs manually.</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="jp-toolbar flex flex-col sm:flex-row gap-4 mb-4">
          <div className="jp-search flex-1">
            <div className="relative">
              <div className="jp-search__icon absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search Jobs & Companies"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="jp-search__input w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B537D] focus:border-transparent"
              />
            </div>
          </div>
          <div className="jp-filter sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="jp-filter__select w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B537D] focus:border-transparent"
            >
              <option value="All Status">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Flagged">Flagged</option>
              <option value="Promoted">Promoted</option>
            </select>
          </div>
          <div className="jp-toolbar__actions flex gap-3">
            <button
              onClick={handleBulkApprove}
              className={`jp-btn jp-btn--approve px-4 py-2 rounded-lg transition-colors duration-200 ${TAILWIND_COLORS.BTN_PRIMARY}`}
            >
              Approve selected
            </button>
            <button
              onClick={handleBulkPromote}
              className={`jp-btn jp-btn--promote px-4 py-2 rounded-lg transition-colors duration-200 ${TAILWIND_COLORS.BTN_LIGHT}`}
              style={{ borderColor: COLORS.GREEN_PRIMARY, color: COLORS.GREEN_PRIMARY }}
            >
              Promote selected
            </button>
          </div>
        </div>

        {/* Main Job Posting Table */}
        <div className="overflow-hidden">
        <div className="jp-table__wrapper overflow-x-auto">
          <table className="jp-table w-full">
            <thead className="jp-table__head bg-gray-50">
              <tr>
                <th className="jp-th px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedJobs.length === jobPostings.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300"
                    style={{ accentColor: COLORS.GREEN_PRIMARY }}
                  />
                </th>
                <th className="jp-th px-6 py-3 text-left text-sm font-medium text-gray-900">Title</th>
                <th className="jp-th px-6 py-3 text-left text-sm font-medium text-gray-900">Company</th>
                <th className="jp-th px-6 py-3 text-left text-sm font-medium text-gray-900">Posted</th>
                <th className="jp-th px-6 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                <th className="jp-th px-6 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="jp-table__body divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="jp-table__row hover:bg-gray-50">
                  <td className="jp-td px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedJobs.includes(job.id)}
                      onChange={(e) => handleSelectJob(job.id, e.target.checked)}
                      className="rounded border-gray-300"
                      style={{ accentColor: COLORS.GREEN_PRIMARY }}
                    />
                  </td>
                  <td className="jp-td px-6 py-4 text-sm font-medium text-gray-900">{job.title}</td>
                  <td className="jp-td px-6 py-4 text-sm text-gray-600">{job.company}</td>
                  <td className="jp-td px-6 py-4 text-sm text-gray-600">{job.posted}</td>
                  <td className="jp-td px-6 py-4">
                    <span
                      data-status={job.status.toLowerCase()}
                      className={`jp-status-badge inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        job.status === 'Approved'
                          ? TAILWIND_COLORS.BADGE_SUCCESS
                          : job.status === 'Flagged'
                          ? TAILWIND_COLORS.BADGE_WARN
                          : job.status === 'Promoted'
                          ? TAILWIND_COLORS.BADGE_INFO
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="jp-td px-6 py-4">
                    <div className="jp-row-actions flex space-x-2">
                      <button
                        onClick={() => handleApproveJob(job.id)}
                        className={`jp-row-btn jp-row-btn--approve px-3 py-1 text-xs rounded transition-colors duration-200 ${TAILWIND_COLORS.BTN_PRIMARY}`}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handlePromoteJob(job.id)}
                        className={`jp-row-btn jp-row-btn--promote px-3 py-1 text-xs rounded transition-colors duration-200 ${TAILWIND_COLORS.BTN_LIGHT}`}
                        style={{ borderColor: COLORS.GREEN_PRIMARY, color: COLORS.GREEN_PRIMARY }}
                      >
                        Promote
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
        </div>
        {/* Secondary actions row: Flagged posts + Manual promotion */}
        <div className="secondary-actions-grid grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Flagged posts review */}
        <div
          className={`flagged-posts-card flagged-card ${TAILWIND_COLORS.CARD} p-6`}
          data-section="flagged-posts"
        >
          <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Flagged posts review</h3>
          <p className="text-sm text-gray-600 mt-1">Quickly handle reports from users.</p>

          <div className="mt-4 space-y-3">
            {flaggedPosts.map((post) => (
              <div
                key={post.id}
                className="flagged-item flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3"
              >
                <div>
                  <div className="text-sm font-medium text-gray-900">{post.title}</div>
                  <div className="text-sm text-gray-600">{post.company} - {post.reports} reports</div>
                </div>
                <div className="flagged-item__actions flex items-center gap-3">
                  <button
                    onClick={() => handleApproveJob(post.id)}
                    className={`flagged-approve-btn px-4 py-2 rounded-lg transition-colors duration-200 ${TAILWIND_COLORS.BTN_PRIMARY}`}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => console.log('Viewing flagged job', post.id)}
                    className={`flagged-view-btn px-4 py-2 bg-white rounded-lg transition-colors duration-200 ${TAILWIND_COLORS.BTN_LIGHT}`}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Manual promotion */}
        <div
          className={`manual-promotion-card manual-card ${TAILWIND_COLORS.CARD} p-6`}
          data-section="manual-promotion"
        >
          <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Manual promotion</h3>
          <p className="text-sm text-gray-600 mt-1">Boost visibility for selected jobs.</p>

          <div className="mt-4">
            <label className="manual-jobid-label block text-sm font-medium text-gray-700 mb-1">Job ID</label>
            <input
              type="text"
              placeholder="e.g. J-103"
              value={promotionJobId}
              onChange={(e) => setPromotionJobId(e.target.value)}
              className="manual-jobid-input w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B537D] focus:border-transparent"
            />
          </div>

          <div className="mt-5">
            <div className="manual-highlight-title text-sm font-medium text-gray-700 mb-3">Highlight</div>

            <div className="manual-highlight-group space-y-3" role="radiogroup" aria-label="Highlight type">
              {/* Top ribbon option */}
              <label className="manual-radio flex items-center gap-3 cursor-pointer select-none">
                <button
                  type="button"
                  role="radio"
                  aria-checked={highlightType === 'top-ribbon'}
                  onClick={() => setHighlightType('top-ribbon')}
                  className={`flex items-center justify-center h-6 w-6 rounded-full border-2 transition-colors duration-200 ${
                    highlightType === 'top-ribbon' ? '' : 'border-gray-300'
                  }`}
                  style={{
                    borderColor: highlightType === 'top-ribbon' ? COLORS.GREEN_PRIMARY : undefined,
                    backgroundColor: highlightType === 'top-ribbon' ? 'rgba(92,154,36,0.1)' : undefined
                  }}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full transition-colors duration-200 ${
                      highlightType === 'top-ribbon' ? '' : 'bg-transparent'
                    }`}
                    style={{ backgroundColor: highlightType === 'top-ribbon' ? COLORS.GREEN_PRIMARY : undefined }}
                  />
                </button>
                <span className="text-sm text-gray-800">Top ribbon</span>
              </label>

              {/* Priority listing option */}
              <label className="manual-radio flex items-center gap-3 cursor-pointer select-none">
                <button
                  type="button"
                  role="radio"
                  aria-checked={highlightType === 'priority'}
                  onClick={() => setHighlightType('priority')}
                  className={`flex items-center justify-center h-6 w-6 rounded-full border-2 transition-colors duration-200 ${
                    highlightType === 'priority' ? '' : 'border-gray-300'
                  }`}
                  style={{
                    borderColor: highlightType === 'priority' ? COLORS.GREEN_PRIMARY : undefined,
                    backgroundColor: highlightType === 'priority' ? 'rgba(92,154,36,0.1)' : undefined
                  }}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full transition-colors duration-200 ${
                      highlightType === 'priority' ? '' : 'bg-transparent'
                    }`}
                    style={{ backgroundColor: highlightType === 'priority' ? COLORS.GREEN_PRIMARY : undefined }}
                  />
                </button>
                <span className="text-sm text-gray-800">Priority listing</span>
              </label>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleManualPromotion}
              className={`manual-promote-btn px-4 py-2 rounded-lg transition-colors duration-200 ${TAILWIND_COLORS.BTN_PRIMARY}`}
            >
              Promote Job
            </button>
          </div>
        </div>
      </div>
      </div>
      )}


{/* Course Oversight */}
      {activeNavTab === 'course-oversight' && (
        <div className="space-y-6">
          {/* Card like Job Posting Management */}
          <div className="courses-moderation-card bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: COLORS.GREEN_PRIMARY }}>
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 4h16v2H4zM4 9h16v2H4zM4 14h10v2H4zM4 19h10v2H4z" />
                </svg>
              </div>
              <div>
                <h2 className={`text-xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Courses moderation</h2>
                <p className="text-gray-600 text-sm">List of all courses, approvals, categories, and top-rated tagging.</p>
              </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch mb-4">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search Courses & categories"
                    value={courseSearchTerm}
                    onChange={(e) => setCourseSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B537D] focus:border-transparent"
                  />
                </div>
              </div>
              <div className="sm:w-48">
                <select
                  value={courseStatusFilter}
                  onChange={(e) => setCourseStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B537D] focus:border-transparent"
                >
                  <option value="All Status">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Featured">Featured</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button onClick={handleBulkCourseApprove} className={`px-4 py-2 rounded-lg transition-colors duration-200 ${TAILWIND_COLORS.BTN_PRIMARY}`}>Approve selected</button>
                <button onClick={handleBulkCourseFeature} className={`px-4 py-2 rounded-lg transition-colors duration-200 ${TAILWIND_COLORS.BTN_LIGHT}`} style={{ borderColor: COLORS.GREEN_PRIMARY, color: COLORS.GREEN_PRIMARY }}>Feature selected</button>
              </div>
            </div>

            {/* Courses table */}
            <div className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedCourses.length === filteredCourses.length && filteredCourses.length > 0}
                          onChange={(e) => handleCourseSelectAll(e.target.checked)}
                          className="rounded border-gray-300"
                          style={{ accentColor: COLORS.GREEN_PRIMARY }}
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Title</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Category</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Instructor</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Rating</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredCourses.map((course) => (
                      <tr key={course.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedCourses.includes(course.id)}
                            onChange={(e) => handleCourseSelect(course.id, e.target.checked)}
                            className="rounded border-gray-300"
                            style={{ accentColor: COLORS.GREEN_PRIMARY }}
                          />
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{course.title}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{course.category}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{course.instructor}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{course.rating}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            course.status === 'Approved'
                              ? TAILWIND_COLORS.BADGE_SUCCESS
                              : course.status === 'Featured'
                              ? TAILWIND_COLORS.BADGE_WARN
                              : TAILWIND_COLORS.BADGE_INFO
                          }`}>
                            {course.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleApproveCourse(course.id)} className={`px-3 py-1 text-xs rounded transition-colors duration-200 ${TAILWIND_COLORS.BTN_PRIMARY}`}>Approve</button>
                            <button onClick={() => handleFeatureCourse(course.id)} className={`px-3 py-1 text-xs rounded ${TAILWIND_COLORS.BTN_LIGHT}`} style={{ borderColor: COLORS.GREEN_PRIMARY, color: COLORS.GREEN_PRIMARY }}>Feature</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Bottom panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Manage categories */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>Manage categories</h3>
              <p className="text-sm text-gray-600 mb-4">Create, rename, and remove categories.</p>
              <div className="flex gap-3 items-center mb-4">
                <input
                  type="text"
                  placeholder="New category name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B537D] focus:border-transparent"
                />
                <button onClick={handleAddCategory} className={`px-4 py-2 rounded-lg transition-colors duration-200 ${TAILWIND_COLORS.BTN_PRIMARY}`}>Add</button>
              </div>
              <div className="space-y-3">
                {categories.map((c) => (
                  <div key={c} className="flex items-center gap-3">
                    <div className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 bg-white">{c}</div>
                    <button onClick={() => handleRenameCategory(c)} className={`px-3 py-1 text-xs rounded transition-colors duration-200 ${TAILWIND_COLORS.BTN_PRIMARY}`}>Rename</button>
                    <button onClick={() => handleDeleteCategory(c)} className={`px-3 py-1 text-xs rounded ${TAILWIND_COLORS.BTN_LIGHT}`} style={{ borderColor: COLORS.GREEN_PRIMARY, color: COLORS.GREEN_PRIMARY }}>Delete</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Top-rated tagging */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>Top-rated tagging</h3>
              <p className="text-sm text-gray-600 mb-4">Mark outstanding courses for extra visibility</p>

              <div className="text-sm text-gray-700 mb-4">
                <div className="mb-1">Minimum rating</div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={0}
                    max={5}
                    step={0.1}
                    value={minTopRated}
                    onChange={(e) => setMinTopRated(e.target.value)}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B537D] focus:border-transparent"
                  />
                </div>
              </div>
              <button onClick={handleTagTopRated} className={`px-4 py-2 rounded-lg transition-colors duration-200 ${TAILWIND_COLORS.BTN_PRIMARY}`}>Tag top-rated</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default JobCourseControlView;

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MetricCard from '../components/metricCard.jsx';
import NavigationTabs from '../../../shared/components/navigation';
import { COLORS, TAILWIND_COLORS } from '../../../shared/WebConstant';
import Button from '../../../shared/components/Button.jsx';

const JobCourseControlView = () => {
  // ====== STATE MANAGEMENT ======
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [promotionJobId, setPromotionJobId] = useState('');
  const [highlightType, setHighlightType] = useState('top-ribbon');
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeNavTab, setActiveNavTab] = useState(() => searchParams.get('tab') || 'job-posting');

  // Courses state
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

  // ====== DATA CONFIGURATION ======
  const jobPostings = [
    { id: 1, title: 'Electrician', company: 'NovaTech', posted: '2025-08-08', status: 'Pending' },
    { id: 2, title: 'Fitter', company: 'NovaTech', posted: '2025-08-08', status: 'Approved' },
    { id: 3, title: 'COPA', company: 'NovaTech', posted: '2025-08-08', status: 'Flagged' },
    { id: 4, title: 'Fitter', company: 'NovaTech', posted: '2025-08-08', status: 'Promoted' },
    { id: 5, title: 'Electrician', company: 'NovaTech', posted: '2025-08-08', status: 'Flagged' }
  ];

  const flaggedPosts = [{ id: 1, title: 'Product Manager', company: 'Novatech', reports: 3 }];

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

  // ====== COMPUTED VALUES ======
  const filteredJobs = jobPostings.filter(job => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = job.title.toLowerCase().includes(q) || job.company.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'All Status' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredCourses = courses.filter(course => {
    const q = courseSearchTerm.toLowerCase();
    const matchesSearch = course.title.toLowerCase().includes(q) || course.category.toLowerCase().includes(q) || course.instructor.toLowerCase().includes(q);
    const matchesStatus = courseStatusFilter === 'All Status' || course.status === courseStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // ====== EVENT HANDLERS ======
  // Job selection handlers
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedJobs(filteredJobs.map(job => job.id));
    } else {
      setSelectedJobs([]);
    }
  };

  const handleSelectJob = (jobId, checked) => {
    setSelectedJobs(prev => checked ? [...new Set([...prev, jobId])] : prev.filter(id => id !== jobId));
  };

  // Job action handlers
  const handleApproveJob = (jobId) => console.log('Approving job:', jobId);
  const handlePromoteJob = (jobId) => console.log('Promoting job:', jobId);
  const handleBulkApprove = () => console.log('Bulk approving jobs:', selectedJobs);
  const handleBulkPromote = () => console.log('Bulk promoting jobs:', selectedJobs);
  const handleManualPromotion = () => {
    console.log('Manual promotion:', { jobId: promotionJobId, highlightType });
    setPromotionJobId('');
  };

  // Course selection handlers
  const handleCourseSelectAll = (checked) => setSelectedCourses(checked ? filteredCourses.map(c => c.id) : []);
  const handleCourseSelect = (courseId, checked) => setSelectedCourses(prev => checked ? [...new Set([...prev, courseId])] : prev.filter(id => id !== courseId));
  
  // Course action handlers
  const updateCourseStatus = (ids, nextStatus) => setCourses(prev => prev.map(c => (ids.includes(c.id) ? { ...c, status: nextStatus } : c)));
  const handleApproveCourse = (courseId) => updateCourseStatus([courseId], 'Approved');
  const handleFeatureCourse = (courseId) => updateCourseStatus([courseId], 'Featured');
  const handleBulkCourseApprove = () => selectedCourses.length && updateCourseStatus(selectedCourses, 'Approved');
  const handleBulkCourseFeature = () => selectedCourses.length && updateCourseStatus(selectedCourses, 'Featured');

  // Category management handlers
  const handleAddCategory = () => {
    const name = newCategory.trim();
    if (!name || categories.includes(name)) return;
    setCategories(prev => [...prev, name]);
    setNewCategory('');
  };
  const handleDeleteCategory = (name) => setCategories(prev => prev.filter(c => c !== name));
  const handleRenameCategory = (oldName) => {
    const next = window.prompt('Rename category', oldName);
    const name = (next || '').trim();
    if (!name) return;
    setCategories(prev => prev.map(c => (c === oldName ? name : c)));
  };

  // Top-rated tagging handler
  const handleTagTopRated = () => {
    const ids = courses.filter(c => c.rating >= Number(minTopRated)).map(c => c.id);
    if (ids.length) updateCourseStatus(ids, 'Featured');
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
      {activeNavTab === 'job-posting' && (
      <div className="job-posting-section space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6" data-section="job-posting-management">
            {/* Toolbar */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: COLORS.GREEN_PRIMARY }}>
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <div>
                <h2 className={`text-xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Job Posting Management</h2>
                <p className="text-gray-600 text-sm">View / Manage all jobs, approve flagged posts, and promote jobs manually.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search Jobs & Companies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B537D] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="sm:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B537D] focus:border-transparent"
                >
                  <option value="All Status">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Flagged">Flagged</option>
                  <option value="Promoted">Promoted</option>
                </select>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleBulkApprove} className={`px-4 py-2 rounded-lg transition-colors duration-200 ${TAILWIND_COLORS.BTN_PRIMARY}`} variant="unstyled">Approve selected</Button>
                <Button onClick={handleBulkPromote} className={`px-4 py-2 rounded-lg transition-colors duration-200 ${TAILWIND_COLORS.BTN_LIGHT}`} style={{ borderColor: COLORS.GREEN_PRIMARY, color: COLORS.GREEN_PRIMARY }} variant="unstyled">Promote selected</Button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={filteredJobs.length > 0 && selectedJobs.length === filteredJobs.length}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="rounded border-gray-300"
                          style={{ accentColor: COLORS.GREEN_PRIMARY }}
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Title</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Company</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Posted</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedJobs.includes(job.id)}
                            onChange={(e) => handleSelectJob(job.id, e.target.checked)}
                            className="rounded border-gray-300"
                            style={{ accentColor: COLORS.GREEN_PRIMARY }}
                          />
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{job.title}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{job.company}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{job.posted}</td>
                        <td className="px-6 py-4">
                          <span
                            data-status={job.status.toLowerCase()}
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
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
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <Button onClick={() => handleApproveJob(job.id)} className={`px-3 py-1 text-xs rounded transition-colors duration-200 ${TAILWIND_COLORS.BTN_PRIMARY}`} variant="unstyled">Approve</Button>
                            <Button onClick={() => handlePromoteJob(job.id)} className={`px-3 py-1 text-xs rounded ${TAILWIND_COLORS.BTN_LIGHT}`} style={{ borderColor: COLORS.GREEN_PRIMARY, color: COLORS.GREEN_PRIMARY }} variant="unstyled">Promote</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Secondary actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Flagged posts */}
            <div className={`${TAILWIND_COLORS.CARD} p-6`} data-section="flagged-posts">
              <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Flagged posts review</h3>
              <p className="text-sm text-gray-600 mt-1">Quickly handle reports from users.</p>
              <div className="mt-4 space-y-3">
                {flaggedPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{post.title}</div>
                      <div className="text-sm text-gray-600">{post.company} - {post.reports} reports</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button onClick={() => handleApproveJob(post.id)} className={`px-4 py-2 rounded-lg transition-colors duration-200 ${TAILWIND_COLORS.BTN_PRIMARY}`} variant="unstyled">Approve</Button>
                      <Button onClick={() => console.log('Viewing flagged job', post.id)} className={`px-4 py-2 rounded-lg ${TAILWIND_COLORS.BTN_LIGHT}`} variant="unstyled">View</Button>
              </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Manual promotion */}
            <div className={`${TAILWIND_COLORS.CARD} p-6`} data-section="manual-promotion">
              <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Manual promotion</h3>
              <p className="text-sm text-gray-600 mt-1">Boost visibility for selected jobs.</p>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Job ID</label>
                  <input
                  type="text"
                  placeholder="e.g. J-103"
                  value={promotionJobId}
                  onChange={(e) => setPromotionJobId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B537D] focus:border-transparent"
                  />
                </div>

              <div className="mt-5">
                <div className="text-sm font-medium text-gray-700 mb-3">Highlight</div>

                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <Button
                    type="button"
                    role="radio"
                    aria-checked={highlightType === 'top-ribbon'}
                    onClick={() => setHighlightType('top-ribbon')}
                    className={`flex items-center justify-center h-6 w-6 rounded-full border-2 transition-colors duration-200 ${highlightType === 'top-ribbon' ? '' : 'border-gray-300'}`}
                    style={{ borderColor: highlightType === 'top-ribbon' ? COLORS.GREEN_PRIMARY : undefined, backgroundColor: highlightType === 'top-ribbon' ? 'rgba(92,154,36,0.1)' : undefined }}
                    variant="unstyled"
                  >
                    <span className={`h-2.5 w-2.5 rounded-full transition-colors duration-200 ${highlightType === 'top-ribbon' ? '' : 'bg-transparent'}`} style={{ backgroundColor: highlightType === 'top-ribbon' ? COLORS.GREEN_PRIMARY : undefined }} />
                  </Button>
                  <span className="text-sm text-gray-800">Top ribbon</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer select-none mt-3">
                  <Button
                    type="button"
                    role="radio"
                    aria-checked={highlightType === 'priority'}
                    onClick={() => setHighlightType('priority')}
                    className={`flex items-center justify-center h-6 w-6 rounded-full border-2 transition-colors duration-200 ${highlightType === 'priority' ? '' : 'border-gray-300'}`}
                    style={{ borderColor: highlightType === 'priority' ? COLORS.GREEN_PRIMARY : undefined, backgroundColor: highlightType === 'priority' ? 'rgba(92,154,36,0.1)' : undefined }}
                    variant="unstyled"
                  >
                    <span className={`h-2.5 w-2.5 rounded-full transition-colors duration-200 ${highlightType === 'priority' ? '' : 'bg-transparent'}`} style={{ backgroundColor: highlightType === 'priority' ? COLORS.GREEN_PRIMARY : undefined }} />
                  </Button>
                  <span className="text-sm text-gray-800">Priority listing</span>
                </label>
              </div>

              <div className="mt-6">
                <Button onClick={handleManualPromotion} className={`px-4 py-2 rounded-lg transition-colors duration-200 ${TAILWIND_COLORS.BTN_PRIMARY}`} variant="unstyled">Promote Job</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Course Oversight */}
      {activeNavTab === 'course-oversight' && (
        <div className="space-y-6">
          {/* Course Management */}
          <div className={`${TAILWIND_COLORS.CARD} p-6`}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: COLORS.GREEN_PRIMARY }}>
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h2 className={`text-xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Course Oversight</h2>
                <p className="text-gray-600 text-sm">Manage course approvals, categories, and quality control</p>
              </div>
            </div>

            {/* Course Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search courses, categories, or instructors"
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
                <Button 
                  onClick={handleBulkCourseApprove} 
                  variant="primary" 
                  size="md"
                >
                  Approve Selected
                </Button>
                <Button 
                  onClick={handleBulkCourseFeature} 
                  variant="outline" 
                  size="md"
                >
                  Feature Selected
                </Button>
              </div>
            </div>

            {/* Course Table */}
            <div className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={filteredCourses.length > 0 && selectedCourses.length === filteredCourses.length}
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
                        <td className="px-6 py-4 text-sm text-gray-600">{course.rating} ⭐</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              course.status === 'Approved'
                                ? TAILWIND_COLORS.BADGE_SUCCESS
                                : course.status === 'Featured'
                                ? TAILWIND_COLORS.BADGE_INFO
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {course.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <Button 
                              onClick={() => handleApproveCourse(course.id)} 
                              variant="primary" 
                              size="sm"
                            >
                              Approve
                            </Button>
                            <Button 
                              onClick={() => handleFeatureCourse(course.id)} 
                              variant="outline" 
                              size="sm"
                            >
                              Feature
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Category Management */}
          <div className={`${TAILWIND_COLORS.CARD} p-6`}>
            <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Category Management</h3>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <div key={category} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                  <span className="text-sm text-gray-700">{category}</span>
                  <button
                    onClick={() => handleRenameCategory(category)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add new category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B537D] focus:border-transparent"
              />
              <Button onClick={handleAddCategory} variant="primary" size="md">
                Add Category
              </Button>
            </div>
          </div>

          {/* Top-Rated Courses */}
          <div className={`${TAILWIND_COLORS.CARD} p-6`}>
            <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Top-Rated Courses</h3>
            
            <div className="flex items-center gap-4 mb-4">
              <label className="text-sm font-medium text-gray-700">Minimum Rating:</label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={minTopRated}
                onChange={(e) => setMinTopRated(Number(e.target.value))}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B537D] focus:border-transparent"
              />
              <Button onClick={handleTagTopRated} variant="primary" size="md">
                Tag as Featured
              </Button>
            </div>

            <p className="text-sm text-gray-600">
              Courses with rating ≥ {minTopRated} will be tagged as featured
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCourseControlView;

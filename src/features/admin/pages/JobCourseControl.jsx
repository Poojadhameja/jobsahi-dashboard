import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MetricCard from '../components/metricCard.jsx';
import NavigationTabs from '../../../shared/components/navigation';


const JobCourseControlView = () => {
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [promotionJobId, setPromotionJobId] = useState('');
  const [highlightType, setHighlightType] = useState('top-ribbon');
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeNavTab, setActiveNavTab] = useState(() => searchParams.get('tab') || 'job-posting');

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
    <div className="space-y-6">
      {/* Main Header Section */}
     
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0B537D] mb-2">Job & Course Control</h1>
          <p className="text-[#0B537D] text-sm">Manage job postings, course approvals, and content quality control</p>
        </div>
      

      {/* Job Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="h-8 w-8 bg-[#5B9821] rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0B537D]">Job Posting Management</h2>
            <p className="text-gray-600 text-sm">View / Manage all jobs, approve flagged posts, and promote jobs manually.</p>
          </div>
        </div>

        {/* Search and Filter */}
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
            <button
              onClick={handleBulkApprove}
              className="px-4 py-2 bg-[#5B9821] text-white rounded-lg hover:bg-[#4A7D1A] transition-colors duration-200"
            >
              Approve selected
            </button>
            <button
              onClick={handleBulkPromote}
              className="px-4 py-2 bg-green-200 text-green-700 rounded-lg hover:bg-green-300 transition-colors duration-200"
            >
              Promote selected
            </button>
          </div>
        </div>

        {/* Main Job Posting Table */}
        <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedJobs.length === jobPostings.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-[#5B9821] focus:ring-[#5B9821]"
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
                      className="rounded border-gray-300 text-[#5B9821] focus:ring-[#5B9821]"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{job.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{job.company}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{job.posted}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${job.statusColor}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApproveJob(job.id)}
                        className="px-3 py-1 bg-[#5B9821] text-white text-xs rounded hover:bg-[#4A7D1A] transition-colors duration-200"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handlePromoteJob(job.id)}
                        className="px-3 py-1 bg-green-200 text-green-700 text-xs rounded hover:bg-green-300 transition-colors duration-200"
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
      )}

      {activeNavTab === 'course-oversight' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-[#0B537D] mb-2">Course approvals</h3>
            <p className="text-sm text-gray-600 mb-4">Review and approve submitted course updates.</p>
            <div className="text-sm text-gray-600">No pending requests.</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-[#0B537D] mb-2">Curriculum management</h3>
            <p className="text-sm text-gray-600 mb-4">Manage course structure and modules.</p>
            <button className="px-4 py-2 bg-[#0B537D] text-white rounded-lg hover:bg-[#0A4A6B] transition-colors duration-200">Create new course</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCourseControlView;

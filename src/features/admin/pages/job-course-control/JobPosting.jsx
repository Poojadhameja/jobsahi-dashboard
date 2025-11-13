import React, { useState } from 'react';
import { COLORS, TAILWIND_COLORS } from '../../../../shared/WebConstant.js';
import Button from '../../../../shared/components/Button.jsx';

const JobPosting = () => {
  // ====== STATE MANAGEMENT ======
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [promotionJobId, setPromotionJobId] = useState('');
  const [topRibbonEnabled, setTopRibbonEnabled] = useState(false);
  const [priorityListingEnabled, setPriorityListingEnabled] = useState(false);
  const [showFlaggedModal, setShowFlaggedModal] = useState(false);
  const [selectedFlaggedPost, setSelectedFlaggedPost] = useState(null);
  const [actionMessage, setActionMessage] = useState('');
  const [flaggedPosts, setFlaggedPosts] = useState([
    { 
      id: 1, 
      title: 'Product Manager', 
      company: 'Novatech', 
      reports: 3,
      description: 'We are looking for a skilled Product Manager to join our team and drive product strategy.',
      location: 'New York, NY',
      salary: '$80,000 - $120,000',
      postedBy: 'John Smith',
      postedDate: '2025-01-15',
      reportReasons: [
        { reason: 'Misleading job description', reporter: 'User123', date: '2025-01-16' },
        { reason: 'Fake company information', reporter: 'User456', date: '2025-01-16' },
        { reason: 'Spam content', reporter: 'User789', date: '2025-01-17' }
      ]
    },
    { 
      id: 2, 
      title: 'Software Engineer', 
      company: 'TechCorp', 
      reports: 2,
      description: 'Join our dynamic team as a Software Engineer and work on cutting-edge projects.',
      location: 'San Francisco, CA',
      salary: '$90,000 - $130,000',
      postedBy: 'Jane Doe',
      postedDate: '2025-01-14',
      reportReasons: [
        { reason: 'Suspicious company', reporter: 'User456', date: '2025-01-15' },
        { reason: 'Unrealistic salary range', reporter: 'User789', date: '2025-01-15' }
      ]
    }
  ]);

  // ====== DATA CONFIGURATION ======
  const jobPostings = [
    { id: 1, title: 'Electrician', company: 'NovaTech', posted: '2025-08-08', status: 'Pending' },
    { id: 2, title: 'Fitter', company: 'NovaTech', posted: '2025-08-08', status: 'Approved' },
    { id: 3, title: 'COPA', company: 'NovaTech', posted: '2025-08-08', status: 'Flagged' },
    { id: 4, title: 'Fitter', company: 'NovaTech', posted: '2025-08-08', status: 'Promoted' },
    { id: 5, title: 'Electrician', company: 'NovaTech', posted: '2025-08-08', status: 'Flagged' }
  ];


  // ====== COMPUTED VALUES ======
  const filteredJobs = jobPostings.filter(job => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = job.title.toLowerCase().includes(q) || job.company.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'All Status' || job.status === statusFilter;
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
    console.log('Manual promotion:', { 
      jobId: promotionJobId, 
      topRibbonEnabled,
      priorityListingEnabled
    });
    setPromotionJobId('');
  };

  // Flagged post handlers
  const handleViewFlaggedPost = (post) => {
    setSelectedFlaggedPost(post);
    setShowFlaggedModal(true);
  };

  const handleCloseFlaggedModal = () => {
    setShowFlaggedModal(false);
    setSelectedFlaggedPost(null);
  };

  const handleApproveFlaggedPost = (postId) => {
    console.log('Approving flagged post:', postId);
    // Update the flagged posts array to remove the approved post
    setFlaggedPosts(prev => prev.filter(post => post.id !== postId));
    setActionMessage('Post approved successfully!');
    // Here you would typically update the post status in your backend
    // Example API call:
    // await approveFlaggedPost(postId);
    handleCloseFlaggedModal();
    // Clear message after 3 seconds
    setTimeout(() => setActionMessage(''), 3000);
  };

  const handleRejectFlaggedPost = (postId) => {
    console.log('Rejecting flagged post:', postId);
    // Update the flagged posts array to remove the rejected post
    setFlaggedPosts(prev => prev.filter(post => post.id !== postId));
    setActionMessage('Post rejected successfully!');
    // Here you would typically remove or hide the post from your backend
    // Example API call:
    // await rejectFlaggedPost(postId);
    handleCloseFlaggedModal();
    // Clear message after 3 seconds
    setTimeout(() => setActionMessage(''), 3000);
  };

  return (
    <div className="job-posting-section space-y-6">
      {/* Success Message */}
      {actionMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {actionMessage}
          </div>
        </div>
      )}
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
            <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>View / Manage all jobs, approve flagged posts, and promote jobs manually.</p>
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              />
            </div>
          </div>

          <div className="sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
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
            <Button onClick={handleBulkPromote} className={`px-4 py-2 rounded-lg transition-colors duration-200 border-secondary text-secondary bg-bg-white hover:bg-gray-100`} variant="unstyled">Promote selected</Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-12 px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={filteredJobs.length > 0 && selectedJobs.length === filteredJobs.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-gray-300"
                      style={{ accentColor: COLORS.GREEN_PRIMARY }}
                    />
                  </th>
                  <th className={`w-1/4 px-4 py-3 text-left text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Title</th>
                  <th className={`w-1/5 px-4 py-3 text-left text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Company</th>
                  <th className={`w-1/6 px-4 py-3 text-left text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Posted</th>
                  <th className={`w-1/6 px-4 py-3 text-center text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Status</th>
                  <th className={`w-1/5 px-4 py-3 text-center text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="w-12 px-4 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedJobs.includes(job.id)}
                        onChange={(e) => handleSelectJob(job.id, e.target.checked)}
                        className="rounded border-gray-300"
                        style={{ accentColor: COLORS.GREEN_PRIMARY }}
                      />
                    </td>
                    <td className={`w-1/4 px-4 py-4 text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} truncate`} title={job.title}>{job.title}</td>
                    <td className={`w-1/5 px-4 py-4 text-sm ${TAILWIND_COLORS.TEXT_MUTED} truncate`} title={job.company}>{job.company}</td>
                    <td className={`w-1/6 px-4 py-4 text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>{job.posted}</td>
                    <td className="w-1/6 px-4 py-4 text-center">
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
                    <td className="w-1/5 px-4 py-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <Button onClick={() => handleApproveJob(job.id)} className={`px-3 py-1 text-xs rounded transition-colors duration-200 ${TAILWIND_COLORS.BTN_PRIMARY}`} variant="unstyled">Approve</Button>
                        <Button onClick={() => handlePromoteJob(job.id)} className={`px-3 py-1 text-xs rounded border-secondary text-secondary bg-bg-white hover:bg-gray-100`} variant="unstyled">Promote</Button>
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
          <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>Quickly handle reports from users.</p>
          <div className="mt-4 space-y-3">
            {flaggedPosts.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>No flagged posts to review</p>
              </div>
            ) : (
              flaggedPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3">
                  <div>
                    <div className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{post.title}</div>
                    <div className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>{post.company} - {post.reports} reports</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button onClick={() => handleApproveJob(post.id)} className={`px-4 py-2 rounded-lg transition-colors duration-200 ${TAILWIND_COLORS.BTN_PRIMARY}`} variant="unstyled">Approve</Button>
                    <Button onClick={() => handleViewFlaggedPost(post)} className={`px-4 py-2 rounded-lg border-secondary text-secondary bg-bg-white hover:bg-gray-100`} variant="unstyled">View</Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Manual promotion */}
       
      </div>

      {/* Flagged Post Details Modal */}
      {showFlaggedModal && selectedFlaggedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: COLORS.GREEN_PRIMARY }}>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Flagged Post Details</h3>
                  <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Review reported content and take action</p>
                </div>
              </div>
              <button
                onClick={handleCloseFlaggedModal}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Job Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className={`text-md font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-3`}>Job Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Job Title</label>
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{selectedFlaggedPost.title}</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Company</label>
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{selectedFlaggedPost.company}</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Location</label>
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{selectedFlaggedPost.location}</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Salary Range</label>
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{selectedFlaggedPost.salary}</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Posted By</label>
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{selectedFlaggedPost.postedBy}</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Posted Date</label>
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{selectedFlaggedPost.postedDate}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <label className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Job Description</label>
                  <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} mt-1`}>{selectedFlaggedPost.description}</p>
                </div>
              </div>

              {/* Report Information */}
              <div className="bg-red-50 rounded-lg p-4">
                <h4 className={`text-md font-semibold text-red-800 mb-3`}>Report Details</h4>
                <div className="mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {selectedFlaggedPost.reports} Reports
                  </span>
                </div>
                <div className="space-y-3">
                  {selectedFlaggedPost.reportReasons.map((report, index) => (
                    <div key={index} className="bg-white rounded border border-red-200 p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{report.reason}</p>
                          <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED}`}>Reported by: {report.reporter}</p>
                        </div>
                        <span className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED}`}>{report.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <Button
                  onClick={() => handleRejectFlaggedPost(selectedFlaggedPost.id)}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${TAILWIND_COLORS.BTN_LIGHT}`}
                  variant="unstyled"
                >
                  Reject Post
                </Button>
                <Button
                  onClick={() => handleApproveFlaggedPost(selectedFlaggedPost.id)}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${TAILWIND_COLORS.BTN_PRIMARY}`}
                  variant="unstyled"
                >
                  Approve Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPosting;

import React, { useState } from 'react';
import { COLORS, TAILWIND_COLORS } from '../../../../shared/WebConstant';
import Button from '../../../../shared/components/Button.jsx';

const JobPosting = () => {
  // ====== STATE MANAGEMENT ======
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [promotionJobId, setPromotionJobId] = useState('');
  const [highlightType, setHighlightType] = useState('top-ribbon');

  // ====== DATA CONFIGURATION ======
  const jobPostings = [
    { id: 1, title: 'Electrician', company: 'NovaTech', posted: '2025-08-08', status: 'Pending' },
    { id: 2, title: 'Fitter', company: 'NovaTech', posted: '2025-08-08', status: 'Approved' },
    { id: 3, title: 'COPA', company: 'NovaTech', posted: '2025-08-08', status: 'Flagged' },
    { id: 4, title: 'Fitter', company: 'NovaTech', posted: '2025-08-08', status: 'Promoted' },
    { id: 5, title: 'Electrician', company: 'NovaTech', posted: '2025-08-08', status: 'Flagged' }
  ];

  const flaggedPosts = [{ id: 1, title: 'Product Manager', company: 'Novatech', reports: 3 }];

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
    console.log('Manual promotion:', { jobId: promotionJobId, highlightType });
    setPromotionJobId('');
  };

  return (
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
  );
};

export default JobPosting;

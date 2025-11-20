import React, { useState, useEffect, useCallback } from 'react';
import { COLORS, TAILWIND_COLORS } from '../../../../shared/WebConstant.js';
import Button from '../../../../shared/components/Button.jsx';
import { getMethod, postMethod, putMethod } from '../../../../service/api';
import service from '../../../../service/serviceUrl';
import apiService from '../../services/serviceUrl';
import Swal from 'sweetalert2';

const JobPosting = () => {
  // ====== STATE MANAGEMENT ======
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [promotionJobId, setPromotionJobId] = useState('');
  const [topRibbonEnabled, setTopRibbonEnabled] = useState(false);
  const [priorityListingEnabled, setPriorityListingEnabled] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [lastAction, setLastAction] = useState(null);

  // ====== DATA CONFIGURATION ======
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flaggedJobIds, setFlaggedJobIds] = useState([]);

  // ====== API CALL ======
  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getMethod({
        apiUrl: service.getJobs
      });

      console.log('📊 Jobs API Response:', response);

      // Check if response is successful
      const isSuccess = response?.status === true || response?.status === 'success' || response?.success === true;

      if (isSuccess && response?.data) {
        // Helper function to capitalize first letter of each word
        const capitalizeWords = (str) => {
          if (!str || str === 'N/A') return str;
          return str.toLowerCase().split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ');
        };

        // Map API response to component format
        const mappedJobs = response.data.map((job) => ({
          id: job.id || job.job_id,
          title: capitalizeWords(job.title || 'N/A'),
          company: capitalizeWords(job.company_name || job.company || 'N/A'),
          posted: job.created_at || job.posted_date || 'N/A',
          status: job.admin_action === 'approved' ? 'Approved' : 
                 job.admin_action === 'pending' ? 'Pending' : 
                 job.is_featured === 1 ? 'Promoted' : 
                 job.status === 'flagged' ? 'Flagged' : 
                 'Pending',
          // Keep all original data
          ...job
        }));

        console.log('✅ Mapped Jobs:', mappedJobs);
        setJobPostings(mappedJobs);
      } else {
        console.error('❌ Failed to fetch jobs:', response?.message);
        setJobPostings([]);
      }
    } catch (error) {
      console.error('❌ Error fetching jobs:', error);
      setJobPostings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchFlaggedJobs = useCallback(async () => {
    try {
      const response = await getMethod({
        apiUrl: apiService.getJobFlags
      });

      console.log('📊 Flagged Jobs API Response:', response);

      const isSuccess = response?.status === true || response?.status === 'success' || response?.success === true;

      if (isSuccess && response?.data) {
        // Extract job_ids from flagged jobs (only those that are not reviewed or pending)
        const flaggedIds = Array.isArray(response.data)
          ? response.data
              .filter(flag => flag.reviewed === 0 || flag.admin_action === 'pending')
              .map(flag => flag.job_id)
          : [];
        
        console.log('🚩 Flagged Job IDs:', flaggedIds);
        setFlaggedJobIds(flaggedIds);
      } else {
        setFlaggedJobIds([]);
      }
    } catch (error) {
      console.error('❌ Error fetching flagged jobs:', error);
      setFlaggedJobIds([]);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
    fetchFlaggedJobs();
  }, [fetchJobs, fetchFlaggedJobs]);


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
  const handleViewJob = (job) => {
    setSelectedJob(job);
    setShowJobModal(true);
  };

  const handleCloseJobModal = () => {
    setShowJobModal(false);
    setSelectedJob(null);
  };

  const handleApproveJob = async (jobId) => {
    try {
      const { value: reason } = await Swal.fire({
        title: 'Approve Job',
        input: 'textarea',
        inputLabel: 'Reason for approval',
        inputPlaceholder: 'Enter the reason for approving this job...',
        inputAttributes: {
          'aria-label': 'Enter reason for approval'
        },
        showCancelButton: true,
        confirmButtonColor: COLORS.GREEN_PRIMARY,
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Approve Job',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
          if (!value) {
            return 'You need to provide a reason!';
          }
        }
      });

      if (reason) {
        const response = await putMethod({
          apiUrl: `${apiService.resolveJobFlag}?id=${jobId}`
        });

        if (response?.status === true || response?.success === true) {
          setLastAction({ type: 'approved', message: 'Job approved successfully' });
          Swal.fire('Success!', 'Job approved/resolved successfully', 'success');
          fetchJobs(); // Refresh jobs list
          fetchFlaggedJobs(); // Refresh flagged jobs list
          setTimeout(() => setLastAction(null), 3000);
        } else {
          Swal.fire('Error!', response?.message || 'Failed to approve job', 'error');
        }
      }
    } catch (error) {
      console.error('❌ Error approving job:', error);
      Swal.fire('Error!', 'Failed to approve job', 'error');
    }
  };

  const handleFlaggedJob = async (jobId) => {
    try {
      const { value: reason } = await Swal.fire({
        title: 'Flag Job',
        input: 'textarea',
        inputLabel: 'Reason for flagging',
        inputPlaceholder: 'Enter the reason for flagging this job...',
        inputAttributes: {
          'aria-label': 'Enter reason for flagging'
        },
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Flag Job',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
          if (!value) {
            return 'You need to provide a reason!';
          }
        }
      });

      if (reason) {
        const response = await postMethod({
          apiUrl: apiService.flagJob,
          payload: {
            job_id: jobId,
            reason: reason
          }
        });

        if (response?.status === true || response?.success === true) {
          setLastAction({ type: 'flagged', message: 'Job flagged successfully' });
          Swal.fire('Success!', 'Job flagged successfully', 'success');
          fetchJobs(); // Refresh jobs list
          fetchFlaggedJobs(); // Refresh flagged jobs list
          setTimeout(() => setLastAction(null), 3000);
        } else {
          Swal.fire('Error!', response?.message || 'Failed to flag job', 'error');
        }
      }
    } catch (error) {
      console.error('❌ Error flagging job:', error);
      Swal.fire('Error!', 'Failed to flag job', 'error');
    }
  };

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
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className={`text-xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Job Posting Management</h2>
              {lastAction && (
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  lastAction.type === 'approved' 
                    ? 'bg-green-100 text-green-700' 
                    : lastAction.type === 'flagged'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-blue-100 text-blue-700'
                } animate-pulse`}>
                  {lastAction.message}
                </span>
              )}
            </div>
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
            {/* <Button onClick={handleBulkApprove} className={`px-4 py-2 rounded-lg transition-colors duration-200 ${TAILWIND_COLORS.BTN_PRIMARY}`} variant="unstyled">Approve selected</Button> */}
            <Button onClick={handleBulkPromote} className={`px-4 py-2 rounded-lg transition-colors duration-200 border-secondary text-secondary bg-bg-white hover:bg-gray-100`} variant="unstyled">Promote selected</Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className={`mt-4 text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Loading jobs...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>No jobs found</p>
            </div>
          ) : (
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
                      <td className={`w-1/4 px-4 py-4 text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                        <div className="flex items-center gap-2">
                          <span className="truncate" title={job.title}>{job.title}</span>
                          {flaggedJobIds.includes(job.id) ? (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 font-medium whitespace-nowrap">
                              Flagged
                            </span>
                          ) : (job.admin_action === 'approved' || job.status === 'Approved') ? (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 font-medium whitespace-nowrap">
                              Approved
                            </span>
                          ) : null}
                        </div>
                      </td>
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
                      <td className="w-1/5 px-2 py-3 text-center">
                        <div className="flex flex-col gap-1 items-center">
                          <button 
                            onClick={() => handleApproveJob(job.id)} 
                            className={`w-20 px-2 py-1 text-xs font-medium rounded transition-colors duration-150 whitespace-nowrap ${
                              job.admin_action === 'approved' || job.status === 'Approved'
                                ? 'bg-green-600 text-white hover:bg-green-700 shadow-md'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                          >
                            Approved
                          </button>
                          <button 
                            onClick={() => handlePromoteJob(job.id)} 
                            className="w-20 px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors duration-150 whitespace-nowrap"
                          >
                            Promote
                          </button>
                          <button 
                            onClick={() => handleFlaggedJob(job.id)} 
                            className={`w-20 px-2 py-1 text-xs font-medium rounded transition-colors duration-150 whitespace-nowrap ${
                              job.status === 'Flagged' || job.admin_action === 'flagged'
                                ? 'bg-red-100 text-red-700 hover:bg-red-200 opacity-60'
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                            }`}
                          >
                            Flagged
                          </button>
                          <button 
                            onClick={() => handleViewJob(job)} 
                            className="w-20 px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-150 whitespace-nowrap"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Job Details Modal */}
      {showJobModal && selectedJob && (
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
                  <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Job Details</h3>
                  <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>View complete job information</p>
                </div>
              </div>
              <button
                onClick={handleCloseJobModal}
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
                    <label className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>Job Title</label>
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} mt-1`}>{selectedJob.title || 'N/A'}</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>Company</label>
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} mt-1`}>{selectedJob.company || 'N/A'}</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>Location</label>
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} mt-1`}>{selectedJob.location || 'N/A'}</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>Job Type</label>
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} mt-1`}>{selectedJob.job_type || 'N/A'}</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>Salary Range</label>
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} mt-1`}>
                      {selectedJob.salary_min && selectedJob.salary_max 
                        ? `${selectedJob.salary_min} - ${selectedJob.salary_max}`
                        : selectedJob.salary_min || selectedJob.salary_max || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>Experience Required</label>
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} mt-1`}>{selectedJob.experience_required || 'N/A'}</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>Skills Required</label>
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} mt-1`}>{selectedJob.skills_required || 'N/A'}</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>No. of Vacancies</label>
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} mt-1`}>{selectedJob.no_of_vacancies || 'N/A'}</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>Application Deadline</label>
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} mt-1`}>{selectedJob.application_deadline || 'N/A'}</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>Posted Date</label>
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} mt-1`}>{selectedJob.posted || selectedJob.created_at || 'N/A'}</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>Status</label>
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} mt-1`}>{selectedJob.status || 'N/A'}</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>Admin Action</label>
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} mt-1`}>{selectedJob.admin_action || 'N/A'}</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>Is Remote</label>
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} mt-1`}>{selectedJob.is_remote === 1 ? 'Yes' : selectedJob.is_remote === 0 ? 'No' : 'N/A'}</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>Is Featured</label>
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} mt-1`}>{selectedJob.is_featured === 1 ? 'Yes' : selectedJob.is_featured === 0 ? 'No' : 'N/A'}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <label className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}>Job Description</label>
                  <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} mt-1 whitespace-pre-wrap`}>{selectedJob.description || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPosting;




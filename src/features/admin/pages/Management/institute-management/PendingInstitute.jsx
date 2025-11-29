import React, { useState, useEffect } from 'react'
import {
  LuBuilding,
  LuMail,
  LuPhone,
  LuGlobe,
  LuMapPin,
  LuUsers,
  LuCalendar,
  LuFileText,
  LuCheck,
  LuX,
  LuEye
} from 'react-icons/lu'
import Swal from 'sweetalert2'
import { postMethod, putMethod } from '../../../../../service/api'
import apiService from '../../../../admin/services/serviceUrl'
import service from '../../../../../service/serviceUrl'
import { TAILWIND_COLORS } from '../../../../../shared/WebConstant'
import { Button } from '../../../../../shared/components/Button'

// Institute Approval Card Component
function InstituteApprovalCard({ institute, onViewDetails, onApprove, onReject, is_verified }) {
  const getStatusBadge = (status) => {
    // Normalize status to uppercase
    const normalizedStatus = status?.toUpperCase() || 'PENDING REVIEW';
    
    const statusStyles = {
      'PENDING REVIEW': 'bg-orange-100 text-orange-800',
      'PENDING': 'bg-orange-100 text-orange-800',
      'APPROVED': 'bg-green-100 text-green-800',
      'REJECTED': 'bg-red-100 text-red-800'
    }

    const displayStatus = normalizedStatus === 'PENDING' ? 'PENDING REVIEW' : normalizedStatus;
    const style = statusStyles[normalizedStatus] || statusStyles['PENDING REVIEW'];

    return (
      <span className={`px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium rounded-full ${style}`}>
        {displayStatus}
      </span>
    )
  }
  return (
    <div className="bg-white rounded-lg border border-blue-200 p-3 sm:p-4 md:p-6 shadow-sm h-full flex flex-col">
      {/* Institute Header */}
      <div className="flex items-start gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
        <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-xs sm:text-sm md:text-lg">{institute.initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-bold ${TAILWIND_COLORS.TEXT_PRIMARY} text-sm sm:text-base md:text-lg truncate`}>{institute.institute_name || 'N/A'}</h3>
          <p className={`${TAILWIND_COLORS.TEXT_MUTED} text-xs sm:text-sm font-medium truncate`}>
            {institute.name || institute.user_name || 'N/A'}
          </p>
          <p className={`${TAILWIND_COLORS.TEXT_MUTED} text-xs mt-0.5 sm:mt-1 truncate`}>{institute.email || 'N/A'}</p>
        </div>
      </div>

      {/* Institute Details - Important Info Only */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 flex-1">
        <div className="min-w-0">
          <span className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} block mb-0.5`}>Location:</span>
          <p className={`font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} text-xs sm:text-sm break-words`}>
            {institute.address ? `${institute.address}${institute.postal_code ? `, ${institute.postal_code}` : ''}` : 'N/A'}
          </p>
        </div>
        <div className="min-w-0">
          <span className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} block mb-0.5`}>Type:</span>
          <p className={`font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} text-xs sm:text-sm truncate`}>
            {institute.institute_type || 'N/A'}
          </p>
        </div>
        <div className="min-w-0">
          <span className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} block mb-0.5`}>Phone:</span>
          <p className={`font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} text-xs sm:text-sm truncate`}>
            {institute.phone || 'N/A'}
          </p>
        </div>
        <div className="min-w-0">
          <span className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} block mb-0.5`}>Established:</span>
          <p className={`font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} text-xs sm:text-sm`}>
            {institute.established_year || 'N/A'}
          </p>
        </div>
      </div>

      {/* Status and Actions */}
      <div className="space-y-2 sm:space-y-3 mt-auto">
        <div className="flex items-center gap-2">
          {getStatusBadge(institute.status)}
        </div>

        <div className="flex flex-col xs:flex-row gap-2 sm:gap-2">
          <button
            onClick={() => onViewDetails(institute)}
            className="text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 sm:py-2 border-2 border-blue-600 text-blue-600 hover:text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-1.5 sm:gap-2 w-full xs:w-auto flex-1 xs:flex-none"
          >
            <LuEye size={14} className="flex-shrink-0" />
            <span className="whitespace-nowrap">View Details</span>
          </button>
          <button
            onClick={() => onApprove(institute.institute_id)}
            disabled={is_verified === 1}
            className={`text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 sm:py-2 border-2 font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-1.5 sm:gap-2 w-full xs:w-auto flex-1 xs:flex-none ${
              is_verified === 1
                ? "opacity-30 cursor-not-allowed border-gray-400 text-gray-400 bg-gray-100"
                : "border-green-600 text-green-600 hover:text-white hover:bg-green-700"
            }`}
          >
            <LuCheck size={14} className="flex-shrink-0" />
            <span className="whitespace-nowrap">Approve</span>
          </button>
          <button
            onClick={() => onReject(institute.institute_id)}
            className="text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 sm:py-2 border-2 border-red-600 text-red-600 hover:text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-1.5 sm:gap-2 w-full xs:w-auto flex-1 xs:flex-none"
          >
            <LuX size={14} className="flex-shrink-0" />
            <span className="whitespace-nowrap">Reject</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// View Details Modal Component
function ViewDetailsModal({ institute, isOpen, onClose }) {
  if (!isOpen || !institute) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[98vh] sm:max-h-[95vh] md:max-h-[90vh] overflow-y-auto my-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex items-center justify-between z-10 shadow-sm">
          <h2 className={`text-base sm:text-lg md:text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} truncate pr-2`}>Institute Details</h2>
          <button
            onClick={onClose}
            className={`${TAILWIND_COLORS.TEXT_MUTED} hover:text-gray-600 transition-colors duration-200 p-1 flex-shrink-0`}
            aria-label="Close"
          >
            <span className="text-xl sm:text-2xl md:text-3xl">&times;</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6">
          {/* Institute Information */}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
            <h3 className={`text-sm sm:text-base md:text-lg font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2 sm:mb-3 md:mb-4 flex items-center gap-2`}>
              <LuBuilding className="text-blue-600 flex-shrink-0" size={16} />
              <span>Institute Information</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
              <div className="min-w-0">
                <label className={`block text-xs sm:text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}>Institute Name</label>
                <p className={`${TAILWIND_COLORS.TEXT_PRIMARY} font-medium text-sm sm:text-base break-words`}>{institute.institute_name || 'N/A'}</p>
              </div>
              <div className="min-w-0">
                <label className={`block text-xs sm:text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}>Email Address</label>
                <p className={`${TAILWIND_COLORS.TEXT_PRIMARY} flex items-center gap-2 text-sm sm:text-base`}>
                  <LuMail size={14} className="text-gray-400 flex-shrink-0" />
                  <a href={`mailto:${institute.email}`} className="text-blue-600 hover:underline break-all">
                    {institute.email || 'N/A'}
                  </a>
                </p>
              </div>
              <div className="min-w-0">
                <label className={`block text-xs sm:text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}>Institute Type</label>
                <p className={`${TAILWIND_COLORS.TEXT_PRIMARY} text-sm sm:text-base`}>{institute.institute_type || 'N/A'}</p>
              </div>
              <div className="min-w-0">
                <label className={`block text-xs sm:text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}>Established Year</label>
                <p className={`${TAILWIND_COLORS.TEXT_PRIMARY} flex items-center gap-2 text-sm sm:text-base`}>
                  <LuCalendar size={14} className="text-gray-400 flex-shrink-0" />
                  {institute.established_year || 'N/A'}
                </p>
              </div>
              <div className="min-w-0 sm:col-span-2">
                <label className={`block text-xs sm:text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}>Courses Offered</label>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-1">
                  {Array.isArray(institute.courses) && institute.courses.length > 0 ? (
                    institute.courses.map((course, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 sm:py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                      >
                        {course.title || course.course_name || course.name || 'Course'}
                      </span>
                    ))
                  ) : Array.isArray(institute.courses_offered) && institute.courses_offered.length > 0 ? (
                    institute.courses_offered.map((course, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 sm:py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                      >
                        {course}
                      </span>
                    ))
                  ) : (
                    <span className={`${TAILWIND_COLORS.TEXT_MUTED} text-xs sm:text-sm`}>N/A</span>
                  )}
                </div>
              </div>
              <div className="min-w-0 sm:col-span-2">
                <label className={`block text-xs sm:text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}>Accreditation</label>
                <p className={`${TAILWIND_COLORS.TEXT_PRIMARY} text-sm sm:text-base break-words`}>
                  {Array.isArray(institute.accreditation) && institute.accreditation.length > 0
                    ? institute.accreditation.join(', ')
                    : institute.accreditation || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
            <h3 className={`text-sm sm:text-base md:text-lg font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2 sm:mb-3 md:mb-4 flex items-center gap-2`}>
              <LuFileText className="text-green-600 flex-shrink-0" size={16} />
              <span>Additional Information</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
              <div className="min-w-0">
                <label className={`block text-xs sm:text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}>Phone Number</label>
                <p className={`${TAILWIND_COLORS.TEXT_PRIMARY} flex items-center gap-2 text-sm sm:text-base`}>
                  <LuPhone size={14} className="text-gray-400 flex-shrink-0" />
                  <a href={`tel:${institute.phone}`} className="text-blue-600 hover:underline break-all">
                    {institute.phone || 'N/A'}
                  </a>
                </p>
              </div>
              <div className="min-w-0">
                <label className={`block text-xs sm:text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}>Website</label>
                <p className={`${TAILWIND_COLORS.TEXT_PRIMARY} flex items-center gap-2 text-sm sm:text-base`}>
                  <LuGlobe size={14} className="text-gray-400 flex-shrink-0" />
                  {institute.website ? (
                    <a href={institute.website.startsWith('http') ? institute.website : `https://${institute.website}`} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="text-blue-600 hover:underline break-all">
                      {institute.website}
                    </a>
                  ) : (
                    'N/A'
                  )}
                </p>
              </div>
              <div className="min-w-0">
                <label className={`block text-xs sm:text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}>Contact Person</label>
                <p className={`${TAILWIND_COLORS.TEXT_PRIMARY} text-sm sm:text-base break-words`}>{institute.contact_person || 'N/A'}</p>
              </div>
              <div className="min-w-0">
                <label className={`block text-xs sm:text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}>Contact Designation</label>
                <p className={`${TAILWIND_COLORS.TEXT_PRIMARY} text-sm sm:text-base break-words`}>{institute.contact_designation || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
            <h3 className={`text-sm sm:text-base md:text-lg font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2 sm:mb-3 md:mb-4 flex items-center gap-2`}>
              <LuMapPin className="text-blue-600 flex-shrink-0" size={16} />
              <span>Address Information</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
              <div className="min-w-0">
                <label className={`block text-xs sm:text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}>Address</label>
                <p className={`${TAILWIND_COLORS.TEXT_PRIMARY} text-sm sm:text-base break-words`}>{institute.address || 'N/A'}</p>
              </div>
              <div className="min-w-0">
                <label className={`block text-xs sm:text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}>Postal Code</label>
                <p className={`${TAILWIND_COLORS.TEXT_PRIMARY} text-sm sm:text-base`}>{institute.postal_code || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Institute Description */}
          {institute.description && (
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
              <h3 className={`text-sm sm:text-base md:text-lg font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2 sm:mb-3 md:mb-4`}>Institute Description</h3>
              <p className={`${TAILWIND_COLORS.TEXT_MUTED} text-xs sm:text-sm md:text-base leading-relaxed break-words`}>
                {institute.description}
              </p>
            </div>
          )}

        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex justify-end shadow-sm">
          <Button
            onClick={onClose}
            variant="neutral"
            size="md"
            className="px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base w-full sm:w-auto"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function PendingInstituteApprovals({ institutes: initialInstitutes }) {
  const [viewDetailsModal, setViewDetailsModal] = useState({ isOpen: false, institute: null })
  const [filterStatus, setFilterStatus] = useState('all') // 'all', 'pending', 'approved', 'rejected'
  const [institutes, setInstitutes] = useState(initialInstitutes)

  // Update state when prop changes
  useEffect(() => {
    setInstitutes(initialInstitutes)
  }, [initialInstitutes])

  const handleViewDetails = (institute) => {
    setViewDetailsModal({ isOpen: true, institute })
  }

  const handleCloseViewDetails = () => {
    setViewDetailsModal({ isOpen: false, institute: null })
  }

  const handleApprove = async (instituteId) => {
    Swal.fire({
      title: 'Approve Institute',
      text: 'Are you sure you want to approve this institute?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10B981',
      cancelButtonColor: '#EF4444',
      confirmButtonText: 'Yes, Approve!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Find the institute to get user_id
          const institute = institutes.find(inst => inst.institute_id === instituteId);
          if (!institute) {
            Swal.fire({
              title: "Error",
              text: "Institute not found",
              icon: "error"
            });
            return;
          }

          // Call verifyUser API with is_verified: 1 for approve
          var data = {
            apiUrl: service.verifyUser,
            payload: {
              uid: institute.id, // user_id
              is_verified: 1  // 1 for approve, 0 for reject
            },
          };

          var response = await postMethod(data);
          console.log('Approve API Response:', response)
          
          if (response.status === true || response.success === true) {
            // Update state immediately without page reload
            setInstitutes(prevInstitutes => 
              prevInstitutes.map(inst => 
                inst.institute_id === instituteId 
                  ? { ...inst, status: 'approved', admin_action: 'approved' }
                  : inst
              )
            );
            
            Swal.fire({
              title: 'Approved!',
              text: 'Institute has been approved successfully.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
          } else {
            Swal.fire({
              title: "Failed",
              text: response.message || "Failed to approve institute",
              icon: "error"
            });
          }
        } catch (error) {
          console.error("API Error:", error)
          Swal.fire({
            title: "API Error",
            text: error.message || "Something went wrong. Please try again.",
            icon: "error"
          });
        }
      }
    })
  }

  const handleReject = async (instituteId) => {
    Swal.fire({
      title: 'Reject Institute',
      text: 'Are you sure you want to reject this institute?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, Reject!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Find the institute to get user_id
          const institute = institutes.find(inst => inst.institute_id === instituteId);
          if (!institute) {
            Swal.fire({
              title: "Error",
              text: "Institute not found",
              icon: "error"
            });
            return;
          }

          // Call verifyUser API with is_verified: 0 for reject
          var data = {
            apiUrl: service.verifyUser,
            payload: {
              uid: institute.id, // user_id
              is_verified: 0  // 1 for approve, 0 for reject
            },
          };

          var response = await postMethod(data);
          console.log('Reject API Response:', response)
          
          if (response.status === true || response.success === true) {
            // Update state immediately without page reload
            setInstitutes(prevInstitutes => 
              prevInstitutes.map(inst => 
                inst.institute_id === instituteId 
                  ? { ...inst, status: 'rejected', admin_action: 'rejected' }
                  : inst
              )
            );
            
            Swal.fire({
              title: 'Rejected!',
              text: 'Institute has been rejected.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
          } else {
            Swal.fire({
              title: "Failed",
              text: response.message || "Failed to reject institute",
              icon: "error"
            });
          }
        } catch (error) {
          console.error("API Error:", error)
          Swal.fire({
            title: "API Error",
            text: error.message || "Something went wrong. Please try again.",
            icon: "error"
          });
        }
      }
    })
  }

  // Format institutes data
  const formattedInstitutes = institutes.map((item, index) => {
    // ✅ Handle both raw API data structure and formatted data structure
    const userInfo = item.user_info || {};
    const profileInfo = item.profile_info || {};
    
    // ✅ Extract is_verified from multiple possible locations
    const isVerifiedRaw = item.is_verified ?? 
      userInfo.is_verified ??
      item.user?.is_verified ??
      profileInfo.is_verified ??
      0;
    
    // Convert to number (handle "1", 1, "0", 0, null, undefined)
    const is_verified = isVerifiedRaw === 1 || isVerifiedRaw === "1" || isVerifiedRaw === true ? 1 : 0;
    
    // ✅ IMPORTANT: Status is determined ONLY by is_verified field
    // is_verified === 1 → "approved"
    // is_verified === 0 → "pending"
    let normalizedStatus;
    if (is_verified === 1) {
      normalizedStatus = 'APPROVED';
    } else {
      normalizedStatus = 'PENDING REVIEW';
    }
    
    // ✅ Extract data from both raw API structure and formatted structure
    const userName = item.name || item.user_name || userInfo.user_name || 'N/A';
    const email = item.email || userInfo.email || 'N/A';
    const phone = item.phone || item.phone_number || userInfo.phone_number || 'N/A';
    const instituteId = item.institute_id || profileInfo.institute_id;
    const instituteName = item.institute_name || profileInfo.institute_name || 'N/A';
    const instituteType = item.institute_type || profileInfo.institute_type || 'N/A';
    const website = item.website || profileInfo.website || null;
    const description = item.description || profileInfo.description || null;
    const address = item.address || profileInfo.address || null;
    const city = item.city || profileInfo.city || null;
    const state = item.state || profileInfo.state || null;
    const country = item.country || profileInfo.country || null;
    const postalCode = item.postal_code || profileInfo.postal_code || null;
    const contactPerson = item.contact_person || profileInfo.contact_person || null;
    const contactDesignation = item.contact_designation || profileInfo.contact_designation || null;
    const accreditation = item.accreditation || (profileInfo.accreditation ? profileInfo.accreditation.split(",").map((s) => s.trim()) : []);
    const establishedYear = item.established_year || profileInfo.established_year || null;
    const location = item.location || profileInfo.location || (city && state ? `${city}, ${state}` : city || state || 'N/A');
    const courses = item.courses || [];
    const coursesOffered = courses.length > 0 
      ? courses.map(c => c.title || c.course_name || c.name).filter(Boolean)
      : (item.courses_offered || []);
    
    console.log(`🔍 Processing institute ${instituteName}:`, {
      is_verified_raw: isVerifiedRaw,
      is_verified,
      status: normalizedStatus,
      has_user_info: !!item.user_info,
      has_profile_info: !!item.profile_info
    });
    
    return {
      id: item.id || userInfo.user_id,
      initials: instituteName ? instituteName.substring(0, 2).toUpperCase() : "ST",
      name: userName,
      user_name: userName,
      email: email,
      phone: phone,
      institute_id: instituteId,
      institute_name: instituteName,
      institute_type: instituteType,
      website: website,
      description: description,
      address: address,
      city: city,
      state: state,
      country: country,
      postal_code: postalCode,
      contact_person: contactPerson,
      contact_designation: contactDesignation,
      accreditation: accreditation,
      location: location,
      established_year: establishedYear,
      courses: courses,
      courses_offered: coursesOffered,
      status: normalizedStatus,
      is_verified: is_verified // ✅ Include is_verified in formatted data
    };
  });

  // Filter institutes based on selected status
  const filteredInstitutes = formattedInstitutes.filter((institute) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'pending') return institute.status === 'PENDING REVIEW';
    if (filterStatus === 'approved') return institute.status === 'APPROVED';
    if (filterStatus === 'rejected') return institute.status === 'REJECTED';
    return true;
  });

  // Count by status
  const statusCounts = {
    all: formattedInstitutes.length,
    pending: formattedInstitutes.filter(i => i.status === 'PENDING REVIEW').length,
    approved: formattedInstitutes.filter(i => i.status === 'APPROVED').length,
    rejected: formattedInstitutes.filter(i => i.status === 'REJECTED').length,
  };

  return (
    <div className="space-y-6">
      {/* Header with Filter Tabs */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs sm:text-sm font-bold">✓</span>
            </div>
            <h2 className={`text-lg sm:text-xl md:text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Institute Approvals</h2>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-2 md:gap-3">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
              filterStatus === 'all'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            All ({statusCounts.all})
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
              filterStatus === 'pending'
                ? 'bg-orange-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Pending ({statusCounts.pending})
          </button>
          <button
            onClick={() => setFilterStatus('approved')}
            className={`px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
              filterStatus === 'approved'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Approved ({statusCounts.approved})
          </button>
          <button
            onClick={() => setFilterStatus('rejected')}
            className={`px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
              filterStatus === 'rejected'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Rejected ({statusCounts.rejected})
          </button>
        </div>
      </div>

      {/* Institute Cards */}
      {filteredInstitutes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {filteredInstitutes.map((institute) => (
            <InstituteApprovalCard
              key={institute.id}
              institute={institute}
              is_verified={institute.is_verified || 0} // ✅ Pass is_verified prop
              onViewDetails={() => handleViewDetails(institute)}
              onApprove={() =>handleApprove(institute.institute_id)}
              onReject={() =>handleReject(institute.institute_id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 sm:py-12 bg-white rounded-lg border border-gray-200 px-4">
          <p className={`text-sm sm:text-base md:text-lg ${TAILWIND_COLORS.TEXT_MUTED}`}>
            No institutes found with status: <span className="font-semibold">{filterStatus}</span>
          </p>
        </div>
      )}

      {/* View Details Modal */}
      <ViewDetailsModal
        institute={viewDetailsModal.institute}
        isOpen={viewDetailsModal.isOpen}
        onClose={handleCloseViewDetails}
      />
    </div>
  )
}

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { COLORS, TAILWIND_COLORS } from '../WebConstant'
import { LuUsers } from 'react-icons/lu'
import { LuGraduationCap } from 'react-icons/lu'
import { FaUserShield, FaBuilding, FaSchool, FaEye, FaEyeSlash } from 'react-icons/fa'
import { postMethod, putMethod, putMultipart, postMultipart } from '../../service/api'
import apiService from '../../shared/services/serviceUrl'
import axios from '../../service/axios'
import { env } from '../../service/envConfig'

function Pills({ items = [], activeKey, onChange }) {
  return (
    <div
      className="rounded-full p-1 flex justify-between items-center gap-2 overflow-x-auto"
      style={{ backgroundColor: '#F7FBFF', border: '1px solid rgba(11,83,125,0.15)' }}
    >
      {items.map((item) => {
        const isActive = activeKey === item.key
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onChange?.(item.key)}
            className="flex items-center gap-2 rounded-full px-2 py-2 whitespace-nowrap"
            style={
              isActive
                ? { backgroundColor: COLORS.GREEN_PRIMARY, color: 'white' }
                : { backgroundColor: 'white', color: COLORS.GREEN_PRIMARY, border: '1px solid rgba(11,83,125,0.15)' }
            }
          >
            {item.icon ? (
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={
                  isActive
                    ? { backgroundColor: 'rgba(255,255,255,0.9)', color: COLORS.GREEN_PRIMARY }
                    : { backgroundColor: 'rgba(92,154,36,0.15)', color: COLORS.GREEN_PRIMARY }
                }
                aria-hidden
              >
                {item.icon}
              </span>
            ) : null}
            <span className="text-sm font-medium md:me-10">{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default function CreateAccount() {
  const navigate = useNavigate()
  const [role, setRole] = useState('Admin') // Admin | Recruiter | Institute | Student
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('Creating Account...')
  const [form, setForm] = useState({
    // Common fields
    password: '',
    confirmPassword: '',
    // Admin fields
    fullName: '',
    officialEmail: '',
    mobileNumber: '',
    employeeId: '',
    profilePhoto: null,
    // Recruiter fields
    companyName: '',
    companyEmail: '',
    companyContact: '',
    companyWebsite: '',
    designation: '',
    industryType: '',
    officeAddress: '',
    companyLogo: null,
    gstPan: '', 
    // Institute fields
    instituteName: '',
    instituteType: '',
    registrationNumber: '',
    affiliationDetails: '',
    principalName: '',
    instituteEmail: '',
    instituteContact: '',
    instituteLogo: null,
    coursesOffered: [],
    instituteAddress: '',
    instituteWebsite: '',
    // Student fields
    studentFullName: '',
    dateOfBirth: '',
    gender: '',
    studentEmail: '',
    studentMobileNumber: '',
    studentProfilePhoto: null,
    city: '',
    state: '',
    country: '',
    pinCode: '',
    highestQualification: '',
    collegeName: '',
    passingYear: '',
    marksCgpa: '',
    skills: [],
    resumeCv: null,
    preferredJobLocation: '',
    linkedinPortfolioLink: '',
  })

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    
    // Validate password confirmation
    if (form.password !== form.confirmPassword) {
      Swal.fire({
        title: "Validation Error",
        text: "Password and confirm password do not match!",
        icon: "error"
      });
      return;
    }
    
    // Step 1: Prepare user creation payload (only basic fields for users table)
    // is_verified: 0 for Recruiter and Institute (admin approval required)
    // is_verified: 1 for Admin and Student (directly verified)
    const isVerified = (role === 'Recruiter' || role === 'Institute') ? 0 : 1;
    
    let userPayload = {
      password: form.password,
      role: role.toLowerCase(), // Convert to lowercase for API
      is_verified: isVerified,
      status: 'active'
    }

    // Add role-specific basic fields for users table
    if (role === 'Admin') {
      userPayload = {
        ...userPayload,
        user_name: form.fullName,
        email: form.officialEmail,
        phone_number: form.mobileNumber
      }
    } else if (role === 'Recruiter') {
      userPayload = {
        ...userPayload,
        user_name: form.companyName,
        email: form.companyEmail,
        phone_number: form.companyContact
      }
    } else if (role === 'Institute') {
      userPayload = {
        ...userPayload,
        user_name: form.instituteName,
        email: form.instituteEmail,
        phone_number: form.instituteContact
      }
    } else if (role === 'Student') {
      userPayload = {
        ...userPayload,
        user_name: form.studentFullName,
        email: form.studentEmail,
        phone_number: form.studentMobileNumber
      }
    }

    // Show loading - user को loading दिखाओ
    setIsLoading(true);
    setLoadingText('Creating Account...');

    try {
      // ============================================
      // STEP 1: Create User Account (Signup API)
      // ============================================
      console.log('📤 Step 1: Calling signup API...');
      setLoadingText('Creating Account...');
      var userData = {
        apiUrl: apiService.signup,
        payload: userPayload,
      };

      var userResponse = await postMethod(userData);
      console.log('✅ Step 1 Response - User Creation:', userResponse)
      
      // Check if user creation was successful
      const isUserSuccess = (userResponse.status === 'success' || 
          userResponse.success === true || 
          (userResponse.data && userResponse.data.success === true) ||
          userResponse.message === 'User registered successfully' ||
          (userResponse.message && userResponse.message.includes('successfully')) ||
          userResponse.httpStatus === 200) &&
          !userResponse.message?.includes('already exists') &&
          !userResponse.message?.includes('failed') &&
          !userResponse.message?.includes('error');
      
      if (!isUserSuccess) {
        setIsLoading(false);
        Swal.fire({
          title: "Failed",
          text: userResponse.message || "User registration failed",
          icon: "error"
        });
        return;
      }

      // ============================================
      // STEP 2: Extract user_id from signup response
      // ============================================
      const userId = userResponse.data?.user_id || 
                     userResponse.data?.id || 
                     userResponse.user_id || 
                     userResponse.id;
      
      if (!userId) {
        setIsLoading(false);
        Swal.fire({
          title: "Error",
          text: "User created but user ID not found in response",
          icon: "error"
        });
        return;
      }

      console.log('✅ User ID:', userId);

      // ============================================
      // STEP 3: Get Token by calling Login API with email and password
      // ============================================
      let authToken = null;
      const previousToken = localStorage.getItem('authToken');
      
      // Get email and password for login
      const userEmail = userPayload.email;
      const userPassword = userPayload.password;
      
      if (userEmail && userPassword) {
        try {
          console.log('📤 Step 2: Getting token by calling login API...');
          
          const loginData = {
            apiUrl: apiService.signin,
            payload: {
              email: userEmail,
              password: userPassword
            }
          };

          const loginResponse = await postMethod(loginData);
          console.log('✅ Login Response:', loginResponse);

          // Extract token from login response (same as Login.jsx)
          authToken = loginResponse.token || 
                     loginResponse.data?.token ||
                     loginResponse.authToken ||
                     loginResponse.data?.authToken;

          if (authToken) {
            localStorage.setItem('authToken', authToken);
            console.log('✅ Token received from login API:', authToken.substring(0, 20) + '...');
          } else {
            console.log('⚠️ No token in login response');
          }
        } catch (loginError) {
          console.error('❌ Login error:', loginError);
          // Continue without token - will try profile update anyway
        }
      } else {
        console.log('⚠️ Email or password not available for login');
      }

      // ============================================
      // STEP 4: Update Profile (PUT API with token)
      // ============================================
      let profileResponse = null;
      
      try {
        console.log('📤 Step 3: Calling profile update API with user_id:', userId);
        
        if (role === 'Recruiter') {
          const profilePayload = {
            user_id: userId,
            company_name: form.companyName,
            industry: form.industryType,
            website: form.companyWebsite,
            location: form.officeAddress,
            gst_pan: form.gstPan || null
          };

          console.log('📤 Recruiter Profile Payload:', profilePayload);

          if (form.companyLogo) {
            const formData = new FormData();
            Object.entries(profilePayload).forEach(([key, val]) => {
              if (val !== null && val !== undefined && val !== '') {
                formData.append(key, val);
              }
            });
            formData.append('company_logo', form.companyLogo);
            
            console.log('📤 Calling PUT multipart API with user_id:', userId, 'and token');
            // PUT method with token - user_id के साथ
            profileResponse = await putMultipart({ 
              apiUrl: apiService.updateRecruiterProfile, 
              data: formData 
            });
          } else {
            console.log('📤 Calling PUT method API with user_id:', userId, 'and token');
            // PUT method with token - user_id के साथ
            profileResponse = await putMethod({ 
              apiUrl: apiService.updateRecruiterProfile, 
              payload: profilePayload 
            });
          }

        } else if (role === 'Institute') {
          const profilePayload = {
            user_id: userId,
            institute_name: form.instituteName,
            institute_type: form.instituteType,
            website: form.instituteWebsite,
            description: form.affiliationDetails,
            address: form.instituteAddress,
            contact_person: form.principalName,
            contact_designation: 'Principal',
            accreditation: form.affiliationDetails,
            courses_offered: Array.isArray(form.coursesOffered) 
              ? form.coursesOffered.join(', ') 
              : form.coursesOffered
          };

          console.log('📤 Institute Profile Payload:', profilePayload);

          if (form.instituteLogo) {
            const formData = new FormData();
            Object.entries(profilePayload).forEach(([key, val]) => {
              if (val !== null && val !== undefined && val !== '') {
                formData.append(key, val);
              }
            });
            formData.append('institute_logo', form.instituteLogo);
            
            console.log('📤 Calling PUT multipart API with user_id:', userId, 'and token');
            // PUT method with token - user_id के साथ
            profileResponse = await putMultipart({ 
              apiUrl: apiService.updateInstituteProfile, 
              data: formData 
            });
          } else {
            console.log('📤 Calling PUT method API with user_id:', userId, 'and token');
            // PUT method with token - user_id के साथ
            profileResponse = await putMethod({ 
              apiUrl: apiService.updateInstituteProfile, 
              payload: profilePayload 
            });
          }

        } else if (role === 'Student') {
          const profilePayload = {
            user_id: userId,
            bio: form.studentFullName || 'Student Profile',
            dob: form.dateOfBirth,
            gender: form.gender?.toLowerCase() || null,
            location: form.preferredJobLocation || `${form.city}, ${form.state}`,
            skills: Array.isArray(form.skills) ? form.skills.join(', ') : form.skills || null,
            education: `${form.highestQualification} from ${form.collegeName}, Year: ${form.passingYear}, CGPA: ${form.marksCgpa}`,
            graduation_year: form.passingYear ? parseInt(form.passingYear) : null,
            cgpa: form.marksCgpa ? parseFloat(form.marksCgpa) : null,
            linkedin_url: form.linkedinPortfolioLink || null,
            portfolio_link: form.linkedinPortfolioLink || null,
            trade: form.highestQualification || null
          };

          console.log('📤 Student Profile Payload:', profilePayload);

          if (form.resumeCv || form.studentProfilePhoto) {
            const formData = new FormData();
            Object.entries(profilePayload).forEach(([key, val]) => {
              if (val !== null && val !== undefined && val !== '') {
                formData.append(key, val);
              }
            });
            if (form.resumeCv) {
              formData.append('resume', form.resumeCv);
            }
            if (form.studentProfilePhoto) {
              formData.append('profile_photo', form.studentProfilePhoto);
            }
            
            console.log('📤 Calling PUT multipart API with user_id:', userId, 'and token');
            // PUT method with token - user_id के साथ
            profileResponse = await putMultipart({ 
              apiUrl: apiService.updateStudentProfile, 
              data: formData 
            });
          } else {
            console.log('📤 Calling PUT method API with user_id:', userId, 'and token');
            // PUT method with token - user_id के साथ
            profileResponse = await putMethod({ 
              apiUrl: apiService.updateStudentProfile, 
              payload: profilePayload 
            });
          }

        } else if (role === 'Admin') {
          // Admin doesn't have separate profile table
          profileResponse = { success: true, message: 'Admin account created successfully' };
        }

        console.log('✅ Profile Create/Update Response:', profileResponse);
        console.log('✅ Profile Response Success:', profileResponse?.success);
        console.log('✅ Profile Response Status:', profileResponse?.status);
        console.log('✅ Profile Response Message:', profileResponse?.message);

      } catch (profileError) {
        console.error('❌ Profile create/update error:', profileError);
        console.error('❌ Error details:', {
          message: profileError?.message,
          response: profileError?.response?.data,
          status: profileError?.response?.status
        });
        profileResponse = {
          success: false,
          status: false,
          message: profileError?.response?.data?.message || profileError?.message || 'Profile update failed'
        };
      } finally {
        // Restore previous token after profile operation (user will login separately)
        if (previousToken) {
          localStorage.setItem('authToken', previousToken);
        } else {
          localStorage.removeItem('authToken');
        }
      }

      // Check if profile update was successful
      const isProfileSuccess = profileResponse && (
        profileResponse.success === true || 
        profileResponse.status === 'success' ||
        profileResponse.status === true ||
        (profileResponse.data && profileResponse.data.success === true) ||
        (profileResponse.message && profileResponse.message.includes('successfully')) ||
        profileResponse.httpStatus === 200
      );

      console.log('✅ Profile Success Check:', isProfileSuccess);
      console.log('✅ Profile Response Object:', JSON.stringify(profileResponse, null, 2));

      // Hide loading
      setIsLoading(false);

      if (isProfileSuccess || role === 'Admin') {
        Swal.fire({
          title: "Success",
          text: profileResponse?.message || userResponse.message || "Account and profile created successfully! You can now login.",
          confirmButtonText: "Ok",
          icon: "success"
        }).then((result) => {
          if (result.isConfirmed) {
            const userEmail = userPayload.email;
            if (userEmail) {
              localStorage.setItem('pendingVerificationEmail', userEmail);
            }
            navigate("/login")
          }
        });
      } else {
        // Show error with details
        const errorMessage = profileResponse?.message || 
                           "Profile update failed. Please update your profile after login.";
        
        console.error('❌ Profile operation failed:', {
          profileResponse,
          authToken: authToken ? 'Yes' : 'No',
          role
        });

        Swal.fire({
          title: "Account Created",
          text: `User account created successfully! However, ${errorMessage}`,
          confirmButtonText: "Ok",
          icon: "warning"
        }).then((result) => {
          if (result.isConfirmed) {
            const userEmail = userPayload.email;
            if (userEmail) {
              localStorage.setItem('pendingVerificationEmail', userEmail);
            }
            navigate("/login")
          }
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setIsLoading(false);
      Swal.fire({
        title: "API Error",
        text: error.message || "Something went wrong. Please try again.",
        icon: "error"
      });
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-8 ${TAILWIND_COLORS.BG_PRIMARY}`}>
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="rounded-2xl bg-white shadow-sm border border-[rgba(0,57,91,0.18)] px-6 md:px-10 py-6 md:py-7 mb-6">
          <h1 className="text-center text-xl md:text-2xl font-semibold text-gray-800">Create your account</h1>
          <div className="mt-4 flex items-center justify-center">
            <div className=" ">
              <Pills
                items={[
                  { key: 'Admin', label: 'Admin', icon: <FaUserShield size={18} /> },
                  { key: 'Recruiter', label: 'Recruiter', icon: <FaBuilding size={18} /> },
                  { key: 'Institute', label: 'Institute', icon: <FaSchool size={18} /> },
                  { key: 'Student', label: 'Student', icon: <FaSchool size={18} /> },
                ]}
                activeKey={role}
                onChange={setRole}
              />
            </div>
          </div>
          {/* </div>

        <div className={`rounded-2xl p-6 md:p-8 ${TAILWIND_COLORS.CARD}`}> */}
          <form onSubmit={onSubmit} className="space-y-4 mt-6">
            {/* Admin Form */}
            {role === 'Admin' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={update('fullName')}
                      required
                      placeholder="Enter your full name"
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Official Email*</label>
                    <input
                      type="email"
                      value={form.officialEmail}
                      onChange={update('officialEmail')}
                      required
                      placeholder="Enter your official email"
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number*</label>
                    <input
                      type="tel"
                      value={form.mobileNumber}
                      onChange={(e) => setForm((f) => ({ ...f, mobileNumber: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                      required
                      placeholder="Enter your mobile number"
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    />
                  </div>
                  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setForm((f) => ({ ...f, profilePhoto: e.target.files[0] }))}
                    className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                  />
                </div>
                </div>
              </>
            )}

            {/* Recruiter Form */}
            {role === 'Recruiter' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name*</label>
                    <input
                      type="text"
                      value={form.companyName}
                      onChange={update('companyName')}
                      required
                      placeholder="Enter company name"
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Email*</label>
                    <input
                      type="email"
                      value={form.companyEmail}
                      onChange={update('companyEmail')}
                      required
                      placeholder="Enter company email"
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Contact Number*</label>
                    <input
                      type="tel"
                      value={form.companyContact}
                      onChange={(e) => setForm((f) => ({ ...f, companyContact: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                      required
                      placeholder="Enter company contact number"
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry Type*</label>
                    <input
                      type="text"
                      value={form.industryType}
                      onChange={update('industryType')}
                      required
                      placeholder="Enter industry type"
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Website / LinkedIn Page*</label>
                  <input
                    type="url"
                    value={form.companyWebsite}
                    onChange={update('companyWebsite')}
                    required
                    placeholder="Enter company website or LinkedIn page"
                    className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Office Address*</label>
                  <textarea
                    value={form.officeAddress}
                    onChange={update('officeAddress')}
                    required
                    placeholder="Enter office address"
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 py-2 bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo (Optional)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setForm((f) => ({ ...f, companyLogo: e.target.files[0] }))}
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GST / PAN (If Required)</label>
                    <input
                      type="text"
                      value={form.gstPan}
                      onChange={(e) => setForm((f) => ({ ...f, gstPan: e.target.value.toUpperCase().slice(0, 10) }))}
                      placeholder="Enter GST or PAN number"
                      maxLength={10}
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Institute Form */}
            {role === 'Institute' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Institute Name*</label>
                    <input
                      type="text"
                      value={form.instituteName}
                      onChange={update('instituteName')}
                      required
                      placeholder="Enter institute name"
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Institute Email*</label>
                    <input
                      type="email"
                      value={form.instituteEmail}
                      onChange={update('instituteEmail')}
                      required
                      placeholder="Enter institute email"
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Institute Contact Number*</label>
                    <input
                      type="tel"
                      value={form.instituteContact}
                      onChange={(e) => setForm((f) => ({ ...f, instituteContact: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                      required
                      placeholder="Enter institute contact number"
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Institute Type*</label>
                    <select
                      value={form.instituteType}
                      onChange={update('instituteType')}
                      required
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    >
                      <option value="">Select Institute Type</option>
                      <option value="School">School</option>
                      <option value="College">College</option>
                      <option value="Coaching">Coaching</option>
                      <option value="Training Center">Training Center</option>
                      <option value="ITI">ITI</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number*</label>
                    <input
                      type="text"
                      value={form.registrationNumber}
                      onChange={update('registrationNumber')}
                      required
                      placeholder="Enter registration number (Govt. or Private)"
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Affiliation / Accreditation Details*</label>
                    <select
                      value={form.affiliationDetails}
                      onChange={update('affiliationDetails')}
                      required
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    >
                      <option value="">Select Affiliation</option>
                      <option value="UGC">UGC</option>
                      <option value="AICTE">AICTE</option>
                      <option value="CBSE">CBSE</option>
                      <option value="ICSE">ICSE</option>
                      <option value="State Board">State Board</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Principal / Head Name*</label>
                  <input
                    type="text"
                    value={form.principalName}
                    onChange={update('principalName')}
                    required
                    placeholder="Enter principal or head name"
                    className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                  />
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Institute Logo (Optional)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setForm((f) => ({ ...f, instituteLogo: e.target.files[0] }))}
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Institute Website (If Available)</label>
                    <input
                      type="url"
                      value={form.instituteWebsite}
                      onChange={update('instituteWebsite')}
                      placeholder="Enter institute website"
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Courses / Programs Offered*</label>
                  <select
                    multiple
                    value={form.coursesOffered}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions, option => option.value);
                      setForm((f) => ({ ...f, coursesOffered: selected }));
                    }}
                    required
                    className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 py-2 bg-white"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="ITI">ITI</option>
                    <option value="Polytechnic">Polytechnic</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Certificate">Certificate</option>
                    <option value="Vocational">Vocational</option>
                    <option value="Other">Other</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple options</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Institute Address*</label>
                  <textarea
                    value={form.instituteAddress}
                    onChange={update('instituteAddress')}
                    required
                    placeholder="Enter institute address"
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 py-2 bg-white"
                  />
                </div>
              </>
            )}

            {/* Student Form */}
            {role === 'Student' && (
              <>
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                    <input
                      type="text"
                      value={form.studentFullName}
                      onChange={update('studentFullName')}
                      required
                      placeholder="Enter your full name"
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth*</label>
                    <input
                      type="date"
                      value={form.dateOfBirth}
                      onChange={update('dateOfBirth')}
                      required
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender*</label>
                    <select
                      value={form.gender}
                      onChange={update('gender')}
                      required
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                    <input
                      type="email"
                      value={form.studentEmail}
                      onChange={update('studentEmail')}
                      required
                      placeholder="Enter your email address"
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number*</label>
                    <input
                      type="tel"
                      value={form.studentMobileNumber}
                      onChange={(e) => setForm((f) => ({ ...f, studentMobileNumber: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                      required
                      placeholder="Enter your mobile number"
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo (Optional)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setForm((f) => ({ ...f, studentProfilePhoto: e.target.files[0] }))}
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    />
                  </div>
                </div>

                {/* Address Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City*</label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={update('city')}
                      required
                      placeholder="Enter your city"
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State*</label>
                    <input
                      type="text"
                      value={form.state}
                      onChange={update('state')}
                      required
                      placeholder="Enter your state"
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country*</label>
                    <input
                      type="text"
                      value={form.country}
                      onChange={update('country')}
                      required
                      placeholder="Enter your country"
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pin Code*</label>
                    <input
                      type="text"
                      value={form.pinCode}
                      onChange={(e) => setForm((f) => ({ ...f, pinCode: e.target.value.replace(/\D/g, '').slice(0, 6) }))}
                      required
                      placeholder="Enter your pin code"
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    />
                  </div>
                </div>

                {/* Educational Details */}
                <div className="border-t pt-4 mt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Educational Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Highest Qualification*</label>
                      <select
                        value={form.highestQualification}
                        onChange={update('highestQualification')}
                        required
                        className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                      >
                        <option value="">Select Highest Qualification</option>
                        <option value="10th">10th</option>
                        <option value="12th">12th</option>
                        <option value="Graduation">Graduation</option>
                        <option value="Post Graduation">Post Graduation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">College / Institute Name*</label>
                      <input
                        type="text"
                        value={form.collegeName}
                        onChange={update('collegeName')}
                        required
                        placeholder="Enter college/institute name"
                        className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Passing Year*</label>
                      <input
                        type="number"
                        value={form.passingYear}
                        onChange={update('passingYear')}
                        required
                        placeholder="Enter passing year"
                        min="1990"
                        max="2030"
                        className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Marks / CGPA*</label>
                      <input
                        type="text"
                        value={form.marksCgpa}
                        onChange={update('marksCgpa')}
                        required
                        placeholder="Enter marks or CGPA (e.g., 85% or 8.5)"
                        className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Skills and Additional Information */}
                <div className="border-t pt-4 mt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Skills & Additional Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Skills*</label>
                    <input
                      type="text"
                      value={form.skills.join(', ')}
                      onChange={(e) => {
                        const skillsArray = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill);
                        setForm((f) => ({ ...f, skills: skillsArray }));
                      }}
                      required
                      placeholder="Enter your skills separated by commas (e.g., JavaScript, React, Python)"
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate multiple skills with commas</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Resume / CV Upload*</label>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setForm((f) => ({ ...f, resumeCv: e.target.files[0] }))}
                        required
                        className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                      />
                      <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Job Location*</label>
                      <input
                        type="text"
                        value={form.preferredJobLocation}
                        onChange={update('preferredJobLocation')}
                        required
                        placeholder="Enter preferred job location"
                        className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn / Portfolio Link (Optional)</label>
                    <input
                      type="url"
                      value={form.linkedinPortfolioLink}
                      onChange={update('linkedinPortfolioLink')}
                      placeholder="Enter your LinkedIn or portfolio URL"
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Common Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={update('password')}
                    required
                    placeholder="Enter your password"
                    className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 pr-10 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#5B9821] focus:outline-none"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="w-5 h-5" />
                    ) : (
                      <FaEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password*</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={update('confirmPassword')}
                    required
                    placeholder="Confirm your password"
                    className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 pr-10 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#5B9821] focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash className="w-5 h-5" />
                    ) : (
                      <FaEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-600 pt-1">
              <input id="terms" type="checkbox" className="w-4 h-4" required />
              <label htmlFor="terms">By clicking checkbox, you agree to our <a className="text-[#5B9821] hover:underline" href="#">Terms and Conditions</a> and Privacy Policy</label>
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full h-11 rounded-lg font-medium ${TAILWIND_COLORS.BTN_PRIMARY} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {loadingText}
                  </span>
                ) : (
                  'SIGN UP'
                )}
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="text-gray-600">Already have an account?</span>
              <a href="/login" className="text-[#5B9821] hover:underline">Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}



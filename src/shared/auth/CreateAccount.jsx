import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { COLORS, TAILWIND_COLORS } from '../WebConstant'
import { LuUsers } from 'react-icons/lu'
import { LuGraduationCap } from 'react-icons/lu'
import { FaUserShield, FaBuilding, FaSchool, FaEye, FaEyeSlash } from 'react-icons/fa'
import { postMethod } from '../../service/api'
import { getMethod } from '../../service/api'
import apiService from '../../service/serviceUrl'

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
  const [role, setRole] = useState('Admin') // Admin | Recruiter | Institute
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [form, setForm] = useState({
    // Common fields
    password: '',
    confirmPassword: '',
    // Admin fields
    fullName: '',
    officialEmail: '',
    mobileNumber: '',
    adminRole: 'Super Admin',
    employeeId: '',
    profilePhoto: null,
    // Recruiter fields
    companyName: '',
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
  })

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    
    // Prepare payload based on role
    let payload = {
      password: form.password,
      role: role,
      verified: ''
    }

    if (role === 'Admin') {
      payload = {
        ...payload,
        name: form.fullName,
        email: form.officialEmail,
        phone_number: form.mobileNumber,
        admin_role: form.adminRole,
        employee_id: form.employeeId,
        profile_photo: form.profilePhoto
      }
    } else if (role === 'Recruiter') {
      payload = {
        ...payload,
        name: form.companyName,
        email: form.companyWebsite,
        phone_number: form.designation,
        industry_type: form.industryType,
        office_address: form.officeAddress,
        company_logo: form.companyLogo,
        gst_pan: form.gstPan
      }
    } else if (role === 'Institute') {
      payload = {
        ...payload,
        name: form.instituteName,
        email: form.instituteEmail,
        phone_number: form.instituteContact,
        institute_type: form.instituteType,
        registration_number: form.registrationNumber,
        affiliation_details: form.affiliationDetails,
        principal_name: form.principalName,
        institute_logo: form.instituteLogo,
        courses_offered: form.coursesOffered,
        institute_address: form.instituteAddress,
        institute_website: form.instituteWebsite
      }
    }

    try {
      var data = {
        apiUrl: apiService.signup,
        payload: payload,
      };

      var response = await postMethod(data);
      
      if (response.status === true) {
        Swal.fire({
          title: "Success",
          text: "User registered successfully!",
          confirmButtonText: "Ok",
          icon: "success"
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/login"
          }
        });
      } else {
        Swal.fire({
          title: "Failed",
          text: "Registration Failed",
          icon: "error"
        });
      }
    } catch (error) {
      Swal.fire({
        title: "API Error",
        text: "Something went wrong. Please try again.",
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role*</label>
                    <select
                      value={form.adminRole}
                      onChange={update('adminRole')}
                      required
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    >
                      <option value="Super Admin">Super Admin</option>
                      <option value="Sub Admin">Sub Admin</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                  <input
                    type="text"
                    value={form.employeeId}
                    onChange={update('employeeId')}
                    placeholder="Enter employee ID (if organization based)"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry Type*</label>
                    <select
                      value={form.industryType}
                      onChange={update('industryType')}
                      required
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    >
                      <option value="">Select Industry Type</option>
                      <option value="IT">IT</option>
                      <option value="Education">Education</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Finance">Finance</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Designation / Role in Company*</label>
                    <input
                      type="text"
                      value={form.designation}
                      onChange={update('designation')}
                      required
                      placeholder="Enter your designation"
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    />
                  </div>
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
                      onChange={update('gstPan')}
                      placeholder="Enter GST or PAN number"
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number*</label>
                    <input
                      type="tel"
                      value={form.instituteContact}
                      onChange={(e) => setForm((f) => ({ ...f, instituteContact: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                      required
                      placeholder="Enter contact number"
                      className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                    />
                  </div>
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
              <button type="submit" className={`w-full h-11 rounded-lg font-medium ${TAILWIND_COLORS.BTN_PRIMARY}`}>
                SIGN UP
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



import React, { useState } from 'react'
import { COLORS, TAILWIND_COLORS } from '../WebConstant'

export default function CreateAccount() {
  const [role, setRole] = useState('Recruiter') // Recruiter | Institute
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    phone: '',
    age: '',
    qualifications: '',
  })

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    // eslint-disable-next-line no-console
    console.log('create-account', { role, ...form })
  }

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-8 ${TAILWIND_COLORS.BG_PRIMARY}`}>
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="rounded-2xl bg-white shadow-sm border border-[rgba(0,57,91,0.18)] px-6 md:px-10 py-6 md:py-7 mb-6">
          <h1 className="text-center text-xl md:text-2xl font-semibold text-gray-800">Create your account</h1>
          <div className="mt-4 flex items-center justify-center">
            <div className="relative w-[420px] max-w-full bg-gray-100 rounded-full p-1 flex items-center gap-1">
              {['Recruiter', 'Institute'].map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setRole(label)}
                  className={`flex-1 text-xs md:text-sm rounded-full h-8 md:h-9 transition-colors ${
                    role === label ? 'text-white' : 'text-gray-600'
                  }`}
                  style={role === label ? { backgroundColor: COLORS.GREEN_PRIMARY } : {}}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className={`rounded-2xl p-6 md:p-8 ${TAILWIND_COLORS.CARD}`}>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={update('firstName')}
                  required
                  placeholder="Enter your First Name"
                  className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={update('lastName')}
                  placeholder="Enter your Last Name"
                  className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
              <input
                type="password"
                value={form.password}
                onChange={update('password')}
                required
                placeholder="Enter your password"
                className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password*</label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={update('confirmPassword')}
                required
                placeholder="Confirm your password"
                className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                placeholder="Enter your phone number"
                className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  min="0"
                  value={form.age}
                  onChange={update('age')}
                  placeholder="Enter your age"
                  className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
                <input
                  type="text"
                  value={form.qualifications}
                  onChange={update('qualifications')}
                  placeholder="Enter your qualifications"
                  className="w-full h-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B9821] px-3 bg-white"
                />
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

            <div className="text-center text-xs text-gray-500">Or Continue With</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button type="button" className="flex items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white h-12 hover:bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-6 h-6">
                  <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.602 32.091 29.221 35 24 35c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C33.64 5.108 28.999 3 24 3 12.955 3 4 11.955 4 23s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"/>
                  <path fill="#FF3D00" d="M6.306 14.691l6.571 4.817C14.655 16.095 18.961 13 24 13c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C33.64 5.108 28.999 3 24 3 16.318 3 9.656 7.337 6.306 14.691z"/>
                  <path fill="#4CAF50" d="M24 43c5.166 0 9.86-1.977 13.409-5.197l-6.191-5.238C29.164 34.091 26.72 35 24 35c-5.202 0-9.571-2.886-11.289-7.045l-6.5 5.02C9.485 38.556 16.227 43 24 43z"/>
                  <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.093 3.008-3.386 5.421-6.084 6.566l.001-.001 6.191 5.238C33.164 40.355 44 34 44 23c0-1.341-.138-2.651-.389-3.917z"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">continue with Google</span>
              </button>
              <button type="button" className="flex items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white h-12 hover:bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6 h-6 fill-[#0A66C2]"><path d="M100.28 448H7.4V148.9h92.88zm-46.44-340C24.29 108 0 83.5 0 53.64A53.64 53.64 0 0 1 53.83 0C83.5 0 108 24.29 108 53.64S83.5 108 53.83 108zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.7 37.7-55.7 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"/></svg>
                <span className="text-sm font-medium text-gray-700">continue with Linkedin</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}



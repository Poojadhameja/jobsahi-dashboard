import React, { useState } from 'react'
import { TAILWIND_COLORS, COLORS } from '../WebConstant'

export default function AdminProfile() {
  const onLogout = () => {
    if (typeof window !== 'undefined') window.location.href = '/login'
  }
  const [profile, setProfile] = useState({
    name: 'Admin',
    email: 'admin@jobsahi.com',
    phone: '9876543210',
    role: 'Admin',
  })
  const [phoneError, setPhoneError] = useState('')

  const onChangeField = (key) => (e) => {
    let value = e.target.value
    if (key === 'phone') {
      value = value.replace(/\D/g, '').slice(0, 10)
      if (value.length !== 10) {
        setPhoneError('Enter a valid 10-digit phone number')
      } else {
        setPhoneError('')
      }
    }
    setProfile((p) => ({ ...p, [key]: value }))
  }

  const onSave = () => {
    if (!/^\d{10}$/.test(profile.phone)) {
      setPhoneError('Enter a valid 10-digit phone number')
      return
    }
    // eslint-disable-next-line no-console
    console.log('save-profile', profile)
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-gray-200 grid place-items-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-gray-600">
            <path d="M12 12a5 5 0 100-10 5 5 0 000 10zM4 22a8 8 0 1116 0"/>
          </svg>
        </div>
        <div>
          <h1 className={`text-2xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Admin Profile</h1>
          <div className="text-sm text-gray-500">Manage your profile and account settings</div>
        </div>
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-4`}>
        <div className={`${TAILWIND_COLORS.CARD} p-4 lg:col-span-2`}>
          <div className="font-medium mb-3">Profile Information</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Full Name</label>
              <input className="w-full h-11 rounded-lg border border-gray-300 px-3 bg-white" value={profile.name} onChange={onChangeField('name')} />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input className="w-full h-11 rounded-lg border border-gray-300 px-3 bg-white" value={profile.email} onChange={onChangeField('email')} />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Phone</label>
              <input
                className={`w-full h-11 rounded-lg px-3 bg-white border ${phoneError ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-[#5B9821]'}`}
                value={profile.phone}
                onChange={onChangeField('phone')}
                inputMode="numeric"
                placeholder="Enter 10-digit phone"
              />
              {phoneError ? <div className="mt-1 text-xs text-red-600">{phoneError}</div> : null}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Role</label>
              <input className="w-full h-11 rounded-lg border border-gray-300 px-3 bg-gray-50" readOnly value={profile.role} />
            </div>
          </div>
          <div className="mt-4">
            <button onClick={onSave} className={`px-4 py-2 rounded-lg ${TAILWIND_COLORS.BTN_PRIMARY}`}>Save Changes</button>
          </div>
        </div>

        <div className={`${TAILWIND_COLORS.CARD} p-4 space-y-3`}>
          <div className="font-medium">Security</div>
          <button className={`w-full h-10 rounded-lg ${TAILWIND_COLORS.BTN_LIGHT}`}>Change Password</button>
          <button className={`w-full h-10 rounded-lg ${TAILWIND_COLORS.BTN_LIGHT}`}>Two-Factor Authentication</button>
          <button className={`w-full h-10 rounded-lg ${TAILWIND_COLORS.BTN_LIGHT}`} style={{ color: COLORS.ERROR, borderColor: '#FEE2E2' }}>Delete Account</button>
          <div className="pt-1">
            <button onClick={onLogout} className={`w-full h-10 rounded-lg ${TAILWIND_COLORS.BTN_PRIMARY}`}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  )
}



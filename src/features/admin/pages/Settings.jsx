import React, { useState } from 'react'
import { TAILWIND_COLORS } from '../../../shared/WebConstant'

export default function Settings() {
  const [siteName, setSiteName] = useState('JobSahi')
  const [supportEmail, setSupportEmail] = useState('support@jobsahi.com')

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Settings</h1>
      <div className={`${TAILWIND_COLORS.CARD} p-4 space-y-3 max-w-xl`}>
        <label className="block">
          <div className="text-sm text-gray-600 mb-1">Site Name</div>
          <input className="w-full border rounded-lg p-2" value={siteName} onChange={e=>setSiteName(e.target.value)} />
        </label>
        <label className="block">
          <div className="text-sm text-gray-600 mb-1">Support Email</div>
          <input className="w-full border rounded-lg p-2" value={supportEmail} onChange={e=>setSupportEmail(e.target.value)} />
        </label>
        <Button className={`px-4 py-2 rounded-lg`} variant="primary">Save</Button>
      </div>
    </div>
  )
}

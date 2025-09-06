import React, { useState } from 'react'
import { TAILWIND_COLORS } from '../../../shared/WebConstant'

export default function MessagingCampaigns() {
  const [message, setMessage] = useState('')
  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Messaging Campaigns</h1>
      <div className={`${TAILWIND_COLORS.CARD} p-4 space-y-3`}>
        <textarea className="w-full border rounded-lg p-3" rows={5}
          placeholder="Write announcement / campaign message..."
          value={message} onChange={e=>setMessage(e.target.value)} />
        <div className="flex gap-2">
          <button className={`px-4 py-2 rounded-lg ${TAILWIND_COLORS.BTN_PRIMARY}`}>Send to Students</button>
          <button className={`px-4 py-2 rounded-lg ${TAILWIND_COLORS.BTN_SECONDARY}`}>Send to Institutes</button>
        </div>
      </div>
    </div>
  )
}

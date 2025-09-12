import React, { useState } from 'react'

// Message Specific Institute Component
function MessageSpecificInstitute() {
  const [selectedInstitute, setSelectedInstitute] = useState('')
  const [messageType, setMessageType] = useState('')
  const [messageSubject, setMessageSubject] = useState('')
  const [messageContent, setMessageContent] = useState('')

  const institutes = [
    { id: 1, name: 'SPI Tech Institute', location: 'Mumbai' },
    { id: 2, name: 'Xaviers Institute', location: 'Delhi' },
    { id: 3, name: 'National IT Academy', location: 'Bangalore' },
    { id: 4, name: 'Crescent Institute', location: 'Chennai' },
    { id: 5, name: 'Delhi Technical Institute', location: 'Delhi' },
    { id: 6, name: 'Mumbai Skill Center', location: 'Mumbai' }
  ]

  const messageTypes = [
    'General Notification',
    'Course Update',
    'Certificate Ready',
    'Payment Reminder',
    'Placement Drive',
    'System Maintenance'
  ]

  const handleSendMessage = () => {
    if (selectedInstitute && messageType && messageSubject && messageContent) {
      alert('Message sent successfully!')
      // Reset form
      setSelectedInstitute('')
      setMessageType('')
      setMessageSubject('')
      setMessageContent('')
    } else {
      alert('Please fill in all fields')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">✓</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Message Specific Institute</h2>
      </div>

      {/* Message Form */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Institute Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Select Institute</h3>
            
            {/* Institute List */}
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {institutes.map((institute) => (
                <div
                  key={institute.id}
                  onClick={() => setSelectedInstitute(institute.name)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors duration-200 ${
                    selectedInstitute === institute.name
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">{institute.name}</div>
                  <div className="text-sm text-gray-500">{institute.location}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Message Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Message Details</h3>
            
            {/* Message Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message Type
              </label>
              <select
                value={messageType}
                onChange={(e) => setMessageType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select message type</option>
                {messageTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={messageSubject}
                onChange={(e) => setMessageSubject(e.target.value)}
                placeholder="Enter message subject"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Message Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message Content
              </label>
              <textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Enter your message here..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSendMessage}
                className="px-6 py-2 bg-[#5C9A24] text-white rounded-lg hover:bg-[#45741b] transition-colors duration-200 font-medium"
              >
                Send Message
              </button>
              <button
                onClick={() => {
                  setSelectedInstitute('')
                  setMessageType('')
                  setMessageSubject('')
                  setMessageContent('')
                }}
                className="px-6 py-2 border-2 border-[#5C9A24] hover:text-white rounded-lg hover:bg-[#5C9A24] transition-colors duration-200 font-medium"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Messages</h3>
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium text-gray-900">Course Update Notification</div>
                <div className="text-sm text-gray-500">Sent to SPI Tech Institute</div>
                <div className="text-xs text-gray-400">2 hours ago</div>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Sent
              </span>
            </div>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium text-gray-900">Certificate Ready</div>
                <div className="text-sm text-gray-500">Sent to Xaviers Institute</div>
                <div className="text-xs text-gray-400">1 day ago</div>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Sent
              </span>
            </div>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium text-gray-900">Payment Reminder</div>
                <div className="text-sm text-gray-500">Sent to National IT Academy</div>
                <div className="text-xs text-gray-400">3 days ago</div>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Sent
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MessageInstitute() {
  return <MessageSpecificInstitute />
}

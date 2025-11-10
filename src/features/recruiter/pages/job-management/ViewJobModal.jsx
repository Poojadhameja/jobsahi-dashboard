import React from 'react'
import { LuX, LuCalendar, LuUpload } from 'react-icons/lu'

const ViewJobModal = ({ isOpen, onClose, job }) => {
  if (!isOpen || !job) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[95vh] flex flex-col shadow-2xl">
        {/* Fixed Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-2xl font-semibold text-[var(--color-primary)]">JOB DETAILS</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LuX size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-8">
          {/* Basic Information Form */}
          <div className="bg-white rounded-xl border border-[var(--color-primary)3C] p-5">
            <h2 className="text-xl font-bold text-gray-900 mb-8">Basic Information</h2>
            
            <div className="space-y-8">
              {/* Job Title */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    JOB TITLE
                  </label>
                  <p className="text-sm text-gray-500">Add position name</p>
                </div>
                <div className="lg:col-span-2">
                  <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                    {job.title || 'N/A'}
                  </div>
                </div>
              </div>

              {/* Job Sector */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    JOB SECTOR
                  </label>
                  <p className="text-sm text-gray-500">Choose category</p>
                </div>
                <div className="lg:col-span-2">
                  <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                    {job.jobSector || 'N/A'}
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    JOB DESCRIPTION
                  </label>
                  <p className="text-sm text-gray-500">For effective candidate selection, enhance the job description with</p>
                </div>
                <div className="lg:col-span-2">
                  <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 min-h-[100px]">
                    {job.description || 'No description provided'}
                  </div>
                </div>
              </div>

              {/* Salary */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    SALARY
                  </label>
                  <p className="text-sm text-gray-500">Choose category</p>
                </div>
                <div className="lg:col-span-2">
                  <div className="flex gap-4">
                    <div className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                      {job.salaryType || 'N/A'}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">₹</span>
                      <div className="w-24 px-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                        {job.minSalary || 'N/A'}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">₹</span>
                      <div className="w-24 px-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                        {job.maxSalary || 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Type */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    JOB TYPE
                  </label>
                  <p className="text-sm text-gray-500">Choose job type</p>
                </div>
                <div className="lg:col-span-2">
                  <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                    {job.jobType || 'N/A'}
                  </div>
                </div>
              </div>

              {/* Required Skills */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    REQUIRED SKILLS
                  </label>
                  <p className="text-sm text-gray-500">List needed skills</p>
                </div>
                <div className="lg:col-span-2">
                  <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                    {job.requiredSkills || 'N/A'}
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    EXPERIENCE
                  </label>
                  <p className="text-sm text-gray-500">Choose required experience</p>
                </div>
                <div className="lg:col-span-2">
                  <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                    {job.experience || 'N/A'}
                  </div>
                </div>
              </div>

              {/* File Attachment */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    FILE ATTACHMENT
                  </label>
                  <p className="text-sm text-gray-500">Upload related documents.</p>
                </div>
                <div className="lg:col-span-2">
                  <button className="px-4 py-2 bg-secondary-10 text-[var(--color-secondary)] rounded-lg font-medium hover:bg-secondary-10 transition-colors">
                    Preview
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Address / Location Form */}
          <div className="bg-white rounded-xl border border-[var(--color-primary)3C] p-5">
            <h2 className="text-xl font-bold text-gray-900 mb-8">Address / Location</h2>
            
            <div className="space-y-8">
              {/* Country */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    COUNTRY
                  </label>
                  <p className="text-sm text-gray-500">Select job location country</p>
                </div>
                <div className="lg:col-span-2">
                  <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                    {job.country || 'N/A'}
                  </div>
                </div>
              </div>

              {/* City */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    CITY
                  </label>
                  <p className="text-sm text-gray-500">Choose job city</p>
                </div>
                <div className="lg:col-span-2">
                  <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                    {job.city || 'N/A'}
                  </div>
                </div>
              </div>

              {/* State */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    STATE
                  </label>
                  <p className="text-sm text-gray-500">Choose job state</p>
                </div>
                <div className="lg:col-span-2">
                  <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                    {job.state || 'N/A'}
                  </div>
                </div>
              </div>

              {/* Full Address */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    FULL ADDRESS
                  </label>
                  <p className="text-sm text-gray-500">Enter complete location</p>
                </div>
                <div className="lg:col-span-2">
                  <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                    {job.fullAddress || job.location || 'N/A'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information and Dates and Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information Form */}
            <div className="bg-white rounded-xl border border-[var(--color-primary)3C] p-5">
              <h2 className="text-xl font-bold text-gray-900 mb-8">Contact information</h2>
              
              <div className="space-y-8">
                {/* Person */}
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      PERSON
                    </label>
                    <p className="text-sm text-gray-500">Enter contact person's name</p>
                  </div>
                  <div>
                    <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                      {job.contactPerson || 'N/A'}
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      PHONE
                    </label>
                    <p className="text-sm text-gray-500">Add contact number</p>
                  </div>
                  <div>
                    <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                      {job.phone || 'N/A'}
                    </div>
                  </div>
                </div>

                {/* Additional Contact */}
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      ADDITIONAL CONTACT
                    </label>
                    <p className="text-sm text-gray-500">Add alternate contact</p>
                  </div>
                  <div>
                    <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                      {job.additionalContact || 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dates and Status Form */}
            <div className="bg-white rounded-xl border border-[var(--color-primary)3C] p-5">
              <h2 className="text-xl font-bold text-gray-900 mb-8">Dates and Status</h2>
              
              <div className="space-y-8">
                {/* Vacancy Status */}
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      VACANCY STATUS
                    </label>
                    <p className="text-sm text-gray-500">Select hiring status</p>
                  </div>
                  <div>
                    <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                      {job.status || 'N/A'}
                    </div>
                  </div>
                </div>

                {/* Opening Date */}
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      OPENING
                    </label>
                    <p className="text-sm text-gray-500">Choose job post start</p>
                  </div>
                  <div>
                    <div className="relative">
                      <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 pr-10">
                        {job.openingDate || 'N/A'}
                      </div>
                      <LuCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                  </div>
                </div>

                {/* Closing Date */}
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      CLOSING
                    </label>
                    <p className="text-sm text-gray-500">Choose job post end</p>
                  </div>
                  <div>
                    <div className="relative">
                      <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 pr-10">
                        {job.closingDate || 'N/A'}
                      </div>
                      <LuCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewJobModal

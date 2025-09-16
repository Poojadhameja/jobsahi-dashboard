import React, { useState } from 'react'
import { LuPencil, LuSend, LuUpload, LuChevronDown, LuCalendar } from 'react-icons/lu'
import RichTextEditor from '../../../../shared/components/RichTextEditor'

const PostJob = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobSector: '',
    jobDescription: '',
    salaryType: 'Monthly',
    minSalary: '',
    maxSalary: '',
    jobType: '',
    requiredSkills: '',
    experience: '',
    fileAttachment: null
  })

  const [locationData, setLocationData] = useState({
    country: '',
    city: '',
    state: '',
    fullAddress: ''
  })

  const [contactData, setContactData] = useState({
    person: 'Rakesh Verma',
    phone: '9876543210',
    additionalContact: 'rakesh.hr@company.com'
  })

  const [dateStatusData, setDateStatusData] = useState({
    vacancyStatus: 'Open',
    opening: '2025-07-01',
    closing: '2025-08-15'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      fileAttachment: e.target.files[0]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const handleDraft = () => {
    console.log('Save as draft:', formData)
  }

  const handleCancel = () => {
    console.log('Cancel form')
  }

  return (
    <div className=" bg-[#F6FAFF] p-2 ">
      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-[#0B537D]">Create Job Posts</h1>
        
        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={handleCancel}
            className="px-5 bg-[#5b9a241f] text-[#5C9A24] rounded-full font-bold hover:bg-[#5C9A24] hover:text-white  border-2 border-[#5C9A24] transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            Cancel
          </button>
          <button
            onClick={handleDraft}
            className="px-5 bg-[#5b9a241f] text-[#5C9A24] rounded-full font-bold hover:bg-[#5C9A24] hover:text-white  border-2 border-[#5C9A24] transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <LuPencil size={16} />
            <span>Draft</span>
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-[#5C9A24] text-[#fff] rounded-full font-bold hover:bg-[#5C9A24] hover:text-white  border-2 border-[#5C9A24] transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <LuSend size={16} />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl border border-[#0B537D3C] p-5">
        <h2 className="text-xl font-bold text-gray-900 mb-8">Basic Information</h2>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Job Title */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                JOB TITLE<span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-500">Add position name</p>
            </div>
            <div className="lg:col-span-2">
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                placeholder="Position name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C9A24] focus:border-transparent outline-none"
                required
              />
            </div>
          </div>

          {/* Job Sector */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                JOB SECTOR<span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-500">Choose category</p>
            </div>
            <div className="lg:col-span-2">
              <div className="relative">
                <select
                  name="jobSector"
                  value={formData.jobSector}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C9A24] focus:border-transparent outline-none appearance-none bg-white"
                  required
                >
                  <option value="">Choose Category</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="education">Education</option>
                  <option value="construction">Construction</option>
                </select>
                <LuChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
          </div>

           {/* Job Description */}
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             <div className="lg:col-span-1">
               <label className="block text-sm font-semibold text-gray-900 mb-2">
                 JOB DESCRIPTION<span className="text-red-500">*</span>
               </label>
               <p className="text-sm text-gray-500">For effective candidate selection, enhance the job description with</p>
             </div>
             <div className="lg:col-span-2">
               <RichTextEditor
                 value={formData.jobDescription}
                 onChange={(value) => setFormData(prev => ({ ...prev, jobDescription: value }))}
                 placeholder="Enter job description"
                 height="150px"
                 required
               />
             </div>
           </div>

          {/* Salary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                SALARY<span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-500">Choose category</p>
            </div>
            <div className="lg:col-span-2">
              <div className="flex space-x-4">
                <div className="relative flex-1">
                  <select
                    name="salaryType"
                    value={formData.salaryType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C9A24] focus:border-transparent outline-none appearance-none bg-white"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                    <option value="Hourly">Hourly</option>
                  </select>
                  <LuChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                <div className="relative flex-1">
                  <input
                    type="number"
                    name="minSalary"
                    value={formData.minSalary}
                    onChange={handleInputChange}
                    placeholder="Min"
                    className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C9A24] focus:border-transparent outline-none"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                </div>
                <div className="relative flex-1">
                  <input
                    type="number"
                    name="maxSalary"
                    value={formData.maxSalary}
                    onChange={handleInputChange}
                    placeholder="Max"
                    className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C9A24] focus:border-transparent outline-none"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
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
              <div className="relative">
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C9A24] focus:border-transparent outline-none appearance-none bg-white"
                >
                  <option value="">Choose job type</option>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
                <LuChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
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
              <input
                type="text"
                name="requiredSkills"
                value={formData.requiredSkills}
                onChange={handleInputChange}
                placeholder="Enter required skills"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C9A24] focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Experience */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                EXPERIENCE<span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-500">Choose required experience</p>
            </div>
            <div className="lg:col-span-2">
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="Enter experience"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C9A24] focus:border-transparent outline-none"
                required
              />
            </div>
          </div>

          {/* File Attachment */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                FILE ATTACHMENT<span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-500">Upload related documents.</p>
            </div>
            <div className="lg:col-span-2">
              <label className="w-fit px-4 py-3 bg-[#5b9a241f] text-[#5C9A24] rounded-lg font-bold hover:bg-[#5C9A24] hover:text-white  border-2 border-[#5C9A24] transition-colors duration-200 flex items-center justify-center space-x-2 cursor-pointer">
                <LuUpload size={16} />
                <span>Upload Files</span>
                <input
                  type="file"
                  name="fileAttachment"
                  onChange={handleFileChange}
                  className="hidden"
                  multiple
                />
              </label>
            </div>
           </div>
         </form>
       </div>

       {/* Address / Location */}
       <div className="bg-white rounded-xl border border-[#0B537D3C] p-6 my-6">
         <h2 className="text-xl font-semibold text-gray-900 mb-6">Address / Location</h2>
         <div className="flex flex-col gap-6 mb-6">
           {/* Country */}
           <div className="flex flex-col lg:flex-row gap-4  ">
             <div className="lg:w-[20%]">
             <label htmlFor="country" className="block text-sm font-semibold text-gray-900 mb-2">
               COUNTRY<span className="text-red-500">*</span>
             </label>
             <p className="text-sm text-gray-500 mb-2">Select job location country</p>
             </div>
             <div className="relative">
               <select
                 id="country"
                 name="country"
                 value={locationData.country}
                 onChange={(e) => setLocationData(prev => ({ ...prev, country: e.target.value }))}
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C9A24] focus:border-transparent outline-none appearance-none bg-white pr-10"
                 required
               >
                 <option value="">Select country</option>
                 <option value="India">India</option>
                 <option value="USA">USA</option>
                 <option value="UK">UK</option>
                 <option value="Canada">Canada</option>
               </select>
               <LuChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
             </div>
           </div>

           {/* City */}
           <div className="flex flex-col lg:flex-row gap-4  ">
             <div className="lg:w-[20%]">
             <label htmlFor="city" className="block text-sm font-semibold text-gray-900 mb-2">
               CITY<span className="text-red-500">*</span>
             </label>
             <p className="text-sm text-gray-500 mb-2">Choose job city</p>
             </div>
             <div className="relative">
               <select
                 id="city"
                 name="city"
                 value={locationData.city}
                 onChange={(e) => setLocationData(prev => ({ ...prev, city: e.target.value }))}
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C9A24] focus:border-transparent outline-none appearance-none bg-white pr-10"
                 required
               >
                 <option value="">Select city</option>
                 <option value="Mumbai">Mumbai</option>
                 <option value="Delhi">Delhi</option>
                 <option value="Bangalore">Bangalore</option>
                 <option value="New York">New York</option>
                 <option value="London">London</option>
               </select>
               <LuChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
             </div>
           </div>

           {/* State */}
           <div className="flex flex-col lg:flex-row gap-4  ">
             <div className="lg:w-[20%]">
             <label htmlFor="state" className="block text-sm font-semibold text-gray-900 mb-2">
               STATE<span className="text-red-500">*</span>
             </label>
             <p className="text-sm text-gray-500 mb-2">Choose job state</p>
             </div>
             <div className="relative">
               <select
                 id="state"
                 name="state"
                 value={locationData.state}
                 onChange={(e) => setLocationData(prev => ({ ...prev, state: e.target.value }))}
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C9A24] focus:border-transparent outline-none appearance-none bg-white pr-10"
                 required
               >
                 <option value="">Select state</option>
                 <option value="Maharashtra">Maharashtra</option>
                 <option value="Delhi">Delhi</option>
                 <option value="Karnataka">Karnataka</option>
                 <option value="New York State">New York State</option>
                 <option value="California">California</option>
               </select>
               <LuChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
             </div>
           </div>
         </div>

         {/* Full Address */}
         <div className="flex flex-col lg:flex-row gap-4  ">
          <div className="lg:w-[25%]">
          <label htmlFor="fullAddress" className="block text-sm font-semibold text-gray-900 mb-2">
             FULL ADDRESS<span className="text-red-500">*</span>
           </label>
           <p className="text-sm text-gray-500 mb-2">Enter complete location</p>
          </div>
           <input
             type="text"
             id="fullAddress"
             name="fullAddress"
             value={locationData.fullAddress}
             onChange={(e) => setLocationData(prev => ({ ...prev, fullAddress: e.target.value }))}
             placeholder="Enter location"
             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C9A24] focus:border-transparent outline-none"
             required
           />
         </div>
       </div>

        <div className="flex flex-col lg:flex-row gap-5 w-full ">
         {/* Contact Information */}
        <div className="bg-white rounded-xl border border-[#0B537D3C] p-6 mb-6 w-full lg:w-[50%]">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact information</h2>
          <div className="flex flex-col gap-6">
            {/* Person */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="lg:w-[40%]">
                <label htmlFor="person" className="block text-sm font-semibold text-gray-900 mb-2">
                  PERSON
                </label>
                <p className="text-sm text-gray-500 mb-2">Enter contact person's name</p>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  id="person"
                  name="person"
                  value={contactData.person}
                  onChange={(e) => setContactData(prev => ({ ...prev, person: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C9A24] focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="lg:w-[40%]">
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                  PHONE
                </label>
                <p className="text-sm text-gray-500 mb-2">Add contact number</p>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={contactData.phone}
                  onChange={(e) => setContactData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C9A24] focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Additional Contact */}
            <div className="flex flex-col lg:flex-row gap-4">
            <div className="lg:w-[40%]">
                <label htmlFor="additionalContact" className="block text-sm font-semibold text-gray-900 mb-2">
                  ADDITIONAL CONTACT
                </label>
                <p className="text-sm text-gray-500 mb-2">Add alternate contact</p>
              </div>
              <div className="flex-1">
                <input
                  type="email"
                  id="additionalContact"
                  name="additionalContact"
                  value={contactData.additionalContact}
                  onChange={(e) => setContactData(prev => ({ ...prev, additionalContact: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C9A24] focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dates and Status */}
        <div className="bg-white rounded-xl border border-[#0B537D3C] p-6 mb-6 w-full lg:w-[50%]">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Dates and Status</h2>
          <div className="flex flex-col gap-6">
            {/* Vacancy Status */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="lg:w-[40%]">
                <label htmlFor="vacancyStatus" className="block text-sm font-semibold text-gray-900 mb-2">
                  VACANCY STATUS<span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-500 mb-2">Select hiring status</p>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  id="vacancyStatus"
                  name="vacancyStatus"
                  value={dateStatusData.vacancyStatus}
                  onChange={(e) => setDateStatusData(prev => ({ ...prev, vacancyStatus: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C9A24] focus:border-transparent outline-none"
                  required
                />
              </div>
            </div>

            {/* Opening Date */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="lg:w-[40%]">
                <label htmlFor="openingDate" className="block text-sm font-semibold text-gray-900 mb-2">
                  OPENING<span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-500 mb-2">Choose job post start</p>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="date"
                    id="openingDate"
                    name="openingDate"
                    value={dateStatusData.opening}
                    onChange={(e) => setDateStatusData(prev => ({ ...prev, opening: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C9A24] focus:border-transparent outline-none appearance-none pr-10"
                    required
                  />
                  <LuCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>
            </div>

            {/* Closing Date */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="lg:w-[40%]">
                <label htmlFor="closingDate" className="block text-sm font-semibold text-gray-900 mb-2">
                  CLOSING<span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-500 mb-2">Choose job post end</p>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="date"
                    id="closingDate"
                    name="closingDate"
                    value={dateStatusData.closing}
                    onChange={(e) => setDateStatusData(prev => ({ ...prev, closing: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C9A24] focus:border-transparent outline-none appearance-none pr-10"
                    required
                  />
                  <LuCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
     </div>
   )
 }

export default PostJob

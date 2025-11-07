import React, { useState, useEffect } from "react";
import { LuUpload, LuCalendar, LuX } from "react-icons/lu";
import { getMethod } from "../../../../service/api";
import service from "../../services/serviceUrl";


const EditCard = ({ isOpen, onClose, job, onSave }) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobSector: "",
    jobDescription: "",
    salaryType: "",
    minSalary: "",
    maxSalary: "",
    jobType: "",
    requiredSkills: "",
    experience: "",
    uploadedFiles: [],
    city: "",
    state: "",
    fullAddress: "",
    contactPerson: "",
    phone: "",
    additionalContact: "",
    vacancyStatus: "",
    openingDate: "",
    closingDate: "",
  });

  const [errors, setErrors] = useState({});
  const [showWarning, setShowWarning] = useState(false);

  // Populate form data when job prop changes
  useEffect(() => {
  if (!isOpen || !job?.id) return; // call only when modal is open and id exists

  (async () => {
    try {
      const res = await getMethod({
        apiUrl: `${service.getJobs}?id=${job.id}`,
      });

      if (res?.status && res?.data) {
        const d = res.data;

        setFormData({
          jobTitle: d.title || "",
          jobSector: d.job_sector || "",
          jobDescription: d.description || "",
          jobType: d.job_type || "",
          requiredSkills: d.skills_required || "",
          experience: d.experience_required || "",
          minSalary: d.salary_min || "",
          maxSalary: d.salary_max || "",
          city: extractCity(d.location) || "",
          state: extractState(d.location) || "",
          fullAddress: extractAddress(d.location) || "",
         contactPerson: d.person_name || "",
          phone: d.phone || "",
          additionalContact: d.additional_contact || "",
          vacancyStatus: d.status || "",
          openingDate: d.created_at?.split(" ")[0] || "",
          closingDate: d.application_deadline?.split(" ")[0] || "",
          uploadedFiles: Array.isArray(d.uploadedFiles) ? d.uploadedFiles : [],

        });
      } else {
        console.warn("Job not found or failed:", res);
      }
    } catch (err) {
      console.error("Error fetching job details:", err);
    }
  })();
}, [isOpen, job]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...files],
    }));
  };

  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required";
    if (!formData.jobSector) newErrors.jobSector = "Job sector is required";
    if (!formData.jobDescription.trim())
      newErrors.jobDescription = "Job description is required";
    if (!formData.salaryType) newErrors.salaryType = "Salary type is required";
    if (!formData.minSalary.trim())
      newErrors.minSalary = "Minimum salary is required";
    if (!formData.maxSalary.trim())
      newErrors.maxSalary = "Maximum salary is required";
    if (!formData.jobType) newErrors.jobType = "Job type is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.fullAddress.trim())
      newErrors.fullAddress = "Full address is required";
    if (!formData.vacancyStatus)
      newErrors.vacancyStatus = "Vacancy status is required";
    if (!formData.openingDate)
      newErrors.openingDate = "Opening date is required";
    if (!formData.closingDate)
      newErrors.closingDate = "Closing date is required";

    // Date validation
    if (formData.openingDate && formData.closingDate) {
      const openingDate = new Date(formData.openingDate);
      const closingDate = new Date(formData.closingDate);
      if (openingDate >= closingDate) {
        newErrors.closingDate = "Closing date must be after opening date";
      }
    }

    // Salary validation
    if (formData.minSalary && formData.maxSalary) {
      const minSalary = parseFloat(formData.minSalary);
      const maxSalary = parseFloat(formData.maxSalary);
      if (minSalary >= maxSalary) {
        newErrors.maxSalary =
          "Maximum salary must be greater than minimum salary";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 5000);
      return;
    }

    if (onSave) {
      onSave(job.id, formData);
    }
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;
  function extractCity(location) {
  if (!location) return "";
  const parts = location.split(",").map(p => p.trim());
  return parts[0] || "";
}

function extractState(location) {
  if (!location) return "";
  const parts = location.split(",").map(p => p.trim());
  return parts[1] || "";
}

function extractAddress(location) {
  if (!location) return "";
  const parts = location.split(",").map(p => p.trim());
  return parts.slice(0, -2).join(", ") || parts[0];
}


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[95vh] flex flex-col shadow-2xl">
        {/* Fixed Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-2xl font-semibold text-[var(--color-primary)]">
            Edit Job Post
          </h2>
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LuX size={24} className={`${TAILWIND_COLORS.TEXT_MUTED}`} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Warning Message */}
          {showWarning && (
            <div className="mx-6 mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">
                Please fill in all required fields before saving!
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Basic Information Form */}
            <div className="bg-white rounded-xl border border-[var(--color-primary)3C] p-5">
              <h2 className="text-xl font-bold text-gray-900 mb-8">
                Basic Information
              </h2>

              <div className="space-y-8">
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
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none ${
                        errors.jobTitle ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter job title"
                      required
                    />
                    {errors.jobTitle && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.jobTitle}
                      </p>
                    )}
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
                    <select
                      name="jobSector"
                      value={formData.jobSector}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none ${
                        errors.jobSector ? "border-red-500" : "border-gray-300"
                      }`}
                      required
                    >
                      <option value="">Choose Category</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="finance">Finance</option>
                      <option value="education">Education</option>
                      <option value="electrical">Electrical</option>
                    </select>
                    {errors.jobSector && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.jobSector}
                      </p>
                    )}
                  </div>
                </div>

                {/* Job Description */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      JOB DESCRIPTION<span className="text-red-500">*</span>
                    </label>
                    <p className="text-sm text-gray-500">
                      For effective candidate selection, enhance the job
                      description with
                    </p>
                  </div>
                  <div className="lg:col-span-2">
                    <textarea
                      name="jobDescription"
                      value={formData.jobDescription}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none resize-none ${
                        errors.jobDescription
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Describe the job responsibilities, requirements, and benefits..."
                      required
                    />
                    {errors.jobDescription && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.jobDescription}
                      </p>
                    )}
                  </div>
                </div>

                {/* Salary */}
{/* Salary */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-1">
    <label className="block text-sm font-semibold text-gray-900 mb-2">
      SALARY<span className="text-red-500">*</span>
    </label>
    <p className="text-sm text-gray-500">Enter minimum and maximum salary</p>
  </div>

  <div className="lg:col-span-2">
    <div className="flex gap-4">
      <div className="flex items-center gap-2">
        <span className="text-gray-500">₹</span>
        <input
          type="number"
          name="minSalary"
          value={formData.minSalary}
          onChange={handleInputChange}
          className={`w-32 px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none ${
            errors.minSalary ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Min"
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-gray-500">₹</span>
        <input
          type="number"
          name="maxSalary"
          value={formData.maxSalary}
          onChange={handleInputChange}
          className={`w-32 px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none ${
            errors.maxSalary ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Max"
          required
        />
      </div>
    </div>
    {(errors.minSalary || errors.maxSalary) && (
      <p className="text-red-500 text-sm mt-1">
        {errors.minSalary || errors.maxSalary}
      </p>
    )}
  </div>
</div>


                {/* Job Type */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      JOB TYPE<span className="text-red-500">*</span>
                    </label>
                    <p className="text-sm text-gray-500">Choose job type</p>
                  </div>
                  <div className="lg:col-span-2">
                    <select
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none ${
                        errors.jobType ? "border-red-500" : "border-gray-300"
                      }`}
                      required
                    >
                      <option value="">Choose job type</option>
                      <option value="full-time">Full time</option>
                      <option value="part-time">Part time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                    </select>
                    {errors.jobType && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.jobType}
                      </p>
                    )}
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
                      placeholder="e.g., JavaScript, React, Node.js, Python"
                    />
                  </div>
                </div>

                {/* Experience */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      EXPERIENCE
                    </label>
                    <p className="text-sm text-gray-500">
                      Choose required experience
                    </p>
                  </div>
                  <div className="lg:col-span-2">
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
                    >
                      <option value="">Choose experience</option>
                      <option value="0-1 Year">0-1 Year</option>
                      <option value="1-3 Years">1-3 Years</option>
                      <option value="3-5 Years">3-5 Years</option>
                      <option value="5+ Years">5+ Years</option>
                    </select>
                  </div>
                </div>

                {/* File Attachment */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      FILE ATTACHMENT<span className="text-red-500">*</span>
                    </label>
                    <p className="text-sm text-gray-500">
                      Upload related documents.
                    </p>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="space-y-4">
                      <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-[var(--color-secondary)] rounded-lg cursor-pointer bg-secondary-10 hover:bg-secondary-10 transition-colors">
                        <div className="flex flex-col items-center">
                          <LuUpload
                            className="text-[var(--color-secondary)] mb-2"
                            size={24}
                          />
                          <span className="text-[var(--color-secondary)] font-medium">
                            ↑ Upload Files
                          </span>
                        </div>
                        <input
                          type="file"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>

                      {/* Display uploaded files */}
                     {formData.uploadedFiles?.length > 0 && (
                        <div className="space-y-2">
                          {formData.uploadedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-gray-50 p-2 rounded"
                            >
                              <span className="text-sm text-gray-700">
                                {file.name}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Address / Location Form */}
            {/* Address / Location Form */}
            <div className="bg-white rounded-xl border border-[var(--color-primary)3C] p-5">
              <h2 className="text-xl font-bold text-gray-900 mb-8">
                Address / Location
              </h2>

              <div className="space-y-8">
                {/* State */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      STATE<span className="text-red-500">*</span>
                    </label>
                    <p className="text-sm text-gray-500">Choose job state</p>
                  </div>
                  <div className="lg:col-span-2">
                    <select
                      name="state"
                      value={formData.state || ""}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none ${
                        errors.state ? "border-red-500" : "border-gray-300"
                      }`}
                      required
                    >
                      <option value="">Select state</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Gujarat">Gujarat</option>
                    </select>
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.state}
                      </p>
                    )}
                  </div>
                </div>

                {/* City */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      CITY<span className="text-red-500">*</span>
                    </label>
                    <p className="text-sm text-gray-500">Select job city</p>
                  </div>
                  <div className="lg:col-span-2">
                    <select
                      name="city"
                      value={formData.city || ""}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      }`}
                      required
                    >
                      <option value="">Select city</option>
                      {formData.state === "Madhya Pradesh" && (
                        <>
                          <option value="Indore">Indore</option>
                          <option value="Bhopal">Bhopal</option>
                          <option value="Jabalpur">Jabalpur</option>
                        </>
                      )}
                      {formData.state === "Maharashtra" && (
                        <>
                          <option value="Mumbai">Mumbai</option>
                          <option value="Pune">Pune</option>
                          <option value="Nagpur">Nagpur</option>
                        </>
                      )}
                      {formData.state === "Delhi" && (
                        <option value="New Delhi">New Delhi</option>
                      )}
                      {formData.state === "Karnataka" && (
                        <>
                          <option value="Bengaluru">Bengaluru</option>
                          <option value="Mysuru">Mysuru</option>
                        </>
                      )}
                      {formData.state === "Gujarat" && (
                        <>
                          <option value="Ahmedabad">Ahmedabad</option>
                          <option value="Surat">Surat</option>
                        </>
                      )}
                    </select>
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>
                </div>

                {/* Full Address */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      FULL ADDRESS<span className="text-red-500">*</span>
                    </label>
                    <p className="text-sm text-gray-500">
                      Enter complete location
                    </p>
                  </div>
                  <div className="lg:col-span-2">
                    <textarea
                      name="fullAddress"
                      value={formData.fullAddress || ""}
                      onChange={handleInputChange}
                      rows={2}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none resize-none ${
                        errors.fullAddress
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter house / street / area / landmark"
                      required
                    />
                    {errors.fullAddress && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.fullAddress}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information and Dates and Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Information Form */}
              <div className="bg-white rounded-xl border border-[var(--color-primary)3C] p-5">
                <h2 className="text-xl font-bold text-gray-900 mb-8">
                  Contact information
                </h2>

                <div className="space-y-8">
                  {/* Person */}
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        PERSON
                      </label>
                      <p className="text-sm text-gray-500">
                        Enter contact person's name
                      </p>
                    </div>
                    <div>
                      <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
                        placeholder="Enter contact person's full name"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        PHONE
                      </label>
                      <p className="text-sm text-gray-500">
                        Add contact number
                      </p>
                    </div>
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
                        placeholder="Enter 10-digit mobile number"
                      />
                    </div>
                  </div>

                  {/* Additional Contact */}
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        ADDITIONAL CONTACT
                      </label>
                      <p className="text-sm text-gray-500">
                        Add alternate contact
                      </p>
                    </div>
                    <div>
                      <input
                        type="email"
                        name="additionalContact"
                        value={formData.additionalContact}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Dates and Status Form */}
              <div className="bg-white rounded-xl border border-[var(--color-primary)3C] p-5">
                <h2 className="text-xl font-bold text-gray-900 mb-8">
                  Dates and Status
                </h2>

                <div className="space-y-8">
                  {/* Vacancy Status */}
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        VACANCY STATUS<span className="text-red-500">*</span>
                      </label>
                      <p className="text-sm text-gray-500">
                        Select hiring status
                      </p>
                    </div>
                    <div>
                      <select
                        name="vacancyStatus"
                        value={formData.vacancyStatus}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none ${
                          errors.vacancyStatus
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        required
                      >
                        <option value="">Select hiring status</option>
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                        <option value="Draft">Draft</option>
                      </select>
                      {errors.vacancyStatus && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.vacancyStatus}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Opening Date */}
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        OPENING<span className="text-red-500">*</span>
                      </label>
                      <p className="text-sm text-gray-500">
                        Choose job post start
                      </p>
                    </div>
                    <div>
                      <div className="relative">
                        <input
                          type="date"
                          name="openingDate"
                          value={formData.openingDate}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none pr-10 ${
                            errors.openingDate
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          required
                        />
                        <LuCalendar
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                          size={20}
                        />
                      </div>
                      {errors.openingDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.openingDate}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Closing Date */}
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        CLOSING<span className="text-red-500">*</span>
                      </label>
                      <p className="text-sm text-gray-500">
                        Choose job post end
                      </p>
                    </div>
                    <div>
                      <div className="relative">
                        <input
                          type="date"
                          name="closingDate"
                          value={formData.closingDate}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none pr-10 ${
                            errors.closingDate
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          required
                        />
                        <LuCalendar
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                          size={20}
                        />
                      </div>
                      {errors.closingDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.closingDate}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[var(--color-secondary)] text-white rounded-lg hover:bg-secondary-dark transition-colors font-medium"
              >
                Update Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCard;

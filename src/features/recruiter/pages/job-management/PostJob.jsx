import React, { useState, useEffect } from "react";
import { LuUpload, LuCalendar } from "react-icons/lu";
import RichTextEditor from "@shared/components/RichTextEditor";
import { postMethod, getMethod } from "../../../../service/api";
import service from "../../services/serviceUrl";
import { toast } from "react-toastify"; // optional toast

const PostJob = ({ onJobSubmit }) => {
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
    location: "",
    contactPerson: "",
    phone: "",
    additionalContact: "",
    vacancyStatus: "",
    no_of_vacancies: "",
    closingDate: "",
  });

  const [errors, setErrors] = useState({});
  const [showWarning, setShowWarning] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [jobCategories, setJobCategories] = useState([]);

  // ✅ Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // ✅ Phone: only digits (max 10)
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 10) {
        setFormData((prev) => ({ ...prev, [name]: numericValue }));
      }
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Fetch job categories
  useEffect(() => {
    const fetchJobCategories = async () => {
      try {
        const res = await getMethod({ apiUrl: service.getJobCategory });
        if (res?.status && Array.isArray(res.categories)) {
          setJobCategories(res.categories);
        } else {
          console.error("Failed to load job categories:", res);
        }
      } catch (err) {
        console.error("❌ Error fetching job categories:", err);
      }
    };
    fetchJobCategories();
  }, []);

  const handleRichTextChange = (value) => {
    setFormData((prev) => ({ ...prev, jobDescription: value }));
  };

  // ✅ Validation function (fixed)
  const validateForm = () => {
    const newErrors = {};

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
    if (!formData.vacancyStatus)
      newErrors.vacancyStatus = "Vacancy status is required";
    if (!formData.closingDate)
      newErrors.closingDate = "Closing date is required";

    if (formData.phone && formData.phone.length !== 10)
      newErrors.phone = "Phone number must be exactly 10 digits";

    // ✅ Salary validation (inside function)
    if (formData.minSalary && formData.maxSalary) {
      const minSalary = parseFloat(formData.minSalary);
      const maxSalary = parseFloat(formData.maxSalary);
      if (minSalary >= maxSalary)
        newErrors.maxSalary =
          "Maximum salary must be greater than minimum salary";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 5000);
      return;
    }

    const payload = {
      title: formData.jobTitle,
      description: formData.jobDescription.replace(/<[^>]+>/g, "").trim(),
      category_name: formData.jobSector,
      location: formData.location,
      skills_required: formData.requiredSkills,
      salary_min: parseInt(formData.minSalary),
      salary_max: parseInt(formData.maxSalary),
      job_type: formData.jobType,
      experience_required: formData.experience,
      application_deadline: formData.closingDate,
      person_name: formData.contactPerson,
      phone: formData.phone,
      additional_contact: formData.additionalContact,
      is_remote: 0,
      no_of_vacancies: parseInt(formData.no_of_vacancies || 1),
      vacancyStatus: formData.vacancyStatus.toLowerCase(),
    };

    try {
      const response = await postMethod({
        apiUrl: service.createJob,
        payload,
      });
      console.log("📦 service.createJob =>", service.createJob);

      if (response.status === true || response.success === true) {
        toast.success("🎉 Job created successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });

        if (onJobSubmit) onJobSubmit(response.data || formData);

        // ✅ Reset form
        setFormData({
          jobTitle: "",
          jobSector: "",
          jobDescription: "",
          salaryType: "",
          minSalary: "",
          maxSalary: "",
          jobType: "",
          requiredSkills: "",
          experience: "",
          location: "",
          contactPerson: "",
          phone: "",
          additionalContact: "",
          vacancyStatus: "",
          no_of_vacancies: "",
          closingDate: "",
        });
        setErrors({});
      } else {
        console.error("API Error:", response);
      }
    } catch (err) {
      console.error("❌ Network error:", err);
    }
  };

  const handleCancel = () => console.log("Form cancelled");

  // ✅ Add category modal logic (fixed)
  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    if (!jobCategories.find((cat) => cat.category_name === newCategory.trim())) {
      setJobCategories((prev) => [
        ...prev,
        { id: Date.now(), category_name: newCategory.trim() },
      ]);
      setFormData((prev) => ({ ...prev, jobSector: newCategory.trim() }));
    }
    setShowAddCategoryModal(false);
    setNewCategory("");
  };

  const handleCancelAddCategory = () => setShowAddCategoryModal(false);
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] p-2">
      {showWarning && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
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

      {/* HEADER */}
      

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-8">

        <div className="flex flex-col gap-5 sm:flex-row sm:justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-[var(--color-primary)]">
          Create Job Posts
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={handleCancel}
            className="px-5 py-2 bg-secondary-10 text-[var(--color-secondary)] rounded-full font-bold hover:bg-[var(--color-secondary)] hover:text-white border-2 border-[var(--color-secondary)] transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-[var(--color-secondary)] text-white rounded-full font-bold border-2 border-[var(--color-secondary)] hover:bg-[var(--color-secondary)] transition"
          >
            Save
          </button>
        </div>
      </div>
        {/* BASIC INFO SECTION */}
        <div className="bg-white rounded-xl border border-[var(--color-primary)3C] p-5">
          <h2 className="text-xl font-bold text-gray-900 mb-8">
            Basic Information
          </h2>

          <div className="space-y-8">
            {/* JOB TITLE */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  JOB TITLE <span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-500">Add position name</p>
              </div>
              <div className="lg:col-span-2">
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent uppercase outline-none ${
                    errors.jobTitle ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter job title"
                  required
                />
              </div>
            </div>

            {/* ✅ JOB SECTOR + Add Category */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  JOB SECTOR <span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-500">Choose category</p>
              </div>
              <div className="lg:col-span-2 flex items-center gap-3">
                <select
                  name="jobSector"
                  value={formData.jobSector}
                  onChange={handleInputChange}
                  className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 ${
                    errors.jobSector ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                >
                  <option value="">Choose Category</option>
                  {jobCategories.map((cat) => (
                    <option key={cat.id} value={cat.category_name}>
                      {cat.category_name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setShowAddCategoryModal(true)}
                  className="px-4 py-2 bg-[var(--color-secondary)] text-white rounded-lg text-sm font-semibold hover:opacity-90"
                >
                  + Add
                </button>
              </div>
            </div>

            {/* ✅ Add Category Modal */}
            {showAddCategoryModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Add New Category
                  </h3>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter new category name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-[var(--color-secondary)]"
                  />
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={handleCancelAddCategory}
                      type="button"
                      className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddCategory}
                      type="button"
                      className="px-4 py-2 bg-[var(--color-secondary)] text-white rounded-lg"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* JOB DESCRIPTION */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  JOB DESCRIPTION <span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-500">
                  For effective candidate selection, enhance job description
                </p>
              </div>
              <div className="lg:col-span-2">
                <RichTextEditor
                  value={formData.jobDescription}
                  onChange={handleRichTextChange}
                  placeholder="Describe the job responsibilities, requirements, and benefits..."
                  height="200px"
                />
              </div>
            </div>

            {/* ✅ SALARY SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  MONTHLY SALARY <span className="text-red-500">*</span>
                </label>
               
              </div>
              <div className="lg:col-span-2 flex gap-4">

                <input
                  type="text"
                  name="minSalary"
                  value={formData.minSalary}
                  onChange={handleInputChange}
                  className="w-28 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
                  placeholder="Min"
                  required
                />
                <input
                  type="text"
                  name="maxSalary"
                  value={formData.maxSalary}
                  onChange={handleInputChange}
                  className="w-28 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
                  placeholder="Max"
                  required
                />
              </div>
            </div>

            {/* ✅ JOB TYPE */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  JOB TYPE <span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-500">Choose job type</p>
              </div>
              <div className="lg:col-span-2">
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
                  required
                >
                  <option value="">Select type</option>
                  <option value="full_time">Full-time</option>
                  <option value="part_time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
            </div>

            {/* ✅ REQUIRED SKILLS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
                  placeholder="e.g., React, Node.js, Python"
                />
              </div>
            </div>

            {/* ✅ EXPERIENCE */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  EXPERIENCE
                </label>
                <p className="text-sm text-gray-500">Choose required experience</p>
              </div>
              <div className="lg:col-span-2">
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
                  placeholder="e.g., 1-3 years, 5+ years"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ✅ ADDRESS / LOCATION SECTION */}
        <div className="bg-white rounded-xl border border-[var(--color-primary)3C] p-5">
          <h2 className="text-xl font-bold text-gray-900 mb-8">
            Address / Location
          </h2>

          <div className="space-y-8">
            {/* FULL ADDRESS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  FULL ADDRESS<span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-500">Enter full location</p>
              </div>
              <div className="lg:col-span-2">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
                  placeholder="Enter complete address with street, area, landmark"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* ✅ CONTACT INFO + DATES SECTION */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* CONTACT INFO */}
          <div className="bg-white rounded-xl border border-[var(--color-primary)3C] p-5 w-full lg:w-[50%]">
            <h2 className="text-xl font-bold text-gray-900 mb-8">
              Contact Information
            </h2>

            <div className="space-y-8">
              {/* CONTACT PERSON */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    PERSON
                  </label>
                </div>
                <div className="lg:col-span-2">
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
                    placeholder="Contact person's name"
                  />
                </div>
              </div>

              {/* PHONE */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    PHONE
                  </label>
                </div>
                <div className="lg:col-span-2">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* ADDITIONAL CONTACT */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    ADDITIONAL CONTACT
                  </label>
                </div>
                <div className="lg:col-span-2">
                  <input
                    type="email"
                    name="additionalContact"
                    value={formData.additionalContact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
                    placeholder="Alternate email or contact"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* DATES & STATUS */}
          <div className="bg-white rounded-xl border border-[var(--color-primary)3C] p-5 w-full lg:w-[50%]">
            <h2 className="text-xl font-bold text-gray-900 mb-8">
              Dates and Status
            </h2>

            <div className="space-y-8">
              {/* VACANCY STATUS */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    VACANCY STATUS<span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="lg:col-span-2">
                  <select
                    name="vacancyStatus"
                    value={formData.vacancyStatus}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
                    required
                  >
                    <option value="">Select status</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              {/* NO OF VACANCIES */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    NUMBER OF VACANCIES<span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="lg:col-span-2">
                  <input
                    type="number"
                    name="no_of_vacancies"
                    value={formData.no_of_vacancies || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
                    placeholder="e.g., 2"
                    required
                  />
                </div>
              </div>


              {/* Closing Date */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    CLOSING DATE<span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="lg:col-span-2">
                  <input
                    type="date"
                    name="closingDate"
                    value={formData.closingDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostJob;

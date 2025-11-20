import React, { useState, useEffect } from "react";
import { LuCalendar, LuX } from "react-icons/lu";
import { getMethod, putMethod } from "../../../../service/api";
import service from "../../services/serviceUrl";
import Swal from "sweetalert2";
import RichTextEditor from "@shared/components/RichTextEditor";
import { TAILWIND_COLORS } from "../../../../shared/WebConstant";
import { Button, IconButton } from "../../../../shared/components/Button";

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
  const [jobCategories, setJobCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getMethod({ apiUrl: service.getJobCategory });
        if (res?.status && Array.isArray(res.categories)) {
          setJobCategories(res.categories);
        }
      } catch (err) {
        console.error("Error fetching job categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // ✅ Fetch Job Details
  useEffect(() => {
    if (!isOpen || !job?.id) return;

    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const res = await getMethod({
          apiUrl: `${service.getJobDetail}?id=${job.id}`,
        });

        if (res?.status && res?.data?.job_info) {
          const d = res.data.job_info;
          setFormData({
            jobTitle: d.title || "",
            jobSector: d.category_id?.toString() || "",
            jobSectorName: d.category_name || "",

            jobDescription: d.description || "",
            salaryType: d.salary_type
              ? d.salary_type.charAt(0).toUpperCase() +
                d.salary_type.slice(1).toLowerCase()
              : "",
            minSalary: d.salary_min || "",
            maxSalary: d.salary_max || "",
            jobType: d.job_type?.toLowerCase().replace(" ", "_") || "",
            requiredSkills: Array.isArray(d.skills_required)
              ? d.skills_required.join(", ")
              : d.skills_required || "",
            experience: d.experience_required || "",
            location: d.location || "",
            contactPerson: d.person_name || "",
            phone: d.phone || "",
            additionalContact: d.additional_contact || "",
            vacancyStatus: d.status || "",
            no_of_vacancies: d.no_of_vacancies || "",
            closingDate: d.application_deadline?.split(" ")[0] || "",
          });
        }
      } catch (err) {
        console.error("Error fetching job:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [isOpen, job]);

  // ✅ Input change handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRichTextChange = (value) => {
    setFormData((prev) => ({ ...prev, jobDescription: value }));
  };

  // ✅ Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required";
    if (!formData.jobSector) newErrors.jobSector = "Job sector is required";
    if (
      !formData.jobDescription ||
      formData.jobDescription.replace(/<[^>]+>/g, "").trim() === ""
    )
      newErrors.jobDescription = "Job description is required";

    if (!formData.minSalary) newErrors.minSalary = "Min salary required";
    if (!formData.maxSalary) newErrors.maxSalary = "Max salary required";
    if (!formData.jobType) newErrors.jobType = "Job type is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.vacancyStatus)
      newErrors.vacancyStatus = "Vacancy status is required";
    if (!formData.no_of_vacancies)
      newErrors.no_of_vacancies = "No. of vacancies required";
    if (!formData.closingDate)
      newErrors.closingDate = "Closing date is required";
    console.log(newErrors);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validateForm()) {
  //     setShowWarning(true);
  //     setTimeout(() => setShowWarning(false), 3000);
  //     return;
  //   }

  //   const payload = {
  //     title: formData.jobTitle,
  //     category_name: formData.jobSector,
  //     description: formData.jobDescription,
  //     salary_type: formData.salaryType,
  //     salary_min: formData.minSalary,
  //     salary_max: formData.maxSalary,
  //     job_type: formData.jobType,
  //     skills_required: formData.requiredSkills,
  //     experience_required: formData.experience,
  //     location: formData.location,
  //     person_name: formData.contactPerson,
  //     phone: formData.phone,
  //     additional_contact: formData.additionalContact,
  //     status: formData.vacancyStatus,
  //     no_of_vacancies: formData.no_of_vacancies,
  //     application_deadline: formData.closingDate,
  //   };

  //   try {
  //     const res = await putMethod({
  //       apiUrl: `${service.updateJob}?id=${job.id}`,
  //       payload,
  //     });
  //     console.log(res);

  //     if (res?.status) {
  //       toast.success("🎉 Job updated successfully!", {
  //         position: "top-right",
  //         autoClose: 2000,
  //         hideProgressBar: true,
  //       });
  //       if (onSave) onSave();
  //       onClose();
  //     } else {
  //       toast.error("❌ Failed to update job!");
  //     }
  //   } catch (err) {
  //     console.error("Update error:", err);
  //     toast.error("⚠️ Network or API error!");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🟢 [EditCard] ➜ Update Job button clicked");

    if (!validateForm()) {
      console.warn("⚠️ Validation failed:", formData);
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
      return;
    }

    const payload = {
      title: formData.jobTitle,
      category_id: formData.jobSector,
      category_name: formData.jobSectorName,
      description: formData.jobDescription.replace(/<[^>]+>/g, "").trim(),
      salary_type: formData.salaryType,
      salary_min: formData.minSalary,
      salary_max: formData.maxSalary,
      job_type: formData.jobType,
      skills_required: formData.requiredSkills,
      experience_required: formData.experience,
      location: formData.location,
      person_name: formData.contactPerson,
      phone: formData.phone,
      additional_contact: formData.additionalContact,
      status: formData.vacancyStatus,
      no_of_vacancies: formData.no_of_vacancies,
      application_deadline: formData.closingDate,
    };

    console.log("📦 [EditCard] ➜ Payload ready:", payload);

    try {
      const res = await putMethod({
        apiUrl: `${service.updateJob}?id=${job.id}`,
        payload,
      });
      console.log("✅ [EditCard] ➜ API Response:", res);

      if (res?.status) {
        Swal.fire({
          title: "Success!",
          text: "Job updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          if (onSave) onSave();
          onClose();
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: res?.message || "Failed to update job. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#d33",
        });
      }
    } catch (err) {
      console.error("🚨 [EditCard] ➜ Network or API error:", err);
      Swal.fire({
        title: "Error!",
        text: "Network or API error occurred. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#d33",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative z-[9999] bg-white rounded-xl max-w-6xl w-full max-h-[95vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className={`text-2xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
            Edit Job Post
          </h2>
          <IconButton
            label="Close"
            onClick={onClose}
            variant="light"
            className="hover:bg-gray-100"
          >
            <LuX size={20} />
          </IconButton>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-8"
        >
          {showWarning && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              ⚠️ Please fill in all required fields!
            </div>
          )}

          {/* BASIC INFO */}
          <div className="bg-white rounded-xl border p-5">
            <h2 className={`text-xl font-bold mb-8 ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Basic Information</h2>

            {/* Job Title */}
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 mb-6 border rounded-lg ${TAILWIND_COLORS.TEXT_PRIMARY}`}
              placeholder="Enter job title"
            />

            {/* Job Sector */}
            <select
              name="jobSector"
              value={formData.jobSectorName} // ✅ use the category name instead of ID
              onChange={(e) => {
                const selectedName = e.target.value; // selected category name
                const selectedCategory = jobCategories.find(
                  (cat) => cat.category_name === selectedName
                );
                setFormData((prev) => ({
                  ...prev,
                  jobSector: selectedCategory?.id || "", // keep id internally
                  jobSectorName: selectedName, // store name for payload
                }));
              }}
              className={`w-full px-4 py-3 mb-6 border rounded-lg ${TAILWIND_COLORS.TEXT_PRIMARY}`}
            >
              <option value="">Choose Category</option>
              {jobCategories.map((cat) => (
                <option key={cat.id} value={cat.category_name}>
                  {cat.category_name}
                </option>
              ))}
            </select>

            {/* Job Description */}
            <RichTextEditor
              value={formData.jobDescription}
              onChange={handleRichTextChange}
              placeholder="Describe the job responsibilities..."
              height="180px"
            />

            {/* Salary Section */}
            <div className="flex gap-4 mt-6">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                  MONTHLY SALARY <span className="text-red-500">*</span>
                </label>
              </div>
              <input
                type="number"
                name="minSalary"
                value={formData.minSalary}
                onChange={handleInputChange}
                placeholder="Min Salary"
                className={`w-1/3 border px-4 py-3 rounded-lg ${TAILWIND_COLORS.TEXT_PRIMARY}`}
              />
              <input
                type="number"
                name="maxSalary"
                value={formData.maxSalary}
                onChange={handleInputChange}
                placeholder="Max Salary"
                className={`w-1/3 border px-4 py-3 rounded-lg ${TAILWIND_COLORS.TEXT_PRIMARY}`}
              />
            </div>

            {/* Job Type */}
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleInputChange}
              className={`w-full mt-6 px-4 py-3 border rounded-lg ${TAILWIND_COLORS.TEXT_PRIMARY}`}
            >
              <option value="">Choose job type</option>
              <option value="full_time">Full-time</option>
              <option value="part_time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>

            {/* Skills */}
            <input
              type="text"
              name="requiredSkills"
              value={formData.requiredSkills}
              onChange={handleInputChange}
              placeholder="e.g. JavaScript, React, Node.js"
              className={`w-full mt-6 px-4 py-3 border rounded-lg ${TAILWIND_COLORS.TEXT_PRIMARY}`}
            />

            {/* Experience */}
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              placeholder="e.g. 2-5 years"
              className={`w-full mt-6 px-4 py-3 border rounded-lg ${TAILWIND_COLORS.TEXT_PRIMARY}`}
            />
          </div>

          {/* LOCATION */}
          <div className="bg-white rounded-xl border p-5">
            <h2 className={`text-xl font-bold mb-8 ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Address / Location</h2>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg ${TAILWIND_COLORS.TEXT_PRIMARY}`}
              placeholder="Enter complete address"
            />
          </div>

          {/* CONTACT INFO */}
          <div className="bg-white rounded-xl border p-5">
            <h2 className={`text-xl font-bold mb-8 ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Contact Information</h2>
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg mb-4 ${TAILWIND_COLORS.TEXT_PRIMARY}`}
              placeholder="Contact Person"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg mb-4 ${TAILWIND_COLORS.TEXT_PRIMARY}`}
              placeholder="Phone Number"
            />
            <input
              type="email"
              name="additionalContact"
              value={formData.additionalContact}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg ${TAILWIND_COLORS.TEXT_PRIMARY}`}
              placeholder="Additional Contact Email"
            />
          </div>

          {/* DATES + STATUS */}
          <div className="bg-white rounded-xl border p-5">
            <h2 className={`text-xl font-bold mb-8 ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Dates & Status</h2>

            <input
              type="number"
              name="no_of_vacancies"
              value={formData.no_of_vacancies}
              onChange={handleInputChange}
              placeholder="Number of vacancies"
              className={`w-full px-4 py-3 mb-6 border rounded-lg ${TAILWIND_COLORS.TEXT_PRIMARY}`}
            />

            <div className="grid grid-cols-2 gap-4 mb-6">
              <input
                type="date"
                name="closingDate"
                value={formData.closingDate}
                onChange={handleInputChange}
                className={`border px-4 py-3 rounded-lg ${TAILWIND_COLORS.TEXT_PRIMARY}`}
              />
              <select
                name="vacancyStatus"
                value={formData.vacancyStatus}
                onChange={handleInputChange}
                className={`border px-4 py-3 rounded-lg ${TAILWIND_COLORS.TEXT_PRIMARY}`}
              >
                <option value="">Vacancy Status</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-4 border-t pt-6">
            <Button
              type="button"
              onClick={onClose}
              variant="neutral"
              size="md"
              className="px-6 py-2"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              variant="primary"
              size="md"
              className="px-6 py-2"
              loading={loading}
              disabled={loading}
            >
              Update Job
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCard;

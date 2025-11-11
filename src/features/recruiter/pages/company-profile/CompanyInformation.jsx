import React, { useState, useRef, useEffect } from "react";
import {
  LuBuilding2,
  LuUpload,
  LuX,
  LuChevronDown,
  LuSearch,
} from "react-icons/lu";
import { FiAlertCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import { TAILWIND_COLORS } from "@shared/WebConstant";
import { Button, SaveButton } from "@shared/components/Button";
import {
  getMethod,
  postMultipart,
  putMethod,
} from "../../../../service/api";
import apiService from "../../services/serviceUrl";

const CompanyInfo = () => {
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const [companyData, setCompanyData] = useState({
    name: "",
    website: "",
    industry: "",
    email: "",
    phone_number: "",
    location: "",
  });

  const tradeOptions = [
    { value: "Civil", label: "Civil" },
    { value: "IT", label: "IT" },
    { value: "Mechanical", label: "Mechanical" },
  ];

  // =====================
  // 📌 Fetch Recruiter Profile
  // =====================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getMethod({
          apiUrl: apiService.getRecruiterProfile,
        });

        if (response?.success && response?.data?.profiles?.length > 0) {
          const profile = response.data.profiles[0];
          const personal = profile.personal_info || {};
          const professional = profile.professional_info || {};
          const docs = profile.documents || {};

          setCompanyData({
            name: professional.company_name || "",
            website: professional.website || "",
            industry: professional.industry || "",
            email: personal.email || "",
            phone_number: personal.phone_number || "",
            location: personal.location || "",
          });

          if (docs.company_logo) setLogoPreview(docs.company_logo);
        }
      } catch (error) {
        console.error("❌ Error fetching recruiter profile:", error);
      }
    };

    fetchProfile();
  }, []);

  // =====================
  // 📌 File Upload Handlers
  // =====================
  const handleFileSelect = (file) => {
    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg+xml",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      setUploadError("Please select a valid image (JPEG, PNG, SVG, WebP)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File must be less than 5MB");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setLogoFile(file);
    setLogoPreview(previewUrl);
    setUploadError(null);
    setIsUploading(true);
    setTimeout(() => setIsUploading(false), 1000);
  };

  const handleClick = () => fileInputRef.current?.click();

  const handleLogoRemove = () => {
    setLogoFile(null);
    setLogoPreview(null);
    if (logoPreview) URL.revokeObjectURL(logoPreview);
  };

  const handleChange = (field, value) => {
    setCompanyData((prev) => ({ ...prev, [field]: value }));
  };

  // =====================
  // 📌 Save / Update Company Info
  // =====================
  const handleSaveChanges = async () => {
    try {
      const payload = {
        company_name: companyData.name,
        industry: companyData.industry,
        website: companyData.website,
        email: companyData.email,
        phone_number: companyData.phone_number,
        location: companyData.location,
      };

      let res;
      if (logoFile) {
        const formData = new FormData();
        Object.entries(payload).forEach(([key, val]) =>
          formData.append(key, val)
        );
        formData.append("company_logo", logoFile);

        res = await postMultipart({
          apiUrl: apiService.updateRecruiterProfile,
          data: formData,
        });
      } else {
        res = await putMethod({
          apiUrl: apiService.updateRecruiterProfile,
          payload,
        });
      }

      if (res?.success || res?.data?.success) {
        toast.success("✅ Profile updated successfully!");
      } else {
        toast.error(res?.message || "❌ Update failed!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  // =====================
  // 📌 Responsive UI Layout (Logo on top, two-column form)
  // =====================
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="bg-white shadow-sm rounded-2xl p-6 md:p-10">
        {/* Logo Section */}
        <div className="text-center mb-10">
          <div
            className="w-full max-w-md mx-auto h-48 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
            onClick={handleClick}
          >
            {logoPreview ? (
              <div className="relative">
                <img
                  src={logoPreview}
                  alt="Company Logo"
                  className="max-h-32 object-contain mx-auto rounded-md"
                />
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLogoRemove();
                  }}
                  variant="unstyled"
                  size="sm"
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow hover:bg-gray-100 text-gray-600"
                  icon={<LuX size={16} />}
                />
              </div>
            ) : (
              <>
                <LuUpload
                  size={28}
                  className="text-gray-400 mb-2"
                />
                <p className="text-sm text-gray-600 font-medium">
                  Upload Company Logo
                </p>
                <p className="text-xs text-gray-400">(Max 5MB)</p>
              </>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files[0])}
            className="hidden"
          />

          {uploadError && (
            <div className="mt-3 flex justify-center items-center gap-2 text-sm text-red-600">
              <FiAlertCircle size={16} /> {uploadError}
            </div>
          )}
        </div>

        {/* Form Title */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <LuBuilding2 className="text-blue-600" size={20} />
          <h2 className="text-xl font-semibold text-gray-800">
            Company Information
          </h2>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Company Name</label>
              <input
                type="text"
                value={companyData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter company name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Trade</label>
              <div className="relative">
                <select
                  value={companyData.industry}
                  onChange={(e) => handleChange("industry", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                >
                  <option value="">Select Trade</option>
                  {tradeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <LuChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  size={16}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                type="text"
                value={companyData.phone_number}
                onChange={(e) => handleChange("phone_number", e.target.value)}
                placeholder="Enter contact number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Website</label>
              <input
                type="url"
                value={companyData.website}
                onChange={(e) => handleChange("website", e.target.value)}
                placeholder="https://example.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={companyData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                value={companyData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="Enter company location"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-10 flex justify-end">
          <SaveButton onClick={handleSaveChanges}>Save Changes</SaveButton>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;

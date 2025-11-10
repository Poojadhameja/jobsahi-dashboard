import React, { useState, useRef, useEffect } from "react";
import {
  LuBuilding2,
  LuUpload,
  LuX,
  LuSearch,
  LuChevronDown,
} from "react-icons/lu";
import { FiAlertCircle } from "react-icons/fi";
import RichTextEditor from "@shared/components/RichTextEditor";
import { TAILWIND_COLORS } from "@shared/WebConstant";
import { Button, SaveButton } from "@shared/components/Button";
import DynamicButton from "@shared/components/DynamicButton";
import { getMethod, postMultipart, putMethod } from "../../../../service/api";
import apiService from "../../services/serviceUrl";

const CompanyInfo = () => {
  // const [companyData, setCompanyData] = useState({
  //   name: "Brightorial Tech pvt ltd",
  //   website: "pr.brightorial.com",
  //   trade: "Civil",
  //   description: "<p>Company's description goes here...</p>",
  // });

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg+xml",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      setUploadError(
        "Please select a valid image file (JPEG, PNG, SVG, or Web)"
      );
      return;
    }

    // Validate file size (5MB = 5 * 1024 * 1024 bytes)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadError("File size must be less than 5MB");
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setLogoFile(file);
    setLogoPreview(previewUrl);
    setUploadError(null);
    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
    }, 1500);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleLogoRemove = () => {
    setLogoFile(null);
    setLogoPreview(null);
    setUploadError(null);

    if (logoPreview) {
      URL.revokeObjectURL(logoPreview);
    }
  };

  const handleChange = (field, value) => {
    setCompanyData((prev) => ({ ...prev, [field]: value }));
  };

  const tradeOptions = [
    { value: "Civil", label: "Civil" },
    { value: "IT", label: "IT" },
    { value: "Mechanical", label: "Mechanical" },
  ];

  const [companyData, setCompanyData] = useState({
    name: "",
    website: "",
    trade: "",
    description: "<p>Company's description goes here...</p>",
    email: "",
    phone_number: "",
    location: "",
  });

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
            trade: professional.industry || "",
            description:
              professional.description || "<p>No description added</p>",
            email: personal.email || "",
            phone_number: personal.phone_number || "",
            location: personal.location || "",
          });

          if (docs.company_logo) {
            setLogoPreview(docs.company_logo);
          }
        } else {
          console.warn("⚠️ Recruiter profile not found or invalid response");
        }
      } catch (error) {
        console.error("❌ Error fetching recruiter profile:", error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMethod({
          apiUrl: apiService.get_recruiter_profile,
        });
        if (res?.data?.success && res.data.data.profiles.length > 0) {
          const profile = res.data.data.profiles[0];
          const personal = profile.personal_info || {};
          const professional = profile.professional_info || {};
          const docs = profile.documents || {};

          setCompanyData({
            name: professional.company_name || "",
            website: professional.website || "",
            trade: professional.industry || "",
            email: personal.email || "",
            phone_number: personal.phone_number || "",
            location: personal.location || "",
            description: professional.description || "",
          });

          setLogoPreview(docs.company_logo || null);
        }
      } catch (err) {
        console.error("❌ Error loading profile:", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column - Company Logo */}
      <div className={`${TAILWIND_COLORS.CARD} p-6`}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <LuUpload className={TAILWIND_COLORS.TEXT_ACCENT} size={20} />
          <h3 className={`font-semibold text-lg ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
            Company Logo
          </h3>
        </div>
        
        <p className={`text-sm mb-6 ${TAILWIND_COLORS.TEXT_MUTED}`}>
          Upload your company logo (Max 5MB)
        </p>

          {/* Logo Upload Area */}
          <div
            className={`w-full h-44 md:h-48 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
              uploadError
                ? "border-red-300 bg-red-50"
                : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            }`}
            onClick={handleClick}
          >
            {logoPreview ? (
              <div className="relative flex flex-col items-center justify-center">
                <img
                  src={logoPreview}
                  alt="Company Logo"
                  className="max-h-28 object-contain rounded-lg"
                  onError={(e) => {
                    e.target.src = "/assets/default-logo.png";
                  }}
                />
                {logoFile && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLogoRemove();
                    }}
                    variant="unstyled"
                    size="sm"
                    className={`absolute top-3 right-3 p-1.5 rounded-full bg-white shadow-md hover:bg-gray-100 ${TAILWIND_COLORS.TEXT_MUTED}`}
                    title="Remove logo"
                    icon={<LuX size={16} />}
                  />
                )}
              </div>
            ) : (
              <div className="text-center">
                <div 
                  className={`w-20 h-20 mx-auto mb-4 rounded-lg flex items-center justify-center shadow-sm bg-bg-muted border-2 border-gray-200 ${TAILWIND_COLORS.TEXT_ACCENT}`}
                >
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <span className={`text-xs font-bold ${TAILWIND_COLORS.TEXT_BRAND_BLUE}`}>JOB</span>
                      <LuSearch className={`ml-1 ${TAILWIND_COLORS.TEXT_BRAND_BLUE}`} size={12} />
                    </div>
                    <div className={`text-xs font-bold ${TAILWIND_COLORS.TEXT_BRAND_GREEN}`}>SAHi</div>
                  </div>
                </div>
                <p
                  className={`text-sm font-medium mb-1 ${TAILWIND_COLORS.TEXT_MUTED}`}
                >
                  Click to upload or drag & drop
                </p>
                <p className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED}`}>
                  PNG, JPG, SVG, Web up to 5MB
                </p>
              </div>
            )}
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files[0])}
            className="hidden"
          />

        {/* Error Message */}
        {uploadError && (
          <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
            <FiAlertCircle size={16} className={TAILWIND_COLORS.TEXT_ERROR} />
            <p className={`text-sm ${TAILWIND_COLORS.TEXT_ERROR}`}>
              {uploadError}
            </p>
          </div>
        )}

          {/* Upload Button */}
          <div className="mt-5">
            <Button
              onClick={handleClick}
              variant="light"
              size="md"
              fullWidth
              loading={isUploading}
              disabled={isUploading}
              icon={<LuUpload size={16} />}
            >
              {isUploading
                ? "Uploading..."
                : logoFile
                ? "Change Logo"
                : "Upload Logo"}
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8" />

      {/* Right Column - Company Information */}
      <div className={`${TAILWIND_COLORS.CARD} p-6`}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <LuBuilding2 className={TAILWIND_COLORS.TEXT_ACCENT} size={20} />
          <h3 className={`font-semibold text-lg ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
            Company Information
          </h3>
        </div>
        <p className={`text-sm mb-6 ${TAILWIND_COLORS.TEXT_MUTED}`}>
          Basic information about your company
        </p>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Company Name */}
          <div className="flex flex-col">
            <label className={`text-sm font-medium mb-2 ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
              Company Name
            </label>
            <input
              type="text"
              value={companyData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter company name"
              className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${TAILWIND_COLORS.TEXT_PRIMARY} placeholder:${TAILWIND_COLORS.TEXT_MUTED}`}
            />
          </div>

          {/* Website */}
          <div className="flex flex-col">
            <label className={`text-sm font-medium mb-2 ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
              Website
            </label>
            <input
              type="url"
              value={companyData.website}
              onChange={(e) => handleChange("website", e.target.value)}
              placeholder="https://example.com"
              className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${TAILWIND_COLORS.TEXT_PRIMARY} placeholder:${TAILWIND_COLORS.TEXT_MUTED}`}
            />
          </div>

          {/* Trade */}
          <div className="flex flex-col">
            <label className={`text-sm font-medium mb-2 ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
              Trade
            </label>
            <div className="relative">
              <select
                value={companyData.trade}
                onChange={(e) => handleChange("trade", e.target.value)}
                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 appearance-none bg-white ${TAILWIND_COLORS.TEXT_PRIMARY}`}
              >
                {tradeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <LuChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 ${TAILWIND_COLORS.TEXT_ICON_MUTED} pointer-events-none`} size={16} />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label
                className={`text-sm font-medium mb-2 ${TAILWIND_COLORS.TEXT_PRIMARY}`}
              >
                Email
              </label>
              <input
                type="email"
                value={companyData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter email address"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label
                className={`text-sm font-medium mb-2 ${TAILWIND_COLORS.TEXT_PRIMARY}`}
              >
                Phone Number
              </label>
              <input
                type="text"
                value={companyData.phone_number}
                onChange={(e) => handleChange("phone_number", e.target.value)}
                placeholder="Enter contact number"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col md:col-span-2">
              <label
                className={`text-sm font-medium mb-2 ${TAILWIND_COLORS.TEXT_PRIMARY}`}
              >
                Location
              </label>
              <input
                type="text"
                value={companyData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="Enter location"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <SaveButton
              onClick={async () => {
                try {
                  const payload = {
                    company_name: companyData.name,
                    industry: companyData.trade,
                    website: companyData.website,
                    email: companyData.email,
                    phone_number: companyData.phone_number,
                    location: companyData.location,
                    description: companyData.description,
                  };

                  // ✅ If logo file selected — use multipart upload
                  if (logoFile) {
                    const formData = new FormData();
                    Object.entries(payload).forEach(([key, val]) =>
                      formData.append(key, val)
                    );
                    formData.append("company_logo", logoFile);

                    const res = await putMethod({
                      apiUrl: apiService.updateRecruiterProfile,
                      data: formData,
                    });

                    if (res?.data?.success) {
                      toast.success("✅ Profile updated successfully!");
                    } else {
                      toast.error(res?.data?.message || "Update failed!");
                    }
                  } else {
                    // ✅ If no new logo — send as JSON
                    const res = await postMethod({
                      apiUrl: apiService.update_recruiter_profile,
                      data: payload,
                    });

                    if (res?.data?.success) {
                      toast.success("✅ Profile updated successfully!");
                    } else {
                      toast.error(res?.data?.message || "Update failed!");
                    }
                  }
                } catch (err) {
                  console.error("Error updating profile:", err);
                  toast.error("Something went wrong while saving!");
                }
              }}
            >
              Save Changes
            </SaveButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;

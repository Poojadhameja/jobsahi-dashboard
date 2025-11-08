import React, { useState, useRef } from "react";
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

const CompanyInfo = () => {
  const [companyData, setCompanyData] = useState({
    name: "Brightorial Tech pvt ltd",
    website: "pr.brightorial.com",
    trade: "Civil",
    description: "<p>Company's description goes here...</p>",
  });

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Please select a valid image file (JPEG, PNG, SVG, or Web)');
      return;
    }

    // Validate file size (5MB = 5 * 1024 * 1024 bytes)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadError('File size must be less than 5MB');
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
    setCompanyData(prev => ({ ...prev, [field]: value }));
  };

  const tradeOptions = [
    { value: "Civil", label: "Civil" },
    { value: "IT", label: "IT" },
    { value: "Mechanical", label: "Mechanical" },
  ];

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

        {/* Logo Display Area */}
        <div className="relative mb-6" onClick={handleClick}>
          <div 
            className={`w-full h-40 rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer transition-all duration-200 ${
              uploadError 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            {logoPreview ? (
              <div className="relative w-full h-full flex items-center justify-center ">
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="max-h-28 max-w-28 object-contain rounded-lg"
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
                <p className={`text-sm font-medium mb-2 ${TAILWIND_COLORS.TEXT_MUTED}`}>
                  Click to upload or drag and drop
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
        </div>

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
        <Button
          onClick={handleClick}
          variant="light"
          size="md"
          fullWidth
          loading={isUploading}
          disabled={isUploading}
          icon={<LuUpload size={16} />}
        >
          {isUploading ? 'Uploading...' : logoFile ? 'Change Logo' : 'Upload Logo'}
        </Button>
      </div>

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
          </div>

          {/* Company Description */}
          <div className="flex flex-col">
            <label className={`text-sm font-medium mb-3 block ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
              Company Description
            </label>

            <RichTextEditor
              // value={companyData.description}
              onChange={(html) => handleChange("description", html)}
              placeholder="Company's description goes here..."
              height="150px"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <SaveButton
            onClick={() => {
              // Handle save logic here
              console.log('Saving company data:', companyData);
            }}
          >
            Save Changes
          </SaveButton>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
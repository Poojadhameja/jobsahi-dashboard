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
import { COLORS } from "@shared/WebConstant";

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
      <div className="bg-white rounded-2xl shadow-sm p-6" style={{ border: `1px solid ${COLORS.GRAY_200}` }}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <LuUpload style={{ color: COLORS.GREEN_PRIMARY }} size={20} />
          <h3 className="font-semibold text-lg" style={{ color: COLORS.PRIMARY }}>
            Company Logo
          </h3>
        </div>
        
        <p className="text-sm mb-6" style={{ color: COLORS.GRAY_600 }}>
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
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLogoRemove();
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                    style={{ color: COLORS.GRAY_500 }}
                    title="Remove logo"
                  >
                    <LuX size={16} />
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center">
                <div 
                  className="w-20 h-20 mx-auto mb-4 rounded-lg flex items-center justify-center shadow-sm"
                  style={{ 
                    backgroundColor: '#f8f9fa',
                    border: '2px solid #e5e7eb',
                    color: COLORS.GREEN_PRIMARY
                  }}
                >
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <span className="text-xs font-bold text-blue-600">JOB</span>
                      <LuSearch className="ml-1 text-blue-600" size={12} />
                    </div>
                    <div className="text-xs font-bold text-green-600">SAHi</div>
                  </div>
                </div>
                <p className="text-sm font-medium mb-2" style={{ color: COLORS.GRAY_600 }}>
                  Click to upload or drag and drop
                </p>
                <p className="text-xs" style={{ color: COLORS.GRAY_500 }}>
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
            <FiAlertCircle size={16} style={{ color: COLORS.ERROR }} />
            <p className="text-sm" style={{ color: COLORS.ERROR }}>
              {uploadError}
            </p>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleClick}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          style={{ color: COLORS.GRAY_700 }}
          disabled={isUploading}
        >
          <LuUpload size={16} />
          <span className="text-sm font-medium">
            {isUploading ? 'Uploading...' : logoFile ? 'Change Logo' : 'Upload Logo'}
          </span>
        </button>
      </div>

      {/* Right Column - Company Information */}
      <div className="bg-white rounded-2xl shadow-sm p-6" style={{ border: `1px solid ${COLORS.GRAY_200}` }}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <LuBuilding2 style={{ color: COLORS.GREEN_PRIMARY }} size={20} />
          <h3 className="font-semibold text-lg" style={{ color: COLORS.PRIMARY }}>
            Company Information
          </h3>
        </div>
        <p className="text-sm mb-6" style={{ color: COLORS.GRAY_600 }}>
          Basic information about your company
        </p>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Company Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2" style={{ color: COLORS.PRIMARY }}>
              Company Name
            </label>
            <input
              type="text"
              value={companyData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter company name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>

          {/* Website */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2" style={{ color: COLORS.PRIMARY }}>
              Website
            </label>
            <input
              type="url"
              value={companyData.website}
              onChange={(e) => handleChange("website", e.target.value)}
              placeholder="https://example.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>

          {/* Trade */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2" style={{ color: COLORS.PRIMARY }}>
              Trade
            </label>
            <div className="relative">
              <select
                value={companyData.trade}
                onChange={(e) => handleChange("trade", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 appearance-none bg-white"
              >
                {tradeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <LuChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>

          {/* Company Description */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-3 block" style={{ color: COLORS.PRIMARY }}>
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
          <button className="px-6 py-2 bg-[#5B9821] text-white font-bold rounded-lg hover:bg-[#426e18] transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
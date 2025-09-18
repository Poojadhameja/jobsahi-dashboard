import React, { useState, useRef } from "react";
import {
  LuBuilding2,
  LuUpload,
  LuImage,
  LuX,
  LuCheck,
} from "react-icons/lu";
import { FiAlertCircle } from "react-icons/fi";

// Import components
import { PrimaryButton } from "@shared/components/Button";
import DynamicButton from "@shared/components/DynamicButton";
import RichTextEditor from "@shared/components/RichTextEditor";
import { COLORS } from "@shared/WebConstant";

// ====== COMPONENT STRUCTURE ======

// Logo Upload Section Component
const LogoUploadSection = ({ 
  logoFile, 
  logoPreview, 
  onLogoUpload, 
  onLogoRemove, 
  uploadError, 
  isUploading 
}) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      onLogoUpload(null, 'Please select a valid image file (JPEG, PNG, SVG, or Web)');
      return;
    }

    // Validate file size (5MB = 5 * 1024 * 1024 bytes)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      onLogoUpload(null, 'File size must be less than 5MB');
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    onLogoUpload(file, null, previewUrl);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <section 
      className="col-span-1 bg-white rounded-2xl shadow-sm p-6" 
      style={{ border: `1px solid ${COLORS.GRAY_200}` }}
    >
      {/* Header with icon */}
      <div className="flex items-center gap-3 mb-2">
        <LuUpload style={{ color: COLORS.GREEN_PRIMARY }} size={20} />
        <h3 
          className="font-semibold text-lg" 
          style={{ color: COLORS.PRIMARY }}
        >
          Company Logo
        </h3>
      </div>
      
      <p 
        className="text-sm mb-6" 
        style={{ color: COLORS.GRAY_600 }} 
      >
        Upload your company logo (Max 5MB)
      </p>

      {/* Logo Display Area */}
      <div 
        className="relative mb-6"
        onClick={handleClick}
      >
        <div 
          className={`w-full h-40 rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer transition-all duration-200 ${
            uploadError 
              ? 'border-red-300 bg-red-50' 
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
        >
          {logoPreview ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={logoPreview}
                alt="Logo Preview"
                className="max-h-28 max-w-28 object-contain rounded-lg"
              />
              {logoFile && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLogoRemove();
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
                  backgroundColor: COLORS.GREEN_PRIMARY,
                  color: 'white'
                }}
              >
                <span className="text-sm font-bold">JOB SAHI</span>
              </div>
              <p 
                className="text-sm font-medium mb-2" 
                style={{ color: COLORS.GRAY_600 }}
              >
                Click to upload or drag and drop
              </p>
              <p 
                className="text-xs" 
                style={{ color: COLORS.GRAY_500 }}
              >
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
      <PrimaryButton
        fullWidth
        className="gap-2 h-11"
        icon={<LuUpload />}
        onClick={handleClick}
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : logoFile ? 'Change Logo' : 'Upload Logo'}
      </PrimaryButton>
    </section>
  );
};

// Form Input Component
const FormInput = ({ label, type = "text", value, onChange, placeholder, required = false }) => (
  <div className="flex flex-col">
    <label 
      className="text-sm mb-1" 
      style={{ color: COLORS.GRAY_600 }}
    >
      {label} {required && <span style={{ color: COLORS.ERROR }}>*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="h-10 rounded-lg border px-3 focus:outline-none focus:ring-2"
      style={{ 
        borderColor: COLORS.GRAY_200,
        focusRingColor: COLORS.GREEN_PRIMARY
      }}
    />
  </div>
);

// Select Input Component
const SelectInput = ({ label, value, onChange, options, required = false }) => (
  <div className="flex flex-col">
    <label 
      className="text-sm mb-1" 
      style={{ color: COLORS.GRAY_600 }}
    >
      {label} {required && <span style={{ color: COLORS.ERROR }}>*</span>}
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full h-10 rounded-lg border px-3 appearance-none focus:outline-none focus:ring-2"
        style={{ 
          borderColor: COLORS.GRAY_200,
          focusRingColor: COLORS.GREEN_PRIMARY
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span 
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" 
        style={{ color: COLORS.GRAY_600 }}
      >
        ▾
      </span>
    </div>
  </div>
);

// Rich Text Editor Component
const CompanyRichTextEditor = React.memo(({ value, onChange, placeholder }) => (
  <div className="flex flex-col">
    <label 
      className="text-sm mb-2 block" 
      style={{ color: COLORS.GRAY_600 }}
    >
      Company Description
    </label>

    <RichTextEditor
      key="company-description-text-editor"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      height="200px"
    />
  </div>
), (prevProps, nextProps) => {
  // Custom comparison function to prevent unnecessary re-renders
  return prevProps.value === nextProps.value && 
         prevProps.placeholder === nextProps.placeholder;
});

// Company Information Section Component
const CompanyInfoSection = ({ companyData, handleChange, onSave }) => {
  const tradeOptions = [
    { value: "Civil", label: "Civil" },
    { value: "IT", label: "IT" },
    { value: "Mechanical", label: "Mechanical" },
  ];

  return (
    <section 
      className="col-span-1 md:col-span-2 bg-white rounded-2xl shadow-sm p-6" 
      style={{ border: `1px solid ${COLORS.GRAY_200}` }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <LuBuilding2 style={{ color: COLORS.GREEN_PRIMARY }} />
        <h3 
          className="font-semibold" 
          style={{ color: COLORS.PRIMARY }}
        >
          Company Information
        </h3>
      </div>
      <p 
        className="text-xs mb-5" 
        style={{ color: COLORS.GRAY_600 }}
      >
        Basic information about your company
      </p>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Company Name"
          value={companyData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Enter company name"
          required
        />

        <FormInput
          label="Website"
          type="url"
          value={companyData.website}
          onChange={(e) => handleChange("website", e.target.value)}
          placeholder="https://example.com"
        />
      </div>

      <div className="mt-4">
        <SelectInput
          label="Trade"
          value={companyData.trade}
          onChange={(e) => handleChange("trade", e.target.value)}
          options={tradeOptions}
          required
        />
      </div>

      {/* Description Editor */}
      <div className="mt-4">
        <CompanyRichTextEditor
          value={companyData.description}
          onChange={(html) => handleChange("description", html)}
          placeholder="Write your company description here..."
        />
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <DynamicButton
          onClick={onSave}
          backgroundColor={COLORS.GREEN_PRIMARY}
          textColor="#fff"
          hoverBackgroundColor={COLORS.GREEN_DARK}
        >
          Save Changes
        </DynamicButton>
      </div>
    </section>
  );
};

// ====== MAIN COMPONENT ======
export default function CompanyInfo() {
  // State management
  const [companyData, setCompanyData] = useState({
    name: "Brightorial Tech pvt ltd",
    website: "pr.brightorial.com",
    trade: "Civil",
    description: "<p>Company's description goes here...</p>",
  });

  // Logo upload state
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Event handlers
  const handleChange = React.useCallback((field, value) => {
    setCompanyData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleLogoUpload = React.useCallback((file, error, previewUrl) => {
    setUploadError(error);
    
    if (file && !error) {
      setLogoFile(file);
      setLogoPreview(previewUrl);
      setIsUploading(true);
      
      // Simulate upload process
      setTimeout(() => {
        setIsUploading(false);
        console.log("Logo uploaded:", file);
        // TODO: Implement actual upload to server
      }, 1500);
    } else if (error) {
      setLogoFile(null);
      setLogoPreview(null);
    }
  }, []);

  const handleLogoRemove = React.useCallback(() => {
    setLogoFile(null);
    setLogoPreview(null);
    setUploadError(null);
    
    // Clean up the preview URL to prevent memory leaks
    if (logoPreview) {
      URL.revokeObjectURL(logoPreview);
    }
  }, [logoPreview]);

  const handleSave = React.useCallback(() => {
    console.log("Save changes", { ...companyData, logoFile });
    // TODO: Implement save functionality with logo file
  }, [companyData, logoFile]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-14">
      <LogoUploadSection 
        logoFile={logoFile}
        logoPreview={logoPreview}
        onLogoUpload={handleLogoUpload}
        onLogoRemove={handleLogoRemove}
        uploadError={uploadError}
        isUploading={isUploading}
      />
      <CompanyInfoSection 
        companyData={companyData} 
        handleChange={handleChange} 
        onSave={handleSave} 
      />
    </div>
  );
}

import React, { useState } from "react";
import {
  LuBuilding2,
  LuUpload,
} from "react-icons/lu";

// Import components
import { PrimaryButton } from "@shared/components/Button";
import DynamicButton from "@shared/components/DynamicButton";
import { COLORS } from "@shared/WebConstant";

// ====== COMPONENT STRUCTURE ======

// Logo Upload Section Component
const LogoUploadSection = ({ onUpload }) => (
  <section 
    className="col-span-1 bg-white rounded-2xl shadow-sm p-6" 
    style={{ border: `1px solid ${COLORS.GRAY_200}` }}
  >
    <h3 
      className="font-semibold mb-1" 
      style={{ color: COLORS.PRIMARY }}
    >
      Company Logo
    </h3>
    <p 
      className="text-sm mb-4" 
      style={{ color: COLORS.GRAY_600 }}
    >
      Upload your company logo (Max 5MB)
    </p>

    <div className="flex items-center justify-center mb-4">
      <div 
        className="w-32 h-32 rounded-lg border-2 border-dashed flex items-center justify-center" 
        style={{ borderColor: COLORS.GRAY_300 }}
      >
        <img
          src="/logo192.png"
          alt="Logo Preview"
          className="max-h-20 max-w-20 object-contain"
        />
      </div>
    </div>

    <PrimaryButton
      fullWidth
      className="gap-2"
      icon={<LuUpload />}
      onClick={onUpload}
    >
      Upload Logo
    </PrimaryButton>
  </section>
);

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
const RichTextEditor = ({ value, onChange, placeholder }) => (
  <div className="flex flex-col">
    <label 
      className="text-sm mb-2 block" 
      style={{ color: COLORS.GRAY_600 }}
    >
      Company Description
    </label>

    <div 
      className="rounded-xl border overflow-hidden" 
      style={{ borderColor: COLORS.GRAY_200 }}
    >
      {/* Toolbar */}
      <div 
        className="flex items-center gap-3 px-3 py-2 border-b text-sm" 
        style={{ 
          backgroundColor: COLORS.GRAY_50, 
          borderBottomColor: COLORS.GRAY_200,
          color: COLORS.GRAY_600
        }}
      >
        <span className="font-bold">B</span>
        <em>I</em>
        <span className="underline">U</span>
        <span className="tracking-wider">≡</span>
        <span>—</span>
        <span className="rotate-90">⤷</span>
        <span>⟲</span>
        <span>⟳</span>
        <div className="ml-auto flex items-center gap-2">
          <span 
            className="px-2 py-0.5 rounded-md bg-white border" 
            style={{ 
              borderColor: COLORS.GRAY_200,
              color: COLORS.GRAY_600
            }}
          >
            Visual
          </span>
          <span 
            className="px-2 py-0.5 rounded-md" 
            style={{ color: COLORS.GRAY_600 }}
          >
            Text
          </span>
        </div>
      </div>

      <textarea
        value={value}
        onChange={onChange}
        rows={6}
        className="w-full p-3 focus:outline-none"
        placeholder={placeholder}
        style={{ color: COLORS.PRIMARY }}
      />
    </div>
  </div>
);

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
        <RichTextEditor
          value={companyData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Company's description goes here..."
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
    description: "Company's description goes here...",
  });

  // Event handlers
  const handleChange = (field, value) =>
    setCompanyData((prev) => ({ ...prev, [field]: value }));

  const handleLogoUpload = () => {
    console.log("Upload logo");
    // TODO: Implement logo upload functionality
  };

  const handleSave = () => {
    console.log("Save changes", companyData);
    // TODO: Implement save functionality
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-14">
      <LogoUploadSection onUpload={handleLogoUpload} />
      <CompanyInfoSection 
        companyData={companyData} 
        handleChange={handleChange} 
        onSave={handleSave} 
      />
    </div>
  );
}

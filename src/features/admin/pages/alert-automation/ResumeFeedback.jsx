import React, { useState } from "react";
import { COLORS, TAILWIND_COLORS } from "../../../../shared/WebConstant";
import { PrimaryButton } from "../../../../shared/components/Button.jsx";

// ========= Toggle (kept as a separate component) =========
const Toggle = ({ checked, onChange, label }) => (
  <label className="flex items-center justify-between gap-3 select-none">
    {label ? <span className={`${TAILWIND_COLORS.TEXT_MUTED}`}>{label}</span> : null}
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={[
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
        checked ? "bg-[var(--color-secondary)]" : "bg-slate-300",
        "focus:outline-none focus:ring-4 focus:ring-sky-100",
      ].join(" ")}
    >
      <span
        className={[
          "inline-block h-5 w-5 transform rounded-full bg-white shadow transition",
          checked ? "translate-x-5" : "translate-x-1",
        ].join(" ")}
      />
    </button>
  </label>
);

// AI Resume Feedback Card Component
const AIResumeFeedbackCard = ({ settings, onSettingsChange, onUpdateSettings }) => {
  const responseOptions = [
    { value: "", label: "select response time" },
    { value: "instant", label: "Instant (beta)" },
    { value: "1h", label: "Within 1 hour" },
    { value: "6h", label: "Within 6 hours" },
    { value: "24h", label: "Within 24 hours" },
  ];

  const handleSubmit = () => onUpdateSettings?.(settings);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
          <svg className="w-3 h-3 text-[var(--color-secondary)]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
          </svg>
        </div>
        <h2 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>AI Resume Feedback (Future Integration)</h2>
      </div>
      <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mb-6`}>Configure LLM-powered resume analysis and feedback system</p>
      
      {/* Coming soon banner */}
      <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4">
        <p className="font-bold text-[var(--color-secondary)]">Coming soon</p>
        <p className="text-sm text-[var(--color-secondary)] mt-1">
          this feature will integrate with large language models to provide automated resume feedback and suggestions to job seekers.
        </p>
      </div>

      {/* Body */}
      <div className="space-y-6 flex-1">
        {/* Feedback Categories */}
        <div className="md:w-[50%] lg:md:w-[40%]">
          <h3 className={`font-bold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Feedback Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <Toggle
                label="Email Notifications"
                checked={settings.emailNotifications}
                onChange={(v) =>
                  onSettingsChange({ ...settings, emailNotifications: v })
                }
              />
              <Toggle
                label="Push Notifications"
                checked={settings.pushNotifications}
                onChange={(v) =>
                  onSettingsChange({ ...settings, pushNotifications: v })
                }
              />
            </div>
            <div className="space-y-3">
              <Toggle
                label="Content Quality"
                checked={settings.contentQuality}
                onChange={(v) =>
                  onSettingsChange({ ...settings, contentQuality: v })
                }
              />
              <Toggle
                label="Grammar & Language"
                checked={settings.grammarLanguage}
                onChange={(v) =>
                  onSettingsChange({ ...settings, grammarLanguage: v })
                }
              />
            </div>
          </div>
        </div>

        {/* Response time */}
        <div className="md:w-[50%] lg:md:w-[40%]">
          <h3 className={`font-bold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>Responsive time target</h3>
          <div className="relative">
            <select
              value={settings.responseTime}
              onChange={(e) =>
                onSettingsChange({ ...settings, responseTime: e.target.value })
              }
              className="w-full h-12 px-4 py-3 border border-[var(--color-secondary)] rounded-lg focus:outline-none appearance-none bg-white pr-9 text-sm"
              style={{ color: settings.responseTime ? 'var(--color-secondary)' : 'var(--color-secondary)' }}
            >
              {responseOptions.map((o) => (
                <option key={o.value} value={o.value} disabled={o.value === ""}>
                  {o.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Configure Button */}
        <div className="">
          <PrimaryButton
            onClick={handleSubmit}
            className="  bg-[var(--color-secondary)] hover:bg-secondary-dark text-white rounded-lg text-sm font-medium"
          >
            Configure LLM Integration
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// ========= Page wrapper (kept exactly like your structure) =========
const ResumeFeedback = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    contentQuality: true,
    grammarLanguage: true,
    responseTime: "",
  });

  const handleSettingsChange = (newSettings) => setSettings(newSettings);

  const handleUpdateSettings = (updatedSettings) => {
    // Hook up to API later
    console.log("Updated settings:", updatedSettings);
    alert("Settings updated successfully!");
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      <AIResumeFeedbackCard
        settings={settings}
        onSettingsChange={handleSettingsChange}
        onUpdateSettings={handleUpdateSettings}
      />
    </div>
  );
};

export default ResumeFeedback;

import React, { useState } from "react";
import { COLORS, TAILWIND_COLORS } from "../../../../shared/WebConstant";

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
        checked ? "bg-green-600" : "bg-slate-300",
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

// ========= Card (matching Dashboard Placement Success Funnel styling) =========
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
    <div className="bg-white rounded-xl border border-[rgba(0,57,91,0.18)] shadow-sm p-3 sm:p-4 md:p-5">
      <div className={`font-medium my-3 sm:my-4 md:mb-6 lg:mb-10 text-lg sm:text-xl text-center md:text-left ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
        AI Resume Feedback (Future Integration)
      </div>
      
      {/* Coming soon banner */}
      <div className="mb-4 rounded-xl bg-green-50 text-green-800 border border-green-200 p-4">
        <p className="font-medium">Coming soon</p>
        <p className="text-sm mt-1">
          this feature will integrate with large language models to provide
          automated resume feedback and suggestions to job seekers.
        </p>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Feedback Categories */}
        <div>
          <h3 className={`${TAILWIND_COLORS.TEXT_MUTED} font-semibold mb-4`}>Feedback Categories</h3>
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

        {/* Response time + CTA */}
        <div className="flex flex-col gap-4">
          <div>
            <label className={`block ${TAILWIND_COLORS.TEXT_MUTED} font-semibold mb-2`}>
              Responsive time target
            </label>
            <div className="relative">
              <select
                value={settings.responseTime}
                onChange={(e) =>
                  onSettingsChange({ ...settings, responseTime: e.target.value })
                }
                className={`w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 ${TAILWIND_COLORS.TEXT_MUTED} focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-300`}
              >
                {responseOptions.map((o) => (
                  <option key={o.value} value={o.value} disabled={o.value === ""}>
                    {o.label}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          <button
            type="button"
            className={`inline-flex items-center justify-center gap-2 rounded-xl ${TAILWIND_COLORS.BTN_PRIMARY} px-5 py-3 font-medium shadow-sm focus:outline-none focus:ring-4 focus:ring-green-100 active:scale-95`}
            onClick={handleSubmit}
          >
            Configure LLM Integration
          </button>

          <p className="text-xs text-gray-500">
            Note: Since this is a future integration, controls are UI-only for now.
            Wire them to your API when backend is ready.
          </p>
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
    <div className="space-y-4 sm:space-y-6">
      <AIResumeFeedbackCard
        settings={settings}
        onSettingsChange={handleSettingsChange}
        onUpdateSettings={handleUpdateSettings}
      />
    </div>
  );
};

export default ResumeFeedback;

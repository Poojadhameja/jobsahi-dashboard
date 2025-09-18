// src/pages/company/preferences/Preferences.jsx
import React, { useState } from "react";
import {
  OutlineButton,
  SaveButton,
} from "../../../../shared/components/Button"; // ← adjust path if needed
import { COLORS, TAILWIND_COLORS } from "../../../../shared/WebConstant";

export default function Preferences() {
  // form state
  const [emailFrequency, setEmailFrequency] = useState("daily");
  const [autoReplies, setAutoReplies] = useState(true);
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [teamMembers] = useState(3);
  const [saving, setSaving] = useState(false);

  const emailFrequencies = [
    { value: "daily", label: "Daily Digest" },
    { value: "weekly", label: "Weekly Summary" },
    { value: "monthly", label: "Monthly Report" },
    { value: "never", label: "Never" },
  ];

  const timezones = [
    { value: "Asia/Kolkata", label: "Asia/Kolkata (IST)" },
    { value: "America/New_York", label: "America/New_York (EST)" },
    { value: "Europe/London", label: "Europe/London (GMT)" },
    { value: "Asia/Tokyo", label: "Asia/Tokyo (JST)" },
    { value: "Australia/Sydney", label: "Australia/Sydney (AEST)" },
  ];

  const labelOf = (arr, v) => (arr.find((x) => x.value === v) || arr[0]).label;

  const summary = [
    `Email notifications: ${emailFrequency}`,
    `Auto-replies: ${autoReplies ? "Enabled" : "Disabled"}`,
    `Timezone: ${labelOf(timezones, timezone)}`,
    `Team members: ${teamMembers}`,
  ];

  const onReset = () => {
    setEmailFrequency("daily");
    setAutoReplies(true);
    setTimezone("Asia/Kolkata");
  };

  const onSave = async () => {
    setSaving(true);
    // TODO: call your API here
    await new Promise((r) => setTimeout(r, 900));
    setSaving(false);
  };

  return (
    <div className="pb-14">
      {/* two cards side-by-side like the screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email Preferences */}
        <section className={`rounded-2xl border ${TAILWIND_COLORS.BORDER} bg-white p-6`}>
          <header className="mb-5 flex items-start gap-2">
            <span className={`mt-1 inline-grid h-6 w-6 place-items-center rounded-full`} style={{ backgroundColor: COLORS.GREEN_PRIMARY }}>
              {/* mail icon */}
              <svg width="14" height="14" viewBox="0 0 20 20" fill="#fff">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </span>
            <div>
              <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                Email Preferences
              </h3>
              <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
                Configure your email notification settings
              </p>
            </div>
          </header>

          {/* Email Frequency */}
          <label className={`mb-2 block text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
            Email Frequency
          </label>
          <div className="relative">
            <select
              value={emailFrequency}
              onChange={(e) => setEmailFrequency(e.target.value)}
              className={`h-10 w-full appearance-none rounded-lg border ${TAILWIND_COLORS.BORDER} bg-white px-3 pr-9 text-sm focus:outline-none focus:ring-2`}
              style={{ '--tw-ring-color': COLORS.GREEN_PRIMARY }}
            >
              {emailFrequencies.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              ▾
            </span>
          </div>

          {/* Auto replies toggle */}
          <div className="mt-6">
            <p className={`mb-1 text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Auto-replies</p>
            <p className={`mb-2 text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
              Automatically respond to candidate applications
            </p>
            <button
              type="button"
              onClick={() => setAutoReplies((v) => !v)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoReplies ? "bg-green-600" : "bg-gray-300"
              }`}
              style={{ backgroundColor: autoReplies ? COLORS.GREEN_PRIMARY : COLORS.GRAY_300 }}
              aria-pressed={autoReplies}
              aria-label="Toggle auto replies"
            >
              <span
                className={`h-4 w-4 transform rounded-full bg-white transition ${
                  autoReplies ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </section>

        {/* System Preferences */}
        <section className={`rounded-2xl border ${TAILWIND_COLORS.BORDER} bg-white p-6`}>
          <header className="mb-5 flex items-start gap-2">
            <span className={`mt-1 inline-grid h-6 w-6 place-items-center rounded-full`} style={{ backgroundColor: COLORS.PRIMARY }}>
              {/* cog icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
                <path d="M12 8a4 4 0 100 8 4 4 0 000-8z" />
                <path d="M4 13a8 8 0 011-3l-2-3 3-3 3 2a8 8 0 013-1l1-3h4l1 3a8 8 0 013 1l3-2 3 3-2 3a8 8 0 011 3l3 1v4l-3 1a8 8 0 01-1 3l2 3-3 3-3-2a8 8 0 01-3 1l-1 3h-4l-1-3a8 8 0 01-3-1l-3 2-3-3 2-3a8 8 0 01-1-3L1 18v-4l3-1z" />
              </svg>
            </span>
            <div>
              <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                System Preferences
              </h3>
              <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
                Configure your system and regional settings
              </p>
            </div>
          </header>

          {/* Timezone */}
          <label className={`mb-2 block text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>Timezone</label>
          <div className="relative">
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className={`h-10 w-full appearance-none rounded-lg border ${TAILWIND_COLORS.BORDER} bg-white px-3 pr-9 text-sm focus:outline-none focus:ring-2`}
              style={{ '--tw-ring-color': COLORS.PRIMARY }}
            >
              {timezones.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              ▾
            </span>
          </div>

          {/* Summary box */}
          <div className={`mt-6 rounded-xl border ${TAILWIND_COLORS.BORDER} bg-white p-4`}>
            <h4 className={`mb-2 text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
              Current Settings Summary
            </h4>
            <ul className={`list-disc space-y-1 pl-5 text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
              {summary.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* actions */}
      <div className="mt-8 flex justify-end gap-3">
        <OutlineButton onClick={onReset}>Reset to Default</OutlineButton>
        <SaveButton onClick={onSave} loading={saving}>
          {saving ? "Saving..." : "Save Preferences"}
        </SaveButton>
      </div>
    </div>
  );
}

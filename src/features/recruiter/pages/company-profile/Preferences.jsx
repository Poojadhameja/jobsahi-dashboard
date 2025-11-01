import React, { useState } from "react";
import { LuSettings, LuNetwork, LuChevronDown } from "react-icons/lu";
import { COLORS } from "@shared/WebConstant";

const Preferences = () => {
  const [emailPreferences, setEmailPreferences] = useState({
    frequency: "Daily Digest",
    autoReplies: true
  });

  const [systemPreferences, setSystemPreferences] = useState({
    timezone: "Asia/Kolkata (IST)"
  });

  const emailFrequencyOptions = [
    "Daily Digest",
    "Weekly Summary", 
    "Real-time",
    "Never"
  ];

  const timezoneOptions = [
    "Asia/Kolkata (IST)",
    "America/New_York (EST)",
    "Europe/London (GMT)",
    "Asia/Tokyo (JST)",
    "Australia/Sydney (AEST)"
  ];

  const handleEmailChange = (field, value) => {
    setEmailPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSystemChange = (field, value) => {
    setSystemPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleToggle = (field) => {
    setEmailPreferences(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Calculate team members count (this would come from props or context in real app)
  const teamMembersCount = 3;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Section - Email Preferences */}
      <div className="bg-white rounded-2xl p-6" style={{ border: `1px solid ${COLORS.GRAY_200}` }}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <LuNetwork style={{ color: COLORS.GREEN_PRIMARY }} size={20} />
          <h3 className="font-semibold text-lg" style={{ color: COLORS.PRIMARY }}>
            Email Preferences
          </h3>
        </div>
        <p className="text-sm mb-6" style={{ color: COLORS.GRAY_800 }}>
          Configure your email notification settings.
        </p>

        {/* Email Frequency */}
        <div className="mb-6">
          <label className="text-sm font-medium mb-2 block" style={{ color: COLORS.PRIMARY }}>
            Email Frequency
          </label>
          <div className="relative">
            <select
              value={emailPreferences.frequency}
              onChange={(e) => handleEmailChange("frequency", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 appearance-none bg-white"
            >
              {emailFrequencyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <LuChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>

        {/* Auto-replies */}
        <div className="mb-6 flex items-center justify-between">
          <div className="">
          <label className="text-sm font-medium mb-2 block" style={{ color: COLORS.PRIMARY }}>
            Auto-replies
          </label>
          <p className="text-xs mb-3" style={{ color: COLORS.GRAY_600 }}>
            Automatically respond to candidate applications
          </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={emailPreferences.autoReplies}
              onChange={() => handleToggle("autoReplies")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-secondary-10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-secondary)]"></div>
          </label>
        </div>
      </div>

      {/* Right Section - System Preferences */}
      <div className="bg-white rounded-2xl p-6" style={{ border: `1px solid ${COLORS.GRAY_200}` }}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <LuNetwork style={{ color: COLORS.GREEN_PRIMARY }} size={20} />
          <h3 className="font-semibold text-lg" style={{ color: COLORS.PRIMARY }}>
            System Preferences
          </h3>
        </div>
        <p className="text-sm mb-6" style={{ color: COLORS.GRAY_600 }}>
          Configure your system and regional settings.
        </p>

        {/* Timezone */}
        <div className="mb-6">
          <label className="text-sm font-medium mb-2 block" style={{ color: COLORS.PRIMARY }}>
            Timezone
          </label>
          <div className="relative">
            <select
              value={systemPreferences.timezone}
              onChange={(e) => handleSystemChange("timezone", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 appearance-none bg-white"
            >
              {timezoneOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <LuChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>

        {/* Current Settings Summary */}
        <div className="bg-white rounded-lg p-4" style={{ border: `1px solid ${COLORS.GRAY_200}` }}>
          <h4 className="font-semibold text-sm mb-3" style={{ color: COLORS.PRIMARY }}>
            Current Settings Summary
          </h4>
          <ul className="space-y-2 text-sm" style={{ color: COLORS.GRAY_800 }}>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
              Email notifications: {emailPreferences.frequency.toLowerCase()}
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
              Auto-replies: {emailPreferences.autoReplies ? "Enabled" : "Disabled"}
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
              Timezone: {systemPreferences.timezone}
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
              Team members: {teamMembersCount}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
import React, { useState } from "react";
import { LuSettings, LuNetwork, LuChevronDown } from "react-icons/lu";
import { TAILWIND_COLORS } from "@shared/WebConstant";
import { Button, SaveButton } from "@shared/components/Button";
import DynamicButton from "@shared/components/DynamicButton";

const Preferences = () => {
  const [emailPreferences, setEmailPreferences] = useState({
    frequency: "Daily Digest",
    autoReplies: true
  });

  const [systemPreferences, setSystemPreferences] = useState({
    timezone: "Asia/Kolkata (IST)"
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

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

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setEmailPreferences({
      frequency: "Daily Digest",
      autoReplies: true
    });
    setSystemPreferences({
      timezone: "Asia/Kolkata (IST)"
    });
  };

  // Calculate team members count (this would come from props or context in real app)
  const teamMembersCount = 3;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Section - Email Preferences */}
      <div className={`${TAILWIND_COLORS.CARD} p-6`}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <LuNetwork className={`${TAILWIND_COLORS.SECONDARY}`} size={20} />
          <h3 className={`font-semibold text-lg ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
            Email Preferences
          </h3>
        </div>
        <p className={`text-sm mb-6 ${TAILWIND_COLORS.TEXT_MUTED}`}>
          Configure your email notification settings.
        </p>

        {/* Email Frequency */}
        <div className="mb-6">
          <label className={`text-sm font-medium mb-2 block ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
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
            <LuChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 ${TAILWIND_COLORS.TEXT_MUTED} pointer-events-none`} size={16} />
          </div>
        </div>

        {/* Auto-replies */}
        <div className="mb-6 flex items-center justify-between">
          <div className="">
          <label className={`text-sm font-medium mb-2 block ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
            Auto-replies
          </label>
          <p className={`text-xs mb-3 ${TAILWIND_COLORS.TEXT_MUTED}`}>
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
      <div className={`${TAILWIND_COLORS.CARD} p-6`}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
              <LuSettings className={`${TAILWIND_COLORS.SECONDARY}`} size={20} />
          <h3 className={`font-semibold text-lg ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
            System Preferences
          </h3>
        </div>
        <p className={`text-sm mb-6 ${TAILWIND_COLORS.TEXT_MUTED}`}>
          Configure your system and regional settings.
        </p>

        {/* Timezone */}
        <div className="mb-6">
          <label className={`text-sm font-medium mb-2 block ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
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
            <LuChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 ${TAILWIND_COLORS.TEXT_MUTED} pointer-events-none`} size={16} />
          </div>
        </div>

        {/* Current Settings Summary */}
          <div className={`${TAILWIND_COLORS.CARD} p-4`}>
          <h4 className={`font-semibold text-sm mb-3 ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
            Current Settings Summary
          </h4>
          <ul className={`space-y-2 text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
            <li className="flex items-center">
              <span className={`w-2 h-2 ${TAILWIND_COLORS.TEXT_MUTED} rounded-full mr-3`}></span>
              Email notifications: {emailPreferences.frequency.toLowerCase()}
            </li>
            <li className="flex items-center">
              <span className={`w-2 h-2 ${TAILWIND_COLORS.TEXT_MUTED} rounded-full mr-3`}></span>
              Auto-replies: {emailPreferences.autoReplies ? "Enabled" : "Disabled"}
            </li>
            <li className="flex items-center">
              <span className={`w-2 h-2 ${TAILWIND_COLORS.TEXT_MUTED} rounded-full mr-3`}></span>
              Timezone: {systemPreferences.timezone}
            </li>
            <li className="flex items-center">
              <span className={`w-2 h-2 ${TAILWIND_COLORS.TEXT_MUTED} rounded-full mr-3`}></span>
              Team members: {teamMembersCount}
            </li>
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="col-span-full flex flex-col sm:flex-row gap-4 justify-end mt-8">
        <Button
          variant="light"
          onClick={handleReset}
          className="order-2 sm:order-1"
        >
          Reset to Default
        </Button>
        
        <SaveButton
          onClick={handleSave}
          loading={isLoading}
          savedTick={isSaved}
          className="order-1 sm:order-2"
        >
          Save Preferences
        </SaveButton>
      </div>

      {/* Dynamic Button Example */}
      <div className="col-span-full mt-6">
        <div className={`${TAILWIND_COLORS.CARD} p-4`}>
          <h4 className={`font-semibold text-sm mb-3 ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
            Advanced Actions
          </h4>
          <div className="flex flex-wrap gap-3">
            <DynamicButton
              onClick={() => console.log('Export preferences')}
              backgroundColor="var(--color-primary)"
              textColor="white"
              hoverBackgroundColor="var(--color-primary-dark)"
            >
              Export Settings
            </DynamicButton>
            
            <DynamicButton
              onClick={() => console.log('Import preferences')}
              backgroundColor="transparent"
              textColor="var(--color-secondary)"
              border="2px solid var(--color-secondary)"
              hoverBackgroundColor="var(--color-secondary-10)"
            >
              Import Settings
            </DynamicButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
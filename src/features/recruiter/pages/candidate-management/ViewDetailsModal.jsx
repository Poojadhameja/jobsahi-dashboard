import React, { useState } from "react";
import {
  LuX,
  LuMail,
  LuPhone,
  LuMapPin,
  LuCalendar,
  LuFileText,
  LuExternalLink,
  LuDownload,
  LuClock,
  LuVideo,
  LuBuilding,
} from "react-icons/lu";
import { TAILWIND_COLORS } from "../../../../shared/WebConstant";
import { Button, IconButton } from "../../../../shared/components/Button";
import Swal from "sweetalert2";

const ViewDetailsModal = ({ isOpen, onClose, candidate, onDownloadCV }) => {
  const [scheduleInterview, setScheduleInterview] = useState(false);
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [interviewMode, setInterviewMode] = useState("online");

  if (!isOpen || !candidate) return null;

  const handleDownloadCV = () => {
    if (onDownloadCV) {
      onDownloadCV(candidate);
    } else {
      // Fallback download logic
      const candidateData = `
        Candidate Information
        ====================
        Name: ${candidate.name}
        Email: ${candidate.email}
        Phone: ${candidate.phone_number || "Not provided"}
        Location: ${candidate.location || "Not provided"}
        Qualification: ${candidate.qualification}
        Experience: ${candidate.experience || "Not provided"}
        Skills: ${candidate.skills}
        Applied For: ${candidate.appliedFor}
        Applied Date: ${candidate.applied_date || "Not provided"}
        Status: ${candidate.status}
      `.trim();

      const blob = new Blob([candidateData], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${candidate.name.replace(/\s+/g, "_")}_CV.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  };

  const handleScheduleInterview = () => {
    if (!interviewDate || !interviewTime) {
      Swal.fire({
        title: "Validation Error",
        text: "Please select both date and time for the interview",
        icon: "error",
      });
      return;
    }

    // Here you would call your API to schedule the interview
    Swal.fire({
      title: "Success!",
      text: `Interview scheduled for ${interviewDate} at ${interviewTime} (${interviewMode})`,
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      // Reset form
      setScheduleInterview(false);
      setInterviewDate("");
      setInterviewTime("");
      setInterviewMode("online");
    });
  };

  // ✅ Handle skills safely
  const skills = Array.isArray(candidate.skills)
    ? candidate.skills
    : typeof candidate.skills === "string"
    ? candidate.skills.split(", ")
    : [];

  // ✅ Handle experience JSON safely
  let experienceList = [];
  try {
    experienceList = JSON.parse(candidate.experience);
    if (!Array.isArray(experienceList)) experienceList = [];
  } catch {
    experienceList = [];
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-200">
          <div className="flex items-start space-x-4">
            {/* Avatar */}
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <span className={`text-xl font-semibold ${TAILWIND_COLORS.TEXT_MUTED}`}>
                {candidate.name
                  ? candidate.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                  : "NA"}
              </span>
            </div>

            {/* Name and Applied For */}
            <div>
              <h2
                className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}
              >
                {candidate.name}
              </h2>
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
                  Applied for
                </span>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {candidate.applied_for}
                </span>
              </div>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleDownloadCV}
              className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
            >
              <LuDownload className="w-4 h-4" />
              <span>Download CV</span>
            </button>
            {candidate.resume_url && (
              <a
                href={candidate.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-blue-600 hover:underline"
              >
                <LuFileText className="w-4 h-4" />
                <span>View Resume</span>
              </a>
            )}
            <div className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
              STATUS
            </div>
            <Button variant="primary" size="sm" className="text-sm font-medium">
              {candidate.status || "Applied"}
            </Button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <LuX size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Bio / Description */}
          <div className="mb-6">
            <h3
              className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-3`}
            >
              About Candidate
            </h3>
            <div className="bg-gray-100 rounded-lg p-4">
              <p className={`${TAILWIND_COLORS.TEXT_PRIMARY} leading-relaxed`}>
                {candidate.bio || "No bio available for this candidate."}
              </p>
            </div>
          </div>

          {/* Cover Letter */}
          {candidate.cover_letter && candidate.cover_letter !== "—" && (
            <div className="mb-6">
              <h3
                className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-3`}
              >
                Cover Letter
              </h3>
              <div className="bg-gray-100 rounded-lg p-4">
                <p className={`${TAILWIND_COLORS.TEXT_PRIMARY} leading-relaxed`}>
                  {candidate.cover_letter}
                </p>
              </div>
            </div>
          )}

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
            {/* Personal Details */}
            <div>
              <h3
                className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}
              >
                Personal Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span
                    className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}
                  >
                    FULL NAME
                  </span>
                  <span className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                    {candidate.name}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span
                    className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}
                  >
                    EMAIL
                  </span>
                  <div className="flex items-center space-x-2">
                    <LuMail className={`w-4 h-4 ${TAILWIND_COLORS.TEXT_MUTED}`} />
                    <span
                      className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}
                    >
                      {candidate.email}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span
                    className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}
                  >
                    PHONE
                  </span>
                  <div className="flex items-center space-x-2">
                    <LuPhone className={`w-4 h-4 ${TAILWIND_COLORS.TEXT_MUTED}`} />
                    <span
                      className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}
                    >
                      {candidate.phone_number || "—"}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span
                    className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}
                  >
                    LOCATION
                  </span>
                  <div className="flex items-center space-x-2">
                    <LuMapPin className={`w-4 h-4 ${TAILWIND_COLORS.TEXT_MUTED}`} />
                    <span
                      className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}
                    >
                      {candidate.location || "—"}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-2">
                  <span
                    className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}
                  >
                    APPLIED DATE
                  </span>
                  <div className="flex items-center space-x-2">
                    <LuCalendar className={`w-4 h-4 ${TAILWIND_COLORS.TEXT_MUTED}`} />
                    <span
                      className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}
                    >
                      {candidate.applied_date || "—"}
                    </span>
                  </div>
                </div>

                {/* Portfolio Link */}
                {candidate.portfolio_link && (
                  <div className="flex justify-between items-center py-2">
                    <span
                      className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED}`}
                    >
                      PORTFOLIO
                    </span>
                    <a
                      href={candidate.portfolio_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline flex items-center space-x-1"
                    >
                      <LuExternalLink className="w-4 h-4" />
                      <span>View</span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Education Info */}
            <div>
              <h3
                className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}
              >
                Education Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mt-1">
                    <span className={`text-xs font-semibold ${TAILWIND_COLORS.TEXT_MUTED}`}>1</span>
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}
                    >
                      {candidate.qualification || candidate.education || "—"}
                    </h4>
                    <p
                      className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mt-1`}
                    >
                      Verified Candidate:{" "}
                      {candidate.verified === "Yes" || candidate.verified === true ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-6">
            <h3
              className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}
            >
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <span
                    key={index}
                    className={`bg-gray-200 ${TAILWIND_COLORS.TEXT_PRIMARY} px-3 py-1 rounded-full text-sm font-medium`}
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span
                  className={`bg-gray-200 ${TAILWIND_COLORS.TEXT_PRIMARY} px-3 py-1 rounded-full text-sm font-medium`}
                >
                  No skills added
                </span>
              )}
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-6">
            <h3
              className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}
            >
              Work Experience
            </h3>
            {experienceList.length > 0 ? (
              <div className="space-y-4">
                {experienceList.map((exp, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                  >
                    <h4 className={`font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                      {exp.role} @ {exp.company}
                    </h4>
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mt-1`}>
                      {exp.duration}
                    </p>
                    <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mt-2 leading-relaxed`}>
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className={`${TAILWIND_COLORS.TEXT_MUTED} text-sm`}>
                No experience details available.
              </p>
            )}
          </div>

          {/* Schedule Interview Section */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center gap-3 mb-4">
              <input
                type="radio"
                id="scheduleInterview"
                checked={scheduleInterview}
                onChange={(e) => setScheduleInterview(e.target.checked)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="scheduleInterview"
                className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} cursor-pointer`}
              >
                Schedule Interview
              </label>
            </div>

            {scheduleInterview && (
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                {/* Date Field */}
                <div>
                  <label
                    className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}
                  >
                    Interview Date
                  </label>
                  <div className="relative">
                    <LuCalendar
                      className={`absolute left-3 top-1/2 -translate-y-1/2 ${TAILWIND_COLORS.TEXT_MUTED}`}
                      size={20}
                    />
                    <input
                      type="date"
                      value={interviewDate}
                      onChange={(e) => setInterviewDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Time Slot Field */}
                <div>
                  <label
                    className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}
                  >
                    Time Slot
                  </label>
                  <div className="relative">
                    <LuClock
                      className={`absolute left-3 top-1/2 -translate-y-1/2 ${TAILWIND_COLORS.TEXT_MUTED}`}
                      size={20}
                    />
                    <input
                      type="time"
                      value={interviewTime}
                      onChange={(e) => setInterviewTime(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Mode Selection */}
                <div>
                  <label
                    className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}
                  >
                    Interview Mode
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="interviewMode"
                        value="online"
                        checked={interviewMode === "online"}
                        onChange={(e) => setInterviewMode(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex items-center gap-2">
                        <LuVideo className={`w-4 h-4 ${TAILWIND_COLORS.TEXT_MUTED}`} />
                        <span className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                          Online
                        </span>
                      </div>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="interviewMode"
                        value="offline"
                        checked={interviewMode === "offline"}
                        onChange={(e) => setInterviewMode(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex items-center gap-2">
                        <LuBuilding className={`w-4 h-4 ${TAILWIND_COLORS.TEXT_MUTED}`} />
                        <span className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                          Offline
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Confirm Button */}
                <div className="pt-2">
                  <Button
                    onClick={handleScheduleInterview}
                    variant="primary"
                    size="md"
                    className="w-full"
                  >
                    Confirm Schedule
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;

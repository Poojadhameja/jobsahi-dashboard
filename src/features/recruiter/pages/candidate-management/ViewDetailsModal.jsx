import React from "react";
import {
  LuX,
  LuMail,
  LuPhone,
  LuMapPin,
  LuCalendar,
  LuFileText,
  LuExternalLink,
} from "react-icons/lu";
import { TAILWIND_COLORS } from "../../../../shared/WebConstant";
import { Button, IconButton } from "../../../../shared/components/Button";

const ViewDetailsModal = ({ isOpen, onClose, candidate }) => {
  if (!isOpen || !candidate) return null;

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
                      {candidate.education}
                    </h4>
                    <p
                      className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mt-1`}
                    >
                      Verified Candidate:{" "}
                      {candidate.verified ? "Yes" : "No"}
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
          <div>
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
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;

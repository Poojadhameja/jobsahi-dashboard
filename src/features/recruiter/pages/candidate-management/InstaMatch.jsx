import React, { useState } from "react";
import {
  LuSearch,
  LuChevronDown,
  LuMail,
  LuCalendar,
  LuStar,
  LuMapPin,
  LuGraduationCap,
  LuBriefcase,
  LuUsers,
  LuUserCheck,
  LuClipboardCheck,
  LuShield,
  LuClock,
  LuX,
  LuVideo,
  LuPhone,
} from "react-icons/lu";
import { Horizontal4Cards } from "../../../../shared/components/metricCard";
import { TAILWIND_COLORS } from "../../../../shared/WebConstant";
import { Button } from "../../../../shared/components/Button";

const InstaMatch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [matchFilter, setMatchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [interviewForm, setInterviewForm] = useState({
    date: "",
    time: "",
    type: "video", // video, phone, in-person
    duration: "30", // 30, 45, 60 minutes
    location: "",
    notes: "",
  });

  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Senior Frontend Developer",
      location: "Balaghat, Madhya Pradesh",
      education: "Satpuda ITI college",
      experience: "5+ Year",
      aiMatch: 95,
      status: "Interviewed",
      skills: ["React", "TypeScript", "Next.js", "+2"],
      isShortlisted: false,
      profileImage: null,
      interview: {
        scheduled: true,
        date: "2024-01-15",
        time: "10:00",
        type: "video",
        duration: "45",
        location: "Google Meet",
        notes: "Technical interview focusing on React and TypeScript",
      },
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Full Stack Developer",
      location: "Indore, Madhya Pradesh",
      education: "IIT Indore",
      experience: "3+ Year",
      aiMatch: 88,
      status: "Shortlisted",
      skills: ["React", "Node.js", "MongoDB", "+3"],
      isShortlisted: true,
      profileImage: null,
      interview: {
        scheduled: false,
        date: "",
        time: "",
        type: "",
        duration: "",
        location: "",
        notes: "",
      },
    },
    {
      id: 3,
      name: "Amit Singh",
      role: "Backend Developer",
      location: "Bhopal, Madhya Pradesh",
      education: "NIT Bhopal",
      experience: "4+ Year",
      aiMatch: 92,
      status: "Interviewed",
      skills: ["Python", "Django", "PostgreSQL", "+1"],
      isShortlisted: false,
      profileImage: null,
      interview: {
        scheduled: true,
        date: "2024-01-18",
        time: "14:30",
        type: "in-person",
        duration: "60",
        location: "Office Conference Room A",
        notes: "Technical and behavioral interview",
      },
    },
    {
      id: 4,
      name: "Sneha Patel",
      role: "UI/UX Designer",
      location: "Mumbai, Maharashtra",
      education: "NID Ahmedabad",
      experience: "2+ Year",
      aiMatch: 85,
      status: "Shortlisted",
      skills: ["Figma", "Adobe XD", "Sketch", "+2"],
      isShortlisted: true,
      profileImage: null,
      interview: {
        scheduled: false,
        date: "",
        time: "",
        type: "",
        duration: "",
        location: "",
        notes: "",
      },
    },
  ]);

  const statsData = [
    {
      title: "Total Candidates",
      value: "4",
      icon: <LuUsers size={20} />,
    },
    {
      title: "Shortlisted",
      value: "2",
      icon: <LuUserCheck size={20} />,
    },
    {
      title: "Interviewed",
      value: "1",
      icon: <LuClipboardCheck size={20} />,
    },
    {
      title: "Verified",
      value: "3",
      icon: <LuShield size={20} />,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Shortlisted":
        return "bg-green-100 text-green-800";
      case "Interviewed":
        return "bg-purple-100 text-purple-800";
      case "Verified":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleInvite = (candidateId) => {
    console.log("Invite candidate:", candidateId);
  };

  const handleSchedule = (candidateId) => {
    const candidate = candidates.find(c => c.id === candidateId);
    setSelectedCandidate(candidate);
    setInterviewForm({
      date: candidate.interview.date || "",
      time: candidate.interview.time || "",
      type: candidate.interview.type || "video",
      duration: candidate.interview.duration || "30",
      location: candidate.interview.location || "",
      notes: candidate.interview.notes || "",
    });
    setShowInterviewModal(true);
  };

  const handleSaveInterview = () => {
    if (!selectedCandidate) return;
    
    const updatedCandidates = candidates.map(candidate => {
      if (candidate.id === selectedCandidate.id) {
        return {
          ...candidate,
          interview: {
            scheduled: true,
            date: interviewForm.date,
            time: interviewForm.time,
            type: interviewForm.type,
            duration: interviewForm.duration,
            location: interviewForm.location,
            notes: interviewForm.notes,
          }
        };
      }
      return candidate;
    });
    
    setCandidates(updatedCandidates);
    setShowInterviewModal(false);
    setSelectedCandidate(null);
    setInterviewForm({
      date: "",
      time: "",
      type: "video",
      duration: "30",
      location: "",
      notes: "",
    });
  };

  const handleCancelInterview = () => {
    setShowInterviewModal(false);
    setSelectedCandidate(null);
    setInterviewForm({
      date: "",
      time: "",
      type: "video",
      duration: "30",
      location: "",
      notes: "",
    });
  };

  const handleShortlist = (candidateId) => {
    console.log("Toggle shortlist for candidate:", candidateId);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] p-2">
      {/* Header */}
      <div className="mb-5">
        <h1 className={`text-3xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-6`}>
          InstaMatch Dashboard
        </h1>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <LuSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search candidates"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none ${TAILWIND_COLORS.TEXT_PRIMARY}`}
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            {/* Match Percentage Filter */}
            <div className="relative">
              <select
                value={matchFilter}
                onChange={(e) => setMatchFilter(e.target.value)}
                className={`appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none min-w-[140px] ${TAILWIND_COLORS.TEXT_PRIMARY}`}
              >
                <option value="">Match percentage</option>
                <option value="90-100">90-100%</option>
                <option value="80-89">80-89%</option>
                <option value="70-79">70-79%</option>
                <option value="60-69">60-69%</option>
              </select>
              <LuChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                size={16}
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none min-w-[140px] ${TAILWIND_COLORS.TEXT_PRIMARY}`}
              >
                <option value="">All Candidates</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="interviewed">Interviewed</option>
                <option value="verified">Verified</option>
              </select>
              <LuChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                size={16}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-8">
        <Horizontal4Cards data={statsData} />
      </div>

      {/* Candidate Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            {/* Header with Profile and Status */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-4">
                {/* Profile Image Placeholder */}
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className={`${TAILWIND_COLORS.TEXT_PRIMARY} text-sm font-medium`}>
                    {candidate.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                      {candidate.name}
                    </h3>
                  </div>
                  <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>{candidate.role}</p>
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  candidate.status
                )}`}
              >
                {candidate.status}
              </span>
            </div>
            {/* AI Match Score */}
            <div className="">
              <div className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}>AI Match Score</div>
              <div className="flex items-center gap-2">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[var(--color-secondary)] rounded-full transition-all duration-300"
                    style={{ width: `${candidate.aiMatch}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-[var(--color-secondary)]">
                  {candidate.aiMatch}%
                </span>
              </div>
            </div>

            {/* Location and Education */}
            <div className="flex items-center justify-between mb-4">
              <div className={`flex items-center gap-4 text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
                <div className="flex items-center gap-1">
                  <LuMapPin size={16} />
                  <span>{candidate.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <LuGraduationCap size={16} />
                  <span>{candidate.education}</span>
                </div>
              </div>
              <div className={`flex items-center gap-1 text-sm ${TAILWIND_COLORS.TEXT_MUTED}`}>
                <LuBriefcase size={16} />
                <span>{candidate.experience}</span>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <div className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>Skills</div>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 bg-gray-100 ${TAILWIND_COLORS.TEXT_PRIMARY} rounded-full text-xs font-medium`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Interview Information */}
            {candidate.interview.scheduled && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2 flex items-center gap-2`}>
                  <LuCalendar size={16} className="text-blue-600" />
                  Interview Scheduled
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <LuClock size={14} className={TAILWIND_COLORS.TEXT_MUTED} />
                    <span className={TAILWIND_COLORS.TEXT_MUTED}>
                      {new Date(candidate.interview.date).toLocaleDateString()} at {candidate.interview.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {candidate.interview.type === "video" && <LuVideo size={14} className={TAILWIND_COLORS.TEXT_MUTED} />}
                    {candidate.interview.type === "phone" && <LuPhone size={14} className={TAILWIND_COLORS.TEXT_MUTED} />}
                    {candidate.interview.type === "in-person" && <LuMapPin size={14} className={TAILWIND_COLORS.TEXT_MUTED} />}
                    <span className={TAILWIND_COLORS.TEXT_MUTED}>
                      {candidate.interview.type === "video" ? "Video Call" : 
                       candidate.interview.type === "phone" ? "Phone Call" : "In-Person"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LuClock size={14} className={TAILWIND_COLORS.TEXT_MUTED} />
                    <span className={TAILWIND_COLORS.TEXT_MUTED}>{candidate.interview.duration} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LuMapPin size={14} className={TAILWIND_COLORS.TEXT_MUTED} />
                    <span className={TAILWIND_COLORS.TEXT_MUTED} title={candidate.interview.location}>
                      {candidate.interview.location.length > 20 
                        ? `${candidate.interview.location.substring(0, 20)}...` 
                        : candidate.interview.location}
                    </span>
                  </div>
                </div>
                {candidate.interview.notes && (
                  <div className={`mt-2 text-xs ${TAILWIND_COLORS.TEXT_MUTED}`}>
                    <strong className={TAILWIND_COLORS.TEXT_PRIMARY}>Notes:</strong> {candidate.interview.notes}
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button
                onClick={() => handleInvite(candidate.id)}
                variant="outline"
                size="sm"
                icon={<LuMail size={16} />}
                className="text-sm"
              >
                Invite
              </Button>

              <Button
                onClick={() => handleSchedule(candidate.id)}
                variant="outline"
                size="sm"
                icon={<LuCalendar size={16} />}
                className="text-sm"
              >
                Schedule
              </Button>

              <Button
                onClick={() => handleShortlist(candidate.id)}
                variant={candidate.isShortlisted ? "primary" : "outline"}
                size="sm"
                icon={<LuStar size={16} className={candidate.isShortlisted ? "fill-current" : ""} />}
                className="text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Interview Scheduling Modal */}
      {showInterviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className={`text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                Schedule Interview - {selectedCandidate?.name}
              </h2>
              <button
                onClick={handleCancelInterview}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LuX size={20} className={TAILWIND_COLORS.TEXT_MUTED} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                    Interview Date
                  </label>
                  <input
                    type="date"
                    value={interviewForm.date}
                    onChange={(e) => setInterviewForm({...interviewForm, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                    Interview Time
                  </label>
                  <input
                    type="time"
                    value={interviewForm.time}
                    onChange={(e) => setInterviewForm({...interviewForm, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Interview Type and Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                    Interview Type
                  </label>
                  <select
                    value={interviewForm.type}
                    onChange={(e) => setInterviewForm({...interviewForm, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="video">Video Call</option>
                    <option value="phone">Phone Call</option>
                    <option value="in-person">In-Person</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                    Duration
                  </label>
                  <select
                    value={interviewForm.duration}
                    onChange={(e) => setInterviewForm({...interviewForm, duration: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                  </select>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                  Location / Meeting Link
                </label>
                <input
                  type="text"
                  value={interviewForm.location}
                  onChange={(e) => setInterviewForm({...interviewForm, location: e.target.value})}
                  placeholder={
                    interviewForm.type === "video" 
                      ? "Google Meet link, Zoom link, etc." 
                      : interviewForm.type === "phone" 
                      ? "Phone number" 
                      : "Office address, conference room, etc."
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Notes */}
              <div>
                <label className={`block text-sm font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>
                  Interview Notes
                </label>
                <textarea
                  value={interviewForm.notes}
                  onChange={(e) => setInterviewForm({...interviewForm, notes: e.target.value})}
                  placeholder="Add any specific notes or requirements for this interview..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <Button
                onClick={handleCancelInterview}
                variant="outline"
                className="px-4 py-2"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveInterview}
                variant="primary"
                className="px-4 py-2"
                disabled={!interviewForm.date || !interviewForm.time || !interviewForm.location}
              >
                Schedule Interview
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstaMatch;

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
} from "react-icons/lu";
import { Horizontal4Cards } from "../../../../shared/components/metricCard";

const InstaMatch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [matchFilter, setMatchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const candidates = [
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
    },
  ];

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
    console.log("Schedule interview for candidate:", candidateId);
  };

  const handleShortlist = (candidateId) => {
    console.log("Toggle shortlist for candidate:", candidateId);
  };

  return (
    <div className="min-h-screen bg-[#F6FAFF] p-2">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-3xl font-semibold text-[#0B537D] mb-6">
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
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C9A24] focus:border-transparent outline-none"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            {/* Match Percentage Filter */}
            <div className="relative">
              <select
                value={matchFilter}
                onChange={(e) => setMatchFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-[#5C9A24] focus:border-transparent outline-none min-w-[140px]"
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
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-[#5C9A24] focus:border-transparent outline-none min-w-[140px]"
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
                  <span className="text-gray-500 text-sm font-medium">
                    {candidate.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {candidate.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">{candidate.role}</p>
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
              <div className="text-sm text-gray-600 mb-1">AI Match Score</div>
              <div className="flex items-center gap-2">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#5C9A24] rounded-full transition-all duration-300"
                    style={{ width: `${candidate.aiMatch}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-[#5C9A24]">
                  {candidate.aiMatch}%
                </span>
              </div>
            </div>

            {/* Location and Education */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <LuMapPin size={16} />
                  <span>{candidate.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <LuGraduationCap size={16} />
                  <span>{candidate.education}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <LuBriefcase size={16} />
                <span>{candidate.experience}</span>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-2">Skills</div>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleInvite(candidate.id)}
                className="flex items-center gap-2 p-2 border-2 border-[#5C9A24] font-bold text-[#5C9A24] rounded-md hover:bg-[#4a7c1f] hover:text-white transition-colors text-sm "
              >
                <LuMail size={16} />
                Invite
              </button>

              <button
                onClick={() => handleSchedule(candidate.id)}
                className="flex items-center gap-2 p-2 border-2 border-[#5C9A24] font-bold text-[#5C9A24] rounded-md hover:bg-[#4a7c1f] hover:text-white transition-colors text-sm "
              >
                <LuCalendar size={16} />
                Schedule
              </button>

              <button
                onClick={() => handleShortlist(candidate.id)}
                className={`p-2 rounded-lg transition-colors ${
                  candidate.isShortlisted
                    ? "bg-[#5C9A24] text-white"
                    : "p-2 border-2 border-[#5C9A24] font-bold text-[#5C9A24] rounded-md hover:bg-[#4a7c1f] hover:text-white transition-colors text-sm "
                }`}
              >
                <LuStar
                  size={16}
                  className={candidate.isShortlisted ? "fill-current" : ""}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstaMatch;

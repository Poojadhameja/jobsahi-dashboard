import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  FaBriefcase,
  FaUsers,
  FaCalendarAlt,
  FaEnvelope,
  FaCheck,
  FaTimes,
  FaEllipsisV,
  FaWrench,
  FaDownload,
  FaEye,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaCode,
  FaLanguage,
  FaAward,
} from "react-icons/fa";
import { TradesPieChart } from "../../../shared/components/charts";
import { Horizontal4Cards } from "../../../shared/components/metricCard";
import Calendar from "../../../shared/components/Calendar";
import DataTable from "../../../shared/components/DataTable";
import jsPDF from "jspdf";
import { getMethod } from "../../../service/api"; // adjust path if needed
import service from "../services/serviceUrl"; // your recruiter service file

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(false);

  const [dashboardStats, setDashboardStats] = useState({
    jobs_posted: 0,
    applied_job: 0,
    interview_job: 0,
    interview_completed: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      await fetchDashboardData();
      await fetchInterviewDetails(); // ✅ make sure this is included
      await fetchRecentApplicants();
    };
    fetchData();
  }, []);

  const [interviewDetails, setInterviewDetails] = useState([]);

  // 🔹 Fetch current-month interview details API call
  const fetchInterviewDetails = async () => {
    try {
      const res = await getMethod({ apiUrl: service.getInterviewDetails });
      // console.log("API Response:", res); // 👈 add this temporarily
      if (res?.status && Array.isArray(res.current_month_interviews)) {
        setInterviewDetails(res.current_month_interviews);
      } else {
        setInterviewDetails([]);
      }
    } catch (error) {
      console.error("❌ Error fetching interview details:", error);
      setInterviewDetails([]);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const res = await getMethod({ apiUrl: service.getRecruiterJobs });

      if (res?.status) {
        // Check if dashboard_stats exists, otherwise use dashboard
        const statsData = res.dashboard_stats || res.dashboard || {};

        setDashboardStats({
          jobs_posted: statsData.jobs_posted || 0,
          applied_job: statsData.applied_job || 0,
          interview_job: statsData.interview_job || 0,
          interview_completed: statsData.interview_completed || 0,
        });
      } else {
        console.error("❌ Failed to load dashboard stats:", res);
        // Set fallback data to prevent white screen
        setDashboardStats({
          jobs_posted: 0,
          applied_job: 0,
          interview_job: 0,
          interview_completed: 0,
        });
      }
    } catch (error) {
      console.error("❌ Error fetching dashboard data:", error);
      // Set fallback data to prevent white screen
      setDashboardStats({
        jobs_posted: 0,
        applied_job: 0,
        interview_job: 0,
        interview_completed: 0,
      });
    }
  };

  const fetchRecentApplicants = async () => {
  try {
    const res = await getMethod({ apiUrl: service.getRecentApplications });
    if (res?.status && Array.isArray(res.recent_applicants)) {
      // ✅ Match table keys for DataTable component
      const formatted = res.recent_applicants.map((r, i) => ({
        id: i + 1,
        name: r.candidate_name || "-",
        jobTitle: r.job_title || "-",
        datePosted: r.applied_date || "-",
        status: r.status || "-",
      }));
      setRecentApplicants(formatted);
    } else {
      setRecentApplicants([]);
    }
  } catch (err) {
    console.error("Recent applicants fetch error:", err);
    setRecentApplicants([]);
  }
};

  const metricCardsData = [
    {
      title: "Jobs Posted",
      value: dashboardStats.jobs_posted || 0,
      icon: <FaBriefcase className="w-5 h-5" />,
    },
    {
      title: "Applied Job",
      value: dashboardStats.applied_job || 0,
      icon: <FaUsers className="w-5 h-5" />,
    },
    {
      title: "Interview Scheduled",
      value: dashboardStats.interview_job || 0,
      icon: <FaCalendarAlt className="w-5 h-5" />,
    },
    {
      title: "Interview Completed",
      value: dashboardStats.interview_completed || 0,
      icon: <FaCheck className="w-5 h-5" />,
    },
  ];

  const interviewDetailsData = {
    10: {
      name: "Aarti Nathani",
      jobTitle: "Electrician Apprentice",
      mode: "Offline (Address...)",
      time: "2pm",
      status: "Confirmed",
    },
    17: {
      name: "Pooja Dhameja",
      jobTitle: "Software Developer",
      mode: "Online (Zoom)",
      time: "10am",
      status: "Pending",
    },
    25: {
      name: "Yuvraj Basine",
      jobTitle: "Data Analyst",
      mode: "Offline (Office)",
      time: "3pm",
      status: "Confirmed",
    },
  };

  // State for selected date
  const [selectedDate, setSelectedDate] = useState(10);

  // Pie chart data for trades
  const tradesData = {
    labels: [
      "Civil",
      "Civil",
      "Civil",
      "Civil",
      "Civil",
      "Civil",
      "Civil",
      "Civil",
    ],
    datasets: [
      {
        data: [60, 10, 8, 7, 6, 4, 3, 2],
        backgroundColor: [
          "var(--color-success)", // green
          "var(--color-success)", // light green
          "var(--color-warning)", // orange
          "#FBBF24", // yellow (keeping for contrast)
          "var(--color-primary-light)", // light blue
          "var(--color-primary)", // dark blue
          "#8B5CF6", // purple (keeping for contrast)
          "#EC4899", // pink (keeping for contrast)
        ],
        borderWidth: 0,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  // Total applicants cards
  const applicantCards = [
    {
      title: "Electrician Apprentice",
      applications: "64 Applications",
      newCount: "06 new",
      icon: FaBriefcase,
    },
    {
      title: "Electrician Apprentice",
      applications: "64 Applications",
      newCount: "06 new",
      icon: FaBriefcase,
    },
    {
      title: "Plumber Assistant",
      applications: "42 Applications",
      newCount: "03 new",
      icon: FaWrench,
    },
    {
      title: "Carpenter Helper",
      applications: "38 Applications",
      newCount: "02 new",
      icon: FaBriefcase,
    },
  ];

  // Recent applicants table data
  // const recentApplicants = [
  //   {
  //     id: 1,
  //     name: "Aarti Nathani",
  //     jobTitle: "Electrician Apprentice",
  //     datePosted: "12-05-25",
  //     avatar: "AN",
  //     email: "aarti.nathani@email.com",
  //     phone: "+91 98765 43210",
  //     location: "Mumbai, Maharashtra",
  //     experience: "2 years",
  //     education: "Diploma in Electrical Engineering",
  //     skills: [
  //       "Electrical Wiring",
  //       "Circuit Analysis",
  //       "Safety Protocols",
  //       "Maintenance",
  //     ],
  //     summary:
  //       "Experienced electrician with 2 years of hands-on experience in residential and commercial electrical work. Proficient in electrical wiring, circuit analysis, and safety protocols.",
  //     previousCompany: "ABC Electrical Services",
  //     expectedSalary: "₹25,000 - ₹30,000",
  //     availability: "Immediate",
  //     languages: ["Hindi", "English", "Marathi"],
  //   },
  //   {
  //     id: 2,
  //     name: "Pooja Dhameja",
  //     jobTitle: "Electrician Apprentice",
  //     datePosted: "12-05-25",
  //     avatar: "PD",
  //     email: "pooja.dhameja@email.com",
  //     phone: "+91 98765 43211",
  //     location: "Delhi, NCR",
  //     experience: "1.5 years",
  //     education: "ITI in Electrical",
  //     skills: [
  //       "Electrical Installation",
  //       "Troubleshooting",
  //       "Safety Standards",
  //       "Team Work",
  //     ],
  //     summary:
  //       "Skilled electrician apprentice with 1.5 years of experience in electrical installations and troubleshooting. Strong knowledge of safety standards and excellent team collaboration skills.",
  //     previousCompany: "XYZ Electrical Works",
  //     expectedSalary: "₹20,000 - ₹25,000",
  //     availability: "2 weeks notice",
  //     languages: ["Hindi", "English"],
  //   },
  //   {
  //     id: 3,
  //     name: "Yuvraj Basine",
  //     jobTitle: "Electrician Apprentice",
  //     datePosted: "12-05-25",
  //     avatar: "YB",
  //     email: "yuvraj.basine@email.com",
  //     phone: "+91 98765 43212",
  //     location: "Pune, Maharashtra",
  //     experience: "3 years",
  //     education: "B.Tech in Electrical Engineering",
  //     skills: [
  //       "Industrial Electrical",
  //       "PLC Programming",
  //       "Motor Control",
  //       "Project Management",
  //     ],
  //     summary:
  //       "Experienced electrical engineer with 3 years in industrial electrical systems. Expertise in PLC programming, motor control, and project management.",
  //     previousCompany: "DEF Industrial Solutions",
  //     expectedSalary: "₹35,000 - ₹40,000",
  //     availability: "1 month notice",
  //     languages: ["Hindi", "English", "Marathi"],
  //   },
  //   {
  //     id: 4,
  //     name: "Himanshu Shrirang",
  //     jobTitle: "Electrician Apprentice",
  //     datePosted: "12-05-25",
  //     avatar: "HS",
  //     email: "himanshu.shrirang@email.com",
  //     phone: "+91 98765 43213",
  //     location: "Bangalore, Karnataka",
  //     experience: "2.5 years",
  //     education: "Diploma in Electrical and Electronics",
  //     skills: [
  //       "HVAC Electrical",
  //       "Solar Installation",
  //       "Energy Management",
  //       "Customer Service",
  //     ],
  //     summary:
  //       "Versatile electrician with 2.5 years of experience in HVAC electrical systems and solar installations. Strong focus on energy management and customer satisfaction.",
  //     previousCompany: "GHI Green Energy",
  //     expectedSalary: "₹28,000 - ₹32,000",
  //     availability: "Immediate",
  //     languages: ["Hindi", "English", "Kannada"],
  //   },
  // ];
  const [recentApplicants, setRecentApplicants] = useState([]);

// recent applicants API call
useEffect(() => {
  const fetchRecentApplicants = async () => {
    try {
      const res = await getMethod({
        apiUrl: `${service.getRecentApplications}`,
      });
      if (res?.success || res?.status) {
        setRecentApplicants(res.data || []);
      } else {
        setRecentApplicants([]);
        console.warn('No data found:', res?.message);
      }
    } catch (err) {
      console.error('Error fetching recent applicants:', err);
    }
  };

  fetchRecentApplicants();
}, []);

  // Table configuration
  const tableColumns = [
    { key: "name", header: "Name of applicants" },
    { key: "jobTitle", header: "Job Title" },
    { key: "datePosted", header: "Date of posted" },
  ];

  const tableActions = [
    {
      label: "Accept",
      variant: "success",
      onClick: (row) => console.log("Accept", row),
    },
    {
      label: "Decline",
      variant: "danger",
      onClick: (row) => console.log("Decline", row),
    },
  ];

  // Dropdown handlers
  const handleViewDetails = (row) => {
    setSelectedApplicant(row);
    setShowDetailsModal(true);
  };

  const handleDownloadCV = (row) => {
    // Create new PDF document
    const doc = new jsPDF();

    // Set font
    doc.setFont("helvetica");

    // Title
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("RESUME", 20, 30);

    // Name
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(row.name, 20, 50);

    // Job Title
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(row.jobTitle, 20, 60);

    // Contact Information
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("CONTACT INFORMATION", 20, 80);

    doc.setFont("helvetica", "normal");
    doc.text(`Email: ${row.email}`, 20, 90);
    doc.text(`Phone: ${row.phone}`, 20, 100);
    doc.text(`Location: ${row.location}`, 20, 110);

    // Professional Summary
    doc.setFont("helvetica", "bold");
    doc.text("PROFESSIONAL SUMMARY", 20, 130);

    doc.setFont("helvetica", "normal");
    const summaryLines = doc.splitTextToSize(row.summary, 170);
    doc.text(summaryLines, 20, 140);

    // Education & Experience
    let yPosition = 160 + summaryLines.length * 5;

    doc.setFont("helvetica", "bold");
    doc.text("EDUCATION", 20, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(row.education, 20, yPosition + 10);

    doc.setFont("helvetica", "bold");
    doc.text("EXPERIENCE", 20, yPosition + 25);
    doc.setFont("helvetica", "normal");
    doc.text(`${row.experience} - ${row.previousCompany}`, 20, yPosition + 35);

    // Skills
    yPosition += 60;
    doc.setFont("helvetica", "bold");
    doc.text("SKILLS", 20, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(row.skills.join(", "), 20, yPosition + 10);

    // Languages
    doc.setFont("helvetica", "bold");
    doc.text("LANGUAGES", 20, yPosition + 25);
    doc.setFont("helvetica", "normal");
    doc.text(row.languages.join(", "), 20, yPosition + 35);

    // Additional Information
    yPosition += 50;
    doc.setFont("helvetica", "bold");
    doc.text("ADDITIONAL INFORMATION", 20, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(`Expected Salary: ${row.expectedSalary}`, 20, yPosition + 10);
    doc.text(`Availability: ${row.availability}`, 20, yPosition + 20);
    doc.text(`Application Date: ${row.datePosted}`, 20, yPosition + 30);

    // Save the PDF
    doc.save(`${row.name.replace(" ", "_")}_Resume.pdf`);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedApplicant(null);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-[var(--color-primary)]">
          Hi! Brightorial
        </h1>
      </div>

      {/* Metric Cards */}
      <Horizontal4Cards data={metricCardsData} className="mb-5" />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        {/* Left Column - Calendar and Interview Details */}
        <div className="space-y-4 bg-white rounded-lg border border-[var(--color-primary)3C]">
          {/* Calendar */}
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            interviewDates={[10, 17, 25]}
          />
          {/* Candidate Interview Details */}
          {/* Candidate Interview Details */}
          <div className="">
            <div className="px-5 py-2">
              <h3 className="text-lg font-bold text-[var(--color-primary)]">
                Candidate Interview Details
              </h3>
            </div>

            <div className="flex flex-col h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-4">
              {interviewDetails.length > 0 ? (
                interviewDetails.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 mb-3 bg-[var(--color-bg-primary)] border border-[var(--color-primary)3C] rounded-lg shadow-sm"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">
                        Name:
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {item.name}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">
                        Job Title:
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {item.job_title}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">
                        Mode:
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {item.mode}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">
                        Date:
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {item.date}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">
                        Time:
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {item.time}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">
                        Status:
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {item.status}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">
                        Admin Action:
                      </span>
                      <span
                        className={`text-sm font-semibold ${
                          item.admin_action === "Approved"
                            ? "text-green-600"
                            : item.admin_action === "Pending"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {item.admin_action}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-3">
                    <FaCalendarAlt className="text-4xl mx-auto" />
                  </div>
                  <p className="text-gray-500 text-sm font-medium">
                    No interviews scheduled for this month
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    When interviews are scheduled, they’ll appear here
                    automatically.
                  </p>
                </div>
              )}
            </div>
          </div>{" "}
        </div>

        {/* Right Column - Trades Chart */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-lg border border-[var(--color-primary)3C] p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Total applicants this week by trades wise
              </h3>
              <span className="text-sm text-gray-500">Nov, 01-07</span>
            </div>

            <TradesPieChart />
          </div>

          {/* Total Applicants Section */}
          <div className="bg-white rounded-lg border border-[var(--color-primary)3C] p-6">
            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-6">
              Total Applicants
            </h3>

            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {applicantCards.map((card, index) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={index}
                    className="bg-[var(--color-bg-primary)] border border-[var(--color-primary)3C] rounded-lg p-4 min-w-[280px] flex-shrink-0"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="text-gray-600 text-sm" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-700 text-sm mb-1">
                          {card.title}
                        </h4>
                        <div className="flex items-baseline space-x-2">
                          <span className="text-2xl font-bold text-gray-700">
                            {card.applications.split(" ")[0]}
                          </span>
                          <span className="text-sm text-gray-500">
                            Aplications
                          </span>
                        </div>
                      </div>
                      <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {card.newCount}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}

      {/* Recent Applicants Table */}
      <DataTable
  title="Recent Applicants"
  columns={tableColumns}
  data={recentApplicants}
  actions={tableActions}
  onViewDetails={(row) => handleViewDetails(row)}
  onDownloadCV={handleDownloadCV}
/>

      {/* </div> */}

      {/* Applicant Details Modal */}
      {showDetailsModal && selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
            {/* Fixed Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-2xl font-bold text-[var(--color-primary)]">
                Applicant Details
              </h2>
              <button
                onClick={closeDetailsModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Basic Information */}
              <div className="flex items-start space-x-6 mb-8">
                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-gray-600">
                    {selectedApplicant.avatar}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedApplicant.name}
                  </h3>
                  <p className="text-lg text-gray-600 mb-4">
                    {selectedApplicant.jobTitle}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <FaEnvelope className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">
                        {selectedApplicant.email}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaPhone className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">
                        {selectedApplicant.phone}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaMapMarkerAlt className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">
                        {selectedApplicant.location}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaBriefcase className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">
                        {selectedApplicant.experience}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Professional Summary
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {selectedApplicant.summary}
                </p>
              </div>

              {/* Education & Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <FaGraduationCap className="w-5 h-5 mr-2 text-blue-600" />
                    Education
                  </h4>
                  <p className="text-gray-700">{selectedApplicant.education}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <FaBriefcase className="w-5 h-5 mr-2 text-green-600" />
                    Previous Company
                  </h4>
                  <p className="text-gray-700">
                    {selectedApplicant.previousCompany}
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <FaCode className="w-5 h-5 mr-2 text-purple-600" />
                  Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedApplicant.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <FaLanguage className="w-5 h-5 mr-2 text-orange-600" />
                  Languages
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedApplicant.languages.map((language, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              {/* Additional Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-1">
                    Expected Salary
                  </h4>
                  <p className="text-gray-900 font-medium">
                    {selectedApplicant.expectedSalary}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-1">
                    Availability
                  </h4>
                  <p className="text-gray-900 font-medium">
                    {selectedApplicant.availability}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-1">
                    Application Date
                  </h4>
                  <p className="text-gray-900 font-medium">
                    {selectedApplicant.datePosted}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  onClick={() => handleDownloadCV(selectedApplicant)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaDownload className="w-4 h-4" />
                  <span>Download CV</span>
                </button>
                <button
                  onClick={closeDetailsModal}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

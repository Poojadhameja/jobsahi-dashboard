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
  FaDownload,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaCode,
  FaLanguage,
} from "react-icons/fa";
import { Horizontal4Cards } from "../../../shared/components/metricCard";
import Calendar from "../../../shared/components/Calendar";
import DataTable from "../../../shared/components/DataTable";
import jsPDF from "jspdf";
import { getMethod } from "../../../service/api";
import service from "../services/serviceUrl";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  // ---------- STATES ----------
  const [dashboardStats, setDashboardStats] = useState({
    jobs_posted: 0,
    applied_job: 0,
    interview_job: 0,
    interview_completed: 0,
  });
  const [interviewDetails, setInterviewDetails] = useState([]);
  const [interviewDates, setInterviewDates] = useState([]);
  const [recentApplicants, setRecentApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [tradesData, setTradesData] = useState({ labels: [], datasets: [] });
  const [applicantCards, setApplicantCards] = useState([]);
  const [weekRange, setWeekRange] = useState("");
  const [selectedDate, setSelectedDate] = useState(10);

  // ---------- FETCH ALL DATA ----------
  useEffect(() => {
    (async () => {
      await fetchDashboardData();
      await fetchInterviewDetails();
      await fetchWeeklyApplicants();
      await fetchRecentApplicants();
    })();
  }, []);

  // ---------- API CALLS ----------
  // const fetchDashboardData = async () => {
  //   try {
  //     const res = await getMethod({ apiUrl: service.getRecruiterJobs });
  //     if (res?.status) {
  //       const statsData = res.dashboard_stats || res.dashboard || {};
  //       setDashboardStats({
  //         jobs_posted: statsData.jobs_posted || 0,
  //         applied_job: statsData.applied_job || 0,
  //         interview_job: statsData.interview_job || 0,
  //         interview_completed: statsData.interview_completed || 0,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error fetching dashboard data:", error);
  //   }
  // };

  // const fetchInterviewDetails = async () => {
  //   try {
  //     const res = await getMethod({ apiUrl: service.getInterviewDetails });
  //     if (res?.status) {
  //       const dataArr = Array.isArray(res.current_month_interviews)
  //         ? res.current_month_interviews
  //         : res.candidate_interview_details
  //         ? [res.candidate_interview_details]
  //         : [];

  //       setInterviewDetails(dataArr);

  //       const dates = dataArr
  //         .map((item) => {
  //           if (item.scheduled_at) {
  //             const d = new Date(item.scheduled_at);
  //             return d.getDate();
  //           }
  //           return null;
  //         })
  //         .filter(Boolean);
  //       setInterviewDates(dates);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching interview details:", error);
  //   }
  // };

  // const fetchWeeklyApplicants = async () => {
  //   try {
  //     const res = await getMethod({ apiUrl: service.getWeeklyApplicants });
  //     if (res?.status) {
  //       const chartLabels = res.chart_data.map((item) => item.trade);
  //       const chartValues = res.chart_data.map(
  //         (item) => item.total_applications
  //       );

  //       const colors = [
  //         "#22c55e",
  //         "#f97316",
  //         "#3b82f6",
  //         "#8b5cf6",
  //         "#eab308",
  //         "#ec4899",
  //         "#10b981",
  //         "#6366f1",
  //         "#f59e0b",
  //         "#ef4444",
  //         "#0ea5e9",
  //       ];

  //       setTradesData({
  //         labels: chartLabels,
  //         datasets: [
  //           {
  //             data: chartValues,
  //             backgroundColor: colors.slice(0, chartLabels.length),
  //             borderWidth: 0,
  //           },
  //         ],
  //       });

  //       const cards = res.weekly_applicants.map((item) => ({
  //         title: item.job_title,
  //         trade: item.trade,
  //         applications: `${item.total_applications} Applications`,
  //         newCount: `${item.new_applications} new`,
  //       }));
  //       setApplicantCards(cards);
  //       setWeekRange(`${res.date_range.start} - ${res.date_range.end}`);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching weekly applicants:", error);
  //   }
  // };

  // const fetchRecentApplicants = async () => {
  //   try {
  //     const res = await getMethod({ apiUrl: service.getRecentApplications });
  //     if (res?.status && Array.isArray(res.recent_applicants)) {
  //       const formatted = res.recent_applicants.map((r, i) => ({
  //         id: i + 1,
  //         name: r.candidate_name || "-",
  //         jobTitle: r.job_title || "-",
  //         datePosted: r.applied_date || "-",
  //       }));
  //       setRecentApplicants(formatted);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching recent applicants:", error);
  //   }
  // };
  // ----------- CACHE DURATION (optional, 30 mins) ------------
const CACHE_DURATION = 30 * 60 * 1000;

// 1️⃣ FETCH DASHBOARD DATA (with cache)
const fetchDashboardData = async () => {
  const cached = localStorage.getItem("dashboard_stats");
  const cachedTime = localStorage.getItem("dashboard_stats_time");

  if (cached && cachedTime && Date.now() - cachedTime < CACHE_DURATION) {
    setDashboardStats(JSON.parse(cached));
    console.log("✅ Loaded dashboard data from cache");
    return;
  }

  try {
    const res = await getMethod({ apiUrl: service.getRecruiterJobs });
    if (res?.status) {
      const statsData = res.dashboard_stats || res.dashboard || {};
      const dataToSave = {
        jobs_posted: statsData.jobs_posted || 0,
        applied_job: statsData.applied_job || 0,
        interview_job: statsData.interview_job || 0,
        interview_completed: statsData.interview_completed || 0,
      };
      setDashboardStats(dataToSave);
      localStorage.setItem("dashboard_stats", JSON.stringify(dataToSave));
      localStorage.setItem("dashboard_stats_time", Date.now());
      console.log("📡 Fetched dashboard data from API");
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
};

// 2️⃣ FETCH INTERVIEW DETAILS (with cache)
const fetchInterviewDetails = async () => {
  const cached = localStorage.getItem("interview_details");
  const cachedTime = localStorage.getItem("interview_details_time");

  if (cached && cachedTime && Date.now() - cachedTime < CACHE_DURATION) {
    const data = JSON.parse(cached);
    setInterviewDetails(data.details);
    setInterviewDates(data.dates);
    console.log("✅ Loaded interview details from cache");
    return;
  }

  try {
    const res = await getMethod({ apiUrl: service.getInterviewDetails });
    if (res?.status) {
      const dataArr = Array.isArray(res.current_month_interviews)
        ? res.current_month_interviews
        : res.candidate_interview_details
        ? [res.candidate_interview_details]
        : [];

      setInterviewDetails(dataArr);

      const dates = dataArr
        .map((item) => {
          if (item.scheduled_at) {
            const d = new Date(item.scheduled_at);
            return d.getDate();
          }
          return null;
        })
        .filter(Boolean);
      setInterviewDates(dates);

      localStorage.setItem(
        "interview_details",
        JSON.stringify({ details: dataArr, dates })
      );
      localStorage.setItem("interview_details_time", Date.now());
      console.log("📡 Fetched interview details from API");
    }
  } catch (error) {
    console.error("Error fetching interview details:", error);
  }
};

// 3️⃣ FETCH WEEKLY APPLICANTS (with cache)
const fetchWeeklyApplicants = async () => {
  const cached = localStorage.getItem("weekly_applicants");
  const cachedTime = localStorage.getItem("weekly_applicants_time");

  if (cached && cachedTime && Date.now() - cachedTime < CACHE_DURATION) {
    const data = JSON.parse(cached);
    setTradesData(data.tradesData);
    setApplicantCards(data.applicantCards);
    setWeekRange(data.weekRange);
    console.log("✅ Loaded weekly applicants from cache");
    return;
  }

  try {
    const res = await getMethod({ apiUrl: service.getWeeklyApplicants });
    if (res?.status) {
      const chartLabels = res.chart_data.map((item) => item.trade);
      const chartValues = res.chart_data.map(
        (item) => item.total_applications
      );

      const colors = [
        "#22c55e",
        "#f97316",
        "#3b82f6",
        "#8b5cf6",
        "#eab308",
        "#ec4899",
        "#10b981",
        "#6366f1",
        "#f59e0b",
        "#ef4444",
        "#0ea5e9",
      ];

      const tradesData = {
        labels: chartLabels,
        datasets: [
          {
            data: chartValues,
            backgroundColor: colors.slice(0, chartLabels.length),
            borderWidth: 0,
          },
        ],
      };

      const cards = res.weekly_applicants.map((item) => ({
        title: item.job_title,
        trade: item.trade,
        applications: `${item.total_applications} Applications`,
        newCount: `${item.new_applications} new`,
      }));

      const weekRange = `${res.date_range.start} - ${res.date_range.end}`;

      setTradesData(tradesData);
      setApplicantCards(cards);
      setWeekRange(weekRange);

      localStorage.setItem(
        "weekly_applicants",
        JSON.stringify({ tradesData, applicantCards: cards, weekRange })
      );
      localStorage.setItem("weekly_applicants_time", Date.now());
      console.log("📡 Fetched weekly applicants from API");
    }
  } catch (error) {
    console.error("Error fetching weekly applicants:", error);
  }
};

// 4️⃣ FETCH RECENT APPLICANTS (with cache)
const fetchRecentApplicants = async () => {
  const cached = localStorage.getItem("recent_applicants");
  const cachedFull = localStorage.getItem("recent_applicants_full");
  const cachedTime = localStorage.getItem("recent_applicants_time");

  if (
    cached &&
    cachedFull &&
    cachedTime &&
    Date.now() - cachedTime < CACHE_DURATION
  ) {
    setRecentApplicants(JSON.parse(cached));
    console.log("✅ Loaded recent applicants from cache");
    return;
  }

  try {
    const res = await getMethod({ apiUrl: service.getRecentApplications });

    if (res?.status) {
      // 🔹 1️⃣ Table data (simple version)
      const formatted = (res.recent_applicants || []).map((r, i) => ({
        id: i + 1,
        name: r.candidate_name || "-",
        jobTitle: r.job_title || "-",
        datePosted: r.applied_date || "-",
        status: r.status || "-",
      }));

      // 🔹 2️⃣ Full details (modal version)
      const detailed =
        Array.isArray(res.all_applicants?.data) &&
        res.all_applicants.data.map((a) => ({
          id: a.application_id,
          name: a.name,
          email: a.email,
          education: a.education,
          applied_for: a.applied_for,
          status: a.status,
          verified: a.verified,
          location: a.location,
          job_type: a.job_type,
          skills: Array.isArray(a.skills) ? a.skills : [],
          experience: (() => {
            try {
              return JSON.parse(a.experience || "[]");
            } catch {
              return [];
            }
          })(),
        }));

      // 🔹 3️⃣ Update States
      setRecentApplicants(formatted);

      // 🔹 4️⃣ Save to Cache
      localStorage.setItem("recent_applicants", JSON.stringify(formatted));
      localStorage.setItem("recent_applicants_full", JSON.stringify(detailed));
      localStorage.setItem("recent_applicants_time", Date.now());
      console.log("📡 Fetched recent applicants from API and cached");
    } else {
      setRecentApplicants([]);
    }
  } catch (error) {
    console.error("Error fetching recent applicants:", error);
  }
};


  // ---------- TABLE CONFIG ----------
  const tableColumns = [
    { key: "name", header: "Name of applicants" },
    { key: "jobTitle", header: "Job Title" },
    { key: "datePosted", header: "Date of posted" },
  ];

 const tableActions = [
  {
    label: "View",
    variant: "info",
    onClick: (row) => {
      // Find detailed info for this candidate
      const fullData = JSON.parse(localStorage.getItem("recent_applicants_full") || "[]");
      const match = fullData.find(
        (a) => a.name === row.name && a.applied_for === row.jobTitle
      );
      if (match) {
        setSelectedApplicant(match);
        setShowApplicantModal(true);
      } else {
        alert("Detailed data not found for this applicant!");
      }
    },
  },
  { label: "Accept", variant: "success", onClick: (row) => console.log(row) },
  { label: "Decline", variant: "danger", onClick: (row) => console.log(row) },
];


  // ---------- DOWNLOAD CV ----------
  const handleDownloadCV = (row) => {
    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.setFontSize(20).text("RESUME", 20, 30);
    doc.setFontSize(16).text(row.name || "", 20, 50);
    doc.setFontSize(12).text(row.jobTitle || "", 20, 60);
    doc.save(`${row.name?.replace(" ", "_")}_Resume.pdf`);
  };

  // ---------- METRIC CARDS ----------
  const metricCardsData = [
    {
      title: "Jobs Posted",
      value: dashboardStats.jobs_posted,
      icon: <FaBriefcase />,
    },
    {
      title: "Applied Job",
      value: dashboardStats.applied_job,
      icon: <FaUsers />,
    },
    {
      title: "Interview Scheduled",
      value: dashboardStats.interview_job,
      icon: <FaCalendarAlt />,
    },
    {
      title: "Interview Completed",
      value: dashboardStats.interview_completed,
      icon: <FaCheck />,
    },
  ];

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

      {/* Calendar + Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Left: Calendar + Interview Details */}
        <div className="bg-white rounded-xl border border-[var(--color-primary)3C] p-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Calendar
              variant="recruiter"
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              interviewDates={interviewDates}
              className="w-full max-w-[320px]"
            />

            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-[var(--color-primary)] mb-3 text-center lg:text-left">
                Candidate Interview Details
              </h3>

              <div className="flex-1 h-64 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {interviewDetails.length > 0 ? (
                  interviewDetails.map((item, i) => (
                    <div
                      key={i}
                      className="p-3 bg-[var(--color-bg-primary)] border border-[var(--color-primary)3C] rounded-lg shadow-sm"
                    >
                      <div className="grid grid-cols-2 gap-x-2 text-xs sm:text-sm">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-semibold">{item.name}</span>

                        <span className="text-gray-600">Job Title:</span>
                        <span className="font-semibold">{item.job_title}</span>

                        <span className="text-gray-600">Mode:</span>
                        <span className="font-semibold">{item.mode}</span>

                        <span className="text-gray-600">Location:</span>
                        <span className="font-semibold">{item.location}</span>

                        <span className="text-gray-600">Time:</span>
                        <span className="font-semibold">{item.time}</span>

                        <span className="text-gray-600">Date:</span>
                        <span className="font-semibold">
                          {item.scheduled_at}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-400 text-sm">
                    <FaCalendarAlt className="text-3xl mx-auto mb-2" />
                    No interviews scheduled for this month
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Chart + Applicants */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          {/* Pie Chart */}
          <div className="bg-white rounded-xl border border-[var(--color-primary)3C] p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
              <h3 className="text-lg font-semibold text-gray-900 text-center sm:text-left">
                Total applicants this week by trades
              </h3>
              <span className="text-sm text-gray-500 text-center sm:text-right">
                {weekRange || "—"}
              </span>
            </div>

            <div className="h-[320px]">
              {tradesData.labels.length > 0 ? (
                <Pie
                  data={tradesData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: true,
                        position: "right",
                        labels: { usePointStyle: true, color: "#374151" },
                      },
                      tooltip: {
                        callbacks: {
                          label: (ctx) =>
                            `${ctx.label}: ${ctx.parsed} applicants`,
                        },
                      },
                    },
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
                  <FaUsers className="text-4xl mb-2" />
                  No applicant data available
                </div>
              )}
            </div>
          </div>

          {/* Applicants Cards */}
          <div className="bg-white rounded-xl border border-[var(--color-primary)3C] p-6">
            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-6">
              Total Applicants
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {applicantCards.length > 0 ? (
                applicantCards.map((card, i) => (
                  <div
                    key={i}
                    className="bg-[var(--color-bg-primary)] border border-[var(--color-primary)3C] rounded-lg p-4 min-w-[260px] flex-shrink-0"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-lg flex items-center justify-center">
                        <FaBriefcase className="text-gray-600 text-sm" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-700 text-sm mb-1 truncate">
                          {card.title}
                        </h4>
                        <p className="text-xs text-gray-500 mb-1">
                          {card.trade}
                        </p>
                        <div className="flex items-baseline space-x-2">
                          <span className="text-2xl font-bold text-gray-700">
                            {card.applications.split(" ")[0]}
                          </span>
                          <span className="text-sm text-gray-500">
                            Applications
                          </span>
                        </div>
                      </div>
                      <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                        {card.newCount}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 text-sm w-full py-8">
                  No applicant data available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Applicants Table */}
      <DataTable
        title="Recent Applicants"
        columns={tableColumns}
        data={recentApplicants}
        actions={tableActions}
        onDownloadCV={handleDownloadCV}
      />
    </div>
  );
};

export default Dashboard;

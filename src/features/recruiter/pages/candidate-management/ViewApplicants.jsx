import React, { useState, useEffect } from "react";
import {
  LuSearch,
  LuDownload,
  LuArrowRight,
  LuMessageCircle,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import CustomDataTable from "./CustomDataTable";
import ViewDetailsModal from "./ViewDetailsModal";
import { TAILWIND_COLORS } from "../../../../shared/WebConstant";
import {
  Button,
  NeutralButton,
} from "../../../../shared/components/Button";
import { getMethod } from "../../../../service/api";
import apiService from "../../services/serviceUrl";
import * as XLSX from "xlsx"; // ✅ Excel export library

const ViewApplicants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Prevent background scroll when modal is open
  useEffect(() => {
    if (isViewModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [isViewModalOpen]);

  // ✅ Fetch applicants from API
  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      try {
        const res = await getMethod({ apiUrl: apiService.getRecentApplicants });

        if (res?.status && Array.isArray(res?.all_applicants?.data)) {
          const formatted = res.all_applicants.data.map((item, i) => ({
            id: item.application_id || i + 1,
            name: item.name || "N/A",
            email: item.email || "N/A",
            phone_number: item.phone_number || "—",
            qualification: item.education || "—",
            skills: Array.isArray(item.skills)
              ? item.skills.join(", ")
              : typeof item.skills === "string"
              ? item.skills
              : "",
            bio: item.bio || "—",
            appliedFor: item.applied_for || "—",
            applied_date: item.applied_date || "—",
            status: item.status || "Pending",
            verified: item.verified ? "Yes" : "No",
            location: item.location || "—",
            experience: item.experience || "—",
            jobType: item.job_type || "Full-time",
            resume_url: item.resume_url || null,
            portfolio_link: item.portfolio_link || null,
            cover_letter: item.cover_letter || "—",
            actions: {
              view: true,
              downloadCV: true,
              delete: true,
              reject: true,
            },
          }));

          setApplicants(formatted);
          setFilteredApplicants(formatted);
        } else {
          setApplicants([]);
          setFilteredApplicants([]);
        }
      } catch (err) {
        console.error("❌ Error fetching applicants:", err);
        setApplicants([]);
        setFilteredApplicants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  // ✅ Search Functionality
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredApplicants(applicants);
      return;
    }

    const lowerSearch = searchTerm.toLowerCase();
    const filtered = applicants.filter((app) =>
      [
        app.name,
        app.email,
        app.phone_number,
        app.appliedFor,
        app.qualification,
        app.skills,
      ]
        .join(" ")
        .toLowerCase()
        .includes(lowerSearch)
    );

    setFilteredApplicants(filtered);
  }, [searchTerm, applicants]);

  // ✅ Export all applicants to Excel
  const handleExportAll = () => {
    if (!filteredApplicants.length) {
      alert("No applicant data to export.");
      return;
    }

    const exportData = filteredApplicants.map((app) => ({
      Name: app.name,
      Email: app.email,
      Phone: app.phone_number,
      Qualification: app.qualification,
      Skills: app.skills,
      Experience: app.experience,
      Applied_For: app.appliedFor,
      Applied_Date: app.applied_date,
      Status: app.status,
      Location: app.location,
      Job_Type: app.jobType,
      Resume_URL: app.resume_url || "—",
      Portfolio_Link: app.portfolio_link || "—",
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Applicants");

    XLSX.writeFile(wb, "Applicants_List.xlsx");
  };

  // ---------------- ACTIONS ----------------
  const handleViewDetails = (row) => {
    setSelectedCandidate(row);
    setIsViewModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsViewModalOpen(false);
    setSelectedCandidate(null);
  };

  const handleDownloadCV = (row) => {
    const candidateData = `
      Candidate Information
      ====================
      Name: ${row.name}
      Email: ${row.email}
      Phone: ${row.phone_number || "Not provided"}
      Location: ${row.location || "Not provided"}
      Qualification: ${row.qualification}
      Experience: ${row.experience || "Not provided"}
      Skills: ${row.skills}
      Applied For: ${row.appliedFor}
      Applied Date: ${row.applied_date || "Not provided"}
      Status: ${row.status}
    `.trim();

    const blob = new Blob([candidateData], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${row.name.replace(/\s+/g, "_")}_CV.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleDelete = (row) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${row.name}?`);
    if (confirmed) {
      setApplicants((prev) => prev.filter((a) => a.id !== row.id));
      setFilteredApplicants((prev) => prev.filter((a) => a.id !== row.id));
    }
  };

  const handleReject = (row) => {
    setApplicants((prev) =>
      prev.map((a) =>
        a.id === row.id ? { ...a, status: "Rejected" } : a
      )
    );
    setFilteredApplicants((prev) =>
      prev.map((a) =>
        a.id === row.id ? { ...a, status: "Rejected" } : a
      )
    );
  };

  const totalRecords = filteredApplicants.length;
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = Math.min(startIndex + recordsPerPage, totalRecords);
  const paginatedApplicants = filteredApplicants.slice(startIndex, endIndex);

  // ---------------- RENDER ----------------
  return (
    <div className="h-screen overflow-hidden bg-[var(--color-bg-primary)] p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-3xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
          View Applicants
        </h1>

        <Button
          onClick={handleExportAll}
          variant="primary"
          size="lg"
          icon={<LuDownload size={20} />}
        >
          EXPORT ALL
        </Button>
      </div>

      {/* Search */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <LuSearch
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${TAILWIND_COLORS.TEXT_MUTED}`}
            size={20}
          />
          <input
            type="text"
            placeholder="Search candidates by name, email, job, or skills"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Data Table */}
      <CustomDataTable
        title=""
        data={paginatedApplicants}
        showHeader={false}
        onViewDetails={handleViewDetails}
        onDownloadCV={handleDownloadCV}
        onDelete={handleDelete}
        onReject={handleReject}
      />

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
          Showing {startIndex + 1}–{endIndex} of {totalRecords} applicants
        </div>

        <div className="flex items-center gap-2">
          <NeutralButton
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            size="sm"
            icon={<LuChevronLeft size={16} />}
          >
            Previous
          </NeutralButton>

          {[1, 2, 3, 4].map((page) =>
            currentPage === page ? (
              <Button
                key={page}
                onClick={() => setCurrentPage(page)}
                variant="primary"
                size="sm"
              >
                {page}
              </Button>
            ) : (
              <NeutralButton
                key={page}
                onClick={() => setCurrentPage(page)}
                size="sm"
              >
                {page}
              </NeutralButton>
            )
          )}

          <NeutralButton
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={endIndex >= totalRecords}
            size="sm"
            iconRight={<LuChevronRight size={16} />}
          >
            Next
          </NeutralButton>
        </div>
      </div>

      {/* View Details Modal */}
      <ViewDetailsModal
        isOpen={isViewModalOpen}
        onClose={handleCloseModal}
        candidate={selectedCandidate}
      />
    </div>
  );
};

export default ViewApplicants;

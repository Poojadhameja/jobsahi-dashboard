import React, { useState, useEffect } from "react";
import {
  LuFileText,
  LuUser,
  LuPhone,
  LuMail,
  LuDownload,
  LuGraduationCap,
  LuAward,
} from "react-icons/lu";
import { TAILWIND_COLORS } from "../../../../shared/WebConstant";
import { getMethod, postMethod } from "../../../../service/api";
import apiService from "../../services/serviceUrl.js";

function CertificateGeneration() {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCertificates, setGeneratedCertificates] = useState([]);

  // ✅ Fetch all nested data once
  useEffect(() => {
    const fetchData = async () => {
      try {
        const nestedRes = await getMethod({
          apiUrl: apiService.CourseBatchStudents, // ✅ fixed key name
        });
        console.log("📘 Nested data:", nestedRes);

        if (nestedRes?.status && Array.isArray(nestedRes.data)) {
          const formattedCourses = nestedRes.data.map((course) => ({
            id: course.course_id,
            title: course.course_name,
            batches: course.batches || [],
          }));
          setCourses(formattedCourses);
        } else {
          console.warn("⚠️ Invalid nested response:", nestedRes);
          setCourses([]);
        }
      } catch (err) {
        console.error("❌ Error fetching nested data:", err);
        setCourses([]);
      }
    };
    fetchData();
  }, []);

  // ✅ Select course
  const onCourseChange = (e) => {
    const cid = e.target.value;
    setSelectedCourse(cid);
    setSelectedBatch("");
    setStudents([]);

    const selected = courses.find((c) => String(c.id) === cid);
    setBatches(selected?.batches || []);
  };

  // ✅ Select batch
  const onBatchChange = (e) => {
    const bid = e.target.value;
    setSelectedBatch(bid);

    const course = courses.find(
      (c) => String(c.id) === String(selectedCourse)
    );
    const batchObj = course?.batches?.find(
      (b) => String(b.batch_id) === String(bid)
    );

    let mappedStudents = (batchObj?.students || []).map((s) => ({
      id: s.student_id,
      name: s.name,
      email: s.email,
      phone: s.phone_number,
      enrollmentId: s.student_id,
    }));

    // ✅ Remove duplicates (sometimes API sends same student twice)
    mappedStudents = mappedStudents.filter(
      (v, i, a) => a.findIndex((t) => t.id === v.id) === i
    );

    setStudents(mappedStudents);
  };

  // ✅ Toggle selection
  const toggleStudentSelect = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  // ✅ Generate certificates
  const handleGenerateCertificate = async () => {
    if (!selectedCourse || !selectedBatch || !completionDate) {
      alert("Please fill in all required fields (Course, Batch, Date)");
      return;
    }

    if (selectedStudents.length === 0) {
      alert("Please select at least one student!");
      return;
    }

    setIsGenerating(true);
    try {
      const results = [];

      for (const studentId of selectedStudents) {
        const payload = {
          student_id: parseInt(studentId),
          course_id: parseInt(selectedCourse),
          issue_date: completionDate,
        };

        console.log("📤 Sending:", payload);

        const res = await postMethod({
          apiUrl: apiService.generateCertificate,
          payload,
        });

        console.log("📩 Response:", res);

        if (res?.status) {
          results.push(res.data);
        } else {
          console.warn(
            `⚠️ Certificate not generated for ${studentId}: ${res?.message}`
          );
        }
      }

      if (results.length > 0) {
        alert(`🎉 ${results.length} certificates generated successfully!`);
        setGeneratedCertificates(results);
      } else {
        alert("⚠️ No new certificates generated.");
      }
    } catch (err) {
      console.error("❌ Certificate generation failed:", err);
      alert("An unexpected error occurred. Check console logs.");
    } finally {
      setIsGenerating(false);
    }
  };

  // ✅ Download certificate
  const handleDownloadCertificate = async (certificateId) => {
    try {
      const res = await getMethod({
        apiUrl: `${apiService.getCertificateById}?id=${certificateId}`,
      });

      if (res?.status && res?.data?.certificate_info?.file_url) {
        window.open(res.data.certificate_info.file_url, "_blank");
      } else {
        alert("Certificate file not found or not available!");
      }
    } catch (err) {
      console.error("❌ Error fetching certificate details:", err);
      alert("Failed to download certificate");
    }
  };

  return (
    <div className="space-y-6">
      {/* Certificate Generation */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-1`}>
          Certificate Generation
        </h3>
        <p className={`text-sm ${TAILWIND_COLORS.TEXT_MUTED} mb-6`}>
          Preview of the generated certificate
        </p>

        {/* Basic Info */}
        <div className="mb-8">
          <h4 className={`text-md font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}>
            Basic Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Course */}
            <div>
              <label className="block text-sm font-medium mb-2">SELECT COURSE</label>
              <select
                value={selectedCourse}
                onChange={onCourseChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Choose a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Batch */}
            <div>
              <label className="block text-sm font-medium mb-2">SELECT BATCH</label>
              <select
                value={selectedBatch}
                onChange={onBatchChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Choose a batch</option>
                {batches.map((batch) => (
                  <option key={batch.batch_id} value={batch.batch_id}>
                    {batch.batch_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium mb-2">COMPLETION DATE</label>
              <input
                type="date"
                value={completionDate}
                onChange={(e) => setCompletionDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Students */}
        <div className="mb-6">
          <h4 className="text-md font-medium mb-4">Student in Batch</h4>
          <div className="space-y-3">
            {students.map((student) => (
              <div
                key={`${student.id}-${student.email || student.phone}`}
                className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(student.id)}
                  onChange={() => toggleStudentSelect(student.id)}
                  className="mr-4 w-5 h-5 text-green-600 rounded focus:ring-green-500"
                />
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                  <LuUser className="h-6 w-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-gray-800">{student.name}</h5>
                  <p className="text-sm text-gray-500">
                    Enrollment ID: {student.enrollmentId}
                  </p>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <LuPhone className="h-4 w-4 mr-1" />
                    {student.phone || "-"}
                  </div>
                  <div className="flex items-center">
                    <LuMail className="h-4 w-4 mr-1" />
                    {student.email || "-"}
                  </div>
                </div>
              </div>
            ))}
            {!students.length && (
              <div className="text-sm text-gray-500">
                No students to show. Select a course & batch.
              </div>
            )}
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-center">
          <button
            onClick={handleGenerateCertificate}
            disabled={isGenerating || !students.length}
            className={`px-6 py-3 rounded-lg flex items-center space-x-2 text-white ${
              isGenerating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            <LuFileText className="h-5 w-5" />
            <span>{isGenerating ? "Generating..." : "Generate Certificate"}</span>
          </button>
        </div>
      </div>

      {/* Certificate Preview */}
      {/* Certificate Preview */}
<div className="bg-white rounded-lg border border-gray-200 p-6">
  <h3 className="text-lg font-semibold mb-1 text-gray-800">
    Certificate Preview
  </h3>
  <p className="text-sm text-gray-500 mb-6">
    Preview of the generated certificate
  </p>

  {selectedStudents.length > 0 ? (
    selectedStudents.map((studentId) => {
      const student = students.find((s) => s.id === studentId);
      const course = courses.find((c) => String(c.id) === String(selectedCourse));
      if (!student) return null;

      return (
        <div
          key={studentId}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 bg-gradient-to-br from-blue-50 to-indigo-50"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <LuAward className="h-6 w-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-gray-400 rounded-lg flex items-center justify-center">
              <LuGraduationCap className="h-6 w-6 text-white" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold italic mb-4 text-gray-800">
              Certificate of Completion
            </h1>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Upon successful completion of the course, participants will receive
              a Certificate of Completion, recognizing their achievement and
              confirming that they have acquired the essential skills and
              knowledge outlined in the curriculum.
            </p>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {student.name}
            </h2>
            <p className="text-lg text-gray-700 uppercase tracking-wide">
              {course?.title || "Selected Course"}
            </p>
          </div>

          <div className="flex justify-between items-end">
            <div className="text-sm text-gray-500">
              Date: {completionDate || "—"}
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500 bg-gray-50">
      Select a student from the list to preview their certificate here.
    </div>
  )}

  {/* Download Button */}
  <div className="flex justify-center mt-6">
    <button
      onClick={() => handleDownloadCertificate("preview-certificate")}
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2"
    >
      <LuDownload className="h-5 w-5" />
      <span>Direct Download</span>
    </button>
  </div>
</div>

    </div>
  );
}

export default CertificateGeneration;

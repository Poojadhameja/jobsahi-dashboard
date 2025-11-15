import React, { useState, useEffect } from "react";
import { TAILWIND_COLORS } from "../../../../../shared/WebConstant.js";
import Button from "../../../../../shared/components/Button";
import { getMethod } from "../../../../../service/api";
import apiService from "../../../../admin/services/serviceUrl";

/* ============================================================
   COURSE LIST TABLE
============================================================ */
function CourseListTable({ onViewCourse, courseList }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3
        className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-4`}
      >
        Course List
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className={`text-left py-3 px-4 ${TAILWIND_COLORS.TEXT_MUTED}`}>
                Course Name
              </th>
              <th className={`text-left py-3 px-4 ${TAILWIND_COLORS.TEXT_MUTED}`}>
                Category
              </th>
              <th className={`text-left py-3 px-4 ${TAILWIND_COLORS.TEXT_MUTED}`}>
                Enrolled
              </th>
              <th className={`text-left py-3 px-4 ${TAILWIND_COLORS.TEXT_MUTED}`}>
                Certificate
              </th>
              <th className={`text-left py-3 px-4 ${TAILWIND_COLORS.TEXT_MUTED}`}>
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {courseList?.map((course, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className={`py-3 px-4 ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
                  {course.course_name}
                </td>

                <td className={`py-3 px-4 ${TAILWIND_COLORS.TEXT_MUTED}`}>
                  {course.category}
                </td>

                <td className={`py-3 px-4 ${TAILWIND_COLORS.TEXT_MUTED}`}>
                  {course.enrolled}
                </td>

                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      course.certificate === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {course.certificate}
                  </span>
                </td>

                <td className="py-3 px-4">
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => onViewCourse(course)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============================================================
   ENROLLMENT TRENDS CHART (API DATA)
============================================================ */
function EnrollmentTrendsChart({ trends }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
          Enrollment Trends
        </h3>
        <select className="px-3 py-1 border border-gray-300 rounded text-sm">
          <option>By Date</option>
        </select>
      </div>

      <div className="h-64 flex items-end justify-between px-4">
        {trends?.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="w-8 bg-blue-500 rounded-t"
              style={{ height: `${parseInt(item.value) * 20}px` }}
            ></div>
            <span className={`text-xs ${TAILWIND_COLORS.TEXT_MUTED} mt-2`}>
              {item.month}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   COURSE DETAILS MODAL
============================================================ */
function CourseDetailsModal({ course, isOpen, onClose }) {
  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2
            className={`text-xl font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}
          >
            Course Details
          </h2>
          <button
            onClick={onClose}
            className={`${TAILWIND_COLORS.TEXT_MUTED} hover:text-gray-600 transition-colors duration-200`}
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Title */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold">{course.course_name}</h3>

            <div className="flex items-center gap-3 mt-3">
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  course.certificate === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {course.certificate}
              </span>

              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                {course.category}
              </span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-semibold">{course.category}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Enrolled</p>
              <p className="font-semibold">{course.enrolled} Students</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Certificate Status</p>
              <p className="font-semibold">{course.certificate}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Course Status</p>
              <p className="font-semibold text-green-600">Active</p>
            </div>
          </div>

          {/* Overview */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-2">Course Overview</h4>
            <p className="text-gray-600">
              This course helps students gain skills in {course.category}.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white p-4 border-t flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN PAGE — FINAL API INTEGRATION
============================================================ */
export default function CourseMonitoring() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [courseList, setCourseList] = useState([]);
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await getMethod({
      apiUrl: apiService.adminInstituteManagement,
    });

    if (res?.success) {
      setCourseList(res.data.course_enrollment.course_list);
      setTrends(res.data.course_enrollment.enrollment_trends);
    }
  };

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">✓</span>
        </div>
        <h2 className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>
          Course & Enrollment
        </h2>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CourseListTable
          courseList={courseList}
          onViewCourse={handleViewCourse}
        />

        <EnrollmentTrendsChart trends={trends} />
      </div>

      {/* Modal */}
      <CourseDetailsModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

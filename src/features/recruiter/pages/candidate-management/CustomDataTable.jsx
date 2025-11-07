import React, { useState, useRef, useEffect } from "react";
import {
  FaEllipsisV,
  FaEye,
  FaDownload,
  FaEdit,
  FaTrash,
  FaUserCheck,
} from "react-icons/fa";
import { LuMail } from "react-icons/lu";

// 🔹 Custom Dropdown Menu Component
const CustomDropdownMenu = ({
  isOpen,
  onClose,
  onViewDetails,
  onDownloadCV,
  onEdit,
  onDelete,
  onShortlist,
  row,
}) => {
  const dropdownRef = useRef(null);

  // 🔹 Close menu when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-44 bg-white rounded-md shadow-lg border border-gray-200 z-[9999] transition-all duration-150 ease-in-out"
      style={{ transform: "translateY(5px)" }}
    >
      <div className="">
        <button
          onClick={() => {
            onViewDetails(row);
            onClose();
          }}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <FaEye className="w-4 h-4 mr-3 text-gray-500" />
          View Details
        </button>
        <button
          onClick={() => {
            onEdit(row);
            onClose();
          }}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <FaEdit className="w-4 h-4 mr-3 text-gray-500" />
          Edit
        </button>
        <button
          onClick={() => {
            onShortlist(row);
            onClose();
          }}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <FaUserCheck className="w-4 h-4 mr-3 text-gray-500" />
          Shortlist
        </button>
        <button
          onClick={() => {
            onDownloadCV(row);
            onClose();
          }}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <FaDownload className="w-4 h-4 mr-3 text-gray-500" />
          Download CV
        </button>
        <button
          onClick={() => {
            onDelete(row);
            onClose();
          }}
          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          <FaTrash className="w-4 h-4 mr-3 text-red-500" />
          Delete
        </button>
      </div>
    </div>
  );
};

// 🔹 Main CustomDataTable Component
const CustomDataTable = ({
  title = "Recent Applicants",
  columns = [],
  data = [],
  className = "",
  showHeader = true,
  onViewDetails = () => {},
  onDownloadCV = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onShortlist = () => {},
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  // 🔹 Row Selection Logic
  const handleSelectRow = (rowId) => {
    setSelectedRows((prev) =>
      prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((row) => row.id));
    }
  };

  // 🔹 Status Badge Colors
  const getStatusColor = (status) => {
    switch (status) {
      case "Shortlisted":
        return "bg-green-100 text-green-800";
      case "Interviewed":
        return "bg-blue-100 text-blue-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className={`rounded-lg overflow-visible ${className}`}>
      {/* Header (optional) */}
      {showHeader && (
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto overflow-visible bg-white border border-gray-200 rounded-lg shadow-sm">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedRows.length === data.length && data.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Candidate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Qualification
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Skills
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applied For
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-500 text-sm"
                >
                  No applicants found
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50 transition">
                  {/* Checkbox */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </td>

                  {/* Candidate Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold text-gray-900">
                        {row.name}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <LuMail className="w-4 h-4 mr-1" />
                        {row.email}
                      </div>
                    </div>
                  </td>

                  {/* Qualification */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.qualification}
                  </td>

                  {/* Skills */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {(Array.isArray(row.skills)
                        ? row.skills
                        : row.skills.split(", ")
                      ).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Applied For */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.appliedFor}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        row.status
                      )}`}
                    >
                      {row.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium relative overflow-visible">
                    <div className="flex items-center justify-end">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === rowIndex ? null : rowIndex
                            )
                          }
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <FaEllipsisV className="w-4 h-4" />
                        </button>

                        <CustomDropdownMenu
                          isOpen={openDropdown === rowIndex}
                          onClose={() => setOpenDropdown(null)}
                          onViewDetails={onViewDetails}
                          onDownloadCV={onDownloadCV}
                          onEdit={onEdit}
                          onDelete={onDelete}
                          onShortlist={onShortlist}
                          row={row}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomDataTable;

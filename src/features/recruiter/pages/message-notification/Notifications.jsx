import React, { useState } from "react";
import {
  LuPlus,
  LuEye,
  LuPencil,
  LuTrash2,
  LuX,
  LuSave,
  LuFileText,
} from "react-icons/lu";

const GREEN = "#5B9821";
const GREEN_SOFT = "#EAF5E2";
const BLUE_DARK = "#1F4961";
const BLUE_BTN = "#0B537D";
const CARD_BG = "#D6E7F2"; // light blue like the mock

export default function Notifications() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState(null);

  const categories = [
    { id: "all", label: "All" },
    { id: "interview", label: "Interview" },
    { id: "application", label: "Application" },
    { id: "rejection", label: "Rejection" },
    { id: "offers", label: "Offers" },
    { id: "follow-up", label: "Follow-up" },
  ];

  const [emailTemplates, setEmailTemplates] = useState([
    {
      id: 1,
      title: "Interview Invitation",
      category: "interview",
      subject: "Interview Invitation – [[position]] at JOBSAHI",
      body:
        "Dear {{candidate_name}}, We are pleased to inform you that your application for the [[position]] position has been reviewed...",
    },
    {
      id: 2,
      title: "Application Received",
      category: "application",
      subject: "Application invitation – [[position]] at JOBSAHI",
      body:
        "Hello {{candidate_name}}, Thank you for applying for the [[position]] position at JOBSAHI. We have received your application...",
    },
    {
      id: 3,
      title: "Interview Confirmation",
      category: "interview",
      subject: "Interview Confirmation – [[position]] at JOBSAHI",
      body:
        "Dear {{candidate_name}}, This is to confirm your interview for the [[position]] position scheduled as follows...",
    },
    {
      id: 4,
      title: "Polite Rejection",
      category: "rejection",
      subject: "Application Status – [[position]]",
      body:
        "Dear {{candidate_name}}, Thank you for your interest in the [[position]] position at JOBSAHI and for taking the time to apply...",
    },
    {
      id: 5,
      title: "Follow-up Message",
      category: "follow-up",
      subject: "Following up on your application – [[position]]",
      body:
        "Hello {{candidate_name}}, I hope this message finds you well. I wanted to follow up on your application for the [[position]]...",
    },
  ]);

  // helpers
  const handleEditTemplate = (t) => {
    setEditingTemplate({ ...t });
    setIsEditModalOpen(true);
  };
  const handleDeleteTemplate = (t) => {
    setTemplateToDelete(t);
    setIsDeleteModalOpen(true);
  };
  const confirmDelete = () => {
    if (!templateToDelete) return;
    setEmailTemplates((arr) => arr.filter((x) => x.id !== templateToDelete.id));
    setIsDeleteModalOpen(false);
    setTemplateToDelete(null);
  };
  const handleSaveEdit = () => {
    if (!editingTemplate) return;
    setEmailTemplates((arr) =>
      arr.map((x) => (x.id === editingTemplate.id ? editingTemplate : x))
    );
    setIsEditModalOpen(false);
    setEditingTemplate(null);
  };
  const handleUseTemplate = (t) => alert(`Using template: ${t.title}`);

  const filtered =
    activeCategory === "all"
      ? emailTemplates
      : emailTemplates.filter((t) => t.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[28px] font-semibold text-slate-800">Categories</h1>

        <button
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-white shadow-sm"
          style={{ backgroundColor: BLUE_BTN }}
        >
          <span className="grid h-6 w-6 place-items-center rounded-full bg-white/25">
            <LuPlus className="h-4 w-4 text-white" />
          </span>
          <span className="font-medium">Create Template</span>
        </button>
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((c) => {
          const active = c.id === activeCategory;
          return (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all`}
              style={{
                backgroundColor: active ? GREEN : GREEN_SOFT,
                color: active ? "#fff" : GREEN,
              }}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Cards grid — matches 3 across like the mock (wraps to 2 below) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((t) => (
          <article
            key={t.id}
            className="rounded-xl border border-transparent shadow-sm transition hover:shadow-md"
            style={{ backgroundColor: CARD_BG }}
          >
            <div className="p-4">
              {/* tiny category chip (blue) */}
              <div className="mb-3">
                <span className="inline-block rounded-full border border-white/40 bg-white/30 px-2.5 py-1 text-xs font-semibold text-[#1b3a4a]">
                  {t.category.charAt(0).toUpperCase() + t.category.slice(1)}
                </span>
              </div>

              <h3 className="mb-1 text-[18px] font-semibold text-[#163a52]">
                {t.title}
              </h3>

              <div className="mb-2 text-[12px] font-semibold text-[#163a52]">
                Subject:
              </div>
              <div className="mb-3 rounded-md bg-white/60 px-3 py-2 text-sm text-[#1a2f3d]">
                {t.subject}
              </div>

              <div className="mb-4 text-[12px] font-semibold text-[#163a52]">
                Body:
              </div>
              <p
                className="rounded-md bg-white/60 px-3 py-2 text-sm leading-relaxed text-[#1a2f3d]"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {t.body}
              </p>
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-between px-4 pb-4">
              <button
                onClick={() => handleUseTemplate(t)}
                className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white"
                style={{ backgroundColor: BLUE_DARK }}
              >
                <LuFileText className="h-4 w-4" />
                Use Template
              </button>

              <div className="flex items-center gap-3">
                {/* tiny progress dots like the mock */}
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#1a2f3d]/40"></span>
                  <span className="h-2 w-2 rounded-full bg-[#1a2f3d]/40"></span>
                  <span className="h-2 w-2 rounded-full bg-[#1a2f3d]/40"></span>
                </div>

                <button
                  title="View"
                  onClick={() => handleEditTemplate(t)}
                  className="rounded-md p-2 text-[#163a52] hover:bg-white/50"
                >
                  <LuEye className="h-4 w-4" />
                </button>
                <button
                  title="Edit"
                  onClick={() => handleEditTemplate(t)}
                  className="rounded-md p-2 text-[#163a52] hover:bg-white/50"
                >
                  <LuPencil className="h-4 w-4" />
                </button>
                <button
                  title="Delete"
                  onClick={() => handleDeleteTemplate(t)}
                  className="rounded-md p-2 text-red-600 hover:bg-white/50"
                >
                  <LuTrash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-gray-100">
            <LuPlus className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-gray-700">
            No Templates Found
          </h3>
          <p className="mx-auto mb-6 max-w-md text-gray-500">
            No templates for this category. Create your first template to get
            started.
          </p>
          <button
            className="rounded-lg px-6 py-3 font-medium text-white"
            style={{ backgroundColor: BLUE_BTN }}
          >
            Create Your First Template
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editingTemplate && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
          <div className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-slate-800">
                Edit Template
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
              >
                <LuX className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  value={editingTemplate.title}
                  onChange={(e) =>
                    setEditingTemplate({
                      ...editingTemplate,
                      title: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B537D]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    value={editingTemplate.category}
                    onChange={(e) =>
                      setEditingTemplate({
                        ...editingTemplate,
                        category: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B537D]"
                  >
                    {categories
                      .filter((c) => c.id !== "all")
                      .map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <input
                    value={editingTemplate.subject}
                    onChange={(e) =>
                      setEditingTemplate({
                        ...editingTemplate,
                        subject: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B537D]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Body
                </label>
                <textarea
                  rows={10}
                  value={editingTemplate.body}
                  onChange={(e) =>
                    setEditingTemplate({
                      ...editingTemplate,
                      body: e.target.value,
                    })
                  }
                  className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B537D]"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-medium text-white"
                style={{ backgroundColor: BLUE_BTN }}
              >
                <LuSave className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && templateToDelete && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-slate-800">
                Delete Template
              </h3>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
              >
                <LuX className="h-5 w-5" />
              </button>
            </div>

            <p className="mb-4 text-gray-700">
              Are you sure you want to delete{" "}
              <strong>"{templateToDelete.title}"</strong>?
            </p>
            <p className="mb-6 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              This action can’t be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white hover:bg-red-700"
              >
                <LuTrash2 className="h-4 w-4" />
                Delete Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

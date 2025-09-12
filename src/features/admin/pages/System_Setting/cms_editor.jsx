import React, { useState } from 'react';
import {
  LuCircleUser,
  LuArrowLeft,
  LuCheck,
  LuCircleDot,
} from 'react-icons/lu';
import Button from '../../../../shared/components/Button';
import { COLORS, TAILWIND_COLORS } from '../../../../shared/WebConstant';

/** ---------- Small UI Primitives ---------- */
const StatusBadge = ({ status = "Draft" }) => {
  const isPublished = status.toLowerCase() === "published";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium
        ${isPublished ? "bg-slate-100 text-slate-700" : "bg-slate-100 text-slate-700"}`}
      aria-label={`Status: ${status}`}
    >
      {isPublished ? <LuCheck className="h-4 w-4" /> : <LuCircleDot className="h-4 w-4" />}
      {status}
    </span>
  );
};

const FieldLabel = ({ children }) => (
  <label className="mb-1 block text-sm font-semibold text-gray-700">{children}</label>
);

const TextInput = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
  />
);

const TextArea = ({ value, onChange, placeholder }) => (
  <textarea
    rows={6}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-all duration-200 bg-gray-50 focus:bg-white"
  />
);

const SaveButton = ({ onClick, isSaving }) => (
  <Button
    onClick={onClick}
    disabled={isSaving}
    variant="primary"
    className="w-full"
    size="md"
    loading={isSaving}
  >
    Save
  </Button>
);

/** ---------- Card Component ---------- */
const CmsCard = ({
  title,
  status,
  lastUpdated = "2 days ago",
  titlePlaceholder,
  contentPlaceholder,
  initialTitle = "",
  initialContent = "",
  onSave,
}) => {
  const [pageTitle, setPageTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [savedTick, setSavedTick] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    setSavedTick(false);
    try {
      await onSave?.({ pageTitle, content, status });
      // Simulate quick UX tick
      setSavedTick(true);
      setTimeout(() => setSavedTick(false), 1200);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={`${TAILWIND_COLORS.CARD} p-6 h-fit`}>
      {/* Card header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">Last updated {lastUpdated}</p>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Fields */}
      <div className="space-y-5">
        <div>
          <FieldLabel>Page title</FieldLabel>
          <TextInput
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
            placeholder={titlePlaceholder}
          />
        </div>

        <div>
          <FieldLabel>Content Preview</FieldLabel>
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={contentPlaceholder}
          />
        </div>

        <div className="relative">
          <SaveButton onClick={handleSave} isSaving={isSaving} />
          {savedTick && (
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-green-700">
              <LuCheck className="h-5 w-5" aria-hidden />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

/** ---------- Page: CMS Editor ---------- */
const CMSEditor = () => {
  const handlePersist = async ({ pageTitle, content, status }) => {
    // TODO: Wire up to your API
    // Example:
    // await fetch('/api/cms', { method: 'POST', body: JSON.stringify({ pageTitle, content, status }) })
    await new Promise((r) => setTimeout(r, 550));
  };

  return (
    <div className={`${TAILWIND_COLORS.BG_PRIMARY} min-h-screen p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* CMS Editor Header */}
        <div className={`${TAILWIND_COLORS.CARD} p-6 mb-6`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Green Icon with People */}
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <LuCircleUser className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">CMS Editor</h1>
                <p className="text-sm text-gray-600">About, Terms, Policy</p>
              </div>
            </div>
            
            {/* Back to Overview Button */}
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              onClick={() => window.history.back()}
            >
              <LuArrowLeft className="h-4 w-4" />
              <span>Back to overview</span>
            </Button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <CmsCard
            title="About Us"
            status="Published"
            lastUpdated="2 days ago"
            titlePlaceholder="About Us title"
            contentPlaceholder="Write your about us content here.."
            onSave={handlePersist}
          />
          <CmsCard
            title="Terms of Service"
            status="Draft"
            lastUpdated="2 days ago"
            titlePlaceholder="Terms of service title.."
            contentPlaceholder="Write your terms of service content here.."
            onSave={handlePersist}
          />
          <CmsCard
            title="Privacy Policy"
            status="Draft"
            lastUpdated="2 days ago"
            titlePlaceholder="privacy policy title"
            contentPlaceholder="Write your privacy policy content here.."
            onSave={handlePersist}
          />
        </div>
      </div>
    </div>
  );
};

export default CMSEditor;

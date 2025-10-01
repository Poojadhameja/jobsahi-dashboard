import React, { useState } from "react";
import { LuPlus, LuPencil, LuTrash2, LuCopy, LuEye, LuChevronDown, LuX } from "react-icons/lu";

const Templates = () => {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Interview Invitation",
      subject: "Interview Invitation - {`{{position}}`} at JOBSAHI",
      content: "Dear {`{{candidate_name}}`}, We are pleased to inform you that your application for the {`{{position}}`} position has been reviewed and we would like to invite you for an interview. Please let us know your availability for the following dates.",
      category: "Interview",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "Application Received",
      subject: "Application Invitation - {`{{position}}`} at JOBSAHI",
      content: "Hello {`{{candidate_name}}`}, Thank you for applying for the {`{{position}}`} position at JOBSAHI. We have received your application and will review it carefully.",
      category: "Application",
      createdAt: "2024-01-10"
    },
    {
      id: 3,
      name: "Interview Confirmation",
      subject: "Interview Confirmation - {`{{position}}`} at JOBSAHI",
      content: "Dear {`{{candidate_name}}`}, This is to confirm your interview for the {`{{position}}`} position scheduled as follows: Date: {`{{interview_date}}`}, Time: {`{{interview_time}}`}",
      category: "Interview",
      createdAt: "2024-01-08"
    },
    {
      id: 4,
      name: "Polite Rejection",
      subject: "Application Status - {`{{position}}`}",
      content: "Dear {`{{candidate_name}}`}, Thank you for your interest in the {`{{position}}`} position at JOBSAHI and for taking the time to apply. After careful consideration, we have decided to move forward with other candidates.",
      category: "Rejection",
      createdAt: "2024-01-05"
    },
    {
      id: 5,
      name: "Follow-up Message",
      subject: "Following up on your application - {`{{position}}`}",
      content: "Hello {`{{candidate_name}}`}, I hope this message finds you well. I wanted to follow up on your application for the {`{{position}}`} position and provide you with an update on our hiring process.",
      category: "Follow-up",
      createdAt: "2024-01-03"
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingTemplate, setViewingTemplate] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [templateForm, setTemplateForm] = useState({
    name: "",
    subject: "",
    content: "",
    category: ""
  });
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState(null);

  const categories = ["All", "Interview", "Application", "Rejection", "Offers", "Follow-up"];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    return matchesCategory;
  });

  const handleCreateTemplate = () => {
    setEditingTemplate(null);
    setTemplateForm({ name: "", subject: "", content: "", category: "" });
    setShowTemplateModal(true);
  };

  const handleViewTemplate = (template) => {
    setViewingTemplate(template);
    setShowViewModal(true);
  };

  const handleEditTemplate = (template) => {
    setEditingTemplate(template);
    setTemplateForm({
      name: template.name,
      subject: template.subject,
      content: template.content,
      category: template.category
    });
    setShowTemplateModal(true);
  };

  const handleSaveTemplate = () => {
    if (editingTemplate) {
      setTemplates(prev => prev.map(template => 
        template.id === editingTemplate.id 
          ? { ...template, ...templateForm }
          : template
      ));
    } else {
      const newTemplate = {
        id: Date.now(),
        ...templateForm,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setTemplates(prev => [...prev, newTemplate]);
    }
    setShowTemplateModal(false);
    setTemplateForm({ name: "", subject: "", content: "", category: "" });
  };

  const handleDeleteTemplate = (id) => {
    setTemplates(prev => prev.filter(template => template.id !== id));
  };

  const handleDeleteClick = (template) => {
    setTemplateToDelete(template);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (templateToDelete) {
      handleDeleteTemplate(templateToDelete.id);
      setShowDeleteModal(false);
      setTemplateToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setTemplateToDelete(null);
  };

  const handleCopyTemplate = (template) => {
    navigator.clipboard.writeText(template.content);
    setShowCopyMessage(true);
    setTimeout(() => setShowCopyMessage(false), 2000);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Interview": return "bg-[var(--color-secondary)] text-white";
      case "Application": return "bg-[var(--color-secondary)] text-white";
      case "Rejection": return "bg-[var(--color-secondary)] text-white";
      case "Offers": return "bg-[var(--color-secondary)] text-white";
      case "Follow-up": return "bg-[var(--color-secondary)] text-white";
      default: return "bg-[var(--color-secondary)] text-white";
    }
  };

  return (
    <div className=" p-2">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Message Templates</h1>
          <p className="text-gray-600">Create and manage reusable message templates for efficient communication</p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <button
            onClick={handleCreateTemplate}
            className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg hover:bg-[var(--color-primary)] transition-colors font-medium"
          >
            <LuPlus size={20} className="inline mr-2" />
            Create Template
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                selectedCategory === category
                  ? 'bg-secondary-10 text-[var(--color-secondary)]'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Templates List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{template.name}</h3>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-secondary-10 text-[var(--color-secondary)] border border-[var(--color-secondary)]`}>
                {template.category}
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Subject:</p>
                <p className="text-sm text-gray-800 font-medium">{template.subject}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Message:</p>
                <p className="text-sm text-gray-700 line-clamp-2">{template.content}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button className="bg-[var(--color-secondary)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-secondary)] transition-colors text-sm font-medium flex items-center gap-2">
                Use Template
                <LuChevronDown size={16} />
              </button>
              <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewTemplate(template)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded transition-colors"
                      title="View template"
                    >
                      <LuEye size={16} />
                    </button>
                    <button
                      onClick={() => handleCopyTemplate(template)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded transition-colors"
                      title="Copy template"
                    >
                      <LuCopy size={16} />
                    </button>
                    <button
                      onClick={() => handleEditTemplate(template)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded transition-colors"
                      title="Edit template"
                    >
                      <LuPencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(template)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete template"
                    >
                      <LuTrash2 size={16} />
                    </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <LuPencil size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-500">Create your first template to get started</p>
        </div>
      )}

      {/* Template Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {editingTemplate ? 'Edit Template' : 'Create Template'}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
                  <input
                    type="text"
                    value={templateForm.name}
                    onChange={(e) => setTemplateForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent"
                    placeholder="Enter template name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={templateForm.category}
                    onChange={(e) => setTemplateForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    <option value="Interview">Interview</option>
                    <option value="Application">Application</option>
                    <option value="Rejection">Rejection</option>
                    <option value="Offers">Offers</option>
                    <option value="Follow-up">Follow-up</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    value={templateForm.subject}
                    onChange={(e) => setTemplateForm(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent"
                    placeholder="Enter email subject"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea
                    value={templateForm.content}
                    onChange={(e) => setTemplateForm(prev => ({ ...prev, content: e.target.value }))}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent resize-none"
                    placeholder="Enter template content. Use {`{{variableName}}`} for placeholders."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use placeholders like {`{{candidateName}}`}, {`{{jobTitle}}`}, {`{{interviewDate}}`} etc.
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowTemplateModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveTemplate}
                  className="px-4 py-2 bg-[var(--color-secondary)] text-white rounded-lg hover:bg-secondary-dark transition-colors"
                >
                  {editingTemplate ? 'Update Template' : 'Create Template'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Template Modal */}
      {showViewModal && viewingTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Template Details</h2>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <LuX size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{viewingTemplate.name}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(viewingTemplate.category)}`}>
                    {viewingTemplate.category}
                  </span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject:</label>
                  <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg">{viewingTemplate.subject}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content:</label>
                  <div className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap max-h-60 overflow-y-auto">
                    {viewingTemplate.content}
                  </div>
                </div>
                
                <div className="text-xs text-gray-500">
                  Created: {new Date(viewingTemplate.createdAt).toLocaleDateString()}
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    handleEditTemplate(viewingTemplate);
                  }}
                  className="px-4 py-2 bg-[var(--color-secondary)] text-white rounded-lg hover:bg-secondary-dark transition-colors"
                >
                  Edit Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && templateToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <LuTrash2 size={20} className="text-red-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Delete Template</h2>
                  <p className="text-sm text-gray-500">This action cannot be undone</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700 mb-2">
                  Are you sure you want to delete the template <strong>"{templateToDelete.name}"</strong>?
                </p>
                <p className="text-sm text-gray-500">
                  This template will be permanently removed from your templates list.
                </p>
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Copy Success Message */}
      {showCopyMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          Template copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default Templates;
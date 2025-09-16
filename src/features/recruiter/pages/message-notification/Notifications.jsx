import React, { useState } from 'react';
import { LuPlus, LuPencil, LuTrash2, LuX, LuSave } from 'react-icons/lu';

const Notifications = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState(null);

  const categories = [
    { id: 'all', label: 'All', active: true },
    { id: 'interview', label: 'Interview', active: false },
    { id: 'application', label: 'Application', active: false },
    { id: 'rejection', label: 'Rejection', active: false },
    { id: 'offers', label: 'Offers', active: false },
    { id: 'follow-up', label: 'Follow-up', active: false }
  ];

  const [emailTemplates, setEmailTemplates] = useState([
    {
      id: 1,
      title: "Interview Invitation",
      category: "Interview",
      subject: "Interview Invitation - [[position]] at JOBSAHI",
      body: "Dear {{candidate_name}}, We are pleased to inform you that your application for the [[position]] position has been reviewed and we would like to invite you for an interview. Please let us know your availability for the following time slots: [Date and Time]. We look forward to meeting you!",
      categoryColor: "bg-blue-100 text-blue-800"
    },
    {
      id: 2,
      title: "Application Received",
      category: "Application",
      subject: "Application invitation - [[position]] at JOBSAHI",
      body: "Hello {{candidate_name}}, Thank you for applying for the [[position]] position at JOBSAHI. We have received your application and our team will review it carefully. We will get back to you within 3-5 business days with the next steps.",
      categoryColor: "bg-blue-100 text-blue-800"
    },
    {
      id: 3,
      title: "Interview Confirmation",
      category: "Interview",
      subject: "Interview Confirmation - [[position]] at JOBSAHI",
      body: "Dear {{candidate_name}}, This is to confirm your interview for the [[position]] position scheduled as follows: Date: [Date], Time: [Time], Location: [Location/Video Call]. Please arrive 10 minutes early. If you have any questions, feel free to contact us.",
      categoryColor: "bg-blue-100 text-blue-800"
    },
    {
      id: 4,
      title: "Polite Rejection",
      category: "Rejection",
      subject: "Application Status - [[position]]",
      body: "Dear {{candidate_name}}, Thank you for your interest in the [[position]] position at JOBSAHI and for taking the time to apply. After careful consideration, we have decided to move forward with other candidates. We encourage you to apply for future opportunities that match your skills.",
      categoryColor: "bg-blue-100 text-blue-800"
    },
    {
      id: 5,
      title: "Follow-up Message",
      category: "Follow-up",
      subject: "Following up on your application - [[position]]",
      body: "Hello {{candidate_name}}, I hope this message finds you well. I wanted to follow up on your application for the {{position}} position. We are still in the review process and will have an update for you soon. Thank you for your patience.",
      categoryColor: "bg-blue-100 text-blue-800"
    },
    {
      id: 6,
      title: "Job Offer",
      category: "Offers",
      subject: "Job Offer - [[position]] at JOBSAHI",
      body: "Dear {{candidate_name}}, Congratulations! We are pleased to offer you the position of [[position]] at JOBSAHI. We were impressed with your qualifications and believe you will be a great addition to our team. Please review the attached offer letter and let us know your decision by [Date].",
      categoryColor: "bg-green-100 text-green-800"
    },
    {
      id: 7,
      title: "Welcome Email",
      category: "Offers",
      subject: "Welcome to JOBSAHI - [[position]]",
      body: "Dear {{candidate_name}}, Welcome to JOBSAHI! We are excited to have you join our team as [[position]]. Your first day will be [Date] at [Time]. Please find attached your onboarding schedule and company policies. We look forward to working with you!",
      categoryColor: "bg-green-100 text-green-800"
    }
  ]);

  // Template management functions

  const handleEditTemplate = (template) => {
    setEditingTemplate({ ...template });
    setIsEditModalOpen(true);
  };

  const handleDeleteTemplate = (template) => {
    setTemplateToDelete(template);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (templateToDelete) {
      setEmailTemplates(templates => templates.filter(t => t.id !== templateToDelete.id));
      setIsDeleteModalOpen(false);
      setTemplateToDelete(null);
    }
  };

  const handleSaveEdit = () => {
    if (editingTemplate) {
      setEmailTemplates(templates => 
        templates.map(t => t.id === editingTemplate.id ? editingTemplate : t)
      );
      setIsEditModalOpen(false);
      setEditingTemplate(null);
    }
  };

  const handleUseTemplate = (template) => {
    // This would typically open a compose email dialog or redirect to email composition
    alert(`Using template: ${template.title}`);
  };

  const filteredTemplates = activeCategory === 'all' 
    ? emailTemplates 
    : emailTemplates.filter(template => 
        template.category.toLowerCase() === activeCategory
      );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0B537D] text-white rounded-lg hover:bg-[#0a4a6b] transition-colors">
            <LuPlus className="w-5 h-5" />
            Create Template
          </button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? 'bg-[#5B9821] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Template Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Template Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {template.title}
            </h3>

            {/* Category Tag */}
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${template.categoryColor}`}>
                {template.category}
              </span>
            </div>

            {/* Subject */}
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-700 mb-1">Subject:</p>
              <p className="text-sm text-gray-600 bg-white p-2 rounded border">
                {template.subject}
              </p>
            </div>

            {/* Body Preview */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-1">Body:</p>
              <p className="text-sm text-gray-600 bg-white p-2 rounded border overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical'}}>
                {template.body}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <button 
                onClick={() => handleUseTemplate(template)}
                className="px-4 py-2 bg-[#0B537D] text-white text-sm rounded-lg hover:bg-[#0a4a6b] transition-colors"
              >
                Use Template
              </button>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleEditTemplate(template)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Edit Template"
                >
                  <LuPencil className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDeleteTemplate(template)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Delete Template"
                >
                  <LuTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <LuPlus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-500 mb-2">No Templates Found</h3>
          <p className="text-gray-400 mb-4">No templates found for the selected category.</p>
          <button className="px-4 py-2 bg-[#0B537D] text-white rounded-lg hover:bg-[#0a4a6b] transition-colors">
            Create Your First Template
          </button>
        </div>
      )}

      {/* Edit Template Modal */}
      {isEditModalOpen && editingTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Edit Template</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <LuX className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={editingTemplate.title}
                  onChange={(e) => setEditingTemplate({...editingTemplate, title: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B537D] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={editingTemplate.category}
                  onChange={(e) => setEditingTemplate({...editingTemplate, category: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B537D] focus:border-transparent"
                >
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
                  value={editingTemplate.subject}
                  onChange={(e) => setEditingTemplate({...editingTemplate, subject: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B537D] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
                <textarea
                  value={editingTemplate.body}
                  onChange={(e) => setEditingTemplate({...editingTemplate, body: e.target.value})}
                  rows={8}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B537D] focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-[#0B537D] text-white rounded-lg hover:bg-[#0a4a6b] transition-colors flex items-center gap-2"
              >
                <LuSave className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && templateToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Delete Template</h3>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <LuX className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-2">
                Are you sure you want to delete the template <strong>"{templateToDelete.title}"</strong>?
              </p>
              <p className="text-sm text-gray-500">
                This action cannot be undone.
              </p>
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <LuTrash2 className="w-4 h-4" />
                Delete Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;

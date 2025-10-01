import React, { useState } from 'react'
import { LuPlus, LuPencil, LuTrash2, LuBookOpen, LuAward, LuFileText, LuCalendar } from 'react-icons/lu'
import { TAILWIND_COLORS } from '../../../../shared/WebConstant'

export default function Templates() {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Course Update',
      subject: 'Important Course Update - {courseName}',
      content: 'Dear {studentName}, We have an important update regarding your {courseName} course. {updateDetails} Please check your course portal for more information.',
      type: 'Course',
      icon: LuBookOpen,
      iconColor: 'bg-green-100 text-green-600',
      variables: ['{studentName}', '{courseName}', '{updateDetails}', '{instituteName}']
    },
    {
      id: 2,
      name: 'Certificate Ready',
      subject: 'Your Certificate is Ready - {courseName}',
      content: 'Dear {studentName}, Congratulations! Your certificate for {courseName} course is now ready. {updateDetails} Please collect it from the institute office.',
      type: 'Course',
      icon: LuAward,
      iconColor: 'bg-blue-100 text-blue-600',
      variables: ['{studentName}', '{courseName}', '{updateDetails}', '{instituteName}']
    },
    {
      id: 3,
      name: 'Assignment Reminder',
      subject: 'Assignment Submission Reminder - {courseName}',
      content: 'Dear {studentName}, This is a reminder that your assignment for {courseName} course is due soon. {updateDetails} Please submit it before the deadline.',
      type: 'Assignment',
      icon: LuFileText,
      iconColor: 'bg-orange-100 text-orange-600',
      variables: ['{studentName}', '{courseName}', '{updateDetails}', '{instituteName}']
    },
    {
      id: 4,
      name: 'Exam Schedule',
      subject: 'Exam Schedule Update - {courseName}',
      content: 'Dear {studentName}, The exam schedule for {courseName} course has been updated. {updateDetails} Please check the new schedule and prepare accordingly.',
      type: 'Exam',
      icon: LuCalendar,
      iconColor: 'bg-purple-100 text-purple-600',
      variables: ['{studentName}', '{courseName}', '{updateDetails}', '{instituteName}']
    }
  ])

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(null)

  // Handle edit template
  const handleEditTemplate = (template) => {
    setEditingTemplate(template)
    setShowCreateModal(true)
  }

  // Handle delete template
  const handleDeleteTemplate = (templateId) => {
    setTemplates(templates.filter(template => template.id !== templateId))
    setShowDeleteModal(null)
  }

  // Handle confirm delete
  const handleConfirmDelete = (templateId) => {
    setShowDeleteModal(templateId)
  }

  return (
    <div className={`${TAILWIND_COLORS.CARD} p-6`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className={`text-2xl font-bold ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>Manage Templates</h2>
          <p className={TAILWIND_COLORS.TEXT_MUTED}>Configure automated notifications for students</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className={`${TAILWIND_COLORS.BTN_SECONDARY} px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors duration-200`}
        >
          <LuPlus className="w-5 h-5" />
          <span>Create Template</span>
        </button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => {
          const IconComponent = template.icon
          return (
            <div key={template.id} className={`${TAILWIND_COLORS.CARD} p-6 hover:shadow-md transition-shadow duration-200`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${template.iconColor}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{template.name}</h3>
                    <span className={`inline-block px-3 py-1 text-xs font-medium ${TAILWIND_COLORS.BADGE_INFO} rounded-full`}>
                      {template.type}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEditTemplate(template)}
                    className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                    title="Edit template"
                  >
                    <LuPencil className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleConfirmDelete(template.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete template"
                  >
                    <LuTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}>Subject:</p>
                  <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY}`}>{template.subject}</p>
                </div>
                <div>
                  <p className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-1`}>Content:</p>
                  <p className={`text-sm ${TAILWIND_COLORS.TEXT_PRIMARY} line-clamp-3`}>{template.content}</p>
                </div>
                <div>
                  <p className={`text-sm font-medium ${TAILWIND_COLORS.TEXT_MUTED} mb-2`}>Variables:</p>
                  <div className="flex flex-wrap gap-2">
                    {template.variables.map((variable, index) => (
                      <span key={index} className={`px-2 py-1 text-xs ${TAILWIND_COLORS.BADGE_INFO} rounded-full`}>
                        {variable}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {templates.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <LuPencil className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className={`text-lg font-medium ${TAILWIND_COLORS.TEXT_PRIMARY} mb-2`}>No templates yet</h3>
          <p className={`${TAILWIND_COLORS.TEXT_MUTED} mb-6`}>Create your first template to get started.</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className={`${TAILWIND_COLORS.BTN_SECONDARY} px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto transition-colors duration-200`}
          >
            <LuPlus className="w-5 h-5" />
            <span>Create Template</span>
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <LuTrash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${TAILWIND_COLORS.TEXT_PRIMARY}`}>Delete Template</h3>
                <p className={TAILWIND_COLORS.TEXT_MUTED}>This action cannot be undone.</p>
              </div>
            </div>
            <p className={`${TAILWIND_COLORS.TEXT_MUTED} mb-6`}>
              Are you sure you want to delete this template? This will permanently remove it from your templates.
            </p>
            <div className="flex space-x-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(null)}
                className={`${TAILWIND_COLORS.BTN_LIGHT} px-4 py-2 rounded-lg transition-colors duration-200`}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteTemplate(showDeleteModal)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

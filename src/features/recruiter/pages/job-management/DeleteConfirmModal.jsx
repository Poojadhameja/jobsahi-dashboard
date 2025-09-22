import React from 'react'

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, jobTitle }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
        {/* Modal Content */}
        <div className="p-8 text-center">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Delete This Job Post?
          </h2>
          
          {/* Description */}
          <p className="text-gray-600 mb-8 leading-relaxed">
            Are you sure you want to delete this job post? This action cannot be undone.
          </p>
          
          {/* Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={onConfirm}
              className="px-8 py-3 bg-[var(--color-secondary)] text-white rounded-lg font-medium hover:bg-secondary-dark transition-colors duration-200"
            >
              Yes, Delete
            </button>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gray-100 text-gray-900 border border-gray-300 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal

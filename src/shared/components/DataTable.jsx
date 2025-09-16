import React, { useState, useRef, useEffect } from 'react'
import { FaEllipsisV, FaEye, FaDownload } from 'react-icons/fa'

// Dropdown Menu Component
const DropdownMenu = ({ isOpen, onClose, onViewDetails, onDownloadCV, row }) => {
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={dropdownRef}
      className="absolute right-12 -top-10 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-50"
    >
      <div className="">
        <button
          onClick={() => {
            onViewDetails(row)
            onClose()
          }}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <FaEye className="w-4 h-4 mr-3 text-gray-500" />
          View Details
        </button>
        <button
          onClick={() => {
            onDownloadCV(row)
            onClose()
          }}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <FaDownload className="w-4 h-4 mr-3 text-gray-500" />
          Download CV
        </button>
      </div>
    </div>
  )
}

const DataTable = ({
  title = "Recent Applicants",
  columns = [],
  data = [],
  actions = [],
  className = "",
  showHeader = true,
  showActions = true,
  onViewDetails = () => {},
  onDownloadCV = () => {}
}) => {
  const [openDropdown, setOpenDropdown] = useState(null)
  return (
    <div className={`bg-white rounded-lg border border-[#0B537D3C] ${className}`}>
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
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
              {showActions && actions.length > 0 && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action Buttons
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {column.key === 'name' && (
                        <div className="w-6 h-6 bg-gray-300 rounded-full mr-3 flex-shrink-0"></div>
                      )}
                      <div className="text-sm font-medium text-gray-900">
                        {row[column.key]}
                      </div>
                    </div>
                  </td>
                ))}
                {showActions && actions.length > 0 && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-5 md:justify-between">
                      {actions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          onClick={() => action.onClick && action.onClick(row, rowIndex)}
                          className={`px-3 md:px-4 py-1 md:py-2 rounded-full text-xs font-medium transition-colors duration-200 ${
                            action.variant === 'success'
                              ? 'bg-[#5C9A24] text-[#fff] hover:bg-[#3b6418]'
                              : action.variant === 'danger'
                              ? 'bg-[#ff0000] text-[#fff] hover:bg-[#c03030]'
                              : action.variant === 'primary'
                              ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {action.label}
                        </button>
                      ))}
                       <div className="relative">
                         <button 
                           onClick={() => setOpenDropdown(openDropdown === rowIndex ? null : rowIndex)}
                           className="p-1 text-gray-400 hover:text-gray-600"
                         >
                           <FaEllipsisV className="w-4 h-4" />
                         </button>
                         <DropdownMenu
                           isOpen={openDropdown === rowIndex}
                           onClose={() => setOpenDropdown(null)}
                           onViewDetails={onViewDetails}
                           onDownloadCV={onDownloadCV}
                           row={row}
                         />
                       </div>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataTable

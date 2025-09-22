import React, { useState } from 'react'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'

const Calendar = ({ selectedDate = new Date(), onDateSelect, className = '' }) => {
  const [currentDate, setCurrentDate] = useState(new Date()) // Current date
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }
  
  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + direction)
      return newDate
    })
  }
  
  const isSelected = (date) => {
    if (!date) return false
    if (!selectedDate) return false
    if (!(selectedDate instanceof Date)) return false
    if (!(date instanceof Date)) return false
    return date.toDateString() === selectedDate.toDateString()
  }
  
  const isToday = (date) => {
    if (!date) return false
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }
  
  const daysInMonth = getDaysInMonth(currentDate)
  
  return (
    <div className={`bg-gray-50 rounded-lg border border-gray-200 p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-1 hover:bg-gray-200 rounded transition-colors"
        >
          <LuChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <h3 className="text-lg font-bold text-gray-900">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button
          onClick={() => navigateMonth(1)}
          className="p-1 hover:bg-gray-200 rounded transition-colors"
        >
          <LuChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {daysInMonth.map((date, index) => (
          <button
            key={index}
            onClick={() => date && onDateSelect && onDateSelect(date)}
            className={`
              w-8 h-8 text-sm rounded transition-colors flex items-center justify-center
              ${!date ? 'cursor-default' : 'hover:bg-gray-200 cursor-pointer'}
              ${isSelected(date) ? 'bg-secondary-10 text-secondary font-bold border border-secondary ' : ''}
              ${!isSelected(date) && isToday(date) ? 'bg-secondary-10 text-secondary font-bold border border-secondary ' : ''}
              ${!isSelected(date) && !isToday(date) ? 'text-gray-700' : ''}
            `}
            disabled={!date}
          >
            {date ? date.getDate() : ''}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Calendar
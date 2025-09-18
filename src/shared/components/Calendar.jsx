import React, { useState, useEffect } from 'react'
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Calendar = ({ 
  selectedDate = 10,
  onDateSelect = () => {},
  interviewDates = [],
  className = ""
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(selectedDate)

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push({ date: null, isEmpty: true })
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const hasInterview = interviewDates.includes(day)
      days.push({ 
        date: day, 
        isEmpty: false, 
        hasInterview,
        dayOfWeek: daysOfWeek[new Date(year, month, day).getDay()]
      })
    }
    
    return days
  }

  const calendarDays = generateCalendarDays()

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const handleDateClick = (date) => {
    if (date && !date.isEmpty) {
      setSelectedDay(date)
      onDateSelect(date)
    }
  }

  // Update selected day when prop changes
  useEffect(() => {
    setSelectedDay(selectedDate)
  }, [selectedDate])

  return (
    <div className={`p-4 ${className}`}>
      {/* Month Navigation Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <FaChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        
        <h3 className="text-lg font-semibold text-gray-900">
          {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <FaChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center">
            <div className="text-xs text-gray-500 font-medium">{day}</div>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => (
          <div key={index} className="text-center">
            {!day.isEmpty ? (
              <>
                <button
                  onClick={() => handleDateClick(day)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all duration-200 ${
                    selectedDay === day.date
                      ? 'bg-green-500 text-white shadow-lg' 
                      : day.hasInterview
                      ? 'bg-blue-50 text-blue-700 hover:bg-blue-200 border border-blue-300'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {day.date}
                </button>
                {day.hasInterview && selectedDay !== day.date && (
                  <div className="w-1 h-1 bg-blue-500 rounded-full mx-auto mt-1"></div>
                )}
              </>
            ) : (
              <div className="w-6 h-6"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar

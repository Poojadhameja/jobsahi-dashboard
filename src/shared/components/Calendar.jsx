import React, { useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const Calendar = ({
  selectedDate = new Date(),
  onDateSelect,
  interviewDates = [],
  className = "",
  variant = "default", // ✅ 'default' or 'recruiter'
}) => {
  const [currentDate, setCurrentDate] = useState(new Date()); // Current visible month

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const daysArray = [];

    // Empty cells for days before the month starts
    for (let i = 0; i < startingDay; i++) {
      daysArray.push(null);
    }

    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(new Date(year, month, day));
    }

    return daysArray;
  };

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date.getDate() === selectedDate;
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const hasInterview = (date) => {
    if (!date) return false;
    return interviewDates.includes(date.getDate());
  };

  const daysInMonth = getDaysInMonth(currentDate);

  return (
    <div
      className={`bg-gray-50 rounded-lg border border-gray-200 p-4 ${className}`}
    >
      {/* Header */}
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

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Dates Grid */}
      <div className="grid grid-cols-7 gap-1">
        {daysInMonth.map((date, index) => {
          const selected = isSelected(date);
          const interview = hasInterview(date);
          const today = isToday(date);

          // ✅ Different visual logic for recruiter variant
          const getClasses = () => {
            if (!date) return "cursor-default";

            if (variant === "recruiter") {
              if (selected)
                return "bg-blue-600 text-white font-bold border border-blue-600";
              if (interview)
                return "bg-blue-100 text-blue-700 font-semibold border border-blue-300";
            }

            // default variant look
            if (selected)
              return "bg-green-500 text-white font-bold border border-green-500";
            if (interview)
              return "bg-green-100 text-green-600 font-semibold border border-green-300";
            if (today)
              return "bg-gray-200 text-gray-800 font-bold border border-gray-300";
            return "text-gray-700";
          };

          return (
            <button
              key={index}
              onClick={() => date && onDateSelect && onDateSelect(date.getDate())}
              className={`w-8 h-8 text-sm rounded flex items-center justify-center transition-colors ${
                !date ? "cursor-default" : "hover:bg-gray-200 cursor-pointer"
              } ${getClasses()}`}
              disabled={!date}
            >
              {date ? date.getDate() : ""}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;

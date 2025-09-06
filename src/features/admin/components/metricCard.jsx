import React from 'react';

const MetricCard = ({ 
  title, 
  count, 
  icon, 
  image,
  iconBgColor = 'bg-blue-100', 
  iconColor = 'text-blue-600',
  countColor = 'text-gray-900',
  titleColor = 'text-gray-600',
  className = '' 
}) => {
  return (
    <div className={`bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 ${className}`}>
      <div className="flex flex-col items-center text-center">
        <div className={`h-12 w-12 ${iconBgColor} rounded-lg flex items-center justify-center mb-2`}>
          {image ? (
            <img 
              src={image} 
              alt={title} 
              className="w-6 h-6 object-contain"
            />
          ) : (
            <span className={`text-xl ${iconColor}`}>{icon}</span>
          )}
        </div>
        <h2 className={`text-xs font-medium ${titleColor} mb-1`}>{title}</h2>
        <p className={`text-2xl font-medium ${countColor} leading-none`}>{count}</p>
      </div>
    </div>
  );
};

export default MetricCard;

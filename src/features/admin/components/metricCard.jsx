import React from "react";

const MetricCard = ({
  title,
  count,
  icon,
  image,
  iconBgColor = "bg-blue-100",
  iconColor = "text-blue-600",
  countColor = "text-gray-900",
  titleColor = "text-gray-600",
  className = "",
}) => {
  return (
    <div
      className={`bg-white p-3 rounded-lg shadow-sm border border-[#0b537d34]   ${className}`}
    >
      <div className="flex flex-col items-center text-center gap-2 my-2">
        <div
          className={`h-12 w-12 ${iconBgColor} rounded-lg flex items-center justify-center mb-2`}
        >
          {image ? (
            <img src={image} alt={title} className="w-6 h-6 object-contain" />
          ) : (
            <span className={`text-xl ${iconColor}`}>{icon}</span>
          )}
        </div>
        <h2 className={`text-sm md:text-xl font-medium ${titleColor} mb-1`}>
          {title}
        </h2>
        <p className={`text-2xl font-medium ${countColor} leading-none`}>
          {count}
        </p>
      </div>
    </div>
  );
};

// Reusable pill-shaped metric button for quick actions around the dashboard
// Usage: <MetricPillButton label="CMS Editor" icon={<YourIcon />} onClick={...} />
export const MetricPillButton = ({
  label,
  icon,
  onClick,
  className = "",
  active = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-white border-2 border-[#5B9821] transition-colors text-[#5B9821] ${
        active ? "ring-2 ring-[#5B9821]/30" : ""
      } ${className}`}
    >
      <span className="w-6 h-6 rounded-full grid place-items-center bg-[rgba(92,154,36,0.15)] text-[#5B9821]">
        {icon}
      </span>
      <span className="text-sm font-bold whitespace-nowrap">{label}</span>
    </button>
  );
};

// Helper component to render a list/row of metric buttons
// items: [{ key, label, icon, onClick, active }]
export const MetricPillRow = ({ items = [], className = "" }) => {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {items.map((item) => (
        <MetricPillButton key={item.key ?? item.label} {...item} />
      ))}
    </div>
  );
};

// Matrix Card Component - Clean header card with title and subtitle
// Usage: <MatrixCard title="Dashboard Overview" subtitle="Monitor your platform's key metrics and performance" />
export const MatrixCard = ({
  title,
  subtitle,
  className = "",
  titleColor = "text-[#1A569A]",
  subtitleColor = "text-[#1A569A]",
}) => {
  return (
    <div
      className={`bg-white rounded-lg border border-[#0b537d28] shadow-sm p-6 text-center ${className}`}
    >
      <h2 className={`text-xl md:text-2xl font-semibold ${titleColor} mb-2`}>
        {title}
      </h2>
      <p className={`text-base md:text-md ${subtitleColor}`}>{subtitle}</p>
    </div>
  );
};

// Horizontal4Cards Component - Displays 4 metric cards in a horizontal row
// Usage: <Horizontal4Cards data={[
//   { title: 'Total Revenue', value: '₹2,50,000', delta: '+12%', icon: <LuUsers /> },
//   { title: 'Employer Revenue', value: '₹1,50,000', delta: '+5.5%', icon: <LuUsers /> },
//   { title: 'Institute Revenue', value: '₹50,000', delta: '+55.7%', icon: <LuUsers /> },
//   { title: 'Student Revenue', value: '₹20,000', delta: '+2.2%', icon: <LuUsers /> }
// ]} />
export const Horizontal4Cards = ({
  data = [],
  className = "",
  cardClassName = "",
}) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
    >
      {data.map((card, index) => (
        <div
          key={index}
          className={`bg-white rounded-lg border border-[#0b537d3c] shadow-sm p-6 ${cardClassName}`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="">
              <h3 className="text-sm md:text-lg text-gray-900">
                {card.title}
              </h3>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center border border-[#0b537d3c]">
              <span className="w-5 h-5 text-blue-600">{card.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default MetricCard;

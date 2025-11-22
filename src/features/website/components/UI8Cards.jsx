import React from "react";
import { FaArrowRight } from "react-icons/fa";

const BrowseJobByCategory = ({ jobCategories = [], headerContent }) => {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-[#00395B]">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Header Section */}
        {headerContent && (
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-center mb-8 sm:mb-10 md:mb-12 text-center lg:text-left">
            {/* Main Heading */}
            <div className="mb-6 lg:mb-0 w-full lg:w-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
                {headerContent.title}
              </h2>
            </div>

            {/* Descriptive Text and CTA */}
            <div className="w-full lg:w-auto lg:text-right flex flex-col items-center lg:items-end">
              <p className="text-white text-sm sm:text-base md:text-lg mb-4 max-w-md">
                {headerContent.description}
              </p>
              {headerContent.cta && (
                <div className="w-full sm:w-auto flex justify-center lg:justify-end">
                  {headerContent.cta}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Job Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <category.icon className="text-[#0B537D] text-2xl" />
              </div>

              {/* Job Title */}
              <h3 className="text-[#0B537D] font-bold text-lg mb-2">
                {category.title}
              </h3>

              {/* Job Count and Arrow */}
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm">
                  {category.count} {category.subject}
                </span>
                <FaArrowRight className="text-[#0B537D] text-sm group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseJobByCategory;

import React from 'react';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';

const TrustedByStartups = ({ testimonials = [], headerContent }) => {

  return (
    <section className="bg-white p-5">
      <div className="max-w-[90%] mx-auto px-6 md:px-10 py-16 bg-[#00395B] rounded-3xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Text Content */}
          <div className="space-y-8">
            {/* Main Heading */}
            <div>
              {headerContent?.title}
            </div>

            {/* Description */}
            <div>
              {headerContent?.status}
              {headerContent?.description}
            </div>

            {/* Navigation Arrows */}
            <div className="flex space-x-4">
              {headerContent?.navigation}
            </div>
          </div>

          {/* Right Section - Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                {/* Quote Icon */}
                <div className="mb-4">
                  <FaQuoteLeft className="text-[#5C9A24] text-4xl" />
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {testimonial.text}
                </p>

                {/* Divider Line */}
                <div className="border-t border-gray-200 mb-4"></div>

                {/* Author Details */}
                <div className="flex items-center space-x-3">
                  {/* Avatar Placeholder */}
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                  
                  {/* Author Info */}
                  <div>
                    <h4 className="text-[#5C9A24] font-semibold text-sm">
                      {testimonial.author}
                    </h4>
                    <p className="text-gray-500 text-xs">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedByStartups;

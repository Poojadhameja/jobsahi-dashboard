import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import textunderline from '../assets/website_text_underline.png';
const FAQ = ({ faqs = [], headerContent }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header Section */}
        {headerContent && (
          <div className="text-center mb-12">
            <div className="flex flex-col items-center justify-center text-center mb-5 md:mb-12 "> <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-[#0B537D]">
              {headerContent.title}
            </h1>
             <img src={textunderline} alt="" className="w-[40%] h-[15px] md:h-[20px] -mt-4" /></div>       
            <p className="text-gray-600 max-w-2xl mx-auto">
              {headerContent.description}
            </p>
          </div>
        )}

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${
                openIndex === index 
                  ? 'bg-gray-100 rounded-lg shadow-sm' 
                  : 'bg-transparent'
              } transition-all duration-300`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full px-6 py-4 text-left flex items-center justify-between ${
                  openIndex === index 
                    ? 'hover:bg-gray-200' 
                    : 'hover:bg-gray-50'
                } transition-colors rounded-lg`}
              >
                <h3 className="text-lg font-semibold text-gray-800 pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <FaMinus className="text-gray-600 text-lg" />
                ) : (
                  <FaPlus className="text-gray-600 text-lg" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

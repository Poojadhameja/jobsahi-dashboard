import React, { useState } from 'react'
import { colors } from '../../../../shared/colors'
import { FaPlus, FaMinus } from 'react-icons/fa'

const GotAnswers = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'How do I create an account on JOBSAHI?',
      answer: 'Creating an account is simple! Just click on the "Sign Up" button, fill in your basic information, verify your email, and you\'re ready to start your job search journey.'
    },
    {
      question: 'Is JOBSAHI free for students?',
      answer: 'Yes, JOBSAHI is completely free for ITI and Polytechnic students. We believe in providing equal opportunities for all students to access quality job opportunities.'
    },
    {
      question: 'What types of jobs are available on JOBSAHI?',
      answer: 'We offer a wide range of job opportunities including engineering positions, technical roles, manufacturing jobs, healthcare positions, and many more across various industries.'
    },
    {
      question: 'How does the job matching work?',
      answer: 'Our AI-powered system analyzes your profile, skills, and preferences to match you with relevant job opportunities. The more complete your profile, the better the matches.'
    },
    {
      question: 'Can I apply for jobs directly through JOBSAHI?',
      answer: 'Yes! You can apply for jobs directly through our platform. Simply browse jobs, click apply, and your application will be sent to the employer.'
    },
    {
      question: 'How do I update my resume on JOBSAHI?',
      answer: 'You can easily update your resume by going to your profile settings and uploading a new version. We recommend keeping your resume updated with your latest skills and experience.'
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span style={{ color: colors.primary.blue }}>Got</span>{' '}
            <span style={{ color: colors.accent.green }}>Questions?</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to the most commonly asked questions about JOBSAHI and our services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-800 pr-4">{faq.question}</h3>
                {openIndex === index ? (
                  <FaMinus style={{ color: colors.accent.green }} />
                ) : (
                  <FaPlus style={{ color: colors.primary.blue }} />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button 
            className="px-8 py-3 rounded-full text-white font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: colors.primary.blue }}
          >
            Contact Support
          </button>
        </div>
      </div>
    </section>
  )
}

export default GotAnswers

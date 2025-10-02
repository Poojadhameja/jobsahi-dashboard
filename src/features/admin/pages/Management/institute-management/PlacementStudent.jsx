import React, { useState } from 'react'
import { 
  LuEye, 
  LuUser,
  LuMail,
  LuPhone,
  LuMapPin,
  LuCalendar,
  LuFileText,
  LuGraduationCap,
  LuAward,
  LuBriefcase,
  LuGlobe
} from 'react-icons/lu'
import { HiDotsVertical } from 'react-icons/hi'

// Placement Ready Students Table Component
function PlacementReadyStudentsTable() {
  const [studentCVModal, setStudentCVModal] = useState({ isOpen: false, student: null })

  // Handle View Details
  const handleViewDetails = (student) => {
    setStudentCVModal({ isOpen: true, student })
  }

  const handleCloseViewDetails = () => {
    setStudentCVModal({ isOpen: false, student: null })
  }

  const studentData = [
    {
      name: "Emily Wilson",
      courseField: "Computer Science",
      courseDegree: "M.Sc.",
      placementDrive: "05 Mar, 2024",
      status: "Placed"
    },
    {
      name: "Daniel Brown",
      courseField: "Business Administration",
      courseDegree: "MBA",
      placementDrive: "12 Feb, 2024",
      status: "Eligible"
    },
    {
      name: "Jessica Taylor",
      courseField: "Business Administration",
      courseDegree: "MBA",
      placementDrive: "25 Jan, 2024",
      status: "Placed"
    },
    {
      name: "David Lee",
      courseField: "Data Science",
      courseDegree: "M.Sc.",
      placementDrive: "08 Dec, 2023",
      status: "Eligible"
    },
    {
      name: "Sophia Martinez",
      courseField: "Data Science",
      courseDegree: "M.Sc.",
      placementDrive: "15 Nov, 2023",
      status: "Placed"
    }
  ]

  // Action Dropdown Component
  const ActionDropdown = ({ student, onViewDetails }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = React.useRef(null)

    // Close dropdown when clicking outside
    React.useEffect(() => {
      function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleViewDetails = () => {
      setIsOpen(false)
      onViewDetails(student)
    }

    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
        >
          <HiDotsVertical className="text-gray-600" size={18} />
        </button>
        
        {isOpen && (
          <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[140px]">
            <button
              onClick={handleViewDetails}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors duration-200"
            >
              <LuEye size={16} />
              View Details
            </button>
          </div>
        )}
      </div>
    )
  }

  // Student CV Modal Component
  const StudentCVModal = ({ student, isOpen, onClose }) => {
    if (!isOpen || !student) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Student CV Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Personal Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                <LuUser className="text-blue-600" size={20} />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Full Name</label>
                  <p className="text-gray-800 font-medium">{student.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Email Address</label>
                  <p className="text-gray-800 flex items-center gap-2">
                    <LuMail size={16} className="text-gray-400" />
                    <a href={`mailto:${student.name.toLowerCase().replace(' ', '.')}@email.com`} className="text-blue-600 hover:underline">
                      {student.name.toLowerCase().replace(' ', '.')}@email.com
                    </a>
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Phone Number</label>
                  <p className="text-gray-800 flex items-center gap-2">
                    <LuPhone size={16} className="text-gray-400" />
                    <a href="tel:+919876543210" className="text-blue-600 hover:underline">
                      +91 9876543210
                    </a>
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Date of Birth</label>
                  <p className="text-gray-800 flex items-center gap-2">
                    <LuCalendar size={16} className="text-gray-400" />
                    15-03-1998
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Address</label>
                  <p className="text-gray-800 flex items-center gap-2">
                    <LuMapPin size={16} className="text-gray-400" />
                    123 Student Street, City, State 12345
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">LinkedIn Profile</label>
                  <p className="text-gray-800 flex items-center gap-2">
                    <LuGlobe size={16} className="text-gray-400" />
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      linkedin.com/in/{student.name.toLowerCase().replace(' ', '')}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Educational Background */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                <LuGraduationCap className="text-green-600" size={20} />
                Educational Background
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">{student.courseDegree} in {student.courseField}</h4>
                    <span className="text-sm text-gray-500">2022 - 2024</span>
                  </div>
                  <p className="text-gray-600">University of Technology</p>
                  <p className="text-sm text-gray-500">CGPA: 8.5/10</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">Bachelor's Degree</h4>
                    <span className="text-sm text-gray-500">2018 - 2022</span>
                  </div>
                  <p className="text-gray-600">State University</p>
                  <p className="text-sm text-gray-500">CGPA: 8.2/10</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">Higher Secondary (12th)</h4>
                    <span className="text-sm text-gray-500">2016 - 2018</span>
                  </div>
                  <p className="text-gray-600">Central Board of Secondary Education</p>
                  <p className="text-sm text-gray-500">Percentage: 85%</p>
                </div>
              </div>
            </div>

            {/* Skills & Competencies */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                <LuAward className="text-purple-600" size={20} />
                Skills & Competencies
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Technical Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'MongoDB'].map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Soft Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {['Leadership', 'Communication', 'Problem Solving', 'Teamwork', 'Time Management'].map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Work Experience */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                <LuBriefcase className="text-orange-600" size={20} />
                Work Experience
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">Software Developer Intern</h4>
                    <span className="text-sm text-gray-500">Jun 2023 - Aug 2023</span>
                  </div>
                  <p className="text-gray-600 font-medium">Tech Solutions Pvt. Ltd.</p>
                  <ul className="text-sm text-gray-600 mt-2 list-disc list-inside">
                    <li>Developed web applications using React and Node.js</li>
                    <li>Collaborated with team members on project development</li>
                    <li>Participated in code reviews and testing processes</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">Part-time Tutor</h4>
                    <span className="text-sm text-gray-500">Jan 2022 - Dec 2023</span>
                  </div>
                  <p className="text-gray-600 font-medium">Online Tutoring Platform</p>
                  <ul className="text-sm text-gray-600 mt-2 list-disc list-inside">
                    <li>Taught programming concepts to students</li>
                    <li>Created educational content and tutorials</li>
                    <li>Mentored students in their academic projects</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Projects</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">E-commerce Platform</h4>
                  <p className="text-sm text-gray-600 mb-2">A full-stack e-commerce application with user authentication, product management, and payment integration.</p>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Node.js', 'MongoDB', 'Stripe API'].map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">Data Analysis Dashboard</h4>
                  <p className="text-sm text-gray-600 mb-2">Interactive dashboard for analyzing sales data with real-time charts and reporting features.</p>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'Pandas', 'Matplotlib', 'Flask'].map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications & Achievements */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Certifications & Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">AWS Certified Developer</h4>
                  <p className="text-sm text-gray-600">Amazon Web Services - 2023</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">Google Cloud Professional</h4>
                  <p className="text-sm text-gray-600">Google Cloud Platform - 2023</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">Hackathon Winner</h4>
                  <p className="text-sm text-gray-600">Tech Innovation Challenge - 2022</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">Dean's List</h4>
                  <p className="text-sm text-gray-600">University of Technology - 2023</p>
                </div>
              </div>
            </div>

            {/* Placement Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Placement Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Placement Drive Date</label>
                  <p className="text-gray-800">{student.placementDrive}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Current Status</label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    student.status === 'Placed' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {student.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Expected Salary</label>
                  <p className="text-gray-800">₹8-12 LPA</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Preferred Location</label>
                  <p className="text-gray-800">Bangalore, Mumbai, Pune</p>
                </div>
              </div>
            </div>

            {/* Resume/CV Section */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Resume/CV</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📄</span>
                  <span className="text-gray-800">{student.name}_Resume.pdf</span>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Download CV
                </button>
              </div>
            </div>
          </div>
          
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">✓</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Placement Ready Student</h2>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Placement Drive
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {studentData.map((student, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.courseField}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.courseDegree}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.placementDrive}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      student.status === 'Placed' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ActionDropdown 
                      student={student} 
                      onViewDetails={handleViewDetails} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student CV Modal */}
      <StudentCVModal 
        student={studentCVModal.student}
        isOpen={studentCVModal.isOpen}
        onClose={handleCloseViewDetails}
      />
    </div>
  )
}

export default function PlacementStudent() {
  return <PlacementReadyStudentsTable />
}

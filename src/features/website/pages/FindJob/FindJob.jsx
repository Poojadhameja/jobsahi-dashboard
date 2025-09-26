import React, { useState } from 'react'
import { colors } from '../../../../shared/colors'
import { FaSearch, FaMapMarkerAlt, FaBriefcase, FaBookmark, FaFilter, FaTimes } from 'react-icons/fa'
import Subscribe from '../Home/Subscribe'
import Footer from '../../components/Footer'

const FindJob = ({ onClose }) => {
  const [selectedEmployment, setSelectedEmployment] = useState(['Part Time'])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedLevels, setSelectedLevels] = useState([])
  const [salaryRange, setSalaryRange] = useState([1000, 6000])

  const employmentTypes = [
    { name: 'Part Time', count: 120, selected: selectedEmployment.includes('Part Time') },
    { name: 'Full Time', count: 200, selected: selectedEmployment.includes('Full Time') },
    { name: 'Remote', count: 90, selected: selectedEmployment.includes('Remote') },
    { name: 'Internship', count: 98, selected: selectedEmployment.includes('Internship') },
    { name: 'Freelance', count: 150, selected: selectedEmployment.includes('Freelance') }
  ]

  const jobCategories = [
    { name: 'Creative Design', count: 200 },
    { name: 'Development', count: 120 },
    { name: 'Marketing', count: 90 },
    { name: 'Customer Care', count: 98 },
    { name: 'Customer Service', count: 150 },
    { name: 'Finance', count: 150 }
  ]

  const jobLevels = [
    { name: 'Entry Level', count: 200 },
    { name: 'Mid Level', count: 120 },
    { name: 'Senior Level', count: 90 },
    { name: 'Director', count: 96 },
    { name: 'VP', count: 150 }
  ]

  const jobListings = [
    {
      id: 1,
      title: 'Product Designer',
      company: 'Inova Agency',
      location: 'Madrid, Spain',
      type: 'Full Time',
      salary: '1500/weekly',
      applied: 4,
      capacity: 70,
      skills: ['HTML', 'CSS', 'PHP'],
      logo: 'G',
      logoColor: 'var(--color-primary)'
    },
    {
      id: 2,
      title: 'Full Stack Engineer',
      company: 'Orange Tech',
      location: 'Hbg, Indonesia',
      type: 'Full Time',
      salary: '1500/weekly',
      applied: 3,
      capacity: 50,
      skills: ['HTML', 'CSS', 'PHP'],
      logo: 'G',
      logoColor: 'var(--color-secondary)'
    },
    {
      id: 3,
      title: 'Ads Management',
      company: 'Google',
      location: 'California, US',
      type: 'Full Time',
      salary: '1500/weekly',
      applied: 5,
      capacity: 30,
      skills: ['HTML', 'CSS', 'PHP'],
      logo: 'G',
      logoColor: 'var(--color-secondary)'
    },
    {
      id: 4,
      title: 'UI/UX Designer',
      company: 'Behance',
      location: 'New York, US',
      type: 'Full Time',
      salary: '1500/weekly',
      applied: 2,
      capacity: 25,
      skills: ['HTML', 'CSS', 'PHP'],
      logo: 'Be',
      logoColor: 'var(--color-primary)'
    },
    {
      id: 5,
      title: 'Brand Designer',
      company: 'Adobe Creative',
      location: 'San Francisco, CA',
      type: 'Full Time',
      salary: '1500/weekly',
      applied: 6,
      capacity: 40,
      skills: ['HTML', 'CSS', 'PHP'],
      logo: 'A',
      logoColor: 'var(--color-secondary)'
    },
    {
      id: 6,
      title: 'Social Media Officer',
      company: 'Parsons Intl',
      location: 'London, UK',
      type: 'Full Time',
      salary: '1500/weekly',
      applied: 3,
      capacity: 35,
      skills: ['HTML', 'CSS', 'PHP'],
      logo: 'S',
      logoColor: 'var(--color-secondary)'
    },
    {
      id: 7,
      title: 'Product Designer',
      company: 'Inova Agency',
      location: 'Madrid, Spain',
      type: 'Full Time',
      salary: '1500/weekly',
      applied: 4,
      capacity: 70,
      skills: ['HTML', 'CSS', 'PHP'],
      logo: 'G',
      logoColor: 'var(--color-primary)'
    }
  ]

  const handleEmploymentToggle = (type) => {
    if (selectedEmployment.includes(type)) {
      setSelectedEmployment(selectedEmployment.filter(item => item !== type))
    } else {
      setSelectedEmployment([...selectedEmployment, type])
    }
  }

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(item => item !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const handleLevelToggle = (level) => {
    if (selectedLevels.includes(level)) {
      setSelectedLevels(selectedLevels.filter(item => item !== level))
    } else {
      setSelectedLevels([...selectedLevels, level])
    }
  }
 
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="min-h-screen rounded-3xl" style={{ backgroundColor: 'var(--color-bg-white)' }}>
      {/* Hero Section */}
      <div className="py-16 px-6 rounded-md" style={{ background: 'linear-gradient(to right, var(--color-primary-10), var(--color-secondary-10))' }}>
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-block rounded-full px-4 py-2 mb-6" style={{ backgroundColor: 'var(--color-secondary-10)', border: '1px solid var(--color-secondary)' }}>
            <span className="font-semibold text-sm" style={{ color: 'var(--color-secondary-dark)' }}>#1 PORTAL JOB PLATFORM</span>
          </div>
          
                  {/* Main Heading */}
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    <span style={{ color: 'var(--color-primary)' }}>Find Your</span>{' '}
                    <span className="relative" style={{ color: 'var(--color-secondary)' }}>
                      Dream Job
                      <svg 
                        className="absolute -bottom-1 left-0 w-full h-2" 
                        viewBox="0 0 200 20" 
                        fill="none"
                      >
                        <path 
                          d="M5 15C60 5, 120 10, 195 8" 
                          stroke="var(--color-secondary-light)" 
                          strokeWidth="3" 
                          fill="none"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </h1>
          
          {/* Subtitle */}
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
            Discover thousands of job opportunities from top companies. Start your career journey with just one click.
          </p>
          
          {/* Search Bar */}
          <div className="rounded-full shadow-lg p-2 max-w-2xl mx-auto mb-8" style={{ backgroundColor: 'var(--color-bg-white)' }}>
            <div className="flex items-center">
              {/* Location Filter */}
              <div className="flex-1 flex items-center px-6 py-3 border-r" style={{ borderColor: 'var(--color-gray-200)' }}>
                <FaMapMarkerAlt className="mr-3" style={{ color: 'var(--color-secondary)' }} />
                <span className="mr-2" style={{ color: 'var(--color-text-muted)' }}>Location</span>
                <FaSearch className="text-sm" style={{ color: 'var(--color-text-muted)' }} />
              </div>
              
              {/* Category Filter */}
              <div className="flex-1 flex items-center px-6 py-3 border-r" style={{ borderColor: 'var(--color-gray-200)' }}>
                <FaBriefcase className="mr-3" style={{ color: 'var(--color-secondary)' }} />
                <span className="mr-2" style={{ color: 'var(--color-text-muted)' }}>Category</span>
                <FaSearch className="text-sm" style={{ color: 'var(--color-text-muted)' }} />
              </div>
              
              {/* Search Button */}
              <button 
                className="px-8 py-3 rounded-full transition-colors flex items-center"
                style={{ 
                  color: 'var(--color-bg-white)',
                  backgroundColor: 'var(--color-secondary)'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-secondary-dark)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-secondary)'}
              >
                <span className="mr-2">Search Jobs</span>
                <FaSearch />
              </button>
            </div>
          </div>
          
          {/* Popular Searches */}
          <p style={{ color: 'var(--color-text-muted)' }}>
            Popular: <span className="font-medium" style={{ color: 'var(--color-secondary)' }}>UI Designer, Graphic Designer, Data Analyst, Developer</span>
          </p>
        </div>
      </div>
      
      <div className="flex mt-8 mx-12 mb-20">
        {/* Left Panel - Filters */}
        <div className="w-1/3 p-6 min-h-screen rounded-l-lg" style={{ backgroundColor: 'var(--color-primary)' }}>
          <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--color-bg-white)' }}>Filter By</h3>
          
          {/* Type of Employment */}
          <div className="mb-8">
            <h4 className="text-lg font-medium mb-4" style={{ color: 'var(--color-bg-white)' }}>Type Of Employment</h4>
            <div className="space-y-3">
              {employmentTypes.map((type) => (
                <label key={type.name} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={type.selected}
                    onChange={() => handleEmploymentToggle(type.name)}
                    className="w-4 h-4 rounded focus:ring-2"
                    style={{ 
                      accentColor: 'var(--color-secondary)',
                      backgroundColor: 'var(--color-gray-100)',
                      borderColor: 'var(--color-gray-300)'
                    }}
                  />
                  <span className="text-sm" style={{ color: 'var(--color-bg-white)' }}>
                    {type.name} ({type.count})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Job Categories */}
          <div className="mb-8">
            <h4 className="text-lg font-medium mb-4" style={{ color: 'var(--color-bg-white)' }}>Job Categories</h4>
            <div className="space-y-3">
              {jobCategories.map((category) => (
                <label key={category.name} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => handleCategoryToggle(category.name)}
                    className="w-4 h-4 rounded focus:ring-2"
                    style={{ 
                      accentColor: 'var(--color-secondary)',
                      backgroundColor: 'var(--color-gray-100)',
                      borderColor: 'var(--color-gray-300)'
                    }}
                  />
                  <span className="text-sm" style={{ color: 'var(--color-bg-white)' }}>
                    {category.name} ({category.count})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Job Level */}
          <div className="mb-8">
            <h4 className="text-lg font-medium mb-4" style={{ color: 'var(--color-bg-white)' }}>Job Level</h4>
            <div className="space-y-3">
              {jobLevels.map((level) => (
                <label key={level.name} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedLevels.includes(level.name)}
                    onChange={() => handleLevelToggle(level.name)}
                    className="w-4 h-4 rounded focus:ring-2"
                    style={{ 
                      accentColor: 'var(--color-secondary)',
                      backgroundColor: 'var(--color-gray-100)',
                      borderColor: 'var(--color-gray-300)'
                    }}
                  />
                  <span className="text-sm" style={{ color: 'var(--color-bg-white)' }}>
                    {level.name} ({level.count})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Salary Range */}
          <div className="mb-8">
            <h4 className="text-lg font-medium mb-4" style={{ color: 'var(--color-bg-white)' }}>Salary Range</h4>
            <div className="space-y-4">
              <div className="flex justify-between text-sm" style={{ color: 'var(--color-bg-white)' }}>
                <span>${salaryRange[0].toLocaleString()}</span>
                <span>${salaryRange[1].toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="10000"
                step="500"
                value={salaryRange[1]}
                onChange={(e) => setSalaryRange([salaryRange[0], parseInt(e.target.value)])}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
                style={{ backgroundColor: 'var(--color-gray-200)' }}
              />
            </div>
          </div>

          {/* Apply Filter Button */}
          <button
            className="w-full py-3 font-semibold rounded-lg transition-colors"
            style={{ 
              color: 'var(--color-bg-white)',
              backgroundColor: 'var(--color-secondary)'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-secondary-dark)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-secondary)'}
          >
            Apply Filter
          </button>
        </div>

        {/* Right Panel - Job Listings */}
        <div className="flex-1 p-6 rounded-r-lg" style={{ backgroundColor: 'var(--color-bg-white)' }}>
          {/* Header */}
          <div className="flex justify-between items-center mb-6 mx-2">
            <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>All 28 Jobs Found</h2>
            <div className="flex items-center space-x-2">
              <span style={{ color: 'var(--color-text-muted)' }}>Short by:</span>
              <select 
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: 'var(--color-gray-300)',
                  backgroundColor: 'var(--color-bg-white)',
                  color: 'var(--color-text-primary)'
                }}
              >
                <option>Newest Upward</option>
                <option>Oldest First</option>
                <option>Salary High to Low</option>
                <option>Salary Low to High</option>
              </select>
            </div>
          </div>

          {/* Job Cards */}
          <div className="space-y-6">
            {jobListings.map((job) => (
              <div key={job.id} className="rounded-lg p-6 hover:shadow-md transition-shadow mx-2" style={{ backgroundColor: 'var(--color-bg-white)', border: '1px solid var(--color-gray-200)' }}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    {/* Company Logo */}
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                      style={{ backgroundColor: job.logoColor }}
                    >
                      {job.logo}
                    </div>
                    
                    {/* Job Details */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>{job.title}</h3>
                      <p className="mb-3" style={{ color: 'var(--color-text-muted)' }}>{job.company} • {job.location}</p>
                      
                      {/* Job Details with Icons */}
                      <div className="flex items-center space-x-6 mb-4">
                        <div className="flex items-center space-x-2">
                          <FaBriefcase style={{ color: 'var(--color-text-muted)' }} />
                          <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{job.type}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{job.salary}</span>
                        </div>
                      </div>
                      
                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.map((skill, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 text-sm font-medium rounded-full"
                            style={{ backgroundColor: 'var(--color-secondary-10)', color: 'var(--color-secondary-dark)' }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      {/* Application Progress */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>
                          <span>{job.applied} Applied of {job.capacity} Capacity</span>
                        </div>
                        <div className="w-full rounded-full h-2" style={{ backgroundColor: 'var(--color-gray-200)' }}>
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              width: `${(job.applied / job.capacity) * 100}%`,
                              backgroundColor: 'var(--color-primary)'
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-3">
                    <button
                      className="px-6 py-2 font-semibold rounded-lg transition-colors"
                      style={{ 
                        color: 'var(--color-bg-white)',
                        backgroundColor: 'var(--color-secondary)'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-secondary-dark)'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-secondary)'}
                    >
                      Apply Job
                    </button>
                    <button 
                      className="flex flex-col items-center space-y-1 transition-colors"
                      style={{ color: 'var(--color-text-muted)' }}
                      onMouseEnter={(e) => e.target.style.color = 'var(--color-text-primary)'}
                      onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
                    >
                      <FaBookmark className="w-5 h-5" />
                      <span className="text-xs">save</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 mx-2">
            <div className="flex items-center space-x-2">
              <button 
                className="px-3 py-2 transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--color-text-primary)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
              >‹</button>
                <button 
                  className="px-3 py-2 rounded"
                  style={{ 
                    color: 'var(--color-bg-white)',
                    backgroundColor: 'var(--color-secondary)'
                  }}
                >1</button>
              <button 
                className="px-3 py-2 transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--color-text-primary)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
              >2</button>
              <button 
                className="px-3 py-2 transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--color-text-primary)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
              >3</button>
              <button 
                className="px-3 py-2 transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--color-text-primary)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
              >4</button>
              <button 
                className="px-3 py-2 transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--color-text-primary)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
              >›</button>
            </div>
          </div>
        </div>
      </div>
      
              {/* Subscribe Section */}
              <Subscribe />
       
       {/* Footer */}
       <Footer />
      </div>
    </div>
   )
}

export default FindJob

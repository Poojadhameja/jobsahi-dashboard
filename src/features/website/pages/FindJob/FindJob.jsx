import React, { useState, useEffect } from 'react'
import { colors } from '../../../../shared/colors'
import { FaSearch, FaMapMarkerAlt, FaBriefcase, FaFilter } from 'react-icons/fa'
import NewsletterSubscription from '../../components/NewsletterSubscription'
import Footer from '../../components/Footer'
import JobDetails from './JobDetails'
import textunderline from "../../assets/website_text_underline.png";
import Navbar from '../../components/Navbar'

const FindJob = ({ onClose }) => {
  const [selectedEmployment, setSelectedEmployment] = useState(['Part Time'])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedLevels, setSelectedLevels] = useState([])
  const [salaryRange, setSalaryRange] = useState([1000, 6000])
  const [showJobPopup, setShowJobPopup] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

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
      company: 'Lounge Tech',
      location: 'Mig, Indonesia',
      type: 'Fulltime',
      salary: '1500/Monthly',
      applied: 4,
      capacity: 70,
      skills: ['App', 'Figma', 'PSD'],
      logo: 'L',
      logoColor: colors.Darkblue.dblue,
      experience: 'Entry Level',
      postedOn: 'May, 10 2024',
      applyBefore: 'June, 10 2024',
      description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
      responsibilities: [
        'Collaborate daily with a multidisciplinary team of Software Engineers, Researchers, Strategists, and Project Managers.',
        'Maintain quality of the design process and ensure that when designs are translated into code they accurately reflect the design specifications.',
        'Co-lead ideation sessions, workshops, demos, and presentations with clients on-site',
        'Push for and create inclusive, accessible design for all',
        'Ensure content strategy and design are perfectly in-sync'
      ],
      requirements: [
        'Advanced troubleshooting skills',
        'bachelor\'s degree in computer science or a related field',
        'Knowledge of HTML/CSS',
        'Experience with Git and GitHub',
        'The ability to use JavaScript'
      ],
      benefits: [
        { title: 'Full Healthcare', icon: 'FaShieldAlt', description: 'We believe in thriving communities and that starts with our team being happy and healthy.' },
        { title: 'Skill Development', icon: 'FaRocket', description: 'We believe in thriving communities and that starts with our team being happy and healthy.' },
        { title: 'Team Summits', icon: 'FaUsers', description: 'We believe in thriving communities and that starts with our team being happy and healthy.' },
        { title: 'Team Gathering', icon: 'FaBullhorn', description: 'We believe in thriving communities and that starts with our team being happy and healthy.' },
        { title: 'Commuter Benefits', icon: 'FaBus', description: 'We believe in thriving communities and that starts with our team being happy and healthy.' }
      ]
    },
    {
      id: 2,
      title: 'Full Stack Engineer',
      company: 'Orange Tech',
      location: 'Hbg, Indonesia',
      type: 'Fulltime',
      salary: '1800/Monthly',
      applied: 3,
      capacity: 50,
      skills: ['React', 'Node.js', 'MongoDB'],
      logo: 'O',
      logoColor: 'var(--color-secondary)',
      experience: 'Mid Level',
      postedOn: 'May, 12 2024',
      applyBefore: 'June, 12 2024',
      description: 'We are looking for a passionate Full Stack Engineer to join our dynamic team. You will be responsible for developing and maintaining web applications using modern technologies.',
      responsibilities: [
        'Develop and maintain web applications using React and Node.js',
        'Design and implement RESTful APIs and microservices',
        'Collaborate with cross-functional teams to deliver high-quality software',
        'Write clean, maintainable, and efficient code',
        'Participate in code reviews and technical discussions'
      ],
      requirements: [
        '3+ years of experience in full-stack development',
        'Strong knowledge of JavaScript, React, and Node.js',
        'Experience with databases (MongoDB, PostgreSQL)',
        'Familiarity with cloud platforms (AWS, Azure)',
        'Excellent problem-solving and communication skills'
      ],
      benefits: [
        { title: 'Health Insurance', icon: 'FaShieldAlt', description: 'Comprehensive health coverage for you and your family.' },
        { title: 'Learning Budget', icon: 'FaRocket', description: 'Annual budget for courses, conferences, and certifications.' },
        { title: 'Team Events', icon: 'FaUsers', description: 'Regular team building activities and company retreats.' },
        { title: 'Flexible Hours', icon: 'FaBullhorn', description: 'Work-life balance with flexible working hours.' },
        { title: 'Transportation', icon: 'FaBus', description: 'Commuter benefits and transportation allowances.' }
      ]
    },
    {
      id: 3,
      title: 'Ads Management Specialist',
      company: 'Google',
      location: 'California, US',
      type: 'Fulltime',
      salary: '2500/Monthly',
      applied: 5,
      capacity: 30,
      skills: ['Google Ads', 'Analytics', 'Marketing'],
      logo: 'G',
      logoColor: 'var(--color-secondary)',
      experience: 'Senior Level',
      postedOn: 'May, 15 2024',
      applyBefore: 'June, 15 2024',
      description: 'Join Google\'s advertising team to help businesses grow through effective digital marketing strategies. You will manage and optimize ad campaigns across various platforms.',
      responsibilities: [
        'Manage and optimize Google Ads campaigns for clients',
        'Analyze campaign performance and provide strategic recommendations',
        'Collaborate with marketing teams to develop advertising strategies',
        'Monitor budget allocation and ROI across multiple channels',
        'Stay updated with latest advertising trends and platform changes'
      ],
      requirements: [
        '5+ years of experience in digital advertising',
        'Google Ads and Google Analytics certifications preferred',
        'Strong analytical and data interpretation skills',
        'Experience with A/B testing and conversion optimization',
        'Excellent communication and client management skills'
      ],
      benefits: [
        { title: 'Premium Health', icon: 'FaShieldAlt', description: 'Top-tier health insurance with dental and vision coverage.' },
        { title: 'Career Growth', icon: 'FaRocket', description: 'Clear career progression paths and mentorship programs.' },
        { title: 'Google Perks', icon: 'FaUsers', description: 'Access to Google\'s world-class facilities and amenities.' },
        { title: 'Work Flexibility', icon: 'FaBullhorn', description: 'Hybrid work model with flexible scheduling options.' },
        { title: 'Commute Support', icon: 'FaBus', description: 'Shuttle service and parking benefits for office days.' }
      ]
    },
    {
      id: 4,
      title: 'UI/UX Designer',
      company: 'Behance',
      location: 'New York, US',
      type: 'Fulltime',
      salary: '2000/Monthly',
      applied: 2,
      capacity: 25,
      skills: ['Figma', 'Sketch', 'Prototyping'],
      logo: 'B',
      logoColor: colors.Darkblue.dblue,
      experience: 'Mid Level',
      postedOn: 'May, 18 2024',
      applyBefore: 'June, 18 2024',
      description: 'Create beautiful and intuitive user experiences for our creative platform. You will work closely with product managers and developers to bring designs to life.',
      responsibilities: [
        'Design user interfaces and user experiences for web and mobile applications',
        'Create wireframes, prototypes, and high-fidelity mockups',
        'Conduct user research and usability testing',
        'Collaborate with developers to ensure design implementation',
        'Maintain design systems and style guides'
      ],
      requirements: [
        '3+ years of UI/UX design experience',
        'Proficiency in Figma, Sketch, and Adobe Creative Suite',
        'Strong portfolio showcasing design skills',
        'Experience with user research and testing methodologies',
        'Knowledge of HTML/CSS and front-end development principles'
      ],
      benefits: [
        { title: 'Health Coverage', icon: 'FaShieldAlt', description: 'Comprehensive health and wellness benefits package.' },
        { title: 'Design Tools', icon: 'FaRocket', description: 'Latest design software and hardware provided.' },
        { title: 'Creative Community', icon: 'FaUsers', description: 'Join a vibrant community of creative professionals.' },
        { title: 'Flexible Schedule', icon: 'FaBullhorn', description: 'Flexible working hours and remote work options.' },
        { title: 'Transportation', icon: 'FaBus', description: 'Metro card and transportation reimbursement.' }
      ]
    },
    {
      id: 5,
      title: 'Brand Designer',
      company: 'Adobe Creative',
      location: 'San Francisco, CA',
      type: 'Fulltime',
      salary: '2200/Monthly',
      applied: 6,
      capacity: 40,
      skills: ['Illustrator', 'Photoshop', 'Branding'],
      logo: 'A',
      logoColor: 'var(--color-secondary)',
      experience: 'Senior Level',
      postedOn: 'May, 20 2024',
      applyBefore: 'June, 20 2024',
      description: 'Lead brand design initiatives for Adobe\'s creative suite. You will be responsible for creating compelling visual identities and brand experiences.',
      responsibilities: [
        'Develop and maintain brand guidelines and visual identity systems',
        'Create marketing materials, presentations, and digital assets',
        'Collaborate with marketing teams on brand campaigns',
        'Design logos, icons, and visual elements for products',
        'Ensure brand consistency across all touchpoints'
      ],
      requirements: [
        '5+ years of brand design experience',
        'Expert proficiency in Adobe Creative Suite',
        'Strong understanding of brand strategy and positioning',
        'Experience with print and digital design',
        'Excellent typography and color theory knowledge'
      ],
      benefits: [
        { title: 'Health Benefits', icon: 'FaShieldAlt', description: 'Premium health, dental, and vision insurance coverage.' },
        { title: 'Creative Tools', icon: 'FaRocket', description: 'Access to Adobe\'s complete creative suite and latest tools.' },
        { title: 'Design Team', icon: 'FaUsers', description: 'Work with world-class designers and creative professionals.' },
        { title: 'Work Balance', icon: 'FaBullhorn', description: 'Flexible work arrangements and unlimited PTO.' },
        { title: 'Bay Area Perks', icon: 'FaBus', description: 'Commuter benefits and Bay Area transportation options.' }
      ]
    },
    {
      id: 6,
      title: 'Social Media Officer',
      company: 'Parsons Intl',
      location: 'London, UK',
      type: 'Fulltime',
      salary: '1900/Monthly',
      applied: 3,
      capacity: 35,
      skills: ['Social Media', 'Content Creation', 'Analytics'],
      logo: 'P',
      logoColor: 'var(--color-secondary)',
      experience: 'Mid Level',
      postedOn: 'May, 22 2024',
      applyBefore: 'June, 22 2024',
      description: 'Manage and grow our social media presence across multiple platforms. Create engaging content and build strong online communities.',
      responsibilities: [
        'Develop and execute social media strategies across all platforms',
        'Create engaging content including posts, videos, and graphics',
        'Monitor social media analytics and optimize performance',
        'Engage with followers and manage community interactions',
        'Collaborate with marketing team on campaign development'
      ],
      requirements: [
        '3+ years of social media management experience',
        'Proficiency in social media platforms and management tools',
        'Strong content creation and copywriting skills',
        'Experience with social media analytics and reporting',
        'Creative thinking and trend awareness'
      ],
      benefits: [
        { title: 'Health Plan', icon: 'FaShieldAlt', description: 'Comprehensive health insurance with mental health support.' },
        { title: 'Skill Development', icon: 'FaRocket', description: 'Training budget for courses and professional development.' },
        { title: 'Team Culture', icon: 'FaUsers', description: 'Collaborative and creative work environment.' },
        { title: 'Flexible Work', icon: 'FaBullhorn', description: 'Hybrid work model with flexible hours.' },
        { title: 'London Transport', icon: 'FaBus', description: 'Oyster card and transportation benefits.' }
      ]
    },
    {
      id: 7,
      title: 'Product Designer',
      company: 'Inova Agency',
      location: 'Madrid, Spain',
      type: 'Fulltime',
      salary: '2100/Monthly',
      applied: 4,
      capacity: 70,
      skills: ['Product Design', 'User Research', 'Prototyping'],
      logo: 'I',
      logoColor: colors.Darkblue.dblue,
      experience: 'Senior Level',
      postedOn: 'May, 25 2024',
      applyBefore: 'June, 25 2024',
      description: 'Lead product design initiatives for innovative digital products. Work with cross-functional teams to create user-centered solutions.',
      responsibilities: [
        'Lead end-to-end product design process from research to implementation',
        'Conduct user research and usability testing sessions',
        'Create user personas, journey maps, and design specifications',
        'Collaborate with product managers and engineers on feature development',
        'Mentor junior designers and contribute to design system development'
      ],
      requirements: [
        '5+ years of product design experience',
        'Strong portfolio demonstrating user-centered design process',
        'Proficiency in Figma, Sketch, and prototyping tools',
        'Experience with user research methodologies',
        'Excellent communication and presentation skills'
      ],
      benefits: [
        { title: 'Health Insurance', icon: 'FaShieldAlt', description: 'Comprehensive health coverage including dental and vision.' },
        { title: 'Design Resources', icon: 'FaRocket', description: 'Access to latest design tools and professional development.' },
        { title: 'Design Team', icon: 'FaUsers', description: 'Work with talented designers in a collaborative environment.' },
        { title: 'Work Flexibility', icon: 'FaBullhorn', description: 'Flexible hours and remote work opportunities.' },
        { title: 'Madrid Benefits', icon: 'FaBus', description: 'Transportation benefits and Madrid city perks.' }
      ]
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

  const handleJobClick = (job) => {
    setSelectedJob(job)
    setShowJobPopup(true)
  }

  const handleClosePopup = () => {
    setShowJobPopup(false)
    setSelectedJob(null)
  }

  const handleApplyJob = (e) => {
    e.stopPropagation() // Prevent job card click
    window.location.href = '/login'
  }

  const handleSubscribe = (subscriberEmail) => {
    console.log('Subscribing email:', subscriberEmail)
    setIsSubscribed(true)
    setEmail('')
    // You can add API call here to save the subscription
    setTimeout(() => {
      setIsSubscribed(false)
    }, 5000)
  }

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (showJobPopup) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showJobPopup])

 
  return (
    <div className=" min-h-screen" style={{ backgroundColor: colors.Darkblue.dblue }}>
      <Navbar />
        <div className="">
      {/* Hero Section */}
      <div className="py-16 rounded-[50px] bg-[#EAF5FB]  mx-4  my-8">
        <div className="max-w-4xl mx-auto text-center ">
          {/* Badge */}
          <div className="inline-block rounded-full px-4 py-2 mb-6" style={{ backgroundColor: 'var(--color-secondary-10)', border: '1px solid var(--color-secondary)' }}>
            <span className="font-semibold text-sm" style={{ color: 'var(--color-secondary-dark)' }}>#1 PORTAL JOB PLATFORM</span>
          </div>
          
                  {/* Main Heading */}
                  <div className="flex flex-col items-center justify-center text-center mb-5 md:mb-12 ">
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:px-20 font-bold mb-8 text-[#0B537D] leading-tight">
              Find Your Dream Job
              </h1>
              <img src={textunderline} alt="" className="w-[30%] h-[15px] md:h-[25px] -mt-10" />
            </div>
          
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
      
      <div className="flex md:gap-10 py-10 px-5 md:px-16 mb-20 bg-white">
        {/* Left Panel - Filters */}
         <div className="">
        <div className="  min-h-screen rounded-l-lg" >
         <h3 className="text-xl font-semibold mb-6" style={{ color: colors.Darkblue.dblue }}>Filter By</h3>
          
         <div className="p-4 md:p-8 rounded-xl "style={{ backgroundColor:colors.Darkblue.dblue }}>

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
            <h4 className="text-lg font-medium mb-4" style={{ color: colors.text.white }}>Salary Range</h4>
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
        </div>
         </div>

        {/* Right Panel - Job Listings */}
        <div className="flex-1 p-6 rounded-r-lg" style={{ backgroundColor: 'var(--color-bg-white)' }}>
          {/* Header */}
          <div className="flex justify-between items-center mb-6 mx-2">
            <h2 className="text-2xl font-bold" style={{ color: colors.Darkblue.dblue }}>All 28 Jobs Found</h2>
            <div className="flex items-center space-x-2">
              <span style={{ color: 'var(--color-text-muted)' }}>Short by:</span>
              <select 
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: 'var(--color-gray-300)',
                  backgroundColor: 'var(--color-bg-white)',
                  color: colors.Darkblue.dblue
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
              <div 
                key={job.id} 
                className="rounded-lg p-6 hover:shadow-md transition-shadow mx-2 cursor-pointer" 
                style={{ backgroundColor: 'var(--color-bg-white)', border: '1px solid var(--color-gray-200)' }}
                onClick={() => handleJobClick(job)}
              >
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
                      <h3 className="text-xl font-bold mb-1" style={{ color: colors.Darkblue.dblue }}>{job.title}</h3>
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
                              backgroundColor: colors.Darkblue.dblue
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-3" onClick={(e) => e.stopPropagation()}>
                    <button
                      className="px-6 py-2 font-semibold rounded-lg transition-colors"
                      style={{ 
                        color: 'var(--color-bg-white)',
                        backgroundColor: 'var(--color-secondary)'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-secondary-dark)'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-secondary)'}
                      onClick={handleApplyJob}
                    >
                      Apply Job
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
                onMouseEnter={(e) => e.target.style.color = colors.Darkblue.dblue}
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
                onMouseEnter={(e) => e.target.style.color = colors.Darkblue.dblue}
                onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
              >2</button>
              <button 
                className="px-3 py-2 transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => e.target.style.color = colors.Darkblue.dblue}
                onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
              >3</button>
              <button 
                className="px-3 py-2 transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => e.target.style.color = colors.Darkblue.dblue}
                onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
              >4</button>
              <button 
                className="px-3 py-2 transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => e.target.style.color = colors.Darkblue.dblue}
                onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
              >›</button>
            </div>
          </div>
        </div>
      </div>
      
              {/* Subscribe Section */}
              <NewsletterSubscription 
                headerContent={{
                  title: "New Things Will Always Update Regularly"
                }}
                email={email}
                setEmail={setEmail}
                onSubscribe={handleSubscribe}
                isSubscribed={isSubscribed}
              />
       
       {/* Footer */}
       <Footer />
      </div>
      
      {/* Job Detail Popup */}
      {showJobPopup && <JobDetails job={selectedJob} onClose={handleClosePopup} />}
    </div>
   )
}

export default FindJob

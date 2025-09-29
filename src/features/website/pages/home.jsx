  import React, { useState, useEffect } from "react";
  import Navbar from "../components/Navbar";
  import Footer from "../components/Footer";
  import BrowseJobByCategory from "../components/BrowseJobByCategory";
  import TrustedByStartups from "../components/TrustedByStartups";
  import FAQ from "../components/FAQ";
  import NewsletterSubscription from "../components/NewsletterSubscription";
  import { colors } from "../../../shared/colors";
  import uploadresumebg from "../assets/uploadresumebg.png";

  import textunderline from "../assets/website_text_underline.png";

  import {
    FaMapMarkerAlt,
    FaBriefcase,
    FaSearch,
    FaUpload,
    FaFileAlt,
    FaCheckCircle,
    FaGraduationCap,
    FaUsers,
    FaChartLine,
    FaHandshake,
    FaUserPlus,
    FaPlay,
    FaCalendarAlt,
    FaArrowRight,
    FaChevronDown,
    FaRobot,
    FaWrench,
    FaChevronLeft,
    FaChevronRight,
    FaPlus,
  } from "react-icons/fa";

  const home = () => {
    const [isMediaDropdownOpen, setIsMediaDropdownOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleSubscribe = (email) => {
      console.log('Subscribed with email:', email);
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    };

    const handleFileSelect = (event) => {
      const file = event.target.files[0];
      if (file) {
        setSelectedFile(file);
        console.log('Selected file:', file.name);
        // Here you can add additional logic like file validation, upload to server, etc.
      }
    };

    const handleUploadClick = () => {
      document.getElementById('fileInput').click();
    };

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 850);
      };
      
      handleResize(); // Set initial value
      window.addEventListener('resize', handleResize);
      
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const faqs = [
      {
        question: "How do I create an account on JOBSAHI?",
        answer:
          'Creating an account is simple! Just click on the "Sign Up" button, fill in your basic information, verify your email, and you\'re ready to start your job search journey.',
      },
      {
        question: "Is JOBSAHI free for students?",
        answer:
          "Yes, JOBSAHI is completely free for ITI and Polytechnic students. We believe in providing equal opportunities for all students to access quality job opportunities.",
      },
      {
        question: "What types of jobs are available on JOBSAHI?",
        answer:
          "We offer a wide range of job opportunities including engineering positions, technical roles, manufacturing jobs, healthcare positions, and many more across various industries.",
      },
      {
        question: "How does the job matching work?",
        answer:
          "Our AI-powered system analyzes your profile, skills, and preferences to match you with relevant job opportunities. The more complete your profile, the better the matches.",
      },
      {
        question: "Can I apply for jobs directly through JOBSAHI?",
        answer:
          "Yes! You can apply for jobs directly through our platform. Simply browse jobs, click apply, and your application will be sent to the employer.",
      },
      {
        question: "How do I update my resume on JOBSAHI?",
        answer:
          "You can easily update your resume by going to your profile settings and uploading a new version. We recommend keeping your resume updated with your latest skills and experience.",
      },
    ];

    const blogPosts = [
      {
        title: "strategies for success: customer engagement art copy",
        excerpt: "Discover the most in-demand skills that will boost your career prospects...",
        author: "John Doe",
        date: "March 20, 2024",
        category: "Design",
        location: "New York",
        tags: ["Design", "Marketing", "Creative"]
      },
      {
        title: "How to Prepare for Technical Interviews",
        excerpt: "A comprehensive guide to ace your technical interviews and land your dream job...",
        author: "Jane Smith",
        date: "March 18, 2024",
        category: "Interview Tips",
        location: "London",
        tags: ["Career", "Interview", "Skills"]
      },
      {
        title: "Polytechnic vs ITI: Which Path is Right for You?",
        excerpt: "Compare the benefits and career opportunities of both educational paths...",
        author: "Mike Johnson",
        date: "March 15, 2024",
        category: "Education",
        location: "Delhi",
        tags: ["Education", "Career", "Guidance"]
      },
      {
        title: "Digital Marketing Trends for 2024",
        excerpt: "Stay ahead with the latest digital marketing strategies and trends...",
        author: "Sarah Wilson",
        date: "March 12, 2024",
        category: "Marketing",
        location: "Mumbai",
        tags: ["Marketing", "Digital", "Trends"]
      },
      {
        title: "Building a Strong Professional Network",
        excerpt: "Learn how to build meaningful professional relationships that advance your career...",
        author: "David Brown",
        date: "March 10, 2024",
        category: "Networking",
        location: "Bangalore",
        tags: ["Networking", "Career", "Professional"]
      }
    ];

    const getTotalSlides = () => {
      return Math.ceil(blogPosts.length / (isMobile ? 1 : 3));
    };

    const nextSlide = () => {
      const totalSlides = getTotalSlides();
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
      const totalSlides = getTotalSlides();
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToSlide = (index) => {
      setCurrentSlide(index);
    };

    const jobCategories = [
      {
        title: 'Electrician Jobs',
        count: 68,
        icon: FaWrench
      },
      {
        title: 'Welder Jobs',
        count: 45,
        icon: FaWrench
      },
      {
        title: 'Fitter Jobs',
        count: 52,
        icon: FaWrench
      },
      {
        title: 'CNC Operator',
        count: 38,
        icon: FaWrench
      },
      {
        title: 'Plumber Jobs',
        count: 29,
        icon: FaWrench
      },
      {
        title: 'AC Technician',
        count: 41,
        icon: FaWrench
      },
      {
        title: 'Helper / Assistant',
        count: 67,
        icon: FaWrench
      },
      {
        title: 'Machine Maintenance',
        count: 34,
        icon: FaWrench
      }
    ];

    const browseJobHeaderContent = {
      title: (
        <>
          {/* <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight"> */}
            Browse <span className="text-[#A2DDFF]">The Job</span> <br /> By <span className="text-[#A2DDFF]">Category</span>
          {/* </h2> */}
        </>
      ),
      description: (
        <>
          Find Jobs That Match Your Technical Skills — Electrician, Welder, Fitter, Machinist & More.
        </>
      ),
      cta: (
        <>
          Explore Your Field And Start Applying Today.
        </>
      )
    };

    const testimonials = [
      {
        text: "JobSahi has simplified our campus hiring process. We connected with skilled ITI candidates in minutes!",
        author: "Rahul Verma",
        position: "HR Manager, Sigma Tools Pvt. Ltd."
      },
      {
        text: "Posting jobs and tracking applications on JobSahi is seamless. It's the go-to platform for technical hiring.",
        author: "Sunita Singh", 
        position: "Training & Placement Officer"
      }
    ];

    const trustedByStartupsHeaderContent = {
      title: (
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          <span className="text-[#A2DDFF]">Trusted</span> By<br />
          Leading Startups
        </h2>
      ),
      description: (
        <p className="text-white text-lg leading-relaxed">
          Join 300+ companies and institutes hiring through JobSahi. From MSMEs to training institutes, trusted by industry leaders to find the right skilled talent fast.
        </p>
      ),
      navigation: (
        <>
          <button className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#0B537D] transition-all duration-300">
            <FaChevronLeft className="text-lg" />
          </button>
          <button className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#0B537D] transition-all duration-300">
            <FaChevronRight className="text-lg" />
          </button>
        </>
      )
    };

    const faqHeaderContent = {
      title: (
        <>
          We've Got The Answers
        </>
      ),
      description: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor"
    };

    const newsletterHeaderContent = {
      title: "Get Fresh Job Openings, Apprenticeships, And Career Tips Straight To Your Inbox."
    };

    return (
      <div className="bg-[#00395B]">
        <Navbar />

        {/* Herosection */}
        <section className="min-h-screen bg-[#EAF5FB] mx-4 rounded-[50px] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
            {/* hero first section */}
            <div className="">
              {/* Top Banner */}
              <div className="text-center mb-12">
                <div className="inline-block border-2 border-[#5C9A24] text-[#5C9A24] px-6 py-2 rounded-full text-sm font-semibold">
                  #1 PORTAL JOB PLATFORM
                </div>
              </div>

              {/* Main Headline */}
              <div className="flex flex-col items-center justify-center text-center mb-5 md:mb-12 ">
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:px-20 font-bold mb-8 text-[#0B537D] leading-tight">
                  The Easiest Way To Get Your New Job
                </h1>
                <img src={textunderline} alt="" className="w-[40%] h-[15px] md:h-[35px] -mt-10" />
              </div>

              {/* Description */}
              <div className="text-center mb-10 max-w-5xl mx-auto">
                <p className="text-lg font-light mb-6 leading-relaxed">
                  Every month, over 5 lakh ITI students use JobSahi to explore
                  jobs, apprenticeships, and courses. Start your career journey
                  with just one click.
                </p>
                <p className="text-lg text-[#0B537D] font-medium">
                  अपना शहर और ट्रेड चुनें और नई नौकरी की शुरुआत करें!
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto mb-20">
              <div className="bg-white rounded-full p-3 md:px-10 shadow-lg">
                <div className="flex flex-col lg:flex-row items-center gap-4">
                  {/* Location Filter */}
                  <div className="flex items-center gap-3 cursor-pointer flex-1 min-w-0">
                    <FaMapMarkerAlt className="text-[#5C9A24] text-xl flex-shrink-0" />
                    <div className="flex items-center justify-between gap-5">
                      <p className="text-sm text-[#5C9A24] mb-1 font-medium">
                        Location
                      </p>
                      {/* <div className="flex items-center justify-between"> */}
                      {/* <span className="text-gray-700 font-medium truncate">Select Location</span> */}
                      <FaChevronDown className="text-[#5C9A24] text-sm flex-shrink-0 ml-2" />
                      {/* </div> */}
                    </div>
                  </div>

                  {/* Vertical Divider */}
                  <div className="hidden lg:block w-px h-12 bg-[#5C9A24]"></div>

                  {/* Category Filter */}
                  <div className="flex items-center gap-3 cursor-pointer flex-1 min-w-0">
                    <FaBriefcase className="text-[#5C9A24] text-xl flex-shrink-0" />
                    <div className="flex items-center justify-between gap-5">
                      <p className="text-sm text-[#5C9A24] mb-1 font-medium">
                        Category
                      </p>
                      {/* <div className="flex items-center justify-between"> */}
                      {/* <span className="text-[#5C9A24] font-medium truncate">Select Category</span> */}
                      <FaChevronDown className="text-[#5C9A24] text-sm flex-shrink-0 ml-2" />
                      {/* </div> */}
                    </div>
                  </div>

                  {/* Search Button */}
                  <button className="hover:bg-[#5C9A24] text-[#5C9A24] border-2 border-[#5C9A24] hover:text-white rounded-full px-5 py-2 font-semibold text-lg flex items-center justify-center space-x-2 ">
                    <span>नौकरी खोजें</span>
                    <div className="w-6 h-6 bg-[#5C9A24] rounded-full flex items-center justify-center">
                      <FaSearch className="text-white text-sm" />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* hero bottom section */}
            <div className=""></div>
          </div>
        </section>

        {/* BrowseJob */}
        <BrowseJobByCategory 
          jobCategories={jobCategories} 
          headerContent={browseJobHeaderContent}
        />

        {/* UploadResume */}
        <section className="my-5 md:my-10 ">
          <div className="max-w-7xl mx-auto ">
            <div className="relative">
              {/* Main Card */}
              <div className=" shadow-2xl relative overflow-hidden">
                <img src={uploadresumebg} alt="" className="absolute w-full h-full" />
                {/* Main Content */}
                <div className="text-center relative  ">
                <div className="mb-8">
                    <div className="inline-block bg-[#5C9A24] text-white px-8 py-3 rounded-full font-bold text-sm">
                      #1 PORTAL JOB PLATFORM
                    </div>
                  </div>

                <div className="pb-10 my-10">
                  {/* Main Heading */}
                  <h2 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-6 leading-tight">
                    Upload Your{' '}
                    <span className="text-[#0B537D]">Resume</span> &<br />
                    Get{' '}
                    <span className="text-[#0B537D]">Matched Instantly</span>
                  </h2>

                  {/* Descriptive Text */}
                  <div className="max-w-2xl mx-auto mb-8">
                    <p className="text-gray-700 text-lg mb-4">
                      Don't wait! Just upload your resume and let<br />
                      JobSahi find the perfect job for you.
                    </p>
                    <p className="text-[#0B537D] text-lg font-medium">
                      हर महीने लाखों ITI छात्र ऐसे ही नौकरी पाते हैं
                    </p>
                    <div className="font-bold mt-2 text-gray-700 ">नीचे अपना रिज़्यूमे अपलोड करें</div>
                  </div>

                  {/* Upload Button */}
                  <div className="flex justify-center">
                    <input
                      type="file"
                      id="fileInput"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <button 
                      onClick={handleUploadClick}
                      className="border-2 border-[#5C9A24] text-[#5C9A24] px-4 py-2 rounded-full font-semibold text-lg hover:bg-[#5C9A24] hover:text-white flex items-center space-x-3"
                    >
                      <span>Upload CV</span>
                      <div className="w-8 h-8 bg-[#5C9A24] rounded-full flex items-center justify-center">
                        <FaUpload className="text-white text-sm" />
                      </div>
                    </button>
                  </div>
                  
                  {/* Selected File Display */}
                  {selectedFile && (
                    <div className="flex justify-center mt-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 flex items-center space-x-2">
                        <FaFileAlt className="text-green-600" />
                        <span className="text-green-800 font-medium">
                          Selected: {selectedFile.name}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RightForYou */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Abstract Shapes */}
              <div className="relative">
                {/* Large L-shaped block */}
                <div className="sm:w-80 sm:h-80 w-60 h-60 bg-blue-100 rounded-3xl relative">
                  {/* Green Badge */}
                  <div className="absolute border-4 border-white -top-4 -left-4 bg-[#A1E366] rounded-2xl p-6">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                        <div className="w-4 h-4 bg-[#A1E366] rounded-full"></div>
                      </div>
                      <p className="text-black font-bold text-sm">Top No. 1</p>
                      <p className="text-black text-xs">Portal Job Web</p>
                    </div>
                {/* Smaller rectangular block */}
                <div className="absolute border-4 border-white -bottom-40 left-40 sm:-bottom-56 sm:left-56 w-32 h-24 bg-blue-200 rounded-2xl"></div>
                  </div>
                </div>
                
                
              </div>

              {/* Right Side - Content */}
              <div className="space-y-8">
                {/* Main Heading */}
                <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
                  Find{" "}
                  <span className="text-[#0B537D]">The One</span>{" "}
                  That's{" "}
                  <span className="text-[#0B537D]">Right For You</span>
                </h2>

                {/* Descriptive Text */}
                <p className="text-gray-700 text-lg leading-relaxed">
                  With JobSahi, searching for the perfect job is quick, easy, and tailored to your skills.
                </p>

                {/* Feature List */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <FaCheckCircle className="text-[#5C9A24] text-lg flex-shrink-0" />
                    <span className="text-gray-800 font-medium">Fast & Simple Job Search Experience</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaCheckCircle className="text-[#5C9A24] text-lg flex-shrink-0" />
                    <span className="text-gray-800 font-medium">Top Job Listings Across Industries</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaCheckCircle className="text-[#5C9A24] text-lg flex-shrink-0" />
                    <span className="text-gray-800 font-medium">Secure And Trusted Application Process</span>
                  </div>
                </div>

                {/* Search Job Button */}
                <div className="pt-4">
                  <button className="border-2 border-[#5C9A24] text-[#5C9A24] px-4 py-2 rounded-full font-semibold text-lg hover:bg-[#5C9A24] hover:text-white flex items-center space-x-3 ">
                    <span>Search Job</span>
                    <div className="w-8 h-8 bg-[#5C9A24] rounded-full flex items-center justify-center">
                      <FaArrowRight className="text-white text-sm" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HowItWorks */}
        <section className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0B537D] mb-4">
                How It Works
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Step 1: Create Account */}
              <div className="text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-[#A1E366] rounded-full flex items-center justify-center">
                    <FaUserPlus className="text-white text-2xl md:text-4xl" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#0B537D] mb-2">
                  Create Account
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  It's super easy to sign up and begin your job journey.
                </p>
              </div>

              {/* Step 2: Complete Your Profile */}
              <div className="text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-[#A1E366] rounded-full flex items-center justify-center">
                    <FaFileAlt className="text-white text-2xl md:text-4xl" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#0B537D] mb-4">
                  Complete Your Profile
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Fill in your details to get noticed by employers faster.
                </p>
              </div>

              {/* Step 3: Apply Job Or Hire */}
              <div className="text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-[#A1E366] rounded-full flex items-center justify-center">
                    <FaHandshake className="text-white text-2xl md:text-4xl" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#0B537D] mb-4">
                  Apply Job Or Hire
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Apply to jobs that match your skills or post a job if you're an employer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TrustedStartups */}
        <TrustedByStartups 
          testimonials={testimonials} 
          headerContent={trustedByStartupsHeaderContent}
        />

        {/* BlogInterested */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-semibold mb-4">
                <span className="">Blog You</span>
                <span className="text-[#0B537D]"> Might Be Interested In</span>
              </h2>
              <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                Together with useful notifications, collaboration, insights, and improvement tip lorem etc.
              </p>
            </div>

            {/* Carousel Container */}
            <div className="relative">
              {/* Navigation Arrows */}
              <button 
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white border-2 border-[#5C9A24] rounded-full flex items-center justify-center text-[#5C9A24] hover:bg-[#5C9A24] hover:text-white transition-all duration-300 shadow-lg"
              >
                <FaChevronLeft className="text-lg" />
              </button>
              
              <button 
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white border-2 border-[#5C9A24] rounded-full flex items-center justify-center text-[#5C9A24] hover:bg-[#5C9A24] hover:text-white transition-all duration-300 shadow-lg"
              >
                <FaChevronRight className="text-lg" />
              </button>

              {/* Blog Cards Carousel */}
              <div className="overflow-hidden px-5">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * (100 / (isMobile ? 1 : 3))}%)` }}
                >
                  {blogPosts.map((post, index) => (
                    <div key={index} className="w-full md:w-1/3 flex-shrink-0 px-3">
                      <article className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                        {/* Image Placeholder */}
                        <div className="h-48 bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">Blog Image</span>
                        </div>
                        
                        <div className="p-6">
                          {/* Metadata */}
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <span>{post.location}</span>
                            <span className="mx-2">•</span>
                            <span>{post.date}</span>
                          </div>

                          {/* Title/Excerpt */}
                          <h3 className="text-lg font-medium text-gray-800 mb-4 leading-tight">
                            {post.title}
                          </h3>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag, tagIndex) => (
                              <span 
                                key={tagIndex}
                                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: getTotalSlides() }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      index === currentSlide ? 'bg-[#5C9A24]' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* GotAnswers */}
        <FAQ 
          faqs={faqs} 
          headerContent={faqHeaderContent} 
        />

        {/* Subscribe */}
        <NewsletterSubscription 
          headerContent={newsletterHeaderContent}
          onSubscribe={handleSubscribe}
          email={email}
          setEmail={setEmail}
          isSubscribed={isSubscribed}
        />

        <Footer />
      </div>
    );
  };

  export default home;

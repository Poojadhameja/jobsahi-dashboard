import React, { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BrowseJobByCategory from "../../components/UI8Cards.jsx";
import FAQ from "../../components/FAQ";
import NewsletterSubscription from "../../components/NewsletterSubscription";
import { WEBSITE_COLOR_CLASSES } from "../../components/colorClasses";
import uploadresumebg from "../../assets/uploadresumebg.png";
import textunderline from "../../assets/website_text_underline.png";

const TrustedByStartups = lazy(() =>
  import("../../components/TrustedByStartups.jsx")
);

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
  FaBolt,
  FaFire,
  FaCogs,
  FaIndustry,
  FaTools,
  FaSnowflake,
  FaHandsHelping,
} from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const { BG, TEXT, BORDER, HOVER_BG, HOVER_TEXT } = WEBSITE_COLOR_CLASSES;

  const [isMediaDropdownOpen, setIsMediaDropdownOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubscribe = (emailValue) => {
    console.log("Subscribed with email:", emailValue);
    setIsSubscribed(true);
    setEmail("");
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("Selected file:", file.name);
    }
  };

  const handleUploadClick = () => {
    const input = document.getElementById("fileInput");
    if (input) input.click();
  };

  const navigateToFindJob = () => {
    navigate("/find-job");
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 850);
    };

    handleResize(); // initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
      excerpt:
        "Discover the most in-demand skills that will boost your career prospects...",
      author: "John Doe",
      date: "March 20, 2024",
      category: "Design",
      location: "New York",
      tags: ["Design", "Marketing", "Creative"],
    },
    {
      title: "How to Prepare for Technical Interviews",
      excerpt:
        "A comprehensive guide to ace your technical interviews and land your dream job...",
      author: "Jane Smith",
      date: "March 18, 2024",
      category: "Interview Tips",
      location: "London",
      tags: ["Career", "Interview", "Skills"],
    },
    {
      title: "Polytechnic vs ITI: Which Path is Right for You?",
      excerpt:
        "Compare the benefits and career opportunities of both educational paths...",
      author: "Mike Johnson",
      date: "March 15, 2024",
      category: "Education",
      location: "Delhi",
      tags: ["Education", "Career", "Guidance"],
    },
    {
      title: "Digital Marketing Trends for 2024",
      excerpt:
        "Stay ahead with the latest digital marketing strategies and trends...",
      author: "Sarah Wilson",
      date: "March 12, 2024",
      category: "Marketing",
      location: "Mumbai",
      tags: ["Marketing", "Digital", "Trends"],
    },
    {
      title: "Building a Strong Professional Network",
      excerpt:
        "Learn how to build meaningful professional relationships that advance your career...",
      author: "David Brown",
      date: "March 10, 2024",
      category: "Networking",
      location: "Bangalore",
      tags: ["Networking", "Career", "Professional"],
    },
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const totalSlides = Math.ceil(blogPosts.length / (isMobile ? 1 : 3));
        if (totalSlides === 0) return 0;
        return (prev + 1) % totalSlides;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile, blogPosts.length]);

  useEffect(() => {
    const totalSlides = getTotalSlides();
    setCurrentSlide((prev) => {
      if (totalSlides === 0) return 0;
      return prev % totalSlides;
    });
  }, [isMobile]);

  const jobCategories = [
    {
      title: "Electrician Jobs",
      count: 68,
      subject: "Jobs Available",
      icon: FaBolt,
    },
    {
      title: "Welder Jobs",
      count: 45,
      subject: "Jobs Available",
      icon: FaFire,
    },
    {
      title: "Fitter Jobs",
      count: 52,
      subject: "Jobs Available",
      icon: FaCogs,
    },
    {
      title: "CNC Operator",
      count: 38,
      subject: "Jobs Available",
      icon: FaIndustry,
    },
    {
      title: "Plumber Jobs",
      count: 29,
      subject: "Jobs Available",
      icon: FaTools,
    },
    {
      title: "AC Technician",
      count: 41,
      subject: "Jobs Available",
      icon: FaSnowflake,
    },
    {
      title: "Helper / Assistant",
      count: 67,
      subject: "Jobs Available",
      icon: FaHandsHelping,
    },
    {
      title: "Machine Maintenance",
      count: 34,
      subject: "Jobs Available",
      icon: FaCogs,
    },
  ];

  const browseJobHeaderContent = {
    title: (
      <>
        Browse <span className={TEXT.ACCENT_SKY}>The Job</span> <br /> By{" "}
        <span className={TEXT.ACCENT_SKY}>Category</span>
      </>
    ),
    description: (
      <>
        Find Jobs That Match Your Technical Skills — Electrician, Welder,
        Fitter, Machinist &amp; More.
      </>
    ),
    cta: (
      <button
        onClick={navigateToFindJob}
        className="inline-flex items-center text-[#A1E366] text-lg font-semibold border border-[#A1E366] rounded-full px-5 py-2 hover:bg-[#A1E366] hover:text-[#00395B] transition-colors duration-200"
      >
        <span>Explore Your Field And Start Applying Today</span>
        <FaArrowRight className="ml-2 text-sm" />
      </button>
    ),
  };

  const faqHeaderContent = {
    title: <>We've Got The Answers</>,
    description:
      "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor",
  };

  const newsletterHeaderContent = {
    title:
      "Get Fresh Job Openings, Apprenticeships, And Career Tips Straight To Your Inbox.",
  };

  return (
    <div className={BG.PRIMARY_NAVY}>
      <Navbar />

      {/* HERO SECTION – Figma Accurate */}
      <section className="min-h-screen bg-[#E7F3FD] mx-4 rounded-[50px] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-12 relative">
          {/* Top Tag */}
          <div className="text-center mb-8">
            <div className="inline-block border-2 border-[#9EDB47] text-[#9EDB47] px-6 py-2 rounded-full text-sm font-semibold">
              #1 PORTAL JOB PLATFORM
            </div>
          </div>

          {/* Heading & underline */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#00395B] leading-tight mb-4">
              The Easiest Way To Get Your New Job
            </h1>
            <img
              src={textunderline}
              alt=""
              className="w-[45%] max-w-sm h-[15px] md:h-[25px] lg:h-[30px] mx-auto -mt-4"
            />
          </div>

          {/* Description */}
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <p className="text-base md:text-lg font-light mb-4 leading-relaxed text-gray-700">
              Every month, over 5 lakh ITI students use JobSahi to explore jobs,
              apprenticeships, and courses. Start your career journey with just
              one click.
            </p>
            <p className="text-base md:text-lg text-[#00395B] font-medium">
              अपना शहर और ट्रेड चुनें और नई नौकरी की शुरुआत करें!
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-4xl mx-auto mb-20">
            <div className="bg-white rounded-full shadow-xl px-5 md:px-7 py-3 flex flex-col sm:flex-row items-center gap-4">
              {/* Location */}
              <div
                className="flex-1 flex items-center gap-3 cursor-pointer w-full"
                onClick={navigateToFindJob}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    navigateToFindJob();
                  }
                }}
              >
                <FaMapMarkerAlt className="text-[#8CD63E] text-lg md:text-xl" />
                <div className="flex items-center justify-between flex-1">
                  <p className="text-sm md:text-base text-[#8CD63E] font-medium">
                    Location
                  </p>
                  <FaChevronDown className="text-[#8CD63E] text-xs md:text-sm" />
                </div>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-9 bg-[#8CD63E]" />

              {/* Category */}
              <div
                className="flex-1 flex items-center gap-3 cursor-pointer w-full"
                onClick={navigateToFindJob}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    navigateToFindJob();
                  }
                }}
              >
                <FaBriefcase className="text-[#8CD63E] text-lg md:text-xl" />
                <div className="flex items-center justify-between flex-1">
                  <p className="text-sm md:text-base text-[#8CD63E] font-medium">
                    Category
                  </p>
                  <FaChevronDown className="text-[#8CD63E] text-xs md:text-sm" />
                </div>
              </div>

              {/* Search Button */}
              <button
                onClick={navigateToFindJob}
                className="w-full sm:w-auto border-2 border-[#8CD63E] text-[#8CD63E] hover:bg-[#8CD63E] hover:text-white rounded-full px-5 md:px-6 py-2 md:py-2.5 font-semibold text-base md:text-lg flex items-center justify-center gap-2 transition-colors duration-200"
              >
                <span>नौकरी खोजें</span>
                <span className="w-6 h-6 bg-[#8CD63E] rounded-full flex items-center justify-center">
                  <FaSearch className="text-white text-xs md:text-sm" />
                </span>
              </button>
            </div>
          </div>

          {/* Illustration Area */}
          <div className="relative w-full flex justify-center mt-4 mb-10 md:mb-16 lg:mb-20 px-2 md:px-0">
            <div className="relative w-full max-w-6xl">
              {/* Left green bubbles */}
              <div className="absolute -top-2 md:-top-3 left-0 md:left-4 z-20">
                <div className="relative w-[120px] h-[120px] md:w-[140px] md:h-[140px]">
                  <div className="absolute top-0 left-0 w-16 h-16 md:w-20 md:h-20 bg-[#CFF49A] rounded-full opacity-90 shadow-lg" />
                  <div className="absolute top-3 left-4 w-16 h-16 md:w-20 md:h-20 bg-[#CFF49A] rounded-full opacity-70 shadow-lg" />
                  <div className="absolute top-6 left-8 w-16 h-16 md:w-20 md:h-20 bg-[#CFF49A] rounded-full opacity-60 shadow-lg" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 bg-[#8CD63E] rounded-full flex items-center justify-center shadow-xl">
                    <FaPlus className="text-white text-base" />
                  </div>
                </div>
              </div>

              {/* Main white chat box */}
              <div className="w-full h-[220px] sm:h-[250px] md:h-[280px] lg:h-[300px] bg-white rounded-2xl md:rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.08)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent" />
              </div>

              {/* Right robot mini chat */}
              <div className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 z-20 hidden md:block">
                <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100 w-[150px] md:w-[170px]">
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 md:w-8 md:h-8 bg-[#00395B] rounded-full flex items-center justify-center">
                      <FaRobot className="text-white text-xs md:text-sm" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-gray-200 rounded mb-2" />
                      <div className="h-2 bg-gray-200 rounded w-3/4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Top-right tag */}
              <div className="absolute -top-5 md:-top-6 right-3 md:right-6 bg-[#E8F9D2] text-[#4A7C0F] px-4 py-1.5 rounded-full text-xs md:text-sm font-medium shadow-sm z-30">
                Let&apos;s Find Your Opportunity To Grow
              </div>

              {/* Bottom-left tag */}
              <div className="absolute -bottom-7 md:-bottom-9 left-2 md:left-4 bg-white border-2 border-[#8CD63E] px-4 md:px-5 py-2.5 rounded-xl md:rounded-2xl shadow-sm z-30">
                <p className="text-[#4A7C0F] text-xs md:text-sm font-semibold leading-tight">
                  Start Your Career <br /> With JobSahi
                </p>
              </div>

              {/* Center play button */}
              <button
                onClick={navigateToFindJob}
                className="absolute -bottom-12 md:-bottom-14 left-1/2 -translate-x-1/2 z-30 cursor-pointer group text-center"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#00395B] rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <FaPlay className="text-white text-base sm:text-lg md:text-xl ml-0.5 sm:ml-1" />
                </div>
                <p className="mt-2 md:mt-3 text-center text-xs md:text-sm font-medium text-[#00395B] whitespace-nowrap">
                  Search Jobs, Give Skill Tests, Get Hired.
                </p>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Browse Job */}
      <BrowseJobByCategory
        jobCategories={jobCategories}
        headerContent={browseJobHeaderContent}
      />

      {/* Upload Resume */}
      <section className="my-5 md:my-10 ">
        <div className="max-w-7xl mx-auto ">
          <div className="relative">
            {/* Main Card */}
            <div className="shadow-2xl relative overflow-hidden rounded-3xl">
              <img src={uploadresumebg} alt="" className="absolute w-full h-full object-cover" />
              {/* Main Content */}
              <div className="text-center relative px-4 py-10 md:py-16">
                <div className="mb-8">
                  <div
                    className={`inline-block ${BG.ACCENT_GREEN} text-white px-8 py-3 rounded-full font-bold text-sm`}
                  >
                    #1 PORTAL JOB PLATFORM
                  </div>
                </div>

                <div className="pb-6 md:pb-10 my-6 md:my-10">
                  {/* Main Heading */}
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 mb-6 leading-tight">
                    Upload Your{" "}
                    <span className={TEXT.PRIMARY_DEEP_BLUE}>Resume</span> &amp;
                    <br />
                    Get{" "}
                    <span className={TEXT.PRIMARY_DEEP_BLUE}>
                      Matched Instantly
                    </span>
                  </h2>

                  {/* Descriptive Text */}
                  <div className="max-w-2xl mx-auto mb-8">
                    <p className="text-gray-700 text-base md:text-lg mb-4">
                      Don&apos;t wait! Just upload your resume and let
                      <br />
                      JobSahi find the perfect job for you.
                    </p>
                    <p
                      className={`text-lg font-medium ${TEXT.PRIMARY_DEEP_BLUE}`}
                    >
                      हर महीने लाखों ITI छात्र ऐसे ही नौकरी पाते हैं
                    </p>
                    <div className="font-bold mt-2 text-gray-700">
                      नीचे अपना रिज़्यूमे अपलोड करें
                    </div>
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
                      className={`border-2 ${BORDER.ACCENT_GREEN} ${TEXT.ACCENT_GREEN} px-4 py-2 rounded-full font-semibold text-lg ${HOVER_BG.ACCENT_GREEN} hover:text-white flex items-center space-x-3`}
                    >
                      <span>Upload CV</span>
                      <div
                        className={`w-8 h-8 ${BG.ACCENT_GREEN} rounded-full flex items-center justify-center`}
                      >
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

      {/* Right For You */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Abstract Shapes */}
            <div className="relative flex justify-center lg:justify-start">
              <div className="sm:w-80 sm:h-80 w-60 h-60 bg-blue-100 rounded-3xl relative">
                {/* Green Badge */}
                <div className="absolute border-4 border-white -top-4 -left-4 bg-[#CFF49A] rounded-2xl p-5 shadow-md">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                      <div className="w-4 h-4 bg-[#CFF49A] rounded-full" />
                    </div>
                    <p className="text-black font-bold text-sm">Top No. 1</p>
                    <p className="text-black text-xs">Portal Job Web</p>
                  </div>
                </div>

                {/* Smaller rectangular block */}
                <div className="absolute border-4 border-white -bottom-20 left-32 sm:-bottom-24 sm:left-48 w-32 h-24 bg-blue-200 rounded-2xl shadow-md" />
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                Find{" "}
                <span className={TEXT.PRIMARY_DEEP_BLUE}>The One</span> That&apos;s{" "}
                <span className={TEXT.PRIMARY_DEEP_BLUE}>Right For You</span>
              </h2>

              <p className="text-gray-700 text-lg leading-relaxed">
                With JobSahi, searching for the perfect job is quick, easy, and
                tailored to your skills.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaCheckCircle
                    className={`${TEXT.ACCENT_GREEN} text-lg flex-shrink-0`}
                  />
                  <span className="text-gray-800 font-medium">
                    Fast &amp; Simple Job Search Experience
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle
                    className={`${TEXT.ACCENT_GREEN} text-lg flex-shrink-0`}
                  />
                  <span className="text-gray-800 font-medium">
                    Top Job Listings Across Industries
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle
                    className={`${TEXT.ACCENT_GREEN} text-lg flex-shrink-0`}
                  />
                  <span className="text-gray-800 font-medium">
                    Secure And Trusted Application Process
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={navigateToFindJob}
                  className={`border-2 ${BORDER.ACCENT_GREEN} ${TEXT.ACCENT_GREEN} px-4 py-2 rounded-full font-semibold text-lg ${HOVER_BG.ACCENT_GREEN} hover:text-white flex items-center space-x-3`}
                >
                  <span>Search Job</span>
                  <div
                    className={`w-8 h-8 ${BG.ACCENT_GREEN} rounded-full flex items-center justify-center`}
                  >
                    <FaArrowRight className="text-white text-sm" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold ${TEXT.PRIMARY_DEEP_BLUE} mb-4`}
            >
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-2">
                <div
                  className={`w-12 h-12 md:w-16 md:h-16 ${BG.ACCENT_LIME} rounded-full flex items-center justify-center`}
                >
                  <FaUserPlus className="text-white text-2xl md:text-4xl" />
                </div>
              </div>
              <h3
                className={`text-2xl font-bold ${TEXT.PRIMARY_DEEP_BLUE} mb-2`}
              >
                Create Account
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                It&apos;s super easy to sign up and begin your job journey.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-2">
                <div
                  className={`w-12 h-12 md:w-16 md:h-16 ${BG.ACCENT_LIME} rounded-full flex items-center justify-center`}
                >
                  <FaFileAlt className="text-white text-2xl md:text-4xl" />
                </div>
              </div>
              <h3
                className={`text-2xl font-bold ${TEXT.PRIMARY_DEEP_BLUE} mb-4`}
              >
                Complete Your Profile
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Fill in your details to get noticed by employers faster.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-2">
                <div
                  className={`w-12 h-12 md:w-16 md:h-16 ${BG.ACCENT_LIME} rounded-full flex items-center justify-center`}
                >
                  <FaHandshake className="text-white text-2xl md:text-4xl" />
                </div>
              </div>
              <h3
                className={`text-2xl font-bold ${TEXT.PRIMARY_DEEP_BLUE} mb-4`}
              >
                Apply Job Or Hire
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Apply to jobs that match your skills or post a job if you&apos;re
                an employer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Startups */}
      <Suspense
        fallback={
          <div className="text-white text-center py-10">
            Loading testimonials...
          </div>
        }
      >
        <TrustedByStartups />
      </Suspense>

      {/* Blog Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">
              <span>Blog You</span>{" "}
              <span className={TEXT.PRIMARY_DEEP_BLUE}>
                Might Be Interested In
              </span>
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Together with useful notifications, collaboration, insights, and
              improvement tip lorem etc.
            </p>
          </div>

          <div className="relative">
            {/* Arrows */}
            <button
              onClick={prevSlide}
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white border-2 ${BORDER.ACCENT_GREEN} rounded-full flex items-center justify-center ${TEXT.ACCENT_GREEN} ${HOVER_BG.ACCENT_GREEN} hover:text-white transition-all duration-300 shadow-lg`}
            >
              <FaChevronLeft className="text-lg" />
            </button>

            <button
              onClick={nextSlide}
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white border-2 ${BORDER.ACCENT_GREEN} rounded-full flex items-center justify-center ${TEXT.ACCENT_GREEN} ${HOVER_BG.ACCENT_GREEN} hover:text-white transition-all duration-300 shadow-lg`}
            >
              <FaChevronRight className="text-lg" />
            </button>

            {/* Cards */}
            <div className="overflow-hidden px-5">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${
                    currentSlide * (100 / (isMobile ? 1 : 3))
                  }%)`,
                }}
              >
                {blogPosts.map((post, index) => (
                  <div
                    key={index}
                    className="w-full md:w-1/3 flex-shrink-0 px-3"
                  >
                    <article className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                      <div className="h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">Blog Image</span>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <span>{post.location}</span>
                          <span className="mx-2">•</span>
                          <span>{post.date}</span>
                        </div>

                        <h3 className="text-lg font-medium text-gray-800 mb-4 leading-tight">
                          {post.title}
                        </h3>

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

            {/* Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: getTotalSlides() }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentSlide ? BG.ACCENT_GREEN : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={faqs} headerContent={faqHeaderContent} />

      {/* Newsletter */}
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

export default Home;

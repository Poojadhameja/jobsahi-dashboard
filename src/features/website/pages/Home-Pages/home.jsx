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
import homebanner from "../../assets/home/homebanner.jpg";
import jobsahi from "../../assets/home/jobsahi.jpg";
import homesquare from "../../assets/home/homesquare.jpg";
import homesq from "../../assets/home/homesq.jpg";
import homesmall from "../../assets/home/homesmall.jpg";
import { COLOR_CLASSES } from "../../components/colorClasses";

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
  FaUser,
  FaStar,
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
        Browse <span className={TEXT.ACCENT_SKY}>The Job</span> <br className="hidden sm:block" /> By{" "}
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
        className="inline-flex items-center text-[#A1E366] text-sm sm:text-base md:text-lg font-semibold border border-[#A1E366] rounded-full px-4 sm:px-5 py-1.5 sm:py-2 hover:bg-[#A1E366] hover:text-[#00395B] transition-colors duration-200"
      >
        <span className="text-center">Explore Your Field And Start Applying Today</span>
        <FaArrowRight className="ml-2 text-xs sm:text-sm flex-shrink-0" />
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
      <section className="min-h-screen bg-[#E7F3FD] mx-1 sm:mx-2 md:mx-3 lg:mx-4 rounded-[20px] sm:rounded-[30px] md:rounded-[40px] lg:rounded-[50px] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-5 lg:px-6 py-6 sm:py-8 md:py-10 lg:py-12 relative">
          {/* Top Tag */}
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <div className={`inline-block border-2 ${COLOR_CLASSES.border.accentGreen} ${COLOR_CLASSES.text.accentGreen} px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold`}>
              #1 PORTAL JOB PLATFORM
            </div>
          </div>

          {/* Heading & underline */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 px-2">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#00395B] leading-[1.1] sm:leading-tight mb-3 sm:mb-4">
              The Easiest Way To Get Your New Job
            </h1>
            <div className="flex justify-center -mt-2 sm:-mt-3 md:-mt-4">
              <img
                src={textunderline}
                alt="Decorative underline for heading"
                className="w-[70%] xs:w-[65%] sm:w-[55%] md:w-[50%] lg:w-[45%] max-w-sm h-auto min-h-[10px] xs:min-h-[12px] sm:min-h-[15px] md:min-h-[18px] lg:min-h-[25px] xl:min-h-[30px] object-contain"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>

          {/* Description */}
          <div className="text-center mb-8 sm:mb-12 md:mb-14 lg:mb-16 max-w-4xl mx-auto px-2">
            <p className="text-sm sm:text-base md:text-lg font-light mb-3 sm:mb-4 leading-relaxed text-gray-700">
              Every month, over 5 lakh ITI students use JobSahi to explore jobs,
              apprenticeships, and courses. Start your career journey with just
              one click.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-[#00395B] font-medium">
              अपना शहर और ट्रेड चुनें और नई नौकरी की शुरुआत करें!
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-2 sm:px-3 md:px-4">
            <div className="bg-white rounded-2xl sm:rounded-full shadow-xl px-3 sm:px-4 md:px-5 lg:px-7 py-3 sm:py-3.5 md:py-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 md:gap-4">
              {/* Location */}
              <div
                className="flex-1 flex items-center gap-2 sm:gap-3 cursor-pointer w-full sm:w-auto min-h-[48px] sm:min-h-[44px] md:min-h-0 px-3 sm:px-2 md:px-0 py-2.5 sm:py-2 md:py-0 rounded-xl sm:rounded-none active:bg-gray-50 sm:active:bg-transparent transition-colors"
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
                <FaMapMarkerAlt className="text-[#8CD63E] text-base sm:text-lg md:text-xl flex-shrink-0" />
                <div className="flex items-center justify-between flex-1 min-w-0">
                  <p className="text-sm sm:text-base text-[#8CD63E] font-medium truncate">
                    Location
                  </p>
                  <FaChevronDown className="text-[#8CD63E] text-xs sm:text-sm flex-shrink-0 ml-2" />
                </div>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-7 sm:h-8 md:h-9 bg-[#8CD63E] flex-shrink-0" />

              {/* Mobile Divider */}
              <div className="block sm:hidden w-full h-px bg-gray-200" />

              {/* Category */}
              <div
                className="flex-1 flex items-center gap-2 sm:gap-3 cursor-pointer w-full sm:w-auto min-h-[48px] sm:min-h-[44px] md:min-h-0 px-3 sm:px-2 md:px-0 py-2.5 sm:py-2 md:py-0 rounded-xl sm:rounded-none active:bg-gray-50 sm:active:bg-transparent transition-colors"
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
                <FaBriefcase className="text-[#8CD63E] text-base sm:text-lg md:text-xl flex-shrink-0" />
                <div className="flex items-center justify-between flex-1 min-w-0">
                  <p className="text-sm sm:text-base text-[#8CD63E] font-medium truncate">
                    Category
                  </p>
                  <FaChevronDown className="text-[#8CD63E] text-xs sm:text-sm flex-shrink-0 ml-2" />
                </div>
              </div>

              {/* Mobile Divider */}
              <div className="block sm:hidden w-full h-px bg-gray-200" />

              {/* Search Button */}
              <button
                onClick={navigateToFindJob}
                className="w-full sm:w-auto border-2 border-[#8CD63E] text-[#8CD63E] hover:bg-[#8CD63E] hover:text-white active:bg-[#7BC52E] active:border-[#7BC52E] rounded-xl sm:rounded-full px-4 sm:px-5 md:px-6 py-2.5 sm:py-2 md:py-2.5 font-semibold text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 transition-all duration-200 min-h-[48px] sm:min-h-[44px] md:min-h-0 shadow-sm sm:shadow-none"
              >
                <span className="whitespace-nowrap">नौकरी खोजें</span>
                <span className="w-5 h-5 sm:w-6 sm:h-6 bg-[#8CD63E] rounded-full flex items-center justify-center flex-shrink-0">
                  <FaSearch className="text-white text-xs sm:text-xs md:text-sm" />
                </span>
              </button>
            </div>
          </div>

          {/* Illustration Area */}
          <div className="relative w-full flex justify-center mt-8 sm:mt-12 md:mt-16 lg:mt-24 xl:mt-32 mb-12 sm:mb-16 md:mb-20 lg:mb-24 xl:mb-32 px-3 sm:px-4 md:px-6">
            <div className="relative w-full max-w-6xl mx-auto">
              
              {/* Left green bubbles - horizontally aligned design with improved spacing */}
              <div className="absolute -top-1 sm:-top-2 md:-top-3 left-0 sm:left-2 md:left-4 lg:left-6 z-40 animate-fade-in">
                <div className="relative flex items-center">
                  {/* First pill - overlapping */}
                  <div className="w-8 h-6 xs:w-10 xs:h-7 sm:w-12 sm:h-8 md:w-[72px] md:h-11 bg-[#CFF49A] rounded-full shadow-[0_4px_15px_rgba(207,244,154,0.5)] -mr-1.5 xs:-mr-2 sm:-mr-3 md:-mr-4" />
                  {/* Second pill - overlapping */}
                  <div className="w-8 h-6 xs:w-10 xs:h-7 sm:w-12 sm:h-8 md:w-[72px] md:h-11 bg-[#CFF49A] rounded-full shadow-[0_4px_15px_rgba(207,244,154,0.5)] -mr-1.5 xs:-mr-2 sm:-mr-3 md:-mr-4" />
                  {/* Third pill - overlapping */}
                  <div className="w-8 h-6 xs:w-10 xs:h-7 sm:w-12 sm:h-8 md:w-[72px] md:h-11 bg-[#CFF49A] rounded-full shadow-[0_4px_15px_rgba(207,244,154,0.5)] -mr-1 xs:-mr-1.5 sm:-mr-2 md:-mr-3" />
                  {/* Plus icon circle */}
                  <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-11 lg:h-11 bg-[#8CD63E] rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(140,214,62,0.4)] ring-2 ring-white/50">
                    <FaPlus className="text-white text-[8px] xs:text-[10px] sm:text-xs md:text-sm" />
                  </div>
                </div>
              </div>
              {/* Main white chat box with image */}
              <div className="w-full h-auto md:h-[350px] lg:h-[400px] xl:h-[450px] 2xl:h-[500px] rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] shadow-[0_15px_50px_rgba(0,0,0,0.12)] relative overflow-hidden border border-gray-100/50 bg-gray-100">
                {/* Mobile Image - jobsahi.jpg - Visible only on mobile (< 768px) - Auto height */}
                <img 
                  src={jobsahi} 
                  alt="JobSahi - The easiest way to get your new job. Find opportunities for ITI and Polytechnic students." 
                  className="block md:hidden w-full h-auto object-contain object-center rounded-2xl sm:rounded-3xl"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  sizes="100vw"
                />
                {/* Desktop Image - homebanner.jpg - Visible only on desktop (>= 768px) - Fixed height */}
                <img 
                  src={homebanner} 
                  alt="JobSahi - The easiest way to get your new job. Find opportunities for ITI and Polytechnic students." 
                  className="hidden md:block absolute top-0 left-0 w-full h-full object-cover object-center rounded-2xl sm:rounded-3xl md:rounded-[2.5rem]"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center center'
                  }}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 90vw, 1200px"
                />
                {/* Subtle overlay for better visual effect - Desktop only */}
                <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] pointer-events-none z-10" />
              </div>

              {/* Right side white box with improved styling - Desktop only */}
              <div className="hidden md:block absolute -bottom-16 sm:-bottom-20 md:-bottom-24 lg:-bottom-28 xl:-bottom-32 right-0 z-30 animate-slide-in-right">
                <div className="w-[140px] h-[120px] sm:w-[180px] sm:h-[160px] md:w-[200px] md:h-[180px] lg:w-[240px] lg:h-[220px] bg-white rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-[2.5rem] shadow-[0_15px_50px_rgba(0,0,0,0.12)] relative overflow-hidden border border-gray-100/50">
                  <img 
                    src={homesquare} 
                    alt="JobSahi platform showcase - Career opportunities for students" 
                    className="absolute inset-0 w-full h-full object-cover object-center rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-[2.5rem]"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 1024px) 200px, 240px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-blue-50/30 to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(207,244,154,0.1),_transparent_70%)]" />
                </div>
              </div>

              {/* Top-right tag - light green speech bubble with enhanced design - Desktop only */}
              <div className="hidden md:block absolute -top-2 sm:-top-3 md:-top-4 lg:-top-6 xl:-top-8 right-2 sm:right-4 md:right-6 lg:right-8 xl:right-10 bg-gradient-to-br from-[#CFF49A] to-[#B8E87A] text-gray-800 px-3 sm:px-4 md:px-5 lg:px-7 py-2 sm:py-2.5 md:py-3 rounded-xl sm:rounded-2xl md:rounded-3xl text-[10px] sm:text-xs md:text-sm font-semibold shadow-[0_8px_25px_rgba(207,244,154,0.4)] z-40 border border-[#8CD63E]/40 backdrop-blur-sm hover:shadow-[0_10px_30px_rgba(207,244,154,0.5)] transition-all duration-300">
                <p className="leading-tight drop-shadow-sm">
                  Let&apos;s Find Your Opportunity
                  <br />
                  <span className="text-[#4A7C0F]">To Grow</span>
                </p>
              </div>

      
            

              {/* Bottom-left tag - light green speech bubble with enhanced styling - Desktop only */}
              <div className="hidden md:block absolute -bottom-6 sm:-bottom-7 md:-bottom-8 lg:-bottom-10 xl:-bottom-12 left-2 sm:left-4 md:left-6 lg:left-8 bg-gradient-to-br from-[#CFF49A] to-[#B8E87A] border-2 border-[#8CD63E] px-3 sm:px-4 md:px-5 lg:px-7 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-[0_10px_30px_rgba(207,244,154,0.4)] z-40 hover:shadow-[0_12px_35px_rgba(207,244,154,0.5)] transition-all duration-300">
                <p className="text-[#4A7C0F] text-xs sm:text-sm md:text-base font-bold leading-tight drop-shadow-sm">
                  Start Your Career With{" "}
                  JobSahi
                </p>
              </div>

              {/* Center play button with text - Responsive design for all screens */}
              <div className="absolute -bottom-8 sm:-bottom-10 md:-bottom-12 lg:-bottom-14 xl:-bottom-16 left-1/2 -translate-x-1/2 z-40 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 md:gap-5">
                <button
                  onClick={navigateToFindJob}
                  className="cursor-pointer group flex-shrink-0 focus:outline-none focus:ring-4 focus:ring-[#8CD63E]/30 rounded-full transition-all duration-300"
                  aria-label="Search Jobs"
                >
                  <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-[72px] lg:h-[72px] bg-gradient-to-br from-[#00395B] to-[#002A42] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,57,91,0.4)] group-hover:scale-110 group-hover:shadow-[0_15px_40px_rgba(0,57,91,0.6)] transition-all duration-300 group-active:scale-95">
                    <FaPlay className="text-white text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl ml-0.5 xs:ml-1 drop-shadow-md" />
                  </div>
                </button>
                <p className="text-[10px] xs:text-xs sm:text-sm md:text-base font-semibold text-[#00395B] whitespace-nowrap text-center sm:text-left drop-shadow-sm px-2">
                  Search Jobs, Give Skill Tests, Get Hired
                </p>
              </div>
            </div>
          </div>

          {/* Company Logos Section - Below Illustration Area */}
          <div className="relative w-full max-w-6xl mx-auto mt-8 sm:mt-12 md:mt-16 lg:mt-20 px-3 sm:px-4">
         
            {/* Bottom section with logos - Lighter blue/white background (30%) */}
            <div className="w-full bg-blue-50/50 rounded-b-2xl sm:rounded-b-3xl md:rounded-b-[2.5rem] py-6 sm:py-8 md:py-10 lg:py-12 px-3 sm:px-4 md:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                {/* Ashok Leyland Logo */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-[#00395B] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg sm:text-xl md:text-2xl">A</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#00395B] font-bold text-xs sm:text-sm md:text-base uppercase mb-0.5 sm:mb-1 truncate">
                      ASHOK LEYLAND
                    </h3>
                    <p className="text-[#00395B] text-[10px] sm:text-xs md:text-sm uppercase opacity-70 line-clamp-2">
                      YOUR TAGLINE GOES HERE
                    </p>
                  </div>
                </div>

                {/* Yamaha Logo */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-[#00395B] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-base sm:text-lg md:text-xl">Y</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#00395B] font-bold text-xs sm:text-sm md:text-base uppercase mb-0.5 sm:mb-1 truncate">
                      YAMAHA
                    </h3>
                    <p className="text-[#00395B] text-[10px] sm:text-xs md:text-sm uppercase opacity-70 line-clamp-2">
                      YOUR TAGLINE GOES HERE
                    </p>
                  </div>
                </div>

                {/* Hero Honda Logo */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-[#00395B] rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 border-2 border-white rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 border border-white rounded-full" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#00395B] font-bold text-xs sm:text-sm md:text-base uppercase mb-0.5 sm:mb-1 truncate">
                      HERO HONDA
                    </h3>
                    <p className="text-[#00395B] text-[10px] sm:text-xs md:text-sm uppercase opacity-70 line-clamp-2">
                      YOUR TAGLINE GOES HERE
                    </p>
                  </div>
                </div>

                {/* Maruti Suzuki Logo */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-[#00395B] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-base sm:text-lg md:text-xl">S</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#00395B] font-bold text-xs sm:text-sm md:text-base uppercase mb-0.5 sm:mb-1 truncate">
                      MARUTI SUZUKI
                    </h3>
                    <p className="text-[#00395B] text-[10px] sm:text-xs md:text-sm uppercase opacity-70 line-clamp-2">
                      YOUR TAGLINE GOES HERE
                    </p>
                  </div>
                </div>
              </div>
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
      <section className="my-4 sm:my-6 md:my-8 lg:my-10 px-2 sm:px-3 md:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Main Card */}
            <div className="shadow-2xl relative overflow-hidden rounded-2xl sm:rounded-3xl min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px]">
              <img 
                src={uploadresumebg} 
                alt="Upload your resume background - Get matched with job opportunities instantly on JobSahi" 
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="lazy"
                decoding="async"
                sizes="100vw"
              />
              {/* Main Content */}
              <div className="text-center relative px-3 sm:px-4 md:px-6 py-8 sm:py-10 md:py-12 lg:py-16 z-10">
                <div className="mb-4 sm:mb-6 md:mb-8">
                  <div
                    className={`inline-block ${BG.ACCENT_GREEN} text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full font-bold text-xs sm:text-sm`}
                  >
                    #1 PORTAL JOB PLATFORM
                  </div>
                </div>

                <div className="pb-4 sm:pb-6 md:pb-8 lg:pb-10 my-4 sm:my-6 md:my-8 lg:my-10">
                  {/* Main Heading */}
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 mb-4 sm:mb-5 md:mb-6 leading-tight px-2">
                    Upload Your{" "}
                    <span className={TEXT.PRIMARY_DEEP_BLUE}>Resume</span> &amp;
                    <br className="hidden sm:block" />
                    <span className="sm:hidden"> </span>
                    Get{" "}
                    <span className={TEXT.PRIMARY_DEEP_BLUE}>
                      Matched Instantly
                    </span>
                  </h2>

                  {/* Descriptive Text */}
                  <div className="max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
                    <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
                      Don&apos;t wait! Just upload your resume and let
                      <br className="hidden sm:block" />
                      <span className="sm:hidden"> </span>
                      JobSahi find the perfect job for you.
                    </p>
                    <p
                      className={`text-sm sm:text-base md:text-lg font-medium ${TEXT.PRIMARY_DEEP_BLUE} mb-2`}
                    >
                      हर महीने लाखों ITI छात्र ऐसे ही नौकरी पाते हैं
                    </p>
                    <div className="font-bold text-sm sm:text-base text-gray-700">
                      नीचे अपना रिज़्यूमे अपलोड करें
                    </div>
                  </div>

                  {/* Upload Button */}
                  <div className="flex justify-center px-2">
                    <input
                      type="file"
                      id="fileInput"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <button
                      onClick={handleUploadClick}
                      className={`border-2 ${BORDER.ACCENT_GREEN} ${TEXT.ACCENT_GREEN} px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-sm sm:text-base md:text-lg ${HOVER_BG.ACCENT_GREEN} hover:text-white flex items-center space-x-2 sm:space-x-3 transition-all duration-200`}
                    >
                      <span>Upload CV</span>
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 ${BG.ACCENT_GREEN} rounded-full flex items-center justify-center`}
                      >
                        <FaUpload className="text-white text-xs sm:text-sm" />
                      </div>
                    </button>
                  </div>

                  {/* Selected File Display */}
                  {selectedFile && (
                    <div className="flex justify-center mt-4 px-2">
                      <div className="bg-green-50 border border-green-200 rounded-lg px-3 sm:px-4 py-2 flex items-center space-x-2 max-w-[90%] sm:max-w-none">
                        <FaFileAlt className="text-green-600 text-sm sm:text-base flex-shrink-0" />
                        <span className="text-green-800 font-medium text-xs sm:text-sm truncate">
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
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 bg-white overflow-hidden">
          <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
          {/* Left visuals */}
          <div className="relative mb-6 lg:mb-0">
          <div className="w-[85%] sm:w-[80%] -mt-2 sm:-mt-3 md:-mt-4 lg:-mt-5 px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6">
            <div className="w-56 h-56 sm:w-60 sm:h-60 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-blue-100 rounded-3xl relative overflow-hidden border-[6px] sm:border-[8px] md:border-[10px] lg:border-[12px] border-white">
              <img 
                src={homesq} 
                alt="Home abstract shapes" 
                className="w-full h-full object-cover rounded-3xl"
              />
              <div className="absolute top-0 left-0 w-full h-full">
                {/* Green Badge */}
                <div className="absolute border-[5px] sm:border-[6px] md:border-[7px] lg:border-[8px] border-white -top-2 sm:-top-3 md:-top-4 -left-2 sm:-left-3 md:-left-4 bg-[#CFF49A] rounded-lg sm:rounded-xl md:rounded-2xl p-1.5 sm:p-2 md:p-2.5 lg:p-3 shadow-md z-10">
                  <div className="text-center">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 bg-white rounded-full flex items-center justify-center mx-auto mb-0.5 sm:mb-1 md:mb-1.5">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 bg-[#CFF49A] rounded-full" />
                    </div>
                    <p className="text-black font-bold text-[9px] sm:text-[10px] md:text-xs">Top No. 1</p>
                    <p className="text-black text-[7px] sm:text-[9px] md:text-[10px]">Portal Job Web</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute border-[5px] sm:border-[6px] md:border-[7px] lg:border-[8px] border-white -bottom-6 sm:-bottom-8 md:-bottom-10 left-12 sm:left-16 md:left-40 lg:left-72 w-20 h-16 sm:w-24 sm:h-20 md:w-32 md:h-24 lg:w-48 lg:h-40 bg-blue-100 rounded-2xl overflow-hidden">
              <img 
                src={homesmall} 
                alt="Home small" 
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            </div>
          </div>

          {/* Right content */}
          <div className="w-full">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-3 sm:mb-4 md:mb-6">
              Find{" "}
              <span className={TEXT.PRIMARY_DEEP_BLUE}>The One</span> That&apos;s{" "}
              <span className={TEXT.PRIMARY_DEEP_BLUE}>Right For You</span>
            </h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-5 sm:mb-6 md:mb-8 lg:mb-10">
              With JobSahi, searching for the perfect job is quick, easy, and
              tailored to your skills.
            </p>

            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <div className="flex items-start sm:items-center space-x-2 sm:space-x-3">
                <FaCheckCircle
                  className={`${TEXT.ACCENT_GREEN} text-base sm:text-lg flex-shrink-0 mt-0.5 sm:mt-0`}
                />
                <span className="text-gray-800 font-medium text-sm sm:text-base">
                  Fast &amp; Simple Job Search Experience
                </span>
              </div>
              <div className="flex items-start sm:items-center space-x-2 sm:space-x-3">
                <FaCheckCircle
                  className={`${TEXT.ACCENT_GREEN} text-base sm:text-lg flex-shrink-0 mt-0.5 sm:mt-0`}
                />
                <span className="text-gray-800 font-medium text-sm sm:text-base">
                  Top Job Listings Across Industries
                </span>
              </div>
              <div className="flex items-start sm:items-center space-x-2 sm:space-x-3">
                <FaCheckCircle
                  className={`${TEXT.ACCENT_GREEN} text-base sm:text-lg flex-shrink-0 mt-0.5 sm:mt-0`}
                />
                <span className="text-gray-800 font-medium text-sm sm:text-base">
                  Secure And Trusted Application Process
                </span>
              </div>
            </div>

            <div className="pt-2 sm:pt-4 md:pt-6">
              <button
                onClick={navigateToFindJob}
                className={`border-2 ${BORDER.ACCENT_GREEN} ${TEXT.ACCENT_GREEN} px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-sm sm:text-base md:text-lg ${HOVER_BG.ACCENT_GREEN} hover:text-white flex items-center space-x-2 sm:space-x-3 transition-all duration-200`}
              >
                <span>Search Job</span>
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 ${BG.ACCENT_GREEN} rounded-full flex items-center justify-center`}
                >
                  <FaArrowRight className="text-white text-xs sm:text-sm" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-8 sm:py-10 md:py-12 bg-white px-3 sm:px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-bold ${TEXT.PRIMARY_DEEP_BLUE} mb-3 sm:mb-4`}
            >
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${BG.ACCENT_LIME} rounded-full flex items-center justify-center`}
                >
                  <FaUserPlus className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl" />
                </div>
              </div>
              <h3
                className={`text-xl sm:text-2xl font-bold ${TEXT.PRIMARY_DEEP_BLUE} mb-2 sm:mb-3`}
              >
                Create Account
              </h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed px-2">
                It&apos;s super easy to sign up and begin your job journey.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${BG.ACCENT_LIME} rounded-full flex items-center justify-center`}
                >
                  <FaFileAlt className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl" />
                </div>
              </div>
              <h3
                className={`text-xl sm:text-2xl font-bold ${TEXT.PRIMARY_DEEP_BLUE} mb-2 sm:mb-3 md:mb-4`}
              >
                Complete Your Profile
              </h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed px-2">
                Fill in your details to get noticed by employers faster.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center sm:col-span-2 md:col-span-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${BG.ACCENT_LIME} rounded-full flex items-center justify-center`}
                >
                  <FaHandshake className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl" />
                </div>
              </div>
              <h3
                className={`text-xl sm:text-2xl font-bold ${TEXT.PRIMARY_DEEP_BLUE} mb-2 sm:mb-3 md:mb-4`}
              >
                Apply Job Or Hire
              </h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed px-2">
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
      <section className="py-8 sm:py-12 md:py-16 bg-white px-3 sm:px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-3 sm:mb-4">
              <span>Blog You</span>{" "}
              <span className={TEXT.PRIMARY_DEEP_BLUE}>
                Might Be Interested In
              </span>
            </h2>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
              Together with useful notifications, collaboration, insights, and
              improvement tip lorem etc.
            </p>
          </div>

          <div className="relative">
            {/* Arrows */}
            <button
              onClick={prevSlide}
              className={`absolute left-0 sm:left-2 md:left-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white border-2 ${BORDER.ACCENT_GREEN} rounded-full flex items-center justify-center ${TEXT.ACCENT_GREEN} ${HOVER_BG.ACCENT_GREEN} hover:text-white transition-all duration-300 shadow-lg`}
              aria-label="Previous slide"
            >
              <FaChevronLeft className="text-base sm:text-lg" />
            </button>

            <button
              onClick={nextSlide}
              className={`absolute right-0 sm:right-2 md:right-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white border-2 ${BORDER.ACCENT_GREEN} rounded-full flex items-center justify-center ${TEXT.ACCENT_GREEN} ${HOVER_BG.ACCENT_GREEN} hover:text-white transition-all duration-300 shadow-lg`}
              aria-label="Next slide"
            >
              <FaChevronRight className="text-base sm:text-lg" />
            </button>

            {/* Cards */}
            <div className="overflow-hidden px-8 sm:px-10 md:px-12 lg:px-5">
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
                    className="w-full md:w-1/3 flex-shrink-0 px-2 sm:px-3"
                  >
                    <article className="w-full bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                      <div className="w-full aspect-video min-h-[160px] xs:min-h-[180px] sm:min-h-[200px] md:min-h-[220px] bg-gray-200 flex items-center justify-center relative overflow-hidden">
                        <span className="text-gray-500 text-xs sm:text-sm md:text-base">Blog Image</span>
                      </div>

                      <div className="p-4 sm:p-5 md:p-6">
                        <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3 flex-wrap">
                          <span className="truncate">{post.location}</span>
                          <span className="mx-1 sm:mx-2">•</span>
                          <span className="truncate">{post.date}</span>
                        </div>

                        <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4 leading-tight line-clamp-2">
                          {post.title}
                        </h3>

                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {post.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 text-gray-700 text-[10px] sm:text-xs rounded-full"
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
            <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
              {Array.from({ length: getTotalSlides() }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-colors duration-300 ${
                    index === currentSlide ? BG.ACCENT_GREEN : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
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

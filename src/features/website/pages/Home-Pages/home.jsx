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
import homebanner from "../../assets/homebanner.jpg";
import homesquare from "../../assets/homesquare.jpg";

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
      <section className="min-h-screen bg-[#E7F3FD] mx-2 sm:mx-3 md:mx-4 rounded-[30px] sm:rounded-[40px] md:rounded-[50px] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 py-8 sm:py-10 md:py-12 relative">
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
            <div className="flex justify-center -mt-4">
              <img
                src={textunderline}
                alt="Decorative underline for heading"
                className="w-[60%] sm:w-[50%] md:w-[45%] max-w-sm h-auto min-h-[12px] sm:min-h-[18px] md:min-h-[25px] lg:min-h-[30px] object-contain"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
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
          <div className="relative w-full flex justify-center mt-16 md:mt-24 lg:mt-32 mb-20 sm:mb-24 md:mb-28 lg:mb-32 px-4 md:px-6">
            <div className="relative w-full max-w-6xl mx-auto">
              {/* Left green bubbles - horizontally aligned design with improved spacing */}
              <div className="absolute -top-1 sm:-top-2 md:-top-3 left-2 sm:left-4 md:left-6 z-40 animate-fade-in">
                <div className="relative flex items-center">
                  {/* First pill - overlapping */}
                  <div className="w-10 h-7 sm:w-12 sm:h-8 md:w-[72px] md:h-11 bg-[#CFF49A] rounded-full shadow-[0_4px_15px_rgba(207,244,154,0.5)] -mr-2 sm:-mr-3 md:-mr-4" />
                  {/* Second pill - overlapping */}
                  <div className="w-10 h-7 sm:w-12 sm:h-8 md:w-[72px] md:h-11 bg-[#CFF49A] rounded-full shadow-[0_4px_15px_rgba(207,244,154,0.5)] -mr-2 sm:-mr-3 md:-mr-4" />
                  {/* Third pill - overlapping */}
                  <div className="w-10 h-7 sm:w-12 sm:h-8 md:w-[72px] md:h-11 bg-[#CFF49A] rounded-full shadow-[0_4px_15px_rgba(207,244,154,0.5)] -mr-1.5 sm:-mr-2 md:-mr-3" />
                  {/* Plus icon circle */}
                  <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-11 lg:h-11 bg-[#8CD63E] rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(140,214,62,0.4)] ring-2 ring-white/50">
                    <FaPlus className="text-white text-[10px] sm:text-xs md:text-sm" />
                  </div>
                </div>
              </div>

              {/* Main white chat box with image */}
              <div className="w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] rounded-3xl md:rounded-[2.5rem] shadow-[0_15px_50px_rgba(0,0,0,0.12)] relative overflow-hidden border border-gray-100/50 bg-gray-100">
                {/* Background Image */}
                <img 
                  src={homebanner} 
                  alt="JobSahi - The easiest way to get your new job. Find opportunities for ITI and Polytechnic students." 
                  className="absolute top-0 left-0 w-full h-full object-cover object-center rounded-3xl md:rounded-[2.5rem]"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center center',
                    display: 'block'
                  }}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                />
                {/* Subtle overlay for better visual effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-3xl md:rounded-[2.5rem] pointer-events-none z-10" />
              </div>

              {/* Right side white box with improved styling */}
              <div className="absolute -bottom-16 sm:-bottom-20 md:-bottom-24 lg:-bottom-28 right-0 z-30 animate-slide-in-right">
                <div className="w-[140px] h-[120px] sm:w-[180px] sm:h-[160px] md:w-[200px] md:h-[180px] lg:w-[240px] lg:h-[220px] bg-white rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-[2.5rem] shadow-[0_15px_50px_rgba(0,0,0,0.12)] relative overflow-hidden border border-gray-100/50">
                  <img 
                    src={homesquare} 
                    alt="JobSahi platform showcase - Career opportunities for students" 
                    className="absolute inset-0 w-full h-full object-cover object-center rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-[2.5rem]"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 640px) 140px, (max-width: 1024px) 200px, 240px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-blue-50/30 to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(207,244,154,0.1),_transparent_70%)]" />
                </div>
              </div>

              {/* Top-right tag - light green speech bubble with enhanced design */}
              <div className="absolute -top-2 sm:-top-3 md:-top-4 lg:-top-6 right-2 sm:right-4 md:right-6 lg:right-8 bg-gradient-to-br from-[#CFF49A] to-[#B8E87A] text-gray-800 px-3 sm:px-4 md:px-5 lg:px-7 py-2 sm:py-2.5 md:py-3 rounded-xl sm:rounded-2xl md:rounded-3xl text-[10px] sm:text-xs md:text-sm font-semibold shadow-[0_8px_25px_rgba(207,244,154,0.4)] z-40 border border-[#8CD63E]/40 backdrop-blur-sm hover:shadow-[0_10px_30px_rgba(207,244,154,0.5)] transition-all duration-300">
                <p className="leading-tight drop-shadow-sm">
                  Let&apos;s Find Your Opportunity
                  <br />
                  <span className="text-[#4A7C0F]">To Grow</span>
                </p>
              </div>

      
            

              {/* Bottom-left tag - light green speech bubble with enhanced styling */}
              <div className="absolute -bottom-6 sm:-bottom-7 md:-bottom-8 lg:-bottom-10 left-2 sm:left-4 md:left-6 bg-gradient-to-br from-[#CFF49A] to-[#B8E87A] border-2 border-[#8CD63E] px-3 sm:px-4 md:px-5 lg:px-7 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-[0_10px_30px_rgba(207,244,154,0.4)] z-40 hover:shadow-[0_12px_35px_rgba(207,244,154,0.5)] transition-all duration-300">
                <p className="text-[#4A7C0F] text-xs sm:text-sm md:text-base font-bold leading-tight drop-shadow-sm">
                  Start Your Career With{" "}
                  <span className="relative inline-block">
                    JobSahi
                    <svg
                      className="absolute -bottom-1 left-0 w-full"
                      height="4"
                      viewBox="0 0 100 4"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M 0,2 Q 15,0.5 30,2 T 60,2 Q 75,3.5 90,2 T 100,2"
                        stroke="#8CD63E"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </p>
              </div>

              {/* Center play button with text to the right - enhanced design */}
              <div className="absolute -bottom-12 sm:-bottom-13 md:-bottom-14 lg:-bottom-16 left-1/2 -translate-x-1/2 z-40 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 md:gap-5">
                <button
                  onClick={navigateToFindJob}
                  className="cursor-pointer group flex-shrink-0 focus:outline-none focus:ring-4 focus:ring-[#8CD63E]/30 rounded-full transition-all duration-300"
                  aria-label="Search Jobs"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-[72px] lg:h-[72px] bg-gradient-to-br from-[#00395B] to-[#002A42] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,57,91,0.4)] group-hover:scale-110 group-hover:shadow-[0_15px_40px_rgba(0,57,91,0.6)] transition-all duration-300 group-active:scale-95">
                    <FaPlay className="text-white text-base sm:text-lg md:text-xl lg:text-2xl ml-1 drop-shadow-md" />
                  </div>
                </button>
                <p className="text-xs sm:text-sm md:text-base font-semibold text-[#00395B] whitespace-nowrap text-center sm:text-left drop-shadow-sm px-2">
                  Search Jobs, Give Skill Tests, Get Hired
                </p>
              </div>
            </div>
          </div>

          {/* Company Logos Section - Below Illustration Area */}
          <div className="relative w-full max-w-6xl mx-auto mt-16 md:mt-20">
         
            {/* Bottom section with logos - Lighter blue/white background (30%) */}
            <div className="w-full bg-blue-50/50 rounded-b-3xl md:rounded-b-[2.5rem] py-8 md:py-12 px-4 md:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {/* Ashok Leyland Logo */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-[#00395B] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl md:text-2xl">A</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#00395B] font-bold text-sm md:text-base uppercase mb-1">
                      ASHOK LEYLAND
                    </h3>
                    <p className="text-[#00395B] text-xs md:text-sm uppercase opacity-70">
                      YOUR TAGLINE GOES HERE
                    </p>
                  </div>
                </div>

                {/* Yamaha Logo */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-[#00395B] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg md:text-xl">Y</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#00395B] font-bold text-sm md:text-base uppercase mb-1">
                      YAMAHA
                    </h3>
                    <p className="text-[#00395B] text-xs md:text-sm uppercase opacity-70">
                      YOUR TAGLINE GOES HERE
                    </p>
                  </div>
                </div>

                {/* Hero Honda Logo */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-[#00395B] rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 border border-white rounded-full" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#00395B] font-bold text-sm md:text-base uppercase mb-1">
                      HERO HONDA
                    </h3>
                    <p className="text-[#00395B] text-xs md:text-sm uppercase opacity-70">
                      YOUR TAGLINE GOES HERE
                    </p>
                  </div>
                </div>

                {/* Maruti Suzuki Logo */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-[#00395B] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg md:text-xl">S</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#00395B] font-bold text-sm md:text-base uppercase mb-1">
                      MARUTI SUZUKI
                    </h3>
                    <p className="text-[#00395B] text-xs md:text-sm uppercase opacity-70">
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
      <section className="my-5 md:my-10 ">
        <div className="max-w-7xl mx-auto ">
          <div className="relative">
            {/* Main Card */}
            <div className="shadow-2xl relative overflow-hidden rounded-3xl min-h-[400px] sm:min-h-[450px] md:min-h-[500px]">
              <img 
                src={uploadresumebg} 
                alt="Upload your resume background - Get matched with job opportunities instantly on JobSahi" 
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="lazy"
                decoding="async"
                sizes="100vw"
              />
              {/* Main Content */}
              <div className="text-center relative px-4 py-10 md:py-16 z-10">
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
                      <div className="w-full aspect-video min-h-[180px] sm:min-h-[200px] md:min-h-[220px] bg-gray-200 flex items-center justify-center relative overflow-hidden">
                        <span className="text-gray-500 text-sm sm:text-base">Blog Image</span>
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

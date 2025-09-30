import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Rounded4Cards from "../../components/Rounded4Cards";
import UI8Cards from "../../components/UI8Cards";
import { FaChevronLeft, FaChevronRight, FaArrowUp, FaGraduationCap, FaWrench, FaCog, FaTools, FaHammer, FaCar, FaBolt, FaHardHat, FaUserCheck, FaClipboardList, FaPencilAlt } from "react-icons/fa";
import textunderline from "../../assets/website_text_underline.png";
import howitworksbg from "../../assets/Worksbg_courses.png"

const Courses = () => {
  // Course cards data
  const courseCards = [
    { title: "Electrician Apprentice" },
    { title: "Welding Technician" },
    { title: "Automotive Mechanic" },
    { title: "Plumbing Specialist" },
    { title: "HVAC Technician" },
    { title: "Construction Worker" }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  // Team members data for Rounded4Cards component
  const teamMembers = [
    {
      name: "Govt. Jobs",
      role: "Central & State technical vacancies"
    },
    {
      name: "Apprenticeships", 
      role: "ITI/polytechnic skill programs"
    },
    {
      name: "Company News",
      role: "Campus drives & recruitment announcements"
    },
    {
      name: "Career Tips",
      role: "Resumes, interviews & soft skills"
    }
  ];

  // Rounded4Cards header content
  const rounded4CardsHeaderContent = {
    title: "Explore what's growing in popularity",
    description: "Begin your journey toward a better future—completely free!"
  };

  // Course categories data for UI8Cards component
  const courseCategories = [
    {
      title: "Electrician Jobs",
      count: 25,
      subject: "courses Available",
      icon: FaGraduationCap
    },
    {
      title: "Welder Jobs",
      count: 18,
      subject: "courses Available",
      icon: FaWrench
    },
    {
      title: "Mechanical",
      count: 32,
      subject: "courses Available",
      icon: FaCog
    },
    {
      title: "Electrical",
      count: 28,
      subject: "courses Available",
      icon: FaBolt
    },
    {
      title: "Automotive",
      count: 22,
      subject: "courses Available",
      icon: FaCar
    },
    {
      title: "Construction",
      count: 15,
      subject: "courses Available",
      icon: FaHardHat
    },
    {
      title: "Plumbing",
      count: 20,
      subject: "courses Available",
      icon: FaTools
    },
    {
      title: "Carpentry",
      count: 12,
      subject: "courses Available",
      icon: FaHammer
    }
  ];

  // UI8Cards header content
  const ui8CardsHeaderContent = {
    title: "Explore Job Sahi",
    description: "Find jobs that match your technical skills — electrician, welder, fitter, machinist & more.",
    cta: "Explore your field and start applying today."
  };

  // ITI Benefits data
  const itiBenefits = [
    {
      icon: FaUserCheck,
      title: "Practical, Skill-Based Training",
      description: "ITI offline courses focus on real-world, hands-on training that prepares students directly for industry demands."
    },
    {
      icon: FaClipboardList,
      title: "Direct Access To Tools And Machinery",
      description: "Learn using actual industrial equipment and tools—something online courses can't fully replicate."
    },
    {
      icon: FaPencilAlt,
      title: "One-On-One Mentorship",
      description: "Get personal guidance from experienced instructors to better understand technical concepts and improve skills."
    },
    {
      icon: FaClipboardList,
      title: "Improved Discipline And Focus",
      description: "Structured class schedules and physical presence help build discipline and reduce distractions compared to online learning."
    },
    {
      icon: FaClipboardList,
      title: "Peer Learning & Teamwork",
      description: "Collaborate with classmates on group projects and practical sessions, enhancing your teamwork and communication skills."
    }
  ];

  // Responsive slide logic
  const getVisibleCards = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1; // Mobile: 1 card
      if (window.innerWidth < 1024) return 3; // Tablet: 3 cards
      return 3; // Desktop: 3 cards
    }
    return 3; // Default fallback
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newVisibleCards = getVisibleCards();
      setVisibleCards(newVisibleCards);
      // Reset slide if current slide is beyond new max
      const maxSlides = Math.max(1, courseCards.length - newVisibleCards + 1);
      if (currentSlide >= maxSlides) {
        setCurrentSlide(0);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [currentSlide, courseCards.length]);

  const nextSlide = () => {
    const maxSlides = Math.max(1, courseCards.length - visibleCards + 1);
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    const maxSlides = Math.max(1, courseCards.length - visibleCards + 1);
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  return (
    <div className="bg-[#00395B] min-h-screen">
      <Navbar />
      
      {/* Our Top Courses Header Section */}
      <section className="py-10 bg-[#EAF5FB] mx-4 rounded-[50px] my-8 border-t-4 border-l-4 border-r-4 border-[#0B537D]">
        <div className="max-w-[90%] mx-auto px-6">
          <div className="text-center">
            {/* Top Banner */}
            <div className="mb-5">
              <div className="inline-block border-2 border-[#5C9A24] text-[#5C9A24] px-6 py-2 rounded-full text-sm font-semibold">
                #1 PORTAL JOB PLATFORM
              </div>
            </div>

            {/* Main Heading */}
            <div className="flex flex-col items-center justify-center text-center mb-5 md:mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:px-20 font-bold mb-8 text-[#0B537D] leading-tight">
                Our Top <span className="relative">Courses
                  <img src={textunderline} alt="" className="absolute -bottom-2 left-0 w-full h-6 " />
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-lg">
              Get the latest news, updates and tips.
            </p>
          </div>
        </div>
      </section>

      {/* New On Job Sahi Courses Section */}
      <section className="py-10 bg-white ">
        <div className="max-w-[90%] mx-auto px-6">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B537D] mb-4">
              New On Job Sahi
            </h2>
            <p className="text-gray-700 text-lg">
              Explore our newest programs, focused on delivering in-demand skills.
            </p>
          </div>

          {/* Course Cards Carousel */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className="-mx-5 md:-mx-10 absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 md:-translate-x-4 w-10 h-10 md:w-12 md:h-12 bg-[#5C9A24] rounded-full flex items-center justify-center text-white hover:bg-[#4a7a1d] transition-colors z-10 shadow-lg"
            >
              <FaChevronLeft className="text-sm md:text-lg" />
            </button>
            
            <button 
              onClick={nextSlide}
              className="-mx-5 md:-mx-10 absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 md:translate-x-4 w-10 h-10 md:w-12 md:h-12 bg-[#5C9A24] rounded-full flex items-center justify-center text-white hover:bg-[#4a7a1d] transition-colors z-10 shadow-lg"
            >
              <FaChevronRight className="text-sm md:text-lg" />
            </button>

            {/* Course Cards Container */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out "
                style={{ 
                  transform: `translateX(-${currentSlide * (100 / visibleCards)}%)`,
                  width: `${(courseCards.length * 100) / visibleCards}%`
                }}
              >
                {courseCards.map((course, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 px-4 md:px-10"
                    style={{ width: `${100 / courseCards.length}%` }}
                  >
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl">
                      {/* Course Image Placeholder */}
                      <div className="w-full h-48 bg-gray-100 rounded-xl mb-4"></div>
                      
                      {/* Course Title */}
                      <h3 className="text-lg font-semibold text-gray-800">
                        {course.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <button className="border-2 border-[#5C9A24] text-[#5C9A24] px-8 py-3 rounded-full font-semibold text-lg hover:bg-[#5C9A24] hover:text-white transition-colors">
              View all
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto  lg:px-6 relative ">
          <img src={howitworksbg} alt="" className="absolute rounded-2xl h-full " />
          <div className="relative grid grid-cols-1 lg:grid-cols-2 lg:gap-12 items-center m-4">
            {/* Left Side - Image Placeholder */}
            <div className="relative m-4">
              {/* <div className="bg-white"></div> */}
              <div className="w-full h-96 bg-gray-200 rounded-3xl"></div>
            </div>

            {/* Right Side - Content */}
            <div className=" p-5 md:p-12 relative md:-ml-8 ">
              <div className="space-y-6">
                {/* Main Heading */}
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  How It Works
                </h2>
                
                {/* Sub Heading */}
                <h3 className="text-xl md:text-2xl font-semibold text-white">
                  WHERE DO I START?
                </h3>

                {/* Description */}
                <p className="text-white text-lg leading-relaxed">
                  Looking to break into a new career quickly and affordably? Get started today with our free introductory course designed to guide you into a high-demand industry—no prior experience or college degree required!
                </p>

                {/* Start For Free Button */}
                <div className="pt-4">
                  <button className="bg-[#0B537D] border-2 border-[#5C9A24] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#5C9A24] transition-colors flex items-center space-x-3">
                    <span>Start For Free</span>
                    <div className="w-8 h-8 bg-[#5C9A24] rounded-full flex items-center justify-center">
                      <FaArrowUp className="text-white text-sm" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grow Your Skill Set Section */}
      <section className="py-16  my-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Grow Your Skill Set
            </h2>
          </div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Course Card 1 */}
            <div className="bg-gray-100 rounded-2xl p-6 shadow-lg">
              {/* Course Image Placeholder */}
              <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
              
              {/* Course Info */}
              <div className="space-y-3">
                {/* Instructor */}
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gray-300 rounded"></div>
                  <span className="text-gray-600 text-sm">By whom</span>
                </div>
                
                {/* Course Title */}
                <h3 className="text-xl font-bold text-gray-800">
                  Electrician Apprentice
                </h3>
                
                {/* Category */}
                <p className="text-gray-600">
                  Category: Value
                </p>
              </div>
            </div>

            {/* Course Card 2 */}
            <div className="bg-gray-100 rounded-2xl p-6 shadow-lg">
              {/* Course Image Placeholder */}
              <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
              
              {/* Course Info */}
              <div className="space-y-3">
                {/* Instructor */}
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gray-300 rounded"></div>
                  <span className="text-gray-600 text-sm">By whom</span>
                </div>
                
                {/* Course Title */}
                <h3 className="text-xl font-bold text-gray-800">
                  Welding Technician
                </h3>
                
                {/* Category */}
                <p className="text-gray-600">
                  Category: Value
                </p>
              </div>
            </div>

            {/* Course Card 3 */}
            <div className="bg-gray-100 rounded-2xl p-6 shadow-lg">
              {/* Course Image Placeholder */}
              <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
              
              {/* Course Info */}
              <div className="space-y-3">
                {/* Instructor */}
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gray-300 rounded"></div>
                  <span className="text-gray-600 text-sm">By whom</span>
                </div>
                
                {/* Course Title */}
                <h3 className="text-xl font-bold text-gray-800">
                  Automotive Mechanic
                </h3>
                
                {/* Category */}
                <p className="text-gray-600">
                  Category: Value
                </p>
              </div>
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center">
            <button className="bg-[#5C9A24] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#4a7a1d] transition-colors">
              View All
            </button>
          </div>
        </div>
      </section>

      {/* explore whats growing in popularity */}
      <Rounded4Cards 
        teamMembers={teamMembers}
        title={rounded4CardsHeaderContent.title}
        description={rounded4CardsHeaderContent.description}
      />

      {/* Browse Courses by Category */}
      <UI8Cards 
        jobCategories={courseCategories}
        headerContent={ui8CardsHeaderContent}
      />

      {/* Why ITI Offline Courses Are The Best Section */}
      <section className="py-10 bg-white my-8">
        <div className="max-w-[90%] mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B537D] mb-4">
              Why ITI Offline Courses Are The Best
            </h2>
            <p className="text-xl text-[#0B537D]">
              Top Reasons To Choose Hands-On Learning
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* First Row - 3 Cards */}
            {itiBenefits.slice(0, 3).map((benefit, index) => (
              <div key={index} className="text-center  hover:shadow-md rounded-lg p-4 hover:border">
                {/* Icon */}
                <div className="w-20 h-20 bg-[#A1E366] rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="text-[#fff] text-3xl" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-[#0B537D] mb-4">
                  {benefit.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}

            {/* Second Row - 2 Cards (centered) */}
            {itiBenefits.slice(3, 5).map((benefit, index) => (
              <div key={index + 3} className="text-center md:col-span-1 lg:col-span-1 hover:shadow-md rounded-lg p-4">
                {/* Icon */}
                <div className="w-20 h-20 bg-[#A1E366] rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="text-[#fff] text-3xl" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-[#0B537D] mb-4">
                  {benefit.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;

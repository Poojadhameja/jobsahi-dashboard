import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MeetOurTeam from "../components/MeetOurTeam";
import TrustedByStartups from "../components/TrustedByStartups";
import FAQ from "../components/FAQ";
import NewsletterSubscription from "../components/NewsletterSubscription";
import {
  FaPlay,
  FaCheckCircle,
  FaUserPlus,
  FaFileAlt,
  FaHandshake,
  FaArrowRight,
  FaSearch,
  FaUsers,
  FaBriefcase,
  FaBuilding,
  FaGraduationCap,
  FaChartLine,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import textunderline from "../assets/website_text_underline.png";

const About = () => {
  // Newsletter subscription state
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Team members data
  const teamMembers = [
    {
      name: "Marteen Bryan",
      role: "Product Designer"
    },
    {
      name: "Natasha Smith", 
      role: "Developer"
    },
    {
      name: "Kevin Lim",
      role: "UI Designer"
    },
    {
      name: "George Mark",
      role: "Product Designer"
    }
  ];

  // Team section content
  const teamTitle = (
    <>
      Let's Meet Our <br /> Awesome Team
    </>
  );
  const teamDescription = "A dedicated crew delivering your career goals:";

  // TrustedByStartups data
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

  // FAQ data
  const faqs = [
    {
      question: "How do I create an account on JOBSAHI?",
      answer: "Creating an account is simple! Just click on the \"Sign Up\" button, fill in your basic information, verify your email, and you're ready to start your job search journey."
    },
    {
      question: "Is JOBSAHI free for students?",
      answer: "Yes, JOBSAHI is completely free for ITI and Polytechnic students. We believe in providing equal opportunities for all students to access quality job opportunities."
    },
    {
      question: "What types of jobs are available on JOBSAHI?",
      answer: "We offer a wide range of job opportunities including engineering positions, technical roles, manufacturing jobs, healthcare positions, and many more across various industries."
    },
    {
      question: "How does the job matching work?",
      answer: "Our AI-powered system analyzes your profile, skills, and preferences to match you with relevant job opportunities. The more complete your profile, the better the matches."
    },
    {
      question: "Can I apply for jobs directly through JOBSAHI?",
      answer: "Yes! You can apply for jobs directly through our platform. Simply browse jobs, click apply, and your application will be sent to the employer."
    },
    {
      question: "How do I update my resume on JOBSAHI?",
      answer: "You can easily update your resume by going to your profile settings and uploading a new version. We recommend keeping your resume updated with your latest skills and experience."
    }
  ];

  const faqHeaderContent = {
    title: "We've Got The Answers",
    description: "Find answers to commonly asked questions about JobSahi and our services."
  };

  // Newsletter subscription handler
  const handleSubscribe = (email) => {
    console.log('Subscribed with email:', email);
    setIsSubscribed(true);
    setEmail("");
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  // Newsletter header content
  const newsletterHeaderContent = {
    title: "Get Fresh Job Openings, Apprenticeships, And Career Tips Straight To Your Inbox."
  };

  return (
    <div className="bg-[#00395B] min-h-screen">
      <Navbar />
      
      {/* Get To Know About Us Section */}
      <section className="py-10 bg-[#EAF5FB] mx-4 rounded-[50px] my-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            {/* Top Banner */}
            <div className="mb-5">
              <div className="inline-block border-2 border-[#5C9A24] text-[#5C9A24] px-6 py-2 rounded-full text-sm font-semibold">
                #1 PORTAL JOB PLATFORM
              </div>
            </div>

            {/* Main Heading */}
            <div className="flex flex-col items-center justify-center text-center mb-5 md:mb-12 ">
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:px-20 font-bold mb-8 text-[#0B537D] leading-tight">
                Get To Know About Us
              </h1>
              <img src={textunderline} alt="" className="w-[30%] h-[15px] md:h-[25px] -mt-10" />
            </div>

            {/* Description */}
            <p className="text-gray-700 text-lg ">
              Let's get to know us a little more closely.
            </p>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-white mx-4 rounded-[50px] my-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              <div className="bg-gray-100 rounded-2xl h-96 flex items-center justify-center relative overflow-hidden">
                <div className="text-center">
                  <div className="w-20 h-20 bg-[#5C9A24] rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-[#4a7a1d] transition-colors">
                    <FaPlay className="text-white text-2xl ml-1" />
                  </div>
                  <p className="text-gray-700 text-lg">Watch Our Story</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white mx-4 rounded-[50px] my-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stat 1 */}
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-semibold text-[#5C9A24] mb-4">
                25K+
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Successful Placements
              </h3>
              <p className="text-gray-700">
                Connecting skilled professionals with their ideal roles.
              </p>
            </div>

            {/* Stat 2 */}
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-semibold text-[#5C9A24] mb-4">
                100K
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Registered Users
              </h3>
              <p className="text-gray-700">
                A vibrant community of job seekers and recruiters.
              </p>
            </div>

            {/* Stat 3 */}
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-semibold text-[#5C9A24] mb-4">
                30+
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Industry Partners
              </h3>
              <p className="text-gray-700">
                Trusted by leaders across ITI, polytechnic, government & private sectors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Find The One That's Right For You Section */}
      <section className="py-16 bg-white mx-4 rounded-[50px] my-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Visual Elements */}
            <div className="relative">
                {/* Large L-shaped block */}
                <div className="sm:w-96 sm:h-96 w-60 h-60 bg-blue-100 rounded-3xl relative">
                  {/* Green Badge */}
                  <div className="w-[80%]">
                <div className="flex gap-3">
                  <div className="flex-1 bg-white rounded-xl p-4 shadow-lg relative">
                    <input 
                      type="text" 
                      placeholder="Trusted Job Vacancies..." 
                      className="w-full text-gray-700 bg-transparent border-none outline-none text-lg"
                      readOnly
                    />
                  </div>
                  <button className="w-16 h-16 bg-[#A1E366] rounded-xl flex items-center justify-center shadow-lg relative">
                    <FaSearch className="text-white text-lg" />
                    <div className="absolute inset-0 bg-[#A1E366] rounded-xl opacity-30 blur-sm"></div>
                  </button>
                </div>
                <div className="absolute border-4 border-white -bottom-10 left-40 sm:-bottom-10 sm:left-72 w-32 h-24 sm:w-48 sm:h-40 bg-blue-100 rounded-2xl"></div>
              </div>
                </div>
                
                
              </div>

            {/* Right Side - Content */}
            <div className="space-y-6">
            <div className="flex flex-col mb-5 md:mb-12 ">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0B537D] leading-tight">
              Find The One That's Right For You
              </h2>
              <img src={textunderline} alt="" className="w-[50%] h-[15px] md:h-[30px] " />
            </div>

              <p className="text-gray-700 text-lg leading-relaxed">
                Our intelligent matching engine connects the right talent with the right opportunities, 
                ensuring successful placements across various industries.
              </p>

              {/* Feature List */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-[#5C9A24] text-lg flex-shrink-0" />
                  <span className="text-gray-800 font-medium">
                    For Job Seekers - Discover Fresh, Verified Listings.
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-[#5C9A24] text-lg flex-shrink-0" />
                  <span className="text-gray-800 font-medium">
                    For Employers - Tap Into A Motivated Talent Pool.
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-[#5C9A24] text-lg flex-shrink-0" />
                  <span className="text-gray-800 font-medium">
                    For Partners - Access A Platform Built For Scalability.
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col items-center sm:flex-row gap-4 pt-4">
                <button className="border-2 border-[#5C9A24] text-[#5C9A24] px-6 py-3 rounded-full font-semibold text-lg hover:bg-[#5C9A24] hover:text-white flex items-center justify-center space-x-3 transition-colors">
                  <span>Search Job</span>
                  <div className="w-8 h-8 bg-[#5C9A24] rounded-full flex items-center justify-center">
                    <FaArrowRight className="text-white text-sm" />
                  </div>
                </button>
                <button className="text-[#5C9A24] font-semibold text-lg hover:text-[#4a7a1d] transition-colors flex items-center space-x-2">
                  <span>Post Job</span>
                  <div className="w-6 h-6 border-2 border-[#5C9A24] rounded-full flex items-center justify-center">
                    <span className="text-[#5C9A24] text-sm">×</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It's Works Section */}
      <section className="py-16 mx-4 my-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How It's Works?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1: Create Account */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-[#A1E366] rounded-full flex items-center justify-center relative">
                  <FaUserPlus className="text-white text-2xl" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <FaCheckCircle className="text-[#A1E366] text-sm" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Create Account
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Sign up quickly using your mobile number or email.
              </p>
            </div>

            {/* Step 2: Complete Your Profile */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-[#A1E366] rounded-full flex items-center justify-center">
                  <FaFileAlt className="text-white text-2xl" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Complete Your Profile
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Upload your resume, education, and skills.
              </p>
            </div>

            {/* Step 3: Apply Job Or Hire */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-[#A1E366] rounded-full flex items-center justify-center">
                  <FaHandshake className="text-white text-2xl" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Apply Job Or Hire
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Browse listings and apply directly—no middleman.
              </p>
            </div>
          </div>
        </div>
      </section>

       {/* Meet Our Awesome Team */}
       <MeetOurTeam 
         teamMembers={teamMembers} 
         title={teamTitle}
         description={teamDescription}
       />

       
        {/* TrustedByStartups */}
        <TrustedByStartups 
          testimonials={testimonials} 
          headerContent={trustedByStartupsHeaderContent}
        />

         {/* Companies Section */}
         <section className=" bg-white py-10">
           <div className="max-w-[80%] mx-auto p-6">
             {/* Companies Grid */}
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
               {/* Ashok Leyland */}
               <div className="flex gap-5">
                <img src="" alt="ashok leyland" className="" />
                 <h3 className="text-[#0B537D] font-bold text-lg mb-2">ASHOK LEYLAND</h3>
               </div>

               {/* Yamaha */}
               <div className="flex gap-5">
                <img src="" alt="ashok leyland" className="" />
                 <h3 className="text-[#0B537D] font-bold text-lg mb-2">ASHOK LEYLAND</h3>
               </div>

               {/* Hero Honda */}
               <div className="flex gap-5">
                <img src="" alt="ashok leyland" className="" />
                 <h3 className="text-[#0B537D] font-bold text-lg mb-2">ASHOK LEYLAND</h3>
               </div>

               {/* Maruti Suzuki */}
               <div className="flex gap-5">
                <img src="" alt="ashok leyland" className="" />
                 <h3 className="text-[#0B537D] font-bold text-lg mb-2">ASHOK LEYLAND</h3>
               </div>
             </div>
           </div>
         </section>

          {/* FAQ Section */}
          <FAQ 
            faqs={faqs} 
            headerContent={faqHeaderContent} 
          />

        {/* Newsletter Subscription */}
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

export default About;

import React, { useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer";
import MeetOurTeam from "../../components/Rounded4Cards.jsx";
import FAQ from "../../components/FAQ";
import NewsletterSubscription from "../../components/NewsletterSubscription";
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
  FaBuilding
} from "react-icons/fa";
import textunderline from "../../assets/website_text_underline.png";
import { COLOR_CLASSES } from "../../components/colorClasses";

const TrustedByStartups = lazy(() => import("../../components/TrustedByStartups.jsx"));

const About = () => {
  const navigate = useNavigate();
  // Newsletter subscription state
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Team members data
  const teamMembers = [
    {
      name: "Pooja ",
      role: "Product Designer"
    },
    {
      name: "Aarti", 
      role: "Developer"
    },
    {
      name: "Yuvraj",
      role: "UI Designer"
    },
    {
    name: "Himanshu",
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
    <div className={`${COLOR_CLASSES.bg.navy} min-h-screen`}>
      <Navbar />
      
      {/* Get To Know About Us Section */}
      <section className={`py-10 ${COLOR_CLASSES.bg.surfacePaleBlue} mx-4 lg:mx-8 rounded-[32px] md:rounded-[50px] my-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Top Banner */}
            <div className="mb-5">
              <div className={`inline-block border-2 ${COLOR_CLASSES.border.accentGreen} ${COLOR_CLASSES.text.accentGreen} px-6 py-2 rounded-full text-sm font-semibold`}>
                #1 PORTAL JOB PLATFORM
              </div>
            </div>

            {/* Main Heading */}
            <div className="flex flex-col items-center justify-center text-center mb-5 md:mb-12 ">
              <h1 className={`text-4xl sm:text-5xl md:text-7xl lg:px-20 font-bold mb-6 md:mb-8 ${COLOR_CLASSES.text.deepBlue} leading-tight`}>
                Get To Know About Us
              </h1>
              <img
                src={textunderline}
                alt=""
                className="w-28 sm:w-36 md:w-48 lg:w-60 h-[10px] md:h-[25px] -mt-6 md:-mt-10"
              />
            </div>

            {/* Description */}
            <p className={`${COLOR_CLASSES.text.neutralSlate} text-lg `}>
              Let's get to know us a little more closely.
            </p>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className={`py-16 ${COLOR_CLASSES.bg.pureWhite} mx-4 lg:mx-8 rounded-[32px] md:rounded-[50px] my-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              <div className={`${COLOR_CLASSES.bg.surfaceSoftBlue} rounded-2xl aspect-[16/9] sm:aspect-[5/3] w-full flex items-center justify-center relative overflow-hidden p-6 sm:p-8`}>
                <div className="text-center">
                  <div className={`w-20 h-20 ${COLOR_CLASSES.bg.accentGreen} rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer ${COLOR_CLASSES.hoverBg.accentGreenDark} transition-colors`}>
                    <FaPlay className={`${COLOR_CLASSES.text.pureWhite} text-2xl ml-1`} />
                  </div>
                  <p className={`${COLOR_CLASSES.text.neutralSlate} text-lg`}>Watch Our Story</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className={`py-16 ${COLOR_CLASSES.bg.pureWhite} mx-4 lg:mx-8 rounded-[32px] md:rounded-[50px] my-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Stat 1 */}
            <div className="text-center">
              <div className={`text-5xl md:text-6xl font-semibold ${COLOR_CLASSES.text.accentGreen} mb-4`}>
                25K+
              </div>
              <h3 className={`text-xl font-semibold ${COLOR_CLASSES.text.deepBlue} mb-2`}>
                Successful Placements
              </h3>
              <p className={COLOR_CLASSES.text.neutralSlate}>
                Connecting skilled professionals with their ideal roles.
              </p>
            </div>

            {/* Stat 2 */}
            <div className="text-center">
              <div className={`text-5xl md:text-6xl font-semibold ${COLOR_CLASSES.text.accentGreen} mb-4`}>
                100K
              </div>
              <h3 className={`text-xl font-semibold ${COLOR_CLASSES.text.deepBlue} mb-2`}>
                Registered Users
              </h3>
              <p className={COLOR_CLASSES.text.neutralSlate}>
                A vibrant community of job seekers and recruiters.
              </p>
            </div>

            {/* Stat 3 */}
            <div className="text-center">
              <div className={`text-5xl md:text-6xl font-semibold ${COLOR_CLASSES.text.accentGreen} mb-4`}>
                30+
              </div>
              <h3 className={`text-xl font-semibold ${COLOR_CLASSES.text.deepBlue} mb-2`}>
                Industry Partners
              </h3>
              <p className={COLOR_CLASSES.text.neutralSlate}>
                Trusted by leaders across ITI, polytechnic, government & private sectors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Find The One That's Right For You Section */}
      <section className={`py-16 ${COLOR_CLASSES.bg.pureWhite} mx-4 lg:mx-8 rounded-[32px] md:rounded-[50px] my-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Visual Elements */}
            <div className="relative flex justify-center lg:justify-start">
              <div className={`w-full max-w-xs sm:max-w-md md:max-w-lg ${COLOR_CLASSES.bg.surfacePaleBlue} rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl`}>
                <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                  <div className={`flex-1 ${COLOR_CLASSES.bg.pureWhite} rounded-xl p-4 shadow-md`}>
                    <input
                      type="text"
                      placeholder="Trusted Job Vacancies..."
                      className={`w-full ${COLOR_CLASSES.text.neutralSlate} bg-transparent border-none outline-none text-base sm:text-lg`}
                      readOnly
                    />
                  </div>
                  <button className={`self-start sm:self-auto w-full sm:w-16 h-12 sm:h-16 ${COLOR_CLASSES.bg.accentLime} rounded-xl flex items-center justify-center shadow-lg relative`}>
                    <FaSearch className={`${COLOR_CLASSES.text.pureWhite} text-lg`} />
                    <div className={`absolute inset-0 ${COLOR_CLASSES.bg.accentLime} rounded-xl opacity-30 blur-sm`}></div>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`flex items-center gap-3 ${COLOR_CLASSES.bg.pureWhite} rounded-xl p-4 shadow-md`}>
                    <div className={`w-12 h-12 ${COLOR_CLASSES.bg.accentLime} rounded-full flex items-center justify-center`}>
                      <FaBriefcase className={`${COLOR_CLASSES.text.pureWhite} text-xl`} />
                    </div>
                    <div>
                      <p className={`${COLOR_CLASSES.text.deepBlue} font-semibold text-base`}>Active Jobs</p>
                      <p className={`${COLOR_CLASSES.text.neutralSlate} text-sm`}>1,200+ verified listings</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-3 ${COLOR_CLASSES.bg.pureWhite} rounded-xl p-4 shadow-md`}>
                    <div className={`w-12 h-12 ${COLOR_CLASSES.bg.accentSky} rounded-full flex items-center justify-center`}>
                      <FaUsers className={`${COLOR_CLASSES.text.pureWhite} text-xl`} />
                    </div>
                    <div>
                      <p className={`${COLOR_CLASSES.text.deepBlue} font-semibold text-base`}>Talent Network</p>
                      <p className={`${COLOR_CLASSES.text.neutralSlate} text-sm`}>50K+ motivated seekers</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-3 ${COLOR_CLASSES.bg.pureWhite} rounded-xl p-4 shadow-md sm:col-span-2`}>
                    <div className={`w-12 h-12 ${COLOR_CLASSES.bg.accentGreen} rounded-full flex items-center justify-center`}>
                      <FaBuilding className={`${COLOR_CLASSES.text.pureWhite} text-xl`} />
                    </div>
                    <div>
                      <p className={`${COLOR_CLASSES.text.deepBlue} font-semibold text-base`}>Partner Institutes</p>
                      <p className={`${COLOR_CLASSES.text.neutralSlate} text-sm`}>Growing across India</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`hidden md:block absolute -bottom-8 -right-6 w-24 h-24 border-4 ${COLOR_CLASSES.border.pureWhite} ${COLOR_CLASSES.bg.surfacePaleBlue} rounded-2xl`}></div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-6">
            <div className="flex flex-col mb-5 md:mb-12">
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${COLOR_CLASSES.text.deepBlue} leading-tight`}>
              Find The One That's Right For You
              </h2>
              <img
                src={textunderline}
                alt=""
                className="w-32 sm:w-40 md:w-52 lg:w-64 h-[12px] md:h-[24px] mt-2 md:mt-3"
              />
            </div>

              <p className={`${COLOR_CLASSES.text.neutralSlate} text-base sm:text-lg leading-relaxed`}>
                Our intelligent matching engine connects the right talent with the right opportunities, 
                ensuring successful placements across various industries.
              </p>

              {/* Feature List */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className={`${COLOR_CLASSES.text.accentGreen} text-lg flex-shrink-0`} />
                  <span className={`${COLOR_CLASSES.text.deepBlue} font-medium text-sm sm:text-base`}>
                    For Job Seekers - Discover Fresh, Verified Listings.
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className={`${COLOR_CLASSES.text.accentGreen} text-lg flex-shrink-0`} />
                  <span className={`${COLOR_CLASSES.text.deepBlue} font-medium text-sm sm:text-base`}>
                    For Employers - Tap Into A Motivated Talent Pool.
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className={`${COLOR_CLASSES.text.accentGreen} text-lg flex-shrink-0`} />
                  <span className={`${COLOR_CLASSES.text.deepBlue} font-medium text-sm sm:text-base`}>
                    For Partners - Access A Platform Built For Scalability.
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full">
                <button
                  className={`w-full sm:w-auto border-2 ${COLOR_CLASSES.border.accentGreen} ${COLOR_CLASSES.text.accentGreen} px-6 py-3 rounded-full font-semibold text-base sm:text-lg ${COLOR_CLASSES.hoverBg.accentGreen} ${COLOR_CLASSES.hoverText.accentGreenDark} flex items-center justify-center space-x-3 transition-colors`}
                  onClick={() => navigate("/find-job")}
                >
                  <span>Search Job</span>
                  <div className={`w-8 h-8 ${COLOR_CLASSES.bg.accentGreen} rounded-full flex items-center justify-center`}>
                    <FaArrowRight className={`${COLOR_CLASSES.text.pureWhite} text-sm`} />
                  </div>
                </button>
                <button className={`w-full sm:w-auto ${COLOR_CLASSES.text.accentGreen} font-semibold text-base sm:text-lg ${COLOR_CLASSES.hoverText.accentGreenDark} transition-colors flex items-center justify-center sm:justify-start space-x-2`}>
                  <span>Post Job</span>
                  <div className={`w-6 h-6 border-2 ${COLOR_CLASSES.border.accentGreen} rounded-full flex items-center justify-center`}>
                    <span className={`${COLOR_CLASSES.text.accentGreen} text-sm`}>×</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It's Works Section */}
      <section className="py-16 mx-4 lg:mx-8 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${COLOR_CLASSES.text.pureWhite} mb-4`}>
              How It Works?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {/* Step 1: Create Account */}
            <div className=" p-6 sm:p-8 text-center h-full">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className={`w-16 h-16 ${COLOR_CLASSES.bg.accentLime} rounded-full flex items-center justify-center relative`}>
                  <FaUserPlus className={`${COLOR_CLASSES.text.pureWhite} text-2xl`} />
                  <div className={`absolute -top-1 -right-1 w-6 h-6 ${COLOR_CLASSES.bg.pureWhite} rounded-full flex items-center justify-center`}>
                    <FaCheckCircle className={`${COLOR_CLASSES.text.accentLime} text-sm`} />
                  </div>
                </div>
              </div>
              <h3 className={`text-2xl font-bold ${COLOR_CLASSES.text.pureWhite} mb-4`}>
                Create Account
              </h3>
              <p className="text-white sm:text-lg font-light">
                Sign up quickly using your mobile number or email.
              </p>
            </div>

            {/* Step 2: Complete Your Profile */}
            <div className=" p-6 sm:p-8 text-center h-full">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className={`w-16 h-16 ${COLOR_CLASSES.bg.accentLime} rounded-full flex items-center justify-center`}>
                  <FaFileAlt className={`${COLOR_CLASSES.text.pureWhite} text-2xl`} />
                </div>
              </div>
              <h3 className={`text-2xl font-bold ${COLOR_CLASSES.text.pureWhite} mb-4`}>
                Complete Your Profile
              </h3>
              <p className="text-white sm:text-lg font-light">
                Upload your resume, education, and skills.
              </p>
            </div>

            {/* Step 3: Apply Job Or Hire */}
            <div className=" p-6 sm:p-8 text-center h-full">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className={`w-16 h-16 ${COLOR_CLASSES.bg.accentLime} rounded-full flex items-center justify-center`}>
                  <FaHandshake className={`${COLOR_CLASSES.text.pureWhite} text-2xl`} />
                </div>
              </div>
              <h3 className={`text-2xl font-bold ${COLOR_CLASSES.text.pureWhite} mb-4`}>
                Apply Job Or Hire
              </h3>
              <p className="text-white sm:text-lg font-light">
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
        <Suspense fallback={<div className={`${COLOR_CLASSES.text.pureWhite} text-center py-10`}>Loading testimonials...</div>}>
          <TrustedByStartups />
        </Suspense>

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

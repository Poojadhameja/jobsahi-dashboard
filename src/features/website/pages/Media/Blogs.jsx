import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import NewsletterSubscription from '../../components/NewsletterSubscription'
import { FaCalendarAlt, FaUser, FaArrowRight, FaSearch, FaNewspaper, FaBriefcase, FaGraduationCap, FaCog, FaHardHat, FaClipboardList, FaPencilAlt, FaBookOpen, FaFacebookF, FaTwitter, FaLinkedinIn, FaReply, FaArrowLeft } from 'react-icons/fa'
import textunderline from "../../assets/website_text_underline.png";

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [commentForm, setCommentForm] = useState({
    name: '',
    email: '',
    comment: ''
  })

  // Sample blog data
  const blogData = [
    {
      id: 1,
      title: "How to Prepare for Technical Interviews: A Complete Guide",
      excerpt: "Master the art of technical interviews with our comprehensive guide covering everything from coding challenges to behavioral questions.",
      content: "Technical interviews can be daunting, but with the right preparation, you can confidently showcase your skills and land your dream job...",
      category: "career-tips",
      author: "JobSahi Team",
      date: "2024-01-15",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop",
      featured: true,
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "Building a Strong Resume for Technical Jobs",
      excerpt: "Learn how to craft a compelling resume that stands out to technical recruiters and hiring managers.",
      content: "Your resume is often the first impression you make on potential employers. Here's how to make it count...",
      category: "resume-tips",
      author: "Career Expert",
      date: "2024-01-12",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&h=300&fit=crop",
      featured: false,
      readTime: "6 min read"
    },
    {
      id: 3,
      title: "The Future of Technical Education in India",
      excerpt: "Exploring emerging trends and opportunities in technical education and skill development.",
      content: "The landscape of technical education is rapidly evolving. Here's what you need to know about the future...",
      category: "education",
      author: "Education Specialist",
      date: "2024-01-10",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop",
      featured: false,
      readTime: "7 min read"
    },
    {
      id: 4,
      title: "Success Stories: From ITI to Industry Leader",
      excerpt: "Inspiring journey of professionals who started their careers from ITI and achieved remarkable success.",
      content: "Meet the inspiring individuals who prove that with determination and the right skills, anything is possible...",
      category: "success-stories",
      author: "JobSahi Team",
      date: "2024-01-08",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&h=300&fit=crop",
      featured: true,
      readTime: "5 min read"
    },
    {
      id: 5,
      title: "Essential Soft Skills for Technical Professionals",
      excerpt: "Beyond technical expertise: the soft skills that can make or break your career in technical fields.",
      content: "While technical skills are crucial, soft skills often determine your long-term success in the workplace...",
      category: "soft-skills",
      author: "HR Professional",
      date: "2024-01-05",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
      featured: false,
      readTime: "4 min read"
    },
    {
      id: 6,
      title: "Industry Insights: What Employers Look For",
      excerpt: "Get insider knowledge about what technical employers really want from their candidates.",
      content: "Understanding employer expectations can give you a significant advantage in your job search...",
      category: "industry-insights",
      author: "Industry Expert",
      date: "2024-01-03",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=300&fit=crop",
      featured: false,
      readTime: "6 min read"
    }
  ]

  const categories = [
    { id: 'all', name: 'All Blogs', icon: <FaBookOpen /> },
    { id: 'career-tips', name: 'Career Tips', icon: <FaBriefcase /> },
    { id: 'resume-tips', name: 'Resume Tips', icon: <FaPencilAlt /> },
    { id: 'education', name: 'Education', icon: <FaGraduationCap /> },
    { id: 'success-stories', name: 'Success Stories', icon: <FaClipboardList /> },
    { id: 'soft-skills', name: 'Soft Skills', icon: <FaCog /> },
    { id: 'industry-insights', name: 'Industry Insights', icon: <FaHardHat /> }
  ]

  const featuredBlogs = blogData.filter(blog => blog.featured)
  const filteredBlogs = blogData.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getCategoryIcon = (category) => {
    const categoryData = categories.find(cat => cat.id === category)
    return categoryData ? categoryData.icon : <FaBookOpen />
  }

  // Newsletter subscription handler
  const handleNewsletterSubscribe = (email) => {
    // Here you would typically send the email to your backend
    console.log('Newsletter subscription:', email)
    setIsSubscribed(true)
    setEmail('')
    // Reset success message after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false)
    }, 3000)
  }

  // Newsletter header content
  const newsletterHeaderContent = {
    title: "New Things Will Always Update Regularly"
  }

  // Sample comments data
  const commentsData = [
    {
      id: 1,
      author: "Nathalie Kiel",
      date: "19th May 2024",
      comment: "The bee's knees bite your arm off bits and bobshe nickedit gosh gutted mate blimey, old off his nut."
    },
    {
      id: 2,
      author: "John Smith",
      date: "20th May 2024",
      comment: "Great article! Really helpful tips for resume building. Thanks for sharing this valuable information."
    }
  ]

  // Handlers
  const handleBlogClick = (blog) => {
    setSelectedBlog(blog)
  }

  const handleBackToList = () => {
    setSelectedBlog(null)
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the comment to your backend
    console.log('New comment:', commentForm)
    setCommentForm({ name: '', email: '', comment: '' })
  }

  const handleCommentChange = (field, value) => {
    setCommentForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen bg-[#00395B]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-10 bg-[#EAF5FB] mx-4 rounded-[50px] my-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            {/* Top Banner */}
            <div className="mb-5">
              <div className="inline-block border-2 border-[#5C9A24] text-[#5C9A24] px-6 py-2 rounded-full text-sm font-semibold">
                FOR JOB ASPIRANTS
              </div>
            </div>

            {/* Main Heading */}
            <div className="flex flex-col items-center justify-center text-center mb-5  ">
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:px-20 font-bold mb-8 text-[#0B537D] leading-tight">
              Read Our Blogs & News
              </h1>
              <img src={textunderline} alt="" className="w-[30%] h-[15px] md:h-[25px] -mt-10" />
            </div>

            {/* Description */}
            <p className="text-gray-700 text-lg sm:mx-10 lg:mx-28">
            Stay informed with fresh insights from the ITI, polytechnic, and government job market. Check back regularly for the latest opportunities, expert tips, and platform updates.
            </p>
          </div>
        </div>
      </section>

      {/* Conditional Rendering: Blog List or Blog Detail */}
      {!selectedBlog ? (
        /* Main Blog Content Section */
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 ">
              
              {/* Left Sidebar */}
              <div className="lg:col-span-1">
                {/* Search Bar */}
                <div className="mb-8">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search...."
                      className="w-full px-4 py-3 pl-10 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                  </div>
                </div>

                {/* Recent News Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Recent News</h3>
                  <div className="space-y-4">
                    {blogData.slice(0, 3).map((blog, index) => (
                      <div key={blog.id} className="flex items-start space-x-3 pb-4 border-b border-gray-200 last:border-b-0">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-800 leading-tight mb-1">
                            {blog.title.length > 50 ? blog.title.substring(0, 50) + '...' : blog.title}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {blog.author} • {formatDate(blog.date)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags Section */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Recruitment', 'Education', 'Tips&Trik', 'Tech', 'Development', 'Design', 'Admin', 'Technology'].map((tag, index) => (
                      <button
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-gray-700 text-sm rounded-lg hover:bg-blue-100 transition-colors"
                        onClick={() => setSelectedCategory(tag.toLowerCase())}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-3">
                {/* Blog Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {filteredBlogs.map((blog) => (
                    <article key={blog.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleBlogClick(blog)}>
                      {/* Article Image */}
                      <div className=" m-2 rounded-lg h-48 bg-gray-200 relative overflow-hidden">
                        <img src="" alt="not available" className="" />
                        {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20"></div> */}
                      </div>
                      
                      {/* Article Content */}
                      <div className="p-6">
                        {/* Meta Info */}
                        <p className="text-sm text-gray-500 mb-2">
                          {blog.author} • {formatDate(blog.date)}
                        </p>
                        
                        {/* Title */}
                        <h2 className="text-lg font-bold text-gray-800 mb-3 leading-tight">
                          {blog.title}
                        </h2>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {blog.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {blog.readTime}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            Featured
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center space-x-4">
                  <button className="w-10 h-10 flex items-center justify-center text-green-500 hover:bg-green-50 rounded-full transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {[1, 2, 3, 4].map((page) => (
                    <button
                      key={page}
                      className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                        page === 1
                          ? 'bg-green-500 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button className="w-10 h-10 flex items-center justify-center text-green-500 hover:bg-green-50 rounded-full transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Blog Detail View */
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <button 
              onClick={handleBackToList}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8 transition-colors"
            >
              <FaArrowLeft className="text-sm" />
              Back to Blogs
            </button>

            {/* Article Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                {selectedBlog.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {selectedBlog.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
                <span>{formatDate(selectedBlog.date)}</span>
                <span>By {selectedBlog.author}</span>
              </div>
            </div>

            {/* Main Article Image */}
            <div className="w-full h-64 md:h-80 bg-gray-200 rounded-lg mb-8"></div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed mb-6">
                Creating a strong resume is the first step toward landing your dream job—whether you're from ITI, polytechnic, or pursuing a government role. A well-crafted resume highlights your strengths, skills, and the value you bring to the table.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">Prepare Well, Perform Better</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Once you're shortlisted, the next step is preparation. Whether it's a written exam or interview, remember:
              </p>

              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Review the job description carefully</li>
                <li>Practice mock tests</li>
                <li>Prepare for common technical and HR questions</li>
                <li>Be confident and polite</li>
              </ul>

              {/* Quote Section */}
              <div className="bg-[#0B537D] rounded-lg p-8 my-8 text-center">
                <blockquote className="text-2xl font-bold text-[#A1E366] mb-4">
                  "Everything Is Designed. Few Things Are Designed Well"
                </blockquote>
                <cite className="text-white text-lg">Ryan Gigs - Senior Designer</cite>
              </div>

              <p className="text-gray-700 leading-relaxed">
                Your resume is your ticket to the job market. Keep it updated, be honest about your achievements, and always present your strengths professionally.
              </p>
            </div>

            {/* Footer Meta Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-6 border-t border-b border-gray-200 mb-8">
              <div className="text-sm text-gray-600">
                Tag: Developer, App
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Share</span>
                <div className="flex gap-3">
                  <button className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors">
                    <FaFacebookF className="text-sm" />
                  </button>
                  <button className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors">
                    <FaTwitter className="text-sm" />
                  </button>
                  <button className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors">
                    <FaLinkedinIn className="text-sm" />
                  </button>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Comments Section</h3>
              
              <div className="space-y-6 mb-8">
                {commentsData.map((comment) => (
                  <div key={comment.id} className="flex gap-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-gray-800">{comment.author}</h4>
                        <button className="text-green-500 text-sm hover:text-green-600 transition-colors">
                          Reply <FaReply className="inline ml-1 text-xs" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{comment.date}</p>
                      <p className="text-gray-700">{comment.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leave A Comment Form */}
            <div className="bg-green-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-green-800 mb-6">Leave A Comment</h3>
              
              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={commentForm.name}
                      onChange={(e) => handleCommentChange('name', e.target.value)}
                      placeholder="Your name here"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={commentForm.email}
                      onChange={(e) => handleCommentChange('email', e.target.value)}
                      placeholder="Your email here"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                  <textarea
                    value={commentForm.comment}
                    onChange={(e) => handleCommentChange('comment', e.target.value)}
                    placeholder="Your comment here"
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center gap-2 shadow-lg"
                >
                  Post Comment
                  <FaArrowRight className="text-sm" />
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Subscription Section */}
      <NewsletterSubscription 
        headerContent={newsletterHeaderContent}
        onSubscribe={handleNewsletterSubscribe}
        email={email}
        setEmail={setEmail}
        isSubscribed={isSubscribed}
      />

      <Footer />
    </div>
  )
}

export default Blogs

import React from 'react'
import { colors } from '../../../../shared/colors'
import { FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa'

const BlogInterested = () => {
  const blogPosts = [
    {
      title: 'Top 10 Skills Every ITI Student Should Learn in 2025',
      excerpt: 'Discover the most in-demand skills that will boost your career prospects...',
      author: 'John Doe',
      date: 'Dec 15, 2024',
      category: 'Career Tips',
      image: 'https://via.placeholder.com/300x200'
    },
    {
      title: 'How to Prepare for Technical Interviews',
      excerpt: 'A comprehensive guide to ace your technical interviews and land your dream job...',
      author: 'Jane Smith',
      date: 'Dec 12, 2024',
      category: 'Interview Tips',
      image: 'https://via.placeholder.com/300x200'
    },
    {
      title: 'Polytechnic vs ITI: Which Path is Right for You?',
      excerpt: 'Compare the benefits and career opportunities of both educational paths...',
      author: 'Mike Johnson',
      date: 'Dec 10, 2024',
      category: 'Education',
      image: 'https://via.placeholder.com/300x200'
    }
  ]

  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span style={{ color: colors.primary.blue }}>Latest</span>{' '}
            <span style={{ color: colors.accent.green }}>Blog Posts</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest career tips, industry insights, and success stories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Blog Image</span>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: colors.accent.green }}
                  >
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <FaUser className="mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-1" />
                    <span>{post.date}</span>
                  </div>
                </div>
                <a 
                  href="#" 
                  className="inline-flex items-center text-sm font-semibold hover:opacity-80 transition-opacity"
                  style={{ color: colors.primary.blue }}
                >
                  Read More
                  <FaArrowRight className="ml-2" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            className="px-8 py-3 rounded-full border-2 font-semibold hover:bg-gray-50 transition-colors"
            style={{ 
              borderColor: colors.accent.green,
              color: colors.accent.green 
            }}
          >
            View All Blog Posts
          </button>
        </div>
      </div>
    </section>
  )
}

export default BlogInterested

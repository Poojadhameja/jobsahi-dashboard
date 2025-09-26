import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Herosection from './Herosection'
import BrowseJob from './BrowseJob'
import UploadResume from './UploadResume'
import RightForYou from './RightForYou'
import HowItWorks from './HowItWorks'
import TrustedStartups from './TrustedStartups'
import BlogInterested from './BlogInterested'
import GotAnswers from './GotAnswers'
import Subscribe from './Subscribe'
import FindJob from '../FindJob/FindJob'

const home = () => {
  const [currentPage, setCurrentPage] = useState('Home')

  const handlePageChange = (pageName) => {
    setCurrentPage(pageName)
  }

  const handleCloseJobs = () => {
    setCurrentPage('Home')
  }

  return (
    <div className='bg-[#00395B]'>
      <Navbar onPageChange={handlePageChange} />
      
      {currentPage === 'Home' && (
        <>
          <Herosection />
          <BrowseJob />
          <UploadResume />
          <RightForYou />
          <HowItWorks />
          <TrustedStartups />
          <BlogInterested />
          <GotAnswers />
          <Subscribe />
          <Footer />
        </>
      )}
      
      {currentPage === 'Jobs' && (
        <div className="bg-white">
          <FindJob onClose={handleCloseJobs} />
        </div>
      )}
    </div>
  )
}

export default home

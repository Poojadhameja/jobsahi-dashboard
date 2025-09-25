import React from 'react'
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

const home = () => {
  return (
    <div className='bg-[#00395B]'>
      <Navbar />
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
    </div>
  )
}

export default home

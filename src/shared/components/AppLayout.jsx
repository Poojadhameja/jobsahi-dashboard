import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import AppSidebar from './AppSidebar'
import { TAILWIND_COLORS } from '../../shared/WebConstant'

export default function AppLayout({
  header: HeaderComponent,
  sidebarItems = [],
  brand = 'JOBSAHI',
  roleLabel = '',
}) {
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 768 : true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(typeof window !== 'undefined' ? window.innerWidth >= 768 : true)

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    setIsSidebarOpen(isDesktop)
  }, [isDesktop])

  const toggleSidebar = () => setIsSidebarOpen((s) => !s)

  const Header = HeaderComponent
    ? <HeaderComponent toggleSidebar={toggleSidebar} />
    : null

  return (
    <div className={`flex h-screen ${TAILWIND_COLORS.BG_PRIMARY} relative`}>
      {!isDesktop && isSidebarOpen && (
        <div className="fixed inset-0 z-30" onClick={toggleSidebar} />
      )}
      <AppSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} brand={brand} roleLabel={roleLabel} items={sidebarItems} />
      <div className={`flex-1 flex flex-col min-w-0 w-full relative ${isDesktop && isSidebarOpen ? 'md:ml-64' : ''}`}>
        {Header}
        <main className={`flex-1 overflow-y-auto p-6 ${TAILWIND_COLORS.SCROLLBAR}`}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}



import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { TAILWIND_COLORS, COLORS } from '../../shared/WebConstant'

export default function AppSidebar({ isOpen, toggleSidebar, brand = 'JOBSAHI', roleLabel = '', items = [] }) {
  const { pathname } = useLocation()
  const isActive = (path) => pathname === path
  const onClickItem = () => { if (typeof window !== 'undefined' && window.innerWidth < 768) toggleSidebar?.() }
  const footerTitle = `${brand}${roleLabel ? ' ' + roleLabel : ''} dashboard`

  return (
    <aside
      className={`fixed md:fixed top-0 left-0 h-full w-64 z-40 transform
        ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-100'}
        transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-lg relative flex flex-col will-change-transform`}
      style={{ backgroundColor: COLORS.PRIMARY, color: 'white' }}
    >
      <div className="h-16 flex items-center justify-center border-b border-[rgba(255,255,255,0.15)] select-none">
        <h1 className="text-xl font-bold">{brand}</h1>
      </div>

      <nav className="p-3 space-y-1 overflow-y-auto no-scrollbar flex-1 -mr-1 pr-1">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg ${isActive(item.activePath ?? item.to) ? 'bg-white/15' : 'hover:bg-white/10'}`}
            onClick={onClickItem}
          >
            {item.icon ? (
              <span aria-hidden className="w-5 h-5">{item.icon}</span>
            ) : null}
            <span className="leading-5">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-white/10 text-[11px] leading-4 text-white/70">
        {footerTitle}
        <br />
        © {new Date().getFullYear()} All Rights Reserved
      </div>
    </aside>
  )
}



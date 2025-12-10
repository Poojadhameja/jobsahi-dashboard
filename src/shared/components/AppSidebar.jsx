


import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function AppSidebar({ isOpen, toggleSidebar, brand = 'JOBSAHI', roleLabel = '', items = [] }) {
  const { pathname, search } = useLocation()
  
  const isActive = (path) => {
    const currentUrl = pathname + search
    const targetUrl = path

    // Exact match (including query params)
    if (currentUrl === targetUrl) return true

    // Check path without query params
    const currentPath = pathname
    const targetPath = targetUrl.split('?')[0]
    const targetHasQuery = targetUrl.includes('?')
    const currentHasQuery = search.length > 0

    // If target has query params, only match if current URL also has the same query params
    if (targetHasQuery) {
      if (currentPath === targetPath && currentHasQuery) {
        const targetQuery = targetUrl.split('?')[1]
        const currentQuery = search.replace('?', '')
        return currentQuery === targetQuery
      }
      return false
    }

    // If target has no query params, match only if current also has no query params
    if (currentPath === targetPath && !currentHasQuery) {
      return true
    }

    return false
  }
  
  const onClickItem = () => { if (typeof window !== 'undefined' && window.innerWidth < 768) toggleSidebar?.() }
  const footerTitle = `${brand}${roleLabel ? ' ' + roleLabel : ''} dashboard`

  const hasActiveChild = (item) => {
    if (!item.children) return false
    return item.children.some(child => {
      const childActivePath = child.activePath ?? child.to?.split('?')[0]
      const currentPath = pathname
      if (childActivePath && currentPath === childActivePath) return true
      if (isActive(child.activePath ?? child.to)) return true
      if (child.children) {
        return hasActiveChild(child)
      }
      return false
    })
  }

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 z-40 transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-lg flex flex-col`}
      style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
    >
      <div className="h-14 sm:h-16 flex items-center justify-center border-b border-[rgba(255,255,255,0.15)] select-none px-2">
        <h1 className="text-lg sm:text-xl font-bold truncate">{brand}</h1>
      </div>

      <nav className="p-2 sm:p-3 space-y-2 overflow-y-auto no-scrollbar flex-1 -mr-1 pr-1">
        {items.map((item, index) => {
          const itemKey = item.to || `item-${index}`
          const isItemActive = isActive(item.activePath ?? item.to) || hasActiveChild(item)

          return (
            <Link
              key={itemKey}
              to={item.to}
              className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-3 rounded-lg text-sm sm:text-base transition-colors ${isItemActive ? 'bg-white/15' : 'hover:bg-white/10'}`}
              onClick={onClickItem}
            >
              {item.icon ? (
                <span aria-hidden className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0">{item.icon}</span>
              ) : null}
              <span className="leading-5 truncate">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-2 sm:p-3 border-t border-white/10 text-[10px] sm:text-[11px] leading-3 sm:leading-4 text-white/70">
        <div className="truncate">{footerTitle}</div>
        <div>© {new Date().getFullYear()} All Rights Reserved</div>
      </div>
    </aside>
  )
}



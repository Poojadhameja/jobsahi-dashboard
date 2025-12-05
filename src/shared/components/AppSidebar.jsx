


import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LuChevronDown } from 'react-icons/lu'
import { TAILWIND_COLORS, COLORS } from '../../shared/WebConstant'

export default function AppSidebar({ isOpen, toggleSidebar, brand = 'JOBSAHI', roleLabel = '', items = [] }) {
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const [openDropdowns, setOpenDropdowns] = useState({})
  
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
      if (isActive(child.activePath ?? child.to)) return true
      // Check nested children
      if (child.children) {
        return hasActiveChild(child)
      }
      return false
    })
  }

  // Check only direct children (for nested dropdowns)
  const hasDirectActiveChild = (item) => {
    if (!item.children) return false
    return item.children.some(child => isActive(child.activePath ?? child.to))
  }

  // Auto-open dropdowns for active children (including nested)
  useEffect(() => {
    const newOpenDropdowns = {}
    
    const checkAndOpenDropdowns = (itemList, parentIndex = -1, isNested = false) => {
      itemList.forEach((item, index) => {
        if (item.children && item.children.length > 0) {
          // Use consistent key generation: for nested items, use child-{index} pattern
          const itemKey = isNested ? `child-${parentIndex}-${index}` : (item.to || `item-${index}`)
          if (hasActiveChild(item)) {
            newOpenDropdowns[itemKey] = true
            // Recursively check nested children
            checkAndOpenDropdowns(item.children, index, true)
          }
        }
      })
    }
    
    checkAndOpenDropdowns(items)
    
    if (Object.keys(newOpenDropdowns).length > 0) {
      setOpenDropdowns(prev => ({
        ...prev,
        ...newOpenDropdowns
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, search])

  const toggleDropdown = (itemKey) => {
    setOpenDropdowns(prev => {
      const isCurrentlyOpen = prev[itemKey]
      // If opening this dropdown, close all others and open this one
      // If closing this dropdown, just close this one
      if (isCurrentlyOpen) {
        // Closing - just remove this one
        const newState = { ...prev }
        delete newState[itemKey]
        return newState
      } else {
        // Opening - close all others and open this one
        return { [itemKey]: true }
      }
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
          const hasChildren = item.children && item.children.length > 0
          const isDropdownOpen = openDropdowns[itemKey] || hasActiveChild(item)
          const isItemActive = isActive(item.activePath ?? item.to) || hasActiveChild(item)

          return (
            <div key={itemKey} className="space-y-1">
              {hasChildren ? (
                <>
                  <button
                    onClick={() => toggleDropdown(itemKey)}
                    className={`w-full flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-3 rounded-lg text-sm sm:text-base transition-colors ${isItemActive ? 'bg-white/15' : 'hover:bg-white/10'}`}
                  >
                    <span className="leading-5 truncate flex-1 text-left">{item.label}</span>
                    <LuChevronDown 
                      className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isDropdownOpen && (
                    <div className="ml-2 sm:ml-3 pl-2 sm:pl-3 border-l-2 border-white/20 space-y-0.5">
                      {item.children.map((child, childIndex) => {
                        const childKey = `child-${index}-${childIndex}`
                        const hasNestedChildren = child.children && child.children.length > 0
                        const isNestedDropdownOpen = openDropdowns[childKey] || (hasNestedChildren && hasDirectActiveChild(child))
                        const isChildActive = isActive(child.activePath ?? child.to) || (hasNestedChildren && hasDirectActiveChild(child))
                        
                        if (hasNestedChildren) {
                          return (
                            <div key={childKey} className="space-y-0.5">
                              <button
                                onClick={(e) => {
                                  e.preventDefault()
                                  if (!isNestedDropdownOpen && child.children && child.children.length > 0) {
                                    // Navigate to first child when opening
                                    const firstChild = child.children[0]
                                    if (firstChild.to) {
                                      navigate(firstChild.to)
                                    }
                                  }
                                  toggleDropdown(childKey)
                                }}
                                className={`w-full flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm transition-colors ${isChildActive ? 'bg-white/20 font-medium' : 'hover:bg-white/10'}`}
                              >
                                <span className="leading-5 truncate flex-1 text-left">{child.label}</span>
                                <LuChevronDown 
                                  className={`w-3 h-3 transition-transform duration-200 flex-shrink-0 ${isNestedDropdownOpen ? 'rotate-180' : ''}`}
                                />
                              </button>
                              {isNestedDropdownOpen && (
                                <div className="ml-2 sm:ml-3 pl-2 sm:pl-3 border-l-2 border-white/20 space-y-0.5">
                                  {child.children.map((nestedChild, nestedIndex) => {
                                    const isNestedChildActive = isActive(nestedChild.activePath ?? nestedChild.to)
                                    return (
                                      <Link
                                        key={nestedChild.to || `nested-${nestedIndex}`}
                                        to={nestedChild.to}
                                        className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm transition-colors ${isNestedChildActive ? 'bg-white/20 font-medium' : 'hover:bg-white/10'}`}
                                        onClick={onClickItem}
                                      >
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0"></span>
                                        <span className="leading-5 truncate">{nestedChild.label}</span>
                                      </Link>
                                    )
                                  })}
                                </div>
                              )}
                            </div>
                          )
                        } else {
                          return (
                            <Link
                              key={childKey}
                              to={child.to}
                              className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm transition-colors ${isChildActive ? 'bg-white/20 font-medium' : 'hover:bg-white/10'}`}
                              onClick={onClickItem}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0"></span>
                              <span className="leading-5 truncate">{child.label}</span>
                            </Link>
                          )
                        }
                      })}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.to}
                  className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-3 rounded-lg text-sm sm:text-base ${isItemActive ? 'bg-white/15' : 'hover:bg-white/10'}`}
                  onClick={onClickItem}
                >
                  {item.icon ? (
                    <span aria-hidden className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0">{item.icon}</span>
                  ) : null}
                  <span className="leading-5 truncate">{item.label}</span>
                </Link>
              )}
            </div>
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



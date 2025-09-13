import React from 'react'
import { TAILWIND_COLORS, COLORS } from '../WebConstant'
import { LuUsers, LuPlus, LuBuilding2 } from 'react-icons/lu'

const NavigationTabs = ({ navigationTabs, activeNavTab, setActiveNavTab }) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div
        className={`flex justify-center P-3 items-center w-full p-1 rounded-[30px] border ${TAILWIND_COLORS.BORDER}`}
      >
        <div className="flex items-center justify-center gap-1 w-full">
          {navigationTabs.map((tab) => {
            const Icon = tab.icon
            const hasIcon = Boolean(Icon)
            const isActive = activeNavTab === tab.id
            const count = navigationTabs.length
            const isFive = count === 5
            const isCompact = count >= 5

            return (
              <div
                key={tab.id}
                onClick={() => setActiveNavTab(tab.id)}
                className={`cursor-pointer flex items-center justify-center rounded-[30px] transition-all duration-200
                  ${isFive ? 'basis-1/5 flex-none' : 'flex-1'}
                  ${isCompact ? 'h-8' : 'h-9'} min-w-0
                  ${isActive ? COLORS.GREEN_PRIMARY : 'text-gray-600 bg-white'}
                `}
                style={{
                  backgroundColor: isActive ? COLORS.GREEN_PRIMARY : '#FFFFFF',
                }}
                role="tab"
                aria-selected={isActive}
              >
                {hasIcon && (
                  <div
                    className={`flex items-center justify-center mr-2
                      ${isCompact ? 'w-[40px] h-[28px]' : 'w-[30px] h-[30px]'}
                      rounded-full transition-all duration-200
                      ${isActive ? 'bg-white' : 'bg-[rgba(92,154,36,0.2)]'}
                    `}
                  >
                   <Icon size={12} style={{ color: isActive ? COLORS.GREEN_PRIMARY : COLORS.GREEN_PRIMARY }} />
                  </div>
                )}

                <span
                  className={`transition-all duration-200 text-center overflow-hidden text-ellipsis whitespace-nowrap
                    ${isCompact ? 'text-[13px]' : 'text-[14px]'} leading-[18px]
                    ${isActive ? 'font-bold' : TAILWIND_COLORS.TEXT_MUTED}
                  `}
                  style={{
                    color: isActive ? '#FFFFFF' : '',
                  }}
                >
                  {tab.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Pill Navigation Component - Horizontal tab selector with pill-shaped buttons
// Usage: <PillNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
export const PillNavigation = ({ 
  tabs = [], 
  activeTab = 0, 
  onTabChange,
  className = ''
}) => {
  return (
    <div className={`flex justify-center ${className}`}>
      <div 
        className="inline-flex rounded-full p-1 items-center gap-2 overflow-x-auto max-w-full shadow-sm"
        style={{ 
          backgroundColor: '#ffffff', 
          border: '1px solid rgba(11,83,125,0.15)' 
        }}
      >
        {tabs.map((tab, index) => {
          const isActive = index === activeTab
          const Icon = tab.icon

          return (
            <button
              key={tab.id || index}
              onClick={() => onTabChange(index)}
              className="flex items-center justify-between gap-2 rounded-full px-2 lg:pe-5 py-2 whitespace-nowrap transition-all duration-200"
              style={
                isActive
                  ? { 
                      backgroundColor: COLORS.GREEN_PRIMARY, 
                      color: 'white' 
                    }
                  : { 
                      backgroundColor: 'white', 
                      color: COLORS.GREEN_PRIMARY, 
                      border: '1px solid rgba(11,83,125,0.15)' 
                    }
              }
            >
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={
                  isActive
                    ? { 
                        backgroundColor: 'rgba(255,255,255,0.9)', 
                        color: COLORS.GREEN_PRIMARY 
                      }
                    : { 
                        backgroundColor: 'rgba(92,154,36,0.15)', 
                        color: COLORS.GREEN_PRIMARY 
                      }
                }
              >
                {Icon && <Icon size={18} />}
              </span>
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Predefined tab configurations for common use cases
export const MANAGEMENT_TABS = [
  {
    id: 'student',
    label: 'Student Management',
    icon: LuUsers
  },
  {
    id: 'employer',
    label: 'Employer Management', 
    icon: LuPlus
  },
  {
    id: 'institute',
    label: 'Institute Management',
    icon: LuBuilding2
  }
]

export const DASHBOARD_TABS = [
  {
    id: 'overview',
    label: 'Overview',
    icon: LuUsers
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: LuPlus
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: LuBuilding2
  }
]

export default NavigationTabs

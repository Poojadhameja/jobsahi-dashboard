import React from 'react'
import { TAILWIND_COLORS, COLORS } from '../../shared/WebConstant'

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

export default NavigationTabs

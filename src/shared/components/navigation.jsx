import React from 'react'
import { TAILWIND_COLORS, COLORS } from '../../shared/WebConstant'

const NavigationTabs = ({ navigationTabs, activeNavTab, setActiveNavTab }) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div
        className={`flex justify-center items-center w-full p-1 rounded-[30px] border ${TAILWIND_COLORS.BG_PRIMARY}`}
        style={{ borderColor: 'rgba(11, 83, 125, 0.15)' }}
      >
        <div className="flex items-center justify-center gap-1 w-full">
          {navigationTabs.map((tab) => {
            const Icon = tab.icon
            const hasIcon = Boolean(Icon)
            const isActive = activeNavTab === tab.id
            const isFive = navigationTabs.length === 5

            return (
              <div
                key={tab.id}
                onClick={() => setActiveNavTab(tab.id)}
                className={`relative cursor-pointer flex items-center ${isFive ? 'basis-1/5 flex-none' : 'flex-1'} h-9 min-w-0 transition-all duration-200 hover:scale-105`}
                role="tab"
                aria-selected={isActive}
              >
                <div
                  className={`absolute inset-0 box-border w-full h-full rounded-[30px] border transition-all duration-200 ${isActive ? 'shadow-[0_2px_4px_rgba(92,154,36,0.2)]' : ''} bg-white border-gray-300`}
                />

                {hasIcon && (
                  <div
                    className="absolute flex items-center justify-center left-1 top-[3px] w-[30px] h-[30px] rounded-full transition-all duration-200"
                    style={{
                      backgroundColor: isActive ? COLORS.GREEN_PRIMARY : 'rgba(92, 154, 36, 0.2)',
                      transform: isActive ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >
                    <Icon size={12} style={{ color: isActive ? '#FFFFFF' : COLORS.GREEN_PRIMARY }} />
                  </div>
                )}

                <span
                  className={`absolute flex items-center justify-center ${hasIcon ? 'left-12' : 'left-3'} right-2 transition-all duration-200 text-center overflow-hidden text-ellipsis whitespace-nowrap text-[14px] leading-[18px] ${isActive ? 'font-bold scale-[1.05]' : 'font-normal'}`}
                  style={{ color: COLORS.GREEN_PRIMARY }}
                >
                  {tab.label}
                </span>

                {isActive && (
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full"
                    style={{ backgroundColor: COLORS.GREEN_PRIMARY }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default NavigationTabs

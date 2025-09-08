// ====== WebConstant (Shared) ======

// Color palette (hex/rgba)
export const COLORS = {
  // Primary blues
  lightblue: '#F6FAFF',
  PRIMARY: '#0B537D',
  PRIMARY_DARK: '#0A4A6B',
  PRIMARY_LIGHT: '#0C5A8D',

  // Opacities
  PRIMARY_50: 'rgba(11, 83, 125, 0.5)',
  PRIMARY_30: 'rgba(11, 83, 125, 0.3)',

  // Green (success/actions)
  GREEN_PRIMARY: '#5C9A24',
  GREEN_DARK: '#4A7D1A',
  GREEN_LIGHT: '#6BA829',

  // Semantic
  SUCCESS: '#16A34A',
  WARNING: '#F59E0B',
  ERROR: '#DC2626',
  INFO: '#0B537D',

  // Greys
  GRAY_50:  '#F9FAFB',
  GRAY_100: '#F3F4F6',
  GRAY_200: '#E5E7EB',
  GRAY_300: '#D1D5DB',
  GRAY_600: '#4B5563',
  GRAY_700: '#374151',
};

// Tailwind utility class tokens used across UI
export const TAILWIND_COLORS = {
  // Layout
  BG_PRIMARY: 'bg-[#E6F2F8]',              // overall page background
  HEADER_BG: 'bg-white',                   // header background
  BORDER: 'border-gray-200',              // common border color
  SCROLLBAR: 'scrollbar-thin',            // custom scrollbar from index.css

  // Text tokens
  TEXT_PRIMARY: 'text-[#0B537D]',
  TEXT_MUTED: 'text-gray-600',

  // Nav items (sidebar)
  NAV: 'text-gray-700 hover:bg-[rgba(11,83,125,0.15)] hover:text-[#0B537D]',
  NAV_ACTIVE: 'bg-[rgba(11,83,125,0.15)] text-[#0B537D] font-medium',

  // Cards
  CARD: 'bg-white rounded-xl border border-gray-200 shadow-sm',

  // Pills / badges
  BADGE_INFO: 'text-[#0B537D] bg-[#E6F2F8]',
  BADGE_WARN: 'text-yellow-700 bg-yellow-100',
  BADGE_SUCCESS: 'text-green-700 bg-green-100',
  BADGE_ERROR: 'text-red-700 bg-red-100',

  // Buttons
  BTN_PRIMARY: 'bg-[#5B9821] hover:bg-[#4A7D1A] text-white',
  BTN_SECONDARY: 'bg-[#0B537D] hover:bg-[#0A4A6B] text-white',
  BTN_LIGHT: 'bg-white hover:bg-gray-100 border border-gray-200 text-gray-700',
};

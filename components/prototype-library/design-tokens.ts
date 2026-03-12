/**
 * eBay Mobile Prototype Library
 * Design System Documentation
 * 
 * This library provides reusable components for building eBay mobile prototypes.
 * Use these components to quickly create shipping, listing, and checkout flows.
 */

// =============================================================================
// COLOR PALETTE
// =============================================================================

export const colors = {
  // Primary
  primary: '#3665F3',      // eBay Blue - CTAs, links, active states
  primaryHover: '#2d54d4', // Darker blue for hover/active
  
  // Text
  textPrimary: '#191919',  // Main text, headings
  textSecondary: '#707070', // Secondary text, descriptions
  textDisabled: '#8F8F8F', // Disabled text
  
  // Backgrounds
  bgPrimary: '#FFFFFF',    // Main background
  bgSecondary: '#F7F7F7',  // Cards, input backgrounds
  bgTertiary: '#E5E5E5',   // Dividers, disabled states
  
  // Borders
  borderDefault: '#8F8F8F', // Default borders
  borderLight: '#767676',   // Lighter borders
  borderDark: '#191919',    // Active/selected borders
  
  // Overlays
  overlayBlur: 'rgba(255, 255, 255, 0.6)', // Blur scrim for bottom sheets
  
  // Status
  success: '#5BA71B',      // Success states
  error: '#E0103A',        // Error states
  warning: '#F5A623',      // Warning states
}

// =============================================================================
// TYPOGRAPHY
// =============================================================================

export const typography = {
  // Page titles
  pageTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    lineHeight: '32px',
  },
  
  // Section headers
  sectionHeader: {
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '24px',
  },
  
  // Sheet titles
  sheetTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    lineHeight: '28px',
  },
  
  // Body text
  body: {
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '20px',
  },
  
  // Small text / labels
  small: {
    fontSize: '12px',
    fontWeight: 'normal',
    lineHeight: '16px',
  },
  
  // Card titles
  cardTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
    lineHeight: '20px',
  },
  
  // Card descriptions
  cardDescription: {
    fontSize: '13px',
    fontWeight: 'normal',
    lineHeight: '18px',
  },
  
  // iOS Status bar time
  statusBarTime: {
    fontSize: '15px',
    fontWeight: '600',
  },
}

// =============================================================================
// SPACING
// =============================================================================

export const spacing = {
  // Page padding
  pagePadding: '16px', // px-4
  
  // Card padding
  cardPadding: '16px', // p-4
  cardPaddingSmall: '12px', // p-3
  
  // Input heights
  inputHeight: '56px',      // Default input
  inputHeightCompact: '48px', // Compact input
  buttonHeight: '50px',     // CTA buttons
  
  // Border radius
  radiusSmall: '8px',       // Inputs, small cards
  radiusMedium: '16px',     // Cards
  radiusLarge: '32px',      // Bottom sheets
  radiusXLarge: '40px',     // Screen container
  radiusPhone: '55px',      // iPhone frame
  
  // Gaps
  gapSmall: '8px',
  gapMedium: '12px',
  gapLarge: '16px',
}

// =============================================================================
// IPHONE FRAME DIMENSIONS
// =============================================================================

export const iphoneFrame = {
  width: '402px',
  height: '874px',
  borderRadius: '55px',
  padding: '12px', // p-3
  
  dynamicIsland: {
    width: '126px',
    height: '37px',
    borderRadius: '20px',
  },
  
  screenRadius: '40px',
  
  homeIndicator: {
    width: '134px',
    height: '5px',
    containerHeight: '34px',
  },
  
  statusBar: {
    height: '47px',
  },
}

// =============================================================================
// COMPONENT VARIANTS
// =============================================================================

export const variants = {
  // Button variants
  button: {
    primary: 'bg-[#3665F3] text-white',
    secondary: 'border-2 border-[#191919] text-[#191919]',
    disabled: 'bg-[#E5E5E5] text-[#707070]',
  },
  
  // Card variants
  card: {
    default: 'bg-white border border-[#767676]',
    selected: 'bg-[#F7F7F7] border-2 border-[#191919]',
  },
  
  // Input variants
  input: {
    default: 'bg-[#F7F7F7] border border-[#8F8F8F]',
    active: 'bg-[#F7F7F7] border-2 border-[#191919]',
  },
}

// =============================================================================
// COUNTRY CONFIGURATIONS
// =============================================================================

export const countryConfigs = {
  DE: {
    name: 'Germany',
    currency: '€',
    currencyPosition: 'after', // "5,99 €"
    decimalSeparator: ',',
    locale: 'de-DE',
  },
  US: {
    name: 'United States',
    currency: '$',
    currencyPosition: 'before', // "$5.99"
    decimalSeparator: '.',
    locale: 'en-US',
  },
  UK: {
    name: 'United Kingdom',
    currency: '£',
    currencyPosition: 'before', // "£5.99"
    decimalSeparator: '.',
    locale: 'en-GB',
  },
  FR: {
    name: 'France',
    currency: '€',
    currencyPosition: 'after', // "5,99 €"
    decimalSeparator: ',',
    locale: 'fr-FR',
  },
  ES: {
    name: 'Spain',
    currency: '€',
    currencyPosition: 'after',
    decimalSeparator: ',',
    locale: 'es-ES',
  },
  IT: {
    name: 'Italy',
    currency: '€',
    currencyPosition: 'after',
    decimalSeparator: ',',
    locale: 'it-IT',
  },
  AU: {
    name: 'Australia',
    currency: '$',
    currencyPosition: 'before',
    decimalSeparator: '.',
    locale: 'en-AU',
  },
  CA: {
    name: 'Canada',
    currency: '$',
    currencyPosition: 'before',
    decimalSeparator: '.',
    locale: 'en-CA',
  },
}

export type CountryCode = keyof typeof countryConfigs

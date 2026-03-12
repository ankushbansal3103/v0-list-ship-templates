/**
 * US-Shelby-AG Prototype Configuration
 * 
 * This file defines the prototype metadata and can be referenced
 * in future v0 conversations to recreate or extend this design.
 */

export const PROTOTYPE_CONFIG = {
  // Prototype Identity
  id: "US-Shelby-AG",
  name: "US-Shelby-AG",
  version: "1.0.0",
  created: "2026-03-12",
  
  // Description
  description: "eBay Shipping flow prototype with full L1/L2 navigation, bottom sheets, delivery details, package configuration, and international shipping services",
  
  // Target Platform
  platform: {
    device: "iPhone 15 Pro",
    os: "iOS 17+",
    orientation: "portrait",
  },
  
  // Screens Included
  screens: [
    {
      id: "L1-shipping",
      name: "Shipping Main (L1)",
      description: "Main shipping configuration page with delivery method, services, and delivery details sections",
    },
    {
      id: "L2-package-details",
      name: "Package Details (L2)",
      description: "Full-screen package configuration with weight and dimensions",
    },
    {
      id: "L2-services",
      name: "International Services (L2)",
      description: "Full-screen international shipping service selection",
    },
    {
      id: "L2-delivery-details",
      name: "Delivery Details (L2)",
      description: "Full-screen delivery details with item location, handling time, and returns configuration",
    },
    {
      id: "sheet-delivery-method",
      name: "Delivery Method Sheet",
      description: "Bottom sheet for selecting Ship or Local pickup",
    },
    {
      id: "sheet-destination",
      name: "Destination Sheet",
      description: "Bottom sheet for selecting shipping destination regions",
    },
    {
      id: "sheet-shipping-cost",
      name: "Shipping Cost Sheet",
      description: "Full-screen sheet with numeric keyboard for entering shipping cost",
    },
    {
      id: "sheet-handling-time",
      name: "Handling Time Sheet",
      description: "Bottom sheet for selecting handling time options",
    },
    {
      id: "sheet-returns",
      name: "Returns Configuration Sheets",
      description: "Multiple bottom sheets for domestic/international returns settings",
    },
  ],
  
  // Component Library
  components: {
    base: [
      "IPhoneFrame",
      "IOSStatusBar", 
      "HomeIndicator",
      "BottomSheet",
      "SelectionBottomSheet",
      "DropdownField",
      "TextField",
      "CurrencyField",
      "PrimaryButton",
      "SecondaryButton",
      "ToggleSwitch",
      "IconButton",
      "CircleIconButton",
      "NumericKeyboard",
      "PageHeader",
      "SectionHeader",
      "SectionDivider",
      "NavigationCard",
      "InfoCard",
      "SelectionCard",
    ],
    path: "@/components/prototype-library",
  },
  
  // Design Tokens Reference
  designTokens: {
    colors: {
      primary: "#3665F3",
      primaryDark: "#2d54d4",
      textPrimary: "#191919",
      textSecondary: "#707070",
      backgroundLight: "#F7F7F7",
      border: "#8F8F8F",
      borderLight: "#E5E5E5",
      white: "#FFFFFF",
      black: "#000000",
    },
    typography: {
      fontFamily: "Market Sans, system-ui, sans-serif",
      sizes: {
        xs: "12px",
        sm: "13px",
        base: "14px",
        md: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
      },
    },
    spacing: {
      xs: "4px",
      sm: "8px",
      md: "12px",
      lg: "16px",
      xl: "20px",
      "2xl": "24px",
    },
    borderRadius: {
      sm: "8px",
      md: "12px",
      lg: "16px",
      xl: "32px",
      full: "9999px",
      iphone: "55px",
      screen: "40px",
    },
  },
  
  // How to Reference
  referenceInstructions: `
To use this prototype in future v0 conversations:

1. QUICK REFERENCE:
   "Use the US-Shelby-AG prototype patterns for [your feature]"

2. COMPONENT IMPORT:
   import { IPhoneFrame, PrimaryButton, BottomSheet } from "@/components/prototype-library"

3. DESIGN SYSTEM:
   - Primary blue: #3665F3
   - Text: #191919 (primary), #707070 (secondary)
   - Backgrounds: #F7F7F7 (light), #FFFFFF (white)
   - iPhone frame: 402x874px, rounded-[55px]
   - Bottom sheets: blur overlay (bg-white/[0.6] backdrop-blur-md)

4. KEY PATTERNS:
   - L1 pages: Main navigation with cards
   - L2 pages: Full-screen detail pages with back/close buttons
   - Bottom sheets: Selection lists with checkmarks
   - Form fields: 56px height with label + value
   - CTA buttons: 50px height, full-width, rounded-full
  `,
}

export default PROTOTYPE_CONFIG

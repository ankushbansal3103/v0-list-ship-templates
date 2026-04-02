"use client"

import Link from "next/link"
import Image from "next/image"

/**
 * DE-Helix-AG-Desktop Prototype
 * eBay Complete Your Listing Flow - Desktop Web Version with Authenticity Guarantee
 * 
 * German market desktop listing configuration matching eBay's Helix design system.
 * Includes AG eligibility banner, pricing options, shipping configuration, and promotion tools.
 * Uses Market Sans font family and eBay's design tokens.
 */

import { useState } from "react"
import { ChevronDown, ChevronRight, X, Pencil } from "lucide-react"

// ============================================================================
// TYPES
// ============================================================================

type ModalType = 
  | null 
  | "packageDetails"
  | "format"
  | "condition"
  | "destinationDropdown"
  | "internationalService"

// ============================================================================
// DATA
// ============================================================================

const packagePresets = [
  {
    id: "small",
    name: "Small box",
    description: "Up to 500 g, 30 x 20 x 10 cm",
  },
  {
    id: "medium",
    name: "Medium box",
    description: "Up to 2 kg, 60 x 30 x 15 cm",
  },
  {
    id: "large",
    name: "Large box",
    description: "Up to 5 kg, 60 x 40 x 30 cm",
  },
  {
    id: "xlarge",
    name: "Extra large",
    description: "Up to 10 kg, 80 x 60 x 40 cm",
  },
]

const internationalDestinations = [
  { id: "worldwide", label: "Worldwide" },
  { id: "eu", label: "European Union" },
  { id: "uk", label: "United Kingdom" },
  { id: "us", label: "United States" },
  { id: "asia", label: "Asia" },
]

const internationalServices = [
  {
    id: "dhl-express",
    name: "DHL Express Worldwide",
    deliveryDays: "2-4",
    weight: "Up to 30 kg",
    tracking: "Tracking included",
    price: "€ 24.99",
    logo: "DHL"
  },
  {
    id: "dhl-parcel",
    name: "DHL Parcel International",
    deliveryDays: "5-10",
    weight: "Up to 20 kg",
    tracking: "Tracking included",
    price: "€ 14.99",
    logo: "DHL"
  },
  {
    id: "ups",
    name: "UPS Standard",
    deliveryDays: "3-5",
    weight: "Up to 30 kg",
    tracking: "Tracking included",
    price: "€ 19.99",
    logo: "UPS"
  },
]

const formatOptions = [
  { id: "buy-it-now", label: "Buy It Now" },
  { id: "auction", label: "Auction" },
  { id: "auction-bin", label: "Auction with Buy It Now" },
]

// ============================================================================
// ICONS
// ============================================================================

function AuthenticityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1L2 3.5V7.5C2 11.08 4.54 14.36 8 15C11.46 14.36 14 11.08 14 7.5V3.5L8 1Z" fill="#0968F6"/>
      <path d="M6.5 8L7.5 9L9.5 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function AISparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="aiGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFD80E"/>
          <stop offset="25%" stopColor="#FF4242"/>
          <stop offset="50%" stopColor="#993EE0"/>
          <stop offset="75%" stopColor="#0968F6"/>
          <stop offset="100%" stopColor="#4EE04B"/>
        </linearGradient>
      </defs>
      <path d="M8 2L9.5 6.5L14 8L9.5 9.5L8 14L6.5 9.5L2 8L6.5 6.5L8 2Z" fill="url(#aiGradient)"/>
    </svg>
  )
}

function ShippingTruckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 16V4H3V16H16ZM16 16H21V11L18 8H16V16ZM8.5 18.5C8.5 19.33 7.83 20 7 20C6.17 20 5.5 19.33 5.5 18.5C5.5 17.67 6.17 17 7 17C7.83 17 8.5 17.67 8.5 18.5ZM20 18.5C20 19.33 19.33 20 18.5 20C17.67 20 17 19.33 17 18.5C17 17.67 17.67 17 18.5 17C19.33 17 20 17.67 20 18.5Z" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3L4 6.5V11C4 15.52 7.35 19.74 12 21C16.65 19.74 20 15.52 20 11V6.5L12 3Z" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12L11 14L15 10" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function BoxReturnIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="18" height="14" rx="1" stroke="#191919" strokeWidth="1.5"/>
      <path d="M3 10H21" stroke="#191919" strokeWidth="1.5"/>
      <path d="M8 14H12" stroke="#191919" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="7" stroke="#707070" strokeWidth="1.5"/>
      <path d="M8 7V11M8 5V5.5" stroke="#707070" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function CharityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="7" fill="#0968F6"/>
      <path d="M8 5V11M5 8H11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

// ============================================================================
// TOGGLE COMPONENT
// ============================================================================

function Toggle({ 
  enabled, 
  onChange 
}: { 
  enabled: boolean
  onChange: (enabled: boolean) => void 
}) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`w-12 h-7 rounded-full transition-colors relative ${
        enabled ? 'bg-[#3665F3]' : 'bg-[#8F8F8F]'
      }`}
    >
      <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`} />
    </button>
  )
}

// ============================================================================
// MODAL COMPONENT
// ============================================================================

function Modal({ 
  isOpen, 
  onClose, 
  title, 
  subtitle,
  children,
  footer
}: { 
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.32)' }}
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-[616px] max-h-[748px] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: "'Market Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-4 pb-2 flex-shrink-0">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-[#191919] leading-7">{title}</h2>
            {subtitle && <p className="text-sm text-[#707070] leading-5 mt-1">{subtitle}</p>}
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 bg-[#F7F7F7] rounded-full flex items-center justify-center hover:bg-[#E5E5E5] transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4 text-[#191919]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-8">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="border-t border-[#E5E5E5] p-4 flex justify-end flex-shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

interface EbayShippingHelixDEAGDesktopProps {
  previewMode?: boolean
}

export function EbayShippingHelixDEAGDesktop({ previewMode = false }: EbayShippingHelixDEAGDesktopProps) {
  // Pricing state
  const [format, setFormat] = useState("buy-it-now")
  const [itemPrice, setItemPrice] = useState("1,650.00")
  const [quantity, setQuantity] = useState("1")
  const [autoPriceReduction, setAutoPriceReduction] = useState(false)
  const [allowOffers, setAllowOffers] = useState(false)
  const [scheduleListening, setScheduleListening] = useState(false)
  const [promoteListening, setPromoteListening] = useState(false)
  
  // Package state
  const [selectedPackage, setSelectedPackage] = useState("medium")
  
  // International shipping state
  const [internationalDestination, setInternationalDestination] = useState("worldwide")
  const [selectedInternationalService, setSelectedInternationalService] = useState("dhl-express")
  
  // Modal states
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [tempSelectedPackage, setTempSelectedPackage] = useState("")
  const [tempSelectedService, setTempSelectedService] = useState("")
  const [tempSelectedDestination, setTempSelectedDestination] = useState("")
  
  // Modal handlers
  const openModal = (modal: ModalType) => {
    setActiveModal(modal)
    if (modal === "packageDetails") {
      setTempSelectedPackage(selectedPackage)
    }
    if (modal === "internationalService") {
      setTempSelectedService(selectedInternationalService)
    }
    if (modal === "destinationDropdown") {
      setTempSelectedDestination(internationalDestination)
    }
  }
  
  const closeModal = () => {
    setActiveModal(null)
    setTempSelectedPackage("")
    setTempSelectedService("")
    setTempSelectedDestination("")
  }
  
  const handleSavePackage = () => {
    if (tempSelectedPackage) {
      setSelectedPackage(tempSelectedPackage)
    }
    closeModal()
  }
  
  const handleSaveService = () => {
    if (tempSelectedService) {
      setSelectedInternationalService(tempSelectedService)
    }
    closeModal()
  }
  
  const handleSaveDestination = () => {
    if (tempSelectedDestination) {
      setInternationalDestination(tempSelectedDestination)
    }
    closeModal()
  }
  
  // Get selected package info
  const getSelectedPackageInfo = () => {
    const pkg = packagePresets.find(p => p.id === selectedPackage)
    return pkg || packagePresets[1] // default to medium
  }
  
  // Get selected service info
  const getSelectedServiceInfo = () => {
    const service = internationalServices.find(s => s.id === selectedInternationalService)
    return service || internationalServices[0]
  }
  
  // Get selected destination label
  const getSelectedDestinationLabel = () => {
    const dest = internationalDestinations.find(d => d.id === internationalDestination)
    return dest?.label || "Worldwide"
  }
  
  // Get format label
  const getFormatLabel = () => {
    const fmt = formatOptions.find(f => f.id === format)
    return fmt?.label || "Buy It Now"
  }
  
  const packageInfo = getSelectedPackageInfo()
  const serviceInfo = getSelectedServiceInfo()

  return (
    <div className={`${previewMode ? '' : 'min-h-screen'} bg-white`} style={{ fontFamily: "'Market Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Browser Chrome - Hidden in preview mode */}
      {!previewMode && (
      <div className="bg-[#E1E4EB] rounded-t-lg">
        {/* Tab Bar */}
        <div className="h-10 flex items-end px-2">
          {/* Window Controls */}
          <div className="flex items-center gap-2 px-3 pb-2">
            <div className="w-3 h-3 rounded-full bg-[#FF796F] border border-black/10" />
            <div className="w-3 h-3 rounded-full bg-[#FFD171] border border-black/10" />
            <div className="w-3 h-3 rounded-full bg-[#64C255] border border-black/10" />
          </div>
          {/* Tab */}
          <div className="h-8 bg-white rounded-t-lg px-3 flex items-center gap-2 min-w-[240px] relative">
            {/* eBay Favicon */}
            <div className="w-4 h-4 flex items-center justify-center">
              <svg viewBox="0 0 16 16" className="w-4 h-4">
                <circle cx="4" cy="8" r="3" fill="#E53238"/>
                <circle cx="8" cy="8" r="3" fill="#0064D2"/>
                <circle cx="12" cy="8" r="3" fill="#F5AF02"/>
                <circle cx="10" cy="10" r="3" fill="#86B817"/>
              </svg>
            </div>
            <span className="text-xs text-[#4B4D52] truncate">Complete your listing | eBay</span>
            <button className="ml-auto w-4 h-4 flex items-center justify-center hover:bg-[#E1E4EB] rounded-full">
              <svg viewBox="0 0 16 16" className="w-2.5 h-2.5">
                <path d="M4 4L12 12M12 4L4 12" stroke="#4B4D52" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            {/* Tab curve left */}
            <div className="absolute -left-2 bottom-0 w-2 h-2 bg-white" style={{ clipPath: 'ellipse(100% 100% at 0% 0%)' }} />
            {/* Tab curve right */}
            <div className="absolute -right-2 bottom-0 w-2 h-2 bg-white" style={{ clipPath: 'ellipse(100% 100% at 100% 0%)' }} />
          </div>
          {/* Add Tab Button */}
          <button className="w-7 h-7 flex items-center justify-center mb-1 ml-1">
            <svg viewBox="0 0 16 16" className="w-3 h-3">
              <path d="M8 3V13M3 8H13" stroke="#4B4D52" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        {/* URL Bar */}
        <div className="h-9 bg-white flex items-center px-2 gap-2 shadow-[0_1px_0_#EFF1F4]">
          {/* Navigation Buttons */}
          <button className="w-7 h-7 flex items-center justify-center">
            <svg viewBox="0 0 16 16" className="w-3 h-3">
              <path d="M10 4L6 8L10 12" stroke="#4B4D52" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="w-7 h-7 flex items-center justify-center">
            <svg viewBox="0 0 16 16" className="w-3 h-3">
              <path d="M6 4L10 8L6 12" stroke="#A9AEB8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <Link href="/" className="w-7 h-7 flex items-center justify-center hover:bg-[#EFF1F4] rounded-full transition-colors">
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5">
              <path d="M14 8A6 6 0 1 1 8 2" stroke="#4B4D52" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M8 2V5L10 4" stroke="#4B4D52" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          {/* URL Field */}
          <div className="flex-1 h-7 bg-[#EFF1F4] rounded-full flex items-center px-3 gap-2">
            <svg viewBox="0 0 16 16" className="w-4 h-4 flex-shrink-0">
              <rect x="5" y="3" width="6" height="9" rx="1" stroke="#4B4D52" strokeWidth="1.5" fill="none"/>
              <path d="M6 6h4" stroke="#4B4D52" strokeWidth="1"/>
            </svg>
            <span className="text-sm text-[#4B4D52]">ebay.de/listing/create</span>
          </div>
          {/* Avatar */}
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
          {/* More */}
          <button className="w-7 h-7 flex items-center justify-center">
            <svg viewBox="0 0 16 16" className="w-3 h-3">
              <circle cx="8" cy="3" r="1.5" fill="#4B4D52"/>
              <circle cx="8" cy="8" r="1.5" fill="#4B4D52"/>
              <circle cx="8" cy="13" r="1.5" fill="#4B4D52"/>
            </svg>
          </button>
        </div>
      </div>
      )}

      {/* Page Content */}
      <div className={previewMode ? 'w-[620px] py-6 px-6' : 'max-w-[976px] mx-auto py-16 px-4'}>
        
        {/* Page Title */}
        <h1 className="text-[30px] font-bold text-[#111820] leading-10 mb-16">Complete your listing</h1>

        {/* ============================================================ */}
        {/* CONDITION SECTION */}
        {/* ============================================================ */}
        <section className="mb-0">
          <h2 className="text-base font-bold text-[#111820] uppercase tracking-wide mb-6">CONDITION</h2>
          
          <div className="space-y-1">
            <div className="text-sm text-[#191919]">Item condition</div>
            <button className="text-sm text-[#191919] underline hover:no-underline">
              Pre-owned - Excellent
            </button>
          </div>
          
          <p className="text-sm text-[#191919] mt-4">
            Disclose all flaws to prevent returns and earn better feedback. <button className="underline hover:no-underline">Examples of flaws</button>
          </p>
        </section>

        {/* Divider */}
        <div className="border-t border-[#E5E5E5] my-12" />

        {/* ============================================================ */}
        {/* DESCRIPTION SECTION */}
        {/* ============================================================ */}
        <section className="mb-0">
          <h2 className="text-base font-bold text-[#111820] uppercase tracking-wide mb-6">DESCRIPTION</h2>
          
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {/* Font Dropdown */}
              <button className="h-6 px-2 border border-[#E5E5E5] rounded flex items-center gap-2 text-xs text-[#191919]">
                Arial
                <ChevronDown className="w-4 h-4" />
              </button>
              {/* Size Dropdown */}
              <button className="h-6 px-2 border border-[#E5E5E5] rounded flex items-center gap-2 text-xs text-[#191919]">
                14
                <ChevronDown className="w-4 h-4" />
              </button>
              {/* Bold */}
              <button className="w-6 h-6 border border-[#E5E5E5] rounded flex items-center justify-center text-base font-bold text-[#191919]">
                B
              </button>
              {/* Italic */}
              <button className="w-6 h-6 border border-[#E5E5E5] rounded flex items-center justify-center text-base font-bold italic text-[#191919] font-serif">
                I
              </button>
              {/* Bullets */}
              <button className="w-6 h-6 border border-[#E5E5E5] rounded flex items-center justify-center">
                <svg viewBox="0 0 16 16" className="w-4 h-4">
                  <circle cx="3" cy="4" r="1.5" fill="#191919"/>
                  <circle cx="3" cy="8" r="1.5" fill="#191919"/>
                  <circle cx="3" cy="12" r="1.5" fill="#191919"/>
                  <rect x="6" y="3" width="8" height="2" fill="#191919"/>
                  <rect x="6" y="7" width="8" height="2" fill="#191919"/>
                  <rect x="6" y="11" width="8" height="2" fill="#191919"/>
                </svg>
              </button>
            </div>
            
            {/* Show HTML Code */}
            <div className="flex items-center gap-2">
              <input type="checkbox" id="htmlCode" className="w-[18px] h-[18px] rounded border-[#191919]" />
              <label htmlFor="htmlCode" className="text-sm text-[#191919]">Show HTML Code</label>
              <button className="ml-1">
                <Info className="w-4 h-4 text-[#191919]" />
              </button>
            </div>
          </div>
          
          {/* Text Area */}
          <div className="border border-[#8F8F8F] rounded-lg p-4 min-h-[295px] mb-4">
            <span className="text-sm text-[#707070]">Write a detailed description of your item, or save time and let AI draft it for you.</span>
          </div>
          
          {/* AI Button */}
          <div className="flex justify-end">
            <button className="h-10 px-5 border border-[#8F8F8F] rounded-full flex items-center gap-2 hover:bg-[#F7F7F7] transition-colors">
              <AISparkleIcon className="w-4 h-4" />
              <span className="text-sm text-[#191919]">Use AI description</span>
            </button>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-[#E5E5E5] my-12" />

        {/* ============================================================ */}
        {/* PRICING SECTION */}
        {/* ============================================================ */}
        <section className="mb-0">
          <h2 className="text-base font-bold text-[#191919] uppercase tracking-wide mb-4">PRICING</h2>
          
          {/* AG Notice */}
          <div className="bg-[#F5F9FF] rounded-lg p-4 flex items-start gap-3 mb-4">
            <AuthenticityIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div className="flex-1 flex items-center justify-between">
              <span className="text-sm text-[#191919]">This item is eligible for Authenticity Check.</span>
              <button className="text-sm text-[#191919] underline hover:no-underline">How it works</button>
            </div>
          </div>

          {/* Format, Price, Quantity Row */}
          <div className="flex gap-4 mb-4">
            {/* Left Column - Format, Price, Quantity */}
            <div className="w-[280px] space-y-4">
              {/* Format */}
              <div>
                <label className="text-sm text-[#191919] block mb-2">Format</label>
                <button 
                  onClick={() => openModal("format")}
                  className="w-full h-10 px-3 border border-[#E5E5E5] rounded-lg flex items-center justify-between text-sm text-[#191919] hover:bg-[#FAFAFA] transition-colors"
                >
                  {getFormatLabel()}
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              
              {/* Item Price */}
              <div>
                <label className="text-sm text-[#191919] block mb-2">Item price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#191919]">€</span>
                  <input 
                    type="text" 
                    value={itemPrice}
                    onChange={(e) => setItemPrice(e.target.value)}
                    className="w-full h-10 pl-7 pr-3 border border-[#E5E5E5] rounded-lg text-sm text-[#191919]"
                  />
                </div>
              </div>
              
              {/* Quantity */}
              <div>
                <label className="text-sm text-[#191919] block mb-2">Quantity</label>
                <input 
                  type="text" 
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-[80px] h-10 px-3 border border-[#E5E5E5] rounded-lg text-sm text-[#191919]"
                />
              </div>
            </div>

            {/* Right Column - Sold Listings Stats */}
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-3">
                <span className="text-sm font-bold text-[#191919]">Sold listings in the last 90 days</span>
                <button>
                  <InfoIcon className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#707070]">Medium sold price</span>
                  <span className="text-[#191919] font-medium">€ 1,635.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#707070]">Free shipping</span>
                  <span className="text-[#191919] font-medium">18%</span>
                </div>
              </div>
              
              <button className="text-sm text-[#191919] underline hover:no-underline mt-3">
                See sold listings
              </button>
            </div>
          </div>

          {/* Toggle Options */}
          <div className="space-y-0">
            {/* Auto price reduction */}
            <div className="flex items-start justify-between py-4 border border-[#E5E5E5] rounded-lg px-4 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#191919]">Auto price reduction</span>
                  <span className="text-[10px] font-bold text-white bg-[#3665F3] px-1.5 py-0.5 rounded">NEW</span>
                </div>
                <p className="text-sm text-[#707070] mt-1">We&apos;ll lower the item price until it sells or hits your set minimum.</p>
              </div>
              <Toggle enabled={autoPriceReduction} onChange={setAutoPriceReduction} />
            </div>

            {/* Allow offers */}
            <div className="flex items-start justify-between py-4 border border-[#E5E5E5] rounded-lg px-4 mb-3">
              <div>
                <span className="text-sm font-bold text-[#191919]">Allow offers</span>
                <p className="text-sm text-[#707070] mt-1">Buyers interested in your item can make you offers. By turning on offers, you can accept, counter, or decline.</p>
              </div>
              <Toggle enabled={allowOffers} onChange={setAllowOffers} />
            </div>

            {/* Schedule your listing */}
            <div className="flex items-start justify-between py-4 border border-[#E5E5E5] rounded-lg px-4">
              <div>
                <span className="text-sm font-bold text-[#191919]">Schedule your listing</span>
                <p className="text-sm text-[#707070] mt-1">Your listing goes live immediately, unless you select a time and date you want it to start.</p>
              </div>
              <Toggle enabled={scheduleListening} onChange={setScheduleListening} />
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-[#E5E5E5] my-12" />

        {/* ============================================================ */}
        {/* SHIPPING SECTION */}
        {/* ============================================================ */}
        <section className="mb-0">
          <h2 className="text-base font-bold text-[#191919] uppercase tracking-wide mb-6">SHIPPING</h2>
          
          {/* Package size */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-[#191919] mb-4">Package size</h3>
            <button 
              onClick={() => openModal("packageDetails")}
              className="w-full p-4 border border-[#8F8F8F] rounded-lg flex items-center justify-between hover:bg-[#FAFAFA] transition-colors text-left"
            >
              <div>
                <div className="text-base font-medium text-[#191919]">{packageInfo.name}</div>
                <div className="text-sm text-[#707070]">{packageInfo.description}</div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#191919] flex-shrink-0" />
            </button>
          </div>

          {/* Ship with eBay */}
          <div>
            <h3 className="text-lg font-bold text-[#191919] mb-4">Ship with eBay</h3>
            <div className="flex gap-6">
              {/* Easy shipping */}
              <div className="flex-1 flex gap-3">
                <ShippingTruckIcon className="w-6 h-6 flex-shrink-0" />
                <div>
                  <div className="text-sm font-bold text-[#191919]">Easy shipping</div>
                  <p className="text-sm text-[#707070] mt-1">Use a prepaid label from eBay to ship your item to our German hub.</p>
                </div>
              </div>
              
              {/* Expert authentication */}
              <div className="flex-1 flex gap-3">
                <ShieldCheckIcon className="w-6 h-6 flex-shrink-0" />
                <div>
                  <div className="text-sm font-bold text-[#191919]">Expert authentication</div>
                  <p className="text-sm text-[#707070] mt-1">Verified items are tagged and expedited to the buyer.</p>
                </div>
              </div>
              
              {/* Protected returns */}
              <div className="flex-1 flex gap-3">
                <BoxReturnIcon className="w-6 h-6 flex-shrink-0" />
                <div>
                  <div className="text-sm font-bold text-[#191919]">Protected returns</div>
                  <p className="text-sm text-[#707070] mt-1">An expert will ensure you receive returned items in original condition.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-[#E5E5E5] my-12" />

        {/* ============================================================ */}
        {/* INTERNATIONAL SHIPPING SECTION */}
        {/* ============================================================ */}
        <section className="mb-0">
          <h2 className="text-base font-bold text-[#191919] mb-6">International shipping</h2>
          
          {/* Default Service */}
          <div className="mb-6">
            <span className="text-sm font-bold text-[#191919] mb-3 block">Default service</span>
            
            {/* eBay International Shipping Card - Selected state */}
            <div className="w-full p-4 bg-[#F7F7F7] border-2 border-[#191919] rounded-lg">
              <div className="flex gap-4 items-start">
                <div className="w-[48px] h-[32px] bg-[#F7F7F7] rounded flex items-center justify-center flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/EBay_logo.svg/2560px-EBay_logo.svg.png"
                    alt="eBay"
                    className="w-[36px] h-auto object-contain"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-sm font-bold text-[#191919] leading-tight">
                    eBay International Shipping
                  </span>
                  <p className="text-sm text-[#191919] mt-1 leading-relaxed">
                    Send items to our domestic shipping hub and we&apos;ll handle the rest—at no extra cost.
                  </p>
                  <button className="text-sm text-[#191919] underline text-left font-medium mt-2 hover:text-[#3665F3]">
                    How it works
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Service */}
          <div className="mb-4">
            <span className="text-sm font-bold text-[#191919] block">Additional service</span>
            <span className="text-sm text-[#707070]">
              <button className="underline text-[#3665F3] hover:text-[#2050D0]">Fees</button> apply for international sales.
            </span>
          </div>

          {/* Destination Dropdown */}
          <div className="mb-4">
            <button 
              onClick={() => openModal("destinationDropdown")}
              className="w-full max-w-[400px] px-4 py-3 bg-white border border-[#8F8F8F] rounded-lg flex items-center justify-between hover:bg-[#FAFAFA] transition-colors"
            >
              <div className="flex flex-col items-start">
                <span className="text-xs text-[#707070] leading-tight">Destination</span>
                <span className="text-sm text-[#191919] leading-snug">{getSelectedDestinationLabel()}</span>
              </div>
              <ChevronDown className="w-5 h-5 text-[#191919]" />
            </button>
          </div>

          {/* Selected Service Card */}
          <button 
            onClick={() => openModal("internationalService")}
            className="w-full max-w-[400px] p-4 bg-white border border-[#E5E5E5] rounded-lg mb-4 text-left hover:bg-[#FAFAFA] transition-colors"
          >
            <div className="flex gap-4 items-start">
              <div className="w-[48px] h-[48px] bg-[#F7F7F7] rounded flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-[#D40511]">{serviceInfo.logo}</span>
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-sm font-bold text-[#191919] leading-tight">
                  {serviceInfo.name}
                </span>
                <div className="text-sm text-[#707070] mt-1 leading-relaxed space-y-0.5">
                  <div>{serviceInfo.deliveryDays} business days</div>
                  <div>{serviceInfo.weight}</div>
                  <div>{serviceInfo.tracking}</div>
                  <div className="font-medium text-[#191919]">{serviceInfo.price}</div>
                </div>
              </div>
            </div>
          </button>

          {/* View All Services Button */}
          <button 
            onClick={() => openModal("internationalService")}
            className="w-full max-w-[400px] h-[44px] border border-[#8F8F8F] rounded-full flex items-center justify-center hover:bg-[#FAFAFA] transition-colors"
          >
            <span className="text-sm text-[#191919]">View all services</span>
          </button>
        </section>

        {/* Divider */}
        <div className="border-t border-[#E5E5E5] my-12" />

        {/* ============================================================ */}
        {/* PROMOTE YOUR LISTING SECTION */}
        {/* ============================================================ */}
        <section className="mb-0">
          <h2 className="text-base font-bold text-[#191919] uppercase tracking-wide mb-4">PROMOTE YOUR LISTING</h2>
          
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[#191919] mb-2">Help your listings stand out and sell.</h3>
              <p className="text-sm text-[#707070]">Choose the percentage of the total sale amount you&apos;re willing to spend on ads and pay only when your promoted items sell.</p>
            </div>
            
            {/* Phone Mockup */}
            <div className="w-[200px] h-[280px] relative">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Simplified phone mockup */}
                <div className="w-[140px] h-[260px] bg-white rounded-[24px] border-4 border-[#1a1a1a] p-2 shadow-lg">
                  <div className="w-full h-full bg-[#F7F7F7] rounded-[16px] overflow-hidden">
                    <div className="p-2">
                      <div className="text-[6px] text-[#707070] mb-1">ebay</div>
                      <div className="bg-[#3665F3] text-white text-[5px] px-1 py-0.5 rounded inline-block mb-2">Promoted</div>
                      <div className="bg-white rounded p-2">
                        <div className="w-full h-12 bg-[#E5E5E5] rounded mb-1" />
                        <div className="h-1.5 bg-[#191919] rounded w-3/4 mb-0.5" />
                        <div className="h-1 bg-[#707070] rounded w-1/2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Toggle enabled={promoteListening} onChange={setPromoteListening} />
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-[#E5E5E5] my-12" />

        {/* ============================================================ */}
        {/* CHARITY SECTION */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#191919] uppercase tracking-wide">CHARITY</h2>
            <button className="flex items-center gap-2 text-sm text-[#191919]">
              <Pencil className="w-4 h-4" />
              Edit
            </button>
          </div>
          
          <div className="bg-[#F5F9FF] rounded-lg p-4 flex items-start gap-3">
            <CharityIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-[#191919]">
              Donate a portion to charity. You&apos;ll get a final value fee discount for sold items. <button className="underline hover:no-underline">Learn more</button>
            </p>
          </div>
        </section>

        {/* ============================================================ */}
        {/* FOOTER / CTA SECTION */}
        {/* ============================================================ */}
        <section className="text-center pt-8 border-t border-[#E5E5E5]">
          <h3 className="text-2xl font-bold text-[#191919] mb-2">List it for free.</h3>
          <p className="text-sm text-[#707070] mb-2">
            A <button className="underline hover:no-underline">final value fee</button> applies when your item sells.
          </p>
          <p className="text-xs text-[#707070] mb-8 max-w-[600px] mx-auto leading-relaxed">
            By selecting List it, you agree to pay the above fees, accept the <button className="underline hover:no-underline">eBay User Agreement</button>, <button className="underline hover:no-underline">Payments Terms of Use</button>, <button className="underline hover:no-underline">Marketing Program Terms</button> and <button className="underline hover:no-underline">eBay delivery terms and conditions</button>; acknowledge reading the <button className="underline hover:no-underline">User Privacy Notice</button>; agree to offer products and services that comply with all applicable laws, and assume full responsibility for the item offered and the content of your listing.
          </p>
          
          <div className="flex flex-col items-center gap-3">
            <button className="w-[280px] h-12 bg-[#3665F3] text-white rounded-full text-base font-medium hover:bg-[#2E5AD8] transition-colors">
              List it
            </button>
            <button className="w-[280px] h-12 border border-[#8F8F8F] rounded-full text-base text-[#191919] hover:bg-[#F7F7F7] transition-colors">
              Save for later
            </button>
            <button className="w-[280px] h-12 border border-[#8F8F8F] rounded-full text-base text-[#191919] hover:bg-[#F7F7F7] transition-colors">
              Preview
            </button>
          </div>
        </section>

      </div>

      {/* ============================================================ */}
      {/* MODALS */}
      {/* ============================================================ */}

      {/* Package Details Modal */}
      <Modal
        isOpen={activeModal === "packageDetails"}
        onClose={closeModal}
        title="Package details"
        subtitle="Select your package type and size"
        footer={
          <button
            onClick={handleSavePackage}
            className="px-8 py-3 bg-[#3665F3] text-white rounded-full text-sm font-medium hover:bg-[#2E5AD8] transition-colors"
          >
            Save
          </button>
        }
      >
        <div className="py-4 space-y-2">
          {packagePresets.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => setTempSelectedPackage(pkg.id)}
              className="w-full flex items-center gap-4 p-4 rounded-lg text-left hover:bg-[#FAFAFA] transition-colors"
            >
              {/* Radio Button */}
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                tempSelectedPackage === pkg.id ? 'border-[#191919] bg-[#191919]' : 'border-[#8F8F8F]'
              }`}>
                {tempSelectedPackage === pkg.id && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <span className="text-sm font-bold text-[#191919] block">{pkg.name}</span>
                <span className="text-sm text-[#707070]">{pkg.description}</span>
              </div>
            </button>
          ))}
        </div>
      </Modal>

      {/* Format Selection Modal */}
      <Modal
        isOpen={activeModal === "format"}
        onClose={closeModal}
        title="Select format"
        subtitle="Choose how you want to sell your item"
        footer={
          <button
            onClick={() => {
              closeModal()
            }}
            className="px-8 py-3 bg-[#3665F3] text-white rounded-full text-sm font-medium hover:bg-[#2E5AD8] transition-colors"
          >
            Done
          </button>
        }
      >
        <div className="py-4 space-y-2">
          {formatOptions.map((fmt) => (
            <button
              key={fmt.id}
              onClick={() => setFormat(fmt.id)}
              className="w-full flex items-center gap-4 p-4 rounded-lg text-left hover:bg-[#FAFAFA] transition-colors"
            >
              {/* Radio Button */}
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                format === fmt.id ? 'border-[#191919] bg-[#191919]' : 'border-[#8F8F8F]'
              }`}>
                {format === fmt.id && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
              </div>
              
              {/* Content */}
              <span className="text-sm font-bold text-[#191919]">{fmt.label}</span>
            </button>
          ))}
        </div>
      </Modal>

      {/* Destination Selection Modal */}
      <Modal
        isOpen={activeModal === "destinationDropdown"}
        onClose={closeModal}
        title="Select destination"
        subtitle="Choose where you want to ship to"
        footer={
          <button
            onClick={handleSaveDestination}
            className="px-8 py-3 bg-[#3665F3] text-white rounded-full text-sm font-medium hover:bg-[#2E5AD8] transition-colors"
          >
            Save
          </button>
        }
      >
        <div className="py-4 space-y-2">
          {internationalDestinations.map((dest) => (
            <button
              key={dest.id}
              onClick={() => setTempSelectedDestination(dest.id)}
              className="w-full flex items-center gap-4 p-4 rounded-lg text-left hover:bg-[#FAFAFA] transition-colors"
            >
              {/* Radio Button */}
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                tempSelectedDestination === dest.id ? 'border-[#191919] bg-[#191919]' : 'border-[#8F8F8F]'
              }`}>
                {tempSelectedDestination === dest.id && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
              </div>
              
              {/* Content */}
              <span className="text-sm font-bold text-[#191919]">{dest.label}</span>
            </button>
          ))}
        </div>
      </Modal>

      {/* International Service Selection Modal */}
      <Modal
        isOpen={activeModal === "internationalService"}
        onClose={closeModal}
        title="Select shipping service"
        subtitle="Choose a carrier for international shipping"
        footer={
          <button
            onClick={handleSaveService}
            className="px-8 py-3 bg-[#3665F3] text-white rounded-full text-sm font-medium hover:bg-[#2E5AD8] transition-colors"
          >
            Save
          </button>
        }
      >
        <div className="py-4 space-y-2">
          {internationalServices.map((service) => (
            <button
              key={service.id}
              onClick={() => setTempSelectedService(service.id)}
              className="w-full flex items-start gap-4 p-4 rounded-lg text-left hover:bg-[#FAFAFA] transition-colors"
            >
              {/* Radio Button */}
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-4 ${
                tempSelectedService === service.id ? 'border-[#191919] bg-[#191919]' : 'border-[#8F8F8F]'
              }`}>
                {tempSelectedService === service.id && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
              </div>

              {/* Logo */}
              <div className="w-14 h-14 bg-[#F7F7F7] rounded-lg flex items-center justify-center flex-shrink-0 p-2">
                <span className="text-xs font-bold text-[#D40511]">{service.logo}</span>
              </div>

              {/* Content */}
              <div className="flex-1 py-1">
                <h4 className="text-sm font-bold text-[#191919] leading-5">{service.name}</h4>
                <div className="text-sm text-[#707070] leading-5">
                  <div>{service.deliveryDays} business days</div>
                  <div>{service.weight}</div>
                  <div>{service.tracking}</div>
                  <div className="font-medium text-[#191919]">{service.price}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Modal>

    </div>
  )
}

export default EbayShippingHelixDEAGDesktop

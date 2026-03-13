"use client"

import Link from "next/link"

/**
 * FR-Helix-Simple-Desktop Prototype
 * eBay Shipping Configuration Flow - Desktop Web Version (Helix Simple)
 * 
 * French market desktop shipping configuration matching eBay's Helix Simple design system.
 * Uses Market Sans font family, specific color palette, and desktop-optimized layouts.
 */

import { useState } from "react"
import { ChevronDown, ChevronRight, X } from "lucide-react"

// ============================================================================
// TYPES
// ============================================================================

type ModalType = 
  | null 
  | "defaultDomesticService" 
  | "additionalDomesticService" 
  | "internationalService"
  | "defaultShippingCost"
  | "additionalShippingCost"
  | "internationalShippingCost"
  | "deliveryDetails"
  | "destinationDropdown"
  | "packageDetails"

// ============================================================================
// DATA
// ============================================================================

const deliveryMethods = [
  { 
    id: "both", 
    label: "Shipping or pickup",
    description: "Let buyers choose how they get their items.",
    icon: "shipping-pickup"
  },
  { 
    id: "shipping", 
    label: "Shipping only",
    description: "Ship items directly to buyers.",
    icon: "shipping"
  },
  { 
    id: "pickup", 
    label: "Pick up only",
    description: "Arrange local pickup without any shipping costs.",
    icon: "pickup"
  },
]

const domesticServices = [
  {
    id: "mondial-relay",
    name: "Mondial Relay",
    deliveryDays: "X-X",
    weight: "Up to X lb.",
    tracking: "Tracking included",
    price: "X,XX €",
  },
  {
    id: "colissimo",
    name: "Colissimo",
    deliveryDays: "X-X",
    weight: "Up to X lb.",
    tracking: "Tracking included",
    price: "X,XX €",
  },
  {
    id: "chronopost",
    name: "Chronopost",
    deliveryDays: "X-X",
    weight: "Up to X lb.",
    tracking: "Tracking included",
    price: "X,XX €",
  }
]

const internationalDestinations = [
  { id: "eu", label: "European Union" },
  { id: "worldwide", label: "Worldwide" },
  { id: "uk", label: "United Kingdom" },
  { id: "us", label: "United States" },
]

const handlingTimeOptions = [
  { id: "1", label: "1 business day" },
  { id: "2", label: "2 business days" },
  { id: "3", label: "3 business days" },
  { id: "5", label: "5 business days" },
]

const returnPeriodOptions = [
  { id: "14", label: "14 days" },
  { id: "30", label: "30 days" },
  { id: "60", label: "60 days" },
]

const returnShippingOptions = [
  { id: "buyer", label: "Buyer" },
  { id: "seller", label: "Seller" },
]

// Package details presets
const packagePresets = [
  {
    id: "letter",
    name: "Letter",
    description: "Up to 60 x 30 x 3 cm",
    icon: "letter",
    sizes: [
      { id: "letter-20g", weight: "Up to 20 g", description: "Fits items like stamps" },
      { id: "letter-100g", weight: "Up to 100 g", description: "Fits items like trading cards or coins" },
      { id: "letter-250g", weight: "Up to 250 g", description: "Fits items like CDs or jeux vidéos" },
      { id: "letter-2kg", weight: "Up to 2 kg", description: "Fits items like comic books or vyniles" },
    ]
  },
  {
    id: "parcel",
    name: "Parcel",
    description: "Max 120 cm any side",
    icon: "parcel",
    sizes: [
      { id: "parcel-500g", weight: "Up to 500 g", description: "Fits items like t-shirts or watches" },
      { id: "parcel-1kg", weight: "Up to 1 kg", description: "Fits items like smartphones" },
      { id: "parcel-2kg", weight: "Up to 2 kg", description: "Fits items like handbags" },
      { id: "parcel-5kg", weight: "Up to 5 kg", description: "Fits items like laptops or game consoles" },
      { id: "parcel-10kg", weight: "Up to 10 kg", description: "Fits items like small furniture" },
      { id: "parcel-30kg", weight: "Up to 30 kg", description: "Fits items like sport equipment" },
    ]
  }
]

const oversizedOptions = [
  { id: "oversized", weight: "Oversized", description: "Above 30 kg or 120 cm any side" },
  { id: "unknown", weight: "I don't know size", description: "Set your own shipping rate" },
]

// ============================================================================
// CARRIER LOGOS (Inline SVGs for reliability)
// ============================================================================

function MondialRelayLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Mondial Relay Logo - Stylized */}
      <rect width="20" height="24" fill="#96154A" rx="2"/>
      <text x="4" y="15" fill="white" fontSize="6" fontWeight="bold" fontFamily="Arial">Mondial</text>
      <text x="6" y="21" fill="white" fontSize="5" fontFamily="Arial">Relay</text>
      <path d="M15 8 L18 5 L18 11 Z" fill="#F6ABB6"/>
    </svg>
  )
}

function ColissimoLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Colissimo Logo - Package/Box with gradient */}
      <defs>
        <linearGradient id="colissimoGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EB6608"/>
          <stop offset="100%" stopColor="#FABA05"/>
        </linearGradient>
      </defs>
      <path d="M20 4 L32 10 L32 26 L20 32 L8 26 L8 10 Z" fill="url(#colissimoGrad)"/>
      <path d="M20 4 L20 32 M8 10 L32 10" stroke="#fff" strokeWidth="1" opacity="0.5"/>
      <text x="5" y="38" fill="#3C3C3B" fontSize="6" fontWeight="bold" fontFamily="Arial">colissimo</text>
    </svg>
  )
}

function ChronopostLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Chronopost Logo - Stylized */}
      <rect x="0" y="4" width="48" height="24" fill="#0038A8" rx="2"/>
      <circle cx="12" cy="16" r="6" fill="#FFD700"/>
      <text x="20" y="20" fill="white" fontSize="7" fontWeight="bold" fontFamily="Arial">chrono</text>
      <text x="8" y="36" fill="#0038A8" fontSize="6" fontWeight="bold" fontFamily="Arial">chronopost</text>
    </svg>
  )
}

function CarrierLogo({ carrierId, className }: { carrierId: string; className?: string }) {
  switch (carrierId) {
    case "mondial-relay":
      return <MondialRelayLogo className={className} />
    case "colissimo":
      return <ColissimoLogo className={className} />
    case "chronopost":
      return <ChronopostLogo className={className} />
    default:
      return <div className={`${className} bg-[#F7F7F7] rounded`} />
  }
}

// ============================================================================
// ICONS
// ============================================================================

function ShippingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="6" width="20" height="14" rx="1" stroke="#191919" strokeWidth="1.5" fill="none"/>
      <path d="M2 10h20" stroke="#191919" strokeWidth="1.5"/>
      <path d="M12 6V3M8 3h8" stroke="#191919" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function ShippingPickupIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="6" width="13" height="11" rx="1" stroke="#191919" strokeWidth="1.5" fill="none"/>
      <path d="M6 6V4C6 2.9 6.9 2 8 2h8c1.1 0 2 .9 2 2v2" stroke="#191919" strokeWidth="1.5" fill="none"/>
      <circle cx="18" cy="16" r="4" stroke="#191919" strokeWidth="1.5" fill="none"/>
      <circle cx="18" cy="15" r="1.5" fill="#191919"/>
    </svg>
  )
}

function PickupIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#191919" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="9" r="2.5" stroke="#191919" strokeWidth="1.5" fill="none"/>
    </svg>
  )
}

function DeliveryMethodIcon({ type, className }: { type: string; className?: string }) {
  switch (type) {
    case "shipping-pickup":
      return <ShippingPickupIcon className={className} />
    case "shipping":
      return <ShippingIcon className={className} />
    case "pickup":
      return <PickupIcon className={className} />
    default:
      return null
  }
}

function LetterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="5" width="20" height="14" rx="1" stroke="#191919" strokeWidth="1.5" fill="none"/>
      <path d="M2 7l10 6 10-6" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ParcelIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 8l9-4 9 4v8l-9 4-9-4V8z" stroke="#191919" strokeWidth="1.5" fill="none"/>
      <path d="M3 8l9 4 9-4M12 12v8" stroke="#191919" strokeWidth="1.5"/>
    </svg>
  )
}

function ChevronUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 10l4-4 4 4" stroke="#707070" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
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
// SERVICE ROW COMPONENT (for modals)
// ============================================================================

function ServiceRow({ 
  service, 
  isSelected, 
  onSelect 
}: { 
  service: typeof domesticServices[0]
  isSelected: boolean
  onSelect: () => void
}) {
  return (
    <button
      onClick={onSelect}
      className="w-full flex items-start gap-4 py-2 text-left"
    >
      {/* Radio Button */}
      <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-4">
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
          isSelected ? 'border-[#191919] bg-[#191919]' : 'border-[#8F8F8F]'
        }`}>
          {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
        </div>
      </div>

      {/* Logo */}
      <div className="w-14 h-14 bg-[#F7F7F7] rounded-lg flex items-center justify-center flex-shrink-0 p-2">
        <CarrierLogo carrierId={service.id} className="w-10 h-10" />
      </div>

      {/* Content */}
      <div className="flex-1 py-1">
        <h4 className="text-sm font-bold text-[#191919] leading-5">{service.name}</h4>
        <div className="text-sm text-[#707070] leading-5">
          <div>{service.deliveryDays} business days</div>
          <div>{service.weight}</div>
          <div>{service.tracking}</div>
          <div>{service.price}</div>
        </div>
      </div>
    </button>
  )
}

// ============================================================================
// DROPDOWN COMPONENT
// ============================================================================

function Dropdown({
  label,
  value,
  options,
  onChange,
  placeholder
}: {
  label?: string
  value: string
  options: { id: string; label: string }[]
  onChange: (id: string) => void
  placeholder?: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedOption = options.find(o => o.id === value)

  return (
    <div className="relative">
      {label && <label className="text-xs text-[#707070] block mb-1">{label}</label>}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 border border-[#8F8F8F] rounded-lg flex items-center justify-between hover:bg-[#FAFAFA] transition-colors bg-white"
      >
        <span className="text-sm text-[#191919]">
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown className={`w-5 h-5 text-[#191919] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E5E5E5] rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                onChange(option.id)
                setIsOpen(false)
              }}
              className={`w-full px-3 py-2 text-left text-sm hover:bg-[#F7F7F7] transition-colors first:rounded-t-lg last:rounded-b-lg ${
                option.id === value ? 'bg-[#F7F7F7] font-medium' : ''
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

interface EbayShippingHelixFRDesktopProps {
  previewMode?: boolean
}

export function EbayShippingHelixFRDesktop({ previewMode = false }: EbayShippingHelixFRDesktopProps) {
  // State
  const [deliveryMethod, setDeliveryMethod] = useState("both")
  const [selectedDomesticService, setSelectedDomesticService] = useState("mondial-relay")
  const [paymentType, setPaymentType] = useState<"buyer" | "seller">("buyer")
  const [additionalService, setAdditionalService] = useState("mondial-relay")
  const [internationalDestination, setInternationalDestination] = useState("eu")
  const [internationalService, setInternationalService] = useState("colissimo")
  
  // Modal states
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [tempSelectedService, setTempSelectedService] = useState("")
  
  // Delivery details state
  const [handlingTime, setHandlingTime] = useState("2")
  const [domesticReturnsEnabled, setDomesticReturnsEnabled] = useState(true)
  const [returnPeriod, setReturnPeriod] = useState("14")
  const [returnShippingPaidBy, setReturnShippingPaidBy] = useState("buyer")
  
  // Shipping cost state
  const [defaultShippingCost, setDefaultShippingCost] = useState("X,XX")
  const [additionalShippingCost, setAdditionalShippingCost] = useState("X,XX")
  const [internationalShippingCost, setInternationalShippingCost] = useState("X,XX")
  
  // Package details state
  const [selectedPackageType, setSelectedPackageType] = useState("parcel")
  const [selectedPackageSize, setSelectedPackageSize] = useState("parcel-500g")
  const [expandedPresets, setExpandedPresets] = useState<string[]>(["parcel"])
  
  // Temp state for package modal
  const [tempPackageType, setTempPackageType] = useState("")
  const [tempPackageSize, setTempPackageSize] = useState("")

  // Modal handlers
  const openModal = (modal: ModalType, initialService?: string) => {
    setActiveModal(modal)
    if (initialService) {
      setTempSelectedService(initialService)
    }
    if (modal === "packageDetails") {
      setTempPackageType(selectedPackageType)
      setTempPackageSize(selectedPackageSize)
      setExpandedPresets([selectedPackageType])
    }
  }

  const closeModal = () => {
    setActiveModal(null)
    setTempSelectedService("")
    setTempPackageType("")
    setTempPackageSize("")
  }

  const handleSaveService = () => {
    if (activeModal === "defaultDomesticService" && tempSelectedService) {
      setSelectedDomesticService(tempSelectedService)
    } else if (activeModal === "additionalDomesticService" && tempSelectedService) {
      setAdditionalService(tempSelectedService)
    } else if (activeModal === "internationalService" && tempSelectedService) {
      setInternationalService(tempSelectedService)
    }
    closeModal()
  }

  const handleSavePackage = () => {
    if (tempPackageSize) {
      setSelectedPackageType(tempPackageType)
      setSelectedPackageSize(tempPackageSize)
    }
    closeModal()
  }

  const togglePresetExpanded = (presetId: string) => {
    setExpandedPresets(prev => 
      prev.includes(presetId) 
        ? prev.filter(id => id !== presetId)
        : [...prev, presetId]
    )
  }

  // Get selected package info for display
  const getSelectedPackageInfo = () => {
    // Check presets
    for (const preset of packagePresets) {
      const size = preset.sizes.find(s => s.id === selectedPackageSize)
      if (size) {
        return { preset: preset.name, size: size.weight, dimensions: preset.description }
      }
    }
    // Check oversized
    const oversized = oversizedOptions.find(o => o.id === selectedPackageSize)
    if (oversized) {
      return { preset: oversized.weight, size: "", dimensions: oversized.description }
    }
    return { preset: "Parcel", size: "Up to 500 g", dimensions: "AA x BB x CC cm" }
  }

  const packageInfo = getSelectedPackageInfo()

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
            <span className="text-xs text-[#4B4D52] truncate">Complete your listing</span>
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
            <span className="text-sm text-[#4B4D52]">ebay.com/listing</span>
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
      <div className={`${previewMode ? 'w-[680px] py-4 px-5' : 'max-w-[976px] mx-auto py-12'}`}>
        {/* Divider - Hidden in preview mode */}
        {!previewMode && <div className="border-t border-[#E5E5E5] mb-12" />}

        {/* Section Header */}
        <h2 className={`text-base font-bold text-[#191919] uppercase tracking-wide ${previewMode ? 'mb-4' : 'mb-8'}`}>DELIVERY</h2>

        {/* Main Content - 734px width matching the spec (full width in preview) */}
        <div className={previewMode ? 'w-full' : 'max-w-[734px]'}>
          {/* ============================================================ */}
          {/* DELIVERY METHOD TOGGLE CARDS */}
          {/* ============================================================ */}
          <div className="flex gap-4 mb-14">
            {deliveryMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setDeliveryMethod(method.id)}
                className={`flex-1 p-4 rounded-lg text-left transition-all ${
                  deliveryMethod === method.id
                    ? "bg-[#F7F7F7] border-2 border-[#191919]"
                    : "bg-white border border-[#8F8F8F] hover:bg-[#FAFAFA]"
                }`}
              >
                <DeliveryMethodIcon type={method.icon} className="w-6 h-6 mb-4" />
                <h3 className="text-base font-bold text-[#191919] mb-1">{method.label}</h3>
                <p className={`text-sm leading-5 ${deliveryMethod === method.id ? "text-[#191919]" : "text-[#707070]"}`}>
                  {method.description}
                </p>
              </button>
            ))}
          </div>

          {/* ============================================================ */}
          {/* PACKAGE DETAILS */}
          {/* ============================================================ */}
          <div className="mb-14">
            <h3 className="text-base font-bold text-[#191919] mb-4">Package details</h3>
            <button 
              onClick={() => openModal("packageDetails")}
              className="w-full p-4 border border-[#8F8F8F] rounded-lg flex items-center justify-between hover:bg-[#FAFAFA] transition-colors text-left"
            >
              <div className="text-left">
                <div className="text-base font-medium text-[#191919]">{packageInfo.preset}</div>
                <div className="text-sm text-[#707070]">{packageInfo.size}{packageInfo.size ? ', ' : ''}{packageInfo.dimensions}</div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#191919] flex-shrink-0" />
            </button>
          </div>

          {/* ============================================================ */}
          {/* DOMESTIC SHIPPING */}
          {/* ============================================================ */}
          <div className="mb-14">
            <h3 className="text-base font-bold text-[#191919] mb-4">Domestic shipping</h3>
            
            {/* Default Service Label */}
            <div className="text-sm text-[#191919] mb-3">Default service</div>
            
            {/* Service Cards */}
            <div className="flex gap-4 mb-4">
              {domesticServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedDomesticService(service.id)}
                  className={`flex-1 p-4 rounded-lg text-left transition-all ${
                    selectedDomesticService === service.id
                      ? "bg-[#F7F7F7] border-2 border-[#191919]"
                      : "bg-white border border-[#8F8F8F] hover:bg-[#FAFAFA]"
                  }`}
                >
                  {/* Logo */}
                  <div className="w-10 h-10 mb-3 bg-[#F7F7F7] rounded p-1 flex items-center justify-center">
                    <CarrierLogo carrierId={service.id} className="w-8 h-8" />
                  </div>
                  <h4 className="text-sm font-bold text-[#191919] mb-1">{service.name}</h4>
                  <div className="text-xs text-[#707070] space-y-0.5">
                    <div>{service.deliveryDays} business days</div>
                    <div>{service.weight}</div>
                    <div>{service.tracking}</div>
                    <div>{service.price}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* View All Services Button */}
            <button 
              onClick={() => openModal("defaultDomesticService", selectedDomesticService)}
              className="w-full py-3 border border-[#8F8F8F] rounded-lg text-sm text-[#191919] font-medium hover:bg-[#FAFAFA] transition-colors mb-6"
            >
              View all services
            </button>

            {/* Buyer/Seller Pays Toggle */}
            <div className="bg-[#F7F7F7] rounded-lg p-6">
              <div className="flex justify-center mb-4">
                <div className="inline-flex bg-[#E5E5E5] rounded-full p-1">
                  <button
                    onClick={() => setPaymentType("buyer")}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      paymentType === "buyer"
                        ? "bg-[#191919] text-white"
                        : "text-[#707070] hover:text-[#191919]"
                    }`}
                  >
                    Buyer pays
                  </button>
                  <button
                    onClick={() => setPaymentType("seller")}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      paymentType === "seller"
                        ? "bg-[#191919] text-white"
                        : "text-[#707070] hover:text-[#191919]"
                    }`}
                  >
                    Seller pays
                  </button>
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-[#707070] mb-1">The buyer will pay:</div>
                <div className="text-xl font-bold text-[#191919] mb-1">{defaultShippingCost} €</div>
                <div className="text-sm text-[#707070] mb-2">Based on the cost that you set</div>
                <button 
                  onClick={() => openModal("defaultShippingCost")}
                  className="text-sm text-[#191919] underline hover:no-underline"
                >
                  Edit shipping cost
                </button>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* ADDITIONAL SERVICE */}
          {/* ============================================================ */}
          <div className="mb-14">
            <h3 className="text-base font-bold text-[#191919] mb-4">Additional service</h3>
            
            {/* Selected Additional Service Card */}
            <button 
              onClick={() => openModal("additionalDomesticService", additionalService)}
              className="w-full border border-[#8F8F8F] rounded-lg p-4 mb-4 text-left hover:bg-[#FAFAFA] transition-colors"
            >
              <div className="flex items-start gap-4">
                {/* Logo */}
                <div className="w-14 h-14 bg-[#F7F7F7] rounded-lg flex items-center justify-center flex-shrink-0 p-2">
                  <CarrierLogo carrierId={additionalService} className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#191919] mb-1">
                    {domesticServices.find(s => s.id === additionalService)?.name}
                  </h4>
                  <div className="text-sm text-[#707070] leading-5">
                    <div>X-X business days</div>
                    <div>Up to X lb.</div>
                    <div>Tracking included</div>
                    <div>X,XX €</div>
                  </div>
                </div>
              </div>
            </button>

            {/* View All Services Button */}
            <button 
              onClick={() => openModal("additionalDomesticService", additionalService)}
              className="w-full py-3 border border-[#8F8F8F] rounded-lg text-sm text-[#191919] font-medium hover:bg-[#FAFAFA] transition-colors mb-6"
            >
              View all services
            </button>

            {/* Cost Display */}
            <div className="bg-[#F7F7F7] rounded-lg p-6">
              <div className="text-center">
                <div className="text-sm text-[#707070] mb-1">The buyer will pay:</div>
                <div className="text-xl font-bold text-[#191919] mb-1">{additionalShippingCost} €</div>
                <div className="text-sm text-[#707070] mb-2">Based on the cost that you set</div>
                <button 
                  onClick={() => openModal("additionalShippingCost")}
                  className="text-sm text-[#191919] underline hover:no-underline"
                >
                  Edit shipping cost
                </button>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* INTERNATIONAL SHIPPING */}
          {/* ============================================================ */}
          <div className="mb-14">
            <h3 className="text-base font-bold text-[#191919] mb-1">International shipping</h3>
            <p className="text-sm text-[#707070] mb-4">
              <button className="underline hover:no-underline">Fees</button> apply for international sales.
            </p>

            {/* Destination Dropdown */}
            <div className="mb-4">
              <Dropdown
                label="Destination"
                value={internationalDestination}
                options={internationalDestinations}
                onChange={setInternationalDestination}
              />
            </div>

            {/* International Service Card */}
            <button 
              onClick={() => openModal("internationalService", internationalService)}
              className="w-full border border-[#8F8F8F] rounded-lg p-4 mb-4 text-left hover:bg-[#FAFAFA] transition-colors"
            >
              <div className="flex items-start gap-4">
                {/* Logo */}
                <div className="w-14 h-14 bg-[#F7F7F7] rounded-lg flex items-center justify-center flex-shrink-0 p-2">
                  <CarrierLogo carrierId={internationalService} className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#191919] mb-1">
                    {domesticServices.find(s => s.id === internationalService)?.name}
                  </h4>
                  <div className="text-sm text-[#707070] leading-5">
                    <div>X-X business days</div>
                    <div>Up to X lb.</div>
                    <div>Tracking included</div>
                    <div>X,XX €</div>
                  </div>
                </div>
              </div>
            </button>

            {/* View All Services Button */}
            <button 
              onClick={() => openModal("internationalService", internationalService)}
              className="w-full py-3 border border-[#8F8F8F] rounded-lg text-sm text-[#191919] font-medium hover:bg-[#FAFAFA] transition-colors mb-6"
            >
              View all services
            </button>

            {/* Cost Display */}
            <div className="bg-[#F7F7F7] rounded-lg p-6">
              <div className="text-center">
                <div className="text-sm text-[#707070] mb-1">The buyer will pay:</div>
                <div className="text-xl font-bold text-[#191919] mb-1">{internationalShippingCost} €</div>
                <div className="text-sm text-[#707070] mb-2">Cost is based on buyer&apos;s location.</div>
                <button 
                  onClick={() => openModal("internationalShippingCost")}
                  className="text-sm text-[#191919] underline hover:no-underline"
                >
                  Edit shipping cost
                </button>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* DELIVERY DETAILS */}
          {/* ============================================================ */}
          <div className="mb-14">
            <h3 className="text-base font-bold text-[#191919] mb-4">Delivery details</h3>
            
            <button 
              onClick={() => openModal("deliveryDetails")}
              className="w-full p-4 border border-[#8F8F8F] rounded-lg hover:bg-[#FAFAFA] transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  {/* Item Location */}
                  <div className="mb-3">
                    <div className="text-sm font-medium text-[#191919]">Item location</div>
                    <div className="text-sm text-[#707070]">Located at 68026 (visible on listing)</div>
                  </div>
                  {/* Handling Time */}
                  <div className="mb-3">
                    <div className="text-sm font-medium text-[#191919]">Handling time</div>
                    <div className="text-sm text-[#707070]">{handlingTimeOptions.find(h => h.id === handlingTime)?.label}</div>
                  </div>
                  {/* Domestic Returns */}
                  <div>
                    <div className="text-sm font-medium text-[#191919]">Domestic returns</div>
                    <div className="text-sm text-[#707070]">
                      {returnPeriodOptions.find(r => r.id === returnPeriod)?.label}, {returnShippingOptions.find(r => r.id === returnShippingPaidBy)?.label}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#191919] flex-shrink-0" />
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* MODALS */}
      {/* ============================================================ */}

      {/* Default Domestic Service Modal */}
      <Modal
        isOpen={activeModal === "defaultDomesticService"}
        onClose={closeModal}
        title="Default domestic service"
        subtitle="This service is selected by default and will be highlighted for buyers in search."
        footer={
          <button
            onClick={handleSaveService}
            className="px-8 py-3 bg-[#3665F3] text-white rounded-full text-sm font-medium hover:bg-[#2E5AD8] transition-colors"
          >
            Save
          </button>
        }
      >
        <div className="space-y-6 pt-4">
          <div>
            <h4 className="text-base font-bold text-[#191919] mb-4">Service type</h4>
            <div className="space-y-2">
              {domesticServices.map((service) => (
                <ServiceRow
                  key={service.id}
                  service={service}
                  isSelected={tempSelectedService === service.id}
                  onSelect={() => setTempSelectedService(service.id)}
                />
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-base font-bold text-[#191919] mb-4">Service type</h4>
            <div className="space-y-2">
              {domesticServices.slice(0, 1).map((service) => (
                <ServiceRow
                  key={`alt-${service.id}`}
                  service={service}
                  isSelected={false}
                  onSelect={() => {}}
                />
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {/* Additional Domestic Service Modal */}
      <Modal
        isOpen={activeModal === "additionalDomesticService"}
        onClose={closeModal}
        title="Additional domestic service"
        subtitle="Offer an optional choice for your buyers. They can select it at checkout."
        footer={
          <button
            onClick={handleSaveService}
            className="px-8 py-3 bg-[#3665F3] text-white rounded-full text-sm font-medium hover:bg-[#2E5AD8] transition-colors"
          >
            Save
          </button>
        }
      >
        <div className="pt-4">
          <div className="flex items-center gap-2 mb-6">
            <button className="text-sm text-[#E53238] hover:underline">Remove service</button>
            <span className="text-[#707070]">|</span>
            <button className="text-sm text-[#191919] underline hover:no-underline">Make default</button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-base font-bold text-[#191919] mb-4">Service type</h4>
              <div className="space-y-2">
                {domesticServices.map((service) => (
                  <ServiceRow
                    key={service.id}
                    service={service}
                    isSelected={tempSelectedService === service.id}
                    onSelect={() => setTempSelectedService(service.id)}
                  />
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-base font-bold text-[#191919] mb-4">Service type</h4>
              <div className="space-y-2">
                {domesticServices.slice(0, 1).map((service) => (
                  <ServiceRow
                    key={`alt-${service.id}`}
                    service={service}
                    isSelected={false}
                    onSelect={() => {}}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* International Service Modal */}
      <Modal
        isOpen={activeModal === "internationalService"}
        onClose={closeModal}
        title="International service"
        subtitle="This service is selected by default and will be highlighted for buyers in search."
        footer={
          <button
            onClick={handleSaveService}
            className="px-8 py-3 bg-[#3665F3] text-white rounded-full text-sm font-medium hover:bg-[#2E5AD8] transition-colors"
          >
            Save
          </button>
        }
      >
        <div className="space-y-6 pt-4">
          <div>
            <h4 className="text-base font-bold text-[#191919] mb-4">Service type</h4>
            <div className="space-y-2">
              {domesticServices.map((service) => (
                <ServiceRow
                  key={service.id}
                  service={service}
                  isSelected={tempSelectedService === service.id}
                  onSelect={() => setTempSelectedService(service.id)}
                />
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-base font-bold text-[#191919] mb-4">Service type</h4>
            <div className="space-y-2">
              {domesticServices.slice(0, 1).map((service) => (
                <ServiceRow
                  key={`alt-${service.id}`}
                  service={service}
                  isSelected={false}
                  onSelect={() => {}}
                />
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {/* Shipping Cost Modal - Default Domestic */}
      <Modal
        isOpen={activeModal === "defaultShippingCost"}
        onClose={closeModal}
        title="Shipping cost"
        subtitle="Default domestic service"
        footer={
          <button
            onClick={closeModal}
            className="px-8 py-3 bg-[#3665F3] text-white rounded-full text-sm font-medium hover:bg-[#2E5AD8] transition-colors"
          >
            Save
          </button>
        }
      >
        <div className="pt-4">
          <h4 className="text-base font-bold text-[#191919] mb-1">Enter the shipping cost</h4>
          <p className="text-sm text-[#707070] mb-4">Choose the amount you want the buyer to pay.</p>
          
          <div className="relative">
            <label className="text-xs text-[#707070] absolute left-3 top-2">Shipping cost</label>
            <input
              type="text"
              value={defaultShippingCost}
              onChange={(e) => setDefaultShippingCost(e.target.value)}
              className="w-full p-3 pt-6 border border-[#8F8F8F] rounded-lg text-sm text-[#191919] pr-8 focus:outline-none focus:border-[#3665F3] focus:ring-1 focus:ring-[#3665F3]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#707070]">€</span>
          </div>
        </div>
      </Modal>

      {/* Shipping Cost Modal - Additional Domestic */}
      <Modal
        isOpen={activeModal === "additionalShippingCost"}
        onClose={closeModal}
        title="Shipping cost"
        subtitle="Additional domestic service"
        footer={
          <button
            onClick={closeModal}
            className="px-8 py-3 bg-[#3665F3] text-white rounded-full text-sm font-medium hover:bg-[#2E5AD8] transition-colors"
          >
            Save
          </button>
        }
      >
        <div className="pt-4">
          <h4 className="text-base font-bold text-[#191919] mb-1">Enter the shipping cost</h4>
          <p className="text-sm text-[#707070] mb-4">Choose the amount you want the buyer to pay.</p>
          
          <div className="relative">
            <label className="text-xs text-[#707070] absolute left-3 top-2">Shipping cost</label>
            <input
              type="text"
              value={additionalShippingCost}
              onChange={(e) => setAdditionalShippingCost(e.target.value)}
              className="w-full p-3 pt-6 border border-[#8F8F8F] rounded-lg text-sm text-[#191919] pr-8 focus:outline-none focus:border-[#3665F3] focus:ring-1 focus:ring-[#3665F3]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#707070]">€</span>
          </div>
        </div>
      </Modal>

      {/* Shipping Cost Modal - International */}
      <Modal
        isOpen={activeModal === "internationalShippingCost"}
        onClose={closeModal}
        title="Shipping cost"
        subtitle="International service"
        footer={
          <button
            onClick={closeModal}
            className="px-8 py-3 bg-[#3665F3] text-white rounded-full text-sm font-medium hover:bg-[#2E5AD8] transition-colors"
          >
            Save
          </button>
        }
      >
        <div className="pt-4">
          <h4 className="text-base font-bold text-[#191919] mb-1">Enter the shipping cost</h4>
          <p className="text-sm text-[#707070] mb-4">Choose the amount you want the buyer to pay.</p>
          
          <div className="relative">
            <label className="text-xs text-[#707070] absolute left-3 top-2">Shipping cost</label>
            <input
              type="text"
              value={internationalShippingCost}
              onChange={(e) => setInternationalShippingCost(e.target.value)}
              className="w-full p-3 pt-6 border border-[#8F8F8F] rounded-lg text-sm text-[#191919] pr-8 focus:outline-none focus:border-[#3665F3] focus:ring-1 focus:ring-[#3665F3]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#707070]">€</span>
          </div>
        </div>
      </Modal>

      {/* Delivery Details Modal */}
      <Modal
        isOpen={activeModal === "deliveryDetails"}
        onClose={closeModal}
        title="Delivery details"
        footer={
          <button
            onClick={closeModal}
            className="px-8 py-3 bg-[#3665F3] text-white rounded-full text-sm font-medium hover:bg-[#2E5AD8] transition-colors"
          >
            Save
          </button>
        }
      >
        <div className="pt-4 space-y-6">
          {/* Item Location */}
          <div>
            <h4 className="text-base font-bold text-[#191919] mb-3">Item location</h4>
            <div className="bg-[#F7F7F7] rounded-lg p-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-[#191919]">Colmar, France, 68026</div>
                <div className="text-sm text-[#707070]">The item location appears on the listing.</div>
              </div>
              <button className="text-sm text-[#191919] underline hover:no-underline">Edit</button>
            </div>
          </div>

          <div className="border-t border-[#E5E5E5]" />

          {/* Handling Time */}
          <div>
            <h4 className="text-base font-bold text-[#191919] mb-3">Handling time</h4>
            <Dropdown
              value={handlingTime}
              options={handlingTimeOptions}
              onChange={setHandlingTime}
            />
          </div>

          <div className="border-t border-[#E5E5E5]" />

          {/* Returns */}
          <div>
            <h4 className="text-base font-bold text-[#191919] mb-1">Returns</h4>
            <p className="text-sm text-[#707070] mb-4">Sellers must accept returns if the item doesn&apos;t match the listing description.</p>
            
            {/* Domestic Toggle */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-[#191919]">Domestic</span>
              <button
                onClick={() => setDomesticReturnsEnabled(!domesticReturnsEnabled)}
                className={`w-12 h-7 rounded-full relative transition-colors ${
                  domesticReturnsEnabled ? 'bg-[#3665F3]' : 'bg-[#8F8F8F]'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform ${
                  domesticReturnsEnabled ? 'right-1' : 'left-1'
                }`} />
              </button>
            </div>

            {domesticReturnsEnabled && (
              <div className="space-y-4">
                <Dropdown
                  label="Allowed within"
                  value={returnPeriod}
                  options={returnPeriodOptions}
                  onChange={setReturnPeriod}
                />
                <Dropdown
                  label="Return shipping paid by"
                  value={returnShippingPaidBy}
                  options={returnShippingOptions}
                  onChange={setReturnShippingPaidBy}
                />
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* Package Details Modal */}
      <Modal
        isOpen={activeModal === "packageDetails"}
        onClose={closeModal}
        title="Package details"
        footer={
          <button
            onClick={handleSavePackage}
            className="px-8 py-3 bg-[#3665F3] text-white rounded-full text-sm font-medium hover:bg-[#2E5AD8] transition-colors"
          >
            Save
          </button>
        }
      >
        <div>
          {/* Letter and Parcel Presets */}
          <div className="space-y-0">
            {packagePresets.map((preset) => {
              const isExpanded = expandedPresets.includes(preset.id)
              return (
                <div key={preset.id} className="border-b border-[#E5E5E5] last:border-b-0">
                  {/* Preset Header */}
                  <button
                    onClick={() => togglePresetExpanded(preset.id)}
                    className="w-full flex items-center gap-3 py-4 hover:bg-[#FAFAFA] transition-colors"
                  >
                    {/* Icon */}
                    <div className="w-6 h-6 flex-shrink-0">
                      {preset.icon === "letter" ? (
                        <LetterIcon className="w-6 h-6" />
                      ) : (
                        <ParcelIcon className="w-6 h-6" />
                      )}
                    </div>
                    {/* Text */}
                    <div className="flex-1 text-left">
                      <div className="text-base font-bold text-[#191919]">{preset.name}</div>
                      <div className="text-sm text-[#707070]">{preset.description}</div>
                    </div>
                    {/* Chevron */}
                    <ChevronUpIcon className={`w-4 h-4 transition-transform ${isExpanded ? '' : 'rotate-180'}`} />
                  </button>

                  {/* Expanded Sizes */}
                  {isExpanded && (
                    <div className="pb-4 space-y-0">
                      {preset.sizes.map((size) => (
                        <button
                          key={size.id}
                          onClick={() => {
                            setTempPackageType(preset.id)
                            setTempPackageSize(size.id)
                          }}
                          className="w-full flex items-start gap-3 py-3 text-left hover:bg-[#FAFAFA] transition-colors pl-10"
                        >
                          {/* Radio */}
                          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                              tempPackageSize === size.id 
                                ? 'border-[#191919] bg-[#191919]' 
                                : 'border-[#8F8F8F]'
                            }`}>
                              {tempPackageSize === size.id && (
                                <div className="w-2 h-2 rounded-full bg-white" />
                              )}
                            </div>
                          </div>
                          {/* Content */}
                          <div className="flex-1">
                            <div className="text-sm font-medium text-[#191919]">{size.weight}</div>
                            <div className="text-sm text-[#707070]">{size.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Don't see your size section */}
          <div className="pt-6 border-t border-[#E5E5E5]">
            <h4 className="text-base font-bold text-[#191919] mb-1">Don&apos;t see your size?</h4>
            <p className="text-sm text-[#707070] mb-4">Select oversized for heavier or larger items.</p>
            
            <div className="space-y-0">
              {oversizedOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setTempPackageType("oversized")
                    setTempPackageSize(option.id)
                  }}
                  className="w-full flex items-start gap-3 py-3 text-left hover:bg-[#FAFAFA] transition-colors"
                >
                  {/* Radio */}
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      tempPackageSize === option.id 
                        ? 'border-[#191919] bg-[#191919]' 
                        : 'border-[#8F8F8F]'
                    }`}>
                      {tempPackageSize === option.id && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#191919]">{option.weight}</div>
                    <div className="text-sm text-[#707070]">{option.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

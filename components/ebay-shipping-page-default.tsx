"use client"

/**
 * US-Shelby-Default Prototype
 * eBay Shipping Configuration Flow - Default Services View
 * 
 * Key differences from US-Shelby-AG:
 * - Domestic shipping shows multiple carrier options (USPS, FedEx, UPS Ground)
 * - Carriers displayed as selectable cards with "RECOMMENDED" badge
 * - "View all services" and "Add additional service" buttons
 * - Buyer pays / Seller pays toggle
 * 
 * All L2 views and modals match US-Shelby-AG patterns
 */

import { useState } from "react"
import { ChevronDown, ChevronRight, X, Plus } from "lucide-react"

// ============================================================================
// DATA
// ============================================================================

const deliveryMethods = [
  { 
    id: "shipping", 
    label: "Shipping only",
    description: "Ship items directly to buyers.",
    icon: "shipping"
  },
  { 
    id: "both", 
    label: "Shipping or pickup",
    description: "Let buyers choose how they get their items.",
    icon: "shipping-pickup"
  },
  { 
    id: "pickup", 
    label: "Pickup only",
    description: "Arrange local pickup without any shipping costs.",
    icon: "pickup"
  },
]

const domesticServices = [
  {
    id: "usps",
    name: "USPS",
    logoType: "usps",
    deliveryDays: "X-X",
    protection: "$XXX.XX",
    dimensions: "Up to X lb., AA x BB x CC in.",
    priceRange: "$X.XX-$X.XX",
    recommended: true
  },
  {
    id: "fedex",
    name: "FedEx",
    logoType: "fedex",
    deliveryDays: "X-X",
    protection: "$XXX.XX",
    dimensions: "Up to X lb., AA x BB x CC in.",
    priceRange: "$X.XX-$X.XX",
    recommended: false
  },
  {
    id: "ups",
    name: "UPS Ground",
    logoType: "ups",
    deliveryDays: "X-X",
    protection: "$XXX.XX",
    dimensions: "Up to X lb., AA x BB x CC in.",
    priceRange: "$X.XX-$X.XX",
    recommended: false
  }
]

const destinations = [
  { 
    id: "worldwide", 
    label: "Worldwide",
    description: "Shipping costs are dependent on buyer location. Customs and import charges may apply."
  },
  { 
    id: "us", 
    label: "United States",
    description: "Domestic shipping only within the US."
  },
]

const handlingTimeOptions = [
  "Same business day",
  "1 business day",
  "2 business days",
  "3 business days",
  "4 business days",
  "5 business days",
]

// ============================================================================
// ICONS
// ============================================================================

function ShippingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="4" width="14" height="11" rx="1" stroke="#191919" strokeWidth="1.5" fill="none"/>
      <path d="M1 7h14" stroke="#191919" strokeWidth="1.5"/>
      <path d="M8 4V1M5 1h6" stroke="#191919" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function ShippingPickupIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="4" width="9" height="8" rx="1" stroke="#191919" strokeWidth="1.5" fill="none"/>
      <path d="M4 4V2.5C4 1.67 4.67 1 5.5 1H10.5C11.33 1 12 1.67 12 2.5V4" stroke="#191919" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="11" r="3" stroke="#191919" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="10.5" r="1" fill="#191919"/>
    </svg>
  )
}

function PickupIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1C5.24 1 3 3.24 3 6C3 9.75 8 15 8 15C8 15 13 9.75 13 6C13 3.24 10.76 1 8 1Z" stroke="#191919" strokeWidth="1.5" fill="none"/>
      <circle cx="8" cy="6" r="2" stroke="#191919" strokeWidth="1.5" fill="none"/>
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

function BackArrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// USPS Logo - Official Trademark Style
function USPSLogo({ className }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src="https://www.usps.com/global-elements/header/images/utility-header/logo-sb.svg"
        alt="USPS"
        className="w-[40px] h-[40px] object-contain"
        onError={(e) => {
          // Fallback to text-based logo if image fails
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          target.parentElement!.innerHTML = '<span style="font-size: 12px; font-weight: 800; color: #333366; letter-spacing: 0.5px;">USPS</span>';
        }}
      />
    </div>
  )
}

// FedEx Logo - Official Style
function FedExLogo({ className }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/FedEx_Corporation_-_2016_Logo.svg/1280px-FedEx_Corporation_-_2016_Logo.svg.png"
        alt="FedEx"
        className="w-[44px] h-auto object-contain"
      />
    </div>
  )
}

// UPS Logo - Official Style  
function UPSLogo({ className }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/UPS_Logo_Shield_2017.svg/220px-UPS_Logo_Shield_2017.svg.png"
        alt="UPS"
        className="w-[36px] h-auto object-contain"
      />
    </div>
  )
}

function ServiceLogo({ type, className }: { type: string; className?: string }) {
  switch (type) {
    case "usps":
      return <USPSLogo className={className} />
    case "fedex":
      return <FedExLogo className={className} />
    case "ups":
      return <UPSLogo className={className} />
    default:
      return null
  }
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function EbayShippingPageDefault() {
  // L1 State
  const [deliveryMethod, setDeliveryMethod] = useState("shipping")
  const [showDeliverySheet, setShowDeliverySheet] = useState(false)
  const [selectedDomesticService, setSelectedDomesticService] = useState("usps")
  const [paymentType, setPaymentType] = useState<"buyer" | "seller">("buyer")
  const [destination, setDestination] = useState("worldwide")
  const [showDestinationSheet, setShowDestinationSheet] = useState(false)
  
  // Package details state
  const [showPackageSheet, setShowPackageSheet] = useState(false)
  const [packageSizeType, setPackageSizeType] = useState<"custom" | "unknown">("custom")
  const [weightLb, setWeightLb] = useState("X")
  const [weightOz, setWeightOz] = useState("XX")
  const [dimensionA, setDimensionA] = useState("A")
  const [dimensionB, setDimensionB] = useState("B")
  const [dimensionC, setDimensionC] = useState("C")
  const [irregularPackage, setIrregularPackage] = useState(false)
  
  // Delivery details state
  const [showDeliveryDetailsSheet, setShowDeliveryDetailsSheet] = useState(false)
  const [handlingTime, setHandlingTime] = useState("2 business days")
  const [domesticReturns, setDomesticReturns] = useState(true)
  const [domesticAllowedWithin, setDomesticAllowedWithin] = useState("14 days")
  const [domesticReturnsPaidBy, setDomesticReturnsPaidBy] = useState("Buyer")
  const [domesticRefundMethod, setDomesticRefundMethod] = useState("Money back")
  const [internationalReturns, setInternationalReturns] = useState(true)
  const [internationalAllowedWithin, setInternationalAllowedWithin] = useState("14 days")
  const [internationalReturnsPaidBy, setInternationalReturnsPaidBy] = useState("Buyer")
  const [internationalRefundMethod, setInternationalRefundMethod] = useState("Money back")
  
  // Item location fields
  const [itemCountry, setItemCountry] = useState("United States")
  const [itemCity, setItemCity] = useState("San Jose")
  const [itemZipCode, setItemZipCode] = useState("95117")
  
  // Bottom sheet dropdowns for Delivery Details
  const [showItemLocationEdit, setShowItemLocationEdit] = useState(false)
  const [showHandlingTimeSheet, setShowHandlingTimeSheet] = useState(false)
  const [showDomesticAllowedWithinSheet, setShowDomesticAllowedWithinSheet] = useState(false)
  const [showDomesticReturnsPaidBySheet, setShowDomesticReturnsPaidBySheet] = useState(false)
  const [showDomesticRefundMethodSheet, setShowDomesticRefundMethodSheet] = useState(false)
  const [showInternationalAllowedWithinSheet, setShowInternationalAllowedWithinSheet] = useState(false)
  const [showInternationalReturnsPaidBySheet, setShowInternationalReturnsPaidBySheet] = useState(false)
  const [showInternationalRefundMethodSheet, setShowInternationalRefundMethodSheet] = useState(false)
  const [showCountrySheet, setShowCountrySheet] = useState(false)
  
  // NEW L2 Pages state
  const [showDomesticServicesSheet, setShowDomesticServicesSheet] = useState(false)
  const [showAdditionalDomesticSheet, setShowAdditionalDomesticSheet] = useState(false)
  const [showInternationalServicesSheet, setShowInternationalServicesSheet] = useState(false)
  const [showEditShippingCostSheet, setShowEditShippingCostSheet] = useState(false)
  const [selectedAdditionalDomestic, setSelectedAdditionalDomestic] = useState<string | null>(null)
  const [selectedInternational, setSelectedInternational] = useState<string | null>(null)
  const [shippingCost, setShippingCost] = useState("X.XX")
  const [showNumericKeyboard, setShowNumericKeyboard] = useState(false)
  const [shippingCostType, setShippingCostType] = useState<"calculated" | "flat" | "free">("calculated")
  
  const formatPackageDetails = () => {
    if (packageSizeType === "unknown") {
      return "Set your own shipping rate"
    }
    return `${weightLb} lb. ${weightOz} oz., ${dimensionA} x ${dimensionB} x ${dimensionC} in.`
  }

  // Get selected service for display
  const getSelectedAdditionalService = () => {
    return domesticServices.find(s => s.id === selectedAdditionalDomestic)
  }
  
  const getSelectedInternationalService = () => {
    return domesticServices.find(s => s.id === selectedInternational)
  }

  // Handle numeric keyboard input
  const handleKeyPress = (key: string) => {
    if (key === "backspace") {
      setShippingCost(prev => prev.slice(0, -1) || "0")
    } else if (key === ".") {
      if (!shippingCost.includes(".")) {
        setShippingCost(prev => prev + ".")
      }
    } else {
      setShippingCost(prev => prev === "0" ? key : prev + key)
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#1a1a1a] p-4">
      {/* iPhone 17 Frame */}
      <div className={`relative w-[402px] h-[874px] bg-black rounded-[55px] p-3 shadow-2xl ${showPackageSheet || showDeliveryDetailsSheet || showDomesticServicesSheet || showAdditionalDomesticSheet || showInternationalServicesSheet || showEditShippingCostSheet ? 'invisible' : ''}`}>
        {/* Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />
        
        {/* Screen */}
        <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden flex flex-col">
          {/* iOS Status Bar */}
          <div className="h-[47px] px-6 flex items-end justify-between pb-1 bg-white flex-shrink-0">
            <span className="text-[15px] font-semibold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>9:41</span>
            <div className="flex items-center gap-[5px]">
              <svg className="w-[17px] h-[11px]" viewBox="0 0 17 11">
                <rect x="0" y="7" width="3" height="4" rx="1" fill="#191919"/>
                <rect x="4.5" y="5" width="3" height="6" rx="1" fill="#191919"/>
                <rect x="9" y="2.5" width="3" height="8.5" rx="1" fill="#191919"/>
                <rect x="13.5" y="0" width="3" height="11" rx="1" fill="#191919"/>
              </svg>
              <svg className="w-[15px] h-[11px]" viewBox="0 0 15 11">
                <path d="M7.5 10.5C8.33 10.5 9 9.83 9 9C9 8.17 8.33 7.5 7.5 7.5C6.67 7.5 6 8.17 6 9C6 9.83 6.67 10.5 7.5 10.5Z" fill="#191919"/>
                <path d="M4.5 7C5.5 6 6.5 5.5 7.5 5.5C8.5 5.5 9.5 6 10.5 7" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
                <path d="M2.5 4.5C4 3 5.5 2.5 7.5 2.5C9.5 2.5 11 3 12.5 4.5" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
                <path d="M0.5 2C2.5 0.5 5 0 7.5 0C10 0 12.5 0.5 14.5 2" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
              </svg>
              <svg className="w-[25px] h-[12px]" viewBox="0 0 25 12">
                <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="#191919" strokeOpacity="0.35"/>
                <rect x="2" y="2" width="18" height="8" rx="1.5" fill="#191919"/>
                <path d="M23 4V8C23.8 8 24 7 24 6C24 5 23.8 4 23 4Z" fill="#191919" fillOpacity="0.4"/>
              </svg>
            </div>
          </div>

          {/* Navigation Header */}
          <div className="h-[44px] px-4 flex items-center justify-between bg-white flex-shrink-0">
            <button className="w-10 h-10 flex items-center justify-center">
              <BackArrow className="w-6 h-6 text-[#191919]" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center">
              <X className="w-6 h-6 text-[#191919]" strokeWidth={2} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto bg-white px-4">
            {/* Page Title */}
            <h1 className="text-[22px] font-bold text-[#191919] leading-tight mt-2 mb-6" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>
              Select delivery options
            </h1>

            {/* Delivery Method Section */}
            <div className="pb-5">
              <h2 className="text-[14px] font-bold text-[#191919] mb-3" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Delivery method</h2>
              <button 
                onClick={() => setShowDeliverySheet(true)}
                className="w-full h-[48px] px-4 bg-white border border-[#767676] rounded-[8px] flex items-center justify-between"
              >
                <span className="text-[14px] text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>
                  {deliveryMethods.find(m => m.id === deliveryMethod)?.label}
                </span>
                <ChevronDown className="w-5 h-5 text-[#191919]" />
              </button>
            </div>

            <div className="h-[1px] bg-[#E5E5E5] -mx-4" style={{ width: 'calc(100% + 32px)' }} />

            {/* Package Details Section */}
            <div className="py-5">
              <h2 className="text-[14px] font-bold text-[#191919] mb-3" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Package details</h2>
              <button 
                onClick={() => setShowPackageSheet(true)}
                className="w-full px-4 py-3 bg-white border border-[#767676] rounded-[8px] flex items-center justify-between"
              >
                <div className="flex flex-col items-start">
                  <span className="text-[14px] text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{formatPackageDetails()}</span>
                  <span className="text-[12px] text-[#707070] mt-0.5" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>
                    Estimated based on items like yours
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#191919]" />
              </button>
            </div>

            <div className="h-[1px] bg-[#E5E5E5] -mx-4" style={{ width: 'calc(100% + 32px)' }} />

            {/* Domestic Shipping Section */}
            <div className="py-5">
              <h2 className="text-[14px] font-bold text-[#191919] mb-1" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Domestic shipping</h2>
              <span className="text-[13px] font-bold text-[#191919] block mb-3" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Default service</span>
              
              {/* Service Cards */}
              <div className="flex flex-col gap-3 mb-4">
                {domesticServices.map((service) => {
                  const isSelected = selectedDomesticService === service.id
                  return (
                    <button
                      key={service.id}
                      onClick={() => setSelectedDomesticService(service.id)}
                      className={`w-full p-3 rounded-[8px] text-left transition-colors ${
                        isSelected 
                          ? "bg-white border-2 border-[#191919]" 
                          : "bg-white border border-[#E5E5E5]"
                      }`}
                    >
                      <div className="flex gap-3 items-start">
                        {/* Logo */}
                        <div className="w-[52px] h-[52px] bg-[#F7F7F7] rounded-[8px] flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {service.logoType === "usps" && <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-opJzsRtNKhuBXRYW7Ng8AUZWWgiMti.png" alt="USPS" className="w-full h-full object-contain p-1" />}
                          {service.logoType === "fedex" && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/FedEx_Corporation_-_2016_Logo.svg/1280px-FedEx_Corporation_-_2016_Logo.svg.png" alt="FedEx" className="w-[40px] h-auto object-contain" />}
                          {service.logoType === "ups" && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/UPS_Logo_Shield_2017.svg/220px-UPS_Logo_Shield_2017.svg.png" alt="UPS" className="w-[32px] h-auto object-contain" />}
                        </div>
                        {/* Content */}
                        <div className="flex flex-col flex-1 min-w-0">
                          {/* Recommended Badge */}
                          {service.recommended && (
                            <span className="inline-flex items-center px-2 py-[3px] rounded-[4px] bg-[#E7F1FF] w-fit mb-1.5">
                              <span className="text-[11px] text-[#3665F3] font-semibold uppercase tracking-[0.5px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Recommended</span>
                            </span>
                          )}
                          <span className="text-[14px] font-bold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>
                            {service.name}
                          </span>
                          <div className="text-[13px] text-[#707070] leading-[18px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>
                            <div>{service.deliveryDays} business days</div>
                            <div>Up to {service.protection} protection</div>
                            <div>{service.dimensions}</div>
                            <div>{service.priceRange}</div>
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* View All Services Button */}
              <button 
                onClick={() => setShowDomesticServicesSheet(true)}
                className="w-full h-[48px] border border-[#767676] rounded-full flex items-center justify-center mb-5"
              >
                <span className="text-[14px] text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>View all services</span>
              </button>

              {/* Buyer/Seller Pays Toggle - Grey background container */}
              <div className="bg-[#F7F7F7] rounded-[12px] p-4 mb-4">
                {/* Toggle Buttons */}
                <div className="flex bg-[#E5E5E5] rounded-full p-[3px] mb-4">
                  <button
                    onClick={() => setPaymentType("buyer")}
                    className={`flex-1 h-[36px] rounded-full text-[14px] font-medium transition-colors ${
                      paymentType === "buyer"
                        ? "bg-[#191919] text-white"
                        : "bg-transparent text-[#191919]"
                    }`}
                    style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}
                  >
                    Buyer pays
                  </button>
                  <button
                    onClick={() => setPaymentType("seller")}
                    className={`flex-1 h-[36px] rounded-full text-[14px] font-medium transition-colors ${
                      paymentType === "seller"
                        ? "bg-[#191919] text-white"
                        : "bg-transparent text-[#191919]"
                    }`}
                    style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}
                  >
                    Seller pays
                  </button>
                </div>

                {/* Cost Display */}
                <div className="text-center">
                  <span className="text-[13px] text-[#707070] block" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>The buyer will pay:</span>
                  <span className="text-[18px] font-bold text-[#191919] block mt-1" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>$X.XX-$XX.XX</span>
                  <span className="text-[13px] text-[#707070] block mt-1" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Cost is based on buyer&apos;s location.</span>
                  <button 
                    onClick={() => setShowEditShippingCostSheet(true)}
                    className="text-[13px] text-[#191919] underline mt-1" 
                    style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}
                  >
                    Edit shipping cost
                  </button>
                </div>
              </div>

              {/* Additional Service */}
              <div>
                <span className="text-[13px] font-bold text-[#191919] block mb-2" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Additional service</span>
                
                {/* Show selected additional service card if one is selected */}
                {selectedAdditionalDomestic && getSelectedAdditionalService() && (
                  <button
                    onClick={() => setShowAdditionalDomesticSheet(true)}
                    className="w-full p-3 rounded-[8px] text-left bg-white border-2 border-[#191919] mb-3"
                  >
                    <div className="flex gap-3 items-start">
                      <div className="w-[52px] h-[52px] bg-[#F7F7F7] rounded-[8px] flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {getSelectedAdditionalService()?.logoType === "usps" && <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-opJzsRtNKhuBXRYW7Ng8AUZWWgiMti.png" alt="USPS" className="w-full h-full object-contain p-1" />}
                        {getSelectedAdditionalService()?.logoType === "fedex" && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/FedEx_Corporation_-_2016_Logo.svg/1280px-FedEx_Corporation_-_2016_Logo.svg.png" alt="FedEx" className="w-[40px] h-auto object-contain" />}
                        {getSelectedAdditionalService()?.logoType === "ups" && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/UPS_Logo_Shield_2017.svg/220px-UPS_Logo_Shield_2017.svg.png" alt="UPS" className="w-[32px] h-auto object-contain" />}
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-[14px] font-bold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>
                          {getSelectedAdditionalService()?.name}
                        </span>
                        <div className="text-[13px] text-[#707070] leading-[18px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>
                          <div>{getSelectedAdditionalService()?.deliveryDays} business days</div>
                          <div>Up to {getSelectedAdditionalService()?.protection} protection</div>
                          <div>{getSelectedAdditionalService()?.dimensions}</div>
                          <div>{getSelectedAdditionalService()?.priceRange}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#191919] mt-4" />
                    </div>
                  </button>
                )}
                
                {/* Show add button if no service selected */}
                {!selectedAdditionalDomestic && (
                  <button 
                    onClick={() => setShowAdditionalDomesticSheet(true)}
                    className="w-full h-[48px] border border-[#767676] rounded-full flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4 text-[#191919]" />
                    <span className="text-[14px] text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Add additional service</span>
                  </button>
                )}
              </div>
            </div>

            <div className="h-[1px] bg-[#E5E5E5] -mx-4" style={{ width: 'calc(100% + 32px)' }} />

            {/* International Shipping Section */}
            <div className="py-5">
              <h2 className="text-[14px] font-bold text-[#191919] mb-0.5" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>International shipping</h2>
              <span className="text-[13px] text-[#707070]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>
                <button className="underline text-[#191919]">Fees</button> apply for international sales.
              </span>

              {/* Destination Dropdown */}
              <div className="mt-3 mb-3">
                <button 
                  onClick={() => setShowDestinationSheet(true)}
                  className="w-full px-4 py-2.5 bg-white border border-[#767676] rounded-[8px] flex items-center justify-between"
                >
                  <div className="flex flex-col items-start">
                    <span className="text-[12px] text-[#707070]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Destination</span>
                    <span className="text-[14px] text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{destinations.find(d => d.id === destination)?.label}</span>
                  </div>
                  <ChevronDown className="w-5 h-5 text-[#191919]" />
                </button>
              </div>

              {/* Show selected international service card if one is selected */}
              {selectedInternational && getSelectedInternationalService() && (
                <button
                  onClick={() => setShowInternationalServicesSheet(true)}
                  className="w-full p-3 rounded-[8px] text-left bg-white border-2 border-[#191919] mb-3"
                >
                  <div className="flex gap-3 items-start">
                    <div className="w-[52px] h-[52px] bg-[#F7F7F7] rounded-[8px] flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {getSelectedInternationalService()?.logoType === "usps" && <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-opJzsRtNKhuBXRYW7Ng8AUZWWgiMti.png" alt="USPS" className="w-full h-full object-contain p-1" />}
                      {getSelectedInternationalService()?.logoType === "fedex" && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/FedEx_Corporation_-_2016_Logo.svg/1280px-FedEx_Corporation_-_2016_Logo.svg.png" alt="FedEx" className="w-[40px] h-auto object-contain" />}
                      {getSelectedInternationalService()?.logoType === "ups" && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/UPS_Logo_Shield_2017.svg/220px-UPS_Logo_Shield_2017.svg.png" alt="UPS" className="w-[32px] h-auto object-contain" />}
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-[14px] font-bold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>
                        {getSelectedInternationalService()?.name}
                      </span>
                      <div className="text-[13px] text-[#707070] leading-[18px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>
                        <div>{getSelectedInternationalService()?.deliveryDays} business days</div>
                        <div>Up to {getSelectedInternationalService()?.protection} protection</div>
                        <div>{getSelectedInternationalService()?.dimensions}</div>
                        <div>{getSelectedInternationalService()?.priceRange}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#191919] mt-4" />
                  </div>
                </button>
              )}

              {/* Add International Service Button */}
              <button 
                onClick={() => setShowInternationalServicesSheet(true)}
                className="w-full h-[48px] border border-[#767676] rounded-full flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4 text-[#191919]" />
                <span className="text-[14px] text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{selectedInternational ? "Add another international service" : "Add international service"}</span>
              </button>
            </div>

            <div className="h-[1px] bg-[#E5E5E5] -mx-4" style={{ width: 'calc(100% + 32px)' }} />

            {/* Delivery Details Section */}
            <div className="py-5 pb-28">
              <h2 className="text-[14px] font-bold text-[#191919] mb-3" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Delivery details</h2>
              
              <button 
                onClick={() => setShowDeliveryDetailsSheet(true)}
                className="w-full p-4 bg-white border border-[#767676] rounded-[16px] flex"
              >
                <div className="flex flex-col gap-4 text-left flex-1">
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Item location</span>
                    <span className="text-[13px] text-[#707070]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{`${itemCity}, ${itemCountry}, ${itemZipCode}`}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Handling time</span>
                    <span className="text-[13px] text-[#707070]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{handlingTime}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Domestic returns</span>
                    <span className="text-[13px] text-[#707070]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{domesticReturns ? `${domesticAllowedWithin}, ${domesticReturnsPaidBy}, ${domesticRefundMethod}` : "Not accepted"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>International returns</span>
                    <span className="text-[13px] text-[#707070]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{internationalReturns ? `${internationalAllowedWithin}, ${internationalReturnsPaidBy}, ${internationalRefundMethod}` : "Not accepted"}</span>
                  </div>
                </div>
                <div className="flex items-center pl-3">
                  <ChevronRight className="w-5 h-5 text-[#191919]" />
                </div>
              </button>
            </div>
          </div>

          {/* Fixed Bottom Button */}
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-9 pt-3 bg-white">
            <button className="w-full h-[50px] bg-[#3665F3] rounded-full flex items-center justify-center active:bg-[#2d54d4]">
              <span className="text-[16px] font-bold text-white" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Continue</span>
            </button>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#191919] rounded-full" />
        </div>
      </div>

      {/* ======================================================================== */}
      {/* MODALS / BOTTOM SHEETS */}
      {/* ======================================================================== */}

      {/* Delivery Method Bottom Sheet */}
      {showDeliverySheet && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
          <div className="relative w-[402px] h-[874px] bg-black rounded-[55px] p-3 shadow-2xl" style={{ pointerEvents: 'auto' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />
            <div className="relative w-full h-full rounded-[40px] overflow-hidden">
              <div className="absolute inset-0 bg-white/60 backdrop-blur-md" onClick={() => setShowDeliverySheet(false)} />
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] shadow-[0_-5px_30px_rgba(0,0,0,0.12)]" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-center pt-[6px] pb-[6px]">
                  <div className="w-8 h-1 bg-[#8F8F8F] rounded-full" />
                </div>
                <div className="flex items-center justify-between px-4 pt-2 pb-3">
                  <h3 className="text-[18px] font-bold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Delivery method</h3>
                  <button onClick={() => setShowDeliverySheet(false)} className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center">
                    <X className="w-5 h-5 text-[#191919]" strokeWidth={2} />
                  </button>
                </div>
                <div className="px-4 pt-1 pb-8 flex flex-col gap-3">
                  {deliveryMethods.map((method) => {
                    const isSelected = deliveryMethod === method.id
                    return (
                      <button
                        key={method.id}
                        onClick={() => { setDeliveryMethod(method.id); setShowDeliverySheet(false) }}
                        className={`w-full px-3 py-3 rounded-[8px] text-left flex gap-3 ${isSelected ? "bg-[#F7F7F7] border-2 border-[#191919]" : "bg-white border border-[#8F8F8F]"}`}
                      >
                        <div className="pt-0.5"><DeliveryMethodIcon type={method.icon} className="w-[18px] h-[18px]" /></div>
                        <div className="flex flex-col flex-1">
                          <span className="text-[14px] font-bold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{method.label}</span>
                          <span className={`text-[13px] mt-0.5 ${isSelected ? 'text-[#191919]' : 'text-[#707070]'}`} style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{method.description}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Destination Bottom Sheet */}
      {showDestinationSheet && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
          <div className="relative w-[402px] h-[874px] bg-black rounded-[55px] p-3 shadow-2xl" style={{ pointerEvents: 'auto' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />
            <div className="relative w-full h-full rounded-[40px] overflow-hidden">
              <div className="absolute inset-0 bg-white/60 backdrop-blur-md" onClick={() => setShowDestinationSheet(false)} />
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] shadow-[0_-5px_30px_rgba(0,0,0,0.12)]" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-center pt-[6px] pb-[6px]">
                  <div className="w-8 h-1 bg-[#8F8F8F] rounded-full" />
                </div>
                <div className="flex items-center justify-between px-4 pt-2 pb-3">
                  <h3 className="text-[18px] font-bold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Destination</h3>
                  <button onClick={() => setShowDestinationSheet(false)} className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center">
                    <X className="w-5 h-5 text-[#191919]" strokeWidth={2} />
                  </button>
                </div>
                <div className="px-4 pt-1 pb-8 flex flex-col gap-3">
                  {destinations.map((dest) => {
                    const isSelected = destination === dest.id
                    return (
                      <button
                        key={dest.id}
                        onClick={() => { setDestination(dest.id); setShowDestinationSheet(false) }}
                        className={`w-full px-3 py-3 rounded-[8px] text-left ${isSelected ? "bg-[#F7F7F7] border-2 border-[#191919]" : "bg-white border border-[#8F8F8F]"}`}
                      >
                        <span className="text-[14px] font-bold text-[#191919] block" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{dest.label}</span>
                        <span className={`text-[13px] mt-0.5 ${isSelected ? 'text-[#191919]' : 'text-[#707070]'}`} style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{dest.description}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Package Details Full Screen Sheet */}
      {showPackageSheet && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
          <div className="relative w-[402px] h-[874px] bg-black rounded-[55px] p-3 shadow-2xl" style={{ pointerEvents: 'auto' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />
            <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden flex flex-col">
              {/* Status Bar */}
              <div className="h-[47px] px-6 flex items-end justify-between pb-1 bg-white flex-shrink-0">
                <span className="text-[15px] font-semibold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>9:41</span>
                <div className="flex items-center gap-[5px]">
                  <svg className="w-[17px] h-[11px]" viewBox="0 0 17 11"><rect x="0" y="7" width="3" height="4" rx="1" fill="#191919"/><rect x="4.5" y="5" width="3" height="6" rx="1" fill="#191919"/><rect x="9" y="2.5" width="3" height="8.5" rx="1" fill="#191919"/><rect x="13.5" y="0" width="3" height="11" rx="1" fill="#191919"/></svg>
                  <svg className="w-[15px] h-[11px]" viewBox="0 0 15 11"><path d="M7.5 10.5C8.33 10.5 9 9.83 9 9C9 8.17 8.33 7.5 7.5 7.5C6.67 7.5 6 8.17 6 9C6 9.83 6.67 10.5 7.5 10.5Z" fill="#191919"/><path d="M4.5 7C5.5 6 6.5 5.5 7.5 5.5C8.5 5.5 9.5 6 10.5 7" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/><path d="M2.5 4.5C4 3 5.5 2.5 7.5 2.5C9.5 2.5 11 3 12.5 4.5" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/><path d="M0.5 2C2.5 0.5 5 0 7.5 0C10 0 12.5 0.5 14.5 2" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/></svg>
                  <svg className="w-[25px] h-[12px]" viewBox="0 0 25 12"><rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="#191919" strokeOpacity="0.35"/><rect x="2" y="2" width="18" height="8" rx="1.5" fill="#191919"/><path d="M23 4V8C23.8 8 24 7 24 6C24 5 23.8 4 23 4Z" fill="#191919" fillOpacity="0.4"/></svg>
                </div>
              </div>

              {/* Navigation Header - Back button only */}
              <div className="h-[44px] px-4 flex items-center bg-white flex-shrink-0">
                <button 
                  onClick={() => setShowPackageSheet(false)} 
                  className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center"
                >
                  <BackArrow className="w-6 h-6 text-[#191919]" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-4 pb-24">
                {/* Title */}
                <h1 className="text-[22px] font-bold text-[#191919] leading-[28px] mt-2 mb-6" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>
                  Package details
                </h1>
                
                {/* Custom Size Option */}
                <button onClick={() => setPackageSizeType("custom")} className="flex gap-3 items-start w-full text-left">
                  <div className="w-[20px] h-[20px] flex-shrink-0 mt-0.5">
                    {packageSizeType === "custom" ? (
                      <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#191919" strokeWidth="2"/><circle cx="10" cy="10" r="5" fill="#191919"/></svg>
                    ) : (
                      <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#767676" strokeWidth="2"/></svg>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Custom size</span>
                    <span className="text-[13px] text-[#707070]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Enter the weight and dimensions</span>
                  </div>
                </button>

                {/* Custom Size Form */}
                {packageSizeType === "custom" && (
                  <div className="flex flex-col gap-4 mt-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Weight</label>
                      <div className="flex gap-2">
                        <div className="w-[calc(50%-4px)] h-[44px] bg-[#F7F7F7] border border-[#767676] rounded-[8px] flex items-center px-3">
                          <input type="text" value={weightLb} onChange={(e) => setWeightLb(e.target.value)} className="flex-1 bg-transparent text-[14px] text-[#191919] outline-none min-w-0" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }} />
                          <span className="text-[13px] text-[#707070] ml-1" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>lb.</span>
                        </div>
                        <div className="w-[calc(50%-4px)] h-[44px] bg-[#F7F7F7] border border-[#767676] rounded-[8px] flex items-center px-3">
                          <input type="text" value={weightOz} onChange={(e) => setWeightOz(e.target.value)} className="flex-1 bg-transparent text-[14px] text-[#191919] outline-none min-w-0" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }} />
                          <span className="text-[13px] text-[#707070] ml-1" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>oz.</span>
                        </div>
                      </div>
                    </div>
                    {/* Length */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] text-[#191919] leading-[18px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Length</label>
                      <div className="h-[44px] bg-[#F7F7F7] border border-[#767676] rounded-[8px] flex items-center px-3">
                        <input 
                          type="text" 
                          value={dimensionA}
                          onChange={(e) => setDimensionA(e.target.value)}
                          className="flex-1 bg-transparent text-[14px] text-[#191919] outline-none"
                          style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}
                        />
                        <span className="text-[13px] text-[#707070]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>in.</span>
                      </div>
                    </div>

                    {/* Width */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] text-[#191919] leading-[18px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Width</label>
                      <div className="h-[44px] bg-[#F7F7F7] border border-[#767676] rounded-[8px] flex items-center px-3">
                        <input 
                          type="text" 
                          value={dimensionB}
                          onChange={(e) => setDimensionB(e.target.value)}
                          className="flex-1 bg-transparent text-[14px] text-[#191919] outline-none"
                          style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}
                        />
                        <span className="text-[13px] text-[#707070]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>in.</span>
                      </div>
                    </div>

                    {/* Height */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] text-[#191919] leading-[18px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Height</label>
                      <div className="h-[44px] bg-[#F7F7F7] border border-[#767676] rounded-[8px] flex items-center px-3">
                        <input 
                          type="text" 
                          value={dimensionC}
                          onChange={(e) => setDimensionC(e.target.value)}
                          className="flex-1 bg-transparent text-[14px] text-[#191919] outline-none"
                          style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}
                        />
                        <span className="text-[13px] text-[#707070]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>in.</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* I don't know size Option */}
                <button onClick={() => setPackageSizeType("unknown")} className="flex gap-3 items-start w-full text-left mt-5">
                  <div className="w-[20px] h-[20px] flex-shrink-0 mt-0.5">
                    {packageSizeType === "unknown" ? (
                      <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#191919" strokeWidth="2"/><circle cx="10" cy="10" r="5" fill="#191919"/></svg>
                    ) : (
                      <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#767676" strokeWidth="2"/></svg>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>I don&apos;t know size</span>
                    <span className="text-[13px] text-[#707070]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Set your own shipping rate</span>
                  </div>
                </button>

                <div className="h-[1px] bg-[#E5E5E5] -mx-4 mt-5 mb-4" style={{ width: 'calc(100% + 32px)' }} />

                {/* Irregular Package Toggle */}
                <div className="flex items-start justify-between pb-4">
                  <div className="flex flex-col flex-1 pr-4">
                    <span className="text-[14px] font-bold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Irregular package</span>
                    <span className="text-[13px] text-[#707070] mt-0.5" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Carriers may charge extra for items not shipped in standard packages.</span>
                    <button className="text-[13px] text-[#191919] underline text-left mt-1" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Learn more</button>
                  </div>
                  <button onClick={() => setIrregularPackage(!irregularPackage)} className={`w-[51px] h-[31px] rounded-full flex-shrink-0 p-[2px] transition-colors ${irregularPackage ? 'bg-[#34C759]' : 'bg-[#E5E5E5]'}`}>
                    <div className={`w-[27px] h-[27px] bg-white rounded-full shadow-md transition-transform ${irregularPackage ? 'translate-x-[20px]' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>

              <div className="h-[1px] bg-[#E5E5E5] w-full" />
              <div className="px-4 pb-3 pt-4 bg-white">
                <button onClick={() => setShowPackageSheet(false)} className="w-full h-[50px] bg-[#3665F3] rounded-full flex items-center justify-center active:bg-[#2d54d4]">
                  <span className="text-[16px] font-bold text-white" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Save</span>
                </button>
              </div>
              <div className="h-[34px] flex items-center justify-center bg-white">
                <div className="w-[134px] h-[5px] bg-[#191919] rounded-full" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delivery Details Full Screen Sheet */}
      {showDeliveryDetailsSheet && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
          <div className="relative w-[402px] h-[874px] bg-black rounded-[55px] p-3 shadow-2xl" style={{ pointerEvents: 'auto' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />
            <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden flex flex-col">
              {/* iOS Status Bar */}
              <div className="h-[47px] px-6 flex items-end justify-between pb-1 bg-white flex-shrink-0">
                <span className="text-[15px] font-semibold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>9:41</span>
                <div className="flex items-center gap-[5px]">
                  <svg className="w-[17px] h-[11px]" viewBox="0 0 17 11"><rect x="0" y="7" width="3" height="4" rx="1" fill="#191919"/><rect x="4.5" y="5" width="3" height="6" rx="1" fill="#191919"/><rect x="9" y="2.5" width="3" height="8.5" rx="1" fill="#191919"/><rect x="13.5" y="0" width="3" height="11" rx="1" fill="#191919"/></svg>
                  <svg className="w-[15px] h-[11px]" viewBox="0 0 15 11"><path d="M7.5 10.5C8.33 10.5 9 9.83 9 9C9 8.17 8.33 7.5 7.5 7.5C6.67 7.5 6 8.17 6 9C6 9.83 6.67 10.5 7.5 10.5Z" fill="#191919"/><path d="M4.5 7C5.5 6 6.5 5.5 7.5 5.5C8.5 5.5 9.5 6 10.5 7" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/><path d="M2.5 4.5C4 3 5.5 2.5 7.5 2.5C9.5 2.5 11 3 12.5 4.5" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/><path d="M0.5 2C2.5 0.5 5 0 7.5 0C10 0 12.5 0.5 14.5 2" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/></svg>
                  <svg className="w-[25px] h-[12px]" viewBox="0 0 25 12"><rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="#191919" strokeOpacity="0.35"/><rect x="2" y="2" width="18" height="8" rx="1.5" fill="#191919"/><path d="M23 4V8C23.8 8 24 7 24 6C24 5 23.8 4 23 4Z" fill="#191919" fillOpacity="0.4"/></svg>
                </div>
              </div>

              {/* Navigation Header - Back and X buttons */}
              <div className="h-[44px] px-4 flex items-center justify-between bg-white flex-shrink-0">
                <button onClick={() => setShowDeliveryDetailsSheet(false)} className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center">
                  <BackArrow className="w-6 h-6 text-[#191919]" />
                </button>
                <button onClick={() => setShowDeliveryDetailsSheet(false)} className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center">
                  <X className="w-5 h-5 text-[#191919]" strokeWidth={2} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-4 pb-28">
                {/* Page Title */}
                <h1 className="text-[24px] font-bold text-[#191919] leading-[32px] mt-2 mb-6" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Delivery details</h1>

                {/* Item Location Section */}
                <div className="mb-4">
                  <h2 className="text-[16px] font-bold text-[#191919] leading-[24px] mb-3" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Item location</h2>
                  
                  {!showItemLocationEdit ? (
                    <div className="w-full p-3 bg-[#F7F7F7] rounded-[8px] flex items-start justify-between">
                      <div className="flex flex-col">
                        <span className="text-[14px] text-[#191919] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{`${itemCity}, ${itemCountry}, ${itemZipCode}`}</span>
                        <span className="text-[14px] text-[#707070] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>The item location appears on the listing.</span>
                      </div>
                      <button onClick={() => setShowItemLocationEdit(true)} className="text-[14px] text-[#191919] underline ml-3 flex-shrink-0" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Edit</button>
                    </div>
                  ) : (
                    <div className="w-full p-4 bg-[#F7F7F7] rounded-[12px] flex flex-col gap-3">
                      {/* Country or region dropdown */}
                      <button onClick={() => setShowCountrySheet(true)} className="w-full h-[56px] px-4 bg-white border border-[#8F8F8F] rounded-[8px] flex items-center justify-between">
                        <div className="flex flex-col items-start">
                          <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Country or region</span>
                          <span className="text-[14px] text-[#191919] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{itemCountry}</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-[#191919]" />
                      </button>
                      
                      {/* City input */}
                      <div className="w-full h-[56px] px-4 bg-white border border-[#8F8F8F] rounded-[8px] flex flex-col justify-center">
                        <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>City</span>
                        <input type="text" value={itemCity} onChange={(e) => setItemCity(e.target.value)} className="text-[14px] text-[#191919] leading-[20px] bg-transparent outline-none w-full" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }} placeholder="City" />
                      </div>
                      
                      {/* ZIP code input */}
                      <div className="w-full h-[56px] px-4 bg-white border border-[#8F8F8F] rounded-[8px] flex flex-col justify-center">
                        <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>ZIP code</span>
                        <input type="text" value={itemZipCode} onChange={(e) => setItemZipCode(e.target.value)} className="text-[14px] text-[#191919] leading-[20px] bg-transparent outline-none w-full" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }} placeholder="12345" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-[#E5E5E5] my-4" />

                {/* Handling Time Section */}
                <div className="mb-4">
                  <h2 className="text-[16px] font-bold text-[#191919] leading-[24px] mb-3" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Handling time</h2>
                  <button onClick={() => setShowHandlingTimeSheet(true)} className="w-full h-[48px] px-4 bg-[#F7F7F7] border border-[#8F8F8F] rounded-[8px] flex items-center justify-between">
                    <span className="text-[14px] text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{handlingTime}</span>
                    <ChevronDown className="w-4 h-4 text-[#191919]" />
                  </button>
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-[#E5E5E5] my-4" />

                {/* Returns Section */}
                <div>
                  <div className="mb-4">
                    <h2 className="text-[16px] font-bold text-[#191919] leading-[24px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Returns</h2>
                    <p className="text-[14px] text-[#707070] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Sellers must accept returns if the item doesn&apos;t match the listing description.</p>
                  </div>

                  {/* Domestic Returns */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between py-2 mb-3">
                      <span className="text-[14px] font-bold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Domestic</span>
                      <button onClick={() => setDomesticReturns(!domesticReturns)} className={`w-[51px] h-[31px] rounded-full transition-colors ${domesticReturns ? 'bg-[#3665F3]' : 'bg-[#E5E5E5]'}`}>
                        <div className={`w-[27px] h-[27px] bg-white rounded-full shadow-sm transition-transform ${domesticReturns ? 'translate-x-[22px]' : 'translate-x-[2px]'}`} />
                      </button>
                    </div>

                    {domesticReturns && (
                      <div className="flex flex-col gap-3">
                        {/* Allowed within */}
                        <button onClick={() => setShowDomesticAllowedWithinSheet(true)} className="w-full h-[56px] px-4 bg-[#F7F7F7] border border-[#8F8F8F] rounded-[8px] flex items-center justify-between">
                          <div className="flex flex-col items-start">
                            <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Allowed within</span>
                            <span className="text-[14px] text-[#191919] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{domesticAllowedWithin}</span>
                          </div>
                          <ChevronDown className="w-4 h-4 text-[#191919]" />
                        </button>

                        {/* Returns shipping paid by */}
                        <button onClick={() => setShowDomesticReturnsPaidBySheet(true)} className="w-full h-[56px] px-4 bg-[#F7F7F7] border border-[#8F8F8F] rounded-[8px] flex items-center justify-between">
                          <div className="flex flex-col items-start">
                            <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Returns shipping paid by</span>
                            <span className="text-[14px] text-[#191919] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{domesticReturnsPaidBy}</span>
                          </div>
                          <ChevronDown className="w-4 h-4 text-[#191919]" />
                        </button>

                        {/* Refund method */}
                        <button onClick={() => setShowDomesticRefundMethodSheet(true)} className="w-full h-[56px] px-4 bg-[#F7F7F7] border border-[#8F8F8F] rounded-[8px] flex items-center justify-between">
                          <div className="flex flex-col items-start">
                            <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Refund method</span>
                            <span className="text-[14px] text-[#191919] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{domesticRefundMethod}</span>
                          </div>
                          <ChevronDown className="w-4 h-4 text-[#191919]" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* International Returns */}
                  <div>
                    <div className="flex items-center justify-between py-2 mb-3">
                      <span className="text-[14px] font-bold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>International</span>
                      <button onClick={() => setInternationalReturns(!internationalReturns)} className={`w-[51px] h-[31px] rounded-full transition-colors ${internationalReturns ? 'bg-[#3665F3]' : 'bg-[#E5E5E5]'}`}>
                        <div className={`w-[27px] h-[27px] bg-white rounded-full shadow-sm transition-transform ${internationalReturns ? 'translate-x-[22px]' : 'translate-x-[2px]'}`} />
                      </button>
                    </div>

                    {internationalReturns && (
                      <div className="flex flex-col gap-3">
                        {/* Allowed within */}
                        <button onClick={() => setShowInternationalAllowedWithinSheet(true)} className="w-full h-[56px] px-4 bg-[#F7F7F7] border border-[#8F8F8F] rounded-[8px] flex items-center justify-between">
                          <div className="flex flex-col items-start">
                            <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Allowed within</span>
                            <span className="text-[14px] text-[#191919] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{internationalAllowedWithin}</span>
                          </div>
                          <ChevronDown className="w-4 h-4 text-[#191919]" />
                        </button>

                        {/* Returns shipping paid by */}
                        <button onClick={() => setShowInternationalReturnsPaidBySheet(true)} className="w-full h-[56px] px-4 bg-[#F7F7F7] border border-[#8F8F8F] rounded-[8px] flex items-center justify-between">
                          <div className="flex flex-col items-start">
                            <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Returns shipping paid by</span>
                            <span className="text-[14px] text-[#191919] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{internationalReturnsPaidBy}</span>
                          </div>
                          <ChevronDown className="w-4 h-4 text-[#191919]" />
                        </button>

                        {/* Refund method */}
                        <button onClick={() => setShowInternationalRefundMethodSheet(true)} className="w-full h-[56px] px-4 bg-[#F7F7F7] border border-[#8F8F8F] rounded-[8px] flex items-center justify-between">
                          <div className="flex flex-col items-start">
                            <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Refund method</span>
                            <span className="text-[14px] text-[#191919] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{internationalRefundMethod}</span>
                          </div>
                          <ChevronDown className="w-4 h-4 text-[#191919]" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Fixed Bottom Button */}
              <div className="absolute bottom-0 left-0 right-0 bg-white">
                <div className="h-[1px] bg-[#E5E5E5]" />
                <div className="px-4 pb-3 pt-3">
                  <button onClick={() => setShowDeliveryDetailsSheet(false)} className="w-full h-[50px] bg-[#3665F3] rounded-full flex items-center justify-center active:bg-[#2d54d4]">
                    <span className="text-[16px] font-bold text-white" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Done</span>
                  </button>
                </div>
                {/* Home Indicator */}
                <div className="h-[34px] flex items-center justify-center">
                  <div className="w-[134px] h-[5px] bg-[#191919] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Handling Time Bottom Sheet */}
      {showHandlingTimeSheet && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
          <div className="relative w-[402px] h-[874px] bg-black rounded-[55px] p-3 shadow-2xl" style={{ pointerEvents: 'auto' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />
            <div className="relative w-full h-full rounded-[40px] overflow-hidden">
              <div className="absolute inset-0 bg-white/60 backdrop-blur-md" onClick={() => setShowHandlingTimeSheet(false)} />
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] shadow-[0_-5px_30px_rgba(0,0,0,0.12)]" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-center pt-[6px] pb-[6px]">
                  <div className="w-8 h-1 bg-[#8F8F8F] rounded-full" />
                </div>
                <div className="flex items-center justify-between px-4 pt-2 pb-3">
                  <h3 className="text-[18px] font-bold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Handling time</h3>
                  <button onClick={() => setShowHandlingTimeSheet(false)} className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center">
                    <X className="w-5 h-5 text-[#191919]" strokeWidth={2} />
                  </button>
                </div>
                <div className="px-4 pt-1 pb-8 flex flex-col gap-2">
                  {handlingTimeOptions.map((option) => {
                    const isSelected = handlingTime === option
                    return (
                      <button
                        key={option}
                        onClick={() => { setHandlingTime(option); setShowHandlingTimeSheet(false) }}
                        className={`w-full px-4 py-3 rounded-[8px] text-left ${isSelected ? "bg-[#F7F7F7] border-2 border-[#191919]" : "bg-white border border-[#8F8F8F]"}`}
                      >
                        <span className="text-[14px] text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{option}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================== */}
      {/* DOMESTIC SERVICE L2 (View all services)       */}
      {/* ============================================== */}
      {showDomesticServicesSheet && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
          <div className="relative w-[402px] h-[874px] bg-black rounded-[55px] p-3 shadow-2xl" style={{ pointerEvents: 'auto' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />
            <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden flex flex-col">
              {/* iOS Status Bar */}
              <div className="h-[47px] px-6 flex items-end justify-between pb-1 bg-white flex-shrink-0">
                <span className="text-[15px] font-semibold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>9:41</span>
                <div className="flex items-center gap-[5px]">
                  <svg className="w-[17px] h-[11px]" viewBox="0 0 17 11"><rect x="0" y="7" width="3" height="4" rx="1" fill="#191919"/><rect x="4.5" y="5" width="3" height="6" rx="1" fill="#191919"/><rect x="9" y="2.5" width="3" height="8.5" rx="1" fill="#191919"/><rect x="13.5" y="0" width="3" height="11" rx="1" fill="#191919"/></svg>
                  <svg className="w-[15px] h-[11px]" viewBox="0 0 15 11"><path d="M7.5 10.5C8.33 10.5 9 9.83 9 9C9 8.17 8.33 7.5 7.5 7.5C6.67 7.5 6 8.17 6 9C6 9.83 6.67 10.5 7.5 10.5Z" fill="#191919"/><path d="M4.5 7C5.5 6 6.5 5.5 7.5 5.5C8.5 5.5 9.5 6 10.5 7" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/><path d="M2.5 4.5C4 3 5.5 2.5 7.5 2.5C9.5 2.5 11 3 12.5 4.5" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/><path d="M0.5 2C2.5 0.5 5 0 7.5 0C10 0 12.5 0.5 14.5 2" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/></svg>
                  <svg className="w-[25px] h-[12px]" viewBox="0 0 25 12"><rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="#191919" strokeOpacity="0.35"/><rect x="2" y="2" width="18" height="8" rx="1.5" fill="#191919"/><path d="M23 4V8C23.8 8 24 7 24 6C24 5 23.8 4 23 4Z" fill="#191919" fillOpacity="0.4"/></svg>
                </div>
              </div>
              
              {/* Navigation Header */}
              <div className="h-[44px] px-4 flex items-center bg-white flex-shrink-0">
                <button onClick={() => setShowDomesticServicesSheet(false)} className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center">
                  <BackArrow className="w-6 h-6 text-[#191919]" />
                </button>
              </div>
              
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-4 pb-24">
                <div className="mb-6">
                  <h1 className="text-[24px] font-bold text-[#191919] leading-[32px] mt-2" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Domestic service</h1>
                  <p className="text-[14px] text-[#707070] leading-[20px] mt-1" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>This service is selected by default and will be highlighted for buyers in search.</p>
                </div>
                
                {/* Service Type Group 1 */}
                <div className="mb-5">
                  <h2 className="text-[14px] font-bold text-[#191919] leading-[20px] mb-3" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Service type</h2>
                  <div className="flex flex-col gap-3">
                    {domesticServices.map((service) => {
                      const isSelected = selectedDomesticService === service.id
                      return (
                        <button key={service.id} onClick={() => setSelectedDomesticService(service.id)} className="flex items-center gap-3 w-full text-left">
                          <div className="w-[22px] h-[22px] flex-shrink-0">
                            {isSelected ? (
                              <svg viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="10" stroke="#191919" strokeWidth="2"/><circle cx="11" cy="11" r="5.5" fill="#191919"/></svg>
                            ) : (
                              <svg viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="10" stroke="#767676" strokeWidth="2"/></svg>
                            )}
                          </div>
                          <div className="w-[52px] h-[52px] bg-[#F7F7F7] rounded-[8px] flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {service.logoType === "usps" && <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-opJzsRtNKhuBXRYW7Ng8AUZWWgiMti.png" alt="USPS" className="w-full h-full object-contain p-1" />}
                            {service.logoType === "fedex" && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/FedEx_Corporation_-_2016_Logo.svg/1280px-FedEx_Corporation_-_2016_Logo.svg.png" alt="FedEx" className="w-[40px] h-auto object-contain" />}
                            {service.logoType === "ups" && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/UPS_Logo_Shield_2017.svg/220px-UPS_Logo_Shield_2017.svg.png" alt="UPS" className="w-[32px] h-auto object-contain" />}
                          </div>
                          <div className="flex flex-col flex-1">
                            {service.recommended && (
                              <span className="inline-flex items-center px-2 py-[2px] rounded-[4px] bg-[#E7F1FF] w-fit mb-1">
                                <span className="text-[10px] text-[#3665F3] font-semibold uppercase tracking-[0.5px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Recommended</span>
                              </span>
                            )}
                            <span className="text-[13px] font-bold text-[#191919] leading-[18px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{service.name}</span>
                            <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>X-X business days</span>
                            <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Up to $XXX.XX protection</span>
                            <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Up to X lb., AA x BB x CC in.</span>
                            <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>$X.XX-$X.XX</span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
                
                {/* Service Type Group 2 */}
                <div className="mb-5">
                  <h2 className="text-[14px] font-bold text-[#191919] leading-[20px] mb-3" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Service type</h2>
                  <div className="flex flex-col gap-3">
                    {domesticServices.slice(0, 2).map((service) => {
                      const isSelected = false
                      return (
                        <button key={`group2-${service.id}`} className="flex items-center gap-3 w-full text-left">
                          <div className="w-[22px] h-[22px] flex-shrink-0">
                            <svg viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="10" stroke="#767676" strokeWidth="2"/></svg>
                          </div>
                          <div className="w-[52px] h-[52px] bg-[#F7F7F7] rounded-[8px] flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {service.logoType === "usps" && <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-opJzsRtNKhuBXRYW7Ng8AUZWWgiMti.png" alt="USPS" className="w-full h-full object-contain p-1" />}
                            {service.logoType === "fedex" && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/FedEx_Corporation_-_2016_Logo.svg/1280px-FedEx_Corporation_-_2016_Logo.svg.png" alt="FedEx" className="w-[40px] h-auto object-contain" />}
                          </div>
                          <div className="flex flex-col flex-1">
                            <span className="text-[13px] font-bold text-[#191919] leading-[18px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{service.name}</span>
                            <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>X-X business days</span>
                            <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Up to $XXX.XX protection</span>
                            <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Up to X lb., AA x BB x CC in.</span>
                            <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>$X.XX-$X.XX</span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
              
              {/* Fixed Bottom Button */}
              <div className="absolute bottom-0 left-0 right-0 bg-white">
                <div className="h-[1px] bg-[#E5E5E5]" />
                <div className="px-4 pb-3 pt-3">
                  <button onClick={() => setShowDomesticServicesSheet(false)} className="w-full h-[50px] bg-[#3665F3] rounded-full flex items-center justify-center active:bg-[#2d54d4]">
                    <span className="text-[16px] font-bold text-white" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Done</span>
                  </button>
                </div>
                <div className="h-[34px] flex items-center justify-center">
                  <div className="w-[134px] h-[5px] bg-[#191919] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================== */}
      {/* ADDITIONAL DOMESTIC SERVICE L2               */}
      {/* ============================================== */}
      {showAdditionalDomesticSheet && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
          <div className="relative w-[402px] h-[874px] bg-black rounded-[55px] p-3 shadow-2xl" style={{ pointerEvents: 'auto' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />
            <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden flex flex-col">
              {/* iOS Status Bar */}
              <div className="h-[47px] px-6 flex items-end justify-between pb-1 bg-white flex-shrink-0">
                <span className="text-[15px] font-semibold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>9:41</span>
                <div className="flex items-center gap-[5px]">
                  <svg className="w-[17px] h-[11px]" viewBox="0 0 17 11"><rect x="0" y="7" width="3" height="4" rx="1" fill="#191919"/><rect x="4.5" y="5" width="3" height="6" rx="1" fill="#191919"/><rect x="9" y="2.5" width="3" height="8.5" rx="1" fill="#191919"/><rect x="13.5" y="0" width="3" height="11" rx="1" fill="#191919"/></svg>
                  <svg className="w-[15px] h-[11px]" viewBox="0 0 15 11"><path d="M7.5 10.5C8.33 10.5 9 9.83 9 9C9 8.17 8.33 7.5 7.5 7.5C6.67 7.5 6 8.17 6 9C6 9.83 6.67 10.5 7.5 10.5Z" fill="#191919"/><path d="M4.5 7C5.5 6 6.5 5.5 7.5 5.5C8.5 5.5 9.5 6 10.5 7" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/><path d="M2.5 4.5C4 3 5.5 2.5 7.5 2.5C9.5 2.5 11 3 12.5 4.5" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/><path d="M0.5 2C2.5 0.5 5 0 7.5 0C10 0 12.5 0.5 14.5 2" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/></svg>
                  <svg className="w-[25px] h-[12px]" viewBox="0 0 25 12"><rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="#191919" strokeOpacity="0.35"/><rect x="2" y="2" width="18" height="8" rx="1.5" fill="#191919"/><path d="M23 4V8C23.8 8 24 7 24 6C24 5 23.8 4 23 4Z" fill="#191919" fillOpacity="0.4"/></svg>
                </div>
              </div>
              
              {/* Navigation Header */}
              <div className="h-[44px] px-4 flex items-center bg-white flex-shrink-0">
                <button onClick={() => setShowAdditionalDomesticSheet(false)} className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center">
                  <BackArrow className="w-6 h-6 text-[#191919]" />
                </button>
              </div>
              
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-4 pb-24">
                <div className="mb-6">
                  <h1 className="text-[24px] font-bold text-[#191919] leading-[32px] mt-2" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Additional domestic service</h1>
                  <p className="text-[14px] text-[#707070] leading-[20px] mt-1" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Offer an optional choice for your buyers. They can select it at checkout.</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button className="text-[12px] text-[#D50B0B] underline" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Remove service</button>
                    <span className="text-[#707070]">|</span>
                    <button className="text-[12px] text-[#191919] underline" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Make default</button>
                  </div>
                </div>
                
                {/* Service Type Group 1 */}
                <div className="mb-5">
                  <h2 className="text-[14px] font-bold text-[#191919] leading-[20px] mb-3" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Service type</h2>
                  <div className="flex flex-col gap-3">
                    {domesticServices.map((service) => {
                      const isSelected = selectedAdditionalDomestic === service.id
                      return (
                        <button key={service.id} onClick={() => setSelectedAdditionalDomestic(service.id)} className="flex items-center gap-3 w-full text-left">
                          <div className="w-[22px] h-[22px] flex-shrink-0">
                            {isSelected ? (
                              <svg viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="10" stroke="#191919" strokeWidth="2"/><circle cx="11" cy="11" r="5.5" fill="#191919"/></svg>
                            ) : (
                              <svg viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="10" stroke="#767676" strokeWidth="2"/></svg>
                            )}
                          </div>
                          <div className="w-[52px] h-[52px] bg-[#F7F7F7] rounded-[8px] flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {service.logoType === "usps" && <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-opJzsRtNKhuBXRYW7Ng8AUZWWgiMti.png" alt="USPS" className="w-full h-full object-contain p-1" />}
                            {service.logoType === "fedex" && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/FedEx_Corporation_-_2016_Logo.svg/1280px-FedEx_Corporation_-_2016_Logo.svg.png" alt="FedEx" className="w-[40px] h-auto object-contain" />}
                            {service.logoType === "ups" && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/UPS_Logo_Shield_2017.svg/220px-UPS_Logo_Shield_2017.svg.png" alt="UPS" className="w-[32px] h-auto object-contain" />}
                          </div>
                          <div className="flex flex-col flex-1">
                            <span className="text-[13px] font-bold text-[#191919] leading-[18px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{service.name}</span>
                            <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>X-X business days</span>
                            <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Up to $XXX.XX protection</span>
                            <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Up to X lb., AA x BB x CC in.</span>
                            <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>$X.XX-$X.XX</span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
                
                {/* Service Type Group 2 */}
                <div className="mb-5">
                  <h2 className="text-[14px] font-bold text-[#191919] leading-[20px] mb-3" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Service type</h2>
                  <div className="flex flex-col gap-3">
                    {domesticServices.slice(0, 2).map((service) => (
                      <button key={`group2-${service.id}`} className="flex items-center gap-3 w-full text-left">
                        <div className="w-[22px] h-[22px] flex-shrink-0">
                          <svg viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="10" stroke="#767676" strokeWidth="2"/></svg>
                        </div>
                        <div className="w-[52px] h-[52px] bg-[#F7F7F7] rounded-[8px] flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {service.logoType === "usps" && <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-opJzsRtNKhuBXRYW7Ng8AUZWWgiMti.png" alt="USPS" className="w-full h-full object-contain p-1" />}
                          {service.logoType === "fedex" && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/FedEx_Corporation_-_2016_Logo.svg/1280px-FedEx_Corporation_-_2016_Logo.svg.png" alt="FedEx" className="w-[40px] h-auto object-contain" />}
                        </div>
                        <div className="flex flex-col flex-1">
                          <span className="text-[13px] font-bold text-[#191919] leading-[18px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{service.name}</span>
                          <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>X-X business days</span>
                          <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Up to $XXX.XX protection</span>
                          <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Up to X lb., AA x BB x CC in.</span>
                          <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>$X.XX-$X.XX</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Fixed Bottom Button */}
              <div className="absolute bottom-0 left-0 right-0 bg-white">
                <div className="h-[1px] bg-[#E5E5E5]" />
                <div className="px-4 pb-3 pt-3">
                  <button 
                    onClick={() => {
                      // Keep the selection and close
                      setShowAdditionalDomesticSheet(false)
                    }} 
                    className="w-full h-[50px] bg-[#3665F3] rounded-full flex items-center justify-center active:bg-[#2d54d4]"
                  >
                    <span className="text-[16px] font-bold text-white" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Done</span>
                  </button>
                </div>
                <div className="h-[34px] flex items-center justify-center">
                  <div className="w-[134px] h-[5px] bg-[#191919] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================== */}
      {/* INTERNATIONAL SERVICE L2                      */}
      {/* ============================================== */}
      {showInternationalServicesSheet && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
          <div className="relative w-[402px] h-[874px] bg-black rounded-[55px] p-3 shadow-2xl" style={{ pointerEvents: 'auto' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />
            <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden flex flex-col">
              {/* iOS Status Bar */}
              <div className="h-[47px] px-6 flex items-end justify-between pb-1 bg-white flex-shrink-0">
                <span className="text-[15px] font-semibold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>9:41</span>
                <div className="flex items-center gap-[5px]">
                  <svg className="w-[17px] h-[11px]" viewBox="0 0 17 11"><rect x="0" y="7" width="3" height="4" rx="1" fill="#191919"/><rect x="4.5" y="5" width="3" height="6" rx="1" fill="#191919"/><rect x="9" y="2.5" width="3" height="8.5" rx="1" fill="#191919"/><rect x="13.5" y="0" width="3" height="11" rx="1" fill="#191919"/></svg>
                  <svg className="w-[15px] h-[11px]" viewBox="0 0 15 11"><path d="M7.5 10.5C8.33 10.5 9 9.83 9 9C9 8.17 8.33 7.5 7.5 7.5C6.67 7.5 6 8.17 6 9C6 9.83 6.67 10.5 7.5 10.5Z" fill="#191919"/><path d="M4.5 7C5.5 6 6.5 5.5 7.5 5.5C8.5 5.5 9.5 6 10.5 7" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/><path d="M2.5 4.5C4 3 5.5 2.5 7.5 2.5C9.5 2.5 11 3 12.5 4.5" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/><path d="M0.5 2C2.5 0.5 5 0 7.5 0C10 0 12.5 0.5 14.5 2" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/></svg>
                  <svg className="w-[25px] h-[12px]" viewBox="0 0 25 12"><rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="#191919" strokeOpacity="0.35"/><rect x="2" y="2" width="18" height="8" rx="1.5" fill="#191919"/><path d="M23 4V8C23.8 8 24 7 24 6C24 5 23.8 4 23 4Z" fill="#191919" fillOpacity="0.4"/></svg>
                </div>
              </div>
              
              {/* Navigation Header */}
              <div className="h-[44px] px-4 flex items-center bg-white flex-shrink-0">
                <button onClick={() => setShowInternationalServicesSheet(false)} className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center">
                  <BackArrow className="w-6 h-6 text-[#191919]" />
                </button>
              </div>
              
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-4 pb-24">
                <div className="mb-6">
                  <h1 className="text-[24px] font-bold text-[#191919] leading-[32px] mt-2" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>International service</h1>
                  <p className="text-[14px] text-[#707070] leading-[20px] mt-1" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Lorem ipsum dolor sit amet</p>
                  <button className="text-[12px] text-[#D50B0B] underline mt-2" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Remove service</button>
                </div>
                
                {/* Service Type Group 1 */}
                <div className="mb-5">
                  <h2 className="text-[14px] font-bold text-[#191919] leading-[20px] mb-3" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Service type</h2>
                  <div className="flex flex-col gap-3">
                    {domesticServices.map((service) => {
                      const isSelected = selectedInternational === service.id
                      return (
                        <button key={service.id} onClick={() => setSelectedInternational(service.id)} className="flex items-center gap-3 w-full text-left">
                          <div className="w-[22px] h-[22px] flex-shrink-0">
                            {isSelected ? (
                              <svg viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="10" stroke="#191919" strokeWidth="2"/><circle cx="11" cy="11" r="5.5" fill="#191919"/></svg>
                            ) : (
                              <svg viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="10" stroke="#767676" strokeWidth="2"/></svg>
                            )}
                          </div>
                          <div className="w-[52px] h-[52px] bg-[#F7F7F7] rounded-[8px] flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {service.logoType === "usps" && <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-opJzsRtNKhuBXRYW7Ng8AUZWWgiMti.png" alt="USPS" className="w-full h-full object-contain p-1" />}
                            {service.logoType === "fedex" && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/FedEx_Corporation_-_2016_Logo.svg/1280px-FedEx_Corporation_-_2016_Logo.svg.png" alt="FedEx" className="w-[40px] h-auto object-contain" />}
                            {service.logoType === "ups" && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/UPS_Logo_Shield_2017.svg/220px-UPS_Logo_Shield_2017.svg.png" alt="UPS" className="w-[32px] h-auto object-contain" />}
                          </div>
                          <div className="flex flex-col flex-1">
                            <span className="text-[13px] font-bold text-[#191919] leading-[18px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{service.name}</span>
                            <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>X-X business days</span>
                            <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Up to $XXX.XX protection</span>
                            <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Up to X lb., AA x BB x CC in.</span>
                            <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>$X.XX-$X.XX</span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
                
                {/* Service Type Group 2 */}
                <div className="mb-5">
                  <h2 className="text-[14px] font-bold text-[#191919] leading-[20px] mb-3" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Service type</h2>
                  <div className="flex flex-col gap-3">
                    {domesticServices.slice(0, 2).map((service) => (
                      <button key={`intl-group2-${service.id}`} className="flex items-center gap-3 w-full text-left">
                        <div className="w-[22px] h-[22px] flex-shrink-0">
                          <svg viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="10" stroke="#767676" strokeWidth="2"/></svg>
                        </div>
                        <div className="w-[52px] h-[52px] bg-[#F7F7F7] rounded-[8px] flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {service.logoType === "usps" && <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-opJzsRtNKhuBXRYW7Ng8AUZWWgiMti.png" alt="USPS" className="w-full h-full object-contain p-1" />}
                          {service.logoType === "fedex" && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/FedEx_Corporation_-_2016_Logo.svg/1280px-FedEx_Corporation_-_2016_Logo.svg.png" alt="FedEx" className="w-[40px] h-auto object-contain" />}
                        </div>
                        <div className="flex flex-col flex-1">
                          <span className="text-[13px] font-bold text-[#191919] leading-[18px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{service.name}</span>
                          <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>X-X business days</span>
                          <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Up to $XXX.XX protection</span>
                          <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Up to X lb., AA x BB x CC in.</span>
                          <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>$X.XX-$X.XX</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Fixed Bottom Button */}
              <div className="absolute bottom-0 left-0 right-0 bg-white">
                <div className="h-[1px] bg-[#E5E5E5]" />
                <div className="px-4 pb-3 pt-3">
                  <button 
                    onClick={() => {
                      // Keep the selection and close
                      setShowInternationalServicesSheet(false)
                    }} 
                    className="w-full h-[50px] bg-[#3665F3] rounded-full flex items-center justify-center active:bg-[#2d54d4]"
                  >
                    <span className="text-[16px] font-bold text-white" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Done</span>
                  </button>
                </div>
                <div className="h-[34px] flex items-center justify-center">
                  <div className="w-[134px] h-[5px] bg-[#191919] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================== */}
      {/* EDIT SHIPPING COST FULL SCREEN SHEET         */}
      {/* ============================================== */}
      {showEditShippingCostSheet && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
          <div className="relative w-[402px] h-[874px] bg-black rounded-[55px] p-3 shadow-2xl" style={{ pointerEvents: 'auto' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />
            <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden flex flex-col">
              {/* iOS Status Bar */}
              <div className="h-[47px] px-6 flex items-end justify-between pb-1 bg-white flex-shrink-0">
                <span className="text-[15px] font-semibold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>9:41</span>
                <div className="flex items-center gap-[5px]">
                  <svg className="w-[17px] h-[11px]" viewBox="0 0 17 11"><rect x="0" y="7" width="3" height="4" rx="1" fill="#191919"/><rect x="4.5" y="5" width="3" height="6" rx="1" fill="#191919"/><rect x="9" y="2.5" width="3" height="8.5" rx="1" fill="#191919"/><rect x="13.5" y="0" width="3" height="11" rx="1" fill="#191919"/></svg>
                  <svg className="w-[15px] h-[11px]" viewBox="0 0 15 11"><path d="M7.5 10.5C8.33 10.5 9 9.83 9 9C9 8.17 8.33 7.5 7.5 7.5C6.67 7.5 6 8.17 6 9C6 9.83 6.67 10.5 7.5 10.5Z" fill="#191919"/><path d="M4.5 7C5.5 6 6.5 5.5 7.5 5.5C8.5 5.5 9.5 6 10.5 7" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/><path d="M2.5 4.5C4 3 5.5 2.5 7.5 2.5C9.5 2.5 11 3 12.5 4.5" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/><path d="M0.5 2C2.5 0.5 5 0 7.5 0C10 0 12.5 0.5 14.5 2" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/></svg>
                  <svg className="w-[25px] h-[12px]" viewBox="0 0 25 12"><rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="#191919" strokeOpacity="0.35"/><rect x="2" y="2" width="18" height="8" rx="1.5" fill="#191919"/><path d="M23 4V8C23.8 8 24 7 24 6C24 5 23.8 4 23 4Z" fill="#191919" fillOpacity="0.4"/></svg>
                </div>
              </div>

              {/* Header with drag handle and close button */}
              <div className="flex-shrink-0">
                <div className="flex justify-center pt-1 pb-2">
                  <div className="w-8 h-1 bg-[#8F8F8F] rounded-full" />
                </div>
                <div className="flex items-start justify-between px-4 pt-1 pb-3">
                  <div className="flex flex-col">
                    <h3 className="text-[18px] font-bold text-[#191919] leading-[24px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Shipping cost</h3>
                    <span className="text-[14px] text-[#707070] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Domestic service</span>
                  </div>
                  <button 
                    onClick={() => {
                      setShowEditShippingCostSheet(false)
                      setShowNumericKeyboard(false)
                    }}
                    className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center"
                  >
                    <X className="w-5 h-5 text-[#191919]" strokeWidth={2} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 px-4 pt-4 overflow-y-auto">
                {/* Section Header */}
                <div className="mb-4">
                  <h4 className="text-[16px] font-bold text-[#191919] leading-[24px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Enter the shipping cost</h4>
                  <p className="text-[14px] text-[#707070] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Choose the amount you want the buyer to pay.</p>
                </div>
                
                {/* Cost Type Options */}
                <div className="flex flex-col gap-3 mb-4">
                  <button 
                    onClick={() => setShippingCostType("calculated")}
                    className={`w-full h-[56px] px-4 rounded-[8px] flex items-center justify-between ${
                      shippingCostType === "calculated" 
                        ? "bg-[#F7F7F7] border-2 border-[#191919]" 
                        : "bg-white border border-[#8F8F8F]"
                    }`}
                  >
                    <span className="text-[14px] text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Calculated cost</span>
                    {shippingCostType === "calculated" && (
                      <svg className="w-4 h-4 text-[#191919]" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    )}
                  </button>
                  <button 
                    onClick={() => {
                      setShippingCostType("flat")
                      setShowNumericKeyboard(true)
                    }}
                    className={`w-full h-[56px] px-4 rounded-[8px] flex items-center justify-between ${
                      shippingCostType === "flat" 
                        ? "bg-[#F7F7F7] border-2 border-[#191919]" 
                        : "bg-white border border-[#8F8F8F]"
                    }`}
                  >
                    <span className="text-[14px] text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Flat rate</span>
                    {shippingCostType === "flat" && (
                      <svg className="w-4 h-4 text-[#191919]" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    )}
                  </button>
                  <button 
                    onClick={() => setShippingCostType("free")}
                    className={`w-full h-[56px] px-4 rounded-[8px] flex items-center justify-between ${
                      shippingCostType === "free" 
                        ? "bg-[#F7F7F7] border-2 border-[#191919]" 
                        : "bg-white border border-[#8F8F8F]"
                    }`}
                  >
                    <span className="text-[14px] text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Free shipping</span>
                    {shippingCostType === "free" && (
                      <svg className="w-4 h-4 text-[#191919]" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    )}
                  </button>
                </div>
                
                {/* Shipping Cost Input - shown when flat rate selected */}
                {shippingCostType === "flat" && (
                  <button 
                    onClick={() => setShowNumericKeyboard(true)}
                    className={`w-full h-[56px] px-4 bg-[#F7F7F7] rounded-[8px] flex items-center text-left ${showNumericKeyboard ? 'border-2 border-[#191919]' : 'border border-[#8F8F8F]'}`}
                  >
                    <div className="flex flex-col flex-1">
                      <span className="text-[12px] text-[#707070] leading-[16px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Shipping cost</span>
                      <span className="text-[16px] text-[#191919] leading-[24px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>${shippingCost || "0.00"}</span>
                    </div>
                  </button>
                )}
              </div>

              {/* Bottom Section - Save button and Keyboard */}
              <div className="flex-shrink-0">
                {/* Save Button */}
                <div className="px-4 pb-3 pt-3 border-t border-[#E5E5E5]">
                  <button 
                    onClick={() => {
                      setShowEditShippingCostSheet(false)
                      setShowNumericKeyboard(false)
                    }}
                    className="w-full h-[50px] bg-[#3665F3] rounded-full flex items-center justify-center active:bg-[#2d54d4]"
                  >
                    <span className="text-[16px] font-bold text-white" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Save</span>
                  </button>
                </div>

                {/* Numeric Keyboard */}
                {showNumericKeyboard && shippingCostType === "flat" && (
                  <div className="bg-[#D1D5DB] px-1 pt-2 pb-1">
                    <div className="grid grid-cols-3 gap-[6px]">
                      {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "backspace"].map((key) => (
                        <button
                          key={key}
                          onClick={() => handleKeyPress(key)}
                          className={`h-[42px] rounded-[5px] flex items-center justify-center ${
                            key === "backspace" 
                              ? "bg-[#ADB5BD]" 
                              : "bg-white shadow-sm"
                          } active:bg-[#E5E5E5]`}
                        >
                          {key === "backspace" ? (
                            <svg className="w-6 h-6 text-[#191919]" viewBox="0 0 24 24" fill="none">
                              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="rotate(180 12 12)"/>
                              <path d="M19 6H9L4 12L9 18H19C20.1046 18 21 17.1046 21 16V8C21 6.89543 20.1046 6 19 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <line x1="12" y1="10" x2="16" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                              <line x1="16" y1="10" x2="12" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          ) : (
                            <span className="text-[22px] text-[#191919]">{key}</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Home Indicator */}
                <div className={`h-[34px] flex items-center justify-center ${showNumericKeyboard && shippingCostType === "flat" ? 'bg-[#D1D5DB]' : 'bg-white'}`}>
                  <div className="w-[134px] h-[5px] bg-[#191919] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================== */}
      {/* COUNTRY SELECTION SHEET                       */}
      {/* ============================================== */}
      {showCountrySheet && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
          <div className="relative w-[402px] h-[874px] bg-black rounded-[55px] p-3 shadow-2xl" style={{ pointerEvents: 'auto' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />
            <div className="relative w-full h-full rounded-[40px] overflow-hidden">
              <div className="absolute inset-0 bg-white/60 backdrop-blur-md" onClick={() => setShowCountrySheet(false)} />
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] shadow-[0_-5px_30px_rgba(0,0,0,0.12)]" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-center pt-[6px] pb-[6px]"><div className="w-8 h-1 bg-[#8F8F8F] rounded-full" /></div>
                <div className="flex items-center justify-between px-4 pt-2 pb-3">
                  <h3 className="text-[18px] font-bold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Country or region</h3>
                  <button onClick={() => setShowCountrySheet(false)} className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center"><X className="w-5 h-5 text-[#191919]" strokeWidth={2} /></button>
                </div>
                <div className="px-4 pt-1 pb-8 flex flex-col gap-2">
                  {["United States", "Canada", "Germany", "United Kingdom", "France"].map((country) => (
                    <button key={country} onClick={() => { setItemCountry(country); setShowCountrySheet(false) }} className={`w-full px-4 py-3 rounded-[8px] text-left ${itemCountry === country ? "bg-[#F7F7F7] border-2 border-[#191919]" : "bg-white border border-[#8F8F8F]"}`}>
                      <span className="text-[14px] text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{country}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DOMESTIC ALLOWED WITHIN SHEET */}
      {showDomesticAllowedWithinSheet && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
          <div className="relative w-[402px] h-[874px] bg-black rounded-[55px] p-3 shadow-2xl" style={{ pointerEvents: 'auto' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />
            <div className="relative w-full h-full rounded-[40px] overflow-hidden">
              <div className="absolute inset-0 bg-white/60 backdrop-blur-md" onClick={() => setShowDomesticAllowedWithinSheet(false)} />
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] shadow-[0_-5px_30px_rgba(0,0,0,0.12)]" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-center pt-[6px] pb-[6px]"><div className="w-8 h-1 bg-[#8F8F8F] rounded-full" /></div>
                <div className="flex items-center justify-between px-4 pt-2 pb-3">
                  <h3 className="text-[18px] font-bold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Allowed within</h3>
                  <button onClick={() => setShowDomesticAllowedWithinSheet(false)} className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center"><X className="w-5 h-5 text-[#191919]" strokeWidth={2} /></button>
                </div>
                <div className="px-4 pt-1 pb-8 flex flex-col gap-2">
                  {["14 days", "30 days", "60 days"].map((option) => (
                    <button key={option} onClick={() => { setDomesticAllowedWithin(option); setShowDomesticAllowedWithinSheet(false) }} className={`w-full px-4 py-3 rounded-[8px] text-left ${domesticAllowedWithin === option ? "bg-[#F7F7F7] border-2 border-[#191919]" : "bg-white border border-[#8F8F8F]"}`}>
                      <span className="text-[14px] text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{option}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DOMESTIC RETURNS PAID BY SHEET */}
      {showDomesticReturnsPaidBySheet && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
          <div className="relative w-[402px] h-[874px] bg-black rounded-[55px] p-3 shadow-2xl" style={{ pointerEvents: 'auto' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />
            <div className="relative w-full h-full rounded-[40px] overflow-hidden">
              <div className="absolute inset-0 bg-white/60 backdrop-blur-md" onClick={() => setShowDomesticReturnsPaidBySheet(false)} />
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] shadow-[0_-5px_30px_rgba(0,0,0,0.12)]" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-center pt-[6px] pb-[6px]"><div className="w-8 h-1 bg-[#8F8F8F] rounded-full" /></div>
                <div className="flex items-center justify-between px-4 pt-2 pb-3">
                  <h3 className="text-[18px] font-bold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Returns shipping paid by</h3>
                  <button onClick={() => setShowDomesticReturnsPaidBySheet(false)} className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center"><X className="w-5 h-5 text-[#191919]" strokeWidth={2} /></button>
                </div>
                <div className="px-4 pt-1 pb-8 flex flex-col gap-2">
                  {["Buyer", "Seller"].map((option) => (
                    <button key={option} onClick={() => { setDomesticReturnsPaidBy(option); setShowDomesticReturnsPaidBySheet(false) }} className={`w-full px-4 py-3 rounded-[8px] text-left ${domesticReturnsPaidBy === option ? "bg-[#F7F7F7] border-2 border-[#191919]" : "bg-white border border-[#8F8F8F]"}`}>
                      <span className="text-[14px] text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{option}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DOMESTIC REFUND METHOD SHEET */}
      {showDomesticRefundMethodSheet && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
          <div className="relative w-[402px] h-[874px] bg-black rounded-[55px] p-3 shadow-2xl" style={{ pointerEvents: 'auto' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />
            <div className="relative w-full h-full rounded-[40px] overflow-hidden">
              <div className="absolute inset-0 bg-white/60 backdrop-blur-md" onClick={() => setShowDomesticRefundMethodSheet(false)} />
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] shadow-[0_-5px_30px_rgba(0,0,0,0.12)]" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-center pt-[6px] pb-[6px]"><div className="w-8 h-1 bg-[#8F8F8F] rounded-full" /></div>
                <div className="flex items-center justify-between px-4 pt-2 pb-3">
                  <h3 className="text-[18px] font-bold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Refund method</h3>
                  <button onClick={() => setShowDomesticRefundMethodSheet(false)} className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center"><X className="w-5 h-5 text-[#191919]" strokeWidth={2} /></button>
                </div>
                <div className="px-4 pt-1 pb-8 flex flex-col gap-2">
                  {["Money back", "Exchange or replacement", "Store credit"].map((option) => (
                    <button key={option} onClick={() => { setDomesticRefundMethod(option); setShowDomesticRefundMethodSheet(false) }} className={`w-full px-4 py-3 rounded-[8px] text-left ${domesticRefundMethod === option ? "bg-[#F7F7F7] border-2 border-[#191919]" : "bg-white border border-[#8F8F8F]"}`}>
                      <span className="text-[14px] text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{option}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INTERNATIONAL ALLOWED WITHIN SHEET */}
      {showInternationalAllowedWithinSheet && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
          <div className="relative w-[402px] h-[874px] bg-black rounded-[55px] p-3 shadow-2xl" style={{ pointerEvents: 'auto' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />
            <div className="relative w-full h-full rounded-[40px] overflow-hidden">
              <div className="absolute inset-0 bg-white/60 backdrop-blur-md" onClick={() => setShowInternationalAllowedWithinSheet(false)} />
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] shadow-[0_-5px_30px_rgba(0,0,0,0.12)]" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-center pt-[6px] pb-[6px]"><div className="w-8 h-1 bg-[#8F8F8F] rounded-full" /></div>
                <div className="flex items-center justify-between px-4 pt-2 pb-3">
                  <h3 className="text-[18px] font-bold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Allowed within</h3>
                  <button onClick={() => setShowInternationalAllowedWithinSheet(false)} className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center"><X className="w-5 h-5 text-[#191919]" strokeWidth={2} /></button>
                </div>
                <div className="px-4 pt-1 pb-8 flex flex-col gap-2">
                  {["14 days", "30 days", "60 days"].map((option) => (
                    <button key={option} onClick={() => { setInternationalAllowedWithin(option); setShowInternationalAllowedWithinSheet(false) }} className={`w-full px-4 py-3 rounded-[8px] text-left ${internationalAllowedWithin === option ? "bg-[#F7F7F7] border-2 border-[#191919]" : "bg-white border border-[#8F8F8F]"}`}>
                      <span className="text-[14px] text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{option}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INTERNATIONAL RETURNS PAID BY SHEET */}
      {showInternationalReturnsPaidBySheet && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
          <div className="relative w-[402px] h-[874px] bg-black rounded-[55px] p-3 shadow-2xl" style={{ pointerEvents: 'auto' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />
            <div className="relative w-full h-full rounded-[40px] overflow-hidden">
              <div className="absolute inset-0 bg-white/60 backdrop-blur-md" onClick={() => setShowInternationalReturnsPaidBySheet(false)} />
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] shadow-[0_-5px_30px_rgba(0,0,0,0.12)]" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-center pt-[6px] pb-[6px]"><div className="w-8 h-1 bg-[#8F8F8F] rounded-full" /></div>
                <div className="flex items-center justify-between px-4 pt-2 pb-3">
                  <h3 className="text-[18px] font-bold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Returns shipping paid by</h3>
                  <button onClick={() => setShowInternationalReturnsPaidBySheet(false)} className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center"><X className="w-5 h-5 text-[#191919]" strokeWidth={2} /></button>
                </div>
                <div className="px-4 pt-1 pb-8 flex flex-col gap-2">
                  {["Buyer", "Seller"].map((option) => (
                    <button key={option} onClick={() => { setInternationalReturnsPaidBy(option); setShowInternationalReturnsPaidBySheet(false) }} className={`w-full px-4 py-3 rounded-[8px] text-left ${internationalReturnsPaidBy === option ? "bg-[#F7F7F7] border-2 border-[#191919]" : "bg-white border border-[#8F8F8F]"}`}>
                      <span className="text-[14px] text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{option}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INTERNATIONAL REFUND METHOD SHEET */}
      {showInternationalRefundMethodSheet && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
          <div className="relative w-[402px] h-[874px] bg-black rounded-[55px] p-3 shadow-2xl" style={{ pointerEvents: 'auto' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />
            <div className="relative w-full h-full rounded-[40px] overflow-hidden">
              <div className="absolute inset-0 bg-white/60 backdrop-blur-md" onClick={() => setShowInternationalRefundMethodSheet(false)} />
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] shadow-[0_-5px_30px_rgba(0,0,0,0.12)]" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-center pt-[6px] pb-[6px]"><div className="w-8 h-1 bg-[#8F8F8F] rounded-full" /></div>
                <div className="flex items-center justify-between px-4 pt-2 pb-3">
                  <h3 className="text-[18px] font-bold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Refund method</h3>
                  <button onClick={() => setShowInternationalRefundMethodSheet(false)} className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center"><X className="w-5 h-5 text-[#191919]" strokeWidth={2} /></button>
                </div>
                <div className="px-4 pt-1 pb-8 flex flex-col gap-2">
                  {["Money back", "Exchange or replacement", "Store credit"].map((option) => (
                    <button key={option} onClick={() => { setInternationalRefundMethod(option); setShowInternationalRefundMethodSheet(false) }} className={`w-full px-4 py-3 rounded-[8px] text-left ${internationalRefundMethod === option ? "bg-[#F7F7F7] border-2 border-[#191919]" : "bg-white border border-[#8F8F8F]"}`}>
                      <span className="text-[14px] text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{option}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

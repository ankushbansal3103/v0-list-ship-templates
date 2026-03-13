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
    deliveryDays: "X-X",
    protection: "$XXX.XX",
    dimensions: "Up to X lb., AA x BB x CC in.",
    priceRange: "$X.XX-$X.XX",
    recommended: true
  },
  {
    id: "fedex",
    name: "FedEx",
    deliveryDays: "X-X",
    protection: "$XXX.XX",
    dimensions: "Up to X lb., AA x BB x CC in.",
    priceRange: "$X.XX-$X.XX",
    recommended: false
  },
  {
    id: "ups",
    name: "UPS Ground",
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
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/USPS_Eagle_Symbol.svg/320px-USPS_Eagle_Symbol.svg.png"
        alt="USPS"
        className="w-[44px] h-[44px] object-contain"
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
  const [itemLocation, setItemLocation] = useState("95117")
  const [handlingTime, setHandlingTime] = useState("X business days")
  const [returns, setReturns] = useState("No returns allowed")
  const [showHandlingTimeSheet, setShowHandlingTimeSheet] = useState(false)
  
  const formatPackageDetails = () => {
    if (packageSizeType === "unknown") {
      return "Set your own shipping rate"
    }
    return `${weightLb} lb. ${weightOz} oz., ${dimensionA} x ${dimensionB} x ${dimensionC} in.`
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1a1a1a] p-4">
      {/* iPhone 17 Frame */}
      <div className={`relative w-[402px] h-[874px] bg-black rounded-[55px] p-3 shadow-2xl ${showPackageSheet || showDeliveryDetailsSheet ? 'invisible' : ''}`}>
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
              <div className="flex flex-col gap-2 mb-3">
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
                        <div className="w-[48px] h-[48px] flex items-center justify-center flex-shrink-0">
                          <ServiceLogo type={service.id} className="w-[44px] h-[44px]" />
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
              <button className="w-full h-[48px] border border-[#767676] rounded-full flex items-center justify-center mb-4">
                <span className="text-[14px] text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>View all services</span>
              </button>

              {/* Buyer Pays / Seller Pays Toggle */}
              <div className="flex justify-center mb-3">
                <div className="inline-flex bg-[#F7F7F7] rounded-full p-0.5">
                  <button
                    onClick={() => setPaymentType("buyer")}
                    className={`px-4 py-2 rounded-full text-[14px] font-medium transition-colors ${
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
                    className={`px-4 py-2 rounded-full text-[14px] font-medium transition-colors ${
                      paymentType === "seller"
                        ? "bg-[#191919] text-white"
                        : "bg-transparent text-[#191919]"
                    }`}
                    style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}
                  >
                    Seller pays
                  </button>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="flex flex-col items-center mb-4">
                <span className="text-[13px] text-[#707070]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>The buyer will pay:</span>
                <span className="text-[20px] font-bold text-[#191919] mt-0.5" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>$X.XX-$XX.XX</span>
                <span className="text-[13px] text-[#707070] mt-0.5" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Cost is based on buyer&apos;s location.</span>
                <button className="text-[13px] text-[#191919] underline mt-1" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>
                  Edit shipping cost
                </button>
              </div>

              {/* Additional Service */}
              <div>
                <span className="text-[13px] font-bold text-[#191919] block mb-2" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Additional service</span>
                <button className="w-full h-[48px] border border-[#767676] rounded-full flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4 text-[#191919]" />
                  <span className="text-[14px] text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Add additional service</span>
                </button>
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

              {/* Add International Service Button */}
              <button className="w-full h-[48px] border border-[#767676] rounded-full flex items-center justify-center gap-2">
                <Plus className="w-4 h-4 text-[#191919]" />
                <span className="text-[14px] text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Add international service</span>
              </button>
            </div>

            <div className="h-[1px] bg-[#E5E5E5] -mx-4" style={{ width: 'calc(100% + 32px)' }} />

            {/* Delivery Details Section */}
            <div className="py-5 pb-28">
              <h2 className="text-[14px] font-bold text-[#191919] mb-3" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Delivery details</h2>
              
              <button 
                onClick={() => setShowDeliveryDetailsSheet(true)}
                className="w-full p-4 bg-white border border-[#767676] rounded-[8px] flex"
              >
                <div className="flex flex-col gap-3 text-left flex-1">
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Item location</span>
                    <span className="text-[13px] text-[#707070]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Located at {itemLocation} (visible on listing)</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Handling time</span>
                    <span className="text-[13px] text-[#707070]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{handlingTime}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Returns</span>
                    <span className="text-[13px] text-[#707070]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{returns}</span>
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

              {/* Header */}
              <div className="h-[44px] px-4 flex items-center justify-between bg-white flex-shrink-0">
                <button onClick={() => setShowPackageSheet(false)} className="w-10 h-10 flex items-center justify-center">
                  <BackArrow className="w-6 h-6 text-[#191919]" />
                </button>
                <span className="text-[16px] font-bold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Package details</span>
                <div className="w-10 h-10" />
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-4 pt-4">
                <h3 className="text-[14px] font-bold text-[#191919] mb-3" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Select size type</h3>
                
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
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Dimensions (L x W x H)</label>
                      <div className="flex gap-2">
                        <div className="flex-1 h-[44px] bg-[#F7F7F7] border border-[#767676] rounded-[8px] flex items-center px-3">
                          <input type="text" value={dimensionA} onChange={(e) => setDimensionA(e.target.value)} className="flex-1 bg-transparent text-[14px] text-[#191919] outline-none text-center" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }} />
                        </div>
                        <span className="flex items-center text-[#707070]">x</span>
                        <div className="flex-1 h-[44px] bg-[#F7F7F7] border border-[#767676] rounded-[8px] flex items-center px-3">
                          <input type="text" value={dimensionB} onChange={(e) => setDimensionB(e.target.value)} className="flex-1 bg-transparent text-[14px] text-[#191919] outline-none text-center" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }} />
                        </div>
                        <span className="flex items-center text-[#707070]">x</span>
                        <div className="flex-1 h-[44px] bg-[#F7F7F7] border border-[#767676] rounded-[8px] flex items-center px-3">
                          <input type="text" value={dimensionC} onChange={(e) => setDimensionC(e.target.value)} className="flex-1 bg-transparent text-[14px] text-[#191919] outline-none text-center" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }} />
                        </div>
                        <span className="flex items-center text-[13px] text-[#707070]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>in.</span>
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
              {/* Status Bar */}
              <div className="h-[47px] px-6 flex items-end justify-between pb-1 bg-white flex-shrink-0">
                <span className="text-[15px] font-semibold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>9:41</span>
                <div className="flex items-center gap-[5px]">
                  <svg className="w-[17px] h-[11px]" viewBox="0 0 17 11"><rect x="0" y="7" width="3" height="4" rx="1" fill="#191919"/><rect x="4.5" y="5" width="3" height="6" rx="1" fill="#191919"/><rect x="9" y="2.5" width="3" height="8.5" rx="1" fill="#191919"/><rect x="13.5" y="0" width="3" height="11" rx="1" fill="#191919"/></svg>
                  <svg className="w-[15px] h-[11px]" viewBox="0 0 15 11"><path d="M7.5 10.5C8.33 10.5 9 9.83 9 9C9 8.17 8.33 7.5 7.5 7.5C6.67 7.5 6 8.17 6 9C6 9.83 6.67 10.5 7.5 10.5Z" fill="#191919"/><path d="M4.5 7C5.5 6 6.5 5.5 7.5 5.5C8.5 5.5 9.5 6 10.5 7" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/><path d="M2.5 4.5C4 3 5.5 2.5 7.5 2.5C9.5 2.5 11 3 12.5 4.5" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/><path d="M0.5 2C2.5 0.5 5 0 7.5 0C10 0 12.5 0.5 14.5 2" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/></svg>
                  <svg className="w-[25px] h-[12px]" viewBox="0 0 25 12"><rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="#191919" strokeOpacity="0.35"/><rect x="2" y="2" width="18" height="8" rx="1.5" fill="#191919"/><path d="M23 4V8C23.8 8 24 7 24 6C24 5 23.8 4 23 4Z" fill="#191919" fillOpacity="0.4"/></svg>
                </div>
              </div>

              {/* Header */}
              <div className="h-[44px] px-4 flex items-center justify-between bg-white flex-shrink-0">
                <button onClick={() => setShowDeliveryDetailsSheet(false)} className="w-10 h-10 flex items-center justify-center">
                  <BackArrow className="w-6 h-6 text-[#191919]" />
                </button>
                <span className="text-[16px] font-bold text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Delivery details</span>
                <div className="w-10 h-10" />
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-4 pt-4">
                {/* Item Location */}
                <div className="mb-5">
                  <h3 className="text-[14px] font-bold text-[#191919] mb-3" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Item location</h3>
                  <div className="h-[56px] bg-[#F7F7F7] border border-[#767676] rounded-[8px] flex flex-col justify-center px-3">
                    <span className="text-[12px] text-[#707070]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>ZIP code</span>
                    <input type="text" value={itemLocation} onChange={(e) => setItemLocation(e.target.value)} className="bg-transparent text-[14px] text-[#191919] outline-none" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }} />
                  </div>
                  <span className="text-[12px] text-[#707070] mt-1 block" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Visible on listing</span>
                </div>

                <div className="h-[1px] bg-[#E5E5E5] -mx-4 mb-5" style={{ width: 'calc(100% + 32px)' }} />

                {/* Handling Time */}
                <div className="mb-5">
                  <h3 className="text-[14px] font-bold text-[#191919] mb-3" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Handling time</h3>
                  <button onClick={() => setShowHandlingTimeSheet(true)} className="w-full h-[48px] px-4 bg-white border border-[#767676] rounded-[8px] flex items-center justify-between">
                    <span className="text-[14px] text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{handlingTime}</span>
                    <ChevronDown className="w-5 h-5 text-[#191919]" />
                  </button>
                </div>

                <div className="h-[1px] bg-[#E5E5E5] -mx-4 mb-5" style={{ width: 'calc(100% + 32px)' }} />

                {/* Returns */}
                <div className="pb-4">
                  <h3 className="text-[14px] font-bold text-[#191919] mb-3" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Returns</h3>
                  <div className="p-4 bg-[#F7F7F7] rounded-[8px]">
                    <span className="text-[14px] text-[#191919]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{returns}</span>
                  </div>
                </div>
              </div>

              <div className="h-[1px] bg-[#E5E5E5] w-full" />
              <div className="px-4 pb-3 pt-4 bg-white">
                <button onClick={() => setShowDeliveryDetailsSheet(false)} className="w-full h-[50px] bg-[#3665F3] rounded-full flex items-center justify-center active:bg-[#2d54d4]">
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
    </div>
  )
}

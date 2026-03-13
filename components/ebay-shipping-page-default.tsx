"use client"

/**
 * US-Shelby-Default Prototype
 * eBay Shipping Configuration Flow - Default Services View
 * 
 * Key difference from US-Shelby-AG:
 * - Domestic shipping shows multiple carrier options (USPS, FedEx, UPS Ground)
 * - Carriers displayed as selectable cards with "RECOMMENDED" badge
 * - "View all services" and "Add additional service" buttons
 * - Buyer pays / Seller pays toggle
 */

import { useState } from "react"
import { ChevronDown, ChevronRight, X, Plus } from "lucide-react"

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

// Shipping Only Icon (box)
function ShippingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="4" width="14" height="11" rx="1" stroke="#191919" strokeWidth="1.5" fill="none"/>
      <path d="M1 7h14" stroke="#191919" strokeWidth="1.5"/>
      <path d="M8 4V1M5 1h6" stroke="#191919" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

// Shipping or Pickup Icon (box with location marker)
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

// Pickup Only Icon (location marker)
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

// Back Arrow Icon
function BackArrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// Domestic shipping services
const domesticServices = [
  {
    id: "usps",
    name: "USPS",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/USPS_Eagle_symbol.svg/1200px-USPS_Eagle_symbol.svg.png",
    deliveryDays: "X-X",
    protection: "$XXX.XX",
    dimensions: "Up to X lb., AA x BB x CC in.",
    priceRange: "$X.XX-$X.XX",
    recommended: true
  },
  {
    id: "fedex",
    name: "FedEx",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/FedEx_Corporation_-_2016_Logo.svg/1280px-FedEx_Corporation_-_2016_Logo.svg.png",
    deliveryDays: "X-X",
    protection: "$XXX.XX",
    dimensions: "Up to X lb., AA x BB x CC in.",
    priceRange: "$X.XX-$X.XX",
    recommended: false
  },
  {
    id: "ups",
    name: "UPS Ground",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/United_Parcel_Service_logo_2014.svg/1280px-United_Parcel_Service_logo_2014.svg.png",
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

export function EbayShippingPageDefault() {
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
  const [length, setLength] = useState("A")
  const [width, setWidth] = useState("B")
  const [height, setHeight] = useState("C")
  
  // Delivery details state
  const [showDeliveryDetailsSheet, setShowDeliveryDetailsSheet] = useState(false)
  const [itemLocation, setItemLocation] = useState("95117")
  const [handlingTime, setHandlingTime] = useState("X business days")
  const [returns, setReturns] = useState("No returns allowed")
  
  // Format package details for display
  const formatPackageDetails = () => {
    return `${weightLb} lb. ${weightOz} oz., ${length} x ${width} x ${height} in.`
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1a1a1a] p-4">
      {/* iPhone 17 Frame - 402x874 logical resolution */}
      <div className={`relative w-[402px] h-[874px] bg-black rounded-[55px] p-3 shadow-2xl ${showPackageSheet || showDeliveryDetailsSheet ? 'invisible' : ''}`}>
        {/* Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />
        
        {/* Screen */}
        <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden flex flex-col">
          {/* iOS Status Bar */}
          <div className="h-[47px] px-6 flex items-end justify-between pb-1 bg-white flex-shrink-0">
            <span className="text-[15px] font-semibold text-[#191919]">9:41</span>
            <div className="flex items-center gap-[5px]">
              {/* Signal Bars */}
              <svg className="w-[17px] h-[11px]" viewBox="0 0 17 11">
                <rect x="0" y="7" width="3" height="4" rx="1" fill="#191919"/>
                <rect x="4.5" y="5" width="3" height="6" rx="1" fill="#191919"/>
                <rect x="9" y="2.5" width="3" height="8.5" rx="1" fill="#191919"/>
                <rect x="13.5" y="0" width="3" height="11" rx="1" fill="#191919"/>
              </svg>
              {/* WiFi */}
              <svg className="w-[15px] h-[11px]" viewBox="0 0 15 11">
                <path d="M7.5 10.5C8.33 10.5 9 9.83 9 9C9 8.17 8.33 7.5 7.5 7.5C6.67 7.5 6 8.17 6 9C6 9.83 6.67 10.5 7.5 10.5Z" fill="#191919"/>
                <path d="M4.5 7C5.5 6 6.5 5.5 7.5 5.5C8.5 5.5 9.5 6 10.5 7" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
                <path d="M2.5 4.5C4 3 5.5 2.5 7.5 2.5C9.5 2.5 11 3 12.5 4.5" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
                <path d="M0.5 2C2.5 0.5 5 0 7.5 0C10 0 12.5 0.5 14.5 2" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
              </svg>
              {/* Battery */}
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
            <div>
              <h1 className="text-[24px] font-bold text-[#191919] leading-[32px] mt-2 mb-6" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>
                Select delivery options
              </h1>
            </div>

            {/* Delivery Method Section */}
            <div className="pb-5">
              <h2 className="text-[16px] font-bold text-[#191919] leading-[24px] mb-4" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Delivery method</h2>
              <button 
                onClick={() => setShowDeliverySheet(true)}
                className="w-full h-[48px] px-4 bg-[#F7F7F7] border border-[#8F8F8F] rounded-[8px] flex items-center justify-between"
              >
                <span className="text-[14px] text-[#191919] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>
                  {deliveryMethods.find(m => m.id === deliveryMethod)?.label}
                </span>
                <ChevronDown className="w-4 h-4 text-[#191919]" />
              </button>
            </div>

            <div className="h-[1px] bg-[#E5E5E5] -mx-4" style={{ width: 'calc(100% + 32px)' }} />

            {/* Package Details Section */}
            <div className="py-5">
              <h2 className="text-[16px] font-bold text-[#191919] leading-[24px] mb-4" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Package details</h2>
              <button 
                onClick={() => setShowPackageSheet(true)}
                className="w-full px-4 py-3 bg-white border border-[#8F8F8F] rounded-[8px] flex items-center justify-between"
              >
                <div className="flex flex-col items-start">
                  <span className="text-[14px] text-[#191919] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{formatPackageDetails()}</span>
                  <span className="text-[14px] text-[#707070] leading-[20px] mt-0.5" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>
                    Estimated based on items like yours
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#191919]" />
              </button>
            </div>

            <div className="h-[1px] bg-[#E5E5E5] -mx-4" style={{ width: 'calc(100% + 32px)' }} />

            {/* Domestic Shipping Section */}
            <div className="py-5">
              <h2 className="text-[16px] font-bold text-[#191919] leading-[24px] mb-2" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Domestic shipping</h2>
              <span className="text-[14px] font-bold text-[#191919] leading-[20px] block mb-3" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Default service</span>
              
              {/* Service Cards */}
              <div className="flex flex-col gap-3 mb-3">
                {domesticServices.map((service) => {
                  const isSelected = selectedDomesticService === service.id
                  return (
                    <button
                      key={service.id}
                      onClick={() => setSelectedDomesticService(service.id)}
                      className={`w-full p-3 rounded-[8px] text-left ${
                        isSelected 
                          ? "bg-[#F7F7F7] border-2 border-[#191919]" 
                          : "bg-white border border-[#8F8F8F]"
                      }`}
                    >
                      <div className="flex gap-4 items-start">
                        {/* Logo */}
                        <div className="w-[56px] h-[56px] bg-white rounded-[8px] flex items-center justify-center flex-shrink-0 p-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={service.logoUrl}
                            alt={service.name}
                            className="w-[40px] h-[40px] object-contain"
                          />
                        </div>
                        {/* Content */}
                        <div className="flex flex-col flex-1 gap-1">
                          {/* Recommended Badge */}
                          {service.recommended && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-[#0968F6] w-fit">
                              <span className="text-[12px] text-[#0968F6] font-normal leading-[12px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>RECOMMENDED</span>
                            </span>
                          )}
                          <span className="text-[14px] font-bold text-[#191919] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>
                            {service.name}
                          </span>
                          <div className="text-[14px] text-[#707070] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>
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
              <button className="w-full h-[48px] border border-[#8F8F8F] rounded-full flex items-center justify-center mb-5">
                <span className="text-[14px] text-[#191919] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>View all services</span>
              </button>

              {/* Buyer Pays / Seller Pays Toggle */}
              <div className="flex justify-center mb-4">
                <div className="inline-flex bg-[#E5E5E5] rounded-full p-1">
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
                <span className="text-[14px] text-[#707070] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>The buyer will pay:</span>
                <span className="text-[18px] font-bold text-[#191919] mt-1" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>$X.XX-$XX.XX</span>
                <span className="text-[14px] text-[#707070] mt-1" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Cost is based on buyer&apos;s location.</span>
                <button className="text-[14px] text-[#191919] underline mt-1" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>
                  Edit shipping cost
                </button>
              </div>

              {/* Additional Service */}
              <div className="mb-2">
                <span className="text-[14px] font-bold text-[#191919] block mb-3" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Additional service</span>
                <button className="w-full h-[48px] border border-[#8F8F8F] rounded-full flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4 text-[#191919]" />
                  <span className="text-[14px] text-[#191919] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Add additional service</span>
                </button>
              </div>
            </div>

            <div className="h-[1px] bg-[#E5E5E5] -mx-4" style={{ width: 'calc(100% + 32px)' }} />

            {/* International Shipping Section */}
            <div className="py-5">
              <div className="mb-1">
                <h2 className="text-[16px] font-bold text-[#191919] leading-[24px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>International shipping</h2>
                <span className="text-[14px] text-[#707070] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>
                  <button className="underline text-[#191919]">Fees</button> apply for international sales.
                </span>
              </div>

              {/* Destination Dropdown */}
              <div className="mt-4 mb-3">
                <button 
                  onClick={() => setShowDestinationSheet(true)}
                  className="w-full px-4 py-2.5 bg-white border border-[#8F8F8F] rounded-[8px] flex items-center justify-between"
                >
                  <div className="flex flex-col items-start">
                    <span className="text-[14px] text-[#707070] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Destination</span>
                    <span className="text-[14px] text-[#191919] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{destinations.find(d => d.id === destination)?.label || destination}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-[#191919]" />
                </button>
              </div>

              {/* Add International Service Button */}
              <button className="w-full h-[48px] border border-[#8F8F8F] rounded-full flex items-center justify-center gap-2">
                <Plus className="w-4 h-4 text-[#191919]" />
                <span className="text-[14px] text-[#191919] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Add international service</span>
              </button>
            </div>

            <div className="h-[1px] bg-[#E5E5E5] -mx-4" style={{ width: 'calc(100% + 32px)' }} />

            {/* Delivery Details Section */}
            <div className="py-5 pb-28">
              <h2 className="text-[16px] font-bold text-[#191919] leading-[24px] mb-4" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Delivery details</h2>
              
              <button 
                onClick={() => setShowDeliveryDetailsSheet(true)}
                className="w-full p-4 bg-white border border-[#8F8F8F] rounded-[8px] flex"
              >
                <div className="flex flex-col gap-3 text-left flex-1">
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#191919] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Item location</span>
                    <span className="text-[14px] text-[#707070] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Located at {itemLocation} (visible on listing)</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#191919] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Handling time</span>
                    <span className="text-[14px] text-[#707070] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{handlingTime}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#191919] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Returns</span>
                    <span className="text-[14px] text-[#707070] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>{returns}</span>
                  </div>
                </div>
                <div className="flex items-center pl-3">
                  <ChevronRight className="w-4 h-4 text-[#191919] flex-shrink-0" />
                </div>
              </button>
            </div>
          </div>

          {/* Fixed Bottom Button */}
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-9 pt-3 bg-white">
            <button className="w-full h-[48px] bg-[#3665F3] rounded-full flex items-center justify-center active:bg-[#2d54d4]">
              <span className="text-[15px] font-bold text-white" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Continue</span>
            </button>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#191919] rounded-full" />
        </div>
      </div>

      {/* Delivery Method Bottom Sheet Modal */}
      {showDeliverySheet && (
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ pointerEvents: 'none' }}
        >
          <div className="relative w-[402px] h-[874px] bg-black rounded-[55px] p-3 shadow-2xl" style={{ pointerEvents: 'auto' }}>
            {/* Dynamic Island */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />
            
            {/* Screen with scrim */}
            <div className="relative w-full h-full rounded-[40px] overflow-hidden">
              {/* Scrim overlay */}
              <div 
                className="absolute inset-0 bg-white/[0.6] backdrop-blur-md"
                onClick={() => setShowDeliverySheet(false)}
              />
              {/* Sheet content */}
              <div 
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] overflow-hidden shadow-[0_-5px_30px_rgba(0,0,0,0.12)]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Drag handle */}
                <div className="flex justify-center pt-[6px] pb-[6px]">
                  <div className="w-8 h-1 bg-[#8F8F8F] rounded-full" />
                </div>
                
                {/* Header */}
                <div className="flex items-center justify-between px-4 pt-2 pb-3">
                  <h3 className="text-[18px] font-bold text-[#191919] leading-[24px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Delivery method</h3>
                  <button 
                    onClick={() => setShowDeliverySheet(false)}
                    className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center"
                  >
                    <X className="w-5 h-5 text-[#191919]" strokeWidth={2} />
                  </button>
                </div>
                
                {/* Options */}
                <div className="px-4 pt-1 pb-8 flex flex-col gap-3">
                  {deliveryMethods.map((method) => {
                    const isSelected = deliveryMethod === method.id
                    return (
                      <button
                        key={method.id}
                        onClick={() => {
                          setDeliveryMethod(method.id)
                          setShowDeliverySheet(false)
                        }}
                        className={`w-full px-3 py-3 rounded-[8px] text-left flex gap-3 ${
                          isSelected 
                            ? "bg-[#F7F7F7] border-2 border-[#191919]" 
                            : "bg-white border border-[#8F8F8F]"
                        }`}
                      >
                        <div className="pt-0.5">
                          <DeliveryMethodIcon type={method.icon} className="w-[18px] h-[18px]" />
                        </div>
                        <div className="flex flex-col flex-1">
                          <span className="text-[14px] font-bold text-[#191919] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>
                            {method.label}
                          </span>
                          <span className={`text-[14px] leading-[20px] mt-0.5 ${isSelected ? 'text-[#191919]' : 'text-[#707070]'}`} style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>
                            {method.description}
                          </span>
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

      {/* Destination Bottom Sheet Modal */}
      {showDestinationSheet && (
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ pointerEvents: 'none' }}
        >
          <div className="relative w-[402px] h-[874px] bg-black rounded-[55px] p-3 shadow-2xl" style={{ pointerEvents: 'auto' }}>
            {/* Dynamic Island */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />
            
            {/* Screen with scrim */}
            <div className="relative w-full h-full rounded-[40px] overflow-hidden">
              {/* Scrim overlay */}
              <div 
                className="absolute inset-0 bg-white/[0.6] backdrop-blur-md"
                onClick={() => setShowDestinationSheet(false)}
              />
              {/* Sheet content */}
              <div 
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] overflow-hidden shadow-[0_-5px_30px_rgba(0,0,0,0.12)]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Drag handle */}
                <div className="flex justify-center pt-[6px] pb-[6px]">
                  <div className="w-8 h-1 bg-[#8F8F8F] rounded-full" />
                </div>
                
                {/* Header */}
                <div className="flex items-center justify-between px-4 pt-2 pb-3">
                  <h3 className="text-[18px] font-bold text-[#191919] leading-[24px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>Destination</h3>
                  <button 
                    onClick={() => setShowDestinationSheet(false)}
                    className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center"
                  >
                    <X className="w-5 h-5 text-[#191919]" strokeWidth={2} />
                  </button>
                </div>
                
                {/* Options */}
                <div className="px-4 pt-1 pb-8 flex flex-col gap-3">
                  {destinations.map((dest) => {
                    const isSelected = destination === dest.id
                    return (
                      <button
                        key={dest.id}
                        onClick={() => {
                          setDestination(dest.id)
                          setShowDestinationSheet(false)
                        }}
                        className={`w-full px-3 py-3 rounded-[8px] text-left ${
                          isSelected 
                            ? "bg-[#F7F7F7] border-2 border-[#191919]" 
                            : "bg-white border border-[#8F8F8F]"
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="text-[14px] font-bold text-[#191919] leading-[20px]" style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>
                            {dest.label}
                          </span>
                          <span className={`text-[14px] leading-[20px] mt-0.5 ${isSelected ? 'text-[#191919]' : 'text-[#707070]'}`} style={{ fontFamily: "'Market Sans', system-ui, sans-serif" }}>
                            {dest.description}
                          </span>
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
    </div>
  )
}

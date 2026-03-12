"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, X } from "lucide-react"

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
    label: "Pickup only",
    description: "Arrange local pickup without any shipping costs.",
    icon: "pickup"
  },
]

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

// Checkmark Circle Icon - Blue outline style
function CheckCircle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#3665F3" strokeWidth="1.5" fill="none"/>
      <path d="M7.5 12L10.5 15L16.5 9" stroke="#3665F3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// Back Arrow Icon
function BackArrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// Service Logo Component
function ServiceLogo({ type, className }: { type: string; className?: string }) {
  switch (type) {
    case "mondial-relay":
      return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
          <div className="flex items-center gap-0.5">
            <div className="w-3 h-3 bg-[#E4002B] rounded-sm flex items-center justify-center">
              <span className="text-white text-[6px] font-bold">R</span>
            </div>
            <span className="text-[8px] font-bold text-[#E4002B]">Mondial</span>
          </div>
          <span className="text-[8px] font-bold text-[#E4002B]">Relay</span>
        </div>
      )
    case "colissimo":
      return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
          <svg viewBox="0 0 40 40" className="w-8 h-8">
            <rect x="8" y="12" width="24" height="18" rx="2" fill="#F5A623"/>
            <rect x="12" y="8" width="16" height="8" fill="#F5A623"/>
            <path d="M12 8L20 2L28 8" stroke="#F5A623" strokeWidth="2" fill="none"/>
          </svg>
          <span className="text-[7px] font-bold text-[#0055A4]">colissimo</span>
        </div>
      )
    case "chronopost":
      return (
        <div className={`flex items-center gap-0.5 ${className}`}>
          <svg viewBox="0 0 16 16" className="w-3 h-3">
            <circle cx="8" cy="8" r="7" fill="#0055A4"/>
            <path d="M8 4V8L11 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          </svg>
          <span className="text-[7px] font-bold text-[#0055A4]">chronopost</span>
        </div>
      )
    case "dhl":
      return (
        <div className={`flex items-center justify-center ${className}`}>
          <div className="bg-[#FFCC00] px-1.5 py-0.5 rounded-sm">
            <span className="text-[10px] font-black text-[#D40511]">DHL</span>
          </div>
        </div>
      )
    case "ups":
      return (
        <div className={`flex items-center justify-center ${className}`}>
          <div className="bg-[#351C15] px-1.5 py-1 rounded-t-full">
            <span className="text-[9px] font-black text-[#FFB500]">UPS</span>
          </div>
        </div>
      )
    case "dpd":
      return (
        <div className={`flex items-center justify-center ${className}`}>
          <span className="text-[12px] font-black text-[#DC0032]">dpd</span>
        </div>
      )
    case "fedex":
      return (
        <div className={`flex items-center justify-center ${className}`}>
          <span className="text-[10px] font-bold">
            <span className="text-[#4D148C]">Fed</span>
            <span className="text-[#FF6600]">Ex</span>
          </span>
        </div>
      )
    default:
      return null
  }
}

export function EbayShippingPage() {
  const [deliveryMethod, setDeliveryMethod] = useState("shipping")
  const [showDeliverySheet, setShowDeliverySheet] = useState(false)
  const [destination, setDestination] = useState("eu")
  const [showDestinationSheet, setShowDestinationSheet] = useState(false)
  
  // Package details state
  const [showPackageSheet, setShowPackageSheet] = useState(false)
  const [packageSizeType, setPackageSizeType] = useState<"custom" | "unknown">("custom")
  const [weightKg, setWeightKg] = useState("2")
  const [weightG, setWeightG] = useState("0")
  const [length, setLength] = useState("14")
  const [width, setWidth] = useState("12")
  const [height, setHeight] = useState("9")
  const [irregularPackage, setIrregularPackage] = useState(false)
  
  // International services state
  const [showServicesSheet, setShowServicesSheet] = useState(false)
  const [selectedService, setSelectedService] = useState("colissimo")
  
  // Shipping cost state
  const [showShippingCostSheet, setShowShippingCostSheet] = useState(false)
  const [shippingCost, setShippingCost] = useState("5,99")
  const [showNumericKeyboard, setShowNumericKeyboard] = useState(false)
  
  // Handle numeric keyboard input
  const handleKeyPress = (key: string) => {
    if (key === "backspace") {
      setShippingCost(prev => prev.slice(0, -1) || "0")
    } else if (key === ",") {
      if (!shippingCost.includes(",")) {
        setShippingCost(prev => prev + ",")
      }
    } else {
      setShippingCost(prev => prev === "0" ? key : prev + key)
    }
  }
  
  // International shipping services data
  const internationalServices = [
    {
      id: "mondial-relay-1",
      name: "Modial Relay",
      logoType: "mondial-relay",
      deliveryDays: "5-8",
      maxWeight: "30",
      tracking: true,
      price: "4,99",
      group: 1
    },
    {
      id: "colissimo",
      name: "Colissimo",
      logoType: "colissimo",
      deliveryDays: "3-5",
      maxWeight: "30",
      tracking: true,
      price: "8,99",
      group: 1
    },
    {
      id: "chronopost",
      name: "Chronopost",
      logoType: "chronopost",
      deliveryDays: "1-2",
      maxWeight: "30",
      tracking: true,
      price: "15,99",
      group: 1
    },
    {
      id: "mondial-relay-2",
      name: "Modial Relay",
      logoType: "mondial-relay",
      deliveryDays: "7-10",
      maxWeight: "20",
      tracking: true,
      price: "3,49",
      group: 2
    },
    {
      id: "dhl",
      name: "DHL Express",
      logoType: "dhl",
      deliveryDays: "2-4",
      maxWeight: "50",
      tracking: true,
      price: "19,99",
      group: 2
    },
    {
      id: "ups",
      name: "UPS Standard",
      logoType: "ups",
      deliveryDays: "3-6",
      maxWeight: "40",
      tracking: true,
      price: "12,99",
      group: 2
    },
    {
      id: "dpd",
      name: "DPD Classic",
      logoType: "dpd",
      deliveryDays: "4-7",
      maxWeight: "31.5",
      tracking: true,
      price: "6,99",
      group: 2
    }
  ]
  
  // Get selected service for L1 display
  const getSelectedService = () => {
    return internationalServices.find(s => s.id === selectedService)
  }

  const destinations = [
    { 
      id: "eu", 
      label: "European Union",
      description: "Easy selling in the EU with uniform costs and no customs or import charges."
    },
    { 
      id: "worldwide", 
      label: "Worldwide",
      description: "Shipping costs are dependent on buyer location. Customs and import charges may apply."
    },
  ]
  
  // Format package details for display - show actual values from L2
  const formatPackageDetails = () => {
    if (packageSizeType === "unknown") {
      return "Set your own shipping rate"
    }
    return `${weightKg} kg. ${weightG} g., ${length} x ${width} x ${height} cm.`
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1a1a1a] p-4">
      {/* iPhone 17 Frame - 402x874 logical resolution */}
      {/* Hide L1 when full-screen sheets are shown to prevent double frame/island */}
      <div className={`relative w-[402px] h-[874px] bg-black rounded-[55px] p-3 shadow-2xl ${showPackageSheet || showServicesSheet || showShippingCostSheet ? 'invisible' : ''}`}>
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
              <h1 className="text-[22px] font-bold text-[#191919] leading-tight mt-2 mb-6">
                Select delivery options
              </h1>
            </div>

            {/* Delivery Method Section */}
            <div className="pb-5">
              <h2 className="text-[14px] font-bold text-[#191919] mb-3">Delivery method</h2>
              <button 
                onClick={() => setShowDeliverySheet(true)}
                className="w-full h-[48px] px-4 bg-white border border-[#767676] rounded-[16px] flex items-center justify-between"
              >
                <span className="text-[14px] text-[#191919]">
                  {deliveryMethods.find(m => m.id === deliveryMethod)?.label}
                </span>
                <ChevronDown className="w-5 h-5 text-[#191919]" />
              </button>
            </div>

            <div className="h-[1px] bg-[#E5E5E5] -mx-4" style={{ width: 'calc(100% + 32px)' }} />

            {/* Package Details Section */}
            <div className="py-5">
              <h2 className="text-[14px] font-bold text-[#191919] mb-3">Package details</h2>
              <button 
                onClick={() => setShowPackageSheet(true)}
                className="w-full px-4 py-3 bg-white border border-[#767676] rounded-[16px] flex items-center justify-between"
              >
                <div className="flex flex-col items-start">
                  <span className="text-[14px] text-[#191919]">{formatPackageDetails()}</span>
                  <span className="text-[12px] text-[#707070] mt-0.5">
                    {packageSizeType === "custom" ? "Custom size" : "I don't know size"}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#191919]" />
              </button>
            </div>

            <div className="h-[1px] bg-[#E5E5E5] -mx-4" style={{ width: 'calc(100% + 32px)' }} />

            {/* Domestic Shipping Section */}
            <div className="py-5">
              <h2 className="text-[14px] font-bold text-[#191919] mb-4">Domestic shipping</h2>
              
              {/* Authenticity Guarantee Notice - Grey background */}
              <div className="p-3 bg-[#F7F7F7] rounded-[16px] mb-4">
                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0" />
                  <div className="flex flex-col gap-2">
                    <p className="text-[13px] text-[#191919] leading-[1.5]">
                      This item is eligible for Authenticity Guarantee. An authenticator will verify the eligible item is authentic and matches the listing&apos;s details.
                    </p>
                    <button className="text-[13px] text-[#191919] underline text-left font-medium">
                      How it works
                    </button>
                  </div>
                </div>
              </div>

              {/* eBay shipping powered by FedEx Card */}
              <div className="w-full p-4 bg-white border border-[#E5E5E5] rounded-[16px]">
                <div className="flex gap-3 items-center">
                  <div className="w-[44px] h-[20px] flex items-center justify-center flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/FedEx_Corporation_-_2016_Logo.svg/1280px-FedEx_Corporation_-_2016_Logo.svg.png"
                      alt="FedEx"
                      className="w-[44px] h-auto object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#191919] leading-tight">
                      eBay shipping powered by FedEx
                    </span>
                    <span className="text-[13px] text-[#707070] mt-0.5">
                      Free shipping label provided to you
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[1px] bg-[#E5E5E5] -mx-4" style={{ width: 'calc(100% + 32px)' }} />

            {/* International Shipping Section */}
            <div className="py-5">
              <h2 className="text-[14px] font-bold text-[#191919] mb-4">International shipping</h2>
              
              {/* Default Service */}
              <div className="mb-5">
                <span className="text-[13px] font-bold text-[#191919] mb-2 block">Default service</span>
                
                {/* eBay International Shipping Card - Selected state with dark border and grey bg */}
                <div className="w-full p-3 bg-[#F7F7F7] border-2 border-[#191919] rounded-[16px]">
                  <div className="flex gap-3 items-start">
                    <div className="w-[44px] h-[28px] bg-[#F7F7F7] rounded-[6px] flex items-center justify-center flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/EBay_logo.svg/2560px-EBay_logo.svg.png"
                        alt="eBay"
                        className="w-[32px] h-auto object-contain"
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-[14px] font-bold text-[#191919] leading-tight">
                        eBay International Shipping
                      </span>
                      <p className="text-[13px] text-[#191919] mt-1 leading-[1.4]">
                        Send items to our domestic shipping hub and we&apos;ll handle the rest—at no extra cost.
                      </p>
                      <button className="text-[13px] text-[#191919] underline text-left font-medium mt-2">
                        How it works
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Service */}
              <div className="mb-3">
                <span className="text-[13px] font-bold text-[#191919] block">Additional service</span>
                <span className="text-[13px] text-[#707070]">
                  <button className="underline text-[#3665F3]">Fees</button> apply for international sales.
                </span>
              </div>

              {/* Destination Dropdown */}
              <div className="mb-3">
                <button 
                  onClick={() => setShowDestinationSheet(true)}
                  className="w-full px-4 py-2.5 bg-white border border-[#767676] rounded-[16px] flex items-center justify-between"
                >
                  <div className="flex flex-col items-start">
                    <span className="text-[11px] text-[#707070] leading-tight">Destination</span>
                    <span className="text-[14px] text-[#191919] leading-snug">{destinations.find(d => d.id === destination)?.label || destination}</span>
                  </div>
                  <ChevronDown className="w-5 h-5 text-[#191919]" />
                </button>
              </div>

              {/* Selected Service Card */}
              {(() => {
                const service = getSelectedService()
                if (!service) return null
                return (
                  <div className="w-full p-3 bg-white border border-[#E5E5E5] rounded-[16px] mb-3">
                    <div className="flex gap-3 items-start">
                      <div className="w-[44px] h-[44px] bg-[#F7F7F7] rounded-[8px] flex items-center justify-center flex-shrink-0">
                        <ServiceLogo type={service.logoType} />
                      </div>
                      <div className="flex flex-col flex-1">
                        <span className="text-[14px] font-bold text-[#191919] leading-tight">
                          {service.name}
                        </span>
                        <div className="text-[13px] text-[#707070] mt-0.5 leading-[1.4]">
                          <div>{service.deliveryDays} business days</div>
                          <div>Up to {service.maxWeight} lb.</div>
                          <div>{service.tracking ? "Tracking included" : "No tracking"}</div>
                          <div>{service.price} €</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}

              {/* View All Services Button */}
              <button 
                onClick={() => setShowServicesSheet(true)}
                className="w-full h-[44px] border border-[#767676] rounded-full flex items-center justify-center"
              >
                <span className="text-[14px] text-[#191919]">View all services</span>
              </button>
            </div>

            <div className="h-[1px] bg-[#E5E5E5] -mx-4" style={{ width: 'calc(100% + 32px)' }} />

            {/* Buyer Payment Info - Card with grey background */}
            <div className="py-5">
              <div className="flex flex-col items-center py-4 bg-[#F7F7F7] rounded-[16px]">
                <span className="text-[13px] text-[#707070]">The buyer will pay:</span>
                <span className="text-[18px] font-bold text-[#191919] mt-1">$X.XX–$XX.XX</span>
                <span className="text-[13px] text-[#707070] mt-1">Cost is based on buyer&apos;s location.</span>
                <button 
                  onClick={() => setShowShippingCostSheet(true)}
                  className="text-[13px] text-[#191919] underline mt-1"
                >
                  Edit shipping cost
                </button>
              </div>
            </div>

            <div className="h-[1px] bg-[#E5E5E5] -mx-4" style={{ width: 'calc(100% + 32px)' }} />

            {/* Delivery Details Section */}
            <div className="py-5 pb-28">
              <h2 className="text-[14px] font-bold text-[#191919] mb-3">Delivery details</h2>
              
              <button className="w-full p-4 bg-white border border-[#767676] rounded-[16px] flex">
                <div className="flex flex-col gap-4 text-left flex-1">
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#191919]">Item location</span>
                    <span className="text-[13px] text-[#707070]">Located at 95117 (visible on listing)</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#191919]">Handling time</span>
                    <span className="text-[13px] text-[#707070]">X business days</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#191919]">Domestic returns</span>
                    <span className="text-[13px] text-[#707070]">14 Days, Buyer, Money back</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#191919]">eBay International Shipping returns</span>
                    <span className="text-[13px] text-[#707070]">30 Days, eBay handles on your behalf</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#191919]">International returns</span>
                    <span className="text-[13px] text-[#707070]">14 Days, Buyer, Money back</span>
                  </div>
                </div>
                <div className="flex items-center pl-3">
                  <ChevronRight className="w-5 h-5 text-[#191919] flex-shrink-0" />
                </div>
              </button>
            </div>
          </div>

          {/* Fixed Bottom Button */}
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-9 pt-3 bg-white">
            <button className="w-full h-[48px] bg-[#3665F3] rounded-full flex items-center justify-center active:bg-[#2d54d4]">
              <span className="text-[15px] font-bold text-white">Continue</span>
            </button>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#191919] rounded-full" />
        </div>
      </div>

      {/* Delivery Method Bottom Sheet */}
      {showDeliverySheet && (
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ pointerEvents: 'none' }}
        >
          <div className="relative w-[402px] h-[874px]" style={{ pointerEvents: 'auto' }}>
            {/* Scrim overlay - 32% opacity as per Figma */}
            <div 
              className="absolute inset-0 bg-black/[0.32] rounded-[55px]"
              onClick={() => setShowDeliverySheet(false)}
            />
            {/* Sheet content */}
            <div 
              className="absolute bottom-3 left-3 right-3 bg-white rounded-t-[38px] rounded-b-[40px] overflow-hidden shadow-[0_15px_75px_rgba(0,0,0,0.18)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-[6px] pb-[6px]">
                <div className="w-8 h-1 bg-[#8F8F8F] rounded-full" />
              </div>
              
              {/* Header */}
              <div className="flex items-center justify-between px-4 pt-2 pb-3">
                <h3 className="text-[18px] font-bold text-[#191919] leading-[24px]">Delivery method</h3>
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
                        <span className="text-[14px] font-bold text-[#191919] leading-[20px]">
                          {method.label}
                        </span>
                        <span className={`text-[13px] leading-[18px] mt-0.5 ${isSelected ? 'text-[#191919]' : 'text-[#707070]'}`}>
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
      )}

      {/* Package Details Full Screen Sheet */}
      {showPackageSheet && (
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ pointerEvents: 'none' }}
        >
          {/* iPhone Frame - identical to L1 */}
          <div className="relative w-[402px] h-[874px] bg-black rounded-[55px] p-3 shadow-2xl" style={{ pointerEvents: 'auto' }}>
            {/* Dynamic Island - same as L1 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />
            
            {/* Screen - same as L1 */}
            <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden flex flex-col">
              {/* iOS Status Bar */}
              <div className="h-[47px] px-6 flex items-end justify-between pb-1 bg-white flex-shrink-0">
                <span className="text-[15px] font-semibold text-[#191919]">9:41</span>
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

              {/* Navigation Header - Just back button */}
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
                <h1 className="text-[22px] font-bold text-[#191919] leading-[28px] mt-2 mb-6">
                  Package details
                </h1>

                {/* Custom Size Option */}
                <button 
                  onClick={() => setPackageSizeType("custom")}
                  className="flex gap-3 items-start w-full text-left"
                >
                  {/* Radio Button */}
                  <div className="w-[20px] h-[20px] flex-shrink-0 mt-0.5">
                    {packageSizeType === "custom" ? (
                      <svg viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="9" stroke="#191919" strokeWidth="2"/>
                        <circle cx="10" cy="10" r="5" fill="#191919"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="9" stroke="#767676" strokeWidth="2"/>
                      </svg>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#191919] leading-[20px]">Custom size</span>
                    <span className="text-[13px] text-[#707070] leading-[18px]">Enter the weight and dimensions</span>
                  </div>
                </button>

                {/* Custom Size Form - Only show when custom is selected */}
                {packageSizeType === "custom" && (
                  <div className="flex flex-col gap-4 mt-5">
                    {/* Weight */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] text-[#191919] leading-[18px]">Weight</label>
                      <div className="flex gap-2">
                        <div className="w-[calc(50%-4px)] h-[44px] bg-[#F7F7F7] border border-[#767676] rounded-[8px] flex items-center px-3">
                          <input 
                            type="text" 
                            value={weightKg}
                            onChange={(e) => setWeightKg(e.target.value)}
                            className="flex-1 bg-transparent text-[14px] text-[#191919] outline-none min-w-0"
                          />
                          <span className="text-[13px] text-[#707070] ml-1">kg.</span>
                        </div>
                        <div className="w-[calc(50%-4px)] h-[44px] bg-[#F7F7F7] border border-[#767676] rounded-[8px] flex items-center px-3">
                          <input 
                            type="text" 
                            value={weightG}
                            onChange={(e) => setWeightG(e.target.value)}
                            className="flex-1 bg-transparent text-[14px] text-[#191919] outline-none min-w-0"
                          />
                          <span className="text-[13px] text-[#707070] ml-1">g.</span>
                        </div>
                      </div>
                    </div>

                    {/* Length */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] text-[#191919] leading-[18px]">Length</label>
                      <div className="h-[44px] bg-[#F7F7F7] border border-[#767676] rounded-[8px] flex items-center px-3">
                        <input 
                          type="text" 
                          value={length}
                          onChange={(e) => setLength(e.target.value)}
                          className="flex-1 bg-transparent text-[14px] text-[#191919] outline-none"
                        />
                        <span className="text-[13px] text-[#707070]">cm.</span>
                      </div>
                    </div>

                    {/* Width */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] text-[#191919] leading-[18px]">Width</label>
                      <div className="h-[44px] bg-[#F7F7F7] border border-[#767676] rounded-[8px] flex items-center px-3">
                        <input 
                          type="text" 
                          value={width}
                          onChange={(e) => setWidth(e.target.value)}
                          className="flex-1 bg-transparent text-[14px] text-[#191919] outline-none"
                        />
                        <span className="text-[13px] text-[#707070]">cm.</span>
                      </div>
                    </div>

                    {/* Height */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] text-[#191919] leading-[18px]">Height</label>
                      <div className="h-[44px] bg-[#F7F7F7] border border-[#767676] rounded-[8px] flex items-center px-3">
                        <input 
                          type="text" 
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          className="flex-1 bg-transparent text-[14px] text-[#191919] outline-none"
                        />
                        <span className="text-[13px] text-[#707070]">cm.</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* I don't know size Option */}
                <button 
                  onClick={() => setPackageSizeType("unknown")}
                  className="flex gap-3 items-start w-full text-left mt-5"
                >
                  <div className="w-[20px] h-[20px] flex-shrink-0 mt-0.5">
                    {packageSizeType === "unknown" ? (
                      <svg viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="9" stroke="#191919" strokeWidth="2"/>
                        <circle cx="10" cy="10" r="5" fill="#191919"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="9" stroke="#767676" strokeWidth="2"/>
                      </svg>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#191919] leading-[20px]">I don&apos;t know size</span>
                    <span className="text-[13px] text-[#707070] leading-[18px]">Set your own shipping rate</span>
                  </div>
                </button>

                {/* Separator */}
                <div className="h-[1px] bg-[#E5E5E5] -mx-4 mt-5 mb-4" style={{ width: 'calc(100% + 32px)' }} />

                {/* Irregular Package Toggle */}
                <div className="flex items-start justify-between">
                  <div className="flex flex-col flex-1 pr-4">
                    <span className="text-[14px] font-bold text-[#191919] leading-[20px]">Irregular package</span>
                    <span className="text-[13px] text-[#707070] leading-[18px] mt-0.5">
                      Carriers may charge extra for items not shipped in standard packages.
                    </span>
                    <button className="text-[13px] text-[#191919] underline text-left mt-1">
                      Learn more
                    </button>
                  </div>
                  {/* Toggle Switch */}
                  <button 
                    onClick={() => setIrregularPackage(!irregularPackage)}
                    className={`w-[51px] h-[31px] rounded-full flex-shrink-0 p-[2px] transition-colors ${
                      irregularPackage ? 'bg-[#34C759]' : 'bg-[#E5E5E5]'
                    }`}
                  >
                    <div className={`w-[27px] h-[27px] bg-white rounded-full shadow-md transition-transform ${
                      irregularPackage ? 'translate-x-[20px]' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              </div>

              {/* Separator above Save button */}
              <div className="h-[1px] bg-[#E5E5E5] w-full" />

              {/* Fixed Bottom Save Button */}
              <div className="px-4 pb-3 pt-4 bg-white">
                <button 
                  onClick={() => setShowPackageSheet(false)}
                  className="w-full h-[50px] bg-[#3665F3] rounded-full flex items-center justify-center active:bg-[#2d54d4]"
                >
                  <span className="text-[16px] font-bold text-white">Save</span>
                </button>
              </div>

              {/* Home Indicator */}
              <div className="h-[34px] flex items-center justify-center bg-white">
                <div className="w-[134px] h-[5px] bg-[#191919] rounded-full" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Destination Bottom Sheet */}
      {showDestinationSheet && (
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ pointerEvents: 'none' }}
        >
          <div className="relative w-[402px] h-[874px] bg-black rounded-[55px] p-3" style={{ pointerEvents: 'auto' }}>
            {/* Dynamic Island */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />
            
            {/* Screen with scrim */}
            <div className="relative w-full h-full rounded-[40px] overflow-hidden">
              <div 
                className="absolute inset-0 bg-black/[0.32]"
                onClick={() => setShowDestinationSheet(false)}
              />
            <div 
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] overflow-hidden shadow-[0_-5px_30px_rgba(0,0,0,0.12)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-[6px] pb-[6px]">
                <div className="w-8 h-1 bg-[#8F8F8F] rounded-full" />
              </div>
              
              {/* Header */}
              <div className="flex items-start justify-between px-4 pt-2 pb-3">
                <div className="flex flex-col">
                  <h3 className="text-[18px] font-bold text-[#191919] leading-[24px]">Destination</h3>
                  <span className="text-[14px] text-[#707070] leading-[20px]">International service</span>
                </div>
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
                      className={`w-full px-3 py-3 rounded-[8px] text-left flex flex-col ${
                        isSelected 
                          ? "bg-[#F7F7F7] border-2 border-[#191919]" 
                          : "bg-white border border-[#8F8F8F]"
                      }`}
                    >
                      <span className="text-[14px] font-bold text-[#191919] leading-[20px]">
                        {dest.label}
                      </span>
                      <span className={`text-[13px] leading-[18px] mt-0.5 ${isSelected ? 'text-[#191919]' : 'text-[#707070]'}`}>
                        {dest.description}
                      </span>
                    </button>
                  )
                })}
</div>
            </div>
</div>
  </div>
  </div>
  )}

      {/* Shipping Cost Full Screen Sheet */}
      {showShippingCostSheet && (
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ pointerEvents: 'none' }}
        >
          {/* iPhone Frame - identical to L1 */}
          <div className="relative w-[402px] h-[874px] bg-black rounded-[55px] p-3 shadow-2xl" style={{ pointerEvents: 'auto' }}>
            {/* Dynamic Island - same as L1 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />
            
            {/* Screen - same as L1 */}
            <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden flex flex-col">
              {/* iOS Status Bar */}
              <div className="h-[47px] px-6 flex items-end justify-between pb-1 bg-white flex-shrink-0">
                <span className="text-[15px] font-semibold text-[#191919]">9:41</span>
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

              {/* Header with drag handle and close button */}
              <div className="flex-shrink-0">
                {/* Drag handle */}
                <div className="flex justify-center pt-1 pb-2">
                  <div className="w-8 h-1 bg-[#8F8F8F] rounded-full" />
                </div>
                
                {/* Header */}
                <div className="flex items-start justify-between px-4 pt-1 pb-3">
                  <div className="flex flex-col">
                    <h3 className="text-[18px] font-bold text-[#191919] leading-[24px]">Shipping cost</h3>
                    <span className="text-[14px] text-[#707070] leading-[20px]">International service</span>
                  </div>
                  <button 
                    onClick={() => {
                      setShowShippingCostSheet(false)
                      setShowNumericKeyboard(false)
                    }}
                    className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center"
                  >
                    <X className="w-5 h-5 text-[#191919]" strokeWidth={2} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 px-4 pt-4">
                {/* Section Header */}
                <div className="mb-4">
                  <h4 className="text-[16px] font-bold text-[#191919] leading-[24px]">Enter the shipping cost</h4>
                  <p className="text-[14px] text-[#707070] leading-[20px]">Choose the amount you want the buyer to pay.</p>
                </div>
                
                {/* Shipping Cost Input */}
                <button 
                  onClick={() => setShowNumericKeyboard(true)}
                  className={`w-full h-[56px] px-4 bg-[#F7F7F7] rounded-[8px] flex items-center text-left ${showNumericKeyboard ? 'border-2 border-[#191919]' : 'border border-[#8F8F8F]'}`}
                >
                  <div className="flex flex-col flex-1">
                    <span className="text-[12px] text-[#707070] leading-[16px]">Shipping cost</span>
                    <span className="text-[16px] text-[#191919] leading-[24px]">{shippingCost || "0,00"}</span>
                  </div>
                  <span className="text-[16px] text-[#707070]">€</span>
                </button>
              </div>

              {/* Bottom Section - Save button and Keyboard */}
              <div className="flex-shrink-0">
                {/* Save Button */}
                <div className="px-4 pb-3 pt-3 border-t border-[#E5E5E5]">
                  <button 
                    onClick={() => {
                      setShowShippingCostSheet(false)
                      setShowNumericKeyboard(false)
                    }}
                    className="w-full h-[50px] bg-[#3665F3] rounded-full flex items-center justify-center active:bg-[#2d54d4]"
                  >
                    <span className="text-[16px] font-bold text-white">Save</span>
                  </button>
                </div>

                {/* Numeric Keyboard */}
                {showNumericKeyboard && (
                  <div className="bg-[#D1D5DB] px-1 pt-2 pb-1">
                    <div className="grid grid-cols-3 gap-[6px]">
                      {["1", "2", "3", "4", "5", "6", "7", "8", "9", ",", "0", "backspace"].map((key) => (
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
                <div className={`h-[34px] flex items-center justify-center ${showNumericKeyboard ? 'bg-[#D1D5DB]' : 'bg-white'}`}>
                  <div className="w-[134px] h-[5px] bg-[#191919] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
  
      {/* International Services Full Screen Sheet */}
      {showServicesSheet && (
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ pointerEvents: 'none' }}
        >
          {/* iPhone Frame - identical to L1 */}
          <div className="relative w-[402px] h-[874px] bg-black rounded-[55px] p-3 shadow-2xl" style={{ pointerEvents: 'auto' }}>
            {/* Dynamic Island - same as L1 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />
            
            {/* Screen - same as L1 */}
            <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden flex flex-col">
              {/* iOS Status Bar */}
              <div className="h-[47px] px-6 flex items-end justify-between pb-1 bg-white flex-shrink-0">
                <span className="text-[15px] font-semibold text-[#191919]">9:41</span>
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

              {/* Navigation Header - Back button */}
              <div className="h-[44px] px-4 flex items-center bg-white flex-shrink-0">
                <button 
                  onClick={() => setShowServicesSheet(false)}
                  className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center"
                >
                  <BackArrow className="w-6 h-6 text-[#191919]" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-4 pb-24">
                {/* Header Section */}
                <div className="mb-6">
                  <h1 className="text-[24px] font-bold text-[#191919] leading-[32px] mt-2">
                    International service
                  </h1>
                  <p className="text-[14px] text-[#707070] leading-[20px] mt-1">
                    Lorem ipsum dolor sit amet
                  </p>
                  <button className="text-[12px] text-[#D50B0B] underline mt-2">
                    Remove service
                  </button>
                </div>

                {/* Service Type Group 1 */}
                <div className="mb-5">
                  <h2 className="text-[14px] font-bold text-[#191919] leading-[20px] mb-3">
                    Service type
                  </h2>
                  <div className="flex flex-col gap-3">
                    {internationalServices.filter(s => s.group === 1).map((service) => {
                      const isSelected = selectedService === service.id
                      return (
                        <button
                          key={service.id}
                          onClick={() => setSelectedService(service.id)}
                          className="flex items-center gap-3 w-full text-left"
                        >
                          {/* Radio Button */}
                          <div className="w-[22px] h-[22px] flex-shrink-0">
                            {isSelected ? (
                              <svg viewBox="0 0 22 22" fill="none">
                                <circle cx="11" cy="11" r="10" stroke="#191919" strokeWidth="2"/>
                                <circle cx="11" cy="11" r="5.5" fill="#191919"/>
                              </svg>
                            ) : (
                              <svg viewBox="0 0 22 22" fill="none">
                                <circle cx="11" cy="11" r="10" stroke="#767676" strokeWidth="2"/>
                              </svg>
                            )}
                          </div>
                          
                          {/* Logo */}
                          <div className="w-[52px] h-[52px] bg-[#F7F7F7] rounded-[8px] flex items-center justify-center flex-shrink-0">
                            <ServiceLogo type={service.logoType} />
                          </div>
                          
                          {/* Content */}
                          <div className="flex flex-col flex-1">
                            <span className="text-[13px] font-bold text-[#191919] leading-[18px]">
                              {service.name}
                            </span>
                            <span className="text-[12px] text-[#707070] leading-[16px]">
                              {service.deliveryDays} business days
                            </span>
                            <span className="text-[12px] text-[#707070] leading-[16px]">
                              Up to {service.maxWeight} lb.
                            </span>
                            <span className="text-[12px] text-[#707070] leading-[16px]">
                              {service.tracking ? "Tracking included" : "No tracking"}
                            </span>
                            <span className="text-[12px] text-[#707070] leading-[16px]">
                              {service.price} €
                            </span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Service Type Group 2 */}
                <div className="mb-5">
                  <h2 className="text-[14px] font-bold text-[#191919] leading-[20px] mb-3">
                    Service type
                  </h2>
                  <div className="flex flex-col gap-3">
                    {internationalServices.filter(s => s.group === 2).map((service) => {
                      const isSelected = selectedService === service.id
                      return (
                        <button
                          key={service.id}
                          onClick={() => setSelectedService(service.id)}
                          className="flex items-center gap-3 w-full text-left"
                        >
                          {/* Radio Button */}
                          <div className="w-[22px] h-[22px] flex-shrink-0">
                            {isSelected ? (
                              <svg viewBox="0 0 22 22" fill="none">
                                <circle cx="11" cy="11" r="10" stroke="#191919" strokeWidth="2"/>
                                <circle cx="11" cy="11" r="5.5" fill="#191919"/>
                              </svg>
                            ) : (
                              <svg viewBox="0 0 22 22" fill="none">
                                <circle cx="11" cy="11" r="10" stroke="#767676" strokeWidth="2"/>
                              </svg>
                            )}
                          </div>
                          
                          {/* Logo */}
                          <div className="w-[52px] h-[52px] bg-[#F7F7F7] rounded-[8px] flex items-center justify-center flex-shrink-0">
                            <ServiceLogo type={service.logoType} />
                          </div>
                          
                          {/* Content */}
                          <div className="flex flex-col flex-1">
                            <span className="text-[13px] font-bold text-[#191919] leading-[18px]">
                              {service.name}
                            </span>
                            <span className="text-[12px] text-[#707070] leading-[16px]">
                              {service.deliveryDays} business days
                            </span>
                            <span className="text-[12px] text-[#707070] leading-[16px]">
                              Up to {service.maxWeight} lb.
                            </span>
                            <span className="text-[12px] text-[#707070] leading-[16px]">
                              {service.tracking ? "Tracking included" : "No tracking"}
                            </span>
                            <span className="text-[12px] text-[#707070] leading-[16px]">
                              {service.price} €
                            </span>
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
                  <button 
                    onClick={() => setShowServicesSheet(false)}
                    className="w-full h-[50px] bg-[#3665F3] rounded-full flex items-center justify-center active:bg-[#2d54d4]"
                  >
                    <span className="text-[16px] font-bold text-white">Done</span>
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
    </div>
  )
}

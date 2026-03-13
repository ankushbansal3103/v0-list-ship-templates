"use client"

/**
 * FR-Helix-Simple-Desktop Prototype
 * eBay Shipping Configuration Flow - Desktop Web Version (Helix Simple)
 * 
 * French market desktop shipping configuration matching eBay's Helix Simple design system.
 * Uses Market Sans font family, specific color palette, and desktop-optimized layouts.
 */

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

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
    logoUrl: "https://upload.wikimedia.org/wikipedia/fr/thumb/9/92/Mondial_Relay_2013_logo.png/200px-Mondial_Relay_2013_logo.png",
    deliveryDays: "X-X",
    weight: "Up to X lb.",
    tracking: "Tracking included",
    price: "X,XX €",
    recommended: true
  },
  {
    id: "colissimo",
    name: "Colissimo",
    logoUrl: "https://upload.wikimedia.org/wikipedia/fr/thumb/4/4c/Colissimo_Logo.svg/200px-Colissimo_Logo.svg.png",
    deliveryDays: "X-X",
    weight: "Up to X lb.",
    tracking: "Tracking included",
    price: "X,XX €",
    recommended: false
  },
  {
    id: "chronopost",
    name: "Chronopost",
    logoUrl: "https://upload.wikimedia.org/wikipedia/fr/thumb/9/9e/Chronopost_logo.svg/200px-Chronopost_logo.svg.png",
    deliveryDays: "X-X",
    weight: "Up to X lb.",
    tracking: "Tracking included",
    price: "X,XX €",
    recommended: false
  }
]

const internationalDestinations = [
  { id: "eu", label: "European Union" },
  { id: "worldwide", label: "Worldwide" },
  { id: "uk", label: "United Kingdom" },
  { id: "us", label: "United States" },
]

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

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function EbayShippingHelixFRDesktop() {
  // State
  const [deliveryMethod, setDeliveryMethod] = useState("both")
  const [selectedDomesticService, setSelectedDomesticService] = useState("mondial-relay")
  const [paymentType, setPaymentType] = useState<"buyer" | "seller">("buyer")
  const [additionalService, setAdditionalService] = useState("mondial-relay")
  const [internationalDestination, setInternationalDestination] = useState("eu")
  const [internationalService, setInternationalService] = useState("colissimo")

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Market Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Browser Chrome */}
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
          <button className="w-7 h-7 flex items-center justify-center">
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5">
              <path d="M14 8A6 6 0 1 1 8 2" stroke="#4B4D52" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M8 2V5L10 4" stroke="#4B4D52" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
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

      {/* Page Content */}
      <div className="max-w-[976px] mx-auto py-12">
        {/* Divider */}
        <div className="border-t border-[#E5E5E5] mb-12" />

        {/* Section Header */}
        <h2 className="text-base font-bold text-[#191919] mb-8 uppercase tracking-wide">DELIVERY</h2>

        {/* Main Content - 734px width matching the spec */}
        <div className="max-w-[734px]">
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
            <button className="w-full p-4 border border-[#8F8F8F] rounded-lg flex items-center justify-between hover:bg-[#FAFAFA] transition-colors">
              <div>
                <div className="text-sm font-medium text-[#191919]">Parcel</div>
                <div className="text-sm text-[#707070]">Up to 500 g, AA x BB x CC cm</div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#191919]" />
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
                  <div className="w-10 h-10 mb-3 flex items-center justify-start">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={service.logoUrl} 
                      alt={service.name}
                      className="max-w-[40px] max-h-[40px] object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
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
            <button className="w-full py-3 border border-[#8F8F8F] rounded-lg text-sm text-[#191919] font-medium hover:bg-[#FAFAFA] transition-colors mb-6">
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
                <div className="text-xl font-bold text-[#191919] mb-1">X.XX €</div>
                <div className="text-sm text-[#707070] mb-2">Based on the cost that you set</div>
                <button className="text-sm text-[#191919] underline hover:no-underline">
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
            <div className="border border-[#8F8F8F] rounded-lg p-4 mb-4">
              <div className="flex items-start gap-4">
                {/* Logo */}
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={domesticServices.find(s => s.id === additionalService)?.logoUrl} 
                    alt={domesticServices.find(s => s.id === additionalService)?.name}
                    className="max-w-[40px] max-h-[40px] object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#191919] mb-1">
                    {domesticServices.find(s => s.id === additionalService)?.name}
                  </h4>
                  <div className="text-xs text-[#707070] space-y-0.5">
                    <div>X-X business days</div>
                    <div>Up to X lb.</div>
                    <div>Tracking included</div>
                    <div>X,XX €</div>
                  </div>
                </div>
              </div>
            </div>

            {/* View All Services Button */}
            <button className="w-full py-3 border border-[#8F8F8F] rounded-lg text-sm text-[#191919] font-medium hover:bg-[#FAFAFA] transition-colors mb-6">
              View all services
            </button>

            {/* Cost Display */}
            <div className="bg-[#F7F7F7] rounded-lg p-6">
              <div className="text-center">
                <div className="text-sm text-[#707070] mb-1">The buyer will pay:</div>
                <div className="text-xl font-bold text-[#191919] mb-1">X.XX €</div>
                <div className="text-sm text-[#707070] mb-2">Based on the cost that you set</div>
                <button className="text-sm text-[#191919] underline hover:no-underline">
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
              <label className="text-xs text-[#707070] block mb-1">Destination</label>
              <button className="w-full p-3 border border-[#8F8F8F] rounded-lg flex items-center justify-between hover:bg-[#FAFAFA] transition-colors">
                <span className="text-sm text-[#191919]">
                  {internationalDestinations.find(d => d.id === internationalDestination)?.label}
                </span>
                <ChevronDown className="w-5 h-5 text-[#191919]" />
              </button>
            </div>

            {/* International Service Card */}
            <div className="border border-[#8F8F8F] rounded-lg p-4 mb-4">
              <div className="flex items-start gap-4">
                {/* Logo */}
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={domesticServices.find(s => s.id === internationalService)?.logoUrl} 
                    alt={domesticServices.find(s => s.id === internationalService)?.name}
                    className="max-w-[40px] max-h-[40px] object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#191919] mb-1">
                    {domesticServices.find(s => s.id === internationalService)?.name}
                  </h4>
                  <div className="text-xs text-[#707070] space-y-0.5">
                    <div>X-X business days</div>
                    <div>Up to X lb.</div>
                    <div>Tracking included</div>
                    <div>X,XX €</div>
                  </div>
                </div>
              </div>
            </div>

            {/* View All Services Button */}
            <button className="w-full py-3 border border-[#8F8F8F] rounded-lg text-sm text-[#191919] font-medium hover:bg-[#FAFAFA] transition-colors mb-6">
              View all services
            </button>

            {/* Cost Display */}
            <div className="bg-[#F7F7F7] rounded-lg p-6">
              <div className="text-center">
                <div className="text-sm text-[#707070] mb-1">The buyer will pay:</div>
                <div className="text-xl font-bold text-[#191919] mb-1">X.XX €</div>
                <div className="text-sm text-[#707070] mb-2">Cost is based on buyer&apos;s location.</div>
                <button className="text-sm text-[#191919] underline hover:no-underline">
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
            
            <button className="w-full p-4 border border-[#8F8F8F] rounded-lg hover:bg-[#FAFAFA] transition-colors">
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
                    <div className="text-sm text-[#707070]">X business days</div>
                  </div>
                  {/* Domestic Returns */}
                  <div>
                    <div className="text-sm font-medium text-[#191919]">Domestic returns</div>
                    <div className="text-sm text-[#707070]">14 Days, Buyer</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#191919] flex-shrink-0" />
              </div>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

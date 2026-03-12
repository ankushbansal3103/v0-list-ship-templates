"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, X, Check } from "lucide-react"

const deliveryMethods = [
  { id: "shipping", label: "Shipping only" },
  { id: "pickup", label: "Local pickup only" },
  { id: "both", label: "Shipping and local pickup" },
]

// FedEx Logo Component
function FedExLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 94 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 5.5H14.5V9H4V13H13V16.5H4V25H0V5.5Z" fill="#4D148C"/>
      <path d="M35.5 17L44 25H37.5L32 19L26.5 25H20L28.5 17L20.5 9H27L32 14.5L37 9H43.5L35.5 17Z" fill="#FF6600"/>
      <path d="M15 9H24C28 9 30.5 11 30.5 14.5C30.5 17 29 19 26.5 19.5L31 25H26.5L22.5 20H19V25H15V9ZM19 12.5V16.5H23C24.5 16.5 26 16 26 14.5C26 13 24.5 12.5 23 12.5H19Z" fill="#FF6600"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M44.5 5.5H58V9H48.5V13H56.5V16.5H48.5V21H58V25H44.5V5.5Z" fill="#4D148C"/>
    </svg>
  )
}

// eBay Logo Component
function EbayLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 10C0 4.5 4 0 10 0C16 0 19.5 4 19.5 9.5V12H4.5C5 15.5 7 18 11 18C14 18 16 16.5 17 14.5H19.5C18 19 14.5 22 10.5 22C4 22 0 17.5 0 10ZM4.5 9H15C14.5 5.5 12 3.5 9.5 3.5C7 3.5 5 5.5 4.5 9Z" fill="#E53238"/>
      <path d="M22 22V1H26V8C27.5 5.5 30 4 33.5 4C39 4 43 8.5 43 13C43 17.5 39 22 33.5 22C30 22 27.5 20.5 26 18V22H22ZM26 13C26 16 28.5 18.5 32 18.5C35.5 18.5 38 16 38 13C38 10 35.5 7.5 32 7.5C28.5 7.5 26 10 26 13Z" fill="#0064D2"/>
      <path d="M57 22C51.5 22 47 18 47 13C47 8 51.5 4 57 4C60.5 4 63 5.5 64.5 8V4.5H68.5V22H64.5V18C63 20.5 60.5 22 57 22ZM57 18.5C60.5 18.5 63 16 63 13C63 10 60.5 7.5 57 7.5C53.5 7.5 51 10 51 13C51 16 53.5 18.5 57 18.5Z" fill="#F5AF02"/>
      <path d="M70 4.5H74.5L79 15L83.5 4.5H88L78.5 26C77 29.5 75 31 72 31V27.5C73.5 27.5 74.5 26.5 75 25L70 4.5Z" fill="#86B817"/>
    </svg>
  )
}

// Checkmark Circle Icon
function CheckCircle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11" stroke="#0654BA" strokeWidth="2" fill="none"/>
      <path d="M7 12L10.5 15.5L17 9" stroke="#0654BA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

export function EbayShippingPage() {
  const [deliveryMethod, setDeliveryMethod] = useState("shipping")
  const [showDeliverySheet, setShowDeliverySheet] = useState(false)
  const [destination, setDestination] = useState("Worldwide")
  const [showDestinationSheet, setShowDestinationSheet] = useState(false)

  const destinations = ["Worldwide", "United States", "Canada", "Europe", "Asia"]

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1a1a1a] p-4">
      {/* iPhone Frame */}
      <div className="relative w-[375px] h-[812px] bg-black rounded-[50px] p-3 shadow-2xl">
        {/* Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-b-[20px] z-50" />
        
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
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 pb-6">
              {/* Page Title */}
              <h1 className="text-[26px] font-bold text-[#191919] leading-tight mt-2 mb-6">
                Select delivery options
              </h1>

              {/* Delivery Method Section */}
              <div className="mb-6">
                <h2 className="text-[16px] font-bold text-[#191919] mb-3">Delivery method</h2>
                <button 
                  onClick={() => setShowDeliverySheet(true)}
                  className="w-full h-[52px] px-4 bg-white border border-[#767676] rounded-[16px] flex items-center justify-between"
                >
                  <span className="text-[16px] text-[#191919]">
                    {deliveryMethods.find(m => m.id === deliveryMethod)?.label}
                  </span>
                  <ChevronDown className="w-5 h-5 text-[#191919]" />
                </button>
              </div>

              {/* Package Details Section */}
              <div className="mb-6">
                <h2 className="text-[16px] font-bold text-[#191919] mb-3">Package details</h2>
                <button className="w-full p-4 bg-white border border-[#767676] rounded-[16px] flex items-center justify-between">
                  <div className="flex flex-col items-start">
                    <span className="text-[16px] text-[#191919]">X lb. XX oz., A x B x C in.</span>
                    <span className="text-[14px] text-[#707070]">Estimated based on items like yours</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#191919]" />
                </button>
              </div>

              {/* Domestic Shipping Section */}
              <div className="mb-6">
                <h2 className="text-[16px] font-bold text-[#191919] mb-3">Domestic shipping</h2>
                
                {/* Authenticity Guarantee Notice */}
                <div className="p-4 bg-white border border-[#E5E5E5] rounded-[16px] mb-3">
                  <div className="flex gap-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-2">
                      <p className="text-[14px] text-[#191919] leading-[1.4]">
                        This item is eligible for Authenticity Guarantee. An authenticator will verify the eligible item is authentic and matches the listing&apos;s details.
                      </p>
                      <button className="text-[14px] text-[#191919] underline text-left font-semibold">
                        How it works
                      </button>
                    </div>
                  </div>
                </div>

                {/* eBay shipping powered by FedEx Card */}
                <div className="w-full p-4 bg-white border border-[#E5E5E5] rounded-[16px]">
                  <div className="flex gap-3 items-start">
                    <div className="w-[48px] h-[48px] flex items-center justify-center flex-shrink-0">
                      <FedExLogo className="w-[48px] h-auto" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[16px] font-bold text-[#191919] leading-tight">
                        eBay shipping powered by FedEx
                      </span>
                      <span className="text-[14px] text-[#707070] mt-0.5">
                        Free shipping label provided to you
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* International Shipping Section */}
              <div className="mb-6">
                <h2 className="text-[16px] font-bold text-[#191919] mb-3">International shipping</h2>
                
                {/* Default Service */}
                <div className="mb-4">
                  <span className="text-[14px] font-bold text-[#191919] mb-2 block">Default service</span>
                  
                  {/* eBay International Shipping Card */}
                  <div className="w-full p-4 bg-white border-2 border-[#0654BA] rounded-[16px]">
                    <div className="flex gap-3 items-start">
                      <div className="w-[48px] h-[48px] bg-[#F7F7F7] rounded-[8px] flex items-center justify-center flex-shrink-0">
                        <EbayLogo className="w-[40px] h-auto" />
                      </div>
                      <div className="flex flex-col flex-1">
                        <span className="text-[16px] font-bold text-[#191919] leading-tight">
                          eBay International Shipping
                        </span>
                        <p className="text-[14px] text-[#191919] mt-1 leading-[1.4]">
                          Send items to our domestic shipping hub and we&apos;ll handle the rest—at no extra cost.
                        </p>
                        <button className="text-[14px] text-[#191919] underline text-left font-semibold mt-2">
                          How it works
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Service */}
                <div className="mb-4">
                  <span className="text-[14px] font-bold text-[#191919] block">Additional service</span>
                  <span className="text-[14px] text-[#191919]">
                    <button className="underline text-[#191919]">Fees</button> apply for international sales.
                  </span>
                </div>

                {/* Destination Dropdown */}
                <div className="mb-4">
                  <button 
                    onClick={() => setShowDestinationSheet(true)}
                    className="w-full px-4 py-3 bg-white border border-[#767676] rounded-[16px] flex items-center justify-between"
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-[12px] text-[#707070]">Destination</span>
                      <span className="text-[16px] text-[#191919]">{destination}</span>
                    </div>
                    <ChevronDown className="w-5 h-5 text-[#191919]" />
                  </button>
                </div>

                {/* FedEx Service Card */}
                <div className="w-full p-4 bg-white border border-[#E5E5E5] rounded-[16px] mb-4">
                  <div className="flex gap-3 items-start">
                    <div className="w-[48px] h-[48px] flex items-center justify-center flex-shrink-0">
                      <FedExLogo className="w-[48px] h-auto" />
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-[16px] font-bold text-[#191919] leading-tight">
                        FedEx
                      </span>
                      <div className="text-[14px] text-[#191919] mt-0.5 leading-[1.4]">
                        <div>X-X business days</div>
                        <div>Up to $XXX.XX protection</div>
                        <div>Up to X lb., AA x BB x CC in.</div>
                        <div>$X.XX–$X.XX</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* View All Services Button */}
                <button className="w-full h-[48px] border border-[#767676] rounded-full flex items-center justify-center mb-6">
                  <span className="text-[16px] text-[#191919]">View all services</span>
                </button>

                {/* Buyer Payment Info */}
                <div className="flex flex-col items-center py-4">
                  <span className="text-[14px] text-[#707070]">The buyer will pay:</span>
                  <span className="text-[20px] font-bold text-[#191919] mt-1">$X.XX–$XX.XX</span>
                  <span className="text-[14px] text-[#707070] mt-1">Cost is based on buyer&apos;s location.</span>
                  <button className="text-[14px] text-[#191919] underline mt-1">
                    Edit shipping cost
                  </button>
                </div>
              </div>

              {/* Delivery Details Section */}
              <div className="mb-24">
                <h2 className="text-[16px] font-bold text-[#191919] mb-3">Delivery details</h2>
                
                <button className="w-full p-4 bg-white border border-[#767676] rounded-[16px] flex items-start justify-between">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-[#191919]">Item location</span>
                      <span className="text-[14px] text-[#707070]">Located at 95117 (visible on listing)</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-[#191919]">Handling time</span>
                      <span className="text-[14px] text-[#707070]">X business days</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-[#191919]">Domestic returns</span>
                      <span className="text-[14px] text-[#707070]">14 Days, Buyer, Money back</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-[#191919]">eBay International Shipping returns</span>
                      <span className="text-[14px] text-[#707070]">30 Days, eBay handles on your behalf</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-[#191919]">International returns</span>
                      <span className="text-[14px] text-[#707070]">14 Days, Buyer, Money back</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#191919] flex-shrink-0" />
                </button>
              </div>
            </div>
          </div>

          {/* Fixed Bottom Button */}
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-4 bg-white">
            <button className="w-full h-[52px] bg-[#3665F3] rounded-full flex items-center justify-center">
              <span className="text-[16px] font-bold text-white">Continue</span>
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
          <div className="relative w-[375px] h-[812px]" style={{ pointerEvents: 'auto' }}>
            <div 
              className="absolute inset-0 bg-black/50 rounded-[50px]"
              onClick={() => setShowDeliverySheet(false)}
            />
            <div 
              className="absolute bottom-3 left-3 right-3 bg-white rounded-[32px] p-5 pb-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-9 h-1 bg-[#E5E5E5] rounded-full mx-auto mb-5" />
              <h3 className="text-[18px] font-bold text-[#191919] mb-4">Delivery method</h3>
              <div className="flex flex-col gap-2">
                {deliveryMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => {
                      setDeliveryMethod(method.id)
                      setShowDeliverySheet(false)
                    }}
                    className={`w-full p-4 rounded-[16px] text-left flex items-center justify-between ${
                      deliveryMethod === method.id 
                        ? "bg-[#F7F7F7] border-2 border-[#191919]" 
                        : "bg-[#F7F7F7] border-2 border-transparent"
                    }`}
                  >
                    <span className="text-[16px] text-[#191919]">{method.label}</span>
                    {deliveryMethod === method.id && (
                      <div className="w-6 h-6 rounded-full bg-[#191919] flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                ))}
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
          <div className="relative w-[375px] h-[812px]" style={{ pointerEvents: 'auto' }}>
            <div 
              className="absolute inset-0 bg-black/50 rounded-[50px]"
              onClick={() => setShowDestinationSheet(false)}
            />
            <div 
              className="absolute bottom-3 left-3 right-3 bg-white rounded-[32px] p-5 pb-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-9 h-1 bg-[#E5E5E5] rounded-full mx-auto mb-5" />
              <h3 className="text-[18px] font-bold text-[#191919] mb-4">Destination</h3>
              <div className="flex flex-col gap-2">
                {destinations.map((dest) => (
                  <button
                    key={dest}
                    onClick={() => {
                      setDestination(dest)
                      setShowDestinationSheet(false)
                    }}
                    className={`w-full p-4 rounded-[16px] text-left flex items-center justify-between ${
                      destination === dest 
                        ? "bg-[#F7F7F7] border-2 border-[#191919]" 
                        : "bg-[#F7F7F7] border-2 border-transparent"
                    }`}
                  >
                    <span className="text-[16px] text-[#191919]">{dest}</span>
                    {destination === dest && (
                      <div className="w-6 h-6 rounded-full bg-[#191919] flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

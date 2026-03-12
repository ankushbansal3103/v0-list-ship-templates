"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, X, Check } from "lucide-react"
import Image from "next/image"

const deliveryMethods = [
  { id: "shipping", label: "Shipping only" },
  { id: "pickup", label: "Local pickup only" },
  { id: "both", label: "Shipping and local pickup" },
]

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
          <div className="flex-1 overflow-y-auto bg-white">
            {/* Page Title */}
            <div className="px-4">
              <h1 className="text-[22px] font-bold text-[#191919] leading-tight mt-2 mb-6">
                Select delivery options
              </h1>
            </div>

            {/* Delivery Method Section */}
            <div className="px-4 pb-5">
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

            <div className="w-full h-[1px] bg-[#E5E5E5]" />

            {/* Package Details Section */}
            <div className="px-4 py-5">
              <h2 className="text-[14px] font-bold text-[#191919] mb-3">Package details</h2>
              <button className="w-full px-4 py-3 bg-white border border-[#767676] rounded-[16px] flex items-center justify-between">
                <div className="flex flex-col items-start">
                  <span className="text-[14px] text-[#191919]">X lb. XX oz., A x B x C in.</span>
                  <span className="text-[12px] text-[#707070] mt-0.5">Estimated based on items like yours</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#191919]" />
              </button>
            </div>

            <div className="w-full h-[1px] bg-[#E5E5E5]" />

            {/* Domestic Shipping Section */}
            <div className="px-4 py-5">
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
                    <Image 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/FedEx_Corporation_-_2016_Logo.svg/1280px-FedEx_Corporation_-_2016_Logo.svg.png"
                      alt="FedEx"
                      width={44}
                      height={20}
                      className="object-contain"
                      style={{ width: '44px', height: 'auto' }}
                      unoptimized
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

            <div className="w-full h-[1px] bg-[#E5E5E5]" />

            {/* International Shipping Section */}
            <div className="px-4 py-5">
              <h2 className="text-[14px] font-bold text-[#191919] mb-3">International shipping</h2>
              
              {/* Default Service */}
              <div className="mb-4">
                <span className="text-[13px] font-bold text-[#191919] mb-2 block">Default service</span>
                
                {/* eBay International Shipping Card - Selected state with blue border */}
                <div className="w-full p-3 bg-white border-2 border-[#3665F3] rounded-[16px]">
                  <div className="flex gap-3 items-start">
                    <div className="w-[44px] h-[28px] bg-[#F7F7F7] rounded-[6px] flex items-center justify-center flex-shrink-0">
                      <Image 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/EBay_logo.svg/2560px-EBay_logo.svg.png"
                        alt="eBay"
                        width={32}
                        height={14}
                        className="object-contain"
                        style={{ width: '32px', height: 'auto' }}
                        unoptimized
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-[14px] font-bold text-[#191919] leading-tight">
                        eBay International Shipping
                      </span>
                      <p className="text-[13px] text-[#191919] mt-1 leading-[1.4]">
                        Send items to our domestic shipping hub and we&apos;ll handle the rest—at no extra cost.
                      </p>
                      <button className="text-[13px] text-[#191919] underline text-left font-medium mt-1.5">
                        How it works
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Service */}
              <div className="mb-4">
                <span className="text-[13px] font-bold text-[#191919] block">Additional service</span>
                <span className="text-[13px] text-[#707070]">
                  <button className="underline text-[#3665F3]">Fees</button> apply for international sales.
                </span>
              </div>

              {/* Destination Dropdown */}
              <div className="mb-4">
                <button 
                  onClick={() => setShowDestinationSheet(true)}
                  className="w-full px-4 py-2.5 bg-white border border-[#767676] rounded-[16px] flex items-center justify-between"
                >
                  <div className="flex flex-col items-start">
                    <span className="text-[11px] text-[#707070] leading-tight">Destination</span>
                    <span className="text-[14px] text-[#191919] leading-snug">{destination}</span>
                  </div>
                  <ChevronDown className="w-5 h-5 text-[#191919]" />
                </button>
              </div>

              {/* FedEx Service Card */}
              <div className="w-full p-3 bg-white border border-[#E5E5E5] rounded-[16px] mb-4">
                <div className="flex gap-3 items-start">
                  <div className="w-[44px] h-[20px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Image 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/FedEx_Corporation_-_2016_Logo.svg/1280px-FedEx_Corporation_-_2016_Logo.svg.png"
                      alt="FedEx"
                      width={44}
                      height={20}
                      className="object-contain"
                      style={{ width: '44px', height: 'auto' }}
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-[14px] font-bold text-[#191919] leading-tight">
                      FedEx
                    </span>
                    <div className="text-[13px] text-[#191919] mt-0.5 leading-[1.5]">
                      <div>X-X business days</div>
                      <div>Up to $XXX.XX protection</div>
                      <div>Up to X lb., AA x BB x CC in.</div>
                      <div>$X.XX–$X.XX</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* View All Services Button */}
              <button className="w-full h-[44px] border border-[#767676] rounded-full flex items-center justify-center">
                <span className="text-[14px] text-[#191919]">View all services</span>
              </button>
            </div>

            <div className="w-full h-[1px] bg-[#E5E5E5]" />

            {/* Buyer Payment Info - Grey background section */}
            <div className="flex flex-col items-center py-5 bg-[#F7F7F7]">
              <span className="text-[13px] text-[#707070]">The buyer will pay:</span>
              <span className="text-[18px] font-bold text-[#191919] mt-1">$X.XX–$XX.XX</span>
              <span className="text-[13px] text-[#707070] mt-1">Cost is based on buyer&apos;s location.</span>
              <button className="text-[13px] text-[#191919] underline mt-1">
                Edit shipping cost
              </button>
            </div>

            <div className="w-full h-[1px] bg-[#E5E5E5]" />

            {/* Delivery Details Section */}
            <div className="px-4 py-5 pb-28">
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
              <h3 className="text-[16px] font-bold text-[#191919] mb-4">Delivery method</h3>
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
                    <span className="text-[14px] text-[#191919]">{method.label}</span>
                    {deliveryMethod === method.id && (
                      <div className="w-5 h-5 rounded-full bg-[#191919] flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
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
              <h3 className="text-[16px] font-bold text-[#191919] mb-4">Destination</h3>
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
                    <span className="text-[14px] text-[#191919]">{dest}</span>
                    {destination === dest && (
                      <div className="w-5 h-5 rounded-full bg-[#191919] flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
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

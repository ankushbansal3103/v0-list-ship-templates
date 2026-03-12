"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, ChevronLeft, Info } from "lucide-react"

const deliveryMethods = [
  { id: "shipping", label: "Shipping" },
  { id: "pickup", label: "Local pickup" },
  { id: "both", label: "Shipping and local pickup" },
]

export function EbayShippingPage() {
  const [deliveryMethod, setDeliveryMethod] = useState("shipping")
  const [showDeliverySheet, setShowDeliverySheet] = useState(false)

  return (
    <div className="relative">
      {/* iPhone Frame */}
      <div className="relative w-[390px] h-[844px] bg-black rounded-[55px] p-[14px] shadow-2xl">
        {/* Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[24px] z-50" />
        
        {/* Screen */}
        <div className="relative w-full h-full bg-white rounded-[41px] overflow-hidden">
          {/* iOS Status Bar */}
          <div className="h-[54px] px-8 flex items-end justify-between pb-2 bg-white">
            <span className="text-[15px] font-semibold text-[#191919]">9:41</span>
            <div className="flex items-center gap-1">
              <svg className="w-[17px] h-[10px]" viewBox="0 0 17 10">
                <path d="M1 3.5C1 2.11929 2.11929 1 3.5 1H4.5C5.88071 1 7 2.11929 7 3.5V9H3.5C2.11929 9 1 7.88071 1 6.5V3.5Z" fill="#191919"/>
                <path d="M5 3.5C5 2.11929 6.11929 1 7.5 1H8.5C9.88071 1 11 2.11929 11 3.5V9H7.5C6.11929 9 5 7.88071 5 6.5V3.5Z" fill="#191919"/>
                <path d="M9 3.5C9 2.11929 10.1193 1 11.5 1H12.5C13.8807 1 15 2.11929 15 3.5V9H11.5C10.1193 9 9 7.88071 9 6.5V3.5Z" fill="#191919"/>
                <path d="M13 3.5C13 2.11929 14.1193 1 15.5 1H16V9H15.5C14.1193 9 13 7.88071 13 6.5V3.5Z" fill="#191919" fillOpacity="0.3"/>
              </svg>
              <svg className="w-[15px] h-[11px]" viewBox="0 0 15 11">
                <path fillRule="evenodd" clipRule="evenodd" d="M7.5 2.5C5.29086 2.5 3.29086 3.5 2 5L0.5 3.5C2.29086 1.5 4.79086 0 7.5 0C10.2091 0 12.7091 1.5 14.5 3.5L13 5C11.7091 3.5 9.70914 2.5 7.5 2.5Z" fill="#191919"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M7.5 5.5C6.11929 5.5 4.88071 6.11929 4 7L2.5 5.5C3.88071 4.11929 5.61929 3 7.5 3C9.38071 3 11.1193 4.11929 12.5 5.5L11 7C10.1193 6.11929 8.88071 5.5 7.5 5.5Z" fill="#191919"/>
                <circle cx="7.5" cy="9.5" r="1.5" fill="#191919"/>
              </svg>
              <svg className="w-[25px] h-[12px]" viewBox="0 0 25 12">
                <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="#191919" strokeOpacity="0.35"/>
                <rect x="2" y="2" width="18" height="8" rx="1.5" fill="#191919"/>
                <path d="M23 4V8C23.8 8 24 7 24 6C24 5 23.8 4 23 4Z" fill="#191919" fillOpacity="0.4"/>
              </svg>
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="h-[56px] px-4 flex items-center gap-4 bg-white border-b border-[#E5E5E5]">
            <button className="w-10 h-10 rounded-full bg-[#F7F7F7] flex items-center justify-center">
              <ChevronLeft className="w-5 h-5 text-[#191919]" />
            </button>
            <div className="flex-1" />
          </div>

          {/* Scrollable Content */}
          <div className="h-[calc(100%-110px)] overflow-y-auto">
            <div className="p-4 flex flex-col gap-8">
              {/* Page Title */}
              <h1 className="text-[24px] font-bold text-[#191919] leading-8 font-sans">Delivery</h1>

              {/* Main Content */}
              <div className="flex flex-col gap-6">
                {/* Delivery Method Section */}
                <section className="flex flex-col gap-4">
                  <h2 className="text-[16px] font-bold text-[#191919] leading-6 font-sans">Delivery method</h2>
                  
                  {/* Dropdown */}
                  <button 
                    onClick={() => setShowDeliverySheet(true)}
                    className="w-full h-12 px-4 bg-[#F7F7F7] border border-[#8F8F8F] rounded-[16px] flex items-center justify-between"
                  >
                    <span className="text-[14px] text-[#191919] font-sans">
                      {deliveryMethods.find(m => m.id === deliveryMethod)?.label}
                    </span>
                    <ChevronDown className="w-4 h-4 text-[#191919]" />
                  </button>
                </section>

                {/* Divider */}
                <div className="w-full h-px bg-[#E5E5E5]" />

                {/* Package Details Section */}
                <section className="flex flex-col gap-4">
                  <h2 className="text-[16px] font-bold text-[#191919] leading-6 font-sans">Package details</h2>
                  
                  {/* Package Details Card */}
                  <button className="w-full p-4 bg-white border border-[#8F8F8F] rounded-[16px] flex items-center justify-between">
                    <div className="flex flex-col items-start gap-0.5">
                      <span className="text-[14px] text-[#191919] font-sans">USPS Flat Rate Envelope</span>
                      <span className="text-[14px] text-[#707070] font-sans">12.5 × 9.5 in, 4 oz</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#191919]" />
                  </button>
                </section>

                {/* Divider */}
                <div className="w-full h-px bg-[#E5E5E5]" />

                {/* Domestic Shipping Section */}
                <section className="flex flex-col gap-4">
                  <h2 className="text-[16px] font-bold text-[#191919] leading-6 font-sans">Domestic</h2>
                  
                  <div className="flex flex-col gap-4">
                    {/* Education Notice */}
                    <div className="p-6 bg-[#F7F7F7] rounded-[16px] flex gap-3">
                      <Info className="w-6 h-6 text-[#0968F6] flex-shrink-0" />
                      <div className="flex flex-col gap-4">
                        <p className="text-[14px] text-[#191919] leading-5 font-sans">
                          Protect your sales! All items over $25 should ship with tracking and a signature to guard against &quot;Item Not Received&quot; cases.
                        </p>
                        <button className="text-[14px] font-bold text-[#191919] underline text-left font-sans">
                          Learn more
                        </button>
                      </div>
                    </div>

                    {/* FedEx Service Card */}
                    <div className="w-full p-4 bg-[#F7F7F7] border-2 border-[#191919] rounded-[16px]">
                      <div className="flex gap-4">
                        {/* Logo */}
                        <div className="w-14 h-14 bg-white rounded-[16px] flex items-center justify-center flex-shrink-0">
                          <svg className="w-10 h-3" viewBox="0 0 40 12">
                            <path d="M0 0.5H8.5V2.5H2V5H7.5V7H2V11.5H0V0.5Z" fill="#29007C"/>
                            <path d="M9.5 6C9.5 3 11.5 0.5 15 0.5C18.5 0.5 20.5 3 20.5 6C20.5 9 18.5 11.5 15 11.5C11.5 11.5 9.5 9 9.5 6ZM18.5 6C18.5 4 17 2.5 15 2.5C13 2.5 11.5 4 11.5 6C11.5 8 13 9.5 15 9.5C17 9.5 18.5 8 18.5 6Z" fill="#FF5A00"/>
                            <path d="M22 0.5H24.5L28 5L31.5 0.5H34L29 6.5L34 11.5H31.5L28 7L24.5 11.5H22L27 6L22 0.5Z" fill="#FF5A00"/>
                            <circle cx="37.5" cy="9.5" r="2" fill="#FF5A00"/>
                          </svg>
                        </div>
                        
                        {/* Content */}
                        <div className="flex flex-col gap-1 flex-1">
                          <h3 className="text-[16px] font-bold text-[#191919] leading-6 font-sans">
                            FedEx Ground® Economy
                          </h3>
                          <p className="text-[14px] text-[#191919] leading-5 font-sans">
                            $10.32
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Divider */}
                <div className="w-full h-px bg-[#E5E5E5]" />

                {/* International Shipping Section */}
                <section className="flex flex-col gap-4">
                  <h2 className="text-[16px] font-bold text-[#191919] leading-6 font-sans">International</h2>
                  
                  <div className="flex flex-col gap-8">
                    {/* Default Service */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[14px] font-bold text-[#191919] font-sans">Default</span>
                      
                      {/* eBay International Shipping Card */}
                      <div className="w-full p-4 bg-[#F7F7F7] border-2 border-[#191919] rounded-[16px]">
                        <div className="flex gap-4">
                          {/* eBay Logo */}
                          <div className="w-14 h-14 bg-white rounded-[16px] flex items-center justify-center flex-shrink-0">
                            <svg className="w-10 h-4" viewBox="0 0 40 16">
                              <path d="M0 4C0 1.8 1.8 0 4 0H6C8.2 0 10 1.8 10 4V12C10 14.2 8.2 16 6 16H4C1.8 16 0 14.2 0 12V4ZM2 4V12C2 13.1 2.9 14 4 14H6C7.1 14 8 13.1 8 12V9H4V7H8V4C8 2.9 7.1 2 6 2H4C2.9 2 2 2.9 2 4Z" fill="#E53238"/>
                              <path d="M12 0H20V2H14V6H19V8H14V14H20V16H12V0Z" fill="#0064D2"/>
                              <path d="M22 16C22 16 22 10 28 10C28 10 28 4 34 4V6C30 6 30 10 30 10H34V12H30C30 12 30 14 28 16H22Z" fill="#F5AF02"/>
                              <path d="M34 8V16H40C40 12 38 8 34 8Z" fill="#86B817"/>
                            </svg>
                          </div>
                          
                          {/* Content */}
                          <div className="flex flex-col gap-1 flex-1">
                            <h3 className="text-[16px] font-bold text-[#191919] leading-6 font-sans">
                              eBay international shipping
                            </h3>
                            <p className="text-[14px] text-[#191919] leading-5 font-sans">
                              Ship to US address. eBay handles customs and international delivery. Reach 200M+ buyers.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Services */}
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-1">
                        <span className="text-[14px] font-bold text-[#191919] font-sans">Additional</span>
                        <button className="text-[14px] text-[#003AA5] underline text-left font-sans">
                          Exclude countries
                        </button>
                      </div>
                      
                      {/* Service Selector Dropdown */}
                      <div className="flex flex-col gap-4">
                        <button className="w-full h-12 px-4 bg-[#F7F7F7] border border-[#8F8F8F] rounded-[16px] flex items-center justify-between">
                          <div className="flex flex-col items-start">
                            <span className="text-[12px] text-[#707070] font-sans">Service</span>
                            <span className="text-[14px] text-[#191919] font-sans">Economy International</span>
                          </div>
                          <ChevronDown className="w-4 h-4 text-[#191919]" />
                        </button>

                        {/* FedEx International Card */}
                        <div className="w-full p-4 bg-[#F7F7F7] border-2 border-[#191919] rounded-[16px]">
                          <div className="flex gap-4">
                            {/* Logo */}
                            <div className="w-14 h-14 bg-white rounded-[16px] flex items-center justify-center flex-shrink-0">
                              <svg className="w-10 h-3" viewBox="0 0 40 12">
                                <path d="M0 0.5H8.5V2.5H2V5H7.5V7H2V11.5H0V0.5Z" fill="#29007C"/>
                                <path d="M9.5 6C9.5 3 11.5 0.5 15 0.5C18.5 0.5 20.5 3 20.5 6C20.5 9 18.5 11.5 15 11.5C11.5 11.5 9.5 9 9.5 6ZM18.5 6C18.5 4 17 2.5 15 2.5C13 2.5 11.5 4 11.5 6C11.5 8 13 9.5 15 9.5C17 9.5 18.5 8 18.5 6Z" fill="#FF5A00"/>
                                <path d="M22 0.5H24.5L28 5L31.5 0.5H34L29 6.5L34 11.5H31.5L28 7L24.5 11.5H22L27 6L22 0.5Z" fill="#FF5A00"/>
                                <circle cx="37.5" cy="9.5" r="2" fill="#FF5A00"/>
                              </svg>
                            </div>
                            
                            {/* Content */}
                            <div className="flex flex-col gap-1 flex-1">
                              <h3 className="text-[16px] font-bold text-[#191919] leading-6 font-sans">
                                FedEx International Connect Plus®
                              </h3>
                              <p className="text-[14px] text-[#191919] leading-5 font-sans">
                                Ship to each country directly. Customs and delivery are your responsibility.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Add Another Service Button */}
                        <button className="w-full h-10 border border-[#8F8F8F] rounded-full flex items-center justify-center">
                          <span className="text-[14px] text-[#191919] font-sans">Add another service</span>
                        </button>
                      </div>
                    </div>

                    {/* Cost Section */}
                    <div className="p-6 bg-[#F7F7F7] rounded-[16px] flex flex-col items-center gap-3">
                      <span className="text-[14px] text-[#707070] text-center font-sans">
                        Cost for international shipping
                      </span>
                      <span className="text-[20px] font-bold text-[#191919] font-sans">$33.51</span>
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[14px] text-[#707070] text-center font-sans">Paid by buyer</span>
                        <button className="text-[14px] text-[#707070] underline font-sans">How is this calculated?</button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Divider */}
                <div className="w-full h-px bg-[#E5E5E5]" />

                {/* Delivery Details Section */}
                <section className="flex flex-col gap-4">
                  <h2 className="text-[16px] font-bold text-[#191919] leading-6 font-sans">Delivery details</h2>
                  
                  {/* Delivery Details Card */}
                  <button className="w-full p-4 bg-white border border-[#8F8F8F] rounded-[16px] flex items-center justify-between">
                    <div className="flex flex-col gap-3">
                      {/* Item Location */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[14px] font-bold text-[#191919] font-sans">Item location</span>
                        <span className="text-[14px] text-[#707070] font-sans">San Jose, CA 95111</span>
                      </div>
                      
                      {/* Handling Time */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[14px] font-bold text-[#191919] font-sans">Handling time</span>
                        <span className="text-[14px] text-[#707070] font-sans">1 business day</span>
                      </div>
                      
                      {/* Domestic Returns */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[14px] font-bold text-[#191919] font-sans">Domestic returns</span>
                        <span className="text-[14px] text-[#707070] font-sans">60 days, buyer pays return shipping</span>
                      </div>
                      
                      {/* Refund Method */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[14px] font-bold text-[#191919] font-sans">Refund method</span>
                        <span className="text-[14px] text-[#707070] font-sans">Money back or replacement</span>
                      </div>
                      
                      {/* International Returns */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[14px] font-bold text-[#191919] font-sans">International returns</span>
                        <span className="text-[14px] text-[#707070] font-sans">60 days, buyer pays return shipping</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#191919] self-start" />
                  </button>
                </section>

                {/* Bottom Padding */}
                <div className="h-8" />
              </div>
            </div>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#191919] rounded-full" />
        </div>
      </div>

      {/* Delivery Method Sheet */}
      {showDeliverySheet && (
        <div 
          className="absolute inset-0 bg-black/50 rounded-[55px] overflow-hidden z-50"
          onClick={() => setShowDeliverySheet(false)}
        >
          <div 
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-6 pb-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Handle */}
            <div className="w-9 h-1 bg-[#E5E5E5] rounded-full mx-auto mb-6" />
            
            <h3 className="text-[16px] font-bold text-[#191919] mb-4 font-sans">Delivery method</h3>
            
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
                      : "bg-[#F7F7F7] border border-transparent"
                  }`}
                >
                  <span className="text-[14px] text-[#191919] font-sans">{method.label}</span>
                  {deliveryMethod === method.id && (
                    <div className="w-5 h-5 rounded-full bg-[#191919] flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

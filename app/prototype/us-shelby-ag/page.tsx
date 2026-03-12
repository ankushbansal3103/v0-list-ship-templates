"use client"

import { EbayShippingPage } from "@/components/ebay-shipping-page"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function USShelbyAGPrototype() {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Back Navigation */}
      <div className="fixed top-4 left-4 z-50">
        <Link 
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-sm text-white rounded-lg text-sm hover:bg-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Library
        </Link>
      </div>
      
      {/* Prototype Info Badge */}
      <div className="fixed top-4 right-4 z-50">
        <div className="px-4 py-2 bg-black/80 backdrop-blur-sm rounded-lg">
          <span className="text-green-400 text-xs font-medium">US-Shelby-AG</span>
          <span className="text-[#666] text-xs ml-2">v1.0 Active</span>
        </div>
      </div>
      
      {/* Prototype Content */}
      <div className="flex items-center justify-center py-8 min-h-screen">
        <EbayShippingPage />
      </div>
    </div>
  )
}

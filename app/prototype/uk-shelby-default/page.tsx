"use client"

import { EbayShippingPageUKDefault } from "@/components/ebay-shipping-page-uk-default"
import Link from "next/link"
import { ArrowLeft, Home } from "lucide-react"

export default function UKShelbyDefaultPrototype() {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b border-[#1f1f1f]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Library</span>
            </Link>
          </div>
          
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">eb</span>
            </div>
            <span className="text-white font-medium text-sm">Prototype Library</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 bg-green-500/20 rounded-full">
              <span className="text-green-400 text-xs font-medium">UK-Shelby-Default v1.0</span>
            </div>
            <Link 
              href="/"
              className="p-2 bg-[#1a1a1a] hover:bg-[#222] rounded-lg transition-colors"
              title="Home"
            >
              <Home className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Prototype Content */}
      <div className="flex items-center justify-center pt-16 pb-8 min-h-screen">
        <EbayShippingPageUKDefault />
      </div>
    </div>
  )
}

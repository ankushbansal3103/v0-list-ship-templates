import { EbayShippingHelixFRDesktop } from "@/components/ebay-shipping-helix-fr-desktop"
import Link from "next/link"

export default function FRHelixDesktopPrototypePage() {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Navigation Bar */}
      <div className="bg-[#111] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <Link 
          href="/"
          className="flex items-center gap-2 text-sm hover:text-blue-400 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Dashboard
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs px-2 py-1 rounded bg-[#222] text-[#888]">dWeb</span>
          <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">Active</span>
          <span className="font-medium text-sm">FR-Helix-Desktop</span>
        </div>
      </div>
      
      {/* Desktop Prototype - Full Width */}
      <div className="flex items-start justify-center py-8">
        <div className="shadow-2xl rounded-lg overflow-hidden" style={{ width: '1280px' }}>
          <EbayShippingHelixFRDesktop />
        </div>
      </div>
    </div>
  )
}

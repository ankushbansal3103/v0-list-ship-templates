import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { EbayShippingPageCADefaultAndroid } from "@/components/ebay-shipping-page-ca-default-android"

export default function CAShelbyDefaultAndroidPrototype() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#222] z-50">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-white hover:text-[#3665F3] transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Hub</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-[#666] text-sm">CA-Shelby-Default-Android</span>
            <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs">Active</span>
          </div>
        </div>
      </header>
      <main className="pt-24 pb-12 flex items-center justify-center">
        <EbayShippingPageCADefaultAndroid />
      </main>
      <footer className="fixed bottom-0 left-0 right-0 h-12 bg-[#0a0a0a]/80 backdrop-blur-md border-t border-[#222]">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <span className="text-[#666] text-sm">Platform: Android</span>
          <span className="text-[#666] text-sm">Segment: C2C</span>
          <span className="text-[#666] text-sm">Market: CA</span>
        </div>
      </footer>
    </div>
  )
}

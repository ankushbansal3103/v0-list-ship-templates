"use client"

import Link from "next/link"
import { ArrowLeft, Construction } from "lucide-react"
import { use } from "react"

export default function DraftPrototype({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const prototypeName = slug.toUpperCase().replace(/-/g, '-')
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Back Navigation */}
      <div className="fixed top-4 left-4 z-50">
        <Link 
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg text-sm hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Library
        </Link>
      </div>
      
      {/* Draft Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-20 h-20 bg-[#1a1a1a] rounded-full flex items-center justify-center mx-auto mb-6">
            <Construction className="w-10 h-10 text-[#666]" />
          </div>
          <h1 className="text-white text-2xl font-bold mb-2">{prototypeName}</h1>
          <p className="text-[#666] mb-8 max-w-md">
            This prototype is currently in draft status. Start building by copying the US-Shelby-AG template and customizing it for this market.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/prototype/us-shelby-ag"
              className="px-6 py-3 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              View US-Shelby-AG Template
            </Link>
            <Link
              href="/"
              className="px-6 py-3 bg-[#1a1a1a] border border-[#333] text-white rounded-lg text-sm hover:bg-[#222] transition-colors"
            >
              Browse Other Prototypes
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

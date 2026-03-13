"use client"

import Link from "next/link"
import { ArrowLeft, Construction, Home } from "lucide-react"
import { use } from "react"
import { getConfig } from "@/configs"
import { PrototypeRenderer } from "@/components/prototype-renderer"

export default function PrototypePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const config = getConfig(slug)
  
  // If config exists, render the config-driven prototype
  if (config) {
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
                <span className="text-green-400 text-xs font-medium">{config.name} v{config.version}</span>
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
        <div className="flex items-center justify-center pt-20 pb-8 min-h-screen">
          <PrototypeRenderer config={config} />
        </div>
      </div>
    )
  }
  
  // Fallback for prototypes without config (draft)
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

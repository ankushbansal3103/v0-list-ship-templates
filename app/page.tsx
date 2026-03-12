"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Copy, ExternalLink, ChevronRight, Check, X } from "lucide-react"
import { EbayShippingPage } from "@/components/ebay-shipping-page"

// Filter options
const platforms = [
  { id: "ios", name: "iOS", icon: "" },
  { id: "android", name: "Android", icon: "🤖" },
  { id: "mweb", name: "mWeb", icon: "📱" },
  { id: "dweb", name: "dWeb", icon: "🖥️" },
]

const segments = [
  { id: "c2c", name: "C2C", icon: "👤" },
  { id: "b2c", name: "B2C", icon: "🏪" },
]

// Site data with prototypes
const sites = [
  {
    id: "us",
    name: "United States",
    code: "US",
    flag: "🇺🇸",
    prototypes: [
      { id: "us-shelby-ag", name: "US-Shelby-AG", description: "Shipping configuration with Delivery, Package Details, Services", status: "active", route: "/prototype/us-shelby-ag", platform: "ios", segment: "c2c" },
      { id: "us-flat-rate", name: "US-Flat-Rate", description: "Simplified flat rate shipping flow", status: "draft", route: "/prototype/us-flat-rate", platform: "ios", segment: "b2c" },
    ]
  },
  {
    id: "uk",
    name: "United Kingdom",
    code: "UK",
    flag: "🇬🇧",
    prototypes: [
      { id: "uk-standard", name: "UK-Standard-V1", description: "Standard UK shipping with Royal Mail integration", status: "draft", route: "/prototype/uk-standard", platform: "android", segment: "c2c" },
      { id: "uk-express", name: "UK-Express-V1", description: "Express delivery options for UK sellers", status: "draft", route: "/prototype/uk-express", platform: "mweb", segment: "b2c" },
    ]
  },
  {
    id: "de",
    name: "Germany",
    code: "DE",
    flag: "🇩🇪",
    prototypes: [
      { id: "de-standard", name: "DE-Standard-V1", description: "German market shipping with DHL/Hermes", status: "draft", route: "/prototype/de-standard", platform: "ios", segment: "c2c" },
      { id: "de-returns", name: "DE-Returns-V1", description: "Enhanced returns flow for German regulations", status: "draft", route: "/prototype/de-returns", platform: "dweb", segment: "b2c" },
    ]
  },
  {
    id: "fr",
    name: "France",
    code: "FR",
    flag: "🇫🇷",
    prototypes: [
      { id: "fr-standard", name: "FR-Standard-V1", description: "French market with La Poste/Colissimo", status: "draft", route: "/prototype/fr-standard", platform: "android", segment: "c2c" },
    ]
  },
  {
    id: "it",
    name: "Italy",
    code: "IT",
    flag: "🇮🇹",
    prototypes: [
      { id: "it-standard", name: "IT-Standard-V1", description: "Italian market shipping configuration", status: "draft", route: "/prototype/it-standard", platform: "mweb", segment: "c2c" },
    ]
  },
  {
    id: "ca",
    name: "Canada",
    code: "CA",
    flag: "🇨🇦",
    prototypes: [
      { id: "ca-standard", name: "CA-Standard-V1", description: "Canada Post integration for Canadian sellers", status: "draft", route: "/prototype/ca-standard", platform: "ios", segment: "b2c" },
    ]
  },
  {
    id: "au",
    name: "Australia",
    code: "AU",
    flag: "🇦🇺",
    prototypes: [
      { id: "au-standard", name: "AU-Standard-V1", description: "Australia Post shipping configuration", status: "draft", route: "/prototype/au-standard", platform: "dweb", segment: "c2c" },
    ]
  },
  {
    id: "row",
    name: "Rest of World",
    code: "RoW",
    flag: "🌍",
    prototypes: [
      { id: "row-international", name: "RoW-International-V1", description: "Generic international shipping template", status: "draft", route: "/prototype/row-international", platform: "mweb", segment: "b2c" },
    ]
  },
]

export default function PrototypeLibrary() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSite, setSelectedSite] = useState<string | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalPrompt, setModalPrompt] = useState("")

  // Filter sites and prototypes based on all filters
  const filteredSites = sites
    .filter(site => !selectedSite || site.id === selectedSite)
    .map(site => ({
      ...site,
      prototypes: site.prototypes.filter(p => {
        const matchesPlatform = !selectedPlatform || p.platform === selectedPlatform
        const matchesSegment = !selectedSegment || p.segment === selectedSegment
        const matchesSearch = !searchQuery || 
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesPlatform && matchesSegment && matchesSearch
      })
    })).filter(site => site.prototypes.length > 0)

  const totalPrototypes = filteredSites.reduce((acc, site) => acc + site.prototypes.length, 0)
  const activeFiltersCount = [selectedSite, selectedPlatform, selectedSegment].filter(Boolean).length
  const hasActiveFilters = activeFiltersCount > 0 || searchQuery.length > 0

  // Recently used prototypes (in production, this would come from localStorage or a database)
  const recentlyUsed = [
    { siteId: "us", prototypeId: "us-shelby-ag" },
  ]
  
  const recentPrototypes = recentlyUsed.map(r => {
    const site = sites.find(s => s.id === r.siteId)
    const prototype = site?.prototypes.find(p => p.id === r.prototypeId)
    return prototype ? { ...prototype, siteCode: site?.code, siteFlag: site?.flag } : null
  }).filter(Boolean)

  const handleCopy = async (prototypeId: string) => {
    setCopiedId(prototypeId)
    
    // Fetch the actual template code from our API
    try {
      const response = await fetch(`/api/template/${prototypeId}`)
      const data = await response.json()
      
      // Use the actual code, not just instructions
      const code = data.code
      
      // Show modal with the actual code
      setModalPrompt(code)
      setShowModal(true)
      setCopiedId(null)
      
    } catch {
      // Fallback - tell user to contact support
      setModalPrompt(`Error loading template "${prototypeId}". Please try again or contact support.`)
      setShowModal(true)
      setCopiedId(null)
    }
  }
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(modalPrompt)
      // Open v0.dev after successful copy
      window.open('https://v0.dev', '_blank')
    } catch {
      // Fallback for clipboard failure
      console.log("[v0] Clipboard failed, prompt available in textarea")
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-[#1f1f1f] bg-[#0a0a0a] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">eb</span>
            </div>
            <span className="text-white font-semibold text-lg">Prototype Library</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link 
              href="/library" 
              className="text-[#888] hover:text-white text-sm transition-colors"
            >
              Components
            </Link>
            <button className="px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
              New Prototype
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Find your Prototype
          </h1>
          <p className="text-[#888] text-lg max-w-2xl mx-auto mb-10">
            Browse shipping prototypes by market. Select a template, create a copy, and build your PRD-ready prototype.
          </p>
          
          {/* Search */}
          <div className="max-w-xl mx-auto relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666]" />
            <input
              type="text"
              placeholder="Search by site, country, or prototype name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-[#1a1a1a] border border-[#333] rounded-xl text-white placeholder:text-[#666] focus:outline-none focus:border-[#555] transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="max-w-5xl mx-auto flex flex-wrap gap-6 justify-center items-start">
            {/* Market Filter */}
            <div className="flex items-center gap-3">
              <span className="text-[#666] text-xs uppercase tracking-wider">Market</span>
              <div className="flex flex-wrap gap-2">
                {sites.map((site) => (
                  <button
                    key={site.id}
                    onClick={() => setSelectedSite(selectedSite === site.id ? null : site.id)}
                    className={`px-3 py-1.5 rounded-lg border text-sm transition-all flex items-center gap-1.5 ${
                      selectedSite === site.id 
                        ? "bg-blue-600 border-blue-500 text-white" 
                        : "bg-[#1a1a1a] border-[#333] text-[#888] hover:border-[#444] hover:text-white"
                    }`}
                  >
                    <span>{site.flag}</span>
                    <span>{site.code}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Platform Filter */}
            <div className="flex items-center gap-3">
              <span className="text-[#666] text-xs uppercase tracking-wider">Platform</span>
              <div className="flex gap-2">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(selectedPlatform === platform.id ? null : platform.id)}
                    className={`px-3 py-1.5 rounded-lg border text-sm transition-all flex items-center gap-1.5 ${
                      selectedPlatform === platform.id 
                        ? "bg-blue-600 border-blue-500 text-white" 
                        : "bg-[#1a1a1a] border-[#333] text-[#888] hover:border-[#444] hover:text-white"
                    }`}
                  >
                    <span>{platform.icon}</span>
                    <span>{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Segment Filter */}
            <div className="flex items-center gap-3">
              <span className="text-[#666] text-xs uppercase tracking-wider">Segment</span>
              <div className="flex gap-2">
                {segments.map((segment) => (
                  <button
                    key={segment.id}
                    onClick={() => setSelectedSegment(selectedSegment === segment.id ? null : segment.id)}
                    className={`px-3 py-1.5 rounded-lg border text-sm transition-all flex items-center gap-1.5 ${
                      selectedSegment === segment.id 
                        ? "bg-blue-600 border-blue-500 text-white" 
                        : "bg-[#1a1a1a] border-[#333] text-[#888] hover:border-[#444] hover:text-white"
                    }`}
                  >
                    <span>{segment.icon}</span>
                    <span>{segment.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filters Summary */}
          {activeFiltersCount > 0 && (
            <div className="max-w-4xl mx-auto mt-6 flex items-center justify-center gap-2">
              <span className="text-[#666] text-sm">{totalPrototypes} prototypes found</span>
              <button
                onClick={() => {
                  setSelectedSite(null)
                  setSelectedPlatform(null)
                  setSelectedSegment(null)
                }}
                className="text-blue-400 text-sm hover:text-blue-300 flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Recently Used Carousel - shown when no filters active */}
      {!hasActiveFilters && recentPrototypes.length > 0 && (
        <section className="px-6 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-white font-semibold">Recently Used</h2>
              <span className="text-[#666] text-sm">Pick up where you left off</span>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-2">
              {recentPrototypes.map((prototype) => prototype && (
                <div 
                  key={prototype.id}
                  className="flex-shrink-0 w-72 bg-[#111] border border-[#222] rounded-xl overflow-hidden hover:border-blue-500/50 transition-colors"
                >
                  <div className="h-40 bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
                    {prototype.id === 'us-shelby-ag' ? (
                      <div 
                        className="pointer-events-none"
                        style={{ transform: 'scale(0.16)', transformOrigin: 'center center' }}
                      >
                        <EbayShippingPage />
                      </div>
                    ) : (
                      <div className="w-12 h-24 bg-[#222] rounded-lg border border-[#333]" />
                    )}
                  </div>
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs px-1.5 py-0.5 rounded bg-[#1a1a1a] border border-[#333] text-[#888]">
                        {prototype.siteFlag} {prototype.siteCode}
                      </span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-green-500/20 text-green-400">
                        {prototype.status}
                      </span>
                    </div>
                    <h4 className="text-white text-sm font-medium truncate">{prototype.name}</h4>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleCopy(prototype.id)}
                        className="flex-1 text-xs py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Use Template
                      </button>
                      <Link
                        href={prototype.route}
                        className="px-3 py-1.5 text-xs bg-[#1a1a1a] border border-[#333] text-white rounded-lg hover:bg-[#222] transition-colors"
                      >
                        Preview
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prototypes Grid */}
      <section className="px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-white font-semibold">{hasActiveFilters ? 'Search Results' : 'All Prototypes'}</h2>
            <span className="text-[#666] text-sm">({totalPrototypes} results)</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSites.flatMap((site) => 
              site.prototypes.map((prototype) => (
                  <div 
                    key={prototype.id}
                    className="bg-[#0a0a0a] border border-[#222] rounded-xl overflow-hidden hover:border-[#333] transition-colors"
                  >
                    {/* Live Prototype Preview */}
                    <div className="h-64 bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
                      {prototype.status === 'active' && prototype.id === 'us-shelby-ag' ? (
                        <div 
                          className="pointer-events-none"
                          style={{
                            transform: 'scale(0.22)',
                            transformOrigin: 'center center',
                          }}
                        >
                          <EbayShippingPage />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-16 h-32 bg-[#222] rounded-[8px] border border-[#333] flex items-center justify-center">
                            <div className="w-12 h-28 bg-[#1a1a1a] rounded-[6px]" />
                          </div>
                          <span className="text-[#444] text-xs">Coming Soon</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-white font-medium">{prototype.name}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          prototype.status === 'active' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-[#333] text-[#888]'
                        }`}>
                          {prototype.status}
                        </span>
                      </div>
                      
                      {/* Market, Platform & Segment Tags */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs px-2 py-1 rounded bg-[#1a1a1a] border border-[#333] text-[#888]">
                          {site.code}
                        </span>
                        <span className="text-xs px-2 py-1 rounded bg-[#1a1a1a] border border-[#333] text-[#888]">
                          {platforms.find(p => p.id === prototype.platform)?.name}
                        </span>
                        <span className="text-xs px-2 py-1 rounded bg-[#1a1a1a] border border-[#333] text-[#888]">
                          {prototype.segment.toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-[#666] text-sm mb-4">{prototype.description}</p>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(prototype.id)}
                          disabled={prototype.status !== 'active'}
                          className={`flex-1 h-10 flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors ${
                            prototype.status === 'active'
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-[#222] text-[#666] cursor-not-allowed'
                          }`}
                        >
                          {copiedId === prototype.id ? (
                            <>
                              <Check className="w-4 h-4" />
                              Copied! Opening v0...
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              Use Template
                            </>
                          )}
                        </button>
                        <Link
                          href={prototype.status === 'active' ? prototype.route : '#'}
                          onClick={(e) => prototype.status !== 'active' && e.preventDefault()}
                          className={`h-10 px-4 flex items-center gap-2 border rounded-lg text-sm transition-colors ${
                            prototype.status === 'active'
                              ? 'bg-[#1a1a1a] border-[#333] text-white hover:bg-[#222]'
                              : 'bg-[#111] border-[#222] text-[#555] cursor-not-allowed'
                          }`}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Preview
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
          </div>
        </div>
      </section>

      {/* Recently Used Carousel - shown at bottom when filters are active */}
      {hasActiveFilters && recentPrototypes.length > 0 && (
        <section className="px-6 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-white font-semibold">Recently Used</h2>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-2">
              {recentPrototypes.map((prototype) => prototype && (
                <div 
                  key={prototype.id}
                  className="flex-shrink-0 w-72 bg-[#111] border border-[#222] rounded-xl overflow-hidden hover:border-blue-500/50 transition-colors"
                >
                  <div className="h-40 bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
                    {prototype.id === 'us-shelby-ag' ? (
                      <div 
                        className="pointer-events-none"
                        style={{ transform: 'scale(0.16)', transformOrigin: 'center center' }}
                      >
                        <EbayShippingPage />
                      </div>
                    ) : (
                      <div className="w-12 h-24 bg-[#222] rounded-lg border border-[#333]" />
                    )}
                  </div>
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs px-1.5 py-0.5 rounded bg-[#1a1a1a] border border-[#333] text-[#888]">
                        {prototype.siteFlag} {prototype.siteCode}
                      </span>
                    </div>
                    <h4 className="text-white text-sm font-medium truncate">{prototype.name}</h4>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleCopy(prototype.id)}
                        className="flex-1 text-xs py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Use Template
                      </button>
                      <Link
                        href={prototype.route}
                        className="px-3 py-1.5 text-xs bg-[#1a1a1a] border border-[#333] text-white rounded-lg hover:bg-[#222] transition-colors"
                      >
                        Preview
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-[#1f1f1f] py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-[#666]">
          <span>eBay Prototype Library</span>
          <span>US-Shelby-AG v1.0</span>
        </div>
      </footer>

      {/* Copy Template Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111] border border-[#333] rounded-2xl max-w-4xl w-full max-h-[85vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#222]">
              <div>
                <h2 className="text-white font-semibold text-lg">Copy Prototype Code</h2>
                <p className="text-[#888] text-sm">This is the exact code for the prototype. Paste into v0 to create your copy.</p>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="w-8 h-8 flex items-center justify-center text-[#666] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="flex-1 p-4 overflow-auto">
              <textarea
                readOnly
                value={modalPrompt}
                className="w-full h-[400px] bg-[#0a0a0a] border border-[#333] rounded-lg p-4 text-[#ccc] text-xs font-mono resize-none focus:outline-none focus:border-blue-500"
              />
            </div>
            
            {/* Modal Actions */}
            <div className="p-4 border-t border-[#222] flex items-center gap-3">
              <button
                onClick={copyToClipboard}
                className="flex-1 h-11 flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <Copy className="w-4 h-4" />
                Copy Code & Open v0.dev
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="h-11 px-6 bg-[#1a1a1a] border border-[#333] text-white rounded-lg hover:bg-[#222] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

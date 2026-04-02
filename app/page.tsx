"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ExternalLink, X, ChevronRight } from "lucide-react"
import { EbayShippingPage } from "@/components/ebay-shipping-page"
import { EbayShippingPageDefault } from "@/components/ebay-shipping-page-default"
import { EbayShippingPageUKDefault } from "@/components/ebay-shipping-page-uk-default"
import { EbayShippingPageDEDefault } from "@/components/ebay-shipping-page-de-default"
import { EbayShippingPageFRDefault } from "@/components/ebay-shipping-page-fr-default"
import { EbayShippingPageITDefault } from "@/components/ebay-shipping-page-it-default"
import { EbayShippingPageCADefault } from "@/components/ebay-shipping-page-ca-default"
import { EbayShippingPageAUDefault } from "@/components/ebay-shipping-page-au-default"
import { EbayShippingPageRoWDefault } from "@/components/ebay-shipping-page-row-default"
import { EbayShippingPageDefaultAndroid } from "@/components/ebay-shipping-page-default-android"
import { EbayShippingPageUKDefaultAndroid } from "@/components/ebay-shipping-page-uk-default-android"
import { EbayShippingPageDEDefaultAndroid } from "@/components/ebay-shipping-page-de-default-android"
import { EbayShippingPageFRDefaultAndroid } from "@/components/ebay-shipping-page-fr-default-android"
import { EbayShippingPageITDefaultAndroid } from "@/components/ebay-shipping-page-it-default-android"
import { EbayShippingPageCADefaultAndroid } from "@/components/ebay-shipping-page-ca-default-android"
import { EbayShippingPageAUDefaultAndroid } from "@/components/ebay-shipping-page-au-default-android"
import { EbayShippingPageRoWDefaultAndroid } from "@/components/ebay-shipping-page-row-default-android"
import { EbayShippingPageUKAG } from "@/components/ebay-shipping-page-uk-ag"
import { EbayShippingPageCAAG } from "@/components/ebay-shipping-page-ca-ag"
import { EbayShippingPageAUAG } from "@/components/ebay-shipping-page-au-ag"
import { EbayShippingPageUKAGAndroid } from "@/components/ebay-shipping-page-uk-ag-android"
import { EbayShippingPageCAAGAndroid } from "@/components/ebay-shipping-page-ca-ag-android"
import { EbayShippingPageAUAGAndroid } from "@/components/ebay-shipping-page-au-ag-android"
import { EbayShippingHelixFRDesktop } from "@/components/ebay-shipping-helix-fr-desktop"
import { EbayShippingHelixDEAGDesktop } from "@/components/ebay-shipping-helix-de-ag-desktop"

// Filter options
const platforms = [
  { id: "ios", name: "iOS", icon: "" },
  { id: "android", name: "Android", icon: "🤖" },
  { id: "mweb", name: "mWeb", icon: "📱" },
  { id: "dweb", name: "dWeb", icon: "🖥️" },
]



// Site data with prototypes
const sites = [
  {
    id: "us",
    name: "United States",
    code: "US",
    flag: "🇺🇸",
    prototypes: [
      { id: "us-shelby-ag", name: "US-Shelby-AG", description: "Shipping configuration with Authenticity Guarantee, eBay International Shipping", status: "active", route: "/prototype/us-shelby-ag", platform: "ios", segment: "c2c" },
      { id: "us-shelby-default", name: "US-Shelby-Default", description: "Default services view with USPS, FedEx, UPS carrier selection", status: "active", route: "/prototype/us-shelby-default", platform: "ios", segment: "c2c" },
      { id: "us-shelby-default-android", name: "US-Shelby-Default-Android", description: "Default services view for Android platform", status: "active", route: "/prototype/us-shelby-default-android", platform: "android", segment: "c2c" },
      { id: "us-helix-simple", name: "US-Helix-Simple", description: "Helix Simple desktop shipping configuration for US market", status: "active", route: "/prototype/fr-helix-desktop", platform: "dweb", segment: "c2c" },
      { id: "us-flat-rate", name: "US-Flat-Rate", description: "Simplified flat rate shipping flow", status: "draft", route: "/prototype/us-flat-rate", platform: "ios", segment: "b2c" },
    ]
  },
  {
    id: "uk",
    name: "United Kingdom",
    code: "UK",
    flag: "🇬🇧",
    prototypes: [
      { id: "uk-shelby-default", name: "UK-Shelby-Default", description: "Default services view for UK market", status: "active", route: "/prototype/uk-shelby-default", platform: "ios", segment: "c2c" },
      { id: "uk-shelby-default-android", name: "UK-Shelby-Default-Android", description: "Default services view for UK market (Android)", status: "active", route: "/prototype/uk-shelby-default-android", platform: "android", segment: "c2c" },
      { id: "uk-shelby-ag", name: "UK-Shelby-AG", description: "AG shipping configuration for UK market", status: "active", route: "/prototype/uk-shelby-ag", platform: "ios", segment: "c2c" },
      { id: "uk-shelby-ag-android", name: "UK-Shelby-AG-Android", description: "AG shipping configuration for UK market (Android)", status: "active", route: "/prototype/uk-shelby-ag-android", platform: "android", segment: "c2c" },
      { id: "uk-helix-simple", name: "UK-Helix-Simple", description: "Helix Simple desktop shipping configuration for UK market", status: "active", route: "/prototype/fr-helix-desktop", platform: "dweb", segment: "c2c" },
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
      { id: "de-shelby-default", name: "DE-Shelby-Default", description: "Default services view for German market", status: "active", route: "/prototype/de-shelby-default", platform: "ios", segment: "c2c" },
      { id: "de-shelby-default-android", name: "DE-Shelby-Default-Android", description: "Default services view for German market (Android)", status: "active", route: "/prototype/de-shelby-default-android", platform: "android", segment: "c2c" },
      { id: "de-helix-simple", name: "DE-Helix-Simple", description: "Helix Simple desktop shipping configuration for German market", status: "active", route: "/prototype/fr-helix-desktop", platform: "dweb", segment: "c2c" },
      { id: "de-helix-ag", name: "DE-Helix-AG", description: "Complete Your Listing with Authenticity Guarantee for German market", status: "active", route: "/prototype/de-helix-ag-desktop", platform: "dweb", segment: "c2c" },
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
      { id: "fr-shelby-default", name: "FR-Shelby-Default", description: "Default services view for French market", status: "active", route: "/prototype/fr-shelby-default", platform: "ios", segment: "c2c" },
      { id: "fr-shelby-default-android", name: "FR-Shelby-Default-Android", description: "Default services view for French market (Android)", status: "active", route: "/prototype/fr-shelby-default-android", platform: "android", segment: "c2c" },
      { id: "fr-helix-simple", name: "FR-Helix-Simple", description: "Helix Simple desktop shipping configuration for French market", status: "active", route: "/prototype/fr-helix-desktop", platform: "dweb", segment: "c2c" },
      { id: "fr-standard", name: "FR-Standard-V1", description: "French market with La Poste/Colissimo", status: "draft", route: "/prototype/fr-standard", platform: "android", segment: "c2c" },
    ]
  },
  {
    id: "it",
    name: "Italy",
    code: "IT",
    flag: "🇮🇹",
    prototypes: [
      { id: "it-shelby-default", name: "IT-Shelby-Default", description: "Default services view for Italian market", status: "active", route: "/prototype/it-shelby-default", platform: "ios", segment: "c2c" },
      { id: "it-shelby-default-android", name: "IT-Shelby-Default-Android", description: "Default services view for Italian market (Android)", status: "active", route: "/prototype/it-shelby-default-android", platform: "android", segment: "c2c" },
      { id: "it-helix-simple", name: "IT-Helix-Simple", description: "Helix Simple desktop shipping configuration for Italian market", status: "active", route: "/prototype/fr-helix-desktop", platform: "dweb", segment: "c2c" },
      { id: "it-standard", name: "IT-Standard-V1", description: "Italian market shipping configuration", status: "draft", route: "/prototype/it-standard", platform: "mweb", segment: "c2c" },
    ]
  },
  {
    id: "ca",
    name: "Canada",
    code: "CA",
    flag: "🇨🇦",
    prototypes: [
      { id: "ca-shelby-default", name: "CA-Shelby-Default", description: "Default services view for Canadian market", status: "active", route: "/prototype/ca-shelby-default", platform: "ios", segment: "c2c" },
      { id: "ca-shelby-default-android", name: "CA-Shelby-Default-Android", description: "Default services view for Canadian market (Android)", status: "active", route: "/prototype/ca-shelby-default-android", platform: "android", segment: "c2c" },
      { id: "ca-shelby-ag", name: "CA-Shelby-AG", description: "AG shipping configuration for Canadian market", status: "active", route: "/prototype/ca-shelby-ag", platform: "ios", segment: "c2c" },
      { id: "ca-shelby-ag-android", name: "CA-Shelby-AG-Android", description: "AG shipping configuration for Canadian market (Android)", status: "active", route: "/prototype/ca-shelby-ag-android", platform: "android", segment: "c2c" },
      { id: "ca-helix-simple", name: "CA-Helix-Simple", description: "Helix Simple desktop shipping configuration for Canadian market", status: "active", route: "/prototype/fr-helix-desktop", platform: "dweb", segment: "c2c" },
      { id: "ca-standard", name: "CA-Standard-V1", description: "Canada Post integration for Canadian sellers", status: "draft", route: "/prototype/ca-standard", platform: "ios", segment: "b2c" },
    ]
  },
  {
    id: "au",
    name: "Australia",
    code: "AU",
    flag: "🇦🇺",
    prototypes: [
      { id: "au-shelby-default", name: "AU-Shelby-Default", description: "Default services view for Australian market", status: "active", route: "/prototype/au-shelby-default", platform: "ios", segment: "c2c" },
      { id: "au-shelby-default-android", name: "AU-Shelby-Default-Android", description: "Default services view for Australian market (Android)", status: "active", route: "/prototype/au-shelby-default-android", platform: "android", segment: "c2c" },
      { id: "au-shelby-ag", name: "AU-Shelby-AG", description: "AG shipping configuration for Australian market", status: "active", route: "/prototype/au-shelby-ag", platform: "ios", segment: "c2c" },
      { id: "au-shelby-ag-android", name: "AU-Shelby-AG-Android", description: "AG shipping configuration for Australian market (Android)", status: "active", route: "/prototype/au-shelby-ag-android", platform: "android", segment: "c2c" },
      { id: "au-helix-simple", name: "AU-Helix-Simple", description: "Helix Simple desktop shipping configuration for Australian market", status: "active", route: "/prototype/fr-helix-desktop", platform: "dweb", segment: "c2c" },
      { id: "au-standard", name: "AU-Standard-V1", description: "Australia Post shipping configuration", status: "draft", route: "/prototype/au-standard", platform: "dweb", segment: "c2c" },
    ]
  },
  {
    id: "row",
    name: "Rest of World",
    code: "RoW",
    flag: "🌍",
    prototypes: [
      { id: "row-shelby-default", name: "RoW-Shelby-Default", description: "Default services view for Rest of World", status: "active", route: "/prototype/row-shelby-default", platform: "ios", segment: "c2c" },
      { id: "row-shelby-default-android", name: "RoW-Shelby-Default-Android", description: "Default services view for Rest of World (Android)", status: "active", route: "/prototype/row-shelby-default-android", platform: "android", segment: "c2c" },
      { id: "row-helix-simple", name: "RoW-Helix-Simple", description: "Helix Simple desktop shipping configuration for Rest of World", status: "active", route: "/prototype/fr-helix-desktop", platform: "dweb", segment: "c2c" },
      { id: "row-international", name: "RoW-International-V1", description: "Generic international shipping template", status: "draft", route: "/prototype/row-international", platform: "mweb", segment: "b2c" },
    ]
  },
]

export default function PrototypeLibrary() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSite, setSelectedSite] = useState<string | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [recentlyUsedIds, setRecentlyUsedIds] = useState<{siteId: string, prototypeId: string}[]>([])
  const [isClient, setIsClient] = useState(false)

  // Get all active prototypes for random selection
  const allActivePrototypes = sites.flatMap(site => 
    site.prototypes
      .filter(p => p.status === 'active')
      .map(p => ({ siteId: site.id, prototypeId: p.id }))
  )

  // Default prototypes to show before client hydration (deterministic, no randomness)
  const defaultPrototypes = [
    { siteId: "us", prototypeId: "us-shelby-ag" },
    { siteId: "us", prototypeId: "us-shelby-default" },
    { siteId: "uk", prototypeId: "uk-shelby-default" }
  ]

  // Initialize recently used from localStorage or use defaults
  useEffect(() => {
    setIsClient(true)
    const stored = localStorage.getItem('recentlyUsedPrototypes')
    if (stored) {
      try {
        setRecentlyUsedIds(JSON.parse(stored))
      } catch {
        setRecentlyUsedIds(defaultPrototypes)
        localStorage.setItem('recentlyUsedPrototypes', JSON.stringify(defaultPrototypes))
      }
    } else {
      // Use deterministic default prototypes for first-time visitors
      setRecentlyUsedIds(defaultPrototypes)
      localStorage.setItem('recentlyUsedPrototypes', JSON.stringify(defaultPrototypes))
    }
  }, [])

  // Function to track prototype usage
  const trackPrototypeUsage = (siteId: string, prototypeId: string) => {
    setRecentlyUsedIds(prev => {
      const filtered = prev.filter(r => r.prototypeId !== prototypeId)
      const updated = [{ siteId, prototypeId }, ...filtered].slice(0, 3)
      localStorage.setItem('recentlyUsedPrototypes', JSON.stringify(updated))
      return updated
    })
  }

  // Filter sites and prototypes based on all filters
  const filteredSites = sites
    .filter(site => !selectedSite || site.id === selectedSite)
    .map(site => {
      // Split search query into individual words for multi-word matching
      const searchWords = searchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean)
      
      // Check if all search words match against site fields
      const siteSearchText = `${site.name} ${site.code} ${site.id}`.toLowerCase()
      const siteMatchesSearch = searchWords.length === 0 || 
        searchWords.every(word => siteSearchText.includes(word))
      
      return {
        ...site,
        prototypes: site.prototypes.filter(p => {
          const matchesPlatform = !selectedPlatform || p.platform === selectedPlatform
          
          // Combine all searchable prototype fields
          const prototypeSearchText = `${p.name} ${p.description} ${p.id} ${site.name} ${site.code}`.toLowerCase()
          
          // All search words must be found somewhere in the combined text
          const prototypeMatchesSearch = searchWords.length === 0 || 
            searchWords.every(word => prototypeSearchText.includes(word))
          
          return matchesPlatform && prototypeMatchesSearch
        })
      }
    }).filter(site => site.prototypes.length > 0)

  const totalPrototypes = filteredSites.reduce((acc, site) => acc + site.prototypes.length, 0)
  const activeFiltersCount = [selectedSite, selectedPlatform].filter(Boolean).length
  const hasActiveFilters = activeFiltersCount > 0 || searchQuery.length > 0

// Map recently used IDs to full prototype objects (filter out desktop/dweb)
  const recentPrototypes = recentlyUsedIds.map(r => {
  const site = sites.find(s => s.id === r.siteId)
  const prototype = site?.prototypes.find(p => p.id === r.prototypeId)
  return prototype ? { ...prototype, siteId: site?.id, siteCode: site?.code, siteFlag: site?.flag } : null
  }).filter(p => p && p.platform !== 'dweb')

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-[#1f1f1f] bg-[#0a0a0a] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-white flex items-center justify-center">
              <Image 
                src="/images/evo-studio-logo.png" 
                alt="eVO Studio" 
                width={80} 
                height={80} 
                className="object-cover scale-[2.2]"
              />
            </div>
            <span className="text-white font-semibold text-lg">eVO Studio</span>
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
          </div>

          {/* Active Filters Summary */}
          {activeFiltersCount > 0 && (
            <div className="max-w-4xl mx-auto mt-6 flex items-center justify-center gap-2">
              <span className="text-[#666] text-sm">{totalPrototypes} prototypes found</span>
              <button
                onClick={() => {
                  setSelectedSite(null)
                  setSelectedPlatform(null)
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

      {/* Recently Used - Always show 3 prototypes */}
      {!hasActiveFilters && isClient && recentPrototypes.length > 0 && (
        <section className="px-6 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-white font-semibold">Recently Used</h2>
              <span className="text-[#666] text-sm">Pick up where you left off</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentPrototypes.slice(0, 3).map((prototype) => prototype && (
                <div 
                  key={prototype.id}
                  className="bg-[#0a0a0a] border border-[#222] rounded-xl overflow-hidden hover:border-[#444] transition-colors"
                >
                  {/* Live Prototype Preview */}
                  <div className="h-56 bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
                    {prototype.status === 'active' && prototype.id === 'us-shelby-ag' ? (
                      <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
                        <EbayShippingPage />
                      </div>
                    ) : prototype.status === 'active' && prototype.id === 'us-shelby-default' ? (
                      <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
                        <EbayShippingPageDefault />
                      </div>
                    ) : prototype.status === 'active' && prototype.id === 'us-shelby-default-android' ? (
                      <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
                        <EbayShippingPageDefaultAndroid />
                      </div>
                    ) : prototype.status === 'active' && prototype.id === 'uk-shelby-default' ? (
                      <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
                        <EbayShippingPageUKDefault />
                      </div>
                    ) : prototype.status === 'active' && prototype.id === 'uk-shelby-default-android' ? (
                      <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
                        <EbayShippingPageUKDefaultAndroid />
                      </div>
                    ) : prototype.status === 'active' && prototype.id === 'uk-shelby-ag' ? (
                      <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
                        <EbayShippingPageUKAG />
                      </div>
                    ) : prototype.status === 'active' && prototype.id === 'uk-shelby-ag-android' ? (
                      <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
                        <EbayShippingPageUKAGAndroid />
                      </div>
                    ) : prototype.status === 'active' && prototype.id === 'de-shelby-default' ? (
                      <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
                        <EbayShippingPageDEDefault />
                      </div>
                    ) : prototype.status === 'active' && prototype.id === 'de-shelby-default-android' ? (
                      <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
                        <EbayShippingPageDEDefaultAndroid />
                      </div>
                    ) : prototype.status === 'active' && prototype.id === 'fr-shelby-default' ? (
                      <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
                        <EbayShippingPageFRDefault />
                      </div>
) : prototype.status === 'active' && prototype.id === 'fr-shelby-default-android' ? (
  <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
  <EbayShippingPageFRDefaultAndroid />
  </div>
  ) : prototype.status === 'active' && prototype.platform === 'dweb' ? (
  <div className="flex items-center justify-center w-full h-full p-3" style={{ fontFamily: "'Market Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>
    {/* Desktop Monitor Frame */}
    <div className="flex flex-col items-center">
      {/* Monitor */}
      <div className="w-[265px] bg-[#1a1a1a] rounded-t-lg p-1.5">
        <div className="bg-white rounded-sm overflow-hidden">
          {/* Browser Tab Bar */}
          <div className="bg-[#DEE1E6] px-2 py-1 flex items-center gap-1">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ED6A5E]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#F4BF4F]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#61C554]" />
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="bg-white rounded-sm px-3 py-0.5 text-[6px] text-[#555] flex items-center gap-1">
                <svg className="w-2 h-2 text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                ebay.fr
              </div>
            </div>
          </div>
          {/* Page Content */}
          <div className="p-2 bg-[#FAFAFA]">
            <div className="text-[6px] font-bold text-[#191919] mb-1.5 tracking-wide">DELIVERY</div>
            <div className="flex gap-1 mb-2">
              {/* Shipping or pickup - Selected */}
              <div className="flex-1 bg-[#F7F7F7] border-2 border-[#191919] rounded p-1.5">
                <svg className="w-3 h-3 text-[#191919] mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 17h8M8 17a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 104 0 2 2 0 00-4 0zm-8 0H5a2 2 0 01-2-2V6h12v9m-7 2h7m0 0h3l3-3V9h-6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="text-[5px] font-bold text-[#191919] leading-tight">Shipping or pickup</div>
              </div>
              {/* Shipping only */}
              <div className="flex-1 bg-white border border-[#C4C4C4] rounded p-1.5">
                <svg className="w-3 h-3 text-[#707070] mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="text-[5px] text-[#707070] leading-tight">Shipping only</div>
              </div>
              {/* Pick up only */}
              <div className="flex-1 bg-white border border-[#C4C4C4] rounded p-1.5">
                <svg className="w-3 h-3 text-[#707070] mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="text-[5px] text-[#707070] leading-tight">Pick up only</div>
              </div>
            </div>
            <div className="text-[5px] font-bold text-[#191919] mb-1">Package details</div>
            <div className="bg-white border border-[#C4C4C4] rounded p-1.5 flex justify-between items-center mb-2">
              <div>
                <div className="text-[5px] font-bold text-[#191919]">Parcel</div>
                <div className="text-[4px] text-[#707070]">Up to 500 g, Max 120 cm</div>
              </div>
              <svg className="w-2 h-2 text-[#191919]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </div>
            <div className="text-[5px] font-bold text-[#191919] mb-1">Domestic shipping</div>
            <div className="flex gap-1">
              <div className="flex-1 bg-[#F7F7F7] border-2 border-[#191919] rounded p-1">
                <div className="text-[5px] font-bold text-[#191919]">Mondial Relay</div>
                <div className="text-[4px] text-[#707070]">3-5 business days</div>
              </div>
              <div className="flex-1 bg-white border border-[#C4C4C4] rounded p-1">
                <div className="text-[5px] text-[#707070]">Colissimo</div>
                <div className="text-[4px] text-[#707070]">2-3 business days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Monitor Stand */}
      <div className="w-8 h-3 bg-[#1a1a1a]" />
      <div className="w-16 h-1.5 bg-[#1a1a1a] rounded-b-sm" />
    </div>
  </div>
  ) : prototype.status === 'active' && prototype.id === 'it-shelby-default' ? (
                      <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
                        <EbayShippingPageITDefault />
                      </div>
                    ) : prototype.status === 'active' && prototype.id === 'it-shelby-default-android' ? (
                      <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
                        <EbayShippingPageITDefaultAndroid />
                      </div>
                    ) : prototype.status === 'active' && prototype.id === 'ca-shelby-default' ? (
                      <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
                        <EbayShippingPageCADefault />
                      </div>
                    ) : prototype.status === 'active' && prototype.id === 'ca-shelby-default-android' ? (
                      <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
                        <EbayShippingPageCADefaultAndroid />
                      </div>
                    ) : prototype.status === 'active' && prototype.id === 'ca-shelby-ag' ? (
                      <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
                        <EbayShippingPageCAAG />
                      </div>
                    ) : prototype.status === 'active' && prototype.id === 'ca-shelby-ag-android' ? (
                      <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
                        <EbayShippingPageCAAGAndroid />
                      </div>
                    ) : prototype.status === 'active' && prototype.id === 'au-shelby-default' ? (
                      <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
                        <EbayShippingPageAUDefault />
                      </div>
                    ) : prototype.status === 'active' && prototype.id === 'au-shelby-default-android' ? (
                      <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
                        <EbayShippingPageAUDefaultAndroid />
                      </div>
                    ) : prototype.status === 'active' && prototype.id === 'au-shelby-ag' ? (
                      <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
                        <EbayShippingPageAUAG />
                      </div>
                    ) : prototype.status === 'active' && prototype.id === 'au-shelby-ag-android' ? (
                      <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
                        <EbayShippingPageAUAGAndroid />
                      </div>
                    ) : prototype.status === 'active' && prototype.id === 'row-shelby-default' ? (
                      <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
                        <EbayShippingPageRoWDefault />
                      </div>
                    ) : prototype.status === 'active' && prototype.id === 'row-shelby-default-android' ? (
                      <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
                        <EbayShippingPageRoWDefaultAndroid />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-14 h-28 bg-[#222] rounded-[8px] border border-[#333] flex items-center justify-center">
                          <div className="w-10 h-24 bg-[#1a1a1a] rounded-[6px]" />
                        </div>
                        <span className="text-[#444] text-xs">Coming Soon</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="text-white font-medium text-sm">{prototype.name}</h4>
                        {prototype.recommended && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-medium">
                            Recommended
                          </span>
                        )}
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        prototype.status === 'active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-[#333] text-[#888]'
                      }`}>
                        {prototype.status}
                      </span>
                    </div>
                    
                    {/* Market & Platform Tags */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs px-2 py-1 rounded bg-[#1a1a1a] border border-[#333] text-[#888]">
                        {prototype.siteFlag} {prototype.siteCode}
                      </span>
                      <span className="text-xs px-2 py-1 rounded bg-[#1a1a1a] border border-[#333] text-[#888]">
                        {platforms.find(p => p.id === prototype.platform)?.name}
                      </span>
                    </div>
                    
                    <p className="text-[#666] text-xs mb-3 line-clamp-2">{prototype.description}</p>
                    
                    <Link
                      href={prototype.status === 'active' ? prototype.route : '#'}
                      onClick={(e) => {
                        if (prototype.status !== 'active') {
                          e.preventDefault()
                        } else if (prototype.siteId) {
                          trackPrototypeUsage(prototype.siteId, prototype.id)
                        }
                      }}
                      className={`w-full h-9 flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors ${
                        prototype.status === 'active'
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-[#222] text-[#666] cursor-not-allowed'
                      }`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Let's Build
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Prototypes - Market Rows with Carousels */}
      <section className="px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-white font-semibold">{hasActiveFilters ? 'Search Results' : 'All Prototypes'}</h2>
            <span className="text-[#666] text-sm">({totalPrototypes} results)</span>
          </div>
          
          {/* Market Rows */}
          <div className="flex flex-col gap-8">
            {filteredSites.map((site) => (
              <div key={site.id} className="bg-[#111] border border-[#222] rounded-2xl p-6 relative group">
                {/* Market Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{site.flag}</span>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{site.name}</h3>
                      <span className="text-[#666] text-sm">{site.prototypes.length} prototype{site.prototypes.length !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  {site.prototypes.length > 3 && (
                    <div className="flex items-center gap-1 text-[#666] text-sm">
                      <span>Scroll for more</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
                
                {/* Prototype Carousel */}
                <div className="relative">
                  <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory" style={{ scrollbarWidth: 'thin', scrollbarColor: '#333 transparent' }}>
                  {site.prototypes.map((prototype) => (
                    <div 
                      key={prototype.id}
                      className="flex-shrink-0 w-80 bg-[#0a0a0a] border border-[#222] rounded-xl overflow-hidden hover:border-[#444] transition-colors snap-start"
                    >
                      {/* Live Prototype Preview */}
                      <div className="h-56 bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
                        {prototype.status === 'active' && prototype.id === 'us-shelby-ag' ? (
                          <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
                            <EbayShippingPage />
                          </div>
) : prototype.status === 'active' && prototype.id === 'us-shelby-default' ? (
  <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
  <EbayShippingPageDefault />
  </div>
  ) : prototype.status === 'active' && prototype.id === 'us-shelby-default-android' ? (
  <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
  <EbayShippingPageDefaultAndroid />
  </div>
  ) : prototype.status === 'active' && prototype.id === 'uk-shelby-default' ? (
                          <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
                            <EbayShippingPageUKDefault />
                          </div>
                        ) : prototype.status === 'active' && prototype.id === 'de-shelby-default' ? (
                          <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
                            <EbayShippingPageDEDefault />
                          </div>
                        ) : prototype.status === 'active' && prototype.id === 'fr-shelby-default' ? (
                          <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
                            <EbayShippingPageFRDefault />
                          </div>
                        ) : prototype.status === 'active' && prototype.id === 'it-shelby-default' ? (
                          <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
                            <EbayShippingPageITDefault />
                          </div>
                        ) : prototype.status === 'active' && prototype.id === 'ca-shelby-default' ? (
                          <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
                            <EbayShippingPageCADefault />
                          </div>
                        ) : prototype.status === 'active' && prototype.id === 'au-shelby-default' ? (
                          <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
                            <EbayShippingPageAUDefault />
                          </div>
) : prototype.status === 'active' && prototype.id === 'row-shelby-default' ? (
  <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
  <EbayShippingPageRoWDefault />
  </div>
  ) : prototype.status === 'active' && prototype.id === 'uk-shelby-default-android' ? (
  <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
  <EbayShippingPageUKDefaultAndroid />
  </div>
  ) : prototype.status === 'active' && prototype.id === 'de-shelby-default-android' ? (
  <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
  <EbayShippingPageDEDefaultAndroid />
  </div>
) : prototype.status === 'active' && prototype.id === 'fr-shelby-default-android' ? (
  <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
  <EbayShippingPageFRDefaultAndroid />
  </div>
  ) : prototype.status === 'active' && prototype.id === 'de-helix-ag' ? (
  <div className="flex items-center justify-center w-full h-full p-3" style={{ fontFamily: "'Market Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>
    {/* Desktop Monitor Frame - DE Helix AG */}
    <div className="flex flex-col items-center">
      {/* Monitor */}
      <div className="w-[265px] bg-[#1a1a1a] rounded-t-lg p-1.5">
        <div className="bg-white rounded-sm overflow-hidden">
          {/* Browser Tab Bar */}
          <div className="bg-[#DEE1E6] px-2 py-1 flex items-center gap-1">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ED6A5E]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#F4BF4F]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#61C554]" />
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="bg-white rounded-sm px-3 py-0.5 text-[6px] text-[#555] flex items-center gap-1">
                <svg className="w-2 h-2 text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                ebay.de
              </div>
            </div>
          </div>
          {/* Page Content - Complete Your Listing Preview */}
          <div className="p-2 bg-[#FAFAFA]">
            <div className="text-[7px] font-bold text-[#111820] mb-2">Complete your listing</div>
            {/* Condition */}
            <div className="text-[5px] font-bold text-[#111820] uppercase mb-1">CONDITION</div>
            <div className="text-[4px] text-[#707070] mb-2">Pre-owned - Excellent</div>
            {/* AG Notice */}
            <div className="bg-[#F5F9FF] rounded p-1 flex items-center gap-1 mb-2">
              <div className="w-2 h-2 bg-[#0968F6] rounded-full flex items-center justify-center">
                <svg className="w-1 h-1 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <span className="text-[4px] text-[#191919]">Eligible for Authenticity Check</span>
            </div>
            {/* Pricing */}
            <div className="text-[5px] font-bold text-[#111820] uppercase mb-1">PRICING</div>
            <div className="flex gap-1 mb-2">
              <div className="flex-1 bg-white border border-[#E5E5E5] rounded p-1">
                <div className="text-[4px] text-[#707070]">Price</div>
                <div className="text-[5px] font-bold text-[#191919]">€ 1,650.00</div>
              </div>
            </div>
            {/* Shipping */}
            <div className="text-[5px] font-bold text-[#111820] uppercase mb-1">SHIPPING</div>
            <div className="bg-white border border-[#E5E5E5] rounded p-1 mb-2">
              <div className="text-[4px] font-bold text-[#191919]">Medium box</div>
              <div className="text-[3px] text-[#707070]">Up to 2 kg, 60 x 30 x 15 cm</div>
            </div>
            {/* CTA */}
            <div className="bg-[#3665F3] rounded-full py-0.5 text-center">
              <span className="text-[4px] text-white font-medium">List it</span>
            </div>
          </div>
        </div>
      </div>
      {/* Monitor Stand */}
      <div className="w-8 h-3 bg-[#1a1a1a]" />
      <div className="w-16 h-1.5 bg-[#1a1a1a] rounded-b-sm" />
    </div>
  </div>
  ) : prototype.status === 'active' && prototype.id === 'de-helix-ag' ? (
  <div className="flex items-center justify-center w-full h-full p-3" style={{ fontFamily: "'Market Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>
    {/* Desktop Monitor Frame - DE Helix AG */}
    <div className="flex flex-col items-center">
      {/* Monitor */}
      <div className="w-[265px] bg-[#1a1a1a] rounded-t-lg p-1.5">
        <div className="bg-white rounded-sm overflow-hidden">
          {/* Browser Tab Bar */}
          <div className="bg-[#DEE1E6] px-2 py-1 flex items-center gap-1">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ED6A5E]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#F4BF4F]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#61C554]" />
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="bg-white rounded-sm px-3 py-0.5 text-[6px] text-[#555] flex items-center gap-1">
                <svg className="w-2 h-2 text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                ebay.de
              </div>
            </div>
          </div>
          {/* Page Content - Complete Your Listing Preview */}
          <div className="p-2 bg-[#FAFAFA]">
            <div className="text-[7px] font-bold text-[#111820] mb-2">Complete your listing</div>
            {/* Condition */}
            <div className="text-[5px] font-bold text-[#111820] uppercase mb-1">CONDITION</div>
            <div className="text-[4px] text-[#707070] mb-2">Pre-owned - Excellent</div>
            {/* AG Notice */}
            <div className="bg-[#F5F9FF] rounded p-1 flex items-center gap-1 mb-2">
              <div className="w-2 h-2 bg-[#0968F6] rounded-full flex items-center justify-center">
                <svg className="w-1 h-1 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <span className="text-[4px] text-[#191919]">Eligible for Authenticity Check</span>
            </div>
            {/* Pricing */}
            <div className="text-[5px] font-bold text-[#111820] uppercase mb-1">PRICING</div>
            <div className="flex gap-1 mb-2">
              <div className="flex-1 bg-white border border-[#E5E5E5] rounded p-1">
                <div className="text-[4px] text-[#707070]">Price</div>
                <div className="text-[5px] font-bold text-[#191919]">€ 1,650.00</div>
              </div>
            </div>
            {/* Shipping */}
            <div className="text-[5px] font-bold text-[#111820] uppercase mb-1">SHIPPING</div>
            <div className="bg-white border border-[#E5E5E5] rounded p-1 mb-2">
              <div className="text-[4px] font-bold text-[#191919]">Medium box</div>
              <div className="text-[3px] text-[#707070]">Up to 2 kg, 60 x 30 x 15 cm</div>
            </div>
            {/* CTA */}
            <div className="bg-[#3665F3] rounded-full py-0.5 text-center">
              <span className="text-[4px] text-white font-medium">List it</span>
            </div>
          </div>
        </div>
      </div>
      {/* Monitor Stand */}
      <div className="w-8 h-3 bg-[#1a1a1a]" />
      <div className="w-16 h-1.5 bg-[#1a1a1a] rounded-b-sm" />
    </div>
  </div>
  ) : prototype.status === 'active' && prototype.platform === 'dweb' ? (
  <div className="flex items-center justify-center w-full h-full p-3" style={{ fontFamily: "'Market Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>
    {/* Desktop Monitor Frame */}
    <div className="flex flex-col items-center">
      {/* Monitor */}
      <div className="w-[265px] bg-[#1a1a1a] rounded-t-lg p-1.5">
        <div className="bg-white rounded-sm overflow-hidden">
          {/* Browser Tab Bar */}
          <div className="bg-[#DEE1E6] px-2 py-1 flex items-center gap-1">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ED6A5E]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#F4BF4F]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#61C554]" />
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="bg-white rounded-sm px-3 py-0.5 text-[6px] text-[#555] flex items-center gap-1">
                <svg className="w-2 h-2 text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                ebay.fr
              </div>
            </div>
          </div>
          {/* Page Content */}
          <div className="p-2 bg-[#FAFAFA]">
            <div className="text-[6px] font-bold text-[#191919] mb-1.5 tracking-wide">DELIVERY</div>
            <div className="flex gap-1 mb-2">
              {/* Shipping or pickup - Selected */}
              <div className="flex-1 bg-[#F7F7F7] border-2 border-[#191919] rounded p-1.5">
                <svg className="w-3 h-3 text-[#191919] mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 17h8M8 17a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 104 0 2 2 0 00-4 0zm-8 0H5a2 2 0 01-2-2V6h12v9m-7 2h7m0 0h3l3-3V9h-6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="text-[5px] font-bold text-[#191919] leading-tight">Shipping or pickup</div>
              </div>
              {/* Shipping only */}
              <div className="flex-1 bg-white border border-[#C4C4C4] rounded p-1.5">
                <svg className="w-3 h-3 text-[#707070] mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="text-[5px] text-[#707070] leading-tight">Shipping only</div>
              </div>
              {/* Pick up only */}
              <div className="flex-1 bg-white border border-[#C4C4C4] rounded p-1.5">
                <svg className="w-3 h-3 text-[#707070] mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="text-[5px] text-[#707070] leading-tight">Pick up only</div>
              </div>
            </div>
            <div className="text-[5px] font-bold text-[#191919] mb-1">Package details</div>
            <div className="bg-white border border-[#C4C4C4] rounded p-1.5 flex justify-between items-center mb-2">
              <div>
                <div className="text-[5px] font-bold text-[#191919]">Parcel</div>
                <div className="text-[4px] text-[#707070]">Up to 500 g, Max 120 cm</div>
              </div>
              <svg className="w-2 h-2 text-[#191919]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </div>
            <div className="text-[5px] font-bold text-[#191919] mb-1">Domestic shipping</div>
            <div className="flex gap-1">
              <div className="flex-1 bg-[#F7F7F7] border-2 border-[#191919] rounded p-1">
                <div className="text-[5px] font-bold text-[#191919]">Mondial Relay</div>
                <div className="text-[4px] text-[#707070]">3-5 business days</div>
              </div>
              <div className="flex-1 bg-white border border-[#C4C4C4] rounded p-1">
                <div className="text-[5px] text-[#707070]">Colissimo</div>
                <div className="text-[4px] text-[#707070]">2-3 business days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Monitor Stand */}
      <div className="w-8 h-3 bg-[#1a1a1a]" />
      <div className="w-16 h-1.5 bg-[#1a1a1a] rounded-b-sm" />
    </div>
  </div>
  ) : prototype.status === 'active' && prototype.id === 'it-shelby-default-android' ? (
  <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
  <EbayShippingPageITDefaultAndroid />
  </div>
  ) : prototype.status === 'active' && prototype.id === 'ca-shelby-default-android' ? (
  <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
  <EbayShippingPageCADefaultAndroid />
  </div>
  ) : prototype.status === 'active' && prototype.id === 'au-shelby-default-android' ? (
  <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
  <EbayShippingPageAUDefaultAndroid />
  </div>
  ) : prototype.status === 'active' && prototype.id === 'row-shelby-default-android' ? (
  <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
  <EbayShippingPageRoWDefaultAndroid />
  </div>
  ) : prototype.status === 'active' && prototype.id === 'uk-shelby-ag' ? (
  <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
  <EbayShippingPageUKAG />
  </div>
  ) : prototype.status === 'active' && prototype.id === 'uk-shelby-ag-android' ? (
  <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
  <EbayShippingPageUKAGAndroid />
  </div>
  ) : prototype.status === 'active' && prototype.id === 'ca-shelby-ag' ? (
  <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
  <EbayShippingPageCAAG />
  </div>
  ) : prototype.status === 'active' && prototype.id === 'ca-shelby-ag-android' ? (
  <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
  <EbayShippingPageCAAGAndroid />
  </div>
  ) : prototype.status === 'active' && prototype.id === 'au-shelby-ag' ? (
  <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
  <EbayShippingPageAUAG />
  </div>
  ) : prototype.status === 'active' && prototype.id === 'au-shelby-ag-android' ? (
  <div className="pointer-events-none" style={{ transform: 'scale(0.19)', transformOrigin: 'center center' }}>
  <EbayShippingPageAUAGAndroid />
  </div>
  ) : (
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-14 h-28 bg-[#222] rounded-[8px] border border-[#333] flex items-center justify-center">
                              <div className="w-10 h-24 bg-[#1a1a1a] rounded-[6px]" />
                            </div>
                            <span className="text-[#444] text-xs">Coming Soon</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className="text-white font-medium text-sm">{prototype.name}</h4>
                            {prototype.recommended && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-medium">
                                Recommended
                              </span>
                            )}
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            prototype.status === 'active' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-[#333] text-[#888]'
                          }`}>
                            {prototype.status}
                          </span>
                        </div>
                        
                        {/* Platform Tag */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs px-2 py-1 rounded bg-[#1a1a1a] border border-[#333] text-[#888]">
                            {platforms.find(p => p.id === prototype.platform)?.name}
                          </span>
                        </div>
                        
                        <p className="text-[#666] text-xs mb-3 line-clamp-2">{prototype.description}</p>
                        
                        <Link
                          href={prototype.status === 'active' ? prototype.route : '#'}
                          onClick={(e) => {
                            if (prototype.status !== 'active') {
                              e.preventDefault()
                            } else {
                              trackPrototypeUsage(site.id, prototype.id)
                            }
                          }}
                          className={`w-full h-9 flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors ${
                            prototype.status === 'active'
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-[#222] text-[#666] cursor-not-allowed'
                          }`}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Preview
                        </Link>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              </div>
            ))}
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
                      {prototype.recommended && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-medium">
                          Recommended
                        </span>
                      )}
                    </div>
                    <h4 className="text-white text-sm font-medium truncate">{prototype.name}</h4>
                    <div className="mt-2">
                      <Link
                        href={prototype.route}
                        className="block w-full text-center text-xs py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Let's Build
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

      
    </div>
  )
}

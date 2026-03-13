"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ExternalLink, X } from "lucide-react"
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
      { id: "us-shelby-ag", name: "US-Shelby-AG", description: "Shipping configuration with Authenticity Guarantee, eBay International Shipping", status: "active", route: "/prototype/us-shelby-ag", platform: "ios", segment: "c2c" },
      { id: "us-shelby-default", name: "US-Shelby-Default", description: "Default services view with USPS, FedEx, UPS carrier selection", status: "active", route: "/prototype/us-shelby-default", platform: "ios", segment: "c2c" },
      { id: "us-shelby-default-android", name: "US-Shelby-Default-Android", description: "Default services view for Android platform", status: "active", route: "/prototype/us-shelby-default-android", platform: "android", segment: "c2c" },
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
      { id: "row-international", name: "RoW-International-V1", description: "Generic international shipping template", status: "draft", route: "/prototype/row-international", platform: "mweb", segment: "b2c" },
    ]
  },
]

export default function PrototypeLibrary() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSite, setSelectedSite] = useState<string | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)

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
          {/* HIDDEN: Original content - say "enable it back" to restore
          <h1 className="text-5xl font-bold text-white mb-4">
            Find your Prototype
          </h1>
          <p className="text-[#888] text-lg max-w-2xl mx-auto mb-10">
            Browse shipping prototypes by market. Select a template, create a copy, and build your PRD-ready prototype.
          </p>
          */}
          <p className="text-white">test test</p>
          
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
                    <div className="mt-2">
                      <Link
                        href={prototype.route}
                        className="block w-full text-center text-xs py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
              <div key={site.id} className="bg-[#111] border border-[#222] rounded-2xl p-6">
                {/* Market Header */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{site.flag}</span>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{site.name}</h3>
                    <span className="text-[#666] text-sm">{site.prototypes.length} prototype{site.prototypes.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>
                
                {/* Prototype Carousel */}
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent">
                  {site.prototypes.map((prototype) => (
                    <div 
                      key={prototype.id}
                      className="flex-shrink-0 w-80 bg-[#0a0a0a] border border-[#222] rounded-xl overflow-hidden hover:border-[#444] transition-colors"
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
                          <h4 className="text-white font-medium text-sm">{prototype.name}</h4>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            prototype.status === 'active' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-[#333] text-[#888]'
                          }`}>
                            {prototype.status}
                          </span>
                        </div>
                        
                        {/* Platform & Segment Tags */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs px-2 py-1 rounded bg-[#1a1a1a] border border-[#333] text-[#888]">
                            {platforms.find(p => p.id === prototype.platform)?.name}
                          </span>
                          <span className="text-xs px-2 py-1 rounded bg-[#1a1a1a] border border-[#333] text-[#888]">
                            {prototype.segment.toUpperCase()}
                          </span>
                        </div>
                        
                        <p className="text-[#666] text-xs mb-3 line-clamp-2">{prototype.description}</p>
                        
                        <Link
                          href={prototype.status === 'active' ? prototype.route : '#'}
                          onClick={(e) => prototype.status !== 'active' && e.preventDefault()}
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
                    </div>
                    <h4 className="text-white text-sm font-medium truncate">{prototype.name}</h4>
                    <div className="mt-2">
                      <Link
                        href={prototype.route}
                        className="block w-full text-center text-xs py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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

      
    </div>
  )
}

"use client"

import { ReactNode } from "react"
import { X, ChevronLeft } from "lucide-react"

// Back arrow icon component
export function BackArrow({ className = "w-6 h-6 text-[#191919]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// L1 Navigation Header (for main pages)
interface L1HeaderProps {
  onBack: () => void
  onClose?: () => void
}

export function L1Header({ onBack, onClose }: L1HeaderProps) {
  return (
    <div className="h-[56px] px-4 flex items-center justify-between bg-white flex-shrink-0">
      <button 
        onClick={onBack}
        className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center"
      >
        <BackArrow />
      </button>
      {onClose && (
        <button 
          onClick={onClose}
          className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center"
        >
          <X className="w-5 h-5 text-[#191919]" strokeWidth={2} />
        </button>
      )}
    </div>
  )
}

// L2 Navigation Header (for secondary pages/full-screen sheets)
interface L2HeaderProps {
  onBack: () => void
  onClose: () => void
}

export function L2Header({ onBack, onClose }: L2HeaderProps) {
  return (
    <div className="h-[44px] px-4 flex items-center justify-between bg-white flex-shrink-0">
      <button 
        onClick={onBack}
        className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center"
      >
        <BackArrow />
      </button>
      <button 
        onClick={onClose}
        className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center"
      >
        <X className="w-5 h-5 text-[#191919]" strokeWidth={2} />
      </button>
    </div>
  )
}

// Page title component
interface PageTitleProps {
  title: string
  subtitle?: string
}

export function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div className="px-4 mt-2 mb-4">
      <h1 className="text-[24px] font-bold text-[#191919] leading-[32px]">{title}</h1>
      {subtitle && (
        <p className="text-[14px] text-[#707070] leading-[20px] mt-1">{subtitle}</p>
      )}
    </div>
  )
}

// Section header
interface SectionHeaderProps {
  title: string
  description?: string
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mb-3">
      <h2 className="text-[16px] font-bold text-[#191919] leading-[24px]">{title}</h2>
      {description && (
        <p className="text-[14px] text-[#707070] leading-[20px]">{description}</p>
      )}
    </div>
  )
}

// Divider
export function Divider() {
  return <div className="h-[1px] bg-[#E5E5E5] my-4" />
}

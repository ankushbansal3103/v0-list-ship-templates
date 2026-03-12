"use client"

import { ReactNode } from "react"
import { X } from "lucide-react"

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: ReactNode
}

export function BottomSheet({ isOpen, onClose, title, subtitle, children }: BottomSheetProps) {
  if (!isOpen) return null
  
  return (
    <>
      {/* Blur Scrim */}
      <div 
        className="absolute inset-0 bg-white/[0.6] backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Sheet Content */}
      <div 
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] overflow-hidden shadow-[0_-5px_30px_rgba(0,0,0,0.12)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-[6px] pb-[6px]">
          <div className="w-8 h-1 bg-[#8F8F8F] rounded-full" />
        </div>
        
        {/* Header */}
        <div className="flex items-start justify-between px-4 pt-2 pb-3">
          <div className="flex flex-col">
            <h3 className="text-[20px] font-bold text-[#191919] leading-[28px]">{title}</h3>
            {subtitle && (
              <span className="text-[14px] text-[#707070] leading-[20px]">{subtitle}</span>
            )}
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center"
          >
            <X className="w-5 h-5 text-[#191919]" strokeWidth={2} />
          </button>
        </div>
        
        {/* Content */}
        {children}
      </div>
    </>
  )
}

// Selection list for bottom sheets
interface SelectionOption {
  id: string
  label: string
  description?: string
}

interface SelectionListProps {
  options: SelectionOption[]
  selectedId: string
  onSelect: (id: string) => void
}

export function SelectionList({ options, selectedId, onSelect }: SelectionListProps) {
  return (
    <div className="px-4 pb-8">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option.id)}
          className="w-full h-[48px] flex items-center justify-between"
        >
          <div className="flex flex-col items-start">
            <span className="text-[14px] text-[#191919] leading-[20px]">{option.label}</span>
            {option.description && (
              <span className="text-[13px] text-[#707070] leading-[18px]">{option.description}</span>
            )}
          </div>
          {selectedId === option.id && (
            <svg className="w-4 h-4 text-[#191919]" viewBox="0 0 16 16" fill="none">
              <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      ))}
    </div>
  )
}

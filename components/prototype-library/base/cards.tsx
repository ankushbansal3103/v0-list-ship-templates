"use client"

import { ChevronRight } from "lucide-react"
import { ReactNode } from "react"

// Card with chevron for navigation
interface NavigationCardProps {
  onClick: () => void
  children: ReactNode
}

export function NavigationCard({ onClick, children }: NavigationCardProps) {
  return (
    <button 
      onClick={onClick}
      className="w-full p-4 bg-white border border-[#767676] rounded-[16px] flex"
    >
      <div className="flex flex-col gap-4 text-left flex-1">
        {children}
      </div>
      <div className="flex items-center pl-3">
        <ChevronRight className="w-5 h-5 text-[#191919] flex-shrink-0" />
      </div>
    </button>
  )
}

// Card row item (for inside navigation cards)
interface CardRowProps {
  label: string
  value: string
}

export function CardRow({ label, value }: CardRowProps) {
  return (
    <div className="flex flex-col">
      <span className="text-[14px] font-bold text-[#191919]">{label}</span>
      <span className="text-[13px] text-[#707070]">{value}</span>
    </div>
  )
}

// Info card (grey background)
interface InfoCardProps {
  children: ReactNode
  action?: {
    label: string
    onClick: () => void
  }
}

export function InfoCard({ children, action }: InfoCardProps) {
  return (
    <div className="w-full p-3 bg-[#F7F7F7] rounded-[8px] flex items-start justify-between">
      <div className="flex flex-col flex-1">
        {children}
      </div>
      {action && (
        <button 
          onClick={action.onClick}
          className="text-[14px] text-[#191919] underline ml-3 flex-shrink-0"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

// Selection card (for options like delivery methods)
interface SelectionCardProps {
  isSelected: boolean
  onClick: () => void
  title: string
  description?: string
  price?: string
  badge?: string
}

export function SelectionCard({ isSelected, onClick, title, description, price, badge }: SelectionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-3 py-3 rounded-[8px] text-left flex flex-col ${
        isSelected 
          ? "bg-[#F7F7F7] border-2 border-[#191919]" 
          : "bg-white border border-[#8F8F8F]"
      }`}
    >
      <div className="flex items-start justify-between w-full">
        <span className="text-[14px] font-bold text-[#191919] leading-[20px]">
          {title}
        </span>
        {badge && (
          <span className="text-[11px] font-bold text-white bg-[#3665F3] px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </div>
      {description && (
        <span className={`text-[13px] leading-[18px] mt-0.5 ${isSelected ? 'text-[#191919]' : 'text-[#707070]'}`}>
          {description}
        </span>
      )}
      {price && (
        <span className="text-[14px] font-bold text-[#191919] mt-1">{price}</span>
      )}
    </button>
  )
}

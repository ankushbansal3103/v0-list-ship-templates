"use client"

import { ChevronDown } from "lucide-react"

// Standard dropdown field with label
interface DropdownFieldProps {
  label: string
  value: string
  onClick: () => void
  variant?: "default" | "compact"
}

export function DropdownField({ label, value, onClick, variant = "default" }: DropdownFieldProps) {
  if (variant === "compact") {
    return (
      <button 
        onClick={onClick}
        className="w-full h-[48px] px-4 bg-[#F7F7F7] border border-[#8F8F8F] rounded-[8px] flex items-center justify-between"
      >
        <span className="text-[14px] text-[#191919]">{value}</span>
        <ChevronDown className="w-4 h-4 text-[#191919]" />
      </button>
    )
  }
  
  return (
    <button 
      onClick={onClick}
      className="w-full h-[56px] px-4 bg-[#F7F7F7] border border-[#8F8F8F] rounded-[8px] flex items-center justify-between"
    >
      <div className="flex flex-col items-start">
        <span className="text-[12px] text-[#707070] leading-[16px]">{label}</span>
        <span className="text-[14px] text-[#191919] leading-[20px]">{value}</span>
      </div>
      <ChevronDown className="w-4 h-4 text-[#191919]" />
    </button>
  )
}

// Text input field with label
interface TextInputFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function TextInputField({ label, value, onChange, placeholder }: TextInputFieldProps) {
  return (
    <div className="w-full h-[56px] px-4 bg-[#F7F7F7] border border-[#8F8F8F] rounded-[8px] flex flex-col justify-center">
      <span className="text-[12px] text-[#707070] leading-[16px]">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-[14px] text-[#191919] leading-[20px] bg-transparent outline-none w-full"
        placeholder={placeholder}
      />
    </div>
  )
}

// Currency input field
interface CurrencyInputFieldProps {
  label: string
  value: string
  currency?: string
  onClick: () => void
  isActive?: boolean
}

export function CurrencyInputField({ label, value, currency = "€", onClick, isActive }: CurrencyInputFieldProps) {
  return (
    <button 
      onClick={onClick}
      className={`w-full h-[56px] px-4 bg-[#F7F7F7] rounded-[8px] flex items-center text-left ${isActive ? 'border-2 border-[#191919]' : 'border border-[#8F8F8F]'}`}
    >
      <div className="flex flex-col flex-1">
        <span className="text-[12px] text-[#707070] leading-[16px]">{label}</span>
        <span className="text-[16px] text-[#191919] leading-[24px]">{value || "0,00"}</span>
      </div>
      <span className="text-[16px] text-[#707070]">{currency}</span>
    </button>
  )
}

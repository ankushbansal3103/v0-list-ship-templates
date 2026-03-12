"use client"

// iOS-style toggle switch
interface ToggleSwitchProps {
  isOn: boolean
  onToggle: () => void
  label?: string
}

export function ToggleSwitch({ isOn, onToggle, label }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between py-2">
      {label && (
        <span className="text-[14px] font-bold text-[#191919]">{label}</span>
      )}
      <button 
        onClick={onToggle}
        className={`w-[51px] h-[31px] rounded-full transition-colors ${isOn ? 'bg-[#3665F3]' : 'bg-[#E5E5E5]'}`}
      >
        <div className={`w-[27px] h-[27px] bg-white rounded-full shadow-sm transition-transform ${isOn ? 'translate-x-[22px]' : 'translate-x-[2px]'}`} />
      </button>
    </div>
  )
}

// Primary CTA button (Blue)
interface PrimaryButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

export function PrimaryButton({ label, onClick, disabled }: PrimaryButtonProps) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`w-full h-[50px] rounded-full flex items-center justify-center ${
        disabled 
          ? 'bg-[#E5E5E5] cursor-not-allowed' 
          : 'bg-[#3665F3] active:bg-[#2d54d4]'
      }`}
    >
      <span className={`text-[16px] font-bold ${disabled ? 'text-[#707070]' : 'text-white'}`}>{label}</span>
    </button>
  )
}

// Secondary button (Outlined)
interface SecondaryButtonProps {
  label: string
  onClick: () => void
}

export function SecondaryButton({ label, onClick }: SecondaryButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="w-full h-[50px] border-2 border-[#191919] rounded-full flex items-center justify-center active:bg-[#F7F7F7]"
    >
      <span className="text-[16px] font-bold text-[#191919]">{label}</span>
    </button>
  )
}

// Icon button (circular with background)
interface IconButtonProps {
  icon: React.ReactNode
  onClick: () => void
  variant?: "light" | "dark"
}

export function IconButton({ icon, onClick, variant = "light" }: IconButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`w-10 h-10 rounded-full flex items-center justify-center ${
        variant === "light" ? 'bg-[#F7F7F7]' : 'bg-[#191919]'
      }`}
    >
      {icon}
    </button>
  )
}

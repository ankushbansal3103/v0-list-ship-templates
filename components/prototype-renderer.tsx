"use client"

import { useState } from "react"
import { PrototypeConfig, ScreenConfig, SectionConfig } from "@/lib/prototype-config"
import { ChevronLeft, ChevronRight, Package, Truck, MapPin, Mail, Info, Check } from "lucide-react"

interface PrototypeRendererProps {
  config: PrototypeConfig
}

const iconMap: Record<string, React.ReactNode> = {
  package: <Package className="w-5 h-5" />,
  truck: <Truck className="w-5 h-5" />,
  "map-pin": <MapPin className="w-5 h-5" />,
  mail: <Mail className="w-5 h-5" />,
}

export function PrototypeRenderer({ config }: PrototypeRendererProps) {
  const [currentScreenId, setCurrentScreenId] = useState(config.initialScreen)
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({})
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  
  const currentScreen = config.screens.find(s => s.id === currentScreenId)
  
  if (!currentScreen) return null
  
  const navigateTo = (screenId: string) => {
    setCurrentScreenId(screenId)
  }
  
  const toggleValue = (sectionId: string) => {
    setToggleStates(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }
  
  const selectOption = (sectionId: string, optionId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [sectionId]: optionId
    }))
  }

  return (
    <div className="relative">
      {/* iPhone Frame */}
      <div 
        className="relative bg-black rounded-[55px] p-[14px] shadow-2xl"
        style={{ width: '402px', height: '874px' }}
      >
        {/* Dynamic Island */}
        <div 
          className="absolute top-[22px] left-1/2 -translate-x-1/2 bg-black rounded-full z-20"
          style={{ width: '126px', height: '37px' }}
        />
        
        {/* Screen */}
        <div 
          className="relative bg-white rounded-[45px] overflow-hidden h-full flex flex-col"
        >
          {/* Status Bar */}
          <div className="h-[54px] flex items-end justify-between px-8 pb-2">
            <span className="text-[15px] font-semibold text-[#191919]">9:41</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-[2px]">
                <div className="w-[3px] h-[4px] bg-[#191919] rounded-sm" />
                <div className="w-[3px] h-[6px] bg-[#191919] rounded-sm" />
                <div className="w-[3px] h-[8px] bg-[#191919] rounded-sm" />
                <div className="w-[3px] h-[10px] bg-[#191919] rounded-sm" />
              </div>
              <div className="w-6 h-3 border border-[#191919] rounded-[3px] ml-1 relative">
                <div className="absolute inset-[2px] right-[4px] bg-[#191919] rounded-[1px]" />
                <div className="absolute -right-[2px] top-1/2 -translate-y-1/2 w-[1px] h-1 bg-[#191919]" />
              </div>
            </div>
          </div>
          
          {/* Navigation Header */}
          <div className="flex items-center px-4 py-3 border-b border-[#E5E5E5]">
            {currentScreen.showBackButton && (
              <button 
                onClick={() => currentScreen.backScreen && navigateTo(currentScreen.backScreen)}
                className="flex items-center text-[#3665F3] mr-2"
              >
                <ChevronLeft className="w-6 h-6" />
                <span className="text-[17px]">Back</span>
              </button>
            )}
            <h1 className="flex-1 text-center text-[17px] font-semibold text-[#191919] pr-16">
              {currentScreen.title}
            </h1>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-auto bg-[#F7F7F7] p-4">
            <div className="space-y-3">
              {currentScreen.sections.map((section) => (
                <SectionRenderer 
                  key={section.id}
                  section={section}
                  onNavigate={navigateTo}
                  toggleStates={toggleStates}
                  onToggle={toggleValue}
                  selectedOptions={selectedOptions}
                  onSelect={selectOption}
                />
              ))}
            </div>
          </div>
          
          {/* Bottom CTA */}
          {currentScreen.primaryAction && (
            <div className="p-4 bg-white border-t border-[#E5E5E5]">
              <button 
                onClick={() => {
                  if (currentScreen.primaryAction?.action === "navigate" && currentScreen.primaryAction.navigateTo) {
                    navigateTo(currentScreen.primaryAction.navigateTo)
                  }
                }}
                className="w-full h-[50px] bg-[#3665F3] text-white font-semibold rounded-full text-[17px]"
              >
                {currentScreen.primaryAction.label}
              </button>
            </div>
          )}
          
          {/* Home Indicator */}
          <div className="h-[34px] flex items-center justify-center">
            <div className="w-[134px] h-[5px] bg-[#191919] rounded-full" />
          </div>
        </div>
      </div>
      
      {/* Market Badge */}
      <div className="absolute -top-2 -right-2 px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
        {config.market} - {config.platform.toUpperCase()}
      </div>
    </div>
  )
}

// Section Renderer
function SectionRenderer({ 
  section, 
  onNavigate,
  toggleStates,
  onToggle,
  selectedOptions,
  onSelect
}: { 
  section: SectionConfig
  onNavigate: (screenId: string) => void
  toggleStates: Record<string, boolean>
  onToggle: (id: string) => void
  selectedOptions: Record<string, string>
  onSelect: (sectionId: string, optionId: string) => void
}) {
  switch (section.type) {
    case "card":
      return (
        <button
          onClick={() => section.navigateTo && onNavigate(section.navigateTo)}
          className="w-full bg-white rounded-2xl p-4 flex items-center gap-3 text-left"
        >
          {section.icon && (
            <div className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center text-[#707070]">
              {iconMap[section.icon] || <Package className="w-5 h-5" />}
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-[17px] font-medium text-[#191919]">{section.title}</h3>
            {section.subtitle && (
              <p className="text-[15px] text-[#707070]">{section.subtitle}</p>
            )}
          </div>
          {section.chevron && <ChevronRight className="w-5 h-5 text-[#C4C4C4]" />}
        </button>
      )
      
    case "toggle-row":
      const isToggled = toggleStates[section.id] ?? section.defaultValue ?? false
      return (
        <div className="bg-white rounded-2xl p-4 flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-[17px] font-medium text-[#191919]">{section.label}</h3>
            {section.description && (
              <p className="text-[14px] text-[#707070]">{section.description}</p>
            )}
          </div>
          <button
            onClick={() => onToggle(section.id)}
            className={`w-[51px] h-[31px] rounded-full relative transition-colors ${
              isToggled ? 'bg-[#34C759]' : 'bg-[#E5E5E5]'
            }`}
          >
            <div 
              className={`absolute top-[2px] w-[27px] h-[27px] bg-white rounded-full shadow transition-transform ${
                isToggled ? 'translate-x-[22px]' : 'translate-x-[2px]'
              }`}
            />
          </button>
        </div>
      )
      
    case "selection-row":
      const currentSelected = selectedOptions[section.id] ?? section.selectedId
      return (
        <div className="bg-white rounded-2xl overflow-hidden">
          {section.options?.map((option, idx) => (
            <button
              key={option.id}
              onClick={() => onSelect(section.id, option.id)}
              className={`w-full p-4 flex items-center gap-3 text-left ${
                idx > 0 ? 'border-t border-[#E5E5E5]' : ''
              }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                currentSelected === option.id 
                  ? 'border-[#3665F3] bg-[#3665F3]' 
                  : 'border-[#C4C4C4]'
              }`}>
                {currentSelected === option.id && <Check className="w-4 h-4 text-white" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[17px] text-[#191919]">{option.label}</span>
                  {option.recommended && (
                    <span className="text-xs px-2 py-0.5 bg-[#E8F4E8] text-[#34C759] rounded-full">
                      Recommended
                    </span>
                  )}
                </div>
                {option.description && (
                  <p className="text-[14px] text-[#707070]">{option.description}</p>
                )}
              </div>
            </button>
          ))}
        </div>
      )
      
    case "info-banner":
      return (
        <div className={`rounded-2xl p-4 flex items-start gap-3 ${
          section.variant === 'warning' ? 'bg-[#FFF3CD]' :
          section.variant === 'success' ? 'bg-[#E8F4E8]' :
          'bg-[#E8F4FF]'
        }`}>
          <Info className={`w-5 h-5 mt-0.5 ${
            section.variant === 'warning' ? 'text-[#856404]' :
            section.variant === 'success' ? 'text-[#34C759]' :
            'text-[#3665F3]'
          }`} />
          <p className={`text-[14px] ${
            section.variant === 'warning' ? 'text-[#856404]' :
            section.variant === 'success' ? 'text-[#155724]' :
            'text-[#004085]'
          }`}>
            {section.message}
          </p>
        </div>
      )
      
    case "divider":
      return <div className="h-[1px] bg-[#E5E5E5] my-2" />
      
    case "input-row":
      return (
        <div className="bg-white rounded-2xl p-4">
          <label className="text-[14px] text-[#707070] mb-2 block">{section.label}</label>
          <div className="flex items-center gap-2">
            <input 
              type="text"
              placeholder={section.placeholder}
              className="flex-1 text-[17px] text-[#191919] outline-none"
            />
            {section.unit && (
              <span className="text-[15px] text-[#707070]">{section.unit}</span>
            )}
          </div>
        </div>
      )
      
    default:
      return null
  }
}

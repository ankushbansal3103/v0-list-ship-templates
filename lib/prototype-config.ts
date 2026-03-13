// Prototype Configuration Types
// Define your prototype structure here - the renderer will handle the rest

export interface PrototypeConfig {
  id: string
  name: string
  market: string
  platform: "ios" | "android" | "mweb" | "dweb"
  segment: "c2c" | "b2c"
  version: string
  status: "active" | "draft"
  
  // Screen definitions
  screens: ScreenConfig[]
  
  // Initial screen to show
  initialScreen: string
}

export interface ScreenConfig {
  id: string
  title: string
  subtitle?: string
  type: "list" | "form" | "detail" | "selection"
  
  // Navigation
  showBackButton?: boolean
  backScreen?: string
  
  // Content sections
  sections: SectionConfig[]
  
  // Bottom CTA
  primaryAction?: ActionConfig
}

export interface SectionConfig {
  id: string
  type: "card" | "toggle-row" | "input-row" | "selection-row" | "info-banner" | "divider"
  
  // For card type
  title?: string
  subtitle?: string
  icon?: string
  chevron?: boolean
  navigateTo?: string // screen id to navigate to
  
  // For toggle-row
  label?: string
  description?: string
  defaultValue?: boolean
  
  // For input-row
  inputType?: "text" | "number" | "weight" | "dimensions"
  placeholder?: string
  unit?: string
  
  // For selection-row
  options?: SelectionOption[]
  selectedId?: string
  
  // For info-banner
  variant?: "info" | "warning" | "success"
  message?: string
}

export interface SelectionOption {
  id: string
  label: string
  description?: string
  recommended?: boolean
}

export interface ActionConfig {
  label: string
  variant: "primary" | "secondary"
  action: "save" | "next" | "navigate"
  navigateTo?: string
}

// Helper to load all configs
export const prototypeConfigs: Record<string, PrototypeConfig> = {}

export function registerPrototype(config: PrototypeConfig) {
  prototypeConfigs[config.id] = config
}

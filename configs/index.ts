import { PrototypeConfig } from "@/lib/prototype-config"
import { usShelbyConfig } from "./us-shelby-ag"
import { ukStandardConfig } from "./uk-standard"
import { deStandardConfig } from "./de-standard"

// Register all prototype configs here
// To add a new prototype:
// 1. Create a new config file (e.g., fr-standard.ts)
// 2. Import it here
// 3. Add it to the configs object

export const configs: Record<string, PrototypeConfig> = {
  "us-shelby-ag": usShelbyConfig,
  "uk-standard": ukStandardConfig,
  "de-standard": deStandardConfig,
}

export function getConfig(id: string): PrototypeConfig | undefined {
  return configs[id]
}

export function getAllConfigs(): PrototypeConfig[] {
  return Object.values(configs)
}

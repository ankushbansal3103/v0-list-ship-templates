"use client"

/**
 * TEMPLATE: Germany Shipping Flow
 * 
 * This is a complete template for the German market shipping configuration.
 * Copy this file and modify for other country variations.
 * 
 * Usage:
 * 1. Copy this file to your project
 * 2. Rename to match your use case (e.g., shipping-flow-us.tsx)
 * 3. Modify country-specific values (currency, locale, options)
 * 4. Customize the UI sections as needed
 */

import { useState } from "react"
import { 
  IPhoneFrame, 
  IOSStatusBar, 
  HomeIndicator,
  L1Header,
  PageTitle,
  SectionHeader,
  Divider,
  NavigationCard,
  CardRow,
  PrimaryButton,
  DropdownField,
  ToggleSwitch,
} from "../index"
import { countryConfigs } from "../design-tokens"

// Configuration for this template
const COUNTRY = countryConfigs.DE

export function ShippingFlowDE() {
  // State management
  const [handlingTime, setHandlingTime] = useState("2 business days")
  const [domesticReturns, setDomesticReturns] = useState(true)
  const [domesticAllowedWithin, setDomesticAllowedWithin] = useState("14 days")
  const [domesticReturnsPaidBy, setDomesticReturnsPaidBy] = useState("Buyer")
  const [domesticRefundMethod, setDomesticRefundMethod] = useState("Money back")
  
  return (
    <IPhoneFrame>
      <IOSStatusBar />
      
      <L1Header 
        onBack={() => console.log("Back")} 
        onClose={() => console.log("Close")} 
      />
      
      <div className="flex-1 overflow-y-auto px-4 pb-28">
        <PageTitle 
          title="Delivery details" 
          subtitle={`Configure for ${COUNTRY.name}`}
        />
        
        <SectionHeader title="Handling time" />
        <DropdownField 
          label="Handling time"
          value={handlingTime}
          onClick={() => console.log("Open handling time sheet")}
          variant="compact"
        />
        
        <Divider />
        
        <SectionHeader 
          title="Returns" 
          description="Sellers must accept returns if the item doesn't match the listing description."
        />
        
        <ToggleSwitch 
          label="Domestic"
          isOn={domesticReturns}
          onToggle={() => setDomesticReturns(!domesticReturns)}
        />
        
        {domesticReturns && (
          <div className="flex flex-col gap-3 mt-3">
            <DropdownField 
              label="Allowed within"
              value={domesticAllowedWithin}
              onClick={() => console.log("Open allowed within sheet")}
            />
            <DropdownField 
              label="Returns shipping paid by"
              value={domesticReturnsPaidBy}
              onClick={() => console.log("Open returns paid by sheet")}
            />
            <DropdownField 
              label="Refund method"
              value={domesticRefundMethod}
              onClick={() => console.log("Open refund method sheet")}
            />
          </div>
        )}
      </div>
      
      {/* Fixed Bottom Button */}
      <div className="absolute bottom-0 left-0 right-0 bg-white">
        <div className="h-[1px] bg-[#E5E5E5]" />
        <div className="px-4 pb-3 pt-3">
          <PrimaryButton label="Done" onClick={() => console.log("Done")} />
        </div>
        <HomeIndicator />
      </div>
    </IPhoneFrame>
  )
}

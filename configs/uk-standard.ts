import { PrototypeConfig } from "@/lib/prototype-config"

export const ukStandardConfig: PrototypeConfig = {
  id: "uk-standard",
  name: "UK-Standard-V1",
  market: "UK",
  platform: "android",
  segment: "c2c",
  version: "1.0",
  status: "active",
  initialScreen: "shipping-main",
  
  screens: [
    {
      id: "shipping-main",
      title: "Postage",
      type: "list",
      showBackButton: true,
      sections: [
        {
          id: "package-details",
          type: "card",
          title: "Parcel details",
          subtitle: "Weight & size",
          icon: "package",
          chevron: true,
          navigateTo: "package-details"
        },
        {
          id: "services",
          type: "card",
          title: "Postage services",
          subtitle: "Royal Mail 2nd Class",
          icon: "mail",
          chevron: true,
          navigateTo: "services"
        },
        {
          id: "delivery-details",
          type: "card",
          title: "Dispatch details",
          subtitle: "Location, handling, returns",
          icon: "map-pin",
          chevron: true,
          navigateTo: "delivery-details"
        }
      ],
      primaryAction: {
        label: "Save and continue",
        variant: "primary",
        action: "save"
      }
    },
    {
      id: "package-details",
      title: "Parcel details",
      type: "form",
      showBackButton: true,
      backScreen: "shipping-main",
      sections: [
        {
          id: "weight",
          type: "input-row",
          label: "Weight",
          inputType: "weight",
          placeholder: "0",
          unit: "kg g"
        },
        {
          id: "dimensions",
          type: "input-row",
          label: "Size",
          inputType: "dimensions",
          placeholder: "L x W x H",
          unit: "cm"
        },
        {
          id: "package-type",
          type: "selection-row",
          label: "Parcel type",
          options: [
            { id: "parcel", label: "Parcel", recommended: true },
            { id: "letter", label: "Large Letter" },
            { id: "small-parcel", label: "Small Parcel" }
          ],
          selectedId: "parcel"
        }
      ],
      primaryAction: {
        label: "Done",
        variant: "primary",
        action: "navigate",
        navigateTo: "shipping-main"
      }
    },
    {
      id: "delivery-details",
      title: "Dispatch details",
      type: "form",
      showBackButton: true,
      backScreen: "shipping-main",
      sections: [
        {
          id: "location",
          type: "card",
          title: "Item location",
          subtitle: "London, E1 6AN",
          chevron: true
        },
        {
          id: "handling-time",
          type: "selection-row",
          label: "Dispatch time",
          options: [
            { id: "same", label: "Same day dispatch" },
            { id: "1", label: "1 working day", recommended: true },
            { id: "2", label: "2 working days" }
          ],
          selectedId: "1"
        },
        { id: "divider1", type: "divider" },
        {
          id: "returns",
          type: "toggle-row",
          label: "UK returns",
          description: "14 days, buyer pays return postage",
          defaultValue: true
        },
        {
          id: "info-ccr",
          type: "info-banner",
          variant: "info",
          message: "Consumer Contracts Regulations require 14-day return window for UK buyers"
        }
      ],
      primaryAction: {
        label: "Done",
        variant: "primary",
        action: "navigate",
        navigateTo: "shipping-main"
      }
    },
    {
      id: "services",
      title: "Postage services",
      type: "selection",
      showBackButton: true,
      backScreen: "shipping-main",
      sections: [
        {
          id: "service-options",
          type: "selection-row",
          options: [
            { id: "rm-2nd", label: "Royal Mail 2nd Class", description: "2-3 working days", recommended: true },
            { id: "rm-1st", label: "Royal Mail 1st Class", description: "1-2 working days" },
            { id: "rm-tracked", label: "Royal Mail Tracked 24", description: "Next day" },
            { id: "hermes", label: "Evri (Hermes)", description: "2-3 working days" }
          ],
          selectedId: "rm-2nd"
        }
      ],
      primaryAction: {
        label: "Done",
        variant: "primary",
        action: "navigate",
        navigateTo: "shipping-main"
      }
    }
  ]
}

import { PrototypeConfig } from "@/lib/prototype-config"

export const usShelbyConfig: PrototypeConfig = {
  id: "us-shelby-ag",
  name: "US-Shelby-AG",
  market: "US",
  platform: "ios",
  segment: "c2c",
  version: "1.0",
  status: "active",
  initialScreen: "shipping-main",
  
  screens: [
    {
      id: "shipping-main",
      title: "Shipping",
      type: "list",
      showBackButton: true,
      sections: [
        {
          id: "package-details",
          type: "card",
          title: "Package details",
          subtitle: "Weight & dimensions",
          icon: "package",
          chevron: true,
          navigateTo: "package-details"
        },
        {
          id: "services",
          type: "card", 
          title: "Services",
          subtitle: "Standard shipping",
          icon: "truck",
          chevron: true,
          navigateTo: "services"
        },
        {
          id: "delivery-details",
          type: "card",
          title: "Delivery details",
          subtitle: "Ships from, handling time, returns",
          icon: "map-pin",
          chevron: true,
          navigateTo: "delivery-details"
        }
      ],
      primaryAction: {
        label: "Save and close",
        variant: "primary",
        action: "save"
      }
    },
    {
      id: "package-details",
      title: "Package details",
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
          unit: "lb oz"
        },
        {
          id: "dimensions",
          type: "input-row",
          label: "Dimensions",
          inputType: "dimensions",
          placeholder: "L x W x H",
          unit: "in"
        },
        {
          id: "package-type",
          type: "selection-row",
          label: "Package type",
          options: [
            { id: "box", label: "Box", recommended: true },
            { id: "envelope", label: "Envelope" },
            { id: "tube", label: "Tube" }
          ],
          selectedId: "box"
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
      title: "Delivery details",
      type: "form",
      showBackButton: true,
      backScreen: "shipping-main",
      sections: [
        {
          id: "location",
          type: "card",
          title: "Item location",
          subtitle: "San Jose, CA 95122",
          chevron: true
        },
        {
          id: "handling-time",
          type: "selection-row",
          label: "Handling time",
          options: [
            { id: "1", label: "1 business day", recommended: true },
            { id: "2", label: "2 business days" },
            { id: "3", label: "3 business days" }
          ],
          selectedId: "1"
        },
        { id: "divider1", type: "divider" },
        {
          id: "returns",
          type: "toggle-row",
          label: "Domestic returns",
          description: "30 days, buyer pays return shipping",
          defaultValue: true
        },
        {
          id: "international-returns",
          type: "toggle-row",
          label: "International returns",
          description: "Not available",
          defaultValue: false
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
      title: "Shipping services",
      type: "selection",
      showBackButton: true,
      backScreen: "shipping-main",
      sections: [
        {
          id: "service-options",
          type: "selection-row",
          options: [
            { id: "standard", label: "Standard Shipping", description: "5-8 business days", recommended: true },
            { id: "expedited", label: "Expedited Shipping", description: "2-3 business days" },
            { id: "overnight", label: "Overnight", description: "1 business day" }
          ],
          selectedId: "standard"
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

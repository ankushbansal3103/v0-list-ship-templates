import { PrototypeConfig } from "@/lib/prototype-config"

export const deStandardConfig: PrototypeConfig = {
  id: "de-standard",
  name: "DE-Standard-V1",
  market: "DE",
  platform: "ios",
  segment: "c2c",
  version: "1.0",
  status: "active",
  initialScreen: "shipping-main",
  
  screens: [
    {
      id: "shipping-main",
      title: "Versand",
      type: "list",
      showBackButton: true,
      sections: [
        {
          id: "package-details",
          type: "card",
          title: "Paketdetails",
          subtitle: "Gewicht & Maße",
          icon: "package",
          chevron: true,
          navigateTo: "package-details"
        },
        {
          id: "services",
          type: "card",
          title: "Versandoptionen",
          subtitle: "DHL Paket",
          icon: "truck",
          chevron: true,
          navigateTo: "services"
        },
        {
          id: "delivery-details",
          type: "card",
          title: "Versanddetails",
          subtitle: "Standort, Bearbeitungszeit, Rückgabe",
          icon: "map-pin",
          chevron: true,
          navigateTo: "delivery-details"
        }
      ],
      primaryAction: {
        label: "Speichern und schließen",
        variant: "primary",
        action: "save"
      }
    },
    {
      id: "package-details",
      title: "Paketdetails",
      type: "form",
      showBackButton: true,
      backScreen: "shipping-main",
      sections: [
        {
          id: "weight",
          type: "input-row",
          label: "Gewicht",
          inputType: "weight",
          placeholder: "0",
          unit: "kg"
        },
        {
          id: "dimensions",
          type: "input-row",
          label: "Maße",
          inputType: "dimensions",
          placeholder: "L x B x H",
          unit: "cm"
        },
        {
          id: "package-type",
          type: "selection-row",
          label: "Paketart",
          options: [
            { id: "paket", label: "Paket", recommended: true },
            { id: "packchen", label: "Päckchen" },
            { id: "brief", label: "Großbrief" }
          ],
          selectedId: "paket"
        }
      ],
      primaryAction: {
        label: "Fertig",
        variant: "primary",
        action: "navigate",
        navigateTo: "shipping-main"
      }
    },
    {
      id: "delivery-details",
      title: "Versanddetails",
      type: "form",
      showBackButton: true,
      backScreen: "shipping-main",
      sections: [
        {
          id: "location",
          type: "card",
          title: "Artikelstandort",
          subtitle: "Berlin, 10115",
          chevron: true
        },
        {
          id: "handling-time",
          type: "selection-row",
          label: "Bearbeitungszeit",
          options: [
            { id: "1", label: "1 Werktag", recommended: true },
            { id: "2", label: "2 Werktage" },
            { id: "3", label: "3 Werktage" }
          ],
          selectedId: "1"
        },
        { id: "divider1", type: "divider" },
        {
          id: "returns",
          type: "toggle-row",
          label: "Rücknahme",
          description: "1 Monat, Käufer zahlt Rückversand",
          defaultValue: true
        },
        {
          id: "info-widerruf",
          type: "info-banner",
          variant: "info",
          message: "Gemäß deutschem Widerrufsrecht haben Käufer 14 Tage Rückgaberecht"
        }
      ],
      primaryAction: {
        label: "Fertig",
        variant: "primary",
        action: "navigate",
        navigateTo: "shipping-main"
      }
    },
    {
      id: "services",
      title: "Versandoptionen",
      type: "selection",
      showBackButton: true,
      backScreen: "shipping-main",
      sections: [
        {
          id: "service-options",
          type: "selection-row",
          options: [
            { id: "dhl", label: "DHL Paket", description: "1-2 Werktage", recommended: true },
            { id: "hermes", label: "Hermes", description: "2-3 Werktage" },
            { id: "dpd", label: "DPD", description: "1-2 Werktage" },
            { id: "gls", label: "GLS", description: "1-2 Werktage" }
          ],
          selectedId: "dhl"
        }
      ],
      primaryAction: {
        label: "Fertig",
        variant: "primary",
        action: "navigate",
        navigateTo: "shipping-main"
      }
    }
  ]
}

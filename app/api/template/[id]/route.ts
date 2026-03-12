import { NextResponse } from 'next/server'

// Template prompts for each prototype
const templatePrompts: Record<string, { prompt: string; components: string[] }> = {
  'us-shelby-ag': {
    prompt: `Create an eBay shipping configuration prototype with the following specifications:

## Design System
- iPhone 15 Pro frame: 402x874px, black, rounded-[55px]
- Dynamic Island: 126x37px centered at top
- Screen: white, rounded-[40px]
- Colors: #191919 (text), #707070 (secondary), #3665F3 (blue CTA), #F7F7F7 (backgrounds), #8F8F8F (borders)
- Typography: 24px bold titles, 16px section headers, 14px body text, Market Sans font family

## Screens to Build

### L1 - Shipping Main Page
- iOS status bar with time "9:41", signal, wifi, battery
- Header with back arrow (grey circle) and "Shipping" title
- Three expandable cards:
  1. Package details (weight, dimensions) - tappable to L2
  2. Domestic/International services with delivery method selector
  3. Delivery details (location, handling time, returns) - tappable to L2
- Blue "Save" CTA button at bottom
- Home indicator bar

### L2 - Package Details
- Full screen with back + X buttons
- Weight input with numeric keyboard
- Package type dropdown (box, envelope, etc.)
- Dimension inputs (length, width, height)
- Done button

### L2 - Delivery Details  
- Item location section (country dropdown, city input, ZIP input)
- Handling time dropdown (same day, 1-3 business days)
- Returns section with:
  - Domestic toggle + dropdowns (allowed within, paid by, refund method)
  - International toggle + same dropdowns
- Done button

### Bottom Sheets (all with blur overlay bg-white/60 backdrop-blur-md)
- Delivery method selector
- Destination selector
- All dropdown selectors with checkmark on selected item

Build this as a single React component with useState for all interactions. Use Tailwind CSS with exact pixel values from the design system.`,
    components: ['ebay-shipping-page.tsx']
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  const template = templatePrompts[id]
  
  if (!template) {
    return NextResponse.json(
      { error: 'Template not found' },
      { status: 404 }
    )
  }
  
  return NextResponse.json({
    id,
    prompt: template.prompt,
    components: template.components,
    instructions: 'Paste this prompt into v0.dev to create your own copy of this prototype. You can then customize it without affecting the original template.'
  })
}

"use client"

import { useState } from "react"
import { 
  IPhoneFrame, 
  IPhoneOverlayFrame,
  IOSStatusBar, 
  HomeIndicator,
  BottomSheet,
  SelectionList,
  DropdownField,
  TextInputField,
  CurrencyInputField,
  ToggleSwitch,
  PrimaryButton,
  SecondaryButton,
  IconButton,
  NumericKeyboard,
  BackArrow,
  L1Header,
  L2Header,
  PageTitle,
  SectionHeader,
  Divider,
  NavigationCard,
  CardRow,
  InfoCard,
  SelectionCard,
} from "@/components/prototype-library"
import { colors, typography, spacing, countryConfigs } from "@/components/prototype-library/design-tokens"
import { X, Plus, Settings, ArrowLeft, Home } from "lucide-react"
import Link from "next/link"

export default function PrototypeLibraryPage() {
  const [activeSection, setActiveSection] = useState<string>("overview")
  const [showSheet, setShowSheet] = useState(false)
  const [toggleOn, setToggleOn] = useState(true)
  const [selectedOption, setSelectedOption] = useState("option1")
  const [textValue, setTextValue] = useState("Berlin")
  
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Top Navigation Bar */}
      <header className="border-b border-[#1f1f1f] bg-[#0a0a0a] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Prototypes</span>
            </Link>
          </div>
          
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">eb</span>
            </div>
            <span className="text-white font-medium text-sm">Prototype Library</span>
          </Link>
          
          <Link 
            href="/"
            className="p-2 bg-[#1a1a1a] hover:bg-[#222] rounded-lg transition-colors"
            title="Home"
          >
            <Home className="w-4 h-4 text-white" />
          </Link>
        </div>
      </header>

      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Component Library
            </h1>
            <p className="text-[#888]">
              Reusable components for building eBay mobile prototypes. Click on any component to see it in action.
            </p>
          </div>
        
        {/* Navigation */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {["overview", "frames", "navigation", "forms", "buttons", "cards", "sheets", "tokens"].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeSection === section 
                  ? "bg-blue-600 text-white" 
                  : "bg-[#1a1a1a] text-[#888] hover:bg-[#222] hover:text-white border border-[#333]"
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          
          {/* Overview */}
          {activeSection === "overview" && (
            <>
              <ComponentCard title="Quick Start">
                <pre className="text-xs bg-[#191919] text-white p-4 rounded-lg overflow-x-auto">
{`import { 
  IPhoneFrame, 
  IOSStatusBar,
  HomeIndicator,
  PrimaryButton 
} from "@/components/prototype-library"

export function MyPrototype() {
  return (
    <IPhoneFrame>
      <IOSStatusBar />
      {/* Your content */}
      <HomeIndicator />
    </IPhoneFrame>
  )
}`}
                </pre>
              </ComponentCard>
              
              <ComponentCard title="Country Configurations">
                <div className="space-y-2">
                  {Object.entries(countryConfigs).map(([code, config]) => (
                    <div key={code} className="flex justify-between text-sm">
                      <span className="font-medium">{code}</span>
                      <span className="text-[#707070]">{config.name} ({config.currency})</span>
                    </div>
                  ))}
                </div>
              </ComponentCard>
              
              <ComponentCard title="File Structure">
                <pre className="text-xs text-[#707070]">
{`components/prototype-library/
├── base/
│   ├── iphone-frame.tsx
│   ├── ios-status-bar.tsx
│   ├── home-indicator.tsx
│   ├── bottom-sheet.tsx
│   ├── form-fields.tsx
│   ├── buttons.tsx
│   ├── numeric-keyboard.tsx
│   ├── navigation.tsx
│   └── cards.tsx
├── templates/
│   └── shipping-flow-de.tsx
├── design-tokens.ts
└── index.ts`}
                </pre>
              </ComponentCard>
            </>
          )}
          
          {/* Frames */}
          {activeSection === "frames" && (
            <>
              <ComponentCard title="iPhone Frame" fullWidth>
                <div className="flex justify-center py-4 bg-[#E5E5E5] rounded-lg">
                  <div className="scale-[0.5] origin-center">
                    <IPhoneFrame>
                      <IOSStatusBar />
                      <div className="flex-1 flex items-center justify-center">
                        <span className="text-[#707070]">Your content here</span>
                      </div>
                      <HomeIndicator />
                    </IPhoneFrame>
                  </div>
                </div>
                <CodeSnippet code={`<IPhoneFrame>\n  <IOSStatusBar />\n  {children}\n  <HomeIndicator />\n</IPhoneFrame>`} />
              </ComponentCard>
            </>
          )}
          
          {/* Navigation */}
          {activeSection === "navigation" && (
            <>
              <ComponentCard title="L1 Header (Back + Close)">
                <div className="bg-white rounded-lg p-4">
                  <L1Header onBack={() => {}} onClose={() => {}} />
                </div>
                <CodeSnippet code={`<L1Header onBack={fn} onClose={fn} />`} />
              </ComponentCard>
              
              <ComponentCard title="L2 Header">
                <div className="bg-white rounded-lg p-4">
                  <L2Header onBack={() => {}} onClose={() => {}} />
                </div>
                <CodeSnippet code={`<L2Header onBack={fn} onClose={fn} />`} />
              </ComponentCard>
              
              <ComponentCard title="Page Title">
                <div className="bg-white rounded-lg p-4">
                  <PageTitle title="Delivery details" subtitle="Configure your shipping" />
                </div>
                <CodeSnippet code={`<PageTitle title="..." subtitle="..." />`} />
              </ComponentCard>
              
              <ComponentCard title="Section Header">
                <div className="bg-white rounded-lg p-4">
                  <SectionHeader title="Returns" description="Sellers must accept returns..." />
                </div>
                <CodeSnippet code={`<SectionHeader title="..." description="..." />`} />
              </ComponentCard>
            </>
          )}
          
          {/* Forms */}
          {activeSection === "forms" && (
            <>
              <ComponentCard title="Dropdown Field">
                <div className="space-y-3">
                  <DropdownField label="Allowed within" value="14 days" onClick={() => {}} />
                  <DropdownField label="" value="2 business days" onClick={() => {}} variant="compact" />
                </div>
                <CodeSnippet code={`<DropdownField label="..." value="..." onClick={fn} />`} />
              </ComponentCard>
              
              <ComponentCard title="Text Input Field">
                <TextInputField label="City" value={textValue} onChange={setTextValue} placeholder="Enter city" />
                <CodeSnippet code={`<TextInputField label="..." value={v} onChange={fn} />`} />
              </ComponentCard>
              
              <ComponentCard title="Currency Input Field">
                <CurrencyInputField label="Shipping cost" value="5,99" currency="€" onClick={() => {}} />
                <CodeSnippet code={`<CurrencyInputField label="..." value="..." currency="€" />`} />
              </ComponentCard>
              
              <ComponentCard title="Numeric Keyboard">
                <div className="max-w-[300px]">
                  <NumericKeyboard onKeyPress={(key) => console.log(key)} />
                </div>
                <CodeSnippet code={`<NumericKeyboard onKeyPress={fn} />`} />
              </ComponentCard>
            </>
          )}
          
          {/* Buttons */}
          {activeSection === "buttons" && (
            <>
              <ComponentCard title="Primary Button">
                <PrimaryButton label="Done" onClick={() => {}} />
                <CodeSnippet code={`<PrimaryButton label="Done" onClick={fn} />`} />
              </ComponentCard>
              
              <ComponentCard title="Secondary Button">
                <SecondaryButton label="Cancel" onClick={() => {}} />
                <CodeSnippet code={`<SecondaryButton label="Cancel" onClick={fn} />`} />
              </ComponentCard>
              
              <ComponentCard title="Toggle Switch">
                <ToggleSwitch label="Domestic" isOn={toggleOn} onToggle={() => setToggleOn(!toggleOn)} />
                <CodeSnippet code={`<ToggleSwitch label="..." isOn={bool} onToggle={fn} />`} />
              </ComponentCard>
              
              <ComponentCard title="Icon Buttons">
                <div className="flex gap-3">
                  <IconButton icon={<BackArrow />} onClick={() => {}} />
                  <IconButton icon={<X className="w-5 h-5" />} onClick={() => {}} />
                  <IconButton icon={<Plus className="w-5 h-5 text-white" />} onClick={() => {}} variant="dark" />
                </div>
                <CodeSnippet code={`<IconButton icon={<Icon />} onClick={fn} />`} />
              </ComponentCard>
            </>
          )}
          
          {/* Cards */}
          {activeSection === "cards" && (
            <>
              <ComponentCard title="Navigation Card">
                <NavigationCard onClick={() => {}}>
                  <CardRow label="Item location" value="Berlin, Germany, 10115" />
                  <CardRow label="Handling time" value="2 business days" />
                </NavigationCard>
                <CodeSnippet code={`<NavigationCard onClick={fn}>\n  <CardRow label="..." value="..." />\n</NavigationCard>`} />
              </ComponentCard>
              
              <ComponentCard title="Info Card">
                <InfoCard action={{ label: "Edit", onClick: () => {} }}>
                  <span className="text-[14px] text-[#191919]">Berlin, Germany, 10115</span>
                  <span className="text-[14px] text-[#707070]">The item location appears on the listing.</span>
                </InfoCard>
                <CodeSnippet code={`<InfoCard action={{ label: "Edit", onClick: fn }}>\n  {children}\n</InfoCard>`} />
              </ComponentCard>
              
              <ComponentCard title="Selection Cards">
                <div className="space-y-3">
                  <SelectionCard 
                    isSelected={true}
                    onClick={() => {}}
                    title="Standard Shipping"
                    description="5-7 business days"
                    price="5,99 €"
                  />
                  <SelectionCard 
                    isSelected={false}
                    onClick={() => {}}
                    title="Express Shipping"
                    description="1-2 business days"
                    price="12,99 €"
                    badge="FAST"
                  />
                </div>
                <CodeSnippet code={`<SelectionCard isSelected={bool} title="..." />`} />
              </ComponentCard>
            </>
          )}
          
          {/* Sheets */}
          {activeSection === "sheets" && (
            <>
              <ComponentCard title="Bottom Sheet">
                <button 
                  onClick={() => setShowSheet(true)}
                  className="px-4 py-2 bg-[#3665F3] text-white rounded-lg"
                >
                  Open Bottom Sheet
                </button>
                <CodeSnippet code={`<BottomSheet isOpen={bool} onClose={fn} title="...">\n  <SelectionList options={[...]} selectedId="..." onSelect={fn} />\n</BottomSheet>`} />
              </ComponentCard>
              
              <ComponentCard title="Selection List">
                <div className="bg-white rounded-lg">
                  <SelectionList 
                    options={[
                      { id: "option1", label: "14 days" },
                      { id: "option2", label: "30 days" },
                      { id: "option3", label: "60 days" },
                    ]}
                    selectedId={selectedOption}
                    onSelect={setSelectedOption}
                  />
                </div>
              </ComponentCard>
            </>
          )}
          
          {/* Tokens */}
          {activeSection === "tokens" && (
            <>
              <ComponentCard title="Colors">
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(colors).slice(0, 10).map(([name, value]) => (
                    <div key={name} className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded border border-[#E5E5E5]" 
                        style={{ backgroundColor: value }}
                      />
                      <span className="text-xs text-[#707070]">{name}</span>
                    </div>
                  ))}
                </div>
              </ComponentCard>
              
              <ComponentCard title="Typography">
                <div className="space-y-2">
                  {Object.entries(typography).map(([name, styles]) => (
                    <div key={name} className="flex justify-between text-sm">
                      <span className="font-medium">{name}</span>
                      <span className="text-[#707070]">{styles.fontSize}</span>
                    </div>
                  ))}
                </div>
              </ComponentCard>
              
              <ComponentCard title="Spacing">
                <div className="space-y-2">
                  {Object.entries(spacing).map(([name, value]) => (
                    <div key={name} className="flex justify-between text-sm">
                      <span className="font-medium">{name}</span>
                      <span className="text-[#707070]">{value}</span>
                    </div>
                  ))}
                </div>
              </ComponentCard>
            </>
          )}
        </div>
        
        {/* Bottom Sheet Demo */}
        {showSheet && (
          <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
            <div className="bg-white rounded-t-[32px] w-full max-w-md">
              <BottomSheet 
                isOpen={showSheet} 
                onClose={() => setShowSheet(false)}
                title="Allowed within"
                subtitle="Domestic returns"
              >
                <SelectionList 
                  options={[
                    { id: "14", label: "14 days" },
                    { id: "30", label: "30 days" },
                    { id: "60", label: "60 days" },
                  ]}
                  selectedId="14"
                  onSelect={(id) => {
                    console.log("Selected:", id)
                    setShowSheet(false)
                  }}
                />
              </BottomSheet>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

// Helper components
function ComponentCard({ title, children, fullWidth }: { title: string; children: React.ReactNode; fullWidth?: boolean }) {
  return (
    <div className={`bg-[#111] border border-[#222] rounded-xl p-6 ${fullWidth ? 'lg:col-span-2 xl:col-span-3' : ''}`}>
      <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}

function CodeSnippet({ code }: { code: string }) {
  return (
    <pre className="text-xs bg-[#0a0a0a] text-[#888] p-3 rounded-lg overflow-x-auto mt-3 border border-[#222]">
      {code}
    </pre>
  )
}

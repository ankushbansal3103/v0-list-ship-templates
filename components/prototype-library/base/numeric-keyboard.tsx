"use client"

// Numeric keyboard for currency/number input
interface NumericKeyboardProps {
  onKeyPress: (key: string) => void
  showDecimal?: boolean
}

export function NumericKeyboard({ onKeyPress, showDecimal = true }: NumericKeyboardProps) {
  const keys = showDecimal 
    ? ["1", "2", "3", "4", "5", "6", "7", "8", "9", ",", "0", "backspace"]
    : ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "backspace"]
  
  return (
    <div className="bg-[#D1D5DB] px-1 pt-2 pb-1">
      <div className="grid grid-cols-3 gap-[6px]">
        {keys.map((key, index) => (
          <button
            key={index}
            onClick={() => key && onKeyPress(key)}
            disabled={!key}
            className={`h-[42px] rounded-[5px] flex items-center justify-center ${
              key === "backspace" 
                ? "bg-[#ADB5BD]" 
                : key 
                  ? "bg-white shadow-sm active:bg-[#E5E5E5]"
                  : "bg-transparent"
            }`}
          >
            {key === "backspace" ? (
              <svg className="w-6 h-6 text-[#191919]" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="rotate(180 12 12)"/>
                <path d="M19 6H9L4 12L9 18H19C20.1046 18 21 17.1046 21 16V8C21 6.89543 20.1046 6 19 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="12" y1="10" x2="16" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="16" y1="10" x2="12" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <span className="text-[22px] text-[#191919]">{key}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

// Helper function to handle numeric keyboard input
export function handleNumericInput(currentValue: string, key: string, decimalSeparator = ","): string {
  if (key === "backspace") {
    return currentValue.slice(0, -1) || "0"
  } else if (key === decimalSeparator) {
    if (!currentValue.includes(decimalSeparator)) {
      return currentValue + decimalSeparator
    }
    return currentValue
  } else {
    return currentValue === "0" ? key : currentValue + key
  }
}

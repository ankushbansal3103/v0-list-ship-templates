"use client"

interface IOSStatusBarProps {
  time?: string
  backgroundColor?: string
}

export function IOSStatusBar({ time = "9:41", backgroundColor = "bg-white" }: IOSStatusBarProps) {
  return (
    <div className={`h-[47px] px-6 flex items-end justify-between pb-1 ${backgroundColor} flex-shrink-0`}>
      <span className="text-[15px] font-semibold text-[#191919]">{time}</span>
      <div className="flex items-center gap-[5px]">
        {/* Cellular Signal */}
        <svg className="w-[17px] h-[11px]" viewBox="0 0 17 11">
          <rect x="0" y="7" width="3" height="4" rx="1" fill="#191919"/>
          <rect x="4.5" y="5" width="3" height="6" rx="1" fill="#191919"/>
          <rect x="9" y="2.5" width="3" height="8.5" rx="1" fill="#191919"/>
          <rect x="13.5" y="0" width="3" height="11" rx="1" fill="#191919"/>
        </svg>
        {/* WiFi */}
        <svg className="w-[15px] h-[11px]" viewBox="0 0 15 11">
          <path d="M7.5 10.5C8.33 10.5 9 9.83 9 9C9 8.17 8.33 7.5 7.5 7.5C6.67 7.5 6 8.17 6 9C6 9.83 6.67 10.5 7.5 10.5Z" fill="#191919"/>
          <path d="M4.5 7C5.5 6 6.5 5.5 7.5 5.5C8.5 5.5 9.5 6 10.5 7" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
          <path d="M2.5 4.5C4 3 5.5 2.5 7.5 2.5C9.5 2.5 11 3 12.5 4.5" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
          <path d="M0.5 2C2.5 0.5 5 0 7.5 0C10 0 12.5 0.5 14.5 2" stroke="#191919" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
        </svg>
        {/* Battery */}
        <svg className="w-[25px] h-[12px]" viewBox="0 0 25 12">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="#191919" strokeOpacity="0.35"/>
          <rect x="2" y="2" width="18" height="8" rx="1.5" fill="#191919"/>
          <path d="M23 4V8C23.8 8 24 7 24 6C24 5 23.8 4 23 4Z" fill="#191919" fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  )
}

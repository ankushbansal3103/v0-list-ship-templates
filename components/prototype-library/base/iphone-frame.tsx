"use client"

import { ReactNode } from "react"

interface IPhoneFrameProps {
  children: ReactNode
  visible?: boolean
}

export function IPhoneFrame({ children, visible = true }: IPhoneFrameProps) {
  return (
    <div className={`relative w-[402px] h-[874px] bg-black rounded-[55px] p-3 shadow-2xl ${!visible ? 'invisible' : ''}`}>
      {/* Dynamic Island */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />
      
      {/* Screen */}
      <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  )
}

// Standalone frame for overlays (maintains same dimensions)
export function IPhoneOverlayFrame({ children }: { children: ReactNode }) {
  return (
    <div 
      className="absolute inset-0 flex items-center justify-center"
      style={{ pointerEvents: 'none' }}
    >
      <div className="relative w-[402px] h-[874px] bg-black rounded-[55px] p-3 shadow-2xl" style={{ pointerEvents: 'auto' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-50" />
        <div className="relative w-full h-full rounded-[40px] overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}

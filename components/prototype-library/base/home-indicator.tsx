"use client"

interface HomeIndicatorProps {
  backgroundColor?: string
}

export function HomeIndicator({ backgroundColor = "bg-white" }: HomeIndicatorProps) {
  return (
    <div className={`h-[34px] flex items-center justify-center ${backgroundColor}`}>
      <div className="w-[134px] h-[5px] bg-[#191919] rounded-full" />
    </div>
  )
}

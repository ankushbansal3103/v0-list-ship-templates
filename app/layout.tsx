import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
  themeColor: '#1a1a1a',
}

export const metadata: Metadata = {
  title: 'US-Shelby-AG | eBay Shipping Prototype',
  description: 'US-Shelby-AG: eBay shipping configuration prototype with Delivery, Package Details, Services, and Returns flows',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://ir.ebaystatic.com/cr/v/c01/skin/v17.8.0/fonts.css" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}

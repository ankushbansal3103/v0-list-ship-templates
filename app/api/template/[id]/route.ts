import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

// Template configuration
const templates: Record<string, { files: string[]; name: string }> = {
  'us-shelby-ag': {
    name: 'US-Shelby-AG',
    files: ['components/ebay-shipping-page.tsx']
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  const template = templates[id]
  
  if (!template) {
    return NextResponse.json(
      { error: 'Template not found' },
      { status: 404 }
    )
  }
  
  try {
    // Read the actual component code
    const codeContents: Record<string, string> = {}
    
    for (const filePath of template.files) {
      const fullPath = join(process.cwd(), filePath)
      const content = await readFile(fullPath, 'utf-8')
      codeContents[filePath] = content
    }
    
    // Format as a v0-friendly prompt with actual code
    const mainCode = codeContents['components/ebay-shipping-page.tsx'] || ''
    
    const v0Prompt = `Here is the exact code for the ${template.name} eBay Shipping prototype. Please create this component exactly as provided:

\`\`\`tsx file="components/ebay-shipping-page.tsx"
${mainCode}
\`\`\`

Also create a page.tsx that uses this component:

\`\`\`tsx file="app/page.tsx"
import { EbayShippingPage } from "@/components/ebay-shipping-page"

export default function Page() {
  return <EbayShippingPage />
}
\`\`\`

This is an eBay shipping configuration prototype with iPhone 15 Pro frame, multiple L2 screens, and bottom sheet modals. Please implement this exactly as provided.`
    
    return NextResponse.json({
      id,
      name: template.name,
      code: v0Prompt,
      rawCode: codeContents
    })
  } catch (error) {
    console.error('Error reading template files:', error)
    return NextResponse.json(
      { error: 'Failed to read template files' },
      { status: 500 }
    )
  }
}

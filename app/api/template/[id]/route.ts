import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

// Template configuration - maps prototype IDs to their source files
const templates: Record<string, { files: string[]; name: string; configFile?: string }> = {
  'us-shelby-ag': {
    name: 'US-Shelby-AG Shipping Prototype',
    files: ['components/ebay-shipping-page.tsx']
  },
  'uk-standard': {
    name: 'UK-Standard Shipping Prototype',
    configFile: 'configs/uk-standard.ts',
    files: ['components/prototype-renderer.tsx', 'lib/prototype-config.ts', 'configs/uk-standard.ts']
  },
  'de-standard': {
    name: 'DE-Standard Shipping Prototype',
    configFile: 'configs/de-standard.ts',
    files: ['components/prototype-renderer.tsx', 'lib/prototype-config.ts', 'configs/de-standard.ts']
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
    // Read all component files
    const codeContents: Record<string, string> = {}
    
    for (const filePath of template.files) {
      const fullPath = join(process.cwd(), filePath)
      const content = await readFile(fullPath, 'utf-8')
      codeContents[filePath] = content
    }
    
    // Build prompt based on template type
    let v0Prompt: string
    
    if (id === 'us-shelby-ag') {
      const mainCode = codeContents['components/ebay-shipping-page.tsx'] || ''
      v0Prompt = `Create this eBay Shipping prototype exactly as provided. This is production-ready code:

\`\`\`tsx
${mainCode}
\`\`\`

Create a page.tsx that renders this component:

\`\`\`tsx
import { EbayShippingPage } from "@/components/ebay-shipping-page"

export default function Page() {
  return <EbayShippingPage />
}
\`\`\``
    } else {
      // Config-based prototype
      const configCode = codeContents[template.configFile || ''] || ''
      const rendererCode = codeContents['components/prototype-renderer.tsx'] || ''
      const typesCode = codeContents['lib/prototype-config.ts'] || ''
      
      v0Prompt = `Create this eBay Shipping prototype for ${template.name}. Here are all the files needed:

1. Type definitions (lib/prototype-config.ts):
\`\`\`tsx
${typesCode}
\`\`\`

2. Config file (configs/${id}.ts):
\`\`\`tsx
${configCode}
\`\`\`

3. Renderer component (components/prototype-renderer.tsx):
\`\`\`tsx
${rendererCode}
\`\`\`

4. Page component (app/page.tsx):
\`\`\`tsx
"use client"
import { PrototypeRenderer } from "@/components/prototype-renderer"
import { configs } from "@/configs"

export default function Page() {
  const config = configs["${id}"]
  return config ? <PrototypeRenderer config={config} /> : null
}
\`\`\``
    }
    
    // Build the raw code as a single string with file markers
    let codeOutput = `Here is the complete code for ${template.name}. Create these files exactly:\n\n`
    for (const [filePath, content] of Object.entries(codeContents)) {
      codeOutput += `// File: ${filePath}\n${content}\n\n`
    }

    return NextResponse.json({
      id,
      name: template.name,
      prompt: v0Prompt,
      code: codeOutput,
      files: codeContents
    })
  } catch (error) {
    console.error('Error reading template files:', error)
    return NextResponse.json(
      { error: 'Failed to read template files' },
      { status: 500 }
    )
  }
}

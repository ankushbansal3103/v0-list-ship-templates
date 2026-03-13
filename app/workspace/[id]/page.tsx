"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ArrowLeft, Send, Maximize2, Minimize2 } from "lucide-react"
import Link from "next/link"
import { configs } from "@/configs"
import { PrototypeRenderer } from "@/components/prototype-renderer"

export default function WorkspacePage() {
  const params = useParams()
  const router = useRouter()
  const prototypeId = params.id as string
  
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([])
  const [input, setInput] = useState("")
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  // Get the prototype config
  const config = configs[prototypeId as keyof typeof configs]
  
  useEffect(() => {
    if (!config) {
      router.push('/')
    }
  }, [config, router])
  
  if (!config) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    )
  }
  
  const handleSend = () => {
    if (!input.trim()) return
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input }])
    
    // Simulate assistant response (in real implementation, this would call an API)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `I understand you want to: "${input}". This workspace is ready for you to iterate on the ${config.name} prototype. In a full implementation, I would modify the prototype based on your request.`
      }])
    }, 500)
    
    setInput("")
  }
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Header */}
      <header className="h-14 border-b border-[#1f1f1f] flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link 
            href="/"
            className="flex items-center gap-2 text-[#888] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Library
          </Link>
          <div className="h-4 w-px bg-[#333]" />
          <div>
            <h1 className="text-white font-medium text-sm">{config.name}</h1>
            <p className="text-[#666] text-xs">Workspace - Your changes are isolated</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400 border border-green-500/30">
            Your Copy
          </span>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Prototype Preview */}
        <div className={`${isFullscreen ? 'flex-1' : 'w-1/2'} border-r border-[#1f1f1f] flex flex-col`}>
          <div className="h-10 border-b border-[#1f1f1f] flex items-center justify-between px-4 bg-[#111]">
            <span className="text-[#888] text-xs">Preview</span>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="text-[#666] hover:text-white transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
          <div className="flex-1 overflow-auto bg-[#0a0a0a] flex items-center justify-center p-8">
            <div className="transform scale-90 origin-center">
              <PrototypeRenderer config={config} />
            </div>
          </div>
        </div>
        
        {/* Chat Panel */}
        {!isFullscreen && (
          <div className="w-1/2 flex flex-col bg-[#0a0a0a]">
            <div className="h-10 border-b border-[#1f1f1f] flex items-center px-4 bg-[#111]">
              <span className="text-[#888] text-xs">Chat with your prototype</span>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-[#666] text-sm mb-2">Start building on this prototype</p>
                  <p className="text-[#444] text-xs">Describe what changes you want to make</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div 
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-[#1a1a1a] border border-[#333] text-[#ccc]'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Input */}
            <div className="p-4 border-t border-[#1f1f1f]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Describe what you want to change..."
                  className="flex-1 h-10 px-4 bg-[#111] border border-[#333] rounded-lg text-white placeholder:text-[#555] text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="h-10 w-10 flex items-center justify-center bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

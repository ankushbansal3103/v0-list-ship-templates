import { NextRequest, NextResponse } from "next/server"

// GitHub repo details from project connection
const GITHUB_OWNER = "ankushbansal3103"
const GITHUB_REPO = "v0-list-ship-templates"
const BASE_BRANCH = "main"

export async function POST(request: NextRequest) {
  try {
    const { projectName, prototypeId } = await request.json()
    
    if (!projectName || !prototypeId) {
      return NextResponse.json(
        { error: "Project name and prototype ID are required" },
        { status: 400 }
      )
    }
    
    // Sanitize branch name
    const branchName = `prototype/${projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-')}-${Date.now()}`
    
    const githubToken = process.env.GITHUB_TOKEN
    
    if (!githubToken) {
      // If no token, return the v0 import URL as fallback
      const v0ImportUrl = `https://v0.dev/chat/import?repo=${GITHUB_OWNER}/${GITHUB_REPO}&branch=${BASE_BRANCH}`
      return NextResponse.json({
        success: true,
        fallback: true,
        url: v0ImportUrl,
        message: "Opening v0 with repository import"
      })
    }
    
    // Get the SHA of the base branch
    const refResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/ref/heads/${BASE_BRANCH}`,
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    )
    
    if (!refResponse.ok) {
      throw new Error("Failed to get base branch reference")
    }
    
    const refData = await refResponse.json()
    const baseSha = refData.object.sha
    
    // Create new branch
    const createBranchResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/refs`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ref: `refs/heads/${branchName}`,
          sha: baseSha,
        }),
      }
    )
    
    if (!createBranchResponse.ok) {
      const error = await createBranchResponse.json()
      throw new Error(error.message || "Failed to create branch")
    }
    
    // Return v0 URL with the new branch
    const v0Url = `https://v0.dev/chat?repo=${GITHUB_OWNER}/${GITHUB_REPO}&branch=${branchName}`
    
    return NextResponse.json({
      success: true,
      branchName,
      url: v0Url,
      message: `Branch "${branchName}" created successfully`
    })
    
  } catch (error) {
    console.error("Error creating branch:", error)
    
    // Fallback to basic v0 import
    const v0ImportUrl = `https://v0.dev/chat?q=${encodeURIComponent(`Clone and modify the eBay shipping prototype`)}`
    
    return NextResponse.json({
      success: false,
      fallback: true,
      url: v0ImportUrl,
      error: error instanceof Error ? error.message : "Failed to create branch"
    })
  }
}

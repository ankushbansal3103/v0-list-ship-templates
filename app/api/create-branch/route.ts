import { NextRequest, NextResponse } from "next/server"

// GitHub repo details from project connection
const GITHUB_OWNER = "ankushbansal3103"
const GITHUB_REPO = "v0-list-ship-templates"
// Use the current working branch, not main
const BASE_BRANCH = "v0/ankbansal-4101-0b50f706"

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
    const sanitizedName = projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
    const branchName = `prototype/${sanitizedName}-${Date.now()}`
    
    const githubToken = process.env.GITHUB_TOKEN
    
    if (!githubToken) {
      // If no token, open v0 with the repo directly connected
      return NextResponse.json({
        success: true,
        fallback: true,
        url: `https://v0.dev/new?repo=${GITHUB_OWNER}/${GITHUB_REPO}`,
        message: "Opening v0 with repository"
      })
    }
    
    // Get the SHA of the base branch (URL encode the branch name for slashes)
    const encodedBranch = encodeURIComponent(BASE_BRANCH)
    const refResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/ref/heads/${encodedBranch}`,
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    )
    
    if (!refResponse.ok) {
      const errorText = await refResponse.text()
      console.error("[v0] GitHub ref error:", refResponse.status, errorText)
      
      // Try getting default branch info instead
      const repoResponse = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`,
        {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      )
      
      if (!repoResponse.ok) {
        throw new Error("Failed to access repository")
      }
      
      const repoData = await repoResponse.json()
      const defaultBranch = repoData.default_branch
      
      // Get SHA from default branch
      const defaultRefResponse = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/ref/heads/${defaultBranch}`,
        {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      )
      
      if (!defaultRefResponse.ok) {
        throw new Error("Failed to get branch reference")
      }
      
      const defaultRefData = await defaultRefResponse.json()
      const baseSha = defaultRefData.object.sha
      
      // Create branch from default
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
      
      return NextResponse.json({
        success: true,
        branchName,
        url: `https://v0.dev/new?repo=${GITHUB_OWNER}/${GITHUB_REPO}&branch=${encodeURIComponent(branchName)}`,
        message: `Branch "${branchName}" created successfully`
      })
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
      console.error("[v0] Create branch error:", error)
      throw new Error(error.message || "Failed to create branch")
    }
    
    // Return v0 URL with the new branch - use /new endpoint for clean project start
    const v0Url = `https://v0.dev/new?repo=${GITHUB_OWNER}/${GITHUB_REPO}&branch=${encodeURIComponent(branchName)}`
    
    return NextResponse.json({
      success: true,
      branchName,
      url: v0Url,
      message: `Branch "${branchName}" created successfully`
    })
    
  } catch (error) {
    console.error("[v0] Error creating branch:", error)
    
    // Better fallback - open v0 with the repo connected
    return NextResponse.json({
      success: false,
      fallback: true,
      url: `https://v0.dev/new?repo=${GITHUB_OWNER}/${GITHUB_REPO}`,
      error: error instanceof Error ? error.message : "Failed to create branch"
    })
  }
}

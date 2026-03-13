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
      console.log("[v0] No GITHUB_TOKEN found in environment")
      return NextResponse.json({
        success: true,
        fallback: true,
        url: `https://v0.dev/new?repo=${GITHUB_OWNER}/${GITHUB_REPO}`,
        message: "Opening v0 with repository (no token)"
      })
    }
    
    console.log("[v0] Token found, length:", githubToken.length, "prefix:", githubToken.substring(0, 7))
    
    // First, verify the token has access by checking the authenticated user
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    })
    
    if (!userResponse.ok) {
      console.error("[v0] Token validation failed:", userResponse.status)
      return NextResponse.json({
        success: false,
        error: "GitHub token is invalid or expired. Please regenerate it.",
        url: `https://v0.dev/new?repo=${GITHUB_OWNER}/${GITHUB_REPO}`,
      })
    }
    
    const userData = await userResponse.json()
    console.log("[v0] Authenticated as:", userData.login)
    
    // Now try to access the repo
    const repoCheckResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`,
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    )
    
    if (!repoCheckResponse.ok) {
      console.error("[v0] Cannot access repo:", repoCheckResponse.status)
      return NextResponse.json({
        success: false,
        error: `Token doesn't have access to ${GITHUB_OWNER}/${GITHUB_REPO}. Please ensure the token has "Contents: Read and write" permission for this repository.`,
        url: `https://v0.dev/new?repo=${GITHUB_OWNER}/${GITHUB_REPO}`,
      })
    }
    
    const repoData = await repoCheckResponse.json()
    const defaultBranch = repoData.default_branch
    console.log("[v0] Repo accessible, default branch:", defaultBranch)
    
    // Get SHA from default branch
    const refResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/ref/heads/${defaultBranch}`,
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
      throw new Error(`Failed to get branch reference: ${refResponse.status}`)
    }
    
    const refData = await refResponse.json()
    const baseSha = refData.object.sha
    console.log("[v0] Got base SHA:", baseSha.substring(0, 7))
    
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

import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  // Skip middleware for static files and API routes
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  // Check if user has submitted the form
  const hasSubmitted = request.cookies.has("user_submitted")

  // If user is trying to access any page other than the landing page
  // and hasn't submitted the form, redirect to landing page
  if (request.nextUrl.pathname !== "/" && !hasSubmitted) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}


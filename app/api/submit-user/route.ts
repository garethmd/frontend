import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Get the form data
    const { name, email } = await request.json()

    // Validate the data
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    // In a real app, you would save this data to a database
    // For now, we'll just set a cookie to remember that the user submitted the form

    // Set a cookie that expires in 30 days
    cookies().set({
      name: "user_submitted",
      value: "true",
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: "lax",
    })

    // Also store the user info in a cookie for later use
    cookies().set({
      name: "user_info",
      value: JSON.stringify({ name, email }),
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: "lax",
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error submitting user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}


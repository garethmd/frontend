import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
  // Clear the cookies
  cookies().delete("user_submitted")
  cookies().delete("user_info")

  return NextResponse.json({ success: true })
}


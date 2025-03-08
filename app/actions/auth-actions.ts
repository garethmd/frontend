"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function logoutUser() {
  // Clear the user cookies
  cookies().delete("user_submitted")
  cookies().delete("user_info")

  // Redirect to the landing page
  redirect("/")
}


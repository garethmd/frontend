import LandingForm from "@/components/landing-form"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default function Home() {
  // Check if user has already submitted the form
  const cookieStore = cookies()
  const hasSubmitted = cookieStore.has("user_submitted")

  // If they have, redirect to the main app
  if (hasSubmitted) {
    redirect("/query") // Change this to your main app page
  }

  return <LandingForm />
}


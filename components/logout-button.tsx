"use client"

import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      // Call the API to clear cookies
      const response = await fetch("/api/logout", {
        method: "POST",
      })

      if (response.ok) {
        // Refresh the page and redirect to home
        router.refresh()
        router.push("/")
      }
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      Log Out
    </button>
  )
}


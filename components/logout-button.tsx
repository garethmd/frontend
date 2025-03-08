"use client"

import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    // Clear the cookies
    document.cookie = "user_submitted=; path=/; max-age=0"
    document.cookie = "user_info=; path=/; max-age=0"

    // Redirect to the landing page
    router.push("/")
    router.refresh()
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


"use client"

import type React from "react"

import { submitUserContact } from "@/lib/api"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LandingForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('submitting')
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    // Simple validation
    if (!name || !email) {
      setError("Please fill in all fields")
      setIsSubmitting(false)
      return
    }

    try {
      // Submit the form data to your backend
      await submitUserContact({ name, email })

      // Set a cookie to remember that the user submitted the form
      document.cookie = `user_submitted=true; path=/; max-age=${60 * 60 * 24 * 30}` // 30 days
      document.cookie = `user_info=${JSON.stringify({ name, email })}; path=/; max-age=${60 * 60 * 24 * 30}` // 30 days

      // Redirect to the main app
      router.push("/query") // Change this to your main app page
      router.refresh()
    } catch (error) {
      console.error("Error submitting form:", error)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome</h1>
          <p className="mt-2 text-gray-600">Please enter your details to continue</p>
        </div>

        {error && <div className="p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Continue to App"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


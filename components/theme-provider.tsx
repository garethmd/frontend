"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() =>
    typeof localStorage !== "undefined" ? (localStorage.getItem(storageKey) as Theme) || defaultTheme : defaultTheme,
  )

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}


// New utility function to get the current theme
export function getCurrentTheme(): "dark" | "light" {
  // For server-side rendering, default to light
  if (typeof window === "undefined") return "light"
  
  // Check for theme in localStorage
  const storedTheme = localStorage.getItem("theme") as Theme | null
  
  // If theme is explicitly set
  if (storedTheme === "dark") return "dark"
  if (storedTheme === "light") return "light"
  
  // If theme is system or not set, check system preference
  return window.matchMedia("(prefers-color-scheme: dark)").matches 
    ? "dark" 
    : "light"
}
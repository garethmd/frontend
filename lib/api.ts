// This file handles API communication with the Python FastAPI backend

interface BusinessData {
  companyName: string
  location: string
  businessType: string
  regionsServed: string[]
  aiTypes: string[]
  aiUses: string[]
  additionalInfo: string
}

// Update the Report interface to clarify that content might be markdown
export interface Report {
  reportId: string
  status: "processing" | "completed" | "failed"
  content: string | null // This is markdown content
}

// Replace with your actual FastAPI backend URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://your-fastapi-backend.com"

export async function healthCheck(): Promise<string>{
  try{
   const response = await fetch(`${API_URL}/healthy`, {
       method: "GET",
     })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const result = await response.json()
      return result.reportId
    } catch (error) {
      console.error("Error generating report:", error)
      throw error
    }
}

export async function generateReport(data: BusinessData): Promise<string> {
  try {
    const response = await fetch(`${API_URL}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const result = await response.json()
    return result.reportId
  } catch (error) {
    console.error("Error generating report:", error)
    throw error
  }
}

export async function getReport(id: string): Promise<Report | null> {
  try {
    const response = await fetch(`${API_URL}/reports/${id}`)

    if (response.status === 404) {
      return null
    }

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return (await response.json()) as Report
  } catch (error) {
    console.error("Error fetching report:", error)
    throw error
  }
}

// Add this interface for user contact details
export interface UserContact {
  name: string
  email: string
}

// Add this function to submit user contact details
export async function submitUserContact(data: UserContact): Promise<boolean> {
  console.log('submitUserContact')
  try {
    const response = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return true
  } catch (error) {
    console.error("Error submitting user contact:", error)
    throw error
  }
}


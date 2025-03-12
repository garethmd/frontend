"use client"

import { getReport, type Report } from "@/lib/api"
import { useEffect, useState } from "react"

export function useReportPolling(reportId: string) {
  const [report, setReport] = useState<Report | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    let timeoutId: NodeJS.Timeout

    const fetchReport = async () => {
      try {
        const reportData = await getReport(reportId)

        if (!isMounted) return

        if (reportData) {
          setReport(reportData)

          // If the report is still processing, continue polling
          if (reportData.status === "processing") {
            timeoutId = setTimeout(fetchReport, 2000) // Poll every 2 seconds
          } else {
            setIsLoading(false)
          }
        } else {
          setError("Report not found")
          setIsLoading(false)
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching report:", error)
          setError("Failed to fetch report")
          setIsLoading(false)
        }
      }
    }

    fetchReport()

    return () => {
      isMounted = false
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [reportId])

  return { report, isLoading, error }
}


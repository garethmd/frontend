"use client"

import { type Report, getReport } from "@/lib/api"
import { useEffect, useState } from "react"

export function useReportPolling(reportId: string) {
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    let timeoutId: NodeJS.Timeout

    const fetchReport = async () => {
      try {
        const data = await getReport(reportId)

        if (!isMounted) return

        if (data) {
          setReport(data)

          // If still processing, poll again after 3 seconds
          if (data.status === "processing") {
            timeoutId = setTimeout(fetchReport, 3000)
          } else {
            setLoading(false)
          }
        } else {
          setError("Report not found")
          setLoading(false)
        }
      } catch (err) {
        if (!isMounted) return
        setError(err instanceof Error ? err.message : "Failed to fetch report")
        setLoading(false)
      }
    }

    fetchReport()

    return () => {
      isMounted = false
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [reportId])

  return { report, loading, error }
}


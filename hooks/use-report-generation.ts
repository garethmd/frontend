"use client"

import { generateReport, getReport, type BusinessData, type Report } from "@/utils/api"
import { useCallback, useEffect, useState } from "react"

type ReportGenerationState = {
  reportId: string | null
  report: Report | null
  isGenerating: boolean
  error: string | null
}

export function useReportGeneration() {
  const [state, setState] = useState<ReportGenerationState>({
    reportId: null,
    report: null,
    isGenerating: false,
    error: null,
  })

  // Function to start report generation
  const startReportGeneration = useCallback(async (data: BusinessData) => {
    setState((prev) => ({ ...prev, isGenerating: true, error: null }))

    try {
      const reportId = await generateReport(data)
      setState((prev) => ({ ...prev, reportId }))
    } catch (error) {
      console.error("Error starting report generation:", error)
      setState((prev) => ({
        ...prev,
        isGenerating: false,
        error: "Failed to start report generation",
      }))
    }
  }, [])

  // Poll for report status when we have a reportId
  useEffect(() => {
    if (!state.reportId || !state.isGenerating) return

    let isMounted = true
    const pollInterval = 2000 // Poll every 2 seconds

    const pollReportStatus = async () => {
      try {
        const report = await getReport(state.reportId!)

        if (!isMounted) return

        if (report) {
          if (report.status === "completed") {
            setState((prev) => ({
              ...prev,
              report,
              isGenerating: false,
            }))
          } else if (report.status === "failed") {
            setState((prev) => ({
              ...prev,
              report,
              isGenerating: false,
              error: "Report generation failed",
            }))
          } else {
            // Still processing, continue polling
            setTimeout(pollReportStatus, pollInterval)
          }
        } else {
          // Report not found
          setState((prev) => ({
            ...prev,
            isGenerating: false,
            error: "Report not found",
          }))
        }
      } catch (error) {
        console.error("Error polling report status:", error)

        if (isMounted) {
          setState((prev) => ({
            ...prev,
            isGenerating: false,
            error: "Failed to check report status",
          }))
        }
      }
    }

    // Start polling
    pollReportStatus()

    // Cleanup
    return () => {
      isMounted = false
    }
  }, [state.reportId, state.isGenerating])

  // Reset the state
  const resetReport = useCallback(() => {
    setState({
      reportId: null,
      report: null,
      isGenerating: false,
      error: null,
    })
  }, [])

  return {
    reportId: state.reportId,
    report: state.report,
    isGenerating: state.isGenerating,
    error: state.error,
    startReportGeneration,
    resetReport,
  }
}


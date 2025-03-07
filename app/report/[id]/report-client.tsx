"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Download, Printer, Share2, AlertCircle, Loader2 } from "lucide-react"
import { getReport, type Report } from "@/lib/api"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export function ReportClient() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadReport() {
      if (!id) return

      try {
        setLoading(true)
        const data = await getReport(id)
        if (!data) {
          setError("Report not found")
          return
        }
        setReport(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load report")
      } finally {
        setLoading(false)
      }
    }

    loadReport()

    // If the report is in "processing" status, poll for updates
    let intervalId: NodeJS.Timeout

    if (report && report.status === "processing") {
      intervalId = setInterval(async () => {
        try {
          const updatedReport = await getReport(id)
          if (updatedReport && updatedReport.status !== "processing") {
            setReport(updatedReport)
            clearInterval(intervalId)
          }
        } catch (err) {
          console.error("Error polling for report updates:", err)
        }
      }, 5000) // Poll every 5 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [id])

  if (loading) {
    return <ReportSkeleton />
  }

  if (error || !report) {
    return (
      <Card className="p-6 flex flex-col items-center justify-center py-12 bg-red-50">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-medium mb-2 text-red-700">Error Loading Report</h2>
        <p className="text-red-600 text-center max-w-md">{error || "Report not found"}</p>
        <Button variant="outline" className="mt-4" onClick={() => router.push("/")}>
          Return to Home
        </Button>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">AI Regulatory Compliance Report</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled={report.status !== "completed"} onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm" disabled={report.status !== "completed"}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm" disabled={report.status !== "completed"}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {report.status === "processing" && (
        <Card className="p-6 flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
          <h2 className="text-xl font-medium mb-2">Generating Your Report</h2>
          <p className="text-gray-500 text-center max-w-md">
            Our AI is analyzing your business information and preparing a comprehensive regulatory compliance report.
            This may take a few minutes.
          </p>
        </Card>
      )}

      {report.status === "failed" && (
        <Card className="p-6 flex flex-col items-center justify-center py-12 bg-red-50">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-medium mb-2 text-red-700">Report Generation Failed</h2>
          <p className="text-red-600 text-center max-w-md">
            We encountered an error while generating your report. Please try again or contact support if the issue
            persists.
          </p>
          <Button variant="outline" className="mt-4" onClick={() => router.push("/")}>
            Return to Home
          </Button>
        </Card>
      )}

      {report.status === "completed" && report.content && (
        <>
          <Card className="p-6">
            <div className="prose prose-blue max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-5 mb-3" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-4 mb-2" {...props} />,
                  p: ({ node, ...props }) => <p className="mb-4" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4" {...props} />,
                  li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                  table: ({ node, ...props }) => <table className="w-full border-collapse mb-4" {...props} />,
                  th: ({ node, ...props }) => <th className="border p-2 bg-gray-100" {...props} />,
                  td: ({ node, ...props }) => <td className="border p-2" {...props} />,
                }}
              >
                {report.content}
              </ReactMarkdown>
            </div>
          </Card>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-blue-800 font-medium mb-2">Disclaimer</h3>
            <p className="text-blue-700 text-sm">
              This report is provided for informational purposes only and does not constitute legal advice. We recommend
              consulting with a qualified legal professional for specific guidance on regulatory compliance.
            </p>
          </div>
        </>
      )}
    </div>
  )
}

function ReportSkeleton() {
  // Skeleton component remains the same
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Skeleton className="h-8 w-64" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-32 w-full" />
        </div>
      </Card>
    </div>
  )
}


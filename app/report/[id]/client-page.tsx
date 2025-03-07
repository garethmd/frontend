"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useReportPolling } from "@/hooks/use-report-polling"
import { AlertCircle, Download, Loader2, Printer, Share2 } from "lucide-react"

export function ClientReportContent({ id }: { id: string }) {
  const { report, loading, error } = useReportPolling(id)

  if (loading) {
    return (
      <Card className="p-6 flex flex-col items-center justify-center py-12">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <h2 className="text-xl font-medium mb-2">Loading Report</h2>
        <p className="text-gray-500 text-center max-w-md">Please wait while we retrieve your report...</p>
      </Card>
    )
  }

  if (error || !report) {
    return (
      <Card className="p-6 flex flex-col items-center justify-center py-12 bg-red-50">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-medium mb-2 text-red-700">Error Loading Report</h2>
        <p className="text-red-600 text-center max-w-md">{error || "Report not found"}</p>
        <Button variant="outline" className="mt-4" onClick={() => (window.location.href = "/")}>
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
          <Button variant="outline" size="sm" disabled={report.status !== "completed"}>
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
          <Button variant="outline" className="mt-4" onClick={() => (window.location.href = "/")}>
            Return to Home
          </Button>
        </Card>
      )}

      {report.status === "completed" && report.content && (
        <>
          <Card className="p-6">
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: report.content }} />
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


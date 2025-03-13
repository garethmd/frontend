"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useReportPolling } from "@/hooks/use-report-polling"
import { markdownToHtml } from "@/lib/markdown"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function ReportPage() {
  return (
    <div className="min-h-screen   bg-muted text-foreground">
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <ReportContent />
        </div>
      </main>
    </div>
  )
}

export function ReportContent() {
  const params = useParams()
  const reportId = params.id as string

  const { report, isLoading, error } = useReportPolling(reportId)
  const [htmlContent, setHtmlContent] = useState<string | null>(null)

  useEffect(() => {
    if (report?.content) {
      const html = markdownToHtml(report.content)
      setHtmlContent(html)
    }
  }, [report])

  if (error) {
    return (
      <Card className="max-w-4xl mx-auto bg-card text-card-foreground shadow-lg bg-gray-50 dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-destructive">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{error}</p>
          <Button asChild variant="destructive" className="mt-4">
            <Link href="/">Return to Home</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (isLoading || !report || report.status === "processing") {
    return (
      <Card className="max-w-4xl mx-auto bg-card text-card-foreground shadow-lg bg-gray-50 dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-primary">Generating Your Report</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-center text-muted-foreground">
            Please wait while we generate your compliance report. This may take a minute...
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-4xl mx-auto bg-card text-card-foreground shadow-lg bg-gray-50 dark:bg-gray-900">
      <CardHeader>
        <CardTitle>Your Compliance Report</CardTitle>
      </CardHeader>
      <CardContent>
       {htmlContent ? (
  <div
    className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-primary dark:prose-headings:text-[#f5793b] prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:font-semibold"
    dangerouslySetInnerHTML={{ __html: htmlContent }}
  />
) : (
  <p className="text-muted-foreground">No content available for this report.</p>
)}


        <div className="mt-8 flex justify-between">
          <Button asChild variant="outline">
            <Link href="/">Generate Another Report</Link>
          </Button>
          <Button onClick={() => window.print()}>Print Report</Button>
        </div>
      </CardContent>
    </Card>
  )
}

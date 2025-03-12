"use client"
import { Header } from "@/components/header"
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
    <div className="min-h-screen bg-gray-50">
      <Header />
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

  // Process the markdown/HTML content when the report changes
  useEffect(() => {
    if (report?.content) {
      const html = markdownToHtml(report.content)
      setHtmlContent(html)
    }
  }, [report])

  if (error) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-red-600">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
          <Button asChild className="mt-4">
            <Link href="/">Return to Home</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (isLoading || !report || report.status === "processing") {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Generating Your Report</CardTitle>
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
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Your Compliance Report</CardTitle>
      </CardHeader>
      <CardContent>
        {htmlContent ? (
          <div
            className="prose prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:font-semibold prose-strong:text-gray-900 max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        ) : (
          <p>No content available for this report.</p>
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


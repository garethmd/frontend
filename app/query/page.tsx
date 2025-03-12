import { BusinessInfoForm } from "@/components/business-info-form"

export default function Home() {
  return (
    <div className="min-h-screen bg-muted">
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto bg-gray-50 dark:bg-gray-900">
          <div className="rounded-lg shadow-md p-6 md:p-8">
            <h1 className="text-2xl font-bold  dark:text-gray-100 mb-2">AI Regulatory Compliance Advisor</h1>
            <p className="dark:text-gray-300 mb-6">
              Get personalized advice about AI legislation impact on your business and recommended compliance actions.
            </p>
            <BusinessInfoForm />
          </div>
        </div>
      </main>
    </div>
  )
}


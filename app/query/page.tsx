import { BusinessInfoForm } from "@/components/business-info-form"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">AI Regulatory Compliance Advisor</h1>
            <p className="text-gray-600 mb-6">
              Get personalized advice about AI legislation impact on your business and recommended compliance actions.
            </p>
            <BusinessInfoForm />
          </div>
        </div>
      </main>
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} AI Regulatory Advisor. All rights reserved.
        </div>
      </footer>
    </div>
  )
}


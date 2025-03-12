"use client"
import { Header } from "@/components/header";

function AboutContent() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-gray-900">About Neural Aspect</h1>
      <p className="text-lg text-gray-700">
        Neural Aspect is a a business which uses cutting edge AI research to solve meaningful business problems. We combine skills from cloud software engineering, predict analytics, forecasting and sales and marketing data 
        to help companies grow by identifying obstacles to growth.
      </p>
      <h2 className="text-2xl font-semibold text-gray-900">Horizon Scanner</h2>
      <p className="text-lg text-gray-700">
        This project showcases a robust, scalable interface for generating regulatory reports using agentic workflows. 
      </p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <AboutContent />
        </div>
      </main>
    </div>
  )
}

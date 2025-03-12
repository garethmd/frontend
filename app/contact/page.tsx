"use client"
import { Header } from "@/components/header";

function ContactUsContent() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
      <p className="text-lg text-gray-700">
        If you're interested in participating in this project or would like to discuss how Neural Aspect can help you,
        we'd love to hear from you.
      </p>
      <div className="text-lg text-gray-700 space-y-2">
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:gdavies@neuralaspect.com" className="text-primary hover:underline">
            gdavies@neuralaspect.com
          </a>
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          <a href="tel:+1234567890" className="text-primary hover:underline">
            +44 7977 278 687
          </a>
        </p>
        <p>
          <a href="www.neuralaspect.com" className="text-primary hover:underline">
            www.neuralaspect.com
          </a>
        </p>
        
      </div>
    </div>
  );
}


export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <ContactUsContent />
        </div>
      </main>
    </div>
  )
}

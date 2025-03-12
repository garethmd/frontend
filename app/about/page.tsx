
export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="company-heading-2">Horizon Scanner</h2>
              <p className="company-paragraph max-w-[900px] text-muted-foreground md:text-xl">
                Stay ahead of AI regulations with intelligent agentic workflows that identify and mitigate your business’s compliance risks.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="p-2 bg-[#354A63]/10 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-[#354A63]"
                >
                  <path d="M12 2v20" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 className="company-heading-3">Personalised Risk Score</h3>
              <p className="company-paragraph text-muted-foreground">
                Get a clear, tailored assessment of how AI regulations impact your business, 
                with a relevance and risk rating specific to your operations.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="p-2 bg-[#354A63]/10 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-[#354A63]"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <h3 className="company-heading-3">Actionable Compliance Recommendations</h3>
              <p className="company-paragraph text-muted-foreground">
                Receive clear, practical steps to align your AI practices with regulations, ensuring compliance with minimal disruption.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="p-2 bg-[#354A63]/10 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-[#354A63]"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="company-heading-3">Regulation Simplified</h3>
              <p className="company-paragraph text-muted-foreground">
                Understand complex AI regulations with clear, tailored summaries that highlight their specific impact on your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="company-heading-1">Brought to you by Neural Aspect</h1>
              <p className="company-paragraph max-w-[700px] text-muted-foreground md:text-xl">
                Applying cutting-edge AI research to solve meaningful business problems.
              </p>
            </div>
            <div className="space-x-4">
                <strong>Email:</strong>{" "}
                <a href="mailto:gdavies@neuralaspect.com">
                  gdavies@neuralaspect.com
                </a>
                <strong>Phone:</strong>{" "}
                <a href="tel:+447977278687">
                  +44 7977 278 687
                </a>
                <a href="https://www.neuralaspect.com">
                  www.neuralaspect.com
                </a>
           
            </div>
          </div>
        </div>
      </section>
  
    </div>
  )
}


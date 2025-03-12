"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { generateReport } from "@/lib/api"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"

const regions = [
  { id: "eu", name: "European Union" },
  { id: "us", name: "United States" },
  { id: "uk", name: "United Kingdom" },
  { id: "ca", name: "Canada" },
  { id: "au", name: "Australia" },
  { id: "asia", name: "Asia Pacific" },
]

const businessTypes = [
  { id: "tech", name: "Technology" },
  { id: "finance", name: "Finance" },
  { id: "healthcare", name: "Healthcare" },
  { id: "retail", name: "Retail" },
  { id: "manufacturing", name: "Manufacturing" },
  { id: "education", name: "Education" },
  { id: "other", name: "Other" },
]

const aiTypes = [
  { id: "nlp", name: "Natural Language Processing" },
  { id: "cv", name: "Computer Vision" },
  { id: "ml", name: "Machine Learning" },
  { id: "dl", name: "Deep Learning" },
  { id: "gen", name: "Generative AI" },
  { id: "rec", name: "Recommendation Systems" },
]

const aiUses = [
  { id: "customer", name: "Customer Service" },
  { id: "product", name: "Product Development" },
  { id: "marketing", name: "Marketing" },
  { id: "operations", name: "Operations" },
  { id: "hr", name: "Human Resources" },
  { id: "decision", name: "Decision Making" },
]

export function BusinessInfoForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    location: "",
    businessType: "",
    regionsServed: [] as string[],
    aiTypes: [] as string[],
    aiUses: [] as string[],
    additionalInfo: "",
    topic: "AI Legislation", // Added fixed value
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    setFormData((prev) => {
      if (checked) {
        return { ...prev, [name]: [...(prev[name as keyof typeof prev] as string[]), value] }
      } else {
        return {
          ...prev,
          [name]: (prev[name as keyof typeof prev] as string[]).filter((item) => item !== value),
        }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Call the API to generate the report with the fixed "topic" included
      const reportId = await generateReport(formData)

      // Redirect to the report page immediately
      // The report page will handle the polling and status updates
      router.push(`/report/${reportId}?status=processing`)
    } catch (error) {
      console.error("Error generating report:", error)
      alert("There was an error generating your report. Please try again.")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
  <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
    {/* Company Name & Primary Location */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Company Name
        </Label>
        <Input
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white shadow-sm focus:border-primary focus:ring-primary"
        />
      </div>
      <div>
        <Label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Primary Location
        </Label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Country or region where your company is headquartered"
          required
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white shadow-sm focus:border-primary focus:ring-primary"
        />
      </div>
    </div>

    {/* Business Type */}
    <div className="mt-6">
      <Label htmlFor="businessType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Business Type
      </Label>
      <Select value={formData.businessType} onValueChange={(value) => handleSelectChange("businessType", value)}>
        <SelectTrigger id="businessType" className="mt-1 w-full">
          <SelectValue placeholder="Select business type" />
        </SelectTrigger>
        <SelectContent>
          {businessTypes.map((type) => (
            <SelectItem key={type.id} value={type.id}>
              {type.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    {/* Regions You Sell To */}
    <div className="mt-6">
      <Label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        Regions You Sell To
      </Label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {regions.map((region) => (
          <div key={region.id} className="flex items-center space-x-2">
            <Checkbox
              id={`region-${region.id}`}
              className="border border-gray-300 dark:border-white"
              checked={formData.regionsServed.includes(region.id)}
              onCheckedChange={(checked) => handleCheckboxChange("regionsServed", region.id, checked as boolean)}
            />
            <Label htmlFor={`region-${region.id}`} className="cursor-pointer text-sm text-gray-700 dark:text-gray-300">
              {region.name}
            </Label>
          </div>
        ))}
      </div>
    </div>

    {/* AI Usage Information */}
    <Card className="mt-6 p-4 bg-gray-50 dark:bg-gray-800">
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-3">AI Usage Information</h3>
      {/* Types of AI Used */}
      <div className="mb-4">
        <Label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Types of AI Used
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {aiTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox
                id={`ai-type-${type.id}`}
                checked={formData.aiTypes.includes(type.id)}
                className="border border-gray-300 dark:border-white"
                onCheckedChange={(checked) => handleCheckboxChange("aiTypes", type.id, checked as boolean)}
              />
              <Label htmlFor={`ai-type-${type.id}`} className="cursor-pointer text-sm text-gray-700 dark:text-gray-300">
                {type.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* What You Use AI For */}
      <div>
        <Label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          What You Use AI For
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {aiUses.map((use) => (
            <div key={use.id} className="flex items-center space-x-2">
              <Checkbox
                id={`ai-use-${use.id}`}
                checked={formData.aiUses.includes(use.id)}
                className="border border-gray-300 dark:border-white"
                onCheckedChange={(checked) => handleCheckboxChange("aiUses", use.id, checked as boolean)}
              />
              <Label htmlFor={`ai-use-${use.id}`} className="cursor-pointer text-sm text-gray-700 dark:text-gray-300">
                {use.name}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </Card>

    {/* Additional Information */}
    <div className="mt-6">
      <Label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Additional Information
      </Label>
      <Textarea
        id="additionalInfo"
        name="additionalInfo"
        value={formData.additionalInfo}
        onChange={handleChange}
        placeholder="Please provide any additional details about your AI usage that might be relevant for regulatory compliance"
        rows={4}
        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white shadow-sm focus:border-primary focus:ring-primary"
      />
    </div>

    {/* Fixed Topic */}
    <div className="mt-6">
      <Label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Topic
      </Label>
      <Input
        id="topic"
        name="topic"
        value={formData.topic}
        disabled
        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 shadow-sm"
      />
    </div>
  </div>

  {/* Submit Button */}
  <Button type="submit" variant="outline" className="w-full py3 hidden md:inline-flex" disabled={loading}>
    {loading ? (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Report...
      </>
    ) : (
      "Generate Compliance Report"
    )}
  </Button>
</form>

  )
}
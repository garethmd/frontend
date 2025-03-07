"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { generateReport } from "@/lib/api"

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
      // Call the API to generate the report
      const reportId = await generateReport(formData)

      // Redirect to the report page
      router.push(`/report/${reportId}`)
    } catch (error) {
      console.error("Error generating report:", error)
      alert("There was an error generating your report. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="location">Primary Location</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Country or region where your company is headquartered"
            required
          />
        </div>

        <div>
          <Label htmlFor="businessType">Business Type</Label>
          <Select value={formData.businessType} onValueChange={(value) => handleSelectChange("businessType", value)}>
            <SelectTrigger id="businessType">
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

        <div>
          <Label className="block mb-2">Regions You Sell To</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {regions.map((region) => (
              <div key={region.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`region-${region.id}`}
                  checked={formData.regionsServed.includes(region.id)}
                  onCheckedChange={(checked) => handleCheckboxChange("regionsServed", region.id, checked as boolean)}
                />
                <Label htmlFor={`region-${region.id}`} className="cursor-pointer">
                  {region.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Card className="p-4">
          <h3 className="font-medium mb-3">AI Usage Information</h3>

          <div className="mb-4">
            <Label className="block mb-2">Types of AI Used</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {aiTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`ai-type-${type.id}`}
                    checked={formData.aiTypes.includes(type.id)}
                    onCheckedChange={(checked) => handleCheckboxChange("aiTypes", type.id, checked as boolean)}
                  />
                  <Label htmlFor={`ai-type-${type.id}`} className="cursor-pointer">
                    {type.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="block mb-2">What You Use AI For</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {aiUses.map((use) => (
                <div key={use.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`ai-use-${use.id}`}
                    checked={formData.aiUses.includes(use.id)}
                    onCheckedChange={(checked) => handleCheckboxChange("aiUses", use.id, checked as boolean)}
                  />
                  <Label htmlFor={`ai-use-${use.id}`} className="cursor-pointer">
                    {use.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div>
          <Label htmlFor="additionalInfo">Additional Information</Label>
          <Textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            placeholder="Please provide any additional details about your AI usage that might be relevant for regulatory compliance"
            rows={4}
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
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


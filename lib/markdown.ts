import { marked } from "marked"

// Configure marked options
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: true, // Convert \n to <br>
  sanitize: false, // Allow HTML
  smartLists: true,
  smartypants: true,
  xhtml: false,
})

/**
 * Convert markdown to HTML
 */
export function markdownToHtml(markdown: string): string {
  if (!markdown) return ""

  try {
    return marked(markdown)
  } catch (error) {
    console.error("Error converting markdown to HTML:", error)
    return markdown // Return original content as fallback
  }
}


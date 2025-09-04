import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

/**
 * Font Configuration
 * Using Google Fonts for professional typography
 */

// Inter font for body text - clean, readable sans-serif
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Improves loading performance
  variable: "--font-inter",
})

// Poppins font for headings - modern, friendly sans-serif
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"], // Multiple weights for design flexibility
})

/**
 * SEO Metadata Configuration
 * Optimized for search engines and social media sharing
 */
export const metadata: Metadata = {
  title: "TorestTech | Proactive IT Support & Solutions",
  description:
    "TorestTech provides expert IT support, cybersecurity, and cloud solutions to empower your business. Get your free IT health check today.",
  keywords: "IT support, cybersecurity, managed IT services, cloud solutions, data backup",
    generator: 'v0.app'
}

/**
 * Root Layout Component
 *
 * Provides the base HTML structure and global providers for the entire application.
 * Includes:
 * - Font loading and CSS variables
 * - Theme provider for dark/light mode functionality
 * - Global styling and accessibility features
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} antialiased`}
      suppressHydrationWarning // Prevents hydration warnings from theme provider
    >
      <body className="font-sans">
        {/* Theme Provider enables dark/light mode switching with system preference detection */}
        <ThemeProvider
          attribute="class" // Uses CSS classes for theme switching
          defaultTheme="system" // Respects user's system preference
          enableSystem // Allows automatic theme detection
          disableTransitionOnChange // Prevents flash during theme changes
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

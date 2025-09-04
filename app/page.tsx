"use client"

// Import necessary React hooks and Next.js theme functionality
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

// Import Lucide React icons for UI elements
import { Moon, Sun, Menu, X, Sparkles, Phone, Mail, MapPin } from "lucide-react"

// Import shadcn/ui components for consistent design system
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

/**
 * Main Torestech Website Component
 *
 * This is the primary landing page component that includes:
 * - Responsive navigation with dark/light mode toggle
 * - Hero section with CTA
 * - Animated statistics counter
 * - Services showcase with AI-powered modals
 * - About section with company story
 * - Contact forms (AI troubleshooting + consultation)
 * - Footer with company information and social links
 * - Floating WhatsApp button for community engagement
 */
export default function TorestechWebsite() {
  // Theme management using next-themes for dark/light mode switching
  const { theme, setTheme } = useTheme()

  // Mobile navigation state for responsive hamburger menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // WhatsApp button visibility based on scroll position
  const [showWhatsApp, setShowWhatsApp] = useState(false)

  // Animated statistics counters for the stats section
  const [animatedStats, setAnimatedStats] = useState({
    projects: 0,
    clients: 0,
    years: 0,
    hours: 0,
  })

  /**
   * Toggle between dark and light themes
   * Uses next-themes setTheme function for proper persistence
   */
  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  /**
   * Effect: Handle WhatsApp button visibility on scroll
   * Shows floating WhatsApp button after user scrolls 300px down
   */
  useEffect(() => {
    const handleScroll = () => {
      setShowWhatsApp(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  /**
   * Effect: Set up Intersection Observer for statistics animation
   * Triggers counter animation when stats section comes into view
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStats()
          }
        })
      },
      { threshold: 0.5 }, // Trigger when 50% of element is visible
    )

    const statsSection = document.getElementById("stats-section")
    if (statsSection) {
      observer.observe(statsSection)
    }

    return () => observer.disconnect()
  }, [])

  /**
   * Animate statistics counters with smooth counting effect
   * Creates engaging visual feedback when stats section is viewed
   */
  const animateStats = () => {
    const targets = { projects: 150, clients: 99, years: 5, hours: 24 }
    const duration = 2000 // 2 seconds total animation time
    const steps = 60 // 60 steps for smooth animation

    Object.keys(targets).forEach((key) => {
      const target = targets[key as keyof typeof targets]
      const increment = target / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        setAnimatedStats((prev) => ({
          ...prev,
          [key]: Math.floor(current),
        }))
      }, duration / steps)
    })
  }

  /**
   * Smooth scroll navigation function
   * Handles both desktop and mobile navigation clicks
   */
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false) // Close mobile menu after navigation
  }

  return (
    <div className="min-h-screen">
      {/* Fixed Navigation Header with Logo, Menu Items, and Theme Toggle */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Company Logo */}
            <div className="flex-shrink-0">
              <img src="/torestech-logo.jpeg" alt="Torestech - Connecting Everything" className="h-10 w-auto" />
            </div>

            {/* Desktop Navigation Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Contact
              </button>

              {/* Dark/Light Mode Toggle Button */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>

            {/* Mobile Navigation Controls */}
            <div className="md:hidden flex items-center space-x-4">
              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-slate-700 dark:text-slate-300"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu (Collapsible) */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => scrollToSection("hero")}
                  className="block px-3 py-2 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  className="block px-3 py-2 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="block px-3 py-2 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  About Us
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="block px-3 py-2 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Website Content */}
      <main className="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        {/* Hero Section - Primary value proposition and CTA */}
        <section id="hero" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Hero Text Content */}
              <div className="order-2 lg:order-1">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 font-sans leading-tight">
                  {"Empowering Your Business with Flawless IT."}
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                  {
                    "Technology should be an asset, not a challenge. We provide proactive, human-centered IT support that eliminates downtime and empowers your team to focus on what matters most."
                  }
                </p>
                {/* Primary Call-to-Action Button with custom styling for accessibility */}
                <button onClick={() => scrollToSection("contact")} className="cta-button-primary">
                  Request Your Free IT Health Check
                </button>
              </div>
              {/* Hero Image */}
              <div className="order-1 lg:order-2">
                <img
                  src="/modern-tech-team-working-collaboratively-with-lapt.jpg"
                  alt="Modern tech team collaborating with laptops in a bright, professional office environment"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section - Animated counters showing company achievements */}
        <section id="stats-section" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {/* Each stat uses animated counter values */}
              <div>
                <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">{animatedStats.projects}+</div>
                <div className="text-slate-600 dark:text-slate-300 font-medium">Projects Completed</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">{animatedStats.clients}+</div>
                <div className="text-slate-600 dark:text-slate-300 font-medium">Happy Clients</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">{animatedStats.years}+</div>
                <div className="text-slate-600 dark:text-slate-300 font-medium">Years of Experience</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">{animatedStats.hours}+</div>
                <div className="text-slate-600 dark:text-slate-300 font-medium">Hour Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition Section - Why choose Torestech */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-16">
              Why Partner with Torestech?
            </h2>
            {/* Feature cards grid showcasing key benefits */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Each card represents a core value proposition */}
              <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  {/* Visual icon placeholder */}
                  <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-indigo-600 rounded-full"></div>
                  </div>
                  <CardTitle className="text-slate-900 dark:text-white">Proven Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    Our seasoned experts bring years of hands-on experience, ensuring reliable solutions for your
                    business.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-indigo-600 rounded-full"></div>
                  </div>
                  <CardTitle className="text-slate-900 dark:text-white">24/7 Reliability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    Your business never sleeps, and neither do we. Get peace of mind with round-the-clock support.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-indigo-600 rounded-full"></div>
                  </div>
                  <CardTitle className="text-slate-900 dark:text-white">Human-Centered Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    Experience a different kind of IT support that puts people first and technology second.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-indigo-600 rounded-full"></div>
                  </div>
                  <CardTitle className="text-slate-900 dark:text-white">Affordable Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    Gain access to enterprise-level IT solutions without the enterprise price tag.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Services Section - Core service offerings with AI-powered explanations */}
        <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-16">
              Our Core Services
            </h2>
            {/* Services grid with interactive modal dialogs */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Device Troubleshooting",
                  description: "We fix issues with laptops, desktops, and mobile devices to keep you productive.",
                },
                {
                  title: "Cybersecurity & Data Protection",
                  description: "Protect your valuable data with our robust cybersecurity setup and compliance support.",
                },
                {
                  title: "Data Recovery & Backup",
                  description:
                    "Secure and recover your data with our reliable backup solutions and cloud migration services.",
                },
                {
                  title: "Network & Connectivity",
                  description: "Full support for internet, Wi-Fi, and network design, monitoring, and maintenance.",
                },
                {
                  title: "Dedicated Helpdesk",
                  description:
                    "Professional helpdesk support for businesses, ensuring your team has the help they need.",
                },
                {
                  title: "IT Training Programs",
                  description: "Equip your team with essential tech skills through our customized training programs.",
                },
              ].map((service, index) => (
                <Card
                  key={index}
                  className="border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <CardTitle className="text-slate-900 dark:text-white">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600 dark:text-slate-300 mb-4">
                      {service.description}
                    </CardDescription>
                    {/* AI-powered business explanation modal */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 bg-transparent"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Explain for my business
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <DialogHeader>
                          <DialogTitle className="text-slate-900 dark:text-white">AI Business Explanation</DialogTitle>
                          <DialogDescription className="text-slate-600 dark:text-slate-300">
                            Tell us about your business type to get a customized explanation of how{" "}
                            {service.title.toLowerCase()} can benefit you.
                          </DialogDescription>
                        </DialogHeader>
                        {/* Business type input form for personalized AI responses */}
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="business-type" className="text-slate-700 dark:text-slate-300">
                              Business Type
                            </Label>
                            <Input
                              id="business-type"
                              placeholder="e.g., Small accounting firm, E-commerce startup, Law office..."
                              className="border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                            />
                          </div>
                          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Generate Explanation
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* About Section - Company story and team image */}
        <section id="about" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Company story and values */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                  {"We're Not Just an IT Vendor; We're Your Partner."}
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  Torestech was born from a simple idea: technology should empower people, not complicate their lives.{" "}
                  {"We're"} a team of passionate problem-solvers who believe in building genuine partnerships.
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  Instead of just reacting to issues, we work proactively to optimize your systems, secure your data,
                  and help you leverage technology for real growth. Your success is our success.
                </p>
              </div>
              {/* Team collaboration image */}
              <div>
                <img
                  src="/diverse-team-collaborating-around-conference-table.jpg"
                  alt="Diverse team of professionals collaborating around a conference table in a modern office setting"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section - Dual contact forms for different user needs */}
        <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* AI Troubleshooting Form - Immediate help for tech issues */}
              <Card className="border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-slate-900 dark:text-white">Instant AI Troubleshooting</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-300">
                    Facing a tech issue? Describe it below and let our AI assistant provide immediate, safe steps you
                    can try right now.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Issue description textarea */}
                  <Textarea
                    placeholder="e.g., 'My computer is very slow when I open my browser.'"
                    className="min-h-32 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                  />
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Get Quick Suggestions
                  </Button>
                </CardContent>
              </Card>

              {/* Consultation Form - For partnerships and complex needs */}
              <Card className="border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-slate-900 dark:text-white">{"Let's"} Solve It Together</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-300">
                    For complex challenges or to discuss a partnership, our experts are ready to help. Fill out the form
                    below for a personalized consultation.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Contact form fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="full-name" className="text-slate-700 dark:text-slate-300">
                        Full Name
                      </Label>
                      <Input
                        id="full-name"
                        className="border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        className="border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                      />
                    </div>
                  </div>
                  {/* Service selection dropdown */}
                  <div>
                    <Label htmlFor="service" className="text-slate-700 dark:text-slate-300">
                      Service of Interest
                    </Label>
                    <Select>
                      <SelectTrigger className="border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800">
                        <SelectValue placeholder="General Inquiry" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="troubleshooting">Device Troubleshooting</SelectItem>
                        <SelectItem value="cybersecurity">Cybersecurity & Data Protection</SelectItem>
                        <SelectItem value="backup">Data Recovery & Backup</SelectItem>
                        <SelectItem value="network">Network & Connectivity</SelectItem>
                        <SelectItem value="helpdesk">Dedicated Helpdesk</SelectItem>
                        <SelectItem value="training">IT Training Programs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Message textarea */}
                  <div>
                    <Label htmlFor="message" className="text-slate-700 dark:text-slate-300">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      className="min-h-32 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                    />
                  </div>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">Send Message</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Company information, links, and social media */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company branding and tagline */}
            <div>
              <img
                src="/torestech-logo.jpeg"
                alt="Torestech - Connecting Everything"
                className="h-8 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-slate-400 leading-relaxed">
                Empowering businesses through smarter, more reliable technology solutions.
              </p>
            </div>

            {/* Quick navigation links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <button
                  onClick={() => scrollToSection("hero")}
                  className="block text-slate-400 hover:text-white transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  className="block text-slate-400 hover:text-white transition-colors"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="block text-slate-400 hover:text-white transition-colors"
                >
                  About Us
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="block text-slate-400 hover:text-white transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Contact information */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact Us</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-400">Lagos, Nigeria</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-400">info@torestech.space</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-400">+234 903 046 1312</span>
                </div>
              </div>
            </div>

            {/* Social media links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {/* Twitter/X link */}
                <a
                  href="https://x.com/TorestTech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                {/* LinkedIn link */}
                <a
                  href="https://www.linkedin.com/company/toresttech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                {/* Instagram link */}
                <a
                  href="https://www.instagram.com/TorestTech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323C5.902 8.198 7.053 7.708 8.35 7.708s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.897-.875-1.387-2.026-1.387-3.323s.49-2.448 1.297-3.323c.875-.897 2.026-1.387 3.323-1.387s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Footer bottom section with copyright and legal links */}
          <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">© 2025 Torestech. All Rights Reserved.</p>
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Community Button - Appears after scrolling */}
      {showWhatsApp && (
        <a
          href="https://whatsapp.com/channel/0029VbAs9E33AzNVKSeaSm1o"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce z-50 flex items-center space-x-2"
        >
          {/* WhatsApp icon SVG */}
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
          {/* Button text (hidden on small screens) */}
          <span className="hidden sm:inline font-medium">Join our community</span>
        </a>
      )}
    </div>
  )
}

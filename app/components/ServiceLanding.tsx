"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"

interface ServiceLandingProps {
  service: string
}

export default function ServiceLanding({ service }: ServiceLandingProps) {
  const searchParams = useSearchParams()
  const forYouSelection = searchParams.get("forYou") || "All"
  const allServicesSelection = searchParams.get("allServices") || "None"

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-navy-blue text-gold">
      <h1 className="text-4xl font-bold mb-8">Welcome to {service} Services</h1>
      <p className="mb-4">Your selections:</p>
      <ul className="mb-8 text-center">
        <li>For You: {forYouSelection}</li>
        <li>All Services: {allServicesSelection}</li>
      </ul>
      <Link href="/" className="px-6 py-2 bg-gold text-navy-blue rounded-full hover:bg-yellow-400">
        Back to Home
      </Link>
    </div>
  )
}


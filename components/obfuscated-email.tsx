"use client"

import { useEffect, useState } from "react"

interface ObfuscatedEmailProps {
  email: string
  className?: string
  displayText?: string
  asLink?: boolean
}

/**
 * Component that obfuscates email addresses to protect from spam harvesters
 * The email is only set after the component mounts, making it harder for bots to harvest
 */
export default function ObfuscatedEmail({ 
  email, 
  className = "", 
  displayText,
  asLink = true 
}: ObfuscatedEmailProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder while loading to prevent bots from seeing the email
    return (
      <span className={className} aria-label="E-postadress">
        {displayText || "E-post"}
      </span>
    )
  }

  if (asLink) {
    return (
      <a 
        href={`mailto:${email}`}
        className={className}
        aria-label={`Skicka e-post till ${email}`}
      >
        {displayText || email}
      </a>
    )
  }

  return (
    <span className={className}>
      {displayText || email}
    </span>
  )
}


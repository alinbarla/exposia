import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Obfuscates email address to protect from spam harvesters
 * Returns an object with parts that can be safely displayed
 */
export function obfuscateEmail(email: string) {
  const [local, domain] = email.split('@')
  return {
    local,
    domain,
    full: email, // For mailto links, we still need the full email
    display: `${local}@${domain}`.replace(/./g, (char, i) => {
      // Simple obfuscation - replace some characters with HTML entities
      if (i % 3 === 0 && char !== '@' && char !== '.') {
        return `&#${char.charCodeAt(0)};`
      }
      return char
    })
  }
}

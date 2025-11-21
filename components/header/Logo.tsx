import Link from "next/link"
import Image from "next/image"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-1.5 sm:gap-2 relative z-10 group">
      <Image
        src="/exposia logo.png"
        alt="Exposia Photography"
        width={200}
        height={72}
        className="h-12 sm:h-16 w-auto object-contain group-hover:opacity-90 transition-opacity"
        priority
      />
    </Link>
  )
}

"use client";

import Link from "next/link";
import Image from "next/image";

export default function ContactHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10 h-20 sm:h-24 flex items-center">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/exposia logo.png"
            alt="Exposia Photography"
            width={200}
            height={72}
            className="h-12 sm:h-16 w-auto object-contain"
            priority
          />
        </Link>
      </div>
    </header>
  );
}


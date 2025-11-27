"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import ContactForm from "@/components/contact-form";

// Simple header with just logo
const ContactHeader = dynamic(() => import("@/components/header/ContactHeader"), {
  ssr: false,
});

export default function ContactPage() {
  useEffect(() => {
    // Scroll to top immediately when page loads
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Disable browser's automatic scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <ContactHeader />
      <div className="flex-1 flex items-start justify-center w-full py-8 sm:py-12 px-4 sm:px-6" style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '100px' }}>
        <div className="w-full max-w-2xl">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}


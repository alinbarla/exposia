"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ContactForm from "@/components/contact-form";

// Simple header with just logo
const ContactHeader = dynamic(() => import("@/components/header/ContactHeader"), {
  ssr: false,
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <ContactHeader />
      <div className="flex-1 flex items-center justify-center min-h-0">
        <ContactForm />
      </div>
    </div>
  );
}


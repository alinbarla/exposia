import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Format email content
    const emailContent = `
Ny bokningsförfrågan från Exposia.se

Plan: ${data.plan.name}
Typ: ${data.plan.isVilla ? "Villa" : "Lägenhet"}
Pris: ${data.plan.price} kr

Postnummer: ${data.zipcode || "Ej angivet"}
Adress: ${data.address}
Datum: ${data.date}

Extratjänster:
${data.additionalServices.length > 0
  ? data.additionalServices.map((s: any) => `- ${s.name}: +${s.price} kr`).join("\n")
  : "Inga extratjänster valda"}

Subtotal: ${data.total} kr
Moms (25%): ${data.vat || Math.round(data.total * 0.25)} kr
Totalt inkl. moms: ${data.totalWithVAT || data.total + Math.round(data.total * 0.25)} kr

Kontaktuppgifter:
Namn: ${data.contact.fullName}
E-post: ${data.contact.email}
Telefon: ${data.contact.phone}

---
Detta meddelande skickades från kontaktformuläret på Exposia.se
    `.trim();

    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || "info@exposia.se",
        pass: process.env.SMTP_PASS || "",
      },
    });

    // Format email content for client (confirmation)
    const clientEmailContent = `
Tack för din bokningsförfrågan!

Vi har mottagit din förfrågan och återkommer till dig så snart som möjligt.

Din bokning:
Plan: ${data.plan.name}
Typ: ${data.plan.isVilla ? "Villa" : "Lägenhet"}
Pris: ${data.plan.price} kr

Postnummer: ${data.zipcode || "Ej angivet"}
Adress: ${data.address}
Datum: ${data.date}

Extratjänster:
${data.additionalServices.length > 0
  ? data.additionalServices.map((s: any) => `- ${s.name}: +${s.price} kr`).join("\n")
  : "Inga extratjänster valda"}

Subtotal: ${data.total} kr
Moms (25%): ${data.vat || Math.round(data.total * 0.25)} kr
Totalt inkl. moms: ${data.totalWithVAT || data.total + Math.round(data.total * 0.25)} kr

Vi kontaktar dig snart på:
E-post: ${data.contact.email}
Telefon: ${data.contact.phone}

Med vänliga hälsningar,
Exposia Team

---
Detta är en automatisk bekräftelse från Exposia.se
    `.trim();

    // Send emails
    const emailErrors: string[] = [];
    
    try {
      // Send confirmation email to client
      await transporter.sendMail({
        from: `"Exposia" <${process.env.SMTP_USER || "info@exposia.se"}>`,
        to: data.contact.email,
        subject: `Bekräftelse: Din bokningsförfrågan - ${data.plan.name}`,
        text: clientEmailContent,
        html: clientEmailContent.replace(/\n/g, "<br>"),
      });
    } catch (clientEmailError) {
      console.error("Error sending confirmation email to client:", clientEmailError);
      emailErrors.push("Kunde inte skicka bekräftelse till kund");
    }

    try {
      // Send notification email to info@exposia.se
      await transporter.sendMail({
        from: `"Exposia Kontaktformulär" <${process.env.SMTP_USER || "info@exposia.se"}>`,
        to: "info@exposia.se",
        replyTo: data.contact.email,
        subject: `Ny bokningsförfrågan - ${data.plan.name}`,
        text: emailContent,
        html: emailContent.replace(/\n/g, "<br>"),
      });
    } catch (adminEmailError) {
      console.error("Error sending notification email to admin:", adminEmailError);
      emailErrors.push("Kunde inte skicka notifiering till info@exposia.se");
      // Log email content for manual sending if needed
      console.log("Email content (for manual sending):", emailContent);
    }

    // If both emails failed, return error
    if (emailErrors.length === 2) {
      throw new Error("Kunde inte skicka några e-postmeddelanden");
    }

    return NextResponse.json(
      { success: true, message: "Förfrågan skickad!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { success: false, message: "Ett fel uppstod vid skickande av förfrågan" },
      { status: 500 }
    );
  }
}


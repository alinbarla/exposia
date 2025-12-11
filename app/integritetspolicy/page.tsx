export const metadata = {
  title: "Integritetspolicy | Exposia",
  description:
    "Läs Exposias integritetspolicy. Vi beskriver hur vi samlar in, använder och skyddar personuppgifter i enlighet med GDPR.",
}

export default function IntegritetspolicyPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-16">
      <div className="container mx-auto max-w-4xl space-y-10">
        <header className="space-y-3">
          <p className="text-sm text-white/60 uppercase tracking-[0.15em]">Juridisk information</p>
          <h1 className="text-3xl sm:text-4xl font-bold">Integritetspolicy</h1>
          <p className="text-white/70">
            Vi värnar om din personliga integritet och följer GDPR. På den här sidan förklarar vi vilka uppgifter vi samlar in,
            varför vi gör det och hur de används.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Personuppgifter vi behandlar</h2>
          <p className="text-white/70">
            Vi samlar in uppgifter du delar med oss när du kontaktar oss, bokar tjänster eller laddar upp material. Det kan vara
            namn, telefonnummer, e-postadress, företagsnamn, projektinformation och faktureringsuppgifter.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Ändamål med behandlingen</h2>
          <ul className="list-disc list-inside space-y-2 text-white/70">
            <li>Besvara förfrågningar och hantera bokningar.</li>
            <li>Leverera avtalade foto- och videotjänster.</li>
            <li>Fakturering, betalningar och bokföringskrav.</li>
            <li>Förbättra våra tjänster och säkerställa kvalitetskontroll.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Rättslig grund</h2>
          <p className="text-white/70">
            Vi behandlar personuppgifter baserat på avtal (för att leverera våra tjänster), berättigat intresse (för att
            kommunicera och förbättra tjänsterna) samt rättsliga förpliktelser (bokföring och konsumenträtt).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Lagringstid</h2>
          <p className="text-white/70">
            Vi sparar uppgifter så länge det krävs för att uppfylla ändamålen ovan eller så länge lag kräver. Fakturaunderlag
            sparas enligt bokföringslagen. Projektfiler sparas så länge du är kund eller tills du ber oss radera dem.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Delning av uppgifter</h2>
          <p className="text-white/70">
            Vi delar endast uppgifter med betrodda leverantörer som hjälper oss att leverera tjänster, till exempel
            betalningsleverantörer och molntjänster. Vi säljer aldrig personuppgifter.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Dina rättigheter</h2>
          <ul className="list-disc list-inside space-y-2 text-white/70">
            <li>Få tillgång till dina uppgifter.</li>
            <li>Begära rättelse eller radering.</li>
            <li>Invända mot eller begränsa behandling.</li>
            <li>Flytta data (dataportabilitet).</li>
            <li>Lämna klagomål till Integritetsskyddsmyndigheten.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Kontakt</h2>
          <p className="text-white/70">
            Personuppgiftsansvarig: Exposia, Stockholm. Kontakta oss på <a className="text-amber-400 hover:text-amber-300" href="mailto:info@exposia.se">info@exposia.se</a> eller ring <a className="text-amber-400 hover:text-amber-300" href="tel:0763441168">076-344 11 68</a>.
          </p>
        </section>
      </div>
    </main>
  )
}


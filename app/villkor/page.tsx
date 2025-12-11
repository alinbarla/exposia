export const metadata = {
  title: "Villkor | Exposia",
  description:
    "Läs Exposias allmänna villkor för fastighetsfotografering, bostadsvideo och tilläggstjänster.",
}

export default function VillkorPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-16">
      <div className="container mx-auto max-w-4xl space-y-10">
        <header className="space-y-3">
          <p className="text-sm text-white/60 uppercase tracking-[0.15em]">Juridisk information</p>
          <h1 className="text-3xl sm:text-4xl font-bold">Allmänna villkor</h1>
          <p className="text-white/70">
            Dessa villkor gäller när du bokar foto-, video- och tilläggstjänster från Exposia.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Bokning och leverans</h2>
          <ul className="list-disc list-inside space-y-2 text-white/70">
            <li>Bokning sker via kontaktformulär, telefon eller e-post.</li>
            <li>Bekräftelse skickas via e-post tillsammans med planerad tid.</li>
            <li>Leverans av färdigt material sker normalt inom 24 timmar efter fotografering/filmning.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Priser och betalning</h2>
          <ul className="list-disc list-inside space-y-2 text-white/70">
            <li>Priser anges exklusive moms om inget annat anges.</li>
            <li>Betalningsvillkor är 10 dagar från fakturadatum om inget annat avtalats.</li>
            <li>Eventuella reskostnader utanför Stockholms län offereras separat.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Immateriella rättigheter</h2>
          <p className="text-white/70">
            Kunden får en licens att använda levererat material i marknadsföringssyfte för den aktuella fastigheten. Exposia
            behåller upphovsrätten om inget annat avtalats skriftligen.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Ombokning och avbokning</h2>
          <ul className="list-disc list-inside space-y-2 text-white/70">
            <li>Ombokning är kostnadsfri upp till 24 timmar före bokad tid.</li>
            <li>Avbokning senare än 24 timmar kan debiteras upp till 50% av bokat belopp.</li>
            <li>Vid sjukdom eller force majeure bokar vi om utan extra kostnad.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Ansvar</h2>
          <p className="text-white/70">
            Vi levererar enligt branschpraxis och ansvarar för att materialet motsvarar avtalad kvalitet. Indirekta skador eller
            följdskador ersätts inte. Reklamation ska ske inom 7 dagar efter leverans.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Kontakt</h2>
          <p className="text-white/70">
            Har du frågor om villkoren? Kontakta oss på <a className="text-amber-400 hover:text-amber-300" href="mailto:info@exposia.se">info@exposia.se</a> eller ring <a className="text-amber-400 hover:text-amber-300" href="tel:0763441168">076-344 11 68</a>.
          </p>
        </section>
      </div>
    </main>
  )
}


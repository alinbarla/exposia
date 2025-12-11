"use client"

import { motion } from "framer-motion"

export default function FaqSection() {
  const faqs = [
    {
      question: "Hur lång tid tar det att få bilderna och videorna?",
      answer:
        "Vi garanterar leverans inom 24 timmar efter fotograferingen ⚡. Alla bilder och videor levereras i hög kvalitet och är redo att användas direkt i din marknadsföring.",
    },
    {
      question: "Vad ingår i fotograferingspaketet?",
      answer:
        "Fotograferingspaketet inkluderar: 1 session med 20-25 interiörfoton, 3 exteriörfoton, 1 skymningsbild, 3 drönarbilder och 1 planritning. Alla bilder är professionellt redigerade och levereras i hög upplösning.",
    },
    {
      question: "Vad ingår i videopaketet?",
      answer:
        "Videopaketet inkluderar en 30–45 sekunders video (horisontell eller vertikal) som presenterar bostaden professionellt. Drönarvideo och stabiliserad walkthrough ingår automatiskt för att ge en komplett bild av fastigheten.",
    },
    {
      question: "Kan jag kombinera fotografering och video?",
      answer:
        "Ja! Vi erbjuder ett kombinerat paket 'Fotografi + Video' som ger dig allt från båda paketen till ett förmånligt pris. Du sparar 25% jämfört med att boka tjänsterna separat.",
    },
    {
      question: "Vad kostar era tjänster?",
      answer:
        "För lägenheter: Fotografi 1 400 kr, Video 2 200 kr, eller Fotografi + Video 2 700 kr. För villor: Fotografi 2 600 kr, Video 3 200 kr, eller Fotografi + Video 4 000 kr. Alla priser är exkl. moms. För lägenheter ingår 1 rum och alla övriga utrymmen. För villor ingår 2 rum och alla övriga utrymmen. Extra rum kan läggas till som extratjänst (300 kr per rum).",
    },
    {
      question: "Vilka extratjänster erbjuder ni?",
      answer:
        "Vi erbjuder Extra rum (300 kr per rum), 3D-planritning och 3D-walkthrough (+450 kr), virtuella visningar, extra drönarbilder/sekvenser, foto med säsongsbyte (+250 kr) och videor med mäklarpresentation (+550 kr).",
    },
    {
      question: "Hur bokar jag en fotografering eller video?",
      answer:
        "Du kan boka direkt via vårt kontaktformulär på hemsidan, ringa oss på 076-344 11 68 eller skicka e-post via kontaktformuläret. Vi kontaktar dig inom 3 timmar för att bekräfta bokningen och planera detaljerna.",
    },
    {
      question: "Arbetar ni i hela Stockholms län?",
      answer:
        "Ja, vi arbetar i hela Stockholms län (postnummer 10000-19999). Om din fastighet ligger utanför detta område, kontakta oss så kan vi diskutera möjligheter för framtida expansion.",
    },
    {
      question: "Hur lång tid tar en fotograferingssession?",
      answer:
        "En standard fotograferingssession tar vanligtvis 1-2 timmar beroende på objektets storlek. För kombinerade paket (fotografi + video) kan det ta lite längre tid. Vi anpassar oss efter ditt schema.",
    },
    {
      question: "Får jag använda bilderna och videorna fritt?",
      answer:
        "Ja, när du har betalat för tjänsten får du full rätt att använda alla bilder och videor i din marknadsföring, på fastighetsmäklarsidor, sociala medier och andra marknadsföringskanaler utan begränsningar.",
    },
  ]

  return (
    <section id="faq" className="py-4 sm:py-20 md:py-24 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-amber-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-red-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-4">Vanliga frågor</h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Har du frågor om fastighetsfotografi, bostadsvideo eller våra tjänster i Stockholm? Vi är här för att hjälpa. Exposia har många års erfarenhet av professionell fastighetsfotografering och bostadsvideo i Stockholm. Om du inte hittar svaret här, kontakta oss gärna så hjälper vi dig att hitta den perfekta lösningen för din fastighet. Vi svarar på alla frågor om våra tjänster, priser, leveranstider och processen för fastighetsfotografering och bostadsvideo.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-5">
          {faqs.map((faq, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-6"
              itemScope
              itemType="https://schema.org/Question"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-2" itemProp="name">
                {faq.question}
              </h3>
              <p className="text-base sm:text-base text-white/70 leading-relaxed" itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                <span itemProp="text">{faq.answer}</span>
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

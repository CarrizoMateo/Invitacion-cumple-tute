// src/App.jsx
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays, MapPin, PartyPopper, Gift, Sparkles,
  ClipboardList, Cake, Camera
} from "lucide-react";
import Countdown from "./components/Countdown.jsx";

export default function App() {
  // ==== TUS DATOS ====
  const titulo       = "¡Cumple Tute!";
  const frase        = "Los invito a pasar una linda noche, con comida rica, musiquita y buena ondaaa.";
  const fechaHumana  = "10/10/2025";
  const horaHumana   = "20:30hs";
  const fechaISO     = "2025-10-10T20:30:00-03:00"; // AR
  const lugar        = "Gandolfo 2925, Virreyes.";
  const googleMaps   = "https://maps.app.goo.gl/Pt2ePuvTsAtZD8wg7";
  const dressCode    = "💙Algo azul💙";

  // >>> PONÉ ACÁ EL LINK DE TU GOOGLE FORM <<<
  const googleFormLink = "https://forms.gle/VT8ANcLiHy97LKgd8";
  // ===========================================

  // .ics (Add to Calendar)
  const icsHref = useMemo(() => {
    const start = new Date(fechaISO);
    const end   = new Date(start.getTime() + 3 * 60 * 60 * 1000);
    const toUTC = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
    const dtStart = toUTC(start);
    const dtEnd   = toUTC(end);

    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Cumple Tute//Invite//ES",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${cryptoRandom()}`,
      `DTSTAMP:${toUTC(new Date())}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      "SUMMARY:¡Cumple Tute!",
      `LOCATION:${escapeICS(lugar)}`,
      `DESCRIPTION:${escapeICS(frase)}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    return URL.createObjectURL(blob);
  }, [fechaISO, lugar, frase]);

  const bounce = {
    hidden: { y: 18, opacity: 0 },
    show: (i = 1) => ({
      y: 0, opacity: 1,
      transition: { delay: i * 0.08, type: "spring", stiffness: 120, damping: 14 }
    })
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-b from-[#0b1b4a] via-[#132a7a] to-[#0b1b4a] text-white">
      {/* Mesh de azules */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(1200px 600px at -10% -20%, rgba(59,130,246,.25), transparent 60%), radial-gradient(800px 400px at 120% 10%, rgba(37,99,235,.25), transparent 60%), radial-gradient(600px 300px at 50% 120%, rgba(29,78,216,.25), transparent 60%)"
        }}
      />

      <main className="relative z-10 flex items-center justify-center px-4 py-16">
        <motion.section initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="w-full max-w-4xl">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl text-center">
            {/* Header */}
            <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="flex items-center gap-3 justify-center text-blue-200">
              <Sparkles className="size-6" />
              <p className="uppercase tracking-[0.3em] text-xs md:text-sm">ESTÁS INVITAD@</p>
            </motion.div>

            <motion.h1 variants={bounce} initial="hidden" animate="show" custom={1} className="mt-3 text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-[0_0_25px_rgba(59,130,246,0.55)] font-fascinate">
              {titulo}
            </motion.h1>

            <motion.p variants={bounce} initial="hidden" animate="show" custom={2} className="mt-3 text-blue-100/90 md:text-lg">
              {frase}
            </motion.p>

            {/* Cuenta regresiva */}
            <Countdown targetISO={fechaISO} />

            {/* Datos */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <InfoCard icon={<CalendarDays className="size-6" />} title="Cuándo" text={`${fechaHumana}\n${horaHumana}`} />
              <InfoCard icon={<MapPin className="size-6" />}      title="Dónde"  text={lugar} linkText="Abrir mapa" href={googleMaps} />
              <InfoCard icon={<Gift className="size-6" />}        title="Dress Code" text={"💙Algo azul💙"} />
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              {/* Confirmar asistencia -> Google Form */}
              <a
                href={googleFormLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium transition-all bg-blue-500 hover:bg-blue-400 text-white shadow-lg hover:shadow-xl"
              >
                <ClipboardList className="size-4" />
                Confirmar asistencia
              </a>

              <a
                href={icsHref}
                download="cumple-tute.ics"
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium transition-all bg-white/10 hover:bg-white/15 text-blue-50 border border-white/15"
              >
                <Cake className="size-4" /> Agregar al calendario
              </a>
            </div>

            {/* Galería */}
            <section className="mt-10 text-left">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Camera className="size-5 text-blue-200" /> Galería
              </h3>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {["/galeria/Cande","/galeria/Yo.jfif","/galeria/Sofi.JPG","/galeria/los-pibes.jfif","/galeria/Mia-Vicky.jpg","/galeria/Gesell.jfif"].map((src) => (
                  <motion.img
                    key={src}
                    src={src}
                    alt="Foto"
                    loading="lazy"
                    className="aspect-square object-cover rounded-xl border border-white/10 bg-white/5"
                    whileHover={{ scale: 1.03 }}
                    onError={(e) => { e.currentTarget.style.opacity = 0.2; e.currentTarget.alt = "Agregá tu foto en "+src; }}
                  />
                ))}
              </div>
            </section>
          </div>
        </motion.section>
      </main>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0b1b4a]/80 to-transparent" />
    </div>
  );
}

// Helpers para .ics
function cryptoRandom() {
  return (crypto?.randomUUID?.() || Math.random().toString(36).slice(2)) + "@cumple-tute";
}
function escapeICS(text) {
  return String(text).replace(/\\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

// Subcomponentes
function InfoCard({ icon, title, text, href, linkText }) {
  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ type: "spring", stiffness: 250, damping: 18 }} className="p-5 rounded-2xl bg-white/10 border border-white/10 text-blue-50">
      <div className="flex items-center gap-2 text-blue-200">{icon}<span className="font-medium">{title}</span></div>
      <p className="mt-2 whitespace-pre-line leading-relaxed">{text}</p>
      {href && (
        <a className="inline-block mt-3 text-sm underline decoration-blue-300/60 hover:decoration-blue-300" href={href} target="_blank" rel="noreferrer">
          {linkText || "Abrir mapa"}
        </a>
      )}
    </motion.div>
  );
}

function CTA({ href, label, icon, variant = "solid" }) {
  const base = "inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium transition-all";
  const solid = "bg-blue-500 hover:bg-blue-400 text-white shadow-lg hover:shadow-xl";
  const outline = "border border-blue-300/40 hover:border-blue-200/70 text-blue-50 bg-white/5";
  return (
    <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} href={href} className={`${base} ${variant === "solid" ? solid : outline}`}>
      {icon} {label}
    </motion.a>
  );
}

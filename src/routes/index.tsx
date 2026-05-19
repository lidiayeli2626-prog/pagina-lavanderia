import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Instagram, MessageCircle, MapPin, Sparkles, Droplets, Wind, ClipboardList, Menu } from "lucide-react";
import heroImg from "@/assets/hero-laundry.jpg";
import reservaImg from "@/assets/reservacion.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lavandería Esponja Feliz — Lavado profesional bajo el mar" },
      { name: "description", content: "Servicio de lavandería innovador en Villa Nueva. Cobijas, peluches, edredones, uniformes y más. ¡Lava con alegría!" },
      { property: "og:title", content: "Lavandería Esponja Feliz" },
      { property: "og:description", content: "Lavado profesional, secado express y reservas fáciles. ¡No dejes para mañana lo que puedes lavar hoy!" },
    ],
  }),
  component: Home,
});

const PRENDAS = ["Cobijas", "Peluches", "Edredones", "Uniformes", "Ternos", "Cortinas", "Camisas", "Pantalones", "Vestidos", "Manteles"];

function Bubbles() {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        left: Math.random() * 100,
        size: 18 + Math.random() * 50,
        duration: 12 + Math.random() * 18,
        delay: Math.random() * 15,
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="bubble"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function Logo() {
  return (
    <div className="leading-[0.85] select-none">
      <div className="logo-text text-primary text-2xl md:text-3xl">LAVANDERÍA</div>
      <div className="logo-text text-sunny text-3xl md:text-4xl -mt-1" style={{ color: "oklch(0.85 0.17 95)" }}>ESPONJA</div>
      <div className="logo-text text-xl md:text-2xl -mt-1" style={{ color: "oklch(0.78 0.2 145)" }}>FELIZ</div>
    </div>
  );
}

function NavBar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#inicio", label: "Inicio" },
    { href: "#servicios", label: "Servicios" },
    { href: "#ordenar", label: "Ordenar" },
    { href: "#contacto", label: "Contacto" },
    { href: "#ubicacion", label: "Ubicación" },
  ];
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
        <a href="#inicio"><Logo /></a>
        <nav className="hidden md:flex items-center gap-8 text-base font-bold text-foreground">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          <Menu className="text-primary" />
        </button>
      </div>
      {open && (
        <nav className="md:hidden flex flex-col gap-3 px-6 pb-4 font-bold">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="hover:text-primary">{l.label}</a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative">
      <div className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
        <img src={heroImg} alt="Lavandería Esponja Feliz con Bob Esponja y Patricio" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <Bubbles />
      </div>
    </section>
  );
}

function SearchSection() {
  const [q, setQ] = useState("");
  const filtered = q ? PRENDAS.filter((p) => p.toLowerCase().includes(q.toLowerCase())) : PRENDAS;
  return (
    <section id="servicios" className="relative py-20 px-4 md:px-8 gradient-sky overflow-hidden">
      <Bubbles />
      <div className="relative max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold text-primary tracking-tight">
          ¿Qué tipo de prendas quieres lavar hoy?
        </h2>
        <p className="mt-6 text-lg text-foreground/80">
          Busca tu prenda y descubre si podemos dejarla como nueva.
        </p>
        <p className="mt-2 text-lg md:text-xl font-extrabold tracking-wide">
          ¡NO DEJES PARA MAÑANA LO QUE PUEDES LAVAR HOY!
        </p>

        <div className="mt-10 relative">
          <div className="flex items-center bg-card rounded-full shadow-bubble border-2 border-secondary px-6 py-4">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Ej: Cobijas, Peluches, Camisas..."
              className="flex-1 bg-transparent outline-none text-base md:text-lg placeholder:text-muted-foreground"
            />
            <Search className="text-primary" />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3 md:gap-4">
          {filtered.map((p) => (
            <button
              key={p}
              className="px-6 py-3 rounded-full bg-bubble border border-secondary text-primary font-extrabold text-base md:text-lg hover:bg-secondary hover:scale-105 transition-all shadow-card"
              style={{ background: "var(--bubble)" }}
            >
              {p}
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="text-muted-foreground">No encontramos esa prenda. ¡Pregúntanos!</p>
          )}
        </div>
      </div>
    </section>
  );
}

function MissionVision() {
  return (
    <section className="py-20 px-4 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <article className="bg-card rounded-3xl p-10 shadow-card border-4 border-sunny" style={{ borderColor: "oklch(0.85 0.17 95)" }}>
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-primary" />
            <h3 className="text-2xl md:text-3xl font-extrabold text-primary">MISIÓN</h3>
          </div>
          <p className="text-foreground/80 leading-relaxed text-lg">
            Brindar un servicio de lavandería innovador y de alta calidad, ofreciendo una experiencia confiable, eficiente y superior e incorporando soluciones innovadoras que ahorren tiempo y mejoren la experiencia del cliente.
          </p>
        </article>
        <article className="bg-card rounded-3xl p-10 shadow-card border-4 border-secondary">
          <div className="flex items-center gap-3 mb-4">
            <Droplets className="text-primary" />
            <h3 className="text-2xl md:text-3xl font-extrabold text-primary">VISIÓN</h3>
          </div>
          <p className="text-foreground/80 leading-relaxed text-lg">
            Convertirnos en la lavandería líder en servicios premium e inteligentes, reconocida por transformar el cuidado de la ropa en una experiencia que eleva la confianza y el estilo de vida de los clientes.
          </p>
        </article>
      </div>
    </section>
  );
}

function Pricing() {
  const items = [
    { name: "Lavado Profesional", desc: "Limpieza profunda con detergentes premium", price: "Q17.00", icon: Droplets },
    { name: "Secado Express", desc: "Secado controlado para evitar daños térmicos", price: "Q25.00", icon: Wind },
  ];
  return (
    <section id="ordenar" className="py-20 px-4 md:px-8 gradient-sky">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-primary text-center mb-12">Precios</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {items.map((it) => (
            <div key={it.name} className="bg-card rounded-3xl p-8 shadow-bubble flex items-center gap-6 hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center shrink-0">
                <it.icon className="text-primary" size={32} />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-extrabold text-foreground">{it.name}</h4>
                <p className="text-muted-foreground text-sm mt-1">{it.desc}</p>
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-primary">{it.price}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <a
            href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=mBexQLre1E2qZ4wm97GLGDMR1ZK6N7xJg4OBIdM5l5xUMDFXOEc0MUo4UDRLNzNYQThMTjlNSlZWOS4u&origin=Invitation&channel=0"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-4 bg-primary text-primary-foreground rounded-3xl p-3 pr-8 shadow-bubble hover:scale-[1.02] transition-transform"
          >
            <img src={reservaImg} alt="Hacer reservación" className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover" />
            <div className="text-left">
              <div className="text-sm uppercase tracking-widest opacity-80">Listo para empezar</div>
              <div className="text-2xl md:text-3xl font-extrabold flex items-center gap-2">
                <ClipboardList /> Hacer una Reservación
              </div>
              <div className="mt-2 inline-block bg-card text-primary px-4 py-2 rounded-full font-bold text-sm">
                Ir al Formulario de Reserva →
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const socials = [
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/esponjafeliz_?igsh=MWN5NmUzbHZ5eTRlMQ==", color: "oklch(0.6 0.22 0)" },
    { name: "WhatsApp", icon: MessageCircle, href: "https://wa.me/50251155125", color: "oklch(0.7 0.2 145)" },
  ];
  return (
    <section id="contacto" className="py-20 px-4 md:px-8 bg-secondary">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold text-primary">¡Contáctanos ahora!</h2>
        <p className="mt-4 text-lg text-foreground/80">
          Escríbenos directamente por las redes sociales para agendar tu servicio.
        </p>
        <div className="mt-10 flex justify-center gap-6">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              aria-label={s.name}
              target="_blank"
              rel="noopener noreferrer"
              className="w-20 h-20 rounded-full bg-card flex items-center justify-center shadow-bubble hover:-translate-y-2 hover:scale-110 transition-transform"
            >
              <s.icon size={36} style={{ color: s.color }} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="ubicacion" className="py-20 px-4 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <MapPin className="text-primary" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary">¿Dónde estamos?</h2>
        </div>
        <p className="text-muted-foreground mb-8">Encuéntranos en la sucursal Lavandería Esponjafeliz.</p>
        <div className="rounded-3xl overflow-hidden shadow-bubble border-4 border-secondary">
          <iframe
            title="Ubicación Lavandería Esponjafeliz"
            src="https://www.google.com/maps?q=Lavander%C3%ADa+Esponjafeliz&ll=14.5350403,-90.5489046&z=19&output=embed"
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <a
          href="https://maps.app.goo.gl/o2JzxHxYJc4w1FEY9"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-primary font-bold hover:underline"
        >
          <MapPin size={18} /> Abrir en Google Maps
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 px-4 bg-primary text-primary-foreground text-center">
      <p className="font-extrabold text-lg">Lavandería Esponja Feliz 🧽</p>
      <p className="text-sm opacity-80 mt-2">¡Lava con alegría! · Villa Nueva, Guatemala</p>
    </footer>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <Hero />
      <SearchSection />
      <MissionVision />
      <Pricing />
      <Contact />
      <Location />
      <Footer />
    </div>
  );
}

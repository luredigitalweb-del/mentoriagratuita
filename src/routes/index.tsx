import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Video,
  Target,
  Workflow,
  Sparkles,
  Radio,
  CheckCircle2,
  ArrowRight,
  Users,
  TrendingUp,
  Settings,
  MapPin,
  Megaphone,
  Star,
} from "lucide-react";
import logoAsset from "@/assets/lure-logo.png";
import teamAsset from "@/assets/lure-team.png";
import eventoLureAsset from "@/assets/evento-lure.jpg";
import { useInView } from "@/hooks/useInView";
import { Reveal } from "@/components/Reveal";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lure Digital — Mentoria Gratuita para Donos de Agência" },
      {
        name: "description",
        content:
          "Toda terça às 12h, ao vivo: construa uma agência que entrega R$ 100.000 de lucro/mês com proposta, processo, posicionamento e canais.",
      },
      { property: "og:title", content: "Lure Digital — Mentoria Gratuita" },
      {
        property: "og:description",
        content:
          "Mentoria ao vivo toda terça às 12h para donos de agência. Sem replay.",
      },
      { property: "og:image", content: teamAsset },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: teamAsset },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  component: LandingPage,
});

// Open the WhatsApp group directly — no intermediate page, so the button is instant.
const WHATSAPP_URL = "https://chat.whatsapp.com/EtrlMyrfJU90MjnPROlui1";

// Fire the Meta Pixel Lead event the moment the user clicks a CTA.
function trackLead() {
  if (typeof window !== "undefined") {
    (window as { fbq?: (...args: unknown[]) => void }).fbq?.("track", "Lead");
  }
}

function Countdown() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const target = new Date(now);
      const day = now.getDay();
      let diff = (2 - day + 7) % 7;
      target.setDate(now.getDate() + diff);
      target.setHours(12, 0, 0, 0);
      if (target.getTime() <= now.getTime()) target.setDate(target.getDate() + 7);
      const ms = target.getTime() - now.getTime();
      const d = Math.floor(ms / 86400000);
      const h = Math.floor((ms % 86400000) / 3600000);
      const m = Math.floor((ms % 3600000) / 60000);
      const s = Math.floor((ms % 60000) / 1000);
      setTime({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { label: "Dias", value: time.d },
    { label: "Horas", value: time.h },
    { label: "Min", value: time.m },
    { label: "Seg", value: time.s },
  ];

  return (
    <div className="flex gap-2 sm:gap-4">
      {items.map((it) => (
        <div
          key={it.label}
          className="flex flex-col items-center justify-center min-w-[60px] sm:min-w-20 rounded-xl border border-border bg-card px-2 sm:px-3 py-2.5 sm:py-3"
        >
          <span className="font-display text-xl sm:text-3xl text-gold tabular-nums">
            {String(it.value).padStart(2, "0")}
          </span>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground mt-1">
            {it.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function PillarCard({
  icon: Icon,
  num,
  title,
  body,
}: {
  icon: typeof Target;
  num: string;
  title: string;
  body: string;
}) {
  return (
    <div className="group relative flex flex-col items-center text-center rounded-2xl bg-gradient-to-b from-[#131d2e] to-[#0e1521] border border-gold/10 p-6 sm:p-10 pt-12 transition-all duration-500 hover:-translate-y-3 hover:border-gold/40 hover:shadow-[0_0_60px_rgba(212,175,55,0.12)]">
      {/* Number watermark */}
      <span className="absolute top-2 right-4 sm:right-5 font-display text-5xl sm:text-6xl md:text-7xl font-black leading-none text-white/[0.04] select-none group-hover:text-gold/[0.08] transition-colors duration-500">
        {num}
      </span>

      {/* Icon circle */}
      <div className="relative -mt-16 sm:-mt-20 mb-5 sm:mb-6">
        <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gold text-navy shadow-[0_0_40px_rgba(212,175,55,0.45)] group-hover:shadow-[0_0_60px_rgba(212,175,55,0.7)] group-hover:scale-110 transition-all duration-500 ring-[6px] ring-[#0A1628]">
          <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.5} />
        </div>
      </div>

      <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-gold mb-3 sm:mb-4">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-sm">
        {body}
      </p>
    </div>
  );
}

function ExclusiveContentSection() {
  const { ref, isInView } = useInView<HTMLElement>(0.2);

  return (
    <section
      ref={ref}
      className="relative px-5 sm:px-6 md:px-12 py-16 sm:py-20 md:py-24 bg-navy overflow-hidden"
    >
      {/* Corner sparkles */}
      <Sparkles
        aria-hidden
        className="absolute top-10 left-[8%] h-5 w-5 text-gold/30 animate-pulse"
        style={{ animationDuration: "3s" }}
      />
      <Sparkles
        aria-hidden
        className="absolute bottom-10 right-[8%] h-5 w-5 text-gold/25 animate-pulse"
        style={{ animationDuration: "4s", animationDelay: "0.5s" }}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full border border-gold/40 transition-all duration-700 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Sparkles className="h-3.5 w-3.5 text-gold" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gold font-semibold">
            Conteúdo exclusivo
          </span>
        </div>

        {/* Headline */}
        <h2
          className={`font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.2] sm:leading-[1.15] text-white font-bold transition-all duration-700 ease-out delay-150 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Aulas{" "}
          <span className="text-gold italic">técnicas</span>{" "}
          com conteúdos que você só encontraria em{" "}
          <span className="relative inline-block italic">
            mentorias pagas
            <svg
              aria-hidden
              viewBox="0 0 300 12"
              preserveAspectRatio="none"
              className="absolute left-0 -bottom-2 w-full h-2.5 text-gold"
            >
              <path
                d="M2 8 Q 75 1, 150 6 T 298 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className={`${isInView ? "animate-draw-line" : ""}`}
                style={{
                  strokeDasharray: 320,
                  strokeDashoffset: isInView ? 0 : 320,
                  transition: "stroke-dashoffset 1.6s ease-out 0.6s",
                }}
              />
            </svg>
          </span>
          .
        </h2>

        {/* Divider */}
        <div
          className={`mx-auto mt-8 h-px w-20 bg-gradient-to-r from-transparent via-gold/50 to-transparent transition-all duration-700 ease-out delay-300 ${
            isInView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-75"
          }`}
        />

        {/* Tags */}
        <div
          className={`mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-sm text-white/70 transition-all duration-700 ease-out delay-500 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {["Toda semana", "De graça", "Ao vivo", "Sem replay"].map((item, i) => (
            <span key={item} className="flex items-center gap-3">
              <span className="font-medium text-white/80">{item}</span>
              {i < 3 && <span className="h-1 w-1 rounded-full bg-gold/60" />}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-navy">
      {/* HERO — full-bleed image with dark overlay, text left, card bottom-right (desktop) / centered over banner (mobile) */}
      <section className="relative md:min-h-screen bg-navy">
        {/* Desktop background image full */}
        <div className="hidden md:block absolute inset-0">
          <img
            src={teamAsset}
            alt="Equipe Lure Digital"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Dark gradient overlay left → right */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #0A1628 0%, #0A1628cc 35%, #0A162899 55%, transparent 80%)",
            }}
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Mobile banner image with top-centered text overlay */}
        <div className="md:hidden relative min-h-screen">
          <img
            src={eventoLureAsset}
            alt="Evento Lure Digital — Mentoria ao vivo"
            className="absolute inset-0 w-full h-full object-cover object-top brightness-110"
          />
          {/* Dark scrim — dark at the top for the text, fading so the people stay visible below */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 28%, rgba(0,0,0,0.35) 48%, rgba(0,0,0,0.08) 62%, rgba(0,0,0,0) 72%)",
            }}
          />
          {/* Radial focus behind the headline so the text pops */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(110% 45% at 50% 22%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 45%, transparent 70%)",
            }}
          />

          {/* Mobile content: text centered vertically, CTA pinned to bottom */}
          <div className="relative z-10 flex min-h-screen w-full flex-col items-center px-5 pt-16 pb-24 max-w-sm mx-auto">
            {/* Text group near the top */}
            <div className="flex w-full flex-col items-center justify-start text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-gold/40 rounded-full text-[9px] uppercase tracking-[0.18em] text-gold font-bold mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
              <span className="leading-tight">Donos de agência e assessorias de marketing</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-white text-[1.75rem] font-extrabold leading-[1.1] tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
              Toda Terça-feira às 12:00{" "}
              <span className="shimmer-text">mentoria gratuita</span>{" "}
              no Meet para te ajudar a construir uma agência que faça pelo menos{" "}
              <span className="shimmer-text">R$ 100.000</span>{" "}
              de lucro no bolso por mês focando em apenas 4 pilares
            </h1>

            {/* Schedule */}
            <div className="mt-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
              <span className="text-white font-medium text-[11px] drop-shadow-[0_1px_5px_rgba(0,0,0,0.95)]">
                Próxima aula: Terça-feira • 12h — Ao vivo via Google Meet
              </span>
            </div>

            </div>

            {/* CTA pinned to bottom */}
            <div className="mt-6 w-full">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackLead}
                className="cta-pulse group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden px-6 py-4 bg-gold text-navy font-bold text-base rounded-xl transition-transform duration-300 active:scale-95"
              >
                {/* Auto shine sweep */}
                <span className="cta-shine pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-white/40 blur-[3px]" />
                <span className="relative flex items-center gap-2">
                  ENTRAR NO GRUPO
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    strokeWidth={2.5}
                  />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Desktop content */}
        <div className="hidden md:flex relative z-10 flex-col justify-center min-h-screen px-5 sm:pl-10 md:pl-20 lg:pl-32 sm:pr-12 py-16">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-gold/40 rounded-full text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-gold font-bold mb-6 max-w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
              <span className="leading-tight">Donos de agência e assessorias de marketing</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-white text-[1.65rem] sm:text-[2.2rem] md:text-[3rem] lg:text-[3.5rem] font-bold leading-[1.15] sm:leading-[1.1] tracking-tight">
              Toda Terça-feira às 12:00{" "}
              <span className="shimmer-text">mentoria gratuita</span>{" "}
              no Meet para te ajudar a construir uma agência que faça pelo menos{" "}
              <span className="shimmer-text">R$ 100.000</span>{" "}
              de lucro no bolso por mês focando em apenas 4 pilares:
            </h1>

            {/* 4 Pilares row */}
            <div className="mt-8 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-3">
              {[
                { icon: Target, label: "Proposta" },
                { icon: Settings, label: "Processo" },
                { icon: MapPin, label: "Posicionamento" },
                { icon: Megaphone, label: "Canais" },
              ].map(({ icon: Icon, label }, i) => (
                <div key={label} className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold border border-gold/30">
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </div>
                  <span className="text-white font-semibold text-xs sm:text-sm tracking-wide truncate">
                    {label}
                  </span>
                  {i < 3 && (
                    <span className="hidden sm:inline-block h-4 w-px bg-white/20 ml-3" />
                  )}
                </div>
              ))}
            </div>

            {/* Schedule */}
            <div className="mt-8 flex items-start sm:items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-gold mt-1.5 sm:mt-0 shrink-0" />
              <span className="text-white/70 text-xs sm:text-sm">
                Próxima aula: Terça-feira • 12h — Ao vivo via Google Meet
              </span>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackLead}
                className="cta-pulse group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 overflow-hidden px-6 sm:px-8 py-4 bg-gold text-navy font-bold text-sm rounded-lg transition-transform duration-300 active:scale-95"
              >
                <span className="cta-shine pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-white/40 blur-[3px]" />
                <span className="relative flex items-center gap-3">
                  ENTRAR NO GRUPO
                  <ArrowRight
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    strokeWidth={2.5}
                  />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <section className="relative z-20 overflow-hidden py-3">
        {/* Top strip — gold, text navy, left scroll */}
        <div
          className="relative py-2.5 -rotate-2 -mx-4"
          style={{ background: "var(--gold)" }}
        >
          <div className="flex whitespace-nowrap animate-marquee-scroll" style={{ animation: "marquee-scroll 20s linear infinite" }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="inline-flex items-center gap-6 mx-6 text-navy font-display font-bold text-sm uppercase tracking-[0.15em]">
                100k de lucro por mês
                <span className="w-1.5 h-1.5 rounded-full bg-navy/60" />
              </span>
            ))}
          </div>
        </div>

        {/* Middle strip — navy, text gold, right scroll */}
        <div
          className="relative py-2.5 rotate-1 -mx-4 -mt-1.5"
          style={{ background: "#0F1E36", borderTop: "1px solid #1E3A5F", borderBottom: "1px solid #1E3A5F" }}
        >
          <div className="flex whitespace-nowrap" style={{ animation: "marquee-scroll-reverse 25s linear infinite" }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="inline-flex items-center gap-6 mx-6 text-gold font-display font-bold text-sm uppercase tracking-[0.15em]">
                100k de lucro por mês
                <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
              </span>
            ))}
          </div>
        </div>
      </section>




      {/* PILLARS */}
      <section className="relative px-5 sm:px-6 md:px-12 pt-28 sm:pt-36 md:pt-44 pb-20 sm:pb-24 md:pb-32 overflow-hidden">
        {/* Subtle background glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 h-[600px] w-[900px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(212,175,55,0.25), transparent 70%)" }}
        />

        <div className="relative mx-auto max-w-5xl">
          <Reveal className="mb-14 sm:mb-20 text-center">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold font-semibold">
              Os 4 pilares
            </span>
            <h2 className="mt-3 sm:mt-4 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground font-bold">
              O que você vai dominar
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-8">
            <Reveal delay={0}>
              <PillarCard
                icon={Target}
                num="01"
                title="Proposta"
                body="A oferta que nos faz vender em TCV contratos de R$ 9.900 a R$ 29.000 com pagamento à vista."
              />
            </Reveal>
            <Reveal delay={120}>
              <PillarCard
                icon={Workflow}
                num="02"
                title="Processo"
                body="Os processos que nos fazem atender +300 clientes ativos sem pirar a cabeça, com um time enxuto que entrega lucro."
              />
            </Reveal>
            <Reveal delay={240}>
              <PillarCard
                icon={Sparkles}
                num="03"
                title="Posicionamento"
                body="Construa uma marca magnética que mesmo sendo a mais cara vai ser a que mais vende."
              />
            </Reveal>
            <Reveal delay={360}>
              <PillarCard
                icon={Radio}
                num="04"
                title="Canais"
                body="Os exatos canais de distribuição que sempre nos fazem gerar demanda suficiente para batermos nossas metas."
              />
            </Reveal>
          </div>

          <Reveal delay={200} className="mt-12 sm:mt-16 flex justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackLead}
              className="cta-pulse group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 overflow-hidden px-6 sm:px-10 py-4 bg-gold text-navy font-bold text-xs sm:text-sm rounded-lg transition-transform duration-300 active:scale-95"
            >
              <span className="cta-shine pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-white/40 blur-[3px]" />
              <span className="relative flex items-center gap-3">
                QUERO DOMINAR OS 4 PILARES
                <ArrowRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </span>
            </a>
          </Reveal>
        </div>
      </section>



      {/* FINAL CTA */}
      <section id="grupo" className="relative px-5 sm:px-6 md:px-12 py-20 sm:py-24 md:py-32 overflow-hidden">
        {/* Background glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[1000px] rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(212,175,55,0.35), transparent 70%)" }}
        />

        <Reveal className="mx-auto max-w-4xl relative">
          <div className="relative overflow-hidden rounded-3xl sm:rounded-[2rem] border border-gold/20 bg-gradient-to-b from-[#111d2e] to-[#0b1320] p-6 sm:p-10 md:p-16 text-center shadow-[0_0_80px_rgba(212,175,55,0.08)]">
            {/* Subtle top line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

            {/* Logo */}
            <Reveal delay={100} className="mb-6 sm:mb-8">
              <img
                src={logoAsset}
                alt="Lure Digital"
                className="h-12 sm:h-14 md:h-16 mx-auto opacity-90"
              />
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-gold font-semibold mb-3 sm:mb-4">Terça-feira • 12h</p>
              <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.15] sm:leading-[1.1] font-bold">
                Sua próxima decisão pode valer{" "}
                <span className="text-gold">100 mil por mês.</span>
              </h2>
            </Reveal>
            <Reveal delay={350}>
              <p className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Entre no grupo, receba o link da próxima aula e comece a construir a agência que você
                merece ter.
              </p>
            </Reveal>

            <Reveal delay={500} className="mt-8 sm:mt-10 flex flex-col items-center gap-6 sm:gap-8">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackLead}
                className="cta-pulse group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 overflow-hidden rounded-full px-6 sm:px-12 py-4 sm:py-5 bg-gold text-navy font-bold text-sm sm:text-base transition-transform duration-300 active:scale-95"
              >
                <span className="cta-shine pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-white/40 blur-[3px]" />
                <span className="relative flex items-center gap-3">
                  Entrar no grupo agora
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                </span>
              </a>
              <Countdown />
              <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider px-2">
                Aulas ao vivo • Sem replay • Vagas limitadas por sala do Meet
              </p>
            </Reveal>
          </div>
        </Reveal>
      </section>

      <ExclusiveContentSection />

      {/* FOOTER */}
      <footer className="relative px-5 sm:px-6 md:px-12 py-8 sm:py-10 border-t border-border">
        <Reveal className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <img src={logoAsset} alt="Lure Digital" className="h-8 sm:h-10 w-auto" />
            <span className="text-xs sm:text-sm text-muted-foreground">
              © {new Date().getFullYear()} Lure Digital. Todos os direitos reservados.
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Mentoria gratuita para donos de agência e assessoria.
          </p>
        </Reveal>
      </footer>
    </div>
  );
}

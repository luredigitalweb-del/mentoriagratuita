import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, MessageCircle } from "lucide-react";
import logoAsset from "@/assets/lure-logo.png";

export const Route = createFileRoute("/grupo")({
  head: () => ({
    meta: [
      { title: "Redirecionando — Lure Digital" },
      {
        name: "description",
        content: "Você está sendo encaminhado para o grupo exclusivo do WhatsApp.",
      },
    ],
  }),
  component: GrupoPage,
});

const WHATSAPP_URL = "https://chat.whatsapp.com/EtrlMyrfJU90MjnPROlui1";

function GrupoPage() {
  const [seconds, setSeconds] = useState(5);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const total = 5;
    const timer = setInterval(() => {
      setSeconds((prev) => {
        const next = prev <= 1 ? 0 : prev - 1;
        setProgress(((total - next) / total) * 100);
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = WHATSAPP_URL;
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] flex items-center justify-center px-5">
      {/* Atmospheric Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-gold/10 rounded-full"
          style={{ filter: "blur(120px)" }}
        />
        <div
          className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-gold/5 rounded-full"
          style={{ filter: "blur(120px)" }}
        />
      </div>

      <div className="relative w-full max-w-lg">
        {/* Subtle glow behind card */}
        <div
          className="absolute -inset-1 rounded-[2rem] opacity-50"
          style={{
            background:
              "linear-gradient(to bottom, rgba(212,175,55,0.2), transparent)",
            filter: "blur(24px)",
          }}
        />

        <div className="relative bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-10 md:p-14 text-center shadow-2xl overflow-hidden">
          {/* Top Accent Line */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, #D4AF37, transparent)",
            }}
          />

          {/* Logo */}
          <img
            src={logoAsset}
            alt="Lure Digital"
            className="h-10 sm:h-12 mx-auto opacity-90 mb-6"
          />

          {/* Badge */}
          <div className="mb-8 flex flex-col items-center gap-3">
            <span className="px-3 py-1 text-[10px] uppercase tracking-[0.3em] font-bold text-gold border border-gold/30 rounded-full bg-gold/5">
              Acesso Exclusivo
            </span>
            <h1 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Seu convite está <br />
              <span className="text-gold">sendo validado...</span>
            </h1>
          </div>

          {/* Visual Countdown/Redirect Indicator */}
          <div className="relative w-32 h-32 mx-auto mb-10 flex items-center justify-center">
            {/* Animated Ring */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                className="text-white/5"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="3"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                className="text-gold transition-all duration-1000 ease-linear"
              />
            </svg>
            {/* Icon */}
            <div className="relative flex items-center justify-center">
              <MessageCircle
                className="h-10 w-10 text-white"
                strokeWidth={1.5}
              />
            </div>
          </div>

          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-10 max-w-[280px] mx-auto">
            Você está sendo redirecionado para o grupo oficial da mentoria.
          </p>

          {/* Action Button */}
          <a
            href={WHATSAPP_URL}
            className="group relative inline-flex items-center justify-center w-full py-5 px-8 font-bold text-navy bg-gold rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-95"
          >
            {/* Shine effect */}
            <div
              className="absolute inset-0 w-1/3 h-full bg-white/20 -skew-x-[25deg] -translate-x-[150%] group-hover:translate-x-[400%] transition-transform duration-700 ease-in-out"
            />
            <span className="relative flex items-center gap-2 tracking-wide uppercase text-sm">
              Entrar Agora
              <ArrowLeft
                className="h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1"
                strokeWidth={2.5}
              />
            </span>
          </a>

          {/* Progress Bar (Subtle) */}
          <div className="mt-10 pt-8 border-t border-white/5">
            <div className="flex justify-between items-center text-[10px] text-muted-foreground uppercase tracking-widest mb-2">
              <span>Sincronizando</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold/50 transition-all duration-1000 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 text-[10px] text-muted-foreground uppercase tracking-widest">
              Redirecionando em {seconds}s
            </div>
          </div>
        </div>

        {/* Brand Watermark */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground/50 text-[10px] uppercase tracking-[0.4em] font-medium">
            Mentoria High Ticket Exclusive
          </p>
        </div>

        {/* Back link */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}

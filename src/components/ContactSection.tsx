"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/content/site";
import { useLanguage } from "@/context/LanguageContext";
import { StaggerChildren, StaggerItem } from "./AnimatedSection";
import { IconInstagram } from "./SocialIcons";
import SectionJump from "./SectionJump";

// El realce va por CSS y no por `whileHover`: en un contenedor, framer añade
// `tabindex="0"` y deja una parada de tabulación que no hace nada.
const cardClass =
  "group flex items-stretch rounded-2xl border border-white/20 bg-white/5 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-white/10 hover:border-white/30 active:scale-[0.98]";

const EmailIcon = () => (
  <svg className="w-8 h-8 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
);

const CopyIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h10" strokeLinecap="round" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden>
    <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * En escritorio mucha gente no tiene cliente de correo y el `mailto:` no hace
 * nada visible; de ahí la copia. Enlace y botón son hermanos: es la única forma
 * válida de meter dos acciones en una caja.
 */
function EmailCard({ email }: { email: string }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Sin permiso de portapapeles queda el mailto y el email a la vista.
    }
  };

  return (
    <div className={cardClass}>
      <a href={`mailto:${email}`} className="flex min-w-0 flex-1 items-center gap-4 p-5">
        <span className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/10 group-hover:bg-white/15 text-white transition-colors shrink-0">
          <EmailIcon />
        </span>
        <span className="min-w-0">
          <span className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-0.5">
            {t.contactEmailButton}
          </span>
          <span className="block text-white font-medium truncate">{email}</span>
        </span>
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={t.contactCopyEmail}
        className="flex shrink-0 items-center justify-center gap-2 border-l border-white/15 px-4 text-neutral-400 transition-colors hover:text-white"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        <span className="text-xs font-medium" aria-live="polite">
          {copied ? t.contactCopied : ""}
        </span>
      </button>
    </div>
  );
}

export default function ContactSection() {
  const { t } = useLanguage();
  const { email, socials } = siteConfig;
  const instagramHandle = new URL(socials.instagram).pathname.replace(/\//g, "");

  return (
    <section className="px-6 max-w-3xl mx-auto py-8 md:py-20">
      <StaggerChildren className="space-y-0" staggerDelay={0.08}>
        <StaggerItem>
          <h2 className="text-2xl font-semibold mb-2">{t.contactTitle}</h2>
          <p className="text-neutral-400 text-sm mb-8">
            {t.contactSubline} · {t.contactBased}
          </p>
        </StaggerItem>
        <StaggerItem>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <EmailCard email={email} />
            <a
              href={socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={`${cardClass} items-center gap-4 p-5`}
            >
              <span className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-rose-600/20 group-hover:from-amber-500/30 group-hover:to-rose-600/30 text-white transition-all shrink-0">
                <IconInstagram className="w-8 h-8 shrink-0" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-0.5">
                  {t.contactInstagram}
                </span>
                <span className="block text-white font-medium">@{instagramHandle}</span>
              </span>
            </a>
          </div>
        </StaggerItem>
      </StaggerChildren>

      <SectionJump />
    </section>
  );
}

"use client";

import { siteConfig } from "@/content/site";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { StaggerChildren, StaggerItem } from "./AnimatedSection";
import { IconInstagram } from "./SocialIcons";

const EmailIcon = () => (
  <svg className="w-8 h-8 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
);

export default function ContactSection() {
  const { t } = useLanguage();
  const { email, socials } = siteConfig;
  const instagramHandle = new URL(socials.instagram).pathname.replace(/\//g, "");

  return (
    <section className="px-6 max-w-3xl mx-auto py-8 md:py-20">
      <StaggerChildren className="space-y-0" staggerDelay={0.08}>
        <StaggerItem>
          <h2 className="text-2xl font-semibold mb-2">{t.contactTitle}</h2>
          <p className="text-neutral-500 text-sm mb-8">{t.contactSubline}</p>
        </StaggerItem>
        <StaggerItem>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.a
              href={`mailto:${email}`}
              className="group flex items-center gap-4 p-5 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-200"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/10 group-hover:bg-white/15 text-white transition-colors">
                <EmailIcon />
              </span>
              <div className="min-w-0">
                <span className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-0.5">{t.contactEmailButton}</span>
                <span className="block text-white font-medium truncate">{email}</span>
              </div>
            </motion.a>
            <motion.a
              href={socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-200"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-rose-600/20 group-hover:from-amber-500/30 group-hover:to-rose-600/30 text-white transition-all">
                <IconInstagram className="w-8 h-8 shrink-0" />
              </span>
              <div className="min-w-0">
                <span className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-0.5">{t.contactInstagram}</span>
                <span className="block text-white font-medium">@{instagramHandle}</span>
              </div>
            </motion.a>
          </div>
        </StaggerItem>
      </StaggerChildren>
    </section>
  );
}

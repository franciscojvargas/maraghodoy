"use client";

import { siteConfig } from "@/lib/site";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { StaggerChildren, StaggerItem } from "./AnimatedSection";

const EmailIcon = () => (
  <svg className="w-8 h-8 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-8 h-8 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 0 1 1.772 1.153 4.902 4.902 0 0 1 1.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 0 1-1.153 1.772 4.902 4.902 0 0 1-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 0 1-1.772-1.153 4.902 4.902 0 0 1-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 0 1 1.153-1.772A4.902 4.902 0 0 1 5.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63Zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058ZM12 6.865a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27Zm0 1.802a3.333 3.333 0 1 0 0 6.666 3.333 3.333 0 0 0 0-6.666Zm5.338-3.205a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" clipRule="evenodd" />
  </svg>
);

export default function ContactForm() {
  const { t } = useLanguage();
  const { email, socials } = siteConfig;

  return (
    <section id="contact" className="px-6 max-w-3xl mx-auto py-20">
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
                <InstagramIcon />
              </span>
              <div className="min-w-0">
                <span className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-0.5">{t.contactInstagram}</span>
                <span className="block text-white font-medium">@{new URL(socials.instagram).pathname.replace(/\//g, "")}</span>
              </div>
            </motion.a>
          </div>
        </StaggerItem>
      </StaggerChildren>
    </section>
  );
}

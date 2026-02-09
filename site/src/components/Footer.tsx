"use client";

import { siteConfig } from "@/lib/site";
import { FadeIn } from "./AnimatedSection";
import { IconSoundCloud, IconInstagram, IconYouTube } from "./SocialIcons";

const socialLinks = [
  { href: siteConfig.socials.soundcloud, label: "SoundCloud", Icon: IconSoundCloud, iconClass: "text-[#ff5500] hover:text-[#ff7733]" },
  { href: siteConfig.socials.instagram, label: "Instagram", Icon: IconInstagram },
  { href: siteConfig.socials.youtube, label: "YouTube", Icon: IconYouTube, iconClass: "text-[#ff0000] hover:text-[#ff3333]" },
];

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-neutral-800">
      <FadeIn>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <nav className="flex items-center gap-6" aria-label="Redes sociales">
            {socialLinks.map(({ href, label, Icon, iconClass }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-neutral-400 hover:text-white transition ${iconClass ?? ""}`}
                aria-label={label}
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </nav>
        </div>
      </FadeIn>
    </footer>
  );
}

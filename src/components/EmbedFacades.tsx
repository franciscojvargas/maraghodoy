"use client";

import { useState } from "react";
import Image from "next/image";
import { IconSoundCloud } from "./SocialIcons";


function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M8 5.14v13.72c0 .8.87 1.3 1.56.88l10.5-6.86a1.05 1.05 0 0 0 0-1.76L9.56 4.26A1.04 1.04 0 0 0 8 5.14z" />
    </svg>
  );
}

export function YouTubeFacade({ id, title }: { id: string; title: string }) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title={title}
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="group/facade relative block w-full h-full text-left focus:outline-none focus:ring-2 focus:ring-white/50"
      aria-label={`Play: ${title}`}
    >
      <Image
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt={title}
        fill
        unoptimized
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <span className="absolute inset-0 bg-black/30 transition group-hover/facade:bg-black/15" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex items-center justify-center w-16 h-11 rounded-xl bg-[#ff0000] text-white shadow-lg transition-transform group-hover/facade:scale-110">
          <PlayIcon className="w-7 h-7" />
        </span>
      </span>
    </button>
  );
}

export function SoundCloudFacade({ url, title }: { url: string; title: string }) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title={title}
        width="100%"
        height="166"
        allow="autoplay"
        referrerPolicy="strict-origin-when-cross-origin"
        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff5500&inverse=false&auto_play=true&show_user=true`}
        className="border-0"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="group/facade flex h-[166px] w-full items-center gap-5 px-6 text-left bg-gradient-to-br from-neutral-900 to-neutral-950 hover:from-neutral-800/90 hover:to-neutral-900 transition focus:outline-none focus:ring-2 focus:ring-white/50"
      aria-label={`Play: ${title}`}
    >
      <span className="flex items-center justify-center w-14 h-14 rounded-full bg-[#ff5500] text-white shadow-lg shrink-0 transition-transform group-hover/facade:scale-110">
        <PlayIcon className="w-7 h-7" />
      </span>
      <span className="min-w-0">
        <span className="block text-white font-medium truncate">{title}</span>
        <span className="mt-1 flex items-center gap-1.5 text-sm text-neutral-400">
          <IconSoundCloud className="w-4 h-4 text-[#ff5500]" />
          SoundCloud
        </span>
      </span>
    </button>
  );
}

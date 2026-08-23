import { siteConfig, PERSON_ID } from "./site";

export type EventItem = {
  id: string;
  /** ISO con offset explícito: "2026-03-14T23:30:00+01:00". */
  date: string;
  endDate?: string;
  venue: string;
  city: string;
  /** ISO-3166 alpha-2, para el JSON-LD. */
  country: string;
  /**
   * Zona del bolo, para que la fecha se pinte como en el cartel. Por defecto
   * Europe/Madrid; sólo hace falta fuera de España.
   */
  timeZone?: string;
  /** Slug del cartel en carteles/, sin ruta ni extensión. */
  poster?: string;
  /** Nombre de la fiesta, promotora o contexto. No artistas. */
  note?: string;
  /**
   * Resto del cartel, sin Mara. Se pinta en la ficha y va como `performer` en el
   * JSON-LD: es lo que asocia cada artista con ella a ojos de Google.
   */
  lineup?: readonly string[];
};

const POSTER_BASE = "/images/events";

export const posterThumb = (slug: string) => `${POSTER_BASE}/${slug}-thumb.webp`;
export const posterFull = (slug: string) => `${POSTER_BASE}/${slug}.webp`;

/**
 * El orden aquí da igual: `orderedEvents` los ordena por fecha. Para añadir un
 * bolo, pegar un bloque; los que ya pasaron no se tocan.
 */
export const events: readonly EventItem[] = [
  {
    id: "2024-02-23-true-isabela-clerc",
    date: "2024-02-23T23:00:00+01:00",
    venue: "True Club",
    city: "Torremolinos",
    country: "ES",
    poster: "2024-02-23-true-isabela-clerc",
    lineup: ["Isabela Clerc", "DPUMP", "MNX", "OVO", "PÜCH"],
  },
  {
    id: "2024-03-23-true-okaro",
    date: "2024-03-23T23:30:00+01:00",
    venue: "True Club",
    city: "Torremolinos",
    country: "ES",
    poster: "2024-03-23-true-okaro",
    note: "Warm up",
    lineup: ["Okaro", "OVO", "MNX"],
  },
  {
    id: "2024-04-26-true-abstract",
    date: "2024-04-26T23:00:00+02:00",
    venue: "True Club",
    city: "Torremolinos",
    country: "ES",
    poster: "2024-04-26-true-abstract",
    note: "Abstract",
    lineup: ["Rian Wood", "GNRØ", "Clavero GNS", "N2MU"],
  },
  {
    id: "2024-06-29-adn-sound-festival",
    date: "2024-06-29T18:00:00+02:00",
    endDate: "2024-06-30T06:00:00+02:00",
    venue: "ADN Sound Festival",
    city: "Béjar",
    country: "ES",
    poster: "2024-06-29-adn-sound-festival",
    note: "Recinto Ferial · 2 escenarios",
    lineup: ["Aida Blanco", "Alex Vigo", "Dan Vaxx", "Daniella Da Silva", "David Mallada", "Essan", "Iban Zero", "Javi Bici Jr", "KATNP", "Candy Cox", "Joanna Coelho", "Rhynagüer", "Sara Krin", "Valentina Izumi", "Alekk", "Angel Valiente", "Alberto Molines", "Cristhian Baratta", "Fran P", "Pau", "PLVZA"],
  },
  {
    id: "2024-10-31-paris15-halloween",
    date: "2024-10-31T23:00:00+01:00",
    venue: "Paris15",
    city: "Málaga",
    country: "ES",
    poster: "2024-10-31-paris15-halloween",
    note: "Abstract Halloween · Etika showcase",
    lineup: ["Afem Syko", "Aphøtic", "GNRØ", "Fhiga", "wae.wav"],
  },
  {
    id: "2025-01-18-basshaus-korner2korner",
    date: "2025-01-18T23:59:00+01:00",
    endDate: "2025-01-19T06:00:00+01:00",
    venue: "Basshaus",
    city: "Barcelona",
    country: "ES",
    poster: "2025-01-18-basshaus-korner2korner",
    note: "Korner 2 Korner · b2b wae.wav",
    lineup: ["Gaston Zani", "DXPE", "SBA", "Ozzwald", "wae.wav", "Nahum Korm", "Cronekia"],
  },
  {
    id: "2025-03-29-cosmos-no-sleep",
    date: "2025-03-29T23:30:00+01:00",
    venue: "Cosmos Club",
    city: "Sevilla",
    country: "ES",
    poster: "2025-03-29-cosmos-no-sleep",
    note: "No Sleep",
    lineup: ["Barbara Lago", "Dygø", "Danza Macabra"],
  },
  {
    id: "2025-06-13-cosmos-no-sleep-closing",
    date: "2025-06-13T23:30:00+02:00",
    venue: "Cosmos Club",
    city: "Sevilla",
    country: "ES",
    poster: "2025-06-13-cosmos-no-sleep-closing",
    note: "No Sleep closing party",
    lineup: ["Essan", "Dygø", "KRX"],
  },
  {
    id: "2025-07-04-pandora-crvx",
    date: "2025-07-04T23:59:00+02:00",
    venue: "Sala Pandora",
    city: "Sevilla",
    country: "ES",
    poster: "2025-07-04-pandora-crvx",
    note: "CRVX",
    lineup: ["Charlie Sparks", "Lee Ann Roberts"],
  },
  {
    id: "2025-10-17-pandora-crvx",
    date: "2025-10-17T23:30:00+02:00",
    venue: "Sala Pandora",
    city: "Sevilla",
    country: "ES",
    poster: "2025-10-17-pandora-crvx",
    note: "CRVX",
    lineup: ["Dyen", "SNTS", "Isabela Clerc"],
  },
  {
    id: "2025-10-25-cosmos-helion",
    date: "2025-10-25T23:30:00+02:00",
    venue: "Cosmos Club",
    city: "Sevilla",
    country: "ES",
    poster: "2025-10-25-cosmos-helion",
    note: "Helion",
    lineup: ["Carmen Electro", "Danza Macabra", "Sandersweet"],
  },
  {
    id: "2025-11-08-electrolunch-xxl",
    date: "2025-11-08T11:00:00+01:00",
    endDate: "2025-11-08T23:00:00+01:00",
    venue: "Electrolunch XXL",
    city: "Sevilla",
    country: "ES",
    poster: "2025-11-08-electrolunch-xxl",
    note: "Parque Magallanes · junto a Torre Sevilla",
    lineup: ["Phran", "Álvaro Texture", "Jade Tansa", "Adex", "Ruido! DJs"],
  },
  {
    id: "2025-12-06-eu-lab-los-angeles",
    date: "2025-12-06T19:00:00-08:00",
    endDate: "2025-12-06T23:00:00-08:00",
    venue: "Los Ángeles",
    city: "Los Angeles",
    country: "US",
    timeZone: "America/Los_Angeles",
    poster: "2025-12-06-eu-lab-los-angeles",
    note: "Secret Warehouse · EU-LAB · US debut",
    lineup: ["Balaclava", "Casska", "Kemosabe"],
  },
  {
    id: "2026-01-01-pandora-diauno",
    date: "2026-01-01T23:00:00+01:00",
    endDate: "2026-01-02T11:00:00+01:00",
    venue: "Sala Pandora",
    city: "Sevilla",
    country: "ES",
    poster: "2026-01-01-pandora-diauno",
    note: "Diauno · 12 h",
    lineup: ["Mason Collective", "Raul Pacheco", "Álvaro Prieto", "Baffi", "Diego Lavida"],
  },
  {
    id: "2026-01-24-cosmos-helion",
    date: "2026-01-24T23:30:00+01:00",
    venue: "Cosmos Club",
    city: "Sevilla",
    country: "ES",
    poster: "2026-01-24-cosmos-helion",
    note: "Helion",
    lineup: ["Ruiz OSC1", "Duckman", "Lynde"],
  },
  {
    id: "2026-03-07-electrolunch-xxl",
    date: "2026-03-07T11:00:00+01:00",
    endDate: "2026-03-07T23:00:00+01:00",
    venue: "Electrolunch XXL",
    city: "Sevilla",
    country: "ES",
    poster: "2026-03-07-electrolunch-xxl",
    note: "Parque Magallanes · junto a Torre Sevilla",
    lineup: ["Kenny Larkin", "Nix", "Gala"],
  },
  {
    id: "2026-03-14-elysium-oscura",
    date: "2026-03-14T19:00:00+01:00",
    endDate: "2026-03-15T07:00:00+01:00",
    venue: "Elysium",
    city: "Sevilla",
    country: "ES",
    poster: "2026-03-14-elysium-oscura",
    note: "Oscura x Stigma Tribale · 12 h",
    lineup: ["Tensal", "Phil Berg", "Bastet", "Amarat", "Danza Macabra", "David Villalobos", "JJHZ3", "Mario Tishok", "Sekye"],
  },
  {
    id: "2026-05-08-pandora-rebels",
    date: "2026-05-08T23:59:00+02:00",
    venue: "Sala Pandora",
    city: "Sevilla",
    country: "ES",
    poster: "2026-05-08-pandora-rebels",
    note: "Rebels",
    lineup: ["999999999", "Barbara Lago"],
  },
  {
    id: "2026-05-15-interestelar-sevilla",
    date: "2026-05-15T18:00:00+02:00",
    endDate: "2026-05-16T04:00:00+02:00",
    venue: "Interestelar Sevilla",
    city: "Sevilla",
    country: "ES",
    poster: "2026-05-15-interestelar-sevilla",
    note: "Centro Andaluz de Arte Contemporáneo",
    lineup: ["Siloé", "Xoel López", "Dorian", "Pignoise", "Álvaro de Luna", "Samuraï", "Paula Mattheus", "Besmaya", "Karavana", "Isaac Corrales", "Oski", "La Rubia Pincha", "Random Vestax", "Undo Factor City"],
  },
  {
    id: "2026-05-29-cosmos-helion",
    date: "2026-05-29T23:30:00+02:00",
    venue: "Cosmos Club",
    city: "Sevilla",
    country: "ES",
    poster: "2026-05-29-cosmos-helion",
    note: "Helion",
    lineup: ["Elli Acula", "Sodomak", "Gøta"],
  },
  {
    id: "2026-07-04-pandora-hyperlink",
    date: "2026-07-04T23:00:00+02:00",
    endDate: "2026-07-05T11:00:00+02:00",
    venue: "Sala Pandora",
    city: "Sevilla",
    country: "ES",
    poster: "2026-07-04-pandora-hyperlink",
    note: "Hyperlink · Fantasm · 12 h",
    lineup: ["Dexphase", "Fhiga", "GNRØ", "Javi Gongora", "Krenon", "S.Ø.K.A.R.", "Sancer"],
  },
  {
    id: "2026-08-29-even-dygo",
    date: "2026-08-29T23:59:00+02:00",
    venue: "Sala Even",
    city: "Sevilla",
    country: "ES",
    poster: "2026-08-29-even-dygo",
    note: "All night long",
    lineup: ["Dygø"],
  },
  {
    id: "2026-09-12-matadero-luciid",
    date: "2026-09-12T23:59:00+02:00",
    venue: "Matadero",
    city: "Murcia",
    country: "ES",
    poster: "2026-09-12-matadero-luciid",
    lineup: ["Luciid", "Armero", "Fhiga", "Kevin Paviani", "Wild"],
  },
];

/**
 * Todos de la fecha más reciente a la más antigua, hayan pasado o no. Al ser un
 * orden absoluto no depende de la fecha actual: se calcula una vez en build y el
 * HTML nunca se queda desfasado.
 */
export const orderedEvents: readonly EventItem[] = [...events].sort(
  (a, b) => Date.parse(b.date) - Date.parse(a.date)
);

/** Un MusicEvent por evento, pasados incluidos: Google descarta solos los caducados. */
export function buildEventsJsonLd() {
  return events.map((event) => ({
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: `${siteConfig.name} · ${event.venue}`,
    startDate: event.date,
    ...(event.endDate ? { endDate: event.endDate } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.city,
        addressCountry: event.country,
      },
    },
    // Mara por referencia al nodo Person, y el resto del cartel como MusicGroup.
    // Es lo que le dice a Google que comparten evento.
    performer: [
      { "@id": PERSON_ID },
      ...(event.lineup ?? []).map((name) => ({ "@type": "MusicGroup", name })),
    ],
    ...(event.poster ? { image: `${siteConfig.url}${posterFull(event.poster)}` } : {}),
  }));
}

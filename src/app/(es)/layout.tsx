import RootDocument, { buildMetadata, baseViewport } from "../root-document";

export const metadata = buildMetadata("es");
export const viewport = baseViewport;

export default function EsLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="es">{children}</RootDocument>;
}

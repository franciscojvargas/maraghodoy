import RootDocument, { baseMetadata } from "../root-document";

export const metadata = baseMetadata;

export default function EsLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="es">{children}</RootDocument>;
}

import RootDocument, { buildMetadata, baseViewport } from "../root-document";

export const metadata = buildMetadata("en");
export const viewport = baseViewport;

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="en">{children}</RootDocument>;
}

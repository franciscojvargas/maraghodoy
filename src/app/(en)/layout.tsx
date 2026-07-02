import RootDocument, { baseMetadata } from "../root-document";

export const metadata = baseMetadata;

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="en">{children}</RootDocument>;
}

export default function SectionSkeleton() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-16" aria-busy="true">
      <div className="h-7 w-40 animate-pulse rounded bg-white/10" />
      <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="aspect-[3/4] animate-pulse rounded-lg bg-white/5 md:rounded-xl" />
        ))}
      </div>
    </section>
  );
}

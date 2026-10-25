export default function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-10 flex flex-col items-center gap-3 text-center">
      <span className="rounded-full border-2 border-ink px-4 py-0.5 text-sm tracking-[0.3em] text-ink-soft">
        {kicker}
      </span>
      <h2 className="font-sign text-4xl font-black tracking-widest text-ink sm:text-5xl">
        {title}
      </h2>
      <div className="flex items-center gap-2" aria-hidden>
        <span className="h-0.5 w-10 bg-retro-red" />
        <span className="h-2 w-2 rotate-45 bg-retro-red" />
        <span className="h-0.5 w-10 bg-retro-red" />
      </div>
    </div>
  );
}

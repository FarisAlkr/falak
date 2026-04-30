/**
 * Amber ribbon shown in dev mode when a slide draws on Arabic content that's
 * still flagged ⚑ (pending native-speaker review). Hidden in production builds
 * via NODE_ENV — at build time this component renders null in production.
 */
export function FlagRibbon() {
  if (process.env.NODE_ENV === 'production') return null;
  return (
    <div
      dir="ltr"
      className="border-warning/40 bg-warning/10 absolute bottom-5 left-5 flex items-center gap-2 rounded-sm border px-3 py-1.5 font-mono text-[10px] uppercase tracking-meta text-warning"
      title="Arabic content on this slide is flagged ⚑ — pending native-speaker review."
    >
      <span aria-hidden="true">⚑</span>
      <span>Arabic review pending</span>
    </div>
  );
}

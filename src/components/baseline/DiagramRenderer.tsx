import { getDiagram } from './DiagramRegistry';

interface DiagramRendererProps {
  /** The baseline ID (concept.id or example.id) used to look up the SVG. */
  id?: string;
  /** Falls back to rendering nothing if the registry has no entry for this ID
   *  and `placeholder` is not supplied. */
  placeholder?: React.ReactNode;
  /** Apply a card frame and centered layout. Default: true. */
  framed?: boolean;
  className?: string;
}

/**
 * Resolves a baseline ID to its SVG diagram via `DiagramRegistry` and renders
 * it inside the standard editorial frame. Returns `null` (or `placeholder`)
 * if no diagram is registered for the ID, so a slide that doesn't need a
 * figure simply omits this section.
 */
export function DiagramRenderer({
  id,
  placeholder,
  framed = true,
  className,
}: DiagramRendererProps) {
  const Component = getDiagram(id);
  if (!Component) {
    return placeholder ? <>{placeholder}</> : null;
  }
  if (!framed) return <Component />;
  return (
    <div
      className={
        className ?? 'bg-paper-raised/40 flex justify-center rounded-sm border border-border p-4'
      }
    >
      <Component />
    </div>
  );
}

import type { ReactNode } from 'react';

/* ═══════════════════════════════════════════════════════════════════════
 * Physics-diagram primitives + composed figures.
 *
 * Composition rules (apply to every diagram):
 *   1. Diagrams are composed against a generous viewBox — typically
 *      720 × 420 (16:10 at 1.5× the previous default). All drawn content
 *      lives inside a 24-unit margin from the viewBox edges so arrows
 *      and labels never touch the figure's outer rectangle.
 *   2. Primary labels are 17px in JetBrains Mono (referenced via the CSS
 *      `--font-mono` variable so they inherit the loaded font, not the
 *      browser's default Courier). Secondary labels are 14px. Captions
 *      living inside the SVG are 13px italic Fraunces.
 *   3. Arrowhead-to-label gap is at least 12 SVG units (the Arrow's
 *      `labelOffset` default is 16; raise per-call where text is large).
 *   4. No two labels overlap — when in doubt, push the second label
 *      further out and add a leader if necessary.
 *
 * Color tokens come from globals.css design tokens. Always reference the
 * CSS variable, never a literal hex value.
 * ═══════════════════════════════════════════════════════════════════════ */

const ACCENT = 'var(--accent)';
const INK = 'var(--ink)';
const INK_MUTED = 'var(--ink-muted)';
const INK_FAINT = 'var(--ink-faint)';
const INFO = 'var(--info)';
const WARNING = 'var(--warning)';
const SUCCESS = 'var(--success)';
const PAPER_RAISED = 'var(--paper-raised)';

/** Mono labels in SVG must use the CSS variable so they inherit JetBrains
 *  Mono. Plain `font-family="monospace"` falls back to Courier. */
const FONT_MONO = 'var(--font-mono), ui-monospace, monospace';
const FONT_DISPLAY = 'var(--font-display), Georgia, serif';

export const PHYSICS_COLORS = {
  weight: ACCENT,
  normal: INK,
  applied: INFO,
  friction: WARNING,
  tension: SUCCESS,
  net: ACCENT,
  ink: INK,
  inkMuted: INK_MUTED,
};

/* ═══════════════════════════════════════════════════════════════════════
 *  Primitives
 * ═══════════════════════════════════════════════════════════════════════ */

interface FrameProps {
  width?: number;
  height?: number;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

/** Standard SVG frame. Sizes itself to the parent's width with auto height
 *  derived from the viewBox aspect — works in any flex/grid context
 *  regardless of whether an ancestor has an explicit height. */
export function DiagramFrame({
  width = 720,
  height = 420,
  children,
  className = 'h-auto w-full',
  ariaLabel,
}: FrameProps) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
      role={ariaLabel ? 'img' : undefined}
    >
      {children}
    </svg>
  );
}

interface ArrowProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  width?: number;
  label?: string;
  labelOffset?: number;
  labelPerpOffset?: number;
  dashed?: boolean;
  fontSize?: number;
}

/** Vector arrow with optional label placed past the arrowhead.
 *
 *  `labelOffset` is the gap (in SVG units) between the arrowhead tip and
 *  the center of the label glyph. Default 22 keeps short labels (1–2 chars)
 *  at least 12 units clear of the arrowhead, satisfying the global
 *  no-overlap rule even when the label is mono and ~10 units wide.
 *
 *  `headLen` / `headWidth` follow a 1.75:1 ratio — slimmer than the prior
 *  14:8 triangle for a more refined editorial look. */
export function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = INK,
  width = 3,
  label,
  labelOffset = 22,
  labelPerpOffset = 0,
  dashed,
  fontSize = 17,
}: ArrowProps) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len < 0.5) return null;
  const nx = dx / len;
  const ny = dy / len;
  const headLen = 13;
  const headWidth = 7;
  const baseX = x2 - nx * headLen;
  const baseY = y2 - ny * headLen;
  const perpX = -ny;
  const perpY = nx;
  const lx = baseX + perpX * headWidth;
  const ly = baseY + perpY * headWidth;
  const rx = baseX - perpX * headWidth;
  const ry = baseY - perpY * headWidth;
  const labelX = x2 + nx * labelOffset + perpX * labelPerpOffset;
  const labelY = y2 + ny * labelOffset + perpY * labelPerpOffset;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={baseX}
        y2={baseY}
        stroke={color}
        strokeWidth={width}
        strokeDasharray={dashed ? '7 5' : undefined}
        strokeLinecap="round"
      />
      <polygon points={`${x2},${y2} ${lx},${ly} ${rx},${ry}`} fill={color} />
      {label && (
        <text
          x={labelX}
          y={labelY + fontSize * 0.32}
          fontFamily={FONT_MONO}
          fontSize={fontSize}
          fill={color}
          fontWeight="600"
          textAnchor="middle"
        >
          {label}
        </text>
      )}
    </g>
  );
}

interface BlockProps {
  x: number;
  y: number;
  w?: number;
  h?: number;
  label?: string;
  fill?: string;
  rotate?: number;
  fontSize?: number;
}

/** A schematic body. Centered label, soft fill, ink stroke. */
export function Block({
  x,
  y,
  w = 100,
  h = 70,
  label,
  fill = PAPER_RAISED,
  rotate = 0,
  fontSize = 16,
}: BlockProps) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  return (
    <g transform={rotate ? `rotate(${rotate} ${cx} ${cy})` : undefined}>
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke={INK} strokeWidth={1.8} rx={3} />
      {label && (
        <text
          x={cx}
          y={cy + fontSize * 0.32}
          fontFamily={FONT_MONO}
          fontSize={fontSize}
          fill={INK_MUTED}
          textAnchor="middle"
        >
          {label}
        </text>
      )}
    </g>
  );
}

interface GroundProps {
  x1: number;
  x2: number;
  y: number;
  hatchAbove?: boolean;
}

/** Hatched ground line. */
export function Ground({ x1, x2, y, hatchAbove = false }: GroundProps) {
  const id = `hatch-${Math.round(x1)}-${Math.round(y)}-${hatchAbove ? 'a' : 'b'}`;
  const dir = hatchAbove ? -1 : 1;
  const hatchHeight = 10;
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={INK_MUTED} strokeWidth={2} />
      <pattern id={id} patternUnits="userSpaceOnUse" width="10" height="10">
        <path
          d={`M0,${dir > 0 ? 10 : 0} L10,${dir > 0 ? 0 : 10}`}
          stroke={INK_MUTED}
          strokeWidth="0.8"
        />
      </pattern>
      <rect
        x={x1}
        y={hatchAbove ? y - hatchHeight : y}
        width={x2 - x1}
        height={hatchHeight}
        fill={`url(#${id})`}
      />
    </g>
  );
}

interface InclineProps {
  baseX?: number;
  baseY?: number;
  length?: number;
  angleDeg?: number;
  showAngleArc?: boolean;
}

export function Incline({
  baseX = 100,
  baseY = 360,
  length = 420,
  angleDeg = 30,
  showAngleArc = true,
}: InclineProps) {
  const rad = (angleDeg * Math.PI) / 180;
  const topX = baseX + length;
  const topY = baseY - length * Math.tan(rad);
  const ang = angleDeg.toString();
  return (
    <g>
      <polygon
        points={`${baseX},${baseY} ${topX},${baseY} ${topX},${topY}`}
        fill={PAPER_RAISED}
        stroke={INK}
        strokeWidth={1.8}
      />
      <Ground x1={baseX} x2={topX} y={baseY} />
      {showAngleArc && (
        <>
          <path
            d={`M ${topX - 56},${baseY} A 56 56 0 0 0 ${
              topX - 56 * Math.cos(rad)
            },${baseY - 56 * Math.sin(rad)}`}
            fill="none"
            stroke={INK_MUTED}
            strokeWidth={1.2}
          />
          <text x={topX - 32} y={baseY - 14} fontFamily={FONT_MONO} fontSize="14" fill={INK_MUTED}>
            θ={ang}°
          </text>
        </>
      )}
    </g>
  );
}

interface BlockOnInclineProps extends InclineProps {
  blockSize?: number;
  position?: number;
}

/** Block resting on an incline. Returns the block's center for force placement. */
export function BlockOnIncline({
  baseX = 100,
  baseY = 360,
  length = 420,
  angleDeg = 30,
  blockSize = 70,
  position = 0.5,
  showAngleArc = true,
}: BlockOnInclineProps) {
  const rad = (angleDeg * Math.PI) / 180;
  const px = baseX + length * (1 - position);
  const py = baseY - length * (1 - position) * Math.tan(rad);
  const perpX = Math.sin(rad) * (blockSize / 2);
  const perpY = -Math.cos(rad) * (blockSize / 2);
  const cx = px + perpX;
  const cy = py + perpY;
  return (
    <g>
      <Incline
        baseX={baseX}
        baseY={baseY}
        length={length}
        angleDeg={angleDeg}
        showAngleArc={showAngleArc}
      />
      <Block
        x={cx - blockSize / 2}
        y={cy - blockSize / 2}
        w={blockSize}
        h={blockSize}
        rotate={-angleDeg}
      />
    </g>
  );
}

interface PulleyProps {
  cx: number;
  cy: number;
  r?: number;
}

export function Pulley({ cx, cy, r = 30 }: PulleyProps) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={PAPER_RAISED} stroke={INK} strokeWidth={1.8} />
      <circle cx={cx} cy={cy} r={r * 0.5} fill={INK_MUTED} opacity={0.35} />
      <circle cx={cx} cy={cy} r={3} fill={INK} />
      {/* Mounting bracket */}
      <line
        x1={cx - 4}
        y1={cy - r - 12}
        x2={cx + 4}
        y2={cy - r - 12}
        stroke={INK}
        strokeWidth={2}
      />
      <line x1={cx} y1={cy - r} x2={cx} y2={cy - r - 12} stroke={INK} strokeWidth={1.5} />
    </g>
  );
}

interface PersonProps {
  x: number;
  y: number;
  scale?: number;
  flipped?: boolean;
}

export function Person({ x, y, scale = 1.4, flipped = false }: PersonProps) {
  const s = scale;
  const fx = flipped ? -1 : 1;
  return (
    <g transform={`translate(${x},${y})`}>
      <circle cx={0} cy={-32 * s} r={9 * s} fill="none" stroke={INK} strokeWidth={1.8} />
      <line x1={0} y1={-23 * s} x2={0} y2={12 * s} stroke={INK} strokeWidth={1.8} />
      <line x1={0} y1={-13 * s} x2={fx * 16 * s} y2={-2 * s} stroke={INK} strokeWidth={1.8} />
      <line x1={0} y1={-13 * s} x2={-fx * 14 * s} y2={2 * s} stroke={INK} strokeWidth={1.8} />
      <line x1={0} y1={12 * s} x2={fx * 12 * s} y2={32 * s} stroke={INK} strokeWidth={1.8} />
      <line x1={0} y1={12 * s} x2={-fx * 10 * s} y2={32 * s} stroke={INK} strokeWidth={1.8} />
    </g>
  );
}

/** Helper for inline mono-text labels inside SVG, positioned by anchor. */
function MonoText({
  x,
  y,
  children,
  size = 14,
  color = INK_MUTED,
  anchor = 'middle',
  weight = '500',
}: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  color?: string;
  anchor?: 'start' | 'middle' | 'end';
  weight?: string;
}) {
  return (
    <text
      x={x}
      y={y}
      fontFamily={FONT_MONO}
      fontSize={size}
      fill={color}
      fontWeight={weight}
      textAnchor={anchor}
    >
      {children}
    </text>
  );
}

/** Helper for figure captions in italic display font. */
function CaptionText({
  x,
  y,
  children,
  size = 14,
  color = INK_FAINT,
  anchor = 'middle',
}: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  color?: string;
  anchor?: 'start' | 'middle' | 'end';
}) {
  return (
    <text
      x={x}
      y={y}
      fontFamily={FONT_DISPLAY}
      fontStyle="italic"
      fontSize={size}
      fill={color}
      textAnchor={anchor}
    >
      {children}
    </text>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
 *  Composed figures — concept and example diagrams
 * ═══════════════════════════════════════════════════════════════════════ */

/** Anatomy of a force vector — magnitude bracket, direction tag, tail dot. */
export function ForceAnatomyDiagram() {
  return (
    <DiagramFrame ariaLabel="Anatomy of a force vector">
      <Arrow
        x1={120}
        y1={210}
        x2={580}
        y2={210}
        color={ACCENT}
        width={4.5}
        label="F"
        labelOffset={28}
        fontSize={22}
      />
      {/* Magnitude bracket below */}
      <line x1={120} y1={258} x2={120} y2={278} stroke={INK_MUTED} strokeWidth={1.4} />
      <line x1={580} y1={258} x2={580} y2={278} stroke={INK_MUTED} strokeWidth={1.4} />
      <line x1={120} y1={268} x2={580} y2={268} stroke={INK_MUTED} strokeWidth={1.4} />
      <MonoText x={350} y={300} size={15}>
        magnitude (N)
      </MonoText>
      {/* Direction marker at the head */}
      <MonoText x={580} y={170} size={14} color={INK_FAINT}>
        direction →
      </MonoText>
      {/* Tail dot — label set 14 units above (≥ 8-unit min gap to circle). */}
      <circle cx={120} cy={210} r={5} fill={INK} />
      <MonoText x={120} y={188} size={12} color={INK_FAINT}>
        tail
      </MonoText>
    </DiagramFrame>
  );
}

/** Two arrows tip-to-tail with the resultant.
 *
 *  F₁'s label is offset BELOW the horizontal so it doesn't crowd the
 *  start of F₂'s diagonal arrow. F₂'s label is offset to the right so
 *  it doesn't collide with the resultant's tip area. */
export function HeadToTailDiagram() {
  return (
    <DiagramFrame ariaLabel="Vector addition head-to-tail">
      <circle cx={100} cy={310} r={5} fill={INK} />
      {/* F₁: label dropped 18 below the horizontal so it doesn't collide
          with F₂'s up-rising start. Arrow's perp axis for a rightward
          vector is +y (positive perp = below). */}
      <Arrow
        x1={100}
        y1={310}
        x2={340}
        y2={310}
        color={INFO}
        label="F₁"
        labelOffset={22}
        labelPerpOffset={18}
      />
      {/* F₂: label pushed UP-LEFT of the tip so it doesn't collide with
          the resultant ΣF label (which sits past the same tip). */}
      <Arrow
        x1={340}
        y1={310}
        x2={460}
        y2={160}
        color={INFO}
        label="F₂"
        labelOffset={24}
        labelPerpOffset={-18}
      />
      <Arrow
        x1={100}
        y1={310}
        x2={460}
        y2={160}
        color={ACCENT}
        width={4}
        dashed
        label="ΣF"
        labelOffset={32}
        fontSize={19}
      />
      <CaptionText x={280} y={395} size={15}>
        tail-to-head construction
      </CaptionText>
    </DiagramFrame>
  );
}

/** Block with weight + normal — basic FBD primer.
 *
 *  Force arrows start 4 units outside the appropriate face of the block,
 *  so the shaft never visually merges with the block outline or crosses
 *  the centered `m` label. */
export function BoxOnGroundFBD({
  withApplied = false,
  withFriction = false,
}: {
  withApplied?: boolean;
  withFriction?: boolean;
}) {
  // Block geometry: x ∈ [310, 410], y ∈ [220, 300], face midpoints below.
  const bottomMid = { x: 360, y: 304 };
  const topMid = { x: 360, y: 216 };
  const rightMid = { x: 414, y: 260 };
  const leftMid = { x: 306, y: 260 };
  return (
    <DiagramFrame ariaLabel="Free body on ground">
      <Ground x1={80} x2={640} y={300} />
      <Block x={310} y={220} w={100} h={80} label="m" fontSize={20} />
      <Arrow x1={bottomMid.x} y1={bottomMid.y} x2={360} y2={386} color={ACCENT} label="W" />
      <Arrow x1={topMid.x} y1={topMid.y} x2={360} y2={108} color={INK} label="N" />
      {withApplied && (
        <Arrow x1={rightMid.x} y1={rightMid.y} x2={576} y2={260} color={INFO} label="F" />
      )}
      {withFriction && (
        <Arrow x1={leftMid.x} y1={leftMid.y} x2={154} y2={260} color={WARNING} label="f" />
      )}
    </DiagramFrame>
  );
}

/** Newton's 3rd law: swimmer or pusher — two bodies, two arrows.
 *
 *  Both arrows pulled vertically apart and their labels offset perp so
 *  that the 6-character F_X→Y labels don't overlap each other in the
 *  middle of the figure. */
export function ActionReactionDiagram() {
  return (
    <DiagramFrame ariaLabel="Action reaction pair">
      <Ground x1={60} x2={660} y={320} />
      <Person x={200} y={320} />
      <Person x={520} y={320} flipped />
      <Arrow
        x1={232}
        y1={278}
        x2={358}
        y2={278}
        color={ACCENT}
        label="F_A→B"
        labelOffset={26}
        labelPerpOffset={-16}
      />
      <Arrow
        x1={488}
        y1={302}
        x2={362}
        y2={302}
        color={INFO}
        label="F_B→A"
        labelOffset={26}
        labelPerpOffset={-16}
      />
      <CaptionText x={360} y={395} size={16}>
        F_A→B = − F_B→A · two bodies
      </CaptionText>
    </DiagramFrame>
  );
}

/** Block on incline with weight, normal, friction.
 *
 *  Arrows start outside the rotated block:
 *    - W (world-down): bottom of rotated 70×70 block at α=30° lies at
 *      cy + (35/cos 30°) ≈ cy + 40.4 → start at cy + 45 (4-unit margin).
 *    - N (slope-perpendicular, up-left): exits the block's top face at
 *      distance 35 along the slope normal → start 39 units along (-sin α, -cos α).
 *    - f (along slope, down-slope direction): exits the block's down-slope
 *      face at distance 35 along (-cos α, +sin α) → start 39 units out. */
export function InclineFullFBD({ angleDeg = 30 }: { angleDeg?: number }) {
  const rad = (angleDeg * Math.PI) / 180;
  const sinT = Math.sin(rad);
  const cosT = Math.cos(rad);
  const cx = 310;
  const cy = 245;
  // Start offsets (block-edge + 4-unit margin).
  const wStart = 45; // along world-down for vertical weight
  const nStart = 39; // along slope-normal direction
  const fStart = 39; // along down-slope direction
  return (
    <DiagramFrame width={720} height={460} ariaLabel="Block on incline FBD">
      <BlockOnIncline />
      {/* Weight straight down */}
      <Arrow x1={cx} y1={cy + wStart} x2={cx} y2={cy + wStart + 125} color={ACCENT} label="W" />
      {/* Normal — perpendicular to slope, away from surface */}
      <Arrow
        x1={cx - nStart * sinT}
        y1={cy - nStart * cosT}
        x2={cx - (nStart + 95) * sinT}
        y2={cy - (nStart + 95) * cosT}
        color={INK}
        label="N"
      />
      {/* Friction along slope, opposing motion */}
      <Arrow
        x1={cx - fStart * cosT}
        y1={cy + fStart * sinT}
        x2={cx - (fStart + 80) * cosT}
        y2={cy + (fStart + 80) * sinT}
        color={WARNING}
        label="f"
        labelOffset={22}
      />
    </DiagramFrame>
  );
}

/** Equal force, three different masses → three different accelerations.
 *
 *  Each panel: applied force starts 4 units outside the block's right
 *  edge. The acceleration arrows sit clearly above each block, in a
 *  row of their own, away from the F arrow. Panel 3 had a near-zero-
 *  length F arrow (700 → 695) — replace with a short visible arrow
 *  starting outside the wide block. */
export function MassComparisonDiagram() {
  return (
    <DiagramFrame width={720} height={420} ariaLabel="F = ma — three regimes">
      {/* Panel 1: m, F, a. Block x ∈ [55, 125]. */}
      <Block x={55} y={170} w={70} h={50} label="m" />
      <Arrow x1={129} y1={195} x2={210} y2={195} color={INFO} label="F" />
      <Arrow x1={90} y1={134} x2={170} y2={134} color={ACCENT} dashed label="a" />
      <MonoText x={132} y={285} size={14} color={INK_FAINT}>
        F → a
      </MonoText>

      {/* Panel 2: m, 2F, 2a. Block x ∈ [295, 365]. */}
      <Block x={295} y={170} w={70} h={50} label="m" />
      <Arrow x1={369} y1={195} x2={555} y2={195} color={INFO} label="2F" />
      <Arrow x1={330} y1={134} x2={520} y2={134} color={ACCENT} dashed label="2a" />
      <MonoText x={425} y={285} size={14} color={INK_FAINT}>
        2F → 2a
      </MonoText>

      {/* Panel 3: 3m (wider), F, a/3. Block x ∈ [560, 700]. */}
      <Block x={560} y={170} w={140} h={50} label="3m" fontSize={15} />
      <Arrow
        x1={519}
        y1={195}
        x2={555}
        y2={195}
        color={INFO}
        label="F"
        labelPerpOffset={-16}
        labelOffset={4}
      />
      <Arrow
        x1={605}
        y1={134}
        x2={635}
        y2={134}
        color={ACCENT}
        dashed
        label="a/3"
        fontSize={14}
        labelOffset={20}
      />
      <MonoText x={630} y={285} size={14} color={INK_FAINT}>
        F on 3m → a/3
      </MonoText>

      <CaptionText x={360} y={370} size={16}>
        same body, force scales motion
      </CaptionText>
    </DiagramFrame>
  );
}

/** Atwood machine: pulley at top, two masses, rope.
 *
 *  m₁: y ∈ [300, 370]. m₂: y ∈ [260, 330].
 *  Tensions start 4 above each block's top edge; weights start 4 below
 *  each block's bottom edge. Caption pulled clear of the W₂ label. */
export function AtwoodDiagram() {
  return (
    <DiagramFrame width={720} height={470} ariaLabel="Atwood machine">
      {/* Ceiling */}
      <Ground x1={250} x2={470} y={70} hatchAbove />
      <Pulley cx={360} cy={100} r={36} />
      {/* Left rope */}
      <line x1={324} y1={100} x2={250} y2={300} stroke={INK} strokeWidth={2} />
      {/* Right rope */}
      <line x1={396} y1={100} x2={470} y2={260} stroke={INK} strokeWidth={2} />
      {/* Masses */}
      <Block x={205} y={300} w={90} h={70} label="m₁" fontSize={17} />
      <Block x={425} y={260} w={90} h={70} label="m₂" fontSize={17} />
      {/* Tensions on the masses — 4 units above the top edges. */}
      <Arrow x1={250} y1={296} x2={250} y2={232} color={SUCCESS} label="T" fontSize={15} />
      <Arrow x1={470} y1={256} x2={470} y2={192} color={SUCCESS} label="T" fontSize={15} />
      {/* Weights — 4 units below the bottom edges. */}
      <Arrow
        x1={250}
        y1={374}
        x2={250}
        y2={425}
        color={ACCENT}
        label="W₁"
        fontSize={15}
        labelOffset={20}
      />
      <Arrow
        x1={470}
        y1={334}
        x2={470}
        y2={405}
        color={ACCENT}
        label="W₂"
        fontSize={15}
        labelOffset={20}
      />
      <CaptionText x={360} y={460} size={14}>
        massless, inextensible rope · frictionless pulley
      </CaptionText>
    </DiagramFrame>
  );
}

/** Hockey puck on frictionless ice — Newton I demonstration. */
export function HockeyPuckDiagram() {
  return (
    <DiagramFrame ariaLabel="Hockey puck on frictionless ice">
      {/* Ice surface as a paler hatched line */}
      <line x1={60} y1={280} x2={660} y2={280} stroke={INK_MUTED} strokeWidth={2} />
      {/* Subtle ice marks below */}
      <line x1={80} y1={300} x2={120} y2={300} stroke={INK_FAINT} strokeWidth={1} />
      <line x1={180} y1={310} x2={240} y2={310} stroke={INK_FAINT} strokeWidth={1} />
      <line x1={310} y1={300} x2={360} y2={300} stroke={INK_FAINT} strokeWidth={1} />
      <line x1={420} y1={310} x2={480} y2={310} stroke={INK_FAINT} strokeWidth={1} />
      <line x1={540} y1={300} x2={600} y2={300} stroke={INK_FAINT} strokeWidth={1} />

      {/* Puck — short flat ellipse */}
      <ellipse cx={320} cy={272} rx={36} ry={10} fill={INK} stroke={INK} strokeWidth={1.5} />
      {/* Motion arrow — wide label set ABOVE the shaft so it doesn't
          extend back across the arrowhead. */}
      <Arrow
        x1={370}
        y1={250}
        x2={530}
        y2={250}
        color={INK_MUTED}
        dashed
        width={2}
        label="v = const"
        fontSize={15}
        labelOffset={4}
        labelPerpOffset={-18}
      />
      {/* Trailing motion lines */}
      <line x1={280} y1={260} x2={250} y2={260} stroke={INK_FAINT} strokeWidth={1} />
      <line x1={280} y1={272} x2={240} y2={272} stroke={INK_FAINT} strokeWidth={1} />
      <line x1={280} y1={284} x2={250} y2={284} stroke={INK_FAINT} strokeWidth={1} />

      <MonoText x={320} y={170} size={16} color={INK_MUTED}>
        ΣF = 0
      </MonoText>
      <CaptionText x={360} y={365} size={15}>
        no force needed to maintain constant velocity
      </CaptionText>
    </DiagramFrame>
  );
}

/** Static vs kinetic friction — three panels showing the regime change.
 *
 *  Panel block x ∈ [70, 140]; F arrow starts 4 right of right edge, fric
 *  arrow starts 4 left of left edge. Labels offset further to clear the
 *  arrowhead given the slimmer head proportions. */
export function FrictionRegimesDiagram() {
  const drawPanel = (xOffset: number, label: string, F: number, fk: boolean) => (
    <g transform={`translate(${xOffset}, 0)`}>
      <Ground x1={0} x2={210} y={220} />
      <Block x={70} y={160} w={70} h={60} label="m" fontSize={15} />
      {/* F label sits ABOVE the arrow shaft (perp offset) so wide
          "F=X N" text doesn't extend back across the arrowhead. */}
      <Arrow
        x1={144}
        y1={190}
        x2={144 + F}
        y2={190}
        color={INFO}
        label={`F=${F / 4} N`}
        fontSize={13}
        labelOffset={8}
        labelPerpOffset={-18}
      />
      {fk ? (
        <Arrow
          x1={66}
          y1={190}
          x2={16}
          y2={190}
          color={WARNING}
          label="fₖ"
          fontSize={14}
          labelOffset={18}
        />
      ) : (
        <Arrow
          x1={66}
          y1={190}
          x2={66 - F}
          y2={190}
          color={WARNING}
          label="fₛ"
          fontSize={14}
          labelOffset={18}
        />
      )}
      <MonoText x={105} y={270} size={13} color={INK_FAINT}>
        {label}
      </MonoText>
    </g>
  );
  return (
    <DiagramFrame width={720} height={360} ariaLabel="Static vs kinetic friction regimes">
      {drawPanel(30, 'fₛ matches push', 32, false)}
      {drawPanel(255, 'fₛ at maximum', 56, false)}
      {drawPanel(480, 'sliding · fₖ < fₛ_max', 80, true)}
      <CaptionText x={360} y={325} size={14}>
        static negotiates · kinetic is fixed
      </CaptionText>
    </DiagramFrame>
  );
}

/** Tension along an ideal rope. */
export function TensionDiagram() {
  return (
    <DiagramFrame ariaLabel="Tension along a rope">
      {/* Two hands as anchors */}
      <Person x={130} y={250} scale={1.2} />
      <Person x={590} y={250} scale={1.2} flipped />
      {/* Rope */}
      <line x1={158} y1={245} x2={562} y2={245} stroke={INK} strokeWidth={2.5} />
      {/* Multiple tension arrows along the rope */}
      <Arrow
        x1={210}
        y1={210}
        x2={250}
        y2={210}
        color={SUCCESS}
        label="T"
        fontSize={15}
        labelOffset={18}
      />
      <Arrow
        x1={510}
        y1={210}
        x2={470}
        y2={210}
        color={SUCCESS}
        label="T"
        fontSize={15}
        labelOffset={18}
      />
      <Arrow
        x1={350}
        y1={210}
        x2={310}
        y2={210}
        color={SUCCESS}
        label="T"
        fontSize={15}
        labelOffset={18}
      />
      <Arrow
        x1={370}
        y1={210}
        x2={410}
        y2={210}
        color={SUCCESS}
        label="T"
        fontSize={15}
        labelOffset={18}
      />
      <CaptionText x={360} y={330} size={16}>
        tension is the same magnitude everywhere along an ideal rope
      </CaptionText>
    </DiagramFrame>
  );
}

/** Weight always points to Earth's center. */
export function WeightDiagram() {
  // Earth as a circle with three blocks on different sides
  const cx = 360;
  const cy = 460;
  const R = 220;
  return (
    <DiagramFrame width={720} height={460} ariaLabel="Weight points toward Earth's center">
      {/* Earth */}
      <circle cx={cx} cy={cy} r={R} fill={PAPER_RAISED} stroke={INK_MUTED} strokeWidth={1.6} />
      {/* Top block. Block bottom at y = cy-R-10. Weight arrow starts 4
          below that and ends inside Earth, indicating pull toward center. */}
      <Block x={335} y={cy - R - 60} w={50} h={50} label="m" fontSize={14} />
      <Arrow
        x1={360}
        y1={cy - R - 6}
        x2={360}
        y2={cy - R + 60}
        color={ACCENT}
        label="W"
        fontSize={14}
        labelOffset={18}
      />
      {/* Right block. Block left edge at x = cx+R-5. Arrow starts 4
          left of that (= cx+R-9) and points inward toward Earth's center. */}
      <Block x={cx + R - 5} y={cy - 25} w={50} h={50} label="m" fontSize={14} rotate={-90} />
      <Arrow
        x1={cx + R - 9}
        y1={cy}
        x2={cx + R - 60}
        y2={cy}
        color={ACCENT}
        label="W"
        fontSize={14}
        labelOffset={18}
      />
      {/* Left block. Block right edge at x = cx-R+5. Arrow starts 4
          right of that (= cx-R+9) pointing inward. */}
      <Block x={cx - R - 45} y={cy - 25} w={50} h={50} label="m" fontSize={14} rotate={90} />
      <Arrow
        x1={cx - R + 9}
        y1={cy}
        x2={cx - R + 60}
        y2={cy}
        color={ACCENT}
        label="W"
        fontSize={14}
        labelOffset={18}
      />
      {/* Center label */}
      <circle cx={cx} cy={cy} r={4} fill={INK_FAINT} />
      <MonoText x={cx} y={cy + 22} size={13} color={INK_FAINT}>
        {'Earth’s center'}
      </MonoText>
    </DiagramFrame>
  );
}

/** Normal force on flat surface vs incline. */
export function NormalCompareDiagram() {
  return (
    <DiagramFrame width={720} height={420} ariaLabel="Normal force flat vs incline">
      {/* Divider */}
      <line
        x1={360}
        y1={40}
        x2={360}
        y2={380}
        stroke={INK_MUTED}
        strokeWidth={1.2}
        strokeDasharray="6 6"
      />
      {/* LEFT — flat. Block y ∈ [250, 310]. */}
      <MonoText x={180} y={60} size={13} color={INK_FAINT}>
        FLAT SURFACE
      </MonoText>
      <Ground x1={50} x2={330} y={310} />
      <Block x={140} y={250} w={80} h={60} label="m" fontSize={15} />
      <Arrow x1={180} y1={314} x2={180} y2={372} color={ACCENT} label="W" fontSize={15} />
      <Arrow x1={180} y1={246} x2={180} y2={142} color={INK} label="N" fontSize={15} />
      <CaptionText x={180} y={398} size={15}>
        N = mg
      </CaptionText>

      {/* RIGHT — incline. Block size 60, rotated -30°, centered ≈ (525, 240). */}
      <MonoText x={540} y={60} size={13} color={INK_FAINT}>
        ON AN INCLINE
      </MonoText>
      <BlockOnIncline baseX={400} baseY={310} length={280} angleDeg={30} blockSize={60} />
      <Arrow
        x1={525}
        y1={240 + 40}
        x2={525}
        y2={240 + 40 + 80}
        color={ACCENT}
        label="W"
        fontSize={15}
      />
      <Arrow
        x1={525 - 34 * Math.sin(Math.PI / 6)}
        y1={240 - 34 * Math.cos(Math.PI / 6)}
        x2={525 - (34 + 80) * Math.sin(Math.PI / 6)}
        y2={240 - (34 + 80) * Math.cos(Math.PI / 6)}
        color={INK}
        label="N"
        fontSize={15}
      />
      <CaptionText x={540} y={398} size={15}>
        N = mg cos θ &lt; mg
      </CaptionText>
    </DiagramFrame>
  );
}

/** Stylized Σ symbol — a typographic moment for the net-force concept. */
export function SigmaSymbolDiagram() {
  return (
    <DiagramFrame width={720} height={420} ariaLabel="Sigma — sum of all forces">
      {/* Big stylized Σ */}
      <text
        x={360}
        y={250}
        fontFamily={FONT_DISPLAY}
        fontSize="220"
        fontWeight="500"
        fill={ACCENT}
        textAnchor="middle"
      >
        Σ
      </text>
      <CaptionText x={360} y={325} size={18}>
        sum of all forces, vector-wise
      </CaptionText>
      <MonoText x={360} y={365} size={14} color={INK_MUTED}>
        ΣF = F₁ + F₂ + F₃ + …
      </MonoText>
    </DiagramFrame>
  );
}

/** Book on a table at rest — Newton I example. */
export function BookOnTableDiagram() {
  return (
    <DiagramFrame ariaLabel="Book on a table">
      {/* Table top */}
      <line x1={120} y1={300} x2={600} y2={300} stroke={INK} strokeWidth={2} />
      <line x1={160} y1={300} x2={160} y2={380} stroke={INK} strokeWidth={2} />
      <line x1={560} y1={300} x2={560} y2={380} stroke={INK} strokeWidth={2} />
      <Ground x1={80} x2={640} y={380} />

      {/* Book — a slim block on the table. y ∈ [258, 300]. */}
      <rect
        x={300}
        y={258}
        width={120}
        height={42}
        fill={PAPER_RAISED}
        stroke={INK}
        strokeWidth={1.8}
        rx={2}
      />
      <MonoText x={360} y={284} size={14} color={INK_MUTED}>
        2 kg
      </MonoText>

      {/* Forces: W starts 4 units below book, N starts 4 units above. */}
      <Arrow x1={360} y1={304} x2={360} y2={386} color={ACCENT} label="W" />
      <Arrow x1={360} y1={254} x2={360} y2={150} color={INK} label="N" />

      <CaptionText x={360} y={116} size={15}>
        ΣF = 0 · N = mg
      </CaptionText>
    </DiagramFrame>
  );
}

/** Swimming — Newton III as locomotion. */
export function SwimmingDiagram() {
  return (
    <DiagramFrame ariaLabel="Swimmer's hand pushing water backward">
      {/* Water surface */}
      <line x1={60} y1={270} x2={660} y2={270} stroke={INFO} strokeWidth={2} opacity={0.4} />
      <line x1={60} y1={285} x2={660} y2={285} stroke={INFO} strokeWidth={1} opacity={0.25} />
      <line x1={60} y1={300} x2={660} y2={300} stroke={INFO} strokeWidth={0.8} opacity={0.15} />

      {/* Swimmer body — simplified outline */}
      <ellipse cx={400} cy={240} rx={100} ry={28} fill="none" stroke={INK} strokeWidth={1.8} />
      <circle cx={500} cy={220} r={20} fill="none" stroke={INK} strokeWidth={1.8} />
      {/* Hand pushing water back */}
      <ellipse cx={290} cy={232} rx={28} ry={14} fill={INK} opacity={0.85} />

      {/* Arrows. Long descriptive labels lifted above the swimmer body
          (top of body ellipse ≈ y=212; head circle top ≈ y=200). */}
      <Arrow
        x1={290}
        y1={232}
        x2={170}
        y2={232}
        color={ACCENT}
        label="F: hand → water"
        fontSize={14}
        labelOffset={6}
        labelPerpOffset={30}
      />
      <Arrow
        x1={350}
        y1={208}
        x2={470}
        y2={208}
        color={INFO}
        label="F: water → hand"
        fontSize={14}
        labelOffset={6}
        labelPerpOffset={-24}
      />

      <CaptionText x={360} y={365} size={15}>
        you push the water back · the water pushes you forward
      </CaptionText>
    </DiagramFrame>
  );
}

/** FBD method walkthrough — three steps. */
export function FBDStepsDiagram({ step }: { step: 1 | 2 | 3 }) {
  return (
    <DiagramFrame width={720} height={420} ariaLabel={`FBD step ${step}`}>
      {step === 1 && (
        <>
          {/* Choose the body — show the system, highlight one piece */}
          <Ground x1={80} x2={640} y={300} />
          <Block x={170} y={230} w={80} h={70} label="A" fontSize={18} />
          <rect
            x={290}
            y={230}
            width={80}
            height={70}
            fill="none"
            stroke={ACCENT}
            strokeWidth={3}
            strokeDasharray="6 4"
            rx={3}
          />
          <text
            x={330}
            y={275}
            fontFamily={FONT_MONO}
            fontSize={20}
            fontWeight="600"
            fill={ACCENT}
            textAnchor="middle"
          >
            B
          </text>
          <Block x={410} y={230} w={80} h={70} label="C" fontSize={18} />
          <CaptionText x={360} y={365} size={16}>
            Step 1 · Choose ONE body to analyze
          </CaptionText>
        </>
      )}
      {step === 2 && (
        <>
          {/* Replace the body with a single point */}
          <circle cx={360} cy={210} r={8} fill={INK} />
          <text
            x={360}
            y={250}
            fontFamily={FONT_MONO}
            fontSize={16}
            fill={INK_MUTED}
            textAnchor="middle"
          >
            m
          </text>
          <CaptionText x={360} y={365} size={16}>
            Step 2 · Represent it as a point at its center
          </CaptionText>
        </>
      )}
      {step === 3 && (
        <>
          {/* Draw every force as an arrow from the point */}
          <circle cx={360} cy={210} r={6} fill={INK} />
          <Arrow x1={360} y1={210} x2={360} y2={320} color={ACCENT} label="W" />
          <Arrow x1={360} y1={210} x2={360} y2={100} color={INK} label="N" />
          <Arrow x1={360} y1={210} x2={500} y2={210} color={INFO} label="F" />
          <Arrow x1={360} y1={210} x2={220} y2={210} color={WARNING} label="f" />
          <CaptionText x={360} y={365} size={16}>
            Step 3 · One arrow per force, all from the point
          </CaptionText>
        </>
      )}
    </DiagramFrame>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
 *  Example-specific diagrams
 * ═══════════════════════════════════════════════════════════════════════ */

/** Two parallel forces 5 N + 3 N → 8 N.
 *
 *  Both applied-force arrows start 4 units to the right of the block's
 *  right edge. The resultant arrow on the row below is moved further
 *  right so its label has clearance from the right viewBox edge. */
export function TwoForcesParallelDiagram() {
  return (
    <DiagramFrame ariaLabel="Two forces in the same direction sum to 8 N">
      <Block x={100} y={170} w={100} h={70} label="m" fontSize={17} />
      <Arrow
        x1={204}
        y1={195}
        x2={360}
        y2={195}
        color={INFO}
        label="5 N"
        fontSize={16}
        labelOffset={28}
      />
      <Arrow
        x1={204}
        y1={228}
        x2={296}
        y2={228}
        color={INFO}
        label="3 N"
        fontSize={16}
        labelOffset={28}
      />
      {/* Resultant on a separate line below — bracket ends span the same
          range as the combined arrow above. */}
      <line x1={100} y1={300} x2={100} y2={320} stroke={INK_MUTED} strokeWidth={1.4} />
      <line x1={296} y1={300} x2={296} y2={320} stroke={INK_MUTED} strokeWidth={1.4} />
      <Arrow
        x1={100}
        y1={310}
        x2={296}
        y2={310}
        color={ACCENT}
        width={4.5}
        label="ΣF = 8 N"
        fontSize={18}
        labelOffset={-98}
        labelPerpOffset={-24}
      />
      <CaptionText x={360} y={365} size={15}>
        same direction · scalar sum
      </CaptionText>
    </DiagramFrame>
  );
}

/** Three 1-D forces with mixed signs → +9 N net.
 *
 *  Block x ∈ [310, 410]. Each applied force starts 4 units outside the
 *  appropriate face. The resultant on the row below has its label
 *  offset wider so it doesn't crowd the right bracket. */
export function ThreeForces1DDiagram() {
  return (
    <DiagramFrame width={720} height={420} ariaLabel="Three horizontal forces">
      <Block x={310} y={150} w={100} h={70} label="m" fontSize={17} />
      <Arrow
        x1={414}
        y1={172}
        x2={580}
        y2={172}
        color={INFO}
        label="10 N"
        fontSize={15}
        labelOffset={30}
      />
      <Arrow
        x1={414}
        y1={205}
        x2={490}
        y2={205}
        color={INFO}
        label="5 N"
        fontSize={15}
        labelOffset={28}
      />
      <Arrow
        x1={306}
        y1={188}
        x2={206}
        y2={188}
        color={WARNING}
        label="6 N"
        fontSize={15}
        labelOffset={28}
      />
      {/* Net force below */}
      <line x1={206} y1={290} x2={206} y2={310} stroke={INK_MUTED} strokeWidth={1.4} />
      <line x1={580} y1={290} x2={580} y2={310} stroke={INK_MUTED} strokeWidth={1.4} />
      <Arrow
        x1={295}
        y1={300}
        x2={580}
        y2={300}
        color={ACCENT}
        width={4.5}
        label="ΣF = +9 N"
        fontSize={18}
        labelOffset={-142}
        labelPerpOffset={-24}
      />
      <CaptionText x={360} y={365} size={14}>
        + right · − left · then add as signed scalars
      </CaptionText>
    </DiagramFrame>
  );
}

/** Block on smooth surface with 8 N horizontal + 6 N vertical.
 *
 *  Block y ∈ [230, 300]. W starts 4 below bottom; N starts 4 above top.
 *  Horizontal 8 N starts 4 right of right edge. Vertical 6 N starts at
 *  block top but offset horizontally (x=388, not 360) so it doesn't
 *  overlap the N arrow. Move 6 N start 4 above top edge too. */
export function TwoForcesPerpendicularDiagram() {
  return (
    <DiagramFrame ariaLabel="Two perpendicular forces">
      <Ground x1={80} x2={640} y={300} />
      <Block x={310} y={230} w={100} h={70} label="m=2 kg" fontSize={14} />
      {/* Background W and N (faint reference). */}
      <Arrow
        x1={360}
        y1={304}
        x2={360}
        y2={386}
        color={INK_FAINT}
        width={2}
        label="W"
        fontSize={14}
        labelOffset={18}
      />
      <Arrow
        x1={360}
        y1={226}
        x2={360}
        y2={126}
        color={INK_FAINT}
        width={2}
        label="N"
        fontSize={14}
        labelOffset={18}
      />
      {/* Foreground applied forces (offset from the W/N axis). */}
      <Arrow
        x1={414}
        y1={262}
        x2={550}
        y2={262}
        color={INFO}
        label="8 N"
        fontSize={16}
        labelOffset={28}
      />
      <Arrow
        x1={388}
        y1={226}
        x2={388}
        y2={96}
        color={SUCCESS}
        label="6 N"
        fontSize={16}
        labelOffset={22}
      />
    </DiagramFrame>
  );
}

/** A single 5 kg book + 49 N weight arrow. */
export function BookWithWeightDiagram() {
  return (
    <DiagramFrame ariaLabel="Weight of a 5 kg book">
      <rect
        x={290}
        y={120}
        width={140}
        height={80}
        fill={PAPER_RAISED}
        stroke={INK}
        strokeWidth={1.8}
        rx={3}
      />
      <MonoText x={360} y={158} size={20} color={INK_MUTED}>
        5 kg
      </MonoText>
      <MonoText x={360} y={184} size={14} color={INK_FAINT}>
        a book
      </MonoText>
      {/* Book y ∈ [120, 200]; weight arrow starts 4 units below. */}
      <Arrow
        x1={360}
        y1={204}
        x2={360}
        y2={350}
        color={ACCENT}
        width={4.5}
        label="W = 49 N"
        fontSize={18}
        labelOffset={30}
      />
      <Ground x1={140} x2={580} y={384} />
    </DiagramFrame>
  );
}

/** Hanging-sign equilibrium — mass on two ropes at angle θ. */
export function HangingSignDiagram({ angleDeg = 30 }: { angleDeg?: number }) {
  const theta = (angleDeg * Math.PI) / 180;
  const ropeLen = 170;
  const hookY = 70;
  const massX = 360;
  const massY = hookY + ropeLen * Math.cos(theta);
  const leftAnchorX = massX - ropeLen * Math.sin(theta);
  const rightAnchorX = massX + ropeLen * Math.sin(theta);
  return (
    <DiagramFrame width={720} height={460} ariaLabel="Hanging sign in equilibrium">
      {/* Ceiling */}
      <Ground x1={leftAnchorX - 50} x2={rightAnchorX + 50} y={hookY} hatchAbove />
      {/* Two ropes */}
      <line x1={leftAnchorX} y1={hookY} x2={massX} y2={massY} stroke={INK} strokeWidth={2} />
      <line x1={rightAnchorX} y1={hookY} x2={massX} y2={massY} stroke={INK} strokeWidth={2} />
      {/* Sign */}
      <rect
        x={massX - 50}
        y={massY}
        width={100}
        height={60}
        fill={PAPER_RAISED}
        stroke={INK}
        strokeWidth={1.8}
        rx={3}
      />
      <MonoText x={massX} y={massY + 36} size={16} color={INK_MUTED}>
        m
      </MonoText>
      {/* Tensions on the mass — along each rope, starting 4 units above
          the sign's top edge so the arrow shaft doesn't touch the sign. */}
      <Arrow
        x1={massX - 4 * Math.sin(theta)}
        y1={massY - 4 * Math.cos(theta)}
        x2={massX - 94 * Math.sin(theta)}
        y2={massY - 94 * Math.cos(theta)}
        color={SUCCESS}
        label="T₁"
        fontSize={16}
      />
      <Arrow
        x1={massX + 4 * Math.sin(theta)}
        y1={massY - 4 * Math.cos(theta)}
        x2={massX + 94 * Math.sin(theta)}
        y2={massY - 94 * Math.cos(theta)}
        color={SUCCESS}
        label="T₂"
        fontSize={16}
      />
      {/* Weight — starts 4 below sign's bottom edge. */}
      <Arrow
        x1={massX}
        y1={massY + 64}
        x2={massX}
        y2={massY + 150}
        color={ACCENT}
        label="W = mg"
        fontSize={16}
        labelOffset={26}
      />
      {/* Angle marks — small arcs at the ceiling anchors, with θ labels
          set further inside so they don't crowd the rope lines. */}
      <path
        d={`M ${leftAnchorX + 22},${hookY} A 22 22 0 0 1 ${leftAnchorX + 22 * Math.sin(theta)},${
          hookY + 22 * Math.cos(theta)
        }`}
        fill="none"
        stroke={INK_FAINT}
        strokeWidth={1.0}
      />
      <path
        d={`M ${rightAnchorX - 22 * Math.sin(theta)},${hookY + 22 * Math.cos(theta)} A 22 22 0 0 1 ${rightAnchorX - 22},${hookY}`}
        fill="none"
        stroke={INK_FAINT}
        strokeWidth={1.0}
      />
      <MonoText x={leftAnchorX + 38} y={hookY + 28} size={13} color={INK_FAINT}>
        θ
      </MonoText>
      <MonoText x={rightAnchorX - 38} y={hookY + 28} size={13} color={INK_FAINT}>
        θ
      </MonoText>
    </DiagramFrame>
  );
}

/** Block on incline, pushed by horizontal force F at constant velocity.
 *
 *  All arrows start 4 units outside the rotated block (same offsets as
 *  InclineFullFBD). The horizontal applied force F ends at the block's
 *  left edge (cx - 39 cos α along horizontal ≈ cx - 34), not at center. */
export function InclineHorizontalForceFBD({ angleDeg = 30 }: { angleDeg?: number }) {
  const sinT = Math.sin((angleDeg * Math.PI) / 180);
  const cosT = Math.cos((angleDeg * Math.PI) / 180);
  const cx = 310;
  const cy = 245;
  const wStart = 45;
  const nStart = 39;
  const fStart = 39;
  // Where the block's leftmost extent sits along world-horizontal at y=cy:
  // for a 70×70 block rotated -30°, that's cx - 35/cos 30° ≈ cx - 40.4.
  const blockLeftAtCenter = cx - 35 / cosT;
  return (
    <DiagramFrame width={720} height={460} ariaLabel="Incline with horizontal applied force">
      <BlockOnIncline />
      {/* Weight */}
      <Arrow x1={cx} y1={cy + wStart} x2={cx} y2={cy + wStart + 115} color={ACCENT} label="W" />
      {/* Normal */}
      <Arrow
        x1={cx - nStart * sinT}
        y1={cy - nStart * cosT}
        x2={cx - (nStart + 95) * sinT}
        y2={cy - (nStart + 95) * cosT}
        color={INK}
        label="N"
      />
      {/* Friction down-slope (opposing upward motion) */}
      <Arrow
        x1={cx - fStart * cosT}
        y1={cy + fStart * sinT}
        x2={cx - (fStart + 78) * cosT}
        y2={cy + (fStart + 78) * sinT}
        color={WARNING}
        label="fₖ"
        labelOffset={22}
      />
      {/* Horizontal applied force, terminating 4 units before block-left */}
      <Arrow
        x1={195}
        y1={cy}
        x2={blockLeftAtCenter - 4}
        y2={cy}
        color={INFO}
        label="F"
        labelOffset={22}
      />
      <CaptionText x={360} y={440} size={15}>
        constant velocity · ΣF = 0
      </CaptionText>
    </DiagramFrame>
  );
}

/** Two boxes A + B in contact, pushed by F.
 *
 *  Block A x ∈ [235, 335], y ∈ [200, 280]. Block B x ∈ [335, 475], y ∈ [185, 280].
 *  Applied F arrow ends 4 units outside A's left edge.
 *  The Newton-III pair is lifted ABOVE the blocks (y=148 and y=120) so
 *  the arrows don't disappear inside either body. Thin leader lines tie
 *  each arrow to the contact interface (x=335). */
export function TwoBoxesContactDiagram() {
  return (
    <DiagramFrame width={720} height={380} ariaLabel="Two boxes in contact">
      <Ground x1={60} x2={660} y={280} />
      <Block x={235} y={200} w={100} h={80} label="A" fontSize={18} />
      <Block x={335} y={185} w={140} h={95} label="B" fontSize={18} />
      {/* Applied F on the back of A — tip stops 4 units outside A's left edge. */}
      <Arrow x1={140} y1={240} x2={231} y2={240} color={INFO} label="F" labelOffset={22} />
      {/* Leader lines from contact line (x=335) up to the pair arrows. */}
      <line
        x1={335}
        y1={185}
        x2={335}
        y2={150}
        stroke={INK_FAINT}
        strokeWidth={0.5}
        strokeDasharray="3 3"
      />
      {/* F_AB: force from A acting on B, drawn pointing right. */}
      <Arrow
        x1={300}
        y1={148}
        x2={372}
        y2={148}
        color={ACCENT}
        label="F_AB on B"
        fontSize={14}
        labelOffset={26}
      />
      {/* F_BA: force from B acting on A, drawn pointing left, stacked above. */}
      <Arrow
        x1={372}
        y1={118}
        x2={300}
        y2={118}
        color={ACCENT}
        label="F_BA on A"
        fontSize={14}
        labelOffset={26}
      />
      <CaptionText x={360} y={340} size={15}>
        F_AB = − F_BA · Newton III pair
      </CaptionText>
    </DiagramFrame>
  );
}

/** Three boxes m₁ < m₂ < m₃ in contact pushed by F.
 *
 *  m₁ x ∈ [170, 240]. m₂ x ∈ [240, 340]. m₃ x ∈ [340, 480].
 *  Applied F ends 4 outside m₁'s left edge. Contact pair arrows
 *  (F₁₂, F₂₃) lifted above the blocks with thin leader lines so they
 *  aren't lost inside the bodies. */
export function ThreeBoxesStackDiagram() {
  return (
    <DiagramFrame width={720} height={380} ariaLabel="Three boxes pushed in series">
      <Ground x1={50} x2={680} y={290} />
      <Block x={170} y={230} w={70} h={60} label="m₁" fontSize={16} />
      <Block x={240} y={210} w={100} h={80} label="m₂" fontSize={16} />
      <Block x={340} y={180} w={140} h={110} label="m₃" fontSize={18} />
      {/* Applied F */}
      <Arrow x1={80} y1={260} x2={166} y2={260} color={INFO} label="F" labelOffset={22} />
      {/* Leader lines from each contact interface up to the pair arrows. */}
      <line
        x1={240}
        y1={210}
        x2={240}
        y2={150}
        stroke={INK_FAINT}
        strokeWidth={0.5}
        strokeDasharray="3 3"
      />
      <line
        x1={340}
        y1={180}
        x2={340}
        y2={120}
        stroke={INK_FAINT}
        strokeWidth={0.5}
        strokeDasharray="3 3"
      />
      {/* Inter-box contact pairs, lifted above the blocks. */}
      <Arrow
        x1={208}
        y1={148}
        x2={272}
        y2={148}
        color={ACCENT}
        label="F₁₂"
        fontSize={14}
        labelOffset={18}
      />
      <Arrow
        x1={308}
        y1={118}
        x2={372}
        y2={118}
        color={ACCENT}
        label="F₂₃"
        fontSize={14}
        labelOffset={18}
      />
      {/* a indicator — kept top-right, away from m₃'s top edge. */}
      <Arrow
        x1={540}
        y1={140}
        x2={630}
        y2={140}
        color={INK_FAINT}
        width={2}
        label="a"
        fontSize={14}
        dashed
        labelOffset={18}
      />
      <CaptionText x={360} y={340} size={14}>
        F_each = (mass behind that interface) × a
      </CaptionText>
    </DiagramFrame>
  );
}

/** Hook diagram — two scenes (rest vs motion) connected by a question mark. */
export function HookMotionDiagram() {
  return (
    <DiagramFrame width={720} height={420} ariaLabel="Why do things move the way they move?">
      {/* TOP — at rest */}
      <Ground x1={70} x2={300} y={130} />
      <Block x={155} y={88} w={60} h={42} label="m" fontSize={14} />
      <CaptionText x={185} y={170} size={14}>
        at rest
      </CaptionText>

      {/* BOTTOM — in motion. Block x ∈ [488, 548]; v arrow starts 4 right. */}
      <Ground x1={420} x2={650} y={290} />
      <Block x={488} y={245} w={60} h={45} label="m" fontSize={14} />
      <Arrow
        x1={552}
        y1={268}
        x2={640}
        y2={268}
        color={INK_MUTED}
        width={2}
        label="v"
        fontSize={15}
        dashed
        labelOffset={18}
      />
      {/* Trailing motion lines */}
      <line x1={482} y1={258} x2={460} y2={258} stroke={INK_FAINT} strokeWidth={1} />
      <line x1={482} y1={272} x2={450} y2={272} stroke={INK_FAINT} strokeWidth={1} />
      <line x1={482} y1={283} x2={460} y2={283} stroke={INK_FAINT} strokeWidth={1} />
      <CaptionText x={518} y={330} size={14}>
        in motion
      </CaptionText>

      {/* Big italic ? in the middle */}
      <text
        x={360}
        y={250}
        fontFamily={FONT_DISPLAY}
        fontSize="140"
        fontStyle="italic"
        fontWeight="500"
        fill={ACCENT}
        textAnchor="middle"
        opacity={0.85}
      >
        ?
      </text>

      <CaptionText x={360} y={380} size={16}>
        what makes the difference?
      </CaptionText>
    </DiagramFrame>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
 *  Misconception diagrams — wrong/right comparative pairs
 * ═══════════════════════════════════════════════════════════════════════ */

const MISC_DIVIDER = (
  <line
    x1={360}
    y1={40}
    x2={360}
    y2={380}
    stroke={INK_MUTED}
    strokeWidth={1.2}
    strokeDasharray="6 6"
  />
);

/** misc-moving-needs-force: puck on ice. */
export function MovingNeedsForceMiscDiagram() {
  return (
    <DiagramFrame
      width={720}
      height={420}
      ariaLabel="Moving objects need a constant force — wrong vs right"
    >
      {MISC_DIVIDER}
      {/* LEFT — wrong. Block x ∈ [140, 210]; arrow starts 4 right. */}
      <MonoText x={180} y={60} size={13} color={'var(--error)'}>
        WRONG
      </MonoText>
      <Ground x1={50} x2={330} y={250} />
      <Block x={140} y={190} w={70} h={60} label="m" fontSize={15} />
      <Arrow
        x1={214}
        y1={220}
        x2={310}
        y2={220}
        color="var(--error)"
        label="F (?)"
        fontSize={15}
        labelOffset={4}
        labelPerpOffset={-20}
      />
      {/* Strike-through — a single firm diagonal across the arrow shaft,
          well clear of the label past the arrowhead. */}
      <line x1={220} y1={236} x2={300} y2={204} stroke="var(--error)" strokeWidth={2.5} />
      <CaptionText x={180} y={295} size={14} color={'var(--error)'}>
        a forward force is needed
      </CaptionText>

      {/* RIGHT — correct. Block x ∈ [490, 560]; v arrow starts 4 right. */}
      <MonoText x={540} y={60} size={13} color={SUCCESS}>
        RIGHT
      </MonoText>
      <Ground x1={400} x2={680} y={250} />
      <Block x={490} y={190} w={70} h={60} label="m" fontSize={15} />
      <Arrow
        x1={564}
        y1={220}
        x2={648}
        y2={220}
        color={INK_MUTED}
        dashed
        label="v"
        fontSize={15}
        labelOffset={18}
      />
      <CaptionText x={540} y={295} size={14} color={INK_MUTED}>
        ΣF = 0 · v stays constant
      </CaptionText>
    </DiagramFrame>
  );
}

/** misc-action-reaction-cancel: two bodies, force on B drawn on B, etc.
 *
 *  Blocks A (x ∈ [170, 260]) and B (x ∈ [460, 550]) sit on either side of
 *  the page. The two forces are drawn in the gap between the blocks, each
 *  arriving 4 units from the recipient body's edge to indicate where the
 *  force ACTS. Labels offset perp to avoid stacking. */
export function ActionReactionCancelMiscDiagram() {
  return (
    <DiagramFrame width={720} height={400} ariaLabel="Action-reaction acts on different bodies">
      <Ground x1={60} x2={660} y={300} />
      <Block x={170} y={210} w={90} h={90} label="A" fontSize={20} />
      <Block x={460} y={210} w={90} h={90} label="B" fontSize={20} />
      {/* Force from A on B: arrow ends 4 outside B's left edge. Label
          pulled back along the shaft and lifted 26 units to sit in the
          gap above the arrow, well clear of either block. */}
      <Arrow
        x1={264}
        y1={238}
        x2={456}
        y2={238}
        color={ACCENT}
        label="F_AB on B"
        fontSize={14}
        labelOffset={-96}
        labelPerpOffset={-26}
      />
      {/* Force from B on A: label below the shaft, in the lower gap. */}
      <Arrow
        x1={456}
        y1={278}
        x2={264}
        y2={278}
        color={INFO}
        label="F_BA on A"
        fontSize={14}
        labelOffset={-96}
        labelPerpOffset={-26}
      />
      <CaptionText x={360} y={365} size={15}>
        {'on different bodies — they don’t cancel anything'}
      </CaptionText>
    </DiagramFrame>
  );
}

/** misc-N-equals-mg: flat (N=mg) vs incline (N=mg cos θ). */
export function NormalEqualsMgMiscDiagram() {
  return (
    <DiagramFrame width={720} height={420} ariaLabel="Normal force flat vs incline">
      {MISC_DIVIDER}
      {/* Flat — block y ∈ [190, 250]. */}
      <MonoText x={180} y={60} size={13} color={SUCCESS}>
        FLAT
      </MonoText>
      <Ground x1={50} x2={330} y={250} />
      <Block x={140} y={190} w={80} h={60} label="m" fontSize={15} />
      <Arrow x1={180} y1={254} x2={180} y2={328} color={ACCENT} label="W" />
      <Arrow x1={180} y1={186} x2={180} y2={94} color={INK} label="N" />
      <CaptionText x={180} y={365} size={15}>
        N = mg
      </CaptionText>

      {/* Incline — block 60, rotated -30°, centered ≈ (525, 220). */}
      <MonoText x={540} y={60} size={13} color={SUCCESS}>
        INCLINE
      </MonoText>
      <BlockOnIncline baseX={400} baseY={290} length={260} angleDeg={30} blockSize={60} />
      <Arrow x1={525} y1={220 + 40} x2={525} y2={220 + 40 + 78} color={ACCENT} label="W" />
      <Arrow
        x1={525 - 34 * Math.sin(Math.PI / 6)}
        y1={220 - 34 * Math.cos(Math.PI / 6)}
        x2={525 - (34 + 80) * Math.sin(Math.PI / 6)}
        y2={220 - (34 + 80) * Math.cos(Math.PI / 6)}
        color={INK}
        label="N"
      />
      <CaptionText x={540} y={365} size={15}>
        N = mg cos θ &lt; mg
      </CaptionText>
    </DiagramFrame>
  );
}

/** misc-friction-opposes-force: block pushed at angle, friction along surface.
 *
 *  Block x ∈ [295, 395], y ∈ [200, 260].
 *  - F arrow tip stops 4 units outside the block's left edge (x=291).
 *  - Friction arrow tail starts 4 units left of the block's left edge.
 *  - Motion v arrow starts 4 right of block's right edge. */
export function FrictionOpposesMotionMiscDiagram() {
  return (
    <DiagramFrame ariaLabel="Friction opposes motion not applied force">
      <Ground x1={60} x2={660} y={260} />
      <Block x={295} y={200} w={100} h={60} label="m" fontSize={16} />
      {/* Applied F at angle, tip 4 outside block-left at y=228. */}
      <Arrow x1={210} y1={170} x2={291} y2={224} color={INFO} label="F" labelOffset={22} />
      {/* Friction along surface, starting 4 left of block. */}
      <Arrow x1={291} y1={244} x2={185} y2={244} color={WARNING} label="fₖ" labelOffset={22} />
      {/* Motion arrow */}
      <Arrow
        x1={399}
        y1={196}
        x2={510}
        y2={196}
        color={INK_MUTED}
        dashed
        width={2}
        label="v"
        labelOffset={18}
      />
      <CaptionText x={360} y={340} size={15}>
        friction is along the surface, opposite v — not opposite F
      </CaptionText>
    </DiagramFrame>
  );
}

/** misc-rest-no-forces: book on table — forces ARE present, they balance. */
export function RestHasForcesMiscDiagram() {
  return (
    <DiagramFrame ariaLabel="At rest does not mean no forces">
      <line x1={120} y1={250} x2={600} y2={250} stroke={INK} strokeWidth={2} />
      <line x1={160} y1={250} x2={160} y2={330} stroke={INK} strokeWidth={2} />
      <line x1={560} y1={250} x2={560} y2={330} stroke={INK} strokeWidth={2} />
      <Ground x1={80} x2={640} y={330} />
      <rect
        x={290}
        y={210}
        width={140}
        height={40}
        fill={PAPER_RAISED}
        stroke={INK}
        strokeWidth={1.8}
        rx={2}
      />
      <MonoText x={360} y={235} size={14} color={INK_MUTED}>
        book
      </MonoText>
      {/* Book y ∈ [210, 250]; arrows start 4 units past edges. */}
      <Arrow x1={360} y1={254} x2={360} y2={350} color={ACCENT} label="W" />
      <Arrow x1={360} y1={206} x2={360} y2={110} color={INK} label="N" />
      <CaptionText x={360} y={395} size={16} color={SUCCESS}>
        ΣF = 0 · forces present, balanced
      </CaptionText>
    </DiagramFrame>
  );
}

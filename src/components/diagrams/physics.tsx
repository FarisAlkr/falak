import type { ReactNode } from 'react';

const ACCENT = 'var(--accent)';
const INK = 'var(--ink)';
const INK_MUTED = 'var(--ink-muted)';
const INFO = 'var(--info)';
const WARNING = 'var(--warning)';
const SUCCESS = 'var(--success)';
const PAPER_RAISED = 'var(--paper-raised)';
const BORDER = 'var(--border)';

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

interface ArrowProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  width?: number;
  label?: string;
  labelOffset?: number;
  dashed?: boolean;
}

export function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = INK,
  width = 2.5,
  label,
  labelOffset = 14,
  dashed,
}: ArrowProps) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len < 0.5) return null;
  const nx = dx / len;
  const ny = dy / len;
  const headLen = 10;
  const headWidth = 5.5;
  const baseX = x2 - nx * headLen;
  const baseY = y2 - ny * headLen;
  const perpX = -ny;
  const perpY = nx;
  const lx = baseX + perpX * headWidth;
  const ly = baseY + perpY * headWidth;
  const rx = baseX - perpX * headWidth;
  const ry = baseY - perpY * headWidth;

  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={baseX}
        y2={baseY}
        stroke={color}
        strokeWidth={width}
        strokeDasharray={dashed ? '5 4' : undefined}
        strokeLinecap="round"
      />
      <polygon points={`${x2},${y2} ${lx},${ly} ${rx},${ry}`} fill={color} />
      {label && (
        <text
          x={x2 + nx * labelOffset}
          y={y2 + ny * labelOffset + 4}
          fontFamily="monospace"
          fontSize="14"
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
}

export function Block({
  x,
  y,
  w = 70,
  h = 50,
  label,
  fill = PAPER_RAISED,
  rotate = 0,
}: BlockProps) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  return (
    <g transform={rotate ? `rotate(${rotate} ${cx} ${cy})` : undefined}>
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke={INK} strokeWidth={1.5} rx={2} />
      {label && (
        <text
          x={cx}
          y={cy + 4}
          fontFamily="monospace"
          fontSize="13"
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

export function Ground({ x1, x2, y, hatchAbove = false }: GroundProps) {
  const id = `hatch-${x1}-${y}`;
  const dir = hatchAbove ? -1 : 1;
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={INK_MUTED} strokeWidth={1.5} />
      <pattern id={id} patternUnits="userSpaceOnUse" width="8" height="8">
        <path
          d={`M0,${dir > 0 ? 8 : 0} L8,${dir > 0 ? 0 : 8}`}
          stroke={INK_MUTED}
          strokeWidth="0.6"
        />
      </pattern>
      <rect x={x1} y={hatchAbove ? y - 8 : y} width={x2 - x1} height={8} fill={`url(#${id})`} />
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
  baseX = 80,
  baseY = 240,
  length = 280,
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
        strokeWidth={1.5}
      />
      <Ground x1={baseX} x2={topX} y={baseY} />
      {showAngleArc && (
        <>
          <path
            d={`M ${topX - 40},${baseY} A 40 40 0 0 0 ${
              topX - 40 * Math.cos(rad)
            },${baseY - 40 * Math.sin(rad)}`}
            fill="none"
            stroke={INK_MUTED}
            strokeWidth={1}
          />
          <text x={topX - 28} y={baseY - 12} fontFamily="monospace" fontSize="12" fill={INK_MUTED}>
            θ={ang}°
          </text>
        </>
      )}
    </g>
  );
}

/** Block on an incline — returns block center + perpendicular axes for force placement */
export function BlockOnIncline({
  baseX = 80,
  baseY = 240,
  length = 280,
  angleDeg = 30,
  blockSize = 50,
  position = 0.5,
}: InclineProps & { blockSize?: number; position?: number }) {
  const rad = (angleDeg * Math.PI) / 180;
  // Position along the incline from base
  const px = baseX + length * (1 - position);
  const py = baseY - length * (1 - position) * Math.tan(rad);
  // Block sits on the incline surface — perpendicular offset by blockSize/2
  const perpX = Math.sin(rad) * (blockSize / 2);
  const perpY = -Math.cos(rad) * (blockSize / 2);
  const cx = px + perpX;
  const cy = py + perpY;
  return (
    <g>
      <Incline baseX={baseX} baseY={baseY} length={length} angleDeg={angleDeg} />
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

export function Pulley({ cx, cy, r = 22 }: PulleyProps) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={PAPER_RAISED} stroke={INK} strokeWidth={1.5} />
      <circle cx={cx} cy={cy} r={r * 0.4} fill={INK_MUTED} />
      <circle cx={cx} cy={cy} r={2} fill={INK} />
    </g>
  );
}

interface PersonProps {
  x: number;
  y: number;
  scale?: number;
  flipped?: boolean;
}

/** Stick figure for "person pushing a wall" type illustrations */
export function Person({ x, y, scale = 1, flipped = false }: PersonProps) {
  const s = scale;
  const fx = flipped ? -1 : 1;
  return (
    <g transform={`translate(${x},${y})`}>
      <circle cx={0} cy={-30 * s} r={8 * s} fill="none" stroke={INK} strokeWidth={1.5} />
      <line x1={0} y1={-22 * s} x2={0} y2={10 * s} stroke={INK} strokeWidth={1.5} />
      <line x1={0} y1={-12 * s} x2={fx * 14 * s} y2={-2 * s} stroke={INK} strokeWidth={1.5} />
      <line x1={0} y1={-12 * s} x2={-fx * 12 * s} y2={2 * s} stroke={INK} strokeWidth={1.5} />
      <line x1={0} y1={10 * s} x2={fx * 10 * s} y2={28 * s} stroke={INK} strokeWidth={1.5} />
      <line x1={0} y1={10 * s} x2={-fx * 8 * s} y2={28 * s} stroke={INK} strokeWidth={1.5} />
    </g>
  );
}

interface FrameProps {
  width?: number;
  height?: number;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

/** Standard SVG frame for slide diagrams.
 *  Sizes by width — fills the parent up to a comfortable max, height is
 *  auto-computed from viewBox aspect ratio. Robust regardless of whether
 *  the parent has an explicit height (an earlier `h-full` default
 *  collapsed to 0 in flex contexts where no ancestor declared a height). */
export function DiagramFrame({
  width = 480,
  height = 280,
  children,
  className = 'h-auto w-full max-w-md',
  ariaLabel,
}: FrameProps) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
    >
      {children}
    </svg>
  );
}

/** Two arrows tip-to-tail with the resultant — the head-to-tail visualization */
export function HeadToTailDiagram() {
  return (
    <DiagramFrame ariaLabel="Vector addition head-to-tail">
      <Arrow x1={60} y1={200} x2={220} y2={200} color={INFO} label="F₁" />
      <Arrow x1={220} y1={200} x2={300} y2={100} color={INFO} label="F₂" />
      <Arrow x1={60} y1={200} x2={300} y2={100} color={ACCENT} width={3} dashed label="ΣF" />
      <circle cx={60} cy={200} r={3} fill={INK} />
    </DiagramFrame>
  );
}

/** Box with weight and normal — for first-pass FBD intro */
export function BoxOnGroundFBD({
  withApplied = false,
  withFriction = false,
}: {
  withApplied?: boolean;
  withFriction?: boolean;
}) {
  return (
    <DiagramFrame ariaLabel="Free body on ground">
      <Ground x1={60} x2={420} y={210} />
      <Block x={210} y={150} w={60} h={50} label="m" />
      <Arrow x1={240} y1={175} x2={240} y2={250} color={ACCENT} label="W" />
      <Arrow x1={240} y1={150} x2={240} y2={80} color={INK} label="N" />
      {withApplied && <Arrow x1={270} y1={175} x2={350} y2={175} color={INFO} label="F" />}
      {withFriction && <Arrow x1={210} y1={175} x2={140} y2={175} color={WARNING} label="f" />}
    </DiagramFrame>
  );
}

/** Newton's 3rd law: two people pushing each other */
export function ActionReactionDiagram() {
  return (
    <DiagramFrame ariaLabel="Action reaction pair">
      <Ground x1={40} x2={440} y={220} />
      <Person x={130} y={220} />
      <Person x={350} y={220} flipped />
      <Arrow x1={150} y1={195} x2={220} y2={195} color={ACCENT} label="F_AB" />
      <Arrow x1={330} y1={210} x2={260} y2={210} color={INFO} label="F_BA" />
      <text
        x={240}
        y={250}
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="11"
        fill={INK_MUTED}
      >
        F_AB = − F_BA
      </text>
    </DiagramFrame>
  );
}

/** Block on incline with all four classical forces */
export function InclineFullFBD({ angleDeg = 30 }: { angleDeg?: number }) {
  return (
    <DiagramFrame width={480} height={300} ariaLabel="Block on incline FBD">
      <BlockOnIncline angleDeg={angleDeg} />
      {/* Approximate force positions on the block center */}
      <Arrow x1={244} y1={185} x2={244} y2={260} color={ACCENT} label="W" />
      <Arrow
        x1={244}
        y1={170}
        x2={244 - 60 * Math.sin((angleDeg * Math.PI) / 180)}
        y2={170 - 60 * Math.cos((angleDeg * Math.PI) / 180)}
        color={INK}
        label="N"
      />
      <Arrow
        x1={244}
        y1={170}
        x2={244 + 50 * Math.cos((angleDeg * Math.PI) / 180)}
        y2={170 + 50 * Math.sin((angleDeg * Math.PI) / 180)}
        color={WARNING}
        label="f"
      />
    </DiagramFrame>
  );
}

/** Equal force, two different masses → different accelerations */
export function MassComparisonDiagram() {
  return (
    <DiagramFrame width={480} height={240} ariaLabel="Same force different masses">
      <Block x={80} y={80} w={50} h={50} label="m" />
      <Arrow x1={130} y1={105} x2={210} y2={105} color={INFO} label="F" />
      <Arrow x1={130} y1={140} x2={250} y2={140} color={ACCENT} label="a" dashed />
      <Block x={300} y={70} w={90} h={70} label="3m" />
      <Arrow x1={390} y1={105} x2={460} y2={105} color={INFO} label="F" />
      <Arrow x1={390} y1={150} x2={420} y2={150} color={ACCENT} label="a/3" dashed />
    </DiagramFrame>
  );
}

/** Atwood machine */
export function AtwoodDiagram() {
  return (
    <DiagramFrame width={400} height={280} ariaLabel="Atwood machine">
      <line x1={200} y1={20} x2={200} y2={50} stroke={INK} strokeWidth={2} />
      <line x1={170} y1={20} x2={230} y2={20} stroke={INK} strokeWidth={2} />
      <Pulley cx={200} cy={70} />
      <line x1={170} y1={70} x2={170} y2={170} stroke={INK} strokeWidth={1.5} />
      <line x1={230} y1={70} x2={230} y2={130} stroke={INK} strokeWidth={1.5} />
      <Block x={140} y={170} w={60} h={50} label="m₁" />
      <Block x={200} y={130} w={60} h={50} label="m₂" />
      <Arrow x1={170} y1={120} x2={170} y2={90} color={SUCCESS} label="T" />
      <Arrow x1={230} y1={100} x2={230} y2={80} color={SUCCESS} label="T" />
    </DiagramFrame>
  );
}

/** Spring-pulled box */
export function HockeyPuckDiagram() {
  return (
    <DiagramFrame width={480} height={200} ariaLabel="Frictionless puck">
      <Ground x1={40} x2={440} y={160} />
      <ellipse
        cx={240}
        cy={150}
        rx={26}
        ry={8}
        fill={PAPER_RAISED}
        stroke={INK}
        strokeWidth={1.5}
      />
      <Arrow x1={266} y1={150} x2={360} y2={150} color={ACCENT} label="v" dashed />
      <text
        x={240}
        y={195}
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="11"
        fill={INK_MUTED}
      >
        Σ F = 0 → v = constant
      </text>
    </DiagramFrame>
  );
}

/** Static vs kinetic friction visual */
export function FrictionRegimesDiagram() {
  return (
    <DiagramFrame width={480} height={260} ariaLabel="Friction regimes">
      <Ground x1={40} x2={440} y={150} />
      <Block x={120} y={100} w={50} h={50} label="m" />
      <Arrow x1={170} y1={125} x2={230} y2={125} color={INFO} label="F" />
      <Arrow x1={120} y1={125} x2={70} y2={125} color={WARNING} label="fₛ" />
      <text
        x={150}
        y={200}
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="11"
        fill={INK_MUTED}
      >
        Static: fₛ ≤ μₛN
      </text>

      <Block x={300} y={100} w={50} h={50} label="m" />
      <Arrow x1={350} y1={125} x2={420} y2={125} color={INFO} label="F" dashed />
      <Arrow x1={300} y1={125} x2={245} y2={125} color={WARNING} label="fₖ" />
      <Arrow x1={350} y1={170} x2={420} y2={170} color={ACCENT} label="v" dashed />
      <text
        x={345}
        y={210}
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="11"
        fill={INK_MUTED}
      >
        Kinetic: fₖ = μₖN
      </text>
    </DiagramFrame>
  );
}

/** Tension on a rope */
export function TensionDiagram() {
  return (
    <DiagramFrame width={460} height={200} ariaLabel="Tension along a rope">
      <line x1={60} y1={100} x2={400} y2={100} stroke={INK} strokeWidth={2} />
      <Block x={400} y={75} w={50} h={50} label="m" />
      <Arrow x1={60} y1={100} x2={20} y2={100} color={SUCCESS} label="T" />
      <Arrow x1={400} y1={100} x2={440} y2={100} color={SUCCESS} label="T" />
      <text
        x={230}
        y={140}
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="11"
        fill={INK_MUTED}
      >
        Same tension everywhere along the rope
      </text>
    </DiagramFrame>
  );
}

/** Weight: gravity acts on an object */
export function WeightDiagram() {
  return (
    <DiagramFrame width={400} height={240} ariaLabel="Weight">
      <Block x={170} y={70} w={60} h={50} label="m" />
      <Arrow x1={200} y1={120} x2={200} y2={210} color={ACCENT} label="W=mg" width={3} />
      <text
        x={200}
        y={232}
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="11"
        fill={INK_MUTED}
      >
        Always toward Earth&rsquo;s center
      </text>
    </DiagramFrame>
  );
}

/** Normal flat vs incline comparison */
export function NormalCompareDiagram() {
  return (
    <DiagramFrame width={480} height={260} ariaLabel="Normal flat vs incline">
      <Ground x1={40} x2={220} y={200} />
      <Block x={100} y={150} w={50} h={50} label="m" />
      <Arrow x1={125} y1={175} x2={125} y2={235} color={ACCENT} label="W" />
      <Arrow x1={125} y1={150} x2={125} y2={90} color={INK} label="N" />
      <text
        x={130}
        y={250}
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="11"
        fill={INK_MUTED}
      >
        N = mg
      </text>

      <g transform="translate(220 0)">
        <Incline baseX={20} baseY={200} length={210} angleDeg={30} showAngleArc={false} />
        <BlockOnIncline baseX={20} baseY={200} length={210} angleDeg={30} />
        <text
          x={140}
          y={250}
          textAnchor="middle"
          fontFamily="monospace"
          fontSize="11"
          fill={INK_MUTED}
        >
          N = mg cos θ
        </text>
      </g>
    </DiagramFrame>
  );
}

/** Σ Symbol visual — large sigma with arrows feeding in */
export function SigmaSymbolDiagram() {
  return (
    <DiagramFrame width={400} height={240} ariaLabel="Sigma sum of forces">
      <text
        x={200}
        y={140}
        textAnchor="middle"
        fontFamily="serif"
        fontSize="120"
        fontWeight="600"
        fill={ACCENT}
      >
        Σ
      </text>
      <Arrow x1={60} y1={120} x2={150} y2={120} color={INK} label="F₁" />
      <Arrow x1={250} y1={80} x2={340} y2={80} color={INK} label="F₂" />
      <Arrow x1={250} y1={160} x2={340} y2={160} color={INK} label="F₃" />
      <text
        x={200}
        y={210}
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="13"
        fill={INK_MUTED}
      >
        Σ F = F₁ + F₂ + F₃ + ...
      </text>
    </DiagramFrame>
  );
}

/** Book on table (1st law equilibrium) */
export function BookOnTableDiagram() {
  return (
    <DiagramFrame width={400} height={240} ariaLabel="Book on table at rest">
      <line x1={80} y1={180} x2={320} y2={180} stroke={INK} strokeWidth={2} />
      <line x1={100} y1={180} x2={100} y2={220} stroke={INK} strokeWidth={2} />
      <line x1={300} y1={180} x2={300} y2={220} stroke={INK} strokeWidth={2} />
      <rect
        x={170}
        y={150}
        width={80}
        height={28}
        fill={PAPER_RAISED}
        stroke={INK}
        strokeWidth={1.5}
        rx={2}
      />
      <Arrow x1={210} y1={170} x2={210} y2={130} color={INK} label="N" />
      <Arrow x1={210} y1={170} x2={210} y2={215} color={ACCENT} label="W" />
      <text
        x={210}
        y={235}
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="11"
        fill={INK_MUTED}
      >
        ΣF = 0 → at rest
      </text>
    </DiagramFrame>
  );
}

/** Swimming — 3rd law */
export function SwimmingDiagram() {
  return (
    <DiagramFrame width={460} height={200} ariaLabel="Swimming third law">
      <rect x={0} y={120} width={460} height={80} fill={INFO} opacity={0.1} />
      <Person x={200} y={150} scale={1.2} />
      <Arrow x1={210} y1={140} x2={300} y2={140} color={ACCENT} label="hand → water" />
      <Arrow x1={180} y1={170} x2={90} y2={170} color={INFO} label="water → hand" />
      <text
        x={230}
        y={195}
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="11"
        fill={INK_MUTED}
      >
        Push water back → water pushes you forward (= − force, on YOU)
      </text>
    </DiagramFrame>
  );
}

/** FBD steps */
export function FBDStepsDiagram({ step }: { step: 1 | 2 | 3 }) {
  return (
    <DiagramFrame width={400} height={240} ariaLabel={`FBD step ${step}`}>
      {step === 1 && (
        <>
          <Block x={150} y={90} w={100} h={70} label="object" />
          <text
            x={200}
            y={210}
            textAnchor="middle"
            fontFamily="monospace"
            fontSize="11"
            fill={INK_MUTED}
          >
            ١. اختر الجسم — انظر إليه فقط
          </text>
        </>
      )}
      {step === 2 && (
        <>
          <circle cx={200} cy={120} r={6} fill={INK} />
          <text
            x={200}
            y={210}
            textAnchor="middle"
            fontFamily="monospace"
            fontSize="11"
            fill={INK_MUTED}
          >
            ٢. مثّل الجسم بنقطة واحدة
          </text>
        </>
      )}
      {step === 3 && (
        <>
          <circle cx={200} cy={120} r={6} fill={INK} />
          <Arrow x1={200} y1={120} x2={200} y2={60} color={INK} label="N" />
          <Arrow x1={200} y1={120} x2={200} y2={195} color={ACCENT} label="W" />
          <Arrow x1={200} y1={120} x2={300} y2={120} color={INFO} label="F" />
          <Arrow x1={200} y1={120} x2={100} y2={120} color={WARNING} label="f" />
          <text
            x={200}
            y={225}
            textAnchor="middle"
            fontFamily="monospace"
            fontSize="11"
            fill={INK_MUTED}
          >
            ٣. ارسم سهماً لكلّ قوّة — وسمّه
          </text>
        </>
      )}
    </DiagramFrame>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
 * Diagrams added for the new Newton-I and Newton-III examples.
 * ═══════════════════════════════════════════════════════════════════════ */

/** Hanging-sign equilibrium: a mass suspended from two ropes meeting at the
 *  top hook, each at angle θ from vertical. Newton I in 2D. */
export function HangingSignDiagram({ angleDeg = 30 }: { angleDeg?: number }) {
  const theta = (angleDeg * Math.PI) / 180;
  const ropeLen = 110;
  const hookX = 240;
  const hookY = 70;
  const massX = hookX;
  const massY = hookY + ropeLen * Math.cos(theta);
  const leftAnchorX = hookX - ropeLen * Math.sin(theta);
  const rightAnchorX = hookX + ropeLen * Math.sin(theta);

  return (
    <DiagramFrame width={480} height={300} ariaLabel="Hanging sign in equilibrium">
      {/* Ceiling */}
      <Ground x1={leftAnchorX - 30} x2={rightAnchorX + 30} y={hookY} hatchAbove />
      {/* Two ropes */}
      <line x1={leftAnchorX} y1={hookY} x2={massX} y2={massY} stroke={INK} strokeWidth={1.8} />
      <line x1={rightAnchorX} y1={hookY} x2={massX} y2={massY} stroke={INK} strokeWidth={1.8} />
      {/* Sign block */}
      <Block x={massX - 35} y={massY} w={70} h={50} label="m" />
      {/* Tension arrows on the mass — along each rope, away from the mass */}
      <Arrow
        x1={massX}
        y1={massY}
        x2={massX - 60 * Math.sin(theta)}
        y2={massY - 60 * Math.cos(theta)}
        color={SUCCESS}
        label="T₁"
      />
      <Arrow
        x1={massX}
        y1={massY}
        x2={massX + 60 * Math.sin(theta)}
        y2={massY - 60 * Math.cos(theta)}
        color={SUCCESS}
        label="T₂"
      />
      {/* Weight */}
      <Arrow x1={massX} y1={massY + 50} x2={massX} y2={massY + 110} color={ACCENT} label="W = mg" />
      {/* Angle markers */}
      <text
        x={leftAnchorX + 24}
        y={hookY + 22}
        fontFamily="monospace"
        fontSize="13"
        fill={INK_MUTED}
      >
        θ
      </text>
      <text
        x={rightAnchorX - 32}
        y={hookY + 22}
        fontFamily="monospace"
        fontSize="13"
        fill={INK_MUTED}
      >
        θ
      </text>
    </DiagramFrame>
  );
}

/** Block on incline, pushed by a horizontal force F, with friction.
 *  Used by ex-incline-constant-velocity. Shows W, N, F, f_k. */
export function InclineHorizontalForceFBD({ angleDeg = 30 }: { angleDeg?: number }) {
  const sinT = Math.sin((angleDeg * Math.PI) / 180);
  const cosT = Math.cos((angleDeg * Math.PI) / 180);
  return (
    <DiagramFrame width={520} height={320} ariaLabel="Incline with horizontal applied force">
      <BlockOnIncline angleDeg={angleDeg} />
      {/* Block center is approximately (244, 170). Adjust per BlockOnIncline. */}
      {/* Weight straight down */}
      <Arrow x1={244} y1={185} x2={244} y2={275} color={ACCENT} label="W" />
      {/* Normal perpendicular to surface, away from slope */}
      <Arrow x1={244} y1={170} x2={244 - 70 * sinT} y2={170 - 70 * cosT} color={INK} label="N" />
      {/* Friction down the slope (opposing upward motion) */}
      <Arrow
        x1={244}
        y1={170}
        x2={244 - 60 * cosT}
        y2={170 + 60 * sinT}
        color={WARNING}
        label="f_k"
      />
      {/* Horizontal applied force, into the page direction */}
      <Arrow x1={185} y1={170} x2={244} y2={170} color={INFO} label="F" />
      <text
        x={260}
        y={310}
        fontFamily="monospace"
        fontSize="11"
        fill={INK_MUTED}
        textAnchor="middle"
      >
        ΣF = 0 (constant velocity)
      </text>
    </DiagramFrame>
  );
}

/** Two boxes in contact, force F pushes A which pushes B. Newton III pair. */
export function TwoBoxesContactDiagram() {
  return (
    <DiagramFrame width={520} height={260} ariaLabel="Two boxes in contact">
      <Ground x1={40} x2={480} y={200} />
      <Block x={170} y={140} w={70} h={60} label="A" />
      <Block x={240} y={130} w={90} h={70} label="B" />
      {/* Applied force F */}
      <Arrow x1={100} y1={170} x2={170} y2={170} color={INFO} label="F" />
      {/* Action-reaction pair at the interface */}
      <Arrow x1={232} y1={158} x2={262} y2={158} color={ACCENT} label="F_AB" labelOffset={18} />
      <Arrow x1={248} y1={184} x2={218} y2={184} color={ACCENT} label="F_BA" labelOffset={18} />
      <text
        x={260}
        y={240}
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="11"
        fill={INK_MUTED}
      >
        F_AB = − F_BA (Newton III)
      </text>
    </DiagramFrame>
  );
}

/** Three boxes in contact, force F pushes m₁; multi-pair Newton III. */
export function ThreeBoxesStackDiagram() {
  return (
    <DiagramFrame width={560} height={260} ariaLabel="Three boxes pushed together">
      <Ground x1={30} x2={530} y={210} />
      <Block x={140} y={170} w={50} h={40} label="m₁" />
      <Block x={190} y={155} w={70} h={55} label="m₂" />
      <Block x={260} y={135} w={100} h={75} label="m₃" />
      {/* Applied force */}
      <Arrow x1={80} y1={190} x2={140} y2={190} color={INFO} label="F" />
      {/* First contact pair */}
      <Arrow x1={184} y1={180} x2={208} y2={180} color={ACCENT} label="F₁₂" labelOffset={14} />
      {/* Second contact pair */}
      <Arrow x1={254} y1={170} x2={278} y2={170} color={ACCENT} label="F₂₃" labelOffset={14} />
      {/* a indicator */}
      <Arrow x1={400} y1={120} x2={460} y2={120} color={INK_MUTED} label="a" dashed width={1.6} />
    </DiagramFrame>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
 * Problem-specific example diagrams — replace the generic reuse for
 * `ex-two-forces-same-direction`, `ex-three-forces-1d`,
 * `ex-2d-perpendicular-forces`, and `ex-weight-of-book`.
 * ═══════════════════════════════════════════════════════════════════════ */

/** Two parallel forces (5 N + 3 N → 8 N). Specific to ex-two-forces-same-direction. */
export function TwoForcesParallelDiagram() {
  return (
    <DiagramFrame width={480} height={240} ariaLabel="Two parallel forces summing">
      <Block x={80} y={120} w={70} h={50} label="m" />
      <Arrow x1={150} y1={145} x2={230} y2={145} color={INFO} label="5 N" />
      <Arrow x1={150} y1={170} x2={198} y2={170} color={INFO} label="3 N" />
      {/* Resultant on a separate line below */}
      <line x1={80} y1={205} x2={80} y2={215} stroke={INK_MUTED} strokeWidth={0.8} />
      <line x1={208} y1={205} x2={208} y2={215} stroke={INK_MUTED} strokeWidth={0.8} />
      <Arrow x1={80} y1={210} x2={208} y2={210} color={ACCENT} width={3} label="ΣF = 8 N" />
    </DiagramFrame>
  );
}

/** Three 1-D forces with mixed signs (10 N right, 5 N right, 6 N left → 9 N right). */
export function ThreeForces1DDiagram() {
  return (
    <DiagramFrame width={520} height={260} ariaLabel="Three horizontal forces summed">
      <Block x={220} y={100} w={70} h={50} label="m" />
      <Arrow x1={290} y1={115} x2={400} y2={115} color={INFO} label="10 N" />
      <Arrow x1={290} y1={140} x2={345} y2={140} color={INFO} label="5 N" />
      <Arrow x1={220} y1={132} x2={155} y2={132} color={WARNING} label="6 N" />
      {/* Net force below */}
      <line x1={155} y1={195} x2={155} y2={205} stroke={INK_MUTED} strokeWidth={0.8} />
      <line x1={400} y1={195} x2={400} y2={205} stroke={INK_MUTED} strokeWidth={0.8} />
      <Arrow x1={250} y1={200} x2={400} y2={200} color={ACCENT} width={3} label="ΣF = +9 N" />
      <text x={260} y={235} fontFamily="monospace" fontSize="11" fill={INK_MUTED}>
        + right · − left
      </text>
    </DiagramFrame>
  );
}

/** Block on smooth surface, 8 N horizontal + 6 N vertical applied. */
export function TwoForcesPerpendicularDiagram() {
  return (
    <DiagramFrame width={480} height={280} ariaLabel="Two perpendicular forces">
      <Ground x1={60} x2={420} y={210} />
      <Block x={210} y={150} w={60} h={50} label="m=2 kg" />
      {/* Weight + normal (background, muted) */}
      <Arrow x1={240} y1={175} x2={240} y2={250} color={INK_MUTED} width={1.6} label="W" />
      <Arrow x1={240} y1={150} x2={240} y2={80} color={INK_MUTED} width={1.6} label="N" />
      {/* Applied forces emphasised */}
      <Arrow x1={270} y1={175} x2={360} y2={175} color={INFO} label="8 N" />
      <Arrow x1={250} y1={130} x2={250} y2={70} color={SUCCESS} label="6 N" />
    </DiagramFrame>
  );
}

/** Single book with weight arrow and "5 kg" label. ex-weight-of-book. */
export function BookWithWeightDiagram() {
  return (
    <DiagramFrame width={420} height={260} ariaLabel="Weight of a book">
      <Block x={170} y={90} w={80} h={56} label="5 kg" />
      <Arrow x1={210} y1={146} x2={210} y2={230} color={ACCENT} label="W = 49 N" />
      <Ground x1={60} x2={360} y={235} />
    </DiagramFrame>
  );
}

/** Anatomy-of-a-vector — magnitude bracket, direction label, unit annotation. */
export function ForceAnatomyDiagram() {
  return (
    <DiagramFrame width={480} height={220} ariaLabel="Anatomy of a force vector">
      <Arrow
        x1={70}
        y1={120}
        x2={350}
        y2={120}
        color={ACCENT}
        width={3}
        label="F"
        labelOffset={20}
      />
      {/* Magnitude bracket below */}
      <line x1={70} y1={155} x2={70} y2={165} stroke={INK_MUTED} strokeWidth={1} />
      <line x1={350} y1={155} x2={350} y2={165} stroke={INK_MUTED} strokeWidth={1} />
      <line x1={70} y1={160} x2={350} y2={160} stroke={INK_MUTED} strokeWidth={1} />
      <text
        x={210}
        y={185}
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="13"
        fill={INK_MUTED}
      >
        magnitude (N)
      </text>
      {/* Direction tag at the head */}
      <text x={365} y={105} fontFamily="monospace" fontSize="12" fill={INK_MUTED}>
        →
      </text>
      <text x={380} y={120} fontFamily="monospace" fontSize="11" fill={INK_MUTED}>
        direction
      </text>
      {/* Tail dot */}
      <circle cx={70} cy={120} r={3} fill={INK} />
    </DiagramFrame>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
 * Misconception diagrams — visualize the wrong/right pair so the student
 * sees the trap, not just reads it.
 * ═══════════════════════════════════════════════════════════════════════ */

/** misc-moving-needs-force: puck on frictionless ice. Wrong panel shows a
 *  "needed forward force" crossed out; right panel shows ΣF=0 still moving. */
export function MovingNeedsForceMiscDiagram() {
  return (
    <DiagramFrame
      width={520}
      height={220}
      ariaLabel="Moving objects need a constant force — wrong vs right"
    >
      {/* Divider */}
      <line
        x1={260}
        y1={20}
        x2={260}
        y2={200}
        stroke={INK_MUTED}
        strokeWidth={0.8}
        strokeDasharray="3 3"
      />
      {/* LEFT — wrong */}
      <text
        x={130}
        y={30}
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="11"
        fill="var(--error)"
      >
        WRONG
      </text>
      <Ground x1={30} x2={240} y={150} />
      <Block x={70} y={110} w={50} h={40} label="m" />
      {/* "needed" force, struck through */}
      <Arrow x1={120} y1={130} x2={195} y2={130} color="var(--error)" label="F (?)" />
      <line x1={115} y1={135} x2={205} y2={125} stroke="var(--error)" strokeWidth={2} />
      {/* RIGHT — correct */}
      <text x={400} y={30} textAnchor="middle" fontFamily="monospace" fontSize="11" fill={SUCCESS}>
        RIGHT
      </text>
      <Ground x1={290} x2={500} y={150} />
      <Block x={330} y={110} w={50} h={40} label="m" />
      <Arrow
        x1={385}
        y1={130}
        x2={460}
        y2={130}
        color={INK_MUTED}
        dashed
        label="v"
        labelOffset={14}
      />
      <text
        x={400}
        y={185}
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="11"
        fill={INK_MUTED}
      >
        ΣF = 0 · v = const
      </text>
    </DiagramFrame>
  );
}

/** misc-action-reaction-cancel: two bodies, each with the OTHER's force drawn
 *  on it. Caption emphasises "different bodies". */
export function ActionReactionCancelMiscDiagram() {
  return (
    <DiagramFrame width={520} height={220} ariaLabel="Action and reaction — on different bodies">
      <Ground x1={30} x2={490} y={170} />
      {/* Body A */}
      <Block x={120} y={110} w={60} h={60} label="A" />
      {/* Body B */}
      <Block x={340} y={110} w={60} h={60} label="B" />
      {/* Force from A on B (acts on B) */}
      <Arrow x1={200} y1={130} x2={335} y2={130} color={ACCENT} label="F_AB" />
      {/* Force from B on A (acts on A) */}
      <Arrow x1={320} y1={155} x2={185} y2={155} color={INFO} label="F_BA" />
      <text
        x={260}
        y={205}
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="11"
        fill={INK_MUTED}
      >
        on different bodies — they don&rsquo;t cancel anything
      </text>
    </DiagramFrame>
  );
}

/** misc-N-equals-mg: side-by-side flat (N=mg) vs incline (N=mg cosθ). */
export function NormalEqualsMgMiscDiagram() {
  return (
    <DiagramFrame width={520} height={240} ariaLabel="Normal force flat vs incline">
      <line
        x1={260}
        y1={20}
        x2={260}
        y2={220}
        stroke={INK_MUTED}
        strokeWidth={0.8}
        strokeDasharray="3 3"
      />
      {/* Flat surface */}
      <text x={130} y={28} textAnchor="middle" fontFamily="monospace" fontSize="11" fill={SUCCESS}>
        FLAT
      </text>
      <Ground x1={30} x2={240} y={170} />
      <Block x={100} y={130} w={60} h={40} label="m" />
      <Arrow x1={130} y1={150} x2={130} y2={210} color={ACCENT} label="W" />
      <Arrow x1={130} y1={130} x2={130} y2={70} color={INK} label="N" />
      <text
        x={130}
        y={232}
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="11"
        fill={INK_MUTED}
      >
        N = mg
      </text>
      {/* Incline */}
      <text x={400} y={28} textAnchor="middle" fontFamily="monospace" fontSize="11" fill={SUCCESS}>
        INCLINE
      </text>
      <BlockOnIncline baseX={290} baseY={195} length={170} angleDeg={30} blockSize={40} />
      <Arrow x1={400} y1={150} x2={400} y2={210} color={ACCENT} label="W" />
      <Arrow
        x1={400}
        y1={150}
        x2={400 - 50 * Math.sin(Math.PI / 6)}
        y2={150 - 50 * Math.cos(Math.PI / 6)}
        color={INK}
        label="N"
      />
      <text
        x={400}
        y={232}
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="11"
        fill={INK_MUTED}
      >
        N = mg cos θ &lt; mg
      </text>
    </DiagramFrame>
  );
}

/** misc-friction-opposes-force: block pushed at angle, friction along the
 *  surface (NOT opposite the applied force vector). */
export function FrictionOpposesMotionMiscDiagram() {
  return (
    <DiagramFrame width={500} height={240} ariaLabel="Friction opposes motion not applied force">
      <Ground x1={40} x2={460} y={180} />
      <Block x={210} y={140} w={60} h={40} label="m" />
      {/* Applied F at 30° below horizontal */}
      <Arrow x1={150} y1={120} x2={210} y2={155} color={INFO} label="F" />
      {/* Friction along surface, opposite motion (rightward push → friction left) */}
      <Arrow x1={210} y1={170} x2={140} y2={170} color={WARNING} label="f_k" />
      {/* Motion arrow */}
      <Arrow x1={290} y1={130} x2={350} y2={130} color={INK_MUTED} dashed width={1.4} label="v" />
      <text
        x={250}
        y={215}
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="11"
        fill={INK_MUTED}
      >
        friction is along the surface, opposite v — not opposite F
      </text>
    </DiagramFrame>
  );
}

/**
 * Hook diagram — visualizes the unit's opening question "why do things move
 * the way they move?". Two scenes: a stationary block (top) and a sliding
 * block with motion lines (bottom), connected by a large "?" mark.
 */
export function HookMotionDiagram() {
  return (
    <DiagramFrame width={520} height={300} ariaLabel="Why do things move the way they move?">
      {/* Top scene — at rest */}
      <Ground x1={40} x2={240} y={100} />
      <Block x={120} y={70} w={50} h={30} label="m" />
      <text
        x={140}
        y={140}
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="11"
        fill={INK_MUTED}
      >
        at rest
      </text>

      {/* Bottom scene — in motion */}
      <Ground x1={280} x2={500} y={200} />
      <Block x={360} y={170} w={50} h={30} label="m" />
      <Arrow x1={415} y1={185} x2={485} y2={185} color={INK_MUTED} dashed width={1.6} label="v" />
      {/* Motion lines trailing the block */}
      <line x1={350} y1={178} x2={335} y2={178} stroke={INK_MUTED} strokeWidth={0.8} />
      <line x1={350} y1={188} x2={330} y2={188} stroke={INK_MUTED} strokeWidth={0.8} />
      <line x1={350} y1={195} x2={335} y2={195} stroke={INK_MUTED} strokeWidth={0.8} />
      <text
        x={400}
        y={240}
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="11"
        fill={INK_MUTED}
      >
        in motion
      </text>

      {/* Big question mark connecting the two scenes */}
      <text
        x={250}
        y={170}
        textAnchor="middle"
        fontFamily="serif"
        fontSize="68"
        fill={ACCENT}
        fontStyle="italic"
        opacity="0.85"
      >
        ?
      </text>

      {/* Caption beneath */}
      <text
        x={260}
        y={285}
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="11"
        fill={INK_MUTED}
      >
        what makes the difference?
      </text>
    </DiagramFrame>
  );
}

/** misc-rest-no-forces: book on table — forces ARE present, they balance. */
export function RestHasForcesMiscDiagram() {
  return (
    <DiagramFrame width={420} height={240} ariaLabel="At rest does not mean no forces">
      <Ground x1={60} x2={360} y={180} />
      <Block x={170} y={130} w={80} h={50} label="book" />
      <Arrow x1={210} y1={155} x2={210} y2={225} color={ACCENT} label="W" />
      <Arrow x1={210} y1={130} x2={210} y2={60} color={INK} label="N" />
      <text x={210} y={215} textAnchor="middle" fontFamily="monospace" fontSize="11" fill={SUCCESS}>
        ΣF = 0 (forces present, they balance)
      </text>
    </DiagramFrame>
  );
}

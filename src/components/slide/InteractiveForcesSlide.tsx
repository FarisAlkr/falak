'use client';

import { useState } from 'react';
import { SlideFrame } from './SlideFrame';
import { InlineMath } from '@/components/math/Math';

interface ForceInput {
  id: string;
  label: string;
  hebrewLabel: string;
  color: string;
  defaultMag: number;
  defaultAngle: number;
}

const FORCES: ForceInput[] = [
  {
    id: 'F1',
    label: 'القوّة 1',
    hebrewLabel: 'כוח 1',
    color: 'var(--accent)',
    defaultMag: 8,
    defaultAngle: 0,
  },
  {
    id: 'F2',
    label: 'القوّة 2',
    hebrewLabel: 'כוח 2',
    color: 'var(--info)',
    defaultMag: 6,
    defaultAngle: 90,
  },
  {
    id: 'F3',
    label: 'القوّة 3 (الوزن)',
    hebrewLabel: 'כוח 3 (משקל)',
    color: 'var(--ink-muted)',
    defaultMag: 4,
    defaultAngle: 270,
  },
];

const VIEW = 360;
const CENTER = VIEW / 2;
const SCALE = 12; // pixels per Newton

function fmt(n: number): string {
  return n.toFixed(1);
}

function angleToXY(mag: number, angleDeg: number): { x: number; y: number } {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: mag * Math.cos(rad), y: -mag * Math.sin(rad) }; // SVG y inverted
}

export interface InteractiveForcesSlideProps {
  unitNumber?: string;
  slideNumber?: string;
}

export function InteractiveForcesSlide({ unitNumber, slideNumber }: InteractiveForcesSlideProps) {
  const [forces, setForces] = useState(
    FORCES.map((f) => ({ id: f.id, mag: f.defaultMag, angle: f.defaultAngle })),
  );
  const [mass, setMass] = useState(2);

  const components = forces.map((f, i) => {
    const meta = FORCES[i]!;
    const xy = angleToXY(f.mag, f.angle);
    return {
      ...f,
      ...meta,
      fx: f.mag * Math.cos((f.angle * Math.PI) / 180),
      fy: f.mag * Math.sin((f.angle * Math.PI) / 180),
      screenX: xy.x,
      screenY: xy.y,
    };
  });

  const FxNet = components.reduce((sum, c) => sum + c.fx, 0);
  const FyNet = components.reduce((sum, c) => sum + c.fy, 0);
  const FMag = Math.sqrt(FxNet * FxNet + FyNet * FyNet);
  const FAngle = Math.atan2(FyNet, FxNet) * (180 / Math.PI);
  const accel = mass > 0 ? FMag / mass : 0;
  const accelAngle = FAngle;

  const netScreen = angleToXY(FMag, FAngle);

  const updateMag = (i: number, mag: number) => {
    setForces((prev) => prev.map((f, j) => (i === j ? { ...f, mag } : f)));
  };
  const updateAngle = (i: number, angle: number) => {
    setForces((prev) => prev.map((f, j) => (i === j ? { ...f, angle } : f)));
  };

  return (
    <SlideFrame unitNumber={unitNumber} slideNumber={slideNumber}>
      <div className="flex h-full flex-col gap-3">
        <header className="space-y-1">
          <span dir="rtl" className="block font-hebrew text-sm uppercase tracking-meta text-accent">
            תרגול אינטראקטיבי
          </span>
          <h2
            dir="rtl"
            className="font-arabic text-xl font-semibold leading-tight text-ink md:text-3xl"
          >
            جرّب: حلّ القوى وحساب القوّة المحصّلة
          </h2>
          <p dir="rtl" className="font-arabic text-xs leading-relaxed text-ink-muted md:text-sm">
            عدّل المقدار والاتّجاه لكلّ قوّة، وراقب كيف تتغيّر القوّة المحصّلة والتسارع.
          </p>
        </header>

        <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-[auto,1fr]">
          {/* Visualization */}
          <ForceCanvas
            components={components}
            netX={netScreen.x}
            netY={netScreen.y}
            netMag={FMag}
          />

          {/* Controls + readouts */}
          <div className="flex flex-col gap-3">
            <div className="space-y-2 rounded-sm border border-border bg-paper-raised p-3">
              {components.map((c, i) => (
                <div key={c.id} className="grid grid-cols-[auto,1fr,auto] items-center gap-3">
                  <span
                    className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-meta"
                    style={{ color: c.color }}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: c.color }}
                      aria-hidden
                    />
                    {c.id}
                  </span>
                  <div className="flex flex-col gap-1">
                    <label className="flex items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-meta text-ink-muted">
                        |F| (N)
                      </span>
                      <input
                        type="range"
                        min={0}
                        max={20}
                        step={0.5}
                        value={c.mag}
                        onChange={(e) => updateMag(i, Number(e.target.value))}
                        className="flex-1 accent-accent"
                      />
                      <span className="w-8 text-right font-mono text-xs text-ink">
                        {fmt(c.mag)}
                      </span>
                    </label>
                    <label className="flex items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-meta text-ink-muted">
                        θ (°)
                      </span>
                      <input
                        type="range"
                        min={0}
                        max={359}
                        step={1}
                        value={c.angle}
                        onChange={(e) => updateAngle(i, Number(e.target.value))}
                        className="flex-1 accent-accent"
                      />
                      <span className="w-8 text-right font-mono text-xs text-ink">
                        {Math.round(c.angle)}°
                      </span>
                    </label>
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-[auto,1fr,auto] items-center gap-3 border-t border-border pt-2">
                <span className="font-mono text-[11px] uppercase tracking-meta text-ink-muted">
                  m (kg)
                </span>
                <input
                  type="range"
                  min={0.5}
                  max={10}
                  step={0.5}
                  value={mass}
                  onChange={(e) => setMass(Number(e.target.value))}
                  className="flex-1 accent-accent"
                />
                <span className="w-8 text-right font-mono text-xs text-ink">{fmt(mass)}</span>
              </div>
            </div>

            {/* Live readouts */}
            <div className="grid grid-cols-2 gap-2 rounded-sm border border-border bg-paper p-3 text-center font-mono text-xs">
              <Readout label="F_x net" value={`${fmt(FxNet)} N`} />
              <Readout label="F_y net" value={`${fmt(FyNet)} N`} />
              <Readout label="|F_net|" value={`${fmt(FMag)} N`} highlight />
              <Readout label="θ_net" value={`${fmt(FAngle)}°`} />
              <div className="col-span-2 border-t border-border pt-2">
                <Readout
                  label="a = |F_net| / m"
                  value={`${fmt(accel)} m/s²  @  ${fmt(accelAngle)}°`}
                  highlight
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

interface ForceCanvasProps {
  components: { id: string; color: string; screenX: number; screenY: number; mag: number }[];
  netX: number;
  netY: number;
  netMag: number;
}

function ForceCanvas({ components, netX, netY, netMag }: ForceCanvasProps) {
  return (
    <svg
      viewBox={`0 0 ${VIEW} ${VIEW}`}
      className="aspect-square h-full max-h-72 w-auto rounded-sm border border-border bg-paper-raised"
      aria-label="Force diagram"
    >
      {/* Grid */}
      <line x1={0} y1={CENTER} x2={VIEW} y2={CENTER} stroke="var(--border)" strokeWidth={0.5} />
      <line x1={CENTER} y1={0} x2={CENTER} y2={VIEW} stroke="var(--border)" strokeWidth={0.5} />
      {[1, 2, 3, 4, 5].map((r) => (
        <circle
          key={r}
          cx={CENTER}
          cy={CENTER}
          r={r * 4 * SCALE}
          fill="none"
          stroke="var(--border)"
          strokeWidth={0.4}
          opacity={0.4}
        />
      ))}

      {/* Input force arrows */}
      {components.map((c) => (
        <ForceArrow
          key={c.id}
          x2={CENTER + c.screenX * SCALE}
          y2={CENTER + c.screenY * SCALE}
          color={c.color}
          label={c.id}
          width={2.5}
        />
      ))}

      {/* Net force arrow (drawn last, on top, dashed) */}
      {netMag > 0.1 && (
        <ForceArrow
          x2={CENTER + netX * SCALE}
          y2={CENTER + netY * SCALE}
          color="var(--ink)"
          label="F_net"
          width={3}
          dashed
        />
      )}

      {/* Center dot */}
      <circle cx={CENTER} cy={CENTER} r={3} fill="var(--ink)" />
    </svg>
  );
}

interface ForceArrowProps {
  x2: number;
  y2: number;
  color: string;
  label: string;
  width: number;
  dashed?: boolean;
}

function ForceArrow({ x2, y2, color, label, width, dashed }: ForceArrowProps) {
  const dx = x2 - CENTER;
  const dy = y2 - CENTER;
  const len = Math.hypot(dx, dy);
  if (len < 1) return null;
  // Arrowhead at the tip
  const nx = dx / len;
  const ny = dy / len;
  const headLen = 10;
  const headWidth = 6;
  const tipX = x2;
  const tipY = y2;
  const baseX = tipX - nx * headLen;
  const baseY = tipY - ny * headLen;
  const perpX = -ny;
  const perpY = nx;
  const leftX = baseX + perpX * headWidth;
  const leftY = baseY + perpY * headWidth;
  const rightX = baseX - perpX * headWidth;
  const rightY = baseY - perpY * headWidth;

  return (
    <g>
      <line
        x1={CENTER}
        y1={CENTER}
        x2={baseX}
        y2={baseY}
        stroke={color}
        strokeWidth={width}
        strokeDasharray={dashed ? '4 3' : undefined}
        strokeLinecap="round"
      />
      <polygon points={`${tipX},${tipY} ${leftX},${leftY} ${rightX},${rightY}`} fill={color} />
      <text
        x={tipX + nx * 16}
        y={tipY + ny * 16 + 4}
        fontFamily="monospace"
        fontSize="11"
        fill={color}
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  );
}

function Readout({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="space-y-1">
      <div className="text-[10px] uppercase tracking-meta text-ink-faint" dir="ltr">
        <InlineMath>{label}</InlineMath>
      </div>
      <div
        className={highlight ? 'font-mono text-base text-accent' : 'font-mono text-sm text-ink'}
        dir="ltr"
      >
        {value}
      </div>
    </div>
  );
}

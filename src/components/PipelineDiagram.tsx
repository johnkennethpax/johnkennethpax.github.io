// Excalidraw-style (hand-drawn) black-and-white block diagram of the thesis signal pipeline.
// Strokes are jittered with a seeded PRNG so the sketch looks hand-drawn but renders identically every time.

import { thesis } from '../data/profile';

interface Block {
  title: string;
  sub: string;
  emphasis?: boolean;
}

const BLOCKS: Block[] = thesis.signalFlow;

function prng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

type Rand = () => number;
const j = (r: Rand, amt: number) => (r() - 0.5) * 2 * amt;

/** One sketchy line as a quadratic curve with a wobbly midpoint. */
function roughLine(r: Rand, x1: number, y1: number, x2: number, y2: number, wobble = 1.6) {
  const mx = (x1 + x2) / 2 + j(r, wobble);
  const my = (y1 + y2) / 2 + j(r, wobble);
  return `M${(x1 + j(r, 0.8)).toFixed(1)} ${(y1 + j(r, 0.8)).toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${(x2 + j(r, 0.8)).toFixed(1)} ${(y2 + j(r, 0.8)).toFixed(1)}`;
}

/** Two passes over each edge, like Excalidraw's double stroke. */
function roughRect(r: Rand, x: number, y: number, w: number, h: number) {
  const d: string[] = [];
  for (let pass = 0; pass < 2; pass++) {
    const o = pass === 0 ? 0 : 1.2;
    d.push(roughLine(r, x - o, y, x + w + o, y));
    d.push(roughLine(r, x + w, y - o, x + w, y + h + o));
    d.push(roughLine(r, x + w + o, y + h, x - o, y + h));
    d.push(roughLine(r, x, y + h + o, x, y - o));
  }
  return d.join(' ');
}

/** Diagonal hachure fill, Excalidraw's signature fill style. */
function hachure(r: Rand, x: number, y: number, w: number, h: number, gap = 9) {
  const d: string[] = [];
  for (let k = -h; k < w; k += gap) {
    const sx = Math.max(x, x + k);
    const sy = k < 0 ? y - k : y;
    const ex = Math.min(x + w, x + k + h);
    const ey = k + h > w ? y + (w - k) : y + h;
    d.push(roughLine(r, sx + 2, sy - 2, ex - 2, ey + 2, 1));
  }
  return d.join(' ');
}

function arrow(r: Rand, x1: number, y1: number, x2: number, y2: number) {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const head = 11;
  const a1 = ang + Math.PI - 0.45;
  const a2 = ang + Math.PI + 0.45;
  return [
    roughLine(r, x1, y1, x2, y2, 2),
    roughLine(r, x2, y2, x2 + head * Math.cos(a1), y2 + head * Math.sin(a1), 0.6),
    roughLine(r, x2, y2, x2 + head * Math.cos(a2), y2 + head * Math.sin(a2), 0.6),
  ].join(' ');
}

const STROKE = { fill: 'none', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

function Horizontal() {
  const r = prng(7);
  const bw = 150, bh = 92, gap = 46, x0 = 26, y0 = 92;
  const xs = BLOCKS.map((_, i) => x0 + i * (bw + gap));
  const txEnd = xs[3] + bw;
  return (
    <svg viewBox="0 0 1000 260" className="h-auto w-full" role="img" aria-labelledby="pipe-h-title">
      <title id="pipe-h-title">Signal flow: microphone and ADC, RP2040 DMA buffer with FFT and MFE features, TinyML int8 CNN classifier, 923 MHz LoRa point-to-point, base station.</title>
      <rect width="1000" height="260" rx="14" className="fill-surface" />
      {/* group brackets */}
      <path d={roughLine(r, x0, 58, txEnd, 58, 1.2)} {...STROKE} className="stroke-smoke" strokeWidth={1.2} strokeDasharray="6 6" />
      <text x={x0} y={46} className="fill-ash font-mono text-[12px] tracking-[0.2em]">TRANSMITTER NODE</text>
      <path d={roughLine(r, xs[4], 58, xs[4] + bw, 58, 1.2)} {...STROKE} className="stroke-smoke" strokeWidth={1.2} strokeDasharray="6 6" />
      <text x={xs[4]} y={46} className="fill-ash font-mono text-[12px] tracking-[0.2em]">RECEIVER</text>
      {BLOCKS.map((b, i) => (
        <g key={b.title}>
          {b.emphasis && <path d={hachure(r, xs[i], y0, bw, bh)} {...STROKE} className="stroke-strong" strokeWidth={1.1} />}
          <path d={roughRect(r, xs[i], y0, bw, bh)} {...STROKE} className="stroke-fg" />
          <text x={xs[i] + bw / 2} y={y0 + 40} textAnchor="middle" className="fill-fg font-sans text-[15px] font-bold">{b.title}</text>
          <text x={xs[i] + bw / 2} y={y0 + 63} textAnchor="middle" className="fill-ash font-mono text-[11px]">{b.sub}</text>
        </g>
      ))}
      {xs.slice(0, 4).map((x, i) => (
        <path key={i} d={arrow(r, x + bw + 6, y0 + bh / 2, xs[i + 1] - 6, y0 + bh / 2)} {...STROKE} className="stroke-fg" strokeDasharray={i === 3 ? '7 6' : undefined} />
      ))}
      <text x={(xs[3] + bw + xs[4]) / 2} y={y0 + bh + 36} textAnchor="middle" className="fill-ash font-mono text-[11px]">≤ 1 km (target)</text>
      <text x={500} y={238} textAnchor="middle" className="fill-smoke font-mono text-[11px]">audio in → features → classify → alert over LoRa, no cellular or internet</text>
    </svg>
  );
}

function Vertical() {
  const r = prng(11);
  const bw = 236, bh = 74, gap = 44, x0 = 62, y0 = 58;
  const ys = BLOCKS.map((_, i) => y0 + i * (bh + gap));
  return (
    <svg viewBox="0 0 360 640" className="h-auto w-full" role="img" aria-labelledby="pipe-v-title">
      <title id="pipe-v-title">Signal flow: microphone and ADC, RP2040 DMA buffer with FFT and MFE features, TinyML int8 CNN classifier, 923 MHz LoRa point-to-point, base station.</title>
      <rect width="360" height="640" rx="14" className="fill-surface" />
      <text x={x0} y={38} className="fill-ash font-mono text-[11px] tracking-[0.2em]">TRANSMITTER NODE</text>
      <path d={roughLine(r, 36, y0, 36, ys[3] + bh, 1.2)} {...STROKE} className="stroke-smoke" strokeWidth={1.2} strokeDasharray="6 6" />
      <path d={roughLine(r, 36, ys[4], 36, ys[4] + bh, 1.2)} {...STROKE} className="stroke-smoke" strokeWidth={1.2} strokeDasharray="6 6" />
      {BLOCKS.map((b, i) => (
        <g key={b.title}>
          {b.emphasis && <path d={hachure(r, x0, ys[i], bw, bh)} {...STROKE} className="stroke-strong" strokeWidth={1.1} />}
          <path d={roughRect(r, x0, ys[i], bw, bh)} {...STROKE} className="stroke-fg" />
          <text x={x0 + bw / 2} y={ys[i] + 33} textAnchor="middle" className="fill-fg font-sans text-[15px] font-bold">{b.title}</text>
          <text x={x0 + bw / 2} y={ys[i] + 54} textAnchor="middle" className="fill-ash font-mono text-[11px]">{b.sub}</text>
        </g>
      ))}
      {ys.slice(0, 4).map((y, i) => (
        <path key={i} d={arrow(r, x0 + bw / 2, y + bh + 5, x0 + bw / 2, ys[i + 1] - 5)} {...STROKE} className="stroke-fg" strokeDasharray={i === 3 ? '7 6' : undefined} />
      ))}
      <text x={x0 + bw / 2 + 14} y={(ys[3] + bh + ys[4]) / 2 + 4} className="fill-ash font-mono text-[11px]">≤ 1 km (target)</text>
      <text x={x0} y={ys[4] - 10} className="fill-ash font-mono text-[11px] tracking-[0.2em]">RECEIVER</text>
    </svg>
  );
}

export function PipelineDiagram() {
  return (
    <figure>
      <div className="hidden overflow-hidden rounded-xl border border-hairline sm:block">
        <Horizontal />
      </div>
      <div className="overflow-hidden rounded-xl border border-hairline sm:hidden">
        <Vertical />
      </div>
    </figure>
  );
}

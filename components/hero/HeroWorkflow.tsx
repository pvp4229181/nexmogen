"use client";

import { ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Hero backdrop: an automation canvas that runs itself.
 *
 * A trigger feeds an agent, the agent branches through a router into two
 * outcomes, and a row of capability nodes hangs off the agent on dashed
 * links. The whole thing is one inline SVG so the strokes stay crisp at any
 * hero width.
 *
 * Three animations layer up, all on the same 9s cycle so the canvas reads as
 * one pass of work rather than four unrelated loops:
 *   - packets ride the solid edges (SMIL `animateMotion`, fed the same path
 *     data the visible edge is drawn from, so the two can never drift apart)
 *   - the dashed capability links crawl continuously
 *   - each node's ring lights as the packet reaches it, staggered by `beat`
 *
 * Motion is dropped wholesale under `prefers-reduced-motion` — the packets
 * are not rendered at all, since SMIL ignores CSS media queries.
 */

const CYCLE = 9; // seconds; every delay below is a fraction of this

/* ---------- geometry ----------
   Laid out in a 1600-wide canvas. The main row sits at y=489 with the agent
   dead centre, capability nodes drop to y≈770, and the two outcomes split
   off to the right. */

const EDGES = [
  { d: "M296 489H524", beat: 0.4 },
  { d: "M840 489H979", beat: 1.5 },
  { d: "M1108 468C1180 468 1206 345 1286 345", beat: 2.6 },
  { d: "M1108 508C1180 508 1206 631 1286 631", beat: 2.6 },
  { d: "M1418 345H1472", beat: 3.7 },
  { d: "M1418 631H1472", beat: 3.7 },
];

const LINKS = [
  "M594 558C594 646 470 664 392 734",
  "M717 558C717 646 622 668 559 734",
  "M779 614C779 664 828 668 867 712",
  "M779 614C779 672 958 668 1035 712",
];

/* ---------- primitives ---------- */

/** 24×24 glyph placed by centre. Stroke width is pre-divided by the scale so
    every icon lands on the same 2-unit weight regardless of node size. */
function Glyph({ x, y, size, children }: { x: number; y: number; size: number; children: ReactNode }) {
  const k = size / 24;
  return (
    <g
      transform={`translate(${x - size / 2} ${y - size / 2}) scale(${k})`}
      fill="none"
      strokeWidth={2 / k}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </g>
  );
}

/** Rounded node tile plus the ring that lights when the packet arrives. */
function Tile({
  x,
  y,
  w = 118,
  h = 118,
  r = 26,
  beat,
  animate,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  r?: number;
  beat: number;
  animate: boolean;
}) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={r} fill="#101015" stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} />
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={r}
        fill="none"
        stroke="#ff4d57"
        strokeWidth={2}
        className={animate ? "wf-ring" : "opacity-0"}
        style={animate ? { animationDelay: `${beat}s` } : undefined}
      />
    </>
  );
}

function Port({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r={7} fill="#101015" stroke="rgba(255,255,255,0.35)" strokeWidth={1.5} />;
}

/** The small inbound chevron each tile carries on its left edge. */
function Inlet({ x, y }: { x: number; y: number }) {
  return <path d={`M${x - 10} ${y - 8}L${x} ${y}L${x - 10} ${y + 8}Z`} fill="rgba(255,255,255,0.45)" />;
}

/** Diamond cap where a dashed capability link meets a node. */
function Notch({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M${x} ${y - 7}L${x + 7} ${y}L${x} ${y + 7}L${x - 7} ${y}Z`}
      fill="#16161c"
      stroke="rgba(255,255,255,0.4)"
      strokeWidth={1.5}
    />
  );
}

function Label({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return (
    <text x={x} y={y} textAnchor="middle" className="fill-white/70 font-display text-[21px] font-semibold">
      {children}
    </text>
  );
}

function SubLabel({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return (
    <text x={x} y={y} textAnchor="middle" className="fill-white/35 text-[17px]">
      {children}
    </text>
  );
}

export default function HeroWorkflow({ className = "" }: { className?: string }) {
  const animate = !useReducedMotion();

  return (
    <svg
      viewBox="0 240 1600 740"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        <radialGradient id="wf-packet">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="45%" stopColor="#ff4d57" />
          <stop offset="100%" stopColor="rgba(229,9,20,0)" />
        </radialGradient>
      </defs>

      <g className={animate ? "wf-drift" : undefined}>
        {/* Capability links, drawn first so the tiles sit over their ends. */}
        <g stroke="rgba(255,255,255,0.22)" strokeWidth={1.75} fill="none">
          {LINKS.map((d) => (
            <path key={d} d={d} className={animate ? "wf-crawl" : "[stroke-dasharray:5_9]"} />
          ))}
          <path d="M779 558V600" className={animate ? "wf-crawl" : "[stroke-dasharray:5_9]"} />
        </g>

        {/* Solid edges plus the packet that rides each one. */}
        <g fill="none">
          {EDGES.map((edge) => (
            <g key={edge.d}>
              <path d={edge.d} stroke="rgba(255,255,255,0.28)" strokeWidth={2} />
              {animate && (
                <circle r={9} fill="url(#wf-packet)">
                  <animateMotion
                    path={edge.d}
                    dur={`${CYCLE}s`}
                    begin={`${edge.beat}s`}
                    repeatCount="indefinite"
                    keyPoints="0;1;1"
                    keyTimes="0;0.12;1"
                    calcMode="linear"
                  />
                </circle>
              )}
            </g>
          ))}
        </g>

        {/* --- Trigger --- */}
        <path d="M150 478l-9 14h7l-2 12 10-15h-7z" fill="#ff4d57" />
        <Tile x={178} y={432} beat={0} animate={animate} />
        <Glyph x={237} y={491} size={46}>
          <rect x={4} y={3} width={12} height={18} rx={2} stroke="#5eead4" />
          <path d="M7.5 8h5M7.5 12h5M7.5 16h3" stroke="#5eead4" />
          <path d="M15.5 15.5l4.5-4.5 2 2-4.5 4.5H15.5z" stroke="#5eead4" />
        </Glyph>
        <Port x={296} y={489} />
        <Label x={237} y={568}>New brief submitted</Label>

        {/* --- Agent --- */}
        <Tile x={535} y={432} w={305} r={20} beat={1.1} animate={animate} />
        <Inlet x={534} y={489} />
        <Glyph x={597} y={489} size={48}>
          <rect x={4} y={7.5} width={16} height={12} rx={3.5} stroke="#fff" />
          <circle cx={9.5} cy={13} r={1.5} fill="#fff" stroke="none" />
          <circle cx={14.5} cy={13} r={1.5} fill="#fff" stroke="none" />
          <path d="M9.5 16.8h5M12 3.6v3.9" stroke="#fff" />
          <circle cx={12} cy={2.8} r={1.2} stroke="#fff" />
        </Glyph>
        <text x={648} y={484} className="fill-white font-display text-[27px] font-semibold">
          AI Agent
        </text>
        <text x={648} y={512} className="fill-white/45 text-[19px]">
          Delivery Agent
        </text>
        <Port x={840} y={489} />

        {/* Agent capability ports along its lower edge. */}
        <Notch x={594} y={551} />
        <Notch x={717} y={551} />
        <Notch x={779} y={551} />
        <SubLabel x={594} y={578}>Model*</SubLabel>
        <SubLabel x={717} y={578}>Memory</SubLabel>
        <SubLabel x={779} y={578}>Tools</SubLabel>
        <rect x={766} y={601} width={26} height={26} rx={7} fill="#101015" stroke="rgba(255,255,255,0.25)" strokeWidth={1.5} />
        <path d="M779 608v12M773 614h12" stroke="rgba(255,255,255,0.5)" strokeWidth={1.75} strokeLinecap="round" />

        {/* --- Router --- */}
        <Tile x={990} y={432} w={115} beat={2.2} animate={animate} />
        <Inlet x={989} y={489} />
        <Glyph x={1047} y={489} size={46}>
          <path d="M12 3v18" stroke="#4ade80" />
          <path d="M12 6h7l2.2 2.6L19 11h-7z" stroke="#4ade80" />
          <path d="M12 13H5l-2.2 2.6L5 18h7z" stroke="#4ade80" />
        </Glyph>
        <Port x={1108} y={468} />
        <Port x={1108} y={508} />
        <text x={1122} y={474} className="fill-white/45 text-[17px]">true</text>
        <text x={1122} y={514} className="fill-white/45 text-[17px]">false</text>
        <Label x={1047} y={568}>Ready to build?</Label>

        {/* --- Outcome: notify --- */}
        <Tile x={1298} y={286} beat={3.3} animate={animate} />
        <Inlet x={1292} y={345} />
        <Glyph x={1357} y={345} size={46}>
          <path d="M6 9.5a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6z" stroke="#ff4d57" />
          <path d="M10 19a2 2 0 004 0" stroke="#ff4d57" />
        </Glyph>
        <Port x={1418} y={345} />
        <Label x={1357} y={424}>Notify the team</Label>
        <SubLabel x={1357} y={450}>post: channel</SubLabel>

        {/* --- Outcome: CRM --- */}
        <Tile x={1298} y={572} beat={3.3} animate={animate} />
        <Inlet x={1292} y={631} />
        <Glyph x={1357} y={631} size={46}>
          <circle cx={11} cy={8} r={3.6} stroke="#ff4d57" />
          <path d="M4 20a7 7 0 0114 0" stroke="#ff4d57" />
          <path d="M17.5 6.5l2 2 3-3.5" stroke="#ff4d57" />
        </Glyph>
        <Port x={1418} y={631} />
        <Label x={1357} y={710}>Update the CRM</Label>
        <SubLabel x={1357} y={736}>upsert: contact</SubLabel>

        {/* --- Capability nodes --- */}
        <CapabilityNode cx={392} cy={786} beat={1.1} animate={animate} port="Model" label="Reasoning Model">
          <Glyph x={392} y={786} size={40}>
            <path d="M12 2.5l2.2 6.3 6.3 2.2-6.3 2.2L12 19.5l-2.2-6.3-6.3-2.2 6.3-2.2z" stroke="#c4b5fd" />
          </Glyph>
        </CapabilityNode>

        <CapabilityNode cx={559} cy={786} beat={1.1} animate={animate} port="Memory" label="Vector Memory">
          <Glyph x={559} y={786} size={40}>
            <ellipse cx={12} cy={6} rx={7} ry={3} stroke="#7dd3fc" />
            <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" stroke="#7dd3fc" />
            <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" stroke="#7dd3fc" />
          </Glyph>
        </CapabilityNode>

        <CapabilityNode cx={867} cy={762} beat={1.1} animate={animate} label="Codebase Search" sub="search: repo">
          <Glyph x={867} y={762} size={40}>
            <circle cx={10.5} cy={10.5} r={6.5} stroke="#fcd34d" />
            <path d="M20 20l-4.8-4.8" stroke="#fcd34d" />
          </Glyph>
        </CapabilityNode>

        <CapabilityNode cx={1035} cy={762} beat={1.1} animate={animate} label="Ticket Tracker" sub="create: issue">
          <Glyph x={1035} y={762} size={40}>
            <rect x={3} y={4} width={18} height={16} rx={2.5} stroke="#93c5fd" />
            <path d="M9 4v16M13 9h4M13 13h4" stroke="#93c5fd" />
          </Glyph>
        </CapabilityNode>
      </g>
    </svg>
  );
}

/** Circular node on a dashed link: notch, disc, lit ring, then its captions. */
function CapabilityNode({
  cx,
  cy,
  beat,
  animate,
  port,
  label,
  sub,
  children,
}: {
  cx: number;
  cy: number;
  beat: number;
  animate: boolean;
  port?: string;
  label: string;
  sub?: string;
  children: ReactNode;
}) {
  return (
    <>
      <Notch x={cx} y={cy - 44} />
      {port && <SubLabel x={cx} y={cy - 62}>{port}</SubLabel>}
      <circle cx={cx} cy={cy} r={42} fill="#101015" stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} />
      <circle
        cx={cx}
        cy={cy}
        r={42}
        fill="none"
        stroke="#ff4d57"
        strokeWidth={2}
        className={animate ? "wf-ring" : "opacity-0"}
        style={animate ? { animationDelay: `${beat}s` } : undefined}
      />
      {children}
      <Label x={cx} y={cy + 72}>{label}</Label>
      {sub && <SubLabel x={cx} y={cy + 98}>{sub}</SubLabel>}
    </>
  );
}

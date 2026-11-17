"use client";

import { useEffect, useRef } from "react";

/**
 * Hero backdrop: labelled service nodes drift in across five columns, wire
 * themselves to the column on their right, and fire pulses down those wires.
 * Nodes expire and respawn so the graph keeps rearranging itself instead of
 * settling into one picture.
 *
 * Only the wires, pulses and chips are on the canvas — the dot grid under them
 * and the fade over their right edge are plain CSS layers.
 */

/**
 * Chips are pale on purpose: a dark chip on a near-black hero disappears, and
 * the left half of the graph has to survive a 26px backdrop blur and still
 * read as a shape. `tint` carries the brand accent on the bar, stroke and wire.
 */
type NodeType = { label: string; fill: string; tint: string };

const SCENES: NodeType[][] = [
  [
    { label: "ETL", fill: "#edf6ff", tint: "#60a5fa" }, { label: "ML", fill: "#ecfeff", tint: "#22d3ee" },
    { label: "NLP", fill: "#f5f3ff", tint: "#8b5cf6" }, { label: "LLM", fill: "#eff6ff", tint: "#2563eb" },
    { label: "AGT", fill: "#fff7ed", tint: "#f59e0b" }, { label: "API", fill: "#ecfdf5", tint: "#10b981" },
    { label: "DB", fill: "#fdf2f8", tint: "#ec4899" }, { label: "RAG", fill: "#eef2ff", tint: "#6366f1" },
  ],
  [
    { label: "HTML", fill: "#fff7ed", tint: "#f97316" }, { label: "CSS", fill: "#eff6ff", tint: "#3b82f6" },
    { label: "JS", fill: "#fefce8", tint: "#eab308" }, { label: "CMS", fill: "#f5f3ff", tint: "#8b5cf6" },
    { label: "SEO", fill: "#ecfdf5", tint: "#10b981" }, { label: "API", fill: "#ecfeff", tint: "#06b6d4" },
    { label: "CDN", fill: "#eef2ff", tint: "#6366f1" }, { label: "DB", fill: "#fdf2f8", tint: "#ec4899" },
  ],
  [
    { label: "LLM", fill: "#eff6ff", tint: "#2563eb" }, { label: "RAG", fill: "#f5f3ff", tint: "#8b5cf6" },
    { label: "AGT", fill: "#fff7ed", tint: "#f59e0b" }, { label: "MEM", fill: "#ecfeff", tint: "#06b6d4" },
    { label: "TOOLS", fill: "#ecfdf5", tint: "#10b981" }, { label: "CRM", fill: "#fff1f2", tint: "#f43f5e" },
    { label: "MAIL", fill: "#eef2ff", tint: "#6366f1" }, { label: "QA", fill: "#fdf2f8", tint: "#ec4899" },
  ],
  [
    { label: "AUTH", fill: "#fff1f2", tint: "#f43f5e" }, { label: "API", fill: "#fff7ed", tint: "#f97316" },
    { label: "DB", fill: "#fdf2f8", tint: "#ec4899" }, { label: "BILL", fill: "#fefce8", tint: "#eab308" },
    { label: "ORG", fill: "#f5f3ff", tint: "#8b5cf6" }, { label: "QUEUE", fill: "#ecfeff", tint: "#06b6d4" },
    { label: "DATA", fill: "#ecfdf5", tint: "#10b981" }, { label: "CLOUD", fill: "#eff6ff", tint: "#3b82f6" },
  ],
  [
    { label: "iOS", fill: "#f8fafc", tint: "#64748b" }, { label: "DROID", fill: "#ecfdf5", tint: "#10b981" },
    { label: "PUSH", fill: "#f5f3ff", tint: "#8b5cf6" }, { label: "GPS", fill: "#ecfeff", tint: "#06b6d4" },
    { label: "CHAT", fill: "#eff6ff", tint: "#3b82f6" }, { label: "SYNC", fill: "#eef2ff", tint: "#6366f1" },
    { label: "API", fill: "#fff7ed", tint: "#f97316" }, { label: "STORE", fill: "#fdf2f8", tint: "#ec4899" },
  ],
];

const NODE_W = 76;
const NODE_H = 34;
const COLS = 5;

type Node = {
  id: number;
  col: number;
  x: number;
  y: number;
  type: NodeType;
  bornAt: number;
  life: number;
  flashUntil: number;
};

type Edge = { id: number; from: number; to: number; bornAt: number; life: number };
type Pulse = { edgeId: number; t: number; speed: number; color: string };

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

function rgba(hex: string, alpha: number) {
  const v = hex.replace("#", "");
  const r = parseInt(v.slice(0, 2), 16);
  const g = parseInt(v.slice(2, 4), 16);
  const b = parseInt(v.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function HeroNodeField({ className = "", variant = 0 }: { className?: string; variant?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let colWidth = 0;
    let nextId = 1;
    let raf = 0;

    const nodes = new Map<number, Node>();
    const edges = new Map<number, Edge>();
    const pulses: Pulse[] = [];
    const types = SCENES[variant % SCENES.length];

    const colX = (col: number) => colWidth * col + colWidth / 2 - NODE_W / 2;

    // Dealt from a shuffled deck rather than picked at random: uniform picks
    // clump, and a graph showing "SEO" four times looks broken rather than busy.
    let deck: NodeType[] = [];
    function nextType(): NodeType {
      if (!deck.length) {
        deck = [...types];
        for (let i = deck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [deck[i], deck[j]] = [deck[j], deck[i]];
        }
      }
      return deck.pop()!;
    }

    /** Finds a free slot in `col`, or gives up rather than stacking chips. */
    function placeNode(col: number, now: number): Node | null {
      for (let attempt = 0; attempt < 12; attempt++) {
        const x = colX(col) + rand(-14, 14);
        const y = rand(40, Math.max(48, height - NODE_H - 40));
        let clear = true;
        nodes.forEach((n) => {
          if (n.col === col && Math.abs(n.y - y) < NODE_H + 18) clear = false;
        });
        if (!clear) continue;
        return {
          id: nextId++,
          col,
          x,
          y,
          type: nextType(),
          bornAt: now,
          life: rand(14000, 26000),
          flashUntil: 0,
        };
      }
      return null;
    }

    function connect(node: Node, now: number) {
      const next: Node[] = [];
      nodes.forEach((n) => {
        if (n.col === node.col + 1) next.push(n);
      });
      if (!next.length) return;
      const count = 1 + (Math.random() < 0.3 ? 1 : 0);
      for (let i = 0; i < count; i++) {
        const dst = pick(next);
        const id = nextId++;
        edges.set(id, { id, from: node.id, to: dst.id, bornAt: now, life: rand(18000, 30000) });
      }
    }

    function seed() {
      const now = performance.now();
      for (let col = 0; col < COLS; col++) {
        for (let i = 0; i < 3; i++) {
          const node = placeNode(col, now);
          if (node) nodes.set(node.id, node);
        }
      }
      nodes.forEach((node) => connect(node, now));
    }

    function resize() {
      width = host!.clientWidth;
      height = host!.clientHeight;
      if (!width || !height) return;
      colWidth = width / COLS;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes.clear();
      edges.clear();
      pulses.length = 0;
      seed();
    }

    /** Cubic bezier point at `t` — the wire itself and the pulse riding it. */
    function bez(p: number[][], t: number) {
      const u = 1 - t;
      const x =
        u * u * u * p[0][0] +
        3 * u * u * t * p[1][0] +
        3 * u * t * t * p[2][0] +
        t * t * t * p[3][0];
      const y =
        u * u * u * p[0][1] +
        3 * u * u * t * p[1][1] +
        3 * u * t * t * p[2][1] +
        t * t * t * p[3][1];
      return [x, y];
    }

    function edgeGeometry(edge: Edge) {
      const src = nodes.get(edge.from);
      const dst = nodes.get(edge.to);
      if (!src || !dst) return null;
      const sx = src.x + NODE_W;
      const sy = src.y + NODE_H / 2;
      const dx = dst.x;
      const dy = dst.y + NODE_H / 2;
      const mid = (sx + dx) / 2;
      const points = [
        [sx, sy],
        [mid, sy],
        [mid, dy],
        [dx, dy],
      ];
      return { points, src, dst };
    }

    /** Ramps in over 900ms and back out over the last 1400ms of a lifetime. */
    const fade = (bornAt: number, life: number, now: number) => {
      const age = now - bornAt;
      return Math.min(Math.min(1, age / 900), Math.min(1, Math.max(0, (life - age) / 1400)));
    };

    function roundRect(x: number, y: number, w: number, h: number, r: number) {
      ctx!.beginPath();
      ctx!.moveTo(x + r, y);
      ctx!.arcTo(x + w, y, x + w, y + h, r);
      ctx!.arcTo(x + w, y + h, x, y + h, r);
      ctx!.arcTo(x, y + h, x, y, r);
      ctx!.arcTo(x, y, x + w, y, r);
      ctx!.closePath();
    }

    function drawEdge(edge: Edge, now: number) {
      const geo = edgeGeometry(edge);
      const alpha = fade(edge.bornAt, edge.life, now);
      if (!geo || alpha <= 0) return;
      const [p0, p1, p2, p3] = geo.points;
      const grad = ctx!.createLinearGradient(p0[0], p0[1], p3[0], p3[1]);
      grad.addColorStop(0, rgba(geo.src.type.tint, 0.85));
      grad.addColorStop(1, rgba(geo.dst.type.tint, 0.85));
      ctx!.globalAlpha = alpha * 0.85;
      ctx!.strokeStyle = grad;
      ctx!.lineWidth = 1.3;
      ctx!.beginPath();
      ctx!.moveTo(p0[0], p0[1]);
      ctx!.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
      ctx!.stroke();
      ctx!.globalAlpha = 1;
    }

    function drawPulse(pulse: Pulse, now: number) {
      const edge = edges.get(pulse.edgeId);
      if (!edge) return;
      const geo = edgeGeometry(edge);
      const alpha = fade(edge.bornAt, edge.life, now);
      if (!geo || alpha <= 0) return;

      // Three shrinking dots behind the head read as a comet tail.
      for (let i = 0; i < 3; i++) {
        const [tx, ty] = bez(geo.points, Math.max(0, pulse.t - i * 0.05));
        ctx!.globalAlpha = alpha * (0.9 - i * 0.3);
        ctx!.fillStyle = pulse.color;
        ctx!.beginPath();
        ctx!.arc(tx, ty, 3 - i * 0.7, 0, Math.PI * 2);
        ctx!.fill();
      }

      const [x, y] = bez(geo.points, pulse.t);
      const halo = ctx!.createRadialGradient(x, y, 0, x, y, 12);
      halo.addColorStop(0, rgba(pulse.color, 0.55));
      halo.addColorStop(1, rgba(pulse.color, 0));
      ctx!.globalAlpha = alpha;
      ctx!.fillStyle = halo;
      ctx!.beginPath();
      ctx!.arc(x, y, 12, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.globalAlpha = 1;
    }

    function drawNode(node: Node, now: number) {
      const alpha = fade(node.bornAt, node.life, now);
      if (alpha <= 0) return;

      if (now < node.flashUntil) {
        ctx!.save();
        ctx!.globalAlpha = alpha * (0.6 + ((node.flashUntil - now) / 400) * 0.8);
        ctx!.shadowColor = node.type.tint;
        ctx!.shadowBlur = 22;
        ctx!.fillStyle = node.type.fill;
        roundRect(node.x, node.y, NODE_W, NODE_H, 8);
        ctx!.fill();
        ctx!.restore();
      }

      ctx!.globalAlpha = alpha;
      ctx!.fillStyle = "#ffffff";
      roundRect(node.x, node.y, NODE_W, NODE_H, 8);
      ctx!.fill();
      ctx!.fillStyle = node.type.fill;
      roundRect(node.x, node.y, NODE_W, NODE_H, 8);
      ctx!.fill();
      ctx!.lineWidth = 1;
      ctx!.strokeStyle = rgba(node.type.tint, 0.35);
      roundRect(node.x, node.y, NODE_W, NODE_H, 8);
      ctx!.stroke();

      // Connector studs on both sides, then the accent bar and label inside.
      ctx!.fillStyle = node.type.tint;
      ctx!.beginPath();
      ctx!.arc(node.x, node.y + NODE_H / 2, 2.4, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.beginPath();
      ctx!.arc(node.x + NODE_W, node.y + NODE_H / 2, 2.4, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.fillRect(node.x + 6, node.y + 7, 3, NODE_H - 14);
      ctx!.fillStyle = "#0a0a0a";
      ctx!.font = "600 10px ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto";
      ctx!.textBaseline = "middle";
      ctx!.fillText(node.type.label, node.x + 15, node.y + NODE_H / 2 - 0.5);
      ctx!.fillStyle = node.type.tint;
      ctx!.beginPath();
      ctx!.arc(node.x + NODE_W - 9, node.y + 9, 1.8, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.globalAlpha = 1;
    }

    let last = performance.now();
    let lastChurn = 0;
    let lastPulse = 0;

    function frame(now: number) {
      const dt = now - last;
      last = now;
      ctx!.clearRect(0, 0, width, height);

      nodes.forEach((node, id) => {
        if (now - node.bornAt > node.life) nodes.delete(id);
      });
      edges.forEach((edge, id) => {
        const orphaned = !nodes.has(edge.from) || !nodes.has(edge.to);
        if (orphaned || now - edge.bornAt > edge.life) edges.delete(id);
      });

      if (now - lastChurn > 1400) {
        lastChurn = now;
        if (nodes.size < COLS * 4) {
          const node = placeNode(Math.floor(Math.random() * COLS), now);
          if (node) {
            nodes.set(node.id, node);
            connect(node, now);
          }
        }
      }

      if (now - lastPulse > 280) {
        lastPulse = now;
        const alive: Edge[] = [];
        edges.forEach((edge) => {
          if (fade(edge.bornAt, edge.life, now) > 0.5) alive.push(edge);
        });
        if (alive.length) {
          const edge = pick(alive);
          const src = nodes.get(edge.from);
          pulses.push({
            edgeId: edge.id,
            t: 0,
            speed: 1 / rand(900, 1700),
            color: src ? src.type.tint : "#ff4d57",
          });
        }
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].t += pulses[i].speed * dt;
        if (pulses[i].t < 1) continue;
        // An arriving pulse lights up the node it landed on.
        const edge = edges.get(pulses[i].edgeId);
        const dst = edge && nodes.get(edge.to);
        if (dst) dst.flashUntil = now + 400;
        pulses.splice(i, 1);
      }

      edges.forEach((edge) => drawEdge(edge, now));
      pulses.forEach((pulse) => drawPulse(pulse, now));
      nodes.forEach((node) => drawNode(node, now));

      if (!reduceMotion) raf = requestAnimationFrame(frame);
    }

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);

    if (reduceMotion) frame(performance.now());
    else raf = requestAnimationFrame(frame);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [variant]);

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <div className="hero-dot-grid absolute inset-0" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-y-0 right-0 w-24 bg-[linear-gradient(to_left,#050506,transparent)]" />
    </div>
  );
}

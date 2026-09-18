// Recolours a stock (blue/white) Lottie onto the Nexmogen dark + crimson palette.
//
// Two tiers:
//   structure  — neutrals, navies, pale "paper" panels: lightness is inverted so
//                white cards become dark glass and dark linework becomes light,
//                then tinted faintly warm. This is what kills the white background.
//   accent     — already-saturated spot colours: hue is folded into a narrow band
//                around the brand red so they stay distinguishable but on-brand.
import { readFile, writeFile } from "node:fs/promises";

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

function rgbToHsl(r, g, b) {
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0));
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return [h * 60, s, l];
}

function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360;
  if (s === 0) return [l, l, l];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue = (t) => {
    t = ((t % 1) + 1) % 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [hue(h / 360 + 1 / 3), hue(h / 360), hue(h / 360 - 1 / 3)];
}

function mapColor(r, g, b) {
  const [h, s, l] = rgbToHsl(r, g, b);
  // HSL saturation reads high on a merely tinted off-white, so classification
  // uses chroma (max-min) instead, which tracks "is this actually colourful".
  const chroma = Math.max(r, g, b) - Math.min(r, g, b);

  // Real spot colour -> folded into the crimson band, held at a lightness that
  // pops against the dark page.
  if (chroma >= 0.45) {
    const nh = 355 + ((h / 360) * 36 - 18);
    return hslToRgb(nh, clamp(Math.max(s, 0.75), 0.75, 1), clamp(0.32 + l * 0.42, 0.32, 0.66));
  }

  // A dark fill that still carries some colour (the navy "screen" of these
  // stock assets) is a recessed surface, not linework: keep it the darkest
  // thing in the frame instead of inverting it into a pale slab.
  if (l <= 0.35 && chroma >= 0.12) {
    return hslToRgb(352, 0.3, clamp(0.04 + l * 0.18, 0.04, 0.12));
  }

  // Everything else is structure: invert lightness so white panels become dark
  // glass and near-black linework becomes legible light strokes.
  // Tint stays under 0.10 saturation: any more and the mid greys go muddy brown
  // rather than reading as neutral dark glass.
  return hslToRgb(352, clamp(s * 0.3, 0.02, 0.1), clamp(0.16 + (1 - l) * 0.74, 0.11, 0.92));
}

let touched = 0;
function walk(node) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) { node.forEach(walk); return; }

  // Solid fills and strokes: { ty: "fl" | "st", c: { k: [r,g,b,a] } }
  if ((node.ty === "fl" || node.ty === "st") && node.c && Array.isArray(node.c.k) && typeof node.c.k[0] === "number") {
    const [r, g, b] = node.c.k;
    const [nr, ng, nb] = mapColor(r, g, b);
    node.c.k[0] = nr; node.c.k[1] = ng; node.c.k[2] = nb;
    touched++;
  }

  // Gradient fills and strokes: g.k.k is a flat [stop, r, g, b, ...] ramp,
  // optionally followed by an [stop, alpha, ...] tail we must not touch.
  if ((node.ty === "gf" || node.ty === "gs") && node.g && node.g.k && Array.isArray(node.g.k.k) && typeof node.g.k.k[0] === "number") {
    const ramp = node.g.k.k;
    const stops = node.g.p ?? Math.floor(ramp.length / 4);
    for (let i = 0; i < stops; i++) {
      const o = i * 4;
      if (o + 3 >= ramp.length) break;
      const [nr, ng, nb] = mapColor(ramp[o + 1], ramp[o + 2], ramp[o + 3]);
      ramp[o + 1] = nr; ramp[o + 2] = ng; ramp[o + 3] = nb;
      touched++;
    }
  }

  // Solid layers (ty 1) carry their colour as a hex string.
  if (node.ty === 1 && typeof node.sc === "string" && /^#[0-9a-f]{6}$/i.test(node.sc)) {
    const hex = node.sc.slice(1);
    const [nr, ng, nb] = mapColor(
      parseInt(hex.slice(0, 2), 16) / 255,
      parseInt(hex.slice(2, 4), 16) / 255,
      parseInt(hex.slice(4, 6), 16) / 255
    );
    node.sc = "#" + [nr, ng, nb].map(v => Math.round(v * 255).toString(16).padStart(2, "0")).join("");
    touched++;
  }

  for (const value of Object.values(node)) walk(value);
}

const [src, dest] = process.argv.slice(2);
const data = JSON.parse(await readFile(src, "utf8"));
walk(data.layers);
walk(data.assets);
delete data.bg; // no baked-in background colour
await writeFile(dest, JSON.stringify(data));
console.log(`${dest}: ${touched} colours remapped`);

import VariantBento from "@/components/service-variants/VariantBento";
import VariantIndexRows from "@/components/service-variants/VariantIndexRows";
import VariantSplit from "@/components/service-variants/VariantSplit";
import VariantHoverFill from "@/components/service-variants/VariantHoverFill";

const VARIANTS = [
  { id: "bento", label: "Option 1 — Bento grid (mixed tile sizes)", node: <VariantBento /> },
  { id: "rows", label: "Option 2 — Numbered index rows (hover to open)", node: <VariantIndexRows /> },
  { id: "split", label: "Option 3 — Alternating split rows", node: <VariantSplit /> },
  { id: "fill", label: "Option 4 — Hover-fill gradient cards", node: <VariantHoverFill /> },
];

export default function PreviewServicesPage() {
  return (
    <div className="pt-28">
      {VARIANTS.map((v) => (
        <section key={v.id} id={v.id} className="section bg-ink">
          <div className="container-px mx-auto max-w-7xl">
            <p className="mb-10 inline-block rounded-full border border-primary-light/30 bg-primary/10 px-5 py-2 font-display text-sm font-bold text-primary-light">
              {v.label}
            </p>
            {v.node}
          </div>
        </section>
      ))}
    </div>
  );
}

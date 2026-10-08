import Link from "next/link";

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    image: string;
    unit: string;
    today: number;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
}

interface MarqueeProps {
    direction?: "left" | "right"; 
    duration?: number; 
}

const API_URL = "https://api.abcz.workers.dev/api/bazardor/products";

const toBn = (n: number | string): string =>
    String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

const unitBn: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
};

async function getProducts(): Promise<Product[]> {
    try {
        const res = await fetch(API_URL, { next: { revalidate: 300 } });
        if (!res.ok) return [];
        return await res.json();
    } catch {
        return [];
    }
}

const Marquee = async ({ direction = "left", duration = 60 }: MarqueeProps) => {
    const products = await getProducts();

    if (products.length === 0) return null;

    const renderItems = (prefix: string) =>
        products.map((p) => {
            const { dir, pct } = p.change;
            const color =
                dir === "up"
                    ? "text-red-600"
                    : dir === "down"
                        ? "text-green-600"
                        : "text-slate-400";
            const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "–";

            return (
                <Link
                    key={`${prefix}-${p.id}`}
                    href={`/products/${p.slug}`}
                    className="inline-flex shrink-0 items-center gap-2.5 border-r border-slate-200 px-8 py-1 text-base text-slate-800 transition-colors hover:text-green-700"
                >
                    <span className="text-lg">{p.image}</span>
                    <span className="font-semibold">{p.nameBn}</span>
                    <span className="text-slate-600">
                        {toBn(p.today)} টাকা/{unitBn[p.unit] ?? p.unit}
                    </span>
                    <span className={`font-bold ${color}`}>
                        {arrow} {toBn(Math.abs(pct))}%
                    </span>
                </Link>
            );
        });

    return (
        <div className="bazar-marquee w-full overflow-hidden border-y border-dashed border-sky-300 bg-white py-2.5">
            <style>{`
        @keyframes bazar-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .bazar-track {
          animation-name: bazar-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .bazar-marquee:hover .bazar-track {
          animation-play-state: paused;
        }
      `}</style>

            <div
                className="bazar-track flex w-max whitespace-nowrap"
                style={{
                    animationDuration: `${duration}s`,
                    animationDirection: direction === "right" ? "reverse" : "normal",
                }}
            >
                <div className="flex shrink-0">{renderItems("a")}</div>
                <div className="flex shrink-0" aria-hidden="true">
                    {renderItems("b")}
                </div>
            </div>
        </div>
    );
};

export default Marquee;
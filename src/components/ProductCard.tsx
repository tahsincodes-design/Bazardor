import Link from "next/link";

interface ProductCardProps {
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

const toBn = (n: number | string): string =>
    String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

const unitBn: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
};

const ProductCard = ({ slug, nameBn, image, unit, today, change }: ProductCardProps) => {
    const color =
        change.dir === "up"
            ? "bg-red-50 text-red-600"
            : change.dir === "down"
                ? "bg-green-50 text-green-600"
                : "bg-slate-100 text-slate-500";

    const arrow = change.dir === "up" ? "▲" : change.dir === "down" ? "▼" : "—";

    return (
        <Link
            href={`/products/${slug}`}
            className="block rounded-2xl border border-slate-200 bg-white p-4 shadow-xs transition hover:-translate-y-0.5 hover:shadow-md"
        >
            <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-2xl">
                    {image}
                </div>
                <div>
                    <h3 className="text-base font-semibold text-slate-900">{nameBn}</h3>
                    <p className="text-xs text-slate-500">প্রতি {unitBn[unit] ?? unit}</p>
                </div>
            </div>

            <p className="mt-4 text-xs text-slate-500">আজকের দাম</p>
            <div className="mt-1 flex items-end justify-between">
                <p className="text-xl font-bold text-slate-900">
                    {toBn(today.toLocaleString("en-US"))} <span className="text-sm font-medium">টাকা</span>
                </p>
                <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${color}`}>
                    {arrow} {toBn(Math.abs(change.pct))}%
                </span>
            </div>
        </Link>
    );
};

export default ProductCard;
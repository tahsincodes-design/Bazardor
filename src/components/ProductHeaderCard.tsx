import { money, toBn } from "@/types/formatter";

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    image: string;
    unit: string;
    today: number;
    yesterday: number;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
}

interface ProductHeaderCardProps {
    product: Product;
    unit: string;
    sentence: string;
    badge: string;
    arrow: string;
}

export const ProductHeaderCard = ({
    product,
    unit,
    sentence,
    badge,
    arrow,
}: ProductHeaderCardProps) => (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-4xl">
                {product.image}
            </div>
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    {product.nameBn}
                </h1>
                <p className="mt-1 text-xs text-slate-500">
                    প্রতি {unit} · {product.categoryNameBn}
                </p>
                <p className="mt-1 text-xs text-slate-600">{sentence}</p>
            </div>
        </div>

        <div className="shrink-0 rounded-xl bg-slate-100 px-5 py-3 text-center">
            <p className="text-[11px] text-slate-500">আজকের দাম</p>
            <p className="text-2xl font-bold text-slate-900">
                {money(product.today)}
            </p>
            <p className="text-[11px] text-slate-500">টাকা / {unit}</p>
            <p className={`mt-1 text-xs font-semibold ${badge}`}>
                {arrow} {toBn(Math.abs(product.change.pct))}%
            </p>
        </div>
    </div>
);
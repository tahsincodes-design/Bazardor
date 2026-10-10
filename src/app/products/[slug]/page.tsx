import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SummaryCard } from "@/components/SummaryCard";
import { ProductHeaderCard } from "@/components/ProductHeaderCard";
import { MarketTable, Market } from "@/components/MarketTable";
import { toBn, unitBn } from "@/types/formatter";

// export const dynamicParams = true;
// export const revalidate = 300;

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

interface ProductDetail extends Product {
    markets: Market[];
}

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

const BASE = "https://api.abcz.workers.dev/api/bazardor/products";

const getProducts = async (): Promise<Product[]> => {
    try {
        const res = await fetch(BASE, { next: { revalidate: 300 } });
        if (!res.ok) return [];
        return await res.json();
    } catch {
        return [];
    }
};

const getDetail = async (id: number): Promise<ProductDetail | null> => {
    try {
        const res = await fetch(`${BASE}/${id}`, { next: { revalidate: 300 } });
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
};

export const generateStaticParams = async () => {
    const products = await getProducts();
    return products.map((p) => ({ slug: p.slug }));
};

const ProductContent = async ({ params }: ProductPageProps) => {
    const { slug } = await params;
    const all = await getProducts();
    const product = all.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    const detail = await getDetail(product.id);
    const markets = (detail?.markets ?? []).map((m) => ({
        ...m,
        avg: (m.min + m.max) / 2,
    }));

    const lowest = markets.length
        ? markets.reduce((a, b) => (b.min < a.min ? b : a))
        : null;
    const highest = markets.length
        ? markets.reduce((a, b) => (b.max > a.max ? b : a))
        : null;

    const min = lowest?.min ?? product.today;
    const max = highest?.max ?? product.today;
    const avg = product.today;

    const unit = unitBn[product.unit] ?? product.unit;
    const { dir } = product.change;
    const diff = Math.abs(product.today - product.yesterday);

    const badge =
        dir === "up"
            ? "text-red-600"
            : dir === "down"
                ? "text-green-600"
                : "text-slate-500";
    const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
    const sentence =
        dir === "up"
            ? `গতকালের তুলনায় আজ দাম বেড়েছে ${toBn(diff)} টাকা`
            : dir === "down"
                ? `গতকালের তুলনায় আজ দাম কমেছে ${toBn(diff)} টাকা`
                : "গতকালের তুলনায় দাম অপরিবর্তিত";

    return (
        <div className="mx-auto max-w-5xl px-4">
        
            <nav className="mb-4 flex items-center gap-2 text-xs text-slate-500">
                <Link href="/" className="hover:text-emerald-700">
                    হোম
                </Link>
                <span>›</span>
                <Link
                    href={`/category/${product.category}`}
                    className="hover:text-emerald-700"
                >
                    {product.categoryNameBn}
                </Link>
                <span>›</span>
                <span className="text-slate-800">{product.nameBn}</span>
            </nav>

            <ProductHeaderCard
                product={product}
                unit={unit}
                sentence={sentence}
                badge={badge}
                arrow={arrow}
            />

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                <h2 className="text-base font-bold text-slate-900">দামের সারসংক্ষেপ</h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    <SummaryCard
                        label="সর্বনিম্ন দাম"
                        value={min}
                        note={
                            lowest
                                ? `${lowest.market}, ${lowest.division}`
                                : "সবচেয়ে কম দামের বাজার"
                        }
                        tone="text-green-700"
                    />
                    <SummaryCard
                        label="সর্বাধিক দাম"
                        value={max}
                        note={
                            highest
                                ? `${highest.market}, ${highest.division}`
                                : "সবচেয়ে বেশি দামের বাজার"
                        }
                        tone="text-red-600"
                    />
                    <SummaryCard
                        label="গড় দাম"
                        value={avg}
                        note={`প্রতি ${unit}-এর হিসাবে`}
                        tone="text-emerald-700"
                    />
                </div>

                <MarketTable markets={markets} />
            </div>
        </div>
    );
};


const ProductSkeleton = () => (
    <div className="mx-auto max-w-5xl px-4 animate-pulse space-y-4">
        <div className="h-4 w-48 rounded bg-slate-200" />
        <div className="h-40 rounded-2xl bg-white border border-slate-200 p-5 shadow-xs" />
        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="h-5 w-36 rounded bg-slate-200" />
            <div className="grid gap-3 sm:grid-cols-3">
                <div className="h-20 rounded-xl bg-slate-100" />
                <div className="h-20 rounded-xl bg-slate-100" />
                <div className="h-20 rounded-xl bg-slate-100" />
            </div>
            <div className="h-48 rounded-xl bg-slate-100 mt-4" />
        </div>
    </div>
);

const ProductPage = ({ params }: ProductPageProps) => {
    return (
        <div className="bg-emerald-50/60 pb-10 pt-6 min-h-[calc(100vh-120px)]">
            <Suspense fallback={<ProductSkeleton />}>
                <ProductContent params={params} />
            </Suspense>
        </div>
    );
};

export default ProductPage;
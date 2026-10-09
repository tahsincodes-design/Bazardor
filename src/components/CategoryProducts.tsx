"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

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

interface CategoryProductsProps {
    products: Product[];
}

type SortKey = "default" | "priceAsc" | "priceDesc" | "rise" | "fall";

const toBn = (n: number | string): string =>
    String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

const CategoryProducts = ({ products }: CategoryProductsProps) => {
    const [sort, setSort] = useState<SortKey>("default");

    const sorted = [...products].sort((a, b) => {
        switch (sort) {
            case "priceAsc":
                return a.today - b.today;
            case "priceDesc":
                return b.today - a.today;
            case "rise":
                return b.change.pct - a.change.pct;
            case "fall":
                return a.change.pct - b.change.pct;
            default:
                return a.id - b.id;
        }
    });

    return (
        <>
            {/* Sort bar */}
            <div className="mt-4 flex items-center justify-end gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-xs">
                <label htmlFor="sort" className="text-sm text-slate-500">
                    সাজান
                </label>
                <select
                    id="sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 outline-none focus:border-emerald-500"
                >
                    <option value="default">ডিফল্ট</option>
                    <option value="priceAsc">দাম: কম থেকে বেশি</option>
                    <option value="priceDesc">দাম: বেশি থেকে কম</option>
                    <option value="rise">সবচেয়ে বেশি বেড়েছে</option>
                    <option value="fall">সবচেয়ে বেশি কমেছে</option>
                </select>
            </div>

            <p className="mt-4 text-xs text-slate-500">
                মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে
            </p>

            <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sorted.map((p) => (
                    <ProductCard key={p.id} {...p} />
                ))}
            </div>
        </>
    );
};

export default CategoryProducts;
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
            
            <div className="mt-4 flex items-center justify-end gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 shadow-xs">
                <label htmlFor="sort" className="text-sm font-medium text-slate-600">
                    সাজান:
                </label>
                <div className="relative">
                    <select
                        id="sort"
                        value={sort}
                        onChange={(e) => setSort(e.target.value as SortKey)}
                        className="appearance-none rounded-xl border border-slate-300 bg-white py-1.5 pl-3.5 pr-8 text-sm font-semibold text-slate-700 outline-none transition-colors hover:border-emerald-500 focus:border-emerald-600 cursor-pointer"
                    >
                        <option value="default">ডিফল্ট</option>
                        <option value="priceAsc">দাম: কম থেকে বেশি</option>
                        <option value="priceDesc">দাম: বেশি থেকে কম</option>
                        <option value="rise">সবচেয়ে বেশি বেড়েছে</option>
                        <option value="fall">সবচেয়ে বেশি কমেছে</option>
                    </select>

                
                    <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            <p className="mt-4 text-xs font-medium text-slate-500">
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
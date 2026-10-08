import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

interface Navs {
    id: string;
    slug: string;
    nameBn: string;
    icon?: string;
}

const Navbar = async () => {
    let data: Navs[] = [];

    try {
        const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories", {
            next: { revalidate: 3600 },
        });

        if (res.ok) {
            const result = await res.json();
            data = Array.isArray(result)
                ? result
                : result.categories || result.data || [];
        }
    } catch (error) {
        console.error("Failed to fetch categories:", error);
    }

    const filteredNavs = data.filter((n) => n.slug || n.id);

    return (
        <nav className="w-full bg-slate-50/60 border-y border-gray-200/80 font-bangla">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none">
                {/* Home Link */}
                <Link
                    href="/"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:border-emerald-500 hover:text-emerald-600 transition-all whitespace-nowrap shadow-2xs shrink-0"
                >
                    <span>🏠</span>
                    <span>হোম</span>
                </Link>

                {filteredNavs.map((j) => {
                    const isImageUrl = j.icon && (j.icon.startsWith("http") || j.icon.startsWith("/"));

                    return (
                        <Link
                            key={j.id}
                            href={`/category/${j.slug || j.id}`}
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:border-emerald-500 hover:text-emerald-600 transition-all whitespace-nowrap shadow-2xs shrink-0"
                        >
                            {j.icon && (
                                isImageUrl ? (
                                    <Image
                                        src={j.icon}
                                        alt={j.nameBn}
                                        width={18}
                                        height={18}
                                        className="w-4 h-4 object-contain"
                                    />
                                ) : (
                                    <span className="text-base leading-none">{j.icon}</span>
                                )
                            )}
                            <span>{j.nameBn}</span>
                        </Link>
                    );
                })}
            </div>
            
        </nav>
    );
};

export default Navbar;
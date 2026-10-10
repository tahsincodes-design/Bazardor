import Link from "next/link";

const categories = [
    { label: "চাল", href: "/category/chal" },
    { label: "ডাল", href: "/category/dal" },
    { label: "তেল", href: "/category/tel" },
    { label: "সবজি", href: "/category/sobji" },
    { label: "মাছ", href: "/category/mach" },
    { label: "মাংস", href: "/category/mangsho" },
    { label: "ডিম-দুধ", href: "/category/dim-dui" },
    { label: "মসলা", href: "/category/mosla" },
];

const Footer = () => {
    return (
        <footer className="mt-auto w-full border-t border-slate-200 bg-white">
   
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-12 lg:gap-12 lg:px-8">
        
                <div className="lg:col-span-7 space-y-3">
                    <Link href="/" className="inline-flex items-center gap-2.5">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#038541] text-base text-white shadow-xs">
                            🛒
                        </span>
                        <span className="text-lg font-bold text-slate-900 sm:text-xl">
                            বাজার দর
                        </span>
                    </Link>
                    <p className="max-w-md text-xs leading-relaxed text-slate-600 sm:text-sm">
                        বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে। চাল, ডাল, তেল, সবজি, মাছ, মাংস,
                        ডিম ও মসলার দৈনিক দাম এক জায়গায়।
                    </p>
                </div>

                <div className="lg:col-span-5 lg:justify-self-end">
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-900 sm:text-sm">
                        পণ্যের ধরন
                    </h3>
                    <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5 text-xs text-slate-600 sm:grid-cols-2 sm:gap-x-12 sm:text-sm">
                        {categories.map((c) => (
                            <li key={c.href}>
                                <Link
                                    href={c.href}
                                    className="inline-block transition-colors hover:text-[#038541] hover:underline"
                                >
                                    {c.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="border-t border-slate-100 bg-slate-50/50">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-center text-[11px] text-slate-500 sm:flex-row sm:px-6 sm:text-left sm:text-xs lg:px-8">
                    <p>© ২০২৬ বাজার দর। সর্বস্বত্ব সংরক্ষিত।</p>
                    <p className="text-slate-400 sm:text-slate-500">
                        সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
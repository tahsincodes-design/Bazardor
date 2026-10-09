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
        <footer className="mt-16 w-full border-t border-sky-300 bg-slate-50">
            <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2">
                <div>
                    <Link href="/" className="inline-flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-lg text-white shadow-sm">
                            🛒
                        </span>
                        <span className="text-xl font-bold text-slate-900">বাজার দর</span>
                    </Link>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
                        বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে। চাল, ডাল, তেল, সবজি, মাছ, মাংস,
                        ডিম ও মসলার দৈনিক দাম এক জায়গায়।
                    </p>
                </div>

                <div className="sm:justify-self-end">
                    <h3 className="mb-3 text-sm font-semibold text-slate-900">
                        পণ্যের ধরন
                    </h3>
                    <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-slate-600">
                        {categories.map((c) => (
                            <li key={c.href}>
                                <Link
                                    href={c.href}
                                    className="transition-colors hover:text-green-700"
                                >
                                    {c.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="border-t border-slate-200">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-1 px-4 py-4 text-center text-xs text-slate-500 sm:flex-row sm:text-left">
                    <p>© ২০২৬ বাজার দর। সর্বস্বত্ব সংরক্ষিত।</p>
                    <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
import NavLink from "./NavLinks";

interface Category {
    id: string;
    slug: string;
    nameBn: string;
    icon?: string;
}

const getCategories = async (): Promise<Category[]> => {
    try {
        const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories", {
            next: { revalidate: 3600 },
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        return [];
    }
};

const Navbar = async () => {
    const categories = await getCategories();

    return (
        <nav className="w-full border-y border-gray-200/80 bg-slate-50/60 font-bangla">
            <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8 scrollbar-none">
                <NavLink href="/" icon="🏠" label="হোম" />

                {categories.map((c) => (
                    <NavLink
                        key={c.id}
                        href={`/category/${c.slug}`}
                        icon={c.icon}
                        label={c.nameBn}
                    />
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
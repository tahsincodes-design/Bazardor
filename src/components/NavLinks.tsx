"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
    href: string;
    icon?: string;
    label: string;
}

const NavLink = ({ href, icon, label }: NavLinkProps) => {
    const pathname = usePathname();
    const active = pathname === href;

    return (
        <Link
            href={href}
            className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium shadow-2xs transition-all ${active
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-emerald-500 hover:text-emerald-600"
                }`}
        >
            {icon && <span className="text-base leading-none">{icon}</span>}
            <span>{label}</span>
        </Link>
    );
};

export default NavLink;
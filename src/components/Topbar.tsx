import Link from "next/link";
import Navbar from "./Navbar";
import Marquee from "./Marquee";
import HeaderDate from "./HeaderDate";
import UserInfo from "./UserInfo";

export default function TopBar() {
    return (
        <div className="w-full border-b border-gray-200 bg-white font-bangla">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
                <Link href="/" className="group flex items-center space-x-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-600">
                        <i className="fa-solid fa-cart-shopping text-3xl text-white transition-transform duration-300 group-hover:scale-105"></i>
                    </div>

                    <div>
                        <h1 className="text-xl font-bold leading-none text-gray-900 transition-colors group-hover:text-emerald-600">
                            বাজার দর
                        </h1>
                        <HeaderDate />
                    </div>
                </Link>

                <div>
                    <UserInfo/>
                </div>
            </div>

            <Navbar />
            <Marquee />
        </div>
    );
}
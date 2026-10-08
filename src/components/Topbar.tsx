"use client";


import Link from "next/link";
import { useSyncExternalStore } from "react";
import Navbar from "./Navbar";
import Marquee from "./Marquee";



const subscribe = () => () => { };

function getDate() {
    return new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default function TopBar() {
    const date = useSyncExternalStore(subscribe, getDate, () => "");

    return (
        <div className="w-full bg-white border-b border-gray-200 font-bangla">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-3 group">
                    <div className="shrink-0 rounded-lg bg-emerald-600 w-12 h-12 flex items-center justify-center">
                        <i className="fa-solid fa-cart-shopping text-white text-3xl transition-transform duration-300 group-hover:scale-105"></i>
                    </div>

                    <div>
                        <h1 className="text-xl font-bold text-gray-900 leading-none group-hover:text-emerald-600 transition-colors">
                            বাজার দর
                        </h1>

                        <span className="block text-[11px] font-medium text-slate-400 leading-none mt-1.5 min-h-[14px]">
                            {date}
                        </span>
                    </div>
                </Link>

                <div className="flex items-center space-x-3">
                    <Link
                        href="/login"
                        className="text-sm font-medium text-gray-700 hover:text-emerald-600 px-3 py-2 transition-colors"
                    >
                        সাইন ইন
                    </Link>
                    <Link
                        href="/register"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-xs"
                    >
                        সাইন আপ
                    </Link>
                </div>
            </div>
            <div>
                
                <Navbar />
                <Marquee/>
                
            </div>

            

        </div>
        
        
    );
}
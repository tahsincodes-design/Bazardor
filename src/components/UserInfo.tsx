'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

const UserInfo = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        setIsOpen(false);
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        toast.success('সাইন আউট সফল হয়েছে!');
                        router.push('/');
                    },
                    onError: (ctx) => {
                        toast.error(ctx.error?.message || 'সাইন আউট ব্যর্থ হয়েছে!');
                    },
                },
            });
        } catch {
            toast.error('একটি অপ্রত্যাশিত ত্রুটি ঘটেছে।');
        }
    };

    if (isPending) {
        return (
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200" />
                <div className="hidden sm:block h-4 w-16 animate-pulse rounded bg-slate-200" />
            </div>
        );
    }

    return (
        <div className="relative" ref={dropdownRef}>
            {user ? (
                <>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-2 rounded-full bg-slate-100/80 p-1 pr-3 hover:bg-slate-200/70 transition-all cursor-pointer focus:outline-none"
                    >
                        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-slate-200">
                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name || 'User'}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-slate-800 text-xs font-bold text-white">
                                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                </div>
                            )}
                        </div>

                        <span className="hidden sm:inline-block text-xs font-bold text-slate-800 max-w-[110px] truncate">
                            {user.name?.split(' ')[0] || 'ব্যবহারকারী'}
                        </span>

                        <svg
                            className={`h-3.5 w-3.5 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-60 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xl shadow-slate-300/40 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                            {/* User Profile Details */}
                            <div className="mb-3">
                                <h4 className="text-sm font-bold text-slate-900 truncate">
                                    {user.name || 'ব্যবহারকারী'}
                                </h4>
                                <p className="text-xs text-slate-500 truncate mt-0.5">
                                    {user.email}
                                </p>
                            </div>

                            <div className="my-2.5 h-px bg-slate-100" />

                            <div className="space-y-1">
                                <Link
                                    href="/profile"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                                >
                                    <svg className="h-4 w-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span>আমার প্রোফাইল</span>
                                </Link>

                                <button
                                    onClick={handleSignOut}
                                    className="w-full flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left"
                                >
                                    <svg className="h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span>সাইন আউট</span>
                                </button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex items-center space-x-3">
                    <Link
                        href="/signIn"
                        className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-emerald-600"
                    >
                        সাইন ইন
                    </Link>
                    <Link
                        href="/SignUp"
                        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-xs transition-colors hover:bg-emerald-700"
                    >
                        সাইন আপ
                    </Link>
                </div>
            )}
        </div>
    );
};

export default UserInfo;
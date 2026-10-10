"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInSection() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        await signIn.email(
            { email, password },
            {
                onSuccess: () => router.push("/"),
                onError: (ctx) => {
                    setError(ctx.error.message || "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে");
                    setLoading(false);
                },
            }
        );
    };

    const handleSocialSignIn = async (provider: "google" | "github") => {
        await signIn.social({
            provider,
            callbackURL: "/",
        });
    };

    return (
        <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
            {error && (
                <p className="mb-4 rounded-lg bg-red-50 p-2.5 text-center text-xs font-medium text-red-600">
                    {error}
                </p>
            )}

            <form onSubmit={handleEmailSignIn} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-700">
                        ইমেইল
                    </label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                        placeholder="you@example.com"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-700">
                        পাসওয়ার্ড
                    </label>
                    <div className="relative mt-1.5">
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 pr-10 text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                            placeholder="কমপক্ষে ৮ অক্ষর"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? (
                      
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                    />
                                </svg>
                            ) : (
                                /* Eye Icon */
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.036 12c.729-2.3 2.19-4.32 4.1-5.714C8.2 4.887 10.05 4.5 12 4.5c1.95 0 3.8.387 5.864 1.786 1.91 1.394 3.371 3.414 4.1 5.714-.729 2.3-2.19 4.32-4.1 5.714C15.8 19.113 13.95 19.5 12 19.5c-1.95 0-3.8-.387-5.864-1.786-1.91-1.394-3.371-3.414-4.1-5.714z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-[#038541] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#026f36] disabled:opacity-50 cursor-pointer"
                >
                    {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
                </button>
            </form>

            {/* Divider */}
            <div className="my-5 flex items-center gap-2 text-xs text-slate-400">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-[11px] text-slate-400">অথবা</span>
                <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <button
                    type="button"
                    onClick={() => handleSocialSignIn("google")}
                    className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2 py-2 text-[11px] font-medium text-slate-700 shadow-2xs transition-all duration-200 hover:border-slate-300 hover:bg-slate-100/80 hover:shadow-xs active:scale-95"
                >
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                    </svg>
                    <span>Google দিয়ে চালিয়ে যান</span>
                </button>

                <button
                    type="button"
                    onClick={() => handleSocialSignIn("github")}
                    className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2 py-2 text-[11px] font-medium text-slate-700 shadow-2xs transition-all duration-200 hover:border-slate-300 hover:bg-slate-100/80 hover:shadow-xs active:scale-95"
                >
                    <svg className="h-4 w-4 fill-slate-800" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>GitHub দিয়ে চালিয়ে যান</span>
                </button>
            </div>

            <p className="mt-5 text-center text-xs text-slate-500">
                অ্যাকাউন্ট নেই?{" "}
                <Link
                    href="/signUp"
                    className="font-semibold text-[#038541] hover:underline"
                >
                    সাইন আপ করুন
                </Link>
            </p>
        </div>
    );
}
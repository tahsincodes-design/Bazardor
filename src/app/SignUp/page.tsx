import Link from "next/link";
import SignUpSection from "@/components/SignUpSection";

export default function SignUpPage() {
    return (
        <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center bg-emerald-50/40 px-4 py-8">
            {/* Header Text Outside Card */}
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-slate-900">অ্যাকাউন্ট তৈরি করুন</h1>
                <p className="mt-1 text-xs text-slate-500">
                    বিনা খরচে সাইন আপ করে সব বিস্তারিত দর দেখুন।
                </p>
            </div>

            <SignUpSection />

            <Link
                href="/"
                className="mt-6 text-xs text-slate-500 transition-colors hover:text-slate-800"
            >
                ← হোম পেজে ফিরে যান
            </Link>
        </div>
    );
}
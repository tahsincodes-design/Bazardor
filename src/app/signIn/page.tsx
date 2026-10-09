import Link from "next/link";
import SignInSection from "@/components/SignInSection";

export default function SignInPage() {
    return (
        <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center bg-emerald-50/40 px-4 py-8">
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-slate-900">সাইন ইন</h1>
                <p className="mt-1 text-xs text-slate-500">
                    বিস্তারিত দর, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                </p>
            </div>

            <SignInSection />

            <Link
                href="/"
                className="mt-6 text-xs text-slate-500 transition-colors hover:text-slate-800"
            >
                ← হোম পেজে ফিরে যান
            </Link>
        </div>
    );
}
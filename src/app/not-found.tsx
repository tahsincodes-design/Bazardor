import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center bg-slate-50/60 px-4 text-center">
            <div className="w-full max-w-md space-y-5 rounded-3xl bg-white p-8 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50 text-[#038541] font-black text-3xl shadow-inner">
                    404
                </div>

                <div className="space-y-1.5">
                    <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                        পৃষ্ঠাটি পাওয়া যায়নি!
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                        আপনি যে পেজটি খুঁজছেন তা হয়তো মুছে ফেলা হয়েছে অথবা লিংকটি সঠিক নয়।
                    </p>
                </div>

                <div className="pt-3">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-[#038541] px-5 py-3 text-xs sm:text-sm font-bold text-white transition-all hover:bg-[#026f36] shadow-md shadow-emerald-600/20 active:scale-95"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span>হোম পেজে ফিরে যান</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
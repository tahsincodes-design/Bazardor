export default function Loading() {
    return (
        <div className="mx-auto max-w-6xl px-4 py-8 animate-pulse space-y-6">

            <div className="h-44 w-full rounded-2xl bg-slate-200/80" />

            <div className="flex gap-3 overflow-hidden py-2">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-10 w-24 shrink-0 rounded-full bg-slate-200" />
                ))}
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="rounded-2xl border border-slate-200/80 bg-white p-4 space-y-3">
                        <div className="h-28 w-full rounded-xl bg-slate-200" />
                        <div className="h-4 w-3/4 rounded bg-slate-200" />
                        <div className="h-5 w-1/2 rounded bg-slate-200" />
                    </div>
                ))}
            </div>
        </div>
    );
}
import ProfileSection from "@/components/ProfileSection";

export default function ProfilePage() {
    return (
        <div className="min-h-[calc(100vh-80px)] bg-emerald-50/40 px-4 py-10">
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-slate-900">আমার প্রোফাইল</h1>
                <p className="mt-1 text-xs text-slate-500">
                    আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                </p>
            </div>

            <ProfileSection />
        </div>
    );
}
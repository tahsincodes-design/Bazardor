"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfileSection() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [name, setName] = useState(() => user?.name || "");
    const [image, setImage] = useState(() => user?.image || "");
    const [profileSource, setProfileSource] = useState(() => ({
        id: user?.id,
        name: user?.name,
        image: user?.image,
    }));
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    if (
        user &&
        (profileSource.id !== user.id ||
            profileSource.name !== user.name ||
            profileSource.image !== user.image)
    ) {
        setProfileSource({ id: user.id, name: user.name, image: user.image });
        setName(user.name || "");
        setImage(user.image || "");
    }

    if (isPending) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#038541] border-t-transparent" />
            </div>
        );
    }

    if (!session || !user) {
        return null;
    }

    const handleSignOut = async () => {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("সাইন আউট সফল হয়েছে!");
                        router.push("/signIn");
                    },
                    onError: (ctx) => {
                        toast.error(ctx.error?.message || "সাইন আউট ব্যর্থ হয়েছে!");
                    },
                },
            });
        } catch {
            toast.error("সাইন আউট করতে সমস্যা হয়েছে");
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);

        try {
            // ১. নাম ও প্রোফাইল ছবি আপডেট
            const updateData: { name?: string; image?: string } = {};
            if (name !== user.name) updateData.name = name;
            if (image !== user.image) updateData.image = image;

            if (Object.keys(updateData).length > 0) {
                const { error } = await authClient.updateUser(updateData);
                if (error) {
                    toast.error(error.message || "প্রোফাইল তথ্য আপডেট ব্যর্থ হয়েছে");
                    setIsUpdating(false);
                    return;
                }
            }

            // ২. পাসওয়ার্ড পরিবর্তন (যদি দেওয়া হয়ে থাকে)
            if (newPassword) {
                if (!currentPassword) {
                    toast.error("পাসওয়ার্ড পরিবর্তনের জন্য বর্তমান পাসওয়ার্ড প্রয়োজন");
                    setIsUpdating(false);
                    return;
                }

                const { error: passError } = await authClient.changePassword({
                    newPassword,
                    currentPassword,
                    revokeOtherSessions: true,
                });

                if (passError) {
                    toast.error(passError.message || "পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে");
                    setIsUpdating(false);
                    return;
                }
                setCurrentPassword("");
                setNewPassword("");
            }

            toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
        } catch {
            toast.error("একটিunexpected ত্রুটি ঘটেছে");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="mx-auto max-w-xl space-y-6">
            {/* Header Summary Card */}
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
                <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                        {image ? (
                            <Image
                                src={image}
                                alt={name || "User Avatar"}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-[#038541] text-xl font-bold text-white">
                                {name?.charAt(0)?.toUpperCase() || "U"}
                            </div>
                        )}
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-slate-900">
                            {user.name || "ব্যবহারকারী"}
                        </h2>
                        <p className="mt-0.5 text-xs text-slate-500">{user.email}</p>
                    </div>
                </div>

                {/* Sign Out Button */}
                <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50/50 px-3.5 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100 cursor-pointer"
                >
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                    </svg>
                    <span>সাইন আউট</span>
                </button>
            </div>

            {/* Profile Form Card */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
                <h3 className="text-base font-bold text-slate-900">তথ্য</h3>

                <form onSubmit={handleUpdateProfile} className="mt-4 space-y-4">
                    {/* Name Field */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-700">
                            নাম
                        </label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                            placeholder="আপনার নাম"
                        />
                    </div>

                    {/* Profile Picture Link */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-700">
                            প্রোফাইল ছবি (ইমেজ URL)
                        </label>
                        <input
                            type="url"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                            placeholder="https://example.com/avatar.jpg"
                        />
                    </div>

                    {/* Optional Password Section */}
                    <div className="pt-2 border-t border-slate-100">
                        <p className="text-xs font-bold text-slate-700 mb-3">
                            পাসওয়ার্ড পরিবর্তন (ঐচ্ছিক)
                        </p>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-medium text-slate-600">
                                    বর্তমান পাসওয়ার্ড
                                </label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-800 focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-600">
                                    নতুন পাসওয়ার্ড
                                </label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-800 focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                                    placeholder="কমপক্ষে ৮ অক্ষর"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isUpdating}
                        className="w-full rounded-xl bg-[#038541] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#026f36] disabled:opacity-50 cursor-pointer"
                    >
                        {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
                    </button>
                </form>
            </div>
        </div>
    );
}
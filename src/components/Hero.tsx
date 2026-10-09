import Link from "next/link";
import HeroDate from "./HeroDate";
import Image from "next/image";
import heroBanner from '@/assets/bazar-hero.png'



const Hero = () => {
    return (
        <section className="bg-emerald-50/60 pt-2 " >
            <div className = "w-full  px-4 py-6 sm:py-8 mx-auto max-w-7xl ">
                <div className="w-full sm:py-8 mx-auto max-w-7xl pb-6  flex flex-col-reverse items-center justify-between gap-6 rounded-3xl border border-slate-200 bg-white/80 px-6 py-8 shadow-xs sm:px-10 md:flex-row md:py-10">
                {/* Text */}
                <div className="max-w-xl text-center md:text-left">
                    <HeroDate />

                    <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                        আজকের বাজারের দাম এক নজরে
                    </h2>

                    <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
                        গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    <Link
                        href="/products"
                        className="mt-6 inline-block rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-emerald-800"
                    >
                        সব পণ্য দেখুন
                    </Link>
                </div>

                <div className="w-44 shrink-0 sm:w-56 md:mr-6 md:w-64">
                    <Image
                        src={heroBanner}
                        alt="ফল ও সবজির ঝুড়ি"
                        width={260}
                        height={230}
                        priority
                        className="h-auto w-full"
                    />
                </div>
            </div>
            </div>
        </section>
    );
};

export default Hero;
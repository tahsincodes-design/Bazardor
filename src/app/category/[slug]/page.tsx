import { Suspense } from "react";
import { notFound } from "next/navigation";
import CategoryProducts from "@/components/CategoryProducts";

// Vercel Deployment & Refresh Fix
// export const revalidate = 300;

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const getProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
    if (!res.ok) return [];
    const data = await res.json();
    return data;
  } catch {
    return [];
  }
};

const toBn = (n: number | string): string =>
  String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

export const generateStaticParams = async () => {
  const products = await getProducts();
  const slugs = [...new Set(products.map((p) => p.category))];
  return slugs.map((slug) => ({ slug }));
};

const CategoryContent = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;
  const all = await getProducts();
  const products = all.filter((p) => p.category === slug);

  if (products.length === 0) {
    notFound();
  }

  const categoryName = products[0].categoryNameBn;
  const icon = products[0].image;

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Category header */}
      <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-xs">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-3xl">
          {icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{categoryName}</h1>
          <p className="text-sm text-slate-500">
            {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {/* Sort bar + cards */}
      <CategoryProducts products={products} />
    </div>
  );
};

const CategorySkeleton = () => (
  <div className="mx-auto max-w-6xl px-4 animate-pulse space-y-6">
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-xs">
      <div className="h-12 w-12 rounded-full bg-slate-200" />
      <div className="space-y-2">
        <div className="h-6 w-36 rounded bg-slate-200" />
        <div className="h-4 w-48 rounded bg-slate-200" />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="rounded-2xl border border-slate-200/80 bg-white p-4 space-y-3">
          <div className="h-24 w-full rounded-xl bg-slate-200" />
          <div className="h-4 w-3/4 rounded bg-slate-200" />
          <div className="h-5 w-1/2 rounded bg-slate-200" />
        </div>
      ))}
    </div>
  </div>
);

const CategoryPage = ({ params }: CategoryPageProps) => {
  return (
    <div className="bg-emerald-50/60 pb-10 pt-6 min-h-[calc(100vh-120px)]">
      <Suspense fallback={<CategorySkeleton />}>
        <CategoryContent params={params} />
      </Suspense>
    </div>
  );
};

export default CategoryPage;
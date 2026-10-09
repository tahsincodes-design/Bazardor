import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products", {
    next: { revalidate: 300 },
  });
  const data = await res.json();
  return data;
}

export default async function Home() {
  const products = await getProducts();

  const risen = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallen = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct) 
    .slice(0, 6);

  return (
    <div className="bg-emerald-50/60 pb-10">
      <Hero />

      <div className="mx-auto max-w-7xl px-4">
  
        <h2 className="mt-6 text-lg font-bold text-slate-900">
          <span className="mr-2 text-sm text-red-600">▲</span>আজ দাম বেড়েছে
        </h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {risen.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>

        <h2 className="mt-8 text-lg font-bold text-slate-900">
          <span className="mr-2 text-sm text-green-600">▼</span>আজ দাম কমেছে
        </h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fallen.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>

        <h2 className="mt-8 text-lg font-bold text-slate-900">সব পণ্য</h2>
        <p className="mt-1 text-xs text-slate-500">
          মোট {String(products.length).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)])}টি পণ্য দেখানো হচ্ছে
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </div>
  )};
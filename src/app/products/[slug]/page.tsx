import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface ProductDetail extends Product {
  markets: Market[];
}

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const BASE = "https://api.abcz.workers.dev/api/bazardor/products";

const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(BASE, { next: { revalidate: 300 } });
  const data = await res.json();
  return data;
};

const getDetail = async (id: number): Promise<ProductDetail | null> => {
  try {
    const res = await fetch(`${BASE}/${id}`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
};

const toBn = (n: number | string): string =>
  String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

// 63 -> "৬৩", 63.5 -> "৬৩.৫০"
const money = (n: number): string =>
  toBn(Number.isInteger(n) ? n.toLocaleString("en-US") : n.toFixed(2));

const unitBn: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export const generateStaticParams = async () => {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
};

interface SummaryCardProps {
  label: string;
  value: number;
  note: string;
  tone: string;
}

const SummaryCard = ({ label, value, note, tone }: SummaryCardProps) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4">
    <p className="text-xs text-slate-500">{label}</p>
    <p className={`mt-1 text-2xl font-bold ${tone}`}>
      {money(value)} <span className="text-sm font-medium">টাকা</span>
    </p>
    <p className="mt-1 text-xs text-slate-500">{note}</p>
  </div>
);

const ProductContent = async ({ params }: ProductPageProps) => {
  const { slug } = await params;
  const all = await getProducts();
  const product = all.find((p) => p.slug === slug);

  if (!product) notFound();

  const detail = await getDetail(product.id);
  const markets = (detail?.markets ?? []).map((m) => ({
    ...m,
    avg: (m.min + m.max) / 2,
  }));

  const lowest = markets.length
    ? markets.reduce((a, b) => (b.min < a.min ? b : a))
    : null;
  const highest = markets.length
    ? markets.reduce((a, b) => (b.max > a.max ? b : a))
    : null;

  const min = lowest?.min ?? product.today;
  const max = highest?.max ?? product.today;
  const avg = product.today;

  const unit = unitBn[product.unit] ?? product.unit;
  const { dir, pct } = product.change;
  const diff = Math.abs(product.today - product.yesterday);

  const badge =
    dir === "up"
      ? "text-red-600"
      : dir === "down"
      ? "text-green-600"
      : "text-slate-500";
  const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
  const sentence =
    dir === "up"
      ? `গতকালের তুলনায় আজ দাম বেড়েছে ${toBn(diff)} টাকা`
      : dir === "down"
      ? `গতকালের তুলনায় আজ দাম কমেছে ${toBn(diff)} টাকা`
      : "গতকালের তুলনায় দাম অপরিবর্তিত";

  return (
    <div className="mx-auto max-w-5xl px-4">
      {/* breadcrumb */}
      <nav className="mb-4 flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-emerald-700">
          হোম
        </Link>
        <span>›</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-emerald-700"
        >
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span className="text-slate-800">{product.nameBn}</span>
      </nav>

      {/* header card */}
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-4xl">
            {product.image}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {product.nameBn}
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              প্রতি {unit} · {product.categoryNameBn}
            </p>
            <p className="mt-1 text-xs text-slate-600">{sentence}</p>
          </div>
        </div>

        <div className="shrink-0 rounded-xl bg-slate-100 px-5 py-3 text-center">
          <p className="text-[11px] text-slate-500">আজকের দাম</p>
          <p className="text-2xl font-bold text-slate-900">
            {money(product.today)}
          </p>
          <p className="text-[11px] text-slate-500">টাকা / {unit}</p>
          <p className={`mt-1 text-xs font-semibold ${badge}`}>
            {arrow} {toBn(Math.abs(pct))}%
          </p>
        </div>
      </div>

      {/* summary */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <h2 className="text-base font-bold text-slate-900">দামের সারসংক্ষেপ</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <SummaryCard
            label="সর্বনিম্ন দাম"
            value={min}
            note={
              lowest
                ? `${lowest.market}, ${lowest.division}`
                : "সবচেয়ে কম দামের বাজার"
            }
            tone="text-green-700"
          />
          <SummaryCard
            label="সর্বাধিক দাম"
            value={max}
            note={
              highest
                ? `${highest.market}, ${highest.division}`
                : "সবচেয়ে বেশি দামের বাজার"
            }
            tone="text-red-600"
          />
          <SummaryCard
            label="গড় দাম"
            value={avg}
            note={`প্রতি ${unit}-এর হিসাবে`}
            tone="text-emerald-700"
          />
        </div>

        {/* market table */}
        {markets.length > 0 && (
          <>
            <h2 className="mt-6 text-base font-bold text-slate-900">
              বাজারভিত্তিক আজকের দাম
            </h2>
            <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full min-w-[640px] text-left text-xs">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-medium">বাজার</th>
                    <th className="px-4 py-3 font-medium">বিভাগ</th>
                    <th className="px-4 py-3 text-right font-medium">
                      সর্বনিম্ন
                    </th>
                    <th className="px-4 py-3 text-right font-medium">
                      সর্বাধিক
                    </th>
                    <th className="px-4 py-3 text-right font-medium">গড়</th>
                  </tr>
                </thead>
                <tbody>
                  {markets.map((m, i) => (
                    <tr
                      key={`${m.market}-${i}`}
                      className="border-t border-slate-200 text-slate-800 even:bg-slate-50/60"
                    >
                      <td className="px-4 py-3">{m.market}</td>
                      <td className="px-4 py-3 text-slate-600">{m.division}</td>
                      <td className="px-4 py-3 text-right">
                        {money(m.min)} টাকা
                      </td>
                      <td className="px-4 py-3 text-right">
                        {money(m.max)} টাকা
                      </td>
                      <td className="px-4 py-3 text-right font-semibold">
                        {money(m.avg)} টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const ProductPage = ({ params }: ProductPageProps) => {
  return (
    <div className="bg-emerald-50/60 pb-10 pt-6">
      <Suspense
        fallback={
          <div className="mx-auto max-w-5xl px-4">
            <div className="h-32 animate-pulse rounded-2xl bg-white" />
          </div>
        }
      >
        <ProductContent params={params} />
      </Suspense>
    </div>
  );
};

export default ProductPage;
import { money } from "@/types/formatter";

export interface Market {
    market: string;
    division: string;
    min: number;
    max: number;
    avg?: number;
}

interface MarketTableProps {
    markets: Market[];
}

export const MarketTable = ({ markets }: MarketTableProps) => {
    if (!markets || markets.length === 0) return null;

    return (
        <>
            <h2 className="mt-6 text-base font-bold text-slate-900">
                বাজারভিত্তিক আজকের দাম
            </h2>
            <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full min-w-[640px] text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500">
                        <tr>
                            <th className="px-4 py-3 font-medium">বাজার</th>
                            <th className="px-4 py-3 font-medium">বিভাগ</th>
                            <th className="px-4 py-3 text-right font-medium">সর্বনিম্ন</th>
                            <th className="px-4 py-3 text-right font-medium">সর্বাধিক</th>
                            <th className="px-4 py-3 text-right font-medium">গড়</th>
                        </tr>
                    </thead>
                    <tbody>
                        {markets.map((m, i) => (
                            <tr
                                key={`${m.market}-${i}`}
                                className="border-t border-slate-200 text-slate-800 even:bg-slate-50/60"
                            >
                                <td className="px-4 py-3 font-medium">{m.market}</td>
                                <td className="px-4 py-3 text-slate-600">{m.division}</td>
                                <td className="px-4 py-3 text-right">{money(m.min)} টাকা</td>
                                <td className="px-4 py-3 text-right">{money(m.max)} টাকা</td>
                                <td className="px-4 py-3 text-right font-semibold">
                                    {money(m.avg ?? (m.min + m.max) / 2)} টাকা
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
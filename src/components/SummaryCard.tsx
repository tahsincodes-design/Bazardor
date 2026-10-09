import { money } from "@/types/formatter";

interface SummaryCardProps {
  label: string;
  value: number;
  note: string;
  tone: string;
}

export const SummaryCard = ({ label, value, note, tone }: SummaryCardProps) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
    <p className="text-xs text-slate-500">{label}</p>
    <p className={`mt-1 text-2xl font-bold ${tone}`}>
      {money(value)} <span className="text-sm font-medium text-slate-700">টাকা</span>
    </p>
    <p className="mt-1 text-xs text-slate-500">{note}</p>
  </div>
);
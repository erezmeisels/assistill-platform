"use client";

import { useState } from "react";
import { Calculator, Loader2, ChevronDown, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

interface SubCategoryOption {
  value: string;
  label: string;
  description: string;
  hourlyRate: number;
  dailyRate: number;
  isCustom: boolean;
}

interface QuoteResult {
  subCategory: string;
  hourlyRate: number;
  dailyRate: number;
  isCustom: boolean;
  rateSource: string;
  hours: number;
  days: number;
  totalFromHours: number;
  totalFromDays: number;
  recommendedTotal: number;
  breakdown: string;
}

interface Props {
  companionId: string;
  companionName: string;
  subCategoryOptions: SubCategoryOption[];
}

export function QuoteWidget({ companionId, companionName, subCategoryOptions }: Props) {
  const [subCategory, setSubCategory] = useState(subCategoryOptions[0]?.value ?? "");
  const [hours,       setHours]       = useState("");
  const [days,        setDays]        = useState("");
  const [loading,     setLoading]     = useState(false);
  const [result,      setResult]      = useState<QuoteResult | null>(null);
  const [error,       setError]       = useState<string | null>(null);

  const selectedSub = subCategoryOptions.find((s) => s.value === subCategory);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const body: Record<string, unknown> = { subCategory };
      if (hours) body.hours = parseFloat(hours);
      if (days)  body.days  = parseFloat(days);

      const res  = await fetch(`/api/companions/${companionId}/quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(
          data.details
            ? Object.values(data.details).flat().join(", ")
            : data.error ?? "Something went wrong"
        );
        return;
      }
      setResult(data.quote as QuoteResult);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <Calculator className="h-4 w-4 text-slate-400" />
          Get an instant quote
        </h2>
        <p className="mt-0.5 text-xs text-slate-400">for {companionName}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 p-6">
        {/* Service */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-600">Service</label>
          <div className="relative">
            <select
              value={subCategory}
              onChange={(e) => { setSubCategory(e.target.value); setResult(null); }}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 pr-9 text-sm text-slate-800 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0f172a]/10"
            >
              {subCategoryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>

          {/* Description */}
          {selectedSub?.description && (
            <div className="mt-2 flex items-start gap-1.5 rounded-lg bg-slate-50 px-3 py-2">
              <Info className="mt-0.5 h-3 w-3 shrink-0 text-slate-400" />
              <p className="text-xs leading-5 text-slate-500">{selectedSub.description}</p>
            </div>
          )}

          {selectedSub && (
            <p className="mt-1.5 text-xs text-slate-400">
              ₪{selectedSub.hourlyRate}/h · ₪{selectedSub.dailyRate}/d
              {selectedSub.isCustom && <span className="ml-1 text-blue-600">(custom rate)</span>}
            </p>
          )}
        </div>

        {/* Duration */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-600">Hours</label>
            <input
              type="number" min="0.5" step="0.5" placeholder="e.g. 3"
              value={hours}
              onChange={(e) => { setHours(e.target.value); setResult(null); }}
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0f172a]/10"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-600">Days</label>
            <input
              type="number" min="1" step="1" placeholder="e.g. 2"
              value={days}
              onChange={(e) => { setDays(e.target.value); setResult(null); }}
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0f172a]/10"
            />
          </div>
        </div>
        <p className="text-xs text-slate-400 -mt-2">Fill in hours, days, or both — we pick the better deal.</p>

        <Button type="submit" className="w-full" disabled={loading || (!hours && !days)}>
          {loading ? <><Loader2 className="h-4 w-4 animate-spin" />Calculating…</> : "Calculate quote"}
        </Button>

        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
        )}

        {result && (
          <div className="rounded-xl bg-[#0f172a] p-5 text-white space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-slate-400">Recommended total</span>
              <span className="text-3xl font-bold">₪{result.recommendedTotal.toLocaleString()}</span>
            </div>
            <div className={cn(
              "rounded-lg px-3 py-2 text-xs",
              result.isCustom ? "bg-blue-900/40 text-blue-300" : "bg-slate-800 text-slate-400"
            )}>
              {result.isCustom ? "Custom service rate applied" : "Base rate applied"}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{result.breakdown}</p>
            {result.hours > 0 && result.days > 0 && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="rounded-lg bg-slate-800 px-3 py-2 text-center">
                  <p className="text-xs text-slate-500">Hourly option</p>
                  <p className="font-semibold">₪{result.totalFromHours.toLocaleString()}</p>
                </div>
                <div className="rounded-lg bg-slate-800 px-3 py-2 text-center">
                  <p className="text-xs text-slate-500">Daily option</p>
                  <p className="font-semibold">₪{result.totalFromDays.toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

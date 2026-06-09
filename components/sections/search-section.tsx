"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  MapPin, Languages, Star, Clock, Loader2, X, ArrowRight, Info, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel,
  SelectSeparator, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORY_TREE, SUB_CATEGORY_META, PRIMARY_CATEGORY_META, type SubCategoryMeta } from "@/lib/categories";
import { BookingFlow } from "@/components/booking/booking-flow";
import { REGION_GROUPS, CITY_TO_REGION, LANGUAGE_OPTIONS } from "./search-section-constants";
import { useTranslations } from "@/lib/i18n/context";
import { cn } from "@/lib/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MatchedCompanion {
  id: string;
  firstName: string;
  lastName: string;
  bio: string;
  location: string;
  hourlyRate: string;
  averageRating: number | null;
  reviewCount: number;
  isApprovedByAdmin: boolean;
  categories: Array<{ primaryCategory: string; subCategory: string }>;
  languages: Array<{ languageCode: string; level: string }>;
  availabilities: Array<{ date: string }>;
}

// ─── API ──────────────────────────────────────────────────────────────────────

async function fetchCompanions(filters: {
  primaryCategory: string; region: string; subCategory: string; language: string;
}): Promise<{ companions: MatchedCompanion[]; total: number }> {
  const params = new URLSearchParams();
  if (filters.primaryCategory) params.set("primaryCategory", filters.primaryCategory);
  if (filters.region)          params.set("region",          filters.region);
  if (filters.subCategory)     params.set("subCategory",     filters.subCategory);
  if (filters.language)        params.set("language",        filters.language);
  const res = await fetch(`/api/companions/match?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

// ─── Sub-category description ─────────────────────────────────────────────────

function SubCategoryDescription({ meta }: { meta: SubCategoryMeta }) {
  return (
    <div className="mt-2 flex items-start gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2.5">
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500" />
      <p className="text-xs leading-5 text-blue-700">{meta.description}</p>
    </div>
  );
}

// ─── Skeleton card ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-100 bg-white p-5">
      <div className="flex items-start gap-4">
        <div className="h-11 w-11 rounded-xl bg-slate-100" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 rounded bg-slate-100" />
          <div className="h-3 w-24 rounded bg-slate-100" />
        </div>
        <div className="h-6 w-14 rounded bg-slate-100" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full rounded bg-slate-100" />
        <div className="h-3 w-4/5 rounded bg-slate-100" />
      </div>
      <div className="mt-4 flex gap-2">
        <div className="h-5 w-16 rounded-full bg-slate-100" />
        <div className="h-5 w-12 rounded-full bg-slate-100" />
      </div>
      <div className="mt-5 h-9 w-full rounded-lg bg-slate-100" />
    </div>
  );
}

// ─── Professional card ────────────────────────────────────────────────────────

function ProfessionalCard({ companion }: { companion: MatchedCompanion }) {
  const { t } = useTranslations();
  const initials = `${companion.firstName[0]}${companion.lastName[0]}`.toUpperCase();
  const baseRate = parseFloat(companion.hourlyRate);

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:scale-[1.025] hover:shadow-lg hover:shadow-slate-900/[0.07]">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0f172a] text-sm font-bold text-white">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-[#0f172a]">
                {companion.firstName} {companion.lastName}
              </h3>
              {companion.isApprovedByAdmin && (
                <Badge variant="blue" className="text-[10px]">{t.search.verified}</Badge>
              )}
            </div>
            <div className="mt-0.5 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {companion.location}
              </span>
              {companion.averageRating !== null && (
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {companion.averageRating.toFixed(1)}
                  <span className="text-slate-300">({companion.reviewCount})</span>
                </span>
              )}
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-xl font-bold text-[#0f172a]">₪{baseRate}</p>
            <p className="text-xs text-slate-400">{t.search.perHour}</p>
          </div>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">{companion.bio}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {companion.categories.map(({ subCategory }) => {
            const meta = SUB_CATEGORY_META[subCategory];
            return (
              <Badge key={subCategory} variant="secondary" className="text-[11px]">
                {meta?.label ?? subCategory}
              </Badge>
            );
          })}
          {companion.languages.map(({ languageCode, level }) => (
            <Badge key={languageCode} variant="outline" className="text-[11px]">
              <Languages className="me-1 h-2.5 w-2.5" />
              {languageCode.toUpperCase()}
              {level === "NATIVE" && " ✦"}
            </Badge>
          ))}
        </div>

        {companion.availabilities.length > 0 && (
          <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
            <Clock className="h-3 w-3" />
            {t.search.available}{" "}
            {companion.availabilities
              .slice(0, 3)
              .map((a) => new Date(a.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" }))
              .join(", ")}
          </div>
        )}

        <div className="mt-5">
          <a href={`/companions/${companion.id}`}>
            <Button size="sm" className="w-full gap-1.5">
              {t.search.viewProfile}
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Search Section ───────────────────────────────────────────────────────────

export function SearchSection() {
  const { t } = useTranslations();
  const searchParams = useSearchParams();

  // Initialize primaryCat from URL ?category= (new /search page) or ?cat= (legacy home page)
  const [primaryCat, setPrimaryCat] = useState(
    () => searchParams.get("category") ?? searchParams.get("cat") ?? ""
  );
  const [subCat,     setSubCat]     = useState("");
  const [city,       setCity]       = useState("");
  const [language,   setLanguage]   = useState("");

  // Keep in sync when URL params change (e.g. browser back/forward, hero tile click)
  useEffect(() => {
    const cat = searchParams.get("category") ?? searchParams.get("cat");
    if (cat && cat !== primaryCat) { setPrimaryCat(cat); setSubCat(""); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const [bookingOpen, setBookingOpen] = useState(false);

  const region          = city ? (CITY_TO_REGION[city] ?? "") : "";
  const subCatOptions   = primaryCat
    ? (CATEGORY_TREE.find((p) => p.value === primaryCat)?.subCategories ?? [])
    : [];
  const selectedSubMeta = subCat ? SUB_CATEGORY_META[subCat] : null;
  const primaryCatLabel = primaryCat ? (PRIMARY_CATEGORY_META[primaryCat]?.label ?? "") : "";
  const subCatLabel     = selectedSubMeta?.label ?? "";

  // Changing primary category resets sub-category; city + language are preserved
  function handlePrimaryChange(val: string) {
    setPrimaryCat(val);
    setSubCat("");
  }

  function handleReset() {
    setPrimaryCat(""); setSubCat(""); setCity(""); setLanguage("");
  }

  const hasFilters = !!(city || primaryCat || subCat || language);

  // Auto-fetch whenever any filter changes (primary cat must be set)
  const { data, isFetching, isError } = useQuery({
    queryKey:  ["companions", { primaryCat, region, subCat, language }],
    queryFn:   () => fetchCompanions({ primaryCategory: primaryCat, region, subCategory: subCat, language }),
    enabled:   !!primaryCat,
    staleTime: 30_000,
  });

  return (
    <>
      <section id="search" className="bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">

          {/* ── Section header ─────────────────────────────────────────── */}
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-400">
                {t.search.badge}
              </p>
              <h2 className="text-2xl font-bold text-[#0f172a] sm:text-3xl">
                {t.search.title}
              </h2>
            </div>
            {/* Booking CTA */}
            <button
              onClick={() => setBookingOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-[#0f172a]/20 bg-white px-4 py-2.5 text-sm font-semibold text-[#0f172a] shadow-sm transition hover:bg-[#0f172a] hover:text-white"
            >
              <Sparkles className="h-4 w-4" />
              {primaryCat === "BUSINESS_PROFESSIONAL"
                ? t.search.searchBusiness
                : t.search.findConnection}
            </button>
          </div>

          {/* ── Filter bar ─────────────────────────────────────────────── */}
          <div className="mb-8 rounded-2xl bg-white p-4 shadow-xl shadow-slate-900/[0.07] ring-1 ring-slate-900/[0.04] sm:p-5">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

              {/* Primary category */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-500">
                  {t.search.whatLooking}
                </label>
                <Select value={primaryCat} onValueChange={handlePrimaryChange}>
                  <SelectTrigger className="h-14 text-base">
                    <SelectValue placeholder="Select…" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_TREE.map((p) => (
                      <SelectItem key={p.value} value={p.value} className="text-base py-3">
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sub-category */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-500">
                  {t.search.specialty}
                  {!primaryCat && (
                    <span className="ms-1 font-normal text-slate-300">{t.search.specialtyHint}</span>
                  )}
                </label>
                <Select value={subCat} onValueChange={setSubCat} disabled={!primaryCat}>
                  <SelectTrigger className="h-14 text-base">
                    <SelectValue placeholder={primaryCat ? "All specialties" : "—"} />
                  </SelectTrigger>
                  <SelectContent>
                    {subCatOptions.map((s) => (
                      <SelectItem key={s.value} value={s.value} className="text-base py-3">
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedSubMeta && <SubCategoryDescription meta={selectedSubMeta} />}
              </div>

              {/* City */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-500">
                  {t.search.location}
                </label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="h-14 text-base">
                    <SelectValue placeholder="Any city" />
                  </SelectTrigger>
                  <SelectContent>
                    {REGION_GROUPS.map((group, i) => (
                      <React.Fragment key={group.region}>
                        {i > 0 && <SelectSeparator />}
                        <SelectGroup>
                          <SelectLabel>{group.label}</SelectLabel>
                          {group.cities.map((c) => (
                            <SelectItem key={c} value={c} className="text-base py-3">{c}</SelectItem>
                          ))}
                        </SelectGroup>
                      </React.Fragment>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Language */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-500">
                  {t.search.language}
                </label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="h-14 text-base">
                    <SelectValue placeholder="Any language" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value} className="text-base py-3">
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Clear filters */}
            {hasFilters && (
              <div className="mt-3 flex justify-end">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-700 transition"
                >
                  <X className="h-3.5 w-3.5" />
                  {t.search.clearFilters}
                </button>
              </div>
            )}
          </div>

          {/* ── Results ────────────────────────────────────────────────── */}
          {!primaryCat ? (
            /* Empty state — no category selected yet */
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-20 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <MapPin className="h-7 w-7 text-slate-300" />
              </div>
              <p className="text-base font-semibold text-slate-600">
                Select a category to see professionals
              </p>
              <p className="mt-1 text-sm text-slate-400">
                {t.search.subtitle}
              </p>
            </div>
          ) : (
            <>
              {/* Result count + loading indicator */}
              <div className="mb-5 flex items-center gap-3">
                {isFetching && (
                  <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                )}
                {!isFetching && data && (
                  <p className="text-sm text-slate-500">
                    {data.total === 0
                      ? "No professionals found for these filters."
                      : `${data.total} professional${data.total !== 1 ? "s" : ""} found`}
                  </p>
                )}
              </div>

              {isError && (
                <div className="rounded-xl bg-red-50 p-6 text-center text-sm text-red-600">
                  Something went wrong. Please try again.
                </div>
              )}

              {/* Cards grid */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {isFetching
                  ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
                  : data?.companions.map((c) => (
                      <ProfessionalCard key={c.id} companion={c} />
                    ))}
              </div>

              {/* No results */}
              {!isFetching && data?.total === 0 && (
                <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
                  <p className="text-sm text-slate-400">
                    No professionals match your filters. Try clearing some filters.
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-3 text-sm font-medium text-blue-600 hover:underline"
                  >
                    {t.search.clearFilters}
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </section>

      {/* Booking modal */}
      <BookingFlow
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialFilters={{ primaryCat, subCat, city, language }}
        primaryCatLabel={primaryCatLabel}
        subCatLabel={subCatLabel}
      />
    </>
  );
}

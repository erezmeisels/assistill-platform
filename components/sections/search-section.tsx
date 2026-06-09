"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  MapPin, Languages, Star, Clock, Loader2,
  ArrowRight, Sparkles, ChevronRight, ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel,
  SelectSeparator, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  CATEGORY_TREE, SUB_CATEGORY_META, PRIMARY_CATEGORY_META,
} from "@/lib/categories";
import { BookingFlow } from "@/components/booking/booking-flow";
import { REGION_GROUPS, CITY_TO_REGION, LANGUAGE_OPTIONS } from "./search-section-constants";
import { SUB_CAT_VISUAL, EDUCATION_LEVELS } from "./sub-cat-config";
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

// ─── Sub-category tile grid ───────────────────────────────────────────────────

function SubCategoryTiles({
  primaryCat,
  onSelect,
}: {
  primaryCat: string;
  onSelect: (value: string) => void;
}) {
  const { t } = useTranslations();
  const catMeta = CATEGORY_TREE.find((c) => c.value === primaryCat);
  if (!catMeta) return null;

  return (
    <div>
      <p className="mb-6 text-sm text-slate-500">{t.search.selectSpecialty}</p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {catMeta.subCategories.map((sub) => {
          const visual = SUB_CAT_VISUAL[sub.value];
          if (!visual) return null;
          const { Icon, image, iconBg, iconColor, accentText, ring } = visual;
          return (
            <button
              key={sub.value}
              onClick={() => onSelect(sub.value)}
              className={cn(
                "group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white text-left",
                "shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:ring-2",
                ring
              )}
            >
              {/* Image */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <Image
                  src={image}
                  alt={sub.label}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* subtle bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
                {/* Icon badge */}
                <div className={cn(
                  "absolute bottom-3 start-3 flex h-9 w-9 items-center justify-center rounded-xl shadow",
                  iconBg
                )}>
                  <Icon className={cn("h-4.5 w-4.5", iconColor)} />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-semibold leading-snug text-[#0f172a]">{sub.label}</h3>
                <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-500">
                  {sub.description}
                </p>
                <div className={cn(
                  "mt-3 flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2",
                  accentText
                )}>
                  {t.search.selectTile}
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Education level tiles (drill-down for ACADEMIC_SUPPORT) ─────────────────

function EducationLevelTiles({ onSelect }: { onSelect: (value: string) => void }) {
  const { t } = useTranslations();

  return (
    <div>
      <p className="mb-6 text-sm text-slate-500">{t.educationLevels.selectPrompt}</p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {EDUCATION_LEVELS.map((level) => {
          const { Icon, gradient, iconBg, iconColor, ring } = level;
          const label = t.educationLevels[level.value as keyof typeof t.educationLevels] as string;
          return (
            <button
              key={level.value}
              onClick={() => onSelect(level.value)}
              className={cn(
                "group flex flex-col items-center rounded-2xl border border-slate-100 p-6 text-center",
                "bg-gradient-to-br", gradient,
                "transition-all duration-200 hover:scale-[1.03] hover:shadow-md hover:ring-2",
                ring
              )}
            >
              <div className={cn(
                "mb-3 flex h-14 w-14 items-center justify-center rounded-xl",
                iconBg
              )}>
                <Icon className={cn("h-7 w-7", iconColor)} />
              </div>
              <h3 className="text-sm font-semibold text-[#0f172a]">{label}</h3>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Search Section ───────────────────────────────────────────────────────────

export function SearchSection() {
  const { t } = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Derive navigation state from URL (URL is the single source of truth)
  const primaryCat = searchParams.get("category") ?? searchParams.get("cat") ?? "";
  const subCat     = searchParams.get("subcat")   ?? "";
  const edLevel    = searchParams.get("edlevel")  ?? "";

  // Secondary filters are local state (city, language)
  const [city,     setCity]     = useState("");
  const [language, setLanguage] = useState("");
  const [bookingOpen, setBookingOpen] = useState(false);

  const region          = city ? (CITY_TO_REGION[city] ?? "") : "";
  const primaryCatMeta  = primaryCat ? PRIMARY_CATEGORY_META[primaryCat] : null;
  const subCatMeta      = subCat ? SUB_CATEGORY_META[subCat] : null;
  const edLevelLabel    = edLevel
    ? (t.educationLevels[edLevel as keyof typeof t.educationLevels] as string) ?? edLevel
    : "";

  // Academic support needs a 3rd level (education level) before showing results
  const needsEdLevel = subCat === "ACADEMIC_SUPPORT" && !edLevel;

  // Show results when: subCat is set AND (not ACADEMIC_SUPPORT OR edLevel is set)
  const showResults = !!subCat && !needsEdLevel;

  // Navigation helpers — use push so the back button works at each level
  function goToSubCats()              { router.push(`/search?category=${primaryCat}`, { scroll: false }); }
  function selectSubCat(v: string)    { router.push(`/search?category=${primaryCat}&subcat=${v}`, { scroll: false }); }
  function selectEdLevel(v: string)   { router.push(`/search?category=${primaryCat}&subcat=${subCat}&edlevel=${v}`, { scroll: false }); }
  function goBack()                   { router.back(); }

  // React Query — fetch results when showResults is true
  const { data, isFetching, isError } = useQuery({
    queryKey:  ["companions", { primaryCat, subCat, region, language }],
    queryFn:   () => fetchCompanions({ primaryCategory: primaryCat, region, subCategory: subCat, language }),
    enabled:   showResults,
    staleTime: 30_000,
  });

  return (
    <>
      <section id="search" className="bg-slate-50 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">

          {/* ── Breadcrumb ──────────────────────────────────────────────── */}
          {primaryCat && (
            <nav className="mb-8 flex items-center gap-1.5 text-sm">
              <button
                onClick={() => router.push("/")}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                {t.search.badge}
              </button>
              <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
              <button
                onClick={goToSubCats}
                className={cn(
                  "font-medium transition-colors",
                  subCat ? "text-slate-400 hover:text-slate-600" : "text-[#0f172a]"
                )}
              >
                {primaryCatMeta?.label}
              </button>
              {subCat && (
                <>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
                  <button
                    onClick={() => edLevel ? goBack() : undefined}
                    className={cn(
                      "font-medium transition-colors",
                      edLevel ? "text-slate-400 hover:text-slate-600" : "text-[#0f172a]"
                    )}
                  >
                    {subCatMeta?.label}
                  </button>
                </>
              )}
              {edLevel && (
                <>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
                  <span className="font-medium text-[#0f172a]">{edLevelLabel}</span>
                </>
              )}
            </nav>
          )}

          {/* ── Page title + booking CTA ─────────────────────────────── */}
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-400">
                {t.search.badge}
              </p>
              <h2 className="text-2xl font-bold text-[#0f172a] sm:text-3xl">
                {subCatMeta?.label ?? primaryCatMeta?.label ?? t.search.title}
              </h2>
            </div>
            {showResults && (
              <button
                onClick={() => setBookingOpen(true)}
                className="flex items-center gap-2 rounded-xl border border-[#0f172a]/20 bg-white px-4 py-2.5 text-sm font-semibold text-[#0f172a] shadow-sm transition hover:bg-[#0f172a] hover:text-white"
              >
                <Sparkles className="h-4 w-4" />
                {primaryCat === "BUSINESS_PROFESSIONAL"
                  ? t.search.searchBusiness
                  : t.search.findConnection}
              </button>
            )}
          </div>

          {/* ── STEP 1: No category selected ───────────────────────────── */}
          {!primaryCat && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-20 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <MapPin className="h-7 w-7 text-slate-300" />
              </div>
              <p className="text-base font-semibold text-slate-600">
                Select a category to get started
              </p>
              <p className="mt-1 text-sm text-slate-400">{t.search.subtitle}</p>
            </div>
          )}

          {/* ── STEP 2: Sub-category tiles ──────────────────────────────── */}
          {primaryCat && !subCat && (
            <SubCategoryTiles primaryCat={primaryCat} onSelect={selectSubCat} />
          )}

          {/* ── STEP 3: Education level tiles (ACADEMIC_SUPPORT only) ───── */}
          {needsEdLevel && (
            <>
              <button
                onClick={goBack}
                className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 transition"
              >
                <ChevronLeft className="h-4 w-4" />
                {t.search.back}
              </button>
              <EducationLevelTiles onSelect={selectEdLevel} />
            </>
          )}

          {/* ── STEP 4: Results ─────────────────────────────────────────── */}
          {showResults && (
            <>
              {/* Secondary filters (city + language) */}
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="h-10 w-auto min-w-[150px] gap-1.5 text-sm">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <SelectValue placeholder={t.search.location} />
                  </SelectTrigger>
                  <SelectContent>
                    {REGION_GROUPS.map((group, i) => (
                      <React.Fragment key={group.region}>
                        {i > 0 && <SelectSeparator />}
                        <SelectGroup>
                          <SelectLabel>{group.label}</SelectLabel>
                          {group.cities.map((c) => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                          ))}
                        </SelectGroup>
                      </React.Fragment>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="h-10 w-auto min-w-[150px] gap-1.5 text-sm">
                    <Languages className="h-3.5 w-3.5 text-slate-400" />
                    <SelectValue placeholder={t.search.language} />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {(city || language) && (
                  <button
                    onClick={() => { setCity(""); setLanguage(""); }}
                    className="text-xs text-slate-400 hover:text-slate-600 transition"
                  >
                    {t.search.clearFilters}
                  </button>
                )}
              </div>

              {/* Result count */}
              <div className="mb-5 flex items-center gap-3">
                {isFetching && <Loader2 className="h-4 w-4 animate-spin text-slate-400" />}
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

              {/* Cards */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {isFetching
                  ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
                  : data?.companions.map((c) => <ProfessionalCard key={c.id} companion={c} />)}
              </div>

              {!isFetching && data?.total === 0 && (
                <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
                  <p className="text-sm text-slate-400">
                    No professionals match these filters.
                  </p>
                  <button
                    onClick={() => { setCity(""); setLanguage(""); }}
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

      <BookingFlow
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialFilters={{ primaryCat, subCat, city, language }}
        primaryCatLabel={primaryCatMeta?.label ?? ""}
        subCatLabel={subCatMeta?.label ?? ""}
      />
    </>
  );
}

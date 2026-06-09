import { notFound } from "next/navigation";
import { MapPin, ShieldCheck, Star, Languages, Wrench } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getEffectiveRates } from "@/lib/pricing";
import { Badge } from "@/components/ui/badge";
import { SUB_CATEGORY_META, PRIMARY_CATEGORY_META } from "@/lib/categories";
import { QuoteWidget } from "./quote-widget";
import { ReviewsPanel } from "./reviews-panel";

const REGION_LABELS: Record<string, string> = {
  CENTER: "Central Israel",
  JERUSALEM: "Jerusalem",
  NORTH: "North",
  SOUTH: "South",
};

const SKILL_LABELS: Record<string, string> = {
  LEGAL:        "Legal",
  BUSINESS_DEV: "Business Dev",
  CHARISMATIC:  "Charismatic",
  TRANSLATOR:   "Translator",
};

async function getCompanion(id: string) {
  return prisma.companionProfile.findUnique({
    where: { id },
    include: {
      categories: {
        select: {
          primaryCategory: true,
          subCategory: true,
          customHourlyRate: true,
          customDailyRate: true,
        },
      },
      skills:    { select: { skillTag: true } },
      languages: { select: { languageCode: true, level: true } },
      availabilities: {
        where: { isBooked: false },
        orderBy: { date: "asc" },
        take: 6,
        select: { date: true },
      },
      reviews: {
        select: {
          rating: true,
          comment: true,
          createdAt: true,
          author: { select: { email: true } },
        },
        orderBy: { createdAt: "desc" },
      },
      _count: { select: { reviews: true } },
    },
  });
}

export default async function CompanionProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = await getCompanion(id);
  if (!profile) notFound();

  const avgRating =
    profile.reviews.length > 0
      ? Math.round(
          (profile.reviews.reduce((s, r) => s + r.rating, 0) / profile.reviews.length) * 10
        ) / 10
      : null;

  const initials = `${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase();

  // Group categories by primary for display
  const byPrimary = profile.categories.reduce<
    Record<string, typeof profile.categories>
  >((acc, cat) => {
    const key = cat.primaryCategory;
    acc[key] = acc[key] ?? [];
    acc[key].push(cat);
    return acc;
  }, {});

  // Sub-category options for the quote widget
  const subCategoryOptions = profile.categories.map((cat) => {
    const rates = getEffectiveRates(profile, cat.subCategory);
    const meta  = SUB_CATEGORY_META[cat.subCategory];
    return {
      value:       cat.subCategory,
      label:       meta?.label ?? cat.subCategory,
      description: meta?.description ?? "",
      ...rates,
    };
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <a
        href="/#search"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition-colors"
      >
        ← Back to search
      </a>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* LEFT */}
        <div className="space-y-6">
          {/* Header */}
          <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
            <div className="flex items-start gap-6">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#0f172a] text-2xl font-bold text-white">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold text-[#0f172a]">
                    {profile.firstName} {profile.lastName}
                  </h1>
                  {profile.isApprovedByAdmin && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 border border-blue-200">
                      <ShieldCheck className="h-3 w-3" />
                      Verified
                    </span>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {REGION_LABELS[profile.location] ?? profile.location}
                  </span>
                  {avgRating !== null && (
                    <span className="flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {avgRating} ({profile._count.reviews} review{profile._count.reviews !== 1 ? "s" : ""})
                    </span>
                  )}
                </div>
                <div className="mt-4 flex gap-6">
                  <div>
                    <p className="text-xs text-slate-400">Hourly rate</p>
                    <p className="text-xl font-bold text-[#0f172a]">₪{Number(profile.hourlyRate)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Daily rate</p>
                    <p className="text-xl font-bold text-[#0f172a]">₪{Number(profile.dailyRate)}</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-6 text-sm leading-7 text-slate-600">{profile.bio}</p>
          </div>

          {/* Services — grouped by primary category */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-sm font-semibold text-[#0f172a]">Services offered</h2>
            <div className="space-y-5">
              {Object.entries(byPrimary).map(([primaryKey, cats]) => {
                const primaryMeta = PRIMARY_CATEGORY_META[primaryKey];
                return (
                  <div key={primaryKey}>
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                      {primaryMeta?.label ?? primaryKey}
                    </p>
                    <div className="space-y-2">
                      {cats.map((cat) => {
                        const subMeta = SUB_CATEGORY_META[cat.subCategory];
                        const rates   = getEffectiveRates(profile, cat.subCategory);
                        return (
                          <div
                            key={cat.subCategory}
                            className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-[#0f172a]">
                                  {subMeta?.label ?? cat.subCategory}
                                </span>
                                {rates.isCustom && (
                                  <Badge variant="blue" className="text-[10px]">custom rate</Badge>
                                )}
                              </div>
                              <div className="text-right text-sm">
                                <span className="font-semibold text-[#0f172a]">₪{rates.hourlyRate}/h</span>
                                <span className="mx-1.5 text-slate-300">·</span>
                                <span className="text-slate-500">₪{rates.dailyRate}/d</span>
                              </div>
                            </div>
                            {subMeta?.description && (
                              <p className="mt-1 text-xs leading-5 text-slate-500">
                                {subMeta.description}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Skills */}
          {profile.skills.length > 0 && (
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#0f172a]">
                <Wrench className="h-4 w-4 text-slate-400" />
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map(({ skillTag }) => (
                  <Badge key={skillTag} variant="outline" className="px-3 py-1 text-xs">
                    {SKILL_LABELS[skillTag] ?? skillTag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {profile.languages.length > 0 && (
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#0f172a]">
                <Languages className="h-4 w-4 text-slate-400" />
                Languages
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile.languages.map(({ languageCode, level }) => (
                  <div
                    key={languageCode}
                    className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2"
                  >
                    <span className="text-sm font-semibold uppercase text-[#0f172a]">{languageCode}</span>
                    <span className="text-xs text-slate-400">
                      {level === "NATIVE" ? "Native" : "Business fluent"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Availability */}
          {profile.availabilities.length > 0 && (
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold text-[#0f172a]">Upcoming availability</h2>
              <div className="flex flex-wrap gap-2">
                {profile.availabilities.map(({ date }) => (
                  <span
                    key={date.toISOString()}
                    className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5 text-sm text-slate-700"
                  >
                    {new Date(date).toLocaleDateString("en-GB", {
                      weekday: "short", day: "numeric", month: "short",
                    })}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          <ReviewsPanel
            profileId={id}
            initialReviews={profile.reviews.map((r) => ({
              id: `${r.createdAt.toISOString()}-${r.author.email}`,
              rating: r.rating,
              comment: r.comment ?? null,
              createdAt: r.createdAt.toISOString(),
              author: { email: r.author.email },
            }))}
          />
        </div>

        {/* RIGHT: Quote widget (sticky) */}
        <div className="lg:sticky lg:top-24 self-start">
          <QuoteWidget
            companionId={id}
            companionName={`${profile.firstName} ${profile.lastName}`}
            subCategoryOptions={subCategoryOptions}
          />
        </div>
      </div>
    </div>
  );
}

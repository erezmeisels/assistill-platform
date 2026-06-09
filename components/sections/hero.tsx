"use client";

import Image from "next/image";
import Link from "next/link";
import { Briefcase, Heart, Globe2, GraduationCap, ChevronRight, ShieldCheck, FileCheck, Award } from "lucide-react";
import { useTranslations } from "@/lib/i18n/context";
import { CATEGORY_TREE } from "@/lib/categories";
import { cn } from "@/lib/cn";

// ─── Per-category visual config ───────────────────────────────────────────────

const TILE_CONFIG: Record<string, {
  Icon: React.ElementType;
  accentText: string;
  topBar: string;
  ringHover: string;
  iconBg: string;
  image: string;
}> = {
  BUSINESS_PROFESSIONAL: {
    Icon:      Briefcase,
    accentText: "text-blue-600",
    topBar:     "bg-blue-600",
    ringHover:  "hover:ring-blue-200",
    iconBg:     "bg-blue-50 group-hover:bg-blue-100",
    image:      "/images/categories/business.jpg",
  },
  PERSONAL_SOCIAL: {
    Icon:      Heart,
    accentText: "text-rose-500",
    topBar:     "bg-rose-500",
    ringHover:  "hover:ring-rose-200",
    iconBg:     "bg-rose-50 group-hover:bg-rose-100",
    image:      "/images/categories/personal.jpg",
  },
  LANGUAGE_TRANSLATION: {
    Icon:      Globe2,
    accentText: "text-emerald-600",
    topBar:     "bg-emerald-600",
    ringHover:  "hover:ring-emerald-200",
    iconBg:     "bg-emerald-50 group-hover:bg-emerald-100",
    image:      "/images/categories/language.jpg",
  },
  MENTORING_EDUCATION: {
    Icon:      GraduationCap,
    accentText: "text-violet-600",
    topBar:     "bg-violet-600",
    ringHover:  "hover:ring-violet-200",
    iconBg:     "bg-violet-50 group-hover:bg-violet-100",
    image:      "/images/categories/mentoring.jpg",
  },
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function HeroSection() {
  const { t } = useTranslations();

  return (
    <section>
      {/* ── Dark hero band ─────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden bg-[#0f172a] pt-16 pb-36 sm:pt-20 sm:pb-44"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 90% 60% at 50% -5%, rgba(59,130,246,0.22) 0%, transparent 70%), " +
            "radial-gradient(ellipse 40% 40% at 80% 80%, rgba(99,102,241,0.10) 0%, transparent 60%)",
        }}
      >
        {/* Subtle dot-grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center">
          {/* Eyebrow */}
          <p className="mb-5 inline-flex items-center rounded-full border border-blue-400/20 bg-blue-400/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-blue-300">
            {t.hero.tagline}
          </p>

          {/* ── H1 with gradient emphasis ── */}
          <h1
            className="font-display font-extrabold leading-[1.1] tracking-[-0.02em] text-white
                       text-3xl sm:text-5xl lg:text-[4.25rem]"
          >
            {t.hero.headlinePre}{" "}
            <span
              className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent"
            >
              {t.hero.headlineEm}
            </span>
            {t.hero.headlinePost ? (
              <>{" "}{t.hero.headlinePost}</>
            ) : null}
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg">
            {t.hero.subtitle}
          </p>
        </div>
      </div>

      {/* ── Floating card grid + trust badges ─────────────────────────── */}
      <div className="relative bg-white pb-20">
        {/* Cards float up over the dark band */}
        <div className="mx-auto max-w-5xl -mt-28 px-4 sm:px-6 sm:-mt-36">

        {/* ── Floating category grid ────────────────────────────────────── */}
        <div className="rounded-3xl bg-white p-3 shadow-2xl shadow-slate-900/[0.14] ring-1 ring-slate-900/[0.06]">
          <div className="grid gap-2.5 sm:grid-cols-2">
            {CATEGORY_TREE.map((cat, index) => {
              const cfg = TILE_CONFIG[cat.value];
              if (!cfg) return null;
              const { Icon } = cfg;
              const description =
                t.categoryDescriptions[cat.value as keyof typeof t.categoryDescriptions] ?? "";

              return (
                <Link
                  key={cat.value}
                  href={`/search?category=${cat.value}`}
                  prefetch
                  className={cn(
                    "group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white",
                    "cursor-pointer transition-all duration-300",
                    "hover:scale-[1.02] hover:shadow-lg hover:shadow-slate-900/[0.07]",
                    "hover:ring-2", cfg.ringHover
                  )}
                >
                  {/* ── Hero image ─────────────────────────── */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-2xl">
                    <Image
                      src={cfg.image}
                      alt={cat.label}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      priority={index < 2}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Very subtle white overlay to keep text areas clean */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
                    {/* Accent bar over image bottom edge */}
                    <div className={cn("absolute bottom-0 left-0 right-0 h-[3px]", cfg.topBar)} />
                  </div>

                  {/* ── Card body — flex-col so Browse always sits at the bottom ── */}
                  <div className="flex flex-1 flex-col p-6">

                    {/* Icon + title row */}
                    <div className="mb-4 flex items-start gap-4">
                      <div className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors",
                        cfg.iconBg
                      )}>
                        <Icon className={cn("h-5 w-5", cfg.accentText)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-[15px] font-bold leading-snug text-[#0f172a]">
                            {cat.label}
                          </h3>
                          <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                            {cat.subCategories.length}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Human-centric description */}
                    <p className="mb-5 text-sm leading-relaxed text-slate-500">
                      {description}
                    </p>

                    {/* Sub-category tags */}
                    <div className="mb-5 flex flex-wrap gap-1.5">
                      {cat.subCategories.slice(0, 3).map((sub) => (
                        <span
                          key={sub.value}
                          className="rounded-md bg-slate-50 px-2 py-0.5 text-[11px] leading-5 text-slate-500"
                        >
                          {sub.label}
                        </span>
                      ))}
                      {cat.subCategories.length > 3 && (
                        <span className="rounded-md bg-slate-50 px-2 py-0.5 text-[11px] leading-5 text-slate-400">
                          +{cat.subCategories.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Browse link — mt-auto pins it to the bottom of every card */}
                    <div className={cn(
                      "mt-auto flex items-center gap-1 text-sm font-semibold transition-all duration-200",
                      cfg.accentText, "group-hover:gap-2"
                    )}>
                      {t.hero.browseAll.replace(" ↓", "")}
                      <ChevronRight className="h-3.5 w-3.5" />
                    </div>

                  </div>{/* end card body */}
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── Visual trust badges ───────────────────────────────────────── */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {[
            { Icon: ShieldCheck, value: t.hero.stat3Value, label: t.hero.stat3Label },
            { Icon: Award,       value: t.hero.stat2Value, label: t.hero.stat2Label },
            { Icon: FileCheck,   value: t.hero.stat1Value, label: t.hero.stat1Label },
          ].map(({ Icon, value, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full border border-slate-100 bg-white px-4 py-2 shadow-sm"
            >
              <Icon className="h-3.5 w-3.5 shrink-0 text-blue-600" />
              <span className="text-sm font-bold text-[#0f172a]">{value}</span>
              <span className="text-xs text-slate-400">{label}</span>
            </div>
          ))}
        </div>

        </div>{/* end max-w container */}
      </div>{/* end white band */}
    </section>
  );
}

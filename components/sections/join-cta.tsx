"use client";

import { ArrowRight, ShieldCheck, Users, Star } from "lucide-react";
import { useTranslations } from "@/lib/i18n/context";

export function JoinCta() {
  const { t } = useTranslations();

  const trustBadges = [
    { Icon: ShieldCheck, text: t.joinCta.trust1 },
    { Icon: Star,        text: t.joinCta.trust2 },
    { Icon: Users,       text: t.joinCta.trust3 },
  ];

  return (
    <section className="bg-[#0f172a] py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">

        {/* Label */}
        <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-blue-400">
          {t.joinCta.badge}
        </p>

        {/* Headline */}
        <h2 className="mb-6 text-4xl font-black tracking-tight text-white leading-[1.05] sm:text-5xl lg:text-6xl">
          {t.joinCta.title}
        </h2>

        {/* Body */}
        <p className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-slate-400">
          {t.joinCta.body}
        </p>

        {/* Full-width CTA button */}
        <a
          href="/join"
          className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-8 py-5 text-base font-bold text-[#0f172a] shadow-xl transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-blue-500/25 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white/30"
        >
          {t.joinCta.cta}
          <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
        </a>

        {/* Visual trust badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {trustBadges.map(({ Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-400 backdrop-blur-sm"
            >
              <Icon className="h-3.5 w-3.5 shrink-0 text-blue-400" />
              {text}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

import type { ElementType } from "react";
import {
  TrendingUp, Scale, Truck, BarChart3, Building2, ShieldCheck,
  Users, CalendarCheck, HeartHandshake,
  Languages,
  Target, BookOpen, Rocket,
  School, BookMarked, GraduationCap, Lightbulb,
} from "lucide-react";

// ─── Sub-category visual config ───────────────────────────────────────────────

export interface TileVisual {
  Icon: ElementType;
  image: string;      // path in /public
  gradient: string;   // Tailwind bg-gradient-to-br classes (value only, no "bg-gradient-to-br" prefix)
  iconBg: string;     // icon wrapper bg
  iconColor: string;  // icon text color
  accentText: string; // "Select →" text color
  ring: string;       // hover ring color
}

export const SUB_CAT_VISUAL: Record<string, TileVisual> = {
  // ── Business & Professional ──────────────────────────────────────────────
  STRATEGIC_CONSULTING: {
    Icon: TrendingUp,
    image: "/subcategories/strategic-consulting.jpg",
    gradient: "from-blue-50 to-blue-100/50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    accentText: "text-blue-600",
    ring: "hover:ring-blue-200",
  },
  LEGAL_REGULATORY: {
    Icon: Scale,
    image: "/subcategories/legal-regulatory.jpg",
    gradient: "from-indigo-50 to-indigo-100/50",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    accentText: "text-indigo-600",
    ring: "hover:ring-indigo-200",
  },
  LOGISTICS_MOBILITY: {
    Icon: Truck,
    image: "/subcategories/logistics-mobility.jpg",
    gradient: "from-sky-50 to-sky-100/50",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    accentText: "text-sky-600",
    ring: "hover:ring-sky-200",
  },
  FINANCE_INVESTMENT: {
    Icon: BarChart3,
    image: "/subcategories/finance-investment.jpg",
    gradient: "from-cyan-50 to-cyan-100/50",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
    accentText: "text-cyan-600",
    ring: "hover:ring-cyan-200",
  },
  REAL_ESTATE: {
    Icon: Building2,
    image: "/subcategories/real-estate.jpg",
    gradient: "from-slate-50 to-slate-100/50",
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
    accentText: "text-slate-600",
    ring: "hover:ring-slate-300",
  },
  SECURITY_SAFETY: {
    Icon: ShieldCheck,
    image: "/subcategories/security-safety.jpg",
    gradient: "from-red-50 to-red-100/50",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    accentText: "text-red-600",
    ring: "hover:ring-red-200",
  },

  // ── Personal & Social ────────────────────────────────────────────────────
  LOCAL_COMPANION: {
    Icon: Users,
    image: "/subcategories/local-companion.jpg",
    gradient: "from-rose-50 to-rose-100/50",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-500",
    accentText: "text-rose-500",
    ring: "hover:ring-rose-200",
  },
  SOCIAL_EVENT_HOST: {
    Icon: CalendarCheck,
    image: "/subcategories/social-event-host.jpg",
    gradient: "from-pink-50 to-pink-100/50",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-500",
    accentText: "text-pink-500",
    ring: "hover:ring-pink-200",
  },
  HEARTFELT_COMPANIONSHIP: {
    Icon: HeartHandshake,
    image: "/subcategories/heartfelt-companionship.jpg",
    gradient: "from-orange-50 to-orange-100/50",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    accentText: "text-orange-500",
    ring: "hover:ring-orange-200",
  },

  // ── Language & Translation ───────────────────────────────────────────────
  TRANSLATION: {
    Icon: Languages,
    image: "/subcategories/translation.jpg",
    gradient: "from-emerald-50 to-emerald-100/50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    accentText: "text-emerald-600",
    ring: "hover:ring-emerald-200",
  },

  // ── Mentoring & Education ────────────────────────────────────────────────
  CAREER_MENTORING: {
    Icon: Target,
    image: "/subcategories/career-mentoring.jpg",
    gradient: "from-violet-50 to-violet-100/50",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    accentText: "text-violet-600",
    ring: "hover:ring-violet-200",
  },
  ACADEMIC_SUPPORT: {
    Icon: BookOpen,
    image: "/subcategories/academic-support.jpg",
    gradient: "from-purple-50 to-purple-100/50",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    accentText: "text-purple-600",
    ring: "hover:ring-purple-200",
  },
  PROFESSIONAL_DEVELOPMENT: {
    Icon: Rocket,
    image: "/subcategories/professional-development.jpg",
    gradient: "from-fuchsia-50 to-fuchsia-100/50",
    iconBg: "bg-fuchsia-100",
    iconColor: "text-fuchsia-600",
    accentText: "text-fuchsia-600",
    ring: "hover:ring-fuchsia-200",
  },
};

// ─── Education levels (drill-down for ACADEMIC_SUPPORT) ───────────────────────

export interface EducationLevel {
  value: string;
  Icon: ElementType;
  gradient: string;
  iconBg: string;
  iconColor: string;
  ring: string;
}

export const EDUCATION_LEVELS: EducationLevel[] = [
  {
    value: "ELEMENTARY",
    Icon: School,
    gradient: "from-yellow-50 to-yellow-100/50",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    ring: "hover:ring-yellow-200",
  },
  {
    value: "HIGH_SCHOOL",
    Icon: BookMarked,
    gradient: "from-orange-50 to-orange-100/50",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    ring: "hover:ring-orange-200",
  },
  {
    value: "UNIVERSITY",
    Icon: GraduationCap,
    gradient: "from-purple-50 to-purple-100/50",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    ring: "hover:ring-purple-200",
  },
  {
    value: "ENRICHMENT",
    Icon: Lightbulb,
    gradient: "from-amber-50 to-amber-100/50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    ring: "hover:ring-amber-200",
  },
];

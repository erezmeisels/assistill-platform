import { SubCategory } from "@prisma/client";
import type { Decimal } from "@prisma/client-runtime-utils";

export interface PricingProfile {
  hourlyRate: Decimal;
  dailyRate: Decimal;
  categories: Array<{
    subCategory: SubCategory;
    customHourlyRate: Decimal | null;
    customDailyRate: Decimal | null;
  }>;
}

export interface QuoteInput {
  subCategory: SubCategory;
  hours?: number;
  days?: number;
}

export interface EffectiveRates {
  hourlyRate: number;
  dailyRate: number;
  isCustom: boolean;
}

export interface QuoteResult extends EffectiveRates {
  subCategory: SubCategory;
  hours: number;
  days: number;
  totalFromHours: number;
  totalFromDays: number;
  recommendedTotal: number;
  breakdown: string;
  rateSource: string;
}

export function getEffectiveRates(
  profile: PricingProfile,
  subCategory: SubCategory
): EffectiveRates {
  const config = profile.categories.find((c) => c.subCategory === subCategory);

  const customHourly = config?.customHourlyRate ? Number(config.customHourlyRate) : null;
  const customDaily  = config?.customDailyRate  ? Number(config.customDailyRate)  : null;

  const hourlyRate = customHourly ?? Number(profile.hourlyRate);
  const dailyRate  = customDaily  ?? Number(profile.dailyRate);
  const isCustom   = customHourly !== null || customDaily !== null;

  return { hourlyRate, dailyRate, isCustom };
}

export function computeQuote(profile: PricingProfile, input: QuoteInput): QuoteResult {
  const { hourlyRate, dailyRate, isCustom } = getEffectiveRates(profile, input.subCategory);

  const hours = input.hours ?? 0;
  const days  = input.days  ?? 0;

  const totalFromHours = Math.round(hourlyRate * hours * 100) / 100;
  const totalFromDays  = Math.round(dailyRate  * days  * 100) / 100;

  let recommendedTotal: number;
  let breakdown: string;

  if (hours > 0 && days > 0) {
    if (totalFromHours <= totalFromDays) {
      recommendedTotal = totalFromHours;
      breakdown = `${hours}h × ₪${hourlyRate}/h = ₪${totalFromHours} (better than ${days}d × ₪${dailyRate}/d = ₪${totalFromDays})`;
    } else {
      recommendedTotal = totalFromDays;
      breakdown = `${days}d × ₪${dailyRate}/d = ₪${totalFromDays} (better than ${hours}h × ₪${hourlyRate}/h = ₪${totalFromHours})`;
    }
  } else if (hours > 0) {
    recommendedTotal = totalFromHours;
    breakdown = `${hours}h × ₪${hourlyRate}/h = ₪${totalFromHours}`;
  } else if (days > 0) {
    recommendedTotal = totalFromDays;
    breakdown = `${days}d × ₪${dailyRate}/d = ₪${totalFromDays}`;
  } else {
    recommendedTotal = 0;
    breakdown = "No duration provided";
  }

  const rateSource = isCustom
    ? `Custom rate for this service (₪${hourlyRate}/h | ₪${dailyRate}/d)`
    : `Professional base rate (₪${hourlyRate}/h | ₪${dailyRate}/d)`;

  return {
    subCategory: input.subCategory,
    hourlyRate,
    dailyRate,
    isCustom,
    rateSource,
    hours,
    days,
    totalFromHours,
    totalFromDays,
    recommendedTotal,
    breakdown,
  };
}

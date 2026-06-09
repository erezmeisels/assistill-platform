import { LanguageLevel, Prisma, PrimaryCategory, Region, SubCategory } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getEffectiveRates } from "@/lib/pricing";

export interface MatchFilters {
  region?: Region;
  primaryCategory?: PrimaryCategory;
  subCategory?: SubCategory;
  skillTags?: string[];
  languageCode?: string;
  languageLevel?: LanguageLevel;
  availableOn?: Date;
  maxHourlyRate?: number;
}

export type MatchResult = Awaited<ReturnType<typeof findMatches>>;

export async function findMatches(filters: MatchFilters) {
  const and: Prisma.CompanionProfileWhereInput[] = [{ isApprovedByAdmin: true }];

  if (filters.region) {
    and.push({ location: filters.region });
  }

  if (filters.primaryCategory) {
    and.push({ categories: { some: { primaryCategory: filters.primaryCategory } } });
  }

  if (filters.subCategory) {
    and.push({ categories: { some: { subCategory: filters.subCategory } } });
  }

  if (filters.skillTags?.length) {
    for (const tag of filters.skillTags) {
      and.push({ skills: { some: { skillTag: tag } } });
    }
  }

  if (filters.languageCode) {
    and.push({
      languages: {
        some: {
          languageCode: filters.languageCode,
          ...(filters.languageLevel ? { level: filters.languageLevel } : {}),
        },
      },
    });
  }

  if (filters.availableOn) {
    and.push({
      availabilities: { some: { date: filters.availableOn, isBooked: false } },
    });
  }

  if (filters.maxHourlyRate !== undefined) {
    and.push({ hourlyRate: { lte: filters.maxHourlyRate } });
  }

  const companions = await prisma.companionProfile.findMany({
    where: { AND: and },
    include: {
      categories: {
        select: {
          primaryCategory: true,
          subCategory: true,
          customHourlyRate: true,
          customDailyRate: true,
        },
      },
      skills: { select: { skillTag: true } },
      languages: { select: { languageCode: true, level: true } },
      availabilities: {
        where: { isBooked: false },
        orderBy: { date: "asc" },
        take: 10,
        select: { date: true },
      },
      reviews: {
        select: { rating: true, authorId: true },
        orderBy: { createdAt: "desc" },
      },
      _count: { select: { reviews: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return companions.map((c) => {
    const avg =
      c.reviews.length > 0
        ? c.reviews.reduce((sum, r) => sum + r.rating, 0) / c.reviews.length
        : null;

    const effectiveRates = c.categories.map((cat) => ({
      primaryCategory: cat.primaryCategory,
      subCategory: cat.subCategory,
      ...getEffectiveRates(c, cat.subCategory),
    }));

    return {
      ...c,
      averageRating: avg !== null ? Math.round(avg * 10) / 10 : null,
      reviewCount: c._count.reviews,
      effectiveRates,
    };
  });
}

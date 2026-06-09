import { type NextRequest } from "next/server";
import { LanguageLevel, PrimaryCategory, Region, SubCategory } from "@prisma/client";
import { findMatches, type MatchFilters } from "@/lib/match.service";

/**
 * GET /api/companions/match
 *
 * Query params (all optional):
 *   region           — CENTER | JERUSALEM | NORTH | SOUTH
 *   primaryCategory  — BUSINESS_PROFESSIONAL | PERSONAL_SOCIAL | LANGUAGE_TRANSLATION
 *   subCategory      — STRATEGIC_CONSULTING | LEGAL_REGULATORY | ... (any SubCategory value)
 *   skills           — comma-separated skill tags
 *   language         — language code, e.g. "he" or "en"
 *   languageLevel    — NATIVE | BUSINESS_FLUENT
 *   availableOn      — ISO date, e.g. "2026-06-10"
 *   maxHourlyRate    — number
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const rawRegion          = searchParams.get("region");
  const rawPrimary         = searchParams.get("primaryCategory");
  const rawSub             = searchParams.get("subCategory");
  const rawSkills          = searchParams.get("skills");
  const rawLanguage        = searchParams.get("language");
  const rawLanguageLevel   = searchParams.get("languageLevel");
  const rawAvailableOn     = searchParams.get("availableOn");
  const rawMaxRate         = searchParams.get("maxHourlyRate");

  if (rawRegion && !(rawRegion in Region)) {
    return Response.json({ error: `Invalid region. Valid: ${Object.keys(Region).join(", ")}` }, { status: 400 });
  }
  if (rawPrimary && !(rawPrimary in PrimaryCategory)) {
    return Response.json({ error: `Invalid primaryCategory. Valid: ${Object.keys(PrimaryCategory).join(", ")}` }, { status: 400 });
  }
  if (rawSub && !(rawSub in SubCategory)) {
    return Response.json({ error: `Invalid subCategory. Valid: ${Object.keys(SubCategory).join(", ")}` }, { status: 400 });
  }
  if (rawLanguageLevel && !(rawLanguageLevel in LanguageLevel)) {
    return Response.json({ error: `Invalid languageLevel. Valid: ${Object.keys(LanguageLevel).join(", ")}` }, { status: 400 });
  }

  const filters: MatchFilters = {
    ...(rawRegion        ? { region:          rawRegion          as Region          } : {}),
    ...(rawPrimary       ? { primaryCategory: rawPrimary         as PrimaryCategory } : {}),
    ...(rawSub           ? { subCategory:     rawSub             as SubCategory     } : {}),
    ...(rawSkills        ? { skillTags:        rawSkills.split(",").map((s) => s.trim()).filter(Boolean) } : {}),
    ...(rawLanguage      ? { languageCode:     rawLanguage                           } : {}),
    ...(rawLanguageLevel ? { languageLevel:    rawLanguageLevel   as LanguageLevel   } : {}),
    ...(rawAvailableOn   ? { availableOn:      new Date(rawAvailableOn)              } : {}),
    ...(rawMaxRate       ? { maxHourlyRate:    parseFloat(rawMaxRate)                } : {}),
  };

  try {
    const companions = await findMatches(filters);
    return Response.json({ companions, total: companions.length });
  } catch (err) {
    console.error("[match] query failed:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

import { type NextRequest } from "next/server";
import { z } from "zod";
import { SubCategory } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { computeQuote } from "@/lib/pricing";

const QuoteBodySchema = z.object({
  subCategory: z.nativeEnum(SubCategory, {
    error: `subCategory must be one of: ${Object.keys(SubCategory).join(", ")}`,
  }),
  hours: z
    .number({ error: "hours must be a number" })
    .positive("hours must be greater than 0")
    .optional(),
  days: z
    .number({ error: "days must be a number" })
    .positive("days must be greater than 0")
    .optional(),
}).refine((d) => d.hours !== undefined || d.days !== undefined, {
  message: "Provide at least one of: hours, days",
});

/**
 * POST /api/companions/[id]/quote
 */
export async function POST(
  req: NextRequest,
  ctx: RouteContext<"/api/companions/[id]/quote">
) {
  const { id } = await ctx.params;

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = QuoteBodySchema.safeParse(rawBody);
  if (!parsed.success) {
    const { fieldErrors, formErrors } = parsed.error.flatten();
    return Response.json(
      {
        error: "Validation failed",
        details: { ...fieldErrors, ...(formErrors.length ? { _form: formErrors } : {}) },
      },
      { status: 400 }
    );
  }

  const { subCategory, hours, days } = parsed.data;

  const profile = await prisma.companionProfile.findUnique({
    where: { id },
    select: {
      hourlyRate: true,
      dailyRate: true,
      categories: {
        select: { subCategory: true, customHourlyRate: true, customDailyRate: true },
      },
    },
  });

  if (!profile) {
    return Response.json({ error: `Companion '${id}' not found` }, { status: 404 });
  }

  const quote = computeQuote(profile, { subCategory, hours, days });
  return Response.json({ companionId: id, quote });
}

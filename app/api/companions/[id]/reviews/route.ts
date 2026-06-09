import { type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/companions/[id]/reviews
 * מחזיר את כל הביקורות של מלווה ספציפי + ממוצע דירוג.
 */
export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/companions/[id]/reviews">
) {
  const { id } = await ctx.params;

  const profile = await prisma.companionProfile.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!profile) {
    return Response.json({ error: "Companion not found" }, { status: 404 });
  }

  const reviews = await prisma.review.findMany({
    where: { profileId: id },
    select: {
      id: true,
      rating: true,
      comment: true,
      createdAt: true,
      author: { select: { id: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const avg =
    reviews.length > 0
      ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10
      : null;

  return Response.json({ profileId: id, averageRating: avg, reviewCount: reviews.length, reviews });
}

/**
 * POST /api/companions/[id]/reviews
 * יוצר ביקורת חדשה למלווה.
 *
 * Body (JSON):
 *   authorId  string   — מזהה המשתמש שכותב את הביקורת
 *   rating    number   — 1 עד 5
 *   comment   string?  — טקסט אופציונלי
 */
export async function POST(
  req: NextRequest,
  ctx: RouteContext<"/api/companions/[id]/reviews">
) {
  const { id } = await ctx.params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { authorId, rating, comment } = body as {
    authorId?: string;
    rating?: number;
    comment?: string;
  };

  if (!authorId || typeof authorId !== "string") {
    return Response.json({ error: "authorId is required" }, { status: 400 });
  }
  if (typeof rating !== "number" || rating < 1 || rating > 5 || !Number.isInteger(rating)) {
    return Response.json({ error: "rating must be an integer between 1 and 5" }, { status: 400 });
  }

  const profileExists = await prisma.companionProfile.findUnique({
    where: { id },
    select: { id: true },
  });
  if (!profileExists) {
    return Response.json({ error: "Companion not found" }, { status: 404 });
  }

  try {
    const review = await prisma.review.create({
      data: { profileId: id, authorId, rating, comment },
      select: { id: true, rating: true, comment: true, createdAt: true },
    });
    return Response.json(review, { status: 201 });
  } catch (err: unknown) {
    // Unique constraint violation — המשתמש כבר דירג את המלווה הזה
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code: string }).code === "P2002"
    ) {
      return Response.json({ error: "You have already reviewed this companion" }, { status: 409 });
    }
    console.error("[reviews] create failed:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

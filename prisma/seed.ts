import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  PrismaClient,
  UserRole,
  Region,
  PrimaryCategory,
  SubCategory,
  LanguageLevel,
  BackgroundCheckStatus,
} from "@prisma/client";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding AssistIL database…");

  // ── Users ──────────────────────────────────────────────────────────────────
  const admin = await prisma.user.upsert({
    where:  { email: "admin@assistil.co.il" },
    update: {},
    create: { email: "admin@assistil.co.il", role: UserRole.ADMIN },
  });

  const clients = await Promise.all(
    ["client1@example.com", "client2@example.com", "client3@example.com"].map((email) =>
      prisma.user.upsert({ where: { email }, update: {}, create: { email, role: UserRole.CLIENT } })
    )
  );

  // ── Companion 1: Dana Cohen — Business & Professional ───────────────────────
  const dana = await prisma.user.upsert({
    where: { email: "dana@assistil.co.il" }, update: {},
    create: { email: "dana@assistil.co.il", role: UserRole.COMPANION },
  });
  const danaProfile = await prisma.companionProfile.upsert({
    where: { userId: dana.id }, update: {},
    create: {
      userId: dana.id,
      firstName: "Dana", lastName: "Cohen",
      bio: "Senior business strategist with 10 years navigating the Israeli market. Former Goldman Sachs analyst turned independent advisor — helping international executives hit the ground running in Tel Aviv.",
      location: Region.CENTER,
      hourlyRate: 450, dailyRate: 3200,
      hasSignedNda: true, ndaSignedAt: new Date("2024-01-15"),
      backgroundCheckStatus: BackgroundCheckStatus.APPROVED,
      isApprovedByAdmin: true,
      categories: {
        create: [
          {
            primaryCategory: PrimaryCategory.BUSINESS_PROFESSIONAL,
            subCategory: SubCategory.STRATEGIC_CONSULTING,
            customHourlyRate: 500, customDailyRate: 3500,
          },
          {
            primaryCategory: PrimaryCategory.BUSINESS_PROFESSIONAL,
            subCategory: SubCategory.FINANCE_INVESTMENT,
          },
        ],
      },
      skills:    { create: [{ skillTag: "BUSINESS_DEV" }, { skillTag: "CHARISMATIC" }] },
      languages: {
        create: [
          { languageCode: "he", level: LanguageLevel.NATIVE },
          { languageCode: "en", level: LanguageLevel.BUSINESS_FLUENT },
          { languageCode: "fr", level: LanguageLevel.BUSINESS_FLUENT },
        ],
      },
      availabilities: {
        create: [
          { date: new Date("2026-06-10") },
          { date: new Date("2026-06-11") },
          { date: new Date("2026-06-15") },
          { date: new Date("2026-06-22") },
        ],
      },
    },
  });

  // ── Companion 2: Avi Levi — Legal & Translation ────────────────────────────
  const avi = await prisma.user.upsert({
    where: { email: "avi@assistil.co.il" }, update: {},
    create: { email: "avi@assistil.co.il", role: UserRole.COMPANION },
  });
  const aviProfile = await prisma.companionProfile.upsert({
    where: { userId: avi.id }, update: {},
    create: {
      userId: avi.id,
      firstName: "Avi", lastName: "Levi",
      bio: "Licensed legal consultant and sworn court translator (Hebrew–English–Arabic). Specializes in helping foreign investors navigate Israeli regulatory frameworks, notarial services, and contract negotiations.",
      location: Region.JERUSALEM,
      hourlyRate: 300, dailyRate: 2100,
      hasSignedNda: true, ndaSignedAt: new Date("2024-03-01"),
      backgroundCheckStatus: BackgroundCheckStatus.APPROVED,
      isApprovedByAdmin: true,
      categories: {
        create: [
          {
            primaryCategory: PrimaryCategory.BUSINESS_PROFESSIONAL,
            subCategory: SubCategory.LEGAL_REGULATORY,
            customHourlyRate: 350,
          },
          {
            primaryCategory: PrimaryCategory.LANGUAGE_TRANSLATION,
            subCategory: SubCategory.TRANSLATION,
          },
        ],
      },
      skills:    { create: [{ skillTag: "LEGAL" }, { skillTag: "TRANSLATOR" }] },
      languages: {
        create: [
          { languageCode: "he", level: LanguageLevel.NATIVE },
          { languageCode: "en", level: LanguageLevel.BUSINESS_FLUENT },
          { languageCode: "ar", level: LanguageLevel.BUSINESS_FLUENT },
        ],
      },
      availabilities: {
        create: [
          { date: new Date("2026-06-08") },
          { date: new Date("2026-06-12") },
          { date: new Date("2026-06-20") },
        ],
      },
    },
  });

  // ── Companion 3: Noa Bar — Personal & Social ───────────────────────────────
  const noa = await prisma.user.upsert({
    where: { email: "noa@assistil.co.il" }, update: {},
    create: { email: "noa@assistil.co.il", role: UserRole.COMPANION },
  });
  const noaProfile = await prisma.companionProfile.upsert({
    where: { userId: noa.id }, update: {},
    create: {
      userId: noa.id,
      firstName: "Noa", lastName: "Bar",
      bio: "Born and raised in Haifa, I'm your insider guide to authentic Israeli life. Whether you need a warm companion for a gala, someone to share a coffee in the Carmel Market, or simply a friendly face in an unfamiliar city — I'm here for it.",
      location: Region.NORTH,
      hourlyRate: 220, dailyRate: 1600,
      hasSignedNda: true, ndaSignedAt: new Date("2024-06-01"),
      backgroundCheckStatus: BackgroundCheckStatus.APPROVED,
      isApprovedByAdmin: true,
      categories: {
        create: [
          {
            primaryCategory: PrimaryCategory.PERSONAL_SOCIAL,
            subCategory: SubCategory.LOCAL_COMPANION,
          },
          {
            primaryCategory: PrimaryCategory.PERSONAL_SOCIAL,
            subCategory: SubCategory.SOCIAL_EVENT_HOST,
            customHourlyRate: 260, customDailyRate: 1900,
          },
        ],
      },
      skills:    { create: [{ skillTag: "CHARISMATIC" }] },
      languages: {
        create: [
          { languageCode: "he", level: LanguageLevel.NATIVE },
          { languageCode: "en", level: LanguageLevel.BUSINESS_FLUENT },
          { languageCode: "ru", level: LanguageLevel.BUSINESS_FLUENT },
        ],
      },
      availabilities: {
        create: [
          { date: new Date("2026-06-09") },
          { date: new Date("2026-06-16") },
          { date: new Date("2026-06-23") },
          { date: new Date("2026-06-30") },
        ],
      },
    },
  });

  // ── Companion 4: Moshe Shapira — Logistics & Real Estate ──────────────────
  const moshe = await prisma.user.upsert({
    where: { email: "moshe@assistil.co.il" }, update: {},
    create: { email: "moshe@assistil.co.il", role: UserRole.COMPANION },
  });
  const mosheProfile = await prisma.companionProfile.upsert({
    where: { userId: moshe.id }, update: {},
    create: {
      userId: moshe.id,
      firstName: "Moshe", lastName: "Shapira",
      bio: "20 years in Israeli logistics and real estate. I help international clients with everything from airport-to-office transfers and site visits to property tours and lease negotiations across the Tel Aviv metropolitan area.",
      location: Region.CENTER,
      hourlyRate: 280, dailyRate: 2000,
      hasSignedNda: true, ndaSignedAt: new Date("2024-05-01"),
      backgroundCheckStatus: BackgroundCheckStatus.APPROVED,
      isApprovedByAdmin: true,
      categories: {
        create: [
          {
            primaryCategory: PrimaryCategory.BUSINESS_PROFESSIONAL,
            subCategory: SubCategory.LOGISTICS_MOBILITY,
          },
          {
            primaryCategory: PrimaryCategory.BUSINESS_PROFESSIONAL,
            subCategory: SubCategory.REAL_ESTATE,
            customHourlyRate: 320, customDailyRate: 2300,
          },
        ],
      },
      skills:    { create: [{ skillTag: "BUSINESS_DEV" }] },
      languages: {
        create: [
          { languageCode: "he", level: LanguageLevel.NATIVE },
          { languageCode: "en", level: LanguageLevel.BUSINESS_FLUENT },
        ],
      },
      availabilities: {
        create: [
          { date: new Date("2026-06-08") },
          { date: new Date("2026-06-09") },
          { date: new Date("2026-06-17") },
        ],
      },
    },
  });

  // ── Reviews ────────────────────────────────────────────────────────────────
  const reviewData: [typeof danaProfile, typeof clients[0], number, string][] = [
    [danaProfile,  clients[0], 5, "Dana completely transformed our market-entry strategy. Indispensable."],
    [danaProfile,  clients[1], 5, "Exceptional insights into the Israeli VC ecosystem. Highly recommend."],
    [danaProfile,  clients[2], 4, "Very professional and well-connected. Will book again."],
    [aviProfile,   clients[0], 5, "Handled our contract signing with flawless precision and speed."],
    [aviProfile,   clients[1], 4, "Excellent Arabic translation at our Jerusalem investor meeting."],
    [noaProfile,   clients[0], 5, "Noa made our team feel genuinely welcome. A wonderful experience."],
    [noaProfile,   clients[2], 5, "Perfect companion for our Tel Aviv social evening. Warm and fun."],
    [mosheProfile, clients[1], 4, "Moshe found us an office in 48 hours. Incredible network."],
    [mosheProfile, clients[2], 5, "Airport pickup to site visits — seamless logistics throughout."],
  ];

  for (const [profile, author, rating, comment] of reviewData) {
    await prisma.review.upsert({
      where:  { profileId_authorId: { profileId: profile.id, authorId: author.id } },
      update: {},
      create: { profileId: profile.id, authorId: author.id, rating, comment },
    });
  }

  console.log(`✅ Admin: ${admin.email}`);
  console.log("✅ Dana Cohen  — Strategic Consulting / Finance (CENTER)");
  console.log("✅ Avi Levi    — Legal & Regulatory / Translation (JERUSALEM)");
  console.log("✅ Noa Bar     — Local Companion / Social Event Host (NORTH)");
  console.log("✅ Moshe Shapira — Logistics / Real Estate (CENTER)");
  console.log("🌱 Seed complete.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());

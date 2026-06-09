-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CLIENT', 'COMPANION', 'ADMIN');

-- CreateEnum
CREATE TYPE "Region" AS ENUM ('CENTER', 'JERUSALEM', 'NORTH', 'SOUTH');

-- CreateEnum
CREATE TYPE "CompanionCategory" AS ENUM ('BUSINESS', 'SOCIAL', 'EVENTS', 'SUPPORT');

-- CreateEnum
CREATE TYPE "LanguageLevel" AS ENUM ('NATIVE', 'BUSINESS_FLUENT');

-- CreateEnum
CREATE TYPE "BackgroundCheckStatus" AS ENUM ('NONE', 'PENDING', 'APPROVED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'CLIENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanionProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "bio" TEXT NOT NULL,
    "location" "Region" NOT NULL,
    "hourlyRate" DECIMAL(10,2) NOT NULL,
    "dailyRate" DECIMAL(10,2) NOT NULL,
    "hasSignedNda" BOOLEAN NOT NULL DEFAULT false,
    "ndaSignedAt" TIMESTAMP(3),
    "backgroundCheckStatus" "BackgroundCheckStatus" NOT NULL DEFAULT 'NONE',
    "isApprovedByAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanionProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanionCategoryConfig" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "category" "CompanionCategory" NOT NULL,
    "customHourlyRate" DECIMAL(10,2),
    "customDailyRate" DECIMAL(10,2),

    CONSTRAINT "CompanionCategoryConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanionSkill" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "skillTag" TEXT NOT NULL,

    CONSTRAINT "CompanionSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanionLanguage" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "level" "LanguageLevel" NOT NULL,

    CONSTRAINT "CompanionLanguage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Availability" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "isBooked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CompanionProfile_userId_key" ON "CompanionProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanionCategoryConfig_profileId_category_key" ON "CompanionCategoryConfig"("profileId", "category");

-- CreateIndex
CREATE UNIQUE INDEX "CompanionSkill_profileId_skillTag_key" ON "CompanionSkill"("profileId", "skillTag");

-- CreateIndex
CREATE UNIQUE INDEX "CompanionLanguage_profileId_languageCode_key" ON "CompanionLanguage"("profileId", "languageCode");

-- CreateIndex
CREATE UNIQUE INDEX "Availability_profileId_date_key" ON "Availability"("profileId", "date");

-- AddForeignKey
ALTER TABLE "CompanionProfile" ADD CONSTRAINT "CompanionProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanionCategoryConfig" ADD CONSTRAINT "CompanionCategoryConfig_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "CompanionProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanionSkill" ADD CONSTRAINT "CompanionSkill_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "CompanionProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanionLanguage" ADD CONSTRAINT "CompanionLanguage_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "CompanionProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "CompanionProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

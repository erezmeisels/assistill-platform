/**
 * Single source of truth for AssistIL category metadata.
 * Imported by both the UI and the server-side code.
 */

export interface SubCategoryMeta {
  value: string;
  label: string;
  description: string;
  primary: string; // PrimaryCategory enum value
}

export interface PrimaryCategoryMeta {
  value: string;
  label: string;
  subCategories: SubCategoryMeta[];
}

export const CATEGORY_TREE: PrimaryCategoryMeta[] = [
  {
    value: "BUSINESS_PROFESSIONAL",
    label: "Business & Professional",
    subCategories: [
      {
        value: "STRATEGIC_CONSULTING",
        primary: "BUSINESS_PROFESSIONAL",
        label: "Strategic Consulting",
        description:
          "Professional guidance for navigating the Israeli market and advancing your business objectives.",
      },
      {
        value: "LEGAL_REGULATORY",
        primary: "BUSINESS_PROFESSIONAL",
        label: "Legal & Regulatory",
        description:
          "Expert support for understanding local laws, regulations, and bureaucratic processes.",
      },
      {
        value: "LOGISTICS_MOBILITY",
        primary: "BUSINESS_PROFESSIONAL",
        label: "Logistics & Mobility",
        description:
          "Seamless coordination for your transportation, travel, and operational needs.",
      },
      {
        value: "FINANCE_INVESTMENT",
        primary: "BUSINESS_PROFESSIONAL",
        label: "Finance & Investment",
        description:
          "Insightful financial guidance and professional connections for your investment journey.",
      },
      {
        value: "REAL_ESTATE",
        primary: "BUSINESS_PROFESSIONAL",
        label: "Real Estate",
        description:
          "Tailored assistance in finding the perfect property solutions for your stay.",
      },
      {
        value: "SECURITY_SAFETY",
        primary: "BUSINESS_PROFESSIONAL",
        label: "Security & Safety",
        description:
          "Comprehensive support to ensure your peace of mind and personal security.",
      },
    ],
  },
  {
    value: "PERSONAL_SOCIAL",
    label: "Personal & Social",
    subCategories: [
      {
        value: "LOCAL_COMPANION",
        primary: "PERSONAL_SOCIAL",
        label: "The Local Companion",
        description:
          "Your dedicated partner for meaningful local connections — exploring culture, enjoying a beer, or discovering hidden gems, all in a relaxed, non-business atmosphere.",
      },
      {
        value: "SOCIAL_EVENT_HOST",
        primary: "PERSONAL_SOCIAL",
        label: "Social & Event Host",
        description:
          "A warm and professional presence to ensure you're well-represented and accompanied at corporate events, galas, and social gatherings.",
      },
      {
        value: "HEARTFELT_COMPANIONSHIP",
        primary: "PERSONAL_SOCIAL",
        label: "Heartfelt Companionship",
        description:
          "Gentle, attentive company for those seeking genuine human connection — tailored for seniors or individuals feeling solitary, providing comfort, conversation, and a sense of belonging far from home.",
      },
    ],
  },
  {
    value: "LANGUAGE_TRANSLATION",
    label: "Language & Translation",
    subCategories: [
      {
        value: "TRANSLATION",
        primary: "LANGUAGE_TRANSLATION",
        label: "Translation",
        description:
          "Professional linguistic support to bridge the gap and ensure clear communication in any setting.",
      },
    ],
  },
  {
    value: "MENTORING_EDUCATION",
    label: "Mentoring & Education",
    subCategories: [
      {
        value: "CAREER_MENTORING",
        primary: "MENTORING_EDUCATION",
        label: "Career Mentoring",
        description:
          "One-on-one guidance to navigate career transitions, build your professional brand, and unlock new opportunities in Israel.",
      },
      {
        value: "ACADEMIC_SUPPORT",
        primary: "MENTORING_EDUCATION",
        label: "Academic Support",
        description:
          "Personalised tutoring and academic coaching for students at all levels, from school to postgraduate studies.",
      },
      {
        value: "PROFESSIONAL_DEVELOPMENT",
        primary: "MENTORING_EDUCATION",
        label: "Professional Development",
        description:
          "Structured workshops and coaching sessions to sharpen your skills and accelerate your professional growth.",
      },
    ],
  },
];

/** Flat map: subCategory value → metadata */
export const SUB_CATEGORY_META: Record<string, SubCategoryMeta> =
  CATEGORY_TREE.flatMap((p) => p.subCategories).reduce<Record<string, SubCategoryMeta>>(
    (acc, s) => { acc[s.value] = s; return acc; },
    {}
  );

/** Flat map: primaryCategory value → metadata */
export const PRIMARY_CATEGORY_META: Record<string, PrimaryCategoryMeta> =
  CATEGORY_TREE.reduce<Record<string, PrimaryCategoryMeta>>(
    (acc, p) => { acc[p.value] = p; return acc; },
    {}
  );

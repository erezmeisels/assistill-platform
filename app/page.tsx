import { Suspense } from "react";
import { HeroSection } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { SearchSection } from "@/components/sections/search-section";
import { JoinCta } from "@/components/sections/join-cta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <Suspense>
        <SearchSection />
      </Suspense>
      <JoinCta />
    </>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  label?: string;
  fallbackHref?: string;
}

export function BackButton({ label = "Back", fallbackHref = "/" }: BackButtonProps) {
  const router = useRouter();

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  }

  return (
    <button
      onClick={handleBack}
      className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-blue-300 transition-colors hover:text-blue-200 focus:outline-none"
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

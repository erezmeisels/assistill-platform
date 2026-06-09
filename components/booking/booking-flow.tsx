"use client";

import React, { useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import {
  X, ArrowLeft, ArrowRight, Check,
  Calendar as CalendarIcon, Clock, Zap, Heart, User, Building2, FileText, ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar, type DateRange } from "@/components/ui/calendar";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/cn";
import { REGION_GROUPS, LANGUAGE_OPTIONS } from "@/components/sections/search-section-constants";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BookingFilters {
  primaryCat: string;
  subCat: string;
  city: string;
  language: string;
}

interface BookingState {
  // Step 2 – Needs
  city: string;
  language: string;
  dateRange: DateRange | undefined;
  timeSlot: string;
  // Business conditional
  urgency: string;
  // Personal conditional
  companionStyle: string;
  sharedInterests: string;
  // Step 3 – Registration
  fullName: string;
  contactPreference: string;
  companyAffiliation: string;
  invoiceName: string;
  taxId: string;
  trustProtocol: boolean;
  contextSummary: string;
}

const INITIAL: BookingState = {
  city: "", language: "",
  dateRange: undefined,
  timeSlot: "",
  urgency: "",
  companionStyle: "",
  sharedInterests: "",
  fullName: "",
  contactPreference: "",
  companyAffiliation: "",
  invoiceName: "",
  taxId: "",
  trustProtocol: false,
  contextSummary: "",
};

// ─── Constants ────────────────────────────────────────────────────────────────

const TIME_SLOTS = [
  { value: "morning",   label: "Morning  (08:00 – 12:00)" },
  { value: "afternoon", label: "Afternoon (12:00 – 17:00)" },
  { value: "evening",   label: "Evening  (17:00 – 21:00)" },
  { value: "full_day",  label: "Full day" },
  { value: "flexible",  label: "Flexible – any time" },
];

const URGENCY_OPTIONS = [
  { value: "standard",  label: "Standard – schedule ahead" },
  { value: "express",   label: "Express – within 48 hours" },
  { value: "same_day",  label: "Same-day – urgent" },
];

const COMPANION_STYLES = [
  { value: "professional", label: "Professional & Discreet" },
  { value: "warm",         label: "Warm & Friendly" },
  { value: "active",       label: "Active & Social" },
  { value: "adaptable",    label: "Adaptable to situation" },
];

const CONTACT_PREFS = [
  { value: "phone",    label: "Phone call" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email",    label: "Email" },
  { value: "video",    label: "Video call" },
];

// ─── Shared field components ──────────────────────────────────────────────────

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 shadow-sm transition focus:border-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0f172a]/10";

function Field({ label, required, hint, children }: {
  label: string; required?: boolean; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-700">
        {label}{required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

// ─── Step 2: Personal Needs Form ──────────────────────────────────────────────

function Step2Needs({
  state, update, primaryCat,
}: { state: BookingState; update: (p: Partial<BookingState>) => void; primaryCat: string }) {
  const [showCal, setShowCal] = useState(false);
  const isBusiness = primaryCat === "BUSINESS_PROFESSIONAL";
  const isPersonal = primaryCat === "PERSONAL_SOCIAL";

  return (
    <div className="space-y-6">
      {/* Location + Language row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Location" required>
          <div className="relative">
            <select
              className={cn(inputCls, "appearance-none pr-9")}
              value={state.city}
              onChange={(e) => update({ city: e.target.value })}
            >
              <option value="">Any city</option>
              {REGION_GROUPS.map((g) => (
                <optgroup key={g.region} label={g.label}>
                  {g.cities.map((c) => <option key={c} value={c}>{c}</option>)}
                </optgroup>
              ))}
            </select>
            <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </Field>

        <Field label="Language" required>
          <div className="relative">
            <select
              className={cn(inputCls, "appearance-none pr-9")}
              value={state.language}
              onChange={(e) => update({ language: e.target.value })}
            >
              <option value="">Any language</option>
              {LANGUAGE_OPTIONS.map((l) => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
            <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </Field>
      </div>

      {/* Date Range */}
      <Field label="Preferred dates" required>
        <button
          type="button"
          onClick={() => setShowCal(!showCal)}
          className={cn(
            inputCls,
            "flex items-center gap-2 text-left w-full",
            !state.dateRange && "text-slate-400"
          )}
        >
          <CalendarIcon className="h-4 w-4 shrink-0 text-slate-400" />
          {state.dateRange?.from
            ? state.dateRange.to
              ? `${format(state.dateRange.from, "d MMM yyyy")} – ${format(state.dateRange.to, "d MMM yyyy")}`
              : format(state.dateRange.from, "d MMM yyyy")
            : "Select a date range"}
        </button>

        {showCal && (
          <div className="mt-2 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-lg">
            <Calendar
              mode="range"
              selected={state.dateRange}
              onSelect={(range) => {
                update({ dateRange: range });
                if (range?.from && range.to) setShowCal(false);
              }}
              numberOfMonths={2}
              disabled={{ before: new Date() }}
              defaultMonth={new Date()}
              className="p-4"
            />
          </div>
        )}
      </Field>

      {/* Time slot */}
      <Field label="Preferred time" required>
        <Select value={state.timeSlot} onValueChange={(v) => update({ timeSlot: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Select a time preference" />
          </SelectTrigger>
          <SelectContent>
            {TIME_SLOTS.map((t) => (
              <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      {/* Business conditional */}
      {isBusiness && (
        <Field label="Urgency" hint="Affects availability and pricing.">
          <div className="grid gap-2 sm:grid-cols-3">
            {URGENCY_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition",
                  state.urgency === opt.value
                    ? "border-[#0f172a] bg-slate-50 font-medium text-[#0f172a]"
                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                )}
              >
                <input
                  type="radio"
                  className="sr-only"
                  value={opt.value}
                  checked={state.urgency === opt.value}
                  onChange={() => update({ urgency: opt.value })}
                />
                <Zap className={cn("h-3.5 w-3.5 shrink-0", state.urgency === opt.value ? "text-amber-500" : "text-slate-300")} />
                {opt.label}
              </label>
            ))}
          </div>
        </Field>
      )}

      {/* Personal conditional */}
      {isPersonal && (
        <div className="space-y-4">
          <Field label="Companion style">
            <div className="grid gap-2 sm:grid-cols-2">
              {COMPANION_STYLES.map((opt) => (
                <label
                  key={opt.value}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition",
                    state.companionStyle === opt.value
                      ? "border-[#0f172a] bg-slate-50 font-medium text-[#0f172a]"
                      : "border-slate-200 text-slate-500 hover:border-slate-300"
                  )}
                >
                  <input
                    type="radio"
                    className="sr-only"
                    value={opt.value}
                    checked={state.companionStyle === opt.value}
                    onChange={() => update({ companionStyle: opt.value })}
                  />
                  <Heart className={cn("h-3.5 w-3.5 shrink-0", state.companionStyle === opt.value ? "text-rose-400" : "text-slate-300")} />
                  {opt.label}
                </label>
              ))}
            </div>
          </Field>

          <Field
            label="Shared interests"
            hint="Tell us what you enjoy — helps us find the right match."
          >
            <textarea
              className={cn(inputCls, "resize-none")}
              rows={2}
              placeholder="e.g. hiking, art galleries, classic films, cooking…"
              value={state.sharedInterests}
              onChange={(e) => update({ sharedInterests: e.target.value })}
            />
          </Field>
        </div>
      )}
    </div>
  );
}

// ─── Step 3: Registration ─────────────────────────────────────────────────────

function Step3Registration({
  state, update,
}: { state: BookingState; update: (p: Partial<BookingState>) => void }) {
  return (
    <div className="space-y-6">
      {/* Identity */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" required>
          <input
            className={inputCls}
            placeholder="Dana Cohen"
            value={state.fullName}
            onChange={(e) => update({ fullName: e.target.value })}
          />
        </Field>

        <Field label="Contact preference" required>
          <Select value={state.contactPreference} onValueChange={(v) => update({ contactPreference: v })}>
            <SelectTrigger>
              <SelectValue placeholder="How should we reach you?" />
            </SelectTrigger>
            <SelectContent>
              {CONTACT_PREFS.map((c) => (
                <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field label="Company affiliation" hint="Optional — include if this engagement is on behalf of an organization.">
        <input
          className={inputCls}
          placeholder="Company or organization name"
          value={state.companyAffiliation}
          onChange={(e) => update({ companyAffiliation: e.target.value })}
        />
      </Field>

      {/* Invoicing */}
      <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-4">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
          <FileText className="h-3.5 w-3.5" />
          Invoicing details
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Invoice name / Company">
            <input
              className={cn(inputCls, "bg-white")}
              placeholder="Same as above"
              value={state.invoiceName}
              onChange={(e) => update({ invoiceName: e.target.value })}
            />
          </Field>
          <Field label="Tax ID / VAT number" hint="Optional">
            <input
              className={cn(inputCls, "bg-white")}
              placeholder="IL-123456789"
              value={state.taxId}
              onChange={(e) => update({ taxId: e.target.value })}
            />
          </Field>
        </div>
      </div>

      {/* Context summary */}
      <Field
        label="Context summary"
        hint="A brief description of what you're looking for. This stays confidential."
      >
        <textarea
          className={cn(inputCls, "resize-none")}
          rows={3}
          placeholder="Briefly describe your situation, goals, or any specific requirements…"
          value={state.contextSummary}
          onChange={(e) => update({ contextSummary: e.target.value })}
        />
      </Field>

      {/* Trust protocol */}
      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:border-slate-200">
        <div
          className={cn(
            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition",
            state.trustProtocol ? "border-[#0f172a] bg-[#0f172a]" : "border-slate-300"
          )}
          onClick={() => update({ trustProtocol: !state.trustProtocol })}
        >
          {state.trustProtocol && <Check className="h-3 w-3 text-white" />}
        </div>
        <div className="text-sm leading-6">
          <p className="font-medium text-[#0f172a]">Trust Protocol agreement <span className="text-red-500">*</span></p>
          <p className="text-slate-500 text-xs mt-0.5">
            I understand that all introductions are confidential. I agree not to contact professionals
            directly outside the AssistILL platform and to honour the platform's code of conduct.
          </p>
        </div>
      </label>
    </div>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

const STEPS = [
  { label: "Your needs",    icon: Clock },
  { label: "Your profile",  icon: User  },
];

function isStep2Valid(s: BookingState): boolean {
  return !!(s.dateRange?.from && s.timeSlot);
}

function isStep3Valid(s: BookingState): boolean {
  return !!(s.fullName && s.contactPreference && s.trustProtocol);
}

interface BookingFlowProps {
  open: boolean;
  onClose: () => void;
  initialFilters: BookingFilters;
  primaryCatLabel: string;
  subCatLabel: string;
}

export function BookingFlow({ open, onClose, initialFilters, primaryCatLabel, subCatLabel }: BookingFlowProps) {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<BookingState>({
    ...INITIAL,
    city: initialFilters.city,
    language: initialFilters.language,
  });
  const [submitted, setSubmitted] = useState(false);

  // Sync city/language if filters change
  useEffect(() => {
    setState((prev) => ({ ...prev, city: initialFilters.city, language: initialFilters.language }));
  }, [initialFilters.city, initialFilters.language]);

  // Reset on close
  useEffect(() => {
    if (!open) { setStep(0); setState({ ...INITIAL, city: initialFilters.city, language: initialFilters.language }); setSubmitted(false); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function update(partial: Partial<BookingState>) {
    setState((prev) => ({ ...prev, ...partial }));
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:inset-x-auto sm:inset-y-0 sm:right-0 sm:top-0 sm:w-[520px] sm:rounded-none sm:rounded-l-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{primaryCatLabel}</p>
            <h2 className="text-base font-bold text-[#0f172a]">{subCatLabel || "Find your match"}</h2>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex border-b border-slate-100">
          {STEPS.map((s, i) => {
            const done   = i < step;
            const active = i === step;
            return (
              <div
                key={i}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 py-3 text-xs font-medium transition border-b-2",
                  active ? "border-[#0f172a] text-[#0f172a]" : done ? "border-[#0f172a]/30 text-slate-400" : "border-transparent text-slate-300"
                )}
              >
                {done ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <span className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold",
                    active ? "bg-[#0f172a] text-white" : "bg-slate-100 text-slate-400"
                  )}>{i + 1}</span>
                )}
                {s.label}
              </div>
            );
          })}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
                <Check className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-[#0f172a]">Request received!</h3>
              <p className="max-w-xs text-sm text-slate-500">
                We'll match you with the best available professional and be in touch within a few hours.
              </p>
              <button onClick={onClose} className="mt-4 text-sm font-medium text-blue-600 hover:underline">
                Close
              </button>
            </div>
          ) : (
            <>
              {step === 0 && (
                <Step2Needs state={state} update={update} primaryCat={initialFilters.primaryCat} />
              )}
              {step === 1 && (
                <Step3Registration state={state} update={update} />
              )}
            </>
          )}
        </div>

        {/* Footer nav */}
        {!submitted && (
          <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
            <button
              onClick={() => step > 0 ? setStep(s => s - 1) : onClose()}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-[#0f172a] transition"
            >
              <ArrowLeft className="h-4 w-4" />
              {step > 0 ? "Back" : "Cancel"}
            </button>

            {step < STEPS.length - 1 ? (
              <Button
                onClick={() => setStep(s => s + 1)}
                disabled={step === 0 && !isStep2Valid(state)}
                className="gap-2"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!isStep3Valid(state)}
                className="gap-2 bg-emerald-700 hover:bg-emerald-800"
              >
                Submit request
                <ShieldCheck className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

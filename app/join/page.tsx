"use client";

import React, { useRef, useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Check, Upload, X, PenLine, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORY_TREE } from "@/lib/categories";
import { cn } from "@/lib/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  // Step 1
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  linkedin: string;
  // Step 2
  occupation: string;
  yearsOfExperience: string;
  // Step 3
  selectedServices: string[];
  // Step 4
  files: File[];
  signatureDone: boolean;
}

// ─── City options ─────────────────────────────────────────────────────────────

const CITIES = [
  "Tel Aviv-Yafo", "Ramat Gan", "Herzliya", "Petah Tikva", "Rishon LeZion",
  "Jerusalem", "Modi'in", "Beit Shemesh",
  "Haifa", "Caesarea", "Acre",
  "Beer Sheva", "Eilat", "Ashkelon",
];

// ─── Step indicators ──────────────────────────────────────────────────────────

const STEPS = [
  { label: "Personal details" },
  { label: "Background" },
  { label: "Services" },
  { label: "Verification" },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-0">
      {STEPS.map((step, i) => {
        const done    = i < current;
        const active  = i === current;
        const isLast  = i === STEPS.length - 1;
        return (
          <li key={i} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all",
                  done   && "bg-[#0f172a] text-white",
                  active && "ring-2 ring-[#0f172a] ring-offset-2 bg-[#0f172a] text-white",
                  !done && !active && "bg-slate-100 text-slate-400"
                )}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span className={cn(
                "hidden text-[10px] font-medium sm:block whitespace-nowrap",
                active ? "text-[#0f172a]" : "text-slate-400"
              )}>
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div className={cn(
                "mx-2 h-px w-10 sm:w-16 transition-colors",
                done ? "bg-[#0f172a]" : "bg-slate-200"
              )} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

// ─── Input component ─────────────────────────────────────────────────────────

function Field({
  label, required, children,
}: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 shadow-sm transition focus:border-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0f172a]/10";

// ─── Signature pad ────────────────────────────────────────────────────────────

function SignaturePad({ onSigned }: { onSigned: (done: boolean) => void }) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const drawing    = useRef(false);
  const [isEmpty,  setIsEmpty]  = useState(true);

  function getPos(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current!;
    const rect   = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function startDraw(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    drawing.current = true;
    const ctx = canvasRef.current!.getContext("2d")!;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function draw(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.lineWidth   = 2;
    ctx.lineCap     = "round";
    ctx.strokeStyle = "#0f172a";
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    setIsEmpty(false);
    onSigned(true);
  }

  function endDraw() {
    drawing.current = false;
  }

  function clear() {
    const canvas = canvasRef.current!;
    canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
    onSigned(false);
  }

  // Resize canvas to match display size
  useEffect(() => {
    const canvas  = canvasRef.current!;
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width  = width;
    canvas.height = height;
  }, []);

  return (
    <div className="space-y-2">
      <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 transition-colors hover:border-slate-300">
        <canvas
          ref={canvasRef}
          className="h-32 w-full cursor-crosshair touch-none"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
        />
        {isEmpty && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="flex items-center gap-2 text-sm text-slate-400">
              <PenLine className="h-4 w-4" />
              Draw your signature here
            </span>
          </div>
        )}
      </div>
      {!isEmpty && (
        <button
          type="button"
          onClick={clear}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-500 transition"
        >
          <Trash2 className="h-3 w-3" />
          Clear signature
        </button>
      )}
    </div>
  );
}

// ─── Steps ────────────────────────────────────────────────────────────────────

function Step1({ data, update }: { data: FormData; update: (d: Partial<FormData>) => void }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="First name" required>
        <input className={inputCls} placeholder="Dana" value={data.firstName}
          onChange={(e) => update({ firstName: e.target.value })} />
      </Field>
      <Field label="Last name" required>
        <input className={inputCls} placeholder="Cohen" value={data.lastName}
          onChange={(e) => update({ lastName: e.target.value })} />
      </Field>
      <Field label="Email address" required>
        <input className={inputCls} type="email" placeholder="dana@example.com" value={data.email}
          onChange={(e) => update({ email: e.target.value })} />
      </Field>
      <Field label="Phone number" required>
        <input className={inputCls} type="tel" placeholder="+972 50 000 0000" value={data.phone}
          onChange={(e) => update({ phone: e.target.value })} />
      </Field>
      <Field label="City" required>
        <div className="relative">
          <select
            className={cn(inputCls, "appearance-none pr-9")}
            value={data.city}
            onChange={(e) => update({ city: e.target.value })}
          >
            <option value="">Select your city</option>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </Field>
      <Field label="LinkedIn profile">
        <input className={inputCls} placeholder="linkedin.com/in/dana-cohen" value={data.linkedin}
          onChange={(e) => update({ linkedin: e.target.value })} />
      </Field>
    </div>
  );
}

function Step2({ data, update }: { data: FormData; update: (d: Partial<FormData>) => void }) {
  return (
    <div className="grid gap-5">
      <Field label="Occupation / Title" required>
        <input className={inputCls} placeholder="e.g. Business Strategist, Legal Consultant, Translator…"
          value={data.occupation} onChange={(e) => update({ occupation: e.target.value })} />
      </Field>
      <Field label="Years of experience" required>
        <div className="relative">
          <select
            className={cn(inputCls, "appearance-none pr-9")}
            value={data.yearsOfExperience}
            onChange={(e) => update({ yearsOfExperience: e.target.value })}
          >
            <option value="">Select range</option>
            {["1–2 years", "3–5 years", "6–10 years", "11–15 years", "15+ years"].map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
          <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </Field>
    </div>
  );
}

function Step3({ data, update }: { data: FormData; update: (d: Partial<FormData>) => void }) {
  function toggle(val: string) {
    update({
      selectedServices: data.selectedServices.includes(val)
        ? data.selectedServices.filter((s) => s !== val)
        : [...data.selectedServices, val],
    });
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-500">
        Select all the services you can provide. This helps us match you with the right clients.
      </p>
      {CATEGORY_TREE.map((primary) => (
        <div key={primary.value}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
            {primary.label}
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {primary.subCategories.map((sub) => {
              const checked = data.selectedServices.includes(sub.value);
              return (
                <label
                  key={sub.value}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all",
                    checked
                      ? "border-[#0f172a] bg-slate-50"
                      : "border-slate-100 bg-white hover:border-slate-200"
                  )}
                >
                  <div className={cn(
                    "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition",
                    checked ? "border-[#0f172a] bg-[#0f172a]" : "border-slate-300"
                  )}>
                    {checked && <Check className="h-2.5 w-2.5 text-white" />}
                  </div>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={() => toggle(sub.value)}
                  />
                  <div>
                    <p className="text-sm font-medium text-[#0f172a]">{sub.label}</p>
                    <p className="mt-0.5 text-xs leading-5 text-slate-500">{sub.description}</p>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function Step4({ data, update }: { data: FormData; update: (d: Partial<FormData>) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFiles(incoming: FileList | null) {
    if (!incoming) return;
    const newFiles = Array.from(incoming);
    update({ files: [...data.files, ...newFiles] });
  }

  function removeFile(idx: number) {
    update({ files: data.files.filter((_, i) => i !== idx) });
  }

  return (
    <div className="space-y-8">
      {/* Document upload */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-[#0f172a]">
          Upload your documents <span className="text-red-500">*</span>
        </p>
        <p className="text-xs text-slate-500">
          Please provide a government-issued ID and any relevant professional certifications
          (PDF, JPG, or PNG — max 10 MB each).
        </p>

        <div
          className="group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-10 transition hover:border-[#0f172a]/30 hover:bg-slate-100"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm group-hover:bg-[#0f172a] transition">
            <Upload className="h-5 w-5 text-slate-400 group-hover:text-white transition" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-slate-700">Click to upload files</p>
            <p className="text-xs text-slate-400">or drag and drop</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {data.files.length > 0 && (
          <ul className="space-y-2">
            {data.files.map((file, i) => (
              <li key={i} className="flex items-center justify-between rounded-lg border border-slate-100 bg-white px-3 py-2">
                <span className="truncate text-sm text-slate-700">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="ml-3 text-slate-400 hover:text-red-500 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* NDA signature */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-[#0f172a]">
          NDA Digital Signature <span className="text-red-500">*</span>
        </p>
        <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-xs leading-6 text-slate-500">
          By signing below, you agree to maintain strict confidentiality regarding all client
          information, engagements, and interactions facilitated through AssistILL. This
          Non-Disclosure Agreement is legally binding and takes effect upon submission of this form.
        </div>
        <SignaturePad onSigned={(done) => update({ signatureDone: done })} />
        {data.signatureDone && (
          <p className="flex items-center gap-1.5 text-xs text-emerald-600">
            <Check className="h-3.5 w-3.5" />
            Signature recorded
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

const EMPTY: FormData = {
  firstName: "", lastName: "", email: "", phone: "", city: "", linkedin: "",
  occupation: "", yearsOfExperience: "",
  selectedServices: [],
  files: [], signatureDone: false,
};

function isStepValid(step: number, data: FormData): boolean {
  if (step === 0) return !!(data.firstName && data.lastName && data.email && data.phone && data.city);
  if (step === 1) return !!(data.occupation && data.yearsOfExperience);
  if (step === 2) return data.selectedServices.length > 0;
  if (step === 3) return data.files.length > 0 && data.signatureDone;
  return false;
}

export default function JoinPage() {
  const [step,    setStep]    = useState(0);
  const [data,    setData]    = useState<FormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  function update(partial: Partial<FormData>) {
    setData((prev) => ({ ...prev, ...partial }));
  }

  function handleSubmit() {
    // In production: POST to /api/professionals/apply
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
          <Check className="h-8 w-8 text-emerald-600" />
        </div>
        <h1 className="text-2xl font-bold text-[#0f172a]">Application submitted!</h1>
        <p className="mx-auto mt-3 max-w-md text-slate-500">
          Thank you, {data.firstName}. Our team will review your application and be in touch
          within 2–3 business days.
        </p>
        <a href="/" className="mt-8 text-sm font-medium text-blue-600 hover:underline">
          ← Back to AssistILL
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="mb-10 text-center">
        <a href="/" className="mb-4 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-700 transition">
          ← AssistILL
        </a>
        <h1 className="text-3xl font-bold tracking-tight text-[#0f172a]">
          Become a Professional
        </h1>
        <p className="mt-2 text-slate-500">
          Join Israel's most trusted professional network.
        </p>
      </div>

      {/* Step indicator */}
      <div className="mb-10 flex justify-center">
        <StepIndicator current={step} />
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="mb-6 text-base font-semibold text-[#0f172a]">
          {step === 0 && "Personal details"}
          {step === 1 && "Professional background"}
          {step === 2 && "Services you offer"}
          {step === 3 && "Verification & NDA"}
        </h2>

        {step === 0 && <Step1 data={data} update={update} />}
        {step === 1 && <Step2 data={data} update={update} />}
        {step === 2 && <Step3 data={data} update={update} />}
        {step === 3 && <Step4 data={data} update={update} />}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className={cn(
              "flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-[#0f172a] transition",
              step === 0 && "invisible"
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          {step < STEPS.length - 1 ? (
            <Button
              onClick={() => setStep((s) => s + 1)}
              disabled={!isStepValid(step, data)}
              className="gap-2"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid(step, data)}
              className="gap-2 bg-emerald-700 hover:bg-emerald-800 focus-visible:ring-emerald-700"
            >
              Submit application
              <Check className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Step count */}
      <p className="mt-4 text-center text-xs text-slate-400">
        Step {step + 1} of {STEPS.length}
      </p>
    </div>
  );
}

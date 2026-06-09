"use client";

import * as React from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type { DateRange };

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months:              "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month:               "space-y-4",
        caption:             "flex justify-center pt-1 relative items-center",
        caption_label:       "text-sm font-semibold text-[#0f172a]",
        nav:                 "space-x-1 flex items-center",
        nav_button:          cn(
          "h-7 w-7 bg-transparent p-0 opacity-60 hover:opacity-100 transition",
          "inline-flex items-center justify-center rounded-md border border-slate-200 hover:bg-slate-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next:     "absolute right-1",
        table:               "w-full border-collapse space-y-1",
        head_row:            "flex",
        head_cell:           "text-slate-400 rounded-md w-9 font-normal text-[0.8rem]",
        row:                 "flex w-full mt-2",
        cell:                cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
          "[&:has([aria-selected])]:bg-blue-50",
          "[&:has([aria-selected].day-outside)]:bg-blue-50/50",
          "[&:has([aria-selected].day-range-end)]:rounded-r-md",
          "[&:has([aria-selected].day-range-start)]:rounded-l-md"
        ),
        day:                 cn(
          "h-9 w-9 p-0 font-normal",
          "inline-flex items-center justify-center rounded-md text-sm",
          "hover:bg-slate-100 hover:text-[#0f172a] transition",
          "focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20",
          "aria-selected:opacity-100"
        ),
        day_range_start:     "day-range-start bg-[#0f172a] text-white hover:bg-[#0f172a] hover:text-white rounded-l-md rounded-r-none",
        day_range_end:       "day-range-end bg-[#0f172a] text-white hover:bg-[#0f172a] hover:text-white rounded-r-md rounded-l-none",
        day_selected:        "bg-[#0f172a] text-white hover:bg-[#0f172a] hover:text-white focus:bg-[#0f172a] focus:text-white",
        day_today:           "border border-blue-300 text-blue-700",
        day_outside:         "day-outside text-slate-300 aria-selected:bg-blue-50/50 aria-selected:text-slate-400",
        day_disabled:        "text-slate-200 cursor-not-allowed",
        day_range_middle:    "aria-selected:bg-blue-50 aria-selected:text-[#0f172a]",
        day_hidden:          "invisible",
        ...classNames,
      }}
      components={{
        IconLeft:  () => <ChevronLeft  className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}

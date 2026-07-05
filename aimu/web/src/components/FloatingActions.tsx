"use client";

import { useState } from "react";
import { LeadForm } from "@/components/LeadForm";

export function FloatingActions({
  phone,
  whatsappNumber,
  countries,
  courses,
}: {
  phone: string | null | undefined;
  whatsappNumber: string | null | undefined;
  countries: string[];
  courses: string[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
        {phone && (
          <a
            href={`tel:${phone}`}
            aria-label="Call now"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white shadow-lg transition-transform hover:scale-110"
          >
            📞
          </a>
        )}
        {whatsappNumber && (
          <a
            href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp chat"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald text-white shadow-lg transition-transform hover:scale-110"
          >
            💬
          </a>
        )}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-12 items-center justify-center rounded-full bg-gold px-5 text-sm font-semibold text-navy shadow-lg transition-transform hover:scale-105"
        >
          Book Free Counseling
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold text-navy">Get Free Counseling</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-navy/50 hover:text-navy"
              >
                ✕
              </button>
            </div>
            <LeadForm countries={countries} courses={courses} source="popup" onSuccess={() => setTimeout(() => setOpen(false), 1500)} />
          </div>
        </div>
      )}
    </>
  );
}

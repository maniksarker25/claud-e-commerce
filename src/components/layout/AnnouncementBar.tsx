"use client";

import { useState } from "react";
import { X } from "lucide-react";

const announcements = [
  "Complimentary shipping on orders over $200 — No code needed",
  "New arrivals: Spring Linen Collection now available",
  "Free returns within 30 days — Shop with confidence",
];

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const [current, setCurrent] = useState(0);

  if (!visible) return null;

  return (
    <div className="bg-stone-900 text-stone-100 text-xs tracking-widest uppercase font-light py-2.5 px-4 relative">
      <div className="flex items-center justify-center gap-6 max-w-7xl mx-auto">
        <button
          onClick={() =>
            setCurrent((prev) => (prev - 1 + announcements.length) % announcements.length)
          }
          className="opacity-50 hover:opacity-100 transition-opacity hidden sm:block"
          aria-label="Previous announcement"
        >
          ‹
        </button>
        <p className="text-center">{announcements[current]}</p>
        <button
          onClick={() =>
            setCurrent((prev) => (prev + 1) % announcements.length)
          }
          className="opacity-50 hover:opacity-100 transition-opacity hidden sm:block"
          aria-label="Next announcement"
        >
          ›
        </button>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity"
        aria-label="Close announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
}

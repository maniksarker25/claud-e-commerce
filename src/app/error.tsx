"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-display text-5xl font-light text-stone-900 mb-3">
          Something went wrong
        </h1>
        <p className="text-stone-400 mb-8">
          We encountered an unexpected error. Please try again.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-stone-900 text-white px-8 py-3.5 text-sm font-medium hover:bg-stone-800 transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="border border-stone-300 text-stone-700 px-8 py-3.5 text-sm font-medium hover:border-stone-700 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

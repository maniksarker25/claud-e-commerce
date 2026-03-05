import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-mono text-stone-300 text-sm tracking-widest mb-4">404</p>
        <h1 className="font-display text-5xl sm:text-6xl font-light text-stone-900 mb-4">
          Page not found
        </h1>
        <p className="text-stone-400 mb-8 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-3.5 text-sm font-medium hover:bg-stone-800 transition-colors"
          >
            Return Home
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 border border-stone-300 text-stone-700 px-8 py-3.5 text-sm font-medium hover:border-stone-700 transition-colors"
          >
            Browse Collection
          </Link>
        </div>
      </div>
    </div>
  );
}

import { Suspense } from "react";
import type { Metadata } from "next";
import { Hero, CategoryBanner, EditorialBanner, TrustBar, Marquee } from "@/components/home";
import { ProductGrid, ProductGridSkeleton } from "@/components/product/ProductGrid";
import { getFeaturedProducts, getBestSellers, getNewProducts } from "@/lib/data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "LUXE — Considered Luxury",
};

function SectionHeader({
  eyebrow,
  title,
  link,
}: {
  eyebrow: string;
  title: string;
  link?: { label: string; href: string };
}) {
  return (
    <div className="flex items-end justify-between mb-10">
      <div>
        <p className="text-[10px] tracking-[0.4em] uppercase text-brand-500 mb-2">
          {eyebrow}
        </p>
        <h2 className="font-display text-4xl sm:text-5xl font-light text-stone-900">
          {title}
        </h2>
      </div>
      {link && (
        <Link
          href={link.href}
          className="hidden sm:flex items-center gap-1 text-sm text-stone-500 hover:text-stone-900 transition-colors link-underline"
        >
          {link.label}
          <ArrowRight size={13} />
        </Link>
      )}
    </div>
  );
}

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const bestSellers = getBestSellers();
  const newProducts = getNewProducts();

  return (
    <>
      <Hero />
      <TrustBar />

      {/* Featured Products */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Curated Selection"
          title="Featured Pieces"
          link={{ label: "View all", href: "/shop" }}
        />
        <Suspense fallback={<ProductGridSkeleton count={4} />}>
          <ProductGrid products={featuredProducts} columns={4} />
        </Suspense>
      </section>

      <CategoryBanner />

      {/* Best Sellers */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Most Loved"
          title="Best Sellers"
          link={{ label: "Shop all", href: "/shop?filter=best-selling" }}
        />
        <Suspense fallback={<ProductGridSkeleton count={4} />}>
          <ProductGrid products={bestSellers} columns={4} />
        </Suspense>
      </section>

      <EditorialBanner />
      <Marquee />

      {/* New Arrivals */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Just In"
          title="New Arrivals"
          link={{ label: "See all new", href: "/shop?filter=new" }}
        />
        <Suspense fallback={<ProductGridSkeleton count={3} />}>
          <ProductGrid products={newProducts} columns={3} />
        </Suspense>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-stone-50 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[0.4em] uppercase text-brand-500 mb-2">
              What Our Clients Say
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-stone-900">
              Loved by many
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "The quality is exceptional. Each piece feels like it was made specifically for me — the attention to detail is unlike anything I've found elsewhere.",
                author: "Alexandra M.",
                location: "New York",
              },
              {
                quote:
                  "I've been a customer for three years now. Every purchase has been flawless from packaging to the pieces themselves. This is luxury shopping done right.",
                author: "James R.",
                location: "London",
              },
              {
                quote:
                  "My cashmere sweater is the softest thing I've ever worn. Worth every penny — it's become an absolute wardrobe staple that I reach for daily.",
                author: "Sofia L.",
                location: "Paris",
              },
            ].map((t) => (
              <div key={t.author} className="bg-white p-8 border border-stone-100">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-3.5 h-3.5 text-brand-500 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-stone-600 text-sm leading-relaxed mb-6 font-light italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-medium text-stone-900 text-sm">{t.author}</p>
                  <p className="text-stone-400 text-xs">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

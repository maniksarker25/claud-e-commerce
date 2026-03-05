"use client";

import { useWishlistStore, useCartStore } from "@/store/cartStore";
import { products } from "@/lib/data";
import { ProductGrid } from "@/components/product/ProductGrid";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";

export default function WishlistPage() {
  const { items: wishlistIds } = useWishlistStore();
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-brand-500 mb-1">
          Saved Items
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-light text-stone-900">
          Wishlist
        </h1>
        <p className="text-stone-400 text-sm mt-1">
          {wishlistedProducts.length} saved piece(s)
        </p>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="text-center py-24 border border-stone-100">
          <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4">
            <Heart size={24} className="text-stone-400" />
          </div>
          <p className="font-display text-2xl text-stone-700 mb-2">
            Your wishlist is empty
          </p>
          <p className="text-stone-400 text-sm mb-6">
            Save pieces you love to revisit later
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-3.5 text-sm font-medium hover:bg-stone-800 transition-colors"
          >
            Explore the Collection
            <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <ProductGrid products={wishlistedProducts} columns={4} />
      )}
    </div>
  );
}

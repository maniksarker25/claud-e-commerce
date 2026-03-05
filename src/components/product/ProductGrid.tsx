import { ProductCard } from "./ProductCard";
import type { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
}

export function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  const colClass = {
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  }[columns];

  return (
    <div className={`grid ${colClass} gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-12`}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index < 4}
        />
      ))}
    </div>
  );
}

// Skeleton loader
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-12">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[3/4] bg-stone-200 shimmer" />
          <div className="mt-3 space-y-2">
            <div className="h-3 bg-stone-200 rounded w-1/3" />
            <div className="h-4 bg-stone-200 rounded w-3/4" />
            <div className="h-3 bg-stone-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, Grid2X2, LayoutGrid, X, ChevronDown } from "lucide-react";
import { products } from "@/lib/data";
import { ProductGrid } from "@/components/product/ProductGrid";
import { cn } from "@/lib/utils";
import type { Category, SortOption } from "@/types";

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Top Rated", value: "rating" },
  { label: "Best Selling", value: "best-selling" },
];

const categoryOptions: { label: string; value: Category }[] = [
  { label: "Clothing", value: "clothing" },
  { label: "Bags", value: "bags" },
  { label: "Footwear", value: "footwear" },
  { label: "Jewelry", value: "jewelry" },
  { label: "Accessories", value: "accessories" },
  { label: "Home", value: "home" },
];

export default function ShopPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as Category | null;
  const initialFilter = searchParams.get("filter");

  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    initialCategory ? [initialCategory] : []
  );
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [gridColumns, setGridColumns] = useState<3 | 4>(4);
  const [sortOpen, setSortOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Quick filter
    if (initialFilter === "new") result = result.filter((p) => p.isNew);
    if (initialFilter === "sale") result = result.filter((p) => p.originalPrice);
    if (initialFilter === "best-selling") result = result.filter((p) => p.isBestSeller);

    // Price filter
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "best-selling":
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
    }

    return result;
  }, [selectedCategories, sortBy, priceRange, initialFilter]);

  const toggleCategory = (cat: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 2000]);
    setSortBy("featured");
  };

  const hasActiveFilters = selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 2000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Page header */}
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.4em] uppercase text-brand-500 mb-1">
          {initialFilter ? initialFilter.replace("-", " ") : "All Items"}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-light text-stone-900">
          {initialFilter === "new"
            ? "New Arrivals"
            : initialFilter === "sale"
            ? "Sale"
            : initialFilter === "best-selling"
            ? "Best Sellers"
            : selectedCategories.length === 1
            ? categoryOptions.find((c) => c.value === selectedCategories[0])?.label
            : "The Collection"}
        </h1>
        <p className="text-stone-400 text-sm mt-1">
          {filteredProducts.length} pieces
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex items-center justify-between py-4 border-y border-stone-200 mb-8 gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className={cn(
              "flex items-center gap-2 text-sm font-medium px-4 py-2 border transition-colors",
              filterOpen || hasActiveFilters
                ? "border-stone-900 text-stone-900 bg-stone-900 text-white"
                : "border-stone-300 text-stone-600 hover:border-stone-900 hover:text-stone-900"
            )}
          >
            <SlidersHorizontal size={14} />
            Filters
            {hasActiveFilters && (
              <span className="bg-brand-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {selectedCategories.length + (priceRange[0] > 0 || priceRange[1] < 2000 ? 1 : 0)}
              </span>
            )}
          </button>

          {/* Active filter pills */}
          {selectedCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className="flex items-center gap-1.5 text-xs bg-stone-100 text-stone-700 px-3 py-1.5 hover:bg-stone-200 transition-colors capitalize"
            >
              {cat}
              <X size={11} />
            </button>
          ))}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-stone-400 hover:text-stone-700 underline"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 transition-colors"
            >
              Sort:{" "}
              <span className="font-medium">
                {sortOptions.find((s) => s.value === sortBy)?.label}
              </span>
              <ChevronDown
                size={14}
                className={cn("transition-transform", sortOpen && "rotate-180")}
              />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-stone-200 shadow-lg z-20 py-1">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSortBy(opt.value);
                      setSortOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2.5 text-sm transition-colors",
                      sortBy === opt.value
                        ? "text-brand-600 bg-brand-50"
                        : "text-stone-600 hover:bg-stone-50"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Grid toggle */}
          <div className="hidden sm:flex items-center gap-1">
            <button
              onClick={() => setGridColumns(4)}
              className={cn(
                "p-1.5 transition-colors",
                gridColumns === 4 ? "text-stone-900" : "text-stone-400 hover:text-stone-600"
              )}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setGridColumns(3)}
              className={cn(
                "p-1.5 transition-colors",
                gridColumns === 3 ? "text-stone-900" : "text-stone-400 hover:text-stone-600"
              )}
            >
              <Grid2X2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter sidebar + grid */}
      <div className="flex gap-8">
        {/* Filter sidebar */}
        {filterOpen && (
          <aside className="w-56 flex-shrink-0 animate-fade-in">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <div>
                <h3 className="text-xs font-medium tracking-widest uppercase text-stone-900 mb-4">
                  Category
                </h3>
                <div className="space-y-2">
                  {categoryOptions.map((cat) => (
                    <label
                      key={cat.value}
                      className="flex items-center gap-2.5 cursor-pointer group"
                    >
                      <div
                        className={cn(
                          "w-4 h-4 border flex items-center justify-center transition-colors",
                          selectedCategories.includes(cat.value)
                            ? "bg-stone-900 border-stone-900"
                            : "border-stone-300 group-hover:border-stone-600"
                        )}
                        onClick={() => toggleCategory(cat.value)}
                      >
                        {selectedCategories.includes(cat.value) && (
                          <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10">
                            <path
                              d="M1.5 5l2.5 2.5 4.5-4.5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              fill="none"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
                        {cat.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div>
                <h3 className="text-xs font-medium tracking-widest uppercase text-stone-900 mb-4">
                  Price Range
                </h3>
                <div className="space-y-3">
                  {[
                    [0, 200],
                    [200, 500],
                    [500, 1000],
                    [1000, 2000],
                  ].map(([min, max]) => (
                    <label key={`${min}-${max}`} className="flex items-center gap-2.5 cursor-pointer group">
                      <div
                        className={cn(
                          "w-4 h-4 border flex items-center justify-center transition-colors",
                          priceRange[0] === min && priceRange[1] === max
                            ? "bg-stone-900 border-stone-900"
                            : "border-stone-300 rounded-full group-hover:border-stone-600"
                        )}
                        onClick={() => setPriceRange([min, max])}
                      >
                        {priceRange[0] === min && priceRange[1] === max && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
                        ${min} – {max === 2000 ? "$2000+" : `$${max}`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-2xl text-stone-400 mb-2">
                No pieces found
              </p>
              <p className="text-stone-400 text-sm mb-4">
                Try adjusting your filters
              </p>
              <button
                onClick={clearFilters}
                className="text-sm text-stone-900 underline hover:no-underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} columns={gridColumns} />
          )}
        </div>
      </div>
    </div>
  );
}

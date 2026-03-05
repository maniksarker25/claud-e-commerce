"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShoppingBag,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Star,
  Truck,
  RotateCcw,
  Shield,
  Plus,
  Minus,
  Check,
} from "lucide-react";
import { getProductBySlug, getRelatedProducts } from "@/lib/data";
import { useCartStore, useWishlistStore } from "@/store/cartStore";
import { formatPrice, calculateDiscount, cn } from "@/lib/utils";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { ProductColor } from "@/types";
import toast from "react-hot-toast";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) notFound();

  const relatedProducts = getRelatedProducts(product.id, product.category);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes?.[0]
  );
  const [selectedColor, setSelectedColor] = useState<ProductColor | undefined>(
    product.colors?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "details" | "reviews">("description");

  const { addItem, openCart } = useCartStore();
  const { toggleWishlist, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize, selectedColor);
    setAddedToCart(true);
    toast.success(`${product.name} added to bag`);
    setTimeout(() => setAddedToCart(false), 2000);
    openCart();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-stone-400 mb-8">
        <Link href="/" className="hover:text-stone-700 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/shop?category=${product.category}`}
          className="hover:text-stone-700 transition-colors capitalize"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-stone-600">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 xl:gap-16">
        {/* Images */}
        <div className="space-y-3">
          {/* Main image */}
          <div className="relative aspect-[4/5] overflow-hidden bg-stone-50">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Image navigation */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === 0 ? product.images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === product.images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </>
            )}
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <span className="bg-stone-900 text-white text-[10px] tracking-widest uppercase px-2.5 py-1.5">
                  New
                </span>
              )}
              {discount > 0 && (
                <span className="bg-brand-500 text-white text-[10px] tracking-widest uppercase px-2.5 py-1.5">
                  -{discount}%
                </span>
              )}
            </div>
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={cn(
                  "relative w-20 h-24 flex-shrink-0 overflow-hidden",
                  selectedImage === i
                    ? "ring-2 ring-stone-900"
                    : "ring-1 ring-stone-200 opacity-60 hover:opacity-100"
                )}
              >
                <Image
                  src={img}
                  alt={`${product.name} view ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div className="lg:py-2">
          {/* Header */}
          <div className="mb-6">
            <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-2">
              {product.category}
              {product.subcategory && ` / ${product.subcategory}`}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-light text-stone-900 leading-tight mb-3">
              {product.name}
            </h1>
            <p className="text-stone-500 leading-relaxed">{product.description}</p>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={cn(
                      i < Math.floor(product.rating)
                        ? "text-brand-500 fill-current"
                        : "text-stone-200 fill-current"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-stone-500">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-8">
            <span className="font-display text-3xl font-light text-stone-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-stone-400 text-xl line-through font-light">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-brand-600 text-sm font-medium">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              </>
            )}
          </div>

          {/* Colors */}
          {product.colors && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium tracking-widest uppercase text-stone-900">
                  Color
                </span>
                <span className="text-sm text-stone-500">
                  {selectedColor?.name}
                </span>
              </div>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    className={cn(
                      "w-8 h-8 rounded-full border-2 transition-all",
                      selectedColor?.name === color.name
                        ? "border-stone-900 scale-110"
                        : "border-transparent hover:border-stone-400"
                    )}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium tracking-widest uppercase text-stone-900">
                  Size
                </span>
                <button className="text-xs text-stone-400 hover:text-stone-700 underline">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "min-w-[44px] px-3 py-2 text-sm border transition-all",
                      selectedSize === size
                        ? "border-stone-900 bg-stone-900 text-white"
                        : "border-stone-300 text-stone-600 hover:border-stone-700 hover:text-stone-900"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <span className="text-xs font-medium tracking-widest uppercase text-stone-900 block mb-3">
              Quantity
            </span>
            <div className="flex items-center gap-0 border border-stone-300 w-fit">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-3 text-stone-500 hover:text-stone-900 transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="w-12 text-center text-stone-900 font-medium">
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
                className="px-4 py-3 text-stone-500 hover:text-stone-900 transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
            {product.stock <= 5 && (
              <p className="text-orange-600 text-xs mt-2">
                Only {product.stock} left in stock
              </p>
            )}
          </div>

          {/* CTA buttons */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium tracking-wide transition-all",
                addedToCart
                  ? "bg-green-700 text-white"
                  : "bg-stone-900 hover:bg-stone-800 text-white"
              )}
            >
              {addedToCart ? (
                <>
                  <Check size={16} />
                  Added to Bag
                </>
              ) : (
                <>
                  <ShoppingBag size={16} />
                  Add to Bag
                </>
              )}
            </button>
            <button
              onClick={() => {
                toggleWishlist(product.id);
                toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist");
              }}
              className={cn(
                "px-4 border transition-colors",
                wishlisted
                  ? "border-brand-500 bg-brand-50 text-brand-600"
                  : "border-stone-300 text-stone-600 hover:border-stone-900 hover:text-stone-900"
              )}
              aria-label="Toggle wishlist"
            >
              <Heart
                size={18}
                className={wishlisted ? "fill-current" : ""}
              />
            </button>
            <button
              className="px-4 border border-stone-300 text-stone-600 hover:border-stone-900 hover:text-stone-900 transition-colors"
              aria-label="Share"
            >
              <Share2 size={18} />
            </button>
          </div>

          {/* Trust signals */}
          <div className="border-t border-stone-100 pt-6 space-y-3">
            {[
              { icon: Truck, text: "Free shipping on orders over $200" },
              { icon: RotateCcw, text: "30-day hassle-free returns" },
              { icon: Shield, text: "Authenticity guaranteed" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-stone-500">
                <Icon size={15} className="text-stone-400 flex-shrink-0" />
                {text}
              </div>
            ))}
          </div>

          {/* SKU */}
          <p className="text-xs text-stone-300 mt-4 font-mono">SKU: {product.sku}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16 border-t border-stone-200">
        <div className="flex gap-8 border-b border-stone-200">
          {(["description", "details", "reviews"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "py-4 text-sm font-medium tracking-wide capitalize transition-colors border-b-2 -mb-px",
                activeTab === tab
                  ? "border-stone-900 text-stone-900"
                  : "border-transparent text-stone-400 hover:text-stone-700"
              )}
            >
              {tab === "reviews" ? `Reviews (${product.reviewCount})` : tab}
            </button>
          ))}
        </div>

        <div className="py-8 max-w-2xl">
          {activeTab === "description" && (
            <p className="text-stone-600 leading-relaxed">{product.longDescription}</p>
          )}
          {activeTab === "details" && (
            <dl className="space-y-4">
              {product.materials && (
                <div>
                  <dt className="text-xs font-medium tracking-widest uppercase text-stone-900 mb-1">
                    Materials
                  </dt>
                  <dd className="text-stone-600 text-sm">
                    {product.materials.join(", ")}
                  </dd>
                </div>
              )}
              {product.dimensions && (
                <div>
                  <dt className="text-xs font-medium tracking-widest uppercase text-stone-900 mb-1">
                    Dimensions
                  </dt>
                  <dd className="text-stone-600 text-sm">{product.dimensions}</dd>
                </div>
              )}
              {product.weight && (
                <div>
                  <dt className="text-xs font-medium tracking-widest uppercase text-stone-900 mb-1">
                    Weight
                  </dt>
                  <dd className="text-stone-600 text-sm">{product.weight}</dd>
                </div>
              )}
              <div>
                <dt className="text-xs font-medium tracking-widest uppercase text-stone-900 mb-1">
                  Care
                </dt>
                <dd className="text-stone-600 text-sm">
                  Dry clean recommended. See label for detailed care instructions.
                </dd>
              </div>
            </dl>
          )}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="font-display text-5xl font-light text-stone-900">
                    {product.rating}
                  </div>
                  <div className="flex mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={cn(
                          i < Math.floor(product.rating)
                            ? "text-brand-500 fill-current"
                            : "text-stone-200 fill-current"
                        )}
                      />
                    ))}
                  </div>
                  <div className="text-stone-400 text-xs mt-1">
                    {product.reviewCount} reviews
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  {
                    name: "Alexandra M.",
                    rating: 5,
                    date: "Jan 20, 2024",
                    text: "Absolutely exceptional quality. The craftsmanship is outstanding and it fits perfectly. Worth every penny.",
                  },
                  {
                    name: "James R.",
                    rating: 5,
                    date: "Feb 5, 2024",
                    text: "This piece has quickly become a wardrobe staple. The quality is exactly as described — luxurious and well-constructed.",
                  },
                ].map((r) => (
                  <div
                    key={r.name}
                    className="border-t border-stone-100 pt-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-medium text-stone-900 text-sm">
                          {r.name}
                        </span>
                        <span className="text-stone-400 text-xs ml-2">✓ Verified</span>
                      </div>
                      <span className="text-stone-400 text-xs">{r.date}</span>
                    </div>
                    <div className="flex mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className="text-brand-500 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-stone-600 text-sm leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 pt-16 border-t border-stone-200">
          <h2 className="font-display text-3xl font-light text-stone-900 mb-8">
            You May Also Like
          </h2>
          <ProductGrid products={relatedProducts} columns={4} />
        </div>
      )}
    </div>
  );
}

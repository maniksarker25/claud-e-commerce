"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { useCartStore, useWishlistStore } from "@/store/cartStore";
import { formatPrice, calculateDiscount, cn } from "@/lib/utils";
import type { Product } from "@/types";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCartStore();
  const { toggleWishlist, isWishlisted } = useWishlistStore();

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1, product.sizes?.[0], product.colors?.[0]);
    toast.success(`${product.name} added to bag`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product.id);
    toast.success(
      wishlisted ? "Removed from wishlist" : "Added to wishlist"
    );
  };

  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  return (
    <div
      className="product-card group relative"
      onMouseEnter={() => {
        setIsHovered(true);
        if (product.images.length > 1) setImageIndex(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setImageIndex(0);
      }}
    >
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-stone-50">
          <Image
            src={product.images[imageIndex] || product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            className="product-card-image object-cover object-center"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-stone-900 text-white text-[10px] tracking-widest uppercase px-2 py-1 font-medium">
                New
              </span>
            )}
            {discount > 0 && (
              <span className="bg-brand-500 text-white text-[10px] tracking-widest uppercase px-2 py-1 font-medium">
                -{discount}%
              </span>
            )}
            {product.isBestSeller && !product.isNew && (
              <span className="bg-white text-stone-700 text-[10px] tracking-widest uppercase px-2 py-1 font-medium border border-stone-200">
                Best Seller
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div
            className={cn(
              "absolute top-3 right-3 flex flex-col gap-2 transition-all duration-200",
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
            )}
          >
            <button
              onClick={handleWishlist}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-colors",
                wishlisted
                  ? "bg-brand-500 text-white"
                  : "bg-white text-stone-600 hover:text-brand-600 hover:bg-brand-50"
              )}
              aria-label="Add to wishlist"
            >
              <Heart
                size={14}
                className={wishlisted ? "fill-current" : ""}
              />
            </button>
            <Link
              href={`/product/${product.slug}`}
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-stone-600 hover:text-stone-900 transition-colors"
              aria-label="Quick view"
            >
              <Eye size={14} />
            </Link>
          </div>

          {/* Quick add to bag */}
          <div
            className={cn(
              "absolute bottom-0 inset-x-0 transition-all duration-300",
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            )}
          >
            <button
              onClick={handleAddToCart}
              className="w-full bg-stone-900/90 backdrop-blur-sm text-white text-xs tracking-widest uppercase py-3 hover:bg-stone-900 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag size={13} />
              Quick Add
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-3 px-0.5">
          <p className="text-[10px] tracking-widest uppercase text-stone-400 mb-1">
            {product.category}
          </p>
          <h3 className="text-sm font-medium text-stone-900 group-hover:text-brand-600 transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-stone-500 mt-0.5 line-clamp-1 hidden sm:block">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={cn(
                    "w-2.5 h-2.5",
                    i < Math.floor(product.rating)
                      ? "text-brand-500 fill-current"
                      : i < product.rating
                      ? "text-brand-300 fill-current"
                      : "text-stone-200 fill-current"
                  )}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[10px] text-stone-400">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="font-medium text-stone-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-stone-400 text-sm line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Color swatches */}
          {product.colors && product.colors.length > 1 && (
            <div className="flex gap-1 mt-2">
              {product.colors.slice(0, 4).map((color) => (
                <div
                  key={color.name}
                  className="w-3.5 h-3.5 rounded-full border border-stone-200 cursor-pointer hover:scale-110 transition-transform"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[10px] text-stone-400 self-center">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

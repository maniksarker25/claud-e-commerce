"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { useIntersectionObserver } from "@/hooks";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] max-h-[900px] overflow-hidden bg-stone-100">
      <Image
        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800"
        alt="LUXE — Considered Luxury"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/60 via-stone-950/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-lg">
            <p className="text-white/70 text-xs tracking-[0.4em] uppercase mb-4 font-light animate-fade-in">
              Spring Collection 2025
            </p>
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-light text-white leading-[0.95] mb-6 animate-fade-up">
              Wear
              <br />
              <em>Less.</em>
              <br />
              Better.
            </h1>
            <p className="text-white/70 text-base font-light mb-8 leading-relaxed max-w-sm animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Curated pieces crafted from exceptional materials by skilled artisans around the world.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-white text-stone-900 px-7 py-3.5 text-sm font-medium tracking-wide hover:bg-stone-100 transition-colors group"
              >
                Shop the Collection
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/shop?filter=new"
                className="inline-flex items-center gap-2 border border-white/40 text-white px-7 py-3.5 text-sm font-medium tracking-wide hover:bg-white/10 transition-colors"
              >
                New Arrivals
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="text-white/50 text-[10px] tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-8 bg-white/30" />
      </div>
    </section>
  );
}

export function CategoryBanner() {
  const categories = [
    {
      label: "Clothing",
      href: "/shop?category=clothing",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600",
    },
    {
      label: "Bags",
      href: "/shop?category=bags",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600",
    },
    {
      label: "Footwear",
      href: "/shop?category=footwear",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    },
    {
      label: "Jewelry",
      href: "/shop?category=jewelry",
      image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600",
    },
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex items-end justify-between mb-10">
        <h2 className="font-display text-4xl sm:text-5xl font-light text-stone-900">
          Shop by Category
        </h2>
        <Link
          href="/shop"
          className="text-sm text-stone-500 hover:text-stone-900 transition-colors link-underline hidden sm:flex items-center gap-1"
        >
          View all
          <ArrowRight size={13} />
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="relative aspect-[3/4] overflow-hidden group bg-stone-100"
          >
            <Image
              src={cat.image}
              alt={cat.label}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 640px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <span className="text-white font-display text-xl sm:text-2xl font-light">
                {cat.label}
              </span>
              <div className="flex items-center gap-1 mt-1 text-white/70 text-xs tracking-widest uppercase group-hover:text-white transition-colors">
                <span>Explore</span>
                <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function EditorialBanner() {
  const [ref, isVisible] = useIntersectionObserver(0.2);

  return (
    <section
      ref={ref}
      className={cn(
        "py-0 my-20 max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <div className="grid lg:grid-cols-2 gap-0 min-h-[500px]">
        <div className="relative overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900"
            alt="Editorial"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="bg-stone-900 text-white p-10 sm:p-16 flex flex-col justify-center">
          <p className="text-stone-400 text-xs tracking-[0.4em] uppercase mb-4">
            The Edit
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-light leading-[1.1] mb-6">
            Dressing for
            <br />
            <em>Spring Evenings</em>
          </h2>
          <p className="text-stone-300 text-sm leading-relaxed mb-8 max-w-sm">
            Our stylist shares her guide to transitional dressing — the art of
            looking effortlessly composed as temperatures shift.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-white text-stone-900 px-6 py-3 text-sm font-medium hover:bg-stone-100 transition-colors group self-start"
            >
              Shop the Look
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <button className="inline-flex items-center gap-2 text-stone-300 hover:text-white transition-colors text-sm self-start sm:self-center">
              <div className="w-8 h-8 border border-stone-600 rounded-full flex items-center justify-center hover:border-white transition-colors">
                <Play size={12} className="ml-0.5" />
              </div>
              Watch the film
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustBar() {
  const features = [
    {
      icon: "✦",
      title: "Free Shipping Over $200",
      desc: "Complimentary worldwide shipping",
    },
    {
      icon: "◈",
      title: "30-Day Returns",
      desc: "Hassle-free return policy",
    },
    {
      icon: "◉",
      title: "Authenticity Guaranteed",
      desc: "Every piece is certified genuine",
    },
    {
      icon: "◎",
      title: "Artisan Crafted",
      desc: "Made by skilled artisans globally",
    },
  ];

  return (
    <div className="border-y border-stone-200 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f) => (
            <div key={f.title} className="text-center">
              <div className="text-brand-500 text-xl mb-2">{f.icon}</div>
              <h3 className="text-stone-900 font-medium text-sm mb-0.5">
                {f.title}
              </h3>
              <p className="text-stone-400 text-xs">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Marquee() {
  const words = [
    "Merino Wool",
    "Italian Leather",
    "Belgian Linen",
    "Mongolian Cashmere",
    "Silk Charmeuse",
    "Suede",
    "Vermeil Gold",
    "Organic Cotton",
  ];

  return (
    <div className="bg-brand-500 text-white py-4 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...words, ...words].map((word, i) => (
          <span key={i} className="text-sm font-light tracking-[0.3em] uppercase mx-8">
            {word}
            <span className="mx-8 opacity-40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, User, Menu, X, Heart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "New In", href: "/shop?filter=new" },
  { label: "Clothing", href: "/shop?category=clothing" },
  { label: "Bags", href: "/shop?category=bags" },
  { label: "Footwear", href: "/shop?category=footwear" },
  { label: "Jewelry", href: "/shop?category=jewelry" },
  { label: "Sale", href: "/shop?filter=sale" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const { getTotalItems, openCart } = useCartStore();
  const totalItems = getTotalItems();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled || !isHome
            ? "bg-white/95 backdrop-blur-sm border-b border-stone-200 shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 -ml-2 text-stone-700 hover:text-stone-900 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-xs tracking-widest uppercase font-medium link-underline transition-colors",
                    pathname === link.href
                      ? "text-brand-600"
                      : "text-stone-600 hover:text-stone-900"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Logo */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 font-display text-2xl sm:text-3xl font-light tracking-[0.2em] text-stone-900 hover:text-brand-600 transition-colors"
            >
              LUXE
            </Link>

            {/* Desktop nav right */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.slice(3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-xs tracking-widest uppercase font-medium link-underline transition-colors",
                    link.label === "Sale"
                      ? "text-brand-600 hover:text-brand-700"
                      : pathname === link.href
                      ? "text-brand-600"
                      : "text-stone-600 hover:text-stone-900"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Action icons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-stone-600 hover:text-stone-900 transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              <Link
                href="/wishlist"
                className="p-2 text-stone-600 hover:text-stone-900 transition-colors hidden sm:flex"
                aria-label="Wishlist"
              >
                <Heart size={18} />
              </Link>
              <Link
                href="/account"
                className="p-2 text-stone-600 hover:text-stone-900 transition-colors hidden sm:flex"
                aria-label="Account"
              >
                <User size={18} />
              </Link>
              <button
                onClick={openCart}
                className="p-2 text-stone-600 hover:text-stone-900 transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-500 text-white text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search overlay */}
        {searchOpen && (
          <div className="border-t border-stone-200 bg-white px-4 py-4 animate-fade-in">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <Search size={18} className="text-stone-400 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for pieces..."
                className="flex-1 text-stone-900 placeholder-stone-400 text-sm focus:outline-none bg-transparent"
                autoFocus
              />
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                className="text-stone-400 hover:text-stone-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-stone-900/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl animate-slide-in">
            <div className="p-6 border-b border-stone-100">
              <span className="font-display text-2xl tracking-widest">LUXE</span>
            </div>
            <nav className="p-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm tracking-wider uppercase font-medium rounded-lg transition-colors",
                    link.label === "Sale"
                      ? "text-brand-600"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="px-6 pt-4 border-t border-stone-100">
              <div className="space-y-1">
                <Link
                  href="/account"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-lg transition-colors"
                >
                  <User size={16} />
                  Account
                </Link>
                <Link
                  href="/wishlist"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-lg transition-colors"
                >
                  <Heart size={16} />
                  Wishlist
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getShipping, getTotal } = useCartStore();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = getSubtotal();
  const shipping = getShipping();
  const total = getTotal();
  const discount = promoApplied ? subtotal * 0.1 : 0;

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "LUXE10") {
      setPromoApplied(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.4em] uppercase text-brand-500 mb-1">Shopping</p>
        <h1 className="font-display text-4xl sm:text-5xl font-light text-stone-900">
          Your Bag
        </h1>
        {items.length > 0 && (
          <p className="text-stone-400 text-sm mt-1">{items.length} item(s)</p>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-24 border border-stone-100">
          <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag size={24} className="text-stone-400" />
          </div>
          <p className="font-display text-2xl text-stone-700 mb-2">Your bag is empty</p>
          <p className="text-stone-400 text-sm mb-6">Discover pieces worth owning</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-3.5 text-sm font-medium hover:bg-stone-800 transition-colors"
          >
            Explore the Collection
            <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2">
            <div className="border-t border-stone-200 divide-y divide-stone-100">
              {items.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor?.name}-${index}`}
                  className="py-6 flex gap-5"
                >
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="relative w-24 h-30 flex-shrink-0 bg-stone-50 overflow-hidden"
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="font-medium text-stone-900 hover:text-brand-600 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-stone-400 text-xs mt-1 capitalize">
                          {item.product.category}
                        </p>
                        <div className="flex gap-3 mt-1.5 text-xs text-stone-500">
                          {item.selectedSize && (
                            <span>Size: <span className="font-medium">{item.selectedSize}</span></span>
                          )}
                          {item.selectedColor && (
                            <span className="flex items-center gap-1">
                              <span
                                className="w-2.5 h-2.5 rounded-full border border-stone-200"
                                style={{ backgroundColor: item.selectedColor.hex }}
                              />
                              {item.selectedColor.name}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor?.name)}
                        className="text-stone-300 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-0 border border-stone-200">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize, item.selectedColor?.name)}
                          className="px-3 py-2 text-stone-500 hover:text-stone-900 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedColor?.name)}
                          className="px-3 py-2 text-stone-500 hover:text-stone-900 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-stone-900">
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-stone-400 text-xs">
                            {formatPrice(item.product.price)} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-stone-50 border border-stone-200 p-6 sticky top-24">
              <h2 className="font-medium text-stone-900 mb-5">Order Summary</h2>

              {/* Promo code */}
              <div className="mb-5">
                <label className="text-xs text-stone-500 block mb-2">Promo Code</label>
                <div className="flex gap-0">
                  <div className="flex-1 flex items-center gap-2 border border-stone-300 bg-white px-3">
                    <Tag size={13} className="text-stone-400" />
                    <input
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="LUXE10"
                      className="flex-1 py-2.5 text-sm focus:outline-none bg-transparent"
                    />
                  </div>
                  <button
                    onClick={applyPromo}
                    disabled={promoApplied}
                    className="px-4 bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 disabled:bg-stone-400 transition-colors"
                  >
                    {promoApplied ? "✓" : "Apply"}
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-green-600 text-xs mt-1.5">LUXE10 applied — 10% off!</p>
                )}
              </div>

              {/* Pricing breakdown */}
              <div className="space-y-3 text-sm border-t border-stone-200 pt-4">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600 font-medium">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-stone-900 text-base pt-3 border-t border-stone-200">
                  <span>Total</span>
                  <span>{formatPrice(total - discount)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 w-full bg-stone-900 hover:bg-stone-800 text-white py-4 font-medium text-sm tracking-wide transition-colors mt-5 group"
              >
                Proceed to Checkout
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="mt-4 flex items-center justify-center gap-4">
                {["Visa", "MC", "Amex", "PayPal"].map((p) => (
                  <span key={p} className="text-[10px] text-stone-300 font-mono">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

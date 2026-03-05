'use client';

import { useLockScroll } from '@/hooks';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getSubtotal,
    getShipping,
    getTotal,
  } = useCartStore();

  useLockScroll(isOpen);
  const subtotal = getSubtotal();
  const shipping = getShipping();
  const total = getTotal();
  const freeShippingThreshold = 200;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 animate-fade-in"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl transition-transform duration-400 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-stone-700" />
            <h2 className="font-display text-xl font-medium text-stone-900">Your Bag</h2>
            {items.length > 0 && (
              <span className="text-stone-400 text-sm">
                ({items.length} {items.length === 1 ? 'item' : 'items'})
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-stone-400 hover:text-stone-700 transition-colors rounded-full hover:bg-stone-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free shipping progress */}
        {subtotal < freeShippingThreshold && items.length > 0 && (
          <div className="px-6 py-3 bg-brand-50 border-b border-brand-100">
            <p className="text-xs text-brand-700 mb-1.5">
              Add{' '}
              <span className="font-semibold">{formatPrice(freeShippingThreshold - subtotal)}</span>{' '}
              for free shipping
            </p>
            <div className="w-full bg-brand-100 rounded-full h-1">
              <div
                className="bg-brand-500 h-1 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-6">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center">
                <ShoppingBag size={24} className="text-stone-400" />
              </div>
              <div>
                <p className="font-display text-xl text-stone-700 mb-1">Your bag is empty</p>
                <p className="text-stone-400 text-sm">Discover our curated collection</p>
              </div>
              <Link
                href="/shop"
                onClick={closeCart}
                className="mt-2 bg-stone-900 text-white px-6 py-3 text-sm font-medium hover:bg-stone-800 transition-colors rounded-none"
              >
                Explore the Collection
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {items.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor?.name}-${index}`}
                  className="p-6 flex gap-4"
                >
                  <div className="relative w-20 h-24 flex-shrink-0 bg-stone-50 overflow-hidden">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/product/${item.product.slug}`}
                        onClick={closeCart}
                        className="font-medium text-stone-900 text-sm leading-snug hover:text-brand-600 transition-colors line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() =>
                          removeItem(item.product.id, item.selectedSize, item.selectedColor?.name)
                        }
                        className="text-stone-300 hover:text-red-400 transition-colors flex-shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="flex gap-3 mt-1 text-xs text-stone-400">
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
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
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1 border border-stone-200">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.selectedSize,
                              item.selectedColor?.name
                            )
                          }
                          className="p-1.5 text-stone-500 hover:text-stone-900 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-sm font-medium text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.selectedSize,
                              item.selectedColor?.name
                            )
                          }
                          className="p-1.5 text-stone-500 hover:text-stone-900 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="font-medium text-stone-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-stone-100 p-6 space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
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
              <div className="flex justify-between font-semibold text-stone-900 pt-2 border-t border-stone-100">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex items-center justify-center gap-2 w-full bg-stone-900 hover:bg-stone-800 text-white py-4 font-medium text-sm tracking-wide transition-colors group"
            >
              Proceed to Checkout
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={closeCart}
              className="w-full text-stone-500 hover:text-stone-700 text-sm transition-colors text-center"
            >
              Continue shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight, Lock, CreditCard, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = "information" | "shipping" | "payment";

export default function CheckoutPage() {
  const { items, getSubtotal, getShipping, getTotal, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>("information");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
    phone: "",
    shippingMethod: "standard",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    cardName: "",
  });

  const steps: { id: Step; label: string }[] = [
    { id: "information", label: "Information" },
    { id: "shipping", label: "Shipping" },
    { id: "payment", label: "Payment" },
  ];

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={28} className="text-green-600" />
          </div>
          <h1 className="font-display text-4xl font-light text-stone-900 mb-3">
            Order Confirmed
          </h1>
          <p className="text-stone-500 mb-2">
            Thank you for your order! We&apos;ll send a confirmation email shortly.
          </p>
          <p className="text-xs text-stone-400 font-mono mb-8">
            Order #LXE-{Math.random().toString(36).slice(2, 8).toUpperCase()}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-3.5 text-sm font-medium hover:bg-stone-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid lg:grid-cols-2 gap-12">
      {/* Left: Form */}
      <div>
        {/* Logo */}
        <Link href="/" className="font-display text-2xl tracking-widest text-stone-900 mb-8 block">
          LUXE
        </Link>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <Link href="/cart" className="text-brand-600 hover:text-brand-700 text-xs">Cart</Link>
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <ChevronRight size={12} className="text-stone-300" />
              <button
                onClick={() => {
                  const order: Step[] = ["information", "shipping", "payment"];
                  if (order.indexOf(s.id) <= order.indexOf(step)) setStep(s.id);
                }}
                className={cn(
                  "text-xs transition-colors",
                  step === s.id
                    ? "text-stone-900 font-medium"
                    : order.indexOf(s.id) < order.indexOf(step)
                    ? "text-brand-600 hover:text-brand-700"
                    : "text-stone-400"
                )}
              >
                {s.label}
              </button>
            </div>
          ))}
        </div>

        {/* Information Step */}
        {step === "information" && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="font-display text-2xl font-light text-stone-900">Contact</h2>
            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-stone-300 px-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-600 transition-colors"
            />

            <h2 className="font-display text-2xl font-light text-stone-900 pt-2">
              Shipping Address
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { key: "firstName", placeholder: "First name" },
                { key: "lastName", placeholder: "Last name" },
              ].map(({ key, placeholder }) => (
                <input
                  key={key}
                  placeholder={placeholder}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="border border-stone-300 px-4 py-3 text-sm placeholder-stone-400 focus:outline-none focus:border-stone-600 transition-colors"
                />
              ))}
            </div>
            {[
              { key: "address", placeholder: "Address" },
              { key: "city", placeholder: "City" },
            ].map(({ key, placeholder }) => (
              <input
                key={key}
                placeholder={placeholder}
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full border border-stone-300 px-4 py-3 text-sm placeholder-stone-400 focus:outline-none focus:border-stone-600 transition-colors"
              />
            ))}
            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="State"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                className="border border-stone-300 px-4 py-3 text-sm placeholder-stone-400 focus:outline-none focus:border-stone-600 transition-colors"
              />
              <input
                placeholder="ZIP code"
                value={form.zip}
                onChange={(e) => setForm({ ...form, zip: e.target.value })}
                className="border border-stone-300 px-4 py-3 text-sm placeholder-stone-400 focus:outline-none focus:border-stone-600 transition-colors"
              />
            </div>
            <button
              onClick={() => setStep("shipping")}
              className="w-full bg-stone-900 hover:bg-stone-800 text-white py-4 text-sm font-medium tracking-wide transition-colors mt-2"
            >
              Continue to Shipping
            </button>
          </div>
        )}

        {/* Shipping Step */}
        {step === "shipping" && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="font-display text-2xl font-light text-stone-900">
              Shipping Method
            </h2>
            {[
              {
                id: "standard",
                icon: Truck,
                label: "Standard Shipping",
                desc: "5–7 business days",
                price: getSubtotal() >= 200 ? "Free" : "$15",
              },
              {
                id: "express",
                icon: Truck,
                label: "Express Shipping",
                desc: "2–3 business days",
                price: "$35",
              },
              {
                id: "overnight",
                icon: Truck,
                label: "Overnight Shipping",
                desc: "Next business day",
                price: "$65",
              },
            ].map((method) => (
              <label
                key={method.id}
                className={cn(
                  "flex items-center gap-4 p-4 border cursor-pointer transition-colors",
                  form.shippingMethod === method.id
                    ? "border-stone-900 bg-stone-50"
                    : "border-stone-200 hover:border-stone-400"
                )}
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                    form.shippingMethod === method.id
                      ? "border-stone-900"
                      : "border-stone-300"
                  )}
                  onClick={() => setForm({ ...form, shippingMethod: method.id })}
                >
                  {form.shippingMethod === method.id && (
                    <div className="w-2 h-2 rounded-full bg-stone-900" />
                  )}
                </div>
                <method.icon size={16} className="text-stone-400" />
                <div className="flex-1">
                  <div className="font-medium text-stone-900 text-sm">{method.label}</div>
                  <div className="text-stone-400 text-xs">{method.desc}</div>
                </div>
                <span className="font-medium text-stone-900 text-sm">{method.price}</span>
              </label>
            ))}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep("information")}
                className="px-6 py-4 border border-stone-300 text-stone-600 text-sm hover:border-stone-700 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep("payment")}
                className="flex-1 bg-stone-900 hover:bg-stone-800 text-white py-4 text-sm font-medium tracking-wide transition-colors"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}

        {/* Payment Step */}
        {step === "payment" && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-light text-stone-900">Payment</h2>
              <div className="flex items-center gap-1.5 text-stone-400 text-xs">
                <Lock size={12} />
                Secure & encrypted
              </div>
            </div>
            <div className="relative">
              <CreditCard size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                placeholder="Card number"
                value={form.cardNumber}
                onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
                className="w-full border border-stone-300 pl-11 pr-4 py-3 text-sm placeholder-stone-400 focus:outline-none focus:border-stone-600 transition-colors"
              />
            </div>
            <input
              placeholder="Name on card"
              value={form.cardName}
              onChange={(e) => setForm({ ...form, cardName: e.target.value })}
              className="w-full border border-stone-300 px-4 py-3 text-sm placeholder-stone-400 focus:outline-none focus:border-stone-600 transition-colors"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="MM / YY"
                value={form.cardExpiry}
                onChange={(e) => setForm({ ...form, cardExpiry: e.target.value })}
                className="border border-stone-300 px-4 py-3 text-sm placeholder-stone-400 focus:outline-none focus:border-stone-600 transition-colors"
              />
              <input
                placeholder="CVV"
                value={form.cardCvv}
                onChange={(e) => setForm({ ...form, cardCvv: e.target.value })}
                className="border border-stone-300 px-4 py-3 text-sm placeholder-stone-400 focus:outline-none focus:border-stone-600 transition-colors"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep("shipping")}
                className="px-6 py-4 border border-stone-300 text-stone-600 text-sm hover:border-stone-700 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handlePlaceOrder}
                className="flex-1 bg-stone-900 hover:bg-stone-800 text-white py-4 text-sm font-medium tracking-wide transition-colors"
              >
                Place Order — {formatPrice(getTotal())}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right: Order summary */}
      <div className="lg:border-l lg:border-stone-200 lg:pl-12">
        <h3 className="font-medium text-stone-900 mb-5 text-sm tracking-widest uppercase">
          Order Summary
        </h3>
        <div className="divide-y divide-stone-100 mb-6">
          {items.map((item, i) => (
            <div key={i} className="py-4 flex gap-4">
              <div className="relative w-16 h-20 flex-shrink-0 bg-stone-50 overflow-hidden">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
                <span className="absolute -top-1 -right-1 bg-stone-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-stone-900 line-clamp-1">
                  {item.product.name}
                </p>
                {item.selectedSize && (
                  <p className="text-xs text-stone-400 mt-0.5">Size: {item.selectedSize}</p>
                )}
              </div>
              <span className="text-sm font-medium text-stone-900">
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
        <div className="space-y-2 text-sm border-t border-stone-200 pt-4">
          <div className="flex justify-between text-stone-500">
            <span>Subtotal</span>
            <span>{formatPrice(getSubtotal())}</span>
          </div>
          <div className="flex justify-between text-stone-500">
            <span>Shipping</span>
            <span>
              {getShipping() === 0 ? (
                <span className="text-green-600">Free</span>
              ) : (
                formatPrice(getShipping())
              )}
            </span>
          </div>
          <div className="flex justify-between font-semibold text-stone-900 text-base pt-2 border-t border-stone-200">
            <span>Total</span>
            <span>{formatPrice(getTotal())}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper for steps ordering
const order: Step[] = ["information", "shipping", "payment"];
type Step = "information" | "shipping" | "payment";

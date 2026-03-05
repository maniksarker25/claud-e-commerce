import Link from "next/link";
import { Instagram, Twitter, Facebook, Mail, ArrowRight } from "lucide-react";

const footerLinks = {
  Shop: [
    { label: "New Arrivals", href: "/shop?filter=new" },
    { label: "Clothing", href: "/shop?category=clothing" },
    { label: "Bags", href: "/shop?category=bags" },
    { label: "Footwear", href: "/shop?category=footwear" },
    { label: "Jewelry", href: "/shop?category=jewelry" },
    { label: "Sale", href: "/shop?filter=sale" },
  ],
  Help: [
    { label: "Sizing Guide", href: "/sizing" },
    { label: "Shipping & Returns", href: "/shipping" },
    { label: "Care Instructions", href: "/care" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
  ],
  Company: [
    { label: "Our Story", href: "/about" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Artisans", href: "/artisans" },
    { label: "Press", href: "/press" },
    { label: "Careers", href: "/careers" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300">
      {/* Newsletter */}
      <div className="border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="max-w-xl">
            <h3 className="font-display text-3xl font-light text-white mb-2">
              Join the inner circle
            </h3>
            <p className="text-stone-400 text-sm mb-6">
              Be first to discover new arrivals, exclusive offers, and stories
              from our artisans.
            </p>
            <div className="flex gap-0">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-stone-900 border border-stone-700 border-r-0 px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-brand-500 transition-colors"
              />
              <button className="bg-brand-500 hover:bg-brand-600 text-white px-5 py-3 transition-colors flex items-center gap-2 text-sm font-medium">
                Subscribe
                <ArrowRight size={14} />
              </button>
            </div>
            <p className="text-stone-600 text-xs mt-3">
              No spam. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-12">
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="/"
              className="font-display text-3xl font-light text-white tracking-widest hover:text-brand-400 transition-colors"
            >
              LUXE
            </Link>
            <p className="text-stone-400 text-sm mt-4 leading-relaxed max-w-xs">
              Considered luxury for the discerning individual. Crafted with
              intention, worn with purpose.
            </p>
            <div className="flex gap-4 mt-6">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-stone-500 hover:text-white transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
              <a
                href="mailto:hello@luxe.com"
                className="text-stone-500 hover:text-white transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white text-xs font-medium tracking-widest uppercase mb-5">
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-stone-400 hover:text-white text-sm transition-colors link-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-600 text-xs">
            © {new Date().getFullYear()} LUXE. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-stone-600 hover:text-stone-400 text-xs transition-colors"
                >
                  {item}
                </Link>
              )
            )}
          </div>
          <p className="text-stone-700 text-xs font-mono">
            Crafted with care in NYC
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { siteConfig } from "@/config/site.config";

export function Footer() {
  const { social, contact } = siteConfig;
  return (
    <footer>
      <div className="bg-gradient-to-b from-[#35093C] to-[#240429] border-t border-[#D89E2E]/30 py-10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1 flex flex-col items-center">
              <div className="relative h-36 w-48 mb-3">
                <Image src={siteConfig.logo.footer} alt={`${siteConfig.name} logo`} fill sizes="192px" className="object-contain object-center" />
              </div>
              <div className="flex items-center justify-center gap-2">
                {social.instagram && (
                  <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-full bg-white/10 hover:bg-[#FD4380] text-white/80 hover:text-white flex items-center justify-center transition-all duration-300">
                    <Instagram className="h-3.5 w-3.5" />
                  </a>
                )}
                {social.facebook && (
                  <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-full bg-white/10 hover:bg-[#FD4380] text-white/80 hover:text-white flex items-center justify-center transition-all duration-300">
                    <Facebook className="h-3.5 w-3.5" />
                  </a>
                )}
                {social.youtube && (
                  <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-full bg-white/10 hover:bg-[#FD4380] text-white/80 hover:text-white flex items-center justify-center transition-all duration-300">
                    <Youtube className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-[#D89E2E]" style={{ fontFamily: "'Marcellus', serif", fontSize: "0.85rem", letterSpacing: "0.18em", textTransform: "uppercase" }}>Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { label: "Shop", href: "/shop" },
                  { label: "Blogs", href: "/blogs"},
                  { label: "About", href: "/about" },
                  { label: "Courses", href: "/courses" },
                  { label: "Consultation", href: "/booking" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-xs text-white/65 hover:text-[#EEC6BC] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-[#D89E2E]" style={{ fontFamily: "'Marcellus', serif", fontSize: "0.85rem", letterSpacing: "0.18em", textTransform: "uppercase" }}>Help</h4>
              <ul className="space-y-2">
                {[
                  { label: "Contact Us", href: "/contact" },
                  { label: "Privacy Policy", href: "/privacy-policy" },
                  { label: "Return & Refund", href: "/refund-policy" },
                  { label: "Terms of Service", href: "/terms" },
                  { label: "Disclaimer", href: "/disclaimer" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-xs text-white/65 hover:text-[#EEC6BC] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-sm font-semibold mb-3 text-[#D89E2E]" style={{ fontFamily: "'Marcellus', serif", fontSize: "0.85rem", letterSpacing: "0.18em", textTransform: "uppercase" }}>Contact</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-[#FD4380] flex-shrink-0" />
                    <span className="text-xs text-white/65">{contact.supportEmail}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-[#FD4380] flex-shrink-0" />
                    <span className="text-xs text-white/65">{contact.phone}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-[#FD4380] flex-shrink-0" />
                    <span className="text-xs text-white/65">
                      {[contact.address.city, contact.address.country].filter(Boolean).join(", ") || "—"}
                    </span>
                  </li>
                </ul>
              </div>
              {siteConfig.logo.isoBadge && (
                <div className="relative h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0" title="ISO Certified">
                  <Image src={siteConfig.logo.isoBadge} alt="ISO Certified" fill sizes="112px" className="object-contain" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1a0220] py-3 border-t border-white/10">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-1 mb-2">
            <p className="text-[11px] text-white/50 tracking-wider">&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
            {siteConfig.copyrightTagline && (
              <p className="text-[11px] text-white/35 tracking-wider">{siteConfig.copyrightTagline}</p>
            )}
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-[#D89E2E]/40 to-transparent w-full" />
        </div>
      </div>
    </footer>
  );
}

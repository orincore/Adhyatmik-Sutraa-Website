/**
 * Seeds the "Maa Kali Healing" workshop landing page (LandingPage collection,
 * fixed-template renderer — see src/lib/template-types.ts / landing-template.tsx).
 *
 * Content source: AIDA copy supplied by the client for the Kali Sadhana
 * workshop. Theme colors pulled from the live Adhyatmik Sutraa palette
 * (brand-config/site.config.adhyatmiksutraa.ts). Founder bio/photo reused
 * from the real site config — not fabricated.
 *
 * Run from the project root:  node scripts/create-maa-kali-healing-landing.js
 * Idempotent: upserts by slug ("maa-kali-healing"), safe to re-run.
 */
require("dotenv/config");
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

const LandingPageSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    content: mongoose.Schema.Types.Mixed,
    theme: mongoose.Schema.Types.Mixed,
    seo_title: String,
    seo_description: String,
    status: { type: String, default: "draft" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const LandingPage =
  mongoose.models.LandingPage ||
  mongoose.model("LandingPage", LandingPageSchema);

// Adhyatmik Sutraa brand palette (brand-config/site.config.adhyatmiksutraa.ts)
const COLORS = {
  primary: "#7B3F7A", // peacock purple
  secondary: "#35093C", // deep plum
  accent: "#FD4380", // cta pink/magenta
  heroBg: "#240429", // brand "dark" — fierce, dramatic backdrop for Kali imagery
  darkBg: "#35093C",
  bodyBg: "#FFFFFF",
};

const templateData = {
  sectionOrder: [
    "hero",
    "marquee",
    "why",
    "about",
    "program",
    "stats",
    "invitation",
    "faq",
    "footer",
  ],
  mediaSettings: {},
  colors: COLORS,
  hero: {
    badge: "Kali Sadhana Workshop",
    headline: "Awaken Divine Protection & Release",
    highlightedWord: "Negative Energy",
    subheadline:
      "Do you often feel emotionally drained, surrounded by negativity, or as if unseen energies are affecting your peace, confidence, and progress? It's time to reconnect with the fierce, compassionate energy of Maa Kali.",
    bulletPoints: [
      "Break free from fear, uncertainty & negative energy",
      "Develop courage & inner power",
      "Feel protected & guarded by Maa Kali's divine shakti",
    ],
    ctaButtonText: "Reserve Your Place Now",
    ctaButtonLink: "#register",
    ctaButtonAction: "invitation",
    heroImage:
      "https://images.unsplash.com/photo-1604881991720-f91add269bed?w=700&h=850&fit=crop",
    heroMedia: [],
    carouselAutoplay: false,
    carouselInterval: 6000,
    floatingStats: [
      { label: "Format", value: "Live Sadhana" },
      { label: "Focus", value: "Protection" },
    ],
    visible: true,
  },
  marquee: {
    items: [
      "Divine Protection",
      "Release Negative Energy",
      "Maa Kali Shakti",
      "Inner Courage",
      "Energy Cleansing",
      "Spiritual Empowerment",
    ],
    enabled: true,
  },
  why: {
    title: "You Don't Have to Face This Alone",
    subtitle:
      "It's time to reconnect with the fierce, compassionate energy of Maa Kali.",
    points: [
      {
        title: "Feeling Drained & Unprotected?",
        description:
          "If you often feel emotionally drained, surrounded by negativity, or as if unseen energies are affecting your peace, confidence, and progress — you are not alone.",
        image: "",
      },
      {
        title: "Ready to Break Free",
        description:
          "Are you willing to break free from fear, uncertainty, and negative energy? This Kali Sadhana meets you exactly there.",
        image: "",
      },
      {
        title: "Fierce, Compassionate Protection",
        description:
          "Reconnect with the fierce, compassionate energy of Maa Kali to develop courage, inner power, and feel protected and guarded.",
        image: "",
      },
    ],
    visible: true,
  },
  about: {
    name: "Sonali Bhattacharya",
    title: "Meet Your Guide",
    description:
      "Adhyatmik Sutraa is helping its clients on a transformational journey of mind, body, and soul. When you connect with Adhyatmik Sutraa, you will receive spiritual, emotional, and energy healing by renowned life coach and healer Sonali Bhattacharya.\n\nSonali started her journey as a Reiki healer, and then continued on to become a numerologist, tarot reader, and healer. Being a trainer, she has been in the occult field for the last 10 years and helped people with holistic healing — including sacred sadhanas for Maa Kamakhya Devi, Maa Baglamukhi, and Maa Kali.",
    image: "/assets/founder-sonali.jpeg",
    credentials: [
      "Reiki Healer",
      "Numerologist",
      "Tarot Reader",
      "Angel Healer",
      "Life Coach",
    ],
    visible: true,
  },
  logos: { title: "Featured In", logos: [], enabled: false },
  gallery: { title: "Gallery", subtitle: "", images: [], visible: false },
  stats: {
    title: "How This Will Help You",
    subtitle:
      "You'll experience real, felt shifts in your energy and emotional state.",
    stats: [
      { value: "✨", label: "Releasing emotional and energetic negativity" },
      { value: "✨", label: "Strengthening your inner protection and confidence" },
      { value: "✨", label: "Building a powerful spiritual Protection Vault" },
      { value: "✨", label: "Feeling calmer, grounded, and emotionally balanced" },
      { value: "✨", label: "Deepening your connection with Maa Kali's energy" },
    ],
    ctaButtonText: "Reserve Your Seat",
    ctaButtonLink: "#register",
    ctaButtonAction: "invitation",
    backgroundImage: "",
    visible: true,
  },
  testimonials: { title: "What Our Students Say", subtitle: "", items: [], visible: false },
  videoTestimonials: { title: "Hear It From Them", subtitle: "", items: [], visible: false },
  program: {
    title: "What You Will Do In This Workshop",
    subtitle:
      "Guided practices to help you reconnect with the fierce, compassionate energy of Maa Kali.",
    points: [
      {
        title: "Build Your Protection Vault",
        description:
          "Create a protective Vault through mantras and visualisation.",
        icon: "Shield",
      },
      {
        title: "Invoke Divine Shakti",
        description:
          "Invoke the divine shakti of Maa Kali through chanting and sacred symbols.",
        icon: "Flame",
      },
      {
        title: "Shield & Guard Your Energy",
        description:
          "Develop an understanding of how to shield and guard your energy.",
        icon: "Sparkles",
      },
      {
        title: "Release Stuck Patterns",
        description:
          "Release old negative patterns and stuck energy that no longer serve you.",
        icon: "Sun",
      },
    ],
    ctaButtonText: "Join the Session Now",
    ctaButtonLink: "#register",
    ctaButtonAction: "invitation",
    visible: true,
  },
  bonus: { title: "Exclusive Bonuses", items: [], enabled: false },
  contentBlocks: [],
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know before joining",
    items: [
      {
        question: "Is this session free?",
        answer:
          "Yes, this live Maa Kali Healing session is completely free. Just register to secure your spot.",
      },
      {
        question: "Do I need any prior experience?",
        answer:
          "No. This session is beginner-friendly — you just need an open heart and willingness to release what no longer serves you.",
      },
      {
        question: "How will I receive the session link?",
        answer:
          "You'll receive the private live-session link via WhatsApp and email after registering.",
      },
      {
        question: "What should I bring?",
        answer:
          "A quiet space, a notebook, and a diya or candle if you have one — this helps deepen the ritual visualisation.",
      },
    ],
    enabled: true,
  },
  invitation: {
    enabled: true,
    badgeEmoji: "🔥",
    badgeText: "Limited Seats",
    title: "Ready to Begin Your Divine Protection Journey?",
    subtitle:
      "Imagine moving through life feeling protected, fearless, and spiritually empowered — less affected by external negativity and more aligned with your highest self. Let Maa Kali's transformative energy inspire you to stand strong, clear, and confident every day.",
    dateLabel: "Date",
    dateValue: "24 July 2026",
    timeLabel: "Time",
    timeValue: "7:00 PM IST",
    venueLabel: "Venue",
    venueValue: "Live Online (Private Link)",
    availabilityText: "Live • Limited spots available. Reserve yours now.",
    buttonText: "Reserve Your Place Now",
    buttonLink: "#register",
    buttonAction: "invitation",
    formTitle: "Join the Maa Kali Healing Session",
    formHighlights: ["Free Session", "Live Guided Sadhana", "Limited Seats"],
    formButtonText: "Reserve My Seat",
    successTitle: "You're registered!",
    successDescription:
      "We'll send your private session link via email and WhatsApp shortly.",
    supportText:
      "Step into the divine protection of Maa Kali today and awaken the fearless power within.",
    thankYouButtons: [],
  },
  footer: {
    cta: {
      title: "Step Into the Divine Protection of Maa Kali",
      subtitle:
        "Join the Maa Kali Healing Session and begin your journey toward inner strength, energetic cleansing, and spiritual empowerment.",
      ctaButtonText: "Reserve Your Place Now",
      ctaButtonLink: "#register",
      ctaButtonAction: "invitation",
      showCtaButton: true,
    },
    copyright: `© ${new Date().getFullYear()} Adhyatmik Sutraa. All Rights Reserved.`,
    links: [
      { label: "Privacy Policy", url: "/privacy" },
      { label: "Contact", url: "/contact" },
    ],
    enabled: true,
  },
  floatingButton: { enabled: true, section: "invitation" },
};

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const payload = {
    title: "Maa Kali Healing: Awaken Divine Protection & Release Negative Energy",
    slug: "maa-kali-healing",
    content: { templateData },
    theme: {
      primary: COLORS.primary,
      secondary: COLORS.secondary,
      accent: COLORS.accent,
      background: COLORS.bodyBg,
    },
    seo_title: "Maa Kali Healing Session — Awaken Divine Protection | Adhyatmik Sutraa",
    seo_description:
      "Join the Maa Kali Healing Session with Adhyatmik Sutraa. Release negative energy, build a spiritual Protection Vault, and awaken fearless inner power through guided Kali Sadhana.",
    status: "published",
  };

  const existing = await LandingPage.findOne({ slug: "maa-kali-healing" });

  if (existing) {
    await LandingPage.findByIdAndUpdate(existing._id, payload);
    console.log("✅ Updated: /maa-kali-healing");
  } else {
    await LandingPage.create(payload);
    console.log("✅ Created: /maa-kali-healing");
  }

  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

/**
 * Seeds the "Salt Magic Webinar" landing page (LandingPage collection,
 * fixed-template renderer — see src/lib/template-types.ts / landing-template.tsx).
 *
 * Content source: recreated from the live page at
 * https://adhyatmiksutraa.com/salt-magic-webinar/ (fetched 2026-07-20).
 * Note: the live WordPress page has several blocks that are leftover copy
 * from a different "Candle Making Masterclass" funnel (candle imagery,
 * candle bullet points, a testimonial that literally names the candle
 * course, and a couple of CTA buttons pointing at the candle checkout link).
 * Those were intentionally left out here — every CTA below points at the
 * real Salt Magic checkout (https://rzp.io/rzp/salt-magic-masterclass).
 *
 * Theme colors match the live Elementor global kit for this page
 * (--e-global-color-primary/accent/secondary), same purple/pink/plum palette
 * already used by maa-kali-healing.
 *
 * Run from the project root:  node scripts/create-salt-magic-webinar-landing.js
 * Idempotent: upserts by slug ("salt-magic-webinar"), safe to re-run.
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

// Live Elementor global kit colors for this page (post-8.css):
// --e-global-color-primary #7B3F7A / --e-global-color-accent #FD4380 /
// --e-global-color-secondary #35093C
const COLORS = {
  primary: "#7B3F7A",
  secondary: "#35093C",
  accent: "#FD4380",
  heroBg: "#FBF3F8",
  darkBg: "#35093C",
  bodyBg: "#FFFFFF",
};

const REGISTER_URL = "https://rzp.io/rzp/salt-magic-masterclass";

// Images mirrored from the WordPress source to this project's own R2 bucket
// (media.adhyatmiksutraa.com) via scripts/mirror-salt-magic-images.js, so
// this page doesn't depend on the old WordPress install staying online.
const IMG = {
  heroThumb: "https://media.adhyatmiksutraa.com/landing/salt-magic-webinar/bd00c92d-f81b-4758-893b-d06507e068fa.jpeg",
  craftIntention: "https://media.adhyatmiksutraa.com/landing/salt-magic-webinar/9e99b7bf-dade-45dd-b595-94b1faf91657.jpeg",
  impactfulSalts: "https://media.adhyatmiksutraa.com/landing/salt-magic-webinar/ff695a38-7b8d-45ca-85b2-2fb1c37d4e9f.png",
  bonusMoneyHacks: "https://media.adhyatmiksutraa.com/landing/salt-magic-webinar/7b66bc45-12dc-4df2-abdf-a74e1c92073a.png",
  bonusSubconscious: "https://media.adhyatmiksutraa.com/landing/salt-magic-webinar/91ee9e86-1a40-438e-95be-29c53ca43318.png",
  bonusCrystals: "https://media.adhyatmiksutraa.com/landing/salt-magic-webinar/160e10cd-3d54-43c6-bb80-48eccd030acf.png",
  coachAparna: "https://media.adhyatmiksutraa.com/landing/salt-magic-webinar/7f1d3d63-e877-42b2-8f65-42bc1fadd934.jpeg",
};

const templateData = {
  sectionOrder: [
    "hero",
    "marquee",
    "program",
    "contentBlocks",
    "bonus",
    "about",
    "invitation",
    "videoTestimonials",
    "why",
    "logos",
    "gallery",
    "stats",
    "testimonials",
    "faq",
    "footer",
  ],
  mediaSettings: {
    "hero.heroImage": { autoplay: true, mute: true },
  },
  colors: COLORS,
  hero: {
    badge: "Live Webinar with Dr. Aparna Singh",
    headline: "Learn How to Run and Start a Profitable Ritual, Healing and Intention",
    highlightedWord: "Salts Business",
    subheadline:
      "Ignite your interest for spiritual and wellness products into a structured, goal-oriented and profitable business from home — with zero experience required.",
    bulletPoints: [],
    ctaButtonText: "Register Now For Live Webinar!",
    ctaButtonLink: REGISTER_URL,
    ctaButtonAction: "url",
    heroImage: IMG.heroThumb,
    heroMedia: [{ url: "https://youtu.be/CE77pav0S0o", label: "Salt Magic Webinar" }],
    carouselAutoplay: false,
    carouselInterval: 6000,
    floatingStats: [
      { label: "Date", value: "26 Jul 2026" },
      { label: "Mode", value: "Live on Zoom" },
    ],
    visible: true,
  },
  marquee: {
    items: [
      "Salt Magic Webinar",
      "Ritual & Healing Salts",
      "Start From Home",
      "Zero Experience Needed",
      "Live with Dr. Aparna Singh",
    ],
    enabled: true,
  },
  why: { title: "Why This Works", subtitle: "", points: [], visible: false },
  about: {
    name: "Dr. Aparna R. Singh",
    title: "Meet Your Coach",
    description:
      "Dr. Aparna R. Singh is a seasoned Reiki Grandmaster, Naturopathy & Consultant, and a trusted name in holistic wellness. With over a decade of experience in energy healing, alternative therapies, and lifestyle transformation, she has empowered thousands across India through her practical and spiritual approach. In this special webinar, she will share her unique insights on how salt can be used as a powerful tool for healing and manifestation.",
    image: IMG.coachAparna,
    credentials: [
      "Reiki Grandmaster",
      "Naturopathy & Wellness Consultant",
      "10+ Years in Energy Healing",
      "Empowered Thousands Across India",
    ],
    visible: true,
  },
  logos: { title: "Featured In", logos: [], enabled: false },
  gallery: { title: "Gallery", subtitle: "", images: [], visible: false },
  stats: {
    title: "",
    subtitle: "",
    stats: [],
    ctaButtonText: "Register Now For Webinar!",
    ctaButtonLink: REGISTER_URL,
    ctaButtonAction: "url",
    backgroundImage: "",
    visible: false,
  },
  testimonials: { title: "What Our Students Say", subtitle: "", items: [], visible: false },
  videoTestimonials: {
    title: "What Our Students Say",
    subtitle: "Real stories from real students",
    items: [
      { url: "https://youtu.be/pCb7n4miS9w?si=XNnKFEMQV8Q17ybK", name: "", role: "" },
      { url: "https://youtube.com/shorts/rt8n8LuzHIc", name: "", role: "" },
      { url: "https://youtube.com/shorts/PJOUbxrIMB0?feature=share", name: "", role: "" },
      { url: "https://www.youtube.com/watch?v=Awjzjl-dpYc", name: "", role: "" },
    ],
    visible: true,
  },
  program: {
    title: "What You'll Learn in this Masterclass?",
    subtitle: "",
    points: [
      {
        title: "Launch a Profitable Salt Business in Just 5 Days",
        description: "By blending in essential oils and herbs",
        icon: "FlaskConical",
      },
      {
        title: "A Low-Investment, High-Demand Business Model",
        description: "Develop a business model with low investment and a high demand market niche",
        icon: "Target",
      },
      {
        title: "Make Salts That Are Powerful & Saleable",
        description: "Create salts which are powerful, effective, work magically and are saleable",
        icon: "Sparkles",
      },
    ],
    ctaButtonText: "Register Now For Live Webinar!",
    ctaButtonLink: REGISTER_URL,
    ctaButtonAction: "url",
    visible: true,
  },
  bonus: {
    title: "Free Bonus for Live Attendees",
    items: [
      {
        title: "50 Money Hacks for Generational Wealth & Second Income",
        description: "A practical eBook on building extra income streams.",
        image: IMG.bonusMoneyHacks,
      },
      {
        title: "Power of Subconscious Mind eBook",
        description: "Rewire limiting beliefs and unlock your manifestation potential.",
        image: IMG.bonusSubconscious,
      },
      {
        title: "Crystals E-Guide PDF",
        description: "A quick-reference guide to healing crystals and their uses.",
        image: IMG.bonusCrystals,
      },
    ],
    enabled: true,
  },
  contentBlocks: [
    {
      enabled: true,
      layout: "media-left",
      mediaType: "image",
      mediaUrl: IMG.craftIntention,
      textFormat: "bullets",
      heading: "Craft a Life of Intention and Income with Salts",
      content:
        "Essence and role of different spiritual / wellness salts — Epsom, Himalayan, Celtic, Rock, Dead Sea etc.\nHow to infuse perfect blends of salts with herbs and essential oils to cleanse, protect, heal and manifest.\nHow to empower your salts with the process of charging to make them powerful and effective.",
    },
    {
      enabled: true,
      layout: "media-right",
      mediaType: "image",
      mediaUrl: IMG.impactfulSalts,
      textFormat: "bullets",
      heading: "Create Salts Which Are Impactful, Soulful and Sell Like Crazy",
      content:
        "Learn amazing cleansing salt recipes used for cleansing aura and energy, in rituals and bathing.",
    },
  ],
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "",
    items: [
      {
        question: "Who is this course for?",
        answer: "This course is designed for everyone. Prior experience is not required.",
      },
      {
        question: "Can I start my own salt business after taking this course?",
        answer:
          "Yes, absolutely! This course equips you with the knowledge and skills to create and run a successful salt business.",
      },
      {
        question: "Will I receive recordings after completing the webinar?",
        answer:
          "No, recordings or resources will not be provided after the webinar. We encourage you to attend live to get the full experience and benefits of real-time learning.",
      },
      {
        question: "Is there any PDF of the course available?",
        answer: "No, there is no PDF available.",
      },
    ],
    enabled: true,
  },
  invitation: {
    enabled: true,
    badgeEmoji: "🔥",
    badgeText: "Filling Fast",
    title: "Live Salt Magic Webinar",
    subtitle: "Reserve your spot for the live session with Dr. Aparna Singh.",
    dateLabel: "Date",
    dateValue: "26th July 2026",
    timeLabel: "Time",
    timeValue: "7:00 PM – 9:00 PM",
    venueLabel: "Mode",
    venueValue: "Live on Zoom",
    availabilityText: "Coach: Dr. Aparna Singh • Seats are filling fast!",
    buttonText: "Register Now For Live Webinar!",
    buttonLink: REGISTER_URL,
    buttonAction: "url",
    formTitle: "Register for the Salt Magic Webinar",
    formHighlights: ["Live", "Limited Seats", "Free Bonus eBooks"],
    formButtonText: "Reserve My Seat",
    successTitle: "You're registered!",
    successDescription: "We'll send your private session link via email and WhatsApp shortly.",
    supportText: "Seats are filling fast! Reserve your spot now.",
    thankYouButtons: [],
  },
  footer: {
    cta: {
      title: "Don't Miss Out! Limited Time Offer",
      subtitle:
        "Create salts which are impactful, soulful and sell like crazy. Seats are filling fast — reserve your spot now!",
      ctaButtonText: "Register Now For Webinar!",
      ctaButtonLink: REGISTER_URL,
      ctaButtonAction: "url",
      showCtaButton: true,
    },
    copyright: `© ${new Date().getFullYear()} Adhyatmik Sutraa. All Rights Reserved.`,
    links: [
      { label: "Privacy Policy", url: "/privacy-policy" },
      { label: "Terms of Service", url: "/terms" },
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
    title: "Salt Magic Webinar — Adhyatmik Sutraa",
    slug: "salt-magic-webinar",
    content: { templateData },
    theme: {
      primary: COLORS.primary,
      secondary: COLORS.secondary,
      accent: COLORS.accent,
      background: COLORS.bodyBg,
    },
    seo_title: "Salt Magic Webinar - Adhyatmik Sutraa",
    seo_description:
      "Join the live Salt Magic Webinar with Dr. Aparna Singh and learn how to start a profitable ritual, healing and intention salts business from home with zero experience.",
    status: "published",
  };

  const existing = await LandingPage.findOne({ slug: "salt-magic-webinar" });

  if (existing) {
    await LandingPage.findByIdAndUpdate(existing._id, payload);
    console.log("✅ Updated: /salt-magic-webinar");
  } else {
    await LandingPage.create(payload);
    console.log("✅ Created: /salt-magic-webinar");
  }

  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

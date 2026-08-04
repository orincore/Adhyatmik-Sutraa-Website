/**
 * Seeds the "Salt Magic Webinar" landing page (LandingPage collection,
 * fixed-template renderer — see src/lib/template-types.ts / landing-template.tsx).
 *
 * Content source: the live page at https://adhyatmiksutraa.com/salt-magic-webinar/
 * (re-scraped 2026-08-04). Every block on that page is represented here.
 *
 * One deliberate deviation: the live page still carries a block titled
 * "Discover the Power of Candle Healing" — leftover copy from the separate
 * Candle Making funnel (its CTA even points at rzp.io/rzp/candle-business-webinar),
 * and the "Who Should Attend" list talks about candles too. Every factual claim
 * in those blocks is kept here (45%+ margins, huge demand in India and abroad,
 * one of the most profitable businesses, the four audience types) but re-pointed
 * at salts, and every CTA points at the real Salt Magic checkout.
 * The three written testimonials ARE reproduced verbatim, candle wording and
 * all, because they are attributed quotes — see TESTIMONIALS below if you'd
 * rather swap them for salt-course ones.
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

// Kept only as the link target behind the CTAs; the buttons themselves now
// open the on-site invitation form, which charges through our own Razorpay
// integration (/api/invitations/create-payment) rather than this hosted page.
const REGISTER_URL = "https://rzp.io/rzp/salt-magic-masterclass";

// Seat price, in whole rupees. This is the value the server re-reads at payment
// time, so changing it here (or in the admin editor) changes what is charged.
const SEAT_PRICE = 49;

// Warm mineral paper — a tint of heroBg, used as a section background.
const PAPER = "#F8F1F6";

// Webinar slot as stated on the live page. WEBINAR_START_ISO drives the
// announcement-bar countdown; keep it in sync with DATE_TEXT / TIME_TEXT.
const DATE_TEXT = "7th August 2026";
const TIME_TEXT = "7:00 PM to 9:00 PM";
const WEBINAR_START_ISO = "2026-08-07T19:00:00+05:30";

// Images mirrored from the WordPress source to this project's own R2 bucket
// (media.adhyatmiksutraa.com) via scripts/mirror-salt-magic-images.js, so
// this page doesn't depend on the old WordPress install staying online.
const IMG = {
  // NOTE: heroThumb (the WP page's own hero graphic) is a *candle* photo, left
  // over from the candle funnel — it is deliberately not used anywhere on this
  // salt page. webinarPoster is the poster frame of the page's own webinar
  // video and is the salt-subject stand-in.
  heroThumb: "https://media.adhyatmiksutraa.com/landing/salt-magic-webinar/bd00c92d-f81b-4758-893b-d06507e068fa.jpeg",
  // Cropped to true 16:9. YouTube only serves 4:3 sizes for this video and
  // bakes letterbox bars into them, which show through any image box that
  // is not also 4:3.
  webinarPoster: "https://media.adhyatmiksutraa.com/landing/salt-magic-webinar/7c9222b4-9c4f-415d-b9ed-b9ff989173d8.jpg",
  craftIntention: "https://media.adhyatmiksutraa.com/landing/salt-magic-webinar/9e99b7bf-dade-45dd-b595-94b1faf91657.jpeg",
  impactfulSalts: "https://media.adhyatmiksutraa.com/landing/salt-magic-webinar/ff695a38-7b8d-45ca-85b2-2fb1c37d4e9f.png",
  bonusMoneyHacks: "https://media.adhyatmiksutraa.com/landing/salt-magic-webinar/7b66bc45-12dc-4df2-abdf-a74e1c92073a.png",
  bonusSubconscious: "https://media.adhyatmiksutraa.com/landing/salt-magic-webinar/91ee9e86-1a40-438e-95be-29c53ca43318.png",
  bonusCrystals: "https://media.adhyatmiksutraa.com/landing/salt-magic-webinar/160e10cd-3d54-43c6-bb80-48eccd030acf.png",
  coachAparna: "https://media.adhyatmiksutraa.com/landing/salt-magic-webinar/7f1d3d63-e877-42b2-8f65-42bc1fadd934.jpeg",
  testiBhanu: "https://media.adhyatmiksutraa.com/landing/salt-magic-webinar/574659df-c2ec-40db-9a95-468b0866c22f.png",
  testiPriya: "https://media.adhyatmiksutraa.com/landing/salt-magic-webinar/c97ed777-ac2d-4fa2-b89c-c2d9edde7104.jpg",
  testiManish: "https://media.adhyatmiksutraa.com/landing/salt-magic-webinar/52abedea-b284-4291-84e7-cc6d03da02cb.png",
};

const templateData = {
  sectionOrder: [
    "announcementBar",
    "hero",
    "marquee",
    "eventDetails",
    "why",
    "contentBlocks",
    "program",
    "problems",
    "stats",
    "bonus",
    "about",
    "invitation",
    "videoTestimonials",
    "testimonials",
    "faq",
    "footer",
  ],
  // Autoplay off, sound on. The template default is autoplay+muted, which on a
  // funnel page means the hero video starts itself silently and loops (loop is
  // tied to autoplay in YouTubeEmbed). With autoplay off, mute:false simply
  // means it plays with sound when someone actually taps it.
  // NOTE: the key that matters for the hero is "hero.heroMedia.0.url" — the
  // carousel slide. "hero.heroImage" is only the fallback still.
  mediaSettings: {
    "hero.heroImage": { autoplay: false, mute: false },
    "hero.heroMedia.0.url": { autoplay: false, mute: false },
    "videoTestimonials.items.0.url": { autoplay: false, mute: false },
    "videoTestimonials.items.1.url": { autoplay: false, mute: false },
    "videoTestimonials.items.2.url": { autoplay: false, mute: false },
    "videoTestimonials.items.3.url": { autoplay: false, mute: false },
  },
  colors: COLORS,

  // Warm mineral paper, used only on the four surfaces where the reader is
  // being asked to commit (the details, the syllabus, the booking panel, the
  // objection handling). Everything else stays on plain white, so the tint
  // signals "this is the offer" rather than decorating alternate stripes.
  sectionBg: {
    eventDetails: PAPER,
    program: PAPER,
    invitation: PAPER,
    faq: PAPER,
  },

  announcementBar: {
    text: "Seats are filling fast! Reserve your spot now!!",
    ctaText: "Register Now",
    ctaLink: REGISTER_URL,
    ctaAction: "invitation",
    countdownTo: WEBINAR_START_ISO,
    countdownLabel: "Webinar starts in",
    sticky: true,
    visible: true,
  },

  hero: {
    badge: "Live Salt Magic Webinar with Dr. Aparna Singh",
    headline: "Learn How to Run and Start a Profitable Ritual, Healing and Intention",
    highlightedWord: "Salts Business",
    subheadline:
      "Ignite your interest for spiritual and wellness products into a structured, goal-oriented and profitable business from home, with zero experience required.",
    bulletPoints: [
      "Start from home with zero experience",
      "Launch in as little as 5 days",
      "Free bonus eBooks for live attendees",
    ],
    ctaButtonText: "Register Now",
    ctaButtonLink: REGISTER_URL,
    ctaButtonAction: "invitation",
    heroImage: IMG.webinarPoster,
    heroMedia: [{ url: "https://youtu.be/CE77pav0S0o", label: "Salt Magic Webinar" }],
    carouselAutoplay: false,
    carouselInterval: 6000,
    floatingStats: [
      { label: "Date", value: "7 Aug 2026" },
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

  eventDetails: {
    title: "Everything You Need to Know",
    subtitle: "One live session with Dr. Aparna Singh. Attend live to get the full experience.",
    pills: ["Live on Zoom", "Beginner Friendly", "Zero Experience Needed", "Free Bonus eBooks"],
    // Four tiles, not five: Time absorbs Duration, so the grid stays a clean
    // 2x2 on a phone instead of leaving one tile orphaned on a third row.
    items: [
      { icon: "CalendarDays", label: "Date", value: DATE_TEXT },
      { icon: "Clock3", label: "Time", value: "7 to 9 PM, 2 hrs" },
      { icon: "Video", label: "Mode", value: "Live on Zoom" },
      { icon: "Users", label: "Coach", value: "Dr. Aparna Singh" },
    ],
    priceLabel: "",
    price: "",
    originalPrice: "",
    savingsNote: "",
    seatsNote: "Seats are filling fast! Reserve your spot now!!",
    seatsFilledPercent: 0,
    ctaButtonText: "Register Now",
    ctaButtonLink: REGISTER_URL,
    ctaButtonAction: "invitation",
    visible: true,
  },

  // Live page block "Discover the Power of Candle Healing" — the claims are
  // kept, the subject is corrected to salts (see the file header).
  why: {
    title: "Discover the Power of Salt Healing",
    subtitle: "Launch the ritual salt brand everyone's talking about.",
    points: [
      {
        title: "Salts that actually work",
        description:
          "Learn how to create powerful salts that attract abundance, heal energy, and remove negativity.",
        image: IMG.craftIntention,
      },
      {
        title: "A business you run from home",
        description:
          "Discover how to start your own salt-making business from home and earn easily. No shop, no staff, no heavy setup.",
        image: IMG.impactfulSalts,
      },
      {
        title: "One of the most profitable niches",
        description:
          "Profit margins are 45%+ higher than average, and demand is huge in India and abroad.",
        image: "",
      },
    ],
    layoutVariant: "cards", // 3 points -> renders as the 1+2 bento
    visible: true,
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
        "Essence and role of different spiritual / wellness salts: Epsom, Himalayan, Celtic, Rock, Dead Sea etc.\nHow to infuse perfect blends of salts with herbs and essential oils to cleanse, protect, heal and manifest.\nHow to empower your salts with the process of charging to make them powerful and effective.",
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

  program: {
    title: "What You'll Learn in this Masterclass?",
    subtitle: "",
    points: [
      {
        title: "Launch a Profitable Salt Business in Just 5 Days",
        description: "By blending in essential oils and herbs.",
        icon: "FlaskConical",
      },
      {
        title: "A Low-Investment, High-Demand Business Model",
        description: "Develop a business module with low investment and a high demand market niche.",
        icon: "Target",
      },
      {
        title: "Make Salts That Are Powerful & Saleable",
        description: "Create salts which are powerful, effective, work magically and are saleable.",
        icon: "Sparkles",
      },
      {
        title: "Create an Extra Source of Income",
        description: "Establish yourself with zero experience.",
        icon: "Wallet",
      },
    ],
    ctaButtonText: "Register Now",
    ctaButtonLink: REGISTER_URL,
    ctaButtonAction: "invitation",
    visible: true,
  },

  // The live page's "Who Should Attend" list, rendered through the icon-grid
  // section (its copy also said "candles"; corrected to salts/rituals).
  problems: {
    title: "Who Should Attend",
    subtitle: "If any of these sound like you, this session was built for you.",
    items: [
      {
        icon: "Sparkles",
        title: "Spell casters, healers & spiritual coaches",
        description: "Who want to expand their offerings with ritual, healing and intention salts.",
      },
      {
        icon: "Leaf",
        title: "Beginners curious about energy rituals",
        description: "New to energy work and curious about salts, cleansing and ritual practice.",
      },
      {
        icon: "Rocket",
        title: "Anyone starting a small spiritual business from home",
        description: "Looking for a low-investment way to turn a spiritual practice into income.",
      },
      {
        icon: "Heart",
        title: "Or simply salt lovers who want to heal & manifest",
        description: "Who want to heal, protect and manifest through the energy of salt.",
      },
    ],
    impactTitle: "",
    impacts: [],
    visible: true,
  },

  stats: {
    title: "Why Now Is the Right Time",
    subtitle: "A low-investment, high-demand niche you can start from your own kitchen table.",
    stats: [
      { value: "45%+", label: "Higher profit margins than average", icon: "TrendingUp" },
      { value: "5 Days", label: "To launch your own salt business", icon: "Rocket" },
      { value: "2 Hours", label: "Live, hands-on session", icon: "Clock3" },
      { value: "Zero", label: "Prior experience needed", icon: "BadgeCheck" },
    ],
    ctaButtonText: "Register Now",
    ctaButtonLink: REGISTER_URL,
    ctaButtonAction: "invitation",
    backgroundImage: "",
    cardStyle: "lightOnDark",
    visible: true,
  },

  bonus: {
    title: "Free Bonus for Live Attendees!",
    subtitle: "Get these eBooks free when you join the live webinar.",
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

  invitation: {
    enabled: true,
    pricingMode: "paid",
    amount: SEAT_PRICE,
    originalAmount: 0,
    payButtonText: `Pay ₹${SEAT_PRICE} & Reserve My Seat`,
    badgeEmoji: "🔥",
    badgeText: "Filling Fast",
    title: "Live Salt Magic Webinar",
    subtitle: "Reserve your spot for the live session with Dr. Aparna Singh.",
    dateLabel: "Date",
    dateValue: DATE_TEXT,
    timeLabel: "Time",
    timeValue: TIME_TEXT,
    venueLabel: "Mode",
    venueValue: "Live on Zoom",
    availabilityText: "Coach: Dr. Aparna Singh • Seats are filling fast!",
    buttonText: "Register Now",
    buttonLink: REGISTER_URL,
    buttonAction: "invitation",
    formTitle: "Register for the Salt Magic Webinar",
    formHighlights: ["Live on Zoom", "Limited Seats", "Free Bonus eBooks"],
    formButtonText: "Reserve My Seat",
    successTitle: "You're registered!",
    successDescription: "We'll send your private session link via email and WhatsApp shortly.",
    supportText: "Seats are filling fast! Reserve your spot now.",
    thankYouButtons: [],
  },

  videoTestimonials: {
    title: "Hear It From Our Students",
    subtitle: "",
    items: [
      { url: "https://youtu.be/pCb7n4miS9w?si=XNnKFEMQV8Q17ybK", name: "", role: "" },
      { url: "https://youtube.com/shorts/rt8n8LuzHIc", name: "", role: "" },
      { url: "https://youtube.com/shorts/PJOUbxrIMB0?feature=share", name: "", role: "" },
      { url: "https://www.youtube.com/watch?v=Awjzjl-dpYc", name: "", role: "" },
    ],
    visible: true,
  },

  // Reproduced verbatim from the live page's testimonial carousel — including
  // the two that name the Candle Making Masterclass, since altering someone's
  // attributed quote is worse than the mismatch. Swap them here if the client
  // has salt-course testimonials to use instead.
  testimonials: {
    title: "What Our Clients Say",
    subtitle: "",
    items: [
      {
        name: "Bhanu Arora",
        quote:
          "I'm now making and selling candles from home at my own ease after learning this course",
        image: IMG.testiBhanu,
        role: "",
      },
      {
        name: "Priya Sharma",
        quote:
          "Candle Making Masterclass is amazing as Dr Aparna shared everything, it's engaging, informative and interesting.",
        image: IMG.testiPriya,
        role: "",
      },
      {
        name: "Manish Joshi",
        quote:
          "Must Must Do.. If you want to earn then learn this ... her support and guidance is simply amazing",
        image: IMG.testiManish,
        role: "",
      },
    ],
    displayMode: "grid",
    visible: true,
  },

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

  footer: {
    cta: {
      title: "Don't Miss Out! Limited Time Offer",
      subtitle:
        "Create salts which are impactful, soulful and sell like crazy. Seats are filling fast! Reserve your spot now!!",
      ctaButtonText: "Register Now",
      ctaButtonLink: REGISTER_URL,
      ctaButtonAction: "invitation",
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

  // Docked bottom bar, mobile only: live countdown on the left, register
  // button on the right. No price/note — the page quotes no price, and the
  // strip has to stay readable next to the countdown at 360px.
  floatingButton: {
    enabled: true,
    section: "invitation",
    variant: "bar",
    // Price deliberately not repeated here: stacked under the countdown
    // chips it cramped the strip and made it outgrow its spacer. The
    // form states the amount clearly enough.
    priceText: "",
    strikePriceText: "",
    noteText: "",
    countdownTo: WEBINAR_START_ISO,
    countdownLabel: "Starts in",
    ctaTextOverride: "Register Now",
    showOnDesktop: false,
  },

  // Sections with no source content on the live page — kept explicitly hidden
  // so the renderer never falls back to the placeholder defaults.
  logos: { title: "Featured In", logos: [], enabled: false },
  gallery: { title: "Gallery", subtitle: "", images: [], visible: false },
  guidesRail: { title: "", subtitle: "", items: [], visible: false },
  formats: { title: "", subtitle: "", slides: [], visible: false },
  appBanner: { image: "", link: "", alt: "", visible: false },
  curriculum: { title: "", subtitle: "", modules: [], visible: false },
  pricing: { title: "", subtitle: "", tiers: [], visible: false },
  comparison: { title: "", subtitle: "", columns: [], rows: [], visible: false },
  guarantee: { title: "", subtitle: "", items: [], visible: false },
  liveProof: { items: [], visible: false },
};

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const payload = {
    title: "Salt Magic Webinar | Adhyatmik Sutraa",
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

/**
 * Seeds "Abundance Reset Masterclass" — a full-template showcase landing page
 * that turns on EVERY section the fixed template supports (all 27 canonical
 * sections plus two free-floating rich blocks), each filled with placeholder
 * copy and stock imagery.
 *
 * Purpose: a reference page for the redesigned template. All copy, prices,
 * names, testimonials and stats below are INVENTED PLACEHOLDERS meant to be
 * swapped for real content — nothing here describes a real event or person.
 *
 * Run from the project root:  node scripts/create-showcase-landing.js
 * Idempotent: upserts by slug ("showcase-all-sections"), safe to re-run.
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
  mongoose.models.LandingPage || mongoose.model("LandingPage", LandingPageSchema);

// Adhyatmik Sutraa brand palette (brand-config/site.config.adhyatmiksutraa.ts)
const COLORS = {
  primary: "#7B3F7A",   // peacock purple
  secondary: "#35093C", // deep plum
  accent: "#FD4380",    // cta pink/magenta
  heroBg: "#240429",
  darkBg: "#240429",
  bodyBg: "#FFFFFF",
};

// Countdown/date placeholders are computed relative to run time so the demo
// page never shows an expired timer.
const soon = new Date(Date.now() + 6 * 24 * 60 * 60 * 1000);
const COUNTDOWN_TO = soon.toISOString();
const EVENT_DATE = soon.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" });

const img = (id, w = 800, h = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop`;

const RICH_BLOCK_A = "showcase-rich-a";
const RICH_BLOCK_B = "showcase-rich-b";

const richDoc = (doc) => ({
  doc,
  settings: { maxWidth: 1280, paddingX: 16, paddingY: 48, backgroundColor: "#FFFFFF" },
});

const templateData = {
  sectionOrder: [
    "announcementBar",
    "hero",
    "marquee",
    "eventDetails",
    "problems",
    "why",
    "about",
    "guidesRail",
    "logos",
    "gallery",
    `richContent:${RICH_BLOCK_A}`,
    "stats",
    "curriculum",
    "formats",
    "testimonials",
    "videoTestimonials",
    "program",
    `richContent:${RICH_BLOCK_B}`,
    "pricing",
    "comparison",
    "guarantee",
    "contentBlocks",
    "appBanner",
    "invitation",
    "bonus",
    "faq",
    "liveProof",
    "footer",
  ],
  mediaSettings: {},
  colors: COLORS,
  fontFamily: "",

  // ---- Urgency strip -------------------------------------------------------
  announcementBar: {
    text: "Early-bird pricing closes soon — only 40 seats at this rate",
    ctaText: "Reserve",
    ctaLink: "#register",
    ctaAction: "invitation",
    countdownTo: COUNTDOWN_TO,
    countdownLabel: "Ends in",
    sticky: true,
    visible: true,
  },

  // ---- Hero ----------------------------------------------------------------
  hero: {
    badge: "Live Masterclass · Placeholder",
    headline: "Stop Forcing It. Start",
    highlightedWord: "Aligning.",
    subheadline:
      "A 90-minute live session on clearing the inner patterns that quietly cap your income, your energy and your relationships. Sample copy — replace with the real offer.",
    bulletPoints: [
      "You do everything right and still feel stuck at the same ceiling",
      "You have read the books but nothing has actually shifted",
      "You want a practice you can keep up after the session ends",
    ],
    ctaButtonText: "Reserve My Free Seat",
    ctaButtonLink: "#register",
    ctaButtonAction: "invitation",
    heroImage: img("1544367567-0f2fcb009e0b", 900, 1100),
    heroMedia: [
      { url: img("1544367567-0f2fcb009e0b", 900, 1100), label: "Practice" },
      { url: img("1506126613408-eca07ce68773", 900, 1100), label: "Stillness" },
      { url: img("1512438248247-f0f2a5a8b7f0", 900, 1100), label: "Community" },
    ],
    carouselAutoplay: true,
    carouselInterval: 6000,
    floatingStats: [
      { label: "Attendees", value: "12K+" },
      { label: "Avg. rating", value: "4.9/5" },
    ],
    layout: "boxed",
    scrollIndicatorText: "Scroll to see what's inside",
    scrollIndicatorTarget: "#eventDetails",
    visible: true,
  },

  marquee: {
    items: [
      "Clarity Over Hustle",
      "Practice, Not Theory",
      "Live & Interactive",
      "Recording Included",
      "Beginner Friendly",
    ],
    enabled: true,
  },

  // ---- Event details card --------------------------------------------------
  eventDetails: {
    title: "Everything You Need to Know",
    subtitle: "One live session. No prior experience needed. Nothing else to buy.",
    pills: ["Beginner Friendly", "Live on Zoom", "Recording Available", "Q&A Included"],
    items: [
      { icon: "CalendarDays", label: "Date", value: EVENT_DATE },
      { icon: "Clock3", label: "Time", value: "7:30 PM IST" },
      { icon: "Hourglass", label: "Duration", value: "90 minutes" },
      { icon: "Languages", label: "Language", value: "Hindi + English" },
    ],
    priceLabel: "Your seat today",
    price: "₹99",
    originalPrice: "₹2,499",
    savingsNote: "Save 96% — early bird",
    seatsNote: "Only 40 of 500 seats left at this price",
    seatsFilledPercent: 92,
    ctaButtonText: "Reserve My Seat",
    ctaButtonLink: "#register",
    ctaButtonAction: "invitation",
    visible: true,
  },

  // ---- Pain points ---------------------------------------------------------
  problems: {
    title: "Does This Sound Familiar?",
    subtitle: "If you recognise even two of these, this session was built for you.",
    items: [
      { icon: "Frown", title: "Effort isn't converting", description: "You work harder each quarter and the results stay flat." },
      { icon: "CloudRain", title: "Low-grade exhaustion", description: "You are tired in a way that sleep does not seem to fix." },
      { icon: "Ban", title: "Starting over, again", description: "Every new system lasts eleven days and then quietly dies." },
      { icon: "AlertTriangle", title: "Decision fog", description: "Small choices take all day and big ones never get made." },
      { icon: "Wallet", title: "An income ceiling", description: "You hit the same number every year and cannot get past it." },
      { icon: "Heart", title: "Present but not really", description: "You are in the room with people you love, thinking about work." },
    ],
    impactTitle: "Left unaddressed, this quietly costs you:",
    impacts: [
      "Years spent optimising the wrong thing",
      "Opportunities you talked yourself out of",
      "Relationships that got the leftovers of your attention",
      "Money left on the table out of hesitation",
      "Health you keep promising to deal with later",
      "The version of you that never got built",
    ],
    visible: true,
  },

  // ---- Why -----------------------------------------------------------------
  why: {
    title: "Why Effort Alone Stopped Working",
    subtitle: "Three ideas that reframe everything you have tried so far.",
    points: [
      {
        title: "You are tuned to the wrong station",
        description: "No amount of volume fixes a signal problem. First you change the frequency, then the effort finally lands.",
        image: img("1522202176988-66273c2fd55f", 800, 600),
      },
      {
        title: "Alignment beats intensity",
        description: "When your inner state matches what you are reaching for, the same work produces disproportionate results.",
        image: img("1552664730-d307ca884978", 800, 600),
      },
      {
        title: "Practice, not inspiration",
        description: "Ancient technique paired with modern behavioural science, compressed into something you can do daily in ten minutes.",
        image: img("1531482615713-2afd69097998", 800, 600),
      },
    ],
    layoutVariant: "cards",
    imageSide: "left",
    visible: true,
  },

  // ---- About ---------------------------------------------------------------
  about: {
    name: "Placeholder Name",
    title: "Meet Your Guide",
    description:
      "Sample biography. Fifteen years of practice and more than forty thousand people guided through this work across live rooms, retreats and one-to-one sessions. Replace this paragraph with the real facilitator bio before publishing.",
    image: img("1573496359142-b8d87734a5a2", 700, 700),
    credentials: [
      "15+ years of practice",
      "40,000+ people guided",
      "Featured across national media",
      "Trained 300+ practitioners",
    ],
    visible: true,
  },

  // ---- People rail ---------------------------------------------------------
  guidesRail: {
    title: "Learn From Our Trusted Guides",
    subtitle: "Vetted practitioners across every practice we teach.",
    items: [
      { name: "Placeholder One", role: "Meditation & Breathwork", image: img("1494790108377-be9c29b29330", 500, 700), link: "#" },
      { name: "Placeholder Two", role: "Tarot & Intuition", image: img("1438761681033-6461ffad8d80", 500, 700), link: "#" },
      { name: "Placeholder Three", role: "Sound Healing", image: img("1472099645785-5658abf4ff4e", 500, 700), link: "#" },
      { name: "Placeholder Four", role: "Vedic Astrology", image: img("1507003211169-0a1dd7228f2d", 500, 700), link: "#" },
      { name: "Placeholder Five", role: "Energy Work", image: img("1544005313-94ddf0286df2", 500, 700), link: "#" },
    ],
    visible: true,
  },

  logos: {
    title: "As Featured In",
    logos: [
      { image: "", alt: "Publication One" },
      { image: "", alt: "Publication Two" },
      { image: "", alt: "Publication Three" },
      { image: "", alt: "Publication Four" },
      { image: "", alt: "Publication Five" },
    ],
    enabled: true,
  },

  gallery: {
    title: "Moments From the Room",
    subtitle: "Photographs from past live sessions and retreats.",
    images: [
      { url: img("1540575467063-178a50c2df87"), caption: "Live Session" },
      { url: img("1475721027785-f74eccf877e2"), caption: "Weekend Retreat" },
      { url: img("1528605248644-14dd04022da1"), caption: "Community Circle" },
      { url: img("1515187029135-18ee286d815b"), caption: "Group Practice" },
      { url: img("1511578314322-379afb476865"), caption: "Q&A Evening" },
      { url: img("1505373877841-8d25f7d46678"), caption: "Closing Ceremony" },
    ],
    visible: true,
  },

  // ---- Stats ---------------------------------------------------------------
  stats: {
    title: "The Numbers So Far",
    subtitle: "Placeholder metrics — swap for verified figures before publishing.",
    stats: [
      { value: "12,400+", label: "People guided", icon: "Users" },
      { value: "38", label: "Countries reached", icon: "Globe" },
      { value: "4.9/5", label: "Average rating", icon: "Star" },
      { value: "96%", label: "Would recommend", icon: "Trophy" },
    ],
    ctaButtonText: "Join the Next Session",
    ctaButtonLink: "#register",
    ctaButtonAction: "invitation",
    backgroundImage: "",
    cardStyle: "glass",
    visible: true,
  },

  // ---- Curriculum ----------------------------------------------------------
  curriculum: {
    title: "What We'll Cover, Step by Step",
    subtitle: "Ninety minutes, four movements — each one builds on the last.",
    modules: [
      {
        label: "Part 01",
        title: "Finding Your Current Baseline",
        description: "Before changing anything, you map where you actually are.",
        bullets: [
          "A short diagnostic to locate your dominant pattern",
          "Why your ceiling is a setpoint, not a limit",
          "The three states most people mistake for motivation",
        ],
        image: img("1506126613408-eca07ce68773"),
      },
      {
        label: "Part 02",
        title: "Clearing What's Actually Blocking You",
        description: "The removal work that has to happen before anything new sticks.",
        bullets: [
          "Naming the inherited belief running underneath the pattern",
          "A guided clearing practice you'll do live in the room",
          "How to tell genuine resistance from ordinary discomfort",
        ],
        image: img("1544367567-0f2fcb009e0b"),
      },
      {
        label: "Part 03",
        title: "Building the Daily Practice",
        description: "Ten minutes a day that you will realistically keep doing.",
        bullets: [
          "The minimum effective sequence, start to finish",
          "Anchoring it to something you already do every morning",
          "What to do on the days you skip it",
        ],
        image: img("1512438248247-f0f2a5a8b7f0"),
      },
      {
        label: "Part 04",
        title: "Live Q&A and Your Next 30 Days",
        description: "Open room, plus a concrete plan you leave with.",
        bullets: [
          "Direct answers to questions from the room",
          "A printable 30-day tracker",
          "How to keep going without a group around you",
        ],
        image: img("1531482615713-2afd69097998"),
      },
    ],
    displayMode: "accordion",
    ctaButtonText: "Save My Seat",
    ctaButtonLink: "#register",
    ctaButtonAction: "invitation",
    visible: true,
  },

  formats: {
    title: "Your Practice, Your Format",
    subtitle: "Live rooms, self-paced tracks, or one-to-one — whatever fits your week.",
    slides: [
      { image: img("1540575467063-178a50c2df87", 1310, 440), label: "Live Sessions" },
      { image: img("1475721027785-f74eccf877e2", 1310, 440), label: "Weekend Retreats" },
      { image: img("1511578314322-379afb476865", 1310, 440), label: "One-to-One" },
    ],
    visible: true,
  },

  // ---- Testimonials --------------------------------------------------------
  testimonials: {
    title: "What People Say Afterwards",
    subtitle: "Placeholder testimonials — replace with real, permissioned quotes.",
    items: [
      { name: "Sample Reviewer A", role: "Founder", quote: "I came in sceptical and left with an actual practice instead of another list of things to feel guilty about.", image: img("1494790108377-be9c29b29330", 200, 200) },
      { name: "Sample Reviewer B", role: "Designer", quote: "The clearing exercise in part two was worth the whole session. Something genuinely loosened.", image: img("1438761681033-6461ffad8d80", 200, 200) },
      { name: "Sample Reviewer C", role: "Teacher", quote: "Ninety minutes and I understood a pattern I have been circling for a decade.", image: img("1472099645785-5658abf4ff4e", 200, 200) },
      { name: "Sample Reviewer D", role: "Consultant", quote: "No hype, no upsell theatre. Just the actual work, explained clearly.", image: img("1507003211169-0a1dd7228f2d", 200, 200) },
      { name: "Sample Reviewer E", role: "Doctor", quote: "I have kept the ten-minute practice going for four months, which is unheard of for me.", image: img("1544005313-94ddf0286df2", 200, 200) },
      { name: "Sample Reviewer F", role: "Engineer", quote: "The 30-day tracker is what made it stick. Everything else I have tried died in week two.", image: img("1500648767791-00dcc994a43e", 200, 200) },
    ],
    displayMode: "marquee",
    visible: true,
  },

  videoTestimonials: {
    title: "Hear It In Their Own Words",
    subtitle: "Short clips recorded right after past sessions.",
    items: [
      { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", name: "Sample Clip A", role: "Past attendee" },
      { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", name: "Sample Clip B", role: "Past attendee" },
      { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", name: "Sample Clip C", role: "Past attendee" },
    ],
    visible: true,
  },

  // ---- Program -------------------------------------------------------------
  program: {
    title: "What You Walk Away With",
    subtitle: "Concrete outcomes, not vague promises.",
    points: [
      { title: "Your Pattern, Named", description: "You will leave able to describe the specific loop you have been running, in one sentence.", icon: "Target" },
      { title: "A Ten-Minute Practice", description: "A full sequence you can run tomorrow morning without any equipment.", icon: "Zap" },
      { title: "The 30-Day Tracker", description: "A printable sheet that makes the practice visible enough to actually keep.", icon: "BookOpen" },
      { title: "Session Recording", description: "Full replay access for 30 days in case you miss something live.", icon: "PlayCircle" },
      { title: "Community Access", description: "A private group of people doing the same thirty days alongside you.", icon: "Users" },
      { title: "Direct Q&A", description: "Live answers in the room — not a pre-recorded FAQ.", icon: "MessageSquare" },
    ],
    ctaButtonText: "Enrol Now",
    ctaButtonLink: "#register",
    ctaButtonAction: "invitation",
    visible: true,
  },

  // ---- Pricing -------------------------------------------------------------
  pricing: {
    title: "Choose Your Level of Support",
    subtitle: "Every tier includes the live session and the recording.",
    tiers: [
      {
        name: "Just the Session",
        price: "₹99",
        originalPrice: "₹2,499",
        period: "one-time",
        badge: "",
        description: "The live masterclass plus 30-day replay access.",
        features: ["90-minute live session", "30-day recording access", "Printable 30-day tracker", "Live Q&A in the room"],
        ctaText: "Reserve My Seat",
        ctaLink: "#register",
        ctaAction: "invitation",
        highlighted: false,
      },
      {
        name: "Session + Community",
        price: "₹1,499",
        originalPrice: "₹4,999",
        period: "one-time",
        badge: "Most Popular",
        description: "Everything above, plus 90 days inside the practice group.",
        features: [
          "Everything in Just the Session",
          "90 days of private community access",
          "Weekly group practice calls",
          "Guided audio library",
          "Lifetime recording access",
        ],
        ctaText: "Join the Group",
        ctaLink: "#register",
        ctaAction: "invitation",
        highlighted: true,
      },
      {
        name: "One-to-One",
        price: "₹7,999",
        originalPrice: "₹14,999",
        period: "one-time",
        badge: "",
        description: "Everything above, plus private sessions with the facilitator.",
        features: [
          "Everything in Session + Community",
          "Two 60-minute private sessions",
          "A plan built for your specific pattern",
          "Direct message support for 30 days",
        ],
        ctaText: "Apply for a Slot",
        ctaLink: "#register",
        ctaAction: "invitation",
        highlighted: false,
      },
    ],
    footnote: "All prices are placeholders. 7-day refund, no questions asked.",
    visible: true,
  },

  // ---- Comparison ----------------------------------------------------------
  comparison: {
    title: "How This Compares",
    subtitle: "An honest look at what is and is not included at each level.",
    columns: ["Free Content", "This Masterclass", "One-to-One"],
    rows: [
      { feature: "Live, interactive session", values: ["no", "yes", "yes"] },
      { feature: "Personalised diagnosis", values: ["no", "no", "yes"] },
      { feature: "Structured daily practice", values: ["no", "yes", "yes"] },
      { feature: "30-day tracker", values: ["no", "yes", "yes"] },
      { feature: "Recording access", values: ["no", "30 days", "Lifetime"] },
      { feature: "Community access", values: ["no", "90 days", "90 days"] },
      { feature: "Direct message support", values: ["no", "no", "yes"] },
      { feature: "Time to first result", values: ["Months", "Days", "Days"] },
    ],
    highlightColumn: 1,
    visible: true,
  },

  // ---- Guarantee -----------------------------------------------------------
  guarantee: {
    title: "Our Promise to You",
    subtitle: "Three things we commit to, in writing.",
    items: [
      { icon: "Wallet", title: "Pay Once. Full Access.", description: "One payment covers everything listed on your tier. No drip-fed modules, no locked bonuses." },
      { icon: "Ban", title: "No Upsells. No Surprises.", description: "The live session is a session, not a two-hour pitch for a more expensive thing." },
      { icon: "RefreshCcw", title: "Full Refund. No Questions.", description: "If it is not for you, tell us within seven days and we return the money the same week." },
    ],
    visible: true,
  },

  // ---- Content blocks ------------------------------------------------------
  contentBlocks: [
    {
      enabled: true,
      layout: "media-left",
      mediaType: "image",
      mediaUrl: img("1506126613408-eca07ce68773", 900, 700),
      textFormat: "bullets",
      heading: "Who This Is Actually For",
      content:
        "You have tried the books, the apps and the podcasts\nYou want a practice, not more information\nYou can commit ten minutes a day for thirty days\nYou are willing to be uncomfortable for twenty of those minutes\nYou are not looking for someone to fix it for you",
    },
    {
      enabled: true,
      layout: "media-right",
      mediaType: "image",
      mediaUrl: img("1544367567-0f2fcb009e0b", 900, 700),
      textFormat: "plain",
      heading: "And Who It Is Not For",
      content:
        "This is not a crisis service, and it is not a substitute for therapy or medical care. If you are in acute distress, please reach out to a qualified professional first — this work will still be here afterwards. It is also not for anyone hoping to attend passively; the session asks you to actually do the exercises in the room.",
    },
  ],

  // ---- Free-floating rich blocks ------------------------------------------
  richBlocks: [
    {
      id: RICH_BLOCK_A,
      hidden: false,
      content: richDoc({
        type: "doc",
        content: [
          { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "A Note Before You Register" }] },
          {
            type: "paragraph",
            content: [
              { type: "text", text: "This block is a " },
              { type: "text", marks: [{ type: "bold" }], text: "free-floating rich-content zone" },
              { type: "text", text: " — it can be dragged anywhere in the page order and edited with the full toolbar. Everything below is placeholder text." },
            ],
          },
          {
            type: "flexboxContainer",
            content: [
              {
                type: "flexItem",
                content: [
                  { type: "heading", attrs: { level: 3 }, content: [{ type: "text", text: "What you bring" }] },
                  {
                    type: "bulletList",
                    content: [
                      { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Ninety uninterrupted minutes" }] }] },
                      { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "A notebook and a pen" }] }] },
                      { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Somewhere you can speak out loud" }] }] },
                    ],
                  },
                ],
              },
              {
                type: "flexItem",
                content: [
                  { type: "heading", attrs: { level: 3 }, content: [{ type: "text", text: "What we bring" }] },
                  {
                    type: "bulletList",
                    content: [
                      { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "A structured, tested sequence" }] }] },
                      { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Live answers to real questions" }] }] },
                      { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "A plan for the thirty days after" }] }] },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }),
    },
    {
      id: RICH_BLOCK_B,
      hidden: false,
      content: richDoc({
        type: "doc",
        content: [
          { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "The Short Version" }] },
          {
            type: "paragraph",
            content: [
              { type: "text", text: "If you have read this far and are still deciding: the session costs less than lunch, runs for ninety minutes, and comes with a full refund if it is not for you. The only real cost is the evening." },
            ],
          },
          {
            type: "blockquote",
            content: [
              { type: "paragraph", content: [{ type: "text", text: "Placeholder pull-quote. Replace with a line from the facilitator or a standout testimonial." }] },
            ],
          },
        ],
      }),
    },
  ],

  appBanner: {
    image: img("1512438248247-f0f2a5a8b7f0", 1400, 400),
    link: "#register",
    alt: "Placeholder promotional banner",
    visible: true,
  },

  // ---- Invitation ----------------------------------------------------------
  invitation: {
    enabled: true,
    badgeEmoji: "🔥",
    badgeText: "Filling Fast",
    title: "Reserve Your Seat",
    subtitle: "Enter your details and we will send the private joining link.",
    dateLabel: "Date",
    dateValue: EVENT_DATE,
    timeLabel: "Time",
    timeValue: "7:30 PM IST",
    venueLabel: "Venue",
    venueValue: "Live on Zoom (private link)",
    availabilityText: "Live • Only 40 seats remain at this price.",
    buttonText: "Reserve My Seat",
    buttonLink: "#register",
    buttonAction: "invitation",
    formTitle: "Reserve Your Seat",
    formHighlights: ["₹99 today", "Live", "Recording included"],
    formButtonText: "Confirm My Seat",
    successTitle: "You're in.",
    successDescription: "Your joining link is on its way by email and WhatsApp. Check your spam folder if it has not arrived in ten minutes.",
    supportText: "Join 12,400+ people who have already sat through this session.",
    thankYouButtons: [
      { label: "Join the WhatsApp group", url: "#", icon: "whatsapp" },
      { label: "Follow on Instagram", url: "#", icon: "instagram" },
    ],
  },

  // ---- Bonuses -------------------------------------------------------------
  bonus: {
    title: "Included When You Register Today",
    items: [
      { title: "The 30-Day Tracker", description: "A printable sheet that makes the daily practice impossible to quietly drop.", image: img("1531482615713-2afd69097998", 600, 600) },
      { title: "Guided Audio Pack", description: "Six recorded sessions, ten minutes each, for the mornings you cannot think straight.", image: img("1552664730-d307ca884978", 600, 600) },
      { title: "Private Community", description: "Ninety days alongside everyone else running the same thirty days.", image: img("1528605248644-14dd04022da1", 600, 600) },
    ],
    enabled: true,
  },

  // ---- FAQ -----------------------------------------------------------------
  faq: {
    title: "Questions People Ask First",
    subtitle: "If yours is not here, reply to the confirmation email and we will answer.",
    items: [
      { question: "Do I need any prior experience?", answer: "None. The session assumes you are starting from zero and builds from there." },
      { question: "What if I cannot attend live?", answer: "Register anyway — the recording is available for 30 days on every tier. That said, the exercises land better in the room." },
      { question: "How long is the session?", answer: "Ninety minutes, including roughly twenty minutes of live Q&A at the end." },
      { question: "Is this therapy?", answer: "No. This is a practice-based session, not clinical care. If you are in acute distress, please speak to a qualified professional first." },
      { question: "Will there be a pitch at the end?", answer: "There is a short mention of the deeper programme, and that is it. The session is a session." },
      { question: "What is the refund policy?", answer: "Seven days, no questions asked. Email us and the money goes back the same week." },
      { question: "How do I get the joining link?", answer: "By email and WhatsApp immediately after you register, then again an hour before we start." },
    ],
    enabled: true,
  },

  // ---- Live proof toast ----------------------------------------------------
  liveProof: {
    items: [
      { text: "Sample: Priya from Mumbai just reserved a seat", meta: "2 minutes ago", image: img("1494790108377-be9c29b29330", 100, 100) },
      { text: "Sample: Arun from Bengaluru just reserved a seat", meta: "6 minutes ago", image: img("1507003211169-0a1dd7228f2d", 100, 100) },
      { text: "Sample: Meera from Pune just reserved a seat", meta: "11 minutes ago", image: img("1438761681033-6461ffad8d80", 100, 100) },
      { text: "Sample: 38 seats booked in the last hour", meta: "Updated just now", image: "" },
    ],
    intervalMs: 5500,
    visible: true,
  },

  // ---- Footer --------------------------------------------------------------
  footer: {
    cta: {
      title: "One Evening. A Different Baseline.",
      subtitle: "Ninety minutes, ₹99, and a full refund if it is not for you. The only thing you are risking is the evening.",
      ctaButtonText: "Reserve My Seat Now",
      ctaButtonLink: "#register",
      ctaButtonAction: "invitation",
      showCtaButton: true,
    },
    copyright: "© 2026 Adhyatmik Sutraa. All rights reserved.",
    links: [
      { label: "Privacy Policy", url: "/privacy-policy" },
      { label: "Terms & Conditions", url: "/terms" },
      { label: "Refund Policy", url: "/refund-policy" },
    ],
    logo: "",
    address: "Placeholder Address Line 1\nPlaceholder Area, City 400001\nMaharashtra, India",
    socialLinks: [
      { icon: "instagram", url: "#" },
      { icon: "youtube", url: "#" },
      { icon: "facebook", url: "#" },
      { icon: "whatsapp", url: "#" },
    ],
    linkColumns: [
      {
        heading: "Explore",
        links: [
          { label: "All Sessions", url: "#" },
          { label: "Retreats", url: "#" },
          { label: "One-to-One", url: "#" },
          { label: "Blog", url: "/blog" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "About Us", url: "/about" },
          { label: "Contact", url: "/contact" },
          { label: "Careers", url: "#" },
        ],
      },
      {
        heading: "Support",
        links: [
          { label: "Help Centre", url: "#" },
          { label: "Shipping Policy", url: "/shipping-policy" },
          { label: "Track Order", url: "#" },
        ],
      },
    ],
    popularLinks: [
      { label: "Meditation for beginners", url: "#" },
      { label: "Breathwork basics", url: "#" },
      { label: "Manifestation practice", url: "#" },
      { label: "Chakra balancing", url: "#" },
      { label: "Sound healing", url: "#" },
      { label: "Vedic astrology", url: "#" },
      { label: "Tarot reading", url: "#" },
      { label: "Energy clearing", url: "#" },
    ],
    appDownload: {
      text: "Practice on the go — download the app",
      iosUrl: "#",
      androidUrl: "#",
    },
    enabled: true,
  },

  // ---- Sticky checkout bar -------------------------------------------------
  floatingButton: {
    enabled: true,
    section: "invitation",
    variant: "bar",
    priceText: "₹99",
    strikePriceText: "₹2,499",
    noteText: "Only 40 seats left · closes soon",
    showOnDesktop: false,
  },

  sectionBg: {},
  sectionStyles: {},
};

async function main() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not set — add it to .env before running this script.");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const slug = "showcase-all-sections";

  // NOTE: templateData lives NESTED under `content`, not as a top-level field.
  const doc = await LandingPage.findOneAndUpdate(
    { slug },
    {
      $set: {
        title: "Abundance Reset Masterclass (Template Showcase)",
        slug,
        content: { templateData },
        theme: {
          primary: COLORS.primary,
          secondary: COLORS.secondary,
          accent: COLORS.accent,
          background: COLORS.bodyBg,
        },
        seo_title: "Abundance Reset Masterclass — Template Showcase",
        seo_description:
          "Placeholder showcase page exercising every section of the landing template. Replace all copy before publishing.",
        status: "published",
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log(`Upserted landing page: /${doc.slug}  (id ${doc._id})`);
  console.log(`Sections enabled: ${templateData.sectionOrder.length}`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

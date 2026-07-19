"use client";

import Link from "next/link";
import { Calendar, ShoppingBag, Award, Star, CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <style jsx>{`
        /* Paper texture and creative effects */
        .paper-texture {
          background-image:
            radial-gradient(circle at 20% 50%, rgba(123, 63, 122, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.5) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(123, 63, 122, 0.03) 0%, transparent 50%),
            linear-gradient(135deg, #fafaf9 0%, #f5f5f4 100%);
          position: relative;
        }

        .paper-texture::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image:
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.01) 2px,
              rgba(0, 0, 0, 0.01) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.01) 2px,
              rgba(0, 0, 0, 0.01) 4px
            );
          pointer-events: none;
        }

        .letter-paper {
          background: linear-gradient(135deg, #ffffff 0%, #fefefe 100%);
          box-shadow:
            0 1px 3px rgba(0, 0, 0, 0.1),
            0 4px 12px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          position: relative;
        }

        .letter-paper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background:
            linear-gradient(90deg, transparent 0%, transparent 40px, rgba(123, 63, 122, 0.1) 40px, rgba(123, 63, 122, 0.1) 42px, transparent 42px),
            repeating-linear-gradient(0deg, transparent 0%, transparent 24px, rgba(0, 0, 0, 0.03) 24px, rgba(0, 0, 0, 0.03) 25px);
          pointer-events: none;
        }

        .vintage-paper {
          background:
            radial-gradient(circle at 30% 20%, rgba(216, 158, 46, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(123, 63, 122, 0.03) 0%, transparent 50%),
            linear-gradient(135deg, #fefefe 0%, #faf9f7 100%);
          box-shadow:
            0 2px 8px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.8),
            inset 0 -1px 0 rgba(0, 0, 0, 0.02);
        }

        .handwritten-style {
          position: relative;
        }

        .handwritten-style::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(123, 63, 122, 0.3) 20%,
            rgba(253, 67, 128, 0.4) 50%,
            rgba(123, 63, 122, 0.3) 80%,
            transparent 100%);
          border-radius: 1px;
          transform: scaleX(0);
          transform-origin: left;
          animation: underline-draw 2s ease-out 0.5s forwards;
        }

        @keyframes underline-draw {
          to {
            transform: scaleX(1);
          }
        }

        .floating-elements {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .floating-dot {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, rgba(123, 63, 122, 0.2), rgba(253, 67, 128, 0.2));
          border-radius: 50%;
          animation: float-gentle 8s ease-in-out infinite;
        }

        .floating-dot:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
        .floating-dot:nth-child(2) { top: 60%; left: 85%; animation-delay: 2s; }
        .floating-dot:nth-child(3) { top: 80%; left: 20%; animation-delay: 4s; }
        .floating-dot:nth-child(4) { top: 30%; left: 70%; animation-delay: 6s; }

        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          25% { transform: translateY(-10px) rotate(90deg); opacity: 0.6; }
          50% { transform: translateY(-5px) rotate(180deg); opacity: 0.4; }
          75% { transform: translateY(-15px) rotate(270deg); opacity: 0.7; }
        }

        .torn-edge {
          position: relative;
        }

        .torn-edge::before {
          content: '';
          position: absolute;
          top: -1px;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(90deg,
            transparent 0%,
            #ffffff 2%,
            transparent 4%,
            #ffffff 6%,
            transparent 8%,
            #ffffff 10%,
            transparent 12%);
          background-size: 20px 6px;
          background-repeat: repeat-x;
        }

        .watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          font-size: 8rem;
          color: rgba(123, 63, 122, 0.03);
          font-weight: 100;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }

        .content-layer {
          position: relative;
          z-index: 1;
        }

        .ink-blot {
          position: absolute;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, rgba(123, 63, 122, 0.1) 0%, transparent 70%);
          border-radius: 50% 40% 60% 30%;
          animation: ink-spread 3s ease-out infinite;
        }

        .ink-blot:nth-child(1) { top: 15%; right: 10%; animation-delay: 1s; }
        .ink-blot:nth-child(2) { bottom: 20%; left: 15%; animation-delay: 3s; }

        @keyframes ink-spread {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.2); opacity: 0.6; }
          100% { transform: scale(1); opacity: 0.1; }
        }

        .folded-corner {
          position: relative;
          overflow: hidden;
        }

        .folded-corner::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 20px;
          height: 20px;
          background: linear-gradient(-45deg, transparent 46%, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.02) 54%, transparent 54%);
          transform: rotate(0deg);
        }

        .stamp-effect {
          position: relative;
          border: 2px dashed rgba(123, 63, 122, 0.3);
          background: rgba(123, 63, 122, 0.02);
        }

        .stamp-effect::before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border: 1px solid rgba(123, 63, 122, 0.1);
          border-radius: 4px;
        }
      `}</style>

    <div className="min-h-screen bg-stone-50 text-stone-800 paper-texture">
      {/* Floating decorative elements */}
      <div className="floating-elements">
        <div className="floating-dot"></div>
        <div className="floating-dot"></div>
        <div className="floating-dot"></div>
        <div className="floating-dot"></div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-stone-200">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-100/80 to-stone-50"></div>
        <div className="absolute inset-0 opacity-20">
          <img
            src="/assets/mission.jpg"
            alt="Healing background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-teal-50/60 to-cyan-50/40"></div>

        {/* Watermark */}
        <div className="watermark">Adhyatmik</div>

        {/* Ink blots */}
        <div className="ink-blot"></div>
        <div className="ink-blot"></div>

        <div className="relative max-w-7xl mx-auto px-8 py-24 content-layer">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/80 backdrop-blur-sm border border-emerald-200 text-sm text-emerald-700 mb-8 shadow-sm stamp-effect">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>
              About Adhyatmik Sutraa
            </div>
            <h1 className="text-5xl font-semibold text-stone-900 mb-6 leading-tight handwritten-style">
              We Are Your New <span className="text-gradient-peacock">Safe Space!</span>
            </h1>
            <p className="text-xl text-stone-600 mb-8 leading-relaxed">
              Adhyatmik Sutraa is helping its clients on a transformational journey of mind, body, and soul. When you connect with us, you receive spiritual, emotional, and energy healing by our renowned life coach and healer Sonali Bhattacharya.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-sm text-emerald-700 stamp-effect">10+ Years Experience</div>
              <div className="px-3 py-1 rounded-lg bg-teal-50 border border-teal-200 text-sm text-teal-700 stamp-effect">10,000+ People Guided</div>
              <div className="px-3 py-1 rounded-lg bg-cyan-50 border border-cyan-200 text-sm text-cyan-700 stamp-effect">50+ Courses</div>
              <div className="px-3 py-1 rounded-lg bg-teal-50 border border-teal-200 text-sm text-teal-700 stamp-effect">Tarot · Numerology · Angel Healing</div>
            </div>
            <div className="flex gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-lg shadow-emerald-500/25"
              >
                <Calendar className="w-4 h-4" />
                Book a Session
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 border border-stone-300 text-stone-700 bg-white/80 backdrop-blur-sm rounded-lg font-medium hover:border-emerald-300 hover:bg-emerald-50/50 transition-colors shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                Shop Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-stone-200 vintage-paper">
        <div className="max-w-7xl mx-auto px-8 py-16 content-layer">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-3xl font-bold text-gradient-peacock mb-2 handwritten-style">10,000+</div>
              <div className="text-sm font-medium text-stone-700 mb-1">People Guided</div>
              <div className="text-xs text-stone-500">And counting</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-gradient-peacock mb-2 handwritten-style">10+</div>
              <div className="text-sm font-medium text-stone-700 mb-1">Years Experience</div>
              <div className="text-xs text-stone-500">In the occult &amp; spiritual field</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-gradient-peacock mb-2 handwritten-style">50+</div>
              <div className="text-sm font-medium text-stone-700 mb-1">Courses Offered</div>
              <div className="text-xs text-stone-500">Occult &amp; spiritual healing</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-gradient-peacock mb-2 handwritten-style">12+</div>
              <div className="text-sm font-medium text-stone-700 mb-1">Healing Modalities</div>
              <div className="text-xs text-stone-500">Practiced &amp; taught</div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="border-b border-stone-200 letter-paper">
        <div className="max-w-7xl mx-auto px-8 py-24 content-layer">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="relative">
              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-stone-100 border border-stone-200 shadow-lg folded-corner">
                <img
                  src="/assets/founder-sonali.jpeg"
                  alt="Sonali Bhattacharya"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm border border-stone-200 rounded-lg p-4 shadow-lg letter-paper">
                <div className="text-lg font-semibold text-stone-900 handwritten-style">Sonali Bhattacharya</div>
                <div className="text-sm text-stone-600 mb-3">Founder · Adhyatmik Sutraa</div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 rounded stamp-effect">Tarot Reader</span>
                  <span className="px-2 py-1 text-xs bg-teal-50 text-teal-700 border border-teal-200 rounded stamp-effect">Numerologist</span>
                  <span className="px-2 py-1 text-xs bg-cyan-50 text-cyan-700 border border-cyan-200 rounded stamp-effect">Angel Healer</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white border border-emerald-200 text-sm text-emerald-700 mb-6 shadow-sm stamp-effect">
                <Star className="w-3 h-3" />
                About the Founder
              </div>
              <h2 className="text-3xl font-semibold text-stone-900 mb-4 handwritten-style">Sonali <span className="text-gradient-peacock">Bhattacharya</span></h2>
              <p className="text-stone-600 mb-6">Tarot Reader, Numerologist &amp; Angel Healer</p>

              <div className="space-y-4 mb-8">
                <p className="text-stone-700 leading-relaxed">
                  Adhyatmik Sutraa is a purpose-driven healing, coaching, and consultation platform because of our powerful and open-minded angel healer, life coach, consultant, and tarot card reader, Sonali Bhattacharya.
                </p>
                <p className="text-stone-700 leading-relaxed">
                  She has opened the door of spiritual and emotional awakening for most of her clients and is still carrying the torch forward. Being a trainer, she has been in the occult field for the last 10 years and helped people with holistic healing.
                </p>
                <p className="text-stone-700 leading-relaxed">
                  Sonali started her journey as a reiki healer, and then continued on it to become a numerologist, tarot reader, and healer. She helps clients overcome their emotional and spiritual blockages, and supports them in stepping into aligned and purpose-driven living.
                </p>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-lg p-6 hover:border-emerald-200 hover:bg-emerald-50/30 transition-colors shadow-sm letter-paper torn-edge">
                <h3 className="text-sm font-medium text-emerald-700 mb-4 uppercase tracking-wide handwritten-style">Why Choose Adhyatmik Sutraa Experts?</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-stone-700"><strong>Confidentiality:</strong> You can be a student or a client — we maintain professionalism and confidentiality while dealing with you</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-stone-700"><strong>Trustworthiness:</strong> Students can trust us for the courses offered and new beginnings; clients get clarity and trusted direction in their lives</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-stone-700"><strong>Experienced:</strong> Sonali Bhattacharya has over 10 years of experience and has helped over 10,000 people and counting</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-stone-700"><strong>Customized Services:</strong> You are charged only for customized services on our platform — no hidden charges</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="border-b border-stone-200 vintage-paper">
        <div className="max-w-7xl mx-auto px-8 py-24 content-layer">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white border border-teal-200 text-sm text-teal-700 mb-6 shadow-sm stamp-effect">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500"></div>
              Your Way to New Life!
            </div>
            <h2 className="text-3xl font-semibold text-stone-900 mb-4 handwritten-style">The <span className="text-gradient-peacock">Adhyatmik Sutraa</span> Journey</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-6">
              <p className="text-stone-700 leading-relaxed">
                Most people are looking for guidance to go ahead in their life, but they are stuck in the loop. A few want closure, and others are looking for direction. At Adhyatmik Sutraa, we have shown a path to over 10,000 people and counting — creating a safe space for individuals so that they can reconnect with their authentic selves.
              </p>
              <p className="text-stone-700 leading-relaxed">
                At Adhyatmik Sutraa, you get to step into a new phase of life with the teachings given by Sonali. She believes that we all have the ability to heal and change the way we look at life. We just need to be transparent with ourselves and connect with our authentic selves. Her clients are stepping into their awakening era through personal consultation, angel healing, and tarot reading.
              </p>
              <p className="text-stone-700 leading-relaxed">
                The interesting thing at Adhyatmik Sutraa is the online healing and tarot reading courses that you can learn from the founder. Sonali offers more than 50 courses in occult and spiritual healing. From one-on-one sessions to meetings and study material, students get everything on the Adhyatmik Sutraa platform.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-stone-200 rounded-lg p-6 hover:border-emerald-200 hover:bg-emerald-50/20 transition-colors shadow-sm letter-paper folded-corner">
                <blockquote className="text-lg text-stone-800 italic mb-4 handwritten-style">
                  "My mission is to encourage, inspire, and motivate you to uncover any possibilities. I will show you deep compassion and lead you to your self-awakening."
                </blockquote>
                <cite className="text-sm text-emerald-700 font-medium">— Sonali Bhattacharya</cite>
              </div>

              <div className="bg-white border border-stone-200 rounded-lg p-6 hover:border-teal-200 hover:bg-teal-50/20 transition-colors shadow-sm letter-paper">
                <p className="text-stone-700 leading-relaxed">
                  <span className="text-emerald-600 font-medium handwritten-style">My Vision:</span> I envision opening doors of healing and awakening for more people so that they achieve what they have always wanted in their lives. My focus is to support and lift one person at a time and <span className="text-teal-600 font-medium handwritten-style">change their life with my teaching.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Gain Section */}
      <section className="border-b border-stone-200 letter-paper">
        <div className="max-w-7xl mx-auto px-8 py-24 content-layer">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white border border-cyan-200 text-sm text-cyan-700 mb-6 shadow-sm stamp-effect">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500"></div>
              What Will You Gain?
            </div>
            <h2 className="text-3xl font-semibold text-stone-900 mb-4 handwritten-style">What Will You Gain from <span className="text-gradient-peacock">Adhyatmik Sutraa?</span></h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Guidance for clients, awakening for students — a clear path for everyone
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { num: "01", title: "In-Depth Courses", desc: "Students get in-depth insight into angel healing, life coaching, and tarot card reading alongside other courses.", image: "/assets/gain-courses.jpg" },
              { num: "02", title: "Client Understanding", desc: "Learn to comprehend the emotions of your clients well, and impart complete and seamless guidance without any hassle.", image: "/assets/gain-clients.jpg" },
              { num: "03", title: "Inner Awakening", desc: "Students become awakened and well-versed with the inner healing energies through guided practice.", image: "/assets/gain-awakening.jpg" },
              { num: "04", title: "Clarity & Direction", desc: "Clients receive a better understanding of their life — feeling free, more aligned, and clear about the way forward.", image: "/assets/gain-clarity.jpg" },
              { num: "05", title: "Closure & Healing", desc: "A few got their closure, and others are on the path of spiritual and emotional healing with divine intervention.", image: "/assets/gain-healing.jpg" },
              { num: "06", title: "Real Case Studies", desc: "Students submit final reports on real healing or teaching they have done — personally reviewed by Sonali for a real-time verdict.", image: "/assets/gain-casestudy.jpg" }
            ].map((item, index) => (
              <div key={index} className="bg-white border border-stone-200 rounded-lg overflow-hidden hover:border-stone-300 hover:shadow-lg transition-all duration-200 shadow-sm letter-paper folded-corner">
                <div className="aspect-video relative bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 text-2xl font-bold text-white drop-shadow">{item.num}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-stone-900 mb-3 handwritten-style">{item.title}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modalities Section */}
      <section className="border-b border-stone-200 vintage-paper">
        <div className="max-w-7xl mx-auto px-8 py-24 content-layer">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white border border-teal-200 text-sm text-teal-700 mb-6 shadow-sm stamp-effect">
              <Award className="w-3 h-3" />
              Services
            </div>
            <h2 className="text-3xl font-semibold text-stone-900 mb-4 handwritten-style">What Sonali <span className="text-gradient-peacock">Offers</span></h2>
            <p className="text-stone-600">Angel healing and other divine services and teachings</p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {[
              "Angel Healing", "Tarot Card Reading", "Numerology", "Reiki Healing",
              "Maa Kali and Baglamukhi", "Tara Maa", "Access Bars Consciousness", "Light Healing Frequency",
              "Akashic Records", "6D Healing", "Lama Fera", "Wiccan and Spell Craft Work",
              "Merlin Magic", "Prediction with Runes", "Counselling and Guidance"
            ].map((modality, index) => {
              const colors = [
                { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', hover: 'hover:border-emerald-300 hover:bg-emerald-100' },
                { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', hover: 'hover:border-teal-300 hover:bg-teal-100' },
                { bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-700', hover: 'hover:border-cyan-300 hover:bg-cyan-100' }
              ];
              const colorSet = colors[index % colors.length];
              return (
                <span
                  key={index}
                  className={`px-3 py-2 ${colorSet.bg} ${colorSet.border} rounded-lg text-sm ${colorSet.text} ${colorSet.hover} transition-colors shadow-sm stamp-effect`}
                >
                  {modality}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visual Gallery Section */}
      <section className="border-b border-stone-200 letter-paper">
        <div className="max-w-7xl mx-auto px-8 py-24 content-layer">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white border border-cyan-200 text-sm text-cyan-700 mb-6 shadow-sm stamp-effect">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"></div>
              Our Environment
            </div>
            <h2 className="text-3xl font-semibold text-stone-900 mb-4 handwritten-style">Healing <span className="text-gradient-peacock">Spaces</span> &amp; Moments</h2>
            <p className="text-stone-600">A safe space to pour your difficult choices and clouded thoughts</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 aspect-[16/10] rounded-lg overflow-hidden bg-stone-100 border border-stone-200 shadow-lg folded-corner">
              <img
                src="/assets/mission.jpg"
                alt="Healing space"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <div className="aspect-square rounded-lg overflow-hidden bg-stone-100 border border-stone-200 shadow-lg folded-corner">
                <img
                  src="/assets/vision.jpg"
                  alt="Healing session"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-white border border-stone-200 rounded-lg p-6 text-center hover:border-emerald-200 hover:bg-emerald-50/20 transition-colors shadow-sm letter-paper">
                <div className="text-2xl font-bold text-gradient-peacock mb-2 handwritten-style">10,000+</div>
                <div className="text-sm text-stone-600">People Guided &amp; Counting</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="vintage-paper">
        <div className="max-w-7xl mx-auto px-8 py-24 content-layer">
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 mx-auto mb-8 bg-gradient-to-br from-emerald-100 to-cyan-100 border border-emerald-200 rounded-lg flex items-center justify-center shadow-sm folded-corner">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-white"></div>
              </div>
            </div>
            <h2 className="text-3xl font-semibold text-stone-900 mb-6 handwritten-style">
              Ready to Connect With Your <span className="text-gradient-peacock">Inner Self?</span>
            </h2>
            <p className="text-xl text-stone-600 mb-8">
              Want to feel free and empowered? Get easy-to-follow guidance, exact readings, and insightful courses from Adhyatmik Sutraa.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-lg shadow-emerald-500/25"
              >
                <Calendar className="w-4 h-4" />
                Book a Session
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 border border-stone-300 text-stone-700 bg-white/80 backdrop-blur-sm rounded-lg font-medium hover:border-emerald-300 hover:bg-emerald-50/50 transition-colors shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                Shop Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

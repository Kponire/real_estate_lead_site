import React, { useState, useRef } from "react";
//import type { ChangeEvent } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import type { /*Variants,*/ Transition } from "framer-motion";
import {
  BsArrowRight,
  BsHouseDoor,
  BsGraphUp,
  BsGeoAlt,
  BsChevronLeft,
  BsCheckCircle,
  BsStars,
  BsChatRightQuote,
  BsEnvelope,
  BsTelephone,
  BsInstagram,
  BsLinkedin,
  BsPlus,
  BsDash,
} from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";
// import { TrustedBy } from "../components/TrustedBy";

/**
 * TYPE DEFINITIONS
 */
type Intent = "buy" | "sell" | "";
type Timeline =
  | "Immediately"
  | "1-3 Months"
  | "3-6 Months"
  | "Just browsing"
  | "";

interface LeadData {
  intent: Intent;
  timeline: Timeline;
  budget: string;
  location: string;
  name: string;
  email: string;
  phone: string;
}

const transitionConfig: Transition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1],
};

/**
 * COMPONENT: PREMIUM LANDING
 */
const LuxuryRealEstate: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [, setFormData] = useState<LeadData>({
    intent: "",
    timeline: "",
    budget: "",
    location: "",
    name: "",
    email: "",
    phone: "",
  });

  // Scroll animations for 3D/Parallax effect
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const galleryY = useTransform(scrollYProgress, [0.1, 0.4], [100, 0]);

  const updateField = (field: keyof LeadData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) return <SuccessView />;

  return (
    <div
      ref={containerRef}
      className="bg-[#0A0A0A] text-white font-sans selection:bg-white selection:text-black"
    >
      {/* SECTION 1: CINEMATIC HERO */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden px-6">
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          {/* Subtle 3D-feeling background overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-[#0A0A0A] z-10" />
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Architecture"
            className="w-full h-full object-cover grayscale-[0.3] brightness-50"
          />
        </motion.div>

        <div className="relative z-20 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.5em] uppercase text-slate-400 mb-6">
              <BsStars className="text-white" /> The Sovereign Collection
            </span>
            <h1 className="text-6xl md:text-[120px] font-light leading-none tracking-tighter mb-8">
              Wealth <br />
              <span className="font-serif italic text-white/40">
                In Residence.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-100 font-light max-w-xl mx-auto leading-relaxed mb-10">
              Access the most significant off-market estates and data-driven
              investment analysis globally.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex justify-center"
            >
              <div className="bg-black/40 backdrop-blur-xl border border-white rounded-3xl p-6 flex flex-col md:flex-row gap-4 max-w-2xl w-full">
                <input
                  type="email"
                  placeholder="Private email"
                  className="flex-1 px-6 py-4 rounded-full bg-black/60 text-white placeholder:text-white/40 border border-white focus:outline-none focus:ring-1 focus:ring-white/40"
                />
                <button
                  onClick={() =>
                    document
                      .getElementById("capture")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-8 py-4 rounded-full bg-white text-black text-xs font-bold tracking-widest uppercase hover:bg-slate-200 transition"
                >
                  Unlock Access
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Stat Micro-Component */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-12 text-[10px] font-bold tracking-widest uppercase text-slate-500"
        >
          <div className="text-center">
            <div className="text-white text-lg font-light mb-1">$4.2B+</div>
            Transactions
          </div>
          <div className="text-center">
            <div className="text-white text-lg font-light mb-1">0.1%</div>
            Market Access
          </div>
        </motion.div>
      </section>

      {/* <TrustedBy /> */}

      {/* SECTION 2: CURATED GALLERY (IMAGE GRID) */}
      <section className="py-25 px-6 max-w-7xl mx-auto">
        <motion.div
          style={{ y: galleryY }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 h-200"
        >
          <div className="md:col-span-8 relative overflow-hidden rounded-3xl group">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              alt="Estate"
            />
            <div className="absolute bottom-8 left-8 text-white z-20">
              <p className="text-[10px] font-bold tracking-widest uppercase opacity-60 mb-2">
                Modern Minimalist
              </p>
              <h3 className="text-3xl font-light italic font-serif">
                The Obsidian Villa
              </h3>
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
          </div>
          <div className="md:col-span-4 grid grid-rows-2 gap-6">
            <div className="relative overflow-hidden rounded-3xl group">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                alt="Estate"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all" />
            </div>
            <div className="relative overflow-hidden rounded-3xl group">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                alt="Estate"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 3: THE CAPTURE ENGINE */}
      <section
        id="capture"
        className="min-h-screen pt-25 px-6 bg-white text-slate-900 rounded-t-[60px]"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-tight mb-8">
              Tell us <br />
              <span className="font-serif italic text-slate-400">
                what you seek.
              </span>
            </h2>
            <div className="space-y-12 mt-16">
              <FeatureItem
                icon={<FaCircleCheck />}
                title="Strict Confidentiality"
                desc="Your data is shielded by end-to-end encryption and high-level NDA protocols."
              />
              <FeatureItem
                icon={<FaCircleCheck />}
                title="Instant Valuation"
                desc="Receive proprietary market liquidity scores for your target areas immediately."
              />
            </div>
          </div>

          <div className="relative w-full max-w-2xl mx-auto">
            {/* --- Floating Bubbles Start --- */}
            <div className="absolute inset-0 overflow-visible pointer-events-none">
              {/* Large Blue Bubble */}
              <motion.div
                animate={{
                  x: [0, 40, -20, 0],
                  y: [0, -50, 20, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -left-20 w-72 h-72 bg-blue-400/30 rounded-full blur-[80px]"
              />

              {/* Medium Purple/Pink Bubble */}
              <motion.div
                animate={{
                  x: [0, -60, 30, 0],
                  y: [0, 40, -40, 0],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-10 -right-10 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]"
              />

              {/* Small Accent Bubble */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/2 w-32 h-32 bg-orange-300/20 rounded-full blur-[60px]"
              />
            </div>
            {/* --- Floating Bubbles End --- */}

            <div className="relative z-10 bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-[25px] border border-white/20 shadow-xl/40 overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent pointer-events-none" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={transitionConfig}
                >
                  {/* Step Indicator */}
                  <div className="mb-12 flex justify-between items-end">
                    <div>
                      <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400">
                        Step 0{step}
                      </span>
                      <h3 className="text-2xl">Requirement Analysis</h3>
                    </div>
                    <div className="text-sm italic text-slate-400">
                      {step}/4
                    </div>
                  </div>

                  {/* STEP 1: INTENT */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <FormOption
                        title="Acquisition"
                        description="Off-market buyer representation"
                        icon={<BsHouseDoor />}
                        onClick={() => {
                          updateField("intent", "buy");
                          setStep(2);
                        }}
                      />
                      <FormOption
                        title="Divestment"
                        description="Strategic property liquidation"
                        icon={<BsGraphUp />}
                        onClick={() => {
                          updateField("intent", "sell");
                          setStep(2);
                        }}
                      />
                    </div>
                  )}

                  {/* STEP 2: TIMELINE */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          "Immediately",
                          "1-3 Months",
                          "3-6 Months",
                          "Researching",
                        ].map((time) => (
                          <button
                            key={time}
                            onClick={() => {
                              updateField("timeline", time as Timeline);
                              setStep(3);
                            }}
                            className="p-8 border border-slate-200 rounded-2xl hover:bg-slate-900 hover:text-white transition-all text-left"
                          >
                            <span className="text-sm font-bold uppercase tracking-widest">
                              {time}
                            </span>
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setStep(1)}
                        className="mt-6 text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2"
                      >
                        <BsChevronLeft /> Back
                      </button>
                    </div>
                  )}

                  {/* STEP 3: DATA */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="relative">
                          <BsGeoAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            onChange={(e) =>
                              updateField("location", e.target.value)
                            }
                            placeholder="Target Location"
                            className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-2xl focus:ring-1 focus:ring-slate-900 outline-none transition-all"
                          />
                        </div>
                        <select
                          onChange={(e) =>
                            updateField("budget", e.target.value)
                          }
                          className="w-full px-6 py-5 bg-white border border-slate-100 rounded-2xl focus:ring-1 focus:ring-slate-900 outline-none appearance-none"
                        >
                          <option>Investment Bracket</option>
                          <option>$2M - $5M</option>
                          <option>$5M - $15M</option>
                          <option>$15M+</option>
                        </select>
                      </div>
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => setStep(2)}
                          className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2"
                        >
                          <BsChevronLeft /> Back
                        </button>
                        <button
                          onClick={() => setStep(4)}
                          className="px-10 py-4 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-widest"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: CONTACT */}
                  {step === 4 && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <input
                          onChange={(e) => updateField("name", e.target.value)}
                          placeholder="Full Name"
                          className="w-full px-6 py-5 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-1 focus:ring-slate-900"
                        />
                        <input
                          onChange={(e) => updateField("email", e.target.value)}
                          type="email"
                          placeholder="Private Email"
                          className="w-full px-6 py-5 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-1 focus:ring-slate-900"
                        />
                        <input
                          onChange={(e) => updateField("phone", e.target.value)}
                          type="tel"
                          placeholder="Mobile Number"
                          className="w-full px-6 py-5 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-1 focus:ring-slate-900"
                        />
                      </div>
                      <button
                        onClick={() => setIsSubmitted(true)}
                        className="w-full py-6 bg-slate-900 text-white rounded-2xl font-bold tracking-[0.2em] text-[10px] uppercase hover:bg-black shadow-xl"
                      >
                        Authenticate & Access Data
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
      {/* 5. TESTIMONIALS */}
      <section className="bg-white pb-25 px-6 overflow-hidden text-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <BsChatRightQuote className="text-4xl text-slate-200" />
            <h3 className="text-3xl">Client Sentiments</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Testimonial
              quote="The off-market inventory they provided wasn't just exclusive; it was transformative for our portfolio."
              author="Alexander V., Venture Partner"
            />
            <Testimonial
              quote="Absolute discretion and clinical precision. They don't just find houses; they engineer acquisitions."
              author="Sarah L., Tech Founder"
            />
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="bg-slate-50 py-25 px-6 text-gray-900">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-[40px] mb-14 text-center font-mono">
            Frequent Inquiries
          </h3>
          <div className="space-y-4">
            <FaqItem
              index={0}
              active={activeFaq}
              setActive={setActiveFaq}
              q="How do you access off-market listings?"
              a="We maintain direct relationships with estate attorneys, private banks, and wealth managers to secure assets before public listing."
            />
            <FaqItem
              index={1}
              active={activeFaq}
              setActive={setActiveFaq}
              q="What is the typical investment bracket?"
              a="We specialize in properties starting at $2.5M, ensuring high-liquidity assets for our discerning clientele."
            />
            <FaqItem
              index={2}
              active={activeFaq}
              setActive={setActiveFaq}
              q="Are your services available globally?"
              a="While our core data centers are in the US and UK, our concierge service supports acquisitions across 40+ countries."
            />
          </div>
        </div>
      </section>

      {/* 7. CONTACT & FOOTER */}
      <footer className="bg-slate-900 text-white pt-25 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="md:col-span-2">
            <h2 className="text-4xl mb-8">
              Let's discuss <br />
              <span className="font-serif italic text-white/40">
                the next move.
              </span>
            </h2>
            <div className="flex gap-8 mt-12">
              <a
                href="#"
                className="p-4 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
              >
                <BsInstagram />
              </a>
              <a
                href="#"
                className="p-4 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
              >
                <BsLinkedin />
              </a>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-6">
              Concierge
            </p>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-center gap-2">
                <BsEnvelope className="text-xs" /> contact@sovereign.estate
              </li>
              <li className="flex items-center gap-2">
                <BsTelephone className="text-xs" /> +1 (800) 900-5000
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-6">
              Offices
            </p>
            <ul className="space-y-4 text-slate-300">
              <li>Beverly Hills, CA</li>
              <li>Manhattan, NY</li>
              <li>Mayfair, London</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold tracking-widest uppercase text-white/20">
          <p>© 2026 Sovereign Estate Collective. All Rights Reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

/**
 * REUSABLE COMPONENTS
 */
const FeatureItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
}> = ({ icon, title, desc }) => (
  <div className="flex gap-6">
    <div className="text-3xl text-black pt-1">{icon}</div>
    <div>
      <h4 className="text-lg font-medium mb-2">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

const FormOption: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}> = ({ title, description, icon, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-between p-8 bg-white border border-slate-100 rounded-3xl hover:border-slate-700 hover:border-2 transition-all group"
  >
    <div className="flex items-center gap-6 text-left">
      <div className="text-3xl text-slate-300 group-hover:text-slate-900 transition-colors">
        {icon}
      </div>
      <div>
        <div className="text-lg font-medium tracking-tight text-slate-900">
          {title}
        </div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          {description}
        </div>
      </div>
    </div>
    <BsArrowRight className="text-slate-300 group-hover:text-slate-900 transform group-hover:translate-x-1 transition-all" />
  </button>
);

const SuccessView: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="min-h-screen flex flex-col items-center justify-center bg-[#0A0A0A] text-white p-6"
  >
    <BsCheckCircle className="text-8xl text-white/20 mb-8" />
    <h2 className="text-5xl font-light mb-4 font-serif italic">
      Request Submitted.
    </h2>
    <p className="text-slate-500 tracking-widest uppercase text-[10px] font-bold">
      Expect a briefing within 6 hours.
    </p>
  </motion.div>
);

const Testimonial: React.FC<{ quote: string; author: string }> = ({
  quote,
  author,
}) => (
  <div className="p-12 bg-slate-50 rounded-[40px] border border-slate-100">
    <p className="text-2xl italic font-serif leading-relaxed mb-8 text-slate-700">
      "{quote}"
    </p>
    <div className="flex items-center gap-4">
      <div className="h-12 w-12 rounded-full bg-slate-200" />
      <p className="text-xs font-bold tracking-widest uppercase">{author}</p>
    </div>
  </div>
);

const FaqItem: React.FC<{
  q: string;
  a: string;
  index: number;
  active: number | null;
  setActive: (i: number | null) => void;
}> = ({ q, a, index, active, setActive }) => (
  <div className="border-b border-slate-200 overflow-hidden">
    <button
      onClick={() => setActive(active === index ? null : index)}
      className="w-full py-8 flex justify-between items-center text-left"
    >
      <span className="text-xl font-medium">{q}</span>
      {active === index ? (
        <BsDash size={24} className="text-slate-500" />
      ) : (
        <BsPlus size={24} className="text-slate-500" />
      )}
    </button>
    <AnimatePresence>
      {active === index && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          className="pb-8"
        >
          <p className="text-slate-500 leading-relaxed">{a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default LuxuryRealEstate;

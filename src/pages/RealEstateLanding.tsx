import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  intent: string;
  timeline: string;
  budget: string;
  location: string;
  name: string;
  email: string;
  phone: string;
}

interface FormErrors {
  [key: string]: string;
}

interface FormStepProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
  errors: FormErrors;
}

interface Property {
  id: number;
  image: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  location: string;
  status: "sold" | "pending" | "active";
}

const RealEstateLanding: React.FC = () => {
  const [formStep, setFormStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    intent: "",
    timeline: "",
    budget: "",
    location: "",
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .perspective-1000 {
        perspective: 1000px;
        perspective-origin: center;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const validateStep = (): boolean => {
    const newErrors: FormErrors = {};

    if (formStep === 0 && !formData.intent) {
      newErrors.intent = "Please select your intent";
    }
    if (formStep === 1 && !formData.timeline) {
      newErrors.timeline = "Please select your timeline";
    }
    if (formStep === 2) {
      if (!formData.budget)
        newErrors.budget = "Please select your budget range";
      if (!formData.location)
        newErrors.location = "Please enter your preferred location";
    }
    if (formStep === 3) {
      if (!formData.name) newErrors.name = "Please enter your name";
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
      if (
        !formData.phone ||
        !/^\d{10,}$/.test(formData.phone.replace(/\D/g, ""))
      ) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (): void => {
    if (validateStep()) {
      if (formStep < 3) {
        setFormStep(formStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = (): void => {
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
  };

  const updateFormData = (field: keyof FormData, value: string): void => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Premium, conversion-focused with property image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Overlay with Parallax Effect */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2400')`,
            }}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-linear-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95" />

          {/* Animated gradient orbs for depth */}
          <motion.div
            className="absolute top-20 -left-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 -right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, -50, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: "48px 48px",
              }}
            ></div>
          </div>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="perspective-1000">
            {/* Trust badge with 3D entrance */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
                type: "spring",
                stiffness: 100,
              }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
            >
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-white/90 font-medium tracking-wide">
                Trusted by 2,400+ Local Families
              </span>
            </motion.div>

            {/* Main headline with staggered 3D word animation */}
            <div className="mb-6">
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {/* First line - word by word reveal */}
                <div className="overflow-hidden mb-2">
                  {["Find", "Your", "Dream", "Home"].map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{
                        opacity: 0,
                        y: 100,
                        rotateX: -90,
                        scale: 0.8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.8,
                        delay: 0.4 + index * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                        type: "spring",
                        stiffness: 100,
                        damping: 12,
                      }}
                      className="inline-block mr-4 md:mr-6"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>

                {/* Second line - gradient text with 3D reveal */}
                <div className="overflow-hidden">
                  {["Without", "the", "Stress"].map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{
                        opacity: 0,
                        y: 100,
                        rotateX: -90,
                        scale: 0.8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.8,
                        delay: 0.8 + index * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                        type: "spring",
                        stiffness: 100,
                        damping: 12,
                      }}
                      className="inline-block mr-4 md:mr-6 bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
              </motion.h1>
            </div>

            {/* Subtitle with slide up and blur effect */}
            <motion.p
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.8,
                delay: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Work with award-winning local agents who know your neighborhood
              inside out. Get personalized matches in under 60 seconds.
            </motion.p>

            {/* Social proof metrics with 3D card flip */}
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-16">
              {[
                { value: "$2.4B+", label: "Properties Sold" },
                { value: "15 Years", label: "Local Expertise" },
                { value: "4.9/5", label: "Client Rating" },
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    rotateY: -90,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    rotateY: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 1.4 + index * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    transition: { duration: 0.3 },
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="backdrop-blur-sm bg-white/5 rounded-2xl p-4 border border-white/10"
                >
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm text-slate-400 uppercase tracking-wider">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Primary CTA with magnetic hover effect */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 1.9,
                ease: [0.22, 1, 0.36, 1],
                type: "spring",
                stiffness: 100,
              }}
            >
              <motion.button
                onClick={() =>
                  document
                    .getElementById("form-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 60px rgba(16, 185, 129, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-3 bg-linear-to-r from-emerald-500 to-emerald-600 text-white px-10 py-5 rounded-full text-lg font-semibold shadow-2xl shadow-emerald-500/50 overflow-hidden"
              >
                {/* Button shine effect */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">
                  Get Your Free Home Valuation
                </span>
                <motion.svg
                  className="w-5 h-5 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </motion.svg>
              </motion.button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.1, duration: 0.6 }}
              className="text-sm text-slate-400 mt-4"
            >
              No obligations. Your information stays private.
            </motion.p>
          </div>
        </div>

        {/* Animated scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 2.3, duration: 0.6 },
            y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() =>
            document
              .getElementById("trust-section")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white/50 uppercase tracking-widest">
              Scroll
            </span>
            <svg
              className="w-6 h-6 text-white/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Trust Indicators Section */}
      <TrustSection />

      {/* Featured Properties Section */}
      <PropertiesShowcase />

      {/* Multi-step Form Section */}
      <section id="form-section" className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Let's Find Your Perfect Match
            </h2>
            <p className="text-xl text-slate-600">
              Answer a few quick questions to get personalized recommendations
            </p>
          </motion.div>

          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 p-8 md:p-12"
            >
              {/* Progress Bar */}
              <div className="mb-12">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-slate-900">
                    Step {formStep + 1} of 4
                  </span>
                  <span className="text-sm text-slate-500">
                    {Math.round(((formStep + 1) / 4) * 100)}% Complete
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-linear-to-r from-emerald-500 to-cyan-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((formStep + 1) / 4) * 100}%` }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>

              {/* Step Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={formStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {formStep === 0 && (
                    <FormStep1
                      formData={formData}
                      updateFormData={updateFormData}
                      errors={errors}
                    />
                  )}
                  {formStep === 1 && (
                    <FormStep2
                      formData={formData}
                      updateFormData={updateFormData}
                      errors={errors}
                    />
                  )}
                  {formStep === 2 && (
                    <FormStep3
                      formData={formData}
                      updateFormData={updateFormData}
                      errors={errors}
                    />
                  )}
                  {formStep === 3 && (
                    <FormStep4
                      formData={formData}
                      updateFormData={updateFormData}
                      errors={errors}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-12">
                {formStep > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormStep(formStep - 1)}
                    className="flex-1 py-4 px-6 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:border-slate-300 transition-colors"
                  >
                    Back
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  className="flex-1 py-4 px-6 bg-linear-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all"
                >
                  {formStep === 3 ? "Get My Free Valuation" : "Continue"}
                </motion.button>
              </div>

              {/* Security badge */}
              <div className="flex items-center justify-center gap-2 mt-8 text-sm text-slate-500">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Your information is secure and will never be shared</span>
              </div>
            </motion.div>
          ) : (
            <SuccessMessage />
          )}
        </div>
      </section>

      {/* Final CTA Section */}
      <FinalCTA />
    </div>
  );
};

// Form Step 1: Intent Selection
const FormStep1: React.FC<FormStepProps> = ({
  formData,
  updateFormData,
  errors,
}) => {
  const options = [
    {
      value: "buyer",
      title: "I'm Looking to Buy",
      description: "Find your dream home with expert guidance",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      value: "seller",
      title: "I'm Looking to Sell",
      description: "Get top dollar for your property",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div>
      <h3 className="text-3xl font-bold text-slate-900 mb-3">
        What brings you here today?
      </h3>
      <p className="text-slate-600 mb-8">
        Choose the option that best describes your needs
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {options.map((option) => (
          <motion.button
            key={option.value}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => updateFormData("intent", option.value)}
            className={`p-8 rounded-2xl border-2 transition-all text-left ${
              formData.intent === option.value
                ? "border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-100"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div
              className={`mb-4 ${formData.intent === option.value ? "text-emerald-600" : "text-slate-400"}`}
            >
              {option.icon}
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">
              {option.title}
            </h4>
            <p className="text-slate-600">{option.description}</p>
          </motion.button>
        ))}
      </div>
      {errors.intent && (
        <p className="text-red-500 text-sm mt-4">{errors.intent}</p>
      )}
    </div>
  );
};

// Form Step 2: Timeline Selection
const FormStep2: React.FC<FormStepProps> = ({
  formData,
  updateFormData,
  errors,
}) => {
  const timelines = [
    { value: "immediate", label: "Immediately", sublabel: "I'm ready now" },
    { value: "1-3months", label: "1-3 Months", sublabel: "Planning ahead" },
    { value: "3-6months", label: "3-6 Months", sublabel: "Exploring options" },
    {
      value: "browsing",
      label: "Just Browsing",
      sublabel: "Gathering information",
    },
  ];

  return (
    <div>
      <h3 className="text-3xl font-bold text-slate-900 mb-3">
        What's your timeline?
      </h3>
      <p className="text-slate-600 mb-8">
        This helps us prioritize the best matches for you
      </p>

      <div className="space-y-4">
        {timelines.map((timeline) => (
          <motion.button
            key={timeline.value}
            whileHover={{ scale: 1.01, x: 4 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => updateFormData("timeline", timeline.value)}
            className={`w-full p-6 rounded-xl border-2 transition-all flex items-center justify-between ${
              formData.timeline === timeline.value
                ? "border-emerald-500 bg-emerald-50 shadow-md"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="text-left">
              <div className="text-lg font-bold text-slate-900">
                {timeline.label}
              </div>
              <div className="text-sm text-slate-600">{timeline.sublabel}</div>
            </div>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                formData.timeline === timeline.value
                  ? "border-emerald-500 bg-emerald-500"
                  : "border-slate-300"
              }`}
            >
              {formData.timeline === timeline.value && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </motion.button>
        ))}
      </div>
      {errors.timeline && (
        <p className="text-red-500 text-sm mt-4">{errors.timeline}</p>
      )}
    </div>
  );
};

// Form Step 3: Budget and Location
const FormStep3: React.FC<FormStepProps> = ({
  formData,
  updateFormData,
  errors,
}) => {
  const budgetRanges = [
    "Under $300K",
    "$300K - $500K",
    "$500K - $750K",
    "$750K - $1M",
    "Over $1M",
  ];

  return (
    <div>
      <h3 className="text-3xl font-bold text-slate-900 mb-3">
        Let's narrow it down
      </h3>
      <p className="text-slate-600 mb-8">
        Tell us about your budget and preferred location
      </p>

      <div className="space-y-8">
        {/* Budget Selection */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-4">
            What's your budget range?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {budgetRanges.map((budget) => (
              <motion.button
                key={budget}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateFormData("budget", budget)}
                className={`p-4 rounded-xl border-2 transition-all text-sm font-semibold ${
                  formData.budget === budget
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
              >
                {budget}
              </motion.button>
            ))}
          </div>
          {errors.budget && (
            <p className="text-red-500 text-sm mt-2">{errors.budget}</p>
          )}
        </div>

        {/* Location Input */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-4">
            Where are you looking?
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => updateFormData("location", e.target.value)}
            placeholder="e.g., Downtown Seattle, Bellevue, Capitol Hill"
            className={`w-full p-5 rounded-xl border-2 transition-all text-lg ${
              errors.location
                ? "border-red-300 focus:border-red-500"
                : "border-slate-200 focus:border-emerald-500"
            } outline-none`}
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-2">{errors.location}</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Form Step 4: Contact Information
const FormStep4: React.FC<FormStepProps> = ({
  formData,
  updateFormData,
  errors,
}) => {
  return (
    <div>
      <h3 className="text-3xl font-bold text-slate-900 mb-3">Almost there!</h3>
      <p className="text-slate-600 mb-8">
        Enter your contact information to receive your personalized
        recommendations
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateFormData("name", e.target.value)}
            placeholder="John Smith"
            className={`w-full p-5 rounded-xl border-2 transition-all ${
              errors.name
                ? "border-red-300 focus:border-red-500"
                : "border-slate-200 focus:border-emerald-500"
            } outline-none`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-2">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            placeholder="john@example.com"
            className={`w-full p-5 rounded-xl border-2 transition-all ${
              errors.email
                ? "border-red-300 focus:border-red-500"
                : "border-slate-200 focus:border-emerald-500"
            } outline-none`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => updateFormData("phone", e.target.value)}
            placeholder="(555) 123-4567"
            className={`w-full p-5 rounded-xl border-2 transition-all ${
              errors.phone
                ? "border-red-300 focus:border-red-500"
                : "border-slate-200 focus:border-emerald-500"
            } outline-none`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-2">{errors.phone}</p>
          )}
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-slate-400 mt-0.5 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-slate-600 leading-relaxed">
              By submitting this form, you agree to receive personalized
              property recommendations and market updates. You can unsubscribe
              at any time. We respect your privacy and will never sell your
              information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Success Message Component
const SuccessMessage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-3xl shadow-2xl p-12 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <svg
          className="w-10 h-10 text-emerald-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </motion.div>

      <h3 className="text-3xl font-bold text-slate-900 mb-4">Thank You!</h3>
      <p className="text-xl text-slate-600 mb-6">
        Your request has been received. One of our expert agents will contact
        you within 24 hours with personalized recommendations.
      </p>
      <p className="text-slate-500">
        Check your email for immediate access to our exclusive market insights.
      </p>
    </motion.div>
  );
};

// Custom Hook for Intersection Observer
const useInView = () => {
  const [isInView, setIsInView] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isInView] as const;
};

// Trust Section Component with 3D Power Animations
const TrustSection: React.FC = () => {
  const TrustItem: React.FC<{ children: React.ReactNode; index: number }> = ({
    children,
    index,
  }) => {
    const [ref, isInView] = useInView();

    return (
      <motion.div
        ref={ref}
        initial={{
          opacity: 0,
          y: 100,
          rotateX: -45,
          scale: 0.8,
        }}
        animate={
          isInView
            ? {
                opacity: 1,
                y: 0,
                rotateX: 0,
                scale: 1,
              }
            : {
                opacity: 0,
                y: 100,
                rotateX: -45,
                scale: 0.8,
              }
        }
        transition={{
          duration: 0.8,
          delay: index * 0.2,
          ease: [0.22, 1, 0.36, 1],
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
        whileHover={{
          y: -10,
          rotateY: 5,
          scale: 1.05,
          transition: { duration: 0.3 },
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <section id="trust-section" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9, rotateX: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            Why Thousands Choose Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto"
          >
            Local expertise meets cutting-edge technology to give you an unfair
            advantage
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 perspective-1000">
          <TrustItem index={0}>
            <div className="text-center bg-linear-to-br from-emerald-50 to-white p-8 rounded-3xl border border-emerald-100 shadow-lg hover:shadow-2xl transition-shadow">
              <motion.div
                className="w-16 h-16 bg-linear-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Lightning Fast
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Get matched with properties in under 60 seconds. Our AI-powered
                platform delivers results while others are still processing your
                request.
              </p>
            </div>
          </TrustItem>

          <TrustItem index={1}>
            <div className="text-center bg-linear-to-br from-cyan-50 to-white p-8 rounded-3xl border border-cyan-100 shadow-lg hover:shadow-2xl transition-shadow">
              <motion.div
                className="w-16 h-16 bg-linear-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Verified Listings
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Every property is personally inspected and verified by our team.
                No surprises, no disappointments, just quality homes.
              </p>
            </div>
          </TrustItem>

          <TrustItem index={2}>
            <div className="text-center bg-linear-to-br from-violet-50 to-white p-8 rounded-3xl border border-violet-100 shadow-lg hover:shadow-2xl transition-shadow">
              <motion.div
                className="w-16 h-16 bg-linear-to-br from-violet-400 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Save More Money
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Our clients save an average of $18,000 through expert
                negotiation and exclusive off-market opportunities.
              </p>
            </div>
          </TrustItem>
        </div>

        {/* Testimonials with 3D card flip */}
        <div className="mt-24 grid md:grid-cols-2 gap-8">
          {[
            {
              rating: 5,
              text: "Found our dream home in just 3 weeks. The team's knowledge of the local market was incredible. They knew about listings before they hit the market!",
              name: "Sarah & Michael Chen",
              role: "First-time Homebuyers",
              gradient: "from-emerald-400 to-cyan-400",
            },
            {
              rating: 5,
              text: "Sold our home for 12% above asking price in less than a week. Their marketing strategy and staging advice were game-changers. Highly recommend!",
              name: "Robert Martinez",
              role: "Home Seller",
              gradient: "from-violet-400 to-purple-400",
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 60,
                rotateY: -30,
                scale: 0.9,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotateY: 0,
                scale: 1,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -5,
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.svg
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + index * 0.2 + i * 0.1 }}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </div>
              <p className="text-slate-700 text-lg mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 bg-linear-to-br ${testimonial.gradient} rounded-full`}
                ></div>
                <div>
                  <div className="font-bold text-slate-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-slate-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Properties Showcase Section with 3D Power Animations
const PropertiesShowcase: React.FC = () => {
  const properties: Property[] = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800",
      price: "$1,250,000",
      beds: 4,
      baths: 3,
      sqft: "3,200",
      location: "Downtown Seattle",
      status: "sold",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
      price: "$875,000",
      beds: 3,
      baths: 2,
      sqft: "2,400",
      location: "Capitol Hill",
      status: "pending",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800",
      price: "$1,450,000",
      beds: 5,
      baths: 4,
      sqft: "4,100",
      location: "Bellevue",
      status: "active",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800",
      price: "$695,000",
      beds: 3,
      baths: 2,
      sqft: "1,850",
      location: "Queen Anne",
      status: "sold",
    },
  ];

  const statusColors = {
    sold: "bg-slate-600",
    pending: "bg-amber-500",
    active: "bg-emerald-500",
  };

  const statusLabels = {
    sold: "Sold",
    pending: "Pending",
    active: "Available",
  };

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, rotateX: -20 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            Recently Sold & Active Listings
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto"
          >
            See the caliber of properties we work with every day
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{
                opacity: 0,
                y: 80,
                rotateY: -30,
                rotateX: 30,
                scale: 0.8,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotateY: 0,
                rotateX: 0,
                scale: 1,
              }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              whileHover={{
                y: -15,
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.3)",
                transition: { duration: 0.3 },
              }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Property Image */}
              <div className="relative h-56 overflow-hidden group">
                <motion.img
                  src={property.image}
                  alt={property.location}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                {/* Gradient overlay on hover */}
                <motion.div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Status Badge */}
                <motion.div
                  className="absolute top-4 right-4"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.5 + index * 0.15,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  <span
                    className={`${statusColors[property.status]} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-lg`}
                  >
                    {statusLabels[property.status]}
                  </span>
                </motion.div>
              </div>

              {/* Property Details */}
              <motion.div
                className="p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.15 }}
              >
                <motion.div
                  className="text-3xl font-bold text-slate-900 mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.15 }}
                >
                  {property.price}
                </motion.div>
                <motion.div
                  className="text-slate-600 mb-4 font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.15 }}
                >
                  {property.location}
                </motion.div>

                {/* Property Stats */}
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  {[
                    {
                      icon: (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      ),
                      value: `${property.beds} bd`,
                    },
                    {
                      icon: (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                        />
                      ),
                      value: `${property.baths} ba`,
                    },
                    {
                      icon: (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                        />
                      ),
                      value: `${property.sqft} sqft`,
                    },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-1"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.6 + index * 0.15 + i * 0.1,
                        type: "spring",
                      }}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {stat.icon}
                      </svg>
                      <span className="font-semibold">{stat.value}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-12"
        >
          <motion.button
            onClick={() =>
              document
                .getElementById("form-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            whileHover={{
              scale: 1.08,
              boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full text-lg font-semibold overflow-hidden"
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-emerald-600 to-cyan-600 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.4 }}
            />
            <span className="relative z-10">View All Properties</span>
            <motion.svg
              className="w-5 h-5 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// Final CTA Section
const FinalCTA: React.FC = () => {
  return (
    <section className="py-24 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Make Your Move?
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Join thousands of satisfied clients who found their perfect home
            with our help. Your dream property is waiting.
          </p>

          <motion.button
            onClick={() =>
              document
                .getElementById("form-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-full text-lg font-bold shadow-2xl hover:shadow-white/20 transition-all"
          >
            <span>Start Your Journey Today</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.button>

          <p className="text-sm text-slate-400 mt-6">
            100% free consultation · No obligations · Results guaranteed
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default RealEstateLanding;

import { motion, useMotionValue, useTransform } from "framer-motion";

const companies = [
  "Goldman Sachs",
  "BlackRock",
  "JP Morgan",
  "Knight Frank",
  "Sotheby’s",
  "CBRE",
  "Christie’s",
];

export const TrustedBy = () => {
  const x = useMotionValue(0);
  const rotateY = useTransform(x, [-200, 200], [-15, 15]);

  return (
    <section className="relative py-5 overflow-hidden">
      <div className="text-center mb-10">
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">
          Trusted by institutions & private offices
        </p>
      </div>

      <motion.div
        drag="x"
        dragConstraints={{ left: -300, right: 300 }}
        style={{ x, rotateY }}
        className="flex gap-8 px-12 cursor-grab active:cursor-grabbing"
      >
        {companies.map((name, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="min-w-65 h-30 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl flex items-center justify-center text-white/60 font-semibold tracking-wide"
          >
            {name}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

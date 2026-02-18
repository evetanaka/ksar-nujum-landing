"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        {/* Replace with actual video */}
        <div className="w-full h-full bg-gradient-to-br from-secondary to-accent" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4">
        <motion.h1
          className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-wider mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          KSAR NUJUM
        </motion.h1>
        
        <motion.p
          className="font-serif text-xl md:text-2xl italic text-white/90 mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Where Legacy Meets Longevity
        </motion.p>

        <motion.a
          href="#residences"
          className="inline-block px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-secondary transition-all tracking-wide"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Discover the Estates
        </motion.a>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white/60 text-sm tracking-widest"
        >
          <span className="block mb-2">Scroll</span>
          <span className="block">▼</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

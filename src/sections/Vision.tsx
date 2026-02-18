"use client";

import { motion } from "framer-motion";

export default function Vision() {
  return (
    <section id="vision" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl text-center mb-16">
            Vision
          </h2>
          {/* TODO: Add Vision content */}
          <div className="h-96 bg-accent/10 rounded-lg flex items-center justify-center">
            <p className="text-accent">Section Vision - À développer</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

export default function Gallery() {
  return (
    <section id="gallery" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl text-center mb-16">
            Gallery
          </h2>
          {/* TODO: Add Gallery content */}
          <div className="h-96 bg-accent/10 rounded-lg flex items-center justify-center">
            <p className="text-accent">Section Gallery - À développer</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

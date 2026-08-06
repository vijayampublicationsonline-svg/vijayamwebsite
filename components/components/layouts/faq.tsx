"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What services do you provide?",
    answer:
      "We provide end-to-end video production, advertisements, podcasts, corporate films, documentaries, event coverage, and digital content creation.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Most projects are completed within 3–15 days depending on the scope, revisions, and production requirements.",
  },
  {
    question: "Do you travel for shoots?",
    answer:
      "Yes. We travel across India and internationally depending on the project requirements.",
  },
  {
    question: "How do I book a shoot?",
    answer:
      "Simply fill out the booking form, contact us through WhatsApp, or call our team to discuss your project.",
  },
  {
    question: "Can you handle post-production?",
    answer:
      "Absolutely! We offer editing, color grading, sound design, motion graphics, VFX, and final delivery in multiple formats.",
  },
];

export default function FAQ() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-5xl mx-auto px-6">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-center mb-4"
        >
          Frequently Asked Questions
        </motion.h2>

        <p className="text-gray-400 text-center mb-14">
          Everything you need to know before working with us.
        </p>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              layout
              className="rounded-2xl border border-white/10 overflow-hidden bg-white/5 backdrop-blur-xl"
            >
              <button
                onClick={() =>
                  setActive(active === index ? null : index)
                }
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className="text-xl font-semibold">
                  {faq.question}
                </span>

                <motion.div
                  animate={{
                    rotate: active === index ? 180 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={24} />
                </motion.div>
              </button>

              <AnimatePresence>
                {active === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="px-6 pb-6 text-gray-300 leading-8">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
import React from "react";
import { motion } from "framer-motion";
import TestimonialCarousel from "../components/TestimonialCarousel";
import { Testimonial } from "../types";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
}) => {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What Students Are Saying
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Hear from fellow students who love saving with Student's Choice.
          </p>
        </motion.div>
        <div className="mt-16">
          <TestimonialCarousel
            testimonials={testimonials}
            autoPlayInterval={5000}
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

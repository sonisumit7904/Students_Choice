import React from "react";
import { motion } from "framer-motion";
import { RiPushpinLine as MapPin } from "react-icons/ri";
// import { IoLocationSharp as } from 'react-icons/io5';
import { MdRestaurant as Utensils } from "react-icons/md";
import { FaGraduationCap as GraduationCap } from "react-icons/fa";

const WhatWeDoSection: React.FC = () => {
  return (
    <section id="what-we-do" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-red-600 font-semibold tracking-wide uppercase">
            How It Works
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Simple Savings for Smart Students
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            We connect students with local restaurants offering exclusive
            discounts. Just follow these easy steps.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative p-6 bg-gray-50 rounded-lg shadow-sm transition-shadow hover:shadow-md"
            >
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                  <MapPin className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  1. Find Nearby Shops
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Use our map or search by area (like NIT Raipur or AIIMS) to
                discover affiliated restaurants near you.
              </dd>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative p-6 bg-gray-50 rounded-lg shadow-sm transition-shadow hover:shadow-md"
            >
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                  <GraduationCap className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  2. Show Your Student ID
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Visit the restaurant and present your valid student
                identification card before ordering or paying.
              </dd>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative p-6 bg-gray-50 rounded-lg shadow-sm transition-shadow hover:shadow-md"
            >
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-amber-500 text-white">
                  <Utensils className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  3. Enjoy Your Discount!
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Savor delicious food at a discounted price. It's that simple to
                save money while exploring local tastes.
              </dd>
            </motion.div>
          </dl>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;

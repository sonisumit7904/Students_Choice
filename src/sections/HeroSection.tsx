import React from "react";
import { motion } from "framer-motion";
import { MdRestaurant as Utensils } from "react-icons/md";

const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="pt-24 md:pt-32 pb-16 bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Optional: Add subtle background elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-red-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-0 left-0 -mb-24 -ml-12 w-80 h-80 bg-orange-200 rounded-full opacity-30"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">
              Unlock Exclusive{" "}
              <span className="text-red-600">Student Discounts</span>
            </span>{" "}
            <span className="block text-orange-500 xl:inline">
              at Your Favorite Eateries
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Student's Choice partners with local restaurants near NIT Raipur,
            AIIMS, and more to bring you unbeatable deals. Show your ID, save
            money, eat well!
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <a
                href="#shops"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-500 hover:bg-red-600 md:py-4 md:text-lg md:px-10 transition-transform transform hover:scale-105"
              >
                Find Discounts Now <Utensils className="ml-2 h-5 w-5" />
              </a>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <a
                href="#what-we-do"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-red-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

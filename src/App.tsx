import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  GraduationCap,
  Utensils,
  MapPin,
  Star,
  ChevronRight,
  Phone,
  Mail,
  MapPinned,
  Clock,
  Search,
  Filter,
  TrendingUp,
} from "lucide-react";
import AnimatedFoodBackground from "./components/AnimatedFoodBackground";
import TestimonialCarousel from "./components/TestimonialCarousel";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFoodAnimationsEnabled, setIsFoodAnimationsEnabled] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Example restaurant data
  const restaurants = [
    {
      id: 1,
      name: "Pizza Haven",
      image:
        "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=800",
      cuisine: "Italian",
      discount: "30% off on all pizzas",
      rating: 4.8,
      location: "Near Central Campus",
      deliveryTime: "25-30 min",
      priceForTwo: "$20-25",
      trending: true,
    },
    {
      id: 2,
      name: "Burger Bistro",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800",
      cuisine: "American",
      discount: "Buy 1 Get 1 Free",
      rating: 4.5,
      location: "Downtown",
      deliveryTime: "30-35 min",
      priceForTwo: "$30-35",
      trending: false,
    },
    {
      id: 3,
      name: "Sushi Station",
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800",
      cuisine: "Japanese",
      discount: "20% off entire menu",
      rating: 4.9,
      location: "East Campus",
      deliveryTime: "35-40 min",
      priceForTwo: "$40-45",
      trending: true,
    },
  ];

  // Enhanced testimonial data with additional entry
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      university: "State University",
      comment:
        "Student's Choice has been a lifesaver! I've saved so much money on food while trying new restaurants.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 2,
      name: "Michael Chen",
      university: "Tech Institute",
      comment:
        "The discounts are amazing, and the restaurants are all high-quality. Highly recommend!",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 3,
      name: "Aisha Patel",
      university: "City College",
      comment:
        "Being a student on a tight budget, Student's Choice has changed my dining experience! I can now try different cuisines without worrying about the cost.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Background Food Animations */}
      <AnimatedFoodBackground count={12} enabled={isFoodAnimationsEnabled} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full glass-effect shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex-shrink-0 flex items-center">
                <GraduationCap className="h-8 w-8 text-red-500" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  Student's Choice
                </span>
              </div>
            </motion.div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                className="text-gray-600 hover:text-red-500 transition-colors"
              >
                Home
              </a>
              <a
                href="#what-we-do"
                className="text-gray-600 hover:text-red-500 transition-colors"
              >
                What We Do
              </a>
              <a
                href="#shops"
                className="text-gray-600 hover:text-red-500 transition-colors"
              >
                Shops With Us
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-red-500 transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:text-red-500 transition-colors"
              >
                Contact
              </a>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} className="text-gray-600">
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#home"
                className="block px-3 py-2 text-gray-600 hover:text-red-500 transition-colors"
              >
                Home
              </a>
              <a
                href="#what-we-do"
                className="block px-3 py-2 text-gray-600 hover:text-red-500 transition-colors"
              >
                What We Do
              </a>
              <a
                href="#shops"
                className="block px-3 py-2 text-gray-600 hover:text-red-500 transition-colors"
              >
                Shops With Us
              </a>
              <a
                href="#testimonials"
                className="block px-3 py-2 text-gray-600 hover:text-red-500 transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-gray-600 hover:text-red-500 transition-colors"
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-16 bg-gradient-to-r from-red-50 to-orange-50 relative"
      >
        {/* Toggle for food animations */}
        <button
          className="absolute top-20 right-5 z-10 text-xs bg-white p-2 rounded-full shadow-md"
          onClick={() => setIsFoodAnimationsEnabled(!isFoodAnimationsEnabled)}
        >
          {isFoodAnimationsEnabled
            ? "Disable Food Animations"
            : "Enable Food Animations"}
        </button>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Hungry? We've got your student budget covered!
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Your go-to platform for exclusive student discounts at local
                restaurants. Flash your student ID and enjoy delicious meals at
                unbeatable prices!
              </p>
              <motion.a
                href="#shops"
                className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Discover Discounts
                <ChevronRight className="ml-2 h-5 w-5" />
              </motion.a>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="/students_choice_logo.jpg"
                alt="Student's Choice Logo"
                className="rounded-lg shadow-xl animate-float"
              />
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="font-medium">
                    Save up to 50% with your student ID
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Search for restaurants or cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button className="p-2 hover:bg-gray-100 rounded-full mr-2">
                <Filter className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600">
              Three simple steps to save on your meals
            </p>
          </motion.div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="relative p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute -top-4 left-6 bg-red-500 rounded-full p-2">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                Show Your ID
              </h3>
              <p className="mt-2 text-gray-600">
                Simply present your valid student ID at any participating
                restaurant to unlock exclusive discounts.
              </p>
            </motion.div>
            <motion.div
              className="relative p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="absolute -top-4 left-6 bg-red-500 rounded-full p-2">
                <Utensils className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                Enjoy Discounts
              </h3>
              <p className="mt-2 text-gray-600">
                Get amazing discounts on your favorite meals while supporting
                local restaurants.
              </p>
            </motion.div>
            <motion.div
              className="relative p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="absolute -top-4 left-6 bg-red-500 rounded-full p-2">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                Find Nearby
              </h3>
              <p className="mt-2 text-gray-600">
                Discover participating restaurants near your campus with our
                easy-to-use platform.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Shops With Us Section */}
      <section id="shops" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900">
              Popular Restaurants
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Discover Student-Friendly Dining
            </p>
          </motion.div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {restaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden card-zoom"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="relative">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover image-zoom"
                  />
                  <div className="absolute inset-0 gradient-overlay"></div>
                  {restaurant.trending && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Trending
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="font-bold text-lg">
                        {restaurant.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {restaurant.name}
                      </h3>
                      <p className="text-gray-600">{restaurant.cuisine}</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-gray-600">
                      <MapPinned className="h-5 w-5 mr-2" />
                      <span>{restaurant.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-2" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center text-red-500 font-medium">
                      <span>{restaurant.discount}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {restaurant.priceForTwo} for two
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Replaced with Carousel */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900">
              What Students Say
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Real Stories from Real Students
            </p>
          </motion.div>

          {/* New Testimonial Carousel Component */}
          <div className="mt-16">
            <TestimonialCarousel
              testimonials={testimonials}
              autoPlayInterval={5000}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900">Get in Touch</h2>
            <p className="mt-4 text-xl text-gray-600">
              Questions? We're here to help!
            </p>
          </motion.div>
          <motion.div
            className="mt-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="pl-2 block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="pl-2 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="pl-2 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="pl-2 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="pl-2 block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="pl-2 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 transition-colors"
                  placeholder="Your message"
                />
              </div>
              <motion.button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <Phone className="h-6 w-6 text-red-500" />
                <span className="ml-3 text-gray-600">+1 (555) 123-4567</span>
              </motion.div>
              <motion.div
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <Mail className="h-6 w-6 text-red-500" />
                <span className="ml-3 text-gray-600">
                  support@studentschoice.com
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GraduationCap className="h-8 w-8 text-red-400 mx-auto" />
            <h3 className="mt-4 text-xl font-bold">Student's Choice</h3>
            <p className="mt-2 text-gray-400">
              Making student dining affordable and delicious
            </p>
            <p className="mt-8 text-gray-400">
              2025 Student's Choice. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default App;

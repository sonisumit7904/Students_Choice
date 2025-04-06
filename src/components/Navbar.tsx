import React from "react";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";

interface NavbarProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isMenuOpen, toggleMenu }) => {
  return (
    <nav className="fixed top-0 w-full bg-white/20 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-red-500 font-bold text-xl">
              Student's Choice
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                href="#home"
                className="text-gray-600 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </a>
              <a
                href="#what-we-do"
                className="text-gray-600 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                What We Do
              </a>
              <a
                href="#shops"
                className="text-gray-600 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Find Shops
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-red-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-red-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <AiOutlineClose className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#home"
              className="text-gray-600 hover:bg-gray-50 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Home
            </a>
            <a
              href="#what-we-do"
              className="text-gray-600 hover:bg-gray-50 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              What We Do
            </a>
            <a
              href="#shops"
              className="text-gray-600 hover:bg-gray-50 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Find Shops
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:bg-gray-50 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Testimonials
            </a>
            <a
              href="#contact"
              className="text-gray-600 hover:bg-gray-50 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Contact
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;

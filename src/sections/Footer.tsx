import React from "react";
import { Mail, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Info */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold text-white mb-3">
              Student's Choice
            </h3>
            <p className="text-sm">
              Connecting students with unbeatable food deals in Raipur.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-md font-semibold text-gray-200 mb-3 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="hover:text-white transition-colors text-sm"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#what-we-do"
                  className="hover:text-white transition-colors text-sm"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#shops"
                  className="hover:text-white transition-colors text-sm"
                >
                  Find Shops
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="hover:text-white transition-colors text-sm"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors text-sm"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Footer */}
          <div>
            <h4 className="text-md font-semibold text-gray-200 mb-3 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-orange-400" />{" "}
                studentschoice11@gmail.com
              </li>
              <li className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-amber-400" /> Raipur,
                Chhattisgarh
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          {new Date().getFullYear()} Student's Choice. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

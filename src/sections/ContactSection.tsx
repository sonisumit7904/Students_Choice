import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPinned } from "lucide-react";

const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-t from-gray-100 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Get In Touch
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Have questions, suggestions, or want to partner with us? Reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex-shrink-0">
                <Mail className="h-8 w-8 text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Email Us</h3>
                <p className="mt-1 text-gray-600">
                  For inquiries or partnership details, drop us an email.
                </p>
                <a
                  href="mailto:studentschoice11@gmail.com"
                  className="mt-2 inline-block text-orange-600 hover:text-orange-800 font-semibold"
                >
                  studentschoice11@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex-shrink-0">
                <MapPinned className="h-8 w-8 text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Our Base</h3>
                <p className="mt-1 text-gray-600">
                  While we operate digitally, our roots are in Raipur.
                </p>
                <p className="mt-2 text-gray-700 font-medium">
                  Raipur, Chhattisgarh, India
                </p>
              </div>
            </div>
          </motion.div>
          {/* Optional: Add a simple contact form here later */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white p-8 rounded-lg shadow-xl border border-gray-200"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Send a Message (Coming Soon)
            </h3>
            <form action="#" method="POST" className="space-y-6">
              {/* Form fields (disabled for now) */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed focus:outline-none sm:text-sm"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed focus:outline-none sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed focus:outline-none sm:text-sm"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  disabled
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 cursor-not-allowed"
                >
                  Send Message (Feature disabled)
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

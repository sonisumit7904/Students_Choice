import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPinned } from "lucide-react";
import ContactForm from "../components/ContactForm";

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

          {/* New Contact Form Component */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

// src/components/ContactForm.tsx

import React from "react";
import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react"; // Import Formspree hook and component

const ContactForm: React.FC = () => {
  // --- Use the Formspree hook ---
  // Replace "YOUR_FORM_ID" with your actual Form ID from Formspree
  const [state, handleSubmit] = useForm("mqapyvdl");

  // If submission was successful, show a thank you message
  if (state.succeeded) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-xl border border-green-200 text-center"
      >
        <h3 className="text-2xl font-bold text-green-600 mb-4">
          Message Sent!
        </h3>
        <p className="text-gray-700">
          Thanks for reaching out. We'll get back to you soon.
        </p>
      </motion.div>
    );
  }

  // Otherwise, show the form
  return (
    <motion.div
      // Animation props
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="bg-white p-8 rounded-lg shadow-xl border border-gray-200"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h3>
      {/* Use the handleSubmit from the hook */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* --- REMOVED Name Field --- */}
        {/* The entire div containing the Name label, input, and ValidationError is deleted */}

        {/* Email field - Kept */}
        <div>
          <label
            htmlFor="contact-form-email" // Unique ID
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email" // Crucial: Formspree uses this name
            id="contact-form-email"
            autoComplete="email"
            required
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${state.submitting ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
            placeholder="you@example.com"
            disabled={state.submitting}
          />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
            className="mt-1 text-xs text-red-600"
          />
        </div>

        {/* Message field - Kept */}
        <div>
          <label
            htmlFor="contact-form-message" // Unique ID
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="contact-form-message"
            name="message" // Crucial: Formspree uses this name
            rows={4}
            required
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${state.submitting ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
            placeholder="Your message..."
            disabled={state.submitting}
          ></textarea>
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
            className="mt-1 text-xs text-red-600"
          />
        </div>

        {/* Display general form errors */}
        <ValidationError
          errors={state.errors}
          className="text-sm text-red-600"
        />

        {/* Submit button - Kept */}
        <div>
          <button
            type="submit"
            disabled={state.submitting}
            className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
              state.submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {state.submitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ContactForm;

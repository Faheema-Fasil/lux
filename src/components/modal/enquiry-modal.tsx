'use client'
import React from "react";
import { motion } from "framer-motion";

interface EnquiryModalProps {
  handleSubmit: any;
  handleChange: any;
  closeModal: any;
  loading: boolean;
}

const EnquiryModal: React.FC<EnquiryModalProps> = ({
  handleSubmit,
  handleChange,
  closeModal,
  loading,
}) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <h2 className="text-2xl font-bold mb-4 md:text-3xl lg:text-4xl">Enquiry Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name*</label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="Your Name"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email*</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="Your Email"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Phone Number*</label>
            <input
              type="number"
              name="phone"
              maxLength={12}
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="Your phone number"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Message*</label>
            <textarea
              name="message"
              className="w-full border border-gray-300 rounded px-4 py-2"
              rows={4}
              placeholder="Your Message"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="flex justify-end">
            <motion.button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white rounded px-4 py-2 mr-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-gray-400" : "bg-primary"
              } text-white rounded px-4 py-2`}
              whileHover={{ scale: !loading ? 1.05 : 1 }}
              whileTap={{ scale: !loading ? 0.95 : 1 }}
            >
              {loading ? "Submitting..." : "Submit"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EnquiryModal;



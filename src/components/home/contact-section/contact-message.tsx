"use client";

import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEnquiryStore } from "@/stores/enquiryStore";

const ContactMessage = () => {
const { submitSuccess, error } = useEnquiryStore();
    
  return (
    <AnimatePresence>
      {submitSuccess && (
        <motion.div
          className="flex items-center gap-3 p-4 rounded-md bg-green-100/90 dark:bg-green-900/30 text-green-700 dark:text-green-400 backdrop-blur-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <CheckCircle className="h-5 w-5 flex-shrink-0" />
          <p>Message sent successfully! I&apos;ll get back to you soon.</p>
        </motion.div>
      )}

      {error && (
        <motion.div
          className="flex items-center gap-3 p-4 rounded-md bg-red-100/90 dark:bg-red-900/30 text-red-700 dark:text-red-400 backdrop-blur-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>{error}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactMessage;

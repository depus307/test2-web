"use client";

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "@/components/ui/sonner";
import { motion, AnimatePresence } from "framer-motion";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ 
            duration: 0.3,
            ease: "easeInOut"
          }}
          className="flex-grow pt-16"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
} 
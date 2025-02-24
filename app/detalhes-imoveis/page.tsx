"use client";

import { motion } from "framer-motion";

export default function MaintenancePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold text-gray-800 mb-4">
          Em breve...
        </h1>
        <p className="text-2xl text-gray-600">
          Estamos trabalhando para trazer essa funcionalidade para você.
        </p>
      </motion.div>
    </div>
  );
}

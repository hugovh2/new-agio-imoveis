"use client";

import React from "react";
import { motion } from "framer-motion";

const LocationSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white p-6 rounded-2xl shadow-2xl"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Nossa Localização
          </h3>
          <div className="relative rounded-xl overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245794.75539454045!2d-47.9769001!3d-16.0684003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a3385b7f3f9d3%3A0x4b1f3f3e7bdb22df!2sValpara%C3%ADso%20de%20Goi%C3%A1s%2C%20GO!5e0!3m2!1spt-BR!2sbr&maptype=satellite&markers=-16.0684003,-47.9769001"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href="https://www.google.com/maps/place/Valpara%C3%ADso+de+Goi%C3%A1s,+GO/@-16.0684003,-47.9769001,15z/"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-500 transition-colors"
            >
              Abrir no Google Maps
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationSection;

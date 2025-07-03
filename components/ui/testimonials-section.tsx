"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Maria Silva",
    role: "Compradora",
    location: "São Paulo, SP",
    rating: 5,
    text: "Consegui realizar o sonho da casa própria através do ágio. O processo foi transparente e a economia foi significativa. Recomendo!",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "João Santos",
    role: "Investidor",
    location: "Rio de Janeiro, RJ",
    rating: 5,
    text: "Excelente plataforma para encontrar oportunidades de investimento. A equipe é muito profissional e o suporte é excepcional.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Ana Costa",
    role: "Vendedora",
    location: "Brasília, DF",
    rating: 5,
    text: "Vendi meu imóvel rapidamente e com segurança. A plataforma facilitou todo o processo e encontrei o comprador ideal.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  }
];

export default function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section className="py-20 bg-gradient-to-br from-[#3EA76F]/5 to-[#48C78E]/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            O que Nossos Clientes Dizem
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Histórias reais de pessoas que realizaram seus sonhos através da nossa plataforma
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl relative"
          >
            <Quote className="absolute top-6 left-6 w-8 h-8 text-[#3EA76F]/20" />
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <img
                  src={testimonials[activeTestimonial].avatar}
                  alt={testimonials[activeTestimonial].name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#3EA76F]/20"
                />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-4">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  "{testimonials[activeTestimonial].text}"
                </p>
                
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-[#3EA76F] font-medium">
                    {testimonials[activeTestimonial].role}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {testimonials[activeTestimonial].location}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-8 gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeTestimonial
                    ? "bg-[#3EA76F] w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Home, Award } from "lucide-react";

const stats = [
  {
    icon: Home,
    value: "5.000+",
    label: "Imóveis com Ágio",
    description: "Oportunidades únicas",
    color: "text-[#3EA76F]"
  },
  {
    icon: Users,
    value: "15.000+",
    label: "Clientes Satisfeitos",
    description: "Sonhos realizados",
    color: "text-blue-600"
  },
  {
    icon: TrendingUp,
    value: "R$ 2.5B",
    label: "Em Negócios",
    description: "Volume transacionado",
    color: "text-purple-600"
  },
  {
    icon: Award,
    value: "98%",
    label: "Aprovação",
    description: "Índice de satisfação",
    color: "text-orange-600"
  }
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Números que Impressionam
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Somos líderes no mercado de ágio de imóveis, conectando pessoas aos seus sonhos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 ${stat.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="text-4xl font-bold text-gray-900 mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
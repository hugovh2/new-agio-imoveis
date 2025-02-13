"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Home, Users, CheckCircle, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Home,
    value: "5000+",
    label: "Imóveis Anunciados",
    color: "bg-blue-500",
  },
  {
    icon: Users,
    value: "10000+",
    label: "Usuários Ativos",
    color: "bg-green-500",
  },
  {
    icon: CheckCircle,
    value: "2000+",
    label: "Negócios Fechados",
    color: "bg-purple-500",
  },
  {
    icon: TrendingUp,
    value: "98%",
    label: "Clientes Satisfeitos",
    color: "bg-orange-500",
  },
];

export default function StatsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300"
              >
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
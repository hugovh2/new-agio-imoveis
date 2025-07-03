"use client";

import { motion } from "framer-motion";
import { TrendingDown, Clock, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const opportunities = [
  {
    id: 1,
    title: "Apartamento 3 Quartos - Asa Norte",
    location: "Brasília, DF",
    originalPrice: 450000,
    agioPrice: 80000,
    monthlyPayment: 2800,
    installmentsLeft: 180,
    savings: 370000,
    highlight: "Ágio Baixo",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
    features: ["3 quartos", "2 banheiros", "85m²", "Garagem"]
  },
  {
    id: 2,
    title: "Casa Duplex - Águas Claras",
    location: "Brasília, DF",
    originalPrice: 650000,
    agioPrice: 120000,
    monthlyPayment: 3200,
    installmentsLeft: 240,
    savings: 530000,
    highlight: "Entrada Facilitada",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    features: ["4 quartos", "3 banheiros", "150m²", "Quintal"]
  },
  {
    id: 3,
    title: "Cobertura Duplex - Lago Sul",
    location: "Brasília, DF",
    originalPrice: 850000,
    agioPrice: 200000,
    monthlyPayment: 4500,
    installmentsLeft: 300,
    savings: 650000,
    highlight: "Oportunidade Única",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
    features: ["5 quartos", "4 banheiros", "200m²", "Terraço"]
  }
];

export default function OpportunityHighlights() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(value);
  };

  const getHighlightColor = (highlight: string) => {
    switch (highlight) {
      case "Ágio Baixo":
        return "bg-green-100 text-green-800 border-green-200";
      case "Entrada Facilitada":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Oportunidade Única":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

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
            Oportunidades em Destaque
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Selecionamos as melhores oportunidades de ágio com economia significativa
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {opportunities.map((opportunity, index) => (
            <motion.div
              key={opportunity.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Imagem */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={opportunity.image}
                  alt={opportunity.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getHighlightColor(opportunity.highlight)}`}>
                    {opportunity.highlight}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                    <div className="flex items-center text-green-600">
                      <TrendingDown className="w-4 h-4 mr-1" />
                      <span className="text-sm font-bold">
                        {Math.round((opportunity.savings / opportunity.originalPrice) * 100)}% OFF
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {opportunity.title}
                </h3>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{opportunity.location}</span>
                </div>

                {/* Características */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {opportunity.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Preços */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Valor Original:</span>
                    <span className="text-sm text-gray-500 line-through">
                      {formatCurrency(opportunity.originalPrice)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Valor do Ágio:</span>
                    <span className="text-xl font-bold text-[#3EA76F]">
                      {formatCurrency(opportunity.agioPrice)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Parcela Mensal:</span>
                    <span className="text-sm font-medium">
                      {formatCurrency(opportunity.monthlyPayment)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Parcelas Restantes:</span>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-gray-400" />
                      <span className="text-sm">{opportunity.installmentsLeft} meses</span>
                    </div>
                  </div>
                </div>

                {/* Economia */}
                <div className="bg-green-50 rounded-lg p-3 mb-4">
                  <div className="text-center">
                    <p className="text-sm text-green-700 mb-1">Economia Total</p>
                    <p className="text-2xl font-bold text-green-800">
                      {formatCurrency(opportunity.savings)}
                    </p>
                  </div>
                </div>

                {/* Botão */}
                <Link href={`/detalhes-imoveis`}>
                  <Button className="w-full bg-[#3EA76F] hover:bg-[#48C78E] transition-colors">
                    Ver Detalhes
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/buscar">
            <Button
              variant="outline"
              size="lg"
              className="border-[#3EA76F] text-[#3EA76F] hover:bg-[#3EA76F] hover:text-white"
            >
              Ver Todas as Oportunidades
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
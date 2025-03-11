"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Briefcase, Crown } from "lucide-react";

const planos = [
  {
    id: "basico",
    nome: "Plano Básico",
    preco: "R$ 15/mês",
    descricao: "Cadastro ilimitado de imóveis.",
    icone: <Star className="text-green-500 w-12 h-12 mb-4" />,
  },
  {
    id: "profissional",
    nome: "Plano Profissional",
    preco: "R$ 30/mês",
    descricao: "Cadastro ilimitado + Destaque nos anúncios.",
    icone: <Briefcase className="text-green-600 w-12 h-12 mb-4" />,
  },
  {
    id: "premium",
    nome: "Plano Premium",
    preco: "R$ 50/mês",
    descricao: "Todos os benefícios + Suporte Prioritário.",
    icone: <Crown className="text-yellow-500 w-12 h-12 mb-4" />,
  },
];

const PlanosSection = () => {
  const [planoSelecionado, setPlanoSelecionado] = useState<string | null>(null);

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white p-8 rounded-2xl shadow-2xl"
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            Escolha o Plano Ideal para Você
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {planos.map((plano) => (
              <motion.div
                key={plano.id}
                className={`p-8 rounded-xl shadow-md flex flex-col items-center cursor-pointer transition-all ${
                  planoSelecionado === plano.id
                    ? "bg-green-100 border-2 border-green-600 scale-105 shadow-lg"
                    : "bg-gray-50 hover:shadow-lg"
                }`}
                onClick={() => setPlanoSelecionado(plano.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {plano.icone}
                <h4 className="text-xl font-semibold text-gray-700">{plano.nome}</h4>
                <p className="text-gray-600 mt-2 text-lg font-medium">{plano.preco}</p>
                <p className="text-sm text-gray-500 mt-2 text-center">{plano.descricao}</p>
                <motion.button
                  className="mt-4 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-500 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Assinar Agora
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlanosSection;
